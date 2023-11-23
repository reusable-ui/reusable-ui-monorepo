// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useEffect,
    useState,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

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



// styles:
export const usePortalStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'axkf168ce4' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// hooks:

// capabilities:

//#region global stackable
export interface GlobalStackableProps
{
    // global stackable:
    viewport ?: React.RefObject<Element>|Element|null // getter ref
}
export const useGlobalStackable = (props: GlobalStackableProps) => {
    // styles:
    const styleSheet = usePortalStyleSheet();
    
    
    
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
        const newPortalElm = document.createElement('div'); // use a div as a container for migrating to the last child
        newPortalElm.classList.add(styleSheet.main);
        
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
