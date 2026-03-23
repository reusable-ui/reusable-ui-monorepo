// React:
import {
    // Types:
    type RefObject,
    type CSSProperties,
}                           from 'react'

// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssCustomRef,
    type CssKnownProps,
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * An API for supporting `usesCollapseEffect()` (the CSS styling effects) by supplying and continuously updating
 * the required sizing variables, injected into the component's inline style.
 * This ensures the collapse/expand styling effects work correctly.
 * 
 * @template TElement - The type of the collapsible DOM element.
 */
export interface CollapsibleSize<TElement extends HTMLElement = HTMLElement> {
    /**
     * Ref to the collapsible DOM element being measured.
     * 
     * Required for observing and reporting the element's total size.
     */
    ref              : RefObject<TElement | null>
    
    /**
     * A set of inline CSS variables reflecting the element's current total size.
     * 
     * The returned style object is referentially stable as long as the measured size remains unchanged.
     * This ensures predictable rendering behavior and avoids unnecessary re-renders in React.
     */
    collapsibleStyle : CSSProperties
}



/**
 * A list of CSS variables used for collapse-effect styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface CollapseEffectVars {
    /**
     * Represents the measured total inline size (width) of the collapsible element,
     * excluding margins.
     * 
     * - Updated before an expand/collapse transition begins.
     * - Used to determine the initial width during collapse.
     * - Used to determine the final width during expansion.
     */
    measuredInlineSize         : unknown
    
    /**
     * Represents the measured total block size (height) of the collapsible element,
     * excluding margins.
     * 
     * - Updated before an expand/collapse transition begins.
     * - Used to determine the initial height during collapse.
     * - Used to determine the final height during expansion.
     */
    measuredBlockSize          : unknown
    
    /**
     * References the translation offset applied when expanding or collapsing along the chosen axis.
     * 
     * - Always resolves to a non-positive length value,
     *   indicating how far the element's original position is shifted away.
     * - Becomes `unset` when the component is:
     *   - fully expanded, or
     *   - fully collapsed with `options.display` is set
     * - Can be used by any logical shifting technique
     *   (e.g. negative `margin-inline-start`, negative `margin-block-end`, etc.) to move the collapsible element.
     */
    collapseTranslate          : unknown
    
    /**
     * References a manipulated margin-left applied when expanding or collapsing along the inline axis
     * from the logical start side.
     * 
     * - Becomes `unset` when the component is:
     *   - fully expanded, or
     *   - fully collapsed with `options.display` is set
     * - Unused unless `options.orientation === 'inline'` and `options.flowDirection === 'start'`.
     * - Should be applied to the CSS `marginInlineStart` property of the collapsible element.
     */
    collapseMarginInlineStart  : unknown
    
    /**
     * References a manipulated margin-right applied when expanding or collapsing along the inline axis
     * from the logical end side.
     * 
     * - Becomes `unset` when the component is:
     *   - fully expanded, or
     *   - fully collapsed with `options.display` is set
     * - Unused unless `options.orientation === 'inline'` and `options.flowDirection === 'end'`.
     * - Should be applied to the CSS `marginInlineEnd` property of the collapsible element.
     */
    collapseMarginInlineEnd    : unknown
    
    /**
     * References a manipulated margin-top applied when expanding or collapsing along the block axis
     * from the logical start side.
     * 
     * - Becomes `unset` when the component is:
     *   - fully expanded, or
     *   - fully collapsed with `options.display` is set
     * - Unused unless `options.orientation === 'block'` and `options.flowDirection === 'start'`.
     * - Should be applied to the CSS `marginBlockStart` property of the collapsible element.
     */
    collapseMarginBlockStart   : unknown
    
    /**
     * References a manipulated margin-bottom applied when expanding or collapsing along the block axis
     * from the logical end side.
     * 
     * - Becomes `unset` when the component is:
     *   - fully expanded, or
     *   - fully collapsed with `options.display` is set
     * - Unused unless `options.orientation === 'block'` and `options.flowDirection === 'end'`.
     * - Should be applied to the CSS `marginBlockEnd` property of the collapsible element.
     */
    collapseMarginBlockEnd     : unknown
    
    /**
     * References a manipulated clip-path applied when expanding or collapsing.
     * 
     * - Becomes `unset` when the component is:
     *   - fully expanded, or
     *   - fully collapsed with `options.display` is set
     * - Should be applied to the CSS `clipPath` property of the collapsible element.
     */
    collapseClipPath           : unknown
    
    /**
     * References the CSS `display` property applied when fully collapsed.
     * 
     * - Becomes `unset` when the component is:
     *   - not fully collapsed, or
     *   - `options.display` is not set
     * - Should be applied (with default fallback) to the CSS `display` property of the collapsible element.
     *   E.g. `display: switchOf(collapseDisplay, 'grid')`
     */
    collapseDisplay            : unknown
    
    /**
     * A multiplier for the effective writing direction.
     * 
     * - Defaults to `1` (LTR).
     * - Flips to `-1` when the effective writing direction is RTL.
     * 
     * Ensures offsets and translations invert correctly depending on layout direction.
     */
    writingDirectionFactor     : unknown
    
    /**
     * A multiplier for the effective writing mode orientation.
     * 
     * - Defaults to `1`.
     * - Flips to `-1` when orientation is:
     *   - Inline with `sideways-lr` writing mode.
     *   - Block  with `vertical-rl` or `sideways-rl` writing mode.
     * 
     * Ensures transforms adapt correctly when switching between horizontal and vertical writing modes.
     */
    writingModeFactor          : unknown
    
    /**
     * Represents the "elastic" bump factor during overshoot or undershoot.
     * 
     * - Becomes `unset` when the component is:
     *   - fully expanded, or
     *   - fully collapsed
     * - The bump factor on overshoot/undershoot:
     *   - Factor > 1      → Positive (over-expanded).
     *   - Factor < 0      → Negative (under-collapsed).
     *   - Between 0 and 1 → 0 (neutral).
     */
    bumpFactorCond             : unknown
    
    /**
     * References the physical translation applied during overshoot.
     * Compensates the unwanted revealing-side shift caused by overshoot scaling,
     * so the revealing side remains visually anchored.
     * 
     * - Already resolved into a physical axis (X or Y) and sign (+/-),
     *   adapting automatically to orientation, flow direction, writing direction, and writing mode.
     * - Pass directly into `translateX(...)`/`translateY(...)` to compensate the unwanted revealing-side shift.
     * - Becomes `unset` when the component is:
     *   - fully expanded, or
     *   - fully collapsed
     */
    overshootTranslatePhysical : unknown
    
    /**
     * References the axis-relative scale applied during overshoot.
     * Enlarges the collapsible element slightly along the expanding axis to create
     * an elastic effect.
     * 
     * - Unitless factor, mapped to the expanding axis.
     * - Pass directly into `scaleX(...)`/`scaleY(...)` to stretch the component along the expanding axis to create
     *   an elastic effect.
     * - Becomes `unset` when the component is:
     *   - fully expanded, or
     *   - fully collapsed
     */
    overshootScaleAxis         : unknown
    
    /**
     * References the composed transform applied during overshoot.
     * 
     * - Built from a `translate(...)` + `scale(...)` pair,
     *   adapting automatically to orientation, flow direction, writing direction, and writing mode.
     * - Becomes `unset` when the component is:
     *   - fully expanded, or
     *   - fully collapsed
     * - Typically not consumed directly — instead use:
     *   `const { transformFeatureVars: { transform } } = usesTransformFeature()`
     */
    overshootTransform         : unknown
}



