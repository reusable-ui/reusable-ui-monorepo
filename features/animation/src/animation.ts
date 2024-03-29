// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssCustomSimpleRef,
    CssKnownProps,
    CssRule,
    
    
    
    // writes css in javascript:
    fallback,
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
    
    
    
    // writes complex stylesheets in simpler way:
    memoizeStyle,
}                           from '@cssfn/core'                  // writes css in javascript

// other libs:
import {
    Subject,
}                           from 'rxjs'



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
    transformNone : any
    /**
     * final transform.
     */
    transform     : any
    
    
    
    /**
     * none animation.
     */
    animNone      : any
    /**
     * final animation.
     */
    anim          : any
}
const [animationVars] = cssVars<AnimationVars>({ prefix: 'an', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



const setsBoxShadow           = new Set<CssCustomSimpleRef>();
const setsFilter              = new Set<CssCustomSimpleRef>();
const setsTransform           = new Set<CssCustomSimpleRef>();
const setsAnim                = new Set<CssCustomSimpleRef>();
let onAnimationRegistryChange = new Subject<void>();
const animationRegistry       = {
    get boxShadows      ():    CssCustomSimpleRef[]      {
        return [
            // front-to-back order, the first is placed on top, the last is placed on bottom
            
            ...Array.from(setsBoxShadow),
            
            // the *none* boxShadow is placed at the most back:
            animationVars.boxShadowNone, // the boxShadow collection must contain at least 1 of *none* boxShadow, so when rendered it produces a valid css value of boxShadow property
        ];
    },
    registerBoxShadow   (item: CssCustomSimpleRef): void { setsBoxShadow.add(item)    ; onAnimationRegistryChange.next() },
    unregisterBoxShadow (item: CssCustomSimpleRef): void { setsBoxShadow.delete(item) ; onAnimationRegistryChange.next() },
    
    
    
    get filters         ():    CssCustomSimpleRef[]      {
        return [
            // front-to-back order, the first is processed first, the last is processed last
            
            ...Array.from(setsFilter),
            
            // the *none* filter is placed at the most back:
            animationVars.filterNone, // the filter collection must contain at least 1 of *none* filter, so when rendered it produces a valid css value of filter property
        ];
    },
    registerFilter      (item: CssCustomSimpleRef): void { setsFilter.add(item)       ; onAnimationRegistryChange.next() },
    unregisterFilter    (item: CssCustomSimpleRef): void { setsFilter.delete(item)    ; onAnimationRegistryChange.next() },
    
    
    
    get transforms      ():    CssCustomSimpleRef[]      {
        return [
            // back-to-front order, the last is processed first, the first is processed last
            
            // the *none* transform is placed at the most front:
            animationVars.transformNone, // the transform collection must contain at least 1 of *none* transform, so when rendered it produces a valid css value of transform property
            
            ...Array.from(setsTransform).reverse(), // reverse the order
        ];
    },
    registerTransform   (item: CssCustomSimpleRef): void { setsTransform.add(item)    ; onAnimationRegistryChange.next() },
    unregisterTransform (item: CssCustomSimpleRef): void { setsTransform.delete(item) ; onAnimationRegistryChange.next() },
    
    
    
    get anims           ():    CssCustomSimpleRef[]      {
        return [
            // front-to-back order, the first has the lowest specificity, the last has the highest specificity
            
            ...Array.from(setsAnim),
            
            // the *none* animation is placed at the most back:
            animationVars.animNone, // the animation collection must contain at least 1 of *none* animation, so when rendered it produces a valid css value of animation property
        ];
    },
    registerAnim        (item: CssCustomSimpleRef): void { setsAnim.add(item)         ; onAnimationRegistryChange.next() },
    unregisterAnim      (item: CssCustomSimpleRef): void { setsAnim.delete(item)      ; onAnimationRegistryChange.next() },
};
export type AnimationRegistry = typeof animationRegistry



export interface AnimationStuff { animationRule: Factory<CssRule>, animationVars: CssVars<AnimationVars>, animationRegistry : AnimationRegistry }
export interface AnimationConfig {
    boxShadow ?: CssKnownProps['boxShadow'] & Array<any>
    filter    ?: CssKnownProps['filter'   ] & Array<any>
    transform ?: CssKnownProps['transform'] & Array<any>
    anim      ?: CssKnownProps['animation'] & Array<any>
}
const constantsAnimationRule = memoizeStyle((): CssRule => {
    return style({
        ...vars({
            [animationVars.boxShadowNone] : [[0, 0, 'transparent']],
            [animationVars.filterNone   ] : 'brightness(100%)',
            [animationVars.transformNone] : 'translate(0)',
            [animationVars.animNone     ] : 'none',
        }),
    });
});
const resetAnimationRule = memoizeStyle((): CssRule => {
    return style({
        // constants:
        ...constantsAnimationRule(),
        
        
        
        // reset functions:
        // declare default values at lowest specificity (except for **None):
        ...fallback({
            ...vars(Object.fromEntries([
                ...animationRegistry.boxShadows.filter((ref) => (ref !== animationVars.boxShadowNone)).map((ref) => [ ref, animationVars.boxShadowNone ]),
                ...animationRegistry.filters   .filter((ref) => (ref !== animationVars.filterNone   )).map((ref) => [ ref, animationVars.filterNone    ]),
                ...animationRegistry.transforms.filter((ref) => (ref !== animationVars.transformNone)).map((ref) => [ ref, animationVars.transformNone ]),
                ...animationRegistry.anims     .filter((ref) => (ref !== animationVars.animNone     )).map((ref) => [ ref, animationVars.animNone      ]),
            ])),
        }),
    });
}, onAnimationRegistryChange);
const createAnimationFunctionsRule = (config?: AnimationConfig): CssRule => {
    return style({
        // animation functions:
        ...vars({ // always re-declare the final function below, so the [boxShadow], [filter], [transform] and [animation] can be manipulated by corresponding state(s)
            [animationVars.boxShadow] : [
                // layering: boxShadow1 | boxShadow2 | boxShadow3 ...
                
                // front-to-back order, the first is placed on top, the last is placed on bottom
                
                // the config's boxShadow(s) are placed on top:
                ...(config?.boxShadow ?? ([] as CssKnownProps['boxShadow'] & Array<any>)), // default => uses config's boxShadow
                
                // the conditional boxShadow(s) are placed on bottom:
                ...animationRegistry.boxShadows,
            ],
            
            [animationVars.filter   ] : [[
                // combining: filter1 * filter2 * filter3 ...
                
                // front-to-back order, the first is processed first, the last is processed last
                
                // the config's filter(s) are processed first:
                ...(config?.filter ?? ([] as CssKnownProps['filter'] & Array<any>)), // default => uses config's filter
                
                // the conditional filter(s) are processed last:
                ...animationRegistry.filters,
            ]],
            
            [animationVars.transform] : [[
                // combining: transform3 * transform2 * transform1 ...
                
                // back-to-front order, the last is processed first, the first is processed last
                
                // the conditional transform(s) are processed last:
                ...animationRegistry.transforms,
                
                // the config's transform(s) are processed first:
                ...(config?.transform ?? ([] as CssKnownProps['transform'] & Array<any>)), // default => uses config's transform
            ]],
            
            [animationVars.anim     ] : [
                // paralleling: anim1 & anim2 & anim3 ...
                
                // front-to-back order, the first has the lowest specificity, the last has the highest specificity
                
                // the config's animation(s) have the lowest specificity:
                ...(config?.anim ?? ([] as CssKnownProps['animation'] & Array<any>)), // default => uses config's animation
                
                // the conditional animation(s) have the highest specificity:
                ...animationRegistry.anims,
            ],
        }),
    });
};
const getDefaultAnimationFunctionsRule = memoizeStyle(() => createAnimationFunctionsRule(), onAnimationRegistryChange);
/**
 * Uses Animation.
 * @param config  A configuration of `animationRule`.
 * @returns An `AnimationStuff` represents the animation rules.
 */
export const usesAnimation = (config?: AnimationConfig): AnimationStuff => {
    return {
        animationRule: () => style({
            // reset functions:
            ...resetAnimationRule(),
            
            
            
            // animation functions:
            ...(
                (config === undefined)
                ?
                getDefaultAnimationFunctionsRule()
                :
                createAnimationFunctionsRule(config)
            ),
        }),
        animationVars,
        animationRegistry,
    };
};
//#endregion animation
