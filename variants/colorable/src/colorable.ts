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
    
    CssStyleCollection,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    variants,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // utilities:
    CssVars,
    cssVars,
    switchOf,
}                           from '@cssfn/css-vars'              // strongly typed of css variables

// reusable-ui features:
import {
    // hooks:
    usesBackground,
}                           from '@reusable-ui/background'      // background stuff of UI

// reusable-ui variants:
import {
    // hooks:
    ifNoTheme,
    usesThemable,
}                           from '@reusable-ui/themable'        // color options of UI
import {
    // hooks:
    usesOutlineable,
}                           from '@reusable-ui/outlineable'     // outlined (background-less) variant of UI
import {
    // hooks:
    ifMild,
    ifNotMild,
    ifInheritMild,
    usesMildable,
    defineMild,
}                           from '@reusable-ui/mildable'        // mild (soft color) variant of UI



// hooks:

// variants:

//#region colorable
export interface ColorableVars {
    /**
     * functional conditional color based on its theme name.
     */
    themedBoldColorFn : any
    
    /**
     * functional conditional color based on its theme name - at mild variant.
     */
    themedMildColorFn : any
    /**
     * toggles_on conditional color based on its theme name - at mild variant.
     */
    themedMildColorTg : any
    
    /**
     * Conditional color based on its theme name.
     */
    themedColorFn     : any
    
    
    
    /**
     * functional conditional color based on its background color.
     */
    autoBoldColorFn   : any
    
    /**
     * functional conditional color based on its background color - at mild variant.
     */
    autoMildColorFn   : any
    /**
     * toggles_on conditional color based on its background color - at mild variant.
     */
    autoMildColorTg   : any
    
    /**
     * Conditional color based on its background color.
     */
    autoColorFn       : any
    /**
     * toggles_on conditional color based on its background color.
     */
    autoColorTg       : any
    
    
    
    /**
     * final color.
     */
    color             : any
}
const [colorableVars] = cssVars<ColorableVars>();



export interface ColorableStuff { colorableRule: Factory<CssRule>, colorableVars: CssVars<ColorableVars> }
export interface ColorableConfig {
    color    ?: CssKnownProps['backgroundColor']
    altColor ?: CssKnownProps['backgroundColor']
}
/**
 * Uses color.
 * @param config  A configuration of `colorableRule`.
 * @param mildDefinition A callback to create a mildification rules for each toggle state.
 * @returns A `ColorableStuff` represents the color rules.
 */
export const usesColorable = (config?: ColorableConfig, mildDefinition : ((toggle: boolean|'inherit'|null) => CssStyleCollection) = defineMild): ColorableStuff => {
    // dependencies:
    
    // features:
    const {backgroundRule, backgroundVars} = usesBackground({
        // reverses the regular & alternate:
        backg    : config?.altColor,
        altBackg : config?.color,
    });
    
    // variants:
    const {themableVars   } = usesThemable();
    const {outlineableVars} = usesOutlineable();
    const {mildableVars   } = usesMildable();
    
    
    
    return {
        colorableRule: () => style({
            ...imports([
                // features:
                backgroundRule,
            ]),
            
            
            
            // configs:
            ...vars({
                [mildableVars.mildSw] : mildableVars.mildPr,
            }),
            
            
            
            // themed color functions:
            ...vars({
                // conditional color functions:
                [colorableVars.themedBoldColorFn] : switchOf(
                    // conditional <parent> color:
                    outlineableVars.altBackgCondTg, // toggle outlined (if `usesOutlineable()` applied)
                    mildableVars.altBackgCondTg,    // toggle mild     (if `usesMildable()` applied)
                    themableVars.altBackgCond,      // default => uses themed alternate background color
                    
                    // themed color:
                    themableVars.backg,             // if not conditional => uses themed background color
                    
                    // default color:
                    config?.color,                  // default => uses config's color
                ),
                [colorableVars.themedMildColorFn] : switchOf(
                    // conditional <parent> color:
                    outlineableVars.backgCondTg,    // toggle outlined (if `usesOutlineable()` applied)
                    mildableVars.backgCondTg,       // toggle mild     (if `usesMildable()` applied)
                    themableVars.backgCond,         // default => uses themed background color
                    
                    // themed color:
                    themableVars.altBackg,          // if not conditional => uses themed alternate background color
                    
                    // default color:
                    config?.altColor,               // default => uses config's alternate color
                ),
                
                
                
                // final color functions:
                [colorableVars.themedColorFn    ] : switchOf(
                    colorableVars.themedMildColorTg,  // toggle mild
                    
                    colorableVars.themedBoldColorFn,  // default => uses our `themedBoldColorFn`
                ),
            }),
            // auto color functions:
            ...vars({
                // conditional color functions:
                [colorableVars.autoBoldColorFn] : backgroundVars.altBackgColor, // uses <parent>'s alt color (including the variant of outlined ?? mild ?? conditional ?? themed ?? default)
                [colorableVars.autoMildColorFn] : backgroundVars.backgColor,    // uses <parent>'s reg color (including the variant of outlined ?? mild ?? conditional ?? themed ?? default)
                
                
                
                // final color functions:
                [colorableVars.autoColorFn    ] : switchOf(
                    colorableVars.autoMildColorTg,  // toggle mild
                    
                    colorableVars.autoBoldColorFn,  // default => uses our `autoBoldColorFn`
                ),
            }),
            // color functions:
            ...vars({
                // final color functions:
                [colorableVars.color] : switchOf(
                    colorableVars.autoColorTg,   // toggle auto theme
                    
                    colorableVars.themedColorFn, // default => uses our `themedColorFn`
                ),
            }),
            
            
            
            // toggling (themed|auto) conditions:
            ...variants([
                ifNoTheme({
                    ...vars({
                        [colorableVars.autoColorTg] : colorableVars.autoColorFn,
                    }),
                }),
            ]),
            
            
            
            // toggling functions:
            ...vars({
                [colorableVars.themedMildColorTg] : [[
                    mildableVars.mildSw,  // the mild switching function
                    colorableVars.themedMildColorFn,
                ]],
                [colorableVars.autoMildColorTg  ] : [[
                    mildableVars.mildSw,  // the mild switching function
                    colorableVars.autoMildColorFn,
                ]],
            }),
            
            
            
            // toggling conditions:
            ...variants([
                ifMild(mildDefinition(true)),
                ifNotMild(mildDefinition(false)),
                ifInheritMild(mildDefinition('inherit')),
            ]),
        }),
        colorableVars,
    };
};
//#endregion colorable
