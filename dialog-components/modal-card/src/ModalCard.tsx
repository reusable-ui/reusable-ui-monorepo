// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useMemo,
}                           from 'react'

// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'                 // cssfn general types
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    states,
    keyframes,
    
    
    
    //combinators:
    children,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // utilities:
    CssVars,
    cssVars,
}                           from '@cssfn/css-vars'              // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // hooks:
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    useMergeStyles,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui components:
import {
    // styles:
    usesBackdropLayout,
    usesBackdropVariants,
    usesBackdropStates,
    
    
    
    // react components:
    ModalExpandedChangeEvent,
    
    ModalProps,
    Modal,
    
    ModalComponentProps,
}                           from '@reusable-ui/modal'           // a base component
import {
    // styles:
    usesResponsiveContainerGridLayout,
}                           from '@reusable-ui/container'       // a base container UI of Reusable-UI components
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
const _defaultTabIndex   : number  = -1   // makes the <Card> programatically focusable



// hooks:

// features:

//#region modalCard
export interface ModalCardVars {
    /**
     * The horizontal alignment of the <Card>.
     */
    horzAlign : any
    /**
     * The vertical alignment of the <Card>.
     */
    vertAlign : any
}
const [modalCardVars] = cssVars<ModalCardVars>({ minify: false, prefix: 'modalCard' }); // do not minify to make sure `style={{ --modalCard-horzAlign: ... }}` is the same between in server



export interface ModalCardStuff { modalCardRule: Factory<CssRule>, modalCardVars: CssVars<ModalCardVars> }
export interface ModalCardConfig {
    horzAlign ?: CssKnownProps['justifyItems']
    vertAlign ?: CssKnownProps['alignItems'  ]
}
/**
 * Uses modalCard variables.
 * @param config  A configuration of `modalCardRule`.
 * @returns A `ModalCardStuff` represents the modalCard rules.
 */
export const usesModalCard = (config?: ModalCardConfig): ModalCardStuff => {
    return {
        modalCardRule: () => style({
            ...vars({
                // positions:
                [modalCardVars.horzAlign] : config?.horzAlign,
                [modalCardVars.vertAlign] : config?.vertAlign,
            }),
        }),
        modalCardVars,
    };
};
//#endregion modalCard



// styles:
export const usesCardBackdropLayout = () => {
    // dependencies:
    
    // features:
    const {modalCardRule, modalCardVars} = usesModalCard(modalCards);
    
    
    
    return style({
        ...imports([
            // layouts:
            usesBackdropLayout(),
            
            // features:
            modalCardRule,
        ]),
        ...style({
            // layouts:
         // display         : 'grid', // already defined in `usesResponsiveContainerGridLayout()`. We use a grid for the layout, so we can align the <Card> both horizontally & vertically
            
            
            
            // positions:
            justifyItems : modalCardVars.horzAlign,
            alignItems   : modalCardVars.vertAlign,
            
            
            
            // children:
            ...children('*', { // <CardDialog>
                // layouts:
                gridArea    : 'content',
            }),
            
            
            
            // customize:
            ...usesCssProps(modalCards), // apply config's cssProps
        }),
        ...imports([
            // layouts:
            usesResponsiveContainerGridLayout(), // applies responsive container functionality using css grid
        ]),
    });
};
export const usesCardBackdropVariants = () => {
    return style({
        ...imports([
            // variants:
            usesBackdropVariants(),
        ]),
        ...variants([
            rule(':not(.scrollable)', {
                // scrolls:
                // scroller at <ModalCard>'s layer
                overflow : 'auto', // enable horz & vert scrolling on <ModalBackdrop>
            }),
        ]),
    });
};
export const usesCardBackdropStates = () => {
    return style({
        ...imports([
            // states:
            usesBackdropStates(),
        ]),
    });
};

