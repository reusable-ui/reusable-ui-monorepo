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
    outlinedSw : any
    /**
     * the mild switching function.
     * this is the clone of `MildableVars.mildSw`, so we can still access the <ancestor>'s `mildSw`.
     */
    mildSw     : any
    
    
    
    /**
     * functional color based on <parent>'s background color or <current>'s theme.
     */
    colorFn    : any
    
    /**
     * functional alternate color based on <parent>'s background color or <current>'s theme.
     */
    altColorFn : any
    /**
     * conditionally toggled alternate color based on <parent>'s background color or <current>'s theme.
     */
    altColorTg : any
    
    
    
    /**
     * final color based on <parent>'s background color or <current>'s theme.
     */
    color      : any
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
    const {outlineableRule} = usesOutlineable(/*config = */undefined, /*outlinedDefinition = */null);
    const {mildableRule   } = usesMildable(/*config = */undefined, /*mildDefinition = */null);
    
    
    
    return {
        colorableRule: () => style({
            ...imports([
                // features:
                backgroundRule, // overrides the default `backg` => `altColor` and `altBackg` => `color`
            ]),
            
            
            
            // color functions:
            ...vars({
                // adaptive color functions:
                [colorableVars.colorFn   ] : backgroundVars.altBackgColor, // uses <parent>'s alt color (including the adaption of outlined ?? mild ?? conditional ?? themed ?? default)
                [colorableVars.altColorFn] : backgroundVars.backgColor,    // uses <parent>'s reg color (including the adaption of outlined ?? mild ?? conditional ?? themed ?? default)
                
                
                
                // final color functions:
                [colorableVars.color] : switchOf(
                    colorableVars.altColorTg, // toggle mild
                    
                    colorableVars.colorFn,    // default => uses our `colorFn`
                ),
            }),
            
            
            
            // toggling functions:
            ...vars({
                [colorableVars.altColorTg] : [[
                    switchOf(colorableVars.outlinedSw, colorableVars.mildSw), // the (outlined|mild) switching function
                    colorableVars.altColorFn,
                ]],
            }),
            
            
            
            // toggling conditions:
            ...variants([
                ifHasTheme({
                    ...imports([
                        // variants:
                        outlineableRule, // the theme has been modified => need to re-define the outlined version of color, otherwise it still using the <parent>'s theme
                        mildableRule,    // the theme has been modified => need to re-define the mild     version of color, otherwise it still using the <parent>'s theme
                    ]),
                }),
                
                
                
                outlinedDefinition && ifOutlined(outlinedDefinition(true)),
                outlinedDefinition && ifNotOutlined(outlinedDefinition(false)),
                outlinedDefinition && ifInheritOutlined(outlinedDefinition('inherit')),
                
                
                
                mildDefinition     && ifMild(mildDefinition(true)),
                mildDefinition     && ifNotMild(mildDefinition(false)),
                mildDefinition     && ifInheritMild(mildDefinition('inherit')),
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
