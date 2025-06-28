import {
    focusElementAt,
    focusFirstElement,
    focusLastElement,
    
    focusPrevElementOrWrapToLast,
    focusNextElementOrWrapToFirst,
} from '../dist/index.js'
import { JSDOM } from 'jsdom'



const getActiveTestId = () => document.activeElement?.getAttribute('data-testid');

const runFocusNavigationTest = (html: string, expectedIds: string[]) => {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const container = document.querySelector('[data-testid="container"]')!;
    // Attach the container to document to simulate focus behavior
    document.body.appendChild(container);
    // Patch globals for jsdom
    globalThis.document = document;
    globalThis.HTMLElement = dom.window.HTMLElement;
    globalThis.SVGElement = dom.window.SVGElement;
    
    
    
    // Focus each index
    expectedIds.forEach((expectedId, index) => {
        focusElementAt(container, index);
        expect(getActiveTestId()).toBe(expectedId);
    });
    
    
    
    // Focus first
    focusFirstElement(container);
    expect(getActiveTestId()).toBe(expectedIds[0]);
    
    
    
    // Focus last
    focusLastElement(container);
    expect(getActiveTestId()).toBe(expectedIds.at(-1));
    
    
    
    // Previous with wrapping
    for (let index = 0; index < expectedIds.length; index++) {
        focusElementAt(container, index);
        focusPrevElementOrWrapToLast(container);
        const prevIndex = (index - 1 + expectedIds.length) % expectedIds.length;
        expect(getActiveTestId()).toBe(expectedIds[prevIndex]);
    }
    
    
    
    // Next with wrapping
    for (let index = 0; index < expectedIds.length; index++) {
        focusElementAt(container, index);
        focusNextElementOrWrapToFirst(container);
        const nextIndex = (index + 1) % expectedIds.length;
        expect(getActiveTestId()).toBe(expectedIds[nextIndex]);
    }
};



