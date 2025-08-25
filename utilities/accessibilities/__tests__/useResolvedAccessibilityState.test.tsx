import {
    type ReactNode,
    type RefObject,
    default as React,
    useRef,
} from 'react'

import {
    type AccessibilityProps,
    type ResolvedAccessibilityState,
    useResolvedAccessibilityState,
    AccessibilityProvider,
} from '../dist/index.js'

import { render, renderHook, screen } from '@testing-library/react'
import '@testing-library/jest-dom'



interface ControlProps extends AccessibilityProps {
    children ?: ReactNode
    resultRef ?: RefObject<ResolvedAccessibilityState | null>
}
const Control = (props: ControlProps) => {
    const {
        disabled,
        readOnly,
        active,
        
        cascadeDisabled,
        cascadeReadOnly,
        cascadeActive,
        
        resultRef,
        
        children,
        
        ...restProps
    } = props;
    
    const resolvedAccessibilityState = useResolvedAccessibilityState({
        disabled,
        readOnly,
        active,
        
        cascadeDisabled,
        cascadeReadOnly,
        cascadeActive,
    });
    const {
        disabled : resolvedDisabled,
        readOnly : resolvedReadOnly,
        active   : resolvedActive,
    } = resolvedAccessibilityState;
    if (resultRef) resultRef.current = resolvedAccessibilityState;
    
    
    
    return (
        <div
            {...restProps}
            
            data-disabled = {resolvedDisabled || undefined}
            data-readonly = {resolvedReadOnly || undefined}
            data-active   = {resolvedActive   || undefined}
        >
            <AccessibilityProvider
                disabled={resolvedDisabled}
                readOnly={resolvedReadOnly}
                active={resolvedActive}
            >
                {children}
            </AccessibilityProvider>
        </div>
    );
};



