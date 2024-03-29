// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssKnownProps,
    CssRule,
    
    
    
    // writes css in javascript:
    states,
    fallback,
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui features:
import {
    // hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'       // animation stuff of UI

// reusable-ui states:
import {
    // hooks:
    ifActivated,
    ifActivating,
    ifPassivating,
    ifPassivated,
}                           from '@reusable-ui/activatable'     // a capability of UI to be highlighted/selected/activated



// hooks:

// states:

//#region checkable
export interface CheckableVars {
    filterIn     : any
    filterOut    : any
    
    transformIn  : any
    transformOut : any
    
    
    
    /**
     * final filter for the check indicator element.
     */
    filter       : any
    
    /**
     * final transform for the check indicator element.
     */
    transform    : any
    
    /**
     * final animation for the check indicator element.
     */
    anim         : any
}
const [checkableVars] = cssVars<CheckableVars>({ prefix: 'ch', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



export interface CheckableStuff { checkableRule: Factory<CssRule>, checkableVars: CssVars<CheckableVars> }
export interface CheckableConfig {
    checkFilterIn     ?: CssKnownProps['filter'   ]
    checkFilterOut    ?: CssKnownProps['filter'   ]
    
    checkTransformIn  ?: CssKnownProps['transform']
    checkTransformOut ?: CssKnownProps['transform']
    
    checkAnimIn       ?: CssKnownProps['animation']
    checkAnimOut      ?: CssKnownProps['animation']
}
/**
 * Adds a capability of UI to be checked.
 * @param config  A configuration of `checkableRule`.
 * @returns A `CheckableStuff` represents a checkable state.
 */
export const usesCheckable = (config?: CheckableConfig): CheckableStuff => {
    // dependencies:
    
    // features:
    const {animationRule, animationVars} = usesAnimation();
    
    
    
    return {
        checkableRule: () => style({
            // features:
            ...animationRule(),
            
            
            
            // reset functions:
            // declare default values at lowest specificity:
            ...fallback({
                ...vars({
                    [checkableVars.filterIn    ] : animationVars.filterNone,
                    [checkableVars.filterOut   ] : animationVars.filterNone,
                    
                    [checkableVars.transformIn ] : animationVars.transformNone,
                    [checkableVars.transformOut] : animationVars.transformNone,
                    
                    [checkableVars.anim        ] : animationVars.animNone,
                }),
            }),
            
            
            
            // animation states:
            ...states([
                ifActivated({
                    ...vars({
                        [checkableVars.filterIn    ] : config?.checkFilterIn,
                        
                        [checkableVars.transformIn ] : config?.checkTransformIn,
                    }),
                }),
                ifActivating({
                    ...vars({
                        [checkableVars.filterIn    ] : config?.checkFilterIn,
                        [checkableVars.filterOut   ] : config?.checkFilterOut,
                        
                        [checkableVars.transformIn ] : config?.checkTransformIn,
                        [checkableVars.transformOut] : config?.checkTransformOut,
                        
                        [checkableVars.anim        ] : config?.checkAnimIn,
                    }),
                }),
                
                ifPassivating({
                    ...vars({
                        [checkableVars.filterIn    ] : config?.checkFilterIn,
                        [checkableVars.filterOut   ] : config?.checkFilterOut,
                        
                        [checkableVars.transformIn ] : config?.checkTransformIn,
                        [checkableVars.transformOut] : config?.checkTransformOut,
                        
                        [checkableVars.anim        ] : config?.checkAnimOut,
                    }),
                }),
                ifPassivated({
                    ...vars({
                        [checkableVars.filterOut   ] : config?.checkFilterOut,
                        
                        [checkableVars.transformOut] : config?.checkTransformOut,
                    }),
                }),
            ]),
            
            
            
            // compositions:
            ...vars({
                [checkableVars.filter   ] : [[
                    // combining: filter1 * filter2 * filter3 ...
                    
                    // front-to-back order, the first is processed first, the last is processed last
                    
                    checkableVars.filterIn,
                    checkableVars.filterOut,
                ]],
                
                [checkableVars.transform] : [[
                    // combining: transform1 * transform2 * transform3 ...
                    
                    // back-to-front order, the last is processed first, the first is processed last
                    
                    checkableVars.transformIn,
                    checkableVars.transformOut,
                ]],
            }),
        }),
        checkableVars,
    };
};
//#endregion checkable
