import {
    isTruthyNode,
} from '../dist/index.js'
import {
    // Types:
    type ReactNode,
    
    
    
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



test('should return true for valid React elements', () => {
    expect(isTruthyNode(<div>Hello</div>)).toBe(true);
    expect(isTruthyNode(<span>World</span>)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyElement = <div>Hello</div> as unknown as ReactNode;
    if (isTruthyNode(anyElement)) {
        // @ts-ignore
        const test =
            anyElement satisfies Exclude<typeof anyElement, undefined | null | boolean>;
    } // if
});

test('should return true for functional components', () => {
    const NormalComponent = () => <div>Functional Component</div>;
    expect(isTruthyNode(<NormalComponent />)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyElement = NormalComponent as unknown as ReactNode;
    if (isTruthyNode(anyElement)) {
        // @ts-ignore
        const test =
            anyElement satisfies Exclude<typeof anyElement, undefined | null | boolean>;
    } // if
});

test('should return true for text nodes', () => {
    expect(isTruthyNode('Hello')).toBe(true);
    expect(isTruthyNode(42)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyElement1 = 'Hello' as unknown as ReactNode;
    if (isTruthyNode(anyElement1)) {
        // @ts-ignore
        const test =
            anyElement1 satisfies Exclude<typeof anyElement1, undefined | null | boolean>;
    } // if
    
    const anyElement2 = 123 as unknown as ReactNode;
    if (isTruthyNode(anyElement2)) {
        // @ts-ignore
        const test =
            anyElement2 satisfies Exclude<typeof anyElement2, undefined | null | boolean>;
    } // if
});

test('should return true for empty fragments', () => {
    expect(isTruthyNode(<></>)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyElement = <></> as unknown as ReactNode;
    if (isTruthyNode(anyElement)) {
        // @ts-ignore
        const test =
            anyElement satisfies Exclude<typeof anyElement, undefined | null | boolean>;
    } // if
});

test('should return true for React Context element', () => {
    expect(isTruthyNode(<FooContext.Provider value={{ booh: 456 }}>foo</FooContext.Provider>)).toBe(true);
});

test('should return false for null, undefined, and boolean values', () => {
    expect(isTruthyNode(null)).toBe(false);
    expect(isTruthyNode(undefined)).toBe(false);
    expect(isTruthyNode(true)).toBe(false);
    expect(isTruthyNode(false)).toBe(false);
});
