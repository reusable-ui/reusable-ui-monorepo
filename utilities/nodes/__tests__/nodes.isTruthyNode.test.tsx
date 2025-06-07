import {
    isTruthyNode,
} from '../dist/index.js'
import {
    // Types:
    type ReactNode,
    
    
    
    // React:
    default as React,
} from 'react'



test('should return true for valid React elements', () => {
    expect(isTruthyNode(<div>Hello</div>)).toBe(true);
    expect(isTruthyNode(<span>World</span>)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyComponent = <div>Hello</div> as unknown as ReactNode;
    if (isTruthyNode(anyComponent)) {
        // @ts-ignore
        const test =
            anyComponent satisfies Exclude<typeof anyComponent, undefined | null | boolean>;
    } // if
});

test('should return true for functional components', () => {
    const NormalComponent = () => <div>Functional Component</div>;
    expect(isTruthyNode(<NormalComponent />)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyComponent = NormalComponent as unknown as ReactNode;
    if (isTruthyNode(anyComponent)) {
        // @ts-ignore
        const test =
            anyComponent satisfies Exclude<typeof anyComponent, undefined | null | boolean>;
    } // if
});

test('should return true for text nodes', () => {
    expect(isTruthyNode('Hello')).toBe(true);
    expect(isTruthyNode(42)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyComponent1 = 'Hello' as unknown as ReactNode;
    if (isTruthyNode(anyComponent1)) {
        // @ts-ignore
        const test =
            anyComponent1 satisfies Exclude<typeof anyComponent1, undefined | null | boolean>;
    } // if
    
    const anyComponent2 = 123 as unknown as ReactNode;
    if (isTruthyNode(anyComponent2)) {
        // @ts-ignore
        const test =
            anyComponent2 satisfies Exclude<typeof anyComponent2, undefined | null | boolean>;
    } // if
});

test('should return true for empty fragments', () => {
    expect(isTruthyNode(<></>)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyComponent = <></> as unknown as ReactNode;
    if (isTruthyNode(anyComponent)) {
        // @ts-ignore
        const test =
            anyComponent satisfies Exclude<typeof anyComponent, undefined | null | boolean>;
    } // if
});

test('should return false for null, undefined, and boolean values', () => {
    expect(isTruthyNode(null)).toBe(false);
    expect(isTruthyNode(undefined)).toBe(false);
    expect(isTruthyNode(true)).toBe(false);
    expect(isTruthyNode(false)).toBe(false);
});
