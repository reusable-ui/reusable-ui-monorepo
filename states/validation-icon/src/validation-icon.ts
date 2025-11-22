// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssKnownProps,
    CssRule,
    
    
    
    // writes css in javascript:
    states,
    fallback,
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui states:
import {
    // hooks:
    ifValid,
    ifInvalid,
}                           from '@reusable-ui/invalidable'     // a possibility of UI having an invalid state



/**
 * @deprecated
 * This package is obsolete as of v7.0.0.
 * Use `@reusable-ui/validity-state` instead, which provides `validityStateVars.isValid` and `validityStateVars.isInvalid`
 * for conditional styling of icons and other decorations.
 */
export interface ValidationIconVars {
    /**
     * final validation icon image.
     */
    iconImage : any
}
const [validationIconVars] = cssVars<ValidationIconVars>({ prefix: 'vi', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



/**
 * @deprecated
 * Use `@reusable-ui/validity-state` instead.
 */
export interface ValidationIconStuff { validationIconRule: Factory<CssRule>, validationIconVars: CssVars<ValidationIconVars> }

/**
 * @deprecated
 * Use `@reusable-ui/validity-state` instead.
 */
export interface ValidationIconConfig {
    iconValid   ?: CssKnownProps['maskImage']
    iconInvalid ?: CssKnownProps['maskImage']
}

/**
 * @deprecated
 * This helper is obsolete as of v7.0.0.
 * Replace with direct usage of `@reusable-ui/validity-state`:
 * 
 * ```ts
 * import { usesValidityState } from '@reusable-ui/validity-state';
 * import { style, fallback } from '@cssfn/core';
 * 
 * export const componentStyle = () => {
 *     const { validityStateVars: { isValid, isInvalid } } = usesValidityState();
 *     
 *     return style({
 *         ...fallback({ backgroundImage: 'none' }),
 *         ...fallback({ backgroundImage: `${isValid} url("/assets/valid-mark.svg")` }),
 *         ...fallback({ backgroundImage: `${isInvalid} url("/assets/invalid-mark.svg")` }),
 *     });
 * };
 * ```
 * 
 * An icon for indicating a validity status.
 * @param config  A configuration of `validationIconRule`.
 * @returns A `ValidationIconStuff` represents the validation icon rules.
 */
export const usesValidationIcon = (config?: ValidationIconConfig): ValidationIconStuff => {
    return {
        validationIconRule: () => style({
            // reset functions:
            // declare default values at lowest specificity:
            ...fallback({
                ...vars({
                    [validationIconVars.iconImage] : 'none',
                }),
            }),
            
            
            
            // icon states:
            ...states([
                ifValid({
                    ...vars({
                        // apply a *valid* icon indicator:
                        [validationIconVars.iconImage] : config?.iconValid,
                    }),
                }),
                ifInvalid({
                    ...vars({
                        // apply an *invalid* icon indicator:
                        [validationIconVars.iconImage] : config?.iconInvalid,
                    }),
                }),
            ]),
        }),
        validationIconVars,
    };
};
