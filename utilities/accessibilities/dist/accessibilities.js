// react:
import { 
// react:
default as React, 
// contexts:
createContext, useContext, } from 'react';
// defaults:
const _defaultEnabled = true; // enabled
const _defaultReadOnly = false; // mutable
const _defaultActive = false; // normal state
const _defaultInheritEnabled = true; // if ancestor is disabled => all descendants are forced to disabled
const _defaultInheritReadOnly = true; // if ancestor is readonly => all descendants are forced to readonly
const _defaultInheritActive = false; // all descendants are independent normal/active state
/**
 * A react context for accessibility stuff.
 */
export const AccessibilityContext = createContext(/*defaultValue :*/ {
    enabled: _defaultEnabled,
    readOnly: _defaultReadOnly,
    active: _defaultActive,
});
AccessibilityContext.displayName = 'Accessibility';
// hooks:
export const usePropAccessibility = (props, defaultEnabled = _defaultEnabled, defaultReadOnly = _defaultReadOnly, defaultActive = _defaultActive) => {
    // contexts:
    const accessContext = useContext(AccessibilityContext);
    const inheritEnabled = props.inheritEnabled ?? _defaultInheritEnabled;
    const inheritReadOnly = props.inheritReadOnly ?? _defaultInheritReadOnly;
    const inheritActive = props.inheritActive ?? _defaultInheritActive;
    return {
        enabled: ((inheritEnabled
            ?
                accessContext.enabled // inherit
            :
                true // independent
        )
            &&
                (props.enabled ?? defaultEnabled)),
        readOnly: ((inheritReadOnly
            ?
                accessContext.readOnly // inherit
            :
                false // independent
        )
            ||
                (props.readOnly ?? defaultReadOnly)),
        active: ((inheritActive
            ?
                accessContext.active // inherit
            :
                false // independent
        )
            ||
                (props.active ?? defaultActive)),
    };
};
export const usePropEnabled = (props, defaultEnabled = _defaultEnabled) => {
    // contexts:
    const accessContext = useContext(AccessibilityContext);
    const inheritEnabled = props.inheritEnabled ?? _defaultInheritEnabled;
    return ((inheritEnabled
        ?
            accessContext.enabled // inherit
        :
            true // independent
    )
        &&
            (props.enabled ?? defaultEnabled));
};
export const usePropReadOnly = (props, defaultReadOnly = _defaultReadOnly) => {
    // contexts:
    const accessContext = useContext(AccessibilityContext);
    const inheritReadOnly = props.inheritReadOnly ?? _defaultInheritReadOnly;
    return ((inheritReadOnly
        ?
            accessContext.readOnly // inherit
        :
            false // independent
    )
        ||
            (props.readOnly ?? defaultReadOnly));
};
export const usePropActive = (props, defaultActive = _defaultActive) => {
    // contexts:
    const accessContext = useContext(AccessibilityContext);
    const inheritActive = props.inheritActive ?? _defaultInheritActive;
    return ((inheritActive
        ?
            accessContext.active // inherit
        :
            false // independent
    )
        ||
            (props.active ?? defaultActive));
};
const AccessibilityProvider = (props) => {
    // fn props:
    const propAccess = usePropAccessibility(props);
    return (React.createElement(AccessibilityContext.Provider, { value: propAccess }, props.children));
};
export { AccessibilityProvider, AccessibilityProvider as default, };
