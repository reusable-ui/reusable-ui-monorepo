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
export type {
    // types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    PopupPosition,
    PopupSide,
}                           from '@reusable-ui/collapse'        // a base component
import {
    // styles:
    usesCollapseLayout,
    usesCollapseVariants,
    usesCollapseStates,
    
    
    
    // react components:
    CollapseProps,
    Collapse,
}                           from '@reusable-ui/collapse'        // a base component



// styles:
export const usesDropdownLayout = (options?: OrientationVariantOptions) => {
    return style({
        ...imports([
            // layouts:
            usesCollapseLayout(options),
        ]),
        ...style({
            // customize:
            ...usesCssProps(dropdowns), // apply config's cssProps
        }),
    });
};
export const usesDropdownVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(dropdowns);
    
    
    
    return style({
        ...imports([
            // variants:
            usesCollapseVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
    });
};
export const usesDropdownStates = () => {
    return style({
        ...imports([
            // states:
            usesCollapseStates(),
        ]),
    });
};

export const useDropdownStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesDropdownLayout(),
        
        // variants:
        usesDropdownVariants(),
        
        // states:
        usesDropdownStates(),
    ]),
}), { id: 'q723ad22au' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [dropdowns, dropdownValues, cssDropdownConfig] = cssConfig(() => {
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
    keyframesActive.value  = 'activeInline';  // the @keyframes name should contain 'active'  in order to be recognized by `useActivePassiveState`
    const [keyframesPassiveInlineRule, keyframesPassiveInline] = keyframes({
        from  : frameActivedInline,
        '1%'  : frameIntermediateInline,
        to    : framePassivedInline,
    });
    keyframesPassive.value = 'passiveInline'; // the @keyframes name should contain 'passive' in order to be recognized by `useActivePassiveState`
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
}, { prefix: 'ddwn' });



// react components:
export interface DropdownProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        CollapseProps<TElement>,
        
        // layouts:
        OrientationVariant
{
}
const Dropdown = <TElement extends Element = HTMLElement>(props: DropdownProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet = useDropdownStyleSheet();
    
    
    
    // jsx:
    return (
        <Collapse<TElement>
            // other props:
            {...props}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        />
    );
};
export {
    Dropdown,
    Dropdown as default,
}

export type { OrientationName, OrientationVariant }
