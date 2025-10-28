/**
 * A default initial view index to apply when no `viewIndex` prop, `defaultViewIndex` prop, or `defaultViewIndex` option is explicitly provided.
 * 
 * This fallback ensures the component is initially settled at the first view by default when in uncontrollable mode.
 * 
 * - `0`: the component is initially settled at the first view by default.
 */
export const defaultInitialViewIndex : number = 0;



/**
 * The default minimum view index.
 * 
 * This defines the lower bound of the valid view range.
 * It defaults to `0`, aligning with zero-based indexing conventions (e.g., arrays).
 */
export const defaultMinViewIndex     : number = 0;

/**
 * The default maximum view index.
 * 
 * This defines the upper bound of the valid view range.
 * It defaults to `Infinity`, allowing unrestricted view navigation unless explicitly clamped.
 */
export const defaultMaxViewIndex     : number = Infinity;

/**
 * The default step size for view index changes.
 * 
 * This controls snapping behavior. A value of `1` enables integer-based snapping.
 * To allow fractional scrolling or smooth syncing, use a smaller value (e.g., `0.01`) or `0`.
 */
export const defaultViewIndexStep    : number = 1;
