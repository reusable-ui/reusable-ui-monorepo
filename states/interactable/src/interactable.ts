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
    // Hooks:
    FocusableApi,
}                           from '@reusable-ui/focusable'           // A capability of UI to be focused.
import {
    // Utilities:
    isUnhoveringSelector,
    isHoveringOrHoveredSelector,
    
    ifHovered,
    ifUnhovered,
    ifHovering,
    ifUnhovering,
    ifHoveringOrHovered,
    ifUnhoveringOrUnhovered,
}                           from '@reusable-ui/hover-state'         // Adds hover/unhover functionality to UI components, with transition animations and semantic styling hooks.



/**
 * @deprecated - Use `HoverStateVars` instead.
 */
export interface InteractableVars {
    filter : any
    
    anim   : any
}
const [interactableVars] = cssVars<InteractableVars>({ prefix: 'in', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names

{
    const {animationRegistry: {registerFilter, registerAnim}} = usesAnimation();
    registerFilter(interactableVars.filter);
    registerAnim(interactableVars.anim);
}



/**
 * @deprecated - Use `ifHovered` instead.
 */
export const ifArrived       = ifHovered;

/**
 * @deprecated - Use `ifHovering` instead.
 */
export const ifArriving      = ifHovering;

/**
 * @deprecated - Use `ifUnhovering` instead.
 */
export const ifLeaving       = ifUnhovering;

/**
 * @deprecated - Use `ifUnhovered` instead.
 */
export const ifLeaved        = ifUnhovered;

/**
 * @deprecated - Use `ifHoveringOrHovered` instead.
 */
export const ifArrive        = ifHoveringOrHovered;

/**
 * @deprecated - Use `ifUnhoveringOrUnhovered` instead.
 */
export const ifLeave         = ifUnhoveringOrUnhovered;

/**
 * @deprecated - Use `rule([isHoveringOrHoveredSelector, isUnhoveringSelector], styles)` instead.
 */
export const ifArriveLeaving = (styles: CssStyleCollection): CssRule => rule([isHoveringOrHoveredSelector, isUnhoveringSelector], styles);



/**
 * @deprecated - Use `CssHoverState` instead.
 */
export interface InteractableStuff { interactableRule: Factory<CssRule>, interactableVars: CssVars<InteractableVars> }

/**
 * @deprecated - Use `CssHoverStateOptions` instead.
 */
export interface InteractableConfig {
    filterArrive ?: CssKnownProps['filter'   ]
    
    animArrive   ?: CssKnownProps['animation']
    animLeave    ?: CssKnownProps['animation']
}
/**
 * @deprecated - Use `usesHoverState` instead.
 * 
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



/**
 * @deprecated - Use `HoverStateProps` instead.
 */
export interface InteractableProps {
    // states:
    arrived ?: boolean
    
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
 * @deprecated - Use `HoverPhase` instead.
 */
export const enum InteractableState {
    /**
     * Note: We use `Leaved` instead of `Left` to distinguish between `Left|Right|Top|Bottom` vs verb-3 of `Leave` => `Left`.
     */
    Leaved   = 0,
    Leaving  = 1,
    Arriving = 2,
    Arrived  = 3,
}

/**
 * @deprecated - Use `HoverBehaviorState` instead.
 */
export interface InteractableApi<TElement extends Element = HTMLElement> {
    arrived               : boolean
    
    state                 : InteractableState
    class                 : string|null
    
    handleMouseEnter      : React.MouseEventHandler<TElement>
    handleMouseLeave      : React.MouseEventHandler<TElement>
    
    handleAnimationStart  : React.AnimationEventHandler<TElement>
    handleAnimationEnd    : React.AnimationEventHandler<TElement>
    handleAnimationCancel : React.AnimationEventHandler<TElement>
}

/**
 * @deprecated - Use `useHoverBehaviorState` instead.
 */
export const useInteractable = <TElement extends Element = HTMLElement>(props: InteractableProps, focusableApi: FocusableApi<TElement>): InteractableApi<TElement> => {
    // states:
    const {focused} = focusableApi;
    
    
    
    // Resolve whether the component is disabled:
    const isDisabled            = useDisabledState(props as Parameters<typeof useDisabledState>[0]);
    
    const isControllableArrived = (props.arrived !== undefined);
    
    
    
    // fn states:
    const hoverDn = useRef<boolean>(false); // uncontrollable (dynamic) state: true => user hovered, false => user left
    /*
     * state is always left if disabled
     * state is arrived/left based on [controllable arrived] (if set) and fallback to ([uncontrollable hovered] || [uncontrollable focused])
     */
    const arrivedFn : boolean = !isDisabled && (props.arrived /*controllable*/ ?? (hoverDn.current /*uncontrollable*/ || focused /*uncontrollable*/));
    
    
    
    // states:
    const [arrived, setArrived, animation, {handleAnimationStart, handleAnimationEnd, handleAnimationCancel}] = useAnimatingState<boolean, TElement>({
        initialState  : arrivedFn,
        animationName : /((^|[^a-z])(arrive|leave)|([a-z])(Arrive|Leave))(?![a-z])/,
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
        if (!isControllableArrived) setArrived(!isDisabled);
    });
    
    const handleMouseLeave = useEvent<React.MouseEventHandler<TElement>>(() => {
        // watchdog the *uncontrollable* leave state:
        hoverDn.current = false;
        
        // update state:
        if (!isControllableArrived) setArrived(!isDisabled && focused);
    });
    
    
    
    // fn props:
    const state = ((): InteractableState => {
        // arriving:
        if (animation === true ) return InteractableState.Arriving;
        
        // leaving:
        if (animation === false) return InteractableState.Leaving;
        
        // fully arrived:
        if (arrived) return InteractableState.Arrived;
        
        // fully left (leaved):
        return InteractableState.Leaved;
    })();
    const stateClass = ((): string|null => {
        switch (state) {
            // arriving:
            case InteractableState.Arriving: {
                /*
                // arriving by controllable prop => use class .arriving
                if (isControllableArrived) return 'arriving';
                
                // not [arrived] but *still* animating of arriving => force to keep arriving using class .arriving
                if (!arrived) return 'arriving';
                
                // otherwise use a combination of :hover || (.focused || .focusing || :focus-visible-within)
                return null;
                */
                
                // blinky free when not [arrived] but *still* animating of arriving:
                return 'arriving';
            };
            
            // leaving:
            case InteractableState.Leaving: {
                return 'leaving';
            };
            
            // fully arrived:
            case InteractableState.Arrived: {
                return 'arrived';
            };
            
            // fully left (leaved):
            case InteractableState.Leaved: {
                if (isControllableArrived) {
                    return 'leaved'; // arriving by controllable prop => use class .leaved to kill [:hover || (.focused || .focusing || :focus-visible-within)]
                }
                else {
                    return null; // discard all classes above
                } // if
            };
        } // switch
    })();
    
    
    
    // api:
    return {
        arrived,
        
        state : state,
        class : stateClass,
        
        handleMouseEnter,
        handleMouseLeave,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    };
};
