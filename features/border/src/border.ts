// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui features:
import {
    // Types:
    type CssBorderFeatureOptions,
    
    
    
    // CSS Hooks:
    usesBorderFeature,
}                           from '@reusable-ui/border-feature'      // A styling utility for resolving the appropriate border color, geometry, and radius based on the currently active variants — including theme, outline, mild, and bare.



/**
 * @deprecated - Use `BorderFeatureVars` instead.
 */
export interface BorderVars {
    /**
     * final border style.
     */
    borderStyle            : any
    
    /**
     * @deprecated - Use `borderInlineStartWidth`, `borderInlineEndWidth`, `borderBlockStartWidth`, `borderBlockEndWidth`, `borderInlineBaseWidth`, or `borderBlockBaseWidth` instead.
     * 
     * final border width.
     */
    borderWidth            : any
    
    /**
     * @deprecated - Use `switchOf(borderFeatureVars.borderRegularCond, options.borderColor)` instead.
     * 
     * functional border color.
     */
    borderColorFn          : any
    
    /**
     * final border color.
     */
    borderColor            : any
    
    
    
    /**
     * @deprecated - Use `borderStyle`, `borderInlineStartWidth`, `borderInlineEndWidth`, `borderBlockStartWidth`, `borderBlockEndWidth`, and `borderColor` instead.
     * final border compositions (style, width, color).
     */
    border                 : any
    
    
    
    /**
     * top start (left) radius.
     */
    borderStartStartRadius : any
    /**
     * top end (right) radius.
     */
    borderStartEndRadius   : any
    /**
     * bottom start (left) radius.
     */
    borderEndStartRadius   : any
    /**
     * bottom end (right) radius.
     */
    borderEndEndRadius     : any
    
    
    
    /**
     * @deprecated Please use `borderStartStartRadius`, `borderStartEndRadius`, `borderEndStartRadius`, and `borderEndEndRadius`.
     * 
     * final border radiuses (all 4 corners).
     */
    borderRadius           : any
}
const [borderVars] = cssVars<BorderVars>({ prefix: 'bd', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



/**
 * @deprecated - Use `CssBorderFeature` instead.
 */
export interface BorderStuff { borderRule: Lazy<CssRule>, borderVars: CssVars<BorderVars> }

/**
 * @deprecated - Use `CssBorderFeatureOptions` instead.
 */
export interface BorderConfig extends Pick<CssBorderFeatureOptions,
    | 'borderStyle'
    | 'borderWidth'
    | 'borderColor'
    | 'borderRadius'
> {
}

/**
 * @deprecated - Use `usesBorderFeature` instead.
 * 
 * Uses border (strokes, colors, radiuses).
 * @param config  A configuration of `borderRule`.
 * @returns A `BorderStuff` represents the border rules.
 */
export const usesBorder = (config?: BorderConfig): BorderStuff => {
    const {
        borderStyle,
        borderWidth,
        borderColor,
        borderRadius,
    } = config ?? {};
    
    
    
    // dependencies:
    const {
        borderFeatureRule,
    } = usesBorderFeature({
        borderStyle,
        borderWidth,
        borderColor,
        borderRadius,
    });
    
    
    
    return {
        borderRule: borderFeatureRule,
        borderVars,
    };
};
