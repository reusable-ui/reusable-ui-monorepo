// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    useMergeEvents,
    useScheduleTriggerEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// react components:
export interface WithAutoCapitalizeProps
    extends
        // bases:
        React.InputHTMLAttributes<HTMLInputElement>
{
    // components:
    /**
     * Required.  
     *   
     * The underlying `<Element>` to be `<Link>`-ed and manipulated of `[active]` & `[aria-current]` props, based on the current page url.
     */
    children  : React.ReactComponentElement<any, React.InputHTMLAttributes<HTMLInputElement>>
}
const WithAutoCapitalize = (props: WithAutoCapitalizeProps): JSX.Element|null => {
    // rest props:
    const {
        // components:
        children : inputComponent,
    ...restInputProps} = props;
    
    
    
    // events:
    const scheduleTriggerEvent = useScheduleTriggerEvent();
    
    
    
    // handlers:
    const handleKeyDownCaptureInternal = useEvent<React.KeyboardEventHandler<HTMLInputElement>>((event) => {
        // data:
        const {
            shiftKey,
            altKey,
            ctrlKey,
            metaKey,
            
            code,
            key,
        } = event;
        const inputElm = event.target as (EventTarget & HTMLInputElement);
        
        
        
        // conditions:
        if (shiftKey || altKey || ctrlKey || metaKey) return; // ignore when [shift] [alt] [ctrl] [win] key is pressed
        if (!code || !key)                            return; // ignore autocomplete event
        if (!code?.startsWith('Key'))                 return; // ignore [backspace] [enter] [tab] etc
        if (key === key?.toLocaleUpperCase())         return; // ignore already UPPERCASED
        
        
        
        // text position:
        const {
            value          = '',
            selectionStart = value.length,
            selectionEnd   = value.length,
        } = inputElm;
        const prevValue    = value.slice(0, selectionStart!);
        
        
        
        // more conditions:
        switch (props.autoCapitalize ?? inputComponent.props.autoCapitalize ?? 'off') {
            case 'characters':
                // *all* letters should be UPPERCASED => no further condition check
                break;
            
            case 'words':
                // the *first* letter of each *word* should be UPPERCASED => separated by <space(s)>
                if (!!prevValue && !prevValue.match(/\s$/)) return; // the prev letter should be a <space> -or- no_prev_letter
                break;
            
            case 'on':
            case 'sentences':
                // the *first* letter of each *sentence* should be UPPERCASED => separated by <dot><space(s)>
                if (!!prevValue && !prevValue.match(/\.\s+$/)) return; // the prev letter should be <dot><space(s)> -or- no_prev_letter
                break;
            
            case 'off':
            case 'none':
            default:
                return; // no need to autoCapitalize => abort
        } // switch
        
        
        
        // event propagations:
        event.preventDefault(); // intercept the user's lowercase input & replace with uppercase
        
        
        
        // update value:
        const newValue = prevValue + key.toLocaleUpperCase() + value.slice(selectionEnd!);
        
        
        
        // trigger events:
        scheduleTriggerEvent(() => { // runs the `input` event *next after* current macroTask completed
            const oldValue = inputElm.value;
            inputElm.value = newValue;                           // react *hack* set_value *before* firing `input` event
            (inputElm as any)._valueTracker?.setValue(oldValue); // react *hack* in order to React *see* the changes when `input` event fired
            
            
            
            // update selection:
            const newSelection = selectionStart! + 1;
            inputElm.setSelectionRange(newSelection, newSelection);
            
            
            
            // fire `input` native event to trigger `onChange` synthetic event:
            inputElm.dispatchEvent(new Event('input', { bubbles: true, cancelable: false, composed: true }));
        });
    });
    const handleKeyDownCapture         = useMergeEvents(
        // preserves the original `onKeyDownCapture` from `inputComponent`:
        inputComponent.props.onKeyDownCapture,
        
        
        
        // preserves the original `onKeyDownCapture` from `props`:
        props.onKeyDownCapture,
        
        
        
        // actions:
        handleKeyDownCaptureInternal,
    );
    
    
    
    // jsx:
    return React.cloneElement(inputComponent,
        // props:
        {
            // other props:
            ...restInputProps,
            ...inputComponent.props, // overwrites restInputProps (if any conflics)
            
            
            
            // handlers:
            onKeyDownCapture : handleKeyDownCapture,
        },
    );
};
export {
    WithAutoCapitalize,
    WithAutoCapitalize as default,
}
