// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssKnownProps,
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui utilities:
import {
    // Types:
    type AnimationStateOptions,
    type AnimationStateHandlers,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Props for controlling the expanded/collapsed state of the component.
 * 
 * Accepts an optional `expanded` prop, falling back to `false` (collapsed) when not provided.
 */
export interface CollapseStateProps {
    /**
     * Specifies whether the component is in an expanded state:
     * - `true`  : the component remains expanded
     * - `false` : the component appears collapsed
     * 
     * Defaults to `false`.
     */
    expanded ?: boolean
}

/**
 * Optional configuration options for customizing expand/collapse behavior and animation lifecycle.
 */
export interface CollapseStateOptions
    extends
        // Bases:
        Partial<Pick<AnimationStateOptions<boolean>,
            | 'animationPattern'
            | 'animationBubbling'
        >>
{
    /**
     * The default expanded state to apply when no `expanded` prop is explicitly provided.
     */
    defaultExpanded   ?: boolean
    
    /**
     * Defines the pattern used to identify expand/collapse-related animation names.
     * 
     * This pattern determines which animations are considered part of the expand/collapse lifecycle.
     * 
     * Supports:
     * - A string suffix (with word-boundary awareness)
     * - An array of suffixes
     * - A RegExp for advanced matching
     * 
     * Word-boundary behavior mimics regex `\b` semantics:
     * - If the matched pattern starts with a non-word character, it’s always considered boundary-safe.
     * - Otherwise, the character preceding the suffix must be a non-word character or undefined.
     * 
     * Defaults to `['expand', 'collapse']`.
     */
    animationPattern  ?: AnimationStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false`.
     */
    animationBubbling ?: AnimationStateOptions<boolean>['animationBubbling']
}

/**
 * Represents the current transition phase of the expand/collapse lifecycle.
 * 
 * Used to distinguish between transitional and resolved states.
 */
export type ExpandPhase =
    | 'collapsed'
    | 'collapsing'
    | 'expanding'
    | 'expanded'

/**
 * An API for accessing the resolved expand/collapse state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface CollapseStateApi<TElement extends Element = HTMLElement>
    extends
        // Bases:
        AnimationStateHandlers<TElement>
{
    /**
     * Indicates whether the component is currently in an expanded/collapsed state.
     * This reflects the final resolved state, not the transitional intent.
     * 
     * Possible values:
     * - `true`  : the component remains expanded
     * - `false` : the component appears collapsed
     */
    expanded        : boolean
    
    /**
     * The current transition phase of the expand/collapse lifecycle.
     * 
     * Reflects both transitional states (`expanding`, `collapsing`) and resolved states (`expanded`, `collapsed`).
     */
    expandPhase     : ExpandPhase
    
    /**
     * A CSS class name reflecting the current expand/collapse phase.
     * 
     * Possible values:
     * - `'is-collapsed'`
     * - `'is-collapsing'`
     * - `'is-expanding'`
     * - `'is-expanded'`
     */
    expandClassname : `is-${ExpandPhase}`
}



/**
 * A list of expand/collapse-related CSS variables used for expand/collapse-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface CollapseStateVars {
    /**
     * References an expanding animation used during the expanding transition.
     * Invalid (`unset`) when not actively expanding.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationExpand   : unknown
    
    /**
     * References a collapsing animation used during the collapsing transition.
     * Invalid (`unset`) when not actively collapsing.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationCollapse : unknown
}



/**
 * Configuration options for customizing expand/collapse animations.
 */
export interface CssCollapseStateOptions {
    /**
     * The animation to apply during the expanding transition.
     * 
     * When the `expanded` prop changes to `false`, the currently running animation is allowed to finish gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationExpand   ?: CssKnownProps['animation']
    
    /**
     * The animation to apply during the collapsing transition.
     * 
     * When the `expanded` prop changes to `true`, the currently running animation is allowed to finish gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationCollapse ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the expand/collapse animations based on the current transition phase.
 */
export interface CssCollapseState {
    /**
     * Generates CSS rules that conditionally apply the expand/collapse animations based on the current transition phase.
     * 
     * Typically used to toggle animation variables during expanding or collapsing transitions.
     */
    collapseStateRule : Lazy<CssRule>
    
    /**
     * Exposes expand/collapse-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationExpand`   : Active during the expanding transition.
     * - `animationCollapse` : Active during the collapsing transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    collapseStateVars : CssVars<CollapseStateVars>
}
