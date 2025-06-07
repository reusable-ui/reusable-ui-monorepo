import {
    isForwardRef,
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



test('should return true for forwardRef component', () => {
    const ForwardRefComponent = forwardRef<HTMLInputElement | null>((props, ref) => <input {...props} ref={ref} />);
    expect(isForwardRef(<ForwardRefComponent />)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyComponent = ForwardRefComponent as unknown as ReactNode;
    if (isForwardRef(anyComponent)) {
        // @ts-ignore
        const test =
            anyComponent satisfies ReactElement<PropsWithoutRef<unknown> & RefAttributes<unknown>, JSXElementConstructor<PropsWithoutRef<unknown> & RefAttributes<unknown>>>;
    } // if
});

test('should return false for normal functional component', () => {
    const NormalComponent = () => <div>Hello</div>;
    expect(isForwardRef(<NormalComponent />)).toBe(false);
});

test('should return false for native HTML element', () => {
    expect(isForwardRef(<div />)).toBe(false);
});

test('should return false for React Fragment', () => {
    expect(isForwardRef(<></>)).toBe(false);
});

test('should return false for null, undefined, and boolean values', () => {
    expect(isForwardRef(null)).toBe(false);
    expect(isForwardRef(undefined)).toBe(false);
    expect(isForwardRef(true)).toBe(false);
    expect(isForwardRef(false)).toBe(false);
});
