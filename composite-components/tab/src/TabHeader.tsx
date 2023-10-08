// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useMemo,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useMergeClasses,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    ListItemProps,
    ListItem,
    
    ListItemComponentProps,
    
    ListProps,
    List,
    
    ListComponentProps,
}                           from '@reusable-ui/list'            // represents a series of content

// internals:
import {
    // states:
    TabExpandedChangeEvent,
    useTabState,
}                           from './states/tabState.js'
import {
    // react components:
    ListItemWithState,
}                           from './ListItemWithState.js'
import type {
    // react components:
    TabPanelProps,
}                           from './TabPanel.js'



// react components:
export interface TabHeaderProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        Omit<ListProps<TElement>,
            // values:
            |'defaultValue'            // not supported
            |'value'                   // not supported
            |'onChange'                // not supported
            
            // formats:
            |'autoCapitalize'          // not supported
            
            // children:
            |'children'                // replaced `children` with `tabPanels`
            |'dangerouslySetInnerHTML' // not supported
        >,
        
        // components:
        Omit<ListComponentProps<TElement>,
            // we don't need these extra properties because the <TabHeader> is sub <List>
            |'listRef'
            |'listOrientation'
            |'listStyle'
            
            
            
            // children:
            |'listItems'               // replaced `listItems` with `tabPanels.label`
        >,
        ListItemComponentProps<Element>
{
    // accessibilities:
    label ?: string
}
const TabHeader = <TElement extends Element = HTMLElement>(props: TabHeaderProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // accessibilities:
        label,
        
        
        
        // components:
        listComponent     = (<List<TElement>    /> as React.ReactComponentElement<any, ListProps<TElement>    >),
        listItemComponent = (<ListItem<Element> /> as React.ReactComponentElement<any, ListItemProps<Element> >),
    ...restListProps} = props;
    
    
    
    // classes:
    const classes = useMergeClasses(
        // preserves the original `classes` from `listComponent`:
        listComponent.props.classes,
        
        
        
        // preserves the original `classes` from `props`:
        props.classes,
        
        
        
        // classes:
        'tabHeader',
    );
    
    
    
    // states:
    const {
        // data:
        tabPanels,
        tabId,
    } = useTabState();
    
    
    
    // children:
    const listComponentChildren = listComponent.props.children;
    const wrappedChildren = useMemo<React.ReactNode|React.ReactNode[]>(() => {
        let tabIndex = -1;
        return (
            listComponentChildren
            ??
            React.Children.map<React.ReactNode, React.ReactNode>(tabPanels, (tabPanel, childIndex) => {
                // conditions:
                if (!React.isValidElement<TabPanelProps<Element, TabExpandedChangeEvent>>(tabPanel)) return null; // not a <TabPanel> => ignore
                
                
                
                // a valid tab counter:
                tabIndex++; // only count of <TabPanel>s, ignores of foreign nodes
                
                
                
                // fn props:
                const tabHeaderId = `${tabId}h${tabIndex}`;
                const tabPanelId  = `${tabId}p${tabIndex}`;
                const {props: {label: tabPanelLabel}} = tabPanel;
                
                
                
                // props:
                const listItemComponentProps : ListItemProps<Element> = {
                    // other props:
                    ...listItemComponent.props,
                    
                    
                    
                    // identifiers:
                    id              : listItemComponent.props.id               ?? tabHeaderId,
                    
                    
                    
                    // semantics:
                    semanticTag     : listItemComponent.props.semanticTag      ?? '',    // no corresponding semantic tag => defaults to <div>
                    semanticRole    : listItemComponent.props.semanticRole     ?? 'tab', // uses [role="tab"] as the default semantic role
                    'aria-controls' : listItemComponent.props['aria-controls'] ?? tabPanelId,
                    
                    
                    
                    // states:
                    enabled         : listItemComponent.props.enabled          ?? tabPanel.props.enabled,
                    inheritEnabled  : listItemComponent.props.inheritEnabled   ?? tabPanel.props.inheritEnabled,
                    
                    
                    
                    // children:
                    children        : listItemComponent.props.children         ?? tabPanelLabel,
                };
                
                
                
                // jsx:
                return (
                    /* wrap child with <ListItemWithState> */
                    <ListItemWithState<Element, TabExpandedChangeEvent>
                        // other props:
                        {...listItemComponentProps} // steals all listItemComponent's props, so the <Owner> can recognize the <ListItemWithState> as <TheirChild>
                        
                        
                        
                        // identifiers:
                        key={tabPanel.key ?? childIndex}
                        
                        
                        
                        // positions:
                        tabIndex={tabIndex}
                        
                        
                        
                        // components:
                        listItemComponent={
                            // clone listItemComponent element with (almost) blank props:
                            <listItemComponent.type
                                // identifiers:
                                key={listItemComponent.key ?? tabPanel.key ?? childIndex}
                                
                                
                                
                                //#region restore conflicting props
                                {...{
                                    ...(('tabIndex'          in listItemComponentProps) ? { tabIndex          : listItemComponentProps.tabIndex          } : undefined),
                                    ...(('listItemComponent' in listItemComponentProps) ? { listItemComponent : listItemComponentProps.listItemComponent } : undefined),
                                }}
                                //#endregion restore conflicting props
                            />
                        }
                    />
                );
            })
        );
    }, [listComponentChildren, tabPanels]);
    
    
    
    // jsx:
    /* <List> */
    return React.cloneElement<ListProps<TElement>>(listComponent,
        // props:
        {
            // other props:
            ...restListProps,
            ...listComponent.props, // overwrites restListProps (if any conflics)
            
            
            
            // semantics:
            semanticTag  : listComponent.props.semanticTag   ?? props.semanticTag   ?? '',        // no corresponding semantic tag => defaults to <div>
            semanticRole : listComponent.props.semanticRole  ?? props.semanticRole  ?? 'tablist', // uses [role="tablist"] as the default semantic role
            'aria-label' : listComponent.props['aria-label'] ?? props['aria-label'] ?? label,
            
            
            
            // variants:
            listStyle    : listComponent.props.listStyle     ?? props.listStyle     ?? 'tab',
            orientation  : listComponent.props.orientation   ?? props.orientation   ?? 'inline',
            
            
            
            // classes:
            classes      : classes,
            
            
            
            // behaviors:
            actionCtrl   : listComponent.props.actionCtrl    ?? props.actionCtrl    ?? true,
        },
        
        
        
        // children:
        wrappedChildren,
    );
};
export {
    TabHeader,
    TabHeader as default,
}
