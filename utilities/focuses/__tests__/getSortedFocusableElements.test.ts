import {
    getSortedFocusableElements,
} from '../dist/index.js'
import { JSDOM } from 'jsdom'



describe('getSortedFocusableElements', () => {
    beforeAll(() => {
        globalThis.getComputedStyle = (element: Element) => ({
            display    : element.getAttribute('style')?.includes('display: none') ? 'none' : 'block',
            visibility : element.getAttribute('style')?.includes('visibility: hidden') ? 'hidden' : 'visible',
        } as CSSStyleDeclaration);
    });
    
    test('Returns elements in correct tabIndex order within groups', () => {
        const dom = new JSDOM(
`
<body>
    <ul tabindex="0">
        <li>
            <button tabindex="2" data-testid="edit">
                Edit
            </button>
        </li>
        
        <li>
            <div tabindex="1" data-testid="quantity">
                Quantity
                <div>
                    <button tabindex="2" data-testid="decrement">
                        -
                    </button>
                    <input type="number" tabindex="1" data-testid="input" />
                    <button tabindex="3" data-testid="increment">
                        +
                    </button>
                </div>
            </div>
        </li>
        
        <li>
            <button tabindex="3" data-testid="delete">
                Delete
            </button>
        </li>
        
        <li>
            <button tabindex="4" data-testid="cancel">
                Cancel
            </button>
        </li>
    </ul>
</body>
`
        );
        
        const container = dom.window.document.querySelector('ul')!;
        // Attach the container to document to simulate focus behavior
        dom.window.document.body.appendChild(container);
        // Patch globals for jsdom
        globalThis.document = dom.window.document;
        globalThis.HTMLElement = dom.window.HTMLElement;
        globalThis.SVGElement = dom.window.SVGElement;
        
        
        
        const focusables = getSortedFocusableElements(container);
        
        const ids = focusables.map((element) => element.getAttribute('data-testid'));
        
        expect(ids).toEqual([
            'quantity',
            'input',
            'decrement',
            'increment',
            'edit',
            'delete',
            'cancel',
        ]);
    });
    
    test('Preserves group structure', () => {
        const dom = new JSDOM(
`
<body>
    <ul tabindex="0">
        <li>
            <button tabindex="2" data-testid="edit">
                Edit
            </button>
        </li>
        
        <li>
            <div tabindex="1" data-testid="quantity">
                Quantity
                <div>
                    <button tabindex="2" data-testid="decrement">
                        -
                    </button>
                    <input type="number" tabindex="1" data-testid="input" />
                    <button tabindex="3" data-testid="increment">
                        +
                    </button>
                </div>
            </div>
        </li>
        
        <li>
            <button tabindex="3" data-testid="delete">
                Delete
            </button>
        </li>
        
        <li>
            <button tabindex="4" data-testid="cancel">
                Cancel
            </button>
        </li>
    </ul>
</body>
`
        );
        
        const container = dom.window.document.querySelector('ul')!;
        // Attach the container to document to simulate focus behavior
        dom.window.document.body.appendChild(container);
        // Patch globals for jsdom
        globalThis.document = dom.window.document;
        globalThis.HTMLElement = dom.window.HTMLElement;
        globalThis.SVGElement = dom.window.SVGElement;
        
        
        
        const focusables = getSortedFocusableElements(container);
        
        const quantityGroupStart = focusables.findIndex((element) => element.getAttribute('data-testid') === 'quantity')!;
        const quantityGroup = focusables.slice(quantityGroupStart, quantityGroupStart + 4); // take 4 items starting from it.
        
        expect(quantityGroup[0].getAttribute('data-testid') === 'quantity').toBe(true);
        expect(quantityGroup[1].getAttribute('data-testid')).toBe('input');
        expect(quantityGroup[2].getAttribute('data-testid')).toBe('decrement');
        expect(quantityGroup[3].getAttribute('data-testid')).toBe('increment');
    });
    
    test('Handles deeply nested, interleaved groups with correct tabIndex sorting', () => {
        const dom = new JSDOM(
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
        );
        
        const container = dom.window.document.querySelector('[data-testid="container"]')!;
        // Attach the container to document to simulate focus behavior
        dom.window.document.body.appendChild(container);
        // Patch globals for jsdom
        globalThis.document = dom.window.document;
        globalThis.HTMLElement = dom.window.HTMLElement;
        globalThis.SVGElement = dom.window.SVGElement;
        
        
        
        const focusables = getSortedFocusableElements(container);
        
        const ids = focusables.map((element) => element.getAttribute('data-testid'));
        
        expect(ids).toEqual([
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
    
    test('Handles more deeply nested, interleaved groups with correct tabIndex sorting', () => {
        const dom = new JSDOM(
`
<body>
    <div data-testid="container">
        <section tabindex="1" data-testid="group-X">
            <button tabindex="3" data-testid="x3">X3</button>
            <div>
                <div tabindex="2" data-testid="group-Y">
                    <button tabindex="2" data-testid="y2">Y2</button>
                    <div>
                        <button tabindex="1" data-testid="y1">Y1</button>
                        <div tabindex="1" data-testid="group-Z">
                            <button tabindex="2" data-testid="z2">Z2</button>
                            <button tabindex="1" data-testid="z1">Z1</button>
                        </div>
                    </div>
                    <button tabindex="3" data-testid="y3">Y3</button>
                </div>
                <button tabindex="1" data-testid="x1">X1</button>
            </div>
            <button tabindex="4" data-testid="x4">X4</button>
        </section>
        <section tabindex="3" data-testid="group-W">
            <button tabindex="1" data-testid="w1">W1</button>
            <div>
                <button tabindex="3" data-testid="w3">W3</button>
                <button tabindex="2" data-testid="w2">W2</button>
            </div>
        </section>
        <button tabindex="5" data-testid="tail">Tail</button>
    </div>
</body>
`
        );
        
        const container = dom.window.document.querySelector('[data-testid="container"]')!;
        // Attach the container to document to simulate focus behavior
        dom.window.document.body.appendChild(container);
        // Patch globals for jsdom
        globalThis.document = dom.window.document;
        globalThis.HTMLElement = dom.window.HTMLElement;
        globalThis.SVGElement = dom.window.SVGElement;
        
        
        
        const focusables = getSortedFocusableElements(container);
        
        const ids = focusables.map((element) => element.getAttribute('data-testid'));
        
        expect(ids).toEqual([
            'group-X',
                'x1',
                'group-Y',
                    'y1',
                    'group-Z',
                        'z1',
                        'z2',
                    'y2',
                    'y3',
                'x3',
                'x4',
            'group-W',
                'w1',
                'w2',
                'w3',
            'tail',
        ]);
    });
    
    test('Skips disabled, hidden, display: none, and inert elements in deeply nested structure', () => {
        const dom = new JSDOM(
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
        );
        
        const container = dom.window.document.querySelector('[data-testid="container"]')!;
        // Attach the container to document to simulate focus behavior
        dom.window.document.body.appendChild(container);
        // Patch globals for jsdom
        globalThis.document = dom.window.document;
        globalThis.HTMLElement = dom.window.HTMLElement;
        globalThis.SVGElement = dom.window.SVGElement;
        
        
        
        const focusables = getSortedFocusableElements(container);
        
        const ids = focusables.map((element) => element.getAttribute('data-testid'));
        
        expect(ids).toEqual([
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
