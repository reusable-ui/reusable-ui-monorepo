// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // cssfn general types:
    Optional,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useMergeClasses,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import type {
    // react components:
    IndicatorProps,
}                           from '@reusable-ui/indicator'       // a base component

// internals:
import {
    // styles:
    useListItemStyleSheet,
    
    
    
    // react components:
    ListItemProps,
    ListItem,
}                           from './ListItem'



// defaults:
const _defaultListSeparatorItemClasses : Optional<string>[] = ['void']



// styles:
export const useListSeparatorItemStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/listSeparatorItemStyles.js')
, {
    specificityWeight : 2,            // makes <ListSeparatorItem> more specific than <ListItem>
    id                : 'n8qnfmo0ja', // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
});



// react components:
export interface ListSeparatorItemProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        Omit<Pick<ListItemProps<TElement>, keyof IndicatorProps>, 'children'> // [actionCtrl] & related props are not supported
{
}
export const ListSeparatorItem = <TElement extends Element = HTMLElement>(props: ListSeparatorItemProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet           = useListItemStyleSheet();
    const separatorStyleSheet  = useListSeparatorItemStyleSheet();
    
    
    
    // classes:
    const classes = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // classes:
        _defaultListSeparatorItemClasses,
    );
    
    
    
    // jsx:
    return (
        <ListItem<TElement>
            // other props:
            {...props}
            
            
            
            // classes:
            mainClass={props.mainClass ?? `${styleSheet.main} ${separatorStyleSheet.main}`}
            classes={classes}
        >
            <hr />
        </ListItem>
    );
};
