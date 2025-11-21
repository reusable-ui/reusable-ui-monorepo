// React:
import {
    // React:
    default as React,
    
    
    
    // Hooks:
    useRef,
    useState,
}                           from 'react'

// Cssfn:
import {
    // Cssfn general types:
    Factory,
    
    
    
    // Cssfn css specific types:
    CssKnownProps,
    CssRule,
    CssStyleCollection,
    
    
    
    // Writes css in javascript:
    rule,
    states,
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui utilities:
import {
    // Hooks:
    useIsomorphicLayoutEffect,
    useEvent,
    useMountedFlag,
    type ScheduledPromise,
    useSetTimeout,
}                           from '@reusable-ui/hooks'               // React helper hooks.
import {
    // Hooks:
    useAnimatingState,
}                           from '@reusable-ui/animating-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.

// Reusable-ui features:
import {
    // Hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'           // Animation stuff of UI.

// Reusable-ui variants:
import {
    // Hooks:
    ThemeName,
    usesThemeConditional,
}                           from '@reusable-ui/themeable'           // Color options of UI.

// Reusable-ui states:
import {
    // Types:
    type DisabledStateProps,
    
    
    
    // Hooks:
    useDisabledState,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.
import {
    // Types:
    type ReadOnlyStateProps,
    
    
    
    // Hooks:
    useReadOnlyState,
}                           from '@reusable-ui/read-only-state'     // Adds editable/read-only functionality to UI components, with transition animations and semantic styling hooks.
import {
    // Types:
    ValidityStateProps,
    
    
    
    // Utilities:
    ifValid        as validityStateIfValid,
    ifInvalid      as validityStateIfInvalid,
    ifUnvalidated  as validityStateIfUnvalidated,
    ifValidating,
    ifInvalidating,
    ifUnvalidating as validityStateIfUnvalidating,
    ifValidatingOrValid,
    ifInvalidatingOrInvalid,
    ifUnvalidatingOrUnvalidated,
}                           from '@reusable-ui/validity-state'      // Adds validation functionality to UI components, with transition animations and semantic styling hooks.



/**
 * @deprecated - Use `ValidityStateVars` instead.
 */
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



// .unvalidating will be added after loosing valid and will be removed after unvalidating-animation done:
const selectorIfUnvalidating   = '.unvalidating'
// if all above are not set => unvalidated:
// optionally use .noval to overwrite native :valid
const selectorIfUnvalidated    = ':is(:not(:is(.validated, .validating, :valid, .unvalidating)), .noval)'

// .uninvalidating will be added after loosing invalid and will be removed after uninvalidating-animation done:
const selectorIfUninvalidating = '.uninvalidating'
// if all above are not set => uninvalidated:
// optionally use .noval to overwrite native :invalid
const selectorIfUninvalidated  = ':is(:not(:is(.invalidated, .invalidating, :invalid, .uninvalidating)), .noval)'



// Not deprecated:
export {
    ifValidating,
    ifInvalidating,
}

/**
 * @deprecated - Use `ifValid` from `@reusable-ui/validity-state` instead.
 */
export const ifValidated       = validityStateIfValid;
/**
 * @deprecated - No longer needed.
 * 
 * Since the `@reusable-ui/validity-state` switches to another state without
 * first *undoing* the current valid state,
 * this conditional statement is no longer needed (never matches).
 */
export const ifUnvalidating    = (styles: CssStyleCollection): CssRule => rule(selectorIfUnvalidating   , styles);
/**
 * @deprecated - No longer needed.
 * 
 * Since the `@reusable-ui/validity-state` switches to another state without
 * first *undoing* the current valid state,
 * this conditional statement is no longer needed (never matches).
 */
export const ifUnvalidated     = (styles: CssStyleCollection): CssRule => rule(selectorIfUnvalidated    , styles);

/**
 * @deprecated - Use `ifValidatingOrValid` instead.
 */
export const ifValid           = ifValidatingOrValid;
/**
 * @deprecated - No longer needed.
 * 
 * Since the `@reusable-ui/validity-state` switches to another state without
 * first *undoing* the current valid state,
 * this conditional statement is no longer needed (never matches).
 */
export const ifUnvalid         = (styles: CssStyleCollection): CssRule => rule([selectorIfUnvalidating  , selectorIfUnvalidated   ], styles);

/**
 * @deprecated - Use `ifInvalid` from `@reusable-ui/validity-state` instead.
 */
export const ifInvalidated     = validityStateIfInvalid;
/**
 * @deprecated - No longer needed.
 * 
 * Since the `@reusable-ui/validity-state` switches to another state without
 * first *undoing* the current invalid state,
 * this conditional statement is no longer needed (never matches).
 */
export const ifUninvalidating  = (styles: CssStyleCollection): CssRule => rule(selectorIfUninvalidating , styles);
/**
 * @deprecated - No longer needed.
 * 
 * Since the `@reusable-ui/validity-state` switches to another state without
 * first *undoing* the current invalid state,
 * this conditional statement is no longer needed (never matches).
 */
export const ifUninvalidated   = (styles: CssStyleCollection): CssRule => rule(selectorIfUninvalidated  , styles);

/**
 * @deprecated - Use `ifInvalidatingOrInvalid` instead.
 */
export const ifInvalid         = ifInvalidatingOrInvalid;
/**
 * @deprecated - No longer needed.
 * 
 * Since the `@reusable-ui/validity-state` switches to another state without
 * first *undoing* the current invalid state,
 * this conditional statement is no longer needed (never matches).
 */
export const ifUninvalid       = (styles: CssStyleCollection): CssRule => rule([selectorIfUninvalidating, selectorIfUninvalidated ], styles);

/**
 * @deprecated - Use `ifUnvalidating` from `@reusable-ui/validity-state` instead.
 */
export const ifNeutralizing    = validityStateIfUnvalidating;
/**
 * @deprecated - Use `ifUnvalidated` from `@reusable-ui/validity-state` instead.
 */
export const ifNeutralized     = validityStateIfUnvalidated;
/**
 * @deprecated - Use `ifUnvalidatingOrUnvalidated` instead.
 */
export const ifNeutralize      = ifUnvalidatingOrUnvalidated;



/**
 * @deprecated - Use `CssValidityState` instead.
 */
export interface InvalidableStuff { invalidableRule: Factory<CssRule>, invalidableVars: CssVars<InvalidableVars> }

/**
 * @deprecated - Use `CssValidityStateOptions` instead.
 */
export interface InvalidableConfig {
    animValid     ?: CssKnownProps['animation']
    animUnvalid   ?: CssKnownProps['animation']
    
    animInvalid   ?: CssKnownProps['animation']
    animUninvalid ?: CssKnownProps['animation']
}
/**
 * @deprecated - Use `usesValidityState` instead.
 * 
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

/**
 * @deprecated - Use `<Component validity={true} />` instead.
 */
export const markValid   = (): CssRule => style({
    // variants:
    ...usesThemeValid(),   // switch to valid theme
});
/**
 * @deprecated - Use conditional:
 * ```
 * export const componentStyle = () => style({
 *     backgroundColor : `${validityStateVars.isValid} ${colorVars.successBase}`,
 *     color           : `${validityStateVars.isValid} ${colorVars.successFlip}`,
 * });
 * ```
 * 
 * Creates a conditional theme color rules at valid state.
 * @param themeName The theme name at valid state.
 * @returns A `CssRule` represents a conditional theme color rules at valid state.
 */
export const usesThemeValid   = (themeName: ThemeName|null = 'success'): CssRule => usesThemeConditional(themeName);

/**
 * @deprecated - Use `<Component validity={false} />` instead.
 */
export const markInvalid = (): CssRule => style({
    // variants:
    ...usesThemeInvalid(), // switch to invalid theme
});
/**
 * @deprecated - Use conditional:
 * ```
 * export const componentStyle = () => style({
 *     backgroundColor : `${validityStateVars.isInvalid} ${colorVars.dangerBase}`,
 *     color           : `${validityStateVars.isInvalid} ${colorVars.dangerFlip}`,
 * });
 * ```
 * 
 * Creates a conditional theme color rules at invalid state.
 * @param themeName The theme name at invalid state.
 * @returns A `CssRule` represents a conditional theme color rules at invalid state.
 */
export const usesThemeInvalid = (themeName: ThemeName|null = 'danger' ): CssRule => usesThemeConditional(themeName);



/**
 * @deprecated - No longer needed.
 */
export interface ValidityChangeEvent {
    /**
     * @deprecated - Use `validity` instead.
     */
    isValid ?: ValidityStateProps['validity']
}

/**
 * @deprecated - No longer needed.
 * 
 * Since `@reusable-ui/validity-state` uses provided `computedValidity` for
 * validation logic updates, the dependencies to recompute the `computedValidity` is
 * on the component's `use(Layout)Effect()` itself.
 */
export type ValidationDeps = (bases: unknown[]) => unknown[]

/**
 * @deprecated - Use `props.onValidityUpdate` instead.
 */
export type ValidationEventHandler<TValidityChangeEvent extends ValidityChangeEvent = ValidityChangeEvent> = (event: TValidityChangeEvent) => void|Promise<void>

/**
 * @deprecated - Use `ValidityStateProps` instead.
 */
export interface InvalidableProps<TValidityChangeEvent extends ValidityChangeEvent = ValidityChangeEvent> {
    // validations:
    /**
     * @deprecated - No longer needed.
     * 
     * Since `@reusable-ui/validity-state` uses provided `computedValidity` for
     * validation logic updates, the dependencies to recompute the `computedValidity` is
     * on the component's `use(Layout)Effect()` itself.
     */
    validationDeps    ?: ValidationDeps
    
    /**
     * @deprecated - Use `props.onValidityUpdate` instead.
     */
    onValidation      ?: ValidationEventHandler<TValidityChangeEvent>
    
    validDelay        ?: number
    invalidDelay      ?: number
    noValidationDelay ?: number
    
    /**
     * @deprecated - Use `validity` instead.
     */
    isValid           ?: ValidityStateProps['validity']
    
    /**
     * @deprecated - No longer supported.
     * 
     * Alternative: Pass `<Component validity={forceValidity} />` from resolved `useValidityState()`.
     */
    cascadeValidation ?: boolean
    
    /**
     * @deprecated - Use `validity='auto'` to enable validation or `validity={null}` to disable.
     */
    enableValidation  ?: boolean
}

/**
 * @deprecated - Use `ValidityPhase` instead.
 */
export const enum InvalidableState {
    Validated      = 3,
    Validating     = 2,
    Unvalidating   = 1,
    
    Neutralized    = 0,
    
    Uninvalidating = -1,
    Invalidating   = -2,
    Invalidated    = -3,
}

/**
 * @deprecated - Use `ValidityBehaviorState` instead.
 */
export interface InvalidableApi<TElement extends Element = HTMLElement> {
    /**
     * Determines whether the validation is statically disabled.
     */
    isNoValidation        : boolean
    /**
     * `true`  : validating/validated  
     * `false` : invalidating/invalidated  
     * `null`  : uncheck/unvalidating/uninvalidating
    */
    isValid               : boolean | null
    /**
     * `true`  : validating/validated  
     * `false` : invalidating/invalidated  
     * `null`  : uncheck/unvalidating/uninvalidating
    */
    isValidDelayed        : boolean | null
    ariaInvalid           : boolean
    
    state                 : InvalidableState
    class                 : string|null
    
    handleAnimationStart  : React.AnimationEventHandler<TElement>
    handleAnimationEnd    : React.AnimationEventHandler<TElement>
    handleAnimationCancel : React.AnimationEventHandler<TElement>
}

/**
 * @deprecated - Use `useValidityBehaviorState` instead.
 */
export const useInvalidable = <TElement extends Element = HTMLElement, TValidityChangeEvent extends ValidityChangeEvent = ValidityChangeEvent>(props: InvalidableProps<TValidityChangeEvent> & DisabledStateProps & ReadOnlyStateProps): InvalidableApi<TElement> => {
    // props:
    const {
        // validations:
        validationDeps,
        onValidation,
        
        validDelay         = 300,
        invalidDelay       = 600,
        noValidationDelay  = 0,
        
        isValid            = 'auto',
    } = props;
    
    // Flags:
    
    // Resolve whether the component is disabled:
    const isDisabled        = useDisabledState(props as Parameters<typeof useDisabledState>[0]);
    
    // Resolve whether the component is readonly:
    const isReadonly        = useReadOnlyState(props as Parameters<typeof useReadOnlyState>[0]);
    
    // Resolve whether the component is in a restricted state:
    const isRestricted      = isDisabled || isReadonly;
    
    /**
     * `undefined` : *automatic* detect valid/invalid state.  
     * `null`      : force validation state to *uncheck*.  
     * `true`      : force validation state to *valid*.  
     * `false`     : force validation state to *invalid*.
     */
    const propIsValid      = (
        (isValid === 'auto')
        ? undefined
        : isValid
    );
    
    /**
     * Determines whether the validation is statically disabled (always *uncheck*).
     */
    const propNoValidation = (
        // conditions that statically disable the validation:
        isRestricted            // the component is not editable      => force validation result to *uncheck*
        ||
        (propIsValid === null)  // `isValid` is provided as *uncheck* => force validation result to *uncheck*
    );
    
    
    
    // computed props:
    
    /**
     * The result is forced to *uncheck* if the component is not editable.
     * The result is forced to *uncheck*|*valid*|*invalid* if `isValid` is provided (not `undefined`).
     * Otherwise, the dynamic validation is needed by returning `undefined`.
     */
    const staticValidationResult : boolean | null|undefined = ((): boolean | null|undefined => {
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
    
    const [dynamicValidationResult, setDynamicValidationResult] = useState<boolean | null>(null); // initially *uncheck* (null)
    
    const isMounted = useMountedFlag();
    const baseValidationDeps : unknown[] = [];
    const dynamicValidationDeps = [
        ...(validationDeps ? validationDeps(baseValidationDeps) : baseValidationDeps),
        
        isDynamicValidationResultNeeded, // whether the dynamic validation is needed
    ];
    
    /**
     * We call `onValidation` inside `useIsomorphicLayoutEffect` to ensure that the `onValidation` is called during the render phase,
     * in case the `onValidation` callback is used to update the state of the component.
     */
    // We use `useIsomorphicLayoutEffect` instead of `useEffect` to update `dynamicValidationResult` as quickly as possible before the browser has a chance to repaint the page.
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!isDynamicValidationResultNeeded) return; // the dynamic validation is not needed => do nothing
        
        
        
        // validating:
        const event : ValidityChangeEvent = { isValid: true }; // set the initial dynamic validation to *valid*
        Promise.resolve<void>(onValidation(event as TValidityChangeEvent)).then(() => { // waiting for mutation to be done
            // conditions:
            if (!isMounted.current) return; // the component was unloaded before awaiting returned => do nothing
            
            
            
            const {
                isValid = 'auto',
            } = event;
            const newDynamicValidationResult = (isValid === 'auto') ? null : isValid; // get the result of the dynamic validation
            setDynamicValidationResult(newDynamicValidationResult); // remember the last change
        });
        
        
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dynamicValidationDeps, onValidation]);
    
    const finalValidationResult : boolean | null = (
        isDynamicValidationResultNeeded
        ? dynamicValidationResult          // if the dynamic validation is needed => use the result of the dynamic validation
        : (staticValidationResult ?? null) // otherwise                           => use the result of the static  validation
    );
    
    
    
    const [delayedValidationResult, setDelayedValidationResult] = useState<boolean | null>(finalValidationResult); // initially same as `finalValidationResult`
    const setTimeoutAsync = useSetTimeout();
    const delayedPromise  = useRef<ScheduledPromise<boolean>|null>(null);
    const syncDelayedValidationResult = useEvent((): void => {
        // abort the previous delayed validation (if any):
        delayedPromise.current?.abort();
        delayedPromise.current = null;
        
        
        
        // start a new delayed validation:
        const delay = (
            (finalValidationResult === true)
            ? validDelay            // *valid*
            : (
                (finalValidationResult === false)
                ? invalidDelay      // *invalid*
                : noValidationDelay // *uncheck*
            )
        );
        if (delay <= 0) {
            // actions:
            setDelayedValidationResult(finalValidationResult); // apply the (un)delayed validation result
        }
        else {
            (delayedPromise.current = setTimeoutAsync(delay)).then((isDone) => {
                // conditions:
                if (!isDone) return; // the component was unloaded before the timer runs => do nothing
                
                
                
                // actions:
                setDelayedValidationResult(finalValidationResult); // apply the delayed validation result
            });
        } // if
    });
    // We use `useIsomorphicLayoutEffect` instead of `useEffect` to update `delayedValidationResult` as quickly as possible (if the delay is 0) before the browser has a chance to repaint the page.
    useIsomorphicLayoutEffect(syncDelayedValidationResult, [finalValidationResult]); // auto-sync the delayed validation result when the `finalValidationResult` changes
    
    
    
    // states:
    type UndoAnimationState =
        |0     // positive 0 => represents *unvalid*   (undoing *valid*)
        |-0    // negative 0 => represents *uninvalid* (undoing *invalid*)
    type AnimationState     =
        |true  // represents *valid*
        |false // represents *invalid*
        |UndoAnimationState
    const undoAnimationStateRef = useRef<UndoAnimationState>(0); // Assumes the initial value was *unvalid* (positive 0). Whether the initial value is *unvalid* (positive 0) or *uninvalid* (negative 0) is not matter for `useAnimatingState`, the `animation` is always initially `undefined`.
    const newAnimationState : AnimationState = ( // converts `boolean | null` to `AnimationState`
        delayedValidationResult
        ??
        // Converts *uncheck* to *unvalid* (positive 0) or *uninvalid* (negative 0), depending on the last *undo*.
        undoAnimationStateRef.current
    );
    
    const [animationState, setAnimationState, animation, {handleAnimationStart, handleAnimationEnd, handleAnimationCancel}] = useAnimatingState<AnimationState, TElement>({
        initialState  : newAnimationState,
        animationName : /((^|[^a-z])(valid|unvalid|invalid|uninvalid)|([a-z])(Valid|Unvalid|Invalid|Uninvalid))(?![a-z])/,
    });
    
    
    
    // update state:
    // We use `useIsomorphicLayoutEffect` instead of `useEffect` to update `animationState` as quickly as possible before the browser has a chance to repaint the page.
    useIsomorphicLayoutEffect(() => {
        setAnimationState((currentAnimationState) => {
            // conditions:
            if (currentAnimationState === newAnimationState) return currentAnimationState; // already the same => ignore
            
            
            
            // update the state and start animating:
            if (currentAnimationState !== 0) { // when already *valid* (true) or *invalid* (false)
                /*
                    When the `currentAnimationState` is *already* in *valid* or *invalid* state,
                    do *not instantly* change from *valid* to *invalid* or vice versa,
                    we need to *undo* the *valid* to *unvalid* or *invalid* to *uninvalid* *before* applying the new state.
                */
                const undoAnimationState : UndoAnimationState = (
                    currentAnimationState
                    ? +0 // if *valid*   (true)  => undo to *unvalid*   (positive 0)
                    : -0 // if *invalid* (false) => undo to *uninvalid* (negative 0)
                );
                undoAnimationStateRef.current = undoAnimationState; // remember the last change
                return undoAnimationState;
                /*
                    then the `setAnimationState` above causes `useAnimatingState` to re-render with `animationState` as *unvalid* or *uninvalid* and the `animation` as *unvalid* or *uninvalid* (if having running animation) or `undefined` (if no animation),
                    At the next render the `else` code below will be executed.
                */
            }
            else { // when *unvalid* (positive 0) or *uninvalid* (negative 0)
                if (animation === 0) { // when there is an ongoing animation of *unvalid* or *uninvalid*
                    return currentAnimationState; // keep the animation running
                }
                else { // when there is no animation or there is an ongoing animation other than *unvalid* or *uninvalid*
                    /*
                        When the `currentAnimationState` is *unvalid* or *uninvalid*,
                        We can directly set the new state, no matter if the animation of *valid* (true) or *invalid* (false) is running or not running (undefined).
                    */
                    return newAnimationState; // apply the new state
                } // if
            } // if
        });
    }, [newAnimationState, animation]); // auto-sync the `animationState` when the `newAnimationState` or `animation` changes
    
    
    
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
        if (animationState === true)  return InvalidableState.Validated;
        // fully invalidated:
        if (animationState === false) return InvalidableState.Invalidated;
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
                    return 'noval'; // statically disabled (always *uncheck*)
                }
                else {
                    return null; // discard all classes above
                } // if
        } // switch
    })();
    
    
    
    // api:
    return {
        isNoValidation : propNoValidation,
        isValid        : finalValidationResult,
        isValidDelayed : delayedValidationResult,
        ariaInvalid    : (finalValidationResult === false),
        
        state          : state,
        class          : stateClass,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    };
};
