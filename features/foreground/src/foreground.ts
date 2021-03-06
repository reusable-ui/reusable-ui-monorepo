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
     * functional foreground color.
     */
    foregFn    : any
    /**
     * final foreground color.
     */
    foreg      : any
    /**
     * functional alternate foreground color.
     */
    altForegFn : any
    /**
     * final alternate foreground color.
     */
    altForeg   : any
}
const [foregroundVars] = cssVars<ForegroundVars>();



export interface ForegroundRules { foregroundRule: Factory<CssRule>, foregroundVars: CssVars<ForegroundVars> }
export interface ForegroundConfig {
    defaultForeg    ?: CssCustomRef
    defaultAltForeg ?: CssCustomRef
}
/**
 * Uses foreground color (text color).
 * @param config  A configuration of `foregroundRule`.
 * @returns A `ForegroundRules` represents the foreground rules.
 */
export const usesForeground = (config?: ForegroundConfig): ForegroundRules => {
    // dependencies:
    const {themableVars   } = usesThemable();
    const {outlineableVars} = usesOutlineable();
    const {mildableVars   } = usesMildable();
    
    
    
    return {
        foregroundRule: () => style({
            // color functions:
            ...vars({
                [foregroundVars.foregFn   ] : 'inherit', // inherit to parent theme
                [foregroundVars.altForegFn] : 'inherit', // inherit to parent theme
            }),
            ...ifHasTheme({ // only declare the function below if the <Component> has a dedicated theme:
                ...vars({
                    [foregroundVars.foregFn   ] : fallbacks(
                        themableVars.foregImpt,     // first  priority
                        themableVars.foreg,         // second priority
                        themableVars.foregCond,     // third  priority
                        
                        config?.defaultForeg,       // default => uses config's foreground
                    ),
                    [foregroundVars.altForegFn] : fallbacks(
                        themableVars.altForegImpt,  // first  priority
                        themableVars.altForeg,      // second priority
                        themableVars.altForegCond,  // third  priority
                        
                        config?.defaultAltForeg,    // default => uses config's alternate foreground
                    ),
                }),
            }),
            ...vars({ // always re-declare the final function below, so the [outlined] and/or [mild] can be toggled_on
                [foregroundVars.foreg     ] : fallbacks(
                    outlineableVars.foregTg,        // toggle outlined (if `usesOutlineable()` applied)
                    mildableVars.foregTg,           // toggle mild     (if `usesMildable()` applied)
                    
                    foregroundVars.foregFn,         // default => uses our `foregFn`
                ),
                [foregroundVars.altForeg  ] : fallbacks(
                    outlineableVars.altForegTg,     // toggle outlined (if `usesOutlineable()` applied)
                    mildableVars.altForegTg,        // toggle mild     (if `usesMildable()` applied)
                    
                    foregroundVars.altForegFn,      // default => uses our `foregFn`
                ),
            }),
        }),
        foregroundVars,
    };
};
//#endregion foreground
