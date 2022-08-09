// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
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



/***  arriving = hover(ing) + focus(ing|ed)  ***/

// .arrived will be added after arriving-animation done:
const selectorIfArrived  = '.arrived'
// .arriving = styled arrive, :hover = native arrive:
// the .disabled, .disable are used to kill native :hover
// the .arrived, .leaving, .left are used to overwrite native :hover
const selectorIfArriving = ':is(.arriving, :is(:hover, .focused, .focusing, :focus-within:not(:is(.blurring, .blurred))):not(:is(.disabled, .disable, .arrived, .leaving, .left)))'
// .leaving will be added after loosing arrive and will be removed after leaving-animation done:
const selectorIfLeaving  = '.leaving'
// if all above are not set => left:
// optionally use .left to overwrite native :hover
const selectorIfLeft     = ':is(:not(:is(.arrived, .arriving, :is(:hover, .focused, .focusing, :focus-within:not(:is(.blurring, .blurred))):not(:is(.disabled, .disable)), .leaving)), .left)'



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
    
    
    
    // states:
    const [arrived,   setArrived  ] = useState<boolean>(props.arrived ?? false); // true => arrived, false => left
    const [animating, setAnimating] = useState<boolean|null>(null);              // null => no-animation, true => arriving-animation, false => leaving-animation
    
    const [hoverDn,   setHoverDn  ] = useState<boolean>(false);                  // uncontrollable (dynamic) state: true => user hovered, false => user left
    
    
    
    // resets:
    if (hoverDn && (!propEnabled || isControllableArrived)) {
        setHoverDn(false); // lost hover because the control is disabled or controllable [arrived] is set, when the control is re-enabled => still lost hover
    } // if
    
    
    
    /*
     * state is always left if disabled
     * state is arrived/left based on [controllable arrived] (if set) and fallback to ([uncontrollable hovered] || [uncontrollable focused])
     */
    const arrivedFn : boolean = propEnabled && (props.arrived /*controllable*/ ?? (hoverDn /*uncontrollable*/ || focusableState.focused /*uncontrollable*/));
    
    if (arrived !== arrivedFn) { // change detected => apply the change & start animating
        setArrived(arrivedFn);   // remember the last change
        setAnimating(arrivedFn); // start arriving-animation/leaving-animation
    } // if
    
    
    
    // handlers:
    const handleMouseEnter   = useEvent<React.MouseEventHandler<TElement>>(() => {
        // conditions:
        if (!propEnabled)          return; // control is disabled => no response required
        if (isControllableArrived) return; // controllable [arrived] is set => no uncontrollable required
        
        
        
        setHoverDn(true);
    }, [propEnabled, isControllableArrived]);
    
    const handleMouseLeave   = useEvent<React.MouseEventHandler<TElement>>(() => {
        // conditions:
        if (!propEnabled)          return; // control is disabled => no response required
        if (isControllableArrived) return; // controllable [arrived] is set => no uncontrollable required
        
        
        
        setHoverDn(false);
    }, [propEnabled, isControllableArrived]);
    
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(arrive|leave)|(?<=[a-z])(Arrive|Leave))(?![a-z])/.test(event.animationName)) return; // ignores animation other than (arrive|leave)[Foo] or boo(Arrive|Leave)[Foo]
        
        
        
        // clean up finished animation
        
        setAnimating(null); // stop arriving-animation/leaving-animation
    }, []);
    
    
    
    return {
        arrived,
        
        class  : ((): string|null => {
            // arriving:
            if (animating === true) {
                // arriving by controllable prop => use class .arriving
                if (isControllableArrived) return 'arriving';
                
                // otherwise use a combination of :hover || (.focused || .focusing || :focus)
                return null;
            } // if
            
            // leaving:
            if (animating === false) return 'leaving';
            
            // fully arrived:
            if (arrived) return 'arrived';
            
            // fully left:
            if (isControllableArrived) {
                return 'left'; // arriving by controllable prop => use class .left to kill [:hover || (.focused || .focusing || :focus)]
            }
            else {
                return null; // discard all classes above
            } // if
        })(),
        
        handleMouseEnter,
        handleMouseLeave,
        handleAnimationEnd,
    };
};
//#endregion interactable
