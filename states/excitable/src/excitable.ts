// React:
import {
    // React:
    default as React,
    
    
    
    // Hooks:
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
    
    
    
    // Writes css in javascript:
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
    useTriggerRender,
    useEvent,
    EventHandler,
    useMountedFlag,
    useScheduleTriggerEvent,
}                           from '@reusable-ui/hooks'               // React helper hooks.
import {
    // Hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'           // Animation stuff of UI.

// Reusable-ui features:
import {
    // Utilities:
    ifExcited,
    ifNotExcited,
}                           from '@reusable-ui/excite-state'        // Adds excitement (attention grabbing) functionality to UI components, with an attention-triggering animation and semantic styling hooks.



/**
 * @deprecated - Use `ExciteStateVars` instead.
 */
export interface ExcitableVars {
    filter : any
    
    anim   : any
}
const [excitableVars] = cssVars<ExcitableVars>({ prefix: 'ex', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names

{
    const {animationRegistry: {registerFilter, registerAnim}} = usesAnimation();
    registerFilter(excitableVars.filter);
    registerAnim(excitableVars.anim);
}



// Not deprecated:
export {
    ifExcited,
    ifNotExcited,
}



/**
 * @deprecated - Use `CssExciteState` instead.
 */
export interface ExcitableStuff { excitableRule: Factory<CssRule>, excitableVars: CssVars<ExcitableVars> }

/**
 * @deprecated - Use `CssExciteStateOptions` instead.
 */
export interface ExcitableConfig {
    filterExcite ?: CssKnownProps['filter'   ]
    
    animExcite   ?: CssKnownProps['animation']
}
/**
 * @deprecated - Use `usesExciteState` instead.
 * 
 * Adds a capability of UI to highlight itself to attract user's attention.
 * @param config  A configuration of `excitableRule`.
 * @returns An `ExcitableStuff` represents an excitable state.
 */
export const usesExcitable = (config?: ExcitableConfig): ExcitableStuff => {
    return {
        excitableRule: () => style({
            // animation states:
            ...states([
                ifExcited({
                    ...vars({
                        [excitableVars.filter] : config?.filterExcite,
                        [excitableVars.anim  ] : config?.animExcite,
                    }),
                }),
            ]),
        }),
        excitableVars,
    };
};



/**
 * @deprecated - No longer needed.
 */
export interface ExcitedChangeEvent {
    // states:
    excited : boolean
}
/**
 * @deprecated - Use `ExciteStateProps` instead.
 */
export interface ExcitableProps<TExcitedChangeEvent extends ExcitedChangeEvent = ExcitedChangeEvent>
    extends
        // states:
        Partial<Pick<TExcitedChangeEvent,
            |'excited'
        >>
{
}

/**
 * @deprecated - No longer needed.
 */
export const enum ExcitableState {
    Unexcited = 0,
    Continue  = 1,
    Excited   = 2,
}

/**
 * @deprecated - Use `ExciteBehaviorState` instead.
 */
export interface ExcitableApi<TElement extends Element = HTMLElement> {
    excited               : boolean
    
    state                 : ExcitableState
    class                 : string|null
    
    handleAnimationStart  : React.AnimationEventHandler<TElement>
    handleAnimationEnd    : React.AnimationEventHandler<TElement>
    handleAnimationCancel : React.AnimationEventHandler<TElement>
}

/**
 * @deprecated - Use `useExciteBehaviorState` instead.
 */
export const useExcitable = <TElement extends Element = HTMLElement, TExcitedChangeEvent extends ExcitedChangeEvent = ExcitedChangeEvent>(props: ExcitableProps<TExcitedChangeEvent>): ExcitableApi<TElement> => {
    // fn props:
    const propExcited = props.excited ?? false;
    
    
    
    // fn states:
    /*
     * state is excited/unexcited based on [controllable excited]
     * [uncontrollable excited] is not supported
     */
    const excitedFn : ExcitableState = propExcited /*controllable*/ ? ExcitableState.Excited : ExcitableState.Unexcited;
    
    
    
    // states:
    const isMounted = useMountedFlag();
    
    // local storages without causing to (re)render, we need to manual control the (re)render event:
    /**
     * `true`  => has excited  
     * `false` => has normal
     * `null`  => need to restart
     */
    const stateRef = useRef<ExcitableState>(excitedFn);
    
    // manually controls the (re)render event:
    const [triggerRender] = useTriggerRender();
    
    
    
    // update state:
    if (stateRef.current !== ExcitableState.Continue) {
        if (stateRef.current !== excitedFn) { // change detected => apply the change & start animating
            stateRef.current = excitedFn; // remember the last change
            triggerRender(); // need to apply the animation
        } // if
    } // if
    
    
    
    // dom effects:
    useEffect(() => {
        // conditions:
        if (stateRef.current !== ExcitableState.Continue) return; // only process `Continue` (need to restart the animation)
        
        
        
        // setups:
        requestAnimationFrame(() => { // need to *briefly* apply the *un-animated* before continue to *re-animated*
            // conditions:
            if (!isMounted.current) return;
            
            
            
            // actions:
            stateRef.current = ExcitableState.Excited; // restart
            triggerRender(); // need to restart the animation
        });
    }); // no dependency-list, runs every re-render
    
    
    
    // handlers:
    const handleAnimationStart  = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((^|[^a-z])(excite)|([a-z])(Excite))(?![a-z])/.test(event.animationName)) return; // ignores animation other than excite[Foo] or booExcite[Foo]
        
        
        
        // mark the animation has (re)started -- if was marked as `ExcitableState.Continue`:
        stateRef.current = ExcitableState.Excited;
    });
    const handleAnimationEnd    = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((^|[^a-z])(excite)|([a-z])(Excite))(?![a-z])/.test(event.animationName)) return; // ignores animation other than excite[Foo] or booExcite[Foo]
        
        
        
        // mark the animation has stopped:
        if (!propExcited) {
            stateRef.current = ExcitableState.Unexcited; // mark the animation has stopped
        }
        else {
            stateRef.current = ExcitableState.Continue;  // mark the animation has stopped but need to restart
            triggerRender(); // need to restart the animation
        } // if
    });
    const handleAnimationCancel = handleAnimationEnd;
    
    
    
    // api:
    return {
        excited : propExcited,
        
        state   : stateRef.current,
        class   : (stateRef.current === ExcitableState.Excited) ? 'excited' : null, // `null` for `ExcitableState.Unexcited` and `ExcitableState.Continue`
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    };
};



/**
 * @deprecated - No longer needed.
 */
export interface ControllableExcitableProps<TExcitedChangeEvent extends ExcitedChangeEvent = ExcitedChangeEvent>
    extends
        // states:
        ExcitableProps<TExcitedChangeEvent>
{
    // states:
    onExcitedChange ?: EventHandler<TExcitedChangeEvent>
}
/**
 * @deprecated - No longer needed.
 */
export const useControllableExcitable = <TElement extends Element = HTMLElement, TExcitedChangeEvent extends ExcitedChangeEvent = ExcitedChangeEvent>(props: ControllableExcitableProps<TExcitedChangeEvent>, excitableApi: ExcitableApi<TElement>): void => {
    // states:
    const {state} = excitableApi;
    
    
    
    // events:
    const scheduleTriggerEvent = useScheduleTriggerEvent();
    if (state === ExcitableState.Continue) {
        const {
            onExcitedChange,
        } = props;
        
        // request to stop:
        if (onExcitedChange) scheduleTriggerEvent(() => { // runs the `onExcitedChange` event *next after* current macroTask completed
            // fire `onExcitedChange` react event:
            onExcitedChange?.({ excited: false} as TExcitedChangeEvent);
        });
    } // if
};
