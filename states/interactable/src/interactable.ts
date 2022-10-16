// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
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
import {
    // hooks:
    useAnimatingState,
}                           from '@reusable-ui/animating-state' // a hook for creating animating state

// reusable-ui features:
import {
    // hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'       // animation stuff of UI

// reusable-ui states:
import type {
    // hooks:
    useFocusable,
}                           from '@reusable-ui/focusable'       // a capability of UI to be focused



// hooks:

// states:

//#region interactable
export interface InteractableVars {
    filter : any
    
    anim   : any
}
const [interactableVars] = cssVars<InteractableVars>();

{
    const {animationRegistry: {registerFilter, registerAnim}} = usesAnimation();
    registerFilter(interactableVars.filter);
    registerAnim(interactableVars.anim);
}



/*
    polyfill:
    :focus-visible-within = :is(:focus-visible, :focus:where([data-assertive-focusable]), :has(:focus-visible, :focus:where([data-assertive-focusable])))
*/

/***  arriving = hover(ing) + focus(ing|ed)  ***/

// .arrived will be added after arriving-animation done:
const selectorIfArrived  = '.arrived'
// .arriving = styled arrive, :hover = native arrive:
// the .disabled, .disable are used to kill native :hover
// the .arrived, .leaving, .left are used to overwrite native :hover
const selectorIfArriving = ':is(.arriving, :is(:hover, .focused, .focusing, :is(:focus-visible, :focus:where([data-assertive-focusable]), :has(:focus-visible, :focus:where([data-assertive-focusable]))):not(:is(.blurring, .blurred))):not(:is(.disabled, .disable, .arrived, .leaving, .left)))'
// .leaving will be added after loosing arrive and will be removed after leaving-animation done:
const selectorIfLeaving  = '.leaving'
// if all above are not set => left:
// optionally use .left to overwrite native :hover
const selectorIfLeft     = ':is(:not(:is(.arrived, .arriving, :is(:hover, .focused, .focusing, :is(:focus-visible, :focus:where([data-assertive-focusable]), :has(:focus-visible, :focus:where([data-assertive-focusable]))):not(:is(.blurring, .blurred))):not(:is(.disabled, .disable)), .leaving)), .left)'



export const ifArrived       = (styles: CssStyleCollection): CssRule => rule(selectorIfArrived , styles);
export const ifArriving      = (styles: CssStyleCollection): CssRule => rule(selectorIfArriving, styles);
export const ifLeaving       = (styles: CssStyleCollection): CssRule => rule(selectorIfLeaving , styles);
export const ifLeft          = (styles: CssStyleCollection): CssRule => rule(selectorIfLeft    , styles);

export const ifArrive        = (styles: CssStyleCollection): CssRule => rule([selectorIfArriving, selectorIfArrived                                   ], styles);
export const ifLeave         = (styles: CssStyleCollection): CssRule => rule([                                       selectorIfLeaving, selectorIfLeft], styles);
export const ifArriveLeaving = (styles: CssStyleCollection): CssRule => rule([selectorIfArriving, selectorIfArrived, selectorIfLeaving                ], styles);



export interface InteractableStuff { interactableRule: Factory<CssRule>, interactableVars: CssVars<InteractableVars> }
export interface InteractableConfig {
    filterArrive ?: CssKnownProps['filter'   ]
    
    animArrive   ?: CssKnownProps['animation']
    animLeave    ?: CssKnownProps['animation']
}
/**
 * Adds an interactive feel to a UI.
 * @param config  A configuration of `interactableRule`.
 * @returns A `InteractableStuff` represents an interactable state.
 */
export const usesInteractable = (config?: InteractableConfig): InteractableStuff => {
    return {
        interactableRule: () => style({
            // animation states:
            ...states([
                ifArrived({
                    ...vars({
                        [interactableVars.filter] : config?.filterArrive,
                    }),
                }),
                ifArriving({
                    ...vars({
                        [interactableVars.filter] : config?.filterArrive,
                        [interactableVars.anim  ] : config?.animArrive,
                    }),
                }),
                ifLeaving({
                    ...vars({
                        [interactableVars.filter] : config?.filterArrive,
                        [interactableVars.anim  ] : config?.animLeave,
                    }),
                }),
            ]),
        }),
        interactableVars,
    };
};



export interface InteractableProps
    extends
        // states:
        Partial<Pick<AccessibilityProps, 'enabled'|'inheritEnabled'>>
{
    // states:
    arrived ?: boolean
}
export const useInteractable = <TElement extends Element = HTMLElement>(props: InteractableProps, focusableState: Pick<ReturnType<typeof useFocusable<TElement>>, 'focused'>) => {
    // fn props:
    const propEnabled           = usePropEnabled(props);
    const isControllableArrived = (props.arrived !== undefined);
    
    
    
    // fn states:
    const hoverDn = useRef<boolean>(false);// uncontrollable (dynamic) state: true => user hovered, false => user left
    /*
     * state is always left if disabled
     * state is arrived/left based on [controllable arrived] (if set) and fallback to ([uncontrollable hovered] || [uncontrollable focused])
     */
    const arrivedFn : boolean = propEnabled && (props.arrived /*controllable*/ ?? (hoverDn.current /*uncontrollable*/ || focusableState.focused /*uncontrollable*/));
    
    
    
    // states:
    const [arrived, setArrived, animation, handleAnimationStart, handleAnimationEnd] = useAnimatingState<boolean, TElement>({
        initialState  : arrivedFn,
        animationName : /((?<![a-z])(arrive|leave)|(?<=[a-z])(Arrive|Leave))(?![a-z])/,
    });
    
    
    
    // update state:
    if (arrived !== arrivedFn) { // change detected => apply the change & start animating
        setArrived(arrivedFn);   // remember the last change
    } // if
    
    
    
    // handlers:
    const handleMouseEnter = useEvent<React.MouseEventHandler<TElement>>(() => {
        // watchdog the *uncontrollable* hover state:
        hoverDn.current = true;
        
        // update state:
        if (!isControllableArrived) setArrived(propEnabled);
    });
    
    const handleMouseLeave = useEvent<React.MouseEventHandler<TElement>>(() => {
        // watchdog the *uncontrollable* leave state:
        hoverDn.current = false;
        
        // update state:
        if (!isControllableArrived) setArrived(propEnabled && focusableState.focused);
    });
    
    
    
    // interfaces:
    return {
        arrived,
        
        class  : ((): string|null => {
            // arriving:
            if (animation === true) {
                // arriving by controllable prop => use class .arriving
                if (isControllableArrived) return 'arriving';
                
                // otherwise use a combination of :hover || (.focused || .focusing || :focus-visible-within)
                return null;
            } // if
            
            // leaving:
            if (animation === false) return 'leaving';
            
            // fully arrived:
            if (arrived) return 'arrived';
            
            // fully left:
            if (isControllableArrived) {
                return 'left'; // arriving by controllable prop => use class .left to kill [:hover || (.focused || .focusing || :focus-visible-within)]
            }
            else {
                return null; // discard all classes above
            } // if
        })(),
        
        handleMouseEnter,
        handleMouseLeave,
        
        handleAnimationStart,
        handleAnimationEnd,
    };
};
//#endregion interactable
