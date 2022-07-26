// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useMemo,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    states,
    keyframes,
    fallbacks,
    
    
    
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // hooks:
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    FloatableProps,
    useFloatable,
}                           from '@reusable-ui/floatable'       // a capability of UI to float/overlay on the top/beside the another UI
import {
    // hooks:
    ifCollapsed,
    usesCollapsible,
    ExpandedChangeEvent,
    CollapsibleProps,
    useCollapsible,
}                           from '@reusable-ui/collapsible'     // a capability of UI to expand/reduce its size or toggle the visibility
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // hooks:
    OrientationName,
    OrientationVariantOptions,
    defaultBlockOrientationVariantOptions,
    normalizeOrientationVariantOptions,
    usesOrientationVariant,
    OrientationVariant,
    useOrientationVariant,
    usesAnim,
}                           from '@reusable-ui/basic'           // a base component



// hooks:

// layouts:

//#region orientation
export const defaultOrientationRuleOptions = defaultBlockOrientationVariantOptions;
//#endregion orientation



// styles:
export const usesCollapseLayout = (options?: OrientationVariantOptions) => {
    // options:
    options = normalizeOrientationVariantOptions(options, defaultOrientationRuleOptions);
    const [orientationInlineSelector, orientationBlockSelector] = usesOrientationVariant(options);
    
    
    
    // dependencies:
    
    // animations:
    const [animRule, anims] = usesAnim();
    
    
    
    return style({
        ...imports([
            // animations:
            animRule,
        ]),
        ...style({
            // customize:
            ...usesCssProps(collapses), // apply config's cssProps
            ...rule(orientationInlineSelector, { // inline
                // overwrites propName = propName{Inline}:
                ...overwriteProps(collapses, usesSuffixedProps(collapses, 'inline')),
            }),
            ...rule(orientationBlockSelector , { // block
                // overwrites propName = propName{Block}:
                ...overwriteProps(collapses, usesSuffixedProps(collapses, 'block')),
            }),
            
            
            
            // animations:
            anim : anims.anim,
        }),
    });
};
export const usesCollapseStates = () => {
    // dependencies:
    
    // states:
    const [collapsibleRule] = usesCollapsible(collapses);
    
    
    
    return style({
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
};

export const useCollapseStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesCollapseLayout(),
        
        // states:
        usesCollapseStates(),
    ]),
}), { id: 'gh2oi6zjs0' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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
            ['300ms', 'ease-out', 'both', keyframesExpand  ],
        ]                                                       as CssKnownProps['anim'],
        animCollapse       : [
            ['500ms', 'ease-out', 'both', keyframesCollapse],
        ]                                                       as CssKnownProps['anim'],
        
        
        
        ...keyframesExpandInlineRule,
        ...keyframesCollapseInlineRule,
        animExpandInline   : [
            ['300ms', 'ease-out', 'both', keyframesExpandInline  ],
        ]                                                       as CssKnownProps['anim'],
        animCollapseInline : [
            ['500ms', 'ease-out', 'both', keyframesCollapseInline],
        ]                                                       as CssKnownProps['anim'],
    };
}, { prefix: 'clps' });



// react components:
export interface CollapseProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        GenericProps<TElement>,
        
        // layouts:
        OrientationVariant,
        
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
const Collapse = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: CollapseProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet         = useCollapseStyleSheet();
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    const isOrientationBlock = ((props.orientation ?? defaultOrientationRuleOptions.defaultOrientation) === 'block');
    
    
    
    // states:
    const collapsibleState   = useCollapsible<TElement, TExpandedChangeEvent>(props);
    const isVisible          = collapsibleState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    
    
    
    // features:
    const floatable          = useFloatable<TElement>(props, isVisible);
    
    
    
    // rest props:
    const {
        // layouts:
        orientation        : _orientation, // remove
        
        
        
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
        orientationVariant.class,
    );
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
    const mergedStyle = useMemo(() => ({
        // floatable:
        ...floatable.style,
        
        
        
        // preserves the original `style` (can overwrite the `floatable.style`):
        ...props.style,
    }), [floatable.style, props.style]);
    
    
    
    // handlers:
    const handleAnimationEnd = useMergeEvents(
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
            semanticRole={props.semanticRole ?? ''}
            aria-orientation={props['aria-orientation'] ?? (isOrientationBlock ? 'vertical' : 'horizontal')}
            
            
            
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
            onAnimationEnd={handleAnimationEnd}
        >
            { (!lazy || isVisible) && children }
        </Generic>
    );
};
export {
    Collapse,
    Collapse as default,
}

export type { OrientationName, OrientationVariant }
