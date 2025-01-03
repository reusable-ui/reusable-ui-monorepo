// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useState,
}                           from 'react'

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
    states,
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui utilities:
import {
    // hooks:
    useIsomorphicLayoutEffect,
    useMountedFlag,
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
import {
    // hooks:
    useAnimatingState,
}                           from '@reusable-ui/animating-state' // a hook for creating animating state

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
}                           from '@reusable-ui/themeable'       // color options of UI



// hooks:

// states:

//#region invalidable
export interface InvalidableVars {
    animValid   : any
    animInvalid : any
}
const [invalidableVars] = cssVars<InvalidableVars>({ prefix: 'iv', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names

{
    const {animationRegistry: {registerAnim}} = usesAnimation();
    registerAnim(invalidableVars.animValid);
    registerAnim(invalidableVars.animInvalid);
}



// .validated will be added after validating-animation done:
const selectorIfValidated      = '.validated'
// .validating = styled valid, :valid = native valid:
// the .validated, .unvalidating, .noval are used to overwrite native :valid
const selectorIfValidating     = ':is(.validating, :valid:not(:is(.validated, .unvalidating, .noval, .invalidated, .invalidating, .uninvalidating)))'
// .unvalidating will be added after loosing valid and will be removed after unvalidating-animation done:
const selectorIfUnvalidating   = '.unvalidating'
// if all above are not set => unvalidated:
// optionally use .noval to overwrite native :valid
const selectorIfUnvalidated    = ':is(:not(:is(.validated, .validating, :valid, .unvalidating)), .noval)'

// .invalidated will be added after invalidating-animation done:
const selectorIfInvalidated    = '.invalidated'
// .invalidating = styled invalid, :invalid = native invalid:
// the .invalidated, .uninvalidating, .noval are used to overwrite native :invalid
const selectorIfInvalidating   = ':is(.invalidating, :invalid:not(:is(.invalidated, .uninvalidating, .noval, .validated, .validating, .unvalidating)))'
// .uninvalidating will be added after loosing invalid and will be removed after uninvalidating-animation done:
const selectorIfUninvalidating = '.uninvalidating'
// if all above are not set => uninvalidated:
// optionally use .noval to overwrite native :invalid
const selectorIfUninvalidated  = ':is(:not(:is(.invalidated, .invalidating, :invalid, .uninvalidating)), .noval)'

// if all above are not set => neutralized
// optionally use .noval to kill pseudo :valid & :invalid:
const selectorIfNeutralized    = ':is(:not(:is(.validated, .validating, :valid, .unvalidating, .invalidated, .invalidating, :invalid, .uninvalidating)), .noval)'

export const ifValidated       = (styles: CssStyleCollection): CssRule => rule(selectorIfValidated      , styles);
export const ifValidating      = (styles: CssStyleCollection): CssRule => rule(selectorIfValidating     , styles);
export const ifUnvalidating    = (styles: CssStyleCollection): CssRule => rule(selectorIfUnvalidating   , styles);
export const ifUnvalidated     = (styles: CssStyleCollection): CssRule => rule(selectorIfUnvalidated    , styles);

export const ifValid           = (styles: CssStyleCollection): CssRule => rule([selectorIfValidating    , selectorIfValidated     ], styles);
export const ifUnvalid         = (styles: CssStyleCollection): CssRule => rule([selectorIfUnvalidating  , selectorIfUnvalidated   ], styles);

export const ifInvalidated     = (styles: CssStyleCollection): CssRule => rule(selectorIfInvalidated    , styles);
export const ifInvalidating    = (styles: CssStyleCollection): CssRule => rule(selectorIfInvalidating   , styles);
export const ifUninvalidating  = (styles: CssStyleCollection): CssRule => rule(selectorIfUninvalidating , styles);
export const ifUninvalidated   = (styles: CssStyleCollection): CssRule => rule(selectorIfUninvalidated  , styles);

export const ifInvalid         = (styles: CssStyleCollection): CssRule => rule([selectorIfInvalidating  , selectorIfInvalidated   ], styles);
export const ifUninvalid       = (styles: CssStyleCollection): CssRule => rule([selectorIfUninvalidating, selectorIfUninvalidated ], styles);

export const ifNeutralizing    = (styles: CssStyleCollection): CssRule => rule([selectorIfUnvalidating  , selectorIfUninvalidating], styles);
export const ifNeutralized     = (styles: CssStyleCollection): CssRule => rule(selectorIfNeutralized    , styles);
export const ifNeutralize      = (styles: CssStyleCollection): CssRule => rule([selectorIfUnvalidating  , selectorIfUninvalidating, selectorIfNeutralized], styles);



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
            // animation states:
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
    // variants:
    ...usesThemeValid(),   // switch to valid theme
});
/**
 * Creates a conditional theme color rules at valid state.
 * @param themeName The theme name at valid state.
 * @returns A `CssRule` represents a conditional theme color rules at valid state.
 */
