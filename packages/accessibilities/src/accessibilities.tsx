// react:
import {
    // react:
    default as React,
    
    
    
    // contexts:
    createContext,
    useContext,
}                           from 'react'



// defaults:
const _defaultEnabled         = true;
const _defaultReadOnly        = false;
const _defaultActive          = false;

const _defaultInheritEnabled  = true;
const _defaultInheritReadOnly = true;
const _defaultInheritActive   = false;



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
export const Context = createContext<Accessibility>(/*defaultValue :*/{
    enabled  : _defaultEnabled,
    readOnly : _defaultReadOnly,
    active   : _defaultActive,
});
Context.displayName  = 'Accessibility';



// hooks:
export const usePropAccessibility = <TDefaultEnabled extends unknown = boolean, TDefaultReadOnly = boolean, TDefaultActive = boolean>(props: AccessibilityProps, defaultEnabled: boolean|TDefaultEnabled = _defaultEnabled, defaultReadOnly: boolean|TDefaultReadOnly = _defaultReadOnly, defaultActive: boolean|TDefaultActive = _defaultActive): Accessibility|TAccessibility<TDefaultEnabled, TDefaultReadOnly, TDefaultActive> => {
    // contexts:
    const accessContext = useContext(Context);



    return {
        enabled: (
            (
                (props.inheritEnabled ?? _defaultInheritEnabled)
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
                (props.inheritReadOnly ?? _defaultInheritReadOnly)
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
                (props.inheritActive ?? _defaultInheritActive)
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
    const accessContext = useContext(Context);



    return (
        (
            (props.inheritEnabled ?? _defaultInheritEnabled)
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
    const accessContext = useContext(Context);



    return (
        (
            (props.inheritReadOnly ?? _defaultInheritReadOnly)
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
    const accessContext = useContext(Context);



    return (
        (
            (props.inheritActive ?? _defaultInheritActive)
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

export interface AccessibilityProps extends Partial<Accessibility>
{
    /**
     * `undefined` : same as `true`.  
     * `true`      : component is enabled  - responses any user interaction.  
     * `false`     : component is disabled - ignores any user interaction.
     */
    enabled?         : boolean

    /**
     * `undefined` : same as `true`.  
     * `true`      : inherits `enabled` from parent (`AccessibilityProvider` context).  
     * `false`     : independent `enabled`.
     */
    inheritEnabled?  : boolean



    /**
     * `undefined` : same as `false`.  
     * `true`      : component is readOnly - ignores any user editing.  
     * `false`     : component is editable - responses any user editing.
     */
    readOnly?        : boolean

    /**
     * `undefined` : same as `true`.  
     * `true`      : inherits `readOnly` from parent (`AccessibilityProvider` context).  
     * `false`     : independent `readOnly`.
     */
    inheritReadOnly? : boolean

    
    
    /**
     * `undefined` : same as `false`.  
     * `true`      : component is in active state.  
     * `false`     : component is in normal state.
     */
    active?          : boolean

    /**
     * `undefined` : same as `false`.  
     * `true`      : inherits `active` from parent (`AccessibilityProvider` context).  
     * `false`     : independent `active`.
     */
    inheritActive?   : boolean



    // children:
    children?        : React.ReactNode
}
export function AccessibilityProvider(props: AccessibilityProps) {
    // fn props:
    const propAccess = usePropAccessibility(props);
    
    
    
    return (
        <Context.Provider value={propAccess}>
            {props.children}
        </Context.Provider>
    );
}
export { AccessibilityProvider as default }
