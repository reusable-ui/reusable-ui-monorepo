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
 * CSS function names that produce a color value.
 */
export type CssColorFunction =
    | 'color'
    | 'color-mix'
    | 'rgb'
    | 'hsl'
    | 'hwb'
    | 'lab'
    | 'lch'
    | 'oklab'
    | 'oklch'

/**
 * CSS function names that produce a ratio-based-input filter value.
 */
export type CssRatioFilterFunction =
    | 'opacity'
    | 'brightness'
    | 'contrast'
    | 'saturate'

/**
 * CSS function names that produce a angle-based-input filter value.
 */
export type CssAngleFilterFunction =
    | 'hue-rotate'

/**
 * CSS function names that produce a length-based-input filter value.
 */
export type CssLengthFilterFunction =
    | 'blur'

/**
 * CSS function names that produce a composite-based-input filter value.
 */
export type CssCompositeFilterFunction =
    | 'drop-shadow'

/**
 * CSS function names that produce a filter value.
 */
export type CssFilterFunction =
    | CssRatioFilterFunction
    | CssAngleFilterFunction
    | CssLengthFilterFunction
    | CssCompositeFilterFunction

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
 * Represents a CSS formula that produces a numeric value with an angle unit.
 * 
 * Examples:
 * - Parenthesized formula: `'(45deg * 2)'`
 * - Function-style formula: `'clamp(0deg, 90deg, 180deg)'`
 * 
 * Notes:
 * - Always expressed as a string, since CSS formulas are textual.
 * - Must contain parentheses to indicate a valid CSS function or expression.
 */
export type CssAngleFormula           = `${'-' | ''}${CssMathFunction | ''}(${string})` & {};

/**
 * Represents a CSS formula that produces a numeric value with a length unit.
 * 
 * Examples:
 * - Parenthesized formula: `'(10px * 2)'`
 * - Function-style formula: `'max(1px, 2px, 3px)'`, `'clamp(0px, 50px, 100px)'`
 * 
 * Notes:
 * - Always expressed as a string, since CSS formulas are textual.
 * - Must contain parentheses to indicate a valid CSS function or expression.
 */
export type CssLengthFormula          = `${'-' | ''}${CssMathFunction | ''}(${string})` & {};

/**
 * Represents a CSS formula that produces a color value.
 * 
 * Examples:
 * - `'color(display-p3 1 0 0)'`
 * - `'color-mix(in oklch, red 50%, blue 50%)'`
 * 
 * Notes:
 * - Always expressed as a string, since CSS formulas are textual.
 * - Must be a valid CSS color function such as `color()` or `color-mix()`.
 */
export type CssColorFormula           = `${CssColorFunction}(${string})` & {};

/**
 * Represents a CSS formula that produces a ratio-based-input filter value.
 * 
 * Examples:
 * - `'opacity(0.5)'`
 * - `'brightness(1.5)'`
 * 
 * Notes:
 * - Always expressed as a string, since CSS formulas are textual.
 * - Must be a valid CSS filter function such as `opacity()` or `brightness()`.
 */
export type CssRatioFilterFormula     = `${CssRatioFilterFunction}(${string})` & {};

/**
 * Represents a CSS formula that produces a angle-based-input filter value.
 * 
 * Examples:
 * - `'hue-rotate(30deg)'`
 * 
 * Notes:
 * - Always expressed as a string, since CSS formulas are textual.
 * - Must be a valid CSS filter function such as `hue-rotate()`.
 */
export type CssAngleFilterFormula     = `${CssAngleFilterFunction}(${string})` & {};

/**
 * Represents a CSS formula that produces a length-based-input filter value.
 * 
 * Examples:
 * - `'blur(10px)'`
 * 
 * Notes:
 * - Always expressed as a string, since CSS formulas are textual.
 * - Must be a valid CSS filter function such as `blur()`.
 */
