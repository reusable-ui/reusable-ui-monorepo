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
    // Types:
    type CssBackgroundFeatureOptions,
    
    
    
    // CSS Hooks:
    usesBackgroundFeature,
}                           from '@reusable-ui/background-feature'  // A styling utility for resolving the appropriate background color based on the currently active variants — including theme, emphasize, outline, mild, and bare.



/**
 * @deprecated - Use `BackgroundFeatureVars` instead.
 */
export interface BackgroundVars {
    /**
     * @deprecated - No longer needed.
     * 
     * none background.
     */
    backgNone       : any
    
    
    
    /**
     * @deprecated - Use `switchOf(backgroundFeatureVars.backgRegularCond, options.backgroundColor)` instead.
     * 
     * functional background color.
     */
    backgColorFn    : any
    
    /**
     * final background color.
     */
    backgColor      : any
    
    /**
     * @deprecated - No longer needed.
     * 
     * functional alternate background color.
     */
    altBackgColorFn : any
    
    /**
     * @deprecated - No longer needed.
     * 
     * final alternate background color.
     */
    altBackgColor   : any
    
    
    
    /**
     * final background layers.
     */
    backg           : any
    
    /**
     * @deprecated - No longer needed.
     * 
     * final alternate background layers.
     */
    altBackg        : any
}
const [backgroundVars] = cssVars<BackgroundVars>({ prefix: 'bg', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



/**
 * @deprecated - Use `CssBackgroundFeature` instead.
 */
export interface BackgroundStuff { backgroundRule: Lazy<CssRule>, backgroundVars: CssVars<BackgroundVars> }

/**
 * @deprecated - Use `CssBackgroundFeatureOptions` instead.
 */
export interface BackgroundConfig extends Pick<CssBackgroundFeatureOptions, 'backgroundEmphasize'> {
    /**
     * @deprecated - Use `backgroundColor` instead.
     */
    backg           ?: CssKnownProps['backgroundColor']
    
    /**
     * @deprecated - No longer needed.
     */
    altBackg        ?: CssKnownProps['backgroundColor']
    
    /**
     * @deprecated - Use `background` instead.
     */
    backgroundImage ?: CssKnownProps['backgroundImage'] & Array<any>
}

/**
 * @deprecated - Use `usesBackgroundFeature` instead.
 * 
 * Uses background layer(s).
 * @param config  A configuration of `backgroundRule`.
 * @returns A `BackgroundStuff` represents the background rules.
 */
export const usesBackground = (config?: BackgroundConfig): BackgroundStuff => {
    const {
        backg,
        
        backgroundEmphasize,
        
        backgroundImage,
    } = config ?? {};
    
    
    
    // dependencies:
    const {
        backgroundFeatureRule,
    } = usesBackgroundFeature({
        backgroundColor     : backg,
        backgroundEmphasize : backgroundEmphasize,
        background          : backgroundImage,
    });
    
    
    
    return {
        backgroundRule: backgroundFeatureRule,
        backgroundVars,
    };
};
