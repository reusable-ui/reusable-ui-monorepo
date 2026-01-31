// Reusable-ui states:
import {
    // Hooks:
    useDisabledState,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.
import {
    // Hooks:
    useReadOnlyState,
}                           from '@reusable-ui/read-only-state'     // Adds editable/read-only functionality to UI components, with transition animations and semantic styling hooks.
import {
    // Hooks:
    useActiveState,
}                           from '@reusable-ui/active-state'        // Lifecycle-aware activation state with transition animations and semantic styling hooks for UI components.

// Types:
import {
    type AccessibilityProps,
    type ResolvedAccessibilityState,
}                           from './types.js'



/**
 * @deprecated since v7.0.0
 * This hook is part of the deprecated `@reusable-ui/accessibilities` package.
 * 
 * Resolves the final accessibility states (`disabled`, `readOnly`, `active`) by
 * combining local props with optional cascading from an `<AccessibilityProvider>`.
 * 
 * ⚠️ Notes:
 * Resolving all three states (`disabled`, `readOnly`, `active`) at once is rare in practice.
 * Please migrate to the individual behavior hooks:
 * - `useDisabledState`
 * - `useReadOnlyState`
 * - `useActiveState`
 * 
 * @example
 * ```ts
 * import {
 *     type AccessibilityProps,
 *     useResolvedAccessibilityState,
 *     AccessibilityProvider,
 * } from '@reusable-ui/accessibilities';
 * 
 * interface ToggleButtonProps extends AccessibilityProps {
 *     onClick?: React.MouseEventHandler<HTMLButtonElement>;
 * }
 * 
 * const ToggleButton = (props: ToggleButtonProps) => {
 *     const {
 *         disabled,
 *         readOnly,
 *         active,
 *         
 *         cascadeDisabled,
 *         cascadeReadOnly,
 *         cascadeActive,
 *         
 *         onClick,
 *     } = props;
 *     
 *     const {
 *         disabled : computedDisabled,
 *         readOnly : computedReadOnly,
 *         active   : computedActive,
 *     } = useResolvedAccessibilityState({
 *         disabled,
 *         readOnly,
 *         active,
 *         
 *         cascadeDisabled,
 *         cascadeReadOnly,
 *         cascadeActive,
 *     });
 *     
 *     return (
 *         <button
 *             type='button'
 *             
 *             disabled={computedDisabled}
 *             aria-readonly={computedReadOnly || undefined}
 *             aria-pressed={computedActive || undefined}
 *             
 *             onClick={!computedDisabled && !computedReadOnly ? onClick : undefined}
 *         >
 *             Toggle
 *         </button>
 *     );
 * };
 * ```
 */
export const useResolvedAccessibilityState = (props: AccessibilityProps): ResolvedAccessibilityState => {
    // States:
    const disabled = useDisabledState(props);
    const readOnly = useReadOnlyState(props);
    const active   = useActiveState(props);
    
    
    
    // Return resolved state:
    return {
        disabled,
        readOnly,
        active,
    } satisfies ResolvedAccessibilityState;
};
