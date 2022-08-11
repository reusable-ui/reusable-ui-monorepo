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
    
    CssSelectorCollection,
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

// reusable-ui features:
import {
    // hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'       // animation stuff of UI

// reusable-ui states:
import {
    // hooks:
    ifActived,
    ifActivating,
    ifPassivating,
    ifPassived,
}                           from '@reusable-ui/activatable'     // a capability of UI to be highlighted/selected/activated



// hooks:

// states:

//#region checkable
export interface CheckableVars {
    filterIn     : any
    filterOut    : any
    
    transformIn  : any
    transformOut : any
    
    anim         : any
}
const [checkableVars] = cssVars<CheckableVars>();

{
    const {animationRegistry: {registerFilter, registerTransform, registerAnim}} = usesAnimation();
    registerFilter(checkableVars.filterIn);
    registerFilter(checkableVars.filterOut);
    registerTransform(checkableVars.transformIn);
    registerTransform(checkableVars.transformOut);
    registerAnim(checkableVars.anim);
}



export interface CheckableStuff { checkableRule: Factory<CssRule>, checkableVars: CssVars<CheckableVars> }
export interface CheckableConfig {
    filterCheck    ?: CssKnownProps['filter'   ]
    filterClear    ?: CssKnownProps['filter'   ]
    
    transformCheck ?: CssKnownProps['transform']
    transformClear ?: CssKnownProps['transform']
    
    animCheck      ?: CssKnownProps['animation']
    animClear      ?: CssKnownProps['animation']
}
/**
 * Adds a capability of UI to be checked.
 * @param config  A configuration of `checkableRule`.
 * @returns A `CheckableStuff` represents a checkable state.
 */
export const usesCheckable = (config?: CheckableConfig, checkableElm: CssSelectorCollection = '&'): CheckableStuff => {
    return {
        checkableRule: () => style({
            ...states([
                ifActived({
                    ...rule(checkableElm, {
                        ...vars({
                            [checkableVars.filterIn    ] : config?.filterCheck,
                            
                            [checkableVars.transformIn ] : config?.transformCheck,
                        }),
                    }),
                }),
                ifActivating({
                    ...rule(checkableElm, {
                        ...vars({
                            [checkableVars.filterIn    ] : config?.filterCheck,
                            [checkableVars.filterOut   ] : config?.filterClear,
                            
                            [checkableVars.transformIn ] : config?.transformCheck,
                            [checkableVars.transformOut] : config?.transformClear,
                            
                            [checkableVars.anim        ] : config?.animCheck,
                        }),
                    }),
                }),
                
                ifPassivating({
                    ...rule(checkableElm, {
                        ...vars({
                            [checkableVars.filterIn    ] : config?.filterCheck,
                            [checkableVars.filterOut   ] : config?.filterClear,
                            
                            [checkableVars.transformIn ] : config?.transformCheck,
                            [checkableVars.transformOut] : config?.transformClear,
                            
                            [checkableVars.anim        ] : config?.animClear,
                        }),
                    }),
                }),
                ifPassived({
                    ...rule(checkableElm, {
                        ...vars({
                            [checkableVars.filterOut   ] : config?.filterClear,
                            
                            [checkableVars.transformOut] : config?.transformClear,
                        }),
                    }),
                }),
            ]),
        }),
        checkableVars,
    };
};
//#endregion checkable
