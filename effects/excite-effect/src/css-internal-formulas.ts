// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomRef,
}                           from '@cssfn/core'                      // Writes css in javascript.



// Types:

/**
 * CSS math function names that can produce either a bare number
 * or a number with a unit (length, angle).
 */
export type CssMathFunction =
    | 'min'
    | 'max'
    | 'clamp'

/**
 * CSS math function names that produce a bare numeric value only.
 */
export type CssMathNumericFunction =
    | 'sign'

/**
 * Represents a CSS formula that produces a bare numeric value.
 * 
 * Examples:
 * - Parenthesized formula: `'(2 * 3)'`
 * - Function-style formula: `'max(2, 3, 4)'`, `'clamp(0, 99, 1)'`
 * 
 * Notes:
 * - Always expressed as a string, since CSS formulas are textual.
 * - Must contain parentheses to indicate a valid CSS function or expression.
 */
export type CssNumericFormula         = `${'-' | ''}${CssMathFunction | CssMathNumericFunction | ''}(${string})` & {};

/**
 * Represents any CSS-compatible numeric expression.
 * 
 * Can be one of:
 * - A literal number (TypeScript `number`).
 * - A CSS numeric formula (string with parentheses).
 * - A CSS custom property reference (e.g. `'var(--my-value)'`).
 */
export type CssNumeric =
    | number            // Literal numeric value.
    | `${number}%`      // Percentage string.
    | CssNumericFormula // CSS formula string.
    | CssCustomRef      // CSS variable reference.



// Limiters:

/**
 * Limits the given numeric value into the [0, 1] numeric range.
 * 
 * Commonly used for conditional activation gates.
 * 
 * @param value - The numeric value to limit.
 * @returns A CSS numeric formula.
 */
export const ensureBetweenZeroAndOne = (value: CssNumeric): CssNumericFormula => `clamp(0, ${value}, 1)`;



// Conditions:

/**
 * Gate that activates when the given numeric condition is positive or zero.
 * 
 * Produces applied factor if condition is positive or zero.
 * 
 * The small +0.0001 avoids edge cases at exactly 0.
 * 
 * @param condition - The numeric condition to test.
 * @param appliedFactor - The interpolation factor value or expression to apply when the condition is met.
 * @returns A CSS numeric formula representing the applied factor or `0`.
 */
export const    ifPositive      = (condition: CssNumeric,           appliedFactor: CssNumeric): CssNumericFormula => `(${ensureBetweenZeroAndOne(`(((${condition}) + 0.0001) * 99999)`)} * (${appliedFactor}))`;

/**
 * Gate that activates when the given numeric condition is negative.
 * 
 * Produces applied factor if condition is negative.
 * 
 * Multiplication by -99999 flips the sign so negatives map into the positive clamp range.
 * 
 * @param condition - The numeric condition to test.
 * @param appliedFactor - The interpolation factor value or expression to apply when the condition is met.
 * @returns A CSS numeric formula representing the applied factor or `0`.
 */
export const    ifNegative      = (condition: CssNumeric,           appliedFactor: CssNumeric): CssNumericFormula => `(${ensureBetweenZeroAndOne(`((${condition}) * -99999)`)} * (${appliedFactor}))`;

/**
 * Composes multiple conditional numeric cases into a single expression.
 * 
 * Each case should already be gated (e.g. with ifPositive/ifNegative).
 * Only active cases contribute; inactive ones resolve to `0`.
 * 
 * All cases should have the same numeric type.
 * 
 * @param cases - Array of numeric conditional branch expressions.
 * @returns A CSS numeric formula combining all cases.
 */
export function composeCases(...cases: CssNumeric[]): CssNumericFormula { return `(${cases.map((c) => `(${c})`).join(' + ')})` }



// Interpolations:

/**
 * Reverses the interpolation factor.
 * 
 * Used to simulate "fade out" behavior by flipping the interpolation factor from [0 → 1] into [1 → 0].
 * This allows reuse of `interpolateFrom**` formulas for both fade-in and fade-out transitions.
 * 
 * Example:
 * - factor = 0   → reversedFactor = 1   (full target)
 * - factor = 0.5 → reversedFactor = 0.5 (midway)
 * - factor = 1   → reversedFactor = 0   (neutral)
 * 
 * @param appliedFactor - The interpolation factor value or expression to reverse.
 * @returns A CSS numeric formula representing the reversed factor.
 */
export const reverseFactor                   = (factor: CssNumeric): CssNumericFormula => `(1 - (${factor}))`;
