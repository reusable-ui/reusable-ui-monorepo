// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
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
    // react helper hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ActiveChangeEvent,
    useUncontrollableActivatable,
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
    // styles:
    const styleSheet   = useRadioStyleSheet();
    
    
    
    // rest props:
    const {
        // refs:
        elmRef,
        
        
        
        // states:
        defaultActive,  // take, to be handled by `useUncontrollableActivatable`
        active,         // take, to be handled by `useUncontrollableActivatable`
        inheritActive,  // take, to be handled by `useUncontrollableActivatable`
        onActiveChange, // take, to be handled by `useUncontrollableActivatable`
        
        
        
        // values:
        defaultChecked, // take, to be aliased to `defaultActive`
        checked,        // take, to be aliased to `active`
    ...restCheckProps} = props;
    
    
    
    // refs:
    const inputRefInternal = useRef<HTMLInputElement|null>(null);
    const mergedInputRef   = useMergeRefs(
        // preserves the original `elmRef`:
        elmRef,
        
        
        
        inputRefInternal,
    );
    
    
    
    // states:
    const [isActive, setActive] = useUncontrollableActivatable<ActiveChangeEvent>({
        enabled         : props.enabled,
        inheritEnabled  : props.inheritEnabled,
        readOnly        : props.readOnly,
        inheritReadOnly : props.inheritReadOnly,
        
        defaultActive   : defaultActive ?? defaultChecked, // aliased `defaultChecked` to `defaultActive`
        active          : active        ?? checked,        // aliased `checked`        to `active`
        inheritActive,
        onActiveChange,
    }, /*changeEventTarget :*/inputRefInternal);
    
    
    
    // handlers:
    const handleClickInternal   = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        setActive(true);        // handle click as selecting [active]
        event.preventDefault(); // handled
    });
    const handleClick           = useMergeEvents(
        // preserves the original `onClick`:
        props.onClick,
        
        
        
        // actions:
        handleClickInternal,
    );
    
    const handleKeyUpInternal   = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        if ((event.key === ' ') || (event.code === 'Space')) {
            setActive(true);        // handle click as selecting [active]
            event.preventDefault(); // handled
        } // if
    });
    const handleKeyUp           = useMergeEvents(
        // preserves the original `onKeyUp`:
        props.onKeyUp,
        
        
        
        // actions:
        handleKeyUpInternal,
    );
    
    const handleChangeInternal  = useEvent<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        const currentRadio = event.target as (EventTarget & Element) as (EventTarget & HTMLInputElement);
        const name = currentRadio.name;
        if (!name)                  return; // the <Radio> must have a name
        
        const isChecked = currentRadio.checked;
        if (!isChecked)             return; // the <Radio> is checked not cleared
        
        
        
        // actions:
        
        let parentGroup = currentRadio.parentElement;
        //#region find nearest <form> or <grandGrandParent>
        while (parentGroup) {
            if (parentGroup.tagName === 'FORM') break; // found nearest <form>
            
            // find next:
            const grandParent = parentGroup.parentElement;
            if (!grandParent) break; // nothing more to search
            parentGroup = grandParent;
        } // while
        //#endregion find nearest <form> or <grandGrandParent>
        
        
        if (parentGroup) {
            // after <currentRadio> finishes rendering => un-check (clear) the other checked radio (within the same name at the same <form>):
            Promise.resolve(parentGroup).then((parentGroup) => { // trigger the event after the <Radio> has finished rendering (for controllable <Radio>)
                for (const radio of (Array.from(parentGroup.querySelectorAll('input[type="radio"]')) as HTMLInputElement[])) {
                    if (radio === currentRadio) continue; // <radio> is self => skip
                    if (radio.name !== name)    continue; // <radio>'s name is different to us => skip
                    
                    
                    
                    // fire a custom `onClear` event to notify other <Radio>(s) to *uncheck*:
                    radio.dispatchEvent(new CustomEvent('clear', { bubbles: false }));
                } // for
            });
        } // if
        
        
        event.preventDefault(); // handled
    });
    const handleChange          = useMergeEvents(
        // preserves the original `onChange`:
        props.onChange,
        
        
        
        // actions:
        handleChangeInternal,
    );
    
    
    
    // dom effects:
    useEffect(() => {
        // conditions:
        const currentRadio = inputRefInternal.current;
        if (!currentRadio) return; // radio was unmounted => nothing to do
        
        
        
        // handlers:
        const handleClear = (): void => {
            setActive(false); // handle clear as de-selecting [active]
        };
        
        
        
        // setups:
        currentRadio.addEventListener('clear', handleClear);
        
        
        
        // cleanups:
        return () => {
            currentRadio.removeEventListener('clear', handleClear);
        };
    }, []); // runs once on startup
    
    
    
    // jsx:
    return (
        <Check<TElement>
            // other props:
            {...restCheckProps}
            
            
            
            // refs:
            elmRef={mergedInputRef}
            
            
            
            // semantics:
            tag          = {props.tag           ?? 'span' }
            semanticTag  = {props.semanticTag   ??   ''   } // no corresponding semantic tag => defaults to <div> (overwritten to <span>)
            semanticRole = {props.semanticRole  ?? 'radio'} // uses [role="radio"] as the default semantic role
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // accessibilities:
            active={isActive}
            
            
            
            // formats:
            type={props.type ?? 'radio'}
            
            
            
            // handlers:
            onClick   = {handleClick}
            onKeyUp   = {handleKeyUp}
            onChange  = {handleChange}
        />
    );
};
export {
    Radio,
    Radio as default,
}

export type { CheckStyle, CheckVariant }
