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
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    OrientationName,
    OrientationVariantOptions,
    defaultBlockOrientationVariantOptions,
    normalizeOrientationVariantOptions,
    usesOrientationVariant,
    OrientationVariant,
    useOrientationVariant,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    ActivePassiveVars,
    ifActivating,
    ifPassivating,
    usesActivePassiveState as indicatorUsesActivePassiveState,
}                           from '@reusable-ui/indicator'       // a base component
import {
    // types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    PopupPosition,
    PopupSide,
    
    
    
    // styles:
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
    
    
    
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

//#region activePassive
/**
 * Uses active & passive states.
 * @returns A `StateMixin<ActivePassiveVars>` represents active & passive state definitions.
 */
export const usesActivePassiveState = (): StateMixin<ActivePassiveVars> => {
    // dependencies:
    
    // accessibilities:
    const [activeRule, actives] = indicatorUsesActivePassiveState();
    
    
    
    return [
        () => style({
            ...imports([
                // accessibilities:
                activeRule,
            ]),
            ...states([
                ifActivating({
                    ...vars({
                        [actives.anim] : collapses.animActive,
                    }),
                }),
                ifPassivating({
                    ...vars({
                        [actives.anim] : collapses.animPassive,
                    }),
                }),
            ]),
        }),
        actives,
    ];
};
//#endregion activePassive



// styles:
export const usesCollapseLayout = (options?: OrientationVariantOptions) => {
    // options:
    options = normalizeOrientationVariantOptions(options, defaultOrientationRuleOptions);
    const [orientationInlineSelector, orientationBlockSelector] = usesOrientationVariant(options);
    
    
    
    return style({
        ...imports([
            // layouts:
            usesPopupLayout(),
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
        }),
    });
};
export const usesCollapseVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(collapses);
    
    
    
    return style({
        ...imports([
            // variants:
            usesPopupVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
    });
};
export const usesCollapseStates = () => {
    // dependencies:
    
    // states:
    const [activePassiveStateRule] = usesActivePassiveState();
    
    
    
    return style({
        ...imports([
            // states:
            usesPopupStates(),
            
            // accessibilities:
            activePassiveStateRule,
        ]),
    });
};

export const useCollapseStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesCollapseLayout(),
        
        // variants:
        usesCollapseVariants(),
        
        // states:
        usesCollapseStates(),
    ]),
}), { id: 'gh2oi6zjs0' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [collapses, collapseValues, cssCollapseConfig] = cssConfig(() => {
    //#region keyframes
    const framePassived     = style({
        overflowY     : 'hidden',
        maxBlockSize  : 0,
    });
    const frameIntermediate = style({
        overflowY     : 'hidden',
        maxBlockSize  : '100vh',
    });
    const frameActived      = style({
        overflowY     : 'unset',
        maxBlockSize  : 'unset',
    });
    const [keyframesActiveRule , keyframesActive ] = keyframes({
        from  : framePassived,
        '99%' : frameIntermediate,
        to    : frameActived,
    });
    keyframesActive.value  = 'active';  // the @keyframes name should contain 'active'  in order to be recognized by `useActivePassiveState`
    const [keyframesPassiveRule, keyframesPassive] = keyframes({
        from  : frameActived,
        '1%'  : frameIntermediate,
        to    : framePassived,
    });
    keyframesPassive.value = 'passive'; // the @keyframes name should contain 'passive' in order to be recognized by `useActivePassiveState`
    
    
    
    const framePassivedInline     = style({
        overflowX     : 'hidden',
        maxInlineSize : 0,
    });
    const frameIntermediateInline = style({
        overflowX     : 'hidden',
        maxInlineSize : '100vh',
    });
    const frameActivedInline      = style({
        overflowX     : 'unset',
        maxInlineSize : 'unset',
    });
    const [keyframesActiveInlineRule , keyframesActiveInline ] = keyframes({
        from  : framePassivedInline,
        '99%' : frameIntermediateInline,
        to    : frameActivedInline,
    });
    keyframesActiveInline.value  = 'activeInline';  // the @keyframes name should contain 'active'  in order to be recognized by `useActivePassiveState`
    const [keyframesPassiveInlineRule, keyframesPassiveInline] = keyframes({
        from  : frameActivedInline,
        '1%'  : frameIntermediateInline,
        to    : framePassivedInline,
    });
    keyframesPassiveInline.value = 'passiveInline'; // the @keyframes name should contain 'passive' in order to be recognized by `useActivePassiveState`
    //#endregion keyframes
    
    
    
    return {
        // animations:
        ...keyframesActiveRule,
        ...keyframesPassiveRule,
        animActive        : [
            ['300ms', 'ease-out', 'both', keyframesActive ],
        ]                           as CssKnownProps['anim'],
        animPassive       : [
            ['500ms', 'ease-out', 'both', keyframesPassive],
        ]                           as CssKnownProps['anim'],
        
        
        
        ...keyframesActiveInlineRule,
        ...keyframesPassiveInlineRule,
        animActiveInline  : [
            ['300ms', 'ease-out', 'both', keyframesActiveInline ],
        ]                           as CssKnownProps['anim'],
        animPassiveInline : [
            ['500ms', 'ease-out', 'both', keyframesPassiveInline],
        ]                           as CssKnownProps['anim'],
    };
}, { prefix: 'clps' });



// react components:
export interface CollapseProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        PopupProps<TElement>,
        
        // layouts:
        OrientationVariant
{
}
const Collapse = <TElement extends Element = HTMLElement>(props: CollapseProps<TElement>): JSX.Element|null => {
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
        <Popup<TElement>
            // other props:
            {...restPopupProps}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? 'dialog'}
            aria-orientation={props['aria-orientation'] ?? (isOrientationBlock ? 'vertical' : 'horizontal')}
            
            
            
            // variants:
            nude={props.nude ?? true}
            
            
            
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
