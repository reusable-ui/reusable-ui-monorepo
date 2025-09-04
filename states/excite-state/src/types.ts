// React:
import {
    // Types:
    type AnimationEvent,
}                           from 'react'

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
    type ValueChangeEventHandler,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.
import {
    // Types:
    type AnimationStateOptions,
    type AnimationStateHandlers,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Props for controlling the excited state of the component.
 * 
 * Accepts an optional `excited` prop, falling back to `false` when not provided.
 */
export interface ExciteStateProps {
    /**
     * Specifies whether the component is in an excited state:
     * - `true`  : the component appears excited
     * - `false` : the component remains in its default state
     * 
     * Defaults to `false`.
     */
    excited         ?: boolean
    
    /**
     * A callback gets invoked when the excitement animation completes and requests a reset.
     * Typically used to update the external `excited` state.
     */
    onExcitedChange ?: ValueChangeEventHandler<boolean, AnimationEvent>
}

/**
 * Optional configuration options for customizing excitement behavior and animation lifecycle.
 */
export interface ExciteStateOptions
    extends
        // Bases:
        Partial<Pick<AnimationStateOptions<boolean>,
            | 'animationPattern'
            | 'animationBubbling'
        >>
{
    /**
     * The default excitement state to apply when no `excited` prop is explicitly provided.
     */
    defaultExcited      ?: boolean
    
    /**
     * Defines the pattern used to identify excite-related animation names.
     * 
     * This pattern determines which animations are considered part of the excitement lifecycle.
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
     * Defaults to `'excite'`.
     */
    animationPattern    ?: AnimationStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false`.
     */
    animationBubbling   ?: AnimationStateOptions<boolean>['animationBubbling']
    
    /**
     * The number of macrotask ticks to wait before re-triggering the animation.
     * This delay gives the parent component time to reset the `excited` state.
     * 
     * Defaults to `3`.
     */
    retriggerDelayTicks ?: number
}

/**
 * An API for accessing the resolved excited state, associated CSS class name, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface ExciteStateApi<TElement extends Element = HTMLElement>
    extends
        // Bases:
        AnimationStateHandlers<TElement>
{
    /**
     * Indicates whether the component is currently in an excited state.
     * 
     * Possible values:
     * - `true`  : the component appears excited
     * - `false` : the component remains in its default state
     */
    excited           : boolean
    
    /**
     * A CSS class name reflecting the resolved excitement state.
     * 
     * Possible values:
     * - `'is-excited'`
     * - `'not-excited'`
     */
    exciteClassname   : 'is-excited' | 'not-excited'
}



/**
 * A list of excite-related CSS variables used for excitement-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ExciteStateVars {
    /**
     * References an excitement animation when the component is in an excited state.
     * Invalid (`unset`) when not excited.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationExcite : unknown
}



/**
 * Configuration options for customizing excitement animation.
 */
export interface CssExciteStateOptions {
    /**
     * The animation to apply repeatedly while the component is in an excited state.
     * 
     * The animation should be designed for seamless continuity across iterations to ensure smooth visual feedback.
     * 
     * The `useExciteState()` hook will replay the excitement animation as long as the `excited` prop remains `true`.  
     * When the prop changes to `false`, the currently running animation is allowed to finish gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationExcite ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the excitement animation based on the current state.
 */
export interface CssExciteState {
    /**
     * Generates CSS rules that conditionally apply the excitement animation based on the current state.
     * 
     * Typically used to toggle animation variables when the component is excited.
     */
    exciteStateRule : Lazy<CssRule>
    
    /**
     * Exposes excitement-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationExcite`: Active when the component is excited.
     * 
     * ⚠️ **Caution**: The `animationExcite` variable becomes invalid when the component is not excited.
     * If used improperly, it can invalidate the entire CSS declaration.
     * Always wrap it with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    exciteStateVars : CssVars<ExciteStateVars>
}
