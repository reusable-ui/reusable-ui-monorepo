// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssCustomSimpleRef,
    type CssKnownProps,
    type CssRule,
    
    
    
    // Writes css in javascript:
    style,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui features:
import {
    // CSS Hooks:
    usesAnimationFeature,
    
    
    
    // Registries:
    animationRegistry as internalAnimationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.

// Reusable-ui features:
import {
    // CSS Hooks:
    usesFilterFeature,
    
    
    
    // Registries:
    filterRegistry,
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.

// Reusable-ui features:
import {
    // CSS Hooks:
    usesTransformFeature,
    
    
    
    // Registries:
    transformRegistry,
}                           from '@reusable-ui/transform-feature'   // A styling utility for composing a unified transform stack from custom and registered state packages.

// Reusable-ui features:
import {
    // CSS Hooks:
    usesBoxShadowFeature,
    
    
    
    // Registries:
    boxShadowRegistry,
}                           from '@reusable-ui/box-shadow-feature'  // A styling utility for composing a unified box shadow stack from custom and registered state packages.



/**
 * @deprecated - Use `AnimationFeatureVars & FilterFeatureVars & TransformFeatureVars & BoxShadowFeatureVars` instead.
 */
export interface AnimationVars {
    /**
     * @deprecated - No longer needed.
     * 
     * none animation.
     */
    animNone      : any
    
    /**
     * @deprecated - Use `animation` from `@reusable-ui/animation-feature` instead.
     * 
     * final animation.
     */
    anim          : any
    
    
    
    /**
     * @deprecated - No longer needed.
     * 
     * none filter.
     */
    filterNone    : any
    
    /**
     * @deprecated - Use `filter` from `@reusable-ui/filter-feature` instead.
     * 
     * final filter.
     */
    filter        : any
    
    
    
    /**
     * @deprecated - No longer needed.
     * 
     * none transform.
     */
    transformNone : any
    
    /**
     * @deprecated - Use `transform` from `@reusable-ui/transform-feature` instead.
     * 
     * final transform.
     */
    transform     : any
    
    
    
    /**
     * @deprecated - No longer needed.
     * 
     * none boxShadow.
     */
    boxShadowNone : any
    
    /**
     * @deprecated - Use `boxShadow` from `@reusable-ui/box-shadow-feature` instead.
     * 
     * final boxShadow layers.
     */
    boxShadow     : any
}
const [animationVars] = cssVars<AnimationVars>({ prefix: 'an', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



const animationRegistry       = {
    get anims           ():    CssCustomSimpleRef[]      {
        return internalAnimationRegistry.animations;
    },
    registerAnim        (item: CssCustomSimpleRef): void { internalAnimationRegistry.registerAnimation(item); },
    unregisterAnim      (item: CssCustomSimpleRef): void { internalAnimationRegistry.registerAnimation(item)(); },
    
    
    
    get filters         ():    CssCustomSimpleRef[]      {
        return filterRegistry.filters;
    },
    registerFilter      (item: CssCustomSimpleRef): void { filterRegistry.registerFilter(item); },
    unregisterFilter    (item: CssCustomSimpleRef): void { filterRegistry.registerFilter(item)(); },
    
    
    
    get transforms      ():    CssCustomSimpleRef[]      {
        return transformRegistry.transforms;
    },
    registerTransform   (item: CssCustomSimpleRef): void { transformRegistry.registerTransform(item); },
    unregisterTransform (item: CssCustomSimpleRef): void { transformRegistry.registerTransform(item)(); },
    
    
    
    get boxShadows      ():    CssCustomSimpleRef[]      {
        return boxShadowRegistry.boxShadows;
    },
    registerBoxShadow   (item: CssCustomSimpleRef): void { boxShadowRegistry.registerBoxShadow(item); },
    unregisterBoxShadow (item: CssCustomSimpleRef): void { boxShadowRegistry.registerBoxShadow(item)(); },
};

/**
 * @deprecated - Use `CssAnimationRegistry`, `CssFilterRegistry`, `CssTransformRegistry`, and `CssBoxShadowRegistry` instead.
 */
export type AnimationRegistry = typeof animationRegistry



/**
 * @deprecated - Use `CssAnimationFeature & CssFilterFeature & CssTransformFeature & CssBoxShadowFeature` instead.
 */
export interface AnimationStuff { animationRule: Lazy<CssRule>, animationVars: CssVars<AnimationVars>, animationRegistry : AnimationRegistry }

/**
 * @deprecated - Use `CssAnimationFeatureOptions & CssFilterFeatureOptions & CssTransformFeatureOptions & CssBoxShadowFeatureOptions` instead.
 */
export interface AnimationConfig {
    /**
     * @deprecated - Use `animation` instead.
     */
    anim      ?: CssKnownProps['animation'] & Array<any>
    
    filter    ?: CssKnownProps['filter'   ] & Array<any>
    
    transform ?: CssKnownProps['transform'] & Array<any>
    
    boxShadow ?: CssKnownProps['boxShadow'] & Array<any>
}

/**
 * @deprecated - Use `usesAnimationFeature`, `usesFilterFeature`, `usesTransformFeature`, and `usesBoxShadowFeature` instead.
 * 
 * Uses Animation.
 * @param config  A configuration of `animationRule`.
 * @returns An `AnimationStuff` represents the animation rules.
 */
export const usesAnimation = (config?: AnimationConfig): AnimationStuff => {
    const {
        anim: animation,
        filter,
        transform,
        boxShadow,
    } = config ?? {};
    
    
    
    // dependencies:
    const {
        animationFeatureRule,
    } = usesAnimationFeature({
        animation,
    });
    
    const {
        filterFeatureRule,
    } = usesFilterFeature({
        filter,
    });
    
    const {
        transformFeatureRule,
    } = usesTransformFeature({
        transform,
    });
    
    const {
        boxShadowFeatureRule,
    } = usesBoxShadowFeature({
        boxShadow,
    });
    
    
    
    return {
        animationRule: () => style({
            ...animationFeatureRule(),
            ...filterFeatureRule(),
            ...transformFeatureRule(),
            ...boxShadowFeatureRule(),
        }),
        animationVars,
        animationRegistry,
    };
};
