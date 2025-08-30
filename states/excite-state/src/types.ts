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
     * Indicates whether the component should be in an excited state:
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
 * Optional configuration options for customizing excitement behavior.
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
     * Defines the pattern used to match relevant animation names.
     * 
     * This pattern determines which animations are considered part of the excitement lifecycle.
     * 
     * Supports regular expression and string suffix matching with word-boundary awareness:
     * - Use a string to match suffixes with word-boundary awareness.
     * - Use an array of strings to match multiple suffixes.
     * - Use a RegExp for custom or complex matching logic.
     * 
     * Defaults to `'excite'`.
     */
    animationPattern    ?: AnimationStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from child elements.
     * Useful when the animated node is deeply nested.
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
 * Represents the final resolved excited state of the component, along with its associated CSS class name
 * and animation event handlers.
 */
export interface ExciteStateApi<TElement extends Element = HTMLElement>
    extends
        // Bases:
        AnimationStateHandlers<TElement>
{
    /**
     * Indicates whether the component is currently in an excited state:
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
    excitedClassname  : 'is-excited' | 'not-excited'
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
 * Configuration options for enabling excitement-aware styling in components.
 */
export interface CssExciteStateOptions {
    /**
     * The animation to apply repeatedly while the component is in an excited state.
     * 
     * The animation should be designed for seamless continuity across iterations to ensure smooth visual feedback.
     * 
     * The `useExciteState()` hook will replay the excitement animation as long as the `excited` prop remains `true`.  
     * When the prop changes to `false`, the currently running animation is allowed to finish gracefully—preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationExcite ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for enabling conditional excitement animation based on current excited state.
 */
export interface CssExciteState {
    /**
     * Generates CSS rules that conditionally apply the excitement animation based on the current excited state.
     * 
     * Typically used to toggle animation variables when the component is in an excited state.
     */
    exciteStateRule : Lazy<CssRule>
    
    /**
     * Exposes excitement-related CSS variables for conditional excitement animation.
     * 
     * Includes:
     * - `animationExcite`: References the configured excitement animation when the component is excited.
     * 
     * ⚠️ **Caution**: The `animationExcite` variable becomes invalid when the component is not excited.
     * If used improperly, it can invalidate the entire CSS declaration.
     * Always wrap it with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    exciteStateVars : CssVars<ExciteStateVars>
}