describe('focusElementAt, focusFirstElement, focusLastElement, focusPrevElementOrWrapToLast, focusNextElementOrWrapToFirst', () => {
    beforeAll(() => {
        global.getComputedStyle = (element: Element) => ({
            display    : element.getAttribute('style')?.includes('display: none') ? 'none' : 'block',
            visibility : element.getAttribute('style')?.includes('visibility: hidden') ? 'hidden' : 'visible',
        } as CSSStyleDeclaration);
    });
    
    test('Flat structure with linear tabIndex', () => {
        runFocusNavigationTest(
`
<body>
    <div data-testid="container">
        <button tabindex="1" data-testid="a">A</button>
        <button tabindex="2" data-testid="b">B</button>
        <button tabindex="3" data-testid="c">C</button>
    </div>
</body>
`
        , [
            'a',
            'b',
            'c',
        ]);
    });
    
    test('Grouped elements sorted within a single group', () => {
        runFocusNavigationTest(
`
<body>
    <div data-testid="container">
        <div tabindex="1" data-testid="group">
            <button tabindex="2" data-testid="b">B</button>
            <button tabindex="1" data-testid="a">A</button>
            <button tabindex="3" data-testid="c">C</button>
        </div>
        <button tabindex="4" data-testid="outside">Outside</button>
    </div>
</body>
`
        , [
            'group',
                'a',
                'b',
                'c',
            'outside',
        ]);
    });
    
    test('Deeply nested, interleaved groups with complex tabIndex', () => {
        runFocusNavigationTest(
`
<body>
    <div data-testid="container">
        <section tabindex="1" data-testid="group-A">
            <button tabindex="3" data-testid="a2">A2</button>
            <div>
                <button tabindex="1" data-testid="a1">A1</button>
                <div tabindex="2" data-testid="group-B">
                    <button tabindex="2" data-testid="b2">B2</button>
                    <button tabindex="1" data-testid="b1">B1</button>
                </div>
                <button tabindex="4" data-testid="a3">A3</button>
            </div>
        </section>
        <section tabindex="2" data-testid="group-C">
            <button tabindex="1" data-testid="c1">C1</button>
            <button tabindex="2" data-testid="c2">C2</button>
        </section>
        <button tabindex="5" data-testid="outside">Outside</button>
    </div>
</body>
`
        , [
            'group-A',
                'a1',
                'group-B',
                    'b1',
                    'b2',
                'a2',
                'a3',
            'group-C',
                'c1',
                'c2',
            'outside',
        ]);
    });
    
    test('Handles elements with duplicate or missing tabIndex values', () => {
        runFocusNavigationTest(
`
<body>
    <div data-testid="container">
        <button tabindex="2" data-testid="two-a">Two-A</button>
        <button tabindex="1" data-testid="one">One</button>
        <button tabindex="2" data-testid="two-b">Two-B</button>
        <button tabindex="5" data-testid="five">Five</button>
        <button data-testid="implicit-zero">Zero</button>
    </div>
</body>
`
        , [
            'implicit-zero',
            'one',
            'two-a',
            'two-b',
            'five',
        ]);
    });
    
    test('Ignores orphaned elements pointing to nonexistent group elements', () => {
        runFocusNavigationTest(
`
<body>
    <div data-testid="container">
        <!-- Not a group, just a container -->
        <div data-testid="not-group">
            <button tabindex="1" data-testid="a">A</button>
        </div>
        
        <!-- Real group -->
        <div tabindex="1" data-testid="group-B">
            <button tabindex="2" data-testid="b2">B2</button>
            <button tabindex="1" data-testid="b1">B1</button>
        </div>
        
        <!-- Focusable orphan -->
        <button tabindex="3" data-testid="loner">Loner</button>
    </div>
</body>
`
        , [
            'a',
            'group-B',
                'b1',
                'b2',
            'loner',
        ]);
    });
    
    test('Handles ungrouped elements only (no hierarchy)', () => {
        runFocusNavigationTest(
`
<body>
    <div data-testid="container">
        <button tabindex="3" data-testid="c">C</button>
        <button tabindex="1" data-testid="a">A</button>
        <button tabindex="2" data-testid="b">B</button>
    </div>
</body>
`
        , [
            'a',
            'b',
            'c',
        ]);
    });
    
    test('Skips disabled, hidden, and unrendered', () => {
        runFocusNavigationTest(
`
<body>
    <div data-testid="container">
        <button tabindex="1" data-testid="enabled">Enabled</button>
        
        <button tabindex="2" disabled data-testid="native-disabled">Native-Disabled</button>
        <button tabindex="3" aria-disabled="true" data-testid="aria-disabled">ARIA-Disabled</button>
        
        <button tabindex="4" hidden data-testid="hidden">Hidden</button>
        <button tabindex="5" aria-hidden="true" data-testid="aria-hidden">ARIA-Hidden</button>
        
        <button tabindex="6" style="display: none" data-testid="display-none">Display-None</button>
        
        <button tabindex="7" data-testid="visible">Visible</button>
    </div>
</body>
`
        , [
            'enabled',
            'visible',
        ]);
    });
    
    test('Skips elements inside inert container', () => {
        runFocusNavigationTest(
`
<body>
    <div data-testid="container">
        <button tabindex="1" data-testid="before-inert">Before Inert</button>
        
        <div inert>
            <button tabindex="2" data-testid="inerted-1">Inerted One</button>
            <div>
                <button tabindex="3" data-testid="inerted-2">Inerted Two</button>
            </div>
        </div>
        
        <button tabindex="4" data-testid="after-inert">After Inert</button>
    </div>
</body>
`
        , [
            'before-inert',
            'after-inert',
        ]);
    });
    
    test('Skips disabled, hidden, display: none, and inert elements in deeply nested structure', () => {
        runFocusNavigationTest(
`
<body>
    <div data-testid="container">
        <section tabindex="1" data-testid="group-A">
            <button tabindex="3" data-testid="a3">A3</button>
            <div>
                <div tabindex="2" data-testid="group-B">
                    <button tabindex="2" data-testid="b2">B2</button>
                    <div>
                        <!-- This should be skipped due to disabled -->
                        <button tabindex="1" disabled data-testid="b1-disabled">B1-disabled</button>
                        
                        <!-- This group is inerted, everything inside is ignored -->
                        <div tabindex="1" inert data-testid="group-C">
                            <button tabindex="2" data-testid="c2">C2</button>
                            <div>
                                <!-- Should also be ignored (nested inside inert) -->
                                <button tabindex="1" data-testid="c1">C1</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- This should be skipped due to visibility: hidden -->
                    <button tabindex="3" style="visibility: hidden" data-testid="b3-hidden">B3-hidden</button>
                </div>
                <button tabindex="1" data-testid="a1">A1</button>
            </div>
            
            <!-- This is hidden using the hidden attribute -->
            <button tabindex="4" hidden data-testid="a4-hidden">A4-hidden</button>
        </section>
        
        <section tabindex="3" data-testid="group-D">
            <!-- This is skipped due to display: none -->
            <button tabindex="1" style="display: none" data-testid="d1-display-none">D1</button>
            
            <div>
                <button tabindex="3" data-testid="d3">D3</button>
                <button tabindex="2" data-testid="d2">D2</button>
            </div>
        </section>
        
        <!-- Still valid, nothing disqualifies it -->
        <button tabindex="5" data-testid="tail">Tail</button>
    </div>
</body>
`
        , [
            'group-A',
                'a1',
                'group-B',
                    'b2',
                'a3',
            'group-D',
                'd2',
                'd3',
            'tail',
        ]);
    });
});
