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

// Reusable-ui states:
import {
    type ViewStateOptions,
}                           from '@reusable-ui/view-state'          // Lifecycle-aware view-switching with transition animations and semantic styling hooks for UI components.



/**
 * A list of CSS variables used for view-effect styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ViewEffectVars {
    /**
     * A multiplier for the effective writing direction.
     * 
     * - Defaults to `1` (LTR).
     * - Flips to `-1` when the effective writing direction is RTL.
     * 
     * Ensures offsets and translations invert correctly depending on layout direction.
     */
    writingDirectionFactor : unknown
    
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
    writingModeFactor      : unknown
    
    /**
     * References the physical translation applied when the component is transitioning,
     * either advancing to the next view or receding to the previous one.
     * 
     * - Already resolved into a physical axis (X or Y) and sign (+/-),
     *   adapting automatically to orientation, flow direction, writing direction, and writing mode.
     * - Pass directly into `translateX(...)`/`translateY(...)` to move the entire set of views.
     * - Becomes `unset` when the component is fully settled (if `options.enablesSelectiveRendering` is enabled).
     */
    viewTranslatePhysical  : unknown
    
    /**
     * References the composed transform applied when the component is transitioning,
     * either advancing to the next view or receding to the previous one.
     * 
     * - Built from a `translate(...)` function,
     *   adapting automatically to orientation, flow direction, writing direction, and writing mode.
     * - Becomes `unset` when the component is fully settled (if `options.enablesSelectiveRendering` is enabled).
     * - Typically not consumed directly — instead use:
     *   `const { transformFeatureVars: { transform } } = usesTransformFeature()`
     */
    viewTransform          : unknown
}



/**
 * Defines how spacing is distributed across views.
 * 
 * - `'between'` → spacing only between consecutive views (like flexbox `space-between`).
 * - `'around'`  → spacing around each view, outer edges get half spacing (like flexbox `space-around`).
 * - `'even'`    → spacing distributed evenly, including first and last edges (like flexbox `space-evenly`).
 */
export type ViewSpacingMode =
    | 'between'
    | 'around'
    | 'even'

/**
 * Configuration options for customizing view effects.
 */
export interface CssViewEffectOptions
    extends
        // Bases:
        Pick<ViewStateOptions, 'minViewIndex'>
{
    /**
     * Specifies the width (or height for vertical layouts) of each view.
     * All views are expected to have the same size.
     * 
     * - Used to calculate the appropriate translation offset during transitions.
     * - Ensures consistent sliding behavior across all views.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value with a length unit, e.g. `'8rem'`
     * - A strongly typed reference, e.g. `myConfig.viewSize`
     * 
     * Notes:
     * - Percentage units are allowed.
     * - Negative values are not allowed.
     * 
     * Defaults to `'100%'` (full container size).
     */
    viewSize                  ?: CssKnownProps['width']
    
    /**
     * Specifies a global logical offset applied to the entire set of views.
     * 
     * Shifts each view consistently relative to the container,
     * compensating for fixed UI elements (e.g. toolbars).
     * 
     * The offset is expressed in logical units,
     * so it adapts to writing direction and mode automatically:
     * - Inline axis → offset from the left (for LTR and horizontal-tb).
     * - Block axis  → offset from the top  (for horizontal-tb).
     * 
     * See `viewOrientation` and `viewFlowDirection` for how the
     * logical axis and flow are determined.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value with a length unit, e.g. `'2rem'`
     * - A strongly typed reference, e.g. `myConfig.viewOffset`
     * 
     * Notes:
     * - Percentage units are allowed.
     * - Negative values are allowed.
     * 
     * Defaults to `'0px'` (no offset).
     */
    viewOffset                ?: CssKnownProps['width']
    
    /**
     * Specifies the spacing applied to views.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value with a length unit, e.g. `'2rem'`
     * - A strongly typed reference, e.g. `myConfig.viewSpacing`
     * 
     * Notes:
     * - Percentage units are allowed.
     * - Negative values are not allowed.
     * 
     * Defaults to `'0px'` (no spacing between views).
     */
    viewSpacing               ?: CssKnownProps['width']
    
    /**
     * Defines how `viewSpacing` is distributed across views.
     * 
     * Accepts:
     * - `'between'` → spacing only between consecutive views (like flexbox `space-between`).
     * - `'around'`  → spacing around each view, outer edges get half spacing (like flexbox `space-around`).
     * - `'even'`    → spacing distributed evenly, including first and last edges (like flexbox `space-evenly`).
     * 
     * Defaults to `'between'` (no spacing at the edges, only between views).
     */
    viewSpacingMode           ?: ViewSpacingMode
    
    /**
     * Selects a logical axis along which views are translated.
     * 
     * Accepts:
     * - `'inline'` → translation along the horizontal axis (for horizontal-tb).
     * - `'block'`  → translation along the vertical axis  (for horizontal-tb).
     * - `0`        → equivalent to `'inline'`.
     * - `1`        → equivalent to `'block'`.
     * - A CSS variable reference resolving to `0` or `1`, e.g. `var(--my-orientation)`.
     * 
     * Defaults to `'inline'` (horizontal axis in horizontal-tb).
     */
    viewOrientation           ?: 'inline' | 'block' | 0 | 1 | CssCustomRef
    
    /**
     * Selects a logical flow direction along the chosen `viewOrientation`.
     * 
     * Accepts:
     * - `'start'` → translation begins at the logical start side.
     * - `'end'`   → translation begins at the logical end side.
     * 
     * Defaults to `'start'` (translation begins at the logical start side).
     */
    viewFlowDirection         ?: 'start' | 'end'
    
    /**
     * Enables selective rendering mode.
     * 
     * If you implement the selective rendering optimization in the React side,
     * this option should be enabled to correctly transform the view within the viewport.
     * 
     * Accepts:
     * - `true`  → Only visible and transitioning views are mounted in the DOM.
     * - `false` → All views remain mounted.
     * 
     * Defaults to `false` (all views are mounted, no selective rendering).
     */
    enablesSelectiveRendering ?: boolean
}



/**
 * Provides a CSS API for applying view-state effects that slide between views,
 * making components **visually transitioned** to the next view or step.
 */
export interface CssViewEffect {
    /**
     * Attaches CSS rules for view-state effects that slide between views,
     * making components **visually transitioned** to the next view or step.
     * 
     * Exposes strongly typed CSS variables for transitional effects.
     * 
     * Behavior:
     * - factor = -1 → Receding transition (previous target view fully visible).
     * - factor = 0  → Settled state (origin view fully visible).
     * - factor = +1 → Advancing transition (next target view fully visible).
     * - Between -1 and +1 → Smooth interpolation between origin and target.
     * 
     * Smoothly transitions between views by moving (translating) the entire set of views along the stacking axis.
     * Gradually revealing the target view inside the container viewport while moving the others out of sight.
     * This creates a natural **switching illusion** of view changes.
     */
    viewEffectRule : Lazy<CssRule>
    
    /**
     * Exposes view-effect CSS variables for transitional effects.
     * 
     * Includes:
     * - `viewTranslatePhysical` : The physical translation applied during transitions.
     * - `viewTransform`         : The transform applied during transitions.
     * 
     * ⚠️ **Caution**: These variables are invalid when the component is fully settled.
     * If used incorrectly, they can invalidate CSS declarations.
     * Always wrap them with `switchOf(...)` for safe fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    viewEffectVars : CssVars<ViewEffectVars>
}
