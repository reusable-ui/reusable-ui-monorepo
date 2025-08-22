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
    usesForegroundFeature,
}                           from '@reusable-ui/foreground-feature'  // A styling utility for resolving the appropriate foreground color based on the currently active variants — including theme, outline, and mild.



/**
 * @deprecated - Use `ForegroundFeatureVars` instead.
 */
export interface ForegroundVars {
    /**
     * @deprecated - Use `switchOf(foregroundFeatureVars.foregRegularCond, options.foregroundColor)` instead.
     * 
     * functional foreground color.
     */
    foregFn    : any
    
    /**
     * @deprecated - Use `foregColor` instead.
     * 
     * final foreground color.
     */
    foreg      : any
    
    /**
     * @deprecated - No longer needed.
     * 
     * functional alternate foreground color.
     */
    altForegFn : any
    
    /**
     * @deprecated - No longer needed.
     * 
     * final alternate foreground color.
     */
    altForeg   : any
}
const [foregroundVars] = cssVars<ForegroundVars>({ prefix: 'fg', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



/**
 * @deprecated - Use `CssForegroundFeature` instead.
 */
export interface ForegroundStuff { foregroundRule: Lazy<CssRule>, foregroundVars: CssVars<ForegroundVars> }

/**
 * @deprecated - Use `CssForegroundFeatureOptions` instead.
 */
export interface ForegroundConfig {
    /**
     * @deprecated - Use `foregroundColor` instead.
     */
    foreg    ?: CssKnownProps['foreground']
    
    /**
     * @deprecated - No longer needed.
     */
    altForeg ?: CssKnownProps['foreground']
}

/**
 * @deprecated - Use `usesForegroundFeature` instead.
 * 
 * Uses foreground color (text color).
 * @param config  A configuration of `foregroundRule`.
 * @returns A `ForegroundStuff` represents the foreground rules.
 */
export const usesForeground = (config?: ForegroundConfig): ForegroundStuff => {
    const {
        foreg,
    } = config ?? {};
    
    
    
    // dependencies:
    const {
        foregroundFeatureRule,
    } = usesForegroundFeature({
        foregroundColor : foreg,
    });
    
    
    
    return {
        foregroundRule: foregroundFeatureRule,
        foregroundVars,
    };
};
