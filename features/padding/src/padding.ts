// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'                 // cssfn general types
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // styles:
    style,
    vars,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // utilities:
    CssVars,
    cssVars,
}                           from '@cssfn/css-vars'              // strongly typed of css variables



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
const [paddingVars] = cssVars<PaddingVars>();



export interface PaddingRules { paddingRule: Factory<CssRule>, paddingVars: CssVars<PaddingVars> }
export interface PaddingConfig {
    paddingInline ?: CssKnownProps['paddingInline']
    paddingBlock  ?: CssKnownProps['paddingBlock' ]
}
/**
 * Uses padding (inner spacing).
 * @param config  A configuration of `paddingRule`.
 * @returns A `PaddingRules` represents the padding rules.
 */
export const usesPadding = (config?: PaddingConfig): PaddingRules => {
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
