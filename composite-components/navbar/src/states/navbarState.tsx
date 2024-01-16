'use client'

// react:
import {
    // react:
    default as React,
    
    
    
    // contexts:
    createContext,
    
    
    
    // hooks:
    useContext,
    useState,
    useMemo,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useIsomorphicLayoutEffect,
    useEvent,
    EventHandler,
    
    
    
    // basic variants of UI:
    BasicVariantProps,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ActiveChangeEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// hooks:

// states:

//#region navbarState
// contexts:
export interface NavbarState
{
    // basic variant props:
    basicVariantProps       : BasicVariantProps
    
    
    
    // states:
    navbarExpanded          : boolean
    listExpanded            : boolean
    
    
    
    // handlers:
    toggleList              : EventHandler<boolean|undefined>
    handleActiveChange      : EventHandler<ActiveChangeEvent>
    handleClickToToggleList : React.MouseEventHandler<Element>
}

const noopHandler = () => { throw Error('not inside <Navbar>'); };
const NavbarStateContext = createContext<NavbarState>({
    // basic variant props:
    basicVariantProps       : {},
    
    
    
    // states:
    navbarExpanded          : false,
    listExpanded            : false,
    
    
    
    // handlers:
    toggleList              : noopHandler,
    handleActiveChange      : noopHandler,
    handleClickToToggleList : noopHandler,
});
NavbarStateContext.displayName  = 'NavbarState';

export const useNavbarState = (): NavbarState => {
    return useContext(NavbarStateContext);
}



// react components:
export interface NavbarStateProps
{
    // basic variant props:
    basicVariantProps       : BasicVariantProps
    
    
    
    // states:
    navbarExpanded          : boolean
}
const NavbarStateProvider = (props: React.PropsWithChildren<NavbarStateProps>): JSX.Element|null => {
    // props:
    const {
        // basic variant props:
        basicVariantProps,
        
        
        
        // states:
        navbarExpanded,
        
        
        
        // children:
        children,
    } = props;
    
    
    
    // states:
    const [listExpanded, setListExpanded] = useState<boolean>(false);
    
    
    
    // handlers:
    const toggleList                = useEvent<EventHandler<boolean|undefined>>((newListExpanded) => {
        // conditions:
        if (navbarExpanded) return; // the expand/collapse functionality is only for the mobile version of <Navbar>
        
        
        
        // actions:
        setListExpanded(newListExpanded ?? !listExpanded);
    }) as ((newListExpanded ?: boolean) => void);
    const handleActiveChange        = useEvent<EventHandler<ActiveChangeEvent>>((event) => {
        // actions:
        toggleList(event.active);
    });
    const handleClickToToggleList   = useEvent<React.MouseEventHandler<Element>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        toggleList();
        event.preventDefault(); // handled
    });
    
    
    
    // states:
    const tabState = useMemo<NavbarState>(() => ({
        // basic variant props:
        basicVariantProps,          // mutable value
        
        
        
        // states:
        navbarExpanded,             // mutable value
        listExpanded,               // mutable value
        
        
        
        // handlers:
        toggleList,                 // stable ref
        handleActiveChange,         // stable ref
        handleClickToToggleList,    // stable ref
    }), [
        // basic variant props:
        basicVariantProps,
        
        
        
        // states:
        navbarExpanded,
        listExpanded,
        
        
        
        // handlers:
        // toggleList,              // stable ref
        // handleActiveChange,      // stable ref
        // handleClickToToggleList, // stable ref
    ]);
    
    
    
    // effects:
    // collapses the <Navbar>'s list if switched from mobile to desktop:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!listExpanded)  return;  // the <Navbar>'s list was already collapsed => ignore
        if (!navbarExpanded) return; // the <Navbar> is in mobile version         => ignore
        
        
        
        // setups:
        let cancelRequest = requestAnimationFrame(() => { // give the <ResponsiveProvider> an enough time to calculate the most suitable layout
            cancelRequest = requestAnimationFrame(() => { // give the <ResponsiveProvider> an enough time to calculate the most suitable layout
                setListExpanded(false); // collapsing the <Navbar>'s list
            });
        });
        
        
        
        // cleanups:
        return () => {
            // the <Navbar> immediately switched to mobile version => aborts
            cancelAnimationFrame(cancelRequest);
        };
    }, [navbarExpanded, listExpanded]);
    
    
    
    // jsx:
    return (
        <NavbarStateContext.Provider value={tabState}>
            {children}
        </NavbarStateContext.Provider>
    );
};
export {
    NavbarStateProvider,
    NavbarStateProvider as default,
}
//#endregion navbarState
