// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    
    
    
    // a validation management system:
    type Result as ValResult,
    
    
    
    // a possibility of UI having an invalid state:
    type ValidityChangeEvent,
    type ValidationEventHandler,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// hooks:

// states:

//#region FormValidator
/**
 * @deprecated use `onValidation` for watching and/or modifying the validation.
 */
export type CustomValidatorHandler = (isValid: ValResult) => ValResult|Promise<ValResult>

// const isFormValid = (element: HTMLFormElement): ValResult => {
//     if (element.matches(':valid'  )) return true;  // valid
//     if (element.matches(':invalid')) return false; // invalid
//     return null; // uncheck
// };
const getControlsValidity = (element: HTMLFormElement): ValidityState[] => {
    const validityStates: ValidityState[] = [];
    
    // Collect validity states of elements within the form
    const elements = element.elements;
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        if (el.validity && !el.disabled && !el.closest('fieldset[disabled]')) {
            validityStates.push(el.validity);
        }
    } // for
    
    // Collect validity states of elements with a form attribute pointing to this form
    const formId = element.id;
    if (formId) {
        const externalElements = document.querySelectorAll(`[form="${formId}"]`);
        externalElements.forEach((el) => {
            if (element.contains(el)) return; // Skip elements within the form because they were already checked
            if ((el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) && !el.disabled && !el.closest('fieldset[disabled]')) {
                if (el.validity) {
                    validityStates.push(el.validity);
                }
            } // if
        });
    } // if
    
    return validityStates;
};
// const checkValidityStates = (validityStates: ValidityState[]): ValidityState|undefined => {
//     if (validityStates.length === 0) return undefined;
//     
//     let lastValidityState: ValidityState|undefined = undefined;
//     for (const validityState of validityStates) {
//         lastValidityState = validityState;
//         if (!validityState.valid) {
//             return validityState; // Return early if an invalid state is found
//         }
//     } // for
//     
//     return lastValidityState; // Return the last validity state if all are valid
// };

export interface FormValidatorApi {
    // refs:
    formRef          : React.MutableRefObject<HTMLFormElement|null> // getter and setter ref
    
    
    
    // handlers:
    handleValidation : ValidationEventHandler<ValidityChangeEvent>
}
export const useFormValidator      = (customValidator?: CustomValidatorHandler): FormValidatorApi => {
    // refs:
    const formRef = useRef<HTMLFormElement|null>(null);
    
    
    
    // handlers:
    /**
     * Handles the validation result.
     * @returns  
     * `null`  = uncheck.  
     * `true`  = valid.  
     * `false` = invalid.
     */
    const handleValidation = useEvent<ValidationEventHandler<ValidityChangeEvent>>(async (event) => {
        // conditions:
        if (event.isValid !== true) return; // ignore if was *invalid*|*uncheck* (only perform a further_validation if was *valid*)
        
        
        
        // further validations:
        const formElm = formRef.current;
        if (!formElm) return; // form element element was unmounted => do nothing
        
        // get validation results:
        const validityStates = getControlsValidity(formElm);
        const calculatedIsValid = validityStates.every((validityState) => validityState.valid);
        const newIsValid : ValResult = (customValidator ? (await customValidator(calculatedIsValid)) : calculatedIsValid);
        
        event.isValid = newIsValid; // update the validation result
    });
    
    
    
    // api:
    return {
        // refs:
        formRef,
        
        
        
        // handlers:
        handleValidation,
    };
};
//#endregion FormValidator
