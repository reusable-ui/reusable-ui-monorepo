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
    // checks if a certain css feature is supported by the running browser:
    supportsHasPseudoClass,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a collection of TypeScript type utilities, assertions, and validations for ensuring type safety in reusable UI components:
    type NoForeignProps,
    
    
    
    // react helper hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    
    
    
    // a possibility of UI having an invalid state:
    type ValidityChangeEvent,
    type ValidationDeps,
    type ValidationEventHandler,
    type InvalidableProps,
    useInvalidable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    type ControlProps,
    Control,
}                           from '@reusable-ui/control'         // a base component

// internals:
import {
    // states:
    type EditableControlElement,
    type CustomValidatorHandler,
    isEditableControlElement,
    useInputValidator,
}                           from './states/InputValidator.js'
import {
    getControllableValue,
}                           from './utilities.js'



// styles:
export const useEditableControlStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, {
    id      : 'rww4hy9rmx',             // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
    lazyCsr : supportsHasPseudoClass(), // dealing with browsers that don't support the :has() selector
});



// react components:
export interface EditableControlProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        Omit<ControlProps<TElement>,
            // values:
            |'onChange' // use `onChange` from `EditableControlProps` instead of `ControlProps`
        >,
        
        // input:
        // partially implemented <input>'s props because <EditableControl> is a base control component:
        Pick<React.InputHTMLAttributes<TElement>,
            // accessibilities:
            |'autoFocus'
            
            // validations:
            |'required'
            
            // forms:
            |'name'|'form'
            
            // values:
            |'defaultValue'
            |'value'
            |'onChange' // use `onChange` from `EditableControlProps` instead of `ControlProps`
        >,
        
        // states:
        InvalidableProps
{
    // values:
    /**
     * A helper prop to notify the component that the value has changed and needs validation.
     */
    notifyValueChange ?: unknown
    
    
    
    // validations:
    /**
     * @deprecated use `onValidation` for watching and/or modifying the validation.
     */
    customValidator ?: CustomValidatorHandler
}
const EditableControl = <TElement extends Element = HTMLElement>(props: EditableControlProps<TElement>): JSX.Element|null => {
    // props:
    const {
        // refs:
        elmRef,
        
        
        
        // classes:
        stateClasses,
        
        
        
        // values:
        notifyValueChange = getControllableValue(props), // take to `useInvalidable`
        onChange,
        
        
        
        // validations:
        enableValidation,                                // take to `useInvalidable`
        isValid,                                         // take to `useInvalidable`
        inheritValidation,                               // take to `useInvalidable`
        validationDeps     : validationDepsOverwrite,    // take to `useInvalidable`
        onValidation,                                    // take to `useInvalidable`
        customValidator,                                 // take to `useInputValidator`
        
        validDelay,                                      // take to `useInvalidable`
        invalidDelay,                                    // take to `useInvalidable`
        noValidationDelay,                               // take to `useInvalidable`
        
        
        
        // handlers:
        onAnimationStart,
        onAnimationEnd,
        
        
        
        // other props:
        ...restEditableControlProps
    } = props;
    
    
    
    // styles:
    const styles               = useEditableControlStyleSheet();
    
    
    
    // states:
    const [senseValueChange, setSenseValueChange] = React.useState<{}>({});
    
    
    
    // states:
    const inputValidator       = useInputValidator<EditableControlElement>(customValidator);
    const appendValidationDeps = useEvent<ValidationDeps>((bases) => [
        ...bases,
        
        // validations:
        (props.required ?? false),
        
        // values:
        notifyValueChange, // detects the controllable   value has changed
        senseValueChange,  // detects the uncontrollable value has changed
    ]);
    const mergedValidationDeps = useEvent<ValidationDeps>((bases) => {
        const basesStage2 = appendValidationDeps(bases);
        const basesStage3 = validationDepsOverwrite ? validationDepsOverwrite(basesStage2) : basesStage2;
        
        return basesStage3;
    });
    const handleValidation     = useEvent<ValidationEventHandler<ValidityChangeEvent>>(async (event) => {
        /* sequentially runs validators from `inputValidator.handleValidation()` then followed by `props.onValidation()` */
        
        
        
        // states:
        // `inputValidator` is the primary validator, so it should be the first validation check:
        await inputValidator.handleValidation(event);
        
        
        
        // preserves the original `onValidation` from `props`:
        // *props*Validator (if any) is the external supplement validator, so it should be the last validation check:
        await onValidation?.(event);
    });
    const invalidableState     = useInvalidable<TElement>({
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
        enabled           : props.enabled,
        inheritEnabled    : props.inheritEnabled,
        readOnly          : props.readOnly,
        inheritReadOnly   : props.inheritReadOnly,
    });
    
    
    
    // refs:
    const inputRefInternal     = useRef<TElement|null>(null);
    const setInputRef          = useEvent<React.RefCallback<TElement>>((element) => {
        if (!element) {
            inputValidator.inputRef.current = null; // the input element is unmounted => do nothing
        }
        else if (isEditableControlElement(element)) { // case of the <EditableControl> is the input element
            inputValidator.inputRef.current = element; // the input element is mounted => set the input element
        }
        else { // case of the <EditableControl> is a wrapper of the input element
            // assumes the first input element is the inner input element:
            const firstInput = element.querySelector(':is(input, select, textarea)') as (EditableControlElement|null);
            if (firstInput) {
                inputValidator.inputRef.current = firstInput; // the inner input element is mounted => set the input element
            }
            else {
                inputValidator.inputRef.current = null; // the inner input element is not found => do nothing
            } // if
        } // if
    });
    const mergedElmRef         = useMergeRefs(
        // preserves the original `elmRef` from `props`:
        elmRef,
        
        
        
        inputRefInternal,
        setInputRef,
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
        // conditions:
        if (notifyValueChange !== undefined) return; // controllable component mode => ignore value changes from the `onChange` event
        
        
        
        // actions:
        setSenseValueChange({}); // signal that the uncontrollable value has changed
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
    
    // supports for <Radio> or <Radio>-like:
    useEffect(() => {
        // conditions:
        const currentRadioElm = inputRefInternal.current;
        if (!currentRadioElm) return; // radio was unmounted => nothing to do
        
        
        
        // setups:
        currentRadioElm.addEventListener('clear', handleChangeInternal); // when another <Radio> is selected, it affects the current <Radio>'s validityState, so we need to re-validate the current <Radio>
        
        
        
        // cleanups:
        return () => {
            currentRadioElm.removeEventListener('clear', handleChangeInternal);
        };
    }, []); // lifecycle: mount and unmount
    
    
    
    // default props:
    const {
        // semantics:
        'aria-invalid' : ariaInvalid = invalidableState.ariaInvalid,
        
        
        
        // classes:
        mainClass                    = styles.main,
        
        
        
        // other props:
        ...restControlProps
    } = restEditableControlProps satisfies NoForeignProps<typeof restEditableControlProps, ControlProps<TElement>, Pick<React.InputHTMLAttributes<TElement>, 'autoFocus'|'required'|'name'|'form'|'defaultValue'|'value'|'onChange'>>;
    
    
    
    // jsx:
    return (
        <Control<TElement>
            // other props:
            {...restControlProps}
            
            
            
            // refs:
            elmRef={mergedElmRef}
            
            
            
            // semantics:
            aria-invalid={ariaInvalid}
            
            
            
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
    EditableControl,            // named export for readibility
    EditableControl as default, // default export to support React.lazy
}
