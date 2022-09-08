import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemProps,
    AccordionProps,
    AccordionItemComponentProps,
} from '@reusable-ui/accordion'
import {
    ExpandedChangeEvent,
} from '@reusable-ui/collapsible'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'
import { useEvent, EventHandler, useMergeEvents } from '@reusable-ui/hooks';



interface ParagraphLoremProps {
    words? : number
}
const lorems = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem accusantium et ipsam, architecto cupiditate recusandae dolorem itaque tempore expedita commodi eos doloremque molestias. Impedit doloribus maxime rem, iste quia consequuntur?'.split(' ');
const ParagraphLorem = ({ words }: ParagraphLoremProps) => (
    <p>
        { (words ? lorems.slice(0, words) : lorems).join(' ') }
    </p>
);



export interface ExclusiveExpandedChangeEvent extends ExpandedChangeEvent {
    // positions:
    listIndex : number
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
    // const handleExpandedChangeInternal = onExpandedChange;
    const handleExpandedChangeByAccordionItem = useEvent<EventHandler<ExpandedChangeEvent>>((event) => {
        // <AccordionItem> expanded/collapsed => request to show/hide the <ExclusiveAccordionItem> with `listIndex`:
        onExpandedChange?.({ ...event, listIndex: listIndex } as TExclusiveExpandedChangeEvent);
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



export const useExclusiveAccordionState = <TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>() => {
    // states:
    const [expandedListIndex, setExpandedListIndex] = useState<number|null>(null);
    
    
    
    // handlers:
    const handleExpandedChange = useEvent<EventHandler<TExclusiveExpandedChangeEvent>>((event) => {
        // actions:
        setExpandedListIndex(event.expanded ? event.listIndex : null);
        console.log(event);
    });
    
    
    
    return {
        // states:
        expandedListIndex,
        handleExpandedChange,
    };
};



export interface ExclusiveAccordionProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        AccordionProps<TElement>
{
}
export const ExclusiveAccordion = <TElement extends Element = HTMLElement, TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>(props: ExclusiveAccordionProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // children:
        children,
    ...restAccordionProps} = props;
    
    
    
    const exclusiveAccordionState = useExclusiveAccordionState();
    
    
    
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
                        expanded={accordionItem.props.expanded ?? (exclusiveAccordionState.expandedListIndex === listIndex)}
                        onExpandedChange={exclusiveAccordionState.handleExpandedChange}
                        
                        
                        
                        // components:
                        accordionItemComponent={
                            // clone accordionItem element with blank props:
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



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    
    
    return (
        <>
            <HeadPortal>
                <Styles />
            </HeadPortal>
            <div className="App">
                <article className='actions'>
                    <button onClick={handleTriggerRerender}>
                        Trigger re-render whole app
                    </button>
                </article>
                
                <br />
                
                <Accordion theme='primary'>
                    <AccordionItem key={0} expanded={undefined} onExpandedChange={undefined} label='A first item'>
                        <p>The detail of first item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </AccordionItem>
                    <AccordionItem key={1} label='A second item' className='fluid'>
                        <p>The detail of second item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </AccordionItem>
                    <AccordionItem key={2} label='A third item' theme='success'>
                        <p>The detail of third item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </AccordionItem>
                    <AccordionItem key={3} label='A fourth item' defaultExpanded={true}>
                        <p>The detail of fourth item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </AccordionItem>
                    <AccordionItem key={4} label='A fifth item' theme='danger'>
                        <p>The detail of fifth item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </AccordionItem>
                </Accordion>
                
                <br />
                
                <ExclusiveAccordion theme='primary'>
                    <AccordionItem key={0} expanded={undefined} onExpandedChange={undefined} label='A first item'>
                        <p>The detail of first item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </AccordionItem>
                    <AccordionItem key={1} label='A second item' className='fluid'>
                        <p>The detail of second item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </AccordionItem>
                    <AccordionItem key={2} label='A third item' theme='success'>
                        <p>The detail of third item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </AccordionItem>
                    <AccordionItem key={3} label='A fourth item' defaultExpanded={true}>
                        <p>The detail of fourth item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </AccordionItem>
                    <AccordionItem key={4} label='A fifth item' theme='danger'>
                        <p>The detail of fifth item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </AccordionItem>
                </ExclusiveAccordion>
            </div>
        </>
    );
}

export default App;
