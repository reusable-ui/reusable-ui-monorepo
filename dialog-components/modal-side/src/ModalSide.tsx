// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    rule,
    variants,
    children,
    style,
    vars,
    imports,
    
    
    
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
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // groups a list of UIs into a single UI:
    usesGroupable,
    
    
    
    // a capability of UI to rotate its layout:
    usesOrientationable,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility
    useCollapsible,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

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
    // react components:
    CollapseProps,
    Collapse,
    
    CollapseComponentProps,
}                           from '@reusable-ui/collapse'        // a base component
import {
    // defaults:
    defaultOrientationableOptions as cardDefaultOrientationableOptions,
    
    
    
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



// configs:
export const [modalSides, modalSideValues, cssModalSideConfig] = cssConfig(() => {
    return {
        // spacings:
        cardCaptionGap : spacers.default    as CssKnownProps['gap'],
    };
}, { prefix: 'mdlsde' });



// styles:
export type ModalSideStyle = 'inlineStart'|'inlineEnd'|'blockStart'|'blockEnd' // might be added more styles in the future
export interface ModalSideVariant {
    modalSideStyle : ModalSideStyle // required prop
}
export const useModalSideVariant = ({ modalSideStyle }: ModalSideVariant) => {
    return {
        class : modalSideStyle,
    };
};



export const usesModalSideLayout = () => {
    const orientationableStuff = usesOrientationable(cardDefaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock} = orientationableStuff;
    
    
    
    return style({
        ...style({
            // layouts:
            display        : 'flex',
            flexDirection  : 'column',
            justifyContent : 'start',   // if <Collapse> is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first item should be visible first
            alignItems     : 'stretch', // stretch <Collapse> horizontally
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // children:
            ...children('*', { // <Collapse> & <Card>
                // sizes:
                boxSizing     : 'border-box',     // the final size is including borders & paddings
                inlineSize    : 'auto',           // follows the content's width, but
                maxInlineSize : '100%',           // up to the maximum available parent's width
                blockSize     : 'auto',           // follows the content's height, but
                maxBlockSize  : '100%',           // up to the maximum available parent's height
                overflow      : 'hidden',         // force the <Card> to scroll
            }),
            ...children('*', { // <Card>
                // layouts:
                // a fix for collapsing vertically, so the <CardBody> appears sliding:
                ...rule(':is(.inlineStart, .blockStart)>&', {
                    justifyContent : 'end', // if items are not growable, the excess space (if any) placed at the beginning, and if no sufficient space available => the last item should be visible first
                }),
                ...ifOrientationInline({...rule(':is(.inlineStart, .inlineEnd)>&', {
                    ...children(bodyElm, {
                        // sizes:
                        flex : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's height
                    }),
                })}),
                ...ifOrientationBlock({...rule(':is(.blockStart, .blockEnd)>&', {
                    ...children(bodyElm, {
                        // sizes:
                        flex : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's height
                    }),
                })}),
                
                
                
                // sizes:
                // maximum height of <Card> when side-left & side-right:
                flex          : [[1, 1, '100%']], // growable, shrinkable, initial from parent's height
                
                
                
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
                ...children(bodyElm, {
                    // customize:
                    ...usesCssProps(usesPrefixedProps(modalSides, 'cardBody')), // apply config's cssProps starting with cardBody***
                }),
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(modalSides, 'card')), // apply config's cssProps starting with card***
            }),
            
            
            
            // customize:
            ...usesCssProps(usesPrefixedProps(modalSides, 'collapse')), // apply config's cssProps starting with collapse***
        }),
    });
};
export const usesModalSideVariants = () => {
    // dependencies:
    
    // features:
    const {borderVars   } = usesBorder();
    
    // capabilities:
    const {groupableVars} = usesGroupable();
    
    
    
    return style({
        ...variants([
            rule('.inlineStart>&', {
                // children:
                ...children('*', { // <Card>
                    ...vars({
                        [groupableVars.borderWidth           ] : ['inherit', '!important'], // reads parent's prop
                        
                        [groupableVars.borderStartStartRadius] : 'inherit', // reads parent's prop
                        [groupableVars.borderEndStartRadius  ] : 'inherit', // reads parent's prop
                    }),
                    ...style({
                        // borders:
                        // fit rounded corners on left to <backdrop>:
                        [borderVars.borderStartStartRadius   ] : `calc(${groupableVars.borderStartStartRadius} - ${groupableVars.borderWidth} - min(${groupableVars.borderWidth}, 0.5px))`,
                        [borderVars.borderEndStartRadius     ] : `calc(${groupableVars.borderEndStartRadius  } - ${groupableVars.borderWidth} - min(${groupableVars.borderWidth}, 0.5px))`,
                    }),
                    
                    
                    
                    // hacks:
                    ...children(':nth-child(n)', {
                        ...vars({
                            // the <Card> already overflow: hidden
                            [groupableVars.borderWidth           ] : [borderVars.borderWidth, '!important'],
                            [borderVars.borderStartStartRadius   ] : ['0px', '!important'],
                            [borderVars.borderEndStartRadius     ] : ['0px', '!important'],
                        }),
                    }),
                }),
            }),
            rule('.inlineEnd>&', {
                // children:
                ...children('*', { // <Card>
                    ...vars({
                        [groupableVars.borderWidth           ] : ['inherit', '!important'], // reads parent's prop
                        
                        [groupableVars.borderStartEndRadius  ] : 'inherit', // reads parent's prop
                        [groupableVars.borderEndEndRadius    ] : 'inherit', // reads parent's prop
                    }),
                    ...style({
                        // borders:
                        // fit rounded corners on right to <backdrop>:
                        [borderVars.borderStartEndRadius     ] : `calc(${groupableVars.borderStartEndRadius  } - ${groupableVars.borderWidth} - min(${groupableVars.borderWidth}, 0.5px))`,
                        [borderVars.borderEndEndRadius       ] : `calc(${groupableVars.borderEndEndRadius    } - ${groupableVars.borderWidth} - min(${groupableVars.borderWidth}, 0.5px))`,
                    }),
                    
                    
                    
                    // hacks:
                    ...children(':nth-child(n)', {
                        ...vars({
                            // the <Card> already overflow: hidden
                            [groupableVars.borderWidth           ] : [borderVars.borderWidth, '!important'],
                            [borderVars.borderStartEndRadius     ] : ['0px', '!important'],
                            [borderVars.borderEndEndRadius       ] : ['0px', '!important'],
                        }),
                    }),
                }),
            }),
            rule('.blockStart>&', {
                // children:
                ...children('*', { // <Card>
                    ...vars({
                        [groupableVars.borderWidth           ] : ['inherit', '!important'], // reads parent's prop
                        
                        [groupableVars.borderStartStartRadius] : 'inherit', // reads parent's prop
                        [groupableVars.borderStartEndRadius  ] : 'inherit', // reads parent's prop
                    }),
                    ...style({
                        // borders:
                        // fit rounded corners on top to <backdrop>:
                        [borderVars.borderStartStartRadius   ] : `calc(${groupableVars.borderStartStartRadius} - ${groupableVars.borderWidth} - min(${groupableVars.borderWidth}, 0.5px))`,
                        [borderVars.borderStartEndRadius     ] : `calc(${groupableVars.borderStartEndRadius  } - ${groupableVars.borderWidth} - min(${groupableVars.borderWidth}, 0.5px))`,
                    }),
                    
                    
                    
                    // hacks:
                    ...children(':nth-child(n)', {
                        ...vars({
                            // the <Card> already overflow: hidden
                            [groupableVars.borderWidth           ] : [borderVars.borderWidth, '!important'],
                            [borderVars.borderStartStartRadius   ] : ['0px', '!important'],
                            [borderVars.borderStartEndRadius     ] : ['0px', '!important'],
                        }),
                    }),
                }),
            }),
            rule('.blockEnd>&', {
                // children:
                ...children('*', { // <Card>
                    ...vars({
                        [groupableVars.borderWidth           ] : ['inherit', '!important'], // reads parent's prop
                        
                        [groupableVars.borderEndStartRadius  ] : 'inherit', // reads parent's prop
                        [groupableVars.borderEndEndRadius    ] : 'inherit', // reads parent's prop
                    }),
                    ...style({
                        // borders:
                        // fit rounded corners on bottom to <backdrop>:
                        [borderVars.borderEndStartRadius     ] : `calc(${groupableVars.borderEndStartRadius  } - ${groupableVars.borderWidth} - min(${groupableVars.borderWidth}, 0.5px))`,
                        [borderVars.borderEndEndRadius       ] : `calc(${groupableVars.borderEndEndRadius    } - ${groupableVars.borderWidth} - min(${groupableVars.borderWidth}, 0.5px))`,
                    }),
                    
                    
                    
                    // hacks:
                    ...children(':nth-child(n)', {
                        ...vars({
                            // the <Card> already overflow: hidden
                            [groupableVars.borderWidth           ] : [borderVars.borderWidth, '!important'],
                            [borderVars.borderEndStartRadius     ] : ['0px', '!important'],
                            [borderVars.borderEndEndRadius       ] : ['0px', '!important'],
                        }),
                    }),
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
}), { specificityWeight: 2, id: 'qvp7n6e4ck' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesBackdropSideLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBackdropLayout(),
        ]),
        ...style({
            // layouts:
            display         : 'grid', // use a grid for the layout, so we can align the <Card> both horizontally & vertically
            
            
            
            // positions:
         // justifyItems : 'start',   // align left horizontally // already defined in variant `.(inline|block)(Start|End)`
         // alignItems   : 'stretch', // stretch    vertically   // already defined in variant `.(inline|block)(Start|End)`
            
            
            
            // customize:
            ...usesCssProps(modalSides), // apply config's cssProps
        }),
    });
};
export const usesBackdropSideVariants = () => {
    return style({
        ...imports([
            // variants:
            usesBackdropVariants(),
        ]),
        
        /* write more specific backdropStyle: */
        ...variants([
            rule('.blockStart', {
                // layouts:
                
                // child default sizes:
                justifyItems : 'stretch', // stretch   horizontally
                alignItems   : 'start',   // align top vertically
            }),
            rule('.blockEnd', {
                // layouts:
                
                // child default sizes:
                justifyItems : 'stretch', // stretch   horizontally
                alignItems   : 'end',     // align top vertically
            }),
            rule('.inlineStart', {
                // layouts:
                
                // child default sizes:
                justifyItems : 'start',   // align left horizontally
                alignItems   : 'stretch', // stretch    vertically
            }),
            rule('.inlineEnd', {
                // layouts:
                
                // child default sizes:
                justifyItems : 'end',     // align left horizontally
                alignItems   : 'stretch', // stretch    vertically
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
}), { id: 'g93sfdvlhc' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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
            // we don't need these extra properties because the <ModalCard> is sub <Card>
            |'cardRef'
            |'cardOrientation'
            |'cardStyle'
            
            
            
            // children:
            |'cardChildren' // we redefined `children` prop as <CardItem>(s)
        >,
        CollapseComponentProps<Element, TModalExpandedChangeEvent>,
        ModalComponentProps<Element, TModalExpandedChangeEvent>
{
}
const ModalSide = <TElement extends Element = HTMLElement, TModalExpandedChangeEvent extends ModalExpandedChangeEvent = ModalExpandedChangeEvent>(props: ModalSideProps<TElement, TModalExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet         = useBackdropSideStyleSheet();
    const collapseStyleSheet = useModalSideStyleSheet();
    
    
    
    // variants:
    const modalSideVariant   = useModalSideVariant(props);
    
    
    
    // states:
    const collapsibleState   = useCollapsible<TElement, TModalExpandedChangeEvent>(props);
    
    
    
    // rest props:
    const {
        // variants:
        modalSideStyle : _modalSideStyle, // remove
        
        
        
        // accessibilities:
        setFocus,
        restoreFocus,
        
        
        
        // states:
        expanded,         // take, to be handled by <Modal>
        onExpandedChange, // take, to be handled by <Modal>
        
        
        
        // behaviors:
        lazy,
        
        
        
        // components:
        cardComponent     = (<Card<Element> /> as React.ReactComponentElement<any, CardProps<Element>>),
        children          : cardChildren,
        
        collapseComponent = (<Collapse<Element, TModalExpandedChangeEvent> /> as React.ReactComponentElement<any, CollapseProps<Element, TModalExpandedChangeEvent>>),
        
        modalRef,
        backdropStyle,
        modalViewport,
        modalComponent    = (<Modal<Element, TModalExpandedChangeEvent> >{cardComponent}</Modal> as React.ReactComponentElement<any, ModalProps<Element, TModalExpandedChangeEvent>>),
    ...restCardProps} = props;
    
    
    
    // refs:
    const mergedModalRef  = useMergeRefs(
        // preserves the original `outerRef` from `modalComponent`:
        modalComponent.props.outerRef,
        
        
        
        // preserves the original `modalRef` from `props`:
        modalRef,
        // preserves the original `outerRef` from `props`:
        props.outerRef,
    );
    
    
    
    // classes:
    const variantClasses  = useMergeClasses(
        // preserves the original `variantClasses` from `modalComponent`:
        modalComponent.props.variantClasses,
        
        
        
        // preserves the original `variantClasses` from `props`:
        props.variantClasses,
        
        
        
        // variants:
        modalSideVariant.class,
    );
    const collapseClasses = useMergeClasses(
        // preserves the original `classes` from `collapseComponent`:
        collapseComponent.props.classes,
        
        
        
        // styles:
        collapseStyleSheet.main,
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
            
            
            
            // accessibilities:
            setFocus         : modalComponent.props.setFocus     ?? setFocus,
            restoreFocus     : modalComponent.props.restoreFocus ?? restoreFocus,
            
            
            
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
        /* <Collapse> */
        ((modalComponent.props.children !== cardComponent) ? modalComponent.props.children : React.cloneElement<CollapseProps<Element, TModalExpandedChangeEvent>>(collapseComponent,
            // props:
            {
                // semantics:
                semanticRole : collapseComponent.props.semanticRole ?? '',
                
                
                
                // variants:
                orientation  : collapseComponent.props.orientation ?? (modalSideVariant.class.startsWith('inline') ? 'inline' : 'block'),
                
                
                
                // classes:
                classes      : collapseClasses,
                
                
                
                // states:
                expanded     : collapseComponent.props.expanded ?? collapsibleState.expanded,
            },
            
            
            
            // children:
            /* <Card> */
            collapseComponent.props.children ?? React.cloneElement<CardProps<Element>>(cardComponent,
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
    ModalSide,
    ModalSide as default,
}

export type { CardStyle, CardVariant }
