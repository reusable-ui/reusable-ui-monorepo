// Reusable-ui utilities:
import {
    // Types:
    type ValueChangeHandler,
}                           from '@reusable-ui/controllable'        // Provides three state-control strategies for sharing values and updates between components and their parents — controlled, uncontrolled, and controllable (hybrid).

// Reusable-ui states:
import {
    // Types:
    type FeedbackStateProps,
    type FeedbackStateOptions,
    type FeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * Props for controlling the validity state of the component.
 * 
 * Provides a declarative way to control whether the component is valid, invalid, or unvalidated (neither valid nor invalid),
 * along with an optional callback to synchronize when that state changes.
 * 
 * Accepts an optional `validity` prop, defaulting to `'auto'` (automatically determine validity state) when not provided.
 */
export interface ValidityStateProps
    extends
        // Bases:
        Omit<FeedbackStateProps<boolean | null>, 'effectiveState' | 'onStateUpdate'>
{
    /**
     * Controls whether validation is active for this component.
     * 
     * ### Notes:
     * - Even if this component is enabled locally, a parent `<ValidityStateProvider>` can still
     * disable validation when `cascadeValidation = true`.
     * 
     * Defaults to:
     * - `false` → when used outside a `<ValidityStateProvider>` (validation disabled by default).
     * - `true`  → when used inside  a `<ValidityStateProvider>` (validation enabled by default).
     */
    enableValidation    ?: boolean
    
    /**
     * Controls the current validity state:
     * - `true`   : the component is valid
     * - `false`  : the component is invalid
     * - `null`   : the component is unvalidated (neither valid nor invalid)
     * - `'auto'` : automatically determine validity state
     * 
     * Restricted behavior (`disabled`, `readOnly`, or indirectly disabled
     * by `<ValidityStateProvider enableValidation={false}>`):
     * - When restricted, the component always resolves to `null` (unvalidated), regardless of `validity`.
     * - When restriction is lifted:
     *   - `'auto'` → re-evaluates validity, preferring parent provider (`true`/`false`/`null`) if available,
     *     otherwise falling back to `computedValidity`.
     *   - Explicit (`true`/`false`/`null`) → follows the provided value directly.
     * 
     * Defaults to `'auto'` (automatically determine validity state).
     */
    validity            ?: FeedbackStateProps<boolean | null>['effectiveState'] | 'auto'
    
    /**
     * Synchronizes companion components whenever the resolved validity state changes:
     * - `true`  → the component is now valid
     * - `false` → the component is now invalid
     * - `null`  → the component is now unvalidated
     * 
     * This is a passive synchronization signal used to keep companion components
     * (e.g. Button, Toggle, Switch) aligned with the component's state.
     * 
     * Triggered on both initial render and subsequent changes.
     * 
     * ⚠️ Important: This callback must not directly or indirectly update the `validity` prop,
     * otherwise an unwanted circular re-render may occur.
     */
    onValidityUpdate    ?: FeedbackStateProps<boolean | null>['onStateUpdate']
    
    /**
     * Controls whether ancestor validation intent cascades down.
     * 
     * When `cascadeValidation = true`:
     * - A parent `<ValidityStateProvider>` can disable this component.
     * - A parent `<ValidityStateProvider>` can enforce its own validity
     *   (`true`/`false`/`null`) when the local `validity` prop is `'auto'`.
     */
    cascadeValidation   ?: boolean
    
    /**
     * The derived validity value used when `validity` is set to `'auto'`.
     * 
     * This value is typically computed reactively based on input, async validation,
     * or domain-specific logic. It is ignored when `validity` is explicitly set.
     * 
     * Developers must supply `computedValidity` for correctness; otherwise, the component stays unvalidated.
     * 
     * Restricted behavior (`disabled` or `readOnly`):
     * - When restricted, the component always resolves to `null` (unvalidated), regardless of `computedValidity`.
     * - When restriction is lifted, the component resumes following the passed `computedValidity` value.
     * 
     * This property is intended for **component developers** who need to customize validity resolution.
     * For **application developers**, prefer using the `validity` prop directly.
     */
    computedValidity    ?: FeedbackStateProps<boolean | null>['effectiveState']
    
    
    
    /**
     * Called when the validating transition begins.
     */
    onValidatingStart   ?: ValueChangeHandler<ValidityPhase, unknown>
    
    /**
     * Called when the validating transition completes.
     */
    onValidatingEnd     ?: ValueChangeHandler<ValidityPhase, unknown>
    
    /**
     * Called when the invalidating transition begins.
     */
    onInvalidatingStart ?: ValueChangeHandler<ValidityPhase, unknown>
    
    /**
     * Called when the invalidating transition completes.
     */
    onInvalidatingEnd   ?: ValueChangeHandler<ValidityPhase, unknown>
    
    /**
     * Called when the unvalidating transition begins.
     */
    onUnvalidatingStart ?: ValueChangeHandler<ValidityPhase, unknown>
    
    /**
     * Called when the unvalidating transition completes.
     */
    onUnvalidatingEnd   ?: ValueChangeHandler<ValidityPhase, unknown>
}

/**
 * Optional configuration options for customizing validity behavior and animation lifecycle.
 */
export interface ValidityStateOptions
    extends
        // Bases:
        FeedbackStateOptions<boolean | null>
{
    /**
     * Specifies the default validity state when no `validity` prop is explicitly provided:
     * - `true`   : the component is valid
     * - `false`  : the component is invalid
     * - `null`   : the component is unvalidated (neither valid nor invalid)
     * - `'auto'` : automatically determine validity state
     * 
     * Defaults to `'auto'` (automatically determine validity state).
     */
    defaultValidity   ?: boolean | null | 'auto'
    
    /**
     * Specifies the fallback validity state when no effective validity value can be resolved:
     * - `true`  : the component is valid
     * - `false` : the component is invalid
     * - `null`  : the component is unvalidated (neither valid nor invalid)
     * 
     * This fallback applies when `validity` prop is set to `'auto'` but no `computedValidity` is provided.
     * 
     * Defaults to `null` (unvalidated).
     */
    fallbackValidity  ?: boolean | null
    
    /**
     * Defines the pattern used to identify validity-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the validity transition lifecycle.
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
     * Defaults to `['validating', 'invalidating', 'unvalidating']`.
     */
    animationPattern  ?: FeedbackStateOptions<boolean | null>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    bubblingAnimation ?: FeedbackStateOptions<boolean | null>['bubblingAnimation']
}

/**
 * Represents the resolved (settled) phase of the validity lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'valid'        ✅ fully valid
 * - 'invalid'      ❌ fully invalid
 * - 'unvalidated'  ➖ not yet validated
 */
export type ResolvedValidityPhase =
    | 'valid'
    | 'invalid'
    | 'unvalidated'

/**
 * Represents the transitional phase of the validity lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'validating'   🔄 transitioning toward valid
 * - 'invalidating' 🔄 transitioning toward invalid
 * - 'unvalidating' 🔄 transitioning toward unvalidated
 */
export type TransitioningValidityPhase =
    | 'validating'
    | 'invalidating'
    | 'unvalidating'

/**
 * Represents the current transition phase of the validity lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'valid', 'invalid', 'unvalidated'
 * - Transitional: 'validating', 'invalidating', 'unvalidating'
 */
export type ValidityPhase =
    | ResolvedValidityPhase
    | TransitioningValidityPhase

/**
 * A CSS class name reflecting the current validity phase.
 * 
 * Used for styling based on the lifecycle phase.
 * 
 * If in a transitioning phase, includes a `was-*` suffix to indicate the previous resolved state.
 */
export type ValidityClassname = `is-${ResolvedValidityPhase}` | `is-${TransitioningValidityPhase} was-${ResolvedValidityPhase}`

/**
 * An API for accessing the resolved validity state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface ValidityState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<FeedbackState<boolean | null, ValidityPhase, ValidityClassname, TElement>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
        >
{
    /**
     * The current settled validity state used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved state due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Useful for rendering the validity state in sync with animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component has visually settled in valid state
     * - `false` : the component has visually settled in invalid state
     * - `null`  : the component has visually settled in unvalidated state
     */
    validity          : FeedbackState<boolean | null, ValidityPhase, ValidityClassname, TElement>['state']
    
    /**
     * The actual resolved validity state, regardless of animation state.
     * 
     * This reflects the current target state based on the final validity status.
     * Unlike `validity`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for logic that needs the latest intent or target state, independent of animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component is intended to be valid
     * - `false` : the component is intended to be invalid
     * - `null`  : the component is intended to be unvalidated
     */
    actualValidity    : FeedbackState<boolean | null, ValidityPhase, ValidityClassname, TElement>['actualState']
    
    /**
     * The current transition phase of the validity lifecycle.
     * 
     * Reflects both transitional states (`validating`, `invalidating`, `unvalidating`) and resolved states (`valid`, `invalid`, `unvalidated`).
     */
    validityPhase     : FeedbackState<boolean | null, ValidityPhase, ValidityClassname, TElement>['transitionPhase']
    
    /**
     * A CSS class name reflecting the current validity phase.
     * 
     * Possible values:
     * - `'is-valid'`
     * - `'is-invalid'`
     * - `'is-unvalidated'`
     * - `'is-validating'`
     * - `'is-invalidating'`
     * - `'is-unvalidating'`
     * 
     * If in a transitioning phase, includes a `was-*` suffix to indicate the previous resolved state.
     */
    validityClassname : FeedbackState<boolean | null, ValidityPhase, ValidityClassname, TElement>['transitionClassname']
}
