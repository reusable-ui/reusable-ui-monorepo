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
 * Typically used in interactive components (e.g. Alert, Toast, Accordion) that may initiate expand/collapse
 * through user actions such as dismiss buttons, ESC key presses, or header toggles.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 */
export interface CollapseStateChangeProps<TChangeEvent = unknown> {
    /**
     * Signals intent to change the expanded state:
     * - `true`  → request to expand
     * - `false` → request to collapse
     * 
     * The parent may choose to honor or ignore this request.
     */
    onExpandedChange ?: ValueChangeEventHandler<boolean, TChangeEvent>
}

/**
 * Props for listening lifecycle events triggered by expand/collapse phase transitions.
 * 
 * These events allow external listeners to react to phase changes—such as logging, analytics,
 * or chaining animations.
 */
export interface CollapseStatePhaseEventProps {
    /**
     * Called when the expand animation begins.
     */
    onExpandStart   ?: ValueChangeEventHandler<ExpandPhase, unknown>
    
    /**
     * Called when the expand animation completes.
     */
    onExpandEnd     ?: ValueChangeEventHandler<ExpandPhase, unknown>
    
    /**
     * Called when the collapse animation begins.
     */
    onCollapseStart ?: ValueChangeEventHandler<ExpandPhase, unknown>
    
    /**
     * Called when the collapse animation completes.
     */
    onCollapseEnd   ?: ValueChangeEventHandler<ExpandPhase, unknown>
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
     * Specifies the initial expanded state for uncontrolled mode when no `defaultExpanded` prop is explicitly provided:
     * - `true`  : the component is initially expanded
     * - `false` : the component is initially collapsed
     * 
     * Defaults to `false` (collapsed).
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
     * Defaults to `false` (no bubbling).
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
 * An API for accessing the resolved expand/collapse state, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 */
export interface CollapseBehaviorState<TElement extends Element = HTMLElement, TChangeEvent = unknown>
    extends
        // Bases:
        AnimationStateHandlers<TElement>
{
    /**
     * Indicates whether the component is currently in an expanded/collapsed state.
     * This reflects the final resolved state, not the transitional intent.
     * 
     * Possible values:
     * - `true`  : the component is expanded
     * - `false` : the component is collapsed
     */
    expanded               : boolean
    
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
    expandClassname        : `is-${ExpandPhase}`
    
    /**
     * Requests a change to the expanded state.
     * 
     * - In uncontrolled mode (no `expanded` prop), updates internal state directly.
     * - In controlled mode, delegates the decision to the parent component, which may choose to accept or ignore the request.
     * - Always triggers `onExpandedChange`, if provided, regardless of control mode.
     */
    dispatchExpandedChange : ValueChangeDispatcher<boolean, TChangeEvent>
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
    isExpanded        : unknown
    
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
    isCollapsed       : unknown
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
