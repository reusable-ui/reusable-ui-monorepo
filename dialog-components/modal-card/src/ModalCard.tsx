// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    useMergeStyles,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility
    useCollapsible,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    ModalExpandedChangeEvent,
    
    ModalProps,
    Modal,
    
    ModalComponentProps,
}                           from '@reusable-ui/modal'           // a base component
import {
    // react components:
    PopupProps,
    Popup,
    
    PopupComponentProps,
}                           from '@reusable-ui/popup'           // a base component
import {
    // variants:
    CardStyle,
    CardVariant,
    
    
    
    // react components:
    CardProps,
    Card,
    
    CardComponentProps,
}                           from '@reusable-ui/card'            // a flexible and extensible content container, with optional header and footer

// internals:
import {
    // variants:
    ModalCardVariant,
    useModalCardVariant,
}                           from './variants/ModalCardVariant.js'



// defaults:
const _defaultTabIndex : number = -1 // makes the <Card> programatically focusable



// styles:
export const useModalCardStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/modalCardStyles.js')
, { specificityWeight: 2, id: 'ifh5e9blw5' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names

export const useBackdropCardStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/backdropCardStyles.js')
, { id: 'j3ol5k9hzm' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export { ModalExpandedChangeEvent }

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
        
        // variants:
        ModalCardVariant,
        
        // components:
        Omit<CardComponentProps<Element>,
            // we don't need these extra properties because the <ModalCard> is sub <Card>
            |'cardRef'
            |'cardOrientation'
            |'cardStyle'
            
            
            
            // children:
            |'cardChildren' // we redefined `children` prop as <CardItem>(s)
        >,
        PopupComponentProps<Element, TModalExpandedChangeEvent>,
        ModalComponentProps<Element, TModalExpandedChangeEvent>
{
}
const ModalCard = <TElement extends Element = HTMLElement, TModalExpandedChangeEvent extends ModalExpandedChangeEvent = ModalExpandedChangeEvent>(props: ModalCardProps<TElement, TModalExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet       = useBackdropCardStyleSheet();
    const popupStyleSheet  = useModalCardStyleSheet();
    
    
    
    // variants:
    const modalCardVariant = useModalCardVariant(props);
    
    
    
    // states:
    const collapsibleState = useCollapsible<TElement, TModalExpandedChangeEvent>(props);
    
    
    
    // rest props:
    const {
        // variants:
        modalCardStyle : _modalCardStyle, // remove
        horzAlign      : _horzAlign,      // remove
        vertAlign      : _vertAlign,      // remove
        
        
        
        // accessibilities:
        setFocus,
        restoreFocus,
        
        
        
        // behaviors:
        lazy,
        
        
        
        // states:
        expanded,         // take, to be handled by <Modal>
        onExpandedChange, // take, to be handled by <Modal>
        
        
        
        // components:
        cardComponent    = (<Card<Element> /> as React.ReactComponentElement<any, CardProps<Element>>),
        children         : cardChildren,
        
        popupComponent   = (<Popup<Element, TModalExpandedChangeEvent> /> as React.ReactComponentElement<any, PopupProps<Element, TModalExpandedChangeEvent>>),
        
        modalRef,
        backdropStyle,
        viewport,
        modalComponent   = (<Modal<Element, TModalExpandedChangeEvent> >{cardComponent}</Modal> as React.ReactComponentElement<any, ModalProps<Element, TModalExpandedChangeEvent>>),
        
        
        
        // handlers:
        onFullyExpanded,
        onFullyCollapsed,
    ...restCardProps} = props;
    
    
    
    // refs:
    const mergedModalRef = useMergeRefs(
        // preserves the original `outerRef` from `modalComponent`:
        modalComponent.props.outerRef,
        
        
        
        // preserves the original `modalRef` from `props`:
        modalRef,
        // preserves the original `outerRef` from `props`:
        props.outerRef,
    );
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses` from `modalComponent`:
        modalComponent.props.variantClasses,
        
        
        
        // preserves the original `variantClasses` from `props`:
        props.variantClasses,
        
        
        
        // variants:
        modalCardVariant.class,
    );
    const popupClasses    = useMergeClasses(
        // preserves the original `classes` from `popupComponent`:
        popupComponent.props.classes,
        
        
        
        // styles:
        popupStyleSheet.main,
    );
    
    
    
    // styles:
    const mergedStyle    = useMergeStyles(
        // variants:
        modalCardVariant.style,
        
        
        
        // preserves the original `style` from `props` (can overwrite the `modalCardVariant.style`):
        props.style,
        
        
        
        // preserves the original `style` from `modalComponent` (can overwrite the `style` and/or the `modalCardVariant.style`):
        modalComponent.props.style,
    );
    
    
    
    // handlers:
    const handleExpandedChange = useMergeEvents(
        // preserves the original `onExpandedChange` from `modalComponent`:
        modalComponent.props.onExpandedChange,
        
        
        
        // actions:
        onExpandedChange,
    );
    const handleAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart` from `modalComponent`:
        modalComponent.props.onAnimationStart,
        
        
        
        // preserves the original `onAnimationStart` from `props`:
        props.onAnimationStart,
        
        
        
        // states:
        collapsibleState.handleAnimationStart,
    );
    const handleAnimationEnd   = useMergeEvents(
        // preserves the original `onAnimationEnd` from `modalComponent`:
        modalComponent.props.onAnimationEnd,
        
        
        
        // preserves the original `onAnimationEnd` from `props`:
        props.onAnimationEnd,
        
        
        
        // states:
        collapsibleState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    /* <Modal> */
    return React.cloneElement<ModalProps<Element, TModalExpandedChangeEvent>>(modalComponent,
        // props:
        {
            // refs:
            outerRef         : mergedModalRef,
            
            
            
            // variants:
            backdropStyle    : modalComponent.props.backdropStyle ?? backdropStyle,
            
            
            
            // classes:
            mainClass        : modalComponent.props.mainClass ?? props.mainClass ?? styleSheet.main,
            variantClasses,
            
            
            
            // styles:
            style            : mergedStyle,
            
            
            
            // accessibilities:
            setFocus         : modalComponent.props.setFocus     ?? setFocus,
            restoreFocus     : modalComponent.props.restoreFocus ?? restoreFocus,
            
            
            
            // behaviors:
            lazy             : modalComponent.props.lazy ?? lazy,
            
            
            
            // states:
            expanded         : modalComponent.props.expanded ?? expanded,
            onExpandedChange : handleExpandedChange,
            
            
            
            // stackable:
            viewport         : modalComponent.props.viewport ?? viewport,
            
            
            
            // handlers:
            onAnimationStart : handleAnimationStart,
            onAnimationEnd   : handleAnimationEnd,
            
            onFullyExpanded  : onFullyExpanded,
            onFullyCollapsed : onFullyCollapsed,
        },
        
        
        
        // children:
        /* <Popup> */
        ((modalComponent.props.children !== cardComponent) ? modalComponent.props.children : React.cloneElement<PopupProps<Element, TModalExpandedChangeEvent>>(popupComponent,
            // props:
            {
                // semantics:
                semanticTag  : popupComponent.props.semanticTag  ?? '', // no corresponding semantic tag  => defaults to <div>
                semanticRole : popupComponent.props.semanticRole ?? '', // no corresponding semantic role => defaults to presentation/none
                
                
                
                // variants:
                nude         : popupComponent.props.nude ?? true,
                
                
                
                // classes:
                classes      : popupClasses,
                
                
                
                // states:
                expanded     : popupComponent.props.expanded ?? collapsibleState.expanded,
            },
            
            
            
            // children:
            /* <Card> */
            popupComponent.props.children ?? React.cloneElement<CardProps<Element>>(cardComponent,
                // props:
                {
                    // other props:
                    ...restCardProps,
                    ...cardComponent.props, // overwrites restCardProps (if any conflics)
                    
                    
                    
                    // accessibilities:
                    tabIndex    : cardComponent.props.tabIndex    ?? _defaultTabIndex,
                },
                
                
                
                // children:
                cardComponent.props.children ?? cardChildren,
            ),
        )),
    );
};
export {
    ModalCard,
    ModalCard as default,
}

export type { CardStyle, CardVariant }
