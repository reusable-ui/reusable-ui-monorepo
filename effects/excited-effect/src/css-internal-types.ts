// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomRef,
}                           from '@cssfn/core'                      // Writes css in javascript.



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
