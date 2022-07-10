// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
}                           from '@reusable-ui/hooks'           // react helper hooks
import type {
    // types:
    Role,
    
    
    
    // react components:
    GenericProps,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // hooks:
    usesSizeVariant,
    OrientationName,
    OrientationVariantOptions,
    OrientationVariant,
    useOrientationVariant,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    useActivePassiveState,
    ActiveChangeEvent,
    ToggleActiveProps,
}                           from '@reusable-ui/indicator'       // a base component
export type {
    // types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    PopupPosition,
    PopupSide,
}                           from '@reusable-ui/collapse'        // a base component
import {
    // react components:
    DropdownCloseType,
    DropdownActiveChangeEvent,
    DropdownAction,
    
    DropdownComponentUiProps,
    
    DropdownProps,
    Dropdown,
}                           from '@reusable-ui/dropdown'        // a base component
import {
    // hooks:
    ListStyle,
    ListVariant,
    
    
    
    // react components:
    ListItemProps,
    ListItem,
    
    ListSeparatorItemProps,
    ListSeparatorItem,
    
    ListProps,
    List,
}                           from '@reusable-ui/list'            // represents a series of content



// utilities:
export const calculateSemanticRole = <TElement extends Element = HTMLElement>(props: ListProps<TElement>): Role|null => {
    if (props.role) return null; // pre defined role => no need to determine the role automatically
    
    
    
    const children          = props.children;
    const defaultActionCtrl = props.actionCtrl ?? true;
    if (React.Children.toArray(children).some((child) => {
        if (!React.isValidElement<ListItemProps<Element>>(child)) {
            return !defaultActionCtrl;                             // if the default is not an actionCtrl => not a menu item => role='dialog'
        }
        else {
            return !(child.props.actionCtrl ?? defaultActionCtrl); // if <ListItem>  is not an actionCtrl => not a menu item => role='dialog'
        } // if
    })) return 'dialog'; // one/some <ListItem>s are [actionCtrl=false] => role='dialog'
    
    
    
    return 'menu'; // all <ListItem>s are [actionCtrl=true] => role='menu'
};



// react components:

// ListItem => DropdownListItem
export type {
    ListItemProps,
    ListItemProps as DropdownListItemProps,
    ListItemProps as ItemProps,
}
export {
    ListItem,
    ListItem as DropdownListItem,
    ListItem as Item,
}



// ListSeparatorItem => DropdownListSeparatorItem
export type {
    ListSeparatorItemProps,
    ListSeparatorItemProps as DropdownListSeparatorItemProps,
    ListSeparatorItemProps as SeparatorItemProps,
}
export {
    ListSeparatorItem,
    ListSeparatorItem as DropdownListSeparatorItem,
    ListSeparatorItem as SeparatorItem,
}



export type DropdownListCloseType = DropdownCloseType|number
export interface DropdownListActiveChangeEvent extends DropdownActiveChangeEvent {
    closeType : DropdownListCloseType
}
// export interface DropdownListAction<TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>
//     extends
//         // accessibilities:
//         DropdownAction<TDropdownListActiveChangeEvent>
// {
// }

export interface DropdownListComponentUiProps<TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>
    extends
        // accessibilities:
        DropdownComponentUiProps<TDropdownListActiveChangeEvent>
{
    /* no additional required props yet */
}
export interface DropdownListComponentProps<TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>
    extends
        // component ui:
        DropdownListComponentUiProps<TDropdownListActiveChangeEvent>
{
    // refs:
    listRef       ?: React.Ref<Element> // setter ref
    
    
    
    // components:
    listComponent ?: React.ReactComponentElement<any, ListProps<Element>>
    children      ?: ListProps<Element>['children']
}

export interface DropdownListProps<TElement extends Element = HTMLElement, TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>
    extends
        // bases:
        Omit<DropdownProps<TElement, TDropdownListActiveChangeEvent>,
            // refs:
            |'dropdownUIRef' // we replaced `dropdownUIRef` with `listRef`
            
            // children:
            |'children' // we redefined `children` prop as <ListItem>(s)
        >,
        
        // components:
        DropdownListComponentProps<TDropdownListActiveChangeEvent>
{
}
const DropdownList = <TElement extends Element = HTMLElement, TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>(props: DropdownListProps<TElement, TDropdownListActiveChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // components:
        listRef,
        listComponent,
        children: listItems,
    ...restDropdownProps} = props;
    
    
    
    // jsx:
    return (
        <Dropdown<TElement, TDropdownListActiveChangeEvent>
            // other props:
            {...restDropdownProps}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? calculateSemanticRole(props)}
        >
            <p>
                test
            </p>
        </Dropdown>
    );
};
export {
    DropdownList,
    DropdownList as default,
}

export type { OrientationName, OrientationVariant }
