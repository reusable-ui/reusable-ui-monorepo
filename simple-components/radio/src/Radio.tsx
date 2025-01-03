// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
    useState,
}                           from 'react'

// cssfn:
import {
    // checks if a certain css feature is supported by the running browser:
    supportsHasPseudoClass,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a collection of TypeScript type utilities, assertions, and validations for ensuring type safety in reusable UI components:
    type NoForeignProps,
    
    
    
    // react helper hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ActiveChangeEvent,
    useUncontrollableActivatable,
    
    
    
    // a possibility of UI having an invalid state:
    type ValidationDeps,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // variants:
    CheckStyle,
    CheckVariant,
    
    
    
    // react components:
    CheckProps,
    Check,
}                           from '@reusable-ui/check'           // a base component

// internals:
import {
    broadcastClearEvent,
}                           from './utilities.js'               // local utilities



// styles:
export const useRadioStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, {
    id      : 'f4fvh7cm5b',             // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
    lazyCsr : supportsHasPseudoClass(), // dealing with browsers that don't support the :has() selector
});



// react components:
export interface RadioProps<TElement extends Element = HTMLSpanElement>
    extends
        // bases:
        CheckProps<TElement>
{
}
const Radio = <TElement extends Element = HTMLSpanElement>(props: RadioProps<TElement>): JSX.Element|null => {
    // props:
    const {
        // refs:
        elmRef,
        
        
        
        // values:
        defaultChecked : fallbackDefaultActive, // take, to be aliased to `defaultActive`
        checked        : fallbackActive,        // take, to be aliased to `active`
        
        
        
        // validations:
        validationDeps : validationDepsOverwrite,
        
        
        
        // states:
        defaultActive = fallbackDefaultActive, // take, to be handled by `useUncontrollableActivatable` // if the `defaultActive` is not provided, fallback to `defaultChecked`
        active        = fallbackActive,        // take, to be handled by `useUncontrollableActivatable` // if the `active` is not provided, fallback to `checked`
        inheritActive,                         // take, to be handled by `useUncontrollableActivatable`
        onActiveChange,                        // take, to be handled by `useUncontrollableActivatable`
        
        
        
        // handlers:
        onClick,
        onKeyUp,
        onChange,
        
        
        
        // other props:
        ...restRadioProps
    } = props;
    
    
    
    // styles:
    const styles           = useRadioStyleSheet();
    
    
    
    // refs:
    const inputRefInternal = useRef<HTMLInputElement|null>(null);
    const mergedInputRef   = useMergeRefs(
        // preserves the original `elmRef` from `props`:
        elmRef,
        
        
        
        inputRefInternal,
    );
    
    
    
    // states:
    const [isActive, setActive] = useUncontrollableActivatable<ActiveChangeEvent>({
        enabled         : props.enabled,
        inheritEnabled  : props.inheritEnabled,
        readOnly        : props.readOnly,
        inheritReadOnly : props.inheritReadOnly,
        
        defaultActive,
        active,
        inheritActive,
        onActiveChange,
    }, /*changeEventTarget :*/inputRefInternal);
    const [activeBuddyRadio, setActiveBuddyRadio] = useState<HTMLInputElement|null>(null);
    const setActiveRadio = useEvent((activeOrOtherRadio: true|HTMLInputElement|null) => {
        if (activeOrOtherRadio === true) {
            setActive(true);
            setActiveBuddyRadio(null);
        }
        else {
            setActive(false);
            setActiveBuddyRadio(activeOrOtherRadio);
        } // if
    });
    const collectiveRadioIsActive = (isActive ? true : !!activeBuddyRadio?.parentElement /* the buddyRadio still exists in DOM */);
    
    
    
    // handlers:
    const handleClickInternal   = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        setActiveRadio(true);   // handle click as selecting [active]
        event.preventDefault(); // handled
    });
    const handleClick           = useMergeEvents(
        // preserves the original `onClick` from `props`:
        onClick,
        
        
        
        // actions:
        handleClickInternal,
    );
    
    const handleKeyUpInternal   = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        if ((event.key === ' ') || (event.code === 'Space')) {
            setActiveRadio(true);   // handle click as selecting [active]
            event.preventDefault(); // handled
        } // if
    });
    const handleKeyUp           = useMergeEvents(
        // preserves the original `onKeyUp` from `props`:
        onKeyUp,
        
        
        
        // actions:
        handleKeyUpInternal,
    );
    
    const handleChangeInternal  = useEvent<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        const currentRadioElm = event.target as (EventTarget & Element) as (EventTarget & HTMLInputElement);
        const name = currentRadioElm.name;
        if (!name)                  return; // the <Radio> must have a name
        
        const isChecked = currentRadioElm.checked;
        if (!isChecked)             return; // the <Radio> is checked not cleared
        
        
        
        // actions:
        broadcastClearEvent(currentRadioElm); // notify other budy <Radio>s that this <Radio> is selected
        event.preventDefault(); // handled
    });
    const handleChange          = useMergeEvents(
        // preserves the original `onChange` from `props`:
        onChange,
        
        
        
        // actions:
        handleChangeInternal,
    );
    
    
    
    // effects:
    
    // listens to the `clear` event to un-select this <Radio> when another <Radio> is selected or no longer selected:
    useEffect(() => {
        // conditions:
        const currentRadioElm = inputRefInternal.current;
        if (!currentRadioElm) return; // radio was unmounted => nothing to do
        
        
        
        // handlers:
        const handleClear = (event: CustomEvent<{ selected: HTMLInputElement|null }>): void => {
            setActiveRadio(event.detail.selected); // handle clear as de-selecting [active]
        };
        
        
        
        // setups:
        currentRadioElm.addEventListener('clear', handleClear as EventListener); // when another <Radio> is selected, this <Radio> should be un-selected
        
        
        
        // cleanups:
        return () => {
            currentRadioElm.removeEventListener('clear', handleClear as EventListener);
        };
    }, []); // runs once on startup
    
    // when the <Radio> is unmounted and it's currently selected, it should notify other budy <Radio>s to update their `validityState`:
    const isActiveRef = useRef<boolean>(isActive);
    isActiveRef.current = isActive; // sync
    useEffect(() => {
        // conditions:
        const currentRadioElm = inputRefInternal.current; // take a snapshot of the current radio element before unmounting later
        if (!currentRadioElm) return; // radio was unmounted => nothing to do
        
        
        
        // setups:
        // no need setup, just cleanup
        
        
        
        // cleanups:
        return () => {
            // conditions:
            if (!isActiveRef.current) return; // get the most recent of the `isActive` state before unmounting, if it's not selected now => nothing to do
            
            
            
            // actions:
            broadcastClearEvent(currentRadioElm, null); // notify other budy <Radio>s that this <Radio> is unselected because it was unmounted
        };
    }, []); // runs once on startup
    
    
    
    // default props:
    const {
        // semantics:
        tag               = 'span',
        semanticTag       = '',      // no corresponding semantic tag => defaults to <div> (overwritten to <span>)
        semanticRole      = 'radio', // uses [role="radio"] as the default semantic role
        
        
        
        // classes:
        mainClass         = styles.main,
        
        
        
        // values:
        controllableValue = collectiveRadioIsActive,
        
        
        
        // formats:
        type              = 'radio',
        
        
        
        // other props:
        ...restCheckProps
    } = restRadioProps satisfies NoForeignProps<typeof restRadioProps, CheckProps<TElement>>;
    
    const appendValidationDeps = useEvent<ValidationDeps>((bases) => [
        ...bases,
        
        // additional props that influences the validityState (for <Radio>):
        /*
            Since we redefined the `isActive` to `active` in <Radio> component,
            we need to add the checked state of current|buddyRadios.
        */
        collectiveRadioIsActive,
        
        // validations:
        // no more validation props, still the same as <Check>
    ]);
    const mergedValidationDeps = useEvent<ValidationDeps>((bases) => {
        // conditions:
        if (validationDepsOverwrite) return validationDepsOverwrite(appendValidationDeps(bases));
        return appendValidationDeps(bases);
    });
    
    
    
    // jsx:
    return (
        <Check<TElement>
            // other props:
            {...restCheckProps}
            
            
            
            // refs:
            elmRef={mergedInputRef}
            
            
            
            // semantics:
            tag          = {tag}
            semanticTag  = {semanticTag}
            semanticRole = {semanticRole}
            
            
            
            // classes:
            mainClass={mainClass}
            
            
            
            // values:
            controllableValue={controllableValue}
            
            
            
            // validations:
            validationDeps={mergedValidationDeps}
            
            
            
            // formats:
            type={type}
            
            
            
            // states:
            active={isActive}
            
            
            
            // handlers:
            onClick   = {handleClick}
            onKeyUp   = {handleKeyUp}
            onChange  = {handleChange}
        />
    );
};
export {
    Radio,            // named export for readibility
    Radio as default, // default export to support React.lazy
}

export type { CheckStyle, CheckVariant }
