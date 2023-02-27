// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useId,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    useMergeEvents,
    useMergeClasses,
    
    
    
    // basic variants of UI:
    useBasicVariantProps,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
    useCollapsible,
    ToggleCollapsibleProps,
    useToggleCollapsible,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    ListItemProps,
    ListItem,
    
    ListSeparatorItemProps,
    ListSeparatorItem,
    
    ListItemComponentProps,
}                           from '@reusable-ui/list'            // represents a series of content



// defaults:
const _defaultItemActionCtrl : boolean = true



// styles:
export const useAccordionItemStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: '3mq5z5qt4v' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface AccordionItemProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        ListItemProps<TElement>,
        
        // states:
        ToggleCollapsibleProps<TExpandedChangeEvent>, // implements `onExpandedChange` & `defaultExpanded` (implements controllable & uncontrollable)
        
        // components:
        ListItemComponentProps<TElement>
{
    // accessibilities:
    label            ?: React.ReactNode
    
    
    
    // behaviors:
    lazy             ?: boolean
    
    
    
    // components:
    contentComponent ?: ListItemComponentProps<TElement>['listItemComponent']
    
    
    
    // children:
    children         ?: React.ReactNode
}
export const AccordionItem = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: AccordionItemProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet        = useAccordionItemStyleSheet();
    
    
    
    // basic variant props:
    const basicVariantProps = useBasicVariantProps(props);
    
    
    
    // accessibility props:
    const {
        enabled,
        inheritEnabled,
        readOnly,
        inheritReadOnly,
        active,
        inheritActive,
    } = props;
    
    
    
    // rest props:
    const {
        // accessibilities:
        label,
        
        
        
        // behaviors:
        lazy       = false,
        
        
        
        // states:
        defaultExpanded,  // take, to be handled by `useToggleCollapsible`
        expanded,         // take, to be handled by `useToggleCollapsible`
        onExpandedChange, // take, to be handled by `useToggleCollapsible`
        
        
        
        // components:
        listItemComponent = (<ListItem<TElement> /> as React.ReactComponentElement<any, ListItemProps<TElement>>),
        contentComponent  = (<ListItem<TElement> /> as React.ReactComponentElement<any, ListItemProps<TElement>>),
        
        
        
        // behaviors:
        actionCtrl        = listItemComponent.props.actionCtrl ?? _defaultItemActionCtrl,
        
        
        
        // children:
        children,
    ...restListItemProps} = props;
    
    
    
    // identifiers:
    const defaultId     = useId();
    const collapsibleId = contentComponent.props.id ?? defaultId;
    
    
    
    // states:
    const [isExpanded, , toggleExpanded] = useToggleCollapsible<TExpandedChangeEvent>({
        defaultExpanded,
        expanded,
        onExpandedChange,
    });
    
    const collapsibleState = useCollapsible<TElement, TExpandedChangeEvent>({ expanded: isExpanded });
    const isVisible        = collapsibleState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    
    
    
    // classes:
    const listItemClasses     = useMergeClasses(
        // preserves the original `classes` from `listItemComponent`:
        listItemComponent.props.classes,
        
        
        
        // preserves the original `classes` from `props`:
        props.classes,
        
        
        
        // hacks:
        ((!isExpanded || null) && 'last-visible-child'),
    );
    const contentStateClasses = useMergeClasses(
        // preserves the original `stateClasses` from `contentComponent`:
        contentComponent.props.stateClasses,
        
        
        
        // states:
        collapsibleState.class,
    );
    
    
    
    // handlers:
    const handleListItemClickInternal = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // conditions:
        if (!actionCtrl)            return; // not [actionCtrl] => no response
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        toggleExpanded();       // handle click as toggle [expanded]
        event.preventDefault(); // handled
    });
    const handleListItemClick         = useMergeEvents(
        // preserves the original `onClick` from `listItemComponent`:
        listItemComponent.props.onClick,
        
        
        
        // preserves the original `onClick` from `props`:
        props.onClick,
        
        
        
        // actions:
        handleListItemClickInternal,
    );
    
    const handleContentAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart` from `contentComponent`:
        contentComponent.props.onAnimationStart,
        
        
        
        // states:
        collapsibleState.handleAnimationStart,
    );
    const handleContentAnimationEnd   = useMergeEvents(
        // preserves the original `onAnimationEnd` from `contentComponent`:
        contentComponent.props.onAnimationEnd,
        
        
        
        // states:
        collapsibleState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    return (
        <>
            {/* <ListItem> */}
            {React.cloneElement<ListItemProps<TElement>>(listItemComponent,
                // props:
                {
                    // other props:
                    ...restListItemProps,
                    ...listItemComponent.props, // overwrites restListItemProps (if any conflics)
                    
                    
                    
                    // semantics:
                    'aria-expanded' : (isExpanded || undefined) && (listItemComponent.props['aria-expanded'] ?? props['aria-expanded'] ?? true), // ignore [aria-expanded] when (isExpanded === false) and the default value of [aria-expanded] is true
                    'aria-controls' : listItemComponent.props['aria-controls'] ?? collapsibleId,
                    
                    
                    
                    // classes:
                    classes         : listItemClasses,
                    
                    
                    
                    // behaviors:
                    actionCtrl      : actionCtrl,
                    
                    
                    
                    // states:
                    active          : listItemComponent.props.active ?? active ?? isExpanded,
                    
                    
                    
                    // handlers:
                    onClick         : handleListItemClick,
                },
                
                
                
                // children:
                listItemComponent.props.children ?? label,
            )}
            
            
            
            {/* collapsible <ListItem> */}
            {React.cloneElement<ListItemProps<TElement>>(contentComponent,
                // props:
                {
                    // basic variant props:
                    ...basicVariantProps,
                    
                    
                    
                    // other props:
                    ...contentComponent.props,
                    
                    
                    
                    // identifiers:
                    id               : collapsibleId,
                    
                    
                    
                    // accessibility props:
                    enabled          : contentComponent.props.enabled         ?? enabled,
                    inheritEnabled   : contentComponent.props.inheritEnabled  ?? inheritEnabled,
                    readOnly         : contentComponent.props.readOnly        ?? readOnly,
                    inheritReadOnly  : contentComponent.props.inheritReadOnly ?? inheritReadOnly,
                    active           : contentComponent.props.active          ?? active,
                    inheritActive    : contentComponent.props.inheritActive   ?? inheritActive,
                    
                    
                    
                    // classes:
                    mainClass        : contentComponent.props.mainClass       ?? styleSheet.main,
                    stateClasses     : contentStateClasses,
                    
                    
                    
                    // handlers:
                    onAnimationStart : handleContentAnimationStart,
                    onAnimationEnd   : handleContentAnimationEnd,
                },
                
                
                
                // children:
                contentComponent.props.children ?? ((!lazy || isVisible) && children),
            )}
        </>
    );
};

export {
    ListSeparatorItemProps,
    ListSeparatorItem,
}



export interface AccordionItemComponentProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
{
    // components:
    accordionItemComponent ?: React.ReactComponentElement<any, AccordionItemProps<TElement, TExpandedChangeEvent>>
}
