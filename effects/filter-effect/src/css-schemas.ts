// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomRef,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Utilities:
import {
    // Types:
    type CssNumericFormula,
    type CssAngleFormula,
    type CssLengthFormula,
    type CssColorFormula,
    type CssRatioFilterFormula,
    type CssAngleFilterFormula,
    type CssLengthFilterFormula,
    type CssNumeric,
    type CssAngle,
    type CssLength,
    type CssColor,
    
    
    
    // Limiters:
    ensureBetweenZeroAndOne,
    ensureNonNegative,
    ensureNonNegativeLength,
    
    // Magnitudes:
    absoluteValue,
    
    // Conditions:
    ifPositive,
    ifNegative,
    ifPositiveWithUnit,
    ifNegativeWithUnit,
    ifLightMode,
    ifDarkMode,
    composeCases,
    
    // Interpolations:
    reverseFactor,
    interpolateFromNeutralZero,
    interpolateFromNeutralOne,
    interpolateFromTransparentColor,
}                           from './css-formulas.js'



/**
 * Base schema definition for a CSS filter configuration.
 * 
 * Provides a consistent shape for iterating over common filter types:
 * - Ratio-based filters: opacity, brightness, contrast, saturate
 * - Angle-based filters: hue-rotate
 * - Length-based filters: blur
 * - Position-based filters: offsetX and offsetY
 * - Color-based filters: color-mix
 */
export interface FilterSchemaBase<
    TType        extends 'ratio' | 'angle' | 'length' | 'position' | 'color',
    TLimit       extends 'unlimited' | 'betweenZeroAndOne' | 'nonNegative',
    TBaseline    extends 0 | 1 | 'transparent',
    TValue       extends CssNumeric | CssAngle | CssLength | CssColor,
    TDirection   extends CssNumeric | CssAngle | CssLength,
    TDarkFormula extends CssNumericFormula | CssAngleFormula | CssLengthFormula,
    TResult      extends
        | CssRatioFilterFormula
        | CssAngleFilterFormula
        | CssLengthFilterFormula
        | CssColorFormula
> {
    /**
     * References a function that produces the CSS filter expression.
     * 
     * Typically assigned using one of the predefined helpers:
     * - `opacity()`
     * - `brightness()`
     * - `contrast()`
     * - `saturate()`
     * - `hueRotate()`
     * - `blur()`
     * 
     * May be `undefined` if no wrapping function is required
     * (e.g. drop-shadow parameters).
     */
    filterFunction  ?: (value: TValue) => TResult
    
    /**
     * Specifies the predefined input type for the filter schema.
     * 
     * Determines how the target magnitude and direction values are interpreted,
     * and which interpolation strategy is applied.
     * 
     * Options:
     * - `'ratio'`    → unitless proportional values (e.g., opacity, brightness, contrast, saturate).
     * - `'angle'`    → angular values with units (e.g., hue-rotate).
     * - `'length'`   → length-based values with units (e.g., blur).
     * - `'position'` → length-based values with units used for positional offsets (e.g., offsetX and offsetY).
     * - `'color'`    → color values (e.g., color-mix, rgb, oklch).
     */
    inputType        : TType
    
    /**
     * Specifies which predefined limiter for enforcing valid input ranges.
     * 
     * Options:
     * - `'unlimited'` → passes values through without modification (e.g. hue-rotate).
     * - `'betweenZeroAndOne'` → clamps values between 0 and 1 (e.g. opacity).
     * - `'nonNegative'` → ensures values are non-negative (e.g. brightness, contrast, saturate, blur).
     */
    inputLimit       : TLimit
    
    /**
     * Defines the neutral baseline value where the filter has no effect.
     * 
     * Determines which interpolation strategy is applied.
     * 
     * Examples:
     * - `1` for opacity, brightness, contrast, saturate
     * - `0` for hue-rotate, blur, offsetX, offsetY
     * - `'transparent'` for color interpolation
     */
    neutralBaseline  : TBaseline
    
    /**
     * Specifies the target value for the filter effect when fully applied.
     * 
     * Interpolates toward this value from its neutral baseline.
     */
    targetValue      : TValue
    
    /**
     * Specifies the value used only to determine interpolation direction.
     * 
     * The numeric sign (+/-) decides positive vs negative cases.
     * The magnitude is ignored — the actual effect comes from `targetValue`.
     */
    directionValue   : TDirection
    
    /**
     * Specifies an alternate formula for dark mode.
     * 
     * If not specified, the filter behaves the same in both light and dark modes.
     * 
     * Example: brightness may interpolate differently depending on mode.
     * 
     * Defaults to `undefined` (same formula for both modes).
     */
    darkFormula     ?: (value: TValue) => TDarkFormula
}

