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

// Reusable-ui states:
import {
    // Types:
    type InteractionStateChangeProps,
    type InteractionStateChangeDispatcherOptions,
    type InteractionStateOptions,
    type InteractionBehaviorState,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



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
    active        ?: boolean
    
    /**
     * Specifies whether the component can be activated via parent context:
     * - `true`  : allows the component to be activated via parent context
     * - `false` : the component can only be activated directly via its own `active` prop
     * 
     * Defaults to `false` (prevents contextual activation).
     */
    cascadeActive ?: boolean
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
export interface ActiveStateChangeProps<TChangeEvent = unknown>
    extends
        // Bases:
        InteractionStateChangeProps<boolean, TChangeEvent>
{
    /**
     * Signals intent to change the active state:
     * - `true`  → request to activate
     * - `false` → request to deactivate
     * 
     * The parent may choose to honor or ignore this request.
     * 
     * Restricted behavior (`disabled` or `readonly`):
     * - When restricted, activation requests are ignored internally, so this callback is never invoked.
     * - When restriction is lifted, the callback will be invoked in response to user interactions
     *   requesting to activate or deactivate.
     */
    onActiveChange ?: InteractionStateChangeProps<boolean, TChangeEvent>['onStateChange']
}

/**
 * Options for customizing the active change dispatcher behavior.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 */
export interface ActiveChangeDispatcherOptions<TChangeEvent = unknown>
    extends
        // Bases:
        InteractionStateChangeDispatcherOptions<boolean, TChangeEvent>
{
    /* no additional options yet - reserved for future extensions */
}

/**
 * Props for listening lifecycle events triggered by activate/deactivate phase transitions.
 * 
 * These events allow external listeners to react to phase changes—such as logging, analytics,
 * or chaining animations.
 */
export interface ActiveStatePhaseEventProps {
    /**
     * Called when the activating transition begins.
     */
    onActivatingStart   ?: ValueChangeEventHandler<ActivePhase, unknown>
    
    /**
     * Called when the activating transition completes.
     */
    onActivatingEnd     ?: ValueChangeEventHandler<ActivePhase, unknown>
    
    /**
     * Called when the deactivating transition begins.
     */
    onDeactivatingStart ?: ValueChangeEventHandler<ActivePhase, unknown>
    
    /**
     * Called when the deactivating transition completes.
     */
    onDeactivatingEnd   ?: ValueChangeEventHandler<ActivePhase, unknown>
}

/**
 * Optional configuration options for customizing activate/deactivate behavior and animation lifecycle.
 */
export interface ActiveStateOptions
    extends
        // Bases:
        InteractionStateOptions<boolean>
{
    /**
     * Specifies the initial active state for uncontrolled mode when no `defaultActive` prop is explicitly provided:
     * - `true`  : the component is initially active
     * - `false` : the component is initially inactive
     * 
     * Defaults to `false` (inactive).
     */
    defaultActive        ?: boolean
    
    /**
     * Specifies the default cascade behavior when no `cascadeActive` prop is explicitly provided:
     * - `true`  : allows the component to be activated via parent context
     * - `false` : the component can only be activated directly via its own `active` prop
     * 
     * Defaults to `false` (prevents contextual activation).
     */
    defaultCascadeActive ?: boolean
    
    /**
     * Defines the pattern used to identify activate/deactivate-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the activating/deactivating transition lifecycle.
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
     * Defaults to `['activating', 'deactivating']`.
     */
    animationPattern     ?: InteractionStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    animationBubbling    ?: InteractionStateOptions<boolean>['animationBubbling']
}

/**
 * Represents the resolved (settled) phase of the activate/deactivate lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'active'       ▶️ fully active
 * - 'inactive'     ⏹️ fully inactive
 */
export type ResolvedActivePhase =
    | 'active'
    | 'inactive'

/**
 * Represents the transitional phase of the activate/deactivate lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'activating'   🔄 transitioning toward active
 * - 'deactivating' 🔄 transitioning toward inactive
 */
export type TransitioningActivePhase =
    | 'activating'
    | 'deactivating'

/**
 * Represents the current transition phase of the activate/deactivate lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'active', 'inactive'
 * - Transitional: 'activating', 'deactivating'
 */
export type ActivePhase =
    | ResolvedActivePhase
    | TransitioningActivePhase

/**
 * A CSS class name reflecting the current activate/deactivate phase.
 * 
 * Used for styling based on the lifecycle phase.
 */
export type ActiveClassname = `is-${ActivePhase}`

/**
 * An API for accessing the resolved active/inactive state, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 */
export interface ActiveBehaviorState<TElement extends Element = HTMLElement, TChangeEvent = unknown>
    extends
        // Bases:
        Omit<InteractionBehaviorState<boolean, ActivePhase, ActiveClassname, TElement, TChangeEvent>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
            | 'dispatchStateChange'
        >
{
    /**
     * The current settled active/inactive state used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved state due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Useful for rendering the active/inactive state in sync with animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component has visually settled in active state
     * - `false` : the component has visually settled in inactive state
     */
    active               : boolean
    
    /**
     * The actual resolved active/inactive state, regardless of animation state.
     * 
     * This reflects the current target state based on controlled or uncontrolled mode.
     * Unlike `active`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for logic that needs the latest intent or target state, independent of animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component is intended to be active
     * - `false` : the component is intended to be inactive
     */
    actualActive         : boolean
    
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
    activeClassname      : ActiveClassname
    
    /**
     * Requests a change to the active state.
     * 
     * - In uncontrolled mode (no `active` prop), updates internal state directly.
     * - In controlled mode, delegates the decision to the parent component, which may choose to accept or ignore the request.
     * - Always triggers `onActiveChange`, if provided, regardless of control mode.
     * 
     * Restricted behavior (`disabled` or `readonly`):
     * - When restricted, activation requests are ignored and the component remains in its last active/inactive state.
     * - When restriction is lifted, `dispatchActiveChange()` resumes normal operation.
     */
    dispatchActiveChange : ValueChangeDispatcher<boolean, TChangeEvent>
}



/**
 * A list of activate/deactivate-related CSS variables used for activation-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ActiveStateVars {
    /**
     * References an animation used during the activating transition.
     * It becomes invalid (`unset`) when not actively activating.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationActivating   : unknown
    
    /**
     * References an animation used during the deactivating transition.
     * It becomes invalid (`unset`) when not actively deactivating.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationDeactivating : unknown
    
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
    isActive              : unknown
    
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
    isInactive            : unknown
    
    /**
     * A normalized, animatable factor representing the **active lifecycle state**.
     * 
     * ### Expected values:
     * - **0**     : settled inactive
     * - **1**     : settled active
     * - **0 → 1** : activating transition (inactive → active)
     * - **1 → 0** : deactivating transition (active → inactive)
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `color`, `opacity`, `transform`, `scale`, etc.
     * - Implementators are responsible for assigning transitional values in their animations.
     *   For example, an activating animation might interpolate `activeFactor` from 0 → 1.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Notes:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     * - **Value rationale:**  
     *   - The factor represents the active lifecycle state (active), not the baseline (inactive).  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `activeFactor = 0`: inactive (baseline lifecycle state)  
     *     - `activeFactor = 1`: active (active lifecycle state)  
     */
    activeFactor          : unknown
    
    /**
     * A conditional mirror of `activeFactor` representing the **active lifecycle state**.
     * Mirrors `activeFactor` during transitions and when fully active, but is explicitly
     * set to `unset` once the component reaches its baseline inactive state.
     * 
     * ### Expected values:
     * - **unset** : settled inactive (baseline inactive, declaration dropped)
     * - **1**     : settled active (mirrors `activeFactor`)
     * - **0 → 1** : activating transition (mirrors `activeFactor`)
     * - **1 → 0** : deactivating transition (mirrors `activeFactor`)
     * 
     * ### Usage:
     * - Use when dependent properties should be **poisoned** (ignored) in the baseline inactive state.
     *   Example: gating `filter`, `color-mix`, or other overrides that should disappear when inactive.
     * - During animations and in the fully active state, `activeFactorCond` mirrors the numeric
     *   value of `activeFactor`, ensuring smooth transitions and consistency.
     * - Applicable to numeric-based properties such as `opacity`, `color`, `transform`, `box-shadow`, etc.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Notes:
     * - **Value rationale:**  
     *   - The factor represents the active lifecycle state (active), not the baseline (inactive).  
     *   - Mirrors the active lifecycle state (active) during transitions and when settled active.  
     *   - Drops to `unset` only when fully inactive, so dependent declarations fall back cleanly.  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `activeFactorCond = unset`: settled inactive (baseline inactive, declaration dropped)
     *     - `activeFactorCond = 0`: inactive during transition (numeric interpolation)
     *     - `activeFactorCond = 1`: active (settled active lifecycle state)  
     * - **Naming rationale:**  
     *   - `Cond` suffix indicates conditional presence: mirrors numeric factor during transitions
     *     and when active, but conditionally drops to `unset` at baseline inactive.
     */
    activeFactorCond      : unknown
}



/**
 * Configuration options for customizing activate/deactivate animations.
 */
export interface CssActiveStateOptions {
    /**
     * Defines the animation to apply during the activating transition.
     * 
     * When the `active` state changes away from `true`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationActivating   ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the deactivating transition.
     * 
     * When the `active` state changes away from `false`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationDeactivating ?: CssKnownProps['animation']
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
     * - `animationActivating`   : Active during the activating transition.
     * - `animationDeactivating` : Active during the deactivating transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    activeStateVars : CssVars<ActiveStateVars>
}
