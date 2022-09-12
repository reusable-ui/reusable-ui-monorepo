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
    ifHasTheme,
    ifNoTheme,
    usesThemable,
}                           from '@reusable-ui/themable'        // color options of UI
import {
    // hooks:
    ifOutlined,
    ifNotOutlined,
    ifInheritOutlined,
    usesOutlineable,
}                           from '@reusable-ui/outlineable'     // outlined (background-less) variant of UI
import {
    // hooks:
    ifMild,
    ifNotMild,
    ifInheritMild,
    usesMildable,
}                           from '@reusable-ui/mildable'        // mild (soft color) variant of UI



// hooks:

// variants:

//#region colorable
export interface ColorableVars {
    /**
     * the outlined switching function.
     * this is the clone of `OutlineableVars.outlinedSw`, so we can still access the <ancestor>'s `outlinedSw`.
     */
    outlinedSw        : any
    /**
     * the mild switching function.
     * this is the clone of `MildableVars.mildSw`, so we can still access the <ancestor>'s `mildSw`.
     */
    mildSw            : any
    /**
     * the auto color switching function.
     */
    autoColorSw       : any
    
    
    
    /**
     * functional auto color based on its background color.
     */
    autoBoldColorFn   : any
    
    /**
     * functional auto color based on its background color - at mild variant.
     */
    autoMildColorFn   : any
    /**
     * conditionally toggled auto color based on its background color - at mild variant.
     */
    autoMildColorTg   : any
    
    /**
     * auto color based on its background color.
     */
    autoColorFn       : any
    /**
     * conditionally toggled auto color based on its background color.
     */
    autoColorTg       : any
    
    
    
    /**
     * functional color based on its theme - at no variant.
     */
    themedBoldColorFn : any
    
    /**
     * functional color based on its theme - at mild variant.
     */
    themedMildColorFn : any
    /**
     * conditionally toggled color based on its theme - at mild variant.
     */
    themedMildColorTg : any
    
    /**
     * functional color based on its theme.
     */
    themedColorFn     : any
    
    
    
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
export const usesColorable = (config?: ColorableConfig, outlinedDefinition : null|((toggle: boolean|'inherit'|null) => CssStyleCollection) = defineSelfOutlined, mildDefinition : null|((toggle: boolean|'inherit'|null) => CssStyleCollection) = defineSelfMild): ColorableStuff => {
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
                backgroundRule, // overrides the default `backg` => `altColor` and `altBackg` => `color`
            ]),
            
            
            
            // configs:
            ...vars({
                [colorableVars.outlinedSw] : outlinedDefinition ? outlineableVars.outlinedPr : 'initial',
                [colorableVars.mildSw    ] : mildDefinition     ? mildableVars.mildPr        : 'initial',
            }),
            
            
            
            // auto color functions:
            ...vars({
                // adaptive color functions:
                [colorableVars.autoBoldColorFn] : backgroundVars.altBackgColor, // uses <parent>'s alt color (including the adaption of outlined ?? mild ?? conditional ?? themed ?? default)
                [colorableVars.autoMildColorFn] : backgroundVars.backgColor,    // uses <parent>'s reg color (including the adaption of outlined ?? mild ?? conditional ?? themed ?? default)
                
                
                
                // final color functions:
                [colorableVars.autoColorFn    ] : switchOf(
                    colorableVars.autoMildColorTg,  // toggle mild
                    
                    colorableVars.autoBoldColorFn,  // default => uses our `autoBoldColorFn`
                ),
            }),
            // themed color functions:
            ...vars({
                // adaptive color functions:
                [colorableVars.themedBoldColorFn] : switchOf(
                    // TODO: under construction
                    // conditional opposite <parent> color:
                    // colorableVars.themedBoldColorCondFn,
                    
                    // themed color:
                    themableVars.backg,             // if not conditional => uses themed background color
                    
                    // default color:
                    config?.color,                  // default => uses config's color
                ),
                [colorableVars.themedMildColorFn] : switchOf(
                    // TODO: under construction
                    // conditional opposite <parent> color:
                    // colorableVars.themedMildColorCondFn,
                    
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
            // color functions:
            ...vars({
                // final color functions:
                // TODO: under construction
                [colorableVars.color] : colorableVars.autoColorFn,
                // [colorableVars.color] : switchOf(
                //     colorableVars.autoColorTg,   // toggle auto theme
                    
                //     colorableVars.themedColorFn, // default => uses our `themedColorFn`
                // ),
            }),
            
            
            
            // toggling functions:
            ...vars({
                [colorableVars.autoColorTg] : [[
                    colorableVars.autoColorSw, // the auto color switching function
                    colorableVars.autoColorFn,
                ]],
                
                
                
                [colorableVars.autoMildColorTg  ] : [[
                    switchOf(colorableVars.outlinedSw, colorableVars.mildSw),  // the (outlined|mild) switching function
                    colorableVars.autoMildColorFn,
                ]],
                [colorableVars.themedMildColorTg] : [[
                    switchOf(colorableVars.outlinedSw, colorableVars.mildSw),  // the (outlined|mild) switching function
                    colorableVars.themedMildColorFn,
                ]],
            }),
            
            
            
            // toggling conditions:
            ...variants([
                /*
                    empty string      => do not alter the `**Tg`'s value => activates   `**Tg` variable.
                    initial (invalid) => destroy      the `**Tg`'s value => deactivates `**Tg` variable.
                */
                ifHasTheme({
                    ...vars({
                        [colorableVars.autoColorSw] : 'initial',
                    }),
                }),
                ifNoTheme({
                    ...vars({
                        [colorableVars.autoColorSw] : '',
                    }),
                }),
                
                
                
                outlinedDefinition && ifOutlined(outlinedDefinition(true)),
                outlinedDefinition && ifNotOutlined(outlinedDefinition(false)),
                outlinedDefinition && ifInheritOutlined(outlinedDefinition('inherit')),
                
                
                
                mildDefinition && ifMild(mildDefinition(true)),
                mildDefinition && ifNotMild(mildDefinition(false)),
                mildDefinition && ifInheritMild(mildDefinition('inherit')),
            ]),
        }),
        colorableVars,
    };
};

