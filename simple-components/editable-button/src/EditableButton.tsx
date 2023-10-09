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
    // react helper hooks:
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    
    
    
    // a possibility of UI having an invalid state:
    InvalidableProps,
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
}
const EditableButton = (props: EditableButtonProps): JSX.Element|null => {
    // styles:
    const styleSheet       = useEditableButtonStyleSheet();
    
    
    
    // states:
    const invalidableState = useInvalidable<HTMLButtonElement>(props);
    
    
    
    // rest props:
    const {
        // validations:
        enableValidation  : _enableValidation,  // remove
        isValid           : _isValid,           // remove
        inheritValidation : _inheritValidation, // remove
        onValidation      : _onValidation,      // remove
        
        
        
        // components:
        buttonComponent = (<Button /> as React.ReactComponentElement<any, ButtonProps>),
    ...restButtonProps} = props;
    
    
    
    // refs:
    const mergedElmRef   = useMergeRefs(
        // preserves the original `elmRef` from `buttonComponent`:
        buttonComponent.props.elmRef,
        
        
        
        // preserves the original `elmRef` from `props`:
        props.elmRef,
    );
    const mergedOuterRef = useMergeRefs(
        // preserves the original `outerRef` from `buttonComponent`:
        buttonComponent.props.outerRef,
        
        
        
        // preserves the original `outerRef` from `props`:
        props.outerRef,
    );
    
    
    
    // classes:
    const classes      = useMergeClasses(
        // preserves the original `classes` from `buttonComponent`:
        buttonComponent.props.classes,
        
        
        
        // preserves the original `classes` from `props`:
        props.classes,
        
        
        
        // classes:
        styleSheet.main,
    );
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses` from `buttonComponent`:
        buttonComponent.props.stateClasses,
        
        
        
        // preserves the original `stateClasses` from `props`:
        props.stateClasses,
        
        
        
        // states:
        invalidableState.class,
    );
    
    
    
    // handlers:
    const handleAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart` from `buttonComponent`:
        buttonComponent.props.onAnimationStart,
        
        
        
        // preserves the original `onAnimationStart` from `props`:
        props.onAnimationStart,
        
        
        
        // states:
        invalidableState.handleAnimationStart,
    );
    const handleAnimationEnd   = useMergeEvents(
        // preserves the original `onAnimationEnd` from `buttonComponent`:
        buttonComponent.props.onAnimationEnd,
        
        
        
        // preserves the original `onAnimationEnd` from `props`:
        props.onAnimationEnd,
        
        
        
        // states:
        invalidableState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    /* <Button> */
    return React.cloneElement<ButtonProps>(buttonComponent,
        // props:
        {
            // other props:
            ...restButtonProps,
            ...buttonComponent.props, // overwrites restButtonProps (if any conflics)
            
            
            
            // refs:
            elmRef           : mergedElmRef,
            outerRef         : mergedOuterRef,
            
            
            
            // classes:
            classes          : classes,
            stateClasses     : stateClasses,
            
            
            
            // handlers:
            onAnimationStart : handleAnimationStart,
            onAnimationEnd   : handleAnimationEnd,
        },
        
        
        
        // children:
        buttonComponent.props.children ?? props.children,
    );
};
export {
    EditableButton,
    EditableButton as default,
}

export type { ButtonType, ButtonStyle, ButtonVariant }



export interface EditableButtonComponentProps
{
    // components:
    editableButtonComponent ?: React.ReactComponentElement<any, EditableButtonProps>
}
