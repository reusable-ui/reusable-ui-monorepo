// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    CssRule,
    
    
    
    // writes css in javascript:
    states,
    keyframes,
    fallbacks,
    style,
    imports,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
    usesSuffixedProps,
    overwriteProps,
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
    
    
    
    // a capability of UI to float/overlay on the top/beside the another UI:
    FloatableProps,
    useFloatable,
    
    
    
    // animation stuff of UI:
    usesAnimation,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableOptions,
    defaultBlockOrientationableOptions,
    usesOrientationable,
    OrientationableProps,
    useOrientationable,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ifCollapsed,
    usesCollapsible,
    ExpandedChangeEvent,
    CollapsibleProps,
    useCollapsible,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a generic component



// defaults:
export const defaultOrientationableOptions = defaultBlockOrientationableOptions;



// configs:
export const [collapses, collapseValues, cssCollapseConfig] = cssConfig(() => {
    //#region keyframes
    const frameCollapsed    = style({
        overflowY     : 'clip',
        ...fallbacks({
            overflowY     : 'hidden',
        }),
        maxBlockSize  : 0,
    });
    const frameIntermediate = style({
        overflowY     : 'clip',
        ...fallbacks({
            overflowY     : 'hidden',
        }),
        maxBlockSize  : '100vh',
    });
    const frameExpanded     = style({
        overflowY     : 'unset',
        maxBlockSize  : 'unset',
    });
    const [keyframesExpandRule  , keyframesExpand  ] = keyframes({
        from  : frameCollapsed,
        '99%' : frameIntermediate,
        to    : frameExpanded,
    });
    keyframesExpand.value   = 'expand';   // the @keyframes name should contain 'expand'   in order to be recognized by `useCollapsible`
    const [keyframesCollapseRule, keyframesCollapse] = keyframes({
        from  : frameExpanded,
        '1%'  : frameIntermediate,
        to    : frameCollapsed,
    });
    keyframesCollapse.value = 'collapse'; // the @keyframes name should contain 'collapse' in order to be recognized by `useCollapsible`
    
    
    
    const frameCollapsedInline    = style({
        overflowX     : 'clip',
        ...fallbacks({
            overflowX     : 'hidden',
        }),
        maxInlineSize : 0,
    });
    const frameIntermediateInline = style({
        overflowX     : 'clip',
        ...fallbacks({
            overflowX     : 'hidden',
        }),
        maxInlineSize : '100vw',
    });
    const frameExpandedInline     = style({
        overflowX     : 'unset',
        maxInlineSize : 'unset',
    });
    const [keyframesExpandInlineRule  , keyframesExpandInline  ] = keyframes({
        from  : frameCollapsedInline,
        '99%' : frameIntermediateInline,
        to    : frameExpandedInline,
    });
    keyframesExpandInline.value   = 'expandInline';   // the @keyframes name should contain 'expand'   in order to be recognized by `useCollapsible`
    const [keyframesCollapseInlineRule, keyframesCollapseInline] = keyframes({
        from  : frameExpandedInline,
        '1%'  : frameIntermediateInline,
        to    : frameCollapsedInline,
    });
    keyframesCollapseInline.value = 'collapseInline'; // the @keyframes name should contain 'collapse' in order to be recognized by `useCollapsible`
    //#endregion keyframes
    
    
    
    return {
        // animations:
        ...keyframesExpandRule,
        ...keyframesCollapseRule,
        animExpand         : [
            ['300ms', 'ease-in' , 'both', keyframesExpand  ],
        ]                                                       as CssKnownProps['animation'],
        animCollapse       : [
            ['500ms', 'ease-out', 'both', keyframesCollapse],
        ]                                                       as CssKnownProps['animation'],
        
        
        
        ...keyframesExpandInlineRule,
        ...keyframesCollapseInlineRule,
        animExpandInline   : [
            ['300ms', 'ease-in' , 'both', keyframesExpandInline  ],
        ]                                                       as CssKnownProps['animation'],
        animCollapseInline : [
            ['500ms', 'ease-out', 'both', keyframesCollapseInline],
        ]                                                       as CssKnownProps['animation'],
    };
}, { prefix: 'clps' });



// styles:
let collapseLayoutCache : WeakRef<CssRule>|undefined = undefined;
export const usesCollapseLayout = (options?: OrientationableOptions) => {
    const cached = collapseLayoutCache?.deref();
    if (cached) return cached;
    
    
    
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock} = orientationableStuff;
    
    
    
    // dependencies:
    
    // features:
    const {animationRule, animationVars} = usesAnimation();
    
    
    
    const result = style({
        ...imports([
            // features:
            animationRule,
        ]),
        ...style({
            // customize:
            ...usesCssProps(collapses), // apply config's cssProps
            ...ifOrientationInline({ // inline
                // overwrites propName = propName{Inline}:
                ...overwriteProps(collapses, usesSuffixedProps(collapses, 'inline')),
            }),
            ...ifOrientationBlock({  // block
                // overwrites propName = propName{Block}:
                ...overwriteProps(collapses, usesSuffixedProps(collapses, 'block')),
            }),
            
            
            
            // animations:
            anim : animationVars.anim,
        }),
    });
    collapseLayoutCache = new WeakRef<CssRule>(result);
    return result;
};

let collapseStatesCache : WeakRef<CssRule>|undefined = undefined;
export const usesCollapseStates = () => {
    const cached = collapseStatesCache?.deref();
    if (cached) return cached;
    
    
    
    // dependencies:
    
    // states:
    const {collapsibleRule} = usesCollapsible(collapses);
    
    
    
    const result = style({
        ...imports([
            // states:
            collapsibleRule,
        ]),
        ...states([
            ifCollapsed({
                // appearances:
                display: 'none', // hide the <Collapse>
            }),
        ]),
    });
    collapseStatesCache = new WeakRef<CssRule>(result);
    return result;
};

cssCollapseConfig.onChange.subscribe(() => {
    // clear caches:
    collapseLayoutCache = undefined;
    collapseStatesCache = undefined;
});

export const useCollapseStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesCollapseLayout(),
        
        // states:
        usesCollapseStates(),
    ]),
}), { id: 'gh2oi6zjs0' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface CollapseProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        GenericProps<TElement>,
        
        // features:
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
    
    
    
    // features:
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
    const mergedOuterRef = useMergeRefs(
        // preserves the original `outerRef`:
        props.outerRef,
        
        
        
        floatable.outerRef,
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
        
        
        
        // features:
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
