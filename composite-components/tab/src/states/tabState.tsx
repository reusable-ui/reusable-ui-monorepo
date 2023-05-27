// react:
import {
    // react:
    default as React,
    
    
    
    // contexts:
    createContext,
    
    
    
    // hooks:
    useContext,
    useState,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    EventHandler,
    useMergeEvents,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// internals:
import {
    // variants:
    TabPanelStyle,
    TabPanelVariant,
    useTabPanelVariant,
}                           from '../variants/TabPanelVariant.js'



// hooks:

// states:

//#region tabState
// defaults:
const _defaultExpandedTabIndex = 0;



export interface TabExpandedChangeEvent extends ExpandedChangeEvent {
    // positions:
    tabIndex : number
}



export interface TabState
{
    // behaviors:
    defaultLazy             ?: boolean
    
    
    
    // states:
    expandedTabIndex         : number
    triggerExpandedChange    : (tabIndex: number) => void
    
    
    
    // data:
    tabPanels                : React.ReactNode // required
    tabId                    : string
    tabPanelStyle            : TabPanelStyle
}

const TabStateContext = createContext<TabState>({
    // behaviors:
    defaultLazy              : undefined,
    
    
    
    // states:
    expandedTabIndex         : _defaultExpandedTabIndex,
    triggerExpandedChange    : () => { throw Error('not inside <TabStateProvider>'); },
    
    
    
    // data:
    tabPanels                : undefined,
    tabId                    : '',
    tabPanelStyle            : 'maxContent'
});
TabStateContext.displayName  = 'TabState';

export const useTabState = (): TabState => {
    return useContext(TabStateContext);
}



// react components:
export interface TabStateProps<TTabExpandedChangeEvent extends TabExpandedChangeEvent = TabExpandedChangeEvent>
    extends
        // variants:
        TabPanelVariant
{
    // behaviors:
    lazy                    ?: boolean
    
    
    
    // states:
    defaultExpandedTabIndex ?: number
    expandedTabIndex        ?: number
    onExpandedChange        ?: EventHandler<TTabExpandedChangeEvent>
    
    
    
    // data:
    tabPanels                : React.ReactNode // required
    tabId                    : string
    
    
    
    // children:
    children                ?: React.ReactNode
}
const TabStateProvider = <TTabExpandedChangeEvent extends TabExpandedChangeEvent = TabExpandedChangeEvent>(props: TabStateProps<TTabExpandedChangeEvent>): JSX.Element|null => {
    // props:
    const {
        // behaviors:
        lazy,
        
        
        
        // states:
        defaultExpandedTabIndex,
        expandedTabIndex,
        onExpandedChange,
        
        
        
        // data:
        tabPanels,
        tabId,
        
        
        
        // children:
        children,
    } = props;
    
    
    
    // variants:
    const {class: tabPanelStyle} = useTabPanelVariant(props);
    
    
    
    // states:
    const isControllableExpanded = (expandedTabIndex !== undefined);
    const [expandedTabIndexDn, setExpandedTabIndexDn] = useState<number>(defaultExpandedTabIndex ?? _defaultExpandedTabIndex);
    const expandedTabIndexFn : number = (expandedTabIndex /*controllable*/ ?? expandedTabIndexDn /*uncontrollable*/);
    
    
    
    // handlers:
    const handleExpandedChangeInternal = useEvent<EventHandler<TTabExpandedChangeEvent>>(({expanded, tabIndex}) => {
        // update state:
        if (!isControllableExpanded) setExpandedTabIndexDn(expanded ? tabIndex : _defaultExpandedTabIndex);
    });
    const handleExpandedChange         = useMergeEvents(
        // preserves the original `onExpandedChange` from `props`:
        onExpandedChange,
        
        
        
        // actions:
        handleExpandedChangeInternal,
    );
    const triggerExpandedChange        = useEvent((tabIndex: number): void => {
        handleExpandedChange?.({ expanded: true, tabIndex } as TTabExpandedChangeEvent);
    });
    
    
    
    // jsx:
    return (
        <TabStateContext.Provider value={{
            // behaviors:
            defaultLazy           : lazy,
            
            
            
            // states:
            expandedTabIndex      : expandedTabIndexFn,
            triggerExpandedChange : triggerExpandedChange,
            
            
            
            // data:
            tabPanels             : tabPanels,
            tabId                 : tabId,
            tabPanelStyle         : tabPanelStyle,
        }}>
            {children}
        </TabStateContext.Provider>
    );
};
export {
    TabStateProvider,
    TabStateProvider as default,
}
//#endregion tabState
