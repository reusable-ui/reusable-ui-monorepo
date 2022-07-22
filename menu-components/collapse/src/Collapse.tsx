// react:
import {
    // react:
    default as React,
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
    
    
    
    // styles:
    style,
    vars,
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
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    ExpandCollapseVars,
    ifExpanding,
    ifCollapsing,
    ifCollapsed,
    usesExpandCollapseState as baseUsesExpandCollapseState,
    ExpandedChangeEvent,
}                           from '@reusable-ui/expandable'      // a capability of UI to expand/reduce its size or toggle the visibility
import type {
    // react components:
    GenericProps,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    OrientationName,
    OrientationVariantOptions,
    defaultBlockOrientationVariantOptions,
    normalizeOrientationVariantOptions,
    usesOrientationVariant,
    OrientationVariant,
    useOrientationVariant,
    usesAnim,
    
    
    
    // react components:
    BasicProps,
}                           from '@reusable-ui/basic'           // a base component
import {
    // types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    PopupPosition,
    PopupSide,
    
    
    
    // react components:
    PopupProps,
    Popup,
}                           from '@reusable-ui/popup'           // a base component



// hooks:

// layouts:

//#region orientation
export const defaultOrientationRuleOptions = defaultBlockOrientationVariantOptions;
//#endregion orientation


// accessibilities:

//#region expandable
/**
 * Uses expand & collapse states.
 * @returns A `StateMixin<ExpandCollapseVars>` represents expand & collapse state definitions.
 */
export const usesExpandCollapseState = (): StateMixin<ExpandCollapseVars> => {
    // dependencies:
    
    // accessibilities:
    const [expandRule, expands] = baseUsesExpandCollapseState();
    
    
    
    return [
        () => style({
            ...imports([
                // accessibilities:
                expandRule,
            ]),
            ...states([
                ifExpanding({
                    ...vars({
                        [expands.anim] : collapses.animExpand,
                    }),
                }),
                ifCollapsing({
                    ...vars({
                        [expands.anim] : collapses.animCollapse,
                    }),
                }),
            ]),
        }),
        expands,
    ];
};
//#endregion expandable



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
    const [expandCollapseStateRule] = usesExpandCollapseState();
    
    
    
    return style({
        ...imports([
            // accessibilities:
            expandCollapseStateRule,
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
        overflowY     : 'hidden',
        maxBlockSize  : 0,
    });
    const frameIntermediate = style({
        overflowY     : 'hidden',
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
    keyframesExpand.value   = 'expand';   // the @keyframes name should contain 'expand'   in order to be recognized by `useExpandCollapseState`
    const [keyframesCollapseRule, keyframesCollapse] = keyframes({
        from  : frameExpanded,
        '1%'  : frameIntermediate,
        to    : frameCollapsed,
    });
    keyframesCollapse.value = 'collapse'; // the @keyframes name should contain 'collapse' in order to be recognized by `useExpandCollapseState`
    
    
    
    const frameCollapsedInline    = style({
        overflowX     : 'hidden',
        maxInlineSize : 0,
    });
    const frameIntermediateInline = style({
        overflowX     : 'hidden',
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
    keyframesExpandInline.value   = 'expandInline';   // the @keyframes name should contain 'expand'   in order to be recognized by `useExpandCollapseState`
    const [keyframesCollapseInlineRule, keyframesCollapseInline] = keyframes({
        from  : frameExpandedInline,
        '1%'  : frameIntermediateInline,
        to    : frameCollapsedInline,
    });
    keyframesCollapseInline.value = 'collapseInline'; // the @keyframes name should contain 'collapse' in order to be recognized by `useExpandCollapseState`
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
        Omit<PopupProps<TElement, TExpandedChangeEvent>, keyof BasicProps<TElement>>, // all props from <Popup> but not all props from the ancestors
        
        // layouts:
        OrientationVariant
{
}
const Collapse = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: CollapseProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet         = useCollapseStyleSheet();
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    const isOrientationBlock = ((props.orientation ?? defaultOrientationRuleOptions.defaultOrientation) === 'block');
    
    
    
    // rest props:
    const {
        // remove props:
        
        // layouts:
        orientation : _orientation,
    ...restPopupProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationVariant.class,
    );
    
    
    
    // jsx:
    return (
        <Popup<TElement, TExpandedChangeEvent>
            // other props:
            {...restPopupProps}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? ''}
            aria-orientation={props['aria-orientation'] ?? (isOrientationBlock ? 'vertical' : 'horizontal')}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
        />
    );
};
export {
    Collapse,
    Collapse as default,
}

export type { OrientationName, OrientationVariant }

export type { PopupPlacement, PopupMiddleware, PopupStrategy, PopupPosition, PopupSide }
