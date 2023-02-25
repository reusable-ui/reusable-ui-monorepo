// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui core:
import type {
    // a semantic management system for react web components:
    Role,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import type {
    // react components:
    ListItemProps,
    
    ListProps,
}                           from '@reusable-ui/list'            // represents a series of content



// utilities:
export const calculateSemanticRole = <TElement extends Element = HTMLElement>(props: ListProps<TElement>, defaultActionCtrl: boolean|undefined): Role|null => {
    if (props.role) return null; // pre defined role => no need to determine the role automatically
    
    
    
    const listItems         = props.children;
    if (React.Children.toArray(listItems).some((listItem) => {
        if (!React.isValidElement<ListItemProps<Element>>(listItem)) {
            return !(defaultActionCtrl ?? false);                              // if the default is not an actionCtrl => not a menu item => role='dialog'
        }
        else {
            return !(listItem.props.actionCtrl ?? defaultActionCtrl ?? false); // if <ListItem>  is not an actionCtrl => not a menu item => role='dialog'
        } // if
    })) return 'dialog'; // one/some <ListItem>s are [actionCtrl=false] => role='dialog'
    
    
    
    return 'menu'; // all <ListItem>s are [actionCtrl=true] => role='menu'
};
