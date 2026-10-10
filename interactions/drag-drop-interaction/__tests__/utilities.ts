/**
 * Gets the droppable index by the given pointer position.
 * 
 * In this simulation, there is a draggable and multiple droppables in a row.
 * Each element is 100px wide and spaced by 100px gaps (200px block intervals).
 * 
 * @param pointerPos The simulated x position of the pointer.
 * @returns
 * - The zero-based index (`0`, `1`, `2`, ...) if the pointer lands on a valid droppable zone.
 * - `-1` if the pointer position is outside any valid droppable zone or falls within a gap.
 */
export const getDroppableIndexByPointerPos = (pointerPos: number): number => {
    const index = Math.floor(pointerPos / 200) - 1;
    const remainder = pointerPos % 200;
    
    // Valid only if it falls within the first 100px of the 200px interval block:
    return (remainder < 100 && index >= 0) ? index : -1;
};



/**
 * Minimal serializable representation of a DOM element for test assertions.
 */
export interface SerializedElement {
    /**
     * The `data-testid` attribute value of the element, used to verify identity across the test boundary.
     */
    __id: string | null
}

/**
 * Extracts a JSON-serializable representation of an `EventTarget` for Playwright Component Testing.
 * 
 * ### Why is this necessary?
 * Playwright CT executes component events inside the browser runtime, but passes event payloads 
 * back to the Node.js test runner process across an IPC serialization boundary. Native DOM `Element` 
 * references cannot be serialized to JSON and will be stripped to empty objects (`{}`) in test runner assertions.
 * 
 * This helper transforms event targets (`currentTarget`, `target`, `relatedTarget`) into lightweight 
 * objects containing their `data-testid`, allowing test suites (`drag-drop.spec.tsx`) to perform 
 * safe DOM reference identity checks.
 * 
 * @param element The `EventTarget` (DOM `Element`, `Window`, or `Document`) associated with the drag event.
 * @returns A `SerializedElement` object if the element exists, or `null`/`undefined` matching the input.
 */
export const mockEventElement = (element: EventTarget | null | undefined): SerializedElement | null | undefined => {
    if (!element) return element;
    
    return {
        __id: (element as Element).getAttribute('data-testid'),
    } satisfies SerializedElement;
};
