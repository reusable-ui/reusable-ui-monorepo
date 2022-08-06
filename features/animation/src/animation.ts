// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'                 // cssfn general types
import type {
    // css custom properties:
    CssCustomSimpleRef,
    
    
    
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // styles:
    style,
    vars,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // utilities:
    CssVars,
    cssVars,
}                           from '@cssfn/css-vars'              // strongly typed of css variables



// hooks:

// features:

//#region animation
export interface AnimationVars {
    /**
     * none boxShadow.
     */
    boxShadowNone : any
    /**
     * final boxShadow layers.
     */
    boxShadow     : any
    
    
    
    /**
     * none filter.
     */
    filterNone    : any
    /**
     * final filter.
     */
    filter        : any
    
    
    
    /**
     * none transform.
     */
    transfNone    : any
    
    
    
    /**
     * none animation.
     */
    animNone      : any
    /**
     * final animation.
     */
    anim          : any
}
const [animationVars] = cssVars<AnimationVars>();



const setsBoxShadow     = new Set<CssCustomSimpleRef>();
const setsFilter        = new Set<CssCustomSimpleRef>();
const setsAnim          = new Set<CssCustomSimpleRef>();
const animationRegistry = {
    get boxShadows      ():    CssCustomSimpleRef[]      {
        return [
            // front-to-back order, the first placed on top, the last placed on bottom
            
            ...Array.from(setsBoxShadow),
            
            // the *none* boxShadow, placed at the most back:
            animationVars.boxShadowNone, // the boxShadow collection must contain at least 1 of *none* boxShadow, so when rendered it produces a valid css value of boxShadow property
        ];
    },
    registerBoxShadow   (item: CssCustomSimpleRef): void { setsBoxShadow.add(item)    },
    unregisterBoxShadow (item: CssCustomSimpleRef): void { setsBoxShadow.delete(item) },
    
    
    
    get filters         ():    CssCustomSimpleRef[]      {
        return [
            // the *none* filter, placed at the most front:
            animationVars.filterNone, // the filter collection must contain at least 1 of *none* filter, so when rendered it produces a valid css value of filter property
            
            ...Array.from(setsFilter),
        ];
    },
    registerFilter      (item: CssCustomSimpleRef): void { setsFilter.add(item)       },
    unregisterFilter    (item: CssCustomSimpleRef): void { setsFilter.delete(item)    },
    
    
    
    get anims           ():    CssCustomSimpleRef[]      {
        return [
            // the order does not matter, front-to-back and back-to-front are equal
            
            // the *none* animation, placed at the most front:
            animationVars.animNone, // the animation collection must contain at least 1 of *none* animation, so when rendered it produces a valid css value of animation property
            
            ...Array.from(setsAnim),
        ];
    },
    registerAnim        (item: CssCustomSimpleRef): void { setsAnim.add(item)         },
    unregisterAnim      (item: CssCustomSimpleRef): void { setsAnim.delete(item)      },
};
export type AnimationRegistry = typeof animationRegistry



export interface AnimationRules { animationRule: Factory<CssRule>, animationVars: CssVars<AnimationVars>, animationRegistry : AnimationRegistry }
export interface AnimationConfig {
    boxShadow ?: CssKnownProps['boxShadow'] & Array<any>
    filter    ?: CssKnownProps['filter'   ] & Array<any>
    anim      ?: CssKnownProps['animation'] & Array<any>
}
/**
 * Uses Animation.
 * @param config  A configuration of `animationRule`.
 * @returns An `AnimationRules` represents the animation rules.
 */
export const usesAnimation = (config?: AnimationConfig): AnimationRules => {
    return {
        animationRule: () => style({
            // constants:
            ...vars({
                [animationVars.boxShadowNone] : [[0, 0, 'transparent']],
                [animationVars.filterNone   ] : 'brightness(100%)',
                [animationVars.transfNone   ] : 'translate(0)',
                [animationVars.animNone     ] : 'none',
            }),
            
            
            
            // reset functions:
            // declare default values at lowest specificity (except for **None):
            ...vars(Object.fromEntries([
                ...animationRegistry.boxShadows.filter((ref) => (ref !== animationVars.boxShadowNone)).map((ref) => [ ref, animationVars.boxShadowNone ]),
                ...animationRegistry.filters   .filter((ref) => (ref !== animationVars.filterNone   )).map((ref) => [ ref, animationVars.filterNone    ]),
                ...animationRegistry.anims     .filter((ref) => (ref !== animationVars.animNone     )).map((ref) => [ ref, animationVars.animNone      ]),
            ])),
            
            
            
            // animation functions:
            ...vars({ // always re-declare the final function below, so the [boxShadow], [filter] and [animation] can be manipulated by corresponding state(s)
                [animationVars.boxShadow] : [
                    // layering: boxShadow1 | boxShadow2 | boxShadow3 ...
                    
                    // layers:
                    // front-to-back order, the first placed on top, the last placed on bottom
                    
                    ...(config?.boxShadow ?? ([] as CssKnownProps['boxShadow'] & Array<any>)), // default => uses config's boxShadow
                    
                    ...animationRegistry.boxShadows.slice(0, -1), // skip the last *none* boxShadow
                    
                    // the *none* boxShadow, placed at the most back:
                    animationVars.boxShadowNone, // the boxShadow collection must contain at least 1 of *none* boxShadow, so when rendered it produces a valid css value of boxShadow property
                ],
                
                [animationVars.filter   ] : [[
                    // combining: filter1 * filter2 * filter3 ...
                    
                    // combinations:
                    
                    // the *none* filter, placed at the most front:
                    animationVars.filterNone, // the filter collection must contain at least 1 of *none* filter, so when rendered it produces a valid css value of filter property
                    
                    ...(config?.filter ?? ([] as CssKnownProps['filter'] & Array<any>)), // default => uses config's filter
                    
                    ...animationRegistry.filters.slice(1), // skip the first *none* filter
                ]],
                
                [animationVars.anim     ] : [
                    // paralleling: anim1 | anim2 | anim3 ...
                    
                    // parallels:
                    // the order does not matter, front-to-back and back-to-front are equal
                    
                    // the *none* animation, placed at the most front:
                    animationVars.animNone, // the animation collection must contain at least 1 of *none* animation, so when rendered it produces a valid css value of animation property
                    
                    ...(config?.anim ?? ([] as CssKnownProps['animation'] & Array<any>)), // default => uses config's animation
                    
                    ...animationRegistry.anims.slice(1), // skip the first *none* animation
                ],
            }),
        }),
        animationVars,
        animationRegistry,
    };
};
//#endregion animation
