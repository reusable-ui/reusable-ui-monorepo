import {
    default as React,
    
    type ReactNode,
    type RefObject,
    
    useRef,
} from 'react'

import {
    type ValidationProps,
    type ResolvedValidationState,
    useResolvedValidationState,
    
    type ValidationProviderProps,
    ValidationProvider,
} from '../dist/index.js'

import { render, renderHook, screen } from '@testing-library/react'
import '@testing-library/jest-dom'



interface ControlProps extends ValidationProps {
    /**
     * Simulates the final `computedIsValid` when `preResolvedIsValid` is 'auto'.
    */
    simulateIsValid ?: boolean | null
    
    resultRef       ?: RefObject<ResolvedValidationState | null>
    
    children        ?: ReactNode
}
const Control = (props: ControlProps) => {
    const {
        enableValidation,
        isValid,
        
        cascadeValidation,
        
        
        
        simulateIsValid = null,
        
        resultRef,
        
        
        
        children,
        
        
        ...restProps
    } = props;
    
    
    
    const resolvedValidationState = useResolvedValidationState({
        enableValidation,
        isValid,
        
        cascadeValidation,
    });
    const {
        enableValidation : resolvedEnableValidation,
        isValid          : preResolvedIsValid,
    } = resolvedValidationState;
    if (resultRef) resultRef.current = resolvedValidationState;
    
    const resolvedIsValid = preResolvedIsValid !== 'auto' ? preResolvedIsValid : simulateIsValid;
    
    
    
    return (
        <div
            {...restProps}
            
            data-enable-validation={resolvedEnableValidation}
            data-is-valid={`${resolvedIsValid}`}
        >
            <ValidationProvider
                enableValidation={resolvedEnableValidation}
                isValid={resolvedIsValid}
            >
                {children}
            </ValidationProvider>
        </div>
    );
};

interface FormProps extends ValidationProviderProps {
    children ?: ReactNode
}
const Form = (props: FormProps) => {
    return (
        <ValidationProvider {...props} />
    );
};



