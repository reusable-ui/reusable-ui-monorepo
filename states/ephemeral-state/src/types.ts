// Reusable-ui states:
import {
    // Types:
    type AnimationStateOptions,
    type AnimationStateHandlers,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Props for controlling the ephemeral state of the component.
 * 
 * Currently defined as an empty object, reserved for derived hooks.
 * Derived props may later include values that influence how the ephemeral classname is resolved.
 * 
 * This prop is intended to be dynamic and may change over the lifetime of the component.
 */
export interface EphemeralStateProps {
    /* no additional props yet - reserved for future extensions */
}

/**
 * Options for customizing ephemeral behavior and its animation lifecycle.
 * 
 * These options are intended to be static for the lifetime of each component.
 * They define how ephemeral activity status synchronize with the animation system.
 */
export interface EphemeralStateOptions
    extends
        // Bases:
        Partial<Pick<AnimationStateOptions<{} | null>,
            | 'animationPattern'
            | 'bubblingAnimation'
        >>
{
    /**
     * Defines the pattern used to identify ephemeral-activity-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the corresponding ephemeral activity lifecycle.
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
    animationPattern  ?: AnimationStateOptions<{} | null>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `definition.defaultAnimationBubbling`.
     */
    bubblingAnimation ?: AnimationStateOptions<{} | null>['bubblingAnimation']
}

/**
 * Provides the inputs required to resolve the semantic ephemeral classname.
 * 
 * The semantic ephemeral classname reflects the current activity status.
 * 
 * May optionally contain customization flags from props or options.
 * 
 * The common implementation maps `activity` directly to corresponding classnames,
 * but more complex logic can be implemented as needed.
 * 
 * @template TActivity A value type representing the activity kind.
 * @template TBehaviorProps The type of the behavior-specific props.
 * @template TBehaviorOptions The type of the behavior-specific options.
 * @template TBehaviorDefinition The type of the behavior-specific definition.
 */
export interface ResolveEphemeralClassnameArgs<TActivity extends {} | null, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition> {
    /**
     * The current ephemeral activity status.
     * 
     * Reflects whether an activity is actively running (with its kind) or idle.
     * 
     * Primary input for resolving the semantic ephemeral classname.
     */
    activity   : TActivity | undefined
    
    /**
     * The behavior-specific props.
     * Forwarded directly from the `use**State(props, ...)` call.
     * 
     * May contain props that influence how the ephemeral classname is resolved.
     */
    props      : TBehaviorProps
    
    /**
     * The behavior-specific options.
     * Forwarded directly from the `use**State(..., options, ...)` call.
     * 
     * May contain options that influence how the ephemeral classname is resolved.
     */
    options    : TBehaviorOptions | undefined
    
    /**
     * The behavior-specific definition.
     * Forwarded directly from the `use**State(..., definition)` call.
     * 
     * May contain definition properties that influence how the ephemeral classname is resolved.
     */
    definition : TBehaviorDefinition
}

/**
 * Definition for ephemeral state behavior.
 * 
 * Describes how ephemeral classnames are generated and how the animation system integrates.
 * 
 * Unlike `options`, which are instance-level and optional, definitions are package-level and mandatory.
 * 
 * Must be statically defined and remain consistent for each `**-state` hook type.
 * 
 * @template TActivity A value type representing the activity kind.
 * @template TClassname The type representing semantic ephemeral classnames.
 * @template TBehaviorProps The type of the behavior-specific props.
 * @template TBehaviorOptions The type of the behavior-specific options.
 * @template TBehaviorDefinition The type of the behavior-specific definition.
 */
export interface EphemeralStateDefinition<TActivity extends {} | null, TClassname extends string, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition> {
    /**
     * A system default animation pattern when `animationPattern` option is not provided.
     * 
     * This pattern determines which animation names are recognized as part of the corresponding activity lifecycle.
     */
    defaultAnimationPattern    : AnimationStateOptions<{} | null>['animationPattern']
    
    /**
     * A system default bubbling behavior when `bubblingAnimation` option is not provided.
     * 
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    defaultAnimationBubbling  ?: AnimationStateOptions<{} | null>['bubblingAnimation']
    
    /**
     * Resolves the semantic ephemeral classname from the given activity status.
     * 
     * Primary responsibility: map the current activity status to corresponding classnames
     * for driving conditional styling tied to the activity lifecycle.
     */
    resolveEphemeralClassname  : (args: ResolveEphemeralClassnameArgs<TActivity, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>) => TClassname
}

/**
 * An API for accessing the current activity status, associated CSS classname, and animation event handlers.
 * 
 * This interface represents the common contract returned by all ephemeral state hooks.
 * 
 * @template TActivity A value type representing the activity kind.
 * @template TClassname The type representing semantic ephemeral classnames.
 * @template TElement The type of the target DOM element.
 */
export interface EphemeralState<TActivity extends {} | null, TClassname extends string, TElement extends Element = HTMLElement>
    extends
        AnimationStateHandlers<TElement>
{
    /**
     * The current ephemeral activity status used for animation-aware rendering and behavioral coordination.
     * 
     * Reflects whether an activity is actively running (with its kind) or idle.
     * 
     * Useful for styling and rendering decisions that depend on the visually running activity on screen.
     * 
     * Possible values:
     * - `TActivity` : the ephemeral activity is currently active (of type TActivity)
     * - `undefined` : the ephemeral activity is idle
     */
    activity           : TActivity | undefined
    
    /**
     * A CSS classname for triggering the activity animation.
     * 
     * May optionally contain customization flags from props or options.
     * 
     * Useful for applying semantic styling tied to the activity lifecycle.
     */
    ephemeralClassname : TClassname
}
