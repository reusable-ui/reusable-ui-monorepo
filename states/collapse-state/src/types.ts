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
 * Props for controlling the expanded/collapsed state of the component.
 * 
 * Accepts an optional `expanded` prop, defaulting to `false` (collapsed) when not provided.
 */
export interface CollapseStateProps {
    /**
     * Specifies the current expanded state:
     * - `true`  : the component is expanded
     * - `false` : the component is collapsed
     * 
     * Defaults to `undefined` (uncontrolled mode).
     */
    expanded ?: boolean
}

/**
 * Props for initializing the expanded/collapsed state in uncontrolled components.
 * 
 * Enables default expansion behavior when the parent does not actively manage state.
 * Commonly used in components like `<Accordion>` or `<Detail>` that enhance content
 * without requiring external control or feedback loops.
 */
export interface UncontrollableCollapseStateProps {
    /**
     * Specifies the initial expanded state for uncontrolled mode:
     * - `true`  : the component is initially expanded
     * - `false` : the component is initially collapsed
     * 
     * Defaults to `false` (collapsed).
     */
    defaultExpanded ?: boolean
}

/**
 * Props for reporting a change request to the expanded/collapsed state.
 * 
 * Typically used in interactive components (e.g. Alert, Toast, Accordion) that may initiate expansion/collapsion
 * through user actions such as dismiss buttons, ESC key presses, or header toggles.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 */
export interface CollapseStateChangeProps<TChangeEvent = unknown>
    extends
        // Bases:
        Omit<InteractionStateChangeProps<boolean, TChangeEvent>, 'onStateChange'>
{
    /**
     * Signals intent to change the expanded state:
     * - `true`  → request to expand
     * - `false` → request to collapse
     * 
     * The parent may choose to honor or ignore this request.
     * 
     * Restricted behavior (`disabled` or `readonly`):
     * - When restricted, expansion requests are ignored internally, so this callback is never invoked.
     * - When restriction is lifted, the callback will be invoked in response to user interactions
     *   requesting to expand or collapse.
     */
    onExpandedChange ?: InteractionStateChangeProps<boolean, TChangeEvent>['onStateChange']
}

/**
 * Options for customizing the expanded change dispatcher behavior.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 */
export interface CollapseChangeDispatcherOptions<TChangeEvent = unknown>
    extends
        // Bases:
        InteractionStateChangeDispatcherOptions<boolean, TChangeEvent>
{
    /* no additional options yet - reserved for future extensions */
}

/**
 * Props for listening lifecycle events triggered by expand/collapse phase transitions.
 * 
 * These events allow external listeners to react to phase changes—such as logging, analytics,
 * or chaining animations.
 */
export interface CollapseStatePhaseEventProps {
    /**
     * Called when the expanding transition begins.
     */
    onExpandingStart  ?: ValueChangeEventHandler<ExpandPhase, unknown>
    
    /**
     * Called when the expanding transition completes.
     */
    onExpandingEnd    ?: ValueChangeEventHandler<ExpandPhase, unknown>
    
    /**
     * Called when the collapsing transition begins.
     */
    onCollapsingStart ?: ValueChangeEventHandler<ExpandPhase, unknown>
    
    /**
     * Called when the collapsing transition completes.
     */
    onCollapsingEnd   ?: ValueChangeEventHandler<ExpandPhase, unknown>
}

/**
 * Optional configuration options for customizing expand/collapse behavior and animation lifecycle.
 */
export interface CollapseStateOptions
    extends
        // Bases:
        Omit<InteractionStateOptions<boolean>, 'defaultState'>
{
    /**
     * Specifies the initial expanded state for uncontrolled mode when no `defaultExpanded` prop is explicitly provided:
     * - `true`  : the component is initially expanded
     * - `false` : the component is initially collapsed
     * 
     * Defaults to `false` (collapsed).
     */
    defaultExpanded   ?: InteractionStateOptions<boolean>['defaultState']
    
    /**
     * Defines the pattern used to identify expand/collapse-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the expanding/collapsing transition lifecycle.
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
     * Defaults to `['expanding', 'collapsing']`.
     */
    animationPattern  ?: InteractionStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    animationBubbling ?: InteractionStateOptions<boolean>['animationBubbling']
}

