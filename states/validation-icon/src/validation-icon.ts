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
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    states,
    fallbacks,
    
    
    
    // styles:
    style,
    vars,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // utilities:
    CssVars,
    cssVars,
}                           from '@cssfn/css-vars'              // strongly typed of css variables

// reusable-ui states:
import {
    // hooks:
    ifValid,
    ifInvalid,
}                           from '@reusable-ui/invalidable'     // a possibility of UI having an invalid state.



// hooks:

// states:

//#region validationIcon
export interface ValidationIconVars {
    /**
     * final validation icon image.
     */
    iconImage : any
}
const [validationIconVars] = cssVars<ValidationIconVars>();



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
            ...fallbacks({
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
