// React:
import {
    // Hooks:
    use,
    useMemo,
}                           from 'react'

// Types:
import {
    type AccessibilityProps,
    type ResolvedAccessibilityState,
}                           from './types.js'

// Defaults:
import {
    DEFAULT_DISABLED,
    DEFAULT_READ_ONLY,
    DEFAULT_ACTIVE,
    
    DEFAULT_CASCADE_DISABLED,
    DEFAULT_CASCADE_READ_ONLY,
    DEFAULT_CASCADE_ACTIVE,
}                           from './defaults.js'

// Contexts:
import {
    AccessibilityContext,
}                           from './contexts.js'



/**
 * Resolves the final accessibility states (`disabled`, `readOnly`, `active`) by
 * combining local props with optional cascading from an `<AccessibilityProvider>`.
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
    // Extract props and assign defaults:
    const {
        disabled        = DEFAULT_DISABLED,
        readOnly        = DEFAULT_READ_ONLY,
        active          = DEFAULT_ACTIVE,
        
        cascadeDisabled = DEFAULT_CASCADE_DISABLED,
        cascadeReadOnly = DEFAULT_CASCADE_READ_ONLY,
        cascadeActive   = DEFAULT_CASCADE_ACTIVE,
    } = props;
    
    
    
    // Retrieve ancestor accessibility context:
    const {
        disabled : ancestorDisabled,
        readOnly : ancestorReadOnly,
        active   : ancestorActive,
    } = use(AccessibilityContext);
    
    
    
    // Compute final resolved accessibilities:
    const computedDisabled : boolean = (cascadeDisabled ? ancestorDisabled : false) || disabled;
    const computedReadOnly : boolean = (cascadeReadOnly ? ancestorReadOnly : false) || readOnly;
    const computedActive   : boolean = (cascadeActive   ? ancestorActive   : false) || active;
    
    
    
    // Return stable resolved state:
    return useMemo(() => ({
        disabled : computedDisabled,
        readOnly : computedReadOnly,
        active   : computedActive,
    } satisfies ResolvedAccessibilityState), [
        computedDisabled,
        computedReadOnly,
        computedActive,
    ]);
};
