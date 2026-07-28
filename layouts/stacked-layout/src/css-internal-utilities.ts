/**
 * All possible logical side values for CSS properties.
 * 
 * Represents the two ends of a block or inline axis:
 * - `'Start'` → logical start side (top or left depending on axis and writing mode).
 * - `'End'`   → logical end side (bottom or right depending on axis and writing mode).
 * 
 * Used when iterating over block/inline axes to compute corner radii or border widths.
 */
export const logicalSides = ['Start', 'End'] as const;

/**
 * Maps logical Start/End keywords to numeric side factors.
 * - `Start` → +1
 * - `End`   → -1
 * 
 * Useful for algebraic calculations when determining
 * which corners or borders should be active in stacked layouts.
 */
export const sideFactorMap = {
    'Start' : +1,
    'End'   : -1,
};



/**
 * All possible logical axis values for CSS properties.
 * 
 * Represents the two axes used in CSS logical properties:
 * - `'Block'`  → the block axis (vertical in horizontal writing modes).
 * - `'Inline'` → the inline axis (horizontal in horizontal writing modes).
 * 
 * Used when iterating over axes to compute border widths or layout logic.
 */
export const logicalAxes = ['Block', 'Inline'] as const;

/**
 * Maps logical axis keywords to numeric axis factors.
 * - `Block`  → +1
 * - `Inline` → -1
 * 
 * Useful for algebraic calculations when determining
 * orientation‑dependent border widths in stacked layouts.
 */
export const axisFactorMap = {
    'Block'  : +1,
    'Inline' : -1,
};
