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
    switchOf,
}                           from '@cssfn/css-vars'              // strongly typed of css variables

// reusable-ui variants:
import {
    // hooks:
    usesThemable,
}                           from '@reusable-ui/themable'        // color options of UI
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
const [borderVars] = cssVars<BorderVars>();



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
    const {themableVars   } = usesThemable();
    const {outlineableVars} = usesOutlineable();
    
    
    
    return {
        borderRule: () => style({
            // color functions:
            ...vars({
                // conditional color functions:
                [borderVars.borderColorFn] : switchOf(
                    themableVars.borderCond, // first  priority
                    themableVars.border,     // second priority
                    
                    config?.borderColor,     // default => uses config's border color
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
