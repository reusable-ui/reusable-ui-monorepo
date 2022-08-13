// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
}                           from 'react'

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
    states,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // utilities:
    CssVars,
    cssVars,
}                           from '@cssfn/css-vars'              // strongly typed of css variables

// reusable-ui utilities:
import {
    // hooks:
    useIsomorphicLayoutEffect,
    useEvent,
    EventHandler,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
    
    
    
    // react components:
    AccessibilityProps,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import {
    // hooks:
    Result as ValResult,
    usePropIsValid,
    
    
    
    // react components:
    ValidationProps,
}                           from '@reusable-ui/validations'     // a validation management system

// reusable-ui features:
import {
    // hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'       // animation stuff of UI

// reusable-ui variants:
import {
    // hooks:
    ThemeName,
    usesThemeConditional,
}                           from '@reusable-ui/themable'        // color options of UI



// hooks:

// states:

//#region invalidable
export interface InvalidableVars {
    animValid   : any
    animInvalid : any
}
const [invalidableVars] = cssVars<InvalidableVars>();

{
    const {animationRegistry: {registerAnim}} = usesAnimation();
    registerAnim(invalidableVars.animValid);
    registerAnim(invalidableVars.animInvalid);
}



// .validated will be added after validating-animation done:
const selectorIfValidated      = '.validated'
// .validating = styled valid, :valid = native valid:
// the .validated, .unvalidating, .novalidation are used to overwrite native :valid
const selectorIfValidating     = ':is(.validating, :valid:not(:is(.validated, .unvalidating, .novalidation, .invalidated, .invalidating)))'
// .unvalidating will be added after loosing valid and will be removed after unvalidating-animation done:
const selectorIfUnvalidating   = '.unvalidating'
// if all above are not set => unvalidated:
// optionally use .novalidation to overwrite native :valid
const selectorIfUnvalidated    = ':is(:not(:is(.validated, .validating, :valid, .unvalidating)), .novalidation)'

// .invalidated will be added after invalidating-animation done:
const selectorIfInvalidated    = '.invalidated'
// .invalidating = styled invalid, :invalid = native invalid:
// the .invalidated, .uninvalidating, .novalidation are used to overwrite native :invalid
const selectorIfInvalidating   = ':is(.invalidating, :invalid:not(:is(.invalidated, .uninvalidating, .novalidation, .validated, .validating)))'
// .uninvalidating will be added after loosing invalid and will be removed after uninvalidating-animation done:
const selectorIfUninvalidating = '.uninvalidating'
// if all above are not set => uninvalidated:
// optionally use .novalidation to overwrite native :invalid
const selectorIfUninvalidated  = ':is(:not(:is(.invalidated, .invalidating, :invalid, .uninvalidating)), .novalidation)'

// if all above are not set => noValidation
// optionally use .novalidation to kill pseudo :valid & :invalid:
const selectorIfNoValidation   = ':is(:not(:is(.validated, .validating, :valid, .unvalidating, .invalidated, .invalidating, :invalid, .uninvalidating)), .novalidation)'

export const ifValidated       = (styles: CssStyleCollection): CssRule => rule(selectorIfValidated      , styles);
export const ifValidating      = (styles: CssStyleCollection): CssRule => rule(selectorIfValidating     , styles);
export const ifUnvalidating    = (styles: CssStyleCollection): CssRule => rule(selectorIfUnvalidating   , styles);
export const ifUnvalidated     = (styles: CssStyleCollection): CssRule => rule(selectorIfUnvalidated    , styles);

export const ifValid           = (styles: CssStyleCollection): CssRule => rule([selectorIfValidating    , selectorIfValidated    ], styles);
export const ifUnvalid         = (styles: CssStyleCollection): CssRule => rule([selectorIfUnvalidating  , selectorIfUnvalidated  ], styles);

export const ifInvalidated     = (styles: CssStyleCollection): CssRule => rule(selectorIfInvalidated    , styles);
export const ifInvalidating    = (styles: CssStyleCollection): CssRule => rule(selectorIfInvalidating   , styles);
export const ifUninvalidating  = (styles: CssStyleCollection): CssRule => rule(selectorIfUninvalidating , styles);
export const ifUninvalidated   = (styles: CssStyleCollection): CssRule => rule(selectorIfUninvalidated  , styles);

export const ifInvalid         = (styles: CssStyleCollection): CssRule => rule([selectorIfInvalidating  , selectorIfInvalidated  ], styles);
export const ifUninvalid       = (styles: CssStyleCollection): CssRule => rule([selectorIfUninvalidating, selectorIfUninvalidated], styles);

export const ifNoValidation    = (styles: CssStyleCollection): CssRule => rule(selectorIfNoValidation   , styles);



export interface InvalidableStuff { invalidableRule: Factory<CssRule>, invalidableVars: CssVars<InvalidableVars> }
export interface InvalidableConfig {
    animValid     ?: CssKnownProps['animation']
    animUnvalid   ?: CssKnownProps['animation']
    
    animInvalid   ?: CssKnownProps['animation']
    animUninvalid ?: CssKnownProps['animation']
}
/**
 * Adds a possibility of UI having an invalid state.
 * @param config  A configuration of `invalidableRule`.
 * @returns A `InvalidableStuff` represents an invalidable state.
 */
export const usesInvalidable = (config?: InvalidableConfig): InvalidableStuff => {
    return {
        invalidableRule: () => style({
            ...states([
                ifValidating({
                    ...vars({
                        [invalidableVars.animValid]   : config?.animValid,
                    }),
                }),
                ifUnvalidating({
                    ...vars({
                        [invalidableVars.animValid]   : config?.animUnvalid,
                    }),
                }),
                
                ifInvalidating({
                    ...vars({
                        [invalidableVars.animInvalid] : config?.animInvalid,
                    }),
                }),
                ifUninvalidating({
                    ...vars({
                        [invalidableVars.animInvalid] : config?.animUninvalid,
                    }),
                }),
            ]),
        }),
        invalidableVars,
    };
};

export const markValid   = (): CssRule => style({
    ...imports([
        usesThemeValid(),   // switch to valid theme
    ]),
});
/**
 * Creates a conditional theme color rules at valid state.
 * @param themeName The theme name at valid state.
 * @returns A `CssRule` represents a conditional theme color rules at valid state.
 */
export const usesThemeValid   = (themeName: ThemeName|null = 'success'): CssRule => usesThemeConditional(themeName);

export const markInvalid = (): CssRule => style({
    ...imports([
        usesThemeInvalid(), // switch to invalid theme
    ]),
});
/**
 * Creates a conditional theme color rules at invalid state.
 * @param themeName The theme name at invalid state.
 * @returns A `CssRule` represents a conditional theme color rules at invalid state.
 */
export const usesThemeInvalid = (themeName: ThemeName|null = 'danger' ): CssRule => usesThemeConditional(themeName);



export interface ValidityChangeEvent
    extends
        // states:
        Required<Pick<ValidationProps, 'isValid'>>
{
}
export interface InvalidableProps<TValidityChangeEvent extends ValidityChangeEvent = ValidityChangeEvent>
    extends
        // states:
        Partial<Pick<AccessibilityProps, 'enabled'|'inheritEnabled'|'readOnly'|'inheritReadOnly'>>,
        
        // validations:
        ValidationProps
{
    // validations:
    onValidation ?: EventHandler<TValidityChangeEvent>
}
export const useInvalidable = <TElement extends Element = HTMLElement, TValidityChangeEvent extends ValidityChangeEvent = ValidityChangeEvent>(props: InvalidableProps<TValidityChangeEvent>) => {
    // fn props:
    const propEnabled           = usePropEnabled(props);
    const propReadOnly          = usePropReadOnly(props);
    const propEditable          = propEnabled && !propReadOnly;
    const propIsValid           = usePropIsValid(props);
    const onValidation          = props.onValidation;
    
    
    
    // defaults:
    const defaultIsValid        : ValResult = null; // if [isValid] was not specified => the default value is unchecked (neither valid nor invalid)
    
    
    
    // states:
    const [wasValid     , setWasValid     ] = useState<ValResult|undefined>((): (ValResult|undefined) => {
        // if control is not editable => no validation
        if (!propEditable)             return null;
        
        
        
        // if [isValid] was set => use [isValid] as the final result:
        if (propIsValid !== undefined) return propIsValid;
        
        
        
        // if [onValidation] was provided, evaluate it at startup:
        if (onValidation)              return undefined; // undefined means => evaluate the [onValidation] *at startup*
        
        
        
        // use default value as fallback:
        return defaultIsValid;
    });
    
    const [succAnimating, setSuccAnimating] = useState<boolean|null>(null); // null => no-succ-animation, true => succ-animation, false => unsucc-animation
    const [errAnimating , setErrAnimating ] = useState<boolean|null>(null); // null => no-err-animation,  true => err-animation,  false => unerr-animation
    
    
    
    /*
     * state is  as <ValidationProvider> if it's [isValid] was set
     * state is  as [onValidation] callback returned
     * otherwise undefined (represents no change needed)
     */
    const isValidFn = ((): (ValResult|undefined) => {
        // if control is not editable => no validation
        if (!propEditable)             return null;
        
        
        
        // if [isValid] was set => use [isValid] as the final result:
        if (propIsValid !== undefined) return propIsValid;
        
        
        
        if (wasValid !== undefined) { // (wasValid !== undefined) means => the validator is ready => evaluate it *now*
            // conditions:
            // if [onValidation] was provided, evaluate it:
            if (!onValidation) return defaultIsValid;
            
            
            
            const event : ValidityChangeEvent = { isValid: null };
            onValidation(event as TValidityChangeEvent);
            return event.isValid;
        } // if
        
        
        
        // no change needed:
        return undefined;
    })();
    
    if ((isValidFn !== undefined) && (wasValid !== isValidFn)) { // change detected => apply the change & start animating
        setWasValid(isValidFn);                                  // remember the last change
        
        
        
        switch (isValidFn) {
            case true: // success
                // if was error => un-error:
                if (wasValid === false) setErrAnimating(false);  // start unerr-animation
                
                setSuccAnimating(true); // start succ-animation
                break;
            
            case false: // error
                // if was success => un-success:
                if (wasValid === true)  setSuccAnimating(false); // start unsucc-animation
                
                setErrAnimating(true);  // start err-animation
                break;
            
            case null: // uncheck
                // if was success => un-success:
                if (wasValid === true)  setSuccAnimating(false); // start unsucc-animation
                
                // if was error => un-error:
                if (wasValid === false) setErrAnimating(false);  // start unerr-animation
                break;
        } // switch
    } // if
    
    
    
    // dom effects:
    
    // watch the changes once (only at startup):
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (wasValid !== undefined) return; // the effect should only run once
        
        
        
        // now validator has been loaded => re-*set the initial* state of `wasValid` with any values other than `undefined`
        // once set, this effect will never be executed again
        if (!onValidation) {
            setWasValid(defaultIsValid);
        }
        else {
            const event : ValidityChangeEvent = { isValid: null };
            onValidation(event as TValidityChangeEvent);
            setWasValid(event.isValid);
        } // if
    }, [wasValid, onValidation]); // the effect should only run once
    
    
    
    // handlers:
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        
        
        
        if (/((?<![a-z])(valid|unvalid)|(?<=[a-z])(Valid|Unvalid))(?![a-z])/.test(event.animationName)) { // if animation is (valid|unvalid)[Foo] or boo(Valid|Unvalid)[Foo]
            // clean up finished animation
            
            setSuccAnimating(null); // stop succ-animation/unsucc-animation
        }
        else if (/((?<![a-z])(invalid|uninvalid)|(?<=[a-z])(Invalid|Uninvalid))(?![a-z])/.test(event.animationName)) { // if animation is (invalid|uninvalid)[Foo] or boo(Invalid|Uninvalid)[Foo]
            // clean up finished animation
            
            setErrAnimating(null);  // stop err-animation/unerr-animation
        } // if
    }, []);
    
    
    
    const noValidation : boolean = (
        !propEditable          // if control is not editable => no validation
        ||
        (propIsValid === null) // ([isValid] === null)       => no validation
        ||
        !onValidation          // no validator               => no validation
    );
    return {
        /**
         * `true`  : validating/validated
         * `false` : invalidating/invalidated
         * `null`  : uncheck/unvalidating/uninvalidating
        */
        isValid : (wasValid ?? defaultIsValid) as ValResult,
        noValidation,
        
        class   : [
            // valid classes:
            ((): string|null => {
                if (succAnimating === true)  return 'validating';
                if (succAnimating === false) return 'unvalidating';
                
                if (wasValid === true)       return 'validated';
                
                return null;
            })(),
            
            
            
            // invalid classes:
            ((): string|null => {
                if (errAnimating === true)   return 'invalidating';
                if (errAnimating === false)  return 'uninvalidating';
                
                if (wasValid === false)      return 'invalidated';
                
                return null;
            })(),
            
            
            
            // neutral classes:
            ((): string|null => {
                if (noValidation) {
                    return 'novalidation';
                }
                else {
                    return null; // discard all classes above
                } // if
            })(),
        ].filter((c) => !!c).join(' ') || null,
        
        handleAnimationEnd,
    };
};
//#endregion invalidable
