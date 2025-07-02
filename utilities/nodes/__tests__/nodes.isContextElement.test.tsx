import {
    isContextElement,
} from '../dist/index.js'
import {
    // Types:
    type ReactNode,
    type ReactElement,
    type JSXElementConstructor,
    type ProviderProps,
    
    
    
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



test('should return true for React Context element', () => {
    expect(isContextElement(<FooContext.Provider value={{ booh: 456 }}>foo</FooContext.Provider>)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyElement = <FooContext.Provider value={{ booh: 456 }}>foo</FooContext.Provider> as unknown as ReactNode;
    if (isContextElement(anyElement)) {
        // @ts-ignore
        const test =
            anyElement satisfies ReactElement<ProviderProps<unknown>, JSXElementConstructor<ProviderProps<unknown>>>;
        
        expect(test.props.value).toMatchObject({
            booh: 456,
        });
        expect(test.props.children).toBe('foo');
    } // if
});

test('should return false for normal functional component', () => {
    const NormalComponent = () => <div>Hello</div>;
    expect(isContextElement(<NormalComponent />)).toBe(false);
});

test('should return false for native HTML element', () => {
    expect(isContextElement(<div />)).toBe(false);
});

test('should return false for forwardRef element', () => {
    const ForwardRefComponent = React.forwardRef<HTMLInputElement | null>((props, ref) => <input {...props} ref={ref} />);
    expect(isContextElement(<ForwardRefComponent />)).toBe(false);
});

test('should return false for React Fragment element', () => {
    expect(isContextElement(<></>)).toBe(false);
});

test('should return false for null, undefined, and boolean values', () => {
    expect(isContextElement(null)).toBe(false);
    expect(isContextElement(undefined)).toBe(false);
    expect(isContextElement(true)).toBe(false);
    expect(isContextElement(false)).toBe(false);
});
