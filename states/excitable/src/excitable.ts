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



// parent is     `.excited` -or-  current is     `.excited`:
export const ifExcited    = (styles: CssStyleCollection): CssRule => rule(              ':is(.excited&, &.excited)' , styles); // specificityWeight = 1 + (parent's specificityWeight)
// parent is not `.excited` -and- current is not `.excited`:
export const ifNotExcited = (styles: CssStyleCollection): CssRule => rule(':where(&):not(:is(.excited&, &.excited))', styles); // specificityWeight = 1 + (parent's specificityWeight)



export interface ExcitableStuff { excitableRule: Factory<CssRule>, excitableVars: CssVars<ExcitableVars> }
export interface ExcitableConfig {
    filterExcite ?: CssKnownProps['filter'   ]
    
    animExcite   ?: CssKnownProps['animation']
}
/**
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
     * `true`   => has excited  
     * `false`  => has normal
     * `'null'` => need to restart
     */
    const isExcited = useRef<boolean|null>(excitedFn);
    
    // manually controls the (re)render event:
    const [triggerRender] = useTriggerRender();
    
    if ((isExcited.current !== null) && (isExcited.current !== excitedFn)) { // change detected => apply the change & start animating
        isExcited.current = excitedFn; // remember the last change
        
        triggerRender(); // need to restart the animation
    } // if
    
    
    
    // handlers:
    const handleAnimationStart = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(excite)|(?<=[a-z])(Excite))(?![a-z])/.test(event.animationName)) return; // ignores animation other than excite[Foo] or booExcite[Foo]
        
        
        
        // mark the animation has started:
        isExcited.current = true;
    });
    const handleAnimationEnd   = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(excite)|(?<=[a-z])(Excite))(?![a-z])/.test(event.animationName)) return; // ignores animation other than excite[Foo] or booExcite[Foo]
        
        
        
        // mark the animation has stopped:
        if (!excitedFn) {
            isExcited.current = false; // mark the animation has stopped
            console.log('stopped!!!')
        }
        else {
            isExcited.current = null;  // mark the animation has stopped but need to restart
            
            console.log('restarting...')
            triggerRender(); // need to restart the animation
        } // if
        
        
        
        // request to stop:
        setTimeout(() => {
            onExcitedChange?.({ excited: false} as TExcitedChangeEvent);
        }, 0); // runs the 'onExcitedChange' event *next after* current event completed
    });
    const handleAnimationCancel = handleAnimationEnd;
    
    
    
    return {
        excited : excitedFn,
        
        class   : isExcited.current ? 'excited' : null,
        
        handleAnimationStart,  // animation-start  handler
        handleAnimationEnd,    // animation-end    handler
        handleAnimationCancel, // animation-cancel handler
    };
};
//#endregion excitable
