// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui effects:
import {
    // Types:
    type CssRatioParam,
    type CssFilterEffectOptions,
}                           from '@reusable-ui/filter-effect'       // Provides default visual effects for components when their active state changes. Adjusts the component's visual presentation to make components visually adapt their appearance in response to state changes.
export {
    // Types:
    type CssLengthParam,
    type CssRatioParam,
    type CssAngleParam,
    type CssColorParam,
    type FilterDropShadow,
}                           from '@reusable-ui/filter-effect'       // Provides default visual effects for components when their active state changes. Adjusts the component's visual presentation to make components visually adapt their appearance in response to state changes.



/**
 * A list of CSS variables used for excite-effect styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ExciteEffectVars {
    /**
     * References the filter applied when the component is in the excited state.
     * 
     * - Becomes `unset` when the component is idle (not excited).
     * - Typically not consumed directly — instead use:
     *   `const { filterFeatureVars: { filter } } = usesFilterFeature()`
     */
    exciteFilter    : unknown
    
    /**
     * References the transform applied when the component is in the excited state.
     * 
     * - Built from a `scale(...)` function.
     * - Becomes `unset` when the component is idle (not excited).
     * - Typically not consumed directly — instead use:
     *   `const { transformFeatureVars: { transform } } = usesTransformFeature()`
     */
    exciteTransform : unknown
}



/**
 * Configuration options for customizing excite effects.
 */