export const useCardBackdropStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesCardBackdropLayout(),
        
        // variants:
        usesCardBackdropVariants(),
        
        // states:
        usesCardBackdropStates(),
    ]),
}), { id: 'j3ol5k9hzm' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export type ModalCardStyle = 'scrollable' // might be added more styles in the future
export interface ModalCardVariant {
    modalCardStyle ?: ModalCardStyle
    
    horzAlign      ?: CssKnownProps['justifyItems']
    vertAlign      ?: CssKnownProps['alignItems'  ]
}
export const useModalCardVariant = ({ modalCardStyle, horzAlign, vertAlign }: ModalCardVariant) => {
    // dependencies:
    
    // features:
    const {modalCardVars} = usesModalCard();
    
    
    
    return {
        class : modalCardStyle ?? null,
        
        style : useMemo(() => ({
            [
                modalCardVars.horzAlign
                .slice(4, -1) // fix: var(--customProp) => --customProp
            ] : horzAlign,
            
            [
                modalCardVars.vertAlign
                .slice(4, -1) // fix: var(--customProp) => --customProp
            ] : vertAlign,
        }), [horzAlign, vertAlign]),
    };
};



// configs:
export const [modalCards, modalCardValues, cssModalCardConfig] = cssConfig(() => {
    return {
        // positions:
        horzAlign : 'center'    as CssKnownProps['justifyItems'],
        vertAlign : 'center'    as CssKnownProps['alignItems'  ],
    };
}, { prefix: 'mdlcrd' });



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
            // children:
            |'cardChildren' // we redefined `children` prop as <CardItem>(s)
        >,
        ModalComponentProps<Element, TModalExpandedChangeEvent>
{
}
const ModalCard = <TElement extends Element = HTMLElement, TModalExpandedChangeEvent extends ModalExpandedChangeEvent = ModalExpandedChangeEvent>(props: ModalCardProps<TElement, TModalExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet       = useCardBackdropStyleSheet();
    
    
    
    // variants:
    const modalCardVariant = useModalCardVariant(props);
    
    
    
    // rest props:
    const {
        // variants:
        modalCardStyle : _modalCardStyle, // remove
        horzAlign      : _horzAlign,      // remove
        vertAlign      : _vertAlign,      // remove
        
        
        
        // states:
        expanded,         // take, to be handled by <Modal>
        onExpandedChange, // take, to be handled by <Modal>
        
        
        
        // behaviors:
        lazy,
        
        
        
        // components:
        cardRef,
        cardOrientation,
        cardStyle,
        cardComponent    = (<Card<Element> /> as React.ReactComponentElement<any, CardProps<Element>>),
        children         : cardChildren,
        
        modalRef,
        backdropStyle,
        modalViewport,
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
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses` from `modalComponent`:
        modalComponent.props.variantClasses,
        
        
        
        // preserves the original `variantClasses` from `props`:
        props.variantClasses,
        
        
        
        // variants:
        modalCardVariant.class,
    );
    
    
    
    // styles:
    const mergedStyle    = useMergeStyles(
        // variants:
        modalCardVariant.style,
        
        
        
        // preserves the original `style` from `props`:
        props.style,
        
        
        
        // preserves the original `style` from `modalComponent` (can overwrite the `style`):
        modalComponent.props.style,
    );
    
    
    
    // handlers:
    const handleExpandedChange  = useMergeEvents(
        // preserves the original `onExpandedChange` from `modalComponent`:
        modalComponent.props.onExpandedChange,
        
        
        
        // actions:
        onExpandedChange,
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
            
            
            
            // states:
            expanded         : modalComponent.props.expanded ?? expanded,
            onExpandedChange : handleExpandedChange,
            
            
            
            // behaviors:
            lazy             : modalComponent.props.lazy ?? lazy,
            
            
            
            // modals:
            modalViewport    : modalComponent.props.modalViewport ?? modalViewport,
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
            cardComponent.props.children ?? cardChildren,
        )),
    );
};
export {
    ModalCard,
    ModalCard as default,
}

export type { CardStyle, CardVariant }
