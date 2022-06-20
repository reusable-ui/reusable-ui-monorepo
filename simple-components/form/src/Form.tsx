// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    useCallback,
    
    
    
    // utilities:
    startTransition,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
}                           from '@cssfn/css-types'                 // cssfn css specific types
import {
    // rules:
    rule,
    states,
    keyframes,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'                     // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'               // writes css in react hook
import {
    // utilities:
    cssVar,
}                           from '@cssfn/css-var'                   // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'                // reads/writes css variables configuration

// reusable-ui:
import {
    // hooks:
    useIsomorphicLayoutEffect,
    useTriggerRender,
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'               // react helper hooks
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from '@reusable-ui/accessibilities'     // an accessibility management system
import {
    // hooks:
    Result as ValResult,
    usePropIsValid,
    
    
    
    // react components:
    ValidationProps,
}                           from '@reusable-ui/validations'         // a validation management system
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    ThemeName,
    usesThemeImportant,
    usesBackg,
    usesForeg,
    usesAnim,
}                           from '@reusable-ui/basic'               // a base component
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
    
    
    
    // react components:
    ContentProps,
    Content,
}                           from '@reusable-ui/content'             // a base component
import {
    // hooks:
    ValidatorHandler,
}                           from '@reusable-ui/editable-control'    // a base component



// hooks:

// states:

//#region validInvalid
export type CustomValidatorHandler = (isValid: ValResult) => ValResult

const isFormValid = (element: HTMLFormElement): ValResult => {
    if (element.matches(':valid'  )) return true;  // valid
    if (element.matches(':invalid')) return false; // invalid
    return null; // uncheck
};

export const useFormValidator      = (customValidator?: CustomValidatorHandler) => {
    // states:
    // we stores the `isValid` in `useRef` instead of `useState` because we need to *real-time export* of its value as `validator` callback:
    const isValid = useRef<ValResult>(null); // initially unchecked (neither valid nor invalid)
    
    // manually controls the (re)render event:
    const [triggerRender] = useTriggerRender();
    
    
    
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
    const handleValidation = useCallback((element: HTMLFormElement, immediately = false) => {
        const performUpdate = (prevIsValid?: ValResult) => {
            // conditions:
            // make sure the <Form>'s validity was not modified during delaying
            const currentIsValid = isFormValid(element);
            if ((prevIsValid !== undefined) && (prevIsValid !== currentIsValid)) return; // the validity has been modified during delaying => abort further validating
            
            
            
            // remember the validation result:
            const newIsValid : ValResult = (customValidator ? customValidator(currentIsValid) : currentIsValid);
            if (isValid.current !== newIsValid) {
                isValid.current = newIsValid;
                
                // lazy responsives => a bit delayed of responsives is ok:
                startTransition(() => {
                    triggerRender(); // notify to react runtime to re-render with a new validity state
                });
            } // if
        };
        
        
        
        if (immediately) {
            // instant validating:
            performUpdate();
        }
        else {
            const prevIsValid = isFormValid(element);
            
            // delaying the validation, to avoid unpleasant splash effect during editing
            setTimeout(
                () => performUpdate(prevIsValid),
                (prevIsValid !== false) ? 300 : 600
            );
        } // if
    }, [customValidator]);
    
    const handleInit       = useCallback((element: HTMLFormElement) => {
        handleValidation(element, /*immediately =*/true);
    }, [handleValidation]);
    
    const handleChange     = useEvent<React.ChangeEventHandler<HTMLFormElement>>(({target}) => {
        handleValidation(target);
    }, [handleValidation]);
    
    
    
    return {
        validator,
        
        handleInit,
        handleChange,
    };
};
//#endregion validInvalid



// styles:
export const usesFormLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesContentLayout(),
        ]),
        ...style({
            // customize:
            ...usesCssProps(forms), // apply config's cssProps
        }),
    });
};
export const usesFormVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(forms);
    
    
    
    return style({
        ...imports([
            // variants:
            usesContentVariants(),
            
            // layouts:
            sizesRule,
        ]),
    });
};
export const usesFormStates = () => {
    // dependencies:
    
    // states:
    const [validInvalidRule] = usesValidInvalidState();
    
    
    
    return style({
        ...imports([
            // states:
            // usesContentStates(),
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

export const useFormStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesFormLayout(),
        
        // variants:
        usesFormVariants(),
        
        // states:
        usesFormStates(),
    ]),
}), { id: 'eqakn9c0py' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [forms, formValues, cssFormConfig] = cssConfig(() => {
    // dependencies:
    
    const [, {backg, altBackgColor}] = usesBackg();
    const [, {foreg, altForeg     }] = usesForeg();
    
    
    
    //#region keyframes
    const frameHighlighted = style({
        backg : altBackgColor,
        foreg : altForeg,
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
}, { prefix: 'frm' });



// react components:
export interface FormProps
    extends
        // bases:
        ContentProps<HTMLFormElement>,
        
        // form:
        Omit<React.FormHTMLAttributes<HTMLFormElement>, 'role'>,
        
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
    onChange        ?: React.ChangeEventHandler<HTMLFormElement>
}
const Form = (props: FormProps): JSX.Element|null => {
    // styles:
    const styleSheet        = useFormStyleSheet();
    
    
    
    // states:
    const formValidator     = useFormValidator(props.customValidator);
    const validInvalidState = useValidInvalidState<HTMLFormElement>(props, formValidator.validator);
    
    
    
    // rest props:
    const {
        // remove states props:
        
        // validations:
        enableValidation  : _enableValidation,
        isValid           : _isValid,
        inheritValidation : _inheritValidation,
        customValidator   : _customValidator,
    ...restContentProps} = props;
    
    
    
    // refs:
    const setInputRef = useCallback<React.RefCallback<HTMLFormElement>>((element) => {
        // conditions:
        if (!element) return;
        
        
        
        if (element.validity) {
            formValidator.handleInit(element);
        }
        else {
            const firstInput = element.querySelector('input, select, textarea') as (HTMLFormElement|null);
            if (firstInput) formValidator.handleInit(firstInput);
        } // if
    }, [formValidator.handleInit]);
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
        formValidator.handleChange,
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
        <Content<HTMLFormElement>
            // other props:
            {...restContentProps}
            
            
            
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
    Form,
    Form as default,
}