export type CssLengthFilterFormula    = `${CssLengthFilterFunction}(${string})` & {};

/**
 * Represents a CSS formula that produces a composite-based-input filter value.
 * 
 * Examples:
 * - `'drop-shadow(0px 0px 4px black)'`
 * 
 * Notes:
 * - Always expressed as a string, since CSS formulas are textual.
 * - Must be a valid CSS filter function such as `drop-shadow()`.
 */
export type CssCompositeFilterFormula = `${CssCompositeFilterFunction}(${string})` & {};

/**
 * Represents a CSS formula that produces a filter value.
 * 
 * Examples:
 * - `'brightness(0.5)'`
 * - `'hue-rotate(30deg)'`
 * 
 * Notes:
 * - Always expressed as a string, since CSS formulas are textual.
 * - Must be a valid CSS filter function such as `opacity()` or `brightness()`.
 */
export type CssFilterFormula =
    | CssRatioFilterFormula
    | CssAngleFilterFormula
    | CssLengthFilterFormula
    | CssCompositeFilterFormula

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

/**
 * Represents any CSS-compatible angle expression.
 * 
 * Can be one of:
 * - A zero number (`0`).
 * - A CSS angle formula (string with parentheses).
 * - A CSS custom property reference (e.g. `'var(--my-value)'`).
 */
export type CssAngle =
    | 0                 // Zero unitless angle.
    | (string & {})     // Numeric value with angle unit.
    | CssAngleFormula   // CSS formula string.
    | CssCustomRef      // CSS variable reference.

/**
 * Represents any CSS-compatible length expression.
 * 
 * Can be one of:
 * - A zero number (`0`).
 * - A CSS length formula (string with parentheses).
 * - A CSS custom property reference (e.g. `'var(--my-value)'`).
 */
export type CssLength =
    | 0                 // Zero unitless length.
    | (string & {})     // Numeric value with length unit.
    | CssLengthFormula  // CSS formula string.
    | CssCustomRef      // CSS variable reference.

/**
 * Represents any valid CSS color value expression.
 * 
 * Can be one of:
 * - A CSS named color (e.g. `'red'`, `'#ff0000'`)
 * - A CSS color formula (e.g. `'color-mix(in oklch, red 50%, green 50%)'`).
 * - A CSS custom property reference (e.g. `'var(--my-value)'`).
 */
export type CssColor =
    | string & ({})     // Named color.
    | CssColorFormula   // CSS formula string.
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

/**
 * Limits the given numeric value to minimum 0, ensuring non-negative output numeric.
 * 
 * Useful for formulas where negative results should be floored at `0`.
 * 
 * @param value - The numeric value to limit.
 * @returns A CSS numeric formula.
 */
export const ensureNonNegative       = (value: CssNumeric): CssNumericFormula => `max(0, ${value})`;

/**
 * Limits the given length value to minimum 0, ensuring non-negative output length.
 * 
 * Useful for formulas where negative results should be floored at `0px`.
 * 
 * @param value - The length value to limit.
 * @returns A CSS length formula.
 */
export const ensureNonNegativeLength = (value: CssLength): CssLengthFormula   => `max(0px, ${value})`;



// Magnitudes:

/**
 * Produces the absolute value of the given CSS numeric expression.
 * 
 * Since `abs()` is not yet widely supported in CSS, we emulate absolute
 * value using `max(value, -value)`. Ensures the result is always
 * non-negative, regardless of the sign of the input.
 * 
 * @param value - The numeric value to normalize.
 * @returns A CSS numeric formula representing the absolute value.
 */
export function absoluteValue(value: CssNumeric): CssNumericFormula;
/**
 * Produces the absolute value of the given CSS angle expression.
 * 
 * Since `abs()` is not yet widely supported in CSS, we emulate absolute
 * value using `max(value, -value)`. Ensures the result is always
 * non-negative, regardless of the sign of the input.
 * 
 * @param value - The angle value to normalize.
 * @returns A CSS angle formula representing the absolute value.
 */
