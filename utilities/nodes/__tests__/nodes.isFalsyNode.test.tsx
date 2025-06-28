import {
    isFalsyNode,
} from '../dist/index.js'
import {
    // Types:
    type ReactNode,
    
    
    
    // React:
    default as React,
} from 'react'



test('should return true for null, undefined, and boolean values', () => {
    expect(isFalsyNode(null)).toBe(true);
    expect(isFalsyNode(undefined)).toBe(true);
    expect(isFalsyNode(true)).toBe(true);
    expect(isFalsyNode(false)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyElement1 = null as unknown as ReactNode;
    if (isFalsyNode(anyElement1)) {
        // @ts-ignore
        const test =
            anyElement1 satisfies Extract<typeof anyElement1, undefined | null | boolean>;
    } // if
    
    const anyElement2 = undefined as unknown as ReactNode;
    if (isFalsyNode(anyElement2)) {
        // @ts-ignore
        const test =
            anyElement2 satisfies Extract<typeof anyElement2, undefined | null | boolean>;
    } // if
    
    const anyElement3 = true as unknown as ReactNode;
    if (isFalsyNode(anyElement3)) {
        // @ts-ignore
        const test =
            anyElement3 satisfies Extract<typeof anyElement3, undefined | null | boolean>;
    } // if
    
    const anyElement4 = false as unknown as ReactNode;
    if (isFalsyNode(anyElement4)) {
        // @ts-ignore
        const test =
            anyElement4 satisfies Extract<typeof anyElement4, undefined | null | boolean>;
    } // if
});

test('should return false for valid React elements', () => {
    expect(isFalsyNode(<div>Hello</div>)).toBe(false);
    expect(isFalsyNode(<span>World</span>)).toBe(false);
});

test('should return false for functional components', () => {
    const NormalComponent = () => <div>Functional Component</div>;
    expect(isFalsyNode(<NormalComponent />)).toBe(false);
});

test('should return false for text nodes', () => {
    expect(isFalsyNode('Hello')).toBe(false);
    expect(isFalsyNode(42)).toBe(false);
});

test('should return false for non-empty fragments', () => {
    expect(isFalsyNode(<><div>Fragment Content</div></>)).toBe(false);
});
