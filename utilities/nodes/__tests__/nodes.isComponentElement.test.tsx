import {
    isComponentElement,
} from '../dist/index.js'
import {
    // Types:
    type ReactNode,
    type ReactElement,
    type JSXElementConstructor,
    
    
    
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



test('should return true for normal functional component', () => {
    const NormalComponent = () => <div>Hello</div>;
    expect(isComponentElement(<NormalComponent />)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyElement = NormalComponent as unknown as ReactNode;
    if (isComponentElement(anyElement)) {
        // @ts-ignore
        const test =
            anyElement satisfies ReactElement<unknown, JSXElementConstructor<unknown>>;
    } // if
});

test('should return false for native HTML elements', () => {
    expect(isComponentElement(<div />)).toBe(false);
    expect(isComponentElement(<input type='text' aria-label='Name' />)).toBe(false);
    expect(isComponentElement(<button type='button' aria-label='Button' />)).toBe(false);
});

test('should return false for forwardRef element', () => {
    const ForwardRefComponent = React.forwardRef<HTMLInputElement | null>((props, ref) => <input {...props} ref={ref} />);
    expect(isComponentElement(<ForwardRefComponent />)).toBe(false);
});

test('should return false for React Fragment element', () => {
    expect(isComponentElement(<></>)).toBe(false);
});

test('should return false for React Context element', () => {
    expect(isComponentElement(<FooContext.Provider value={{ booh: 456 }}>foo</FooContext.Provider>)).toBe(false);
});

test('should return false for null, undefined, and boolean values', () => {
    expect(isComponentElement(null)).toBe(false);
    expect(isComponentElement(undefined)).toBe(false);
    expect(isComponentElement(true)).toBe(false);
    expect(isComponentElement(false)).toBe(false);
});