/**
 * Represents the resolved (settled) phase of the expand/collapse lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'expanded'   ☂️ fully expanded
 * - 'collapsed'  🌂 fully collapsed
 */
export type ResolvedExpandPhase =
    | 'expanded'
    | 'collapsed'

/**
 * Represents the transitional phase of the expand/collapse lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'expanding'  🔄 transitioning toward expanded
 * - 'collapsing' 🔄 transitioning toward collapsed
 */
export type TransitioningExpandPhase =
    | 'expanding'
    | 'collapsing'

/**
 * Represents the current transition phase of the expand/collapse lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'expanded', 'collapsed'
 * - Transitional: 'expanding', 'collapsing'
 */
export type ExpandPhase =
    | ResolvedExpandPhase
    | TransitioningExpandPhase

/**
 * A CSS class name reflecting the current expand/collapse phase.
 * 
 * Used for styling based on the lifecycle phase.
 */
export type ExpandClassname = `is-${ExpandPhase}`

/**
 * An API for accessing the resolved expanded/collapsed state, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 */
export interface CollapseBehaviorState<TElement extends Element = HTMLElement, TChangeEvent = unknown>
    extends
        // Bases:
        Omit<InteractionBehaviorState<boolean, ExpandPhase, ExpandClassname, TElement, TChangeEvent>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
            | 'dispatchStateChange'
        >
{
    /**
     * The current settled expanded/collapsed state used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved state due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Useful for rendering the expanded/collapsed state in sync with animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component has visually settled in expanded state
     * - `false` : the component has visually settled in collapsed state
     */
    expanded               : boolean
    
    /**
     * The actual resolved expanded/collapsed state, regardless of animation state.
     * 
     * This reflects the current target state based on controlled or uncontrolled mode.
     * Unlike `expanded`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for logic that needs the latest intent or target state, independent of animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component is intended to be expanded
     * - `false` : the component is intended to be collapsed
     */
    actualExpanded         : boolean
    
    /**
     * The current transition phase of the expand/collapse lifecycle.
     * 
     * Reflects both transitional states (`expanding`, `collapsing`) and resolved states (`expanded`, `collapsed`).
     */
    expandPhase            : ExpandPhase
    
    /**
     * A CSS class name reflecting the current expand/collapse phase.
     * 
     * Possible values:
     * - `'is-collapsed'`
     * - `'is-collapsing'`
     * - `'is-expanding'`
     * - `'is-expanded'`
     */
    expandClassname        : ExpandClassname
    
    /**
     * Requests a change to the expanded state.
     * 
     * - In uncontrolled mode (no `expanded` prop), updates internal state directly.
     * - In controlled mode, delegates the decision to the parent component, which may choose to accept or ignore the request.
     * - Always triggers `onExpandedChange`, if provided, regardless of control mode.
     * 
     * Restricted behavior (`disabled` or `readonly`):
     * - When restricted, expansion requests are ignored and the component remains in its last expanded/collapsed state.
     * - When restriction is lifted, `dispatchExpandedChange()` resumes normal operation.
     */
    dispatchExpandedChange : ValueChangeDispatcher<boolean, TChangeEvent>
}