export function absoluteValue(value: CssAngle  ): CssAngleFormula;
/**
 * Produces the absolute value of the given CSS length expression.
 * 
 * Since `abs()` is not yet widely supported in CSS, we emulate absolute
 * value using `max(value, -value)`. Ensures the result is always
 * non-negative, regardless of the sign of the input.
 * 
 * @param value - The length value to normalize.
 * @returns A CSS length formula representing the absolute value.
 */
export function absoluteValue(value: CssLength ): CssLengthFormula;
/**
 * Produces the absolute value of the given CSS numeric/angle/length expression.
 * 
 * Since `abs()` is not yet widely supported in CSS, we emulate absolute
 * value using `max(value, -value)`. Ensures the result is always
 * non-negative, regardless of the sign of the input.
 * 
 * @param value - The numeric/angle/length value to normalize.
 * @returns A CSS numeric/angle/length formula representing the absolute value.
 */
export function absoluteValue(value: CssNumeric | CssAngle | CssLength): CssNumericFormula | CssAngleFormula | CssLengthFormula;
export function absoluteValue(value: CssNumeric | CssAngle | CssLength): CssNumericFormula | CssAngleFormula | CssLengthFormula { return `max((${value}), -1 * (${value}))` }



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
 * Gate that activates when the given angle condition is positive or zero.
 * 
 * Produces applied factor if condition is positive or zero.
 * 
 * Uses `sign()` to normalize the condition into -1, 0, or 1,
 * then clamps into [0,1] for a clean gate multiplier.
 * 
 * @param condition - The angle condition to test.
 * @param appliedFactor - The interpolation factor value or expression to apply when the condition is met.
 * @returns A CSS numeric formula representing the applied factor or `0`.
 */
export function ifPositiveWithUnit(condition: CssAngle ,            appliedFactor: CssNumeric): CssAngleFormula;
/**
 * Gate that activates when the given length condition is positive or zero.
 * 
 * Produces applied factor if condition is positive or zero.
 * 
 * Uses `sign()` to normalize the condition into -1, 0, or 1,
 * then clamps into [0,1] for a clean gate multiplier.
 * 
 * @param condition - The length condition to test.
 * @param appliedFactor - The interpolation factor value or expression to apply when the condition is met.
 * @returns A CSS numeric formula representing the applied factor or `0`.
 */
export function ifPositiveWithUnit(condition: CssLength,            appliedFactor: CssNumeric): CssLengthFormula;
/**
 * Gate that activates when the given angle/length condition is positive or zero.
 * 
 * Produces applied factor if condition is positive or zero.
 * 
 * Uses `sign()` to normalize the condition into -1, 0, or 1,
 * then clamps into [0,1] for a clean gate multiplier.
 * 
 * @param condition - The angle/length condition to test.
 * @param appliedFactor - The interpolation factor value or expression to apply when the condition is met.
 * @returns A CSS numeric formula representing the applied factor or `0`.
 */
export function ifPositiveWithUnit(condition: CssAngle | CssLength, appliedFactor: CssNumeric): CssAngleFormula | CssLengthFormula;
export function ifPositiveWithUnit(condition: CssAngle | CssLength, appliedFactor: CssNumeric): CssAngleFormula | CssLengthFormula { return `(${ensureBetweenZeroAndOne(`sign(${condition})`)} * (${appliedFactor}))` }

/**
 * Gate that activates when the given angle condition is negative.
 * 
 * Produces applied factor if condition is negative.
 * 
 * Uses `-sign()` to flip the sign,
 * then clamps into [0,1] for a clean gate multiplier.
 * 
 * @param condition - The angle condition to test.
 * @param appliedFactor - The interpolation factor value or expression to apply when the condition is met.
 * @returns A CSS numeric formula representing the applied factor or `0`.
 */
