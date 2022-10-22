// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    rule,
    states,
    keyframes,
    style,
    imports,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
}                           from '@cssfn/core'                  // writes css in javascript
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
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ifCollapsed,
    usesCollapsible,
    ExpandedChangeEvent,
    CollapsibleProps,
    useCollapsible,
    
    
    
    // size options of UI:
    usesResizable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component



// styles:
export const usesPopupLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBasicLayout(),
        ]),
        ...style({
            // positions:
            ...rule('.overlay', {
                zIndex: 1080,
            }),
            
            
            
            // customize:
            ...usesCssProps(popups), // apply config's cssProps
        }),
    });
};
export const usesPopupVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(popups);
    
    
    
    return style({
        ...imports([
            // variants:
            usesBasicVariants(),
            resizableRule,
        ]),
    });
};
export const usesPopupStates = () => {
    // dependencies:
    
    // states:
    const {collapsibleRule} = usesCollapsible(popups);
    
    
    
    return style({
        ...imports([
            // states:
            collapsibleRule,
        ]),
        ...states([
            ifCollapsed({
                // appearances:
                display: 'none', // hide the <Popup>
            }),
        ]),
    });
};

export const usePopupStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesPopupLayout(),
        
        // variants:
        usesPopupVariants(),
        
        // states:
        usesPopupStates(),
    ]),
}), { id: 'usjjnl1scl' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [popups, popupValues, cssPopupConfig] = cssConfig(() => {
    //#region keyframes
    const frameCollapsed    = style({
        opacity   : 0,
        transform : 'scale(0)',
    });
    const frameIntermediate = style({
        transform : 'scale(1.02)',
    });
    const frameExpanded     = style({
        opacity   : 1,
        transform : 'scale(1)',
    });
    const [keyframesExpandRule  , keyframesExpand  ] = keyframes({
        from  : frameCollapsed,
        '70%' : frameIntermediate,
        to    : frameExpanded,
    });
    keyframesExpand.value   = 'expand';   // the @keyframes name should contain 'expand'   in order to be recognized by `useCollapsible`
    const [keyframesCollapseRule, keyframesCollapse] = keyframes({
        from  : frameExpanded,
        '30%' : frameIntermediate,
        to    : frameCollapsed,
    });
    keyframesCollapse.value = 'collapse'; // the @keyframes name should contain 'collapse' in order to be recognized by `useCollapsible`
    //#endregion keyframes
    
    
    
    return {
        // animations:
        ...keyframesExpandRule,
        ...keyframesCollapseRule,
        animExpand       : [
            ['300ms', 'ease-out', 'both', keyframesExpand  ],
        ]                                                       as CssKnownProps['animation'],
        animCollapse     : [
            ['500ms', 'ease-out', 'both', keyframesCollapse],
        ]                                                       as CssKnownProps['animation'],
    };
}, { prefix: 'pop' });



// react components:
export interface PopupProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        BasicProps<TElement>,
        
        // features:
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
    
    
    
    // features:
    const floatable        = useFloatable<TElement>(props, isVisible);
    
    
    
    // rest props:
    const {
        // states:
        expanded           : _expanded,           // remove
        
        
        
        // behaviors:
        lazy               = false,
        
        
        
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
        
        
        
        // features:
        floatable.classes,
    );
    
    
    
    // styles:
    const mergedStyle = useMergeStyles(
        // floatable:
        floatable.style,
        
        
        
        // preserves the original `style` (can overwrite the `floatable.style`):
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
            
            
            
            // styles:
            style={mergedStyle}
            
            
            
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
