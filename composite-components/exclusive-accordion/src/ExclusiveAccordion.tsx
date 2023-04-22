// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui core:
import {
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
    
    
    
    // react components:
    ExclusiveAccordionStateProps,
    ExclusiveAccordionStateProvider,
}                           from './states/exclusiveAccordionState.js'
import {
    // react components:
    AccordionItemWithState,
}                           from './AccordionItemWithState.js'



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
        ExclusiveAccordionStateProps<TExclusiveExpandedChangeEvent>,
        
        // components:
        AccordionComponentProps<TElement>
{
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
    
    
    
    // jsx:
    return (
        <ExclusiveAccordionStateProvider<TExclusiveExpandedChangeEvent>
            // states:
            defaultExpandedListIndex={defaultExpandedListIndex}
            expandedListIndex={expandedListIndex}
            onExpandedChange={onExpandedChange}
        >
            {/* <Accordion> */}
            {React.cloneElement<AccordionProps<TElement>>(accordionComponent,
                // props:
                {
                    // other props:
                    ...restAccordionProps,
                },
                
                
                
                // children:
                React.Children.map(children, (accordionItem, listIndex) => {
                    // conditions:
                    if (!React.isValidElement<AccordionItemProps<Element, ExpandedChangeEvent>>(accordionItem)) return accordionItem; // not an <AccordionItem> => ignore
                    
                    
                    
                    // jsx:
                    const accordionItemProps = accordionItem.props;
                    return (
                        <AccordionItemWithState<Element, TExclusiveExpandedChangeEvent>
                            // other props:
                            {...accordionItemProps} // steals all accordionItem's props, so the <List> can recognize the <AccordionItemWithState> as <ListItem>
                            
                            
                            
                            // positions:
                            listIndex={listIndex}
                            
                            
                            
                            // components:
                            accordionItemComponent={
                                // clone accordionItem element with blank props:
                                <accordionItem.type
                                    // identifiers:
                                    key={accordionItem.key}
                                    
                                    
                                    
                                    //#region restore conflicting props
                                    {...{
                                        ...(('listIndex'              in accordionItemProps) ? { listIndex              : accordionItemProps.listIndex              } : undefined),
                                        ...(('accordionItemComponent' in accordionItemProps) ? { accordionItemComponent : accordionItemProps.accordionItemComponent } : undefined),
                                    }}
                                    //#endregion restore conflicting props
                                />
                            }
                        />
                    );
                }),
            )}
        </ExclusiveAccordionStateProvider>
    );
};
export {
    ExclusiveAccordion,
    ExclusiveAccordion as default,
}

export type { ListStyleLimited, ListVariantLimited }
