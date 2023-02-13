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
const _defaultActionMouses     : number[]|null = [1]       // [only_left_click]
const _defaultActionTouches    : number[]|null = [1]       // [only_single_touch]
const _defaultActionKeys       : string[]|null = ['space'] // [space_key]
const _defaultClickableOptions : Required<ClickableOptions> = {
    handleActionCtrlEvents     : false, // not to handle [space] as onClick
    handleKeyEnterEvents       : false, // not to handle [enter] as onClick
};
const _defaultReleaseDelay     : number = 1;



// hooks:

// states:

//#region clickable
export interface ClickableVars {
    /* supports for `usesActiveAsClick()` */
    
    filterPress          : any
    
    animPress            : any
    animRelease          : any
    
    animPressAsActive    : any
    animReleaseAsPassive : any
    
    
    
    filter               : any
    
    anim                 : any
}
const [clickableVars] = cssVars<ClickableVars>({ prefix: 'cl', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names

{
    const {animationRegistry: {registerFilter, registerAnim}} = usesAnimation();
    registerFilter(clickableVars.filter);
    registerAnim(clickableVars.anim);
}



// .pressed will be added after pressing-animation done:
const selectorIfPressed   = '.pressed'
// .pressing = styled press, :active = native press:
// the .disabling, [aria-disabled], .disabled are used to kill native :active
// // // the .pressed, .releasing, .released are used to overwrite native :active
// // // const selectorIfPressing  = ':is(.pressing, :active:not(:is(.disabling, [aria-disabled]:not([aria-disabled="false"]), .disabled, .pressed, .releasing, .released)))'
const selectorIfPressing  = '.pressing'
// .releasing will be added after loosing press and will be removed after releasing-animation done:
const selectorIfReleasing = '.releasing'
// if all above are not set => released:
// // // optionally use .released to overwrite native :active
// // // const selectorIfReleased  = ':is(:not(:is(.pressed, .pressing, :active:not(:is(.disabling, [aria-disabled]:not([aria-disabled="false"]), .disabled)), .releasing)), .released)'
const selectorIfReleased  = ':not(:is(.pressed, .pressing, .releasing))'

export const ifPressed        = (styles: CssStyleCollection): CssRule => rule(selectorIfPressed  , styles);
export const ifPressing       = (styles: CssStyleCollection): CssRule => rule(selectorIfPressing , styles);
export const ifReleasing      = (styles: CssStyleCollection): CssRule => rule(selectorIfReleasing, styles);
export const ifReleased       = (styles: CssStyleCollection): CssRule => rule(selectorIfReleased , styles);

export const ifPress          = (styles: CssStyleCollection): CssRule => rule([selectorIfPressing, selectorIfPressed                                         ], styles);
export const ifRelease        = (styles: CssStyleCollection): CssRule => rule([                                       selectorIfReleasing, selectorIfReleased], styles);
export const ifPressReleasing = (styles: CssStyleCollection): CssRule => rule([selectorIfPressing, selectorIfPressed, selectorIfReleasing                    ], styles);



export interface ClickableStuff { clickableRule: Factory<CssRule>, clickableVars: CssVars<ClickableVars> }
export interface ClickableConfig {
    filterPress          ?: CssKnownProps['filter'   ]
    
    animPress            ?: CssKnownProps['animation']
    animRelease          ?: CssKnownProps['animation']
    
    animPressAsActive    ?: CssKnownProps['animation']
    animReleaseAsPassive ?: CssKnownProps['animation']
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
                /* supports for `usesActiveAsClick()` */
                
                [clickableVars.filterPress         ] : config?.filterPress,
                
                [clickableVars.animPress           ] : config?.animPress,
                [clickableVars.animRelease         ] : config?.animRelease,
                
                [clickableVars.animPressAsActive   ] : config?.animPressAsActive,
                [clickableVars.animReleaseAsPassive] : config?.animReleaseAsPassive,
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
    actionTouches ?: number[]|null
    actionKeys    ?: string[]|null
    
    releaseDelay  ?: number
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
    
    const releaseDelay          = props.releaseDelay ?? _defaultReleaseDelay;
    
    
    
    // fn states:
    const pressDn = useRef<boolean>(false); // uncontrollable (dynamic) state: true => user pressed, false => user released
    /*
     * state is always released if not_editable (disabled and/or readOnly)
     * state is pressed/released based on [controllable pressed] (if set) and fallback to [uncontrollable pressed]
     */
    const pressedFn : boolean = propEditable && (props.pressed /*controllable*/ ?? pressDn.current /*uncontrollable*/);
    
    
    
    // states:
    const [pressed, setPressed, animation, {handleAnimationStart, handleAnimationEnd, handleAnimationCancel}] = useAnimatingState<boolean, TElement>({
        initialState  : pressedFn,
        animationName : /((?<![a-z])(press|release)|(?<=[a-z])(Press|Release))(?![a-z])/,
    });
    
    
    
    // update state:
    if (pressed !== pressedFn) { // change detected => apply the change & start animating
        setPressed(pressedFn);   // remember the last change
    } // if
    
    
    
    // resets:
    if (pressDn.current && (!propEditable || isControllablePressed)) {
        pressDn.current = false; // lost press because the control is not_editable (disabled and/or readOnly) or becomes *controllable*
    } // if
    
    
    
    // logs:
    const [logs] = useState(() => ({
        isMouseActive       : false,
        isTouchActive       : false,
        isKeyActive         : false,
        
        activeKeys          : new Set<string>(),
        performKeyUpActions : false,
        
        get isActive(): boolean {
            return (
                (
                    (+this.isMouseActive)
                    +
                    (+this.isTouchActive)
                    +
                    (+this.isKeyActive)
                )
                ===
                1 // must *exactly one* of actived input, if none -or- two -or- more => deactivated
            );
        },
        
        logMouseEvent : function(event: MouseEvent, isMouseDown: boolean, actionMouses: number[]|null) {
            this.isMouseActive = (
                isMouseDown // the *last* action is pressing mouse, not releasing
                &&
                !!event.buttons // one/more buttons are pressed
                &&
                (
                    !actionMouses // null => no constraint
                    ||
                    actionMouses.includes(event.buttons) // within constraint
                )
            );
        },
        logTouchEvent : function(event: TouchEvent, isTouchDown: boolean, actionTouches: number[]|null) {
            this.isTouchActive = (
                isTouchDown // the *last* action is touching, not releasing
                &&
                !!event.touches.length // one/more fingers are touched
                &&
                (
                    !actionTouches // null => no constraint
                    ||
                    actionTouches.includes(event.touches.length) // within constraint
                )
            );
        },
        logKeyEvent : function(event: KeyboardEvent, isKeyDown: boolean, actionKeys: string[]|null) {
            // conditions:
            /* note: the `code` may `undefined` on autoComplete */
            const keyCode = (event.code as string|undefined)?.toLowerCase();
            if (!keyCode) return; // ignores [unidentified] key
            
            
            
            if (isKeyDown) {
                this.activeKeys.add(keyCode);
            }
            else {
                this.activeKeys.delete(keyCode);
            } // if
            
            
            
            this.isKeyActive = (
                isKeyDown // the *last* action is pressing key, not releasing
                &&
                (this.activeKeys.size === 1) // only one key is pressed
                &&
                (
                    !actionKeys // null => no constraint
                    ||
                    actionKeys.includes(keyCode) // within constraint
                )
            );
        },
    }));
    
    
    
    // dom effects:
    
    //#region aborts async handles when the control is unmounted
    const asyncHandleRelease = useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
    useEffect(() => {
        // cleanups:
        return () => {
            // cancel out previously `handleReleaseAfterClick` (if any):
            if (asyncHandleRelease.current) clearTimeout(asyncHandleRelease.current);
        };
    }, []); // runs once on startup
    //#endregion aborts async handles when the control is unmounted
    
    //#region releases the *uncontrollable* pressed
    useEffect(() => {
        // conditions:
        if (!propEditable)         return; // control is not_editable (disabled and/or readOnly) => no *uncontrollable* release_event required
        if (isControllablePressed) return; // control is *controllable*                          => no *uncontrollable* release_event required
        if (!pressed)              return; // control is not_pressed                             => no need watching for releasing
        
        
        
        // handlers:
        const handleReleaseAfterClick = (): void => {
            if (releaseDelay < 0) {
                handleRelease();
            }
            else {
                // cancel out previously `handleReleaseAfterClick` (if any):
                if (asyncHandleRelease.current) clearTimeout(asyncHandleRelease.current);
                
                
                
                // setTimeout => make sure the `mouseup` event fires *after* the `click` event, so the user has a chance to change the `pressed` prop:
                // asyncHandleRelease.current = setTimeout(handleRelease, 0); // 0 = runs immediately after all micro tasks finished
                asyncHandleRelease.current = setTimeout(handleRelease, releaseDelay); // `releaseDelay = 1 (default)` = runs immediately after all micro tasks & nextJS macro task finished
                /* do not use `Promise.resolve().then(handleRelease)` because it's not fired *after* the `click` event */
            } // if
        };
        
        const handleMouseUp           = (event: MouseEvent): void => {
            // logs:
            logs.logMouseEvent(event, false /*mouse_up*/, actionMouses);
            
            
            
            // actions:
            if (!logs.isActive) handleReleaseAfterClick();
        };
        const handleTouchEnd          = (event: TouchEvent): void => {
            // logs:
            logs.logTouchEvent(event, false /*touch_up*/, actionTouches);
            
            
            
            // actions:
            if (!logs.isActive) handleReleaseAfterClick();
        };
        const handleKeyUp             = (event: KeyboardEvent): void => {
            // conditions:
            /* note: the `code` may `undefined` on autoComplete */
            const keyCode = (event.code as string|undefined)?.toLowerCase();
            if (!keyCode) return; // ignores [unidentified] key
            
            
            
            // logs:
            logs.logKeyEvent(event, false /*key_up*/, actionKeys);
            
            
            
            // actions:
            if (!logs.isActive) {
                const performKeyUpActions = logs.performKeyUpActions; // copy before modified
                handleReleaseAfterClick();
                
                
                
                if (performKeyUpActions) {
                    // actions:
                    // trigger the onClick event by <kbd>actionKeys</kbd> key:
                    setTimeout(() => {
                        event.target?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true }));
                    }, 0); // runs the 'click' event *next after* current event completed
                    
                    
                    
                    // prevents triggering a *double* `onClick` event fired by native <button>
                    // prevents scrolling the whole page by [space] key
                    // still alowing scrolling the whole page by arrows, pgup, pgdown, home, end:
                    if ((keyCode === 'enter') || (keyCode === 'space') || (!actionKeys || actionKeys.includes(keyCode))) {
                        event.preventDefault();
                    } // if
                } // if
            } // if
        };
        
        
        
        // setups:
        window.addEventListener('mouseup', handleMouseUp);
        
        window.addEventListener('touchend'   , handleTouchEnd);
        window.addEventListener('touchcancel', handleTouchEnd);
        
        window.addEventListener('keyup',   handleKeyUp);
        
        
        
        // cleanups:
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            
            window.removeEventListener('touchend'   , handleTouchEnd);
            window.removeEventListener('touchcancel', handleTouchEnd);
            
            window.removeEventListener('keyup',   handleKeyUp);
        };
    }, [propEditable, isControllablePressed, pressed]);
    //#endregion releases the *uncontrollable* pressed
    
    
    
    // handlers:
    const handlePress        = useEvent<EventHandler<void>>(() => {
        // watchdog the *uncontrollable* press state:
        if (propEditable) pressDn.current = true;
        
        // update state:
        if (!isControllablePressed) setPressed(propEditable);
    });
    const handleRelease      = useEvent<EventHandler<void>>(() => {
        // watchdog the *uncontrollable* release state:
        if (propEditable) pressDn.current = false;
        
        // update state:
        if (!isControllablePressed) setPressed(false);
        
        // resets:
        logs.performKeyUpActions = false;
    });
    const handlePressRelease = useEvent<EventHandler<void>>(() => {
        if (logs.isActive) {
            handlePress();
        }
        else {
            handleRelease();
        } // if
    });
    
    const handleMouseDown    = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // logs:
        logs.logMouseEvent(event.nativeEvent, true /*mouse_down*/, actionMouses);
        
        
        
        // actions:
        handlePressRelease();
    });
    const handleTouchStart   = useEvent<React.TouchEventHandler<TElement>>((event) => {
        // logs:
        logs.logTouchEvent(event.nativeEvent, true /*touch_down*/, actionTouches);
        
        
        
        // actions:
        handlePressRelease();
    });
    const handleKeyDown      = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        // conditions:
        /* note: the `code` may `undefined` on autoComplete */
        const keyCode = (event.code as string|undefined)?.toLowerCase();
        if (!keyCode) return; // ignores [unidentified] key
        
        
        
        // logs:
        logs.logKeyEvent(event.nativeEvent, true /*key_down*/, actionKeys);
        
        
        
        // actions:
        handlePressRelease();
        
        
        
        // actions:
        if (logs.isActive) { // <kbd>actionKeys</kbd> key was handled
            if (handleActionCtrlEvents) {
                // actions:
                // trigger the onClick event later at `onKeyUp`
                logs.performKeyUpActions = true;
            } // if
        }
        else if (keyCode === 'enter') { // handle <kbd>enter</kbd> key (if not listed in <kbd>actionKeys</kbd>)
            if (handleKeyEnterEvents) {
                // actions:
                // trigger the onClick event by <kbd>enter</kbd> key:
                setTimeout(() => {
                    event.target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true }));
                }, 0); // runs the 'click' event *next after* current event completed
            } // if
        } // if
        
        
        
        // prevents triggering a *double* `onClick` event fired by native <button>
        // prevents scrolling the whole page by [space] key
        // still alowing scrolling the whole page by arrows, pgup, pgdown, home, end:
        if ((keyCode === 'enter') || (keyCode === 'space') || (!actionKeys || actionKeys.includes(keyCode))) {
            event.preventDefault();
        } // if
    });
    
    const handleClick        = useEvent<React.MouseEventHandler<TElement>>((event) => {
        if (handleActionCtrlEvents) {
            // actions:
            if (!propEnabled) {
                // control is disabled => block the response
                
                // prevent from bubbling:
                event.stopPropagation();
            }
            else {
                // forward the *synthetic* onClick event by mouse/touch:
                props.onClick?.(event);
            } // if
        } // if
    });
    
    
    
    return {
        pressed,
        
        class : ((): string|null => {
            // pressing:
            if (animation === true) {
                // // pressing by controllable prop => use class .pressing
                // if (isControllablePressed) return 'pressing';
                //
                // // otherwise use pseudo :active
                // return null;
                // support for pressing by [space key] that not triggering :active
                return 'pressing';
            } // if
            
            // releasing:
            if (animation === false) return 'releasing';
            
            // fully pressed:
            if (pressed) return 'pressed';
            
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
        handleClick,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    };
};
//#endregion clickable
