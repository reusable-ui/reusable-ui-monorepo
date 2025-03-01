// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
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
    type ValidationDeps,
    type InvalidableProps,
    useInvalidable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // semantics:
    ButtonType,
    
    
    
    // variants:
    ButtonStyle,
    ButtonVariant,
    
    
    
    // react components:
    ButtonProps,
    Button,
    
    ButtonComponentProps,
}                           from '@reusable-ui/button'          // a base component



// styles:
export const useEditableButtonStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'uwv9kv8s2b' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface EditableButtonProps
    extends
        // bases:
        ButtonProps,
        
        // states:
        InvalidableProps,
        
        // components:
        Omit<ButtonComponentProps,
            // we don't need these extra properties because the <EditableButton> is sub <Button>
            |'buttonRef'
            |'buttonOrientation'
            |'buttonStyle'
            |'buttonChildren'
        >
{
    // values:
    /**
     * A helper prop to notify the component that the value has changed and needs validation.
     */
    notifyValueChange ?: unknown
}
const EditableButton = (props: EditableButtonProps): JSX.Element|null => {
    // props:
    const {
        // refs:
        elmRef,
        outerRef,
        
        
        
        // classes:
        classes,
        stateClasses,
        
        
        
        // values:
        notifyValueChange,                            // take to `useInvalidable`
        
        
        
        // validations:
        enableValidation,                             // take to `useInvalidable`
        isValid,                                      // take to `useInvalidable`
        inheritValidation,                            // take to `useInvalidable`
        validationDeps     : validationDepsOverwrite, // take to `useInvalidable`
        onValidation,                                 // take to `useInvalidable`
        
        validDelay,                                   // take to `useInvalidable`
        invalidDelay,                                 // take to `useInvalidable`
        noValidationDelay,                            // take to `useInvalidable`
        
        
        
        // components:
        buttonComponent    = (<Button /> as React.ReactComponentElement<any, ButtonProps>),
        
        
        
        // handlers:
        onAnimationStart,
        onAnimationEnd,
        
        
        
        // other props:
        ...restEditableButtonProps
    } = props;
    
    
    
    // styles:
    const styles           = useEditableButtonStyleSheet();
    
    
    
    // states:
    const appendValidationDeps = useEvent<ValidationDeps>((bases) => [
        ...bases,
        
        // validations:
        /* none */
        
        // values:
        notifyValueChange, // detects the controllable value has changed
    ]);
    const mergedValidationDeps = useEvent<ValidationDeps>((bases) => {
        const basesStage2 = appendValidationDeps(bases);
        const basesStage3 = validationDepsOverwrite ? validationDepsOverwrite(basesStage2) : basesStage2;
        
        return basesStage3;
    });
    const invalidableState = useInvalidable<HTMLButtonElement>({
        // validations:
        enableValidation  : enableValidation,
        isValid           : isValid,
        inheritValidation : inheritValidation,
        validationDeps    : mergedValidationDeps,
        onValidation      : onValidation,
        
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
    const mergedElmRef   = useMergeRefs(
        // preserves the original `elmRef` from `buttonComponent`:
        buttonComponent.props.elmRef,
        
        
        
        // preserves the original `elmRef` from `props`:
        elmRef,
    );
    const mergedOuterRef = useMergeRefs(
        // preserves the original `outerRef` from `buttonComponent`:
        buttonComponent.props.outerRef,
        
        
        
        // preserves the original `outerRef` from `props`:
        outerRef,
    );
    
    
    
    // classes:
    const mergedClasses      = useMergeClasses(
        // preserves the original `classes` from `buttonComponent`:
        buttonComponent.props.classes,
        
        
        
        // preserves the original `classes` from `props`:
        classes,
        
        
        
        // classes:
        styles.main, // additional styles
    );
    const mergedStateClasses = useMergeClasses(
        // preserves the original `stateClasses` from `buttonComponent`:
        buttonComponent.props.stateClasses,
        
        
        
        // preserves the original `stateClasses` from `props`:
        stateClasses,
        
        
        
        // states:
        invalidableState.class,
    );
    
    
    
    // handlers:
    const handleAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart` from `buttonComponent`:
        buttonComponent.props.onAnimationStart,
        
        
        
        // preserves the original `onAnimationStart` from `props`:
        onAnimationStart,
        
        
        
        // states:
        invalidableState.handleAnimationStart,
    );
    const handleAnimationEnd   = useMergeEvents(
        // preserves the original `onAnimationEnd` from `buttonComponent`:
        buttonComponent.props.onAnimationEnd,
        
        
        
        // preserves the original `onAnimationEnd` from `props`:
        onAnimationEnd,
        
        
        
        // states:
        invalidableState.handleAnimationEnd,
    );
    
    
    
    // default props:
    const {
        // semantics:
        'aria-invalid' : ariaInvalid = invalidableState.ariaInvalid,
        
        
        
        // children:
        children,
        
        
        
        // other props:
        ...restButtonProps
    } = restEditableButtonProps satisfies NoForeignProps<typeof restEditableButtonProps, ButtonProps>;
    
    const {
        // semantics:
        'aria-invalid' : buttonComponentAriaInvalid = ariaInvalid,
        
        
        
        // children:
        children       : buttonComponentChildren    = children,
        
        
        
        // other props:
        ...restButtonComponentProps
    } = buttonComponent.props;
    
    
    
    // jsx:
    /* <Button> */
    return React.cloneElement<ButtonProps>(buttonComponent,
        // props:
        {
            // other props:
            ...restButtonProps,
            ...restButtonComponentProps, // overwrites restButtonProps (if any conflics)
            
            
            
            // refs:
            elmRef           : mergedElmRef,
            outerRef         : mergedOuterRef,
            
            
            
            // semantics:
            'aria-invalid'   : buttonComponentAriaInvalid,
            
            
            
            // classes:
            classes          : mergedClasses,
            stateClasses     : mergedStateClasses,
            
            
            
            // handlers:
            onAnimationStart : handleAnimationStart,
            onAnimationEnd   : handleAnimationEnd,
        },
        
        
        
        // children:
        buttonComponentChildren,
    );
};
export {
    EditableButton,            // named export for readibility
    EditableButton as default, // default export to support React.lazy
}

export type { ButtonType, ButtonStyle, ButtonVariant }



export interface EditableButtonComponentProps
{
    // components:
    editableButtonComponent ?: React.ReactComponentElement<any, EditableButtonProps>
}
