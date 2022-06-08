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
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    colors,
}                           from '@reusable-ui/colors'          // a color management system
import {
    // styles:
    stripoutControl,
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



// hooks:

// states:

//#region focusBlur
export interface PressReleaseVars {
    filter : any
    anim   : any
}
const [presses] = cssVar<PressReleaseVars>();

{
    const [, , animRegistry] = usesAnim();
    animRegistry.registerFilter(presses.filter);
    animRegistry.registerAnim(presses.anim);
}



// .pressed will be added after pressing-animation done:
const selectorIfPressed   = '.pressed'
/* we don't use :active because we cannot decide which mouse_button or keyboard_key to activate :active */
// .pressing = styled press, :active = native press:
// the .disabled, .disable are used to kill native :active
// the .pressed, .releasing, .released are used to overwrite native :active
const selectorIfPressing  = ':is(.pressing, :active:not(:is(.disabled, .disable, .pressed, .releasing, .released)))'
// .releasing will be added after loosing press and will be removed after releasing-animation done:
const selectorIfReleasing = '.releasing'
// if all above are not set => released:
// optionally use .released to overwrite native :active
const selectorIfReleased  = ':is(:not(:is(.pressed, .pressing, :active:not(:is(.disabled, .disable)), .releasing)), .released)'

export const ifFocused       = (styles: CssStyleCollection): CssRule => rule(selectorIfFocused , styles);
export const ifFocusing      = (styles: CssStyleCollection): CssRule => rule(selectorIfFocusing, styles);
export const ifBlurring      = (styles: CssStyleCollection): CssRule => rule(selectorIfBlurring, styles);
export const ifBlurred       = (styles: CssStyleCollection): CssRule => rule(selectorIfBlurred , styles);

export const ifFocus         = (styles: CssStyleCollection): CssRule => rule([selectorIfFocusing, selectorIfFocused                    ], styles);
export const ifBlur          = (styles: CssStyleCollection): CssRule => rule([                    selectorIfBlurring, selectorIfBlurred], styles);
export const ifFocusBlurring = (styles: CssStyleCollection): CssRule => rule([selectorIfFocusing, selectorIfBlurring, selectorIfBlurred], styles);



/**
 * Uses focus & blur states.
 * @returns A `StateMixin<PressReleaseVars>` represents focus & blur state definitions.
 */
export const usesFocusBlurState = (): StateMixin<PressReleaseVars> => {
    // dependencies:
    const [, themes] = usesThemeVariant();
    
    
    
    return [
        () => style({
            ...vars({
                [focuses.boxShadowColorFn] : fallbacks(
                    themes.focusImpt,     // first  priority
                    themes.focus,         // second priority
                    themes.focusCond,     // third  priority
                    
                    colors.secondaryThin, // default => uses secondary theme, because its color is neutral
                ),
                [focuses.boxShadowColor  ] : fallbacks(
                    // no toggle outlined nor toggle mild yet (might be added in the future)
                    
                    focuses.boxShadowColorFn, // default => uses our `boxShadowColorFn`
                ),
                [focuses.boxShadowLy     ] : [[
                    // combining: pos width spread color ...
                    
                    // boxShadowFocus pos, width, spread, etc:
                    controls.boxShadowFocus,
                    
                    // boxShadowFocus color:
                    focuses.boxShadowColor,
                ]],
            }),
            ...states([
                ifFocused({
                    ...vars({
                        [focuses.boxShadow] : focuses.boxShadowLy,
                    }),
                }),
                ifFocusing({
                    ...vars({
                        [focuses.boxShadow] : focuses.boxShadowLy,
                        [focuses.anim     ] : controls.animFocus,
                    }),
                }),
                ifBlurring({
                    ...vars({
                        [focuses.boxShadow] : focuses.boxShadowLy,
                        [focuses.anim     ] : controls.animBlur,
                    }),
                }),
            ]),
        }),
        focuses,
    ];
};



export const useFocusBlurState  = <TElement extends Element = Element>(props: ControlProps<TElement>) => {
    // fn props:
    const propEnabled         = usePropEnabled(props);
    const isControllableFocus = (props.focus !== undefined);
    
    
    
    // states:
    const [focused,   setFocused  ] = useState<boolean>(props.focus ?? false); // true => focus, false => blur
    const [animating, setAnimating] = useState<boolean|null>(null);            // null => no-animation, true => focusing-animation, false => blurring-animation
    
    const [focusDn,   setFocusDn  ] = useState<boolean>(false);                // uncontrollable (dynamic) state: true => user focus, false => user blur
    
    
    
    // resets:
    if (!propEnabled && focusDn) {
        setFocusDn(false); // lost focus because the control is disabled, when the control is re-enabled => still lost focus
    } // if
    
    
    
    /*
     * state is always blur if disabled
     * state is focus/blur based on [controllable focus] (if set) and fallback to [uncontrollable focus]
     */
    const focusFn: boolean = propEnabled && (props.focus /*controllable*/ ?? focusDn /*uncontrollable*/);
    
    if (focused !== focusFn) { // change detected => apply the change & start animating
        setFocused(focusFn);   // remember the last change
        setAnimating(focusFn); // start focusing-animation/blurring-animation
    } // if
    
    
    
    // handlers:
    const handleFocus = useEvent(() => {
        // conditions:
        if (!propEnabled)        return; // control is disabled => no response required
        if (isControllableFocus) return; // controllable [focus] is set => no uncontrollable required
        
        
        
        setFocusDn(true);
    }, [propEnabled, isControllableFocus]);
    
    const handleBlur  = useEvent(() => {
        // conditions:
        if (!propEnabled)        return; // control is disabled => no response required
        if (isControllableFocus) return; // controllable [focus] is set => no uncontrollable required
        
        
        
        setFocusDn(false);
    }, [propEnabled, isControllableFocus]);
    
    const handleAnimationEnd = useEvent((e: React.AnimationEvent<Element>): void => {
        // conditions:
        if (e.target !== e.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(focus|blur)|(?<=[a-z])(Focus|Blur))(?![a-z])/.test(e.animationName)) return; // ignores animation other than (focus|blur)[Foo] or boo(Focus|Blur)[Foo]
        
        
        
        // clean up finished animation
        
        setAnimating(null); // stop focusing-animation/blurring-animation
    }, []);
    
    
    
    return {
        focus : focused,
        
        class : ((): string|null => {
            // pressing:
            if (animating === true) {
                // pressing by controllable prop => use class .pressing
                if (isControllableFocus) return 'pressing';
                
                // negative [tabIndex] => can't be focused by user input => treats <Control> as *wrapper* element => use class .pressing
                if ((props.tabIndex ?? 0) < 0) return 'pressing';
                
                // otherwise use pseudo :active
                return null;
            } // if
            
            // releasing:
            if (animating === false) return 'releasing';
            
            // fully focused:
            if (focused) return 'focused';
            
            // fully released:
            if (isControllableFocus) {
                return 'released'; // releasing by controllable prop => use class .released to kill pseudo :active
            }
            else {
                return null; // discard all classes above
            } // if
        })(),
        
        handleFocus,
        handleBlur,
        handleAnimationEnd,
    };
};
//#endregion focusBlur



