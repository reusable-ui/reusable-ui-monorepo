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
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // utilities:
    CssVars,
    cssVars,
}                           from '@cssfn/css-vars'              // strongly typed of css variables



// hooks:

// variants:

//#region gradientable
export interface GradientableVars {
    /**
     * the gradient switching function.
     */
    gradientSw  : any
    
    
    
    /**
     * defines background gradient.
     */
    backgGrad   : any
    /**
     * conditionally toggled background gradient.
     */
    backgGradTg : any
}
const [gradientableVars] = cssVars<GradientableVars>();



// parent is     `.gradient` -or- current is     `.gradient`:
export const ifGradient        = (styles: CssStyleCollection): CssRule => rule(              ':is(.gradient&, &.gradient)'                                 , styles); // specificityWeight = 1 + (parent's specificityWeight)
// parent is `.not-gradient` -or- current is `.not-gradient`:
export const ifNotGradient     = (styles: CssStyleCollection): CssRule => rule(              ':is(.not-gradient&, &.not-gradient)'                         , styles); // specificityWeight = 1 + (parent's specificityWeight)
export const ifInheritGradient = (styles: CssStyleCollection): CssRule => rule(':where(&):not(:is(.gradient&, &.gradient, .not-gradient&, &.not-gradient))', styles); // specificityWeight = 1 + (parent's specificityWeight)



export interface GradientableStuff { gradientableRule: Factory<CssRule>, gradientableVars: CssVars<GradientableVars> }
export interface GradientableConfig {
    backgGrad ?: CssKnownProps['backgroundImage']
}
/**
 * Uses a toggleable gradient.  
 * @param config  A configuration of `gradientableRule`.
 * @param factory A callback to create a gradient rules for each toggle state.
 * @returns A `GradientableStuff` represents the gradient rules for each toggle state.
 */
export const usesGradientable = (config?: GradientableConfig, factory : ((toggle: boolean|'inherit') => CssStyleCollection) = gradientOf): GradientableStuff => {
    return {
        gradientableRule: () => style({
            // configs:
            ...vars({
                [gradientableVars.backgGrad] : config?.backgGrad,
            }),
            
            
            
            // toggling functions:
            ...vars({
                [gradientableVars.backgGradTg] : [[
                    gradientableVars.gradientSw, // the gradient switching function
                    gradientableVars.backgGrad,  // the gradient definition
                ]],
            }),
            
            
            
            // toggling conditions:
            ...variants([
                ifGradient(factory(true)),
                ifNotGradient(factory(false)),
                ifInheritGradient(factory('inherit')),
            ]),
        }),
        gradientableVars,
    };
};

/**
 * Creates a gradient rules for the given `toggle` state.
 * @param toggle `true` to activate the gradient -or- `false` to deactivate -or- `'inherit'` to inherit the gradient from its ancestor.
 * @returns A `CssRule` represents a gradient rules for the given `toggle` state.
 */
export const gradientOf = (toggle: boolean|'inherit'): CssRule => style({
    ...vars({
        /*
            *switch on/off/inherit* the `**Tg` prop.
            toggle:
                true    => empty string      => do not alter the `**Tg`'s value => activates   `**Tg` variable.
                false   => initial (invalid) => destroy      the `**Tg`'s value => deactivates `**Tg` variable.
                inherit => inherit           => follows      the <ancestor> decision.
        */
        [gradientableVars.gradientSw] : (toggle === 'inherit') ? 'inherit' : (toggle ? '' : 'initial'),
    }),
});



export interface GradientableProps {
    // variants:
    gradient ?: boolean|'inherit'
}
export const useGradientable = ({gradient = 'inherit'}: GradientableProps) => ({
    class: (gradient === 'inherit') ? null : (gradient ? 'gradient' : 'not-gradient'),
});
//#endregion gradientable
