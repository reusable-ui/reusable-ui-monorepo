// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
}                           from 'react'

// cssfn:
import {
    // checks if a certain css feature is supported by the running browser:
    supportsHasPseudoClass,
}                           from '@cssfn/core'                          // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'                   // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    
    
    
    // an accessibility management system:
    usePropEnabled,
    usePropReadOnly,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ToggleActivatableProps,
    useToggleActivatable,
}                           from '@reusable-ui/core'                    // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    EditableActionControlProps,
    EditableActionControl,
}                           from '@reusable-ui/editable-action-control' // a base component
import type {
    // types:
    InputHTMLAttributes,
}                           from '@reusable-ui/input'                   // a neighbor component

// internals:
import {
    // variants:
    CheckVariant,
    useCheckVariant,
}                           from './variants/CheckVariant.js'



// styles:
export const useCheckStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, {
    id      : 'nx58strmq2',             // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
    lazyCsr : supportsHasPseudoClass(), // dealing with browsers that don't support the :has() selector
});



// handlers:
export const handleInputClickTriggersChange : React.MouseEventHandler<Element> = (event) => {
    event.stopPropagation(); // a hack to prevent the `triggerChange` triggers `onClick` => re-trigger `triggerChange` => infinity trigger
};



// react components:
export interface CheckProps
    extends
        // bases:
        EditableActionControlProps<HTMLInputElement>,
        
        // input[type="checkbox"]:
        Omit<InputHTMLAttributes<HTMLInputElement>,
            // semantics:
            |'role'                  // we redefined [role] in <Generic>
            
            // layouts:
            |'size'                  // we use css way to resize
            
            // accessibilities:
            |'enterKeyHint'          // no special [enter] keyboard
            |'disabled'              // we use [enabled] instead of [disabled]
            
            // validations:
            |'minLength'|'maxLength' // text length constraint is not supported
            |'min'|'max'|'step'      // range & step are not supported
            |'pattern'               // text regex is not supported
            
            // formats:
            |'type'                              // always [type="checkbox"] or [type="radio"]
            |'placeholder'|'autoComplete'|'list' // text hints are not supported
            
            // values:
            |'defaultValue'|'value'  // supports numeric and string value
        >,
        
        // variants:
        CheckVariant,
        
        // states:
        ToggleActivatableProps
{
    // accessibilities:
    label          ?: string
    
    
    
    // formats:
    type           ?: 'checkbox' | 'radio'
    
    
    
    // values:
    defaultChecked ?: boolean
    checked        ?: boolean
    
    
    
    // children:
    children       ?: React.ReactNode
}
const Check = (props: CheckProps): JSX.Element|null => {
    // styles:
    const styleSheet   = useCheckStyleSheet();
    
    
    
    // variants:
    const checkVariant = useCheckVariant(props);
    
    
    
    // rest props:
    const {
        // refs:
        elmRef,
        
        
        
        // variants:
        checkStyle : checkStyle, // use
        
        
        
        // states:
        defaultActive,  // take, to be handled by `useToggleActivatable`
        active,         // take, to be handled by `useToggleActivatable`
        inheritActive,  // take, to be handled by `useToggleActivatable`
        onActiveChange, // take, to be handled by `useToggleActivatable`
        
        
        
        // accessibilities:
        
        // still on <EditableActionControl> element
        // autoFocus,
        // tabIndex,
        // enterKeyHint,
        
        label,
        
        
        
        // validations:
        required,
        
        
        
        // formats:
        type = 'checkbox',
        
        
        
        // forms:
        name,
        form,
        
        
        
        // values:
        defaultValue,
        value,
        onChange, // forwards to `input[type]`
        
        defaultChecked, // take, to be aliased to `defaultActive`
        checked,        // take, to be aliased to `active`
        
        
        
        // children:
        children,
    ...restEditableActionControlProps} = props;
    
    
    
    // refs:
    const inputRefInternal = useRef<HTMLInputElement|null>(null);
    const mergedInputRef   = useMergeRefs(
        // preserves the original `elmRef`:
        elmRef,
        
        
        
        inputRefInternal,
    );
    
    
    
    // states:
    const [isActive, , toggleActive] = useToggleActivatable({
        enabled         : props.enabled,
        inheritEnabled  : props.inheritEnabled,
        
        readOnly        : props.readOnly,
        inheritReadOnly : props.inheritReadOnly,
        
        defaultActive   : defaultActive ?? defaultChecked, // aliased `defaultChecked` to `defaultActive`
        active          : active        ?? checked,        // aliased `checked`        to `active`
        inheritActive,
        onActiveChange,
    }, /*changeEventTarget :*/inputRefInternal);
    
    
    
    // fn props:
    const propEnabled    = usePropEnabled(props);
    const propReadOnly   = usePropReadOnly(props);
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        checkVariant.class,
    );
    
    
    
    // handlers:
    const handleClickInternal   = useEvent<React.MouseEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        toggleActive();         // handle click as toggle [active]
        event.preventDefault(); // handled
    });
    const handleClick           = useMergeEvents(
        // preserves the original `onClick`:
        props.onClick,
        
        
        
        // actions:
        handleClickInternal,
    );
    
    const handleKeyDownInternal = useEvent<React.KeyboardEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        if ((event.key === ' ') || (event.code === 'Space')) {
            event.preventDefault(); // prevents pressing space for scrolling page
        } // if
    });
    const handleKeyDown         = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // actions:
        handleKeyDownInternal,
    );
    
    const handleKeyUpInternal   = useEvent<React.KeyboardEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        if ((event.key === ' ') || (event.code === 'Space')) {
            toggleActive();         // handle click as toggle [active]
            event.preventDefault(); // handled
        } // if
    });
    const handleKeyUp           = useMergeEvents(
        // preserves the original `onKeyUp`:
        props.onKeyUp,
        
        
        
        // actions:
        handleKeyUpInternal,
    );
    
    const handleChangeDummy     = useEvent<React.ChangeEventHandler<HTMLInputElement>>((_event) => {
        /* nothing to do */
    });
    const handleChange          = useMergeEvents(
        // preserves the original `onChange`:
        onChange,
        
        
        
        // dummy:
        handleChangeDummy, // just for satisfying React of controllable <input>
    );
    
    
    
    // jsx:
    return (
        <EditableActionControl<HTMLInputElement>
            // other props:
            {...restEditableActionControlProps}
            
            
            
            // semantics:
            tag          = {props.tag           ??   'span'  }
            semanticTag  = {props.semanticTag   ??     ''    }
            semanticRole = {props.semanticRole  ?? 'checkbox'}
            
            aria-label   = {props['aria-label'] ?? label}
            
            
            
            // variants:
            nude={props.nude ?? (
                ((checkStyle === 'button') || (checkStyle === 'toggleButton'))
                ?
                false // filled : <Check checkStyle='button'> | <Check checkStyle='toggleButton'>
                :
                true  // nude   : <Check> | <Check checkStyle='switch'>
            )}
            mild={props.mild ?? false} // bold <Check>
            
            
            
            // states:
            active={isActive}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            
            
            
            // handlers:
            onClick   = {handleClick}
            onKeyDown = {handleKeyDown}
            onKeyUp   = {handleKeyUp}
            
            
            
            // Check props:
            {...{
                // actions:
                // type,
            }}
        >
            <input
                // refs:
                ref={mergedInputRef}
                
                
                
                // accessibilities:
                
                {...{
                    // autoFocus,    // still on <EditableControl> element
                    tabIndex : -1,   // not focusable
                    // enterKeyHint, // not supported
                }}
                
                disabled={!propEnabled} // do not submit the value if disabled
                readOnly={propReadOnly} // locks the value & no validation if readOnly
                
                
                
                // forms:
                {...{
                    name,
                    form,
                }}
                
                
                
                // values:
                {...{
                    defaultValue,
                    value,
                    
                    // defaultChecked,   // fully controllable, no defaultChecked
                    checked  : isActive, // fully controllable
                    onChange : handleChange,
                }}
                
                
                
                // validations:
                {...{
                    required,
                }}
                
                
                
                // formats:
                {...{
                    type,
                }}
                
                
                
                // handlers:
                onClick={handleInputClickTriggersChange} // a hack to prevent the `triggerChange` triggers `onClick` => re-trigger `triggerChange` => infinity trigger
            />
            { !!children && <span>
                { children }
            </span> }
        </EditableActionControl>
    );
};
export {
    Check,
    Check as default,
}
