// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'                 // cssfn general types
import type {
    // css custom properties:
    CssCustomRef,
    
    
    
    // cssfn properties:
    CssRule,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // styles:
    style,
    vars,
    
    
    
    // utilities:
    solidBackg,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // utilities:
    CssVars,
    cssVars,
    fallbacks,
}                           from '@cssfn/css-vars'              // strongly typed of css variables

// reusable-ui variants:
import {
    // hooks:
    ifHasTheme,
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
     * final border radiuses (all 4 corners).
     */
    borderRadius           : any
}
const [borderVars] = cssVars<BorderVars>();



export interface BorderRules { borderRule: Factory<CssRule>, borderVars: CssVars<BorderVars> }
export interface BorderConfig {
    defaultBorderColor ?: CssCustomRef
}
/**
 * Uses border (strokes, colors, radiuses).
 * @param config  A configuration of `borderRule`.
 * @returns A `BorderRules` represents the border rules.
 */
export const usesBorder = (config?: BorderConfig): BorderRules => {
    // dependencies:
    const {themableVars   } = usesThemable();
    const {outlineableVars} = usesOutlineable();
    
    
    
    return {
        borderRule: () => style({
            // color functions:
            ...vars({
                [borderVars.borderColorFn] : 'inherit', // inherit to parent theme
            }),
            ...ifHasTheme({ // only declare the function below if the <Component> has a dedicated theme:
                ...vars({
                    [borderVars.borderColorFn] : fallbacks(
                        themableVars.borderImpt,        // first  priority
                        themableVars.border,            // second priority
                        themableVars.borderCond,        // third  priority
                        
                        config?.defaultBorderColor,     // default => uses config's border color
                    ),
                }),
            }),
            ...vars({ // always re-declare the final function below, so the [outlined] and/or [mild] can be toggled_on
                [borderVars.borderColor  ] : fallbacks(
                    outlineableVars.backgTg,        // toggle outlined (if `usesOutlineable()` applied)
                    mildableVars.backgTg,           // toggle mild     (if `usesMildable()` applied)
                    
                    borderVars.borderColorFn,        // default => uses our `borderColorFn`
                ),
            }),
            
            
            
            // compositions:
            ...vars({
                [borderVars.backg          ] : [
                    // layering: backg1 | backg2 | backg3 ...
                    
                    // top layer:
                    fallbacks(
                        gradientableVars.backgGradTg, // toggle gradient (if `usesGradientable()` applied)
                        
                        borderVars.backgNone,         // default => no top layer
                    ),
                    
                    // bottom layer:
                    borderVars.borderColor,
                ],
            }),
        }),
        borderVars,
    };
};
//#endregion border
