// React:
import {
    // React:
    default as React,
    
    
    
    // Hooks:
    useRef,
}                           from 'react'

// Cssfn:
import {
    // Cssfn general types:
    Factory,
    
    
    
    // Cssfn css specific types:
    CssKnownProps,
    CssRule,
    CssStyleCollection,
    CssSelector,
    
    
    
    // Writes css in javascript:
    rule,
    states,
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    CssVars,
    cssVars,
    
    
    
    // Checks if a certain css feature is supported by the running browser:
    supportsHasPseudoClass,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui utilities:
import {
    // Hooks:
    useEvent,
}                           from '@reusable-ui/hooks'               // React helper hooks.
import {
    // Hooks:
    useAnimatingState,
}                           from '@reusable-ui/animating-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.

// Reusable-ui features:
import {
    // Hooks:
    usesRing,
}                           from '@reusable-ui/ring'                // Ring (focus indicator) color of UI
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
    // Utilities:
    isBlurringSelector,
    isFocusingOrFocusedSelector,
    
    ifFocused,
    ifBlurred,
    ifFocusing,
    ifBlurring,
    ifFocusingOrFocused,
    ifBlurringOrBlurred,
}                           from '@reusable-ui/focus-state'         // Adds focus/blur functionality to UI components, with transition animations and semantic styling hooks.



/**
 * @deprecated - Use `FocusStateVars` instead.
 */
export interface FocusableVars {
    boxShadow   : any
    
    anim        : any
    
    
    
