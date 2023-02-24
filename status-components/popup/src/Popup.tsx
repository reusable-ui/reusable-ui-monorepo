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
    
    
    
    // a capability of UI to float/overlay on the top/beside the another UI:
    FloatableProps,
    useFloatable,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
    CollapsibleProps,
    useCollapsible,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component



// styles:
export const usePopupStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'usjjnl1scl' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface PopupProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        BasicProps<TElement>,
        
        // capabilities:
        FloatableProps,
        
        // states:
        CollapsibleProps<TExpandedChangeEvent>
{
    // behaviors:
    lazy     ?: boolean
    
    
    
    // children:
    children ?: React.ReactNode
}
const Popup = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: PopupProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet       = usePopupStyleSheet();
    
    
    
    // states:
    const collapsibleState = useCollapsible<TElement, TExpandedChangeEvent>(props);
    const isVisible        = collapsibleState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    
    
    
    // capabilities:
    const floatable        = useFloatable<TElement>(props, isVisible);
    
    
    
    // rest props:
    const {
        // behaviors:
        lazy               = false,
        
        
        
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
    ...restBasicProps} = props;
    
    
    
    // refs:
    const mergedOuterRef = useMergeRefs(
        // preserves the original `outerRef`:
        props.outerRef,
        
        
        
        floatable.outerRef,
    );
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // states:
        collapsibleState.class,
    );
    const classes      = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // capabilities:
        floatable.classes,
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
        <Basic<TElement>
            // other props:
            {...restBasicProps}
            
            
            
            // refs:
            outerRef={mergedOuterRef}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? 'status'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            classes={classes}
            
            
            
            // [open]:
            {...collapsibleState.props}
            
            
            
            // handlers:
            onAnimationStart = {handleAnimationStart}
            onAnimationEnd   = {handleAnimationEnd  }
        >
            { (!lazy || isVisible) && children }
        </Basic>
    );
};
export {
    Popup,
    Popup as default,
}



export interface PopupComponentProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
{
    // components:
    popupComponent ?: React.ReactComponentElement<any, PopupProps<TElement, TExpandedChangeEvent>>
}
