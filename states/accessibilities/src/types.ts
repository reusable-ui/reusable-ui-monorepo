// Reusable-ui states:
import {
    // Types:
    type DisabledStateProps,
    type DisabledBehaviorState,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.
import {
    // Types:
    type ReadOnlyStateProps,
    type ReadOnlyBehaviorState,
}                           from '@reusable-ui/read-only-state'     // Adds editable/read-only functionality to UI components, with transition animations and semantic styling hooks.
import {
    // Types:
    type ActiveStateProps,
    type ActiveBehaviorState,
}                           from '@reusable-ui/active-state'        // Lifecycle-aware activation state with transition animations and semantic styling hooks for UI components.



/**
 * @deprecated since v7.0.0
 * This interface is part of the deprecated `@reusable-ui/accessibilities` package.
 * 
 * Defines accessibility-related attributes for controlling user interaction, editability, and active state awareness.
 * Supports optional cascading from an ancestor accessibility context.
 * 
 * ⚠️ Notes:
 * Resolving all three states (`disabled`, `readOnly`, `active`) at once is rare in practice.
 * Please migrate to the individual behavior props:
 * - `DisabledStateProps`
 * - `ReadOnlyStateProps`
 * - `ActiveStateProps`
 */
export interface AccessibilityProps
    extends
        // Bases:
        DisabledStateProps,
        ReadOnlyStateProps,
        ActiveStateProps
{
}

/**
 * @deprecated since v7.0.0
 * This interface is part of the deprecated `@reusable-ui/accessibilities` package.
 * 
 * Represents the final resolved accessibility states of a component.
 * 
 * These values reflect the computed `disabled`, `readOnly`, and `active` states
 * after evaluating local props in conjunction with any cascading accessibility context.
 * 
 * ⚠️ Notes:
 * Resolving all three states (`disabled`, `readOnly`, `active`) at once is rare in practice.
 * Please migrate to the individual behavior states:
 * - `DisabledBehaviorState`
 * - `ReadOnlyBehaviorState`
 * - `ActiveBehaviorState`
 */
export interface ResolvedAccessibilityState
    extends
        // Bases:
        Pick<DisabledBehaviorState, 'disabled'>,
        Pick<ReadOnlyBehaviorState, 'readOnly'>,
        Pick<ActiveBehaviorState, 'active'>
{
}