export function ifNegativeWithUnit(condition: CssAngle ,            appliedFactor: CssNumeric): CssAngleFormula;
/**
 * Gate that activates when the given length condition is negative.
 * 
 * Produces applied factor if condition is negative.
 * 
 * Uses `-sign()` to flip the sign,
 * then clamps into [0,1] for a clean gate multiplier.
 * 
 * @param condition - The length condition to test.
 * @param appliedFactor - The interpolation factor value or expression to apply when the condition is met.
 * @returns A CSS numeric formula representing the applied factor or `0`.
 */
export function ifNegativeWithUnit(condition: CssLength,            appliedFactor: CssNumeric): CssLengthFormula;
/**
 * Gate that activates when the given angle/length condition is negative.
 * 
 * Produces applied factor if condition is negative.
 * 
 * Uses `-sign()` to flip the sign,
 * then clamps into [0,1] for a clean gate multiplier.
 * 
 * @param condition - The angle/length condition to test.
 * @param appliedFactor - The interpolation factor value or expression to apply when the condition is met.
 * @returns A CSS numeric formula representing the applied factor or `0`.
 */
export function ifNegativeWithUnit(condition: CssAngle | CssLength, appliedFactor: CssNumeric): CssAngleFormula | CssLengthFormula;
export function ifNegativeWithUnit(condition: CssAngle | CssLength, appliedFactor: CssNumeric): CssAngleFormula | CssLengthFormula { return `(${ensureBetweenZeroAndOne(`(-1 * sign(${condition}))`)} * (${appliedFactor}))` }

/**
 * Gate that activates proportionally based on light mode factor.
 * 
 * Behavior:
 * - mode = -1 → 0 (fully dark mode)
 * - mode =  0 → 0.5 (transition)
 * - mode = +1 → 1 (fully light mode)
 * - mode < -1 → below 0 (bump)
 * - mode > +1 → above 1 (bump)
 * 
 * @param mode - The mode factor (-1 = dark, +1 = light).
 * @param appliedTarget - The numeric value or expression to apply when the gate is active.
 * @returns A CSS numeric formula representing the applied value or `0`.
 */
export function ifLightMode(mode: CssNumeric, appliedTarget: CssNumeric): CssNumericFormula;
/**
 * Gate that activates proportionally based on light mode factor.
 * 
 * Behavior:
 * - mode = -1 → 0 (fully dark mode)
 * - mode =  0 → 0.5 (transition)
 * - mode = +1 → 1 (fully light mode)
 * - mode < -1 → below 0 (bump)
 * - mode > +1 → above 1 (bump)
 * 
 * @param mode - The mode factor (-1 = dark, +1 = light).
 * @param appliedTarget - The angle value or expression to apply when the gate is active.
 * @returns A CSS angle formula representing the applied value or `0deg`.
 */
export function ifLightMode(mode: CssNumeric, appliedTarget: CssAngle): CssAngleFormula;
/**
 * Gate that activates proportionally based on light mode factor.
 * 
 * Behavior:
 * - mode = -1 → 0 (fully dark mode)
 * - mode =  0 → 0.5 (transition)
 * - mode = +1 → 1 (fully light mode)
 * - mode < -1 → below 0 (bump)
 * - mode > +1 → above 1 (bump)
 * 
 * @param mode - The mode factor (-1 = dark, +1 = light).
 * @param appliedTarget - The length value or expression to apply when the gate is active.
 * @returns A CSS length formula representing the applied value or `0px`.
 */
export function ifLightMode(mode: CssNumeric, appliedTarget: CssLength): CssLengthFormula;
/**
 * Gate that activates proportionally based on light mode factor.
 * 
 * Behavior:
 * - mode = -1 → 0 (fully dark mode)
 * - mode =  0 → 0.5 (transition)
 * - mode = +1 → 1 (fully light mode)
 * - mode < -1 → below 0 (bump)
 * - mode > +1 → above 1 (bump)
 * 
 * @param mode - The mode factor (-1 = dark, +1 = light).
 * @param appliedTarget - The numeric/angle/length value or expression to apply when the gate is active.
 * @returns A CSS numeric/angle/length formula representing the applied value or `0` (for numeric) or `0deg` (for angle) or `0px` (for length).
 */
