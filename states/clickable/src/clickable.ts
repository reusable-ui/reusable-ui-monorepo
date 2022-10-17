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
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssKnownProps,
    CssRule,
    CssStyleCollection,
    
    
    
    // writes css in javascript:
    rule,
    states,
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui utilities:
import {
    // hooks:
    useEvent,
    EventHandler,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
    
    
    
    // react components:
    AccessibilityProps,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import {
    // hooks:
    useAnimatingState,
}                           from '@reusable-ui/animating-state' // a hook for creating animating state

// reusable-ui features:
import {
    // hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'       // animation stuff of UI



// defaults:
const _defaultActionMouses     : number[]|null = [0]       // left click
const _defaultActionTouches    : number|null   = 1         // single touch
const _defaultActionKeys       : string[]|null = ['space'] // space key
const _defaultClickableOptions : Required<ClickableOptions> = {
    handleActionCtrlEvents : false, // not to handle [space] as onClick
    handleKeyEnterEvents   : false, // not to handle [enter] as onClick
};



// hooks:

// states:

//#region clickable
export interface ClickableVars {
    /* supports for `usesPressAsActiveState()` */
    
    filterPress : any
    
    animPress   : any
    animRelease : any
    
    
    
    filter      : any
    
    anim        : any
}
const [clickableVars] = cssVars<ClickableVars>();

{
    const {animationRegistry: {registerFilter, registerAnim}} = usesAnimation();
    registerFilter(clickableVars.filter);
    registerAnim(clickableVars.anim);
}



// .pressed will be added after pressing-animation done:
const selectorIfPressed   = '.pressed'
// .pressing = styled press, :active = native press:
// the .disabled, .disable are used to kill native :active
// // // the .pressed, .releasing, .released are used to overwrite native :active
// // // const selectorIfPressing  = ':is(.pressing, :active:not(:is(.disabled, .disable, .pressed, .releasing, .released)))'
const selectorIfPressing  = '.pressing'
// .releasing will be added after loosing press and will be removed after releasing-animation done:
const selectorIfReleasing = '.releasing'
// if all above are not set => released:
// // // optionally use .released to overwrite native :active
// // // const selectorIfReleased  = ':is(:not(:is(.pressed, .pressing, :active:not(:is(.disabled, .disable)), .releasing)), .released)'
const selectorIfReleased  = ':not(:is(.pressed, .pressing, .releasing))'

// the .clicked will be added in a short time (about 1 idle frame long) after releasing-animation done:
const selectorIfClicked   = '.clicked'

export const ifPressed        = (styles: CssStyleCollection): CssRule => rule(selectorIfPressed  , styles);
export const ifPressing       = (styles: CssStyleCollection): CssRule => rule(selectorIfPressing , styles);
export const ifReleasing      = (styles: CssStyleCollection): CssRule => rule(selectorIfReleasing, styles);
export const ifReleased       = (styles: CssStyleCollection): CssRule => rule(selectorIfReleased , styles);

export const ifPress          = (styles: CssStyleCollection): CssRule => rule([selectorIfPressing, selectorIfPressed                                         ], styles);
export const ifRelease        = (styles: CssStyleCollection): CssRule => rule([                                       selectorIfReleasing, selectorIfReleased], styles);
export const ifPressReleasing = (styles: CssStyleCollection): CssRule => rule([selectorIfPressing, selectorIfPressed, selectorIfReleasing                    ], styles);

export const ifClicked        = (styles: CssStyleCollection): CssRule => rule(        selectorIfClicked   , styles);
export const ifNotClicked     = (styles: CssStyleCollection): CssRule => rule(`:not(${selectorIfClicked})`, styles);



export interface ClickableStuff { clickableRule: Factory<CssRule>, clickableVars: CssVars<ClickableVars> }
export interface ClickableConfig {
    filterPress ?: CssKnownProps['filter'   ]
    
    animPress   ?: CssKnownProps['animation']
    animRelease ?: CssKnownProps['animation']
}
/**
 * Adds a capability of UI to be clicked.
 * @param config  A configuration of `clickableRule`.
 * @returns A `ClickableStuff` represents a clickable state.
 */
export const usesClickable = (config?: ClickableConfig): ClickableStuff => {
    return {
        clickableRule: () => style({
            // configs:
            ...vars({
                /* supports for `usesPressAsActiveState()` */
                
                [clickableVars.filterPress] : config?.filterPress,
                
                [clickableVars.animPress  ] : config?.animPress,
                [clickableVars.animRelease] : config?.animRelease,
            }),
            
            
            
            // animation states:
            ...states([
                ifPressed({
                    ...vars({
                        [clickableVars.filter] : clickableVars.filterPress,
                    }),
                }),
                ifPressing({
                    ...vars({
                        [clickableVars.filter] : clickableVars.filterPress,
                        [clickableVars.anim  ] : clickableVars.animPress,
                    }),
                }),
                ifReleasing({
                    ...vars({
                        [clickableVars.filter] : clickableVars.filterPress,
                        [clickableVars.anim  ] : clickableVars.animRelease,
                    }),
                }),
            ]),
        }),
        clickableVars,
    };
};



export interface ClickableProps<TElement extends Element = HTMLElement>
    extends
        // states:
        Partial<Pick<AccessibilityProps, 'enabled'|'inheritEnabled'|'readOnly'|'inheritReadOnly'>>,
        
        // handlers:
        Pick<React.DOMAttributes<TElement>, 'onClick'>
{
    // states:
    pressed       ?: boolean
    
    
    
    // behaviors:
    actionMouses  ?: number[]|null
    actionTouches ?: number|null
    actionKeys    ?: string[]|null
}
export interface ClickableOptions {
    handleActionCtrlEvents ?: boolean
    handleKeyEnterEvents   ?: boolean
}
export const useClickable = <TElement extends Element = HTMLElement>(props: ClickableProps<TElement>, options : ClickableOptions = _defaultClickableOptions) => {
    // options:
    const {
        handleActionCtrlEvents = _defaultClickableOptions.handleActionCtrlEvents,
        handleKeyEnterEvents   = _defaultClickableOptions.handleKeyEnterEvents,
    } = options;
    
    
    
    // fn props:
    const propEnabled           = usePropEnabled(props);
    const propReadOnly          = usePropReadOnly(props);       // supports for <Check>
    const propEditable          = propEnabled && !propReadOnly; // supports for <Check>
    const isControllablePressed = (props.pressed !== undefined);
    
    const actionMouses          = (props.actionMouses  !== undefined) ? props.actionMouses  : _defaultActionMouses;
    const actionTouches         = (props.actionTouches !== undefined) ? props.actionTouches : _defaultActionTouches;
    const actionKeys            = (props.actionKeys    !== undefined) ? props.actionKeys    : _defaultActionKeys;
    
    
    
    // fn states:
    const pressDn = useRef<boolean>(false); // uncontrollable (dynamic) state: true => user pressed, false => user released
    /*
     * state is always released if (disabled || readOnly)
     * state is pressed/released based on [controllable pressed] (if set) and fallback to [uncontrollable pressed]
     */
    const pressedFn : boolean = propEditable && (props.pressed /*controllable*/ ?? pressDn.current /*uncontrollable*/);
    
    
    
    // states:
    const [pressed, setPressed, animation, {handleAnimationStart, handleAnimationEnd: handleAnimationEndExternal, handleAnimationCancel}] = useAnimatingState<boolean, TElement>({
        initialState  : pressedFn,
        animationName : /((?<![a-z])(press|release)|(?<=[a-z])(Press|Release))(?![a-z])/,
    });
    const [markClicked, setMarkClicked] = useState<boolean>(false); // true => mark the `.clicked` state briefly after the `.releasing` animation done, false => no click was performed
    
    
    
    // update state:
    if (pressed !== pressedFn) { // change detected => apply the change & start animating
        setPressed(pressedFn);   // remember the last change
    } // if
    
    
    
    // resets:
    if (pressDn.current && (!propEditable || isControllablePressed)) {
        pressDn.current = false; // lost press because the control is not editable (disabled and/or readOnly) or becomes *controllable*
    } // if
    
    
    
    // dom effects:
    
    //#region aborts async handles when the control is unmounted
    const asyncHandleRelease = useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
    const asyncUnmarkClicked = useRef<ReturnType<typeof requestIdleCallback>|undefined>(undefined);
    useEffect(() => {
        // cleanups:
        return () => {
            // cancel out previously `handleReleaseAfterClick` (if any):
            if (asyncHandleRelease.current) clearTimeout(asyncHandleRelease.current);
            
            // cancel out previously asyncUnmarkClicked (if any):
            if (asyncUnmarkClicked.current) cancelIdleCallback(asyncUnmarkClicked.current);
        };
    }, []); // runs once on startup
    //#endregion aborts async handles when the control is unmounted
    
    //#region releases the *uncontrollable* pressed
    useEffect(() => {
        // conditions:
        if (!propEditable)         return; // control is not editable (disabled and/or readOnly) => no *uncontrollable* release_event required
        if (isControllablePressed) return; // control is *controllable*                          => no *uncontrollable* release_event required
        
        
        
        // handlers:
        const handleRelease = (): void => {
            pressDn.current = false;
        };
        const handleReleaseAfterClick = (): void => {
            // cancel out previously `handleReleaseAfterClick` (if any):
            if (asyncHandleRelease.current) clearTimeout(asyncHandleRelease.current);
            
            
            
            // setTimeout => make sure the `mouseup` event fires *after* the `click` event, so the user has a chance to change the `pressed` prop:
            // asyncHandleRelease.current = setTimeout(handleRelease, 0); // 0 = runs immediately after all micro tasks finished
            asyncHandleRelease.current = setTimeout(handleRelease, 1); // 1 = runs immediately after all micro tasks & nextJS macro task finished
            /* do not use `Promise.resolve().then(handleRelease)` because it's not fired *after* the `click` event */
        };
        const handleReleaseMouse = handleReleaseAfterClick;
        const handleReleaseTouch = (event: TouchEvent): void => {
            handleReleaseAfterClick();
            
            
            
            // resets:
            isTouchActive.current = (
                !actionTouches // null or zero
                ?
                !!event.touches.length // any number of touch(es)
                :
                (event.touches.length >= actionTouches) // the minimum number of touch(es) was satisfied (the default is single touch)
            );
        };
        
        
        
        // setups:
        window.addEventListener('mouseup', handleReleaseMouse);
        window.addEventListener('keyup',   handleRelease);
        
        window.addEventListener('touchend'   , handleReleaseTouch);
        window.addEventListener('touchcancel', handleReleaseTouch);
        
        
        
        // cleanups:
        return () => {
            window.removeEventListener('mouseup', handleReleaseMouse);
            window.removeEventListener('keyup',   handleRelease);
            
            window.removeEventListener('touchend'   , handleReleaseTouch);
            window.removeEventListener('touchcancel', handleReleaseTouch);
        };
    }, [propEditable, isControllablePressed]);
    //#endregion releases the *uncontrollable* pressed
    
    //#region resets the `.clicked` state after 1 idle frame
    useEffect(() => {
        // conditions:
        if (!markClicked) return; // the `.clicked` state was not marked => nothing to reset
        
        
        
        // setups:
        
        // cancel out previously asyncUnmarkClicked (if any):
        if (asyncUnmarkClicked.current) cancelIdleCallback(asyncUnmarkClicked.current);
        
        // wait until the `.clicked` state shown briefly (1 idle frame) by browser ui, then remove it
        asyncUnmarkClicked.current = requestIdleCallback(() => {
            setMarkClicked(false); // un-mark the `.clicked` state
        });
    }, [markClicked]);
    //#endregion resets the `.clicked` state after 1 idle frame
    
    
    
    // handlers:
    const handlePress         = useEvent<EventHandler<void>>(() => {
        // conditions:
        if (!propEditable)         return; // control is not editable => no response required
        if (isControllablePressed) return; // controllable [pressed] is set => no uncontrollable required
        
        
        
        setPressDn(true);
    });
    
    const handleMouseDown     = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // conditions:
        if (isTouchActive.current) return; // not in touch mode
        
        
        
        if (!actionMouses || actionMouses.includes(event.button)) handlePress();
    });
    
    const isTouchActive       = useRef(false);
    const handleTouchStart    = useEvent<React.TouchEventHandler<TElement>>((event) => {
        // marks:
        const isTouched       = (
            !actionTouches // null or zero
            ?
            !!event.touches.length // any number of touch(es)
            :
            (event.touches.length >= actionTouches) // the minimum number of touch(es) was satisfied (the default is single touch)
        );
        isTouchActive.current = isTouched;
        
        
        
        // conditions:
        if (!isTouched) return;
        
        
        
        handlePress();
    });
    
    const activeKeys          = new Set<string>();
    const performKeyUpActions = useRef<boolean>(false);
    const handleKeyDown       = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        // logs:
        const keyCode = event.code.toLowerCase();
        activeKeys.add(keyCode);
        
        
        
        // conditions:
        const hasMultiplePressedKeys = activeKeys.size > 1;
        // pressing multiple keys causes the pressed state be canceled:
        if (hasMultiplePressedKeys) {
            performKeyUpActions.current = false; // mark as aborted
            setPressDn(false);
            return;
        } // if
        
        
        
        // actions:
        if (!actionKeys || actionKeys.includes(keyCode)) {
            handlePress();
            
            
            
            // conditions:
            if (!handleActionCtrlEvents) return; // not an <ActionControl> or similar => no need to handle click event
            
            
            
            // actions:
            performKeyUpActions.current = true;
        }
        else {
            // conditions:
            if (!handleKeyEnterEvents) return; // not an <ActionControl> or similar => no need to handle click event
            
            
            
            // actions:
            // if the pressed key is not listed in actionKeys => treat [enter] as onClick event:
            if (keyCode === 'enter') {
                // responses the onClick event:
                event.target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true }));
            } // if
        } // if
        
        
        
        if ((keyCode === 'enter') || (keyCode === 'space') || (actionKeys && actionKeys.includes(keyCode))) event.preventDefault(); // prevents triggering `onClick` event fired by native <button>, prevents scrolling the whole page by [space] key, still alowing scrolling the whole page by arrows, pgup, pgdown, home, end.
    });
    const handleKeyUp         = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        // logs:
        const keyCode = event.code.toLowerCase();
        activeKeys.delete(keyCode);
        
        
        
        // conditions:
        if (!performKeyUpActions.current) return; // keyup actions has marked as aborted => nothing to do
        performKeyUpActions.current = false;      // reset
        
        if (!handleActionCtrlEvents)      return; // not an <ActionControl> or similar   => no need to handle click event
        
        
        
        // actions:
        if (!actionKeys || actionKeys.includes(keyCode)) {
            // responses the onClick event:
            event.target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true }));
        } // if
        
        
        
        if ((keyCode === 'enter') || (keyCode === 'space') || (actionKeys && actionKeys.includes(keyCode))) event.preventDefault(); // prevents triggering `onClick` event fired by native <button>, prevents scrolling the whole page by [space] key, still alowing scrolling the whole page by arrows, pgup, pgdown, home, end.
    });
    
    const handleClick         = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // conditions:
        if (!handleActionCtrlEvents) return; // not an <ActionControl> or similar => no need to handle click event
        
        if (!propEnabled) { // control is disabled => no response required
            event.stopPropagation(); // prevent from bubbling
            return; // nothing to do
        } // if
        
        
        
        // responses the onClick event:
        props.onClick?.(event);
    });
    
    const handleAnimationEnd  = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        const prevAnimation = animation;
        handleAnimationEndExternal(event);
        if ((prevAnimation === true) && (animation === undefined)) { // the `.releasing` animation is done
            setMarkClicked(true); // mark the `.clicked` state
        } // if
    });
    
    
    
    return {
        pressed,
        
        class : ((): string|null => {
            // pressing:
            if (animating === true) {
                // // pressing by controllable prop => use class .pressing
                // if (isControllablePressed) return 'pressing';
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
            
            // has been clicked:
            if (markClicked) return 'clicked';
            
            // // // fully released:
            // // // if (isControllablePressed) {
            // // //     return 'released'; // releasing by controllable prop => use class .released to kill pseudo :active
            // // // }
            // // // else {
            // // //     return null; // discard all classes above
            // // // } // if
            return null; // discard all classes above
        })(),
        
        handleMouseDown,
        handleTouchStart,
        handleKeyDown,
        handleKeyUp,
        handleClick,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    };
};
//#endregion clickable
