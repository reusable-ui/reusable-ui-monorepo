// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssCustomRef,
    type CssLength,
    type CssKnownBaseProps,
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * A list of CSS variables used for hover-effect styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface HoverEffectVars {
    /**
     * References the filter applied when the component is transitioning toward hovered/unhovered or fully hovered.
     * 
     * - Becomes `unset` when the component is fully unhovered.
     * - Typically not consumed directly — instead use:
     *   `const { filterFeatureVars: { filter } } = usesFilterFeature()`
     */
    hoverFilter         : unknown
    
    /**
     * References the text decoration applied when the component is transitioning toward or fully hovered.
     * 
     * - Becomes `unset` when the component is transitioning toward or fully unhovered.
     * - Typically used with callback: `switchOf(hoverEffectVars.hoverTextDecoration, componentConfig.normalTextDecoration)`.
     */
    hoverTextDecoration : unknown
}



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
 * Defines the configuration for a hover drop shadow effect.
 */
export interface HoverDropShadow {
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
     * - To reverse the interpolation direction of this offset during hover,
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
     * - To reverse the interpolation direction of this offset during hover,
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
     *   - Instead of fading *in* the shadow effect during hover, the entire
     *     shadow (offsets, blur, and color) fades *out*.
     *   - At full hover, the original sharpness, positioning, and color
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
     * - To reverse the interpolation direction of this color during hover,
     *   set the corresponding `blur` property to a negative value.
     * 
     * Defaults to `null` (use the element's own `color` property).
     */
    color   ?: CssColorParam | null
}



/**
 * Configuration options for customizing hover effects.
 */
export interface CssHoverEffectOptions {
    /**
     * Controls how much the component's opacity is adjusted when fully hovered.
     * 
     * - Interpolates smoothly during the transition from unhovered → hovered.
     * - Acts as a multiplier of the component's original opacity.
     *   For example, if the component has `opacity: 0.8` and `hoverOpacity = 0.5`,
     *   the fully hovered opacity becomes `0.8 * 0.5 = 0.4`.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `0.5`
     * - A strongly typed reference, e.g. `myConfig.hoverOpacity`
     * 
     * Notes:
     * - Values between `0` and `1` → reduce opacity (more transparent).
     * - `0` → fully transparent.
     * - `1` → preserves the original opacity (no fade).
     * - Percentage units are allowed.
     * - Values outside 0…1 range are clamped by the browser.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the opacity adjustment during hover, the adjustment fades *out*.
     *   - At full hover, the original opacity is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's original opacity).
     */
    hoverOpacity        ?: CssRatioParam | null
    
    /**
     * Controls how much the component is brightened or darkened when fully hovered.
     * 
     * - Interpolates smoothly during the transition from unhovered → hovered.
     * - Automatically adapts to light/dark mode:
     *   - In **light mode** (`mode = +1`), values `< 1` darken  and values `> 1` lighten.
     *   - In **dark mode**  (`mode = -1`), values `< 1` lighten and values `> 1` darken.
     *   - Ensures the same configuration produces a natural highlight in both modes.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `0.8`
     * - A strongly typed reference, e.g. `myConfig.hoverBrightness`
     * 
     * Notes:
     * - Values `< 1` → darken  in light mode, lighten in dark mode.
     * - Values `> 1` → lighten in light mode, darken  in dark mode.
     * - `1` → no brightness adjustment.
     * - Percentage units are allowed.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the brightness adjustment during hover, the adjustment fades *out*.
     *   - At full hover, the original brightness is restored (the effect is fully un-applied).
     * 
     * Defaults to `0.95` (slightly darken for light mode, slightly lighten for dark mode).
     */
    hoverBrightness     ?: CssRatioParam | null
    
    /**
     * Controls how much the component's color contrast is adjusted when fully hovered.
     * 
     * - Interpolates smoothly during the transition from unhovered → hovered.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `1.2`
     * - A strongly typed reference, e.g. `myConfig.hoverContrast`
     * 
     * Notes:
     * - Values `< 1` → decrease contrast (flatter look).
     * - Values `> 1` → increase contrast (sharper look).
     * - `1` → no contrast adjustment.
     * - Percentage units are allowed.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the contrast adjustment during hover, the adjustment fades *out*.
     *   - At full hover, the original contrast is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's original contrast).
     */
    hoverContrast       ?: CssRatioParam | null
    
