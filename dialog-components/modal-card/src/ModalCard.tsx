// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
}                           from '@reusable-ui/hooks'           // react helper hooks
import type {
    // types:
    Role,
}                           from '@reusable-ui/semantics'       // a semantic management system for react web components
import {
    // utilities:
    setFocusFirst,
    setFocusLast,
    setFocusPrev,
    setFocusNext,
}                           from '@reusable-ui/focuses'         // focusing functions

// reusable-ui variants:
import {
    // hooks:
    useOrientationable,
}                           from '@reusable-ui/orientationable' // a capability of UI to rotate its layout

// reusable-ui components:
import {
    // react components:
    ModalActionType,
    ModalExpandedChangeEvent,
    
    ModalProps,
    Modal,
    
    ModalComponentProps,
}                           from '@reusable-ui/modal'           // a base component
import {
    // types:
    CardStyle,
    CardVariant,
    
    
    
    // hooks:
    defaultOrientationableOptions as cardDefaultOrientationableOptions,
    
    
    
    // react components:
    CardItemProps,
    CardItem,
    
    CardSeparatorItemProps,
    CardSeparatorItem,
    
    CardProps,
    Card,
    
    CardComponentProps,
}                           from '@reusable-ui/card'            // a flexible and extensible content container, with optional header and footer



// defaults:
const _defaultTabIndex   : number  = -1   // make the <Card> programatically focusable
const _defaultActionCtrl : boolean = true // the default for <CardItem>(s) is clickable



// utilities:
export const calculateSemanticRole = <TElement extends Element = HTMLElement>(props: CardProps<TElement>): Role|null => {
    if (props.role) return null; // pre defined role => no need to determine the role automatically
    
    
    
    const cardItems         = props.children;
    const defaultActionCtrl = props.actionCtrl ?? true;
    if (React.Children.toArray(cardItems).some((cardItem) => {
        if (!React.isValidElement<CardItemProps<Element>>(cardItem)) {
            return !defaultActionCtrl;                                // if the default is not an actionCtrl => not a menu item => role='dialog'
        }
        else {
            return !(cardItem.props.actionCtrl ?? defaultActionCtrl); // if <CardItem>  is not an actionCtrl => not a menu item => role='dialog'
        } // if
    })) return 'dialog'; // one/some <CardItem>s are [actionCtrl=false] => role='dialog'
    
    
    
    return 'menu'; // all <CardItem>s are [actionCtrl=true] => role='menu'
};



// react components:

// CardItem => ModalCardItem
export type {
    CardItemProps,
    CardItemProps as ModalCardItemProps,
    CardItemProps as ItemProps,
}
export {
    CardItem,
    CardItem as ModalCardItem,
    CardItem as Item,
}



// CardSeparatorItem => ModalCardSeparatorItem
export type {
    CardSeparatorItemProps,
    CardSeparatorItemProps as ModalCardSeparatorItemProps,
    CardSeparatorItemProps as SeparatorItemProps,
}
export {
    CardSeparatorItem,
    CardSeparatorItem as ModalCardSeparatorItem,
    CardSeparatorItem as SeparatorItem,
}



export type ModalCardActionType = ModalActionType|number
export interface ModalCardExpandedChangeEvent extends ModalExpandedChangeEvent {
    actionType : ModalCardActionType
}

