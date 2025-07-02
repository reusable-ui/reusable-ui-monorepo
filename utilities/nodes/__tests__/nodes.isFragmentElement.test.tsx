import {
    isFragmentElement,
} from '../dist/index.js'
import {
    // Types:
    type ReactNode,
    type ReactElement,
    type JSXElementConstructor,
    type FragmentProps,
    
    
    
    // React:
    default as React,
    
    
    
    // Utilities:
    createContext,
} from 'react'



interface FooContextValue {
    booh: number
}
const FooContext = createContext<FooContextValue>({
    booh: 123,
});



test('should return true for React Fragment element', () => {
    expect(isFragmentElement(<></>)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyElement = <></> as unknown as ReactNode;
    if (isFragmentElement(anyElement)) {
        // @ts-ignore
        const test =
            anyElement satisfies ReactElement<FragmentProps, JSXElementConstructor<FragmentProps>>;
    } // if
});

test('should return false for normal functional component', () => {
    const NormalComponent = () => <div>Hello</div>;
    expect(isFragmentElement(<NormalComponent />)).toBe(false);
});

test('should return false for native HTML element', () => {
    expect(isFragmentElement(<div />)).toBe(false);
});

test('should return false for forwardRef element', () => {
    const ForwardRefComponent = React.forwardRef<HTMLInputElement | null>((props, ref) => <input {...props} ref={ref} />);
    expect(isFragmentElement(<ForwardRefComponent />)).toBe(false);
});

test('should return false for React Context element', () => {
    expect(isFragmentElement(<FooContext.Provider value={{ booh: 456 }}>foo</FooContext.Provider>)).toBe(false);
});

test('should return false for null, undefined, and boolean values', () => {
    expect(isFragmentElement(null)).toBe(false);
    expect(isFragmentElement(undefined)).toBe(false);
    expect(isFragmentElement(true)).toBe(false);
    expect(isFragmentElement(false)).toBe(false);
});
