// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomRef,
    
    
    
    // Writes css in javascript:
    rule,
    states,
    alwaysRule,
    fallback,
    style,
    vars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CssCollapseEffectOptions,
    type CssCollapseEffect,
}                           from './types.js'

// CSS Variables:
import {
    collapseEffectVars,
}                           from './css-variables.js'

// Reusable-ui states:
import {
    usesCollapseState,
    ifExpanded,
    ifCollapsed,
}                           from '@reusable-ui/collapse-state'      // Lifecycle-aware expand/collapse state with transition animations and semantic styling hooks for UI components.



/**
 * Applies collapse-state effects that slide down/up the entire component surface,
 * making components **visually revealed or hidden** as they expand or collapse.
 * 
 * Exposes strongly typed CSS variables for transitional effects.
 * 
 * Ensures smooth transitions between expanded and collapsed states by animating negative margins and
 * cropping a portion of the component's area.
 * 
 * Important:  
 * This CSS hook requires `useCollapsibleSize()` to be implemented on the React side.
 * That hook measures the element's total size and injects the values as CSS variables,
 * enabling the collapse transitions to work correctly.
 * 
 * @param options - An optional configuration for customizing collapse effects.
 * @returns A CSS API containing effect rules and CSS variables for the slide down/up transitions.
 */
