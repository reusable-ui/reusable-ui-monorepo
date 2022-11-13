// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useMemo,
}                           from 'react'

// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssKnownProps,
    CssRule,
    
    
    
    // writes css in javascript:
    rule,
    variants,
    children,
    style,
    vars,
    imports,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a spacer (gap) management system:
    spacers,
    
    
    
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
    // styles:
    usesBackdropLayout,
    usesBackdropVariants,
    usesBackdropStates,
    
    
    
    // configs:
    modals,
    
    
    
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
    // react components:
    PopupProps,
    Popup,
    
    PopupComponentProps,
}                           from '@reusable-ui/popup'           // a base component
import {
    // styles:
    headerElm,
    footerElm,
    bodyElm,
    
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



// configs:
export const [modalCards, modalCardValues, cssModalCardConfig] = cssConfig(() => {
    return {
        // positions:
        horzAlign : 'center'                as CssKnownProps['justifyItems'],
        vertAlign : 'center'                as CssKnownProps['alignItems'  ],
        
        
        
        // spacings:
        cardCaptionGap : spacers.default    as CssKnownProps['gap'],
    };
}, { prefix: 'mdlcrd' });



// styles:
export const usesModalCardLayout = () => {
    return style({
        ...style({
            // layouts:
            display        : 'flex',
            flexDirection  : 'column',
            justifyContent : 'start',   // if <Popup> is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first item should be visible first
            alignItems     : 'center',  // center <Popup> horizontally
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // animations:
            // a fix to overwrite <Popup>'s filter:
            filter         : modals.modalUiFilter,
            
            
            
            // children:
            ...children('*', { // <Card>
                // children:
                ...children([headerElm, footerElm, bodyElm], {
                    // customize:
                    ...usesCssProps(usesPrefixedProps(modalCards, 'cardItem')), // apply config's cssProps starting with cardItem***
                }),
                ...children([headerElm, footerElm], {
                    // layouts:
                    display        : 'flex',
                    flexDirection  : 'row',
                    flexWrap       : 'nowrap',  // no wrapping
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(modalCards, 'cardCaption')), // apply config's cssProps starting with cardCaption***
                }),
                ...children(headerElm, {
                    justifyContent : 'space-between', // separates between items as far as possible
                    alignItems     : 'center',        // center <Control> vertically
                    
                    
                    
                    // children:
                    ...children(['button', '[role="button"]'], {
                        ...rule(':first-child:last-child', {
                            // spacings:
                            marginInlineStart : 'auto', // align to right
                        }),
                    }),
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(modalCards, 'cardHeader')), // apply config's cssProps starting with cardHeader***
                }),
                ...children(footerElm, {
                    justifyContent : 'end',     // if <Control> is not growable, the excess space (if any) placed at the beginning, and if no sufficient space available => the last item should be visible first
                    alignItems     : 'center',  // center <Control> vertically
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(modalCards, 'cardFooter')), // apply config's cssProps starting with cardFooter***
                }),
                ...children(bodyElm, {
                    // customize:
                    ...usesCssProps(usesPrefixedProps(modalCards, 'cardBody')), // apply config's cssProps starting with cardBody***
                }),
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(modalCards, 'card')), // apply config's cssProps starting with card***
            }),
            
            
            
            // customize:
            ...usesCssProps(usesPrefixedProps(modalCards, 'popup')), // apply config's cssProps starting with popup***
        }),
    });
};
export const usesModalCardVariants = () => {
    return style({
        ...variants([
            rule(':not(.scrollable)>&', {
                // sizes:
                flex          : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's height
                
                boxSizing     : 'content-box',    // the final size is excluding borders & paddings
                inlineSize    : 'max-content',    // forcing the <Card>'s width follows the <Card>'s items width
                blockSize     : 'max-content',    // forcing the <Card>'s height follows the <Card>'s items height
            }),
            rule('.scrollable>&', {
                // children:
                ...children(['&', '*'], { // <Popup> & <Card>
                    // sizes:
                    boxSizing     : 'border-box',     // the final size is including borders & paddings
                    inlineSize    : 'auto',           // follows the content's width, but
                    maxInlineSize : '100%',           // up to the maximum available parent's width
                    blockSize     : 'auto',           // follows the content's height, but
                    maxBlockSize  : '100%',           // up to the maximum available parent's height
                    overflow      : 'hidden',         // force the <Card> to scroll
                }),
            }),
        ]),
    });
};

export const useModalCardStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesModalCardLayout(),
        
        // variants:
        usesModalCardVariants(),
    ]),
}), { specificityWeight: 2, id: 'ifh5e9blw5' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesBackdropCardLayout = () => {
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
export const usesBackdropCardVariants = () => {
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
export const usesBackdropCardStates = () => {
    return style({
        ...imports([
            // states:
            usesBackdropStates(),
        ]),
    });
};

export const useBackdropCardStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesBackdropCardLayout(),
        
        // variants:
        usesBackdropCardVariants(),
        
        // states:
        usesBackdropCardStates(),
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
        
        
        
        // states:
        expanded,         // take, to be handled by <Modal>
        onExpandedChange, // take, to be handled by <Modal>
        
        
        
        // behaviors:
        lazy,
        
        
        
        // components:
        cardComponent    = (<Card<Element> /> as React.ReactComponentElement<any, CardProps<Element>>),
        children         : cardChildren,
        
        popupComponent   = (<Popup<Element, TModalExpandedChangeEvent> /> as React.ReactComponentElement<any, PopupProps<Element, TModalExpandedChangeEvent>>),
        
        modalRef,
        backdropStyle,
        modalViewport,
        modalComponent   = (<Modal<Element, TModalExpandedChangeEvent> >{cardComponent}</Modal> as React.ReactComponentElement<any, ModalProps<Element, TModalExpandedChangeEvent>>),
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
            
            
            
            // states:
            expanded         : modalComponent.props.expanded ?? expanded,
            onExpandedChange : handleExpandedChange,
            
            
            
            // behaviors:
            lazy             : modalComponent.props.lazy ?? lazy,
            
            
            
            // modals:
            modalViewport    : modalComponent.props.modalViewport ?? modalViewport,
            
            
            
            // handlers:
            onAnimationStart : handleAnimationStart,
            onAnimationEnd   : handleAnimationEnd,
        },
        
        
        
        // children:
        /* <Popup> */
        ((modalComponent.props.children !== cardComponent) ? modalComponent.props.children : React.cloneElement<PopupProps<Element, TModalExpandedChangeEvent>>(popupComponent,
            // props:
            {
                // semantics:
                semanticRole : popupComponent.props.semanticRole ?? '',
                
                
                
                // variants:
                nude         : popupComponent.props.nude ?? true,
                
                
                
                // classes:
                classes      : popupClasses,
                
                
                
                // states:
                expanded     : popupComponent.props.expanded ?? collapsibleState.expanded,
            },
            
            
            
            // children:
            /* <Card> */
            popupComponent.props.children ?? ((modalComponent.props.children !== cardComponent) ? modalComponent.props.children : React.cloneElement<CardProps<Element>>(cardComponent,
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
            )),
        )),
    );
};
export {
    ModalCard,
    ModalCard as default,
}

export type { CardStyle, CardVariant }
