// React:
import {
    // Types:
    type AnimationEvent,
}                           from 'react'

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
 * Props for representing **state-driven animations** with full lifecycle awareness in React components.  
 * 
 * Provides an **effective controlled state** for determining whether the activity animation
 * should be kept running, switched to another animation, or stopped.
 * 
 * This prop is intended to be dynamic and may change over the lifetime of the component.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 */
export interface ActivityStateProps<TState extends {} | null> {
    /**
     * Specifies the **effective state** supplied externally to drive the activity lifecycle.
     * 
     * - Must be a concrete value (already normalized, not a declarative keyword).
     * - Influence rules (disabled/read-only, cascade, clamp, etc.) must already be applied.
     * - Evaluated on **every render** so that activity-state can respond
     *   to live updates from external sources.
     * 
     * Common sources:
     * - `props.state` for simple busy/processing/playing-state scenarios
     * - live observer result for environment-aware activity scenarios
     */
    effectiveState : TState
}

/**
 * Props for reporting proactive stop or switch requests for the current state.
 * 
 * Signals intent to change the external state after an animation cycle completes.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 */
export interface ActivityStateChangeProps<TState extends {} | null> {
    /**
     * Signals intent to change the external state after an animation cycle completes,
     * such as stopping or switching to another animation.
     * 
     * The parent may choose to honor or ignore this request.
     */
    onStateChange ?: ValueChangeEventHandler<TState, AnimationEvent>
}

/**
 * Options for customizing activity-based behavior and animation lifecycle.
 * 
 * These options are intended to be static for the lifetime of each component.
 * They define how activity states synchronize with the animation system.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 */
export interface ActivityStateOptions<TState extends {} | null>
    extends
        // Bases:
        Partial<Pick<AnimationStateOptions<TState>,
            | 'animationPattern'
            | 'animationBubbling'
        >>
{
    /**
     * Defines the pattern used to identify activity-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the corresponding activity lifecycle.
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
     * Defaults to `definition.defaultAnimationPattern`.
     */
    animationPattern  ?: AnimationStateOptions<TState>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `definition.defaultAnimationBubbling`.
     */
    animationBubbling ?: AnimationStateOptions<TState>['animationBubbling']
}

/**
 * Provides the inputs required to resolve the semantic activity classname.
 * 
 * The semantic activity classname reflects the actively running or stopped animation state.
 * 
 * May optionally contain customization flags from props or options.
 * 
 * The common implementation maps `visualState` directly to corresponding class names,
 * but more complex logic can be implemented as needed.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TBehaviorProps - The type of the behavior-specific props.
 * @template TBehaviorOptions - The type of the behavior-specific options.
 * @template TBehaviorDefinition - The type of the behavior-specific definition.
 */
export interface ResolveActivityClassnameArgs<TState extends {} | null, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition> {
    /**
     * The current **visual animation state** — what is actually being displayed in the browser.
     * 
     * - If equal to `definition.inactiveState`, the animation is considered stopped.
     * - Otherwise, the animation is actively running.
     * 
     * This may briefly differ from the driver intent (`driverState`) during a restart procedure:
     *   - The hook clears to `inactiveState`.
     *   - Waits one frame to allow CSS animation re-trigger.
     *   - Then applies the new driver intent.
     * 
     * Outside of that restart window, `visualState` and `driverState` are normally in sync.
     * 
     * Primary input for resolving the semantic activity classname.
     */
    visualState : TState
    
    /**
     * The behavior-specific props.
     * Forwarded directly from the `use**BehaviorState(props, ...)` call.
     * 
     * May contain props that influence how the activity classname is resolved.
     */
    props       : TBehaviorProps
    
    /**
     * The behavior-specific options.
     * Forwarded directly from the `use**BehaviorState(..., options, ...)` call.
     * 
     * May contain options that influence how the activity classname is resolved.
     */
    options     : TBehaviorOptions | undefined
    
    /**
     * The behavior-specific definition.
     * Forwarded directly from the `use**BehaviorState(..., definition)` call.
     * 
     * May contain definition properties that influence how the activity classname is resolved.
     */
    definition  : TBehaviorDefinition
}

/**
 * Definition for activity-based state behavior.
 * 
 * Describes the inactive baseline state, how activity classnames are generated, etc.
 * 
 * Unlike `options`, which are instance-level and optional, definitions are package-level and mandatory.
 * 
 * Must be statically defined and remain consistent for each `**-state` hook type.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TClassname - The type representing semantic activity classnames.
 * @template TBehaviorProps - The type of the behavior-specific props.
 * @template TBehaviorOptions - The type of the behavior-specific options.
 * @template TBehaviorDefinition - The type of the behavior-specific definition.
 */
export interface ActivityBehaviorStateDefinition<TState extends {} | null, TClassname extends string, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition> {
    /**
     * A system default animation pattern when `animationPattern` option is not provided.
     * 
     * This pattern determines which animation names are recognized as part of the corresponding activity lifecycle.
     */
    defaultAnimationPattern   : AnimationStateOptions<TState>['animationPattern']
    
    /**
     * A system default bubbling behavior when `animationBubbling` option is not provided.
     * 
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    defaultAnimationBubbling ?: AnimationStateOptions<TState>['animationBubbling']
    
    /**
     * Declares the baseline inactive state (e.g. `false`).
     * - If the resolved state equals this baseline, the animation is stopped
     *   (after any currently active animation completes).
     * - Common values: `false` for `TState = boolean`, or `0` for `TState = number`,
     *   `'idle'` for string unions, etc.
     */
    inactiveState             : TState
    
    /**
     * Resolves the semantic activity classname from the given activity state.
     */
    resolveActivityClassname  : (args: ResolveActivityClassnameArgs<TState, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>) => TClassname
}

/**
 * An API for accessing the resolved state, associated CSS class name, and animation event handlers.
 * 
 * This interface represents the common contract returned by all activity-based state hooks.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TClassname - The type representing semantic activity classnames.
 * @template TElement - The type of the target DOM element.
 */
export interface ActivityBehaviorState<TState extends {} | null, TClassname extends string, TElement extends Element = HTMLElement>
    extends
        // Bases:
        AnimationStateHandlers<TElement>
{
    /**
     * The current running or stopped activity used for animation-aware rendering.
     * 
     * - If equal to `definition.inactiveState`, the animation is considered stopped.
     * - Otherwise, the animation is actively running.
     * 
     * This may briefly differ from the driver intent (`actualState`) during a restart procedure:
     *   - The hook clears to `inactiveState`.
     *   - Waits one frame to allow CSS animation re-trigger.
     *   - Then applies the new driver intent.
     * 
     * Outside of that restart window, `state` and `actualState` are normally in sync.
     * 
     * Everyday usage for conditional rendering in sync with animation lifecycle.
     * 
     * Alias for `visualState`.
     * Renamed to shorter name for clarity.
     */
    state             : TState
    
    /**
     * The actual resolved state, regardless of animation state.
     * 
     * This reflects the current target state based on the latest intent.
     * Unlike `state`, it updates immediately and does not wait for animations to complete.
     * 
     * Useful for advanced logic that needs the latest intent or target state,
     * independent of animation lifecycle. May appear visually out of sync.
     * 
     * Alias for `driverState`.
     * Renamed to shorter name for clarity.
     */
    actualState       : TState
    
    /**
     * A CSS class name reflects the current activity state.
     * 
     * Useful for applying semantic styling tied to the activity lifecycle.
     */
    activityClassname : TClassname
}
