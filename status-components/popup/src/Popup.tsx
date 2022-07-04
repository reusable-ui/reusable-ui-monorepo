// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
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
    // utilities:
    cssVar,
    fallbacks,
}                           from '@cssfn/css-var'               // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    colors,
}                           from '@reusable-ui/colors'          // a color management system
import {
    // styles:
    stripoutPopup,
}                           from '@reusable-ui/stripouts'       // removes browser's default stylesheet
import {
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    usePropEnabled,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    ThemeName,
    usesThemeVariant,
    usesThemeDefault as basicUsesThemeDefault,
    usesAnim,
    fallbackNoneBoxShadow,
    fallbackNoneFilter,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    ifDisable,
    ifActive,
    markActive      as indicatorMarkActive,
    usesThemeActive as indicatorUsesThemeActive,
    
    
    
    // styles:
    usesIndicatorLayout,
    usesIndicatorVariants,
    usesIndicatorStates,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from '@reusable-ui/indicator'       // a base component



// styles:
export const usesPopupLayout = () => {
    return style({
        ...imports([
            // resets:
            stripoutPopup(), // clear browser's default styles
            
            // layouts:
            usesIndicatorLayout(),
            
            // colors:
            usesThemeDefault(),
        ]),
        ...style({
            // positions:
            position: 'relative', // supports for boxShadowFocus, prevents boxShadowFocus from clipping
            
            
            
            // customize:
            ...usesCssProps(popups), // apply config's cssProps
        }),
    });
};
export const usesPopupVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(popups);
    
    
    
    return style({
        ...imports([
            // variants:
            usesIndicatorVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
    });
};
export const usesPopupStates = () => {
    // dependencies:
    
    // states:
    const [focusBlurStateRule  ] = usesFocusBlurState();
    const [arriveLeaveStateRule] = usesArriveLeaveState();
    
    
    
    return style({
        ...imports([
            // states:
            usesIndicatorStates(),
            
            // accessibilities:
            focusBlurStateRule,
            arriveLeaveStateRule,
        ]),
        ...states([
            ifDisable({
                // accessibilities:
                cursor : popups.cursorDisable,
            }),
            
            ifActive({
                ...imports([
                    markActive(),
                ]),
            }),
            ifFocus({
                ...imports([
                    markActive(),
                ]),
            }),
            ifArrive({
                ...imports([
                    markActive(),
                ]),
            }),
            
            ifFocus({
                // positions:
                zIndex: 2, // prevents boxShadowFocus from clipping
            }),
            ifBlurring({
                // positions:
                zIndex: 1, // prevents boxShadowFocus from clipping but below the active one
            }),
        ]),
    });
};

export const usePopupStyleSheet = createUseStyleSheet(() => ({
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
    // dependencies:
    
    const [, , animRegistry] = usesAnim();
    const boxShadows = animRegistry.boxShadows;
    const filters    = animRegistry.filters;
    
    const [, {boxShadow : boxShadowFocusBlur}] = usesFocusBlurState();
    const [, {filter    : filterArriveLeave }] = usesArriveLeaveState();
    
    
    
    //#region keyframes
    const frameBlurred  = style({
        boxShadow: [
            ...boxShadows.filter((b) => (b !== boxShadowFocusBlur)),
            
         // boxShadowFocusBlur, // missing the last => let's the browser interpolated it
        ].map(fallbackNoneBoxShadow),
    });
    const frameFocused = style({
        boxShadow: [
            ...boxShadows.filter((b) => (b !== boxShadowFocusBlur)),
            
            boxShadowFocusBlur, // existing the last => let's the browser interpolated it
        ].map(fallbackNoneBoxShadow),
    });
    const [keyframesFocusRule, keyframesFocus] = keyframes({
        from : frameBlurred,
        to   : frameFocused,
    });
    keyframesFocus.value = 'focus'; // the @keyframes name should contain 'focus' in order to be recognized by `useFocusBlurState`
    const [keyframesBlurRule , keyframesBlur ] = keyframes({
        from : frameFocused,
        to   : frameBlurred,
    });
    keyframesBlur.value  = 'blur';  // the @keyframes name should contain 'blur'  in order to be recognized by `useFocusBlurState`
    
    
    
    const frameLeft = style({
        filter: [[
            ...filters.filter((f) => (f !== filterArriveLeave)),
            
         // filterArriveLeave, // missing the last => let's the browser interpolated it
        ]].map(fallbackNoneFilter),
    });
    const frameArrived  = style({
        filter: [[
            ...filters.filter((f) => (f !== filterArriveLeave)),
            
            filterArriveLeave, // existing the last => let's the browser interpolated it
        ]].map(fallbackNoneFilter),
    });
    const [keyframesArriveRule, keyframesArrive] = keyframes({
        from : frameLeft,
        to   : frameArrived,
    });
    keyframesArrive.value = 'arrive'; // the @keyframes name should contain 'arrive' in order to be recognized by `useArriveLeaveState`
    const [keyframesLeaveRule , keyframesLeave ] = keyframes({
        from : frameArrived,
        to   : frameLeft,
    });
    keyframesLeave.value  = 'leave';  // the @keyframes name should contain 'leave'  in order to be recognized by `useArriveLeaveState`
    //#endregion keyframes
    
    
    
    return {
        // accessibilities:
        cursorDisable  : 'not-allowed'  as CssKnownProps['cursor'],
        
        
        
        // animations:
        boxShadowFocus : [
            [0, 0, 0, '0.25rem'],
        ]                               as CssKnownProps['boxShadow'],
        filterArrive   : [[
            'brightness(85%)',
            'drop-shadow(0 0 0.01px rgba(0,0,0,0.4))',
        ]]                              as CssKnownProps['filter'],
        
        ...keyframesFocusRule,
        ...keyframesBlurRule,
        ...keyframesArriveRule,
        ...keyframesLeaveRule,
        animFocus      : [
            ['150ms', 'ease-out', 'both', keyframesFocus ],
        ]                               as CssKnownProps['anim'],
        animBlur       : [
            ['300ms', 'ease-out', 'both', keyframesBlur  ],
        ]                               as CssKnownProps['anim'],
        animArrive     : [
            ['150ms', 'ease-out', 'both', keyframesArrive],
        ]                               as CssKnownProps['anim'],
        animLeave      : [
            ['300ms', 'ease-out', 'both', keyframesLeave ],
        ]                               as CssKnownProps['anim'],
    };
}, { prefix: 'pop' });



// react components:
export interface PopupProps<TElement extends Element = Element>
    extends
        // bases:
        IndicatorProps<TElement>
{
    // accessibilities:
    focused  ?: boolean
    tabIndex ?: number
    
    arrived  ?: boolean
}
const Popup = <TElement extends Element = Element>(props: PopupProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet       = usePopupStyleSheet();
    
    
    
    // fn props:
    const propEnabled      = usePropEnabled(props);
    
    
    
    // rest props:
    const {
        // remove states props:
        
        // accessibilities:
        focused  : _focused,
        tabIndex : _tabIndex,
        
        arrived  : _arrived,
    ...restIndicatorProps} = props;
    
    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restIndicatorProps}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // Popup props:
            {...{
                // accessibilities:
                tabIndex : props.tabIndex ?? (propEnabled ? 0 : -1), // makes any element type focusable
            }}
        />
    );
};
export {
    Popup,
    Popup as default,
}
