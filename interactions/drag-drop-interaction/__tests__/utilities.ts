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
