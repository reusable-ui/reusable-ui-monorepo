// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
    
    
    
    // utilities:
    startTransition,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useTriggerRender,
    useEvent,
    EventHandler,
    
    
    
    // a validation management system:
    Result as ValResult,
    
    
    
    // a possibility of UI having an invalid state:
    ValidityChangeEvent,
}                           from '@reusable-ui/core'                // a set of reusable-ui packages which are responsible for building any component



// hooks:

// states:

//#region FormValidator
/**
 * @deprecated use `onValidation` for watching and/or modifying the validation.
 */
export type CustomValidatorHandler = (isValid: ValResult) => ValResult|Promise<ValResult>

const isFormValid = (element: HTMLFormElement): ValResult => {
    if (element.matches(':valid'  )) return true;  // valid
    if (element.matches(':invalid')) return false; // invalid
    return null; // uncheck
};

export interface FormValidatorApi {
    handleValidation : EventHandler<ValidityChangeEvent>
    handleInit       : EventHandler<HTMLFormElement>
    handleChange     : React.FormEventHandler<HTMLFormElement>
}
export const useFormValidator      = (customValidator?: CustomValidatorHandler): FormValidatorApi => {
    // states:
    // we stores the `isValid` in `useRef` instead of `useState` because we need to *real-time export* of its value:
    const isValid = useRef<ValResult>(null); // initially unchecked (neither valid nor invalid)
    
    // manually controls the (re)render event:
    const [triggerRender] = useTriggerRender();
    
    
    
    // functions:
    
    const asyncPerformUpdate = useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
    useEffect(() => {
        // cleanups:
        return () => {
            // cancel out previously performUpdate (if any):
            if (asyncPerformUpdate.current) clearTimeout(asyncPerformUpdate.current);
        };
    }, []); // runs once on startup
    
    const validate = (element: HTMLFormElement, immediately = false) => {
        const performUpdate = async (): Promise<void> => {
            // remember the validation result:
            const currentIsValid = isFormValid(element);
            const newIsValid : ValResult = (customValidator ? (await customValidator(currentIsValid)) : currentIsValid);
            if (isValid.current !== newIsValid) {
                isValid.current = newIsValid;
                
                // lazy responsives => a bit delayed of responsives is ok:
                startTransition(() => {
                    triggerRender(); // notify to react runtime to re-render with a new validity state, causing `useInvalidable()` runs the effect => calls `onValidation` => `handleValidation()`
                });
            } // if
        };
        
        
        
        if (immediately) {
            // instant validating:
            performUpdate();
        }
        else {
            // cancel out previously performUpdate (if any):
            if (asyncPerformUpdate.current) clearTimeout(asyncPerformUpdate.current);
            
            
            
            // delaying the validation, to avoid unpleasant splash effect during editing
            const currentIsValid = isFormValid(element);
            asyncPerformUpdate.current = setTimeout(
                performUpdate,
                (currentIsValid !== false) ? 300 : 600
            );
        } // if
    };
    
    
    
    // handlers:
    
    /**
     * Handles the validation result.
     * @returns  
     * `null`  = uncheck.  
     * `true`  = valid.  
     * `false` = invalid.
     */
    const handleValidation = useEvent<EventHandler<ValidityChangeEvent>>((event) => {
        // conditions:
        if (event.isValid !== true) return; // ignore if was *invalid*|*uncheck* (only perform a further_validation if was *valid*)
        
        
        
        // further validations:
        event.isValid = isValid.current;
    });
    
    const handleInit       = useEvent<EventHandler<HTMLFormElement>>((element) => {
        validate(element, /*immediately =*/true);
    });
    
    const handleChange     = useEvent<React.FormEventHandler<HTMLFormElement>>(({currentTarget}) => {
        validate(currentTarget);
    });
    
    
    
    // api:
    return {
        handleValidation,
        handleInit,
        handleChange,
    };
};
//#endregion FormValidator