export interface ModalCardProps<TElement extends Element = HTMLElement, TModalCardExpandedChangeEvent extends ModalCardExpandedChangeEvent = ModalCardExpandedChangeEvent>
    extends
        // bases:
        CardProps<TElement>,
        
        // modals:
        Omit<ModalProps<Element, TModalCardExpandedChangeEvent>,
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
        ModalComponentProps<Element, TModalCardExpandedChangeEvent>
{
}
const ModalCard = <TElement extends Element = HTMLElement, TModalCardExpandedChangeEvent extends ModalCardExpandedChangeEvent = ModalCardExpandedChangeEvent>(props: ModalCardProps<TElement, TModalCardExpandedChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // behaviors:
        lazy,
        
        
        
        // states:
        expanded,         // take, to be handled by <Modal>
        onExpandedChange, // take, to be handled by <Modal>
        
        
        
        // floatable:
        floatingOn,
        floatingPlacement,
        floatingMiddleware,
        floatingStrategy,
        
        floatingAutoFlip,
        floatingAutoShift,
        floatingOffset,
        floatingShift,
        
        onFloatingUpdate,
        
        
        
        // components:
        cardRef,
        cardOrientation,
        cardStyle,
        cardComponent         = (<Card<Element> /> as React.ReactComponentElement<any, CardProps<Element>>),
        children              : cardItems,
        
        modalRef,
        modalOrientation,
        modalComponent     = (<Modal<Element, TModalCardExpandedChangeEvent> >{cardComponent}</Modal> as React.ReactComponentElement<any, ModalProps<Element, TModalCardExpandedChangeEvent>>),
    ...restCardProps} = props;
    
    
    
    // variants:
    const cardOrientationableVariant = useOrientationable(props, cardDefaultOrientationableOptions);
    const cardIsOrientationBlock     = cardOrientationableVariant.isOrientationBlock;
    
    
    
    // refs:
    const mergedCardRef = useMergeRefs(
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
    
    
    
    // handlers:
    const handleKeyDownInternal = useEvent<React.KeyboardEventHandler<Element>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        if (((): boolean => {
            const isKeyOf = (key: string): boolean => {
                return ((event.key.toLowerCase() === key) || (event.code.toLowerCase() === key));
            };
            const isRtl = (getComputedStyle(event.currentTarget).direction === 'rtl');
            
            
            
                 if (                                     isKeyOf('tab'       )) setFocusNext(event.currentTarget);
            else if (                                     isKeyOf('pagedown'  )) setFocusNext(event.currentTarget);
            else if (                                     isKeyOf('pageup'    )) setFocusPrev(event.currentTarget);
            
            else if (                                     isKeyOf('home'      )) setFocusFirst(event.currentTarget);
            else if (                                     isKeyOf('end'       )) setFocusLast(event.currentTarget);
            
            else if ( cardIsOrientationBlock &&           isKeyOf('arrowdown' )) setFocusNext(event.currentTarget);
            else if ( cardIsOrientationBlock &&           isKeyOf('arrowup'   )) setFocusPrev(event.currentTarget);
            
            else if (!cardIsOrientationBlock && !isRtl && isKeyOf('arrowleft' )) setFocusNext(event.currentTarget);
            else if (!cardIsOrientationBlock && !isRtl && isKeyOf('arrowright')) setFocusPrev(event.currentTarget);
            
            else if (!cardIsOrientationBlock &&  isRtl && isKeyOf('arrowright')) setFocusNext(event.currentTarget);
            else if (!cardIsOrientationBlock &&  isRtl && isKeyOf('arrowleft' )) setFocusPrev(event.currentTarget);
            else return false; // not handled
            
            
            
            return true; // handled
        })()) {
            event.preventDefault(); // prevents the whole page from scrolling when the user press the [up],[down],[left],[right],[pg up],[pg down],[home],[end]
        } // if
    });
    const handleKeyDown         = useMergeEvents(
        // preserves the original `onKeyDown` from `cardComponent`:
        cardComponent.props.onKeyDown,
        
        
        
        // actions:
        handleKeyDownInternal,
    );
    
    
    
    // jsx:
    /* <Modal> */
    return React.cloneElement<ModalProps<Element, TModalCardExpandedChangeEvent>>(modalComponent,
        // props:
        {
            // refs:
            outerRef     : mergedModalRef,
            
            
            
            // semantics:
            semanticRole : modalComponent.props.semanticRole ?? props.semanticRole ?? calculateSemanticRole(props),
            
            
            
            // variants:
            orientation  : modalComponent.props.orientation ?? modalOrientation ?? props.orientation,
            
            
            
            // behaviors:
            lazy,
            
            
            
            // states:
            expanded,
            onExpandedChange,
            
            
            
            // floatable:
            floatingOn,
            floatingPlacement,
            floatingMiddleware,
            floatingStrategy,
            
            floatingAutoFlip,
            floatingAutoShift,
            floatingOffset,
            floatingShift,
            
            onFloatingUpdate,
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
                
                
                
                // behaviors:
                actionCtrl  : cardComponent.props.actionCtrl  ?? _defaultActionCtrl,
                
                
                
                // handlers:
                onKeyDown   : handleKeyDown,
            },
            
            
            
            // children:
            React.Children.map(cardComponent.props.children ?? cardItems, (cardItem, index) => {
                // conditions:
                if (!onExpandedChange)                                                                    return cardItem; // [onExpandedChange] was not set => ignore
                if (!React.isValidElement<CardItemProps<Element>>(cardItem))                              return cardItem; // not a <CardItem>               => ignore
                if (!(cardItem.props.actionCtrl ?? cardComponent.props.actionCtrl ?? _defaultActionCtrl)) return cardItem; // <CardItem actionCtrl={false}>  => ignore
                // if <Modal> or <Card> or <CardItem> is disabled => the <AccessibilityProvider> will take care for us
                
                
                
                // jsx:
                return (
                    <CardItemWithExpandedHandler<TModalCardExpandedChangeEvent>
                        // states:
                        onExpandedChange={onExpandedChange}
                        
                        
                        
                        // components:
                        cardIndex={index}
                        cardItemComponent={cardItem}
                    />
                );
            }),
        )),
    );
};
export {
    ModalCard,
    ModalCard as default,
}

export type { CardStyle, CardVariant }



interface CardItemWithExpandedHandlerProps<TModalCardExpandedChangeEvent extends ModalCardExpandedChangeEvent = ModalCardExpandedChangeEvent>
    extends
        // bases:
        CardItemProps<Element>,
        Required<Pick<ModalProps<Element, TModalCardExpandedChangeEvent>, 'onExpandedChange'>>
{
    // components:
    cardIndex         : number
    cardItemComponent : React.ReactElement<CardItemProps<Element>>
}
const CardItemWithExpandedHandler = <TModalCardExpandedChangeEvent extends ModalCardExpandedChangeEvent = ModalCardExpandedChangeEvent>(props: CardItemWithExpandedHandlerProps<TModalCardExpandedChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // states:
        onExpandedChange,
        
        
        
        // components:
        cardIndex,
        cardItemComponent,
    ...restCardItemProps} = props;
    
    
    
    // handlers:
    const handleExpandedChange = onExpandedChange;
    const handleClickInternal  = useEvent<React.MouseEventHandler<Element>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // a <CardItem> was clicked => close the <ModalCard>:
        handleExpandedChange({ expanded: false, actionType: cardIndex } as TModalCardExpandedChangeEvent);
        event.preventDefault(); // mark as handled
    });
    const handleClick         = useMergeEvents(
        // preserves the original `onClick` from `cardItemComponent`:
        cardItemComponent.props.onClick,
        
        
        
        // handlers:
        handleClickInternal,
    );
    
    
    
    // jsx:
    /* <CardItem> */
    return React.cloneElement<CardItemProps<Element>>(cardItemComponent,
        // props:
        {
            // other props:
            ...restCardItemProps,
            
            
            
            // handlers:
            onClick : handleClick,
        },
    );
};
