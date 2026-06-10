// Types:
import {
    type CssNumericFormula,
    type CssAngleFormula,
    type CssLengthFormula,
    type CssColorFormula,
    type CssRatioFilterFormula,
    type CssAngleFilterFormula,
    type CssLengthFilterFormula,
    type CssCompositeFilterFormula,
    type CssNumeric,
    type CssAngle,
    type CssLength,
    type CssColor,
    type FilterSchema,
    type CssFormulaResult,
    type CssFilterCondition,
}                           from './css-internal-types.js'



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



// Schemas:

/**
 * Maps neutral baselines to their corresponding interpolation functions.
 * 
 * Used to select the correct interpolation strategy based on
 * the filter's neutral baseline value.
 * 
 * Example: `interpolateMap[neutralBaseline](factor, value)`
 * 
 * Available mappings:
 * - `0` → interpolate relative to zero (e.g. hue-rotate, blur, offsetX, offsetY).
 * - `1` → interpolate relative to one (e.g. opacity, brightness, contrast, saturate).
 * - `'transparent'` → interpolate from transparent to a target color.
 */
const interpolateMap = {
    0           : interpolateFromNeutralZero,
    1           : interpolateFromNeutralOne,
    transparent : interpolateFromTransparentColor,
};

/**
 * Maps limiter tokens to their corresponding helper functions.
 * 
 * Used to enforce valid input ranges by referencing a limiter token.
 * 
 * Example: `inputLimitMap[inputLimit](value)`.
 * 
 * Available limiters:
 * - `'betweenZeroAndOne'` → clamps values between 0 and 1 (e.g. opacity).
 * - `'nonNegative'` → ensures values are non-negative (e.g. brightness, contrast, saturate).
 * - `'nonNegativeLength'` → ensures length-based values are non-negative (blur).
 */
const inputLimitMap = {
    betweenZeroAndOne : ensureBetweenZeroAndOne,
    nonNegative       : ensureNonNegative,
    nonNegativeLength : ensureNonNegativeLength,
};

/**
 * Convert a filter schema into its corresponding CSS formula.
 * 
 * - Uses the current condition context (active factor, color mode, and reverse intent support).
 * - Normalizes target values based on input type (ratio, angle, length, position, color).
 * - Applies direction-aware interpolation and optional light/dark mode adjustments.
 * - Returns a valid CSS formula string for use in filter functions.
 */