export function ifLightMode(mode: CssNumeric, appliedTarget: CssNumeric | CssAngle | CssLength): CssNumericFormula | CssAngleFormula | CssLengthFormula;
export function ifLightMode(mode: CssNumeric, appliedTarget: CssNumeric | CssAngle | CssLength): CssNumericFormula | CssAngleFormula | CssLengthFormula { return `(((${mode}) + 1) / 2) * (${appliedTarget})` }

/**
 * Gate that activates proportionally based on dark mode factor.
 * 
 * Behavior:
 * - mode = -1 → 1 (fully dark mode)
 * - mode =  0 → 0.5 (transition)
 * - mode = +1 → 0 (fully light mode)
 * - mode < -1 → above 1 (bump)
 * - mode > +1 → below 0 (bump)
 * 
 * @param mode - The mode factor (-1 = dark, +1 = light).
 * @param appliedTarget - The numeric value or expression to apply when the gate is active.
 * @returns A CSS numeric formula representing the applied value or `0`.
 */
export function ifDarkMode (mode: CssNumeric, appliedTarget: CssNumeric): CssNumericFormula;
/**
 * Gate that activates proportionally based on dark mode factor.
 * 
 * Behavior:
 * - mode = -1 → 1 (fully dark mode)
 * - mode =  0 → 0.5 (transition)
 * - mode = +1 → 0 (fully light mode)
 * - mode < -1 → above 1 (bump)
 * - mode > +1 → below 0 (bump)
 * 
 * @param mode - The mode factor (-1 = dark, +1 = light).
 * @param appliedTarget - The angle value or expression to apply when the gate is active.
 * @returns A CSS angle formula representing the applied value or `0deg`.
 */
export function ifDarkMode (mode: CssNumeric, appliedTarget: CssAngle): CssAngleFormula;
/**
 * Gate that activates proportionally based on dark mode factor.
 * 
 * Behavior:
 * - mode = -1 → 1 (fully dark mode)
 * - mode =  0 → 0.5 (transition)
 * - mode = +1 → 0 (fully light mode)
 * - mode < -1 → above 1 (bump)
 * - mode > +1 → below 0 (bump)
 * 
 * @param mode - The mode factor (-1 = dark, +1 = light).
 * @param appliedTarget - The length value or expression to apply when the gate is active.
 * @returns A CSS length formula representing the applied value or `0px`.
 */
export function ifDarkMode (mode: CssNumeric, appliedTarget: CssLength): CssLengthFormula;
/**
 * Gate that activates proportionally based on dark mode factor.
 * 
 * Behavior:
 * - mode = -1 → 1 (fully dark mode)
 * - mode =  0 → 0.5 (transition)
 * - mode = +1 → 0 (fully light mode)
 * - mode < -1 → above 1 (bump)
 * - mode > +1 → below 0 (bump)
 * 
 * @param mode - The mode factor (-1 = dark, +1 = light).
 * @param appliedTarget - The numeric/angle/length value or expression to apply when the gate is active.
 * @returns A CSS numeric/angle/length formula representing the applied value or `0` (for numeric) or `0deg` (for angle) or `0px` (for length).
 */
