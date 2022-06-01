// react:
import { 
// react:
default as React, 
// contexts:
createContext, useContext, } from 'react';
// defaults:
const _defaultEnableRootValidation = false; // no validation at root level
const _defaultEnableValidation = true; // perform validation at <ValidationProvider>
const _defaultIsValid = undefined; // all descendants are independent valid/invalid/uncheck
const _defaultInheritValidation = true; // if ancestor is valid/invalid/uncheck => all descendants are forced to valid/invalid/uncheck
/**
 * A react context for validation stuff.
 */
export const ValidationContext = createContext(/*defaultValue :*/ {
    enableValidation: _defaultEnableValidation,
    isValid: _defaultIsValid,
    atRoot: true,
});
ValidationContext.displayName = 'Validation';
// hooks:
export const usePropValidation = (props) => {
    // contexts:
    const valContext = useContext(ValidationContext);
    const atRoot = valContext.atRoot;
    const inheritValidation = props.inheritValidation ?? _defaultInheritValidation;
    const enableValidation = atRoot ? (props.enableValidation ?? _defaultEnableRootValidation) : ((inheritValidation
        ?
            valContext.enableValidation // inherit
        :
            true // independent
    )
        &&
            (props.enableValidation ?? _defaultEnableValidation));
    const isValid = (() => {
        if (!enableValidation)
            return null; // if validation was disabled => treat validity as `uncheck` (null)
        const contextIsValid = (inheritValidation
            ?
                valContext.isValid // force inherit to descendants (if was set)
            :
                undefined // independent descendants
        );
        if (contextIsValid !== undefined)
            return contextIsValid; // if the context's validity was set other than `auto` (undefined) => force inherit to descendants
        return props.isValid; // otherwise => use the component's validity
    })();
    return {
        enableValidation,
        isValid,
        atRoot,
    };
};
const ValidationProvider = (props) => {
    // fn props:
    const { atRoot, ...propValidation } = usePropValidation(props);
    if (atRoot) {
        propValidation.enableValidation = props.enableValidation ?? _defaultEnableValidation;
        propValidation.isValid = props.isValid ?? _defaultIsValid;
    } // if
    return (React.createElement(ValidationContext.Provider, { value: propValidation }, props.children));
};
export { ValidationProvider, ValidationProvider as default, };
