import {
    flattenChildren,
} from '../dist/index.js'
import {
    // React:
    default as React,
} from 'react'



// Utility function to compare two arrays of React nodes:
const compareNodes = (result: React.ReactNode[], expected: React.ReactNode[]) => {
    expect(result).toHaveLength(expected.length); // Validate item count
    
    result.forEach((node, index) => {
        const expectedNode = expected[index];
        
        // Recursively compare arrays
        if (Array.isArray(node) && Array.isArray(expectedNode)) {
            compareNodes(node, expectedNode);
        } else if (React.isValidElement<unknown>(node) && React.isValidElement<unknown>(expectedNode)) {
            // Compare `type` directly
            expect(node.type).toEqual(expectedNode.type);
            
            type ReactElement = {
                key: string | number | bigint | null | undefined
                [propName: string]: any
            }
            
            // Compare props deeply, excluding `key`
            const { key: nodeKey, ...nodeProps } = node.props as ReactElement;
            const { key: expectedKey, ...expectedProps } = expectedNode.props as ReactElement;
            expect(Object.keys(nodeProps)).toEqual(Object.keys(expectedProps)); // Ensure same props
            Object.keys(nodeProps).forEach(prop => {
                expect(nodeProps[prop]).toEqual(expectedProps[prop]); // Compare individual props
            });
        } else {
            // Directly compare non-React elements
            expect(node).toEqual(expectedNode);
        }
    });
};




// Define test nodes:
const divNode = <div>Hello</div>;
const spanNode = <span>World</span>;
const pNode = <p>Nested</p>;
const h1Node = <h1>Title</h1>;
const buttonNode = <button>Click Me</button>;



test('should handle a simple array of elements', () => {
    const children = [divNode, spanNode];
    const result = flattenChildren(children);
    compareNodes(result, children);
});

test('should handle a simple fragment', () => {
    const children = (
        <>
            {divNode}
            {spanNode}
        </>
    );
    const expected = [divNode, spanNode];
    compareNodes(flattenChildren(children), expected);
});

test('should handle deeply nested arrays', () => {
    const children = [
        [divNode, [spanNode]],
        pNode,
    ];
    const expected = [divNode, spanNode, pNode];
    compareNodes(flattenChildren(children), expected);
});

test('should handle deeply nested fragments', () => {
    const children = (
        <>
            {divNode}
            <>
                {spanNode}
                <>
                    {pNode}
                </>
            </>
        </>
    );
    const expected = [divNode, spanNode, pNode];
    compareNodes(flattenChildren(children), expected);
});

test('should handle deep mixed cases', () => {
    const children = [
        <>
            {h1Node}
            <>
                {divNode}
                {spanNode}
            </>
        </>,
        [buttonNode],
    ];
    const expected = [h1Node, divNode, spanNode, buttonNode];
    compareNodes(flattenChildren(children), expected);
});

// Test deep nesting with fragments inside arrays and vice versa
test('should handle deeply nested arrays within fragments', () => {
    const children = (
        <>
            {[divNode, [spanNode, pNode]]}
            <section>End</section>
        </>
    );
    const expected = [divNode, spanNode, pNode, <section>End</section>];
    compareNodes(flattenChildren(children), expected);
});

test('should handle deeply nested fragments within arrays', () => {
    const children = [
        <>
            {h1Node}
            <>
                {divNode}
                <>
                    {spanNode}
                    <footer>Footer</footer>
                </>
            </>
        </>,
        [buttonNode],
    ];
    const expected = [h1Node, divNode, spanNode, <footer>Footer</footer>, buttonNode];
    compareNodes(flattenChildren(children), expected);
});

test('should handle deeply mixed fragments and arrays recursively', () => {
    const children = [
        <header>Start</header>,
        <>
            {[<>
                {divNode}
                <>
                    {spanNode}
                    {[pNode, h1Node]}
                </>
            </>]}
            <>
                <nav>Menu</nav>
            </>
        </>,
    ];
    const expected = [<header>Start</header>, divNode, spanNode, pNode, h1Node, <nav>Menu</nav>];
    compareNodes(flattenChildren(children), expected);
});
