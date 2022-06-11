// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    useCallback,
}                           from 'react'

// cssfn:
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
    states,
    keyframes,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // utilities:
    cssVar,
}                           from '@cssfn/css-var'               // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // hooks:
    useIsomorphicLayoutEffect,
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import {
    // hooks:
    Result as ValResult,
    usePropIsValid,
    
    
    
    // react components:
    ValidationProps,
}                           from '@reusable-ui/validations'     // a validation management system
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    ThemeName,
    usesThemeImportant,
    ifOutlined,
    ifMild,
    usesMildVariant,
    usesBackg,
    usesForeg,
    usesAnim,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    ifActive,
}                           from '@reusable-ui/indicator'       // a base component
import {
    // styles:
    usesControlLayout,
    usesControlVariants,
    usesControlStates,
    
    
    
    // react components:
    ControlProps,
    Control,
}                           from '@reusable-ui/control'         // a base component



// hooks:

// states:

//#region validInvalid
export interface ValidInvalidVars {
    animValid   : any
    animInvalid : any
    
    foregStart  : any
    backgStart  : any
}
const [valids] = cssVar<ValidInvalidVars>();

{
    const [, , animRegistry] = usesAnim();
    animRegistry.registerAnim(valids.animValid);
    animRegistry.registerAnim(valids.animInvalid);
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



/**
 * Uses valid & invalid states.
 * @returns A `StateMixin<ValidInvalidVars>` represents valid & invalid state definitions.
 */
export const usesValidInvalidState = (): StateMixin<ValidInvalidVars> => {
    // dependencies:
    const [, milds ] = usesMildVariant();
    const [, backgs] = usesBackg();
    const [, foregs] = usesForeg();
    
    
    
    return [
        () => style({
            ...states([
                ifValidating({
                    ...vars({
                        [valids.animValid]   : editableControls.animValid,
                    }),
                }),
                ifUnvalidating({
                    ...vars({
                        [valids.animValid]   : editableControls.animUnvalid,
                    }),
                }),
                
                ifInvalidating({
                    ...vars({
                        [valids.animInvalid] : editableControls.animInvalid,
                    }),
                }),
                ifUninvalidating({
                    ...vars({
                        [valids.animInvalid] : editableControls.animUninvalid,
                    }),
                }),
            ]),
            
            
            
            ...vars({
                [valids.backgStart] : milds.backgFn,
                [valids.foregStart] : milds.foregFn,
            }),
            ...variants([
                ifOutlined({
                    ...vars({
                        [valids.backgStart] : backgs.backgColorFn,
                        [valids.foregStart] : foregs.foregFn,
                    }),
                }),
                ifMild({
                    ...vars({
                        [valids.backgStart] : backgs.backgColorFn,
                        [valids.foregStart] : foregs.foregFn,
                    }),
                }),
            ]),
            ...states([
                ifActive({
                    ...vars({
                        [valids.backgStart] : milds.backgFn,
                        [valids.foregStart] : milds.foregFn,
                    }),
                }),
            ]),
        }),
        valids,
    ];
};

export const markValid   = (): CssRule => style({
    ...imports([
        usesThemeValid(),   // switch to valid theme
    ]),
});
/**
 * Creates a conditional color definitions at valid state.
 * @param themeName The name of valid theme.
 * @returns A `CssRule` represents the conditional color definitions at valid state.
 */
export const usesThemeValid   = (themeName: ThemeName|null = 'success'): CssRule => usesThemeImportant(themeName);

export const markInvalid = (): CssRule => style({
    ...imports([
        usesThemeInvalid(), // switch to invalid theme
    ]),
});
/**
 * Creates a conditional color definitions at invalid state.
 * @param themeName The name of invalid theme.
 * @returns A `CssRule` represents the conditional color definitions at invalid state.
 */
export const usesThemeInvalid = (themeName: ThemeName|null = 'danger' ): CssRule => usesThemeImportant(themeName);



export type EditableControlElement = HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
export type ValidatorHandler       = () => ValResult
export type CustomValidatorHandler = (state: ValidityState, value: string) => ValResult

export const useInputValidator     = (customValidator?: CustomValidatorHandler) => {
    // states:
    const isValid = useRef<ValResult>(null); // initially unchecked (neither valid nor invalid)
    
    
    
    // callbacks:
    /**
     * Handles the validation result.
     * @returns  
     * `null`  = uncheck.  
     * `true`  = valid.  
     * `false` = invalid.
     */
    const validator = useCallback<ValidatorHandler>(() =>
        isValid.current
    , []);
    
    
    
    // handlers:
    const handleValidation = useCallback((element: EditableControlElement, immediately = false) => {
        const performUpdate = (validity: ValidityState, prevValue?: string) => {
            // conditions:
            // make sure the <Control>'s value was not modified during delaying
            const currentValue = element.value;
            if ((prevValue !== undefined) && (prevValue !== currentValue)) return; // the value has been modified during delaying => abort further validating
            
            
            
            // remember the validation result:
            isValid.current = (customValidator ? customValidator(validity, currentValue) : validity.valid);
        };
        
        
        
        if (immediately) {
            // instant validating:
            performUpdate(element.validity);
        }
        else {
            const validity  = element.validity;
            const prevValue = element.value;
            
            // delaying the validation, to avoid unpleasant splash effect during editing
            setTimeout(
                () => performUpdate(validity, prevValue),
                (validity.valid !== false) ? 300 : 600
            );
        } // if
    }, [customValidator]);
    
    const handleInit       = useCallback((element: EditableControlElement) => {
        handleValidation(element, /*immediately =*/true);
    }, [handleValidation]);
    
    const handleChange     = useEvent<React.ChangeEventHandler<EditableControlElement>>(({target}) => {
        handleValidation(target);
    }, [handleValidation]);
    
    
    
    return {
        validator,
        
        handleInit,
        handleChange,
    };
};

export const useValidInvalidState  = <TElement extends EditableControlElement = EditableControlElement>(props: EditableControlProps<TElement>, validator?: ValidatorHandler) => {
    // fn props:
    const propEnabled           = usePropEnabled(props);
    const propReadOnly          = usePropReadOnly(props);
    const propEditable          = propEnabled && !propReadOnly;
    const propIsValid           = usePropIsValid(props);
    
    
    
    // defaults:
    const defaultIsValid        : ValResult = null; // if [isValid] was not specified => the default value is unchecked (neither valid nor invalid)
    
    
    
    // states:
    const [wasValid     , setWasValid     ] = useState<ValResult|undefined>((): (ValResult|undefined) => {
        // if control is not editable => no validation
        if (!propEditable)             return null;
        
        
        
        // if [isValid] was set => use [isValid] as the final result:
        if (propIsValid !== undefined) return propIsValid;
        
        
        
        // if `validator` was provided, evaluate it at startup:
        if (validator)                 return undefined; // undefined means => evaluate the validator *at startup*
        
        
        
        // use default value as fallback:
        return defaultIsValid;
    });
    
    const [succAnimating, setSuccAnimating] = useState<boolean|null>(null); // null => no-succ-animation, true => succ-animation, false => unsucc-animation
    const [errAnimating , setErrAnimating ] = useState<boolean|null>(null); // null => no-err-animation,  true => err-animation,  false => unerr-animation
    
    
    
    /*
     * state is  as <ValidationProvider> if it's [isValid] was set
     * state is  as validator callback returned
     * otherwise undefined (represents no change needed)
     */
    const isValidFn = ((): (ValResult|undefined) => {
        // if control is not editable => no validation
        if (!propEditable)             return null;
        
        
        
        // if [isValid] was set => use [isValid] as the final result:
        if (propIsValid !== undefined) return propIsValid;
        
        
        
        // if `validator` was provided, evaluate it:
        if ((wasValid !== undefined))  return (validator ? validator() : defaultIsValid); // (wasValid !== undefined) means => the validator is ready => evaluate it *now*
        
        
        
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
        setWasValid(validator ? validator() : defaultIsValid);
    }, [wasValid, validator]); // the effect should only run once
    
    
    
    // handlers:
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<Element>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        
        
        
        if (!/((?<![a-z])(valid|unvalid)|(?<=[a-z])(Valid|Unvalid))(?![a-z])/.test(event.animationName)) { // if animation is (valid|unvalid)[Foo] or boo(Valid|Unvalid)[Foo]
            // clean up finished animation
            
            setSuccAnimating(null); // stop succ-animation/unsucc-animation
        }
        else if (!/((?<![a-z])(invalid|uninvalid)|(?<=[a-z])(Invalid|Uninvalid))(?![a-z])/.test(event.animationName)) { // if animation is (invalid|uninvalid)[Foo] or boo(Invalid|Uninvalid)[Foo]
            // clean up finished animation
            
            setErrAnimating(null);  // stop err-animation/unerr-animation
        } // if
    }, []);
    
    
    const noValidation : boolean = (
        !propEditable          // if control is not editable => no validation
        ||
        (propIsValid === null) // ([isValid] === null) => no validation
        ||
        !validator
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
//#endregion validInvalid



// styles:
export const usesEditableControlLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesControlLayout(),
        ]),
        ...style({
            // customize:
            ...usesCssProps(editableControls), // apply config's cssProps
        }),
    });
};
export const usesEditableControlVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(editableControls);
    
    
    
    return style({
        ...imports([
            // variants:
            usesControlVariants(),
            
            // layouts:
            sizesRule,
        ]),
    });
};
export const usesEditableControlStates = () => {
    // dependencies:
    
    // states:
    const [validInvalidRule] = usesValidInvalidState();
    
    
    
    return style({
        ...imports([
            // states:
            usesControlStates(),
            validInvalidRule,
        ]),
        ...states([
            ifValid({
                ...imports([
                    markValid(),
                ]),
            }),
            ifInvalid({
                ...imports([
                    markInvalid(),
                ]),
            }),
        ]),
    });
};

