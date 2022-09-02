// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useId,
}                           from 'react'

// cssfn:
import type {
    // types:
    SingleOrArray,
}                           from '@cssfn/types'                 // cssfn general types
import {
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    usePropActive,
}                           from '@reusable-ui/accessibilities' // an accessibility management system

// reusable-ui variants:
import {
    // hooks:
    OrientationableOptions,
    usesOrientationable,
}                           from '@reusable-ui/orientationable' // a capability of UI to rotate its layout
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI
import {
    // hooks:
    useBasicVariantProps,
}                           from '@reusable-ui/basic-variants'  // basic variants of UI

// reusable-ui states:
import {
    // hooks:
    ExpandedChangeEvent,
    useCollapsible,
    ToggleCollapsibleProps,
    useToggleCollapsible,
}                           from '@reusable-ui/collapsible'     // a capability of UI to expand/reduce its size or toggle the visibility

// reusable-ui components:
import {
    // defaults:
    defaultOrientationableOptions,
    
    
    
    // styles:
    usesListItemLayout,
    usesListItemVariants,
    usesListItemStates,
    ListStyle,
    ListVariant,
    
    
    
    // react components:
    ListItemProps,
    ListItem,
    
    ListSeparatorItemProps,
    ListSeparatorItem,
    
    ListProps,
    List,
    
    ListItemComponentProps,
    ListComponentProps,
}                           from '@reusable-ui/list'            // represents a series of content
import {
    // styles:
    usesCollapseLayout,
    usesCollapseStates,
}                           from '@reusable-ui/collapse'        // a base component



// defaults:
export { defaultOrientationableOptions };
const _defaultItemActionCtrl : boolean = true



// styles:

/*
    <AccordionItem> is a composite component made of
    <ListItem>
    and
    *modified* <Collapse>
*/

export const usesAccordionItemLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {orientationInlineSelector, orientationBlockSelector} = orientationableStuff;
    /*
        a hack with :not(_)
        the total selector combined with parent is something like this: `:not(.inline)>*>.listItem:not(_)`, the specificity weight = 2.1
        the specificity of 2.1 is a bit higher than:
        * `.list.content`               , the specificity weight = 2
        * `.someComponent.toggleButton` , the specificity weight = 2
        but can be easily overriden by specificity weight >= 3, like:
        * `.list.button.button`         , the specificity weight = 3
        * `.someComponent.boo.foo`      , the specificity weight = 3
    */
    const parentOrientationInlineSelector = `${orientationInlineSelector}>*>&:not(_)`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }>*>&:not(_)`;
    options = orientationableStuff;
    
    const orientationableStuff2 = usesOrientationable({
        orientationInlineSelector : parentOrientationInlineSelector,
        orientationBlockSelector  : parentOrientationBlockSelector,
    });
    const {ifOrientationInline, ifOrientationBlock} = orientationableStuff2;
    const options2 = orientationableStuff2;
    
    
    
    return style({
        ...imports([
            // layouts:
            usesCollapseLayout(options2), // `usesCollapseLayout` first then `usesListItemLayout`, so any conflict the `usesListItemLayout` wins
            usesListItemLayout(options), // the options are already handled internally by `usesListItemBaseLayout`
        ]),
        ...style({
            // customize:
            ...usesCssProps(accordions), // apply config's cssProps
            ...ifOrientationInline({ // inline
                // overwrites propName = propName{Inline}:
                ...overwriteProps(accordions, usesSuffixedProps(accordions, 'inline')),
            }),
            ...ifOrientationBlock({  // block
                // overwrites propName = propName{Block}:
                ...overwriteProps(accordions, usesSuffixedProps(accordions, 'block')),
            }),
        }),
    });
};
export const usesAccordionItemVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(accordions);
    
    
    
    return style({
        ...imports([
            // variants:
            usesListItemVariants(),
            resizableRule,
        ]),
    });
};
export const usesAccordionItemStates = () => {
    return style({
        ...imports([
            // states:
            usesListItemStates(),
            usesCollapseStates(),
        ]),
    });
};

export const useAccordionItemStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesAccordionItemLayout(),
        
        // variants:
        usesAccordionItemVariants(),
        
        // states:
        usesAccordionItemStates(),
    ]),
}), { id: '3mq5z5qt4v' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [accordions, accordionValues, cssAccordionConfig] = cssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'accr' });



// react components:
export interface AccordionItemProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        ListItemProps<TElement>,
        
        // states:
        ToggleCollapsibleProps<TExpandedChangeEvent>,
        
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
        actionCtrl = _defaultItemActionCtrl,
        lazy       = false,
        
        
        
        // states:
        defaultExpanded,  // take, to be handled by `useToggleCollapsible`
        expanded,         // take, to be handled by `useToggleCollapsible`
        onExpandedChange, // take, to be handled by `useToggleCollapsible`
        
        
        
        // components:
        listItemComponent = (<ListItem<TElement> /> as React.ReactComponentElement<any, ListItemProps<TElement>>),
        contentComponent  = (<ListItem<TElement> /> as React.ReactComponentElement<any, ListItemProps<TElement>>),
        
        
        
        // children:
        children,
    ...restListItemProps} = props;
    
    
    
    // identifiers:
    const defaultId     = useId();
    const collapsibleId = contentComponent.props.id ?? defaultId;
    
    
    
    // states:
    const [isExpanded, , toggleExpanded] = useToggleCollapsible({
        defaultExpanded,
        expanded,
        onExpandedChange,
    });
    
    const collapsibleState = useCollapsible<TElement, TExpandedChangeEvent>({ expanded: isExpanded });
    const isVisible        = collapsibleState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    
    
    
    // fn props:
    const propActive = usePropActive(props, null);
    const activeDn   = isExpanded;
    const activeFn   = (listItemComponent.props.active ?? propActive) /*controllable*/ ?? activeDn /*uncontrollable*/;
    
    
    
    // classes:
    const listClasses         = useMergeClasses(
        // preserves the original `classes` from `listItemComponent`:
        listItemComponent.props.classes,
        
        
        
        // preserves the original `classes` from `props`:
        props.classes,
        
        
        
        // hacks:
        ((!activeFn || null) && 'last-visible-child'),
    );
    const contentStateClasses = useMergeClasses(
        // preserves the original `stateClasses` from `listItemComponent`:
        listItemComponent.props.stateClasses,
        
        
        
        // preserves the original `stateClasses` from `props`:
        props.stateClasses,
        
        
        
        // states:
        collapsibleState.class,
    );
    
    
    
    // handlers:
    const listHandleClickInternal   = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // conditions:
        if (!actionCtrl)            return; // not [actionCtrl] => no response
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        toggleExpanded();       // handle click as toggle [expanded]
        event.preventDefault(); // handled
    });
    const listHandleClick           = useMergeEvents(
        // preserves the original `onClick` from `listItemComponent`:
        listItemComponent.props.onClick,
        
        
        
        // preserves the original `onClick` from `props`:
        props.onClick,
        
        
        
        // actions:
        listHandleClickInternal,
    );
    const contentHandleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd` from `listItemComponent`:
        listItemComponent.props.onAnimationEnd,
        
        
        
        // preserves the original `onAnimationEnd` from `props`:
        props.onAnimationEnd,
        
        
        
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
                    
                    
                    
                    // semantics:
                    semanticRole    : listItemComponent.props.semanticRole ?? 'heading',
                    
                    'aria-expanded' : (activeFn || undefined) && (listItemComponent.props['aria-expanded'] ?? props['aria-expanded'] ?? true), // ignore [aria-expanded] when (activeFn === false) and the default value of [aria-expanded] is true
                    'aria-controls' : listItemComponent.props['aria-controls'] ?? collapsibleId,
                    
                    
                    
                    // classes:
                    classes         : listClasses,
                    
                    
                    
                    // behaviors:
                    actionCtrl      : actionCtrl,
                    
                    
                    
                    // states:
                    active          : activeFn,
                    
                    
                    
                    // handlers:
                    onClick         : listHandleClick,
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
                    id              : collapsibleId,
                    
                    
                    
                    // accessibility props:
                    enabled         : contentComponent.props.enabled         ?? enabled,
                    inheritEnabled  : contentComponent.props.inheritEnabled  ?? inheritEnabled,
                    readOnly        : contentComponent.props.readOnly        ?? readOnly,
                    inheritReadOnly : contentComponent.props.inheritReadOnly ?? inheritReadOnly,
                    active          : contentComponent.props.active          ?? active,
                    inheritActive   : contentComponent.props.inheritActive   ?? inheritActive,
                    
                    
                    
                    // classes:
                    mainClass       : contentComponent.props.mainClass       ?? styleSheet.main,
                    stateClasses    : contentStateClasses,
                    
                    
                    
                    // handlers:
                    onAnimationEnd  : contentHandleAnimationEnd,
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



