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
const [foregroundVars] = cssVars<ForegroundVars>({ prefix: 'fg', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



export interface ForegroundStuff { foregroundRule: Factory<CssRule>, foregroundVars: CssVars<ForegroundVars> }
export interface ForegroundConfig {
    foreg    ?: CssKnownProps['foreground']
    altForeg ?: CssKnownProps['foreground']
}
/**
 * Uses foreground color (text color).
 * @param config  A configuration of `foregroundRule`.
 * @returns A `ForegroundStuff` represents the foreground rules.
 */
export const usesForeground = (config?: ForegroundConfig): ForegroundStuff => {
    // dependencies:
    const {themeableVars  } = usesThemeable();
    const {outlineableVars} = usesOutlineable();
    const {mildableVars   } = usesMildable();
    
    
    
    return {
        foregroundRule: () => style({
            // color functions:
            ...vars({
                // adaptive color functions:
                [foregroundVars.foregFn   ] : switchOf(
                    themeableVars.foregCond,    // first  priority
                    themeableVars.foreg,        // second priority
                    
                    config?.foreg,              // default => uses config's foreground
                ),
                [foregroundVars.altForegFn] : switchOf(
                    themeableVars.altForegCond, // first  priority
                    themeableVars.altForeg,     // second priority
                    
                    config?.altForeg,           // default => uses config's alternate foreground
                ),
                
                
                
                // final color functions:
                [foregroundVars.foreg     ] : switchOf(
                    outlineableVars.foregTg,        // toggle outlined (if `usesOutlineable()` applied)
                    mildableVars.foregTg,           // toggle mild     (if `usesMildable()` applied)
                    
                    foregroundVars.foregFn,         // default => uses our `foregFn`
                ),
                [foregroundVars.altForeg  ] : switchOf(
                    outlineableVars.altForegTg,     // toggle outlined (if `usesOutlineable()` applied)
                    mildableVars.altForegTg,        // toggle mild     (if `usesMildable()` applied)
                    
                    foregroundVars.altForegFn,      // default => uses our `altForegFn`
                ),
            }),
        }),
        foregroundVars,
    };
};
//#endregion foreground
