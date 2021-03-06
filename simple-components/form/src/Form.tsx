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
    // rules:
    states,
    
    
    
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                     // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'               // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'                // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // hooks:
    useTriggerRender,
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'               // react helper hooks
import {
    // hooks:
    Result as ValResult,
    
    
    
    // react components:
    ValidationProps,
    ValidationProvider,
}                           from '@reusable-ui/validations'         // a validation management system

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'           // size options of UI

// reusable-ui components:
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
    
    
    
    // react components:
    ContentProps,
    Content,
}                           from '@reusable-ui/content'             // a base component
import {
    // hooks:
    ifValid,
    ifInvalid,
    usesValidInvalidState,
    markValid,
    markInvalid,
    ValidatorHandler,
    useValidInvalidState,
}                           from '@reusable-ui/editable-control'    // a base component



// hooks:

// validations:

//#region validInvalid
export type CustomValidatorHandler = (isValid: ValResult) => ValResult

const isFormValid = (element: HTMLFormElement): ValResult => {
    if (element.matches(':valid'  )) return true;  // valid
    if (element.matches(':invalid')) return false; // invalid
    return null; // uncheck
};

export const useFormValidator      = (customValidator?: CustomValidatorHandler) => {
    // states:
    // we stores the `isValid` in `useRef` instead of `useState` because we need to *real-time export* of its value as `validator` callback:
    const isValid = useRef<ValResult>(null); // initially unchecked (neither valid nor invalid)
    
    // manually controls the (re)render event:
    const [triggerRender] = useTriggerRender();
    
    
    
    // callbacks:
    /**
     * Handles the validation result.
     * @returns  
     * `null`  = uncheck.  
     * `true`  = valid.  
     * `false` = invalid.
     */
    const validator = useCallback<ValidatorHandler>(() =>
        isValid.current
    , []);
    
    
    
    // handlers:
    const asyncPerformUpdate = useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
    useEffect(() => {
        // cleanups:
        return () => {
            // cancel out previously performUpdate (if any):
            if (asyncPerformUpdate.current) clearTimeout(asyncPerformUpdate.current);
        };
    }, []); // runs once on startup
    
    const handleValidation = useCallback((element: HTMLFormElement, immediately = false) => {
        const performUpdate = () => {
            // remember the validation result:
            const currentIsValid = isFormValid(element);
            const newIsValid : ValResult = (customValidator ? customValidator(currentIsValid) : currentIsValid);
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
            const currentIsValid = isFormValid(element);
            asyncPerformUpdate.current = setTimeout(
                performUpdate,
                (currentIsValid !== false) ? 300 : 600
            );
        } // if
    }, [customValidator]);
    
    const handleInit       = useCallback((element: HTMLFormElement) => {
        handleValidation(element, /*immediately =*/true);
    }, [handleValidation]);
    
    const handleChange     = useEvent<React.FormEventHandler<HTMLFormElement>>(({currentTarget}) => {
        handleValidation(currentTarget);
    }, [handleValidation]);
    
    
    
    return {
        validator,
        
        handleInit,
        handleChange,
    };
};
//#endregion validInvalid



// styles:
export const usesFormLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesContentLayout(),
        ]),
        ...style({
            // customize:
            ...usesCssProps(forms), // apply config's cssProps
        }),
    });
};
export const usesFormVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(forms);
    
    
    
    return style({
        ...imports([
            // variants:
            usesContentVariants(),
            resizableRule,
        ]),
    });
};
export const usesFormStates = () => {
    // dependencies:
    
    // states:
    const [validInvalidStateRule] = usesValidInvalidState();
    
    
    
    return style({
        ...imports([
            // validations:
            validInvalidStateRule,
        ]),
        ...states([
            ifValid({
                ...imports([
                    markValid(),
                ]),
            }),
            ifInvalid({
                ...imports([
                    markInvalid(),
                ]),
            }),
        ]),
    });
};

export const useFormStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesFormLayout(),
        
        // variants:
        usesFormVariants(),
        
        // states:
        usesFormStates(),
    ]),
}), { id: 'eqakn9c0py' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [forms, formValues, cssFormConfig] = cssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'frm' });



// react components:
export interface FormProps
    extends
        // bases:
        ContentProps<HTMLFormElement>,
        
        // form:
        Omit<React.FormHTMLAttributes<HTMLFormElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >,
        
        // validations:
        ValidationProps
{
    // validations:
    customValidator ?: CustomValidatorHandler
    
    
    
    // children:
    children        ?: React.ReactNode
}
const Form = (props: FormProps): JSX.Element|null => {
    // jsx:
    // wrap the actual <FormInternal> into <ValidationProvider>,
    // so the hooks are controlled by <ValidationProvider>
    return (
        <ValidationProvider {...props}>
            <FormInternal {...props} />
        </ValidationProvider>
    );
};
const FormInternal = (props: FormProps): JSX.Element|null => {
    // styles:
    const styleSheet        = useFormStyleSheet();
    
    
    
    // states:
    
    // validations:
    const formValidator     = useFormValidator(props.customValidator);
    const validInvalidState = useValidInvalidState<HTMLFormElement>(props, formValidator.validator);
    
    
    
    // rest props:
    const {
        // validations:
        enableValidation  : _enableValidation,  // remove
        isValid           : _isValid,           // remove
        inheritValidation : _inheritValidation, // remove
        customValidator   : _customValidator,   // remove
    ...restContentProps} = props;
    
    
    
    // refs:
    const setFormRef = useCallback<React.RefCallback<HTMLFormElement>>((element) => {
        // conditions:
        if (!element) return;
        
        
        
        formValidator.handleInit(element);
    }, [formValidator.handleInit]);
    const elmRef = useMergeRefs(
        // preserves the original `elmRef`:
        props.elmRef,
        
        
        
        setFormRef,
    );
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // validations:
        validInvalidState.class,
    );
    
    
    
    // handlers:
    const handleChange       = useMergeEvents(
        // preserves the original `onChange`:
        props.onChange,
        
        
        
        // states:
        
        // validations:
        formValidator.handleChange,
    );
    const handleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        
        // validations:
        validInvalidState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    return (
        <Content<HTMLFormElement>
            // other props:
            {...restContentProps}
            
            
            
            // refs:
            elmRef={elmRef}
            
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? 'form'}
            semanticRole={props.semanticRole ?? 'form'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            
            
            
            // handlers:
            onChange       = {handleChange      }
            onAnimationEnd = {handleAnimationEnd}
        />
    );
};
export {
    Form,
    Form as default,
}
