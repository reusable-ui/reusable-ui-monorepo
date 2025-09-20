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
    type ValueChangeDispatcher,
    type ValueChangeEventHandler,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.
import {
    // Types:
    type AnimationStateOptions,
    type AnimationStateHandlers,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Props for controlling the active/inactive state of the component.
 * 
 * Accepts an optional `active` prop, defaulting to `false` (inactive) when not provided.
 */
export interface ActiveStateProps {
    /**
     * Specifies the current active state:
     * - `true`  : the component is active
     * - `false` : the component is inactive
     * 
     * Defaults to `undefined` (uncontrolled mode).
     */
    active ?: boolean
}

/**
 * Props for initializing the active/inactive state in uncontrolled components.
 * 
 * Enables default activation behavior when the parent does not actively manage state.
 * Commonly used in components like `<Toggle>`, `<Switch>`, or `<Selection>` that enhance interactivity
 * without requiring external control or feedback loops.
 */
export interface UncontrollableActiveStateProps {
    /**
     * Specifies the initial active state for uncontrolled mode:
     * - `true`  : the component is initially active
     * - `false` : the component is initially inactive
     * 
     * Defaults to `false` (inactive).
     */
    defaultActive ?: boolean
}

/**
 * Props for reporting a change request to the active/inactive state.
 * 
 * Typically used in interactive components (e.g. Toggle, Switch, Selection) that may initiate activation/deactivation
 * through user actions such as select buttons, SPACE key presses, or toggles.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 */
export interface ActiveStateChangeProps<TChangeEvent = unknown> {
    /**
     * Signals intent to change the active state:
     * - `true`  → request to activate
     * - `false` → request to deactivate
     * 
     * The parent may choose to honor or ignore this request.
     */
    onActiveChange ?: ValueChangeEventHandler<boolean, TChangeEvent>
}

/**
 * Props for listening lifecycle events triggered by activate/deactivate phase transitions.
 * 
 * These events allow external listeners to react to phase changes—such as logging, analytics,
 * or chaining animations.
 */
export interface ActiveStatePhaseEventProps {
    /**
     * Called when the activate animation begins.
     */
    onActivateStart   ?: ValueChangeEventHandler<ActivePhase, unknown>
    
    /**
     * Called when the activate animation completes.
     */
    onActivateEnd     ?: ValueChangeEventHandler<ActivePhase, unknown>
    
    /**
     * Called when the deactivate animation begins.
     */
    onDeactivateStart ?: ValueChangeEventHandler<ActivePhase, unknown>
    
    /**
     * Called when the deactivate animation completes.
     */
    onDeactivateEnd   ?: ValueChangeEventHandler<ActivePhase, unknown>
}

/**
 * Optional configuration options for customizing activate/deactivate behavior and animation lifecycle.
 */
export interface ActiveStateOptions
    extends
        // Bases:
        Partial<Pick<AnimationStateOptions<boolean>,
            | 'animationPattern'
            | 'animationBubbling'
        >>
{
    /**
     * Specifies the initial active state for uncontrolled mode when no `defaultActive` prop is explicitly provided:
     * - `true`  : the component is initially active
     * - `false` : the component is initially inactive
     * 
     * Defaults to `false` (inactive).
     */
    defaultActive     ?: boolean
    
    /**
     * Defines the pattern used to identify activate/deactivate-related animation names.
     * 
     * This pattern determines which animations are considered part of the activate/deactivate lifecycle.
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
     * Defaults to `['activate', 'deactivate']`.
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
 * Represents the current transition phase of the activate/deactivate lifecycle.
 * 
 * Used to distinguish between transitional and resolved states.
 */
export type ActivePhase =
    | 'inactive'
    | 'deactivating'
    | 'activating'
    | 'active'

/**
 * An API for accessing the resolved active/inactive state, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 */
export interface ActiveBehaviorState<TElement extends Element = HTMLElement, TChangeEvent = unknown>
    extends
        // Bases:
        AnimationStateHandlers<TElement>
{
    /**
     * Indicates whether the component is currently in an active/inactive state.
     * This reflects the final resolved state, not the transitional intent.
     * 
     * Possible values:
     * - `true`  : the component is active
     * - `false` : the component is inactive
     */
    active               : boolean
    
    /**
     * The current transition phase of the activate/deactivate lifecycle.
     * 
     * Reflects both transitional states (`activating`, `deactivating`) and resolved states (`active`, `inactive`).
     */
    activePhase          : ActivePhase
    
    /**
     * A CSS class name reflecting the current activate/deactivate phase.
     * 
     * Possible values:
     * - `'is-inactive'`
     * - `'is-deactivating'`
     * - `'is-activating'`
     * - `'is-active'`
     */
    activeClassname      : `is-${ActivePhase}`
    
    /**
     * Requests a change to the active state.
     * 
     * - In uncontrolled mode (no `active` prop), updates internal state directly.
     * - In controlled mode, delegates the decision to the parent component, which may choose to accept or ignore the request.
     * - Always triggers `onActiveChange`, if provided, regardless of control mode.
     */
    dispatchActiveChange : ValueChangeDispatcher<boolean, TChangeEvent>
}



/**
 * A list of activate/deactivate-related CSS variables used for active/inactive-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ActiveStateVars {
    /**
     * References an activating animation used during the activating transition.
     * Invalid (`unset`) when not actively activating.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationActivate   : unknown
    
    /**
     * References a deactivating animation used during the deactivating transition.
     * Invalid (`unset`) when not actively deactivating.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationDeactivate : unknown
    
    /**
     * Applies when the component is either activating or fully active.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either activating or fully active:
     *     fontWeight : `${activeStateVars.isActive} bold`,
     *     opacity    : `${activeStateVars.isActive} 100%`,
     * });
     * ```
     */
    isActive            : unknown
    
    /**
     * Applies when the component is either deactivating or fully inactive.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either deactivating or fully inactive:
     *     fontWeight : `${activeStateVars.isInactive} normal`,
     *     opacity    : `${activeStateVars.isInactive} 60%`,
     * });
     * ```
     */
    isInactive          : unknown
}



/**
 * Configuration options for customizing activate/deactivate animations.
 */
export interface CssActiveStateOptions {
    /**
     * The animation to apply during the activating transition.
     * 
     * When the `active` prop changes to `false`, the currently running animation is allowed to finish gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationActivate   ?: CssKnownProps['animation']
    
    /**
     * The animation to apply during the deactivating transition.
     * 
     * When the `active` prop changes to `true`, the currently running animation is allowed to finish gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationDeactivate ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the activate/deactivate animations based on current active state.
 */
export interface CssActiveState {
    /**
     * Generates CSS rules that conditionally apply the activate/deactivate animations based on current active state.
     * 
     * Typically used to toggle animation variables during activating or deactivating transitions.
     */
    activeStateRule : Lazy<CssRule>
    
    /**
     * Exposes activate/deactivate-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationActivate`   : Active during the activating transition.
     * - `animationDeactivate` : Active during the deactivating transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    activeStateVars : CssVars<ActiveStateVars>
}