/**
 * Configuration options for customizing collapse effects.
 */
export interface CssCollapseEffectOptions {
    /**
     * Selects a logical axis along which the sliding-crop is applied.
     * 
     * Accepts:
     * - `'inline'` → sliding along the horizontal axis (for horizontal-tb).
     * - `'block'`  → sliding along the vertical axis  (for horizontal-tb).
     * - `0`        → equivalent to `'inline'`.
     * - `1`        → equivalent to `'block'`.
     * - A CSS variable reference resolving to `0` or `1`, e.g. `var(--my-orientation)`.
     * 
     * Defaults to `'block'` (vertical axis in horizontal-tb).
     */
    orientation   ?: 'inline' | 'block' | 0 | 1 | CssCustomRef
    
    /**
     * Selects the side from which the content is revealed when expanding,
     * or exits when collapsing:
     * - `'start'` → content reveals/exits from the logical start side.
     * - `'end'`   → content reveals/exits from the logical end side.
     * 
     * Defaults to `'start'` (content reveals/exits from the logical start side).
     */
    flowDirection ?: 'start' | 'end'
    
    /**
     * Applies the CSS `display` property when fully collapsed.
     * 
     * Purpose:
     * - Applied after the collapse animation completes.
     * - Optimizes performance by removing collapse effects when the component should no longer be visible.
     * - If `'unset'`, the original display property is preserved and collapse effects remain active.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value, e.g. `'hidden'`
     * - A strongly typed reference, e.g. `myConfig.display`
     * - `'unset'` → do not overwrite the component's display property
     * 
     * Defaults to `'none'` (component removed from layout and rendering tree).
     */
    display       ?: CssKnownProps['display']
}



/**
 * Provides a CSS API for applying collapse-state effects that slide down/up the entire component surface,
 * making components **visually revealed or hidden** as they expand or collapse.
 */
export interface CssCollapseEffect {
    /**
     * Attaches CSS rules for collapse-state effects that slide down/up the entire component surface,
     * making components **visually revealed or hidden** as they expand or collapse.
     * 
     * Exposes strongly typed CSS variables for transitional effects.
     * 
     * Behavior:
     * - factor = 0      → the element is fully shifted away from its original placement.
     * - factor = 0.5    → the element is partially shifted.
     * - factor = 1      → no margin adjustment (element sits in its normal placement).
     * - Between 0 and 1 → smooth interpolation.
     * 
     * Ensures smooth transitions between expanded and collapsed states by animating negative margins and
     * cropping a portion of the component's area.
     * Preserving the original content size without squashing or distorting its layout.
     */
    collapseEffectRule : Lazy<CssRule>
    
    /**
     * Exposes collapse-effect CSS variables for transitional effects.
     * 
     * Includes:
     * - `measuredInlineSize` : The measured total inline size of the collapsible element, excluding margins.
     * - `measuredBlockSize`  : The measured total block size of the collapsible element, excluding margins.
     * - `collapseMargin*`    : A manipulated negative margin when expanding or collapsing along the chosen axis.
     * - `collapseClipPath`   : A manipulated clip-path when expanding or collapsing.
     * 
     * ⚠️ **Caution**: These variables are invalid when the component is fully expanded or fully collapsed.
     * If used incorrectly, they can invalidate CSS declarations.
     * Always wrap them with `switchOf(...)` for safe fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    collapseEffectVars : CssVars<CollapseEffectVars>
}
