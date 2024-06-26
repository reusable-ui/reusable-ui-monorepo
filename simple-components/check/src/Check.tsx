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
    ActiveChangeEvent,
    ControllableActivatableProps,
    UncontrollableActivatableProps,
    useUncontrollableActivatable,
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
const handleChangeDummy                     : React.ChangeEventHandler<HTMLInputElement> = (_event) => {
    /* nothing to do */
};
export const handleInputClickTriggersChange : React.MouseEventHandler<Element> = (event) => {
    event.stopPropagation(); // a hack to prevent the `triggerChange` triggers `onClick` => re-trigger `triggerChange` => infinity trigger
};



// react components:
export interface CheckProps<TElement extends Element = HTMLSpanElement>
    extends
        // bases:
        Omit<EditableActionControlProps<TElement>,
            // refs:
            |'elmRef'                // moved to <input>
            
            // values:
            |'onChange'              // moved to <input>
        >,
        Pick<EditableActionControlProps<HTMLInputElement>,
            // refs:
            |'elmRef'                // moved here
            
            // values:
            |'onChange'              // moved here
        >,
        
        // input[type="checkbox"]:
        Omit<InputHTMLAttributes<TElement>,
            // semantics:
            |'role'                  // we redefined [role] in <Generic>
            
            // layouts:
            |'size'                  // we use css way to resize
            
            // accessibilities:
            |'enterKeyHint'          // no special [enter] keyboard
            |'disabled'              // we use [enabled] instead of [disabled]
            
            // values:
            |'defaultValue'|'value'  // supports numeric and string value
            
            // validations:
            |'minLength'|'maxLength' // text length constraint is not supported
            |'min'|'max'|'step'      // range & step are not supported
            |'pattern'               // text regex is not supported
            
            // formats:
            |'type'                              // always [type="checkbox"] or [type="radio"]
            |'placeholder'|'autoComplete'|'list' // text hints are not supported
        >,
        
        // variants:
        CheckVariant,
        
        // states:
        ControllableActivatableProps,
        UncontrollableActivatableProps
{
    // accessibilities:
    label                ?: string
    
    
    
    // values:
    defaultChecked       ?: boolean
    checked              ?: boolean
    
    
    
    // formats:
    type                 ?: 'checkbox' | 'radio'
    
    
    
    // components:
    nativeInputComponent ?: React.ReactComponentElement<any, React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>>
    
    
    
    // children:
    children             ?: React.ReactNode
}
const Check = <TElement extends Element = HTMLSpanElement>(props: CheckProps<TElement>): JSX.Element|null => {
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
        
        
        
        // accessibilities:
        // autoFocus,    // still on <EditableActionControl> element
        // tabIndex,     // still on <EditableActionControl> element
        // enterKeyHint, // still on <EditableActionControl> element
        
        label,
        
        
        
        // forms:
        name,
        form,
        
        
        
        // values:
        defaultValue,
        value,
        onChange, // forwards to `input[type]`
        
        defaultChecked, // take, to be aliased to `defaultActive`
        checked,        // take, to be aliased to `active`
        
        
        
        // validations:
        required,
        
        
        
        // formats:
        type = 'checkbox',
        
        
        
        // states:
        // aliased `defaultChecked` to `defaultActive`:
        defaultActive = defaultChecked,   // take, to be handled by `useUncontrollableActivatable`
        // aliased `checked` to `active`:
        active        = checked,          // take, to be handled by `useUncontrollableActivatable`
        inheritActive,                    // take, to be handled by `useUncontrollableActivatable`
        onActiveChange,                   // take, to be handled by `useUncontrollableActivatable`
        
        
        
        // components:
        nativeInputComponent = (<input /> as React.ReactComponentElement<any, React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>>),
        
        
        
        // children:
        children,
    ...restEditableActionControlProps} = props;
    
    
    
    // refs:
    const inputRefInternal = useRef<HTMLInputElement|null>(null);
    const mergedInputRef   = useMergeRefs(
        // preserves the original `elmRef` from `nativeInputComponent`:
        nativeInputComponent.props.ref,
        
        
        
        // preserves the original `elmRef` from `props`:
        elmRef,
        
        
        
        inputRefInternal,
    );
    
    
    
    // states:
    const [isActive, , toggleActive] = useUncontrollableActivatable<ActiveChangeEvent>({
        enabled         : props.enabled,
        inheritEnabled  : props.inheritEnabled,
        readOnly        : props.readOnly,
        inheritReadOnly : props.inheritReadOnly,
        
        defaultActive,
        active,
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
    const handleClickInternal    = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        toggleActive();         // handle click as toggle [active]
        event.preventDefault(); // handled
    });
    const handleClick            = useMergeEvents(
        // preserves the original `onClick`:
        props.onClick,
        
        
        
        // actions:
        handleClickInternal,
    );
    
    const handleKeyDownInternal  = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        if ((event.key === ' ') || (event.code === 'Space')) {
            event.preventDefault(); // prevents pressing space for scrolling page
        } // if
    });
    const handleKeyDown          = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // actions:
        handleKeyDownInternal,
    );
    
    const handleKeyUpInternal    = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        if ((event.key === ' ') || (event.code === 'Space')) {
            toggleActive();         // handle click as toggle [active]
            event.preventDefault(); // handled
        } // if
    });
    const handleKeyUp            = useMergeEvents(
        // preserves the original `onKeyUp`:
        props.onKeyUp,
        
        
        
        // actions:
        handleKeyUpInternal,
    );
    
    const handleChange           = useMergeEvents(
        // preserves the original `onChange` from `nativeInputComponent`:
        nativeInputComponent.props.onChange,
        
        
        
        // preserves the original `onChange` from `props`:
        onChange,
        
        
        
        // dummy:
        handleChangeDummy, // just for satisfying React of controllable <input>
    );
    
    const nativeInputHandleClick = useMergeEvents(
        // preserves the original `onClick` from `nativeInputComponent`:
        nativeInputComponent.props.onClick,
        
        
        
        // hacks:
        handleInputClickTriggersChange, // a hack to prevent the `triggerChange` triggers `onClick` => re-trigger `triggerChange` => infinity trigger
    );
    
    
    
    // default props:
    const {
        // accessibilities:
        // autoFocus      : nativeInputAutoFocus      = autoFocus,    // still on <EditableActionControl> element
        tabIndex          : nativeInputTabIndex       = -2,           // not focusable // do not use `tabIndex : -1`, causing to be ignored by <EditableControl> for `inputValidator.handleInit()`
        // enterKeyHint   : nativeInputEnterKeyHint   = enterKeyHint, // not supported
        
        disabled          : nativeInputDisabled       = !propEnabled, // do not submit the value if disabled
        readOnly          : nativeInputReadOnly       = propReadOnly, // locks the value & no validation if readOnly
        
        
        
        // forms:
        name              : nativeInputName           = name,
        form              : nativeInputForm           = form,
        
        
        
        // values:
        defaultValue      : nativeInputDefaultValue   = defaultValue,
        value             : nativeInputValue          = value,
        
        // defaultChecked : nativeInputDefaultChecked,            // fully controllable, no defaultChecked
        checked           : nativeInputChecked        = isActive, // fully controllable
        
        
        
        // validations:
        required          : nativeInputRequired       = required,
        
        
        
        // formats:
        type              : nativeInputType           = type,
        
        
        
        // other props:
        ...restNativeInputComponentProps
    } = nativeInputComponent.props;
    
    
    
    // jsx:
    return (
        <EditableActionControl<TElement>
            // other props:
            {...restEditableActionControlProps}
            
            
            
            // semantics:
            tag          = {props.tag           ??   'span'  }
            semanticTag  = {props.semanticTag   ??     ''    } // no corresponding semantic tag => defaults to <div> (overwritten to <span>)
            semanticRole = {props.semanticRole  ?? 'checkbox'} // uses [role="checkbox"] as the default semantic role
            
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
            {/* <input> */}
            {React.cloneElement<React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>>(nativeInputComponent,
                // props:
                {
                    // other props:
                    ...restNativeInputComponentProps,
                    
                    
                    
                    // refs:
                    ref               : mergedInputRef,
                    
                    
                    
                    // accessibilities:
                    // autoFocus      : nativeInputAutoFocus,
                    tabIndex          : nativeInputTabIndex,
                    // enterKeyHint   : nativeInputEnterKeyHint,
                    
                    disabled          : nativeInputDisabled,
                    readOnly          : nativeInputReadOnly,
                    
                    
                    
                    // forms:
                    name              : nativeInputName,
                    form              : nativeInputForm,
                    
                    
                    
                    // values:
                    defaultValue      : nativeInputDefaultValue,
                    value             : nativeInputValue,
                    onChange          : handleChange,
                    
                    // defaultChecked : nativeInputDefaultChecked,
                    checked           : nativeInputChecked,
                    
                    
                    
                    // validations:
                    required          : nativeInputRequired,
                    
                    
                    
                    // formats:
                    type              : nativeInputType,
                    
                    
                    
                    // handlers:
                    onClick           : nativeInputHandleClick,
                },
            )}
            
            
            
            {/* <label> */}
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
