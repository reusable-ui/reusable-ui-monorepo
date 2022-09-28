// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
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
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    usePropEnabled,
    
    
    
    // react components:
    AccessibilityProps,
}                           from '@reusable-ui/accessibilities' // an accessibility management system

// reusable-ui features:
import {
    // hooks:
    usesRing,
}                           from '@reusable-ui/ring'            // ring (focus indicator) color of UI
import {
    // hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'       // animation stuff of UI



// hooks:

// states:

//#region focusable
export interface FocusableVars {
    boxShadow   : any
    
    anim        : any
    
    
    
    /**
     * final boxShadow single layer - at focused state.
     */
    boxShadowLy : any
}
const [focusableVars] = cssVars<FocusableVars>();

{
    const {animationRegistry: {registerBoxShadow, registerAnim}} = usesAnimation();
    registerBoxShadow(focusableVars.boxShadow);
    registerAnim(focusableVars.anim);
}



/*
    polyfill:
    :focus-visible-within = :is(:focus-visible, :focus:where([data-assertive-focusable]), :has(:focus-visible, :focus:where([data-assertive-focusable])))
*/

// .focused will be added after focusing-animation done:
const selectorIfFocused  = '.focused'
// .focusing = styled focus, :focus-visible-within = native focus:
// the .disabled, .disable are used to kill native :focus-visible-within
// the .focused, .blurring, .blurred are used to overwrite native :focus-visible-within
const selectorIfFocusing = ':is(.focusing, :is(:focus-visible, :focus:where([data-assertive-focusable]), :has(:focus-visible, :focus:where([data-assertive-focusable]))):not(:is(.disabled, .disable, .focused, .blurring, .blurred)))'
// .blurring will be added after loosing focus and will be removed after blurring-animation done:
const selectorIfBlurring = '.blurring'
// if all above are not set => blurred:
// optionally use .blurred to overwrite native :focus-visible-within
const selectorIfBlurred  = ':is(:not(:is(.focused, .focusing, :is(:focus-visible, :focus:where([data-assertive-focusable]), :has(:focus-visible, :focus:where([data-assertive-focusable]))):not(:is(.disabled, .disable)), .blurring)), .blurred)'

export const ifFocused       = (styles: CssStyleCollection): CssRule => rule(selectorIfFocused , styles);
export const ifFocusing      = (styles: CssStyleCollection): CssRule => rule(selectorIfFocusing, styles);
export const ifBlurring      = (styles: CssStyleCollection): CssRule => rule(selectorIfBlurring, styles);
export const ifBlurred       = (styles: CssStyleCollection): CssRule => rule(selectorIfBlurred , styles);

export const ifFocus         = (styles: CssStyleCollection): CssRule => rule([selectorIfFocusing, selectorIfFocused                                       ], styles);
export const ifBlur          = (styles: CssStyleCollection): CssRule => rule([                                       selectorIfBlurring, selectorIfBlurred], styles);
export const ifFocusBlurring = (styles: CssStyleCollection): CssRule => rule([selectorIfFocusing, selectorIfFocused, selectorIfBlurring                   ], styles);



export interface FocusableStuff { focusableRule: Factory<CssRule>, focusableVars: CssVars<FocusableVars> }
export interface FocusableConfig {
    boxShadowFocus ?: CssKnownProps['boxShadow']
    
    animFocus      ?: CssKnownProps['animation']
    animBlur       ?: CssKnownProps['animation']
}
/**
 * Adds a capability of UI to be focused.
 * @param config  A configuration of `focusableRule`.
 * @returns A `FocusableStuff` represents a focusable state.
 */
export const usesFocusable = (config?: FocusableConfig): FocusableStuff => {
    // dependencies:
    
    // features:
    const {ringVars} = usesRing();
    
    
    
    return {
        focusableRule: () => style({
            // compositions:
            ...vars({
                [focusableVars.boxShadowLy] : !config?.boxShadowFocus ? undefined : [[
                    // combining: pos width spread color ...
                    
                    // boxShadowFocus pos, width, spread, etc:
                    ...(Array.isArray(config.boxShadowFocus) ? config.boxShadowFocus : [config.boxShadowFocus as (CssKnownProps['boxShadow'] & Array<Array<any>>)[number][number]]),
                    
                    // ring color:
                    ringVars.ring,
                ]],
            }),
            
            
            
            // animation states:
            ...states([
                ifFocused({
                    ...vars({
                        [focusableVars.boxShadow] : focusableVars.boxShadowLy,
                    }),
                }),
                ifFocusing({
                    ...vars({
                        [focusableVars.boxShadow] : focusableVars.boxShadowLy,
                        [focusableVars.anim     ] : config?.animFocus,
                    }),
                }),
                ifBlurring({
                    ...vars({
                        [focusableVars.boxShadow] : focusableVars.boxShadowLy,
                        [focusableVars.anim     ] : config?.animBlur,
                    }),
                }),
            ]),
        }),
        focusableVars,
    };
};



export interface FocusableProps
    extends
        // states:
        Partial<Pick<AccessibilityProps, 'enabled'|'inheritEnabled'>>,
        
        // accessibilities:
        Pick<React.ButtonHTMLAttributes<Element>, 'tabIndex'>
{
    // states:
    focused            ?: boolean
    assertiveFocusable ?: boolean
}
export const useFocusable = <TElement extends Element = HTMLElement>(props: FocusableProps) => {
    // fn props:
    const propEnabled           = usePropEnabled(props);
    const isControllableFocused = (props.focused !== undefined);
    
    
    
    // states:
    const [focused,   setFocused  ] = useState<boolean>(props.focused ?? false); // true => focused, false => blurred
    const [animating, setAnimating] = useState<boolean|null>(null);              // null => no-animation, true => focusing-animation, false => blurring-animation
    
    const [focusDn,   setFocusDn  ] = useState<boolean>(false);                  // uncontrollable (dynamic) state: true => user focused, false => user blurred
    
    
    
    // resets:
    if (focusDn && (!propEnabled || isControllableFocused)) {
        setFocusDn(false); // lost focus because the control is disabled or controllable [focused] is set, when the control is re-enabled => still lost focus
    } // if
    
    
    
    /*
     * state is always blur if disabled
     * state is focused/blurred based on [controllable focused] (if set) and fallback to [uncontrollable focused]
     */
    const focusedFn : boolean = propEnabled && (props.focused /*controllable*/ ?? focusDn /*uncontrollable*/);
    
    if (focused !== focusedFn) { // change detected => apply the change & start animating
        setFocused(focusedFn);   // remember the last change
        setAnimating(focusedFn); // start focusing-animation/blurring-animation
    } // if
    
    
    
    // handlers:
    const handleFocus        = useEvent<React.FocusEventHandler<TElement>>((event) => {
        // conditions:
        if (!propEnabled)          return; // control is disabled => no response required
        if (isControllableFocused) return; // controllable [focused] is set => no uncontrollable required
        if (focusDn)               return; // already focused => nothing to focus
        if (!event.currentTarget.matches(':focus-visible, :focus:where([data-assertive-focusable]), :has(:focus-visible, :focus:where([data-assertive-focusable]))'))
                                   return; // not :focus-visible-within => supporess the actual focus
        
        
        
        setFocusDn(true);
    });
    
    const handleBlur         = useEvent<React.FocusEventHandler<TElement>>(() => {
        // conditions:
        if (!propEnabled)          return; // control is disabled => no response required
        if (isControllableFocused) return; // controllable [focused] is set => no uncontrollable required
        if (!focusDn)              return; // already blurred => nothing to blur
        
        
        
        setFocusDn(false);
    });
    
    const handleKeyDown      = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        handleFocus(event as unknown as React.FocusEvent<TElement, Element>);
    });
    
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(focus|blur)|(?<=[a-z])(Focus|Blur))(?![a-z])/.test(event.animationName)) return; // ignores animation other than (focus|blur)[Foo] or boo(Focus|Blur)[Foo]
        
        
        
        // clean up finished animation
        
        setAnimating(null); // stop focusing-animation/blurring-animation
    });
    
    
    
    return {
        focused,
        
        class : ((): string|null => {
            // focusing:
            if (animating === true) {
                // focusing by controllable prop => use class .focusing
                if (isControllableFocused) return 'focusing';
                
                // negative [tabIndex] => can't be focused by user input => treats <Control> as *wrapper* element => use class .focusing
                if ((props.tabIndex ?? 0) < 0) return 'focusing';
                
                // otherwise use pseudo :focus-visible-within
                return null;
            } // if
            
            // blurring:
            if (animating === false) return 'blurring';
            
            // fully focused:
            if (focused) return 'focused';
            
            // fully blurred:
            if (isControllableFocused) {
                return 'blurred'; // blurring by controllable prop => use class .blurred to kill pseudo :focus-visible-within
            }
            else {
                return null; // discard all classes above
            } // if
        })(),
        
        attributes : { 'data-assertive-focusable': props.assertiveFocusable || null },
        
        handleFocus,
        handleBlur,
        handleKeyDown,
        handleAnimationEnd,
    };
};
//#endregion focusable
