import {
    isForwardRefElement,
} from '../dist/index.js'
import {
    // Types:
    type ReactNode,
    type ReactElement,
    type JSXElementConstructor,
    type PropsWithoutRef,
    type RefAttributes,
    
    
    
    // React:
    default as React,
    
    
    
    // Utilities:
    forwardRef,
} from 'react'



test('should return true for forwardRef element', () => {
    const ForwardRefComponent = forwardRef<HTMLInputElement | null>((props, ref) => <input {...props} ref={ref} />);
    expect(isForwardRefElement(<ForwardRefComponent />)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyElement = ForwardRefComponent as unknown as ReactNode;
    if (isForwardRefElement(anyElement)) {
        // @ts-ignore
        const test =
            anyElement satisfies ReactElement<PropsWithoutRef<unknown> & RefAttributes<unknown>, JSXElementConstructor<PropsWithoutRef<unknown> & RefAttributes<unknown>>>;
    } // if
});

test('should return false for normal functional component', () => {
    const NormalComponent = () => <div>Hello</div>;
    expect(isForwardRefElement(<NormalComponent />)).toBe(false);
});

test('should return false for native HTML element', () => {
    expect(isForwardRefElement(<div />)).toBe(false);
});

test('should return false for React Fragment element', () => {
    expect(isForwardRefElement(<></>)).toBe(false);
});

test('should return false for null, undefined, and boolean values', () => {
    expect(isForwardRefElement(null)).toBe(false);
    expect(isForwardRefElement(undefined)).toBe(false);
    expect(isForwardRefElement(true)).toBe(false);
    expect(isForwardRefElement(false)).toBe(false);
});
