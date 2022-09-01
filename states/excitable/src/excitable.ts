// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
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
    useTriggerRender,
    useEvent,
    EventHandler,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui features:
import {
    // hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'       // animation stuff of UI



// hooks:

// states:

//#region excitable
export interface ExcitableVars {
    filter : any
    anim   : any
}
const [excitableVars] = cssVars<ExcitableVars>();

{
    const {animationRegistry: {registerFilter, registerAnim}} = usesAnimation();
    registerFilter(excitableVars.filter);
    registerAnim(excitableVars.anim);
}



// ancestor(s) not `.excited` -and- current not `.excited`:
export const ifNotExcited = (styles: CssStyleCollection): CssRule => rule('&:not(:is(.excited&, &.excited))', styles);
// ancestor(s) is  `.excited` -or-  current is  `.excited`:
export const ifExcited    = (styles: CssStyleCollection): CssRule => rule(      ':is(.excited&, &.excited)' , styles);



export interface ExcitableStuff { excitableRule: Factory<CssRule>, excitableVars: CssVars<ExcitableVars> }
export interface ExcitableConfig {
    filterExcite ?: CssKnownProps['filter'   ]
    
    animExcite   ?: CssKnownProps['animation']
}
/**
 * Adds a capability of UI to highlight itself to attract user's attention.
 * @param config  A configuration of `excitableRule`.
 * @returns A `ExcitableStuff` represents a excitable state.
 */
export const usesExcitable = (config?: ExcitableConfig): ExcitableStuff => {
    return {
        excitableRule: () => style({
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



export interface ExcitedChangeEvent {
    // states:
    excited : boolean
}
export interface ExcitableProps<TExcitedChangeEvent extends ExcitedChangeEvent = ExcitedChangeEvent>
    extends
        // states:
        Partial<Pick<TExcitedChangeEvent, 'excited'>>
{
}



export interface ToggleExcitableProps<TExcitedChangeEvent extends ExcitedChangeEvent = ExcitedChangeEvent>
    extends
        // states:
        ExcitableProps<TExcitedChangeEvent>
{
    // states:
    onExcitedChange ?: EventHandler<TExcitedChangeEvent>
}
export const useToggleExcitable = <TElement extends Element = HTMLElement, TExcitedChangeEvent extends ExcitedChangeEvent = ExcitedChangeEvent>(props: ToggleExcitableProps<TExcitedChangeEvent>) => {
    // props:
    const {
        // states:
        excited,
        onExcitedChange,
    } = props;
    
    
    
    /*
     * the state is excited/normal based on [controllable excited]
     */
    const excitedFn : boolean = (excited /*controllable*/ ?? false);
    
    
    
    // states:
    // local storages without causing to (re)render, we need to manual control the (re)render event:
    /**
     * `true`  => was excited  
     * `false` => was normal
     */
    const wasExcited = useRef<boolean|null>(excitedFn);
    
    // manually controls the (re)render event:
    const [triggerRender] = useTriggerRender();
    
    
    
    const asyncTriggerRender = useRef<ReturnType<typeof requestIdleCallback>|undefined>(undefined);
    useEffect(() => {
        // cleanups:
        return () => {
            // cancel out previously asyncTriggerRender (if any):
            if (asyncTriggerRender.current) cancelIdleCallback(asyncTriggerRender.current);
        };
    }, []); // runs once on startup
    
    
    
    if (wasExcited.current !== excitedFn) { // change detected => apply the change & start animating
        const continueToRun = excitedFn && (wasExcited.current === null);
        if (continueToRun) {
            // cancel out previously asyncTriggerRender (if any):
            if (asyncTriggerRender.current) cancelIdleCallback(asyncTriggerRender.current);
            
            
            
            // wait until the non-excited `<Component>` has been applied by browser ui, then re-render the excited `<Component>`
            asyncTriggerRender.current = requestIdleCallback(() => {
                wasExcited.current = excitedFn; // remember the last change
                triggerRender(); // re-render the excited `<Component>`
            });
        }
        else {
            wasExcited.current = excitedFn; // remember the last change
        } // if
    } // if
    
    
    
    // handlers:
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(excite)|(?<=[a-z])(Excite))(?![a-z])/.test(event.animationName)) return; // ignores animation other than excite[Foo] or booExcite[Foo]
        
        
        
        // clean up finished animation
        
        const continueToRun = wasExcited.current;
        wasExcited.current = null; // mark the animation need to restart
        
        Promise.resolve().then(() => { // trigger the event after the <Component> has finished rendering (for controllable <Component>)
            onExcitedChange?.({ excited: false} as TExcitedChangeEvent); // request to stop
        });
        if (continueToRun) {
            triggerRender(); // need to restart the animation
        } // if
    });
    
    
    
    return {
        excited : wasExcited.current,
        
        class   : wasExcited.current ? 'excited' : null,
        
        handleAnimationEnd,
    };
};
//#endregion excitable
