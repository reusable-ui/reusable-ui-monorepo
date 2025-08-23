// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssKnownProps,
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui features:
import {
    // CSS Hooks:
    usesRingFeature,
}                           from '@reusable-ui/ring-feature'        // A styling utility for resolving the appropriate ring color based on the currently active theme variant.



/**
 * @deprecated - Use `RingFeatureVars` instead.
 */
export interface RingVars {
    /**
     * @deprecated - Use `switchOf(ringFeatureVars.ringRegularCond, options.ringColor)` instead.
     * 
     * functional ring color.
     */
    ringFn : any
    
    /**
     * @deprecated - Use `ringColor` instead.
     * 
     * final ring color.
     */
    ring   : any
}
const [ringVars] = cssVars<RingVars>({ prefix: 'rg', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



/**
 * @deprecated - Use `CssRingFeature` instead.
 */
export interface RingStuff { ringRule: Lazy<CssRule>, ringVars: CssVars<RingVars> }

/**
 * @deprecated - Use `CssRingFeatureOptions` instead.
 */
export interface RingConfig {
    /**
     * @deprecated - Use `ringColor` instead.
     */
    ring ?: CssKnownProps['color']
}

/**
 * @deprecated - Use `usesRingFeature` instead.
 * 
 * Uses ring (focus indicator) color.
 * @param config  A configuration of `ringRule`.
 * @returns A `RingStuff` represents the ring rules.
 */
export const usesRing = (config?: RingConfig): RingStuff => {
    const {
        ring,
    } = config ?? {};
    
    
    
    // dependencies:
    const {
        ringFeatureRule,
    } = usesRingFeature({
        ringColor : ring,
    });
    
    
    
    return {
        ringRule: ringFeatureRule,
        ringVars,
    };
};
