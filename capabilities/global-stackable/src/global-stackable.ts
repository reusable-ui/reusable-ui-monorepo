// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useEffect,
    useState,
}                           from 'react'

// reusable-ui utilities:
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

//#region global stackable
export interface GlobalStackableProps
{
    // global stackable:
    viewport ?: React.RefObject<Element>|Element|null // getter ref
}
export const useGlobalStackable = (props: GlobalStackableProps) => {
    // rest props:
    const {
        // global stackable:
        viewport,
    } = props;
    
    
    
    // viewport:
    const viewportElm = getViewportOrDefault(viewport);
    
    
    
    // states:
    const [portalElm, setPortalElm] = useState<HTMLDivElement|null>(null);
    
    
    
    // dom effects:
    // delays the rendering of portal until the page is fully hydrated
    useEffect(() => {
        // conditions:
        if (!isClientSide) return; // client side only, server side => ignore
        
        
        
        // setups:
        const newPortalElm = document.createElement('div');
        viewportElm.appendChild(newPortalElm); // add side effect
        setPortalElm(newPortalElm);
        
        
        
        // cleanups:
        return () => {
            viewportElm.removeChild(newPortalElm); // remove side effect
        };
    }, [viewportElm]);
    
    
    
    // return the implementations:
    return {
        viewportElm,
        portalElm,
    };
};
//#endregion global stackable
