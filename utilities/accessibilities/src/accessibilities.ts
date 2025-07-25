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
    DEFAULT_ENABLED,
    DEFAULT_READ_ONLY,
    DEFAULT_ACTIVE,
    
    DEFAULT_CASCADE_ENABLED,
    DEFAULT_CASCADE_READ_ONLY,
    DEFAULT_CASCADE_ACTIVE,
}                           from './defaults.js'

// Contexts:
import {
    AccessibilityContext,
}                           from './contexts.js'



/**
 * Resolves the final accessibility states (`enabled`, `readOnly`, `active`) by
 * combining local props with optional cascading from an `<AccessibilityProvider>`.
 * 
 * @example
 * ```ts
 * interface ToggleButtonProps extends AccessibilityProps {
 *     onClick?: React.MouseEventHandler<HTMLButtonElement>;
 * }
 * 
 * const ToggleButton = (props: ToggleButtonProps) => {
 *     const {
 *         enabled,
 *         readOnly,
 *         active,
 *         
 *         cascadeEnabled,
 *         cascadeReadOnly,
 *         cascadeActive,
 *         
 *         onClick,
 *     } = props;
 * 
 *     const {
 *         enabled  : computedEnabled,
 *         readOnly : computedReadOnly,
 *         active   : computedActive,
 *     } = useResolvedAccessibilityState({
 *         enabled,
 *         readOnly,
 *         active,
 *         
 *         cascadeEnabled,
 *         cascadeReadOnly,
 *         cascadeActive,
 *     });
 * 
 *     return (
 *         <button
 *             type='button'
 *             
 *             disabled={!computedEnabled}
 *             aria-readonly={computedReadOnly || undefined}
 *             aria-pressed={computedActive || undefined}
 *             
 *             onClick={enabled && !readOnly ? onClick : undefined}
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
        enabled         = DEFAULT_ENABLED,
        readOnly        = DEFAULT_READ_ONLY,
        active          = DEFAULT_ACTIVE,
        
        cascadeEnabled  = DEFAULT_CASCADE_ENABLED,
        cascadeReadOnly = DEFAULT_CASCADE_READ_ONLY,
        cascadeActive   = DEFAULT_CASCADE_ACTIVE,
    } = props;
    
    
    
    // Retrieve ancestor accessibility context:
    const {
        enabled  : ancestorEnabled,
        readOnly : ancestorReadOnly,
        active   : ancestorActive,
    } = use(AccessibilityContext);
    
    
    
    // Compute final resolved accessibilities:
    const computedEnabled  : boolean = (cascadeEnabled  ? ancestorEnabled  : true ) && enabled;
    const computedReadOnly : boolean = (cascadeReadOnly ? ancestorReadOnly : false) || readOnly;
    const computedActive   : boolean = (cascadeActive   ? ancestorActive   : false) || active;
    
    
    
    // Return stable resolved state:
    return useMemo(() => ({
        enabled  : computedEnabled,
        readOnly : computedReadOnly,
        active   : computedActive,
    } satisfies ResolvedAccessibilityState), [
        computedEnabled,
        computedReadOnly,
        computedActive,
    ]);
};
