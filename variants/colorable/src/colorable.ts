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
    rule,
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
    usesMildable,
}                           from '@reusable-ui/mildable'        // mild (soft color) variant of UI



// hooks:

// variants:

//#region colorable
export interface ColorableVars {
    /**
     * functional conditional Icon color based on its theme name.
     */
    themedBoldColorFn : any
    
    /**
     * functional conditional Icon color based on its theme name - at mild variant.
     */
    themedMildColorFn : any
    /**
     * toggles_on conditional Icon color based on its theme name - at mild variant.
     */
    themedMildColorTg : any
    
    /**
     * Conditional Icon color based on its theme name.
     */
    themedColorFn     : any
    
    
    
    /**
     * functional conditional Icon color based on its background color.
     */
    autoBoldColorFn   : any
    
    /**
     * functional conditional Icon color based on its background color - at mild variant.
     */
    autoMildColorFn   : any
    /**
     * toggles_on conditional Icon color based on its background color - at mild variant.
     */
    autoMildColorTg   : any
    
    /**
     * Conditional Icon color based on its background color.
     */
    autoColorFn       : any
    /**
     * toggles_on conditional Icon color based on its background color.
     */
    autoColorTg       : any
    
    
    
    /**
     * final Icon color.
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
 * Uses icon color.
 * @param config  A configuration of `colorableRule`.
 * @param mildFactory A callback to create a mildification rules for each toggle state.
 * @returns A `ColorableStuff` represents the icon color rules.
 */
export const usesColorable = (config?: ColorableConfig, mildFactory : ((toggle: boolean|null) => CssStyleCollection) = mildOf): ColorableStuff => {
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
            ...vars({
                // conditional color functions:
                [colorableVars.autoBoldColorFn] : backgroundVars.altBackgColor, // uses <parent>'s alt  color (including the variant of outlined ?? mild ?? conditional ?? themed ?? default)
                [colorableVars.autoMildColorFn] : backgroundVars.backgColor,    // uses <parent>'s alt  color (including the variant of outlined ?? mild ?? conditional ?? themed ?? default)
                
                
                
                // final color functions:
                [colorableVars.autoColorFn    ] : switchOf(
                    colorableVars.autoMildColorTg,  // toggle mild
                    
                    colorableVars.autoBoldColorFn,  // default => uses our `autoBoldColorFn`
                ),
            }),
            ...vars({
                // final color functions:
                [colorableVars.color] : switchOf(
                    colorableVars.autoColorTg,   // toggle auto theme
                    
                    colorableVars.themedColorFn, // default => uses our `themedColorFn`
                ),
            }),
            ...variants([
                ifNoTheme({
                    ...vars({
                        [colorableVars.autoColorTg] : colorableVars.autoColorFn,
                    }),
                }),
                rule('&:not(.mild)', mildFactory(false)),
                rule('&.mild'      , mildFactory(true )),
            ]),
        }),
        colorableVars,
    };
};

/**
 * Creates a mildification rules for the given `toggle` state.
 * @param toggle `true` to activate the mildification -or- `false` to deactivate -or- `null` for undefining the mildification.
 * @returns A `CssRule` represents a mildification rules for the given `toggle` state.
 */
export const mildOf = (toggle: boolean|null): CssRule => style({
    ...vars({
        // *toggle on/off* the mildification prop:
        [colorableVars.themedMildColorTg] : toggle ? colorableVars.themedMildColorFn : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        [colorableVars.autoMildColorTg  ] : toggle ? colorableVars.autoMildColorFn   : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
    }),
});
//#endregion colorable
