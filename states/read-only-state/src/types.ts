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
 * Props for controlling the editable/read-only state of the component.
 * 
 * Accepts an optional `readOnly` prop, defaulting to `false` (editable) when not provided.
 */
export interface ReadOnlyStateProps {
    /**
     * Specifies the current read-only state:
     * - `true`  : the component is read-only
     * - `false` : the component is editable
     * 
     * Defaults to `false` (editable).
     */
    readOnly        ?: boolean
    
    /**
     * Specifies whether the component can become read-only via parent context:
     * - `true`  : allows the component to be made read-only via parent context
     * - `false` : the component can only be made read-only directly via its own `readOnly` prop
     * 
     * Defaults to `true` (allows contextual read-only).
     */
    cascadeReadOnly ?: boolean
}

/**
 * Props for reporting updates to the editable/read-only state.
 * 
 * Typically used in editable components (e.g. Input, TextArea, Select) to notify external systems
 * when the resolved editable/read-only state changes—whether due to `readOnly` prop changes or contextual override.
 */
export interface ReadOnlyStateUpdateProps {
    /**
     * Reports the updated read-only state whenever it changes:
     * - `true`  → the component is now read-only
     * - `false` → the component is now editable
     * 
     * This is a passive notification; it does not request a change to the read-only state.
     */
    onReadOnlyUpdate ?: ValueChangeEventHandler<boolean, unknown>
}

/**
 * Props for listening lifecycle events triggered by editable/read-only phase transitions.
 * 
 * These events allow external listeners to react to phase changes—such as logging, analytics,
 * or chaining animations.
 */
export interface ReadOnlyStatePhaseEventProps {
    /**
     * Called when the editable animation begins.
     */
    onEditableStart  ?: ValueChangeEventHandler<ReadOnlyPhase, unknown>
    
    /**
     * Called when the editable animation completes.
     */
    onEditableEnd    ?: ValueChangeEventHandler<ReadOnlyPhase, unknown>
    
    /**
     * Called when the read-only animation begins.
     */
    onReadOnlyStart  ?: ValueChangeEventHandler<ReadOnlyPhase, unknown>
    
    /**
     * Called when the read-only animation completes.
     */
    onReadOnlyEnd    ?: ValueChangeEventHandler<ReadOnlyPhase, unknown>
}

/**
 * Optional configuration options for customizing editable/read-only behavior and animation lifecycle.
 */
export interface ReadOnlyStateOptions
    extends
        // Bases:
        Partial<Pick<AnimationStateOptions<boolean>,
            | 'animationPattern'
            | 'animationBubbling'
        >>
{
    /**
     * Specifies the default read-only state when no `readOnly` prop is explicitly provided:
     * - `true`  : the component is read-only
     * - `false` : the component is editable
     * 
     * Defaults to `false` (editable).
     */
    defaultReadOnly        ?: boolean
    
    /**
     * Specifies the default cascade behavior when no `cascadeReadOnly` prop is explicitly provided:
     * - `true`  : allows the component to be made read-only via parent context
     * - `false` : the component can only be made read-only directly via its own `readOnly` prop
     * 
     * Defaults to `true` (allows contextual read-only).
     */
    defaultCascadeReadOnly ?: boolean
    
    /**
     * Defines the pattern used to identify editable/read-only-related animation names.
     * 
     * This pattern determines which animations are considered part of the editable/read-only lifecycle.
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
     * Defaults to `['thaw', 'freeze']`.
     */
    animationPattern       ?: AnimationStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    animationBubbling      ?: AnimationStateOptions<boolean>['animationBubbling']
}

/**
 * Represents the resolved (settled) phase of the editable/read-only lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'editable'  ✍🏻 fully editable
 * - 'readonly'  🔏 fully read-only
 */
export type ResolvedReadOnlyPhase =
    | 'editable'
    | 'readonly'

/**
 * Represents the transitional phase of the editable/read-only lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'thawing'   🔄 transitioning toward editable
 * - 'freezing'  🔄 transitioning toward read-only
 */
export type TransitioningReadOnlyPhase =
    | 'thawing'
    | 'freezing'

/**
 * Represents the current transition phase of the editable/read-only lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'editable', 'readonly'
 * - Transitional: 'thawing', 'freezing'
 */
export type ReadOnlyPhase =
    | ResolvedReadOnlyPhase
    | TransitioningReadOnlyPhase

/**
 * An API for accessing the resolved editable/read-only state, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface ReadOnlyBehaviorState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        AnimationStateHandlers<TElement>
{
    /**
     * Indicates the current resolved editable/read-only state.
     * This reflects the final diagnostic status, not the transitional intent.
     * 
     * Possible values:
     * - `true`  : the component is read-only
     * - `false` : the component is editable
     */
    readOnly          : boolean
    
    /**
     * The current transition phase of the editable/read-only lifecycle.
     * 
     * Reflects both transitional states (`thawing`, `freezing`) and resolved states (`editable`, `readonly`).
     */
    readOnlyPhase     : ReadOnlyPhase
    
    /**
     * A CSS class name reflecting the current editable/read-only phase.
     * 
     * Possible values:
     * - `'is-readonly'`
     * - `'is-freezing'`
     * - `'is-thawing'`
     * - `'is-editable'`
     */
    readOnlyClassname : `is-${ReadOnlyPhase}`
}



/**
 * A list of editable/read-only-related CSS variables used for read-only-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ReadOnlyStateVars {
    /**
     * References a thawing animation used during the thawing transition.
     * Invalid (`unset`) when not actively thawing.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationThaw   : unknown
    
    /**
     * References a freezing animation used during the freezing transition.
     * Invalid (`unset`) when not actively freezing.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationFreeze : unknown
    
    /**
     * Applies when the component is either thawing or fully editable.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either thawing or fully editable:
     *     backgroundColor : `${readOnlyStateVars.isEditable} blue`,
     *     cursor          : `${readOnlyStateVars.isEditable} text`,
     * });
     * ```
     */
    isEditable      : unknown
    
    /**
     * Applies when the component is either freezing or fully read-only.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either freezing or fully read-only:
     *     backgroundColor : `${readOnlyStateVars.isReadOnly} gray`,
     *     cursor          : `${readOnlyStateVars.isReadOnly} not-allowed`,
     * });
     * ```
     */
    isReadOnly      : unknown
}



/**
 * Configuration options for customizing editable/read-only animations.
 */
export interface CssReadOnlyStateOptions {
    /**
     * The animation to apply during the thawing transition.
     * 
     * When the `readOnly` prop changes to `false`, the currently running animation is allowed to finish gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationThaw   ?: CssKnownProps['animation']
    
    /**
     * The animation to apply during the freezing transition.
     * 
     * When the `readOnly` prop changes to `true`, the currently running animation is allowed to finish gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationFreeze ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the editable/read-only animations based on current read-only state.
 */
export interface CssReadOnlyState {
    /**
     * Generates CSS rules that conditionally apply the editable/read-only animations based on current read-only state.
     * 
     * Typically used to toggle animation variables during thawing or freezing transitions.
     */
    readOnlyStateRule : Lazy<CssRule>
    
    /**
     * Exposes editable/read-only-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationThaw`   : Active during the thawing transition.
     * - `animationFreeze` : Active during the freezing transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    readOnlyStateVars : CssVars<ReadOnlyStateVars>
}
