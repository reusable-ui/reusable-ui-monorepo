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
    solidBackg,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
    switchOf,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui variants:
import {
    // hooks:
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

//#region background
export interface BackgroundVars {
    /**
     * none background.
     */
    backgNone       : any
    
    
    
    /**
     * functional background color.
     */
    backgColorFn    : any
    /**
     * final background color.
     */
    backgColor      : any
    /**
     * functional alternate background color.
     */
    altBackgColorFn : any
    /**
     * final alternate background color.
     */
    altBackgColor   : any
    
    
    
    /**
     * final background layers.
     */
    backg           : any
    /**
     * final alternate background layers.
     */
    altBackg        : any
}
const [backgroundVars] = cssVars<BackgroundVars>({ prefix: 'bg', minify: false });



export interface BackgroundStuff { backgroundRule: Factory<CssRule>, backgroundVars: CssVars<BackgroundVars> }
export interface BackgroundConfig {
    backg           ?: CssKnownProps['backgroundColor']
    altBackg        ?: CssKnownProps['backgroundColor']
    
    backgroundImage ?: CssKnownProps['backgroundImage'] & Array<any>
}
/**
 * Uses background layer(s).
 * @param config  A configuration of `backgroundRule`.
 * @returns A `BackgroundStuff` represents the background rules.
 */
export const usesBackground = (config?: BackgroundConfig): BackgroundStuff => {
    // dependencies:
    const {themableVars    } = usesThemable();
    const {gradientableVars} = usesGradientable();
    const {outlineableVars } = usesOutlineable();
    const {mildableVars    } = usesMildable();
    
    
    
    return {
        backgroundRule: () => style({
            // constants:
            ...vars({
                [backgroundVars.backgNone      ] : solidBackg('transparent'),
            }),
            
            
            
            // color functions:
            ...vars({
                // adaptive color functions:
                [backgroundVars.backgColorFn   ] : switchOf(
                    themableVars.backgCond,     // first  priority
                    themableVars.backg,         // second priority
                    
                    config?.backg,              // default => uses config's background
                ),
                [backgroundVars.altBackgColorFn] : switchOf(
                    themableVars.altBackgCond,  // first  priority
                    themableVars.altBackg,      // second priority
                    
                    config?.altBackg,           // default => uses config's alternate background
                ),
                
                
                
                // final color functions:
                [backgroundVars.backgColor     ] : switchOf(
                    outlineableVars.backgTg,        // toggle outlined (if `usesOutlineable()` applied)
                    mildableVars.backgTg,           // toggle mild     (if `usesMildable()` applied)
                    
                    backgroundVars.backgColorFn,    // default => uses our `backgColorFn`
                ),
                [backgroundVars.altBackgColor  ] : switchOf(
                    outlineableVars.altBackgTg,     // toggle outlined (if `usesOutlineable()` applied)
                    mildableVars.altBackgTg,        // toggle mild     (if `usesMildable()` applied)
                    
                    backgroundVars.altBackgColorFn, // default => uses our `altBackgColorFn`
                ),
            }),
            
            
            
            // compositions:
            ...vars({
                [backgroundVars.backg          ] : [
                    // layering: backg1 | backg2 | backg3 ...
                    
                    // top layer:
                    switchOf(
                        gradientableVars.backgGradTg, // toggle gradient (if `usesGradientable()` applied)
                        
                        backgroundVars.backgNone,     // default => no top layer
                    ),
                    
                    // middle layer:
                    ...(config?.backgroundImage ?? ([] as CssKnownProps['backgroundImage'] & Array<any>)),
                    
                    // bottom layer:
                    switchOf(
                        outlineableVars.noBackgTg, // toggle outlined transparent background (if `usesOutlineable()` applied)
                        
                        backgroundVars.backgColor, // default => uses our `backgColor`
                    ),
                ],
                [backgroundVars.altBackg       ] : [
                    // layering: backg1 | backg2 | backg3 ...
                    
                    // top layer:
                    switchOf(
                        gradientableVars.backgGradTg, // toggle gradient (if `usesGradientable()` applied)
                        
                        backgroundVars.backgNone,     // default => no top layer
                    ),
                    
                    // middle layer:
                    ...(config?.backgroundImage ?? ([] as CssKnownProps['backgroundImage'] & Array<any>)),
                    
                    // bottom layer:
                    switchOf(
                        outlineableVars.noBackgTg,    // toggle outlined transparent background (if `usesOutlineable()` applied)
                        
                        backgroundVars.altBackgColor, // default => uses our `altBackgColor`
                    ),
                ],
            }),
        }),
        backgroundVars,
    };
};
//#endregion background
