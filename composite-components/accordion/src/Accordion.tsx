// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
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
    // utilities:
    isReusableUiComponent,
}                           from '@reusable-ui/utilities'       // common utility functions
import {
    // hooks:
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    usePropActive,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import {
    // hooks:
    DetermineCurrentPageProps,
    useDetermineCurrentPage,
}                           from '@reusable-ui/navigations'     // a set of navigation functions

// reusable-ui variants:
import {
    // hooks:
    OrientationableOptions,
    defaultInlineOrientationableOptions,
    usesOrientationable,
}                           from '@reusable-ui/orientationable' // a capability of UI to rotate its layout
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI

// reusable-ui states:
import {
    // hooks:
    ifCollapsed,
    usesCollapsible,
    ExpandedChangeEvent,
    CollapsibleProps,
    useCollapsible,
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
    // defaults:
    defaultOrientationableOptions,
    
    
    
    // styles:
    usesCollapseLayout,
    usesCollapseStates,
    
    
    
    // react components:
    CollapseProps,
    Collapse,
}                           from '@reusable-ui/collapse'        // a base component



// defaults:
export { defaultOrientationableOptions };



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
            usesCollapseLayout(options2),
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
        CollapsibleProps<TExpandedChangeEvent>,
        
        // components:
        ListItemComponentProps<TElement>
{
    // accessibilities:
    label    ?: string
    
    
    
    // behaviors:
    lazy     ?: boolean
    
    
    
    // children:
    children ?: React.ReactNode
}
export const AccordionItem = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: AccordionItemProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // accessibilities:
        label,
        
        
        
        // behaviors:
        lazy     = false,
        
        
        
        // states:
        expanded : _expanded, // remove
        
        
        
        // components:
        listItemComponent = (<ListItem<TElement> /> as React.ReactComponentElement<any, ListItemProps<TElement>>),
    ...restListItemProps} = props;
    type T1 = typeof restListItemProps
    type T2 = Omit<T1, keyof ListItemProps>
    
    
    
    // fn props:
    const propActive = usePropActive(props, null);
    const activeDn   = useDetermineCurrentPage(props);
    const activeFn   = (listItemComponent.props.active ?? propActive) /*controllable*/ ?? activeDn /*uncontrollable*/;
    
    
    
    // jsx:
    /* <ListItem> */
    return React.cloneElement<ListItemProps<TElement>>(listItemComponent,
        // props:
        {
            // other props:
            ...restListItemProps,
            
            
            
            // semantics:
            'aria-current' : (activeFn || undefined) && (listItemComponent.props['aria-current'] ?? props['aria-current'] ?? 'page'),
            'aria-label'   : listItemComponent.props['aria-label'] ?? label,
            
            
            
            // states:
            active         : activeFn,
        },
        
        
        
        // children:
        listItemComponent.props.children ?? props.children,
    );
};

export {
    ListSeparatorItemProps,
    ListSeparatorItem,
}



export interface AccordionProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        ListProps<TElement>,
        
        // components:
        Omit<ListComponentProps<TElement>,
            // children:
            |'listItems' // we redefined `children` prop as <ListItem>(s)
        >
{
    // accessibilities:
    label ?: string
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
    
    
    
    // jsx:
    /* <List> */
    return React.cloneElement<ListProps<TElement>>(listComponent,
        // props:
        {
            // other props:
            ...restListProps,
            
            
            
            // semantics:
            'aria-label' : listComponent.props['aria-label'] ?? label,
            
            
            
            // behaviors:
            actionCtrl   : listComponent.props.actionCtrl    ?? props.actionCtrl   ?? true,
        },
        
        
        
        // children:
        listComponent.props.children ?? props.children,
    );
};
export {
    Accordion,
    Accordion as default,
}

export type { ListStyle, ListVariant }