describe('Accessibility resolution across nesting levels', () => {
    const createResultRef = () => renderHook(() => useRef<ResolvedAccessibilityState | null>(null)).result.current;
    
    test('single level: no accessibility props', () => {
        const resultRef = createResultRef();
        render(<Control
            data-testid='control'
            resultRef={resultRef}
        >test</Control>);
        const element = screen.getByTestId('control');
        expect(element).not.toHaveAttribute('data-disabled');
        expect(element).not.toHaveAttribute('data-readonly');
        expect(element).not.toHaveAttribute('data-active');
        expect(resultRef.current).toMatchObject({
            disabled : false,
            readOnly : false,
            active   : false,
        } satisfies ResolvedAccessibilityState);
    });
    
    test('dual nested: outer disabled=true, inner disabled=false + cascadeDisabled=true → resolved disabled=true', () => {
        const outerRef = createResultRef();
        const innerRef = createResultRef();
        render(
            <Control data-testid='outer' disabled={true} resultRef={outerRef}>
                <Control data-testid='inner' disabled={false} cascadeDisabled={true} resultRef={innerRef}>
                    inner
                </Control>
            </Control>
        );
        expect(screen.getByTestId('outer')).toHaveAttribute('data-disabled', 'true');
        expect(screen.getByTestId('inner')).toHaveAttribute('data-disabled', 'true');
        expect(innerRef.current).toMatchObject({ disabled: true });
    });
    
    test('dual nested: inner disables cascading → override parent readonly', () => {
        const outerRef = createResultRef();
        const innerRef = createResultRef();
        render(
            <Control data-testid='outer' readOnly={true} resultRef={outerRef}>
                <Control data-testid='inner' readOnly={false} cascadeReadOnly={false} resultRef={innerRef}>
                    inner
                </Control>
            </Control>
        );
        expect(screen.getByTestId('outer')).toHaveAttribute('data-readonly', 'true');
        expect(screen.getByTestId('inner')).not.toHaveAttribute('data-readonly');
        expect(innerRef.current).toMatchObject({ readOnly: false });
    });
    
    test('triple nested: all inherit, only top is disabled → all disabled', () => {
        const rootRef = createResultRef();
        const midRef = createResultRef();
        const leafRef = createResultRef();
        render(
            <Control data-testid='root' disabled={true} resultRef={rootRef}>
                <Control data-testid='middle' resultRef={midRef}>
                    <Control data-testid='leaf' resultRef={leafRef}>leaf</Control>
                </Control>
            </Control>
        );
        expect(rootRef.current).toMatchObject({ disabled: true });
        expect(midRef.current).toMatchObject({ disabled: true });
        expect(leafRef.current).toMatchObject({ disabled: true });
        expect(screen.getByTestId('root')).toHaveAttribute('data-disabled', 'true');
        expect(screen.getByTestId('middle')).toHaveAttribute('data-disabled', 'true');
        expect(screen.getByTestId('leaf')).toHaveAttribute('data-disabled', 'true');
    });
    
    test('triple nested: all inherit, only top is readOnly → all readOnly', () => {
        const rootRef = createResultRef();
        const midRef = createResultRef();
        const leafRef = createResultRef();
        render(
            <Control data-testid='root' readOnly={true} resultRef={rootRef}>
                <Control data-testid='middle' resultRef={midRef}>
                    <Control data-testid='leaf' resultRef={leafRef}>leaf</Control>
                </Control>
            </Control>
        );
        expect(rootRef.current).toMatchObject({ readOnly: true });
        expect(midRef.current).toMatchObject({ readOnly: true });
        expect(leafRef.current).toMatchObject({ readOnly: true });
        expect(screen.getByTestId('root')).toHaveAttribute('data-readonly', 'true');
        expect(screen.getByTestId('middle')).toHaveAttribute('data-readonly', 'true');
        expect(screen.getByTestId('leaf')).toHaveAttribute('data-readonly', 'true');
    });
    
    test('triple nested: middle disables disabled propagation → leaf remains enabled', () => {
        const rootRef = createResultRef();
        const midRef = createResultRef();
        const leafRef = createResultRef();
        render(
            <Control data-testid='root' disabled={true} resultRef={rootRef}>
                <Control data-testid='middle' cascadeDisabled={false} resultRef={midRef}>
                    <Control data-testid='leaf' resultRef={leafRef}>leaf</Control>
                </Control>
            </Control>
        );
        expect(rootRef.current).toMatchObject({ disabled: true });
        expect(midRef.current).toMatchObject({ disabled: false });
        expect(leafRef.current).toMatchObject({ disabled: false });
        expect(screen.getByTestId('root')).toHaveAttribute('data-disabled', 'true');
        expect(screen.getByTestId('middle')).not.toHaveAttribute('data-disabled');
        expect(screen.getByTestId('leaf')).not.toHaveAttribute('data-disabled');
    });
    
    test('triple nested: middle disables readOnly propagation → leaf remains editable', () => {
        const rootRef = createResultRef();
        const midRef = createResultRef();
        const leafRef = createResultRef();
        render(
            <Control data-testid='root' readOnly={true} resultRef={rootRef}>
                <Control data-testid='middle' cascadeReadOnly={false} resultRef={midRef}>
                    <Control data-testid='leaf' resultRef={leafRef}>leaf</Control>
                </Control>
            </Control>
        );
        expect(rootRef.current).toMatchObject({ readOnly: true });
        expect(midRef.current).toMatchObject({ readOnly: false });
        expect(leafRef.current).toMatchObject({ readOnly: false });
        expect(screen.getByTestId('root')).toHaveAttribute('data-readonly', 'true');
        expect(screen.getByTestId('middle')).not.toHaveAttribute('data-readonly');
        expect(screen.getByTestId('leaf')).not.toHaveAttribute('data-readonly');
    });
    
    test('triple nested: middle disables active propagation → leaf remains inactive', () => {
        const rootRef = createResultRef();
        const midRef = createResultRef();
        const leafRef = createResultRef();
        render(
            <Control data-testid='root' active={true} resultRef={rootRef}>
                <Control data-testid='middle' cascadeActive={false} resultRef={midRef}>
                    <Control data-testid='leaf' resultRef={leafRef}>leaf</Control>
                </Control>
            </Control>
        );
        expect(rootRef.current).toMatchObject({ active: true });
        expect(midRef.current).toMatchObject({ active: false });
        expect(leafRef.current).toMatchObject({ active: false });
        expect(screen.getByTestId('root')).toHaveAttribute('data-active', 'true');
        expect(screen.getByTestId('middle')).not.toHaveAttribute('data-active');
        expect(screen.getByTestId('leaf')).not.toHaveAttribute('data-active');
    });
    
    test('single level: disabled locally with cascade off → remains disabled', () => {
        const ref = renderHook(() => useRef(null)).result.current;
        render(<Control data-testid="control" disabled={true} cascadeDisabled={false} resultRef={ref}>x</Control>);
        expect(screen.getByTestId('control')).toHaveAttribute('data-disabled', 'true');
        expect(ref.current).toMatchObject({ disabled: true });
    });
    
    test('dual nested: parent disabled → child inherits via cascade', () => {
        const ref = renderHook(() => useRef(null)).result.current;
        render(
            <Control disabled={true} data-testid="outer">
                <Control data-testid="inner" resultRef={ref}>x</Control>
            </Control>
        );
        expect(screen.getByTestId('inner')).toHaveAttribute('data-disabled', 'true');
        expect(ref.current).toMatchObject({ disabled: true });
    });
    
    test('dual nested: parent readOnly → child inherits via cascade', () => {
        const ref = renderHook(() => useRef(null)).result.current;
        render(
            <Control readOnly={true} data-testid="outer">
                <Control resultRef={ref} data-testid="inner">x</Control>
            </Control>
        );
        expect(screen.getByTestId('inner')).toHaveAttribute('data-readonly', 'true');
        expect(ref.current).toMatchObject({ readOnly: true });
    });
    
    test('dual nested: parent active → child not inherits via cascade', () => {
        const ref = renderHook(() => useRef(null)).result.current;
        render(
            <Control active={true} data-testid="outer">
                <Control resultRef={ref} data-testid="inner">x</Control>
            </Control>
        );
        expect(screen.getByTestId('inner')).not.toHaveAttribute('data-active');
        expect(ref.current).toMatchObject({ active: false });
    });
    
    test('dual nested: parent active → child inherits via forced cascade', () => {
        const ref = renderHook(() => useRef(null)).result.current;
        render(
            <Control active={true} data-testid="outer">
                <Control cascadeActive={true} resultRef={ref} data-testid="inner">x</Control>
            </Control>
        );
        expect(screen.getByTestId('inner')).toHaveAttribute('data-active', 'true');
        expect(ref.current).toMatchObject({ active: true });
    });
    
    test('dual nested: parent readOnly=true, child readOnly=false → parent wins', () => {
        const ref = renderHook(() => useRef(null)).result.current;
        render(
            <Control readOnly={true} data-testid="outer">
                <Control readOnly={false} data-testid="child" resultRef={ref}>x</Control>
            </Control>
        );
        expect(screen.getByTestId('child')).toHaveAttribute('data-readonly', 'true');
        expect(ref.current).toMatchObject({ readOnly: true });
    });
    
    test('dual nested: parent active=true, child active=false → parent wins', () => {
        const ref = renderHook(() => useRef(null)).result.current;
        render(
            <Control active={true} data-testid="outer">
                <Control active={false} cascadeActive={true} data-testid="inner" resultRef={ref}>x</Control>
            </Control>
        );
        expect(screen.getByTestId('inner')).toHaveAttribute('data-active', 'true');
        expect(ref.current).toMatchObject({ active: true });
    });
    
    test('leaf active + cascadeActive=false → resolves locally, ignores parent', () => {
        const ref = renderHook(() => useRef<ResolvedAccessibilityState | null>(null)).result.current;
        render(
            <Control active={true}>
                <Control active={false} cascadeActive={false}>
                    <Control active={true} cascadeActive={false} data-testid="leaf" resultRef={ref}>
                        leaf
                    </Control>
                </Control>
            </Control>
        );
        expect(screen.getByTestId('leaf')).toHaveAttribute('data-active', 'true');
        expect(ref.current).toMatchObject({ active: true });
    });
    
    test('middle disables cascadeDisabled → leaf breaks from ancestor disabled', () => {
        const ref = renderHook(() => useRef<ResolvedAccessibilityState | null>(null)).result.current;
        render(
            <Control disabled={true}>
                <Control cascadeDisabled={false}>
                    <Control data-testid="leaf" resultRef={ref}>leaf</Control>
                </Control>
            </Control>
        );
        expect(screen.getByTestId('leaf')).not.toHaveAttribute('data-disabled');
        expect(ref.current).toMatchObject({ disabled: false });
    });
    
    test('readOnly cascade confirmed even if both parent and self are readOnly=true', () => {
        const ref = renderHook(() => useRef<ResolvedAccessibilityState | null>(null)).result.current;
        render(
            <Control readOnly={true}>
                <Control readOnly={true} data-testid="inner" resultRef={ref}>
                    inner
                </Control>
            </Control>
        );
        expect(screen.getByTestId('inner')).toHaveAttribute('data-readonly', 'true');
        expect(ref.current).toMatchObject({ readOnly: true });
    });
    
    test('child with no props inside disabled+readOnly parent → inherits all', () => {
        const ref = renderHook(() => useRef<ResolvedAccessibilityState | null>(null)).result.current;
        render(
            <Control disabled={true} readOnly={true}>
                <Control data-testid="child" resultRef={ref}>child</Control>
            </Control>
        );
        const el = screen.getByTestId('child');
        expect(el).toHaveAttribute('data-disabled', 'true');
        expect(el).toHaveAttribute('data-readonly', 'true');
        expect(ref.current).toMatchObject({ disabled: true, readOnly: true });
    });
    
    test('no active provided and cascade disabled → remains inactive', () => {
        const ref = renderHook(() => useRef(null)).result.current;
        render(<Control cascadeActive={false} data-testid="item" resultRef={ref}>x</Control>);
        expect(screen.getByTestId('item')).not.toHaveAttribute('data-active');
        expect(ref.current).toMatchObject({ active: false });
    });
    
    test('both ancestor and child disabled, cascade=true → resolved disabled', () => {
        const ref = renderHook(() => useRef(null)).result.current;
        render(
            <Control disabled={true}>
                <Control disabled={true} data-testid="child" resultRef={ref}>x</Control>
            </Control>
        );
        expect(screen.getByTestId('child')).toHaveAttribute('data-disabled', 'true');
        expect(ref.current).toMatchObject({ disabled: true });
    });
    
    test('deep tree: cascade disabled, leaf uses local props only', () => {
        const ref = renderHook(() => useRef(null)).result.current;
        render(
            <Control disabled={true} readOnly={true} active={true}>
                <Control disabled={true} readOnly={true} active={true}>
                    <Control
                        disabled={false}
                        readOnly={false}
                        active={false}
                        
                        cascadeDisabled={false}
                        cascadeReadOnly={false}
                        cascadeActive={false}
                        
                        resultRef={ref}
                        data-testid="leaf"
                    >
                        x
                    </Control>
                </Control>
            </Control>
        );
        const el = screen.getByTestId('leaf');
        expect(el).not.toHaveAttribute('data-disabled');
        expect(el).not.toHaveAttribute('data-readonly');
        expect(el).not.toHaveAttribute('data-active');
        expect(ref.current).toMatchObject({
            disabled: false,
            readOnly: false,
            active: false,
        });
    });
    
    test('two siblings: one in disabled tree, one not → only affected subtree resolves', () => {
        const aRef = renderHook(() => useRef(null)).result.current;
        const bRef = renderHook(() => useRef(null)).result.current;
        render(
            <>
                <Control disabled={true}>
                    <Control resultRef={aRef} data-testid="branchA">A</Control>
                </Control>
                <Control resultRef={bRef} data-testid="branchB">B</Control>
            </>
        );
        expect(screen.getByTestId('branchA')).toHaveAttribute('data-disabled', 'true');
        expect(screen.getByTestId('branchB')).not.toHaveAttribute('data-disabled');
        expect(aRef).toMatchObject({ current: { disabled: true } });
        expect(bRef).toMatchObject({ current: { disabled: false } });
    });
});
