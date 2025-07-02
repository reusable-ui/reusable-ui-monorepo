import {
    isDOMElement,
} from '../dist/index.js'
import {
    // Types:
    type ReactNode,
    type ReactElement,
    
    
    
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



test('should return true for native HTML elements', () => {
    const DOMElement = <div>Hello</div>;
    expect(isDOMElement(DOMElement)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyElement = DOMElement as unknown as ReactNode;
    if (isDOMElement(anyElement)) {
        // @ts-ignore
        const test =
            anyElement satisfies ReactElement<unknown, string>;
    } // if
    
    
    
    expect(isDOMElement(<div />)).toBe(true);
    expect(isDOMElement(<input type='text' aria-label='Name' />)).toBe(true);
    expect(isDOMElement(<button type='button' aria-label='Button' />)).toBe(true);
});

test('should return false for normal functional component', () => {
    const NormalComponent = () => <div>Hello</div>;
    expect(isDOMElement(<NormalComponent />)).toBe(false);
});

test('should return false for forwardRef element', () => {
    const ForwardRefComponent = React.forwardRef<HTMLInputElement | null>((props, ref) => <input {...props} ref={ref} />);
    expect(isDOMElement(<ForwardRefComponent />)).toBe(false);
});

test('should return false for React Fragment element', () => {
    expect(isDOMElement(<></>)).toBe(false);
});

test('should return false for React Context element', () => {
    expect(isDOMElement(<FooContext.Provider value={{ booh: 456 }}>foo</FooContext.Provider>)).toBe(false);
});

test('should return false for null, undefined, and boolean values', () => {
    expect(isDOMElement(null)).toBe(false);
    expect(isDOMElement(undefined)).toBe(false);
    expect(isDOMElement(true)).toBe(false);
    expect(isDOMElement(false)).toBe(false);
});