// styles:
export const usesControlLayout = () => {
    return style({
        ...imports([
            // resets:
            stripoutControl(), // clear browser's default styles
            
            // layouts:
            usesIndicatorLayout(),
            
            // colors:
            usesThemeDefault(),
        ]),
        ...style({
            // positions:
            position: 'relative', // supports for boxShadowFocus, prevents boxShadowFocus from clipping
            
            
            
            // customize:
            ...usesCssProps(controls), // apply config's cssProps
        }),
    });
};
export const usesControlVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(controls, usesSuffixedProps(controls, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesIndicatorVariants(),
            
            // layouts:
            sizesRule,
        ]),
    });
};
export const usesControlStates = () => {
    // dependencies:
    
    // states:
    const [focusBlurRule  ] = usesFocusBlurState();
    const [arriveLeaveRule] = usesArriveLeaveState();
    
    
    
    return style({
        ...imports([
            // states:
            usesIndicatorStates(),
            focusBlurRule,
            arriveLeaveRule,
        ]),
        ...states([
            ifDisable({
                // accessibilities:
                cursor : controls.cursorDisable,
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

export const useControlStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesControlLayout(),
        
        // variants:
        usesControlVariants(),
        
        // states:
        usesControlStates(),
    ]),
}), { id: 'k8egfpu96l' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [controls, cssControlConfig] = cssConfig(() => {
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
}, { prefix: 'ctrl' });



// react components:
export interface ControlProps<TElement extends Element = Element>
    extends
        // bases:
        IndicatorProps<TElement>
{
    // accessibilities:
    focus    ?: boolean
    tabIndex ?: number
    
    arrive   ?: boolean
}
const Control = <TElement extends Element = Element>(props: ControlProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet       = useControlStyleSheet();
    
    
    
    // states:
    const focusBlurState   = useFocusBlurState(props);
    const arriveLeaveState = useArriveLeaveState(props, focusBlurState);
    
    
    
    // fn props:
    const propEnabled      = usePropEnabled(props);
    
    
    
    // rest props:
    const {
        // remove states props:
        
        // accessibilities:
        focus    : _focus,
        tabIndex : _tabIndex,
        
        arrive   : _arrive,
    ...restIndicatorProps} = props;
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // accessibilities:
        focusBlurState.class,
        arriveLeaveState.class,
    );
    
    
    
    // events:
    const handleFocus        = useMergeEvents(
        // preserves the original `onFocus`:
        props.onFocus,
        
        
        
        // states:
        
        // accessibilities:
        focusBlurState.handleFocus,
    );
    const handleBlur         = useMergeEvents(
        // preserves the original `onBlur`:
        props.onBlur,
        
        
        
        // states:
        
        // accessibilities:
        focusBlurState.handleBlur,
    );
    const handleMouseEnter   = useMergeEvents(
        // preserves the original `onMouseEnter`:
        props.onMouseEnter,
        
        
        
        // states:
        
        // accessibilities:
        arriveLeaveState.handleMouseEnter,
    );
    const handleMouseLeave   = useMergeEvents(
        // preserves the original `onMouseLeave`:
        props.onMouseLeave,
        
        
        
        // states:
        
        // accessibilities:
        arriveLeaveState.handleMouseLeave,
    );
    const handleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        
        // accessibilities:
        focusBlurState.handleAnimationEnd,
        arriveLeaveState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restIndicatorProps}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            
            
            
            // Control props:
            {...{
                // accessibilities:
                tabIndex : props.tabIndex ?? (propEnabled ? 0 : -1), // makes any element type focusable
            }}
            
            
            
            // events:
            onFocus        = {handleFocus       }
            onBlur         = {handleBlur        }
            onMouseEnter   = {handleMouseEnter  }
            onMouseLeave   = {handleMouseLeave  }
            onAnimationEnd = {handleAnimationEnd}
        />
    );
};
export {
    Control,
    Control as default,
}
