// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomRef,
    type CssLength,
    type CssKnownBaseProps,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Utilities:
import {
    // Types:
    type CssFilterFormula,
}                           from './css-formulas.js'



/**
 * Represents a CSS length parameter.
 * 
 * - Must include a unit (e.g., `'10px'`, `'2rem'`).
 * - A bare number is prohibited, except for `0`.
 * - Allows CSS custom property references (e.g., `'var(--boo)'`), including with fallback (e.g., `'var(--boo, var(--foo))'`).
 */
export type CssLengthParam =
    | 0            // Unitless zero is allowed.
    | CssLength    // Numeric value with unit.
    | CssCustomRef // CSS variable reference (with optional fallback).

/**
 * Represents a CSS ratio parameter.
 * 
 * - Must be unitless (e.g., `0.5`, `2`) or percentage (e.g., `'50%'`).
 * - Allows CSS custom property references (e.g., `'var(--boo)'`), including with fallback (e.g., `'var(--boo, var(--foo))'`).
 */
export type CssRatioParam =
    | number       // Unitless number.
    | `${number}%` // Percentage string.
    | CssCustomRef // CSS variable reference (with optional fallback).

/**
 * Represents a CSS angle parameter.
 * 
 * - Must include one of the allowed angle units: `'deg'`, `'grad'`, `'rad'`, or `'turn'`.
 * - A bare number is prohibited, except for `0`.
 * - Allows CSS custom property references (e.g., `'var(--boo)'`), including with fallback (e.g., `'var(--boo, var(--foo))'`).
 */
export type CssAngleParam =
    | 0               // Unitless zero is allowed.
    | `${number}deg`  // Degrees.
    | `${number}grad` // Gradians.
    | `${number}rad`  // Radians.
    | `${number}turn` // Turns.
    | CssCustomRef    // CSS variable reference (with optional fallback).

/**
 * Represents a CSS color parameter.
 * 
 * - Must be a valid CSS color string (e.g., `'red'`, `'#ff0000'`, `'rgb(255, 0, 0)'`, `'oklch(0.5 0.3 120 / 0.5)'`).
 * - Allows CSS custom property references (e.g., `'var(--boo)'`), including with fallback (e.g., `'var(--boo, var(--foo))'`).
 */
export type CssColorParam =
    | Exclude<CssKnownBaseProps['color'], undefined | null> // String color.
    | CssCustomRef                                          // CSS variable reference (with optional fallback).



/**
 * Defines the configuration for a drop shadow filter effect.
 */
export interface FilterDropShadow {
    /**
     * Controls the horizontal offset of the shadow.
     * 
     * - Interpolates smoothly during the transition from `0px` → configured `offsetX` value.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value with a length unit, e.g. `'0.75rem'`
     * - A strongly typed reference, e.g. `myConfig.shadowX`
     * 
     * Notes:
     * - `'0px'` → no horizontal offset.
     * - Percentage units are not allowed.
     * - Negative values are allowed (to move the shadow left).
     * - To reverse the interpolation direction of this offset as the state activates,
     *   set the corresponding `blur` property to a negative value.
     * 
     * Defaults to `'0px'`.
     */
    offsetX  : CssLengthParam
    
    /**
     * Controls the vertical offset of the shadow.
     * 
     * - Interpolates smoothly during the transition from `0px` → configured `offsetY` value.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value with a length unit, e.g. `'0.75rem'`
     * - A strongly typed reference, e.g. `myConfig.shadowY`
     * 
     * Notes:
     * - `'0px'` → no vertical offset.
     * - Percentage units are not allowed.
     * - Negative values are allowed (to move the shadow upward).
     * - To reverse the interpolation direction of this offset as the state activates,
     *   set the corresponding `blur` property to a negative value.
     * 
     * Defaults to `'0px'`.
     */
    offsetY  : CssLengthParam
    
    /**
     * Controls the blur radius of the shadow.
     * 
     * - Interpolates smoothly during the transition from `0px` → configured `blur` value.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value with a length unit, e.g. `'0.75rem'`
     * - A strongly typed reference, e.g. `myConfig.shadowBlur`
     * 
     * Notes:
     * - `'0px'` → no blur.
     * - Percentage units are not allowed.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction of the blur itself.
     *   - They also reverse the interpolation direction of the shadow's
     *     `offsetX`, `offsetY`, and `color`.
     *   - Instead of fading *in* the shadow effect as the state activates, the entire
     *     shadow (offsets, blur, and color) fades *out*.
     *   - At full activation, the original sharpness, positioning, and color
     *     are restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (implicitly no blur).
     */
    blur    ?: CssLengthParam | null
    