describe('Validation resolution across nesting levels', () => {
    const createResultRef = () => renderHook(() => useRef<ResolvedValidationState | null>(null)).result.current;
    
    test('triple nested with default props', () => {
        const outerResultRef = createResultRef();
        const innerResultRef = createResultRef();
        
        render(
            <Form>
                <Control data-testid='outer' resultRef={outerResultRef}>
                    <Control data-testid='inner' resultRef={innerResultRef} />
                </Control>
            </Form>
        );
        
        // Outer:
        expect(outerResultRef.current).toMatchObject({
            enableValidation : true,
            isValid          : 'auto',
        } satisfies ResolvedValidationState);
        const outer = screen.getByTestId('outer');
        expect(outer).toHaveAttribute('data-enable-validation', 'true');
        expect(outer).toHaveAttribute('data-is-valid', 'null'); // 'auto' => internally resolved to `null`
        
        // Inner:
        expect(innerResultRef.current).toMatchObject({
            enableValidation : true,
            isValid          : 'auto',
        } satisfies ResolvedValidationState);
        const inner = screen.getByTestId('inner');
        expect(inner).toHaveAttribute('data-enable-validation', 'true');
        expect(inner).toHaveAttribute('data-is-valid', 'null'); // 'auto' => internally resolved to `null`
    });
    
    test('unwrapped Control with no ancestor defaults to disabled validation', () => {
        const resultRef = renderHook(() => useRef<ResolvedValidationState | null>(null)).result.current;
        
        render(
            <Control data-testid='control' resultRef={resultRef}>
                solo
            </Control>
        );
        
        expect(resultRef.current).toMatchObject({
            enableValidation : false,
            isValid          : null,
        } satisfies ResolvedValidationState);
        const control = screen.getByTestId('control');
        expect(control).toHaveAttribute('data-enable-validation', 'false');
        expect(control).toHaveAttribute('data-is-valid', 'null');
    });
    
    test('control with simulateIsValid forces internal resolution', () => {
        const resultRef = renderHook(() => useRef<ResolvedValidationState | null>(null)).result.current;
        
        render(
            <Form>
                <Control data-testid='control' resultRef={resultRef} simulateIsValid={true}  />
            </Form>
        );
        
        expect(resultRef.current).toMatchObject({
            enableValidation : true,
            isValid          : 'auto',
        } satisfies ResolvedValidationState);
        const control = screen.getByTestId('control');
        expect(control).toHaveAttribute('data-enable-validation', 'true');
        expect(control).toHaveAttribute('data-is-valid', 'true'); // 'auto' => internally resolved to `true`
    });
    
    test('cascaded disablement prevents validation in descendants', () => {
        const resultRef = renderHook(() => useRef<ResolvedValidationState | null>(null)).result.current;
        
        render(
            <Form enableValidation={false}>
                <Control data-testid='control' resultRef={resultRef} />
            </Form>
        );
        
        expect(resultRef.current).toMatchObject({
            enableValidation : false,
            isValid          : null,
        } satisfies ResolvedValidationState);
        const control = screen.getByTestId('control');
        expect(control).toHaveAttribute('data-enable-validation', 'false');
        expect(control).toHaveAttribute('data-is-valid', 'null');
    });
    
    test('descendant with cascadeValidation=false ignores parent state', () => {
        const resultRef = renderHook(() => useRef<ResolvedValidationState | null>(null)).result.current;
        
        render(
            <Form enableValidation={false}>
                <Control data-testid='control' resultRef={resultRef} cascadeValidation={false} enableValidation={true} />
            </Form>
        );
        
        expect(resultRef.current).toMatchObject({
            enableValidation : true,
            isValid          : 'auto',
        } satisfies ResolvedValidationState);
        const control = screen.getByTestId('control');
        expect(control).toHaveAttribute('data-enable-validation', 'true');
        expect(control).toHaveAttribute('data-is-valid', 'null'); // 'auto' => internally resolved to `null`
    });
    
    test("isValid='inherit' pulls defined value from ValidationProvider", () => {
        const resultRef = renderHook(() => useRef<ResolvedValidationState | null>(null)).result.current;
        
        render(
            <Form isValid={false}>
                <Control data-testid='control' resultRef={resultRef} isValid='inherit' />
            </Form>
        );
        
        expect(resultRef.current).toMatchObject({
            enableValidation : true,
            isValid          : false,
        } satisfies ResolvedValidationState);
        const control = screen.getByTestId('control');
        expect(control).toHaveAttribute('data-enable-validation', 'true');
        expect(control).toHaveAttribute('data-is-valid', 'false');
    });
    
    test('ancestor hierarchy affects nested Control resolution', () => {
        const resultRef = renderHook(() => useRef<ResolvedValidationState | null>(null)).result.current;
        
        render(
            <Form enableValidation={false}>
                <Control data-testid='group' enableValidation={true}>
                    <Control data-testid='control' resultRef={resultRef} />
                </Control>
            </Form>
        );
        
        const group = screen.getByTestId('group');
        expect(group).toHaveAttribute('data-enable-validation', 'false'); // cascaded disablement
        expect(group).toHaveAttribute('data-is-valid', 'null');
        
        expect(resultRef.current).toMatchObject({
            enableValidation : false,
            isValid          : null,
        } satisfies ResolvedValidationState);
        const control = screen.getByTestId('control');
        expect(control).toHaveAttribute('data-enable-validation', 'false');
        expect(control).toHaveAttribute('data-is-valid', 'null');
    });
    
    test('local isValid is respected when cascadeValidation is false', () => {
        const resultRef = renderHook(() => useRef<ResolvedValidationState | null>(null)).result.current;
        
        render(
            <Form isValid={false}>
                <Control data-testid='control' resultRef={resultRef} isValid={true} cascadeValidation={false} />
            </Form>
        );
        
        expect(resultRef.current).toMatchObject({
            enableValidation : true,
            isValid          : true,
        } satisfies ResolvedValidationState);
        const control = screen.getByTestId('control');
        expect(control).toHaveAttribute('data-enable-validation', 'true');
        expect(control).toHaveAttribute('data-is-valid', 'true');
    });
    
    test('inherited isValid is null if ancestor explicitly marks unvalidated', () => {
        const resultRef = renderHook(() => useRef<ResolvedValidationState | null>(null)).result.current;
        
        render(
            <Form isValid={null}>
                <Control data-testid='control' resultRef={resultRef} isValid='inherit' />
            </Form>
        );
        
        expect(resultRef.current).toMatchObject({
            enableValidation : true,
            isValid          : null,
        } satisfies ResolvedValidationState);
        const control = screen.getByTestId('control');
        expect(control).toHaveAttribute('data-enable-validation', 'true');
        expect(control).toHaveAttribute('data-is-valid', 'null');
    });
    
    test('deep cascade of enableValidation disables all descendants', () => {
        const resultRef = renderHook(() => useRef<ResolvedValidationState | null>(null)).result.current;
        
        render(
            <Form enableValidation={false}>
                <Control data-testid='parent'>
                    <Control data-testid='control' resultRef={resultRef} />
                </Control>
            </Form>
        );
        
        expect(screen.getByTestId('parent')).toHaveAttribute('data-enable-validation', 'false');
        
        expect(resultRef.current).toMatchObject({
            enableValidation : false,
            isValid          : null,
        } satisfies ResolvedValidationState);
        const control = screen.getByTestId('control');
        expect(control).toHaveAttribute('data-enable-validation', 'false');
        expect(control).toHaveAttribute('data-is-valid', 'null');
    });
    
    test('mixed cascadeValidation allows selective isolation', () => {
        const resultRef = renderHook(() => useRef<ResolvedValidationState | null>(null)).result.current;
        
        render(
            <Form enableValidation={false}>
                <Control data-testid='parent'>
                    <Control
                        data-testid='control'
                        resultRef={resultRef}
                        
                        cascadeValidation={false}
                        enableValidation={true}
                    />
                </Control>
            </Form>
        );
        
        expect(screen.getByTestId('parent')).toHaveAttribute('data-enable-validation', 'false');
        
        expect(resultRef.current).toMatchObject({
            enableValidation : true,
            isValid          : 'auto',
        } satisfies ResolvedValidationState);
        const control = screen.getByTestId('control');
        expect(control).toHaveAttribute('data-enable-validation', 'true');
        expect(control).toHaveAttribute('data-is-valid', 'null'); // 'auto' => internally resolved to `null`
    });
    
    test('simulateIsValid resolves auto to given fallback value', () => {
        const resultRef = renderHook(() => useRef<ResolvedValidationState | null>(null)).result.current;
        
        render(
            <Form>
                <Control data-testid='control' resultRef={resultRef} isValid='auto' simulateIsValid={false} />
            </Form>
        );
        
        expect(resultRef.current).toMatchObject({
            enableValidation : true,
            isValid          : 'auto',
        } satisfies ResolvedValidationState);
        const control = screen.getByTestId('control');
        expect(control).toHaveAttribute('data-enable-validation', 'true');
        expect(control).toHaveAttribute('data-is-valid', 'false'); // 'auto' => internally resolved to `false`
    });
    
    /*
        🧪 enableValidation resolution matrix
        
        cascadeValidation | parentEnableValidation | localEnableValidation  | expectedComputedEnableValidation
        ------------------|------------------------|------------------------|---------------------------------
        true              | true                   | true                   | true
        true              | false                  | true                   | false
        true              | true                   | false                  | false
        true              | false                  | false                  | false
        
        false             | true                   | true                   | true
        false             | false                  | true                   | true
        false             | true                   | false                  | false
        false             | false                  | false                  | false
    */
    it.each([
        [ true  , true  , true  , true  ],
        [ true  , false , true  , false ],
        [ true  , true  , false , false ],
        [ true  , false , false , false ],
        
        [ false , true  , true  , true  ],
        [ false , false , true  , true  ],
        [ false , true  , false , false ],
        [ false , false , false , false ],
    ])(
        'enableValidation resolves correctly: cascade=%s, parent=%s, local=%s → expected=%s',
        (cascade, parent, local, expected) => {
            render(
                <Form enableValidation={parent}>
                    <Control
                        data-testid='control'
                        
                        cascadeValidation={cascade}
                        enableValidation={local}
                    />
                </Form>
            );
            
            expect(screen.getByTestId('control')).toHaveAttribute('data-enable-validation', `${expected}`);
        }
    );
    
    test('Control responds to dynamic changes in parent enableValidation', async () => {
        const resultRef = renderHook(() => useRef<ResolvedValidationState | null>(null)).result.current;
        
        const { rerender } = render(
            <Form enableValidation={true}>
                <Control data-testid='control' resultRef={resultRef} />
            </Form>
        );
        
        expect(resultRef.current).toMatchObject({
            enableValidation : true,
            isValid          : 'auto',
        } satisfies ResolvedValidationState);
        const control = screen.getByTestId('control');
        expect(control).toHaveAttribute('data-enable-validation', 'true');
        expect(control).toHaveAttribute('data-is-valid', 'null'); // 'auto' => internally resolved to `null`
        
        rerender(
            <Form enableValidation={false}>
                <Control data-testid='control' resultRef={resultRef} />
            </Form>
        );
        
        expect(resultRef.current).toMatchObject({
            enableValidation : false,
            isValid          : null,
        } satisfies ResolvedValidationState);
        const control2 = screen.getByTestId('control');
        expect(control2).toHaveAttribute('data-enable-validation', 'false');
        expect(control2).toHaveAttribute('data-is-valid', 'null');
    });
    
    test('Control resolves to null when all `isValid` props are null or auto', () => {
        const resultRef = renderHook(() => useRef<ResolvedValidationState | null>(null)).result.current;
        
        render(
            <Form isValid={null}>
                <Control data-testid='control' isValid='inherit' resultRef={resultRef} />
            </Form>
        );
        
        expect(resultRef.current).toMatchObject({
            enableValidation : true,
            isValid          : null,
        } satisfies ResolvedValidationState);
        const control = screen.getByTestId('control');
        expect(control).toHaveAttribute('data-enable-validation', 'true');
        expect(control).toHaveAttribute('data-is-valid', 'null');
    });
    
    test('Control resolves to false when all `isValid` props are null or auto', () => {
        const resultRef = renderHook(() => useRef<ResolvedValidationState | null>(null)).result.current;
        
        render(
            <Form isValid={false}>
                <Control data-testid='control' isValid='inherit' resultRef={resultRef} />
            </Form>
        );
        
        expect(resultRef.current).toMatchObject({
            enableValidation : true,
            isValid          : false,
        } satisfies ResolvedValidationState);
        const control = screen.getByTestId('control');
        expect(control).toHaveAttribute('data-enable-validation', 'true');
        expect(control).toHaveAttribute('data-is-valid', 'false');
    });
    
    test('Control resolves to true when all `isValid` props are null or auto', () => {
        const resultRef = renderHook(() => useRef<ResolvedValidationState | null>(null)).result.current;
        
        render(
            <Form isValid={true}>
                <Control data-testid='control' isValid='inherit' resultRef={resultRef} />
            </Form>
        );
        
        expect(resultRef.current).toMatchObject({
            enableValidation : true,
            isValid          : true,
        } satisfies ResolvedValidationState);
        const control = screen.getByTestId('control');
        expect(control).toHaveAttribute('data-enable-validation', 'true');
        expect(control).toHaveAttribute('data-is-valid', 'true');
    });
});
