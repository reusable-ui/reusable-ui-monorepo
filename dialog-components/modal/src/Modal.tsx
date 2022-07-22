// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
    useState,
}                           from 'react'
import {
    createPortal,
}                           from 'react-dom'

// cssfn:
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
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // styles:
    stripoutFocusableElement,
}                           from '@reusable-ui/stripouts'       // removes browser's default stylesheet
import {
    // utilities:
    isClientSide,
    isReusableUiComponent,
}                           from '@reusable-ui/utilities'       // common utility functions
import {
    // hooks:
    useTriggerRender,
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    ExpandCollapseVars,
    ifExpanding,
    ifCollapsing,
    ifCollapsed,
    usesExpandCollapseState as baseUsesExpandCollapseState,
    ExpandChangeEvent,
    ExpandableProps,
    useExpandCollapseState,
}                           from '@reusable-ui/expandable'      // a capability of UI to expand/reduce its size or toggle the visibility
import {
    // types:
    SemanticTag,
    SemanticRole,
    
    
    
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesAnim,
    useExcitedState,
    usesExcitedState,
}                           from '@reusable-ui/basic'           // a base component



// defaults:
const _defaultModalUiSemanticTag  : SemanticTag  = [null, 'dialog'] // uses <div>           as the default semantic, fallbacks to <dialog>
const _defaultModalUiSemanticRole : SemanticRole =        'dialog'  // uses [role="dialog"] as the default semantic



// utilities:
const sortByTabIndex = (a: Element|undefined, b: Element|undefined) => {
    if (!a || !b) return 0;
    return ((a as HTMLElement|SVGElement).tabIndex ?? 0) - ((b as HTMLElement|SVGElement).tabIndex ?? 0);
};
export const getFocusableElements = (parentElement : Element): Element[] => {
    return (
        Array.from(parentElement.children)
        .flatMap((liElement) => {
            const focusableElements = (
                Array.from(liElement.querySelectorAll(
`:is(
    a,
    button,
    textarea,
    select,
    details,
    input:not([type="hidden"]),
    [tabindex]:not([tabindex^="-"])
):not(
    :is(
        [disabled]:not([disabled="false"]),
        [aria-disabled]:not([aria-disabled="false"])
    )
)`              ))
                .sort(sortByTabIndex)
            );
            return {
                primary : focusableElements.at(0),
                items   : focusableElements,
            };
        })
        .sort((x, y) => sortByTabIndex(x.primary, y.primary))
        .flatMap((item) => item.items)
    )
};
export const setFocusAt    = (parentElement : Element, index: number,) => {
    // get all possible focusable elements within <parentElement>:
    const focusableElements = getFocusableElements(parentElement);
    
    
    
    // find the target element:
    let targetElement = focusableElements.at(index);
    
    
    
    // set focus:
    (targetElement as HTMLElement|SVGElement|undefined)?.focus?.();
};
export const setFocusFirst = (parentElement : Element) => {
    setFocusAt(parentElement, 0);
};
export const setFocusLast  = (parentElement : Element) => {
    setFocusAt(parentElement, -1);
};
export const setFocusPrev  = (parentElement : Element) => {
    // get all possible focusable elements within <parentElement>:
    const focusableElements = getFocusableElements(parentElement);
    
    
    
    // get the current focusable element (if any):
    const currentFocusedElement = document.activeElement;
    const currentFocusedElementIndex = (
        currentFocusedElement
        ?
        focusableElements.indexOf(currentFocusedElement)
        :
        -1
    );
    
    
    
    // set focus:
    if (currentFocusedElementIndex < 0) {
        // focus to the last focusable element:
        (focusableElements.at(-1) as HTMLElement|SVGElement|undefined)?.focus();
    }
    else {
        // focus to the prev focusable element:
        // wrap to the last for the first:
        (focusableElements.at(currentFocusedElementIndex -1) as HTMLElement|SVGElement|undefined)?.focus();
    }
};
export const setFocusNext  = (parentElement : Element) => {
    // get all possible focusable elements within <parentElement>:
    const focusableElements = getFocusableElements(parentElement);
    
    
    
    // get the current focusable element (if any):
    const currentFocusedElement = document.activeElement;
    const currentFocusedElementIndex = (
        currentFocusedElement
        ?
        focusableElements.indexOf(currentFocusedElement)
        :
        -1
    );
    
    
    
    // set focus:
    if (currentFocusedElementIndex < 0) {
        // focus to the first focusable element:
        (focusableElements.at(0) as HTMLElement|SVGElement|undefined)?.focus();
    }
    else {
        // focus to the next focusable element:
        // wrap to the first for the last:
        ((focusableElements.at(currentFocusedElementIndex +1) ?? focusableElements.at(0)) as HTMLElement|SVGElement|undefined)?.focus();
    }
};

