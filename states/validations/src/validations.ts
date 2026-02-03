// React:
import {
    // Hooks:
    useMemo,
}                           from 'react'

// Types:
import {
    type ValidationProps,
    type ResolvedValidationState,
}                           from './types.js'

// Reusable-ui states:
import {
    // Hooks:
    useValidityState,
}                           from '@reusable-ui/validity-state'      // Lifecycle-aware validation state with transition animations and semantic styling hooks for UI components.



/**
 * @deprecated
 * This hook is retained only for backward compatibility.
 * Please migrate to {@link useValidityState}, which is the new, unified API
 * for resolving validation state.
 * 
 * `useValidityState` behavior:
 * - Accepts `validity` prop (`true | false | null | 'auto'`) and `computedValidity`
 *   to determine the effective validity.
 * - Accepts `enableValidation` and `cascadeValidation` to control whether validation
 *   is active locally and/or inherited from a provider.
 * - If `validity='auto'`, the hook defers to `computedValidity` (your own observer logic)
 *   unless a provider enforces a concrete validity.
 * - If `cascadeValidation=true`, the hook respects ancestor providers' enable/disable rules.
 * - If validation is disabled (locally or cascaded), the hook always resolves to `null`.
 * 
 * Resolves the final validation states (`enableValidation`, `isValid`) by
 * combining local props with optional cascading from a `<ValidationProvider>`.
 * 
 * Automatically applies cascading logic to allow parent components
 * to control validation availability or outcomes across a subtree.
 * 
 * @example
 * ```ts
 * interface PasswordFieldProps extends ValidationProps {
 *     minLength ?: number;
 *     maxLength ?: number;
 * }
 * 
 * const PasswordField = (props: PasswordFieldProps) => {
 *     const {
 *         enableValidation,
 *         isValid,
 *         
 *         cascadeValidation,
 *         
 *         minLength = 5,
 *         maxLength = 20,
 *     } = props;
 * 
 *     const {
 *         enableValidation : computedEnableValidation,
 *         isValid          : preComputedIsValid,
 *     } = useResolvedValidationState({
 *         enableValidation,
 *         isValid,
 *         
 *         cascadeValidation,
 *     });
 * 
 *     const [value, setValue] = useState('');
 *     const computedIsValid = (
 *         preComputedIsValid !== 'auto'
 *         ? preComputedIsValid
 *         : ((value.length >= minLength) && (value.length <= maxLength))
 *     );
 * 
 *     return (
 *         <input
 *             type='password'
 *             value={value}
 *             onChange={({ target: { value }}) => setValue(value)}
 *             
 *             formNoValidate={!computedEnableValidation}
 *             aria-invalid={computedIsValid === false}
 *         />
 *     );
 * };
 * ```
 */
export const useResolvedValidationState = (props: ValidationProps): ResolvedValidationState => {
    // Extract props and assign defaults:
    const {
        enableValidation,
        isValid           = 'auto',
        cascadeValidation,
    } = props;
    
    
    
    // Probe validity resolution:
    // We call `useValidityState()` twice with different `computedValidity` values.
    // If the results differ, it means the validity depends on `computedValidity`
    // (i.e. unresolved → should be returned as 'auto').
    // If the results are the same, we can safely return that concrete value.
    const resolvedWithTrue = useValidityState({
        enableValidation,
        validity          : (isValid === 'inherit') ? 'auto' : isValid,
        cascadeValidation,
        computedValidity  : true,
    });
    const resolvedWithFalse = useValidityState({
        enableValidation,
        validity          : (isValid === 'inherit') ? 'auto' : isValid,
        cascadeValidation,
        computedValidity  : false,
    });
    
    const finalIsValid : boolean | null | 'auto' =
        (resolvedWithTrue !== resolvedWithFalse)
        ? 'auto'
        : resolvedWithTrue;
    
    
    
    // Probe enablement resolution:
    // We check whether validation is disabled locally or suppressed by a provider.
    // Forcing validity=true ensures the result is either:
    // - `true`  → validation enabled
    // - `null`  → validation disabled (locally or cascaded)
    const finalEnableValidation : boolean = (
        useValidityState({
            enableValidation,
            validity          : true, // Force a concrete valid state.
            cascadeValidation,
            computedValidity  : true, // Ensures any null comes from provider suppression.
        })
        !==
        null
    );
    
    
    
    // Return stable resolved state:
    return useMemo(() => ({
        enableValidation : finalEnableValidation,
        isValid          : finalIsValid,
    } satisfies ResolvedValidationState), [
        finalEnableValidation,
        finalIsValid,
    ]);
};
