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



// hooks:

// states:

//#region validationIcon
export interface ValidationIconVars {
    /**
     * final validation icon image.
     */
    iconImage : any
}
const [validationIconVars] = cssVars<ValidationIconVars>({ prefix: 'vi', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



export interface ValidationIconStuff { validationIconRule: Factory<CssRule>, validationIconVars: CssVars<ValidationIconVars> }
export interface ValidationIconConfig {
    iconValid   ?: CssKnownProps['maskImage']
    iconInvalid ?: CssKnownProps['maskImage']
}
/**
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
//#endregion validationIcon