const getViewportOrDefault = (viewportRef: React.RefObject<Element>|Element|null|undefined): Element => {
    return (
        // custom viewport (if was set):
        (
            viewportRef
            ?
            ((viewportRef.constructor === Object) ? (viewportRef as React.RefObject<Element>)?.current : (viewportRef as Element))
            :
            null
        )
        ??
        // the default viewport is <body>:
        document.body
    );
};



// hooks:

// accessibilities:

//#region expandable
/**
 * Uses expand & collapse states.
 * @returns A `StateMixin<ExpandCollapseVars>` represents expand & collapse state definitions.
 */
export const usesExpandCollapseState = (): StateMixin<ExpandCollapseVars> => {
    // dependencies:
    
    // accessibilities:
    const [expandRule, expands] = baseUsesExpandCollapseState();
    
    
    
    return [
        () => style({
            ...imports([
                // accessibilities:
                expandRule,
            ]),
            ...states([
                ifExpanding({
                    ...vars({
                        [expands.anim] : modals.animExpand,
                    }),
                }),
                ifCollapsing({
                    ...vars({
                        [expands.anim] : modals.animCollapse,
                    }),
                }),
            ]),
        }),
        expands,
    ];
};
//#endregion expandable


// behaviors:

//#region backdrop style
export type BackdropStyle = 'hidden'|'interactive'|'static' // might be added more styles in the future
export interface BackdropVariant {
    backdropStyle ?: BackdropStyle
}
export const useBackdropVariant = (props: BackdropVariant) => {
    return {
        class: props.backdropStyle ?? null,
    };
};
//#endregion backdrop style

export const ifGlobalModal = (styles: CssStyleCollection): CssRule => rule('body>*>&', styles);



// styles:
export const usesBackdropUiLayout = () => {
    // dependencies:
    
    // animations:
    const [animRule, anims] = usesAnim();
    
    
    
    return style({
        ...imports([
            // resets:
            stripoutFocusableElement(), // clear browser's default styles
            
            // animations:
            animRule,
        ]),
        ...style({
            // animations:
            anim : anims.anim,
        }),
    });
};
export const usesBackdropUiStates = () => {
    // dependencies:
    
    // states:
    const [excitedStateRule] = usesExcitedState();
    
    
    
    return style({
        ...imports([
            // accessibilities:
            excitedStateRule,
        ]),
    });
};

