// react:
import {
    // react:
    default as React,
    
    
    
    // contexts:
    createContext,
    useContext,
}                           from 'react'



// defaults:
const _defaultEnabled         = true;  // enabled
const _defaultReadOnly        = false; // mutable
const _defaultActive          = false; // normal state

const _defaultInheritEnabled  = true;  // if ancestor is disabled => all descendants are forced to disabled
const _defaultInheritReadOnly = true;  // if ancestor is readonly => all descendants are forced to readonly
const _defaultInheritActive   = false; // all descendants are independent normal/active state



// contexts:

export interface TAccessibility<TDefaultEnabled = boolean, TDefaultReadOnly = boolean, TDefaultActive = boolean> {
    enabled  : boolean|TDefaultEnabled
    readOnly : boolean|TDefaultReadOnly
    active   : boolean|TDefaultActive
}

/**
 * Contains accessibility props.
 */
export interface Accessibility extends TAccessibility {
    /**
     * `true`      : component is enabled  - responses any user interaction.  
     * `false`     : component is disabled - ignores any user interaction.
     */
    enabled  : boolean
    
    /**
     * `true`      : component is readOnly - ignores any user editing.  
     * `false`     : component is editable - responses any user editing.
     */
    readOnly : boolean
    
    /**
     * `true`      : component is in active state.  
     * `false`     : component is in normal state.
     */
    active   : boolean
}

/**
 * A react context for accessibility stuff.
 */
export const AccessibilityContext = createContext<Accessibility>(/*defaultValue :*/{
    enabled  : _defaultEnabled,
    readOnly : _defaultReadOnly,
    active   : _defaultActive,
});
AccessibilityContext.displayName  = 'Accessibility';



// hooks:
export const usePropAccessibility = <TDefaultEnabled extends unknown = boolean, TDefaultReadOnly = boolean, TDefaultActive = boolean>(props: AccessibilityProps, defaultEnabled: boolean|TDefaultEnabled = _defaultEnabled, defaultReadOnly: boolean|TDefaultReadOnly = _defaultReadOnly, defaultActive: boolean|TDefaultActive = _defaultActive): Accessibility|TAccessibility<TDefaultEnabled, TDefaultReadOnly, TDefaultActive> => {
    // contexts:
    const accessContext = useContext(AccessibilityContext);
    
    
    
    const inheritEnabled  : boolean = props.inheritEnabled  ?? _defaultInheritEnabled;
    const inheritReadOnly : boolean = props.inheritReadOnly ?? _defaultInheritReadOnly;
    const inheritActive   : boolean = props.inheritActive   ?? _defaultInheritActive;
    
    
    
    return {
        enabled: (
            (
                inheritEnabled
                ?
                accessContext.enabled  // inherit
                :
                true                   // independent
            )
            &&
            (props.enabled ?? defaultEnabled)
        ),
        readOnly: (
            (
                inheritReadOnly
                ?
                accessContext.readOnly // inherit
                :
                false                  // independent
            )
            ||
            (props.readOnly ?? defaultReadOnly)
        ),
        active: (
            (
                inheritActive
                ?
                accessContext.active   // inherit
                :
                false                  // independent
            )
            ||
            (props.active ?? defaultActive)
        ),
    };
};

export const usePropEnabled = <TDefaultEnabled extends unknown = boolean>(props: AccessibilityProps, defaultEnabled: boolean|TDefaultEnabled = _defaultEnabled): boolean|TDefaultEnabled => {
    // contexts:
    const accessContext = useContext(AccessibilityContext);
    
    
    
    const inheritEnabled  : boolean = props.inheritEnabled  ?? _defaultInheritEnabled;
    
    
    
    return (
        (
            inheritEnabled
            ?
            accessContext.enabled  // inherit
            :
            true                   // independent
        )
        &&
        (props.enabled ?? defaultEnabled)
    );
};

export const usePropReadOnly = <TDefaultReadOnly extends unknown = boolean>(props: AccessibilityProps, defaultReadOnly: boolean|TDefaultReadOnly = _defaultReadOnly): boolean|TDefaultReadOnly => {
    // contexts:
    const accessContext = useContext(AccessibilityContext);
    
    
    
    const inheritReadOnly : boolean = props.inheritReadOnly ?? _defaultInheritReadOnly;
    
    
    
    return (
        (
            inheritReadOnly
            ?
            accessContext.readOnly // inherit
            :
            false                  // independent
        )
        ||
        (props.readOnly ?? defaultReadOnly)
    );
};

export const usePropActive = <TDefaultActive extends unknown = boolean>(props: AccessibilityProps, defaultActive: boolean|TDefaultActive = _defaultActive): boolean|TDefaultActive => {
    // contexts:
    const accessContext = useContext(AccessibilityContext);
    
    
    
    const inheritActive   : boolean = props.inheritActive   ?? _defaultInheritActive;
    
    
    
    return (
        (
            inheritActive
            ?
            accessContext.active   // inherit
            :
            false                  // independent
        )
        ||
        (props.active ?? defaultActive)
    );
};



// react components:

export interface AccessibilityProps extends React.PropsWithChildren<Partial<Accessibility>>
{
    /**
     * `undefined` : same as `true`.  
     * `true`      : component is enabled  - responses any user interaction.  
     * `false`     : component is disabled - ignores any user interaction.
     */
    enabled         ?: boolean
    
    /**
     * `undefined` : same as `true`.  
     * `true`      : inherits `enabled` from parent (`AccessibilityProvider` context).  
     * `false`     : independent `enabled`.
     */
    inheritEnabled  ?: boolean
    
    
    
    /**
     * `undefined` : same as `false`.  
     * `true`      : component is readOnly - ignores any user editing.  
     * `false`     : component is editable - responses any user editing.
     */
    readOnly        ?: boolean
    
    /**
     * `undefined` : same as `true`.  
     * `true`      : inherits `readOnly` from parent (`AccessibilityProvider` context).  
     * `false`     : independent `readOnly`.
     */
    inheritReadOnly ?: boolean
    
    
    
    /**
     * `undefined` : same as `false`.  
     * `true`      : component is in active state.  
     * `false`     : component is in normal state.
     */
    active          ?: boolean
    
    /**
     * `undefined` : same as `false`.  
     * `true`      : inherits `active` from parent (`AccessibilityProvider` context).  
     * `false`     : independent `active`.
     */
    inheritActive   ?: boolean
}
const AccessibilityProvider = (props: AccessibilityProps): JSX.Element|null => {
    // fn props:
    const propAccess = usePropAccessibility(props);
    
    
    
    return (
        <AccessibilityContext.Provider value={propAccess}>
            {props.children}
        </AccessibilityContext.Provider>
    );
};
export {
    AccessibilityProvider,
    AccessibilityProvider as default,
}
