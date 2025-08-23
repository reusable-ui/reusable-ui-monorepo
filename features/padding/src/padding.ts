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
    type CssPaddingFeatureOptions,
    
    
    
    // CSS Hooks:
    usesPaddingFeature,
}                           from '@reusable-ui/padding-feature'     // A styling utility for resolving the appropriate padding values based on active bare mode and framework-level overrides.



/**
 * @deprecated - Use `PaddingFeatureVars` instead.
 */
export interface PaddingVars {
    /**
     * @deprecated - Use `paddingInlineStart`, `paddingInlineEnd`, or `paddingInlineBase` instead.
     * 
     * left & right paddings.
     */
    paddingInline : any
    
    /**
     * @deprecated - Use `paddingBlockStart`, `paddingBlockEnd`, or `paddingBlockBase` instead.
     * 
     * top & bottom paddings.
     */
    paddingBlock  : any
    
    
    
    /**
     * @deprecated - Use `paddingInlineStart`, `paddingInlineEnd`, `paddingInlineBase`, `paddingBlockStart`, `paddingBlockEnd`, or `paddingBlockBase` instead.
     * 
     * final padding (all 4 sides).
     */
    padding       : any
}
const [paddingVars] = cssVars<PaddingVars>({ prefix: 'pd', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



/**
 * @deprecated - Use `CssPaddingFeature` instead.
 */
export interface PaddingStuff { paddingRule: Lazy<CssRule>, paddingVars: CssVars<PaddingVars> }

/**
 * @deprecated - Use `CssPaddingFeatureOptions` instead.
 */
export interface PaddingConfig extends Pick<CssPaddingFeatureOptions, 'paddingInline' | 'paddingBlock'> { }

/**
 * @deprecated - Use `usesPaddingFeature` instead.
 * 
 * Uses padding (inner spacing).
 * @param config  A configuration of `paddingRule`.
 * @returns A `PaddingStuff` represents the padding rules.
 */
export const usesPadding = (config?: PaddingConfig): PaddingStuff => {
    const {
        paddingInline,
        paddingBlock,
    } = config ?? {};
    
    
    
    // dependencies:
    const {
        paddingFeatureRule,
    } = usesPaddingFeature({
        paddingInline,
        paddingBlock,
    });
    
    
    
    return {
        paddingRule: paddingFeatureRule,
        paddingVars,
    };
};
