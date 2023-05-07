// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    useTriggerRender,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // utilities:
    isClientSide,
}                           from '@reusable-ui/client-sides'    // a set of client-side functions

// internals:
import {
    // utilities:
    getViewportOrDefault,
}                           from './utilities.js'



// hooks:

// capabilities:

//#region stackable
export interface StackableProps
{
    // stackable:
    viewport ?: React.RefObject<Element>|Element|null // getter ref
}
export const useStackable = <TElement extends Element = HTMLElement>(props: StackableProps) => {
    // rest props:
    const {
        // stackable:
        viewport,
    } = props;
    
    
    
    // viewport:
    const viewportElm = getViewportOrDefault(viewport);
    
    
    
    // dom effects:
    const portalElmRef = useRef<HTMLDivElement|null>(null);
    
    // delays the rendering of portal until the page is fully hydrated
    const [triggerRender] = useTriggerRender();
    useEffect(() => {
        // conditions:
        if (!isClientSide) return; // client side only, server side => ignore
        
        
        
        // setups:
        const portalElm = document.createElement('div');
        viewportElm.appendChild(portalElm); // add side effect
        portalElmRef.current = portalElm;
        
        triggerRender(); // re-render with hydrated version
        
        
        
        // cleanups:
        return () => {
            viewportElm.removeChild(portalElm); // remove side effect
            portalElmRef.current = null;
        };
    }, [viewportElm]);
    
    
    
    // return the implementations:
    return {
        viewportElm,
        portalElm : portalElmRef.current,
    };
};
//#endregion stackable
