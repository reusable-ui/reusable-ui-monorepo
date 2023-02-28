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
    fallbacks,
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // animation stuff of UI:
    usesAnimation,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// states:

//#region runnable
export interface RunnableVars {
    /**
     * final animation for the progressbar element.
     */
    anim : any
}
const [runnableVars] = cssVars<RunnableVars>(); // no need to have SSR support because the variables are not shared externally (outside <ProgressBar>)



export const ifNotRunning = (styles: CssStyleCollection) => rule(':not(.running)', styles);
export const ifRunning    = (styles: CssStyleCollection) => rule(     '.running' , styles);



export interface RunnableStuff { runnableRule: Factory<CssRule>, runnableVars: CssVars<RunnableVars> }
export interface RunnableConfig {
    barAnimRunning ?: CssKnownProps['animation']
}
/**
 * Adds a capability of UI to animate to indicate a running state.
 * @param config  A configuration of `runnableRule`.
 * @returns A `RunnableStuff` represents a runnable state.
 */
export const usesRunnable = (config?: RunnableConfig): RunnableStuff => {
    // dependencies:
    
    // features:
    const {animationRule, animationVars} = usesAnimation();
    
    
    
    return {
        runnableRule: () => style({
            // features:
            ...animationRule(),
            
            
            
            // reset functions:
            // declare default values at lowest specificity:
            ...fallbacks({
                ...vars({
                    [runnableVars.anim] : animationVars.animNone,
                }),
            }),
            
            
            
            ...states([
                ifRunning({
                    ...vars({
                        [runnableVars.anim] : config?.barAnimRunning,
                    }),
                }),
            ]),
        }),
        runnableVars,
    };
};



export interface RunnableProps {
    // states:
    running ?: boolean
}
export const useRunnable = ({running}: RunnableProps) => ({
    class: running ? 'running' : null,
});
//#endregion runnable
