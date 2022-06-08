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
    markActive,
    
    
    
    // styles:
    usesControlLayout,
    usesControlVariants,
    usesControlStates,
    
    
    
    // react components:
    ControlProps,
    Control,
}                           from '@reusable-ui/control'         // a base component



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
// .pressing = styled press, :active = native press:
// the .disabled, .disable are used to kill native :active
// the .pressed, .releasing, .released are used to overwrite native :active
const selectorIfPressing  = ':is(.pressing, :active:not(:is(.disabled, .disable, .pressed, .releasing, .released)))'
// .releasing will be added after loosing press and will be removed after releasing-animation done:
const selectorIfReleasing = '.releasing'
// if all above are not set => released:
// optionally use .released to overwrite native :active
const selectorIfReleased  = ':is(:not(:is(.pressed, .pressing, :active:not(:is(.disabled, .disable)), .releasing)), .released)'

export const ifPressed        = (styles: CssStyleCollection): CssRule => rule(selectorIfPressed  , styles);
export const ifPressing       = (styles: CssStyleCollection): CssRule => rule(selectorIfPressing , styles);
export const ifReleasing      = (styles: CssStyleCollection): CssRule => rule(selectorIfReleasing, styles);
export const ifReleased       = (styles: CssStyleCollection): CssRule => rule(selectorIfReleased , styles);

export const ifPress          = (styles: CssStyleCollection): CssRule => rule([selectorIfPressing, selectorIfPressed                                         ], styles);
export const ifRelease        = (styles: CssStyleCollection): CssRule => rule([                                       selectorIfReleasing, selectorIfReleased], styles);
export const ifPressReleasing = (styles: CssStyleCollection): CssRule => rule([selectorIfPressing, selectorIfPressed, selectorIfReleasing                    ], styles);



/**
 * Uses press & release states.
 * @returns A `StateMixin<PressReleaseVars>` represents press & release state definitions.
 */
export const usesPressReleaseState = (): StateMixin<PressReleaseVars> => {
    return [
        () => style({
            ...states([
                ifPressed({
                    ...vars({
                        [presses.filter] : actionControls.filterPress,
                    }),
                }),
                ifPressing({
                    ...vars({
                        [presses.filter] : actionControls.filterPress,
                        [presses.anim  ] : actionControls.animPress,
                    }),
                }),
                ifReleasing({
                    ...vars({
                        [presses.filter] : actionControls.filterPress,
                        [presses.anim  ] : actionControls.animRelease,
                    }),
                }),
            ]),
        }),
        presses,
    ];
};



export const usePressReleaseState  = <TElement extends Element = Element>(props: ActionControlProps<TElement>) => {
    // fn props:
    const propEnabled         = usePropEnabled(props);
    const isControllablePress = (props.press !== undefined);
    
    
    
    // states:
    const [pressed,   setPressed  ] = useState<boolean>(props.press ?? false); // true => press, false => release
    const [animating, setAnimating] = useState<boolean|null>(null);            // null => no-animation, true => pressing-animation, false => releasing-animation
    
    const [pressDn,   setPressDn  ] = useState<boolean>(false);                // uncontrollable (dynamic) state: true => user press, false => user release
    
    
    
    // resets:
    if (!propEnabled && pressDn) {
        setPressDn(false); // lost press because the control is disabled, when the control is re-enabled => still lost press
    } // if
    
    
    
    /*
     * state is always release if disabled
     * state is press/release based on [controllable press] (if set) and fallback to [uncontrollable press]
     */
    const pressFn: boolean = propEnabled && (props.press /*controllable*/ ?? pressDn /*uncontrollable*/);
    
    if (pressed !== pressFn) { // change detected => apply the change & start animating
        setPressed(pressFn);   // remember the last change
        setAnimating(pressFn); // start pressing-animation/releasing-animation
    } // if
    
    
    
    // handlers:
    const handlePress   = useEvent(() => {
        // conditions:
        if (!propEnabled)        return; // control is disabled => no response required
        if (isControllablePress) return; // controllable [press] is set => no uncontrollable required
        
        
        
        setPressDn(true);
    }, [propEnabled, isControllablePress]);
    
    const handleRelease = useEvent(() => {
        // conditions:
        if (!propEnabled)        return; // control is disabled => no response required
        if (isControllablePress) return; // controllable [press] is set => no uncontrollable required
        
        
        
        setPressDn(false);
    }, [propEnabled, isControllablePress]);
    
    const handleAnimationEnd = useEvent((e: React.AnimationEvent<Element>): void => {
        // conditions:
        if (e.target !== e.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(press|release)|(?<=[a-z])(Press|Release))(?![a-z])/.test(e.animationName)) return; // ignores animation other than (press|release)[Foo] or boo(Press|Release)[Foo]
        
        
        
        // clean up finished animation
        
        setAnimating(null); // stop pressing-animation/releasing-animation
    }, []);
    
    
    
    return {
        press : pressed,
        
        class : ((): string|null => {
            // pressing:
            if (animating === true) {
                // pressing by controllable prop => use class .pressing
                if (isControllablePress) return 'pressing';
                
                // negative [tabIndex] => can't be pressed by user input => treats <ActionControl> as *wrapper* element => use class .pressing
                if ((props.tabIndex ?? 0) < 0) return 'pressing';
                
                // otherwise use pseudo :active
                return null;
            } // if
            
            // releasing:
            if (animating === false) return 'releasing';
            
            // fully pressed:
            if (pressed) return 'pressed';
            
            // fully released:
            if (isControllablePress) {
                return 'released'; // releasing by controllable prop => use class .released to kill pseudo :active
            }
            else {
                return null; // discard all classes above
            } // if
        })(),
        
        handlePress,
        handleRelease,
        handleAnimationEnd,
    };
};
//#endregion focusBlur



// styles:
export const usesActionControlLayout = () => {
    return style({
        ...imports([
            // resets:
            stripoutControl(), // clear browser's default styles
            
            // layouts:
            usesControlLayout(),
            
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
export const usesActionControlVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(controls, usesSuffixedProps(controls, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesControlVariants(),
            
            // layouts:
            sizesRule,
        ]),
    });
};
export const usesActionControlStates = () => {
    // dependencies:
    
    // states:
    const [focusBlurRule  ] = usesFocusBlurState();
    const [arriveLeaveRule] = usesArriveLeaveState();
    
    
    
    return style({
        ...imports([
            // states:
            usesControlStates(),
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

export const useActionControlStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesActionControlLayout(),
        
        // variants:
        usesActionControlVariants(),
        
        // states:
        usesActionControlStates(),
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
export interface ActionControlProps<TElement extends Element = Element>
    extends
        // bases:
        ControlProps<TElement>
{
    // accessibilities:
    press ?: boolean
}
const ActionControl = <TElement extends Element = Element>(props: ActionControlProps<TElement>): JSX.Element|null => {
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
        press : _press,
    ...restControlProps} = props;
    
    
    
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
        <Control<TElement>
            // other props:
            {...restControlProps}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            
            
            
            // ActionControl props:
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
    ActionControl,
    ActionControl as default,
}
