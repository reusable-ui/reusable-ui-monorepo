// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useEffect,
    useRef,
}                           from 'react'

// reusable-ui states:
import type {
    // hooks:
    CollapsibleApi,
}                           from '@reusable-ui/collapsible'     // a capability of UI to expand/reduce its size or toggle the visibility



// hooks:

// capabilities:

//#region auto focusable
export interface AutoFocusableProps {
    // auto focusable:
    autoFocusOn        ?: React.RefObject<Element>|Element|null // getter ref
    restoreFocusOn     ?: React.RefObject<Element>|Element|null // getter ref
    autoFocus          ?: boolean
    restoreFocus       ?: boolean
    autoFocusScroll    ?: boolean
    restoreFocusScroll ?: boolean
}
export const useAutoFocusable = <TElement extends Element = HTMLElement>(props: AutoFocusableProps, collapsibleApi: CollapsibleApi<TElement>): void => {
    // rest props:
    const {
        // auto focusable:
        autoFocusOn,
        restoreFocusOn,
        autoFocus          = true,
        restoreFocus       = true,
        autoFocusScroll    = false,
        restoreFocusScroll = false,
    } = props;
    
    
    
    // states:
    const isExpanded        = collapsibleApi.expanded;
    const prevIsExpandedRef = useRef<boolean>(false); // initially set to `false` instead of the value of `isExpanded`, so when on first page load the focus executed
    
    
    
    // refs:
    const prevFocusRef = useRef<Element|null>(null);
    
    
    
    // set focus on <FocusableTarget> whenever the <Component> is shown:
    useEffect(() => {
        // conditions:
        if (prevIsExpandedRef.current === isExpanded) return; // no change => ignore
        prevIsExpandedRef.current = isExpanded;               // sync
        
        
        
        // setups:
        if (isExpanded) {
            // backup the current_focused_element (if any):
            prevFocusRef.current = document.activeElement;
            
            
            
            // when the <Component> is shown => focus the <FocusableTarget>:
            const autoFocusElm = ((autoFocusOn instanceof Element) ? autoFocusOn : autoFocusOn?.current);
            if (autoFocus && autoFocusElm && (autoFocusElm as HTMLElement|SVGElement).focus) {
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        (autoFocusElm as HTMLElement|SVGElement).focus({ preventScroll: !autoFocusScroll });
                    }); // wait until mouseup|keyup fired of the <TriggerButton> (if any)
                }, 0); // wait until mouseup|keyup fired of the <TriggerButton> (if any)
            } // if
        }
        else { // isCollapsed
            // if current_focused_element is inside the <Component> or inside the <RestoreFocusElm> => back focus to <RestoreFocusElm> ?? <PrevFocusElm>:
            const restoreFocusElm = (
                (restoreFocusOn !== undefined)
                
                // use custom restore elm:
                ? ((restoreFocusOn instanceof Element) ? restoreFocusOn : restoreFocusOn?.current)
                
                // use default restore elm:
                : prevFocusRef.current
            );
            if (restoreFocus && restoreFocusElm && (restoreFocusElm as HTMLElement|SVGElement).focus) {
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        // conditions:
                        const focusedElm = document.activeElement;
                        if (!focusedElm) return; // nothing was focused => nothing to re_focus_back
                        
                        const autoFocusElm = ((autoFocusOn instanceof Element) ? autoFocusOn : autoFocusOn?.current);
                        if (                                        // neither
                            !(autoFocusElm?.contains?.(focusedElm)) // the current_focused_element is inside the <Component> or the <Component> itself
                            &&                                      // nor
                            !restoreFocusElm.contains(focusedElm)   // the current_focused_element is inside the <RestoreFocusElm> or the <RestoreFocusElm> itself
                        ) return;                                   // => nothing to re_focus_back because the current_focused_element is *already* switched out from <Component>|<RestoreFocusElm> to somewhere by *user action*
                        
                        
                        
                        // restore the previously focused element (if any):
                        (restoreFocusElm as HTMLElement|SVGElement).focus({ preventScroll: !restoreFocusScroll });
                    }); // wait until the user decided to change the focus to another <Element>
                }, 0); // wait until the user decided to change the focus to another <Element>
            } // if
            
            
            
            // unreference the restored focused element:
            prevFocusRef.current = null;
        } // if
    }, [
        // states:
        isExpanded,
        
        
        
        // auto focusable:
        autoFocusOn,
        restoreFocusOn,
        autoFocus,
        restoreFocus,
        autoFocusScroll,
        restoreFocusScroll,
    ]);
};
//#endregion auto focusable