export function ifDarkMode (mode: CssNumeric, appliedTarget: CssNumeric | CssAngle | CssLength): CssNumericFormula | CssAngleFormula | CssLengthFormula;
export function ifDarkMode (mode: CssNumeric, appliedTarget: CssNumeric | CssAngle | CssLength): CssNumericFormula | CssAngleFormula | CssLengthFormula { return `((1 - (${mode})) / 2) * (${appliedTarget})` }

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
export function composeCases(...cases: CssNumeric[]): CssNumericFormula;
/**
 * Composes multiple conditional angle cases into a single expression.
 * 
 * Each case should already be gated (e.g. with ifPositive/ifNegative).
 * Only active cases contribute; inactive ones resolve to `0`.
 * 
 * All cases should have the same angle type.
 * 
 * @param cases - Array of angle conditional branch expressions.
 * @returns A CSS angle formula combining all cases.
 */
export function composeCases(...cases: CssAngle[]  ): CssAngleFormula;
/**
 * Composes multiple conditional length cases into a single expression.
 * 
 * Each case should already be gated (e.g. with ifPositive/ifNegative).
 * Only active cases contribute; inactive ones resolve to `0`.
 * 
 * All cases should have the same length type.
 * 
 * @param cases - Array of length conditional branch expressions.
 * @returns A CSS length formula combining all cases.
 */
export function composeCases(...cases: CssLength[] ): CssLengthFormula;
export function composeCases(...cases: (CssNumeric | CssAngle | CssLength)[]): CssNumericFormula | CssAngleFormula | CssLengthFormula { return `(${cases.map((c) => `(${c})`).join(' + ')})` }



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

/**
 * Interpolates from the neutral baseline (0) toward the target ratio value,
 * based on a numeric factor.
 * 
 * Behavior:
 * - factor = 0 → neutral baseline 0 (no adjustment).
 * - factor = 1 → target value.
 * - factor between 0 and 1 → interpolates proportionally between 0 and target value.
 * 
 * Use for CSS functions where `0` is the neutral baseline
 * (e.g. `blur()`, `drop-shadow()`).
 * 
 * @param factor - The interpolation factor (0 → baseline 0, 1 → target ratio value).
 * @param targetRatio - The target ratio value.
 * @returns A CSS numeric formula interpolating between `0` and target ratio value.
 */
export function interpolateFromNeutralZero     (factor: CssNumeric, targetRatio: CssNumeric): CssNumericFormula;
/**
 * Interpolates from the neutral baseline (0) toward the target angle value,
 * based on a numeric factor.
 * 
 * Behavior:
 * - factor = 0 → neutral baseline 0 (no adjustment).
 * - factor = 1 → target value.
 * - factor between 0 and 1 → interpolates proportionally between 0 and target value.
 * 
 * Use for CSS functions where `0` is the neutral baseline
 * (e.g. `blur()`, `drop-shadow()`).
 * 
 * @param factor - The interpolation factor (0 → baseline 0, 1 → target angle value).
 * @param targetAngle - The target angle value.
 * @returns A CSS numeric formula interpolating between `0` and target angle value.
 */
export function interpolateFromNeutralZero     (factor: CssNumeric, targetAngle: CssAngle): CssAngleFormula;
/**
 * Interpolates from the neutral baseline (0) toward the target length value,
 * based on a numeric factor.
 * 
 * Behavior:
 * - factor = 0 → neutral baseline 0 (no adjustment).
 * - factor = 1 → target value.
 * - factor between 0 and 1 → interpolates proportionally between 0 and target value.
 * 
 * Use for CSS functions where `0` is the neutral baseline
 * (e.g. `blur()`, `drop-shadow()`).
 * 
 * @param factor - The interpolation factor (0 → baseline 0, 1 → target length value).
 * @param targetLength - The target length value.
 * @returns A CSS numeric formula interpolating between `0` and target length value.
 */
