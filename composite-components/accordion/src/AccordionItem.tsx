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
    useMergeRefs,
    useMergeClasses,
    useMergeStyles,
    
    
    
    // basic variants of UI:
    useBasicVariantProps,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
    useCollapsible,
    useLastKnownExpandedSize,
    ControllableCollapsibleProps,
    UncontrollableCollapsibleProps,
    useUncontrollableCollapsible,
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
        ControllableCollapsibleProps<TExpandedChangeEvent>,
        UncontrollableCollapsibleProps<TExpandedChangeEvent>,
        
        // components:
        ListItemComponentProps<TElement>
{
    // accessibilities:
    label         ?: React.ReactNode
    
    
    
    // behaviors:
    lazy          ?: boolean
    
    
    
    // components:
    bodyComponent ?: ListItemComponentProps<TElement>['listItemComponent']
    
    
    
    // children:
    children      ?: React.ReactNode
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
        defaultExpanded,  // take, to be handled by `useUncontrollableCollapsible`
        expanded,         // take, to be handled by `useUncontrollableCollapsible`
        onExpandedChange, // take, to be handled by `useUncontrollableCollapsible`
        
        
        
        // components:
        listItemComponent = (<ListItem<TElement> /> as React.ReactComponentElement<any, ListItemProps<TElement>>),
        bodyComponent     = (<ListItem<TElement> /> as React.ReactComponentElement<any, ListItemProps<TElement>>),
        
        
        
        // behaviors:
        actionCtrl        = listItemComponent.props.actionCtrl ?? _defaultItemActionCtrl,
        
        
        
        // children:
        children,
    ...restListItemProps} = props;
    
    
    
    // identifiers:
    const defaultId      = useId();
    const collapsibleId  = bodyComponent.props.id ?? defaultId;
    const controllableId = listItemComponent.props['aria-controls'] ?? props['aria-controls'] ?? collapsibleId;
    
    
    
    // states:
    const [isExpanded, , toggleExpanded] = useUncontrollableCollapsible<TExpandedChangeEvent>({
        defaultExpanded,
        expanded,
        onExpandedChange,
    });
    
    const collapsibleState               = useCollapsible<TElement, TExpandedChangeEvent>({ expanded: isExpanded });
    const isVisible                      = collapsibleState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    const lastKnownExpandedSize          = useLastKnownExpandedSize<TElement>(collapsibleState);
    
    
    
    // refs:
    const mergedBodyOuterRef = useMergeRefs<TElement>(
        // preserves the original `outerRef` from `bodyComponent`:
        bodyComponent.props.outerRef,
        
        
        
        lastKnownExpandedSize.setRef,
    );
    
    
    
    // classes:
    const listItemClasses    = useMergeClasses(
        // preserves the original `classes` from `listItemComponent`:
        listItemComponent.props.classes,
        
        
        
        // preserves the original `classes` from `props`:
        props.classes,
        
        
        
        // hacks:
        ((!isExpanded || null) && 'last-visible-child'),
    );
    const bodyStateClasses   = useMergeClasses(
        // preserves the original `stateClasses` from `bodyComponent`:
        bodyComponent.props.stateClasses,
        
        
        
        // states:
        collapsibleState.class,
    );
    
    
    
    // styles:
    const mergedBodyStyle    = useMergeStyles(
        // styles:
        lastKnownExpandedSize.style,
        
        
        
        // preserves the original `style` from `bodyComponent` (can overwrite the `lastKnownExpandedSize.style`):
        bodyComponent.props.style,
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
    
    const handleBodyAnimationStart    = useMergeEvents(
        // preserves the original `onAnimationStart` from `bodyComponent`:
        bodyComponent.props.onAnimationStart,
        
        
        
        // states:
        collapsibleState.handleAnimationStart,
    );
    const handleBodyAnimationEnd      = useMergeEvents(
        // preserves the original `onAnimationEnd` from `bodyComponent`:
        bodyComponent.props.onAnimationEnd,
        
        
        
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
                    'aria-controls' : controllableId,
                    'aria-expanded' : listItemComponent.props['aria-expanded'] ?? props['aria-expanded'] ?? (!!controllableId ? isExpanded : undefined),
                    
                    
                    
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
            {React.cloneElement<ListItemProps<TElement>>(bodyComponent,
                // props:
                {
                    // basic variant props:
                    ...basicVariantProps,
                    
                    
                    
                    // other props:
                    ...bodyComponent.props,
                    
                    
                    
                    // refs:
                    outerRef         : mergedBodyOuterRef,
                    
                    
                    
                    // identifiers:
                    id               : collapsibleId,
                    
                    
                    
                    // accessibility props:
                    enabled          : bodyComponent.props.enabled         ?? enabled,
                    inheritEnabled   : bodyComponent.props.inheritEnabled  ?? inheritEnabled,
                    readOnly         : bodyComponent.props.readOnly        ?? readOnly,
                    inheritReadOnly  : bodyComponent.props.inheritReadOnly ?? inheritReadOnly,
                    active           : bodyComponent.props.active          ?? active,
                    inheritActive    : bodyComponent.props.inheritActive   ?? inheritActive,
                    
                    
                    
                    // classes:
                    mainClass        : bodyComponent.props.mainClass       ?? styleSheet.main,
                    stateClasses     : bodyStateClasses,
                    
                    
                    
                    // styles:
                    style            : mergedBodyStyle,
                    
                    
                    
                    // handlers:
                    onAnimationStart : handleBodyAnimationStart,
                    onAnimationEnd   : handleBodyAnimationEnd,
                },
                
                
                
                // children:
                bodyComponent.props.children ?? ((!lazy || isVisible) && children),
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
