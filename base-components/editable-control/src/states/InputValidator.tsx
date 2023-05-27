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
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// hooks:

// states:

//#region InputValidator
export type EditableControlElement = HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
export type CustomValidatorHandler = (state: ValidityState, value: string) => ValResult

export const isEditableControlElement = (element: Element): element is EditableControlElement => {
    // a native html control should have .validity property, otherwise (like <div>, <span>, etc) is always undefined
    return !!(element as unknown as EditableControlElement).validity;
};

export interface InputValidatorApi<TElement extends EditableControlElement = EditableControlElement> {
    handleValidation : EventHandler<ValidityChangeEvent>
    handleInit       : EventHandler<TElement>
    handleChange     : React.ChangeEventHandler<TElement>
}
export const useInputValidator     = <TElement extends EditableControlElement = EditableControlElement>(customValidator?: CustomValidatorHandler): InputValidatorApi<TElement> => {
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
    
    const validate = (element: TElement, immediately = false) => {
        const performUpdate = () => {
            // remember the validation result:
            const currentValidity = element.validity;
            const newIsValid : ValResult = (customValidator ? customValidator(currentValidity, element.value) : currentValidity.valid);
            if (isValid.current !== newIsValid) {
                isValid.current = newIsValid;
                
                // lazy responsives => a bit delayed of responsives is ok:
                startTransition(() => {
                    triggerRender(); // notify to react runtime to re-render with a new validity state
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
            const currentIsValid = element.validity.valid;
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
        if (event.isValid !== undefined) event.isValid = isValid.current;
    });
    
    const handleInit       = useEvent<EventHandler<TElement>>((element) => {
        validate(element, /*immediately =*/true);
    });
    
    const handleChange     = useEvent<React.ChangeEventHandler<TElement>>(({target}) => {
        validate(target); // use `target` instead of `currentTarget` for supporting a wrapper of <input> (bubbling up to <wrapper>)
    });
    
    
    
    // api:
    return {
        handleValidation,
        handleInit,
        handleChange,
    };
};
//#endregion InputValidator
