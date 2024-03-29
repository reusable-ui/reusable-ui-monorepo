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
    switchOf,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui variants:
import {
    // hooks:
    usesThemeable,
}                           from '@reusable-ui/themeable'       // color options of UI
import {
    // hooks:
    usesOutlineable,
}                           from '@reusable-ui/outlineable'     // outlined (background-less) variant of UI



// hooks:

// features:

//#region border
export interface BorderVars {
    /**
     * final border style.
     */
    borderStyle            : any
    
    /**
     * final border width.
     */
    borderWidth            : any
    
    /**
     * functional border color.
     */
    borderColorFn          : any
    /**
     * final border color.
     */
    borderColor            : any
    
    
    
    /**
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
     * @deprecated Please use `borderStartStartRadius`, `borderStartEndRadius`, `borderEndStartRadius` & `borderEndEndRadius`. The *logical* borderRadius is not solved yet.  
     * final border radiuses (all 4 corners).
     */
    borderRadius           : any
}
const [borderVars] = cssVars<BorderVars>({ prefix: 'bd', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



export interface BorderStuff { borderRule: Factory<CssRule>, borderVars: CssVars<BorderVars> }
export interface BorderConfig {
    // generals:
    borderStyle            ?: CssKnownProps['borderStyle' ]
    borderWidth            ?: CssKnownProps['borderWidth' ]
    borderColor            ?: CssKnownProps['borderColor' ]
    borderRadius           ?: CssKnownProps['borderRadius']
}
/**
 * Uses border (strokes, colors, radiuses).
 * @param config  A configuration of `borderRule`.
 * @returns A `BorderStuff` represents the border rules.
 */
export const usesBorder = (config?: BorderConfig): BorderStuff => {
    // dependencies:
    const {themeableVars  } = usesThemeable();
    const {outlineableVars} = usesOutlineable();
    
    
    
    return {
        borderRule: () => style({
            // color functions:
            ...vars({
                // adaptive color functions:
                [borderVars.borderColorFn] : switchOf(
                    themeableVars.borderCond, // first  priority
                    themeableVars.border,     // second priority
                    
                    config?.borderColor,      // default => uses config's border color
                ),
                
                
                
                // final color functions:
                [borderVars.borderColor  ] : switchOf(
                    outlineableVars.foregTg,     // toggle outlined (if `usesOutlineable()` applied)
                    
                    borderVars.borderColorFn,    // default => uses our `borderColorFn`
                ),
            }),
            
            
            
            // compositions:
            ...vars({
                [borderVars.borderStyle] : config?.borderStyle, // default => uses config's border style
                [borderVars.borderWidth] : config?.borderWidth, // default => uses config's border width
                [borderVars.border     ] : [[
                    borderVars.borderStyle,
                    borderVars.borderWidth,
                    borderVars.borderColor,
                ]],
                
                
                
                [borderVars.borderStartStartRadius] : config?.borderRadius,
                [borderVars.borderStartEndRadius  ] : config?.borderRadius,
                [borderVars.borderEndStartRadius  ] : config?.borderRadius,
                [borderVars.borderEndEndRadius    ] : config?.borderRadius,
                // TODO: fix map to logical, not physical:
                [borderVars.borderRadius] : [[
                    borderVars.borderStartStartRadius, // top-left
                    borderVars.borderStartEndRadius,   // top-right
                    borderVars.borderEndEndRadius,     // bottom-right
                    borderVars.borderEndStartRadius,   // bottom-left
                ]],
            }),
        }),
        borderVars,
    };
};
//#endregion border