/**
 * Defines an outlining preference rules for the given `toggle` state.
 * @param toggle `true` to activate the outlining -or- `false` to deactivate -or- `'inherit'` to inherit the outlining from its ancestor -or- `null` to remove previously declared `defineSelfOutlined`.
 * @returns A `CssRule` represents an outlining rules for the given `toggle` state.
 */
const defineSelfOutlined = (toggle: boolean|'inherit'|null): CssRule => style({
    ...vars({
        /*
            *switch on/off/inherit* the `**Tg` prop.
            toggle:
                true    => empty string      => do not alter the `**Tg`'s value => activates   `**Tg` variable.
                false   => initial (invalid) => destroy      the `**Tg`'s value => deactivates `**Tg` variable.
                inherit => inherit           => follows      the <ancestor> decision.
                null    => null              => remove the prev declaration
        */
        [colorableVars.outlinedSw] : (typeof(toggle) === 'boolean') ? (toggle ? '' : 'initial') : toggle,
    }),
});

/**
 * Defines a mildification preference rules for the given `toggle` state.
 * @param toggle `true` to activate the mildification -or- `false` to deactivate -or- `'inherit'` to inherit the mildification from its ancestor -or- `null` to remove previously declared `defineSelfMild`.
 * @returns A `CssRule` represents a mildification rules for the given `toggle` state.
 */
const defineSelfMild = (toggle: boolean|'inherit'|null): CssRule => style({
    ...vars({
        /*
            *switch on/off/inherit* the `**Tg` prop.
            toggle:
                true    => empty string      => do not alter the `**Tg`'s value => activates   `**Tg` variable.
                false   => initial (invalid) => destroy      the `**Tg`'s value => deactivates `**Tg` variable.
                inherit => inherit           => follows      the <ancestor> decision.
                null    => null              => remove the prev declaration
        */
        [colorableVars.mildSw] : (typeof(toggle) === 'boolean') ? (toggle ? '' : 'initial') : toggle,
    }),
});
//#endregion colorable
