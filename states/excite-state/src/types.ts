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
 * Accepts an optional `excited` prop, defaulting to `false` when not provided.
 */
export interface ExciteStateProps {
    /**
     * Specifies the current excited state:
     * - `true`  : the component is excited
     * - `false` : the component is idle
     * 
     * Defaults to `false` (idle).
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
     * Specifies the default excited state when no `excited` prop is explicitly provided:
     * - `true`  : the component is excited
     * - `false` : the component is idle
     * 
     * Defaults to `false` (idle).
     */
    defaultExcited    ?: boolean
    
    /**
     * Defines the pattern used to identify excite-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the exciting state lifecycle.
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
     * Defaults to `'exciting'`.
     */
    animationPattern  ?: AnimationStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    animationBubbling ?: AnimationStateOptions<boolean>['animationBubbling']
}

/**
 * A CSS class name reflecting the current excited state.
 * 
 * Used for styling based on the current excited state.
 */
export type ExciteClassname = 'is-excited' | 'not-excited'

/**
 * An API for accessing the resolved excited state, associated CSS class name, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface ExciteBehaviorState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        AnimationStateHandlers<TElement>
{
    /**
     * The current active excitement-animation state used for animation-aware rendering and behavioral coordination.
     * 
     * This reflects whether the excitement animation is actively running.
     * It may slightly lag behind the actual resolved state due to animation lifecycle timing.
     * 
     * Useful for styling and rendering decisions that depend on the visually active excitement-animation on screen.
     * 
     * Possible values:
     * - `true`  : the excitement animation is currently active
     * - `false` : the excitement animation is idle
     */
    excited           : boolean
    
    /**
     * The actual resolved excitement state, regardless of animation state.
     * 
     * This reflects whether the component is intended to be excited.
     * Unlike `excited`, it updates immediately and does not wait for animation lifecycle.
     * 
     * Useful for logic that needs the latest excitement state without animation start/done delays.
     * 
     * Possible values:
     * - `true`  : the component is intended to be excited
     * - `false` : the component is intended to be idle
     */
    actualExcited     : boolean
    
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
     * References an animation used during the exciting transition.
     * It becomes invalid (`unset`) when no longer excited.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationExciting : unknown
}



/**
 * Configuration options for customizing excitement animation.
 */
export interface CssExciteStateOptions {
    /**
     * Defines the animation to apply repeatedly while the component is in an excited state.
     * 
     * The animation should be designed for seamless continuity across iterations to ensure smooth and uninterrupted visual feedback.
     * 
     * The `useExciteBehaviorState()` hook will replay the exciting animation as long as the `excited` prop remains `true`.
     * When the `excited` state changes away from `true`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationExciting ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the excitement animation based on current excited state.
 */
export interface CssExciteState {
    /**
     * Generates CSS rules that conditionally apply the excitement animation based on current excited state.
     * 
     * Typically used to toggle animation variables when the component is excited.
     */
    exciteStateRule : Lazy<CssRule>
    
    /**
     * Exposes excitement-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationExciting`: Active when the component is excited.
     * 
     * ⚠️ **Caution**: The `animationExciting` variable becomes invalid when the component is idle.
     * If used improperly, it can invalidate the entire CSS declaration.
     * Always wrap it with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    exciteStateVars : CssVars<ExciteStateVars>
}
