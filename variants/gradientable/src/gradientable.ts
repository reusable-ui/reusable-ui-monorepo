// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssKnownProps,
    CssRule,
    CssStyleCollection,
    
    
    
    // writes css in javascript:
    rule,
    variants,
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                  // writes css in javascript



// defaults:
const _defaultGradient : Required<GradientableProps>['gradient'] = 'inherit'



// hooks:

// variants:

//#region gradientable
export type ToggleGradient = boolean|'inherit'|null
export interface GradientableVars {
    /**
     * the gradientable preference.
     */
    gradientPr  : any
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



//#region caches
const gradientDefinitionsCache = new Map<ToggleGradient, CssRule>();
let gradientableRuleCache      : WeakRef<CssRule> | null = null;
//#endregion caches



// parent is     `.gradient` -or- current is     `.gradient`:
export const ifGradient        = (styles: CssStyleCollection): CssRule => rule(              ':is(.gradient&, &.gradient)'                                 , styles); // specificityWeight = 1 + (parent's specificityWeight)
// parent is `.not-gradient` -or- current is `.not-gradient`:
export const ifNotGradient     = (styles: CssStyleCollection): CssRule => rule(              ':is(.not-gradient&, &.not-gradient)'                         , styles); // specificityWeight = 1 + (parent's specificityWeight)
export const ifInheritGradient = (styles: CssStyleCollection): CssRule => rule(':where(&):not(:is(.gradient&, &.gradient, .not-gradient&, &.not-gradient))', styles); // specificityWeight = 1 + (parent's specificityWeight)



export interface GradientableStuff { gradientableRule: Factory<CssRule>, gradientableVars: CssVars<GradientableVars> }
export interface GradientableConfig {
    backgGrad ?: CssKnownProps['backgroundImage']
}
const createGradientableRule = (config?: GradientableConfig, gradientDefinition : null|((toggle: ToggleGradient) => CssStyleCollection) = defineGradient) => {
    return style({
        // configs:
        ...vars({
            [gradientableVars.backgGrad ] : config?.backgGrad,
            
            /*
                supports for `usesColorable()`:
                only reset `gradientableVars.gradientSw = gradientableVars.gradientPr` if `gradientDefinition` provided,
                so the *modified* `gradientableVars.gradientSw` by `setGradient()` still *preserved*,
                thus the `usesColorable()` can see the <parent>'s actual [gradient] status.
            */
            [gradientableVars.gradientSw] : (gradientDefinition || undefined) && gradientableVars.gradientPr,
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
            gradientDefinition && ifGradient(gradientDefinition(true)),
            gradientDefinition && ifNotGradient(gradientDefinition(false)),
            gradientDefinition && ifInheritGradient(gradientDefinition('inherit')),
        ]),
    });
};
const getDefaultGradientableRule = () => {
    const cached = gradientableRuleCache?.deref();
    if (cached !== undefined) return cached;
    
    
    
    const defaultGradientableRule = createGradientableRule();
    gradientableRuleCache = new WeakRef<CssRule>(defaultGradientableRule);
    return defaultGradientableRule;
};
/**
 * Uses a toggleable gradient.  
 * @param config  A configuration of `gradientableRule`.
 * @param gradientDefinition A callback to create a gradient rules for each toggle state.
 * @returns A `GradientableStuff` represents the gradient rules for each toggle state.
 */
export const usesGradientable = (config?: GradientableConfig, gradientDefinition : null|((toggle: ToggleGradient) => CssStyleCollection) = defineGradient): GradientableStuff => {
    return {
        gradientableRule: (
            ((config === undefined) && (gradientDefinition === defineGradient))
            ?
            getDefaultGradientableRule
            :
            () => createGradientableRule(config, gradientDefinition))
        ,
        gradientableVars,
    };
};

/**
 * Defines a gradient preference rules for the given `toggle` state.
 * @param toggle `true` to activate the gradient -or- `false` to deactivate -or- `'inherit'` to inherit the gradient from its ancestor -or- `null` to remove previously declared `defineGradient`.
 * @returns A `CssRule` represents a gradient rules for the given `toggle` state.
 */
export const defineGradient = (toggle: ToggleGradient): CssRule => {
    const cached = gradientDefinitionsCache.get(toggle);
    if (cached !== undefined) return cached;
    
    
    
    const gradientDef = style({
        ...vars({
            /*
                *switch on/off/inherit* the `**Tg` prop.
                toggle:
                    true    => empty string      => do not alter the `**Tg`'s value => activates   `**Tg` variable.
                    false   => initial (invalid) => destroy      the `**Tg`'s value => deactivates `**Tg` variable.
                    inherit => inherit           => follows      the <ancestor> decision.
                    null    => null              => remove the prev declaration
            */
            [gradientableVars.gradientPr] : (typeof(toggle) === 'boolean') ? (toggle ? '' : 'initial') : toggle,
        }),
    });
    gradientDefinitionsCache.set(toggle, gradientDef);
    return gradientDef;
};
/**
 * Sets the current gradient state by the given `toggle` state.
 * @param toggle `true` to activate the gradient -or- `false` to deactivate -or- `'inherit'` to inherit the gradient from its ancestor -or- `null` to remove previously declared `setGradient`.
 * @returns A `CssRule` represents a gradient rules for the given `toggle` state.
 */
export const setGradient = (toggle: ToggleGradient): CssRule => style({
    ...vars({
        /*
            *switch on/off/inherit* the `**Tg` prop.
            toggle:
                true    => empty string      => do not alter the `**Tg`'s value => activates   `**Tg` variable.
                false   => initial (invalid) => destroy      the `**Tg`'s value => deactivates `**Tg` variable.
                inherit => inherit           => follows      the <ancestor> decision.
                null    => null              => remove the prev declaration
        */
        [gradientableVars.gradientSw] : (typeof(toggle) === 'boolean') ? (toggle ? '' : 'initial') : toggle,
    }),
});



export interface GradientableProps {
    // variants:
    gradient ?: boolean|'inherit'
}
export const useGradientable = ({gradient = _defaultGradient}: GradientableProps) => ({
    class: (gradient === 'inherit') ? null : (gradient ? 'gradient' : 'not-gradient'),
});
//#endregion gradientable