export const usesThemeValid   = (themeName: ThemeName|null = 'success'): CssRule => usesThemeConditional(themeName);

export const markInvalid = (): CssRule => style({
    // variants:
    ...usesThemeInvalid(), // switch to invalid theme
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
        Required<Pick<ValidationProps,
            |'isValid'
        >>
{
}
export type ValidationDeps = (bases: unknown[]) => unknown[]
export type ValidationEventHandler<TValidityChangeEvent extends ValidityChangeEvent = ValidityChangeEvent> = (event: TValidityChangeEvent) => void|Promise<void>
export interface InvalidableProps<TValidityChangeEvent extends ValidityChangeEvent = ValidityChangeEvent>
    extends
        // validations:
        Partial<ValidationProps>
{
    // validations:
    validationDeps ?: ValidationDeps
    onValidation   ?: ValidationEventHandler<TValidityChangeEvent>
}

export const enum InvalidableState {
    Validated      = 3,
    Validating     = 2,
    Unvalidating   = 1,
    
    Neutralized    = 0,
    
    Uninvalidating = -1,
    Invalidating   = -2,
    Invalidated    = -3,
}

export interface InvalidableApi<TElement extends Element = HTMLElement> {
    isValid               : ValResult
    isNoValidation        : boolean
    
    state                 : InvalidableState
    class                 : string|null
    
    handleAnimationStart  : React.AnimationEventHandler<TElement>
    handleAnimationEnd    : React.AnimationEventHandler<TElement>
    handleAnimationCancel : React.AnimationEventHandler<TElement>
}

export const useInvalidable = <TElement extends Element = HTMLElement, TValidityChangeEvent extends ValidityChangeEvent = ValidityChangeEvent>(props: InvalidableProps<TValidityChangeEvent> & Pick<AccessibilityProps, 'enabled'|'inheritEnabled'|'readOnly'|'inheritReadOnly'>): InvalidableApi<TElement> => {
    // props:
    const {
        validationDeps,
        onValidation,
    } = props;
    
    const propEnabled      = usePropEnabled(props);
    const propReadOnly     = usePropReadOnly(props);
    const propEditable     = propEnabled && !propReadOnly; // the component is editable if it is enabled and not read-only
    
    /**
     * `undefined` : *automatic* detect valid/invalid state.  
     * `null`      : force validation state to *uncheck*.  
     * `true`      : force validation state to *valid*.  
     * `false`     : force validation state to *invalid*.
     */
    const propIsValid      = usePropIsValid(props);        // the computed validation result based on the props and the context
    
    /**
     * Determines whether the validation is disabled (always *uncheck*).
     */
    const propNoValidation = (
        // conditions that disable the validation:
        !propEditable           // the component is not editable      => force validation result to *uncheck*
        ||
        (propIsValid === null)  // `isValid` is provided as *uncheck* => force validation result to *uncheck*
    );
    
    
    
    // computed props:
    
    /**
     * The result is forced to *uncheck* if the component is not editable.
     * The result is forced to *uncheck*|*valid*|*invalid* if `isValid` is provided (not `undefined`).
     * Otherwise, the dynamic validation is needed by returning `undefined`.
     */
    const staticValidationResult : ValResult|undefined = ((): ValResult|undefined => {
        // if control is not editable => no validation
        if (propNoValidation)          return null; // if the component validation is disabled => force validation result to *uncheck*
        
        
        
        /*controllable*/
        if (propIsValid !== undefined) return propIsValid; // if `isValid` is provided (not `undefined`) => force validation result to *uncheck*|*valid*|*invalid*
        
        
        
        return undefined; // if all above is skipped => *automatic* detect valid/invalid state => continue to the dynamic validation
    })();
    
    /**
     * Determines if dynamic validation is needed.
     * Dynamic validation is needed only if `staticValidationResult` is not forced to *uncheck*|*valid*|*invalid* and `onValidation` is provided.
     */
    const isDynamicValidationResultNeeded = (
        (staticValidationResult === undefined) // the dynamic validation is needed only if the `staticValidationResult` is not forced to *uncheck*|*valid*|*invalid*
        &&
        !!onValidation                         // the dynamic validation is needed only if the `onValidation` is provided
    );
    
    const [dynamicValidationResult, setDynamicValidationResult] = useState<ValResult>(null); // initially *uncheck* (null)
    
    const isMounted = useMountedFlag();
    const baseValidationDeps : unknown[] = [];
    const dynamicValidationDeps = [
        ...(validationDeps ? validationDeps(baseValidationDeps) : baseValidationDeps),
        
        isDynamicValidationResultNeeded, // whether the dynamic validation is needed
    ];
    
    /**
     * We call `onValidation()` inside `useIsomorphicLayoutEffect()` to ensure that the `onValidation()` is called during the render phase,
     * in case the `onValidation()` callback is used to update the state of the component.
     */
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!isDynamicValidationResultNeeded) return; // the dynamic validation is not needed => do nothing
        
        
        
        // validating:
        const event : ValidityChangeEvent = { isValid: true }; // set the initial dynamic validation to *valid*
        Promise.resolve<void>(onValidation(event as TValidityChangeEvent)).then(() => { // waiting for mutation to be done
            // conditions:
            if (!isMounted.current) return; // the component was unloaded before awaiting returned => do nothing
            
            
            
            const newDynamicValidationResult = event.isValid; // get the result of the dynamic validation
            setDynamicValidationResult(newDynamicValidationResult); // remember the last change
        });
        
        
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dynamicValidationDeps, onValidation]);
    
    const wasValid = useRef<boolean>(true); // assumes initially was *valid*
    const finalValidationResult : boolean|0|-0 = (
        (
            isDynamicValidationResultNeeded
            ? dynamicValidationResult // if the dynamic validation is needed => use the result of the dynamic validation
            : staticValidationResult  // otherwise                           => use the result of the static  validation
        )
        ??
        // if above is null|undefined => use 0 (positive 0 -or- negative 0) in which indicating as *uncheck*
        // positive 0: now is *uncheck* and was *valid*
        // negative 0: now is *uncheck* and was *invalid*
        (wasValid.current ? +0 : -0)
    );
    
    
    
    // states:
    const [isValid, setIsValid, animation, {handleAnimationStart, handleAnimationEnd, handleAnimationCancel}] = useAnimatingState<boolean|0|-0, TElement>({
        initialState  : finalValidationResult,
        animationName : /((^|[^a-z])(valid|unvalid|invalid|uninvalid)|([a-z])(Valid|Unvalid|Invalid|Uninvalid))(?![a-z])/,
    });
    
    
    
    // update state:
    if (isValid !== finalValidationResult) { // change detected => apply the change & start animating
        if (isValid !== 0) { // was `valid` (true) or was `invalid` (false) => need to apply `un-valid` or `un-invalid` *before* applying other states
            setIsValid(wasValid.current ? +0 : -0);
            /*
                then the `setIsValid` above causing to re-render,
                and at the next-render the `setIsValid` below will be executed
            */
        }
        else {
            setIsValid(finalValidationResult); // remember the last change
        } // if
    } // if
    
    wasValid.current = (typeof(isValid) === 'boolean') ? isValid : Object.is(isValid, +0);
    
    
    
    // fn props:
    const state = ((): InvalidableState => {
        // validating:
        if (animation === true)       return InvalidableState.Validating;
        // unvalidating:
        if (Object.is(animation, +0)) return InvalidableState.Unvalidating;
        
        // invalidating:
        if (animation === false)      return InvalidableState.Invalidating;
        // uninvalidating:
        if (Object.is(animation, -0)) return InvalidableState.Uninvalidating;
        
        
        
        // fully validated:
        if (isValid === true)         return InvalidableState.Validated;
        // fully invalidated:
        if (isValid === false)        return InvalidableState.Invalidated;
        // fully neutralized:
        return InvalidableState.Neutralized;
    })();
    const stateClass = ((): string|null => {
        switch (state) {
            // validating:
            case InvalidableState.Validating:
                return 'validating';
            // unvalidating:
            case InvalidableState.Unvalidating:
                return 'unvalidating';
            
            // invalidating:
            case InvalidableState.Invalidating:
                return 'invalidating';
            // uninvalidating:
            case InvalidableState.Uninvalidating:
                return 'uninvalidating';
            
            
            
            // fully validated:
            case InvalidableState.Validated:
                return 'validated';
            // fully invalidated:
            case InvalidableState.Invalidated:
                return 'invalidated';
            // fully neutralized:
            default:
                if (propNoValidation) {
                    return 'noval';
                }
                else {
                    return null; // discard all classes above
                } // if
        } // switch
    })();
    
    
    
    // api:
    return {
        /**
         * `true`  : validating/validated
         * `false` : invalidating/invalidated
         * `null`  : uncheck/unvalidating/uninvalidating
        */
        isValid : ((typeof(isValid) === 'boolean') ? isValid : null),
        isNoValidation: propNoValidation,
        
        state   : state,
        class   : stateClass,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    };
};
//#endregion invalidable
