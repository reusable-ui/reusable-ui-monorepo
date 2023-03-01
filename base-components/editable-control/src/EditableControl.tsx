// react:
import {
    // react:
    default as React,
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
    // react helper hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    
    
    
    // a possibility of UI having an invalid state:
    InvalidableProps,
    useInvalidable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    ControlProps,
    Control,
}                           from '@reusable-ui/control'         // a base component

// internals:
import {
    // states:
    EditableControlElement,
    CustomValidatorHandler,
    isEditableControlElement,
    useInputValidator,
}                           from './states/InputValidator.js'



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
    const setInputRef = useEvent<React.RefCallback<TElement>>((element) => {
        // conditions:
        if (!element) return;
        
        
        
        if (isEditableControlElement(element)) {
            inputValidator.handleInit(element);
        }
        else {
            const firstInput = element.querySelector('input, select, textarea') as (EditableControlElement|null);
            if (firstInput) inputValidator.handleInit(firstInput);
        } // if
    });
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
