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
}                           from './css-internal-formulas.js'



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
     * - Transitions smoothly from inactive → active.
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
     * - To reverse the interpolation direction of this offset when active,
     *   set the corresponding `blur` property to a negative value.
     * 
     * Defaults to `'0px'`.
     */
    offsetX ?: CssLengthParam
    
    /**
     * Controls the vertical offset of the shadow.
     * 
     * - Transitions smoothly from inactive → active.
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
     * - To reverse the interpolation direction of this offset when active,
     *   set the corresponding `blur` property to a negative value.
     * 
     * Defaults to `'0px'`.
     */
    offsetY ?: CssLengthParam
    
    /**
     * Controls the blur radius of the shadow.
     * 
     * - Transitions smoothly from inactive → active.
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
     *   - Instead of fading *in* the shadow effect when active, the entire
     *     shadow (offsets, blur, and color) fades *out*.
     *   - When fully inactive, this shadow is gone (the effect is fully un-applied).
     * 
     * Defaults to `null` (no blur radius).
     */
    blur    ?: CssLengthParam | null
    
    /**
     * Specifies the color of the shadow.
     * 
     * - Transitions smoothly from inactive → active.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value, e.g. `'oklch(0 0 0)'`, `'#000000'`
     * - A strongly typed reference, e.g. `myConfig.shadowColor`
     * 
     * Notes:
     * - To reverse the interpolation direction of this color when active,
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
     * to fade *out* on active, instead of fading *in*.
     * 
     * Defaults to `false` (no reverse intent, always fade *in* the effect as the state activates).
     */
    enablesReverseIntent ?: boolean
    
    /**
     * Controls how much the component's opacity is adjusted when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Acts as a multiplier of the component's base opacity.
     *   For example, if the component has a base `opacity(0.8)` and this option is set to `opacity = 0.5`,
     *   the fully active opacity becomes `0.8 * 0.5 = 0.4`.
     * - Opacity adjustments are strictly reductive: you can decrease opacity (more transparent),
     *   but you cannot increase opacity beyond the base (values > 1 are clamped to 1).
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `0.5`
     * - A strongly typed reference, e.g. `myConfig.opacity`
     * 
     * Notes:
     * - Values between `0` and `1` → semi transparent.
     * - `0` → fully transparent.
     * - `1` → preserves the base opacity (no fade).
     * - Percentage units are allowed.
     * - Values outside 0…1 range are clamped by the browser.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the opacity adjustment when active, the adjustment fades *out*.
     *   - When fully inactive, the base opacity is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's base opacity).
     */
    opacity              ?: CssRatioParam | null
    
    /**
     * Controls how much the component is inverted when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Acts as an additional `invert()` filter on top of any base inversion.
     *   For example, if the base style applies `invert(0.8)` and this option is set to `invert = 0.5`,
     *   the active state will apply `invert(0.8)` followed by `invert(0.5)`.
     *   Note: invert filters compose sequentially, neither additively nor multiplicatively — the result is "more inverted",
     *   but not equivalent to a single `invert(0.4)` or `invert(0.25)`.
     * - Only a full inversion (`invert(1)`) is perfectly reversible; partial values blend colors
     *   and cannot be undone exactly.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `0.5`
     * - A strongly typed reference, e.g. `myConfig.invert`
     * 
     * Notes:
     * - Values between `0` and `1` → partially inverted.
     * - `0` → no inversion.
     * - `1` → fully inverted.
     * - Percentage units are allowed.
     * - Values outside 0…1 range are clamped by the browser.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the inversion adjustment when active, the adjustment fades *out*.
     *   - When fully inactive, the base inversion is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's base inversion).
     */
    invert               ?: CssRatioParam | null
    
    /**
     * Controls how much the component is sepia-toned when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Acts as an additional `sepia()` filter on top of any base sepia effect.
     *   For example, if the base style applies `sepia(0.8)` and this option is set to `sepia = 0.5`,
     *   the active state will apply `sepia(0.8)` followed by `sepia(0.5)`.
     *   Note: sepia filters compose sequentially, neither additively nor multiplicatively — the result is "more sepia-toned",
     *   but not equivalent to a single `sepia(0.4)` or `sepia(0.25)`.
     * - Sepia adjustments are irreversible: once sepia is applied, you can only increase the sepia tone,
     *   not reduce or cancel it back to the original colors.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `0.5`
     * - A strongly typed reference, e.g. `myConfig.sepia`
     * 
     * Notes:
     * - Values between `0` and `1` → partially sepia-toned.
     * - `0` → no sepia effect.
     * - `1` → fully sepia-toned.
     * - Percentage units are allowed.
     * - Values outside 0…1 range are clamped by the browser.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the sepia adjustment when active, the adjustment fades *out*.
     *   - When fully inactive, the base sepia effect is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's base sepia effect).
     */
    sepia                ?: CssRatioParam | null
    
    /**
     * Controls how much the component is brightened or darkened when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Acts as a multiplier of the component's base brightness.
     *   For example, if the component has a base `brightness(0.8)` and this option is set to `brightness = 0.5`,
     *   the fully active brightness becomes `0.8 * 0.5 = 0.4`.
     * - Brightness is almost reversible but not perfectly due to internal clamping and rounding in the browser's filter implementation.
     * - Automatically adapts to light/dark mode:
     *   - In **light mode** (`mode = +1`), values `< 1` darken  and values `> 1` lighten.
     *   - In **dark mode**  (`mode = -1`), values `< 1` lighten and values `> 1` darken.
     *   - Ensures the same configuration produces a natural highlight in both modes.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `0.8`
     * - A strongly typed reference, e.g. `myConfig.brightness`
     * 
     * Notes:
     * - Values `< 1` → darken  in light mode, lighten in dark mode.
     * - Values `> 1` → lighten in light mode, darken  in dark mode.
     * - `1` → no brightness adjustment.
     * - Percentage units are allowed.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the brightness adjustment when active, the adjustment fades *out*.
     *   - When fully inactive, the base brightness is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's base brightness).
     */
    brightness           ?: CssRatioParam | null
    
    /**
     * Controls how much the component's color contrast is adjusted when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Acts as a multiplier of the component's base contrast.
     *   For example, if the component has a base `contrast(0.8)` and this option is set to `contrast = 0.5`,
     *   the fully active contrast becomes `0.8 * 0.5 = 0.4`.
     * - Contrast is almost reversible but not perfectly due to internal clamping and rounding in the browser's filter implementation.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `1.2`
     * - A strongly typed reference, e.g. `myConfig.contrast`
     * 
     * Notes:
     * - Values `< 1` → decrease contrast (flatter look).
     * - Values `> 1` → increase contrast (sharper look).
     * - `1` → no contrast adjustment.
     * - Percentage units are allowed.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the contrast adjustment when active, the adjustment fades *out*.
     *   - When fully inactive, the base contrast is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's base contrast).
     */
    contrast             ?: CssRatioParam | null
    
    /**
     * Controls how much the component's color saturation is adjusted when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Acts as a multiplier of the component's base saturation.
     *   For example, if the component has a base `saturate(0.8)` and this option is set to `saturate = 0.5`,
     *   the fully active saturation becomes `0.8 * 0.5 = 0.4`.
     * - Saturation is almost reversible but not perfectly due to internal clamping and rounding in the browser's filter implementation.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `0.5`
     * - A strongly typed reference, e.g. `myConfig.saturate`
     * 
     * Notes:
     * - Values `< 1` → decrease saturation (muted colors).
     * - Values `> 1` → increase saturation (more vivid colors).
     * - `0` → grayscale.
     * - `1` → no saturation adjustment.
     * - Percentage units are allowed.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the saturation adjustment when active, the adjustment fades *out*.
     *   - When fully inactive, the base saturation is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's base saturation).
     */
    saturate             ?: CssRatioParam | null
    
    /**
     * Controls how much the component's color hue is rotated when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Acts an additive of the component's base hue rotation.
     *   For example, if the component has a base `hue-rotate(80deg)` and this option is set to `hueRotate = 50deg`,
     *   the fully active hue rotation becomes `80deg + 50deg = 130deg`.
     * - Hue rotation is almost reversible but not perfectly due to internal clamping and rounding in the browser's filter implementation.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value with an angle unit, e.g. `'45deg'`
     * - A strongly typed reference, e.g. `myConfig.hueRotate`
     * 
     * Notes:
     * - Positive values rotate hue clockwise (recommended for normal use).
     * - To rotate hue counter-clockwise, **avoid** using negative values.  
     *   Instead, use the equivalent positive angle: `360 - desiredAngle`.  
     *   Example: `-30deg` can be expressed as `330deg`.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the hue adjustment when active, the adjustment fades *out*.
     *   - When fully inactive, the base hue is restored (the effect is fully un-applied).
     * - `'0deg'` → no hue adjustment.
     * - Only `deg`, `grad`, `rad`, and `turn` units are allowed.
     * 
     * Defaults to `null` (preserves the component's base hue).
     */
    hueRotate            ?: CssAngleParam | null
    
    /**
     * Controls how much the component is blurred when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Acts as an additional `blur()` filter on top of any base blur effect.
     *   For example, if the base style applies `blur(8px)` and this option is set to `blur = 5px`,
     *   the active state will apply `blur(8px)` followed by `blur(5px)`.
     *   Note: blur filters compose sequentially, neither additively nor multiplicatively — the result is "blur of the blurred image",
     *   but not equivalent to a single `blur(13px)` or `blur(40px)`.
     * - Blur cannot be "canceled out": once applied, detail is lost and cannot be restored.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value with a length unit, e.g. `'2px'`
     * - A strongly typed reference, e.g. `myConfig.blur`
     * 
     * Notes:
     * - `'0px'` → no blur.
     * - Percentage units are not allowed.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the blur effect when active, the effect fades *out*.
     *   - When fully inactive, the base sharpness is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's base blur).
     */
    blur                 ?: CssLengthParam | null
    
    /**
     * Specifies the drop shadow to apply when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Acts an additive adjustment to the component's base drop shadow.
     *   For example, if the component has a base `drop-shadow(1px 1px 2px black)` and
     *   this option is set to `dropShadow` has `offsetX = 2px`, `offsetY = 2px`, `blur = 3px`, and `color = 'red'`,
     *   the fully active drop shadow becomes the combination of both shadows.
     * - Drop shadow cannot be "canceled out": each new shadow is layered behind the previous shadows,
     *   so the effect accumulates and cannot be undone.
     * 
     * Accepts:
     * - A `FilterDropShadow` object defining the shadow parameters.
     * 
     * Defaults to `null` (preserves the component's base drop shadow).
     */
    dropShadow           ?: FilterDropShadow | null
}



/**
 * Provides a CSS API for applying filter-based state effects that adjust the component's visual presentation,
 * making components **visually adapt their appearance** in response to state changes.
 */
export type CssFilterEffectFormula = [CssFilterFormula[]]
