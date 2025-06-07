import {
    isFragment,
} from '../dist/index.js'
import {
    // Types:
    type ReactNode,
    type ReactElement,
    type JSXElementConstructor,
    type FragmentProps,
    
    
    
    // React:
    default as React,
} from 'react'



test('should return true for React Fragment', () => {
    expect(isFragment(<></>)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyComponent = <></> as unknown as ReactNode;
    if (isFragment(anyComponent)) {
        // @ts-ignore
        const test =
            anyComponent satisfies ReactElement<FragmentProps, JSXElementConstructor<FragmentProps>>;
    } // if
});

test('should return false for normal functional component', () => {
    const NormalComponent = () => <div>Hello</div>;
    expect(isFragment(<NormalComponent />)).toBe(false);
});

test('should return false for native HTML element', () => {
    expect(isFragment(<div />)).toBe(false);
});

test('should return false for forwardRef component', () => {
    const ForwardRefComponent = React.forwardRef<HTMLInputElement | null>((props, ref) => <input {...props} ref={ref} />);
    expect(isFragment(<ForwardRefComponent />)).toBe(false);
});

test('should return false for null, undefined, and boolean values', () => {
    expect(isFragment(null)).toBe(false);
    expect(isFragment(undefined)).toBe(false);
    expect(isFragment(true)).toBe(false);
    expect(isFragment(false)).toBe(false);
});
