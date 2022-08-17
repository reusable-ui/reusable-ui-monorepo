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
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    
    
    
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

// reusable-ui configs:
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'         // a spacer (gap) management system

// reusable-ui utilities:
import {
    // hooks:
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    useMergeStyles,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui states:
import {
    useCollapsible,
}                           from '@reusable-ui/collapsible'     // a capability of UI to expand/reduce its size or toggle the visibility

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

//#region modalSide
export interface ModalSideVars {
    /**
     * The horizontal alignment of the <Card>.
     */
    horzAlign : any
    /**
     * The vertical alignment of the <Card>.
     */
    vertAlign : any
}
const [modalSideVars] = cssVars<ModalSideVars>({ minify: false, prefix: 'modalSide' }); // do not minify to make sure `style={{ --modalSide-horzAlign: ... }}` is the same between in server



export interface ModalSideStuff { modalSideRule: Factory<CssRule>, modalSideVars: CssVars<ModalSideVars> }
export interface ModalSideConfig {
    horzAlign ?: CssKnownProps['justifyItems']
    vertAlign ?: CssKnownProps['alignItems'  ]
}
/**
 * Uses modalSide variables.
 * @param config  A configuration of `modalSideRule`.
 * @returns A `ModalSideStuff` represents the modalSide rules.
 */
export const usesModalSide = (config?: ModalSideConfig): ModalSideStuff => {
    return {
        modalSideRule: () => style({
            ...vars({
                // positions:
                [modalSideVars.horzAlign] : config?.horzAlign,
                [modalSideVars.vertAlign] : config?.vertAlign,
            }),
        }),
        modalSideVars,
    };
};
//#endregion modalSide



// styles:
export const usesModalSideLayout = () => {
    return style({
        ...style({
            // layouts:
            display        : 'flex',
            flexDirection  : 'column',
            justifyContent : 'start',   // if <Popup> is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first item should be visible first
            alignItems     : 'center',  // center <Popup> horizontally
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // children:
            ...children('*', { // <Card>
                // children:
                ...children([headerElm, footerElm, bodyElm], {
                    // customize:
                    ...usesCssProps(usesPrefixedProps(modalSides, 'cardItem')), // apply config's cssProps starting with cardItem***
                }),
                ...children([headerElm, footerElm], {
                    // layouts:
                    display        : 'flex',
                    flexDirection  : 'row',
                    flexWrap       : 'nowrap',  // no wrapping
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(modalSides, 'cardCaption')), // apply config's cssProps starting with cardCaption***
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
                    ...usesCssProps(usesPrefixedProps(modalSides, 'cardHeader')), // apply config's cssProps starting with cardHeader***
                }),
                ...children(footerElm, {
                    justifyContent : 'end',     // if <Control> is not growable, the excess space (if any) placed at the beginning, and if no sufficient space available => the last item should be visible first
                    alignItems     : 'center',  // center <Control> vertically
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(modalSides, 'cardFooter')), // apply config's cssProps starting with cardFooter***
                }),
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(modalSides, 'card')), // apply config's cssProps starting with card***
            }),
            
            
            
            // customize:
            ...usesCssProps(usesPrefixedProps(modalSides, 'popup')), // apply config's cssProps starting with popup***
        }),
    });
};
export const usesModalSideVariants = () => {
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
                // sizes:
                flex          : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height
                
                
                
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

export const useModalSideStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesModalSideLayout(),
        
        // variants:
        usesModalSideVariants(),
    ]),
}), { specificityWeight: 2, id: 'ifh5e9blw5' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesBackdropSideLayout = () => {
    // dependencies:
    
    // features:
    const {modalSideRule, modalSideVars} = usesModalSide(modalSides);
    
    
    
    return style({
        ...imports([
            // layouts:
            usesBackdropLayout(),
            
            // features:
            modalSideRule,
        ]),
        ...style({
            // layouts:
         // display         : 'grid', // already defined in `usesResponsiveContainerGridLayout()`. We use a grid for the layout, so we can align the <Card> both horizontally & vertically
            
            
            
            // positions:
            justifyItems : modalSideVars.horzAlign,
            alignItems   : modalSideVars.vertAlign,
            
            
            
            // children:
            ...children('*', { // <CardDialog>
                // layouts:
                gridArea    : 'content',
            }),
            
            
            
            // customize:
            ...usesCssProps(modalSides), // apply config's cssProps
        }),
        ...imports([
            // layouts:
            usesResponsiveContainerGridLayout(), // applies responsive container functionality using css grid
        ]),
    });
};
export const usesBackdropSideVariants = () => {
    return style({
        ...imports([
            // variants:
            usesBackdropVariants(),
        ]),
        ...variants([
            rule(':not(.scrollable)', {
                // scrolls:
                // scroller at <ModalSide>'s layer
                overflow : 'auto', // enable horz & vert scrolling on <ModalBackdrop>
            }),
        ]),
    });
};
export const usesBackdropSideStates = () => {
    return style({
        ...imports([
            // states:
            usesBackdropStates(),
        ]),
    });
};

export const useBackdropSideStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesBackdropSideLayout(),
        
        // variants:
        usesBackdropSideVariants(),
        
        // states:
        usesBackdropSideStates(),
    ]),
}), { id: 'j3ol5k9hzm' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export type ModalSideStyle = 'scrollable' // might be added more styles in the future
export interface ModalSideVariant {
    modalSideStyle ?: ModalSideStyle
    
    horzAlign      ?: CssKnownProps['justifyItems']
    vertAlign      ?: CssKnownProps['alignItems'  ]
}
export const useModalSideVariant = ({ modalSideStyle, horzAlign, vertAlign }: ModalSideVariant) => {
    // dependencies:
    
    // features:
    const {modalSideVars} = usesModalSide();
    
    
    
    return {
        class : modalSideStyle ?? null,
        
        style : useMemo(() => ({
            [
                modalSideVars.horzAlign
                .slice(4, -1) // fix: var(--customProp) => --customProp
            ] : horzAlign,
            
            [
                modalSideVars.vertAlign
                .slice(4, -1) // fix: var(--customProp) => --customProp
            ] : vertAlign,
        }), [horzAlign, vertAlign]),
    };
};



// configs:
export const [modalSides, modalSideValues, cssModalSideConfig] = cssConfig(() => {
    return {
        // positions:
        horzAlign : 'center'                as CssKnownProps['justifyItems'],
        vertAlign : 'center'                as CssKnownProps['alignItems'  ],
        
        
        
        // borders:
        // cardBoxShadow : [[0, 0, '10px', 'rgba(0,0,0,0.5)']] as CssKnownProps['boxShadow'], // doesn't work perfectly with borderRadius
        popupFilter: [
            ['drop-shadow(', 0, 0, '10px', 'rgba(0,0,0,0.5)', ')'],
        ]                                   as CssKnownProps['filter'],
        
        
        
        // spacings:
        cardCaptionGap : spacers.default    as CssKnownProps['gap'],
    };
}, { prefix: 'mdlcrd' });



// react components:
export { ModalExpandedChangeEvent }

export interface ModalSideProps<TElement extends Element = HTMLElement, TModalExpandedChangeEvent extends ModalExpandedChangeEvent = ModalExpandedChangeEvent>
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
        ModalSideVariant,
        
        // components:
        Omit<CardComponentProps<Element>,
            // children:
            |'cardChildren' // we redefined `children` prop as <CardItem>(s)
        >,
        PopupComponentProps<Element, TModalExpandedChangeEvent>,
        ModalComponentProps<Element, TModalExpandedChangeEvent>
{
}
const ModalSide = <TElement extends Element = HTMLElement, TModalExpandedChangeEvent extends ModalExpandedChangeEvent = ModalExpandedChangeEvent>(props: ModalSideProps<TElement, TModalExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet       = useBackdropSideStyleSheet();
    const popupStyleSheet  = useModalSideStyleSheet();
    
    
    
    // variants:
    const modalSideVariant = useModalSideVariant(props);
    
    
    
    // states:
    const collapsibleState = useCollapsible<TElement, TModalExpandedChangeEvent>(props);
    
    
    
    // rest props:
    const {
        // variants:
        modalSideStyle : _modalSideStyle, // remove
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
        
        popupComponent   = (<Popup<Element, TModalExpandedChangeEvent> /> as React.ReactComponentElement<any, PopupProps<Element, TModalExpandedChangeEvent>>),
        
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
        modalSideVariant.class,
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
        modalSideVariant.style,
        
        
        
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
    const handleAnimationEnd    = useMergeEvents(
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
            onAnimationEnd   : handleAnimationEnd,
        },
        
        
        
        // children:
        /* <Popup> */
        React.cloneElement<PopupProps<Element, TModalExpandedChangeEvent>>(popupComponent,
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
        ),
    );
};
export {
    ModalSide,
    ModalSide as default,
}

export type { CardStyle, CardVariant }
