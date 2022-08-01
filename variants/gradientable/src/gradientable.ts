// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'             // cssfn general types
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
}                           from '@cssfn/css-types'         // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    
    
    
    // styles:
    style,
    vars,
}                           from '@cssfn/cssfn'             // writes css in javascript
import {
    // utilities:
    cssVar,
}                           from '@cssfn/css-var'           // strongly typed of css variables



// hooks:

// variants:

//#region gradientable
export interface GradientableVars {
    /**
     * defines background gradient.
     */
    backgGrad   : any
    /**
     * toggles_on background gradient - at gradient variant.
     */
    backgGradTg : any
}
const [gradientableVars] = cssVar<GradientableVars>();



// grandpa not `.gradient` -and- parent not `.gradient` -and- current not `.gradient`:
export const ifNotGradient = (styles: CssStyleCollection): CssRule => rule(':not(.gradient) :where(:not(.gradient)&:not(.gradient))', styles);
// grandpa is  `.gradient` -or-  parent is  `.gradient` -or-  current is  `.gradient`:
export const ifGradient    = (styles: CssStyleCollection): CssRule => rule(':is(.gradient &, .gradient&, &.gradient)'               , styles);



export interface GradientableRules { gradientableRule: Factory<CssRule>, gradientableVars: GradientableVars }
export interface GradientableConfig {
    backgGrad ?: CssKnownProps['backgroundImage']
}
/**
 * Uses a toggleable gradient.  
 * @param factory A callback to create a gradient rules for each toggle state.
 * @returns A `GradientableRules` represents the gradient rules for each toggle state.
 */
export const usesGradientable = (config?: GradientableConfig, factory : ((toggle: boolean|null) => CssStyleCollection) = gradientOf): GradientableRules => {
    return {
        gradientableRule: () => style({
            ...vars({
                [gradientableVars.backgGrad] : config?.backgGrad,
            }),
            ...variants([
                ifNotGradient(factory(false)),
                ifGradient(factory(true)),
            ]),
        }),
        gradientableVars,
    };
};

/**
 * Creates a gradient rules for the given `toggle` state.
 * @param toggle `true` to activate the gradient -or- `false` to deactivate -or- `null` for undefining the gradient.
 * @returns A `CssRule` represents a gradient rules for the given `toggle` state.
 */
export const gradientOf = (toggle: boolean|null = true): CssRule => style({
    ...vars({
        // *toggle on/off* the background gradient prop:
        [gradientableVars.backgGradTg] : toggle ? gradientableVars.backgGrad : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
    }),
});



export interface GradientableProps {
    gradient ?: boolean
}
export const useGradientable = ({gradient}: GradientableProps) => ({
    class: gradient ? 'gradient' : null,
});
//#endregion gradientable
