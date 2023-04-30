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
    useMergeStyles,
    
    
    
    // a capability of UI to float/overlay on the top/beside the another UI:
    FloatableProps,
    useFloatable,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableProps,
    useOrientationable,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
    CollapsibleProps,
    useCollapsible,
    useLastKnownExpandedSize,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a generic component

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from './defaults.js'



// styles:
export const useCollapseStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'gh2oi6zjs0' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface CollapseProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        GenericProps<TElement>,
        
        // capabilities:
        FloatableProps,
        
        // variants:
        OrientationableProps,
        
        // states:
        CollapsibleProps<TExpandedChangeEvent>
{
    // behaviors:
    lazy     ?: boolean
    
    
    
    // children:
    children ?: React.ReactNode
}
const Collapse = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: CollapseProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet             = useCollapseStyleSheet();
    
    
    
    // variants:
    const orientationableVariant = useOrientationable(props, defaultOrientationableOptions);
    
    
    
    // states:
    const collapsibleState       = useCollapsible<TElement, TExpandedChangeEvent>(props);
    const isVisible              = collapsibleState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    const lastKnownExpandedSize  = useLastKnownExpandedSize<TElement>(collapsibleState);
    
    
    
    // capabilities:
    const floatable              = useFloatable<TElement>(props, isVisible);
    
    
    
    // rest props:
    const {
        // behaviors:
        lazy               = false,
        
        
        
        // variants:
        orientation        : _orientation,        // remove
        
        
        
        // states:
        expanded           : _expanded,           // remove
        
        
        
        // floatable:
        floatingOn         : _floatingOn,         // remove
        floatingPlacement  : _floatingPlacement,  // remove
        floatingMiddleware : _floatingMiddleware, // remove
        floatingStrategy   : _floatingStrategy,   // remove
        
        floatingAutoFlip   : _floatingAutoFlip,   // remove
        floatingAutoShift  : _floatingAutoShift,  // remove
        floatingOffset     : _floatingOffset,     // remove
        floatingShift      : _floatingShift,      // remove
        
        onFloatingUpdate   : _onFloatingUpdate,   // remove
        
        
        
        // children:
        children,
    ...restGenericProps} = props;
    
    
    
    // refs:
    const mergedOuterRef = useMergeRefs<TElement>(
        // preserves the original `outerRef`:
        props.outerRef,
        
        
        
        floatable.outerRef,
        lastKnownExpandedSize.setCollapseRef,
    );
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationableVariant.class,
    );
    const stateClasses   = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // states:
        collapsibleState.class,
    );
    const classes        = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // capabilities:
        floatable.classes,
    );
    
    
    
    // styles:
    const mergedStyle       = useMergeStyles(
        // styles:
        lastKnownExpandedSize.style,
        
        
        
        // preserves the original `style` (can overwrite the `lastKnownExpandedSize.style`):
        props.style,
    );
    
    
    
    // handlers:
    const handleAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart`:
        props.onAnimationStart,
        
        
        
        // states:
        collapsibleState.handleAnimationStart,
    );
    const handleAnimationEnd   = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        collapsibleState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...restGenericProps}
            
            
            
            // refs:
            outerRef={mergedOuterRef}
            
            
            
            // semantics:
            // no need to set [aria-orientation], because the expand/collapse is for styling purpose:
            // aria-orientation={props['aria-orientation'] ?? orientationableVariant['aria-orientation']}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            stateClasses={stateClasses}
            classes={classes}
            
            
            
            // styles:
            style={mergedStyle}
            
            
            
            // [open]:
            {...collapsibleState.props}
            
            
            
            // handlers:
            onAnimationStart = {handleAnimationStart}
            onAnimationEnd   = {handleAnimationEnd  }
        >
            { (!lazy || isVisible) && children }
        </Generic>
    );
};
export {
    Collapse,
    Collapse as default,
}



export interface CollapseComponentProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
{
    // components:
    collapseComponent ?: React.ReactComponentElement<any, CollapseProps<TElement, TExpandedChangeEvent>>
}
