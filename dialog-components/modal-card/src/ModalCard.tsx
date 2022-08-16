// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    useMergeRefs,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui components:
import {
    // react components:
    ModalExpandedChangeEvent,
    
    ModalProps,
    Modal,
    
    ModalComponentProps,
}                           from '@reusable-ui/modal'           // a base component
import {
    // types:
    CardStyle,
    CardVariant,
    
    
    
    // react components:
    CardProps,
    Card,
    
    CardComponentProps,
}                           from '@reusable-ui/card'            // a flexible and extensible content container, with optional header and footer



// defaults:
const _defaultTabIndex   : number  = -1   // make the <Card> programatically focusable



// react components:
export interface ModalCardProps<TElement extends Element = HTMLElement, TModalExpandedChangeEvent extends ModalExpandedChangeEvent = ModalExpandedChangeEvent>
    extends
        // bases:
        CardProps<TElement>,
        
        // modals:
        Omit<ModalProps<Element, TModalExpandedChangeEvent>,
            // refs:
            |'elmRef'|'outerRef' // all (elm|outer)Ref are for <Card>
            
            // DOMs:
            |Exclude<keyof React.DOMAttributes<Element>, 'children'> // all DOM [attributes] are for <Card>
            
            // children:
            |'children' // we redefined `children` prop as <CardItem>(s)
        >,
        
        // components:
        Omit<CardComponentProps<Element>,
            // children:
            |'cardItems' // we redefined `children` prop as <CardItem>(s)
        >,
        ModalComponentProps<Element, TModalExpandedChangeEvent>
{
}
const ModalCard = <TElement extends Element = HTMLElement, TModalExpandedChangeEvent extends ModalExpandedChangeEvent = ModalExpandedChangeEvent>(props: ModalCardProps<TElement, TModalExpandedChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // behaviors:
        lazy,
        
        
        
        // states:
        expanded,         // take, to be handled by <Modal>
        onExpandedChange, // take, to be handled by <Modal>
        
        
        
        // components:
        cardRef,
        cardOrientation,
        cardStyle,
        cardComponent    = (<Card<Element> /> as React.ReactComponentElement<any, CardProps<Element>>),
        children         : cardItems,
        
        modalRef,
        modalComponent   = (<Modal<Element, TModalExpandedChangeEvent> >{cardComponent}</Modal> as React.ReactComponentElement<any, ModalProps<Element, TModalExpandedChangeEvent>>),
    ...restCardProps} = props;
    
    
    
    // refs:
    const mergedCardRef  = useMergeRefs(
        // preserves the original `elmRef` from `cardComponent`:
        cardComponent.props.elmRef,
        
        
        
        // preserves the original `cardRef` from `props`:
        cardRef,
    );
    const mergedModalRef = useMergeRefs(
        // preserves the original `outerRef` from `modalComponent`:
        modalComponent.props.outerRef,
        
        
        
        // preserves the original `modalRef` from `props`:
        modalRef,
        // preserves the original `outerRef` from `props`:
        props.outerRef,
    );
    
    
    
    // jsx:
    /* <Modal> */
    return React.cloneElement<ModalProps<Element, TModalExpandedChangeEvent>>(modalComponent,
        // props:
        {
            // refs:
            outerRef     : mergedModalRef,
            
            
            
            // behaviors:
            lazy,
            
            
            
            // states:
            expanded,
            onExpandedChange,
        },
        
        
        
        // children:
        /* <Card> */
        ((modalComponent.props.children !== cardComponent) ? modalComponent.props.children : React.cloneElement<CardProps<Element>>(cardComponent,
            // props:
            {
                // other props:
                ...restCardProps,
                
                
                
                // refs:
                elmRef      : mergedCardRef,
                
                
                
                // variants:
                orientation : cardComponent.props.orientation ?? cardOrientation,
                cardStyle   : cardComponent.props.cardStyle   ?? cardStyle,
                
                
                
                // accessibilities:
                tabIndex    : cardComponent.props.tabIndex    ?? _defaultTabIndex,
            },
            
            
            
            // children:
            cardComponent.props.children ?? cardItems,
        )),
    );
};
export {
    ModalCard,
    ModalCard as default,
}

export type { CardStyle, CardVariant }