    /**
     * Controls how much the component's color saturation is adjusted when fully hovered.
     * 
     * - Interpolates smoothly during the transition from unhovered → hovered.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `0.5`
     * - A strongly typed reference, e.g. `myConfig.hoverSaturate`
     * 
     * Notes:
     * - Values `< 1` → decrease saturation (muted colors).
     * - Values `> 1` → increase saturation (more vivid colors).
     * - `0` → grayscale.
     * - `1` → no saturation adjustment.
     * - Percentage units are allowed.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the saturation adjustment during hover, the adjustment fades *out*.
     *   - At full hover, the original saturation is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's original saturation).
     */
    hoverSaturate       ?: CssRatioParam | null
    
    /**
     * Controls how much the component's color hue is rotated when fully hovered.
     * 
     * - Interpolates smoothly during the transition from unhovered → hovered.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value with an angle unit, e.g. `'45deg'`
     * - A strongly typed reference, e.g. `myConfig.hoverHueRotate`
     * 
     * Notes:
     * - Positive values rotate hue clockwise (recommended for normal use).
     * - To rotate hue counter-clockwise, **avoid** using negative values.  
     *   Instead, use the equivalent positive angle: `360 - desiredAngle`.  
     *   Example: `-30deg` can be expressed as `330deg`.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the hue adjustment during hover, the adjustment fades *out*.
     *   - At full hover, the original hue is restored (the effect is fully un-applied).
     * - `'0deg'` → no hue adjustment.
     * - Only `deg`, `grad`, `rad`, and `turn` units are allowed.
     * 
     * Defaults to `null` (preserves the component's original hue).
     */
    hoverHueRotate      ?: CssAngleParam | null
    
    /**
     * Controls how much the component is blurred when fully hovered.
     * 
     * - Interpolates smoothly during the transition from unhovered → hovered.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value with a length unit, e.g. `'2px'`
     * - A strongly typed reference, e.g. `myConfig.hoverBlur`
     * 
     * Notes:
     * - `'0px'` → no blur.
     * - Percentage units are not allowed.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the blur effect during hover, the effect fades *out*.
     *   - At full hover, the original sharpness is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's original blur).
     */
    hoverBlur           ?: CssLengthParam | null
    
    /**
     * Specifies the drop shadow to apply when the component is hovered.
     * 
     * - Interpolates smoothly during the transition from unhovered → hovered.
     * 
     * Accepts:
     * - A `HoverDropShadow` object defining the shadow parameters.
     * 
     * Defaults to `null` (preserves the component's original drop shadow).
     */
    hoverDropShadow     ?: HoverDropShadow | null
    
    /**
     * Specifies the text decoration to apply when the component is hovered.
     * 
     * - Discrete switching when the `hovered` state changes (no gradual transition).
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value, e.g. `'underline'`
     * - A strongly typed reference, e.g. `myConfig.hoverTextDecoration`
     * 
     * Defaults to `null` (preserves the component's original text decoration).
     */
    hoverTextDecoration ?: Exclude<CssKnownBaseProps['textDecoration'], undefined | null> | CssCustomRef | null
}



/**
 * Provides a CSS API for applying hover-state effects that signal interactivity,
 * making components **visually responsive and clearly distinguishable from static content**.
 * 
 * Hover effects convey clickability, editability, or other available actions
 * by providing subtle visual feedback during interaction.
 */
export interface CssHoverEffect {
    /**
     * Attaches CSS rules for hover-state effects that signal interactivity,
     * making components **visually responsive and clearly distinguishable from static content**.
     * 
     * Hover effects convey clickability, editability, or other available actions
     * by providing subtle visual feedback during interaction.
     * 
     * Exposes strongly typed CSS variables for transitional effects.
     * 
     * Behavior:
     * - factor = 0 → neutral (no adjustment).
     * - factor = 1 → fully hovered (target opacity/brightness/contrast/saturation/etc. applied).
     * - Between 0 and 1 → smooth interpolation between neutral and hovered, applying all configured effects except `hoverTextDecoration`.
     * - Text Decoration → discrete switch based on hover state (no gradual transition).
     * 
     * Smoothly transitions between unhover and hover states by animating filter effects.
     * Affects the entire component surface.
     */
    hoverEffectRule : Lazy<CssRule>
    
    /**
     * Exposes hover-effect CSS variables for transitional effects.
     * 
     * Includes:
     * - `hoverFilter`         : Opacity, brightness, contrast, saturation, hue-rotate, drop-shadow, blur, and blur radius interpolation during hover state.
     * - `hoverTextDecoration` : Discrete text decoration switching when hovered.
     * 
     * ⚠️ **Caution**: These variables are invalid when the component is fully unhovered.
     * If used incorrectly, they can invalidate CSS declarations.
     * Always wrap them with `switchOf(...)` for safe fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    hoverEffectVars : CssVars<HoverEffectVars>
}
