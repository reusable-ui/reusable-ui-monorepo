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
    type CssFilterEffectOptions,
}                           from '@reusable-ui/filter-effect'       // Provides default visual effects for components when their active state changes. Adjusts the component's visual presentation by making components visually adapt their appearance in response to state changes.
export {
    // Types:
    type CssLengthParam,
    type CssRatioParam,
    type CssAngleParam,
    type CssColorParam,
    type FilterDropShadow,
}                           from '@reusable-ui/filter-effect'       // Provides default visual effects for components when their active state changes. Adjusts the component's visual presentation by making components visually adapt their appearance in response to state changes.



/**
 * A list of CSS variables used for active-effect styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ActiveEffectVars {
    /**
     * Represents the excess delta used for bump effects.
     * 
     * - Fully inactive         → `unset`
     * - Regular variants       → `unset`
     * - Outlined/mild variants → The bump factor on overshoot/undershoot:
     *   - Factor > 1      → Positive (over-emphasizes).
     *   - Factor < 0      → Negative (under-emphasizes).
     *   - Between 0 and 1 → 0 (neutral).
     */
    bumpFactorCond      : unknown
    
    /**
     * The resolved value actually consumed by filters.
     * 
     * - Fully inactive         → `unset`
     * - Regular variants       → Mirrors the active factor.
     * - Outlined/mild variants → The bump factor on overshoot/undershoot:
     *   - Factor > 1      → Positive (over-emphasizes).
     *   - Factor < 0      → Negative (under-emphasizes).
     *   - Between 0 and 1 → 0 (neutral).
     */
    effectiveFactorCond : unknown
    
    /**
     * References the filter applied when the component is transitioning toward active/inactive or fully active.
     * 
     * - Fully inactive         → `unset`
     * - Regular variants       → Interpolates filter effect adjustments.
     * - Outlined/mild variants → Neutral at factors between 0 and 1, but responds to overshoot/undershoot.
     * - Typically not consumed directly — instead use:
     *   `const { filterFeatureVars: { filter } } = usesFilterFeature()`
     */
    activeFilter        : unknown
}



/**
 * Configuration options for customizing active effects.
 */
export interface CssActiveEffectOptions
    extends
        // Bases:
        Omit<CssFilterEffectOptions,
            | 'enablesReverseIntent' // Not supported for active effects.
        >
{
    /**
     * Controls how much the component's opacity is adjusted when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Only applies for regular variants. Outlined/mild variants use internal color transformations instead.
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
    opacity              ?: CssFilterEffectOptions['opacity']
    
    /**
     * Controls how much the component is inverted when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Only applies for regular variants. Outlined/mild variants use internal color transformations instead.
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
    invert               ?: CssFilterEffectOptions['invert']
    
    /**
     * Controls how much the component is sepia-toned when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Only applies for regular variants. Outlined/mild variants use internal color transformations instead.
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
    sepia                ?: CssFilterEffectOptions['sepia']
    
    /**
     * Controls how much the component is brightened or darkened when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Only applies for regular variants. Outlined/mild variants use internal color transformations instead.
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
     * Defaults to `0.5` (fairly darken in light mode, fairly lighten in dark mode).
     */
    brightness           ?: CssFilterEffectOptions['brightness']
    
    /**
     * Controls how much the component's color contrast is adjusted when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Only applies for regular variants. Outlined/mild variants use internal color transformations instead.
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
    contrast             ?: CssFilterEffectOptions['contrast']
    
    /**
     * Controls how much the component's color saturation is adjusted when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Only applies for regular variants. Outlined/mild variants use internal color transformations instead.
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
    saturate             ?: CssFilterEffectOptions['saturate']
    
    /**
     * Controls how much the component's color hue is rotated when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Only applies for regular variants. Outlined/mild variants use internal color transformations instead.
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
    hueRotate            ?: CssFilterEffectOptions['hueRotate']
    
    /**
     * Controls how much the component is blurred when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Only applies for regular variants. Outlined/mild variants use internal color transformations instead.
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
    blur                 ?: CssFilterEffectOptions['blur']
    
    /**
     * Specifies the drop shadow to apply when fully active.
     * 
     * - Transitions smoothly from inactive → active.
     * - Only applies for regular variants. Outlined/mild variants use internal color transformations instead.
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
    dropShadow           ?: CssFilterEffectOptions['dropShadow']
}



/**
 * Provides a CSS API for applying active-state effects that emphasize the current theme colors,
 * making components **visually stand out** when active.
 */
export interface CssActiveEffect {
    /**
     * Attaches CSS rules for active-state effects that emphasize the current theme colors,
     * making components **visually stand out** when active.
     * 
     * Exposes strongly typed CSS variables for transitional effects.
     * 
     * Behavior:
     * - Regular variants: darken in light mode or lighten in dark mode.
     * - Outlined/mild variants: interpolate from variant colors to regular colors.
     * 
     * Smoothly transitions between active and inactive states by animating colors and/or filter effects.
     * Affects background, foreground, decoration, and border colors.
     */
    activeEffectRule : Lazy<CssRule>
    
    /**
     * Exposes active-effect CSS variables for transitional effects.
     * 
     * Includes:
     * - `activeFilter` : Brightness/contrast/saturation interpolation during active transitions.
     * 
     * ⚠️ **Caution**: These variables are invalid when the component is fully inactive.
     * If used incorrectly, they can invalidate CSS declarations.
     * Always wrap them with `switchOf(...)` for safe fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    activeEffectVars : CssVars<ActiveEffectVars>
}
