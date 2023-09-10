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
    // hooks:
    useEvent,
}                           from '@reusable-ui/hooks'           // react helper hooks

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
        if (!viewportElm) return; // if undefined => server side => ignore
        
        
        
        // setups:
        const newPortalElm = document.createElement('div');
        viewportElm.appendChild(newPortalElm); // add side effect
        setPortalElm(newPortalElm);
        
        
        
        // cleanups:
        return () => {
            newPortalElm.parentElement?.removeChild?.(newPortalElm); // remove side effect
        };
    }, [viewportElm]);
    
    
    
    // stable callbacks:
    const ensureTopMost = useEvent((): void => {
        const parentElement = portalElm?.parentElement;
        if (parentElement && (parentElement.lastElementChild !== portalElm)) { // if not the_last_child
            parentElement.appendChild?.(portalElm); // place at the last
        } // if
    });
    
    
    
    // return the implementations:
    return {
        viewportElm,
        portalElm,
        ensureTopMost,
    };
};
//#endregion global stackable
