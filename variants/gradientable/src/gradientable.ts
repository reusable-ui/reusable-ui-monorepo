// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssKnownProps,
    type CssRule,
    type CssStyleCollection,
    
    
    
    // Writes css in javascript:
    neverRule,
    variants,
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
    cssVars,
    
    
    
    // Writes complex stylesheets in simpler way:
    memoizeStyleWithVariants,
}                           from '@cssfn/core'                      // writes css in javascript

// Reusable-ui variants:
import {
    // Hooks:
    useEmphasizeVariant,
    
    
    
    // Utilities:
    ifEmphasized,
    ifNotEmphasized,
}                           from '@reusable-ui/emphasize-variant'   // A utility for managing visual emphasis consistently across React components.



/**
 * @deprecated - No longer needed.
 */
export type ToggleGradient = boolean|'inherit'|null

/**
 * @deprecated - Use `EmphasizeVariantVars` instead.
 */
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

const [gradientableVars] = cssVars<GradientableVars>({ prefix: 'gd', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



/**
 * @deprecated - Use `ifEmphasized` instead.
 */
export const ifGradient        = ifEmphasized;

/**
 * @deprecated - Use `ifNotEmphasized` instead.
 */
export const ifNotGradient     = ifNotEmphasized;

/**
 * @deprecated - No longer needed.
 * 
 * The effective inheritance value is always resolved automatically for us.
 * This condition is effectively never match.
 */
export const ifInheritGradient = (styles: CssStyleCollection): CssRule => neverRule();



/**
 * @deprecated - Use `CssEmphasizeVariant` instead.
 */
export interface GradientableStuff { gradientableRule: Lazy<CssRule>, gradientableVars: CssVars<GradientableVars> }

/**
 * @deprecated - No longer needed.
 * Use `emphasizeVariantVars.isEmphasized` to toggling on/off your background gradient.
 */
export interface GradientableConfig {
    backgGrad ?: CssKnownProps['backgroundImage']
}

const createGradientableRule = (config?: GradientableConfig, gradientDefinition : null|((toggle: ToggleGradient) => CssStyleCollection) = defineGradient): CssRule => {
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
            [gradientableVars.gradientSw] : !gradientDefinition ? undefined : gradientableVars.gradientPr,
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
            // gradientDefinition && ifInheritGradient(gradientDefinition('inherit')),
        ]),
    });
};

/**
 * @deprecated - Use `useEmphasizeVariant` instead.
 * Use `emphasizeVariantVars.isEmphasized` to toggling on/off your background gradient.
 * 
 * Uses a toggleable gradient.  
 * @param config  A configuration of `gradientableRule`.
 * @param gradientDefinition A callback to create a gradient rules for each toggle state.
 * @returns A `GradientableStuff` represents the gradient rules for each toggle state.
 */
export const usesGradientable = (config?: GradientableConfig, gradientDefinition : null|((toggle: ToggleGradient) => CssStyleCollection) = defineGradient): GradientableStuff => {
    return {
        gradientableRule: () => createGradientableRule(config, gradientDefinition),
        gradientableVars,
    };
};

/**
 * @deprecated - No longer needed.
 * 
 * Defines a gradient preference rules for the given `toggle` state.
 * @param toggle `true` to activate the gradient -or- `false` to deactivate -or- `'inherit'` to inherit the gradient from its ancestor -or- `null` to remove previously declared `defineGradient`.
 * @returns A `CssRule` represents a gradient rules for the given `toggle` state.
 */
export const defineGradient = memoizeStyleWithVariants((toggle: ToggleGradient): CssRule => {
    return style({
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
});

/**
 * @deprecated - No longer needed.
 * 
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



/**
 * @deprecated - Use `EmphasizeVariantProps` instead.
 */
export interface GradientableProps {
    // variants:
    gradient ?: boolean|'inherit'
}

/**
 * @deprecated - Use `useEmphasizeVariant` instead.
 */
export const useGradientable = ({ gradient }: GradientableProps) => {
    const {
        emphasizedClassname,
    } = useEmphasizeVariant({
        emphasized : gradient,
    });
    
    return {
        class: emphasizedClassname,
    };
};