    /**
     * final boxShadow single layer - at focused state.
     */
    boxShadowLy : any
}
const [focusableVars] = cssVars<FocusableVars>({ prefix: 'fo', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names

{
    const {animationRegistry: {registerBoxShadow, registerAnim}} = usesAnimation();
    registerBoxShadow(focusableVars.boxShadow);
    registerAnim(focusableVars.anim);
}



/**
  * @deprecated - No longer needed.
  * Since all major browsers are now support `:has(...)` selector,
  * this polyfill is no longer needed.
  * 
  * polyfill:
  * :focus-visible-within = :is(:focus-visible, :focus:where([data-assertive-focusable]), :has(:focus-visible, :focus:where([data-assertive-focusable])))
*/
export const selectorFocusVisibleWithin : CssSelector = (
    supportsHasPseudoClass()
    ?
    ':is(:focus-visible, :focus:where([data-assertive-focusable]), :has(:focus-visible, :focus:where([data-assertive-focusable])))'
    :
    ':is(:focus-visible, :focus:where([data-assertive-focusable]), :focus-within)'
);

// Not deprecated:
export {
    ifFocused,
    ifBlurred,
    ifFocusing,
    ifBlurring,
}

/**
 * @deprecated - Use `ifFocusingOrFocused` instead.
 */
export const ifFocus         = ifFocusingOrFocused;

/**
 * @deprecated - Use `ifBlurringOrBlurred` instead.
 */
export const ifBlur          = ifBlurringOrBlurred;

/**
 * @deprecated - Use `rule([isFocusingOrFocusedSelector, isBlurringSelector], styles)` instead.
 */
export const ifFocusBlurring = (styles: CssStyleCollection): CssRule => rule([isFocusingOrFocusedSelector, isBlurringSelector], styles);



/**
 * @deprecated - Use `CssFocusState` instead.
 */
export interface FocusableStuff { focusableRule: Factory<CssRule>, focusableVars: CssVars<FocusableVars> }

/**
 * @deprecated - Use `CssFocusStateOptions` instead.
 */
export interface FocusableConfig {
    boxShadowFocus ?: CssKnownProps['boxShadow']
    
    animFocus      ?: CssKnownProps['animation']
    animBlur       ?: CssKnownProps['animation']
}
/**
 * @deprecated - Use `usesFocusState` instead.
 * 
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



/**
 * @deprecated - Use `FocusStateProps` instead.
 */
export interface FocusableProps
    extends
        // accessibilities:
        Partial<Pick<React.HTMLAttributes<Element>,
            |'tabIndex'
        >>
{
    // states:
    focused            ?: boolean
    assertiveFocusable ?: boolean
    
    /**
     * @deprecated - Use `disabled` instead.
     */
    enabled            ?: DisabledStateProps['disabled']
    
    /**
     * @deprecated - Use `cascadeDisabled` instead.
     */
    inheritEnabled     ?: DisabledStateProps['cascadeDisabled']
}

/**
 * @deprecated - Use `FocusPhase` instead.
 */
export const enum FocusableState {
    Blurred  = 0,
    Blurring = 1,
    Focusing = 2,
    Focused  = 3,
}

/**
 * @deprecated - Use `FocusBehaviorState` instead.
 */
export interface FocusableApi<TElement extends Element = HTMLElement> {
    focused               : boolean
    
    state                 : FocusableState
    class                 : string|null
    
    attributes            :
        | { 'data-assertive-focusable' : true }
        | null
    
    handleFocus           : React.FocusEventHandler<TElement>
    handleBlur            : React.FocusEventHandler<TElement>
    handleKeyDown         : React.KeyboardEventHandler<TElement>
    
    handleAnimationStart  : React.AnimationEventHandler<TElement>
    handleAnimationEnd    : React.AnimationEventHandler<TElement>
    handleAnimationCancel : React.AnimationEventHandler<TElement>
}

/**
 * @deprecated - Use `useFocusBehaviorState` instead.
 */
export const useFocusable = <TElement extends Element = HTMLElement>(props: FocusableProps): FocusableApi<TElement> => {
    // Resolve whether the component is disabled:
    const isDisabled            = useDisabledState(props as Parameters<typeof useDisabledState>[0]);
    
    const isControllableFocused = (props.focused !== undefined);
    
    
    
    // fn states:
    const focusDn = useRef<boolean>(false); // uncontrollable (dynamic) state: true => user focused, false => user blurred
    /*
     * state is always blur if disabled
     * state is focused/blurred based on [controllable focused] (if set) and fallback to [uncontrollable focused]
     */
    const focusedFn : boolean = !isDisabled && (props.focused /*controllable*/ ?? focusDn.current /*uncontrollable*/);
    
    
    
    // states:
    const [focused, setFocused, animation, {handleAnimationStart, handleAnimationEnd, handleAnimationCancel}] = useAnimatingState<boolean, TElement>({
        initialState  : focusedFn,
        animationName : /((^|[^a-z])(focus|blur)|([a-z])(Focus|Blur))(?![a-z])/,
    });
    
    
    
    // update state:
    if (focused !== focusedFn) { // change detected => apply the change & start animating
        setFocused(focusedFn);   // remember the last change
    } // if
    
    
    
    // resets:
    if (focusDn.current && !isDisabled) {
        focusDn.current = false; // lost focus because the control is disabled
    } // if
    
    
    
    // handlers:
    const handleFocus   = useEvent<React.FocusEventHandler<TElement>>((event) => {
        // conditions:
        if (supportsHasPseudoClass()) {
            if (!event.currentTarget.matches(selectorFocusVisibleWithin)) return; // not :focus-visible-within => supporess the actual focus
        }
        else {
            if (!event.currentTarget.matches(':focus-visible') && !event.currentTarget.querySelector(':focus-visible')) return; // not :focus-visible-within => supporess the actual focus
        } // if
        
        
        
        // watchdog the *uncontrollable* focus state:
        focusDn.current = true;
        
        // update state:
        if (!isControllableFocused) setFocused(!isDisabled);
    });
    
    const handleBlur    = useEvent<React.FocusEventHandler<TElement>>(() => {
        // watchdog the *uncontrollable* blur state:
        focusDn.current = false;
        
        // update state:
        if (!isControllableFocused) setFocused(false);
    });
    
    const handleKeyDown = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        // conditions:
        /* note: the `code` may `undefined` on autoComplete */
        const keyCode = (event.code as string|undefined)?.toLowerCase();
        // if (!keyCode)       return; // allows [unidentified] key
        if (keyCode === 'tab') return; // ignores [tab] key
        
        
        
        handleFocus(event as unknown as React.FocusEvent<TElement, Element>);
    });
    
    
    
    // fn props:
    const state = ((): FocusableState => {
        // focusing:
        if (animation === true ) return FocusableState.Focusing;
        
        // blurring:
        if (animation === false) return FocusableState.Blurring;
        
        // fully focused:
        if (focused) return FocusableState.Focused;
        
        // fully blurred:
        return FocusableState.Blurred;
    })();
    const stateClass = ((): string|null => {
        switch (state) {
            // focusing:
            case FocusableState.Focusing: {
                // focusing by controllable prop => use class .focusing
                if (isControllableFocused) return 'focusing';
                
                // negative [tabIndex] => can't be focused by user input => treats <Control> as *wrapper* element => use class .focusing
                if ((props.tabIndex ?? 0) < 0) return 'focusing';
                
                // not [focused] but *still* animating of focusing => force to keep focusing using class .focusing
                if (!focused) return 'focusing';
                
                // otherwise use pseudo :focus-visible-within
                return null;
            };
            
            // blurring:
            case FocusableState.Blurring: {
                return 'blurring';
            };
            
            // fully focused:
            case FocusableState.Focused: {
                return 'focused';
            };
            
            // fully blurred:
            case FocusableState.Blurred: {
                if (isControllableFocused) {
                    return 'blurred'; // blurring by controllable prop => use class .blurred to kill pseudo :focus-visible-within
                }
                else {
                    return null; // discard all classes above
                } // if
            };
        } // switch
    })();
    
    
    
    // api:
    return {
        focused,
        
        state      : state,
        class      : stateClass,
        
        attributes : props.assertiveFocusable ? { 'data-assertive-focusable': true } : null,
        
        handleFocus,
        handleBlur,
        handleKeyDown,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    };
};
