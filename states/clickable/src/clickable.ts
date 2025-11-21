// React:
import {
    // React:
    default as React,
    
    
    
    // Hooks:
    useState,
    useRef,
    useEffect,
}                           from 'react'

// Cssfn:
import {
    // Cssfn general types:
    Factory,
    
    
    
    // Cssfn css specific types:
    CssKnownProps,
    CssRule,
    CssStyleCollection,
    
    
    
    // Writes css in javascript:
    rule,
    states,
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui utilities:
import {
    // Hooks:
    useEvent,
    EventHandler,
    useScheduleTriggerEvent,
}                           from '@reusable-ui/hooks'               // React helper hooks.
import {
    // Hooks:
    useAnimatingState,
}                           from '@reusable-ui/animating-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.

// Reusable-ui features:
import {
    // Hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'           // Animation stuff of UI.

// Reusable-ui states:
import {
    // Types:
    type DisabledStateProps,
    
    
    
    // Hooks:
    useDisabledState,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.
import {
    // Types:
    type ReadOnlyStateProps,
    
    
    
    // Hooks:
    useReadOnlyState,
}                           from '@reusable-ui/read-only-state'     // Adds editable/read-only functionality to UI components, with transition animations and semantic styling hooks.
import {
    // Utilities:
    isReleasingSelector,
    isPressingOrPressedSelector,
    
    ifPressed,
    ifReleased,
    ifPressing,
    ifReleasing,
    ifPressingOrPressed,
    ifReleasingOrReleased,
}                           from '@reusable-ui/press-state'         // Adds press/release functionality to UI components, with transition animations and semantic styling hooks.



// defaults:
const _defaultActionMouses     : number[]|null = [1]       // [only_left_click]
const _defaultActionTouches    : number[]|null = [1]       // [only_single_touch]
const _defaultActionKeys       : string[]|null = ['space'] // [space_key]
const _defaultClickableOptions : Required<ClickableOptions> = {
    handleActionCtrlEvents     : false, // not to handle [space] as onClick
    handleKeyEnterEvents       : false, // not to handle [enter] as onClick
};
const _defaultReleaseDelay     : number = 1;



/**
 * @deprecated - Use `PressStateVars` instead.
 */
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



// Not deprecated:
export {
    ifPressed,
    ifReleased,
    ifPressing,
    ifReleasing,
}

/**
 * @deprecated - Use `ifPressingOrPressed` instead.
 */
export const ifPress          = ifPressingOrPressed;

/**
 * @deprecated - Use `ifReleasingOrReleased` instead.
 */
export const ifRelease        = ifReleasingOrReleased;

/**
 * @deprecated - Use `rule([isPressingOrPressedSelector, isReleasingSelector], styles)` instead.
 */
export const ifPressReleasing = (styles: CssStyleCollection): CssRule => rule([isPressingOrPressedSelector, isReleasingSelector], styles);



/**
 * @deprecated - Use `CssPressState` instead.
 */
export interface ClickableStuff { clickableRule: Factory<CssRule>, clickableVars: CssVars<ClickableVars> }

/**
 * @deprecated - Use `CssPressStateOptions` instead.
 */
export interface ClickableConfig {
    filterPress          ?: CssKnownProps['filter'   ]
    
    animPress            ?: CssKnownProps['animation']
    animRelease          ?: CssKnownProps['animation']
    
    animPressAsActive    ?: CssKnownProps['animation']
    animReleaseAsPassive ?: CssKnownProps['animation']
}
/**
 * @deprecated - Use `usesPressState` instead.
 * 
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



/**
 * @deprecated - Use `PressStateProps` instead.
 */
export interface ClickableProps<TElement extends Element = HTMLElement>
    extends
        // handlers:
        Partial<Pick<React.DOMAttributes<TElement>,
            |'onClick'
        >>
{
    // states:
    pressed       ?: boolean
    
    
    
    // behaviors:
    actionMouses  ?: number[]|null
    actionTouches ?: number[]|null
    actionKeys    ?: string[]|null
    
    releaseDelay  ?: number
    
    /**
     * @deprecated - Use `disabled` instead.
     */
    enabled            ?: DisabledStateProps['disabled']
    
    /**
     * @deprecated - Use `cascadeDisabled` instead.
     */
    inheritEnabled     ?: DisabledStateProps['cascadeDisabled']
    
    /**
     * @deprecated - Should be never used, since click/press is not an editable behavior.
     */
    readOnly           ?: ReadOnlyStateProps['readOnly']
    
    /**
     * @deprecated - Should be never used, since click/press is not an editable behavior.
     */
    inheritReadOnly    ?: ReadOnlyStateProps['cascadeReadOnly']
}

/**
 * @deprecated - Use `PressPhase` instead.
 */
export const enum ClickableState {
    Released  = 0,
    Releasing = 1,
    Pressing  = 2,
    Pressed   = 3,
}

/**
 * @deprecated - Use `PressBehaviorState` instead.
 */
export interface ClickableApi<TElement extends Element = HTMLElement> {
    pressed               : boolean
    
    state                 : ClickableState
    class                 : string|null
    
    handleMouseDown       : React.MouseEventHandler<TElement>
    handleTouchStart      : React.TouchEventHandler<TElement>
    handleKeyDown         : React.KeyboardEventHandler<TElement>
    handleClick           : React.MouseEventHandler<TElement>
    
    handleAnimationStart  : React.AnimationEventHandler<TElement>
    handleAnimationEnd    : React.AnimationEventHandler<TElement>
    handleAnimationCancel : React.AnimationEventHandler<TElement>
}

/**
 * @deprecated - Use `PressStateOptions` instead.
 */
export interface ClickableOptions {
    handleActionCtrlEvents ?: boolean
    handleKeyEnterEvents   ?: boolean
}
/**
 * @deprecated - Use `usePressBehaviorState` instead.
 */
export const useClickable = <TElement extends Element = HTMLElement>(props: ClickableProps<TElement>, options : ClickableOptions = _defaultClickableOptions): ClickableApi<TElement> => {
    // options:
    const {
        handleActionCtrlEvents = _defaultClickableOptions.handleActionCtrlEvents,
        handleKeyEnterEvents   = _defaultClickableOptions.handleKeyEnterEvents,
    } = options;
    
    
    
    // Resolve whether the component is disabled:
    const isDisabled      = useDisabledState(props as Parameters<typeof useDisabledState>[0]);
    
    // Resolve whether the component is readonly:
    const isReadonly      = useReadOnlyState(props as Parameters<typeof useReadOnlyState>[0]);
    
    // Resolve whether the component is in a restricted state:
    const isRestricted    = isDisabled || isReadonly;
    
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
    const pressedFn : boolean = !isRestricted && (props.pressed /*controllable*/ ?? pressDn.current /*uncontrollable*/);
    
    
    
    // states:
    const [pressed, setPressed, animation, {handleAnimationStart, handleAnimationEnd, handleAnimationCancel}] = useAnimatingState<boolean, TElement>({
        initialState  : pressedFn,
        animationName : /((^|[^a-z])(press|release)|([a-z])(Press|Release))(?![a-z])/,
    });
    
    
    
    // update state:
    if (pressed !== pressedFn) { // change detected => apply the change & start animating
        setPressed(pressedFn);   // remember the last change
    } // if
    
    
    
    // resets:
    if (pressDn.current && (isRestricted || isControllablePressed)) {
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
    
    
    
    // events:
    const scheduleTriggerEvent = useScheduleTriggerEvent();
    
    
    
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
        if (isRestricted)          return; // control is not_editable (disabled and/or readOnly) => no *uncontrollable* release_event required
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
                    scheduleTriggerEvent(() => { // runs the `click` event *next after* current macroTask completed
                        // fire `click` native event to trigger `onClick` synthetic event:
                        event.target?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true }));
                    });
                    
                    
                    
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
    }, [isRestricted, isControllablePressed, pressed]);
    //#endregion releases the *uncontrollable* pressed
    
    
    
    // handlers:
    const handlePress        = useEvent<EventHandler<void>>(() => {
        // watchdog the *uncontrollable* press state:
        if (!isRestricted) pressDn.current = true;
        
        // update state:
        if (!isControllablePressed) setPressed(!isRestricted);
    });
    const handleRelease      = useEvent<EventHandler<void>>(() => {
        // watchdog the *uncontrollable* release state:
        if (!isRestricted) pressDn.current = false;
        
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
                scheduleTriggerEvent(() => { // runs the `click` event *next after* current macroTask completed
                    // fire `click` native event to trigger `onClick` synthetic event:
                    event.target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true }));
                });
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
            if (isDisabled) {
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
    
    
    
    // fn props:
    const state = ((): ClickableState => {
        // pressing:
        if (animation === true ) return ClickableState.Pressing;
        
        // releasing:
        if (animation === false) return ClickableState.Releasing;
        
        // fully pressed:
        if (pressed) return ClickableState.Pressed;
        
        // fully released:
        return ClickableState.Released;
    })();
    const stateClass = ((): string|null => {
        switch (state) {
            // pressing:
            case ClickableState.Pressing: {
                // // pressing by controllable prop => use class .pressing
                // if (isControllablePressed) return 'pressing';
                //
                // // otherwise use pseudo :active
                // return null;
                // support for pressing by [space key] that not triggering :active
                return 'pressing';
            };
            
            // releasing:
            case ClickableState.Releasing: {
                return 'releasing';
            };
            
            // fully pressed:
            case ClickableState.Pressed: {
                return 'pressed';
            };
            
            // fully released:
            case ClickableState.Released: {
                // // // if (isControllablePressed) {
                // // //     return 'released'; // releasing by controllable prop => use class .released to kill pseudo :active
                // // // }
                // // // else {
                // // //     return null; // discard all classes above
                // // // } // if
                return null; // discard all classes above
            };
        } // switch
    })();
    
    
    
    // api:
    return {
        pressed,
        
        state : state,
        class : stateClass,
        
        handleMouseDown,
        handleTouchStart,
        handleKeyDown,
        handleClick,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    };
};