    /**
     * Specifies the color of the shadow.
     * 
     * - Interpolates smoothly during the transition from `transparent` → configured `color` value.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value, e.g. `'oklch(0 0 0)'`, `'#000000'`
     * - A strongly typed reference, e.g. `myConfig.shadowColor`
     * 
     * Notes:
     * - To reverse the interpolation direction of this color as the state activates,
     *   set the corresponding `blur` property to a negative value.
     * 
     * Defaults to `null` (use the element's own `color` property).
     */
    color   ?: CssColorParam | null
}



/**
 * Configuration options for customizing filter effects.
 */
export interface CssFilterEffectOptions {
    /**
     * Enables support for reverse intent.
     * 
     * When true, negative configuration values cause the effect
     * to fade *out* as the state becomes active, instead of fading *in*.
     * 
     * Defaults to `false` (no reverse intent, always fade *in* the effect as the state activates).
     */
    enablesReverseIntent ?: boolean
    
    /**
     * Controls how much the component's opacity is adjusted at full activation.
     * 
     * - Interpolates smoothly during the transition from inactive → active.
     * - Acts as a multiplier of the component's original opacity.
     *   For example, if the component has `opacity: 0.8` and `activeOpacity = 0.5`,
     *   the fully active opacity becomes `0.8 * 0.5 = 0.4`.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `0.5`
     * - A strongly typed reference, e.g. `myConfig.activeOpacity`
     * 
     * Notes:
     * - Values between `0` and `1` → semi transparent.
     * - `0` → fully transparent.
     * - `1` → preserves the original opacity (no fade).
     * - Percentage units are allowed.
     * - Values outside 0…1 range are clamped by the browser.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the opacity adjustment as the state activates, the adjustment fades *out*.
     *   - At full activation, the original opacity is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's original opacity).
     */
    activeOpacity        ?: CssRatioParam | null
    
    /**
     * Controls how much the component is inverted at full activation.
     * 
     * - Interpolates smoothly during the transition from inactive → active.
     * - Acts as a multiplier of the component's original inversion.
     *   For example, if the component has `invert(20%)` and `activeInvert = 0.5`,
     *   the fully active inversion becomes `20% * 0.5 = 10%`.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `0.5`
     * - A strongly typed reference, e.g. `myConfig.activeInvert`
     * 
     * Notes:
     * - Values between `0` and `1` → partially inverted.
     * - `0` → no inversion.
     * - `1` → fully inverted.
     * - Percentage units are allowed.
     * - Values outside 0…1 range are clamped by the browser.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the inversion adjustment as the state activates, the adjustment fades *out*.
     *   - At full activation, the original inversion is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's original inversion).
     */
    activeInvert         ?: CssRatioParam | null
    
    /**
     * Controls how much the component is sepia-toned at full activation.
     * 
     * - Interpolates smoothly during the transition from inactive → active.
     * - Acts as a multiplier of the component's original sepia effect.
     *   For example, if the component has `sepia(50%)` and `activeSepia = 0.5`,
     *   the fully active sepia becomes `50% * 0.5 = 25%`.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `0.5`
     * - A strongly typed reference, e.g. `myConfig.activeSepia`
     * 
     * Notes:
     * - Values between `0` and `1` → partially sepia-toned.
     * - `0` → no sepia effect.
     * - `1` → fully sepia-toned.
     * - Percentage units are allowed.
     * - Values outside 0…1 range are clamped by the browser.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the sepia adjustment as the state activates, the adjustment fades *out*.
     *   - At full activation, the original sepia effect is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's original sepia effect).
     */
    activeSepia          ?: CssRatioParam | null
    
