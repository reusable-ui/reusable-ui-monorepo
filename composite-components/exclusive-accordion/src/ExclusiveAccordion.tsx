// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    EventHandler,
    useMergeEvents,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    AccordionItemProps,
    AccordionItem,
    
    ListSeparatorItemProps,
    ListSeparatorItem,
    
    ListStyleLimited,
    AccordionProps,
    Accordion,
    ListVariant,
    
    AccordionItemComponentProps,
}                           from '@reusable-ui/accordion'       // represents a series of toggleable collapsing content



// types:
export interface ExclusiveExpandedChangeEvent extends ExpandedChangeEvent {
    // positions:
    listIndex : number
}



// hooks:
export interface ExclusiveAccordionStateProps
{
    defaultExpandedListIndex ?: number|null
}
export interface ExclusiveAccordionState<TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>
{
    expandedListIndex    : number|null,
    handleExpandedChange : EventHandler<TExclusiveExpandedChangeEvent>
}
export const useExclusiveAccordionState = <TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>(props?: ExclusiveAccordionStateProps): ExclusiveAccordionState<TExclusiveExpandedChangeEvent> => {
    // states:
    const [expandedListIndex, setExpandedListIndex] = useState<number|null>(props?.defaultExpandedListIndex ?? null);
    
    
    
    // handlers:
    const handleExpandedChange = useEvent<EventHandler<TExclusiveExpandedChangeEvent>>((event) => {
        // actions:
        setExpandedListIndex(event.expanded ? event.listIndex : null);
    });
    
    
    
    return {
        // states:
        expandedListIndex,
        handleExpandedChange,
    };
};



// react components:

export {
    AccordionItemProps,
    AccordionItem,
    
    ListSeparatorItemProps,
    ListSeparatorItem,
}



export interface AccordionItemWithExclusivityProps<TElement extends Element = HTMLElement, TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>
    extends
        // bases:
        Omit<AccordionItemProps<TElement, TExclusiveExpandedChangeEvent>,
            |'expanded'          // change expanded prop as required
            |'onExpandedChange'  // change onExpandedChange prop as required
        >,
        
        // positions:
        Pick<TExclusiveExpandedChangeEvent, 'listIndex'>,
        
        // states:
        Required<Pick<AccordionItemProps<TElement, TExclusiveExpandedChangeEvent>,
            |'expanded'          // change expanded prop as required
            |'onExpandedChange'  // change onExpandedChange prop as required
        >>,
        
        // components:
        Required<AccordionItemComponentProps<TElement, ExpandedChangeEvent>>
{
}
export const AccordionItemWithExclusivity = <TElement extends Element = HTMLElement, TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>(props: AccordionItemWithExclusivityProps<TElement, TExclusiveExpandedChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // positions:
        listIndex,
        
        
        
        // states:
        expanded,
        onExpandedChange,
        
        
        
        // components:
        accordionItemComponent,
    ...restAccordionItemProps} = props;
    
    
    
    // handlers:
    const handleExpandedChangeByAccordionItem = useEvent<EventHandler<ExpandedChangeEvent>>((event) => {
        // <AccordionItem> expanded/collapsed => request to show/hide the <ExclusiveAccordionItem> with `listIndex`:
        onExpandedChange?.({ ...event, listIndex } as TExclusiveExpandedChangeEvent);
    });
    const handleExpandedChange                = useMergeEvents(
        // preserves the original `onExpandedChange` from `accordionItemComponent`:
        accordionItemComponent.props.onExpandedChange,
        
        
        
        // forwards the original `onExpandedChange` from `props`:
        handleExpandedChangeByAccordionItem,
    );
    
    
    
    // jsx:
    /* <AccordionItem> */
    return React.cloneElement<AccordionItemProps<TElement, ExpandedChangeEvent>>(accordionItemComponent,
        // props:
        {
            // other props:
            ...restAccordionItemProps,
            
            
            
            // states:
            expanded         : accordionItemComponent.props.expanded ?? expanded,
            
            
            
            // handlers:
            onExpandedChange : handleExpandedChange,
        },
    );
};



export interface ExclusiveAccordionProps<TElement extends Element = HTMLElement, TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>
    extends
        // bases:
        AccordionProps<TElement>,
        
        // states:
        ExclusiveAccordionStateProps,
        Partial<Pick<ExclusiveAccordionState<TExclusiveExpandedChangeEvent>, 'expandedListIndex'>>
{
    // states:
    onExpandedChange ?: ExclusiveAccordionState<TExclusiveExpandedChangeEvent>['handleExpandedChange']
}
const ExclusiveAccordion = <TElement extends Element = HTMLElement, TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>(props: ExclusiveAccordionProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // states:
        defaultExpandedListIndex = null,
        expandedListIndex,
        onExpandedChange,
        
        
        
        // children:
        children,
    ...restAccordionProps} = props;
    
    
    
    const exclusiveAccordionState = useExclusiveAccordionState<TExclusiveExpandedChangeEvent>({
        defaultExpandedListIndex,
    });
    
    
    
    // fn props:
    const expandedListIndexFn : number|null = (
        (expandedListIndex !== undefined)
        ?
        expandedListIndex /*controllable*/
        :
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
    return (
        <Accordion<TElement>
            // other props:
            {...restAccordionProps}
        >
            {React.Children.map(children, (accordionItem, listIndex) => {
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
            })}
        </Accordion>
    );
};
export {
    ExclusiveAccordion,
    ExclusiveAccordion as default,
}

export type { ListStyleLimited, ListVariant }
