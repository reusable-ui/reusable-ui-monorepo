// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useReducer,
    useRef,
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
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // hooks:
    useIsomorphicLayoutEffect,
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
}                           from '@reusable-ui/basic'           // a base component
export {
    // types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    PopupPosition,
}                           from '@reusable-ui/popup'           // a base component
import {
    // styles:
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
    
    
    
    // react components:
    PopupProps,
    Popup,
}                           from '@reusable-ui/popup'           // a base component



// styles:
export const usesBadgeLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesPopupLayout(),
        ]),
        ...style({
            // positions:
            ...rule('.overlay', {
                zIndex: 1080,
            }),
            
            
            
            // customize:
            ...usesCssProps(badges), // apply config's cssProps
        }),
    });
};
export const usesBadgeVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(badges);
    
    
    
    return style({
        ...imports([
            // variants:
            usesPopupVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
    });
};
export const usesBadgeStates = () => {
    return style({
        ...imports([
            // states:
            usesPopupStates(),
        ]),
    });
};

export const useBadgeStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesBadgeLayout(),
        
        // variants:
        usesBadgeVariants(),
        
        // states:
        usesBadgeStates(),
    ]),
}), { id: 'a7wkthow0k' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [badges, badgeValues, cssBadgeConfig] = cssConfig(() => {
    //#region keyframes
    const framePassived     = style({
        opacity   : 0,
        transform : 'scale(0)',
    });
    const frameIntermediate = style({
        transform : 'scale(1.02)',
    });
    const frameActived      = style({
        opacity   : 1,
        transform : 'scale(1)',
    });
    const [keyframesActiveRule , keyframesActive ] = keyframes({
        from  : framePassived,
        '70%' : frameIntermediate,
        to    : frameActived,
    });
    keyframesActive.value  = 'active';  // the @keyframes name should contain 'active'  in order to be recognized by `useActivePassiveState`
    const [keyframesPassiveRule, keyframesPassive] = keyframes({
        from  : frameActived,
        '30%' : frameIntermediate,
        to    : framePassived,
    });
    keyframesPassive.value = 'passive'; // the @keyframes name should contain 'passive' in order to be recognized by `useActivePassiveState`
    //#endregion keyframes
    
    
    
    return {
        // animations:
        ...keyframesActiveRule,
        ...keyframesPassiveRule,
        animActive    : [
            ['300ms', 'ease-out', 'both', keyframesActive ],
        ]                           as CssKnownProps['anim'],
        animPassive   : [
            ['500ms', 'ease-out', 'both', keyframesPassive],
        ]                           as CssKnownProps['anim'],
    };
}, { prefix: 'bge' });



// react components:
export interface BadgeProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        PopupProps<TElement>
{
}
const Badge = <TElement extends Element = HTMLElement>(props: BadgeProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet = useBadgeStyleSheet();
    
    
    
    // rest props:
    const {
        // children:
        children,
    ...restPopupProps} = props;
    
    
    
    // jsx:
    return (
        <Popup<TElement>
            // other props:
            {...restPopupProps}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? 'status'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        />
    );
};
export {
    Badge,
    Badge as default,
}