export function interpolateFromNeutralZero     (factor: CssNumeric, targetLength: CssLength): CssLengthFormula;
/**
 * Interpolates from the neutral baseline (0) toward the target ratio/angle/length value,
 * based on a numeric factor.
 * 
 * Behavior:
 * - factor = 0 → neutral baseline 0 (no adjustment).
 * - factor = 1 → target value.
 * - factor between 0 and 1 → interpolates proportionally between 0 and target value.
 * 
 * Use for CSS functions where `0` is the neutral baseline
 * (e.g. `blur()`, `drop-shadow()`).
 * 
 * @param factor - The interpolation factor (0 → baseline 0, 1 → target ratio/angle/length value).
 * @param targetValue - The target ratio/angle/length value.
 * @returns A CSS numeric formula interpolating between `0` and target ratio/angle/length value.
 */
export function interpolateFromNeutralZero     (factor: CssNumeric, targetValue: CssNumeric | CssAngle | CssLength): CssNumericFormula | CssAngleFormula | CssLengthFormula;
export function interpolateFromNeutralZero     (factor: CssNumeric, targetValue: CssNumeric | CssAngle | CssLength): CssNumericFormula | CssAngleFormula | CssLengthFormula { return `((${targetValue}) * ${factor})` }

/**
 * Interpolates from the neutral baseline (1) toward the target value,
 * based on a numeric factor.
 * 
 * Behavior:
 * - factor = 0 → neutral baseline 1 (no adjustment).
 * - factor = 1 → target value.
 * - factor between 0 and 1 → interpolates proportionally between 1 and target value.
 * 
 * Use for CSS functions where `1` is the neutral baseline
 * (e.g. `opacity()`, `brightness()`, `contrast()`, `saturate()`).
 * 
 * @param factor - The interpolation factor (0 → baseline 1, 1 → target value).
 * @param targetRatio - The target ratio value.
 * @returns A CSS numeric formula interpolating between `1` and target value.
 */
export const interpolateFromNeutralOne       = (factor: CssNumeric, targetRatio: CssNumeric): CssNumericFormula => `(1 - (1 - (${targetRatio})) * ${factor})`;

/**
 * Interpolates from the origin color toward the target color,
 * based on a numeric factor.
 * 
 * Behavior:
 * - factor = 0 → 100% origin color (no contribution from target color).
 * - factor = 1 → 100% target color (no contribution from origin color).
 * - factor between 0 and 1 → blends proportionally between origin color and target color.
 * - factor outside [0,1] → clamped to origin color or target color respectively.
 * 
 * Use for CSS color transitions where the origin color fades into the target color.
 * 
 * @param factor - The interpolation factor (0 → origin color, 1 → target color).
 * @param originColor - The starting color (e.g. `transparent`).
 * @param targetColor - The destination color.
 * @returns A CSS color formula blending between two colors.
 */
export const interpolateToTargetColor        = (factor: CssNumeric, originColor: CssColor, targetColor: CssColor): CssColorFormula => `color-mix(in oklch, ${originColor} calc((1 - ${factor}) * 100%), ${targetColor} calc(${factor} * 100%))`;

/**
 * Interpolates from a transparent color toward the target color,
 * based on a numeric factor.
 * 
 * Behavior:
 * - factor = 0 → 100% transparent color (no contribution from target color).
 * - factor = 1 → 100% target color (no contribution from transparent color).
 * - factor between 0 and 1 → blends proportionally between transparent color and target color.
 * - factor outside [0,1] → clamped to transparent color or target color respectively.
 * 
 * Use for CSS color transitions where a transparent color fades into the target color.
 * 
 * @param factor - The interpolation factor (0 → transparent color, 1 → target color).
 * @param targetColor - The destination color.
 * @returns A CSS color formula blending between two colors.
 */
export const interpolateFromTransparentColor = (factor: CssNumeric, targetColor: CssColor): CssColorFormula => interpolateToTargetColor(factor, 'transparent', targetColor);



// Filter functions:

/**
 * Adjusts the opacity of the input image.
 * 
 * Produces a CSS `opacity()` filter function.
 * 
 * @param ratio - The opacity ratio (0 = fully transparent, 1 = fully opaque).
 * @returns A CSS ratio-based-input filter formula.
 */
