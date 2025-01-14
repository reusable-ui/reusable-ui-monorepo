// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'               // writes css in react hook

// reusable-ui core:
import {
    // a collection of TypeScript type utilities, assertions, and validations for ensuring type safety in reusable UI components:
    type NoForeignProps,
    
    
    
    // react helper hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    
    
    
    // a validation management system:
    ValidationProvider,
    
    
    
    // a possibility of UI having an invalid state:
    type ValidityChangeEvent,
    type ValidationDeps,
    type ValidationEventHandler,
    type InvalidableProps,
    useInvalidable,
}                           from '@reusable-ui/core'                // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    type ContentProps,
    Content,
}                           from '@reusable-ui/content'             // a base component

// internals:
import {
    // states:
    type CustomValidatorHandler,
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
    /**
     * @deprecated use `onValidation` for watching and/or modifying the validation.
     */
    customValidator ?: CustomValidatorHandler
}
const Form         = (props: FormProps): JSX.Element|null => {
    // jsx:
    // Wrap the actual <FormInternal> into <ValidationProvider>,
    // so the <FormInternal> itself and the nested controls governed by <ValidationProvider> in case the `inheritValidation` is turned on.
    // The <FormInternal> needs to be inside <ValidationProvider> because it uses the `useInvalidable` hook that internally uses the `usePropIsValid` hook that requires the <ValidationProvider> context.
    return (
        <ValidationProvider {...props}>
            <FormInternal {...props} />
        </ValidationProvider>
    );
};
const FormInternal = (props: FormProps): JSX.Element|null => {
    // props:
    const {
        // refs:
        elmRef,
        
        
        
        // classes:
        stateClasses,
        
        
        
        // values:
        onChange,
        
        
        
        // validations:
        enableValidation,                             // take to `useInvalidable`
        isValid,                                      // take to `useInvalidable`
        inheritValidation,                            // take to `useInvalidable`
        validationDeps     : validationDepsOverwrite, // take to `useInvalidable`
        onValidation,                                 // take to `useInvalidable`
        customValidator,                              // take to `useFormValidator`
        
        validDelay,                                   // take to `useInvalidable`
        invalidDelay,                                 // take to `useInvalidable`
        noValidationDelay,                            // take to `useInvalidable`
        
        
        
        // handlers:
        onAnimationStart,
        onAnimationEnd,
        
        
        
        // other props:
        ...restFormProps
    } = props;
    
    
    
    // styles:
    const styles               = useFormStyleSheet();
    
    
    
    // states:
    const [senseValueChange, setSenseValueChange] = React.useState<{}>({});
    
    
    
    // states:
    const formValidator        = useFormValidator(customValidator);
    const appendValidationDeps = useEvent<ValidationDeps>((bases) => [
        ...bases,
        
        // validations:
        /* none */
        
        // values:
        senseValueChange, // detects the form's input value has changed
    ]);
    const mergedValidationDeps = useEvent<ValidationDeps>((bases) => {
        const basesStage2 = appendValidationDeps(bases);
        const basesStage3 = validationDepsOverwrite ? validationDepsOverwrite(basesStage2) : basesStage2;
        
        return basesStage3;
    });
    const handleValidation     = useEvent<ValidationEventHandler<ValidityChangeEvent>>(async (event) => {
        /* sequentially runs validators from `formValidator.handleValidation()` then followed by `props.onValidation()` */
        
        
        
        // states:
        // `formValidator` is the primary validator, so it should be the first validation check:
        await formValidator.handleValidation(event);
        
        
        
        // preserves the original `onValidation` from `props`:
        // *props*Validator (if any) is the external supplement validator, so it should be the last validation check:
        await onValidation?.(event);
    });
    const invalidableState     = useInvalidable<HTMLFormElement>({
        // validations:
        enableValidation  : enableValidation,
        isValid           : isValid,
        inheritValidation : inheritValidation,
        validationDeps    : mergedValidationDeps,
        onValidation      : handleValidation,
        
        validDelay,
        invalidDelay,
        noValidationDelay,
        
        
        
        // states:
     // enabled           : props.enabled,         // the <Form> can't be disabled
     // inheritEnabled    : props.inheritEnabled,  // the <Form> can't be disabled
     // readOnly          : props.readOnly,        // the <Form> can't be readOnly
     // inheritReadOnly   : props.inheritReadOnly, // the <Form> can't be readOnly
    });
    
    
    
    // refs:
    const formRefInternal      = useRef<HTMLFormElement|null>(null);
    const mergedElmRef         = useMergeRefs(
        // preserves the original `elmRef` from `props`:
        elmRef,
        
        
        
        formRefInternal,
        formValidator.formRef,
    );
    
    
    
    // classes:
    const mergedStateClasses   = useMergeClasses(
        // preserves the original `stateClasses` from `props`:
        stateClasses,
        
        
        
        // states:
        invalidableState.class,
    );
    
    
    
    // handlers:
    const handleChangeInternal = useEvent(() => {
        // actions:
        setSenseValueChange({}); // signal that the form's input value has changed
    });
    const handleChange         = useMergeEvents(
        // preserves the original `onChange` from `props`:
        onChange,
        
        
        
        // states:
        handleChangeInternal,
    );
    const handleAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart` from `props`:
        onAnimationStart,
        
        
        
        // states:
        invalidableState.handleAnimationStart,
    );
    const handleAnimationEnd   = useMergeEvents(
        // preserves the original `onAnimationEnd` from `props`:
        onAnimationEnd,
        
        
        
        // states:
        invalidableState.handleAnimationEnd,
    );
    
    
    
    // effects:
    
    // supports for controls' validation props changes:
    useEffect(() => {
        // conditions:
        const formElm = formRefInternal.current;
        if (!formElm) return; // form element is unmounted => nothing to do
        
        
        
        // setups:
        const observer = new MutationObserver((mutations) => {
            const relevantMutations = mutations.filter((mutation) => {
                return (mutation.type === 'attributes') && (mutation.target instanceof HTMLElement);
            });
            if (relevantMutations.length > 0) {
                handleChangeInternal(); // signal the form's input validation props have changed
            } // if
        });
        observer.observe(formElm, {
            attributes      : true,
            subtree         : true,
            attributeFilter : ['required', 'minLength', 'maxLength', 'min', 'max', 'step', 'pattern', 'type'], // validation props
        });
        
        
        
        // cleanups:
        return () => {
            observer.disconnect();
        };
    }, []); // lifecycle: mount and unmount
    
    
    
    // default props:
    const {
        // semantics:
        semanticTag  = 'form', // uses <form>        as the default semantic tag
        semanticRole = 'form', // uses [role="form"] as the default semantic role
        
        
        
        // classes:
        mainClass    = styles.main,
        
        
        
        // other props:
        ...restContentProps
    } = restFormProps satisfies NoForeignProps<typeof restFormProps, ContentProps<HTMLFormElement>, React.FormHTMLAttributes<HTMLFormElement>>;
    
    
    
    // jsx:
    return (
        <Content<HTMLFormElement>
            // other props:
            {...restContentProps}
            
            
            
            // refs:
            elmRef={mergedElmRef}
            
            
            
            // semantics:
            semanticTag ={semanticTag}
            semanticRole={semanticRole}
            
            
            
            // classes:
            mainClass={mainClass}
            stateClasses={mergedStateClasses}
            
            
            
            // values:
            onChange={handleChange}
            
            
            
            // handlers:
            onAnimationStart = {handleAnimationStart}
            onAnimationEnd   = {handleAnimationEnd  }
        />
    );
};
export {
    Form,            // named export for readibility
    Form as default, // default export to support React.lazy
}
