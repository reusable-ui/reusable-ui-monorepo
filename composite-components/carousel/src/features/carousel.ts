// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssRule,
    
    
    
    // writes css in javascript:
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                  // writes css in javascript



// hooks:

// features:

//#region carousel
export interface CarouselVars {
    /**
     * Carousel's scroll margin in rounded value.
     */
    scrollMargin : any
    
    /**
     * Carousel's scroll margin in fractional value.
     */
    scrollMarginFr : any
}
const [carouselVars] = cssVars<CarouselVars>({ prefix: 'carousel', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



export interface CarouselStuff { carouselRule: Factory<CssRule>, carouselVars: CssVars<CarouselVars> }
export interface CarouselConfig {
    scrollMargin   ?: number
    scrollMarginFr ?: number
}
/**
 * Uses carousel variables.
 * @param config  A configuration of `carouselRule`.
 * @returns A `CarouselStuff` represents the carousel rules.
 */
export const usesCarousel = (config?: CarouselConfig): CarouselStuff => {
    return {
        carouselRule: () => style({
            ...vars({
                // variables:
                [carouselVars.scrollMargin  ] : config?.scrollMargin,
                [carouselVars.scrollMarginFr] : config?.scrollMarginFr,
            }),
        }),
        carouselVars,
    };
};
//#endregion carousel
