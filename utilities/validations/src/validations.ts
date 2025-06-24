// React:
import {
    // Hooks:
    use,
    useMemo,
}                           from 'react'

// Types:
import {
    type ValidationProps,
    type ResolvedValidationState,
}                           from './types.js'

// Defaults:
import {
    DEFAULT_ENABLE_VALIDATION,
    DEFAULT_IS_VALID,
    
    DEFAULT_CASCADE_VALIDATION,
}                           from './defaults.js'

// Contexts:
import {
    ValidationContext,
}                           from './contexts.js'



/**
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
    // Retrieve ancestor validation context:
    const {
        hasParentValidation,
        enableValidation : ancestorEnableValidation,
        isValid          : ancestorIsValid,
    } = use(ValidationContext);
    
    
    
    // Extract props and assign defaults:
    const {
        enableValidation  = hasParentValidation ? DEFAULT_ENABLE_VALIDATION : false, // Default to disabled at root.
        isValid           = DEFAULT_IS_VALID,
        cascadeValidation = DEFAULT_CASCADE_VALIDATION,
    } = props;
    
    
    
    // Compute final resolved validations:
    /*
        Resolve whether validation is enabled:
        - If cascading is enabled, inherit the ancestor’s `enableValidation` state.
        - Otherwise, assume the ancestor allows validation (defaults to `true`).
        - Combine with the local `enableValidation` toggle to finalize.
    */
    const computedEnableValidation : boolean = (cascadeValidation ? ancestorEnableValidation : true) && enableValidation;
    
    // Compute final validation state:
    const computedIsValid : boolean | null | 'auto' = (() => {
        // Validation is disabled → treat as unvalidated:
        if (!computedEnableValidation) return null;
        
        // Explicitly inherit the ancestor’s `isValid` result:
        if (isValid === 'inherit') return ancestorIsValid;
        
        // Use local `isValid` — can be `true`, `false`, `null`, or `'auto'`:
        return isValid;
    })();
    
    
    
    // Return stable resolved state:
    return useMemo(() => ({
        enableValidation : computedEnableValidation,
        isValid          : computedIsValid,
    } satisfies ResolvedValidationState), [
        computedEnableValidation,
        computedIsValid,
    ]);
};
