// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useMergeEvents,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // variants:
    ListStyleLimited,
    ListVariantLimited,
    
    
    
    // react components:
    AccordionItemProps,
    AccordionItem,
    
    ListSeparatorItemProps,
    ListSeparatorItem,
    
    AccordionProps,
    Accordion,
    
    AccordionComponentProps,
}                           from '@reusable-ui/accordion'       // represents a series of toggleable collapsing content

// internals:
import {
    // states:
    ExclusiveExpandedChangeEvent,
    ExclusiveAccordionStateProps,
    ExclusiveAccordionState,
    useExclusiveAccordionState,
}                           from './states/exclusiveAccordionState.js'
import {
    // react components:
    AccordionItemWithExclusivity,
}                           from './AccordionItemWithExclusivity.js'



// react components:

export {
    AccordionItemProps,
    AccordionItem,
    
    ListSeparatorItemProps,
    ListSeparatorItem,
}



export interface ExclusiveAccordionProps<TElement extends Element = HTMLElement, TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>
    extends
        // bases:
        AccordionProps<TElement>,
        
        // states:
        ExclusiveAccordionStateProps,
        Partial<Pick<ExclusiveAccordionState<TExclusiveExpandedChangeEvent>, 'expandedListIndex'>>,
        
        // components:
        AccordionComponentProps<TElement>
{
    // states:
    onExpandedChange ?: ExclusiveAccordionState<TExclusiveExpandedChangeEvent>['handleExpandedChange']
}
const ExclusiveAccordion = <TElement extends Element = HTMLElement, TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>(props: ExclusiveAccordionProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // states:
        defaultExpandedListIndex,
        expandedListIndex,
        onExpandedChange,
        
        
        
        // components:
        accordionComponent = (<Accordion<TElement> /> as React.ReactComponentElement<any, AccordionProps<TElement>>),
        
        
        
        // children:
        children,
    ...restAccordionProps} = props;
    
    
    
    const exclusiveAccordionState = useExclusiveAccordionState<TExclusiveExpandedChangeEvent>({
        defaultExpandedListIndex,
    });
    
    
    
    // fn props:
    const expandedListIndexFn : number = (
        expandedListIndex /*controllable*/
        ??
        exclusiveAccordionState.expandedListIndex /*uncontrollable*/
    );
    
    
    
    // handlers:
    const handleExpandedChange = useMergeEvents(
        // preserves the original `onExpandedChange`:
        onExpandedChange,
        
        
        
        // states:
        exclusiveAccordionState.handleExpandedChange,
    ) ?? exclusiveAccordionState.handleExpandedChange;
    
    
    
    // jsx:
    /* <Accordion> */
    return React.cloneElement<AccordionProps<TElement>>(accordionComponent,
        // props:
        {
            // other props:
            ...restAccordionProps,
        },
        
        
        
        // children:
        React.Children.map(children, (accordionItem, listIndex) => {
            // conditions:
            if (!React.isValidElement<AccordionItemProps<Element, ExpandedChangeEvent>>(accordionItem)) return accordionItem; // not an <AccordionItem> => ignore
            
            
            
            // rest props:
            const {
                // states:
                onExpandedChange : accordionItemOnExpandedChange, // sanitize the accordionItem's [onExpandedChange] prop (if exist), so it wouldn't collide with <AccordionItemWithExclusivity>'s [onExpandedChange] prop
            ...restAccordionItemProps} = accordionItem.props;
            
            
            
            // jsx:
            return (
                <AccordionItemWithExclusivity<Element, TExclusiveExpandedChangeEvent>
                    // other props:
                    {...restAccordionItemProps} // steals (almost) all accordionItem's props, so the <List> can recognize the <AccordionItemWithExclusivity> as <ListItem>
                    
                    
                    
                    // positions:
                    listIndex={listIndex}
                    
                    
                    
                    // states:
                    expanded={accordionItem.props.expanded ?? (expandedListIndexFn === listIndex)}
                    onExpandedChange={handleExpandedChange}
                    
                    
                    
                    // components:
                    accordionItemComponent={
                        // clone accordionItem element with (almost) blank props:
                        <accordionItem.type
                            // identifiers:
                            key={accordionItem.key}
                            
                            
                            
                            // states:
                            // restore the sanitized accordionItem's [onExpandedChange] prop (if exist):
                            {...(('onExpandedChange' in accordionItem.props) ? { onExpandedChange: accordionItemOnExpandedChange } : null)}
                        />
                    }
                />
            );
        }),
    );
};
export {
    ExclusiveAccordion,
    ExclusiveAccordion as default,
}

export type { ListStyleLimited, ListVariantLimited }
