// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    useEffect,
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
    usePropReadOnly,
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



// defaults:
const defaultActionMouses : number[]|null = [0];       // left click
const defaultActionKeys   : string[]|null = ['space']; // space key



// hooks:

// states:

//#region pressRelease
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
// const selectorIfPressing  = ':is(.pressing, :active:not(:is(.disabled, .disable, .pressed, .releasing, .released)))'
const selectorIfPressing  = '.pressing'
// .releasing will be added after loosing press and will be removed after releasing-animation done:
const selectorIfReleasing = '.releasing'
// if all above are not set => released:
// optionally use .released to overwrite native :active
// const selectorIfReleased  = ':is(:not(:is(.pressed, .pressing, :active:not(:is(.disabled, .disable)), .releasing)), .released)'
const selectorIfReleased  = ':not(:is(.pressed, .pressing, .releasing))'

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
    const propReadOnly        = usePropReadOnly(props);
    const propEditable        = propEnabled && !propReadOnly;
    const isControllablePress = (props.press !== undefined);
    
    const actionMouses        = (props.actionMouses !== undefined) ? props.actionMouses : defaultActionMouses;
    const actionKeys          = (props.actionKeys   !== undefined) ? props.actionKeys   : defaultActionKeys;
    
    
    
    // states:
    const [pressed,   setPressed  ] = useState<boolean>(props.press ?? false); // true => press, false => release
    const [animating, setAnimating] = useState<boolean|null>(null);            // null => no-animation, true => pressing-animation, false => releasing-animation
    
    const [pressDn,   setPressDn  ] = useState<boolean>(false);                // uncontrollable (dynamic) state: true => user press, false => user release
    
    
    
    // resets:
    if (!propEditable && pressDn) {
        setPressDn(false); // lost press because the control is not editable, when the control is re-editable => still lost press
    } // if
    
    
    
    /*
     * state is always released if (disabled || readOnly)
     * state is press/release based on [controllable press] (if set) and fallback to [uncontrollable press]
     */
    const pressFn: boolean = propEditable && (props.press /*controllable*/ ?? pressDn /*uncontrollable*/);
    
    if (pressed !== pressFn) { // change detected => apply the change & start animating
        setPressed(pressFn);   // remember the last change
        setAnimating(pressFn); // start pressing-animation/releasing-animation
    } // if
    
    
    
    /**
     * `null`  : never loaded  
     * `true`  : loaded (live)  
     * `false` : unloaded (dead)  
     */
    const loaded = useRef<boolean|null>(null);
    useEffect(() => {
        // setups:
        // mark the control as live:
        loaded.current = true;
        
        
        
        // cleanups:
        return () => {
            // mark the control as dead:
            loaded.current = false;
        };
    }, []); // runs once on startup
    
    useEffect(() => {
        // conditions:
        if (!propEditable)       return; // control is not editable => no response required
        if (isControllablePress) return; // controllable [press] is set => no uncontrollable required
        
        
        
        // handlers:
        const handleRelease = (): void => {
            if (!loaded.current) return; // `setTimeout` fires after the control was dead => ignore
            
            setPressDn(false);
        };
        const handleReleaseLate = (): void => {
            setTimeout(handleRelease, 0); // setTimeout => make sure the `mouseup` event fires *after* the `click` event, so the user has a chance to change the `press` prop
            /* do not use `Promise.resolve().then(handleRelease)` because it's not fired *after* the `click` event */
        };
        
        
        
        // setups:
        window.addEventListener('mouseup', handleReleaseLate);
        window.addEventListener('keyup',   handleRelease);
        
        
        
        // cleanups:
        return () => {
            window.removeEventListener('mouseup', handleReleaseLate);
            window.removeEventListener('keyup',   handleRelease);
        };
    }, [propEditable, isControllablePress]);
    
    
    
    // handlers:
    const handlePress     = useEvent((): void => {
        // conditions:
        if (!propEditable)       return; // control is not editable => no response required
        if (isControllablePress) return; // controllable [press] is set => no uncontrollable required
        
        
        
        setPressDn(true);
    }, [propEditable, isControllablePress]);
    
    const handleMouseDown = useEvent((e: React.MouseEvent<Element>): void => {
        if (!actionMouses || actionMouses.includes(e.button)) handlePress();
    }, [actionMouses, handlePress]);
    
    const handleKeyDown   = useEvent((e: React.KeyboardEvent<Element>): void => {
        if (!actionKeys || actionKeys.includes(e.code.toLowerCase()) || actionKeys.includes(e.key.toLowerCase())) handlePress();
    }, [actionKeys, handlePress]);
    
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
                // // pressing by controllable prop => use class .pressing
                // if (isControllablePress) return 'pressing';
                //
                // // otherwise use pseudo :active
                // return null;
                // support for pressing by [space key] that not triggering :active
                return 'pressing';
            } // if
            
            // releasing:
            if (animating === false) return 'releasing';
            
            // fully pressed:
            if (pressed) return 'pressed';
            
            // fully released:
            // if (isControllablePress) {
            //     return 'released'; // releasing by controllable prop => use class .released to kill pseudo :active
            // }
            // else {
            //     return null; // discard all classes above
            // } // if
            return null; // discard all classes above
        })(),
        
        handleMouseDown,
        handleKeyDown,
        handleAnimationEnd,
    };
};
//#endregion pressRelease



// styles:
export const usesActionControlLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesControlLayout(),
        ]),
        ...style({
            // accessibilities:
            userSelect : 'none', // disable selecting text (double clicking not causing selecting text)
            
            
            
            // customize:
            ...usesCssProps(actionControls), // apply config's cssProps
        }),
    });
};
export const usesActionControlVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(actionControls);
    
    
    
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
    const [pressReleaseRule] = usesPressReleaseState();
    
    
    
    return style({
        ...imports([
            // states:
            usesControlStates(),
            pressReleaseRule,
        ]),
        ...states([
            ifPress({
                ...imports([
                    markActive(),
                ]),
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
}), { id: '5u3j6wjzxd' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [actionControls, cssActionControlConfig] = cssConfig(() => {
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
}, { prefix: 'act' });



// react components:
export interface ActionControlProps<TElement extends Element = Element>
    extends
        // bases:
        ControlProps<TElement>
{
    // accessibilities:
    press        ?: boolean
    
    
    
    // behaviors:
    actionMouses ?: number[]|null
    actionKeys   ?: string[]|null
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
