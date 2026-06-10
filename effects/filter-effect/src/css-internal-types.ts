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
export interface CssFilterSchemaBase<
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
     * Specifies an alternate formula in dark mode.
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
export type CssFilterSchema =
    // Ratio filters (opacity, brightness, contrast, saturate):
    | CssFilterSchemaBase<
        'ratio',                             // Input type.
        'betweenZeroAndOne' | 'nonNegative', // Ratio limit options.
        0 | 1,                               // Neutral baseline.
        CssNumeric,                          // Target value type.
        CssNumeric,                          // Direction value type.
        CssNumericFormula,                   // Dark formula type.
        CssRatioFilterFormula                // Filter function return type.
    >
    
    // Angle filters (hue-rotate):
    | CssFilterSchemaBase<
        'angle',                             // Input type.
        'unlimited',                         // No angle limit.
        0,                                   // Neutral baseline.
        CssAngle,                            // Target value type.
        CssAngle,                            // Direction value type.
        CssAngleFormula,                     // Dark formula type.
        CssAngleFilterFormula                // Filter function return type.
    >
    
    // Length filters (blur):
    | CssFilterSchemaBase<
        'length',                            // Input type.
        'unlimited' | 'nonNegative',         // Input limit option.
        0,                                   // Neutral baseline.
        CssLength,                           // Target value type.
        CssLength,                           // Direction value type.
        CssLengthFormula,                    // Dark formula type.
        CssLengthFilterFormula               // Filter function return type.
    >
    
    // Position filters (offsetX and offsetY):
    | CssFilterSchemaBase<
        'position',                          // Input type.
        'unlimited',                         // No position limit.
        0,                                   // Neutral baseline.
        CssLength,                           // Target value type.
        CssLength,                           // Direction value type (blur parameter for interpolation).
        CssLengthFormula,                    // Dark formula type.
        CssLengthFilterFormula               // Filter function return type.
    >
    
    // Color filters (color-mix):
    | (CssFilterSchemaBase<
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
