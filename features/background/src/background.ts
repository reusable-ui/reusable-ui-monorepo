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
    
    
    
    // utilities:
    solidBackg,
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
}
const [backgroundVars] = cssVars<BackgroundVars>();



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
                [backgroundVars.backgColorFn   ] : 'inherit', // inherit to parent theme
                [backgroundVars.altBackgColorFn] : 'inherit', // inherit to parent theme
            }),
            ...ifHasTheme({ // only declare the function below if the <Component> has a dedicated theme:
                ...vars({
                    [backgroundVars.backgColorFn   ] : switchOf(
                        themableVars.backgImpt,     // first  priority
                        themableVars.backg,         // second priority
                        
                        config?.backg,              // default => uses config's background
                    ),
                    [backgroundVars.altBackgColorFn] : switchOf(
                        themableVars.altBackgImpt,  // first  priority
                        themableVars.altBackg,      // second priority
                        
                        config?.altBackg,           // default => uses config's alternate background
                    ),
                }),
            }),
            ...vars({ // always re-declare the final function below, so the [outlined] and/or [mild] can be toggled_on
                [backgroundVars.backgColor     ] : switchOf(
                    outlineableVars.backgTg,        // toggle outlined (if `usesOutlineable()` applied)
                    mildableVars.backgTg,           // toggle mild     (if `usesMildable()` applied)
                    
                    backgroundVars.backgColorFn,    // default => uses our `backgColorFn`
                ),
                [backgroundVars.altBackgColor  ] : switchOf(
                    outlineableVars.altBackgTg,     // toggle outlined (if `usesOutlineable()` applied)
                    mildableVars.altBackgTg,        // toggle mild     (if `usesMildable()` applied)
                    
                    backgroundVars.altBackgColorFn, // default => uses our `backgColorFn`
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
                    backgroundVars.backgColor,
                ],
            }),
        }),
        backgroundVars,
    };
};
//#endregion background
