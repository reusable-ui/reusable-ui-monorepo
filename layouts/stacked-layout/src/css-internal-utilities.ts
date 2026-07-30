// Types:
import {
    type CssAlgebraicBoolean,
    type CssFlippableBoolean,
}                           from './css-internal-types.js'



// Directional Primitives:

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
} as const;



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
} as const;



// Conversions:

/**
 * Converts a flippable boolean (`+1` or `-1`) into an algebraic boolean (`1` or `0`).
 * Rectifies `-1` to `0` for safe toggling.
 * 
 * @param condition An expression resolving to `1` (active) or `-1` (inactive). `0` is forbidden.
 * @returns A `CssAlgebraicBoolean`.
 */
export const toAlgebraicBoolean = (condition: CssFlippableBoolean): CssAlgebraicBoolean =>
    // ✅ Safe cast to `CssAlgebraicBoolean`:
    // - `-1` is clamped to `0`, ensuring the result is always within the valid domain (0 or 1).
    `max(0, ${condition})` as CssAlgebraicBoolean;



// Flip Operations:

/**
 * Inverts the given condition (`+1` ⇄ `-1`).
 * 
 * @param condition An expression resolving to `1` (active) or `-1` (inactive). `0` is forbidden.
 * @returns A `CssFlippableBoolean`.
 */
export const not = (condition: CssFlippableBoolean): CssFlippableBoolean =>
    // ✅ Safe cast to `CssFlippableBoolean`:
    // - Multiplying by -1 preserves the ±1 domain.
    `${condition} * -1` as CssFlippableBoolean;



// Logic Gates:

/**
 * Matches if *all* given conditions are active.
 * 
 * @param conditions One or more expressions resolving to `1` (active) or `0` (inactive). `-1` is forbidden.
 * @returns A `CssAlgebraicBoolean`.
 */
export const andAll     = (...conditions: CssAlgebraicBoolean[]): CssAlgebraicBoolean =>
    // ✅ Safe cast to `CssAlgebraicBoolean`:
    // - Multiplying 0/1 values preserves the 0/1 domain.
    conditions.join(' * ') as CssAlgebraicBoolean;

/**
 * Matches if *at least one* given condition is active.
 * 
 * @param conditions One or more expressions resolving to `1` (active) or `0` (inactive). `-1` is forbidden.
 * @returns A `CssAlgebraicBoolean`.
 */
export const orAny      = (...conditions: CssAlgebraicBoolean[]): CssAlgebraicBoolean =>
    // ✅ Safe cast to `CssAlgebraicBoolean`:
    // - Taking the max of 0/1 values preserves the 0/1 domain.
    `max(${conditions.join(', ')})` as CssAlgebraicBoolean;
    // Alternative: `min(1, ${conditions.join(' + ')})`

/**
 * Matches if *at least one* case is active.
 * Use when cases are intended to be **mutually exclusive**.
 * 
 * ⚠️ Note: This implementation aliases to `orAny()`.
 * It does not enforce exclusivity,
 * but preserves the semantic intent of a "case switch" for readability.
 * 
 * @param cases One or more expressions resolving to `1` (active) or `0` (inactive). `-1` is forbidden.
 * @returns A `CssAlgebraicBoolean`.
 */
export const caseSwitch = (...cases: CssAlgebraicBoolean[]): CssAlgebraicBoolean => orAny(...cases);



// Condition Checks:

/**
 * Determines whether the condition is in forward state.
 * 
 * @param condition An expression resolving to `1` (active) or `-1` (inactive). `0` is forbidden.
 * @returns A `CssAlgebraicBoolean`.
 */
export const isForward  = (condition: CssFlippableBoolean): CssAlgebraicBoolean => toAlgebraicBoolean(condition);

/**
 * Determines whether the condition is in reversed state.
 * 
 * @param condition An expression resolving to `1` (active) or `-1` (inactive). `0` is forbidden.
 * @returns A `CssAlgebraicBoolean`.
 */
export const isReverse  = (condition: CssFlippableBoolean): CssAlgebraicBoolean => isForward(not(condition));

/**
 * Determines whether two factors have the same polarity/direction (both `+1` or `-1`).
 * 
 * @param factorA An expression resolving to `1` (active) or `-1` (inactive). `0` is forbidden.
 * @param factorB An expression resolving to `1` (active) or `-1` (inactive). `0` is forbidden.
 * @returns A `CssAlgebraicBoolean`.
 */
export const isSame     = (factorA: CssFlippableBoolean, factorB: CssFlippableBoolean): CssAlgebraicBoolean => toAlgebraicBoolean(
    // ✅ Safe cast to `CssFlippableBoolean`:
    // - Value multiples of ±1 remain in the ±1 domain.
    `${factorA} * ${factorB}` as CssFlippableBoolean
);

/**
 * Determines whether two factors have opposite polarity/direction (one `+1` and the other `-1`).
 * 
 * @param factorA An expression resolving to `1` (active) or `-1` (inactive). `0` is forbidden.
 * @param factorB An expression resolving to `1` (active) or `-1` (inactive). `0` is forbidden.
 * @returns A `CssAlgebraicBoolean`.
 */
export const isOpposite = (factorA: CssFlippableBoolean, factorB: CssFlippableBoolean): CssAlgebraicBoolean => toAlgebraicBoolean(
    // ✅ Safe cast to `CssFlippableBoolean`:
    // - Value multiples of ±1 remain in the ±1 domain.
    `${factorA} * ${not(factorB)}` as CssFlippableBoolean
);



// Value Gate:

/**
 * Applies a value based on an active condition.
 * 
 * @param value The target CSS property value or variable.
 * @param condition An expression resolving to `1` (active) or `0` (inactive). `-1` is forbidden.
 * @returns CSS calc expression.
 */
export const whenActive = (value: string, condition: CssAlgebraicBoolean): `calc(${string})` =>
    `calc(${value} * ${condition})`;
