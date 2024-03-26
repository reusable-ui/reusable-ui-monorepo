// react:
import {
    // react:
    default as React,
    
    
    
    // contexts:
    createContext,
    
    
    
    // hooks:
    useContext,
    useMemo,
}                           from 'react'



// hooks:

// states:

//#region listState

// defaults:
const _defaultItemActionCtrl : boolean = false



// contexts:
export interface ListState
{
    // behaviors:
    defaultActionCtrl : boolean
}

const ListStateContext = createContext<ListState>({
    // behaviors:
    defaultActionCtrl : _defaultItemActionCtrl,
});
ListStateContext.displayName  = 'ListState';

export const useListState = (): ListState => {
    return useContext(ListStateContext);
}



// react components:
export interface ListStateProps
{
    // behaviors:
    actionCtrl ?: boolean
}
const ListStateProvider = (props: React.PropsWithChildren<ListStateProps>): JSX.Element|null => {
    // props:
    const {
        // behaviors:
        actionCtrl = _defaultItemActionCtrl,
        
        
        
        // children:
        children,
    } = props;
    
    
    
    // states:
    const listState = useMemo<ListState>(() => ({
        // behaviors:
        defaultActionCtrl : actionCtrl, // mutable value
    }), [
        // behaviors:
        actionCtrl,
    ]);
    
    
    
    // jsx:
    return (
        <ListStateContext.Provider value={listState}>
            {children}
        </ListStateContext.Provider>
    );
};
export {
    ListStateProvider,
    ListStateProvider as default,
}
//#endregion listState