export const opacity    = (ratio: CssNumeric): CssRatioFilterFormula  => `opacity(calc(${ratio}))`    as CssRatioFilterFormula;

/**
 * Inverts the colors of the input image.
 * 
 * Produces a CSS `invert()` filter function.
 * 
 * @param ratio - The inversion ratio (0 = no inversion, 1 = full inversion).
 * @returns A CSS ratio-based-input filter formula.
 */
export const invert     = (ratio: CssNumeric): CssRatioFilterFormula  => `invert(calc(${ratio}))`     as CssRatioFilterFormula;

/**
 * Applies a sepia tone to the input image.
 * 
 * Produces a CSS `sepia()` filter function.
 * 
 * @param ratio - The sepia ratio (0 = no sepia, 1 = full sepia).
 * @returns A CSS ratio-based-input filter formula.
 */
export const sepia      = (ratio: CssNumeric): CssRatioFilterFormula  => `sepia(calc(${ratio}))`      as CssRatioFilterFormula;

/**
 * Brightens or darkens the input image.
 * 
 * Produces a CSS `brightness()` filter function.
 * 
 * @param ratio - The brightness ratio (1 = unchanged, <1 = darker, >1 = brighter).
 * @returns A CSS ratio-based-input filter formula.
 */
export const brightness = (ratio: CssNumeric): CssRatioFilterFormula  => `brightness(calc(${ratio}))` as CssRatioFilterFormula;

/**
 * Increases or decreases the contrast of the input image.
 * 
 * Produces a CSS `contrast()` filter function.
 * 
 * @param ratio - The contrast ratio (1 = unchanged, <1 = lower contrast, >1 = higher contrast).
 * @returns A CSS ratio-based-input filter formula.
 */
export const contrast   = (ratio: CssNumeric): CssRatioFilterFormula  => `contrast(calc(${ratio}))`   as CssRatioFilterFormula;

/**
 * Saturates or desaturates the input image.
 * 
 * Produces a CSS `saturate()` filter function.
 * 
 * @param ratio - The saturation ratio (1 = unchanged, <1 = desaturated, >1 = more saturated).
 * @returns A CSS ratio-based-input filter formula.
 */
export const saturate   = (ratio: CssNumeric): CssRatioFilterFormula  => `saturate(calc(${ratio}))`   as CssRatioFilterFormula;

/**
 * Rotates the hue of the input image.
 * 
 * Produces a CSS `hue-rotate()` filter function.
 * 
 * @param angle - The hue rotation angle.
 * @returns A CSS angle-based-input filter formula.
 */
export const hueRotate  = (angle: CssAngle  ): CssAngleFilterFormula  => `hue-rotate(calc(${angle}))` as CssAngleFilterFormula;

/**
 * Blurs the input image.
 * 
 * Produces a CSS `blur()` filter function.
 * 
 * @param length - The blur radius length.
 * @returns A CSS length-based-input filter formula.
 */
export const blur       = (length: CssLength): CssLengthFilterFormula => `blur(calc(${length}))`      as CssLengthFilterFormula;

/**
 * Applies a drop shadow to the input image.
 * 
 * Produces a CSS `drop-shadow()` filter function.
 * 
 * @param params - Object containing shadow parameters.
 * @param params.offsetX - Horizontal offset length.
 * @param params.offsetY - Vertical offset length.
 * @param params.blur - Optional blur radius length.
 * @param params.color - Optional shadow color.
 * @returns A CSS composite-based-input filter formula.
 */
export const dropShadow = ({
    offsetX,
    offsetY,
    blur,
    color,
}: {
    offsetX  : CssLength
    offsetY  : CssLength
    blur    ?: CssLength
    color   ?: CssColor
}): CssCompositeFilterFormula => `drop-shadow(calc(${offsetX}) calc(${offsetY}) calc(${blur}) ${color})` as CssCompositeFilterFormula;
