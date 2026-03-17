// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomRef,
    
    
    
    // Writes css in javascript:
    rule,
    fallback,
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    cssVars,
    switchOf,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ViewEffectVars,
    type CssViewEffectOptions,
    type CssViewEffect,
}                           from './types.js'

// Reusable-ui features:
import {
    transformRegistry,
}                           from '@reusable-ui/transform-feature'   // A styling utility for composing a unified transform stack from custom and registered state packages.

// Reusable-ui states:
import {
    usesViewState,
}                           from '@reusable-ui/view-state'          // Lifecycle-aware view-switching with transition animations and semantic styling hooks for UI components.



/**
 * A strongly typed global mapping of view-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [viewEffectVars] = cssVars<ViewEffectVars>({ prefix: 'vie', minify: false });

// Register the view transform globally for composing a unified transform stack across effect packages:
transformRegistry.registerTransform(viewEffectVars.viewTransform);



/**
 * Applies view-state effects that slide between views,
 * making components **visually transitioned** to the next view or step.
 * 
 * Exposes strongly typed CSS variables for transitional effects.
 * 
 * Smoothly transitions between views by moving (translating) the entire set of views along the stacking axis.
 * Gradually revealing the target view inside the container viewport while moving the others out of sight.
 * This creates a natural **switching illusion** of view changes.
 * 
 * @param options - An optional configuration for customizing view effects.
 * @returns A CSS API containing effect rules and CSS variables for the sliding transitions.
 */
