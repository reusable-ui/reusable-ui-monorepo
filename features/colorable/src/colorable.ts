// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssKnownProps,
    type CssRule,
    type CssStyleCollection,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui features:
import {
    // CSS Hooks:
    usesDecorationFeature,
}                           from '@reusable-ui/decoration-feature'  // A styling utility for resolving the appropriate decoration color based on the currently active variants — including theme, outline, and mild.



/**
 * @deprecated - No longer needed.
 */
export type ToggleColor = boolean|'inherit'|null

/**
 * @deprecated - Use `DecorationFeatureVars` instead.
 */
export interface ColorableVars {
    /**
     * @deprecated - No longer needed.
     * 
     * the outlined switching function.
     * this is the clone of `OutlineableVars.outlinedSw`, so we can still access the <ancestor>'s `outlinedSw`.
     */
    outlinedSw : any
    
    /**
     * @deprecated - No longer needed.
     * 
     * the mild switching function.
     * this is the clone of `MildableVars.mildSw`, so we can still access the <ancestor>'s `mildSw`.
     */
    mildSw     : any
    
    
    
    /**
     * @deprecated - Use `switchOf(decorationFeatureVars.decorRegularCond, options.decorationColor)` instead.
     * 
     * functional color based on <parent>'s background color or <current>'s theme.
     */
    colorFn    : any
    
    /**
     * @deprecated - No longer needed.
     * 
     * functional alternate color based on <parent>'s background color or <current>'s theme.
     */
    altColorFn : any
    
    /**
     * @deprecated - No longer needed.
     * 
     * conditionally toggled alternate color based on <parent>'s background color or <current>'s theme.
     */
    altColorTg : any
    
    
    
    /**
     * @deprecated - Use `decorColor` instead.
     * 
     * final color based on <parent>'s background color or <current>'s theme.
     */
    color      : any
}
const [colorableVars] = cssVars<ColorableVars>(); // no need to have SSR support because the variables are not shared externally (outside <TheCorrespondingComponent>)



/**
 * @deprecated - Use `CssDecorationFeature` instead.
 */
export interface ColorableStuff { colorableRule: Lazy<CssRule>, colorableVars: CssVars<ColorableVars> }

/**
 * @deprecated - Use `CssDecorationFeatureOptions` instead.
 */
export interface ColorableConfig {
    /**
     * @deprecated - Use `decorationColor` instead.
     */
    color    ?: CssKnownProps['backgroundColor']
    
    /**
     * @deprecated - No longer needed.
     */
    altColor ?: CssKnownProps['backgroundColor']
}

/**
 * @deprecated - Use `usesDecorationFeature` instead.
 * 
 * Uses color.
 * @param config  A configuration of `colorableRule`.
 * @param outlinedDefinition A callback to create an outlining rules for each toggle state.
 * @param mildDefinition A callback to create a mildification rules for each toggle state.
 * @returns A `ColorableStuff` represents the color rules.
 */
export const usesColorable = (config?: ColorableConfig, outlinedDefinition?: null|((toggle: ToggleColor) => CssStyleCollection), mildDefinition?: null|((toggle: ToggleColor) => CssStyleCollection)): ColorableStuff => {
    const {
        color,
    } = config ?? {};
    
    
    
    // dependencies:
    const {
        decorationFeatureRule,
    } = usesDecorationFeature({
        decorationColor : color,
    });
    
    
    
    return {
        colorableRule: decorationFeatureRule,
        colorableVars,
    };
};