/**
 * Schema definition for a CSS filter configuration.
 * 
 * Provides a consistent shape for iterating over common filter types:
 * - Ratio-based filters: opacity, brightness, contrast, saturate
 * - Angle-based filters: hue-rotate
 * - Length-based filters: blur
 * - Position-based filters: offsetX and offsetY
 * - Color-based filters: color-mix
 */
export type FilterSchema =
    // Ratio filters (opacity, brightness, contrast, saturate):
    | FilterSchemaBase<
        'ratio',                             // Input type.
        'betweenZeroAndOne' | 'nonNegative', // Ratio limit options.
        0 | 1,                               // Neutral baseline.
        CssNumeric,                          // Target value type.
        CssNumeric,                          // Direction value type.
        CssNumericFormula,                   // Dark formula type.
        CssRatioFilterFormula                // Filter function return type.
    >
    
    // Angle filters (hue-rotate):
    | FilterSchemaBase<
        'angle',                             // Input type.
        'unlimited',                         // No angle limit.
        0,                                   // Neutral baseline.
        CssAngle,                            // Target value type.
        CssAngle,                            // Direction value type.
        CssAngleFormula,                     // Dark formula type.
        CssAngleFilterFormula                // Filter function return type.
    >
    
    // Length filters (blur):
    | FilterSchemaBase<
        'length',                            // Input type.
        'unlimited' | 'nonNegative',         // Input limit option.
        0,                                   // Neutral baseline.
        CssLength,                           // Target value type.
        CssLength,                           // Direction value type.
        CssLengthFormula,                    // Dark formula type.
        CssLengthFilterFormula               // Filter function return type.
    >
    
    // Position filters (offsetX and offsetY):
    | FilterSchemaBase<
        'position',                          // Input type.
        'unlimited',                         // No position limit.
        0,                                   // Neutral baseline.
        CssLength,                           // Target value type.
        CssLength,                           // Direction value type (blur parameter for interpolation).
        CssLengthFormula,                    // Dark formula type.
        CssLengthFilterFormula               // Filter function return type.
    >
    
    // Color filters (color-mix):
    | (FilterSchemaBase<
        'color',                             // Input type.
        'unlimited',                         // No color limit.
        'transparent',                       // Neutral baseline.
        CssColor,                            // Target value type.
        CssLength,                           // Direction value type (blur parameter for interpolation).
        never,                               // No dark formula type.
        never                                // No filter function wrapper.
    > & {
        filterFunction ?: never,             // Color values are returned directly, not wrapped.
        darkFormula    ?: never,             // Light/dark mode switching is not supported.
    });

/**
 * Represents the possible result of mapping a filter schema
 * into a CSS formula string.
 * 
 * Covers both:
 * - Standard filter functions (`opacity(...)`, `blur(...)`, `hue-rotate(...)`).
 * - Raw value fragments (e.g., drop-shadow parameters).
 */
export type CssFormulaResult =
    | CssRatioFilterFormula  // opacity(), brightness(), contrast(), saturate()
    | CssAngleFilterFormula  // hue-rotate()
    | CssLengthFilterFormula // blur()
    | CssColorFormula        // color(), color-mix(), rgb(), hsl(), oklch(), etc.
    | (string & {})          // raw value fragments (e.g., drop-shadow parameters)



/**
 * A context object used when mapping a schema to a CSS formula.
 * 
 * Passed as `thisArg` when calling `.map(schemaToCssFormula, context)`.
 * Provides both the interpolation factor driver and the current theme mode.
 */
export interface CssFilterCondition {
    /**
     * Reference to the interpolation factor driver.
     * 
     * Determines how strongly the effect is applied
     * (e.g. fade-in vs fade-out).
     */
    activeFactor         : CssCustomRef
    
    /**
     * Reference to the current theme mode (light or dark).
     * 
     * Used to branch formulas depending on the active theme mode.
     */
    colorMode            : CssCustomRef
    
    /**
     * Enables support for reverse intent.
     * 
     * When true, negative configuration values cause the effect
     * to fade *out* as the state becomes active, instead of fading *in*.
     */
    enablesReverseIntent : boolean
}



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
