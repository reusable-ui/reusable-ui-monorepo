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
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    states,
    fallbacks,
    
    
    
    // styles:
    style,
    vars,
    imports,
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
    ifActivated,
    ifActivating,
    ifPassivating,
    ifPassivated,
}                           from '@reusable-ui/activatable'     // a capability of UI to be highlighted/selected/activated



// hooks:

// states:

//#region hamburgerable
export interface HamburgerableVars {
    topTransformIn  : any
    midTransformIn  : any
    btmTransformIn  : any
    
    topTransformOut : any
    midTransformOut : any
    btmTransformOut : any
    
    
    
    /**
     * final transform for the hamburger top.
     */
    topTransform    : any
    /**
     * final transform for the hamburger middle.
     */
    midTransform    : any
    /**
     * final transform for the hamburger bottom.
     */
    btmTransform    : any
    
    /**
     * final animation for the hamburger top.
     */
    topAnim         : any
    /**
     * final animation for the hamburger middle.
     */
    midAnim         : any
    /**
     * final animation for the hamburger bottom.
     */
    btmAnim         : any
}
const [hamburgerableVars] = cssVars<HamburgerableVars>();



export interface HamburgerableStuff { hamburgerableRule: Factory<CssRule>, hamburgerableVars: CssVars<HamburgerableVars> }
export interface HamburgerableConfig {
    hamburgerTopTransformIn  ?: CssKnownProps['transform']
    hamburgerMidTransformIn  ?: CssKnownProps['transform']
    hamburgerBtmTransformIn  ?: CssKnownProps['transform']
    
    hamburgerTopTransformOut ?: CssKnownProps['transform']
    hamburgerMidTransformOut ?: CssKnownProps['transform']
    hamburgerBtmTransformOut ?: CssKnownProps['transform']
    
    hamburgerTopAnimIn       ?: CssKnownProps['animation']
    hamburgerMidAnimIn       ?: CssKnownProps['animation']
    hamburgerBtmAnimIn       ?: CssKnownProps['animation']
    
    hamburgerTopAnimOut      ?: CssKnownProps['animation']
    hamburgerMidAnimOut      ?: CssKnownProps['animation']
    hamburgerBtmAnimOut      ?: CssKnownProps['animation']
}
/**
 * Uses hamburger animation.
 * @param config  A configuration of `hamburgerableRule`.
 * @returns A `HamburgerableStuff` represents a hamburgerable state.
 */
export const usesHamburgerable = (config?: HamburgerableConfig): HamburgerableStuff => {
    // dependencies:
    
    // features:
    const {animationRule, animationVars} = usesAnimation();
    
    
    
    // css vars:
    const transformNoneVars = () => vars({
        [hamburgerableVars.topTransformIn ] : animationVars.transformNone,
        [hamburgerableVars.midTransformIn ] : animationVars.transformNone,
        [hamburgerableVars.btmTransformIn ] : animationVars.transformNone,
        
        [hamburgerableVars.topTransformOut] : animationVars.transformNone,
        [hamburgerableVars.midTransformOut] : animationVars.transformNone,
        [hamburgerableVars.btmTransformOut] : animationVars.transformNone,
    });
    const transformInVars   = () => vars({
        [hamburgerableVars.topTransformIn ] : config?.hamburgerTopTransformIn,
        [hamburgerableVars.midTransformIn ] : config?.hamburgerMidTransformIn,
        [hamburgerableVars.btmTransformIn ] : config?.hamburgerBtmTransformIn,
    });
    const transformOutVars  = () => vars({
        [hamburgerableVars.topTransformOut] : config?.hamburgerTopTransformOut,
        [hamburgerableVars.midTransformOut] : config?.hamburgerMidTransformOut,
        [hamburgerableVars.btmTransformOut] : config?.hamburgerBtmTransformOut,
    });
    
    const animNoneVars      = () => vars({
        [hamburgerableVars.topAnim        ] : animationVars.animNone,
        [hamburgerableVars.midAnim        ] : animationVars.animNone,
        [hamburgerableVars.btmAnim        ] : animationVars.animNone,
    });
    const animInVars        = () => vars({
        [hamburgerableVars.topAnim        ] : config?.hamburgerTopAnimIn,
        [hamburgerableVars.midAnim        ] : config?.hamburgerMidAnimIn,
        [hamburgerableVars.btmAnim        ] : config?.hamburgerBtmAnimIn,
    });
    const animOutVars       = () => vars({
        [hamburgerableVars.topAnim        ] : config?.hamburgerTopAnimOut,
        [hamburgerableVars.midAnim        ] : config?.hamburgerMidAnimOut,
        [hamburgerableVars.btmAnim        ] : config?.hamburgerBtmAnimOut,
    });
    
    
    
    return {
        hamburgerableRule: () => style({
            ...imports([
                // features:
                animationRule,
            ]),
            
            
            
            // reset functions:
            // declare default values at lowest specificity:
            ...fallbacks({
                ...transformNoneVars(),
                ...animNoneVars(),
            }),
            
            
            
            // animation states:
            ...states([
                ifActivated({
                    ...imports([
                        transformInVars(),
                    ]),
                }),
                ifActivating({
                    ...imports([
                        transformInVars(),
                        transformOutVars(),
                        
                        animInVars(),
                    ]),
                }),
                ifPassivating({
                    ...imports([
                        transformInVars(),
                        transformOutVars(),
                        
                        animOutVars(),
                    ]),
                }),
                ifPassivated({
                    ...imports([
                        transformOutVars(),
                    ]),
                }),
            ]),
            
            
            
            // compositions:
            ...vars({
                [hamburgerableVars.topTransform] : [[
                    // combining: transform1 * transform2 * transform3 ...
                    
                    // back-to-front order, the last is processed first, the first is processed last
                    
                    hamburgerableVars.topTransformIn,
                    hamburgerableVars.topTransformOut,
                ]],
                [hamburgerableVars.midTransform] : [[
                    // combining: transform1 * transform2 * transform3 ...
                    
                    // back-to-front order, the last is processed first, the first is processed last
                    
                    hamburgerableVars.midTransformIn,
                    hamburgerableVars.midTransformOut,
                ]],
                [hamburgerableVars.btmTransform] : [[
                    // combining: transform1 * transform2 * transform3 ...
                    
                    // back-to-front order, the last is processed first, the first is processed last
                    
                    hamburgerableVars.btmTransformIn,
                    hamburgerableVars.btmTransformOut,
                ]],
            }),
        }),
        hamburgerableVars,
    };
};
//#endregion hamburgerable
