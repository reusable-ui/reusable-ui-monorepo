// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'               // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    
    
    
    // a validation management system:
    ValidationProvider,
    
    
    
    // a possibility of UI having an invalid state:
    InvalidableProps,
    useInvalidable,
}                           from '@reusable-ui/core'                // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    ContentProps,
    Content,
}                           from '@reusable-ui/content'             // a base component

// internals:
import {
    // states:
    CustomValidatorHandler,
    useFormValidator,
}                           from './states/FormValidator.js'



// styles:
export const useFormStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'eqakn9c0py' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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
        
        // states:
        InvalidableProps
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
    const styleSheet       = useFormStyleSheet();
    
    
    
    // states:
    const formValidator    = useFormValidator(props.customValidator);
    const handleValidation = useMergeEvents(
        // preserves the original `onValidation`:
        props.onValidation,
        
        
        
        // states:
        formValidator.handleValidation,
    );
    const invalidableState = useInvalidable<HTMLFormElement>({
     // enabled           : props.enabled,         // the <Form> can't be disabled
     // inheritEnabled    : props.inheritEnabled,  // the <Form> can't be disabled
     // readOnly          : props.readOnly,        // the <Form> can't be readOnly
     // inheritReadOnly   : props.inheritReadOnly, // the <Form> can't be readOnly
        
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
    ...restContentProps} = props;
    
    
    
    // refs:
    const setFormRef = useEvent<React.RefCallback<HTMLFormElement>>((element) => {
        // conditions:
        if (!element) return;
        
        
        
        formValidator.handleInit(element);
    });
    const elmRef = useMergeRefs(
        // preserves the original `elmRef`:
        props.elmRef,
        
        
        
        setFormRef,
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
        formValidator.handleChange,
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
        <Content<HTMLFormElement>
            // other props:
            {...restContentProps}
            
            
            
            // refs:
            elmRef={elmRef}
            
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? 'form'} // uses <form>        as the default semantic tag
            semanticRole={props.semanticRole ?? 'form'} // uses [role="form"] as the default semantic role
            
            
            
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
    Form,
    Form as default,
}