/**
 * A list of expand/collapse-related CSS variables used for expansion-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface CollapseStateVars {
    /**
     * References an animation used during the expanding transition.
     * It becomes invalid (`unset`) when not actively expanding.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationExpanding  : unknown
    
    /**
     * References an animation used during the collapsing transition.
     * It becomes invalid (`unset`) when not actively collapsing.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationCollapsing : unknown
    
    /**
     * Applies when the component is either expanding or fully expanded.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either expanding or fully expanded:
     *     blockSize : `${collapseStateVars.isExpanded} 100px`,
     *     opacity   : `${collapseStateVars.isExpanded} 100%`,
     * });
     * ```
     */
    isExpanded          : unknown
    
    /**
     * Applies when the component is either collapsing or fully collapsed.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either collapsing or fully collapsed:
     *     blockSize : `${collapseStateVars.isCollapsed} 0px`,
     *     opacity   : `${collapseStateVars.isCollapsed} 0%`,
     * });
     * ```
     */
    isCollapsed         : unknown
    
    /**
     * A normalized, animatable factor representing the **expand/collapse lifecycle state**.
     * 
     * ### Expected values:
     * - **0**     : settled collapsed
     * - **1**     : settled expanded
     * - **0 → 1** : expanding transition (collapsed → expanded)
     * - **1 → 0** : collapsing transition (expanded → collapsed)
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `height`, `opacity`, `transform`, `rotation`, etc.
     * - Implementators are responsible for assigning transitional values in their animations.
     *   For example, an expanding animation might interpolate `expandFactor` from 0 → 1.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Notes:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     * - **Value rationale:**  
     *   - The factor represents the active lifecycle state (expanded), not the baseline (collapsed).  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `expandFactor = 0`: collapsed (baseline lifecycle state)  
     *     - `expandFactor = 1`: expanded (active lifecycle state)  
     * - **Naming rationale:**  
     *   - `expandFactor` instead of `collapseFactor`: factors consistently use the *base form* of the active state (`disable`, `readOnly`, `expand`, etc.).  
     */
    expandFactor        : unknown
    
    /**
     * A conditional mirror of `expandFactor` representing the **expand/collapse lifecycle state**.
     * Mirrors `expandFactor` during transitions and when fully expanded, but is explicitly
     * set to `unset` once the component reaches its baseline collapsed state.
     * 
     * ### Expected values:
     * - **unset** : settled collapsed (baseline inactive, declaration dropped)
     * - **1**     : settled expanded (mirrors `expandFactor`)
     * - **0 → 1** : expanding transition (mirrors `expandFactor`)
     * - **1 → 0** : collapsing transition (mirrors `expandFactor`)
     * 
     * ### Usage:
     * - Use when dependent properties should be **poisoned** (ignored) in the baseline collapsed state.
     *   Example: gating `filter`, `color-mix`, or other overrides that should disappear when collapsed.
     * - During animations and in the fully expanded state, `expandFactorCond` mirrors the numeric
     *   value of `expandFactor`, ensuring smooth transitions and consistency.
     * - Applicable to numeric-based properties such as `opacity`, `color`, `transform`, `box-shadow`, etc.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Notes:
     * - **Value rationale:**  
     *   - The factor represents the active lifecycle state (expanded), not the baseline (collapsed).  
     *   - Mirrors the active lifecycle state (expanded) during transitions and when settled expanded.  
     *   - Drops to `unset` only when fully collapsed, so dependent declarations fall back cleanly.  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `expandFactorCond = unset`: settled collapsed (baseline inactive, declaration dropped)
     *     - `expandFactorCond = 0`: collapsed during transition (numeric interpolation)
     *     - `expandFactorCond = 1`: expanded (settled active lifecycle state)  
     * - **Naming rationale:**  
     *   - `expandFactorCond` instead of `collapseFactorCond`: factors consistently use the *base form* of the active state (`disable`, `readOnly`, `focus`, `hover`, `press`, `active`, `expand`, etc.).  
     *   - `Cond` suffix indicates conditional presence: mirrors numeric factor during transitions
     *     and when expanded, but conditionally drops to `unset` at baseline collapsed.
     */
    expandFactorCond    : unknown
}



/**
 * Configuration options for customizing expand/collapse animations.
 */
export interface CssCollapseStateOptions {
    /**
     * Defines the animation to apply during the expanding transition.
     * 
     * When the `expanded` state changes away from `true`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationExpanding  ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the collapsing transition.
     * 
     * When the `expanded` state changes away from `false`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationCollapsing ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the expand/collapse animations based on current expanded state.
 */
export interface CssCollapseState {
    /**
     * Generates CSS rules that conditionally apply the expand/collapse animations based on current expanded state.
     * 
     * Typically used to toggle animation variables during expanding or collapsing transitions.
     */
    collapseStateRule : Lazy<CssRule>
    
    /**
     * Exposes expand/collapse-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationExpanding`  : Active during the expanding transition.
     * - `animationCollapsing` : Active during the collapsing transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    collapseStateVars : CssVars<CollapseStateVars>
}