export const usesCollapseEffect = (options?: CssCollapseEffectOptions): CssCollapseEffect => {
    // Extract options and assign defaults:
    const {
        orientation   = 'block', // Defaults to `'block'` (vertical axis in horizontal-tb).
        flowDirection = 'start', // Defaults to `'start'` (content reveals/exits from the logical start side).
        display       = 'none',  // Defaults to `'none'` (component removed from layout and rendering tree).
    } = options ?? {};
    
    
    
    /**
     * Normalizes `orientation` into a numeric factor usable in CSS math:
     * - Resolves to `0` for `'inline'`.
     * - Resolves to `1` for `'block'`.
     * - Passes through CSS variable references unchanged.
     * 
     * The result is guaranteed to be either `0`, `1`, or a `var(...)` reference,
     * so it can be safely consumed inside `calc()` or other CSS functions.
     */
    const orientationFactor : 0 | 1 | CssCustomRef = (
        (orientation === 'inline')
        ? 0
        : (
            (orientation === 'block')
            ? 1
            : orientation
        )
    );
    
    
    
    // States:
    const { collapseStateVars : { expandFactorCond } } = usesCollapseState();
    
    // Variables:
    const {
        measuredInlineSize,
        measuredBlockSize,
        
        collapseTranslate,
        
        collapseMarginInlineStart,
        collapseMarginInlineEnd,
        collapseMarginBlockStart,
        collapseMarginBlockEnd,
        
        collapseClipPath,
        
        collapseDisplay,
        
        writingDirectionFactor,
        writingModeFactor,
        
        bumpFactorCond,
        overshootTranslatePhysical,
        overshootScaleAxis,
        overshootTransform,
    } = collapseEffectVars;
    
    
    
    // Sub-Formulas:
    
    /**
     * Provides the total size along the expanding axis (height for block, width for inline),
     * excluding margins.
     * 
     * - Switches between inline size and block size depending on the expand/collapse axis.
     * - Used to determine the initial dimension during collapse.
     * - Used to determine the final dimension during expansion.
     * 
     * ### Factors
     * Each `*Factor*` is already a `var(...)` reference (an atomic CSS value).  
     * Parentheses are not required when combining with other math operations,
     * because they resolve directly to a single unit.
     */
    const measuredAxisSizeFormula     = `${measuredInlineSize} * (1 - ${orientationFactor}) + ${measuredBlockSize} * ${orientationFactor}`;
    
    /**
     * Base translation formula (standard case):
     * 
     * - Compensates the unwanted revealing-side shift caused by overshoot scaling,
     *   so the revealing side remains visually anchored.
     * - Assumes block-start orientation, horizontal-tb, LTR.
     * - Assumes the transform-origin at the center of the collapsible element,
     *   so the compensation shift is half of the scaling increment.
     * - Always applies a positive shift to the anchored side,
     *   ignoring undershoot bump factors.
     * - Naturally maps to "upward" without sign flipping.
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
    const baseTranslateFormula        = `max(0px, ${bumpFactorCond} * (${measuredAxisSizeFormula}) / 2)`;
    
    /**
     * Base scale formula (standard case):
     * 
     * - Enlarges the collapsible element slightly along the expanding axis to create
     *   an elastic effect.
     * - Represents axis-relative scaling (not yet mapped to physical `scaleX()`/`scaleY()`).
     * - Always scales-up the collapsible element,
     *   ignoring undershoot bump factors.
     * - May later be implemented to physical `scaleX()`/`scaleY()` depending on orientation and writing mode.
     * 
     * ### Factors
     * Each `*Factor*` is already a `var(...)` reference (an atomic CSS value).  
     * Parentheses are not required when combining with other math operations,
     * because they resolve directly to a single unit.
     */
    const baseScaleFormula            = `max(1, ${bumpFactorCond} + 1)`;
    
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
        collapseEffectRule : () => style({
            ...vars({
                /**
                 * Translation offset formula:
                 * 
                 * - Always resolves to a non-positive length value,
                 *   indicating how far the element's original position is "shifted away".
                 * - Relies on `measuredInlineSize` or `measuredBlockSize` to fully hide the entire component surface
                 *   when the factor is at its minimum.
                 * - Resolves to `0` when the factor is at its maximum.
                 * - Guarantees correct placement even in overshoot/undershoot scenarios:
                 *   - Never shifts further up once the remaining visible size reaches `0`.
                 *   - Never shifts further down once the component is fully shown.
                 */
                [collapseTranslate        ] : `calc((${measuredAxisSizeFormula}) * clamp(0, 1 - ${expandFactorCond}, 1) * -1)`,
                
                /**
                 * Adaptive margin-left formula:
                 * 
                 * - Based on `collapseTranslate`.
                 * - Enabled if `orientationFactor === 0` (inline) and `flowDirection === 'start'`.
                 * - `flowDirection` is evaluated at build time (no runtime changes yet).
                 */
                [collapseMarginInlineStart] : (flowDirection === 'start') ? `calc(${collapseTranslate} * (1 - ${orientationFactor}))` : 'unset',
                
                /**
                 * Adaptive margin-right formula:
                 * 
                 * - Based on `collapseTranslate`.
                 * - Enabled if `orientationFactor === 0` (inline) and `flowDirection === 'end'`.
                 * - `flowDirection` is evaluated at build time (no runtime changes yet).
                 */
                [collapseMarginInlineEnd  ] : (flowDirection === 'end'  ) ? `calc(${collapseTranslate} * (1 - ${orientationFactor}))` : 'unset',
                
                /**
                 * Adaptive margin-top formula:
                 * 
                 * - Based on `collapseTranslate`.
                 * - Enabled if `orientationFactor === 1` (block) and `flowDirection === 'start'`.
                 * - `flowDirection` is evaluated at build time (no runtime changes yet).
                 */
                [collapseMarginBlockStart ] : (flowDirection === 'start') ? `calc(${collapseTranslate} * ${orientationFactor})` : 'unset',
                
                /**
                 * Adaptive margin-bottom formula:
                 * 
                 * - Based on `collapseTranslate`.
                 * - Enabled if `orientationFactor === 1` (block) and `flowDirection === 'end'`.
                 * - `flowDirection` is evaluated at build time (no runtime changes yet).
                 */
                [collapseMarginBlockEnd   ] : (flowDirection === 'end'  ) ? `calc(${collapseTranslate} * ${orientationFactor})` : 'unset',
                
                /**
                 * Clip-path formula:
                 * 
                 * - Ensures the shifted portion is "cropped away".
                 * - Only shows the component's area within non-negative margin boundaries.
                 * - Uses the `margin-box` parameter to clip **relative to the component's margin box**,
                 *   allowing the formula to remain static while margins drive the dynamic cropping.
                 */
                [collapseClipPath         ] : 'inset(0%) margin-box', // Equivalent to `rect(0% 100% 100% 0%) margin-box` but higher compatibility and more compact formula,
            }),
            
            
            
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
                 * Bump factor:
                 * - Becomes `unset` when the component is:
                 *   - fully expanded, or
                 *   - fully collapsed
                 * - The bump factor on overshoot/undershoot:
                 *   - Factor > 1      → Positive (over-expanded).
                 *   - Factor < 0      → Negative (under-collapsed).
                 *   - Between 0 and 1 → 0 (neutral).
                 */
                [bumpFactorCond            ] : `calc(max(0, ${expandFactorCond} - 1) + min(0, ${expandFactorCond}))`,
                
                /**
                 * Adaptive translation formula (converted from logical to physical translation):
                 * 
                 * - Based on `baseTranslateFormula`.
                 * - Sign may be flipped depending on writing direction, writing mode, and flow direction.
                 * - Pass directly into `translateX(...)`/`translateY(...)` to compensate the unwanted revealing-side shift.
                 * - `flowDirection` is evaluated at build time (no runtime changes yet).
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
                [overshootTranslatePhysical] : `calc((${baseTranslateFormula}) * (${writingDirectionFlipFormula}) * ${writingModeFactor}${(flowDirection === 'end') ? ' * -1' : ''})`,
                
                /**
                 * Translation formula (axis-relative scaling):
                 * 
                 * - Based on `baseScaleFormula`.
                 * - Pass directly into `scaleX(...)`/`scaleY(...)` to stretch the component along the expanding axis to create
                 *   an elastic effect.
                 */
                [overshootScaleAxis        ] : baseScaleFormula,
                
                /**
                 * Adaptive transform formula (converted to physical translation and scaling):
                 * 
                 * - Based on `overshootTranslatePhysical` and `overshootScaleAxis`.
                 * - Switches between horizontal and vertical translation based on `orientationFactor`.
                 * - Switches between horizontal and vertical scaling based on `orientationFactor`.
                 * 
                 * ### Factors
                 * Each `*Factor*` is already a `var(...)` reference (an atomic CSS value).  
                 * Parentheses are not required when combining with other math operations,
                 * because they resolve directly to a single unit.
                 */
                [overshootTransform        ] : `translate(calc(${overshootTranslatePhysical} * (1 - ${orientationFactor})), calc(${overshootTranslatePhysical} * ${orientationFactor})) scale(calc(1 - (1 - ${overshootScaleAxis}) * (1 - ${orientationFactor})), calc(1 - (1 - ${overshootScaleAxis}) * ${orientationFactor}))`,
            }),
            
            
            
            ...states([
                ifExpanded({
                    /**
                     * When fully expanded, we can safely make some optimizations by omitting:
                     * - Translation → No need to "shift away" to the element's original position.
                     * - Clipping    → No need to "crop away" to the element's surface portion.
                     * - Bump factor → No need "elastic effects" to expanded elements.
                     */
                    [collapseTranslate] : 'unset', // All derived `collapseMargin*` are indirectly become `'unset'` too.
                    [collapseClipPath ] : 'unset',
                    [bumpFactorCond   ] : 'unset', // All derived `collapseTranslatePhysical` and `collapseTransform` are indirectly become `'unset'` too.
                }),
                
                (
                    (display !== 'unset')
                    ? ifCollapsed({
                        /**
                         * Collapse display:
                         * - Not specified  → always invalid (`unset`).
                         * - Fully expanded → ignored (browser skips invalid formula).
                         * - Expanding      → ignored (browser skips invalid formula).
                         * - Collapsing     → ignored (browser skips invalid formula).
                         * - Otherwise      → switches discretely to the configured CSS `display` property
                         *                     when fully collapsed.
                         */
                        [collapseDisplay  ] : display, // Set to `'none'` or `'hidden'` or prefered display in `options`.
                        
                        
                        
                        /**
                         * When fully hidden, we can safely make some optimizations by omitting:
                         * - Translation → No need to "shift away" to the element's original position.
                         * - Clipping    → No need to "crop away" to the element's surface portion.
                         * - Bump factor → No need "elastic effects" to hidden elements.
                         */
                        // [collapseTranslate] : 'unset', // Not needed, already 'unset' by derived from `expandFactorCond` ('unset' when fully collapsed).
                        [collapseClipPath ] : 'unset',
                        // [bumpFactorCond   ] : 'unset', // Not needed, already 'unset' by derived from `expandFactorCond` ('unset' when fully collapsed).
                    })
                    : alwaysRule({
                        [collapseDisplay  ] : 'unset',
                    })
                ),
            ]),
        }),
        
        collapseEffectVars,
    } satisfies CssCollapseEffect;
};