    /**
     * Controls how much the component is brightened or darkened at full activation.
     * 
     * - Interpolates smoothly during the transition from inactive → active.
     * - Automatically adapts to light/dark mode:
     *   - In **light mode** (`mode = +1`), values `< 1` darken  and values `> 1` lighten.
     *   - In **dark mode**  (`mode = -1`), values `< 1` lighten and values `> 1` darken.
     *   - Ensures the same configuration produces a natural highlight in both modes.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `0.8`
     * - A strongly typed reference, e.g. `myConfig.activeBrightness`
     * 
     * Notes:
     * - Values `< 1` → darken  in light mode, lighten in dark mode.
     * - Values `> 1` → lighten in light mode, darken  in dark mode.
     * - `1` → no brightness adjustment.
     * - Percentage units are allowed.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the brightness adjustment as the state activates, the adjustment fades *out*.
     *   - At full activation, the original brightness is restored (the effect is fully un-applied).
     * 
     * Defaults to `0.95` (slightly darken for light mode, slightly lighten for dark mode).
     */
    activeBrightness     ?: CssRatioParam | null
    
    /**
     * Controls how much the component's color contrast is adjusted at full activation.
     * 
     * - Interpolates smoothly during the transition from inactive → active.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `1.2`
     * - A strongly typed reference, e.g. `myConfig.activeContrast`
     * 
     * Notes:
     * - Values `< 1` → decrease contrast (flatter look).
     * - Values `> 1` → increase contrast (sharper look).
     * - `1` → no contrast adjustment.
     * - Percentage units are allowed.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the contrast adjustment as the state activates, the adjustment fades *out*.
     *   - At full activation, the original contrast is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's original contrast).
     */
    activeContrast       ?: CssRatioParam | null
    
    /**
     * Controls how much the component's color saturation is adjusted at full activation.
     * 
     * - Interpolates smoothly during the transition from inactive → active.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `0.5`
     * - A strongly typed reference, e.g. `myConfig.activeSaturate`
     * 
     * Notes:
     * - Values `< 1` → decrease saturation (muted colors).
     * - Values `> 1` → increase saturation (more vivid colors).
     * - `0` → grayscale.
     * - `1` → no saturation adjustment.
     * - Percentage units are allowed.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the saturation adjustment as the state activates, the adjustment fades *out*.
     *   - At full activation, the original saturation is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's original saturation).
     */
    activeSaturate       ?: CssRatioParam | null
    
    /**
     * Controls how much the component's color hue is rotated at full activation.
     * 
     * - Interpolates smoothly during the transition from inactive → active.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value with an angle unit, e.g. `'45deg'`
     * - A strongly typed reference, e.g. `myConfig.activeHueRotate`
     * 
     * Notes:
     * - Positive values rotate hue clockwise (recommended for normal use).
     * - To rotate hue counter-clockwise, **avoid** using negative values.  
     *   Instead, use the equivalent positive angle: `360 - desiredAngle`.  
     *   Example: `-30deg` can be expressed as `330deg`.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the hue adjustment as the state activates, the adjustment fades *out*.
     *   - At full activation, the original hue is restored (the effect is fully un-applied).
     * - `'0deg'` → no hue adjustment.
     * - Only `deg`, `grad`, `rad`, and `turn` units are allowed.
     * 
     * Defaults to `null` (preserves the component's original hue).
     */
    activeHueRotate      ?: CssAngleParam | null
    
    /**
     * Controls how much the component is blurred at full activation.
     * 
     * - Interpolates smoothly during the transition from inactive → active.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value with a length unit, e.g. `'2px'`
     * - A strongly typed reference, e.g. `myConfig.activeBlur`
     * 
     * Notes:
     * - `'0px'` → no blur.
     * - Percentage units are not allowed.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the blur effect as the state activates, the effect fades *out*.
     *   - At full activation, the original sharpness is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's original blur).
     */
    activeBlur           ?: CssLengthParam | null
    
    /**
     * Specifies the drop shadow to apply at full activation.
     * 
     * - Interpolates smoothly during the transition from inactive → active.
     * 
     * Accepts:
     * - A `FilterDropShadow` object defining the shadow parameters.
     * 
     * Defaults to `null` (preserves the component's original drop shadow).
     */
    activeDropShadow     ?: FilterDropShadow | null
    // invert   0...1   clamp(0, ..., 1)
    // sepia    0...1   clamp(0, ..., 1)
}



/**
 * Provides a CSS API for applying filter-based state effects that adjust the component's visual presentation,
 * making components **visually adapt their appearance** in response to state changes.
 */
export type CssFilterEffectFormula = [CssFilterFormula[]]