export interface CssExciteEffectOptions
    extends
        // Bases:
        CssFilterEffectOptions
{
    /**
     * Enables support for reverse intent.
     * 
     * When true, negative configuration values cause the effect
     * to fade *out* while excited, instead of fading *in*.
     * 
     * Defaults to `true` (enables reverse intent, allowing negative values to fade *out* the effect when excited).
     */
    enablesReverseIntent ?: CssFilterEffectOptions['enablesReverseIntent']
    
    /**
     * Controls how much the component's opacity is adjusted when excited.
     * 
     * - Applies whenever the component is in the excited state (activity running).
     * - Acts as a multiplier of the component's base opacity.
     *   For example, if the component has a base `opacity(0.8)` and this option is set to `opacity = 0.5`,
     *   the excited opacity becomes `0.8 * 0.5 = 0.4`.
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
     *   - Instead of fading *in* the opacity adjustment when excited, the adjustment fades *out*.
     *   - When idle (not excited), the base opacity is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's base opacity).
     */
    opacity              ?: CssFilterEffectOptions['opacity']
    
    /**
     * Controls how much the component is inverted when excited.
     * 
     * - Applies whenever the component is in the excited state (activity running).
     * - Acts as an additional `invert()` filter on top of any base inversion.
     *   For example, if the base style applies `invert(0.8)` and this option is set to `invert = 0.5`,
     *   the excited state will apply `invert(0.8)` followed by `invert(0.5)`.
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
     *   - Instead of fading *in* the inversion adjustment when excited, the adjustment fades *out*.
     *   - When idle (not excited), the base inversion is restored (the effect is fully un-applied).
     * 
     * Defaults to `1` (fully invert when excited, creating a strong highlight effect).
     */
    invert               ?: CssFilterEffectOptions['invert']
    
    /**
     * Controls how much the component is sepia-toned when excited.
     * 
     * - Applies whenever the component is in the excited state (activity running).
     * - Acts as an additional `sepia()` filter on top of any base sepia effect.
     *   For example, if the base style applies `sepia(0.8)` and this option is set to `sepia = 0.5`,
     *   the excited state will apply `sepia(0.8)` followed by `sepia(0.5)`.
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
     *   - Instead of fading *in* the sepia adjustment when excited, the adjustment fades *out*.
     *   - When idle (not excited), the base sepia effect is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's base sepia effect).
     */
    sepia                ?: CssFilterEffectOptions['sepia']
    
    /**
     * Controls how much the component is brightened or darkened when excited.
     * 
     * - Applies whenever the component is in the excited state (activity running).
     * - Acts as a multiplier of the component's base brightness.
     *   For example, if the component has a base `brightness(0.8)` and this option is set to `brightness = 0.5`,
     *   the excited brightness becomes `0.8 * 0.5 = 0.4`.
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
     *   - Instead of fading *in* the brightness adjustment when excited, the adjustment fades *out*.
     *   - When idle (not excited), the base brightness is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's base brightness).
     */
    brightness           ?: CssFilterEffectOptions['brightness']
    
    /**
     * Controls how much the component's color contrast is adjusted when excited.
     * 
     * - Applies whenever the component is in the excited state (activity running).
     * - Acts as a multiplier of the component's base contrast.
     *   For example, if the component has a base `contrast(0.8)` and this option is set to `contrast = 0.5`,
     *   the excited contrast becomes `0.8 * 0.5 = 0.4`.
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
     *   - Instead of fading *in* the contrast adjustment when excited, the adjustment fades *out*.
     *   - When idle (not excited), the base contrast is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's base contrast).
     */
    contrast             ?: CssFilterEffectOptions['contrast']
    
    /**
     * Controls how much the component's color saturation is adjusted when excited.
     * 
     * - Applies whenever the component is in the excited state (activity running).
     * - Acts as a multiplier of the component's base saturation.
     *   For example, if the component has a base `saturate(0.8)` and this option is set to `saturate = 0.5`,
     *   the excited saturation becomes `0.8 * 0.5 = 0.4`.
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
     *   - Instead of fading *in* the saturation adjustment when excited, the adjustment fades *out*.
     *   - When idle (not excited), the base saturation is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's base saturation).
     */
    saturate             ?: CssFilterEffectOptions['saturate']
    
    /**
     * Controls how much the component's color hue is rotated when excited.
     * 
     * - Applies whenever the component is in the excited state (activity running).
     * - Acts an additive of the component's base hue rotation.
     *   For example, if the component has a base `hue-rotate(80deg)` and this option is set to `hueRotate = 50deg`,
     *   the excited hue rotation becomes `80deg + 50deg = 130deg`.
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
     *   - Instead of fading *in* the hue adjustment when excited, the adjustment fades *out*.
     *   - When idle (not excited), the base hue is restored (the effect is fully un-applied).
     * - `'0deg'` → no hue adjustment.
     * - Only `deg`, `grad`, `rad`, and `turn` units are allowed.
     * 
     * Defaults to `null` (preserves the component's base hue).
     */
    hueRotate            ?: CssFilterEffectOptions['hueRotate']
    
    /**
     * Controls how much the component is blurred when excited.
     * 
     * - Applies whenever the component is in the excited state (activity running).
     * - Acts as an additional `blur()` filter on top of any base blur effect.
     *   For example, if the base style applies `blur(8px)` and this option is set to `blur = 5px`,
     *   the excited state will apply `blur(8px)` followed by `blur(5px)`.
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
     *   - Instead of fading *in* the blur effect when excited, the effect fades *out*.
     *   - When idle (not excited), the base sharpness is restored (the effect is fully un-applied).
     * 
     * Defaults to `null` (preserves the component's base blur).
     */
    blur                 ?: CssFilterEffectOptions['blur']
    
    /**
     * Specifies the drop shadow to apply when excited.
     * 
     * - Applies whenever the component is in the excited state (activity running).
     * - Acts an additive adjustment to the component's base drop shadow.
     *   For example, if the component has a base `drop-shadow(1px 1px 2px black)` and
     *   this option is set to `dropShadow` has `offsetX = 2px`, `offsetY = 2px`, `blur = 3px`, and `color = 'red'`,
     *   the excited drop shadow becomes the combination of both shadows.
     * - Drop shadow cannot be "canceled out": each new shadow is layered behind the previous shadows,
     *   so the effect accumulates and cannot be undone.
     * 
     * Accepts:
     * - A `FilterDropShadow` object defining the shadow parameters.
     * 
     * Defaults to `null` (preserves the component's base drop shadow).
     */
    dropShadow           ?: CssFilterEffectOptions['dropShadow']
    
    /**
     * Controls how much the component is scaled when excited.
     * 
     * - Applies whenever the component is in the excited state (activity running).
     * - Acts as a multiplier of the component's base scale.
     *   For example, if the component has a base `scale(1.2)` and this option is set to `scale = 1.5`,
     *   the excited scale becomes `1.2 * 1.5 = 1.8`.
     * - Scale adjustments are perfectly reversible: scaling up by a factor of `x` can be undone by scaling down by a factor of `1/x`.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `1.5`
     * - A strongly typed reference, e.g. `myConfig.scale`
     * 
     * Notes:
     * - Values `< 1` → scale down (shrink).
     * - Values `> 1` → scale up (enlarge).
     * - `1` → no scale adjustment.
     * - Percentage units are not allowed.
     * - Negative values are supported but have a **special meaning**:
     *   - They reverse the interpolation direction.
     *   - Instead of fading *in* the scale adjustment when excited, the adjustment fades *out*.
     *   - When idle (not excited), the base scale is restored (the effect is fully un-applied).
     * 
     * Defaults to `1.1` (slightly zoom in when excited, creating a subtle pop effect).
     */
    scale                ?: CssRatioParam | null
}



/**
 * Provides a CSS API for applying excite-state effects that blink by zooming in and flashing color,
 * making components **visually highlighted** when excited.
 */
export interface CssExciteEffect {
    /**
     * Attaches CSS rules for excite-state effects that blink by zooming in and flashing color,
     * making components **visually highlighted** when excited.
     * 
     * Exposes strongly typed CSS variables for activity-driven effects.
     * 
     * Behavior:
     * - factor = 0 → neutral (no adjustment, idle state).
     * - factor oscillates between 0 ↔ 1 → exciting activity (target opacity/brightness/contrast/saturation/etc. applied, following the factor's rhythmic movement).
     * 
     * Runs continuously while the component is in the excited state by animating filter effects.
     */
    exciteEffectRule : Lazy<CssRule>
    
    /**
     * Exposes excite-effect CSS variables for activity-driven effects.
     * 
     * Includes:
     * - `exciteFilter`    : Opacity, brightness, contrast, saturation, hue-rotate, drop-shadow, blur, and blur radius interpolation during excited activity.
     * - `exciteTransform` : Scale interpolation during excited activity.
     * 
     * ⚠️ **Caution**: These variables are invalid when the component is idle (not excited).
     * If used incorrectly, they can invalidate CSS declarations.
     * Always wrap them with `switchOf(...)` for safe fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    exciteEffectVars : CssVars<ExciteEffectVars>
}
