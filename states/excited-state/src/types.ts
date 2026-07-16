// Reusable-ui states:
import {
    // Types:
    type ActivityStateProps,
    type ActivityStateOptions,
    type ActivityState,
}                           from '@reusable-ui/activity-state'      // Reusable abstraction for representing state-driven animations in React components — indicating ongoing activity or draw user attention.



/**
 * Props for controlling the excited state of the component.
 * 
 * Provides a declarative way to control whether the component is excited or idle,
 * along with an optional callback to signal a request to update the external state driver.
 */
export interface ExcitedStateProps
    extends
        // Bases:
        Omit<ActivityStateProps<boolean>, 'effectiveState' | 'onStateComplete'>
{
    /**
     * Controls the current excited state:
     * - `true`  : the component is excited
     * - `false` : the component is idle
     * 
     * Defaults to `false` (idle).
     */
    excited           ?: ActivityStateProps<boolean>['effectiveState']
    
    /**
     * Signals a request to update the external state driver
     * after completing an excitement animation cycle.
     * 
     * Commonly used to reset the external state back to idle.
     * The parent may choose to honor or ignore this request.
     * If ignored, the current animation will repeat.
     */
    onExcitedComplete ?: ActivityStateProps<boolean>['onStateComplete']
}

/**
 * Optional configuration options for customizing excitement behavior and animation lifecycle.
 */
export interface ExcitedStateOptions
    extends
        // Bases:
        ActivityStateOptions<boolean>
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
     * Defines the pattern used to identify excitement-related animation names.
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
    animationPattern  ?: ActivityStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    bubblingAnimation ?: ActivityStateOptions<boolean>['bubblingAnimation']
}

/**
 * A CSS class name reflecting the current excited state.
 * 
 * Used for styling based on the current excited state.
 */
export type ExcitedClassname = 'is-excited' | 'not-excited'

/**
 * An API for accessing the resolved excited state, associated CSS class name, and animation event handlers.
 * 
 * @template TElement The type of the target DOM element.
 */
export interface ExcitedState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<ActivityState<boolean, ExcitedClassname, TElement>,
            | 'state'
            | 'actualState'
            | 'activityClassname'
        >
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
    excited          : ActivityState<boolean, ExcitedClassname, TElement>['state']
    
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
    actualExcited    : ActivityState<boolean, ExcitedClassname, TElement>['actualState']
    
    /**
     * A CSS class name reflecting the resolved excitement state.
     * 
     * Possible values:
     * - `'is-excited'`
     * - `'not-excited'`
     */
    excitedClassname : ActivityState<boolean, ExcitedClassname, TElement>['activityClassname']
}