export const useBackdropUiStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesBackdropUiLayout(),
        
        // states:
        usesBackdropUiStates(),
    ]),
}), { specificityWeight: 0, id: 'u4teynvq1y' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesBackdropLayout = () => {
    // dependencies:
    
    // animations:
    const [animRule, anims] = usesAnim();
    
    
    
    return style({
        ...imports([
            // animations:
            animRule,
        ]),
        ...style({
            // layouts:
            display      : 'grid',
            
            // child default sizes:
            justifyItems : 'center', // center horizontally
            alignItems   : 'center', // center vertically
            
            
            
            // positions:
            position     : 'absolute', // local <Modal>: absolute position
            ...ifGlobalModal({
                position : 'fixed',    // global <Modal>: directly inside `body > portal` => fixed position
            }),
            inset        : 0,          // span the <Modal> to the edges of <container>
            zIndex       : 1040,
            
            
            
            // sizes:
            // global <Modal>: fills the entire screen height:
            ...ifGlobalModal({
                boxSizing    : 'border-box', // the final size is including borders & paddings
                minBlockSize : '100vh',
            }),
            
            
            
            // customize:
            ...usesCssProps(modals), // apply config's cssProps
            
            
            
            // animations:
            anim         : anims.anim,
        }),
    });
};
export const usesBackdropVariants = () => {
    return style({
        ...variants([
            rule('.hidden', {
                // backgrounds:
                background    : 'none',
            }),
            rule(['.hidden', '.interactive'], {
                // accessibilities:
                pointerEvents : 'none', // a ghost layer
                
                
                
                // children:
                ...children('*', { // <ModalUi>
                    // accessibilities:
                    pointerEvents : 'initial', // cancel out ghost layer
                }),
            }),
        ]),
    });
};
export const usesBackdropStates = () => {
    // dependencies:
    
    // states:
    const [expandCollapseStateRule] = usesExpandCollapseState();
    
    
    
    return style({
        ...imports([
            // accessibilities:
            expandCollapseStateRule,
        ]),
        ...states([
            ifCollapsed({
                // appearances:
                display: 'none', // hide the <Modal>
            }),
        ]),
    });
};

export const useBackdropStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesBackdropLayout(),
        
        // variants:
        usesBackdropVariants(),
        
        // states:
        usesBackdropStates(),
    ]),
}), { id: 'z26pqrin5i' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [modals, modalValues, cssModalConfig] = cssConfig(() => {
    //#region keyframes
    const frameCollapsed    = style({
        filter : [[
            'opacity(0)',
        ]]
    });
    const frameExpanded     = style({
        filter : [[
            'opacity(1)',
        ]]
    });
    const [keyframesExpandRule  , keyframesExpand  ] = keyframes({
        from  : frameCollapsed,
        to    : frameExpanded,
    });
    keyframesExpand.value   = 'expand';   // the @keyframes name should contain 'expand'   in order to be recognized by `useExpandCollapseState`
    const [keyframesCollapseRule, keyframesCollapse] = keyframes({
        from  : frameExpanded,
        to    : frameCollapsed,
    });
    keyframesCollapse.value = 'collapse'; // the @keyframes name should contain 'collapse' in order to be recognized by `useExpandCollapseState`
    //#endregion keyframes
    
    
    
    return {
        // backgrounds:
        backg            : 'rgba(0,0,0, 0.5)'                   as CssKnownProps['backg'],
        modalUiBoxShadow : [[0, 0, '10px', 'rgba(0,0,0,0.5)']]  as CssKnownProps['boxShadow'],
        
        
        
        // animations:
        ...keyframesExpandRule,
        ...keyframesCollapseRule,
        animExpand       : [
            ['300ms', 'ease-out', 'both', keyframesExpand  ],
        ]                                                       as CssKnownProps['anim'],
        animCollapse     : [
            ['500ms', 'ease-out', 'both', keyframesCollapse],
        ]                                                       as CssKnownProps['anim'],
    };
}, { prefix: 'mdl' });



// react components:

export interface ModalUiComponentProps<TElement extends Element = HTMLElement>
    extends
        // accessibilities:
        Pick<React.HTMLAttributes<HTMLElement>, 'tabIndex'>
{
    // components:
    children : React.ReactElement<GenericProps<TElement>|React.HTMLAttributes<HTMLElement>|React.SVGAttributes<SVGElement>>
}

export type ModalActionType = 'shortcut'|'backdrop'|{}
export interface ModalExpandChangeEvent extends ExpandChangeEvent {
    actionType : ModalActionType
}

export interface ModalProps<TElement extends Element = HTMLElement, TModalExpandChangeEvent extends ModalExpandChangeEvent = ModalExpandChangeEvent>
    extends
        // bases:
        Omit<GenericProps<TElement>,
            // children:
            |'children' // we redefined `children` prop as a <ModalUi> component
        >,
        
        // accessibilities:
        ExpandableProps<TModalExpandChangeEvent>,
        
        // behaviors:
        BackdropVariant,
        
        // components:
        ModalUiComponentProps<Element>
{
    // modals:
    viewportRef ?: React.RefObject<Element>|Element|null // getter ref
    
    
    
    // behaviors:
    lazy        ?: boolean
}
const Modal = <TElement extends Element = HTMLElement, TModalExpandChangeEvent extends ModalExpandChangeEvent = ModalExpandChangeEvent>(props: ModalProps<TElement, TModalExpandChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet         = useBackdropStyleSheet();
    const uiStyleSheet       = useBackdropUiStyleSheet();
    
    
    
    // variants:
    const backdropVariant    = useBackdropVariant(props);
    
    
    
    // rest props:
    const {
        // remove states props:
        
        // accessibilities:
        expanded      : _expanded,
        
        
        
        // accessibilities:
        onExpandChange,
        
        
        
        // behaviors:
        backdropStyle = undefined,
        lazy          = false,
        
        
        
        // modals:
        viewportRef,
        
        
        
        // components:
        tabIndex,
        children      : modalUiComponent,
    ...restGenericProps} = props;
    
    
    
    // states:
    
    // accessibilities:
    const expandCollapseState = useExpandCollapseState<TElement, TModalExpandChangeEvent>(props);
    const isVisible           = expandCollapseState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    const isExpanded          = expandCollapseState.expanded;
    const isModal             = isVisible && !['hidden', 'interactive'].includes(backdropStyle ?? '');
    
    const [excitedDn, setExcitedDn] = useState(false);
    const excitedState = useExcitedState<HTMLElement|SVGElement>({ excited: excitedDn, onExcitedChange: setExcitedDn });
    
    
    
    // verifies:
    React.Children.only(modalUiComponent);
    const isReusableUiModalComponent : boolean = isReusableUiComponent<GenericProps<Element>>(modalUiComponent);
    if (!isReusableUiModalComponent && !React.isValidElement<GenericProps<Element>|React.HTMLAttributes<HTMLElement>|React.SVGAttributes<SVGElement>>(modalUiComponent)) throw Error('Invalid child element.');
    
    
    
    // refs:
    const modalUiRefInternal = useRef<Element|null>(null);
    const mergedModalUiRef   = useMergeRefs(
        // preserves the original `ref` from `modalUiComponent`:
        (
            isReusableUiModalComponent
            ?
            (modalUiComponent.props as GenericProps<Element>).elmRef
            :
            (modalUiComponent.props as React.RefAttributes<Element>).ref
        ),
        
        
        
        modalUiRefInternal,
    );
    const portalRefInternal  = useRef<HTMLDivElement|null>(null);
    const prevFocusRef       = useRef<Element|null>(null);
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        backdropVariant.class,
    );
    const stateClasses   = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // accessibilities:
        expandCollapseState.class,
    );
    const modalUiClasses = useMergeClasses(
        // preserves the original `classes` from `modalUiComponent`:
        (
            isReusableUiModalComponent
            ?
            (modalUiComponent.props as GenericProps<Element>).classes
            :
            ((modalUiComponent.props as React.HTMLAttributes<HTMLElement>|React.SVGAttributes<SVGElement>).className ?? '').split(' ')
        ),
        
        
        
        // styles:
        uiStyleSheet.main,
        
        // accessibilities:
        excitedState.class,
    );
    
    
    
    // handlers:
    const handleExpandChange        = onExpandChange;
    const handleKeyDownInternal     = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        if (((): boolean => {
            const isKeyOf = (key: string): boolean => {
                return ((event.key.toLowerCase() === key) || (event.code.toLowerCase() === key));
            };
            
            
            
            if (isKeyOf('escape')) {
                // [esc] key pressed => request to hide the <Modal>:
                handleExpandChange?.({ expanded: false, actionType: 'shortcut' } as TModalExpandChangeEvent);
            }
            else if (isKeyOf('tab'))
            {
                setFocusNext(event.currentTarget);
            }
            else if (
                isKeyOf('pagedown'  ) ||
                isKeyOf('pageup'    ) ||
                isKeyOf('home'      ) ||
                isKeyOf('end'       ) ||
                isKeyOf('arrowdown' ) ||
                isKeyOf('arrowup'   ) ||
                isKeyOf('arrowleft' ) ||
                isKeyOf('arrowright') ||
                isKeyOf('space'     )
            )
            {
                // do nothing
                // do not scroll the page
            }
            else return false; // not handled
            
            
            
            return true; // handled
        })()) {
            event.preventDefault(); // prevents the whole page from scrolling when the user press the [up],[down],[left],[right],[pg up],[pg down],[home],[end]
        } // if
    }, [handleExpandChange]);
    const handleKeyDown             = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // range handlers:
        handleKeyDownInternal,
    );
    const handleMouseDownInternal   = useEvent<React.MouseEventHandler<TElement> & React.TouchEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented)               return; // the event was already handled by user => nothing to do
        if (event.target !== event.currentTarget) return; // ignore bubbling from <ModalUi>
        
        
        
        // actions:
        if (backdropStyle === 'static') {
            setExcitedDn(true); // make <ModalUi> blinking
            (modalUiRefInternal.current as HTMLElement|SVGElement|null)?.focus({ preventScroll: true }); // re-focus to the <ModalUi>, so the user able to use [esc] key to close the <Modal>
        }
        else {
            // backdrop clicked => request to hide the <Modal>:
            handleExpandChange?.({ expanded: false, actionType: 'backdrop' } as TModalExpandChangeEvent);
        } // if
        if (event.type !== 'touchstart') event.preventDefault(); // handled
    }, [handleExpandChange, backdropStyle]);
    const handleMouseDown           = useMergeEvents(
        // preserves the original `onMouseDown` from `props`:
        props.onMouseDown,
        
        
        
        // actions:
        handleMouseDownInternal,
    );
    const handleTouchStart          = useMergeEvents(
        // preserves the original `onTouchStart` from `props`:
        props.onTouchStart,
        
        
        
        // actions:
        handleMouseDownInternal,
    );
    const handleContextMenuInternal = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented)               return; // the event was already handled by user => nothing to do
        if (event.target !== event.currentTarget) return; // only cancels the contextMenu at the <overlay>, allows at the <ModalUi>
        
        
        
        // actions:
        // cancel the contextMenu:
        event.preventDefault(); // handled
    }, []);
    const handleContextMenu         = useMergeEvents(
        // preserves the original `onContextMenu` from `props`:
        props.onContextMenu,
        
        
        
        // actions:
        handleContextMenuInternal,
    );
    const handleAnimationEnd        = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        
        // accessibilities:
        expandCollapseState.handleAnimationEnd,
    );
    const modalUiHandleAnimationEnd = useMergeEvents<React.AnimationEvent<HTMLElement & SVGElement>>(
        // preserves the original `onAnimationEnd` from `modalUiComponent`:
        modalUiComponent.props.onAnimationEnd,
        
        
        
        // states:
        
        // accessibilities:
        excitedState.handleAnimationEnd,
    );
    
    
    
    // dom effects:
    
    // set focus on <ModalUi> each time it shown:
    useEffect(() => {
        // setups:
        if (isExpanded) {
            // backup the current focused element (if any):
            prevFocusRef.current = document.activeElement;
            
            // when shown => focus the <ModalUi>, so the user able to use [esc] key to close the <Modal>:
            (modalUiRefInternal.current as HTMLElement|SVGElement|null)?.focus({ preventScroll: true });
        }
        else {
            // restore the previously focused element (if any):
            (prevFocusRef.current as HTMLElement|SVGElement|null)?.focus({ preventScroll: true });
            prevFocusRef.current = null; // unreference the restored focused element
        } // if
    }, [isExpanded]);
    
    // prevent the <viewport> from scrolling when in modal (blocking) mode:
    useEffect(() => {
        // conditions:
        if (!isModal)  return; // only modal (blocking) mode
        
        
        
        // setups:
        const viewportElm         = getViewportOrDefault(viewportRef);
        
        const scrollableElm       = (viewportElm === document.body) ? document.documentElement : viewportElm;
        const scrollableEvent     = (viewportElm === document.body) ? document                 : viewportElm;
        const currentScrollTop    = scrollableElm.scrollTop;
        const currentScrollLeft   = scrollableElm.scrollLeft;
        
        const handlePreventScroll = (event: Event) => {
            if (event.target === scrollableEvent) { // only handle click on the viewport, ignores click bubbling from the children
                scrollableElm.scrollTop  = currentScrollTop;  // prevent from scrolling by keeping the initial scroll position
                scrollableElm.scrollLeft = currentScrollLeft; // prevent from scrolling by keeping the initial scroll position
            } // if
        };
        
        scrollableEvent.addEventListener('scroll', handlePreventScroll);
        
        
        
        // cleanups:
        return () => {
            scrollableEvent.removeEventListener('scroll', handlePreventScroll);
        };
    }, [isModal]);
    
    // delays the rendering of portal until the page is fully hydrated
    const [triggerRender] = useTriggerRender();
    useEffect(() => {
        // conditions:
        if (!isClientSide) return; // client side only, server side => ignore
        
        
        
        // setups:
        const viewportElm = getViewportOrDefault(viewportRef);
        const portalElm = document.createElement('div');
        viewportElm.appendChild(portalElm);
        portalRefInternal.current = portalElm;
        
        triggerRender(); // re-render with hydrated version
        
        
        
        // cleanups:
        return () => {
            viewportElm.removeChild(portalElm);
            portalRefInternal.current = null;
        };
    }, [viewportRef]);
    
    // stops the excited state when modal is closed:
    useEffect(() => {
        // conditions:
        if (isExpanded) return; // <Modal> is still shown => ignore
        if (!excitedDn) return; // <Modal> is not excited => ignore
        
        
        
        // actions:
        setExcitedDn(false);
    }, [isExpanded, excitedDn]);
    
    
    
    // jsx:
    const portalElm = portalRefInternal.current;
    if (!portalElm) return null; // server side -or- client side but not already hydrated => nothing to render
    return createPortal(
        <Generic<TElement>
            // other props:
            {...restGenericProps}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            stateClasses={stateClasses}
            
            
            
            // handlers:
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onContextMenu={handleContextMenu}
            onAnimationEnd={handleAnimationEnd}
        >
            {/* <ModalUi> */}
            {(!lazy || isVisible) && React.cloneElement<GenericProps<Element> & React.RefAttributes<Element> & React.HTMLAttributes<Element>>(modalUiComponent,
                // props:
                {
                    // refs:
                    [isReusableUiModalComponent ? 'elmRef' : 'ref'] : mergedModalUiRef,
                    
                    
                    
                    // semantics:
                    ...(isReusableUiModalComponent ? {
                        semanticTag  : (modalUiComponent.props as GenericProps<Element>).semanticTag  ?? _defaultModalUiSemanticTag,
                        semanticRole : (modalUiComponent.props as GenericProps<Element>).semanticRole ?? _defaultModalUiSemanticRole,
                    } : {
                        role         : modalUiComponent.props.role ?? _defaultModalUiSemanticRole,
                    }),
                    'aria-modal'     : modalUiComponent.props['aria-modal'] ?? (isModal || undefined),
                    
                    
                    
                    // classes:
                    ...(isReusableUiModalComponent ? {
                        classes      : modalUiClasses,
                    } : {
                        className    : modalUiClasses.filter((c) => !!c).join(' '),
                    }),
                    
                    
                    
                    // accessibilities:
                    tabIndex         : (modalUiComponent.props as React.HTMLAttributes<HTMLElement>).tabIndex ?? tabIndex,
                    ...((modalUiComponent.type === 'dialog') ? {
                        open         : isVisible,
                    } : null),
                    
                    
                    
                    // handlers:
                    onAnimationEnd   : modalUiHandleAnimationEnd,
                },
            )}
        </Generic>
    , portalElm);
};
export {
    Modal,
    Modal as default,
}



export interface ModalComponentProps<TElement extends Element = HTMLElement, TModalExpandChangeEvent extends ModalExpandChangeEvent = ModalExpandChangeEvent>
{
    // refs:
    modalRef       ?: React.Ref<TElement> // setter ref
    
    
    
    // components:
    modalComponent ?: React.ReactComponentElement<any, ModalProps<TElement, TModalExpandChangeEvent>>
}
