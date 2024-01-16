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
    useEvent,
    EventHandler,
    useMergeEvents,
    useScheduleTriggerEvent,
    
    
    
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



// types:
export interface TabExpandedChangeEvent extends ExpandedChangeEvent {
    // positions:
    tabIndex : number
}



// contexts:
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

const noopHandler = () => { throw Error('not inside <Tab>'); };
const TabStateContext = createContext<TabState>({
    // behaviors:
    defaultLazy              : undefined,
    
    
    
    // states:
    expandedTabIndex         : _defaultExpandedTabIndex,
    triggerExpandedChange    : noopHandler,
    
    
    
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
}
const TabStateProvider = <TTabExpandedChangeEvent extends TabExpandedChangeEvent = TabExpandedChangeEvent>(props: React.PropsWithChildren<TabStateProps<TTabExpandedChangeEvent>>): JSX.Element|null => {
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
    
    
    
    // events:
    const scheduleTriggerEvent         = useScheduleTriggerEvent();
    const triggerExpandedChange        = useEvent((tabIndex: number): void => {
        if (handleExpandedChange) scheduleTriggerEvent(() => { // runs the `onExpandedChange` event *next after* current macroTask completed
            // fire `onExpandedChange` react event:
            handleExpandedChange({ expanded: true, tabIndex } as TTabExpandedChangeEvent);
        });
    });
    
    
    
    // states:
    const tabState = useMemo<TabState>(() => ({
        // behaviors:
        defaultLazy           : lazy,                  // mutable value
        
        
        
        // states:
        expandedTabIndex      : expandedTabIndexFn,    // mutable value
        triggerExpandedChange : triggerExpandedChange, // stable ref
        
        
        
        // data:
        tabPanels             : tabPanels,             // mutable value
        tabId                 : tabId,                 // mutable value
        tabPanelStyle         : tabPanelStyle,         // mutable value
    }), [
        // behaviors:
        lazy,
        
        
        
        // states:
        expandedTabIndexFn,
        
        
        
        // data:
        tabPanels,
        tabId,
        tabPanelStyle,
    ]);
    
    
    
    // jsx:
    return (
        <TabStateContext.Provider value={tabState}>
            {children}
        </TabStateContext.Provider>
    );
};
export {
    TabStateProvider,
    TabStateProvider as default,
}
//#endregion tabState
