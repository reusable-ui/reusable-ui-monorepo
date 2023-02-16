// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useCallback,
    useEffect,
    
    
    
    // utilities:
    startTransition,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useTriggerRender,
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    
    
    
    // a validation management system:
    Result as ValResult,
    
    
    
    // a possibility of UI having an invalid state:
    ValidityChangeEvent,
    InvalidableProps,
    useInvalidable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    ControlProps,
    Control,
}                           from '@reusable-ui/control'         // a base component



// hooks:

// states:

//#region invalidable
export type EditableControlElement = HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
export type CustomValidatorHandler = (state: ValidityState, value: string) => ValResult

export const isEditableControlElement = (element: Element): element is EditableControlElement => {
    // a native html control should have .validity property, otherwise (like <div>, <span>, etc) is always undefined
    return !!(element as unknown as EditableControlElement).validity;
};

export const useInputValidator     = <TElement extends EditableControlElement = EditableControlElement>(customValidator?: CustomValidatorHandler) => {
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
    
    
    
    return {
        handleValidation,
        handleInit,
        handleChange,
    };
};
//#endregion invalidable



// styles:
export const useEditableControlStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'rww4hy9rmx' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface EditableControlProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        ControlProps<TElement>,
        
        // states:
        InvalidableProps
{
    // accessibilities:
    autoFocus       ?: boolean
    
    
    
    // validations:
    customValidator ?: CustomValidatorHandler
    required        ?: boolean
    
    
    
    // forms:
    name            ?: string
    form            ?: string
    
    
    
    // values:
    defaultValue    ?: number|string
    value           ?: number|string
    onChange        ?: React.ChangeEventHandler<TElement>
}
const EditableControl = <TElement extends Element = HTMLElement>(props: EditableControlProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet       = useEditableControlStyleSheet();
    
    
    
    // states:
    const inputValidator   = useInputValidator<EditableControlElement>(props.customValidator);
    const handleValidation = useMergeEvents(
        // preserves the original `onValidation`:
        props.onValidation,
        
        
        
        // states:
        inputValidator.handleValidation,
    );
    const invalidableState = useInvalidable<TElement>({
        enabled           : props.enabled,
        inheritEnabled    : props.inheritEnabled,
        
        readOnly          : props.readOnly,
        inheritReadOnly   : props.inheritReadOnly,
        
        enableValidation  : props.enableValidation,
        isValid           : props.isValid,
        inheritValidation : props.inheritValidation,
        onValidation      : handleValidation,
    });
    
    
    
    // rest props:
    const {
        // validations:
        enableValidation  : _enableValidation,  // remove
        isValid           : _isValid,           // remove
        inheritValidation : _inheritValidation, // remove
        onValidation      : _onValidation,      // remove
        customValidator   : _customValidator,   // remove
    ...restControlProps} = props;
    
    
    
    // refs:
    const setInputRef = useCallback<React.RefCallback<TElement>>((element) => {
        // conditions:
        if (!element) return;
        
        
        
        if (isEditableControlElement(element)) {
            inputValidator.handleInit(element);
        }
        else {
            const firstInput = element.querySelector('input, select, textarea') as (EditableControlElement|null);
            if (firstInput) inputValidator.handleInit(firstInput);
        } // if
    }, [inputValidator.handleInit]);
    const elmRef = useMergeRefs(
        // preserves the original `elmRef`:
        props.elmRef,
        
        
        
        setInputRef,
    );
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // states:
        invalidableState.class,
    );
    
    
    
    // handlers:
    const handleChange         = useMergeEvents(
        // preserves the original `onChange`:
        props.onChange,
        
        
        
        // states:
        
        // validations:
        inputValidator.handleChange as unknown as React.ChangeEventHandler<TElement>,
    );
    const handleAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart`:
        props.onAnimationStart,
        
        
        
        // states:
        invalidableState.handleAnimationStart,
    );
    const handleAnimationEnd   = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        invalidableState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    return (
        <Control<TElement>
            // other props:
            {...restControlProps}
            
            
            
            // refs:
            elmRef={elmRef}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            
            
            
            // handlers:
            onChange         = {handleChange        }
            onAnimationStart = {handleAnimationStart}
            onAnimationEnd   = {handleAnimationEnd  }
        />
    );
};
export {
    EditableControl,
    EditableControl as default,
}