export type ListStyleLimited = Exclude<ListStyle, 'tab'|'bullet'> // 'tab' and 'bullet' are not supported in <Accordion>
export interface AccordionProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        Omit<ListProps<TElement>,
            // variants:
            |'listStyle' // we downgraded the [listStyle] options
        >,
        
        // components:
        Omit<ListComponentProps<TElement>,
            // children:
            |'listItems' // we redefined `children` prop as <ListItem>(s)
        >
{
    // variants:
    listStyle ?: SingleOrArray<ListStyleLimited>
    
    
    
    // accessibilities:
    label     ?: string
}
const Accordion = <TElement extends Element = HTMLElement>(props: AccordionProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // accessibilities:
        label,
        
        
        
        // components:
        listRef,
        listOrientation,
        listStyle,
        listComponent = (<List<TElement> /> as React.ReactComponentElement<any, ListProps<TElement>>),
    ...restListProps} = props;
    
    
    
    // refs:
    const mergedListRef = useMergeRefs(
        // preserves the original `elmRef` from `listComponent`:
        listComponent.props.elmRef,
        
        
        
        // preserves the original `listRef` from `props`:
        listRef,
    );
    
    
    
    // jsx:
    /* <List> */
    return React.cloneElement<ListProps<TElement>>(listComponent,
        // props:
        {
            // other props:
            ...restListProps,
            
            
            
            // refs:
            elmRef       : mergedListRef,
            
            
            
            // semantics:
            'aria-label' : listComponent.props['aria-label'] ?? label,
            
            
            
            // variants:
            orientation  : listComponent.props.orientation ?? listOrientation ?? props.orientation,
            listStyle    : listComponent.props.listStyle   ?? listStyle,
        },
        
        
        
        // children:
        listComponent.props.children ?? props.children,
    );
};
export {
    Accordion,
    Accordion as default,
}

export type { ListVariant }
