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

//#region InputValidator
export type EditableControlElement = HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
/**
 * @deprecated use `onValidation` for watching and/or modifying the validation.
 */
export type CustomValidatorHandler = (validityState: ValidityState, value: string) => ValResult|Promise<ValResult>

export const isEditableControlElement = (element: Element): element is EditableControlElement => {
    // a native html control should have .validity property, otherwise (like <div>, <span>, etc) is always undefined
    return !!(element as unknown as EditableControlElement).validity;
};

export interface InputValidatorApi<TElement extends EditableControlElement = EditableControlElement> {
    // refs:
    inputRef         : React.MutableRefObject<TElement|null> // getter and setter ref
    
    
    
    // handlers:
    handleValidation : ValidationEventHandler<ValidityChangeEvent>
}
export const useInputValidator     = <TElement extends EditableControlElement = EditableControlElement>(customValidator?: CustomValidatorHandler): InputValidatorApi<TElement> => {
    // refs:
    const inputRef = useRef<TElement|null>(null);
    
    
    
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
        const inputElm = inputRef.current;
        if (!inputElm) return; // the input element was unmounted => do nothing
        
        // get validation result:
        const validityState = inputElm.validity;
        if (validityState === undefined) return; // the input element was not a valid `EditableControlElement` => do nothing
        const newIsValid : ValResult = (customValidator ? (await customValidator(validityState, ((inputElm as HTMLInputElement)?.checked !== undefined) ? `${(inputElm as HTMLInputElement).checked}` : inputElm?.value)) : validityState.valid);
        
        event.isValid = newIsValid; // update the validation result
    });
    
    
    
    // api:
    return {
        // refs:
        inputRef,
        
        
        
        // handlers:
        handleValidation,
    };
};
//#endregion InputValidator
