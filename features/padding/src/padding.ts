// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssKnownProps,
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

//#region padding
export interface PaddingVars {
    /**
     * left & right paddings.
     */
    paddingInline : any
    /**
     * top & bottom paddings.
     */
    paddingBlock  : any
    
    
    
    /**
     * @deprecated Please use `paddingInline` & `paddingBlock`. The *logical* padding is not solved yet.  
     * final padding (all 4 sides).
     */
    padding       : any
}
const [paddingVars] = cssVars<PaddingVars>({ prefix: 'pd', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



export interface PaddingStuff { paddingRule: Factory<CssRule>, paddingVars: CssVars<PaddingVars> }
export interface PaddingConfig {
    paddingInline ?: CssKnownProps['paddingInline']
    paddingBlock  ?: CssKnownProps['paddingBlock' ]
}
/**
 * Uses padding (inner spacing).
 * @param config  A configuration of `paddingRule`.
 * @returns A `PaddingStuff` represents the padding rules.
 */
export const usesPadding = (config?: PaddingConfig): PaddingStuff => {
    return {
        paddingRule: () => style({
            // compositions:
            ...vars({
                [paddingVars.paddingInline] : config?.paddingInline,
                [paddingVars.paddingBlock ] : config?.paddingBlock,
                // TODO: fix map to logical, not physical:
                [paddingVars.padding] : [[
                    paddingVars.paddingBlock,  // top-bottom
                    paddingVars.paddingInline, // left-right
                ]],
            }),
        }),
        paddingVars,
    };
};
//#endregion padding