export const useEditableControlStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesEditableControlLayout(),
        
        // variants:
        usesEditableControlVariants(),
        
        // states:
        usesEditableControlStates(),
    ]),
}), { id: 'rww4hy9rmx' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [editableControls, cssEditableControlConfig] = cssConfig(() => {
    // dependencies:
    
    const [, {backg}] = usesBackg();
    const [, {foreg}] = usesForeg();
    const [, {foregStart: foregValidInvalidStart, backgStart: backgValidInvalidStart}] = usesValidInvalidState();
    
    
    
    //#region keyframes
    const frameHighlighted = style({
        backg : backgValidInvalidStart,
        foreg : foregValidInvalidStart,
    });
    const frameNormalized  = style({
        backg : backg,
        foreg : foreg,
    });
    const [keyframesValidRule  , keyframesValid  ] = keyframes({
        from : frameHighlighted,
        to   : frameNormalized,
    });
    keyframesValid.value     = 'valid';     // the @keyframes name should contain 'valid'     in order to be recognized by `useValidInvalidState`
    const [keyframesInvalidRule, keyframesInvalid] = keyframes({
        from : frameHighlighted,
        to   : frameNormalized,
    });
    keyframesInvalid.value   = 'invalid';   // the @keyframes name should contain 'invalid'   in order to be recognized by `useValidInvalidState`
    
    const [keyframesUnvalidRule  , keyframesUnvalid  ] = keyframes({
        /* no animation yet */
    });
    keyframesUnvalid.value   = 'unvalid';   // the @keyframes name should contain 'unvalid'   in order to be recognized by `useValidInvalidState`
    const [keyframesUninvalidRule  , keyframesUninvalid  ] = keyframes({
        /* no animation yet */
    });
    keyframesUninvalid.value = 'uninvalid'; // the @keyframes name should contain 'uninvalid' in order to be recognized by `useValidInvalidState`
    //#endregion keyframes
    
    
    
    return {
        // animations:
        ...keyframesValidRule,
        ...keyframesInvalidRule,
        ...keyframesUnvalidRule,
        ...keyframesUninvalidRule,
        animValid     : [
            ['1000ms', 'ease-out', 'both', keyframesValid    ],
        ]                       as CssKnownProps['anim'],
        animInvalid   : [
            ['1000ms', 'ease-out', 'both', keyframesInvalid  ],
        ]                       as CssKnownProps['anim'],
        animUnvalid   : [
            [ '100ms', 'ease-out', 'both', keyframesUnvalid  ],
        ]                       as CssKnownProps['anim'],
        animUninvalid : [
            [ '100ms', 'ease-out', 'both', keyframesUninvalid],
        ]                       as CssKnownProps['anim'],
    };
}, { prefix: 'edit' });



// react components:
export interface EditableControlProps<TElement extends EditableControlElement = EditableControlElement>
    extends
        // bases:
        ControlProps<TElement>,
        
        // validations:
        ValidationProps
{
    // accessibilities:
    autoFocus       ?: boolean
    
    
    
    // validations:
    customValidator ?: CustomValidatorHandler
    required        ?: boolean
    
    
    
    // identifiers:
    name            ?: string
    form            ?: string
    
    
    
    // values:
    defaultValue    ?: string | number | ReadonlyArray<string>
    value           ?: string | number | ReadonlyArray<string>
    onChange        ?: React.ChangeEventHandler<TElement>
}
const EditableControl = <TElement extends EditableControlElement = EditableControlElement>(props: EditableControlProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet        = useEditableControlStyleSheet();
    
    
    
    // states:
    const inputValidator    = useInputValidator(props.customValidator);
    const validInvalidState = useValidInvalidState(props, inputValidator.validator);
    
    
    
    // rest props:
    const {
        // remove states props:
        
        // validations:
        enableValidation  : _enableValidation,
        isValid           : _isValid,
        inheritValidation : _inheritValidation,
        customValidator   : _customValidator,
    ...restControlProps} = props;
    
    
    
    // refs:
    const setInputRef = useCallback<React.RefCallback<TElement>>((element) => {
        // conditions:
        if (!element) return;
        
        
        
        if (element.validity) {
            inputValidator.handleInit(element);
        }
        else {
            const firstInput = element.querySelector('input, select, textarea') as (EditableControlElement|null);
            if (firstInput) inputValidator.handleInit(firstInput);
        } // if
    }, [inputValidator.handleInit]);
    const elmRef = useMergeRefs(
        // preserves the original `elmRef`:
        props.elmRef,
        
        
        
        setInputRef,
    );
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // validations:
        validInvalidState.class,
    );
    
    
    
    // handlers:
    const handleChange       = useMergeEvents(
        // preserves the original `onChange`:
        props.onChange,
        
        
        
        // states:
        
        // validations:
        inputValidator.handleChange,
    );
    const handleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        
        // validations:
        validInvalidState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    return (
        <Control<TElement>
            // other props:
            {...restControlProps}
            
            
            
            // refs:
            elmRef={elmRef}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            
            
            
            // handlers:
            onChange       = {handleChange      }
            onAnimationEnd = {handleAnimationEnd}
        />
    );
};
export {
    EditableControl,
    EditableControl as default,
}
