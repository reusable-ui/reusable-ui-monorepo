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
    // types:
    Factory,
}                           from '@cssfn/types'                 // cssfn general types
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
    
    
    
    // styles:
    style,
    vars,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // utilities:
    CssVars,
    cssVars,
}                           from '@cssfn/css-vars'              // strongly typed of css variables

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

// reusable-ui features:
import {
    // hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'       // animation stuff of UI



// defaults:
const _defaultActionMouses  : number[]|null = [0]       // left click
const _defaultActionTouches : number|null   = 1         // single touch
const _defaultActionKeys    : string[]|null = ['space'] // space key



// hooks:

// states:

//#region clickable
export interface ClickableVars {
    filter : any
    anim   : any
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
            ...states([
                ifPressed({
                    ...vars({
                        [clickableVars.filter] : config?.filterPress,
                    }),
                }),
                ifPressing({
                    ...vars({
                        [clickableVars.filter] : config?.filterPress,
                        [clickableVars.anim  ] : config?.animPress,
                    }),
                }),
                ifReleasing({
                    ...vars({
                        [clickableVars.filter] : config?.filterPress,
                        [clickableVars.anim  ] : config?.animRelease,
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
export const useClickable = <TElement extends Element = HTMLElement>(props: ClickableProps<TElement>) => {
    // fn props:
    const propEnabled           = usePropEnabled(props);
    const propReadOnly          = usePropReadOnly(props);       // supports for <Check>
    const propEditable          = propEnabled && !propReadOnly; // supports for <Check>
    const isControllablePressed = (props.pressed !== undefined);
    
    const actionMouses          = (props.actionMouses  !== undefined) ? props.actionMouses  : _defaultActionMouses;
    const actionTouches         = (props.actionTouches !== undefined) ? props.actionTouches : _defaultActionTouches;
    const actionKeys            = (props.actionKeys    !== undefined) ? props.actionKeys    : _defaultActionKeys;
    
    
    
    // states:
    const [pressed,   setPressed  ] = useState<boolean>(props.pressed ?? false); // true => pressed, false => released
    const [animating, setAnimating] = useState<boolean|null>(null);              // null => no-animation, true => pressing-animation, false => releasing-animation
    
    const [pressDn,   setPressDn  ] = useState<boolean>(false);                  // uncontrollable (dynamic) state: true => user pressed, false => user released
    
    
    
    // resets:
    if (pressDn && (!propEditable || isControllablePressed)) {
        setPressDn(false); // lost press because the control is not editable, when the control is re-editable => still lost press
    } // if
    
    
    
    /*
     * state is always released if (disabled || readOnly)
     * state is pressed/released based on [controllable pressed] (if set) and fallback to [uncontrollable pressed]
     */
    const pressedFn : boolean = propEditable && (props.pressed /*controllable*/ ?? pressDn /*uncontrollable*/);
    
    if (pressed !== pressedFn) { // change detected => apply the change & start animating
        setPressed(pressedFn);   // remember the last change
        setAnimating(pressedFn); // start pressing-animation/releasing-animation
    } // if
    
    
    
    // dom effects:
    
    const asyncHandleRelease = useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
    useEffect(() => {
        // cleanups:
        return () => {
            // cancel out previously `handleReleaseAfterClick` (if any):
            if (asyncHandleRelease.current) clearTimeout(asyncHandleRelease.current);
        };
    }, []); // runs once on startup
    
    useEffect(() => {
        // conditions:
        if (!propEditable)         return; // control is not editable => no response required
        if (isControllablePressed) return; // controllable [pressed] is set => no uncontrollable required
        
        
        
        // handlers:
        const handleRelease = (): void => {
            setPressDn(false);
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
    
    
    
    // handlers:
    const handlePress        = useEvent<EventHandler<void>>(() => {
        // conditions:
        if (!propEditable)         return; // control is not editable => no response required
        if (isControllablePressed) return; // controllable [pressed] is set => no uncontrollable required
        
        
        
        setPressDn(true);
    });
    
    const handleMouseDown    = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // conditions:
        if (isTouchActive.current) return; // not in touch mode
        
        
        
        if (!actionMouses || actionMouses.includes(event.button)) handlePress();
    });
    
    const isTouchActive      = useRef(false);
    const handleTouchStart   = useEvent<React.TouchEventHandler<HTMLInputElement>>((event) => {
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
    
    const handleKeyDown      = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        if (!actionKeys || actionKeys.includes(event.code.toLowerCase()) || actionKeys.includes(event.key.toLowerCase())) handlePress();
    });
    
    const handleClick        = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // conditions:
        if (!propEnabled) { // control is disabled => no response required
            event.stopPropagation(); // prevent from bubbling
            return; // nothing to do
        } // if
        
        
        
        // responses the onClick event:
        props.onClick?.(event);
    });
    
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(press|release)|(?<=[a-z])(Press|Release))(?![a-z])/.test(event.animationName)) return; // ignores animation other than (press|release)[Foo] or boo(Press|Release)[Foo]
        
        
        
        // clean up finished animation
        
        setAnimating(null); // stop pressing-animation/releasing-animation
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
            
            // fully released:
            // if (isControllablePressed) {
            //     return 'released'; // releasing by controllable prop => use class .released to kill pseudo :active
            // }
            // else {
            //     return null; // discard all classes above
            // } // if
            return null; // discard all classes above
        })(),
        
        handleMouseDown,
        handleTouchStart,
        handleKeyDown,
        handleClick,
        handleAnimationEnd,
    };
};
//#endregion clickable
