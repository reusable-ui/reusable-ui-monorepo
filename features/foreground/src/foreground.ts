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
    usesGradientable,
}                           from '@reusable-ui/gradientable'    // gradient variant of UI
import {
    // hooks:
    usesOutlineable,
}                           from '@reusable-ui/outlineable'     // outlined (background-less) variant of UI
import {
    // hooks:
    usesMildable,
}                           from '@reusable-ui/mildable'        // mild (soft color) variant of UI



// hooks:

// features:

//#region foreground
export interface ForegroundVars {
    /**
     * none foreground.
     */
    foregNone       : any
    
    
    
    /**
     * functional foreground color.
     */
    foregColorFn    : any
    /**
     * final foreground color.
     */
    foregColor      : any
    /**
     * functional alternate foreground color.
     */
    altForegColorFn : any
    /**
     * final alternate foreground color.
     */
    altForegColor   : any
    
    
    
    /**
     * final foreground layers.
     */
    foreg           : any
}
const [foregroundVars] = cssVars<ForegroundVars>();



export interface ForegroundRules { foregroundRule: Factory<CssRule>, foregroundVars: CssVars<ForegroundVars> }
export interface ForegroundConfig {
    defaultForeg    ?: CssCustomRef
    defaultAltForeg ?: CssCustomRef
}
/**
 * Uses foreground layer(s).
 * @param config  A configuration of `foregroundRule`.
 * @returns A `ForegroundRules` represents the foreground rules.
 */
export const usesForeground = (config?: ForegroundConfig): ForegroundRules => {
    // dependencies:
    const {themableVars    } = usesThemable();
    const {gradientableVars} = usesGradientable();
    const {outlineableVars } = usesOutlineable();
    const {mildableVars    } = usesMildable();
    
    
    
    return {
        foregroundRule: () => style({
            // constants:
            ...vars({
                [foregroundVars.foregNone      ] : solidForeg('transparent'),
            }),
            
            
            
            // color functions:
            ...vars({
                [foregroundVars.foregColorFn   ] : 'inherit', // inherit to parent theme
                [foregroundVars.altForegColorFn] : 'inherit', // inherit to parent theme
            }),
            ...ifHasTheme({ // only declare the function below if the <Component> has a dedicated theme:
                ...vars({
                    [foregroundVars.foregColorFn   ] : fallbacks(
                        themableVars.foregImpt,     // first  priority
                        themableVars.foreg,         // second priority
                        themableVars.foregCond,     // third  priority
                        
                        config?.defaultForeg,       // default => uses config's foreground
                    ),
                    [foregroundVars.altForegColorFn] : fallbacks(
                        themableVars.altForegImpt,  // first  priority
                        themableVars.altForeg,      // second priority
                        themableVars.altForegCond,  // third  priority
                        
                        config?.defaultAltForeg,    // default => uses config's alternate foreground
                    ),
                }),
            }),
            ...vars({ // always re-declare the final function below, so the [outlined] and/or [mild] can be toggled_on
                [foregroundVars.foregColor     ] : fallbacks(
                    outlineableVars.foregTg,        // toggle outlined (if `usesOutlineable()` applied)
                    mildableVars.foregTg,           // toggle mild     (if `usesMildable()` applied)
                    
                    foregroundVars.foregColorFn,    // default => uses our `foregColorFn`
                ),
                [foregroundVars.altForegColor  ] : fallbacks(
                    outlineableVars.altForegTg,     // toggle outlined (if `usesOutlineable()` applied)
                    mildableVars.altForegTg,        // toggle mild     (if `usesMildable()` applied)
                    
                    foregroundVars.altForegColorFn, // default => uses our `foregColorFn`
                ),
            }),
            
            
            
            // compositions:
            ...vars({
                [foregroundVars.foreg          ] : [
                    // layering: foreg1 | foreg2 | foreg3 ...
                    
                    // top layer:
                    fallbacks(
                        gradientableVars.foregGradTg, // toggle gradient (if `usesGradientable()` applied)
                        
                        foregroundVars.foregNone,     // default => no top layer
                    ),
                    
                    // bottom layer:
                    foregroundVars.foregColor,
                ],
            }),
        }),
        foregroundVars,
    };
};
//#endregion foreground