export function schemaToCssFormula(this: CssFilterCondition, schema: FilterSchema): CssFormulaResult {
    // Extract context:
    const {
        activeFactor,
        colorMode,
        enablesReverseIntent,
    } = this;
    
    
    
    // Extract schema and assign defaults:
    const {
        filterFunction,
        inputType,
        inputLimit,
        neutralBaseline,
        targetValue,
        directionValue,
        darkFormula,
    } = schema;
    
    
    
    // Compose a direction-aware factor:
    // - Factors are unitless numeric values.
    // - They represent fade-in (0 → 1), fade-out (1 → 0),
    //   or even extended ranges beyond [0, 1].
    // - If reverse intent is not supported, only use the fade-in factor.
    const directionAwareFactor = ((): CssNumericFormula => {
        // If reverse intent is not supported → fade-in only (no direction awareness):
        if (!enablesReverseIntent) return composeCases(activeFactor);
        
        
        
        // Base factors:
        const fadeInFactor  : CssNumeric        = activeFactor;
        const fadeOutFactor : CssNumericFormula = reverseFactor(activeFactor);
        
        
        
        // Compose the fade-in/fade-out cases based on input type:
        switch (inputType) {
            case 'ratio':
                // Ratio inputs (opacity, brightness, contrast, saturate):
                // - Direction value is the same as `targetValue`.
                // - Direction is unitless (use `ifPositive/ifNegative` instead of `ifPositiveWithUnit/ifNegativeWithUnit`).
                // - Make sure the `directionValue` is correctly descriminated to `CssNumeric`.
                return composeCases(
                    ifPositive(directionValue satisfies CssNumeric, fadeInFactor),
                    ifNegative(directionValue satisfies CssNumeric, fadeOutFactor),
                );
            
            
            
            case 'angle':
            case 'length':
            case 'position':
            case 'color':
                // Angle inputs (hue-rotate), length inputs (blur), position inputs (offsetX, offsetY), and color inputs:
                // - Direction value is the same as `targetValue` for angle and length.
                // - Direction value is delegated to `blurRadius` for position and color.
                // - Direction has a unit (use `ifPositiveWithUnit/ifNegativeWithUnit` instead of `ifPositive/ifNegative`).
                // - Make sure the `directionValue` is correctly descriminated to `CssAngle` or `CssLength`.
                return composeCases(
                    ifPositiveWithUnit(directionValue satisfies CssAngle | CssLength, fadeInFactor),
                    ifNegativeWithUnit(directionValue satisfies CssAngle | CssLength, fadeOutFactor),
                );
            
            
            
            default:
                // Unknown input type → default to fade-in only:
                return composeCases(fadeInFactor);
        } // switch
    })();
    
    
    
    // Interpolate the target value using the direction-aware factor:
    // - Minimum baseline: 0, 1, or 'transparent' (depends on input type).
    // - Maximum magnitude is driven by `targetValue`.
    // - Direction is controlled by `directionAwareFactor`.
    // - May be adjusted for light/dark mode (numeric/angle/length/position only).
    const interpolatedTarget = ((): CssNumericFormula | CssAngleFormula | CssLengthFormula | CssColorFormula => {
        switch (inputType) {
            case 'ratio':
            case 'angle':
            case 'length':
            case 'position': {
                // Normalize target magnitude by removing any numeric sign:
                // - For ratio, angle, and length values, the sign only indicates interpolation direction.
                // - For position inputs, we want to preserve the sign to allow for directional offsets, so we don't lose the sign in that case.
                // - Make sure the `targetValue` is correctly descriminated to `CssNumeric`, `CssAngle` or `CssLength`.
                const lightModeTarget : CssNumericFormula | CssAngleFormula | CssLengthFormula = (
                    // If reverse intent is supported → extract the magnitude (ignore the sign):
                    (enablesReverseIntent && (inputType !== 'position'))
                    ? absoluteValue(targetValue satisfies CssNumeric | CssAngle | CssLength)
                    
                    // If reverse intent is not supported -or- handle position inputs → use the target value directly (preserve the sign):
                    : `(${targetValue satisfies CssNumeric | CssAngle | CssLength})`
                );
                
                // Adjust for light/dark mode if a `darkFormula` is provided:
                const modeAwareTarget : CssNumericFormula | CssAngleFormula | CssLengthFormula = (
                    // No dark formula → always the same value for both modes:
                    !darkFormula
                    ? lightModeTarget
                    
                    // Dark formula is specified → compose a light/dark-mode-aware target:
                    : composeCases(
                        // Light mode case → use absolute target value:
                        ifLightMode(colorMode,
                            lightModeTarget
                        ),
                        
                        // Dark mode case → create a dark mode target value using the specified formula:
                        // - Ensure the `darkFormula()` is correctly returning corresponding formulas:
                        ifDarkMode(colorMode,
                            darkFormula(lightModeTarget) satisfies CssNumericFormula | CssAngleFormula | CssLengthFormula
                        ),
                    )
                );
                
                // Interpolate from neutral baseline (0 or 1):
                // - Expect the returned formula is `CssNumericFormula` or `CssAngleFormula` or `CssLengthFormula`.
                return interpolateMap[neutralBaseline satisfies 0 | 1](
                    directionAwareFactor,
                    modeAwareTarget
                ) satisfies CssNumericFormula | CssAngleFormula | CssLengthFormula;
            }
            
            
            
            case 'color': {
                // Color targets are mode-independent:
                // - `darkFormula` is not supported for `inputType='color'`.
                const modeIndependentTarget : CssColor = targetValue satisfies CssColor;
                
                // Interpolate from neutral baseline (transparent):
                // - Expect the returned formula is `CssColorFormula`.
                return interpolateMap[neutralBaseline satisfies 'transparent'](
                    directionAwareFactor,
                    modeIndependentTarget
                ) satisfies CssColorFormula;
            }
            
            
            
            default:
                // Unknown input type → return targetValue unchanged:
                return `(${targetValue})`;
        } // switch
    })();
    
    
    
    // Clamp the interpolated target within the allowed range:
    const safeInterpolatedTarget = ((): CssNumericFormula | CssAngleFormula | CssLengthFormula | CssColorFormula => {
        // If no limit is provided → return as-is:
        // - Angle, position, and color schemas never specify limits.
        // - Length schema may not specify limits.
        if (inputLimit === 'unlimited') return interpolatedTarget as CssAngleFormula | CssColorFormula;
        
        
        
        // Only ratio and length schemas can specify limits:
        // - Angle, position, and color schemas never specify limits.
        if (inputType === 'length') {
            // Length schema → enforce 'nonNegativeLength' limit (if specified):
            return inputLimitMap['nonNegativeLength'](interpolatedTarget as CssLengthFormula) satisfies CssLengthFormula;
        }
        else {
            // Ratio schema → enforce the specified limit:
            return inputLimitMap[inputLimit](interpolatedTarget as CssNumericFormula) satisfies CssNumericFormula;
        } // if
    })();
    
    
    
    // Wrap the safe interpolated target with the filter function (if specified):
    // - Color schemas never specify a filter function (returned directly).
    if (!filterFunction) return safeInterpolatedTarget;
    return filterFunction(safeInterpolatedTarget as CssNumericFormula | CssAngleFormula | CssLengthFormula);
};