export const usesViewEffect = (options?: CssViewEffectOptions): CssViewEffect => {
    // Extract options and assign defaults:
    const {
        minViewIndex              = 0,         // Defaults to `0` (zero-based index).
        viewSize                  = '100%',    // Defaults to `'100%'` (full container size).
        viewOffset                = '0px',     // Defaults to `'0px'` (no offset).
        viewSpacing               = '0px',     // Defaults to `'0px'` (no spacing between views).
        viewSpacingMode           = 'between', // Defaults to `'between'` (no spacing at the edges, only between views).
        viewOrientation           = 'inline',  // Defaults to `'inline'` (horizontal axis for horizontal-tb).
        viewFlowDirection         = 'start',   // Defaults to `'start'` (translation begins at the logical start side).
        enablesSelectiveRendering = false,     // Defaults to `false` (all views are mounted, no selective rendering).
    } = options ?? {};
    
    
    
    /**
     * Normalizes `viewOrientation` into a factor usable in CSS math:
     * - Resolves to `0` for `'inline'`.
     * - Resolves to `1` for `'block'`.
     * - Passes through CSS variable references unchanged.
     * 
     * The result is guaranteed to be either `0`, `1`, or a `var(...)` reference,
     * so it can be safely consumed inside `calc()` or other CSS functions.
     */
    const orientationFactor : 0 | 1 | CssCustomRef = (
        (viewOrientation === 'inline')
        ? 0
        : (
            (viewOrientation === 'block')
            ? 1
            : viewOrientation
        )
    );
    
    
    
    // States:
    const { viewStateVars : { viewIndex, prevViewIndex, viewFactor, viewFactorCond } } = usesViewState();
    
    /**
     * Optimization opportunity:
     * - When fully settled, the view transformation can be safely omitted if:
     *   - Selective rendering is enabled (collapsed into a **single** view, no need to shift into the viewport).
     *   - No initial offset that **always** shifts the entire set of views:
     *     - The view spacing mode is `between`, or
     *     - The view offset is statically known to `0` or equivalent (no CSS variable passed).
     * - When optimized, the `baseTranslationFormula` resolves to `unset` instead of `0` when settled,
     *   invalidating `viewTranslateLogical` and `viewTransform`.
     */
    const optimizedViewFactor = (
        // If conditions are met, the view transformation can be safely omitted:
        (enablesSelectiveRendering && ((viewSpacingMode === 'between') || (viewOffset === null) || (viewOffset === 0) || String(viewOffset).match(/0+\S?/g)))
        ? viewFactorCond // Will be `unset` when fully settled.
        
        // Otherwise, transformation cannot be safely omitted:
        : viewFactor     // Will be `0` when fully settled.
    );
    
    // Variables:
    const { writingDirectionFactor, writingModeFactor, viewTranslateLogical, viewTransform } = viewEffectVars;
    
    
    
    // Sub-Formulas:
    
    /**
     * The initial offset before the first view:
     * - Always includes the static `viewOffset` for container alignment.
     * - Adds the front spacing based on `viewSpacingMode`:
     *   - mode='between' → no front spacing.
     *   - mode='around'  → half spacing.
     *   - mode='even'    → full spacing.
     * - Ensures the first view is correctly positioned inside the container.
     * - If no views exist, `viewTransform` is not applicable.
     */
    const initialOffsetFormula        = `(${viewOffset})` + (
        (viewSpacingMode === 'between')
        ? ''
        : (
            (viewSpacingMode === 'around')
            ? ` + ((${viewSpacing}) / 2)`
            : ` + (${viewSpacing})`
        )
    );
    
    /**
     * Calculates the static offset required to correctly align the origin view into the viewport.
     * - This offset accounts for the number of views preceding the origin view.
     * - When **selective rendering is disabled** (all views are rendered):
     *   - Requires `(origin index - zero/custom-based index)` to determine the preceding offset.
     *   - Indices may be zero-based or custom-based depending on `minViewIndex`.
     * - When **selective rendering is enabled** (only transitioning views are rendered):
     *   - Advancing (target index > origin index):
     *     - The origin view is already positioned at the left-most edge.
     *     - For integer indices, no preceding offset is needed.
     *     - For fractional indices, the view at `floor(origin)` is aligned,
     *       but we want to align at `origin.<fraction>`.
     *       → Formula: `(originIndex - round(down, originIndex))`
     *   - Receding (target index < origin index):
     *     - The target view is placed at the left-most edge.
     *     - For integer indices, requires `(origin index - target index)` to align the origin view.
     *     - For fractional indices, the view at `floor(origin)` is aligned,
     *       but we want to align at `origin.<fraction>`.
     *       → Formula: `(originIndex - round(down, targetIndex))`
     * 
     * - Universal formula:
     *   - Both advancing and receding can be expressed as:  
     *     `(originIndex - round(down, min(originIndex, targetIndex)))`
     *   - This handles integer and fractional indices consistently.
     */
    const precedingViewsFormula       = (
        // Disabled selective rendering → origin - minViewIndex:
        !enablesSelectiveRendering
        ? `${switchOf(prevViewIndex, viewIndex)} - ${minViewIndex}`
        
        // Enabled selective rendering → universal fractional-aware formula:
        : `${switchOf(prevViewIndex, viewIndex)} - round(down, min(${switchOf(prevViewIndex, viewIndex)}, ${viewIndex}))`
    );
    
    /**
     * Counts the number of steps between origin and target views.
     * - Represents how many steps the transition must cover.
     * - Always resolves to a non-negative value (magnitude only, sign discarded).
     *   - `0` indicates no change (origin and target are the same view).
     * - Directional information (advancing vs receding) is carried by the **view factor**,
     *   allowing overshoot/undershoot effects to be preserved.
     * - The current implementation uses the `max(...)` trick to extract magnitude only.
     *   - Equivalent to `abs(...)`, but `max(...)` is used until `abs(...)` is fully supported across major browsers.
     */
    const transitioningStepsFormula   = `max(${viewIndex} - ${switchOf(prevViewIndex, viewIndex)}, ${switchOf(prevViewIndex, viewIndex)} - ${viewIndex})`;
    
    /**
     * The per-step distance:
     * - Each step adds the configured spacing plus the view's width.
     * - Represents how much extra distance is required when another view is added.
     */
    const perStepDistanceFormula      = `(${viewSpacing}) + (${viewSize})`;
    
    /**
     * Base translation formula (standard case):
     * 
     * - Assumes inline-start orientation, horizontal-tb, LTR.
     * - Always reduces the initial offset.
     * - Naturally maps to "leftward" without sign flipping.
     * - May later be flipped depending on writing direction, writing mode, and flow direction.
     * 
     * ### Sub-Formulas
     * Each `*Formula*` may involve complex math.  
     * Parentheses are required to enforce the correct order of math operations
     * before combining with other math operations.
     * 
     * ### Factors
     * Each `*Factor*` is already a `var(...)` reference (an atomic CSS value).  
     * Parentheses are not required when combining with other math operations,
     * because they resolve directly to a single unit.
     */
    const baseTranslationFormula      = `(${initialOffsetFormula}) - ((${precedingViewsFormula}) + ((${transitioningStepsFormula}) * ${optimizedViewFactor})) * (${perStepDistanceFormula})`;
    
    /**
     * Conditional writing direction multiplier:
     * 
     * - Defaults to `1` (no flip).
     * - Flips to `-1` when orientation is inline and effective writing direction is RTL.
     * 
     * Uses `orientationFactor` (0 = inline, 1 = block) to gate the multiplier.
     * 
     * ### Factors
     * Each `*Factor*` is already a `var(...)` reference (an atomic CSS value).  
     * Parentheses are not required when combining with other math operations,
     * because they resolve directly to a single unit.
     */
    const writingDirectionFlipFormula = `(1 - ${orientationFactor}) * ${writingDirectionFactor} + ${orientationFactor}`;
    
    
    
    return {
        viewEffectRule : () => style({
            /**
             * Direction factor:
             * - Defaults to `1` (LTR).
             * - Flips to `-1` when the effective writing direction is RTL.
             * 
             * Ensures offsets and translations invert correctly depending on layout direction.
             */
            ...fallback({
                ...vars({
                    // Defaults to LTR for most modes:
                    [writingDirectionFactor]: 1,
                }),
            }),
            ...fallback({
                // RTL via attribute detection:
                ...rule(':dir(rtl)', {
                    ...vars({
                        [writingDirectionFactor]: -1,
                    }),
                }),
            }),
            ...fallback({
                // Future CSS-based detection:
                [writingDirectionFactor]: `if(style(direction: rtl): -1; else: 1;)`,
            }),
            
            
            
            /**
             * Writing mode factor:
             * - Defaults to `1`.
             * - Flips to `-1` when orientation is:
             *   - Inline with `sideways-lr` writing mode.
             *   - Block  with `vertical-rl` or `sideways-rl` writing mode.
             * 
             * Ensures transforms adapt correctly when switching between horizontal and vertical writing modes.
             */
            ...fallback({
                ...vars({
                    // Defaults to 1 for most modes:
                    [writingModeFactor]: 1,
                }),
            }),
            ...fallback({
                // Future CSS-based detection:
                [writingModeFactor]: `if(style(writing-mode: sideways-lr): calc(2 * ${orientationFactor} - 1); style((writing-mode: vertical-rl) or (writing-mode: sideways-rl)): calc(1 - 2 * ${orientationFactor}); else: 1;)`,
            }),
            
            
            
            ...vars({
                /**
                 * Adaptive translation formula (converted from logical to physical):
                 * 
                 * - Based on `baseTranslationFormula`.
                 * - Sign may be flipped depending on writing direction, writing mode, and flow direction.
                 * - Can be passed to `translateX` or `translateY` inside `transform(...)`.
                 * - `viewFlowDirection` is evaluated at build time (no runtime changes yet).
                 * 
                 * ### Sub-Formulas
                 * Each `*Formula*` may involve complex math.  
                 * Parentheses are required to enforce the correct order of math operations
                 * before combining with other math operations.
                 * 
                 * ### Factors
                 * Each `*Factor*` is already a `var(...)` reference (an atomic CSS value).  
                 * Parentheses are not required when combining with other math operations,
                 * because they resolve directly to a single unit.
                 */
                [viewTranslateLogical   ] : `calc((${baseTranslationFormula}) * (${writingDirectionFlipFormula}) * ${writingModeFactor}${(viewFlowDirection === 'end') ? ' * -1' : ''})`,
                
                /**
                 * Adaptive translation function (converted to horizontal/vertical orientation):
                 * 
                 * - Based on `viewTranslateLogical`.
                 * - Switches between horizontal and vertical translation based on `orientationFactor`.
                 * 
                 * ### Factors
                 * Each `*Factor*` is already a `var(...)` reference (an atomic CSS value).  
                 * Parentheses are not required when combining with other math operations,
                 * because they resolve directly to a single unit.
                 */
                [viewTransform          ] : `translate(calc((${viewTranslateLogical}) * (1 - ${orientationFactor})), calc((${viewTranslateLogical}) * ${orientationFactor}))`,
            }),
        }),
        
        viewEffectVars,
    } satisfies CssViewEffect;
};
