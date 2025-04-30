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
import {
    // style sheets:
    dynamicStyleSheet,
    dynamicStyleSheets,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a set of React node utility functions:
    isReusableUiComponent,
    
    
    
    // focusing functions:
    setFocusNext,
    
    
    
    // react helper hooks:
    useIsomorphicLayoutEffect,
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    
    
    
    // a capability of UI to stack on top-most of another UI(s) regardless of DOM's stacking context:
    GlobalStackableProps,
    useGlobalStackable,
    
    
    
    // a capability of UI to be focused within itself or its content (when expanded), and re-focus back to previous element (when collapsed)
    AutoFocusableProps,
    useAutoFocusable,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
    CollapsibleProps,
    useCollapsible,
    CollapsibleEventProps,
    useCollapsibleEvent,
    ControllableCollapsibleProps,
    
    
    
    // a capability of UI to highlight itself to attract user's attention:
    ExcitedChangeEvent,
    useExcitable,
    useControllableExcitable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a generic component

// internals:
import {
    // features:
    usesBackdrop,
}                           from './features/backdrop.js'
import {
    // variants:
    BackdropVariant,
    useBackdropVariant,
}                           from './variants/BackdropVariant.js'
import {
    type BackdropCounter,
    backdropCounterMap,
}                           from './backdrop-counter.js'



// styles:
export const useModalUiStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/modalUiStyles.js')
, { specificityWeight: 0, id: 'u4teynvq1y' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names

export const useBackdropStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/backdropStyles.js')
, { id: 'z26pqrin5i' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names

export const useNoScrollbarStyleSheet = dynamicStyleSheets(
    () => import(/* webpackPrefetch: true */ './styles/noScrollbarStyles.js')
, { id: 'cys5kcu257' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:

export interface ModalUiComponentProps<TElement extends Element = HTMLElement>
    extends
        // accessibilities:
        Pick<React.HTMLAttributes<HTMLElement>, 'tabIndex'>
{
    // components:
    children : React.ReactElement<GenericProps<TElement>|React.HTMLAttributes<HTMLElement>|React.SVGAttributes<SVGElement>>
}

export type ModalActionType = 'shortcut'|'backdrop'|'ui'|{}
export interface ModalExpandedChangeEvent<TData extends any = any> extends ExpandedChangeEvent {
    actionType  : ModalActionType
    data       ?: TData
}

export interface ModalProps<TElement extends Element = HTMLElement, TModalExpandedChangeEvent extends ModalExpandedChangeEvent<any> = ModalExpandedChangeEvent<any>>
    extends
        // bases:
        Omit<GenericProps<TElement>,
            // children:
            |'children' // we redefined `children` prop as a <ModalUi> component
        >,
        
        // capabilities:
        GlobalStackableProps,
        AutoFocusableProps,
        
        // states:
        CollapsibleProps<TModalExpandedChangeEvent>,
        CollapsibleEventProps,
        ControllableCollapsibleProps<TModalExpandedChangeEvent>,
        
        // variants:
        BackdropVariant,
        
        // components:
        ModalUiComponentProps<Element>
{
    // behaviors:
    lazy         ?: boolean
}
const Modal = <TElement extends Element = HTMLElement, TModalExpandedChangeEvent extends ModalExpandedChangeEvent<any> = ModalExpandedChangeEvent<any>>(props: ModalProps<TElement, TModalExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet               = useBackdropStyleSheet();
    const uiStyleSheet             = useModalUiStyleSheet();
    const noScrollbarStyleSheet    = useNoScrollbarStyleSheet();
    
    
    
    // variants:
    const backdropVariant          = useBackdropVariant(props);
    
    
    
    // refs:
    const modalUiRefInternal       = useRef<Element|null>(null);
    
    
    
    // rest props:
    const {
        // refs:
        elmRef,
        
        
        
        // variants:
        backdropStyle      = 'regular',
        
        
        
        // behaviors:
        lazy               = false,
        
        
        
        // states:
        expanded           : _expanded,        // remove
        onExpandStart      : _onExpandStart,   // remove
        onCollapseStart    : _onCollapseStart, // remove
        onExpandEnd        : _onExpandEnd,     // remove
        onCollapseEnd      : _onCollapseEnd,   // remove
        onExpandedChange,
        
        
        
        // global stackable:
        viewport           : _viewport,        // remove
        
        
        
        // auto focusable:
        autoFocusOn        = modalUiRefInternal.current, // take
        restoreFocusOn     = 'auto',                     // take
        autoFocus          = true,                       // take
        restoreFocus       = true,                       // take
        autoFocusScroll    = false,                      // take
        restoreFocusScroll = false,                      // take
        
        
        
        // components:
        tabIndex,
        children           : modalUiComponent,
    ...restGenericProps} = props;
    
    
    
    // states:
    const collapsibleState = useCollapsible<TElement, TModalExpandedChangeEvent>(props);
    const isVisible        = collapsibleState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    const isExpanded       = collapsibleState.expanded;
    const isModal          = isVisible && !['hidden', 'interactive'].includes(backdropStyle);
    
    useCollapsibleEvent<TElement>(props, collapsibleState);
    
    const [excitedDn, setExcitedDn] = useState(false);
    const handleExcitedChange       = useEvent<EventHandler<ExcitedChangeEvent>>((event) => {
        setExcitedDn(event.excited);
    });
    const excitableState            = useExcitable<HTMLElement|SVGElement, ExcitedChangeEvent>({ excited: excitedDn });
    useControllableExcitable<HTMLElement|SVGElement, ExcitedChangeEvent>({ onExcitedChange: handleExcitedChange }, excitableState);
    
    
    
    // capabilities:
    const {viewportElm, portalElm, ensureTopMost} = useGlobalStackable(props);
    useAutoFocusable({
        autoFocusOn,
        restoreFocusOn,
        autoFocus,
        restoreFocus,
        autoFocusScroll,
        restoreFocusScroll,
    }, collapsibleState);
    
    
    
    // verifies:
    React.Children.only(modalUiComponent);
    const isReusableUiModalComponent : boolean = isReusableUiComponent<GenericProps<Element>>(modalUiComponent);
    if (!isReusableUiModalComponent && !React.isValidElement<GenericProps<Element>|React.HTMLAttributes<HTMLElement>|React.SVGAttributes<SVGElement>>(modalUiComponent)) throw Error('Invalid child element.');
    
    
    
    // refs:
    const backdropRefInternal       = useRef<TElement|null>(null);
    const mergedBackdropRef         = useMergeRefs(
        // preserves the original `elmRef` from `props`:
        elmRef,
        
        
        
        backdropRefInternal,
    );
    const mergedModalUiRef          = useMergeRefs(
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
    // const noParentScrollRefInternal = useRef<HTMLDivElement|null>(null);
    
    
    
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
        
        
        
        // states:
        collapsibleState.class,
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
        
        
        
        // states:
        excitableState.class,
    );
    
    
    
    // handlers:
    const handleExpandedChange        = onExpandedChange;
    const handleKeyDownInternal       = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        /* note: the `code` may `undefined` on autoComplete */
        const keyCode = (event.code as string|undefined)?.toLowerCase();
        if (!keyCode) return; // ignores [unidentified] key
        
        
        
        if (((): boolean => {
            if (!isModal) {
                return false; // interactive|hidden => do not trap the [tab]
            }
            else if (isModal && (keyCode === 'tab'))
            {
                if (event.altKey || event.ctrlKey || event.shiftKey || event.metaKey) return false; // do not handle [tab] key if [alt][ctrl][shift][win] keys are also pressed
                
                
                
                setFocusNext(event.currentTarget);
            }
            else if (
                (keyCode === 'pagedown'  ) ||
                (keyCode === 'pageup'    )
            )
            {
                // do nothing
                // do not scroll the page
            }
            else if (
                // navigation keys:
                (keyCode === 'home'      ) ||
                (keyCode === 'end'       ) ||
                (keyCode === 'arrowdown' ) ||
                (keyCode === 'arrowup'   ) ||
                (keyCode === 'arrowleft' ) ||
                (keyCode === 'arrowright')
            )
            {
                if (
                    //#region list of controls that internally HANDLE [navigation] keys
                    // <CustomEditor>:
                    (event.target as any)?.isContentEditable
                    ||
                    // <TextEditorMultiline>:
                    ((event.target as any)?.tagName === 'TEXTAREA')
                    ||
                    // <TextEditorLike>, <Range>:
                    (
                        ((event.target as any)?.tagName === 'INPUT')
                        &&
                        // controls that NOT handle [navigation] keys:
                        !['color', 'file'].includes((event.target as any)?.type ?? '')
                    )
                    //#endregion list of controls that internally HANDLE [navigation] keys
                ) {
                    return false; // do not handle [navigation] keys if the event coming from <CustomEditor>|<TextEditor>|<Range>
                } // if
                
                
                
                // do nothing
                // do not scroll the page
            }
            else if (
                // special keys:
                (keyCode === 'space')
            )
            {
                if (
                    //#region list of controls that internally HANDLE [space] key
                    // <CustomEditor>:
                    (event.target as any)?.isContentEditable
                    ||
                    // <TextEditorMultiline>:
                    ((event.target as any)?.tagName === 'TEXTAREA')
                    ||
                    // <TextEditorLike> (excluding <Range>):
                    (
                        ((event.target as any)?.tagName === 'INPUT')
                        &&
                        // controls that NOT handle [space] key:
                        !['color', 'file', 'range'].includes((event.target as any)?.type ?? '')
                    )
                    //#endregion list of controls that internally HANDLE [space] key
                ) {
                    return false; // do not handle [space] key if the event coming from <CustomEditor>|<TextEditor> (excluding <Range>)
                } // if
                
                
                
                // do nothing
                // do not scroll the page
            }
            else return false; // not handled
            
            
            
            return true; // handled
        })()) {
            event.preventDefault(); // prevents the whole page from scrolling when the user press the [up],[down],[left],[right],[pg up],[pg down],[home],[end]
        } // if
    });
    const handleKeyDown               = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // actions:
        handleKeyDownInternal,
    );
    const handleMouseDownInternal     = useEvent<React.MouseEventHandler<TElement> & React.TouchEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        if (
            // ignore bubbling from NON <Backdrop>:
            (event.target !== event.currentTarget)
            
            // &&
            // 
            // // ignore bubbling from NON <NoParentScroll> (if PRESENT):
            // (
            //     // <NoParentScroll> is NOT PRESENT (NO modal (blocking) mode) => nothing to ignore:
            //     !noParentScrollRefInternal.current
            //     ||
            //     // <NoParentScroll> is PRESENT and MATCH to target event => ignore bubbling from <NoParentScroll>
            //     (event.target !== noParentScrollRefInternal.current)
            // )
            
        ) return; // ignore bubbling from NON <Backdrop> and NON <NoParentScroll>, assumes the elements OTHER THAN <Backdrop>|<NoParentScroll> is <ModalUi>
        
        
        
        // actions:
        if (backdropStyle === 'static') {
            setExcitedDn(true); // make <ModalUi> blinking
            
            
            
            const autoFocusElm = ((autoFocusOn instanceof Element) ? autoFocusOn : autoFocusOn?.current);
            if (autoFocus && autoFocusElm && (autoFocusElm as HTMLElement|SVGElement).focus) {
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        (autoFocusElm as HTMLElement|SVGElement).focus({ preventScroll: !autoFocusScroll }); // re-focus to the <FocusableTarget> of <Modal>, so the focus is trapped inside the <Modal>
                    }); // wait until mouseup|keyup fired of the <TriggerButton> (if any)
                }, 0); // wait until mouseup|keyup fired of the <TriggerButton> (if any)
            } // if
        }
        else {
            // backdrop clicked => request to hide the <Modal>:
            handleExpandedChange?.({ expanded: false, actionType: 'backdrop' } as TModalExpandedChangeEvent);
        } // if
        if (event.type !== 'touchstart') event.preventDefault(); // handled
    });
    const handleMouseDown             = useMergeEvents(
        // preserves the original `onMouseDown` from `props`:
        props.onMouseDown,
        
        
        
        // actions:
        handleMouseDownInternal,
    );
    const handleTouchStart            = useMergeEvents(
        // preserves the original `onTouchStart` from `props`:
        props.onTouchStart,
        
        
        
        // actions:
        handleMouseDownInternal,
    );
    const handleContextMenuInternal   = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented)               return; // the event was already handled by user => nothing to do
        if (event.target !== event.currentTarget) return; // only cancels the contextMenu at the <overlay>, allows at the <ModalUi>
        
        
        
        // actions:
        // cancel the contextMenu:
        event.preventDefault(); // handled
    });
    const handleContextMenu           = useMergeEvents(
        // preserves the original `onContextMenu` from `props`:
        props.onContextMenu,
        
        
        
        // actions:
        handleContextMenuInternal,
    );
    const handleAnimationStart        = useMergeEvents(
        // preserves the original `onAnimationStart`:
        props.onAnimationStart,
        
        
        
        // states:
        collapsibleState.handleAnimationStart,
    );
    const handleAnimationEnd          = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        collapsibleState.handleAnimationEnd,
    );
    const handleModalUiAnimationStart = useMergeEvents<React.AnimationEvent<HTMLElement & SVGElement>>(
        // preserves the original `onAnimationStart` from `modalUiComponent`:
        modalUiComponent.props.onAnimationStart,
        
        
        
        // states:
        excitableState.handleAnimationStart,
    );
    const handleModalUiAnimationEnd   = useMergeEvents<React.AnimationEvent<HTMLElement & SVGElement>>(
        // preserves the original `onAnimationEnd` from `modalUiComponent`:
        modalUiComponent.props.onAnimationEnd,
        
        
        
        // states:
        excitableState.handleAnimationEnd,
    );
    
    
    
    // dom effects:
    
    // make sure the <Modal> is top_most (if there is multiple <Modal>s shown at the same time):
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!isExpanded) return; // <Modal> is not expanded => ignore
        
        
        
        // actions:
        ensureTopMost();
    }, [isExpanded]);
    
    // OBSOLETE: NOT RELIABLE:
    // // prevents the <viewport> from scrolling when in modal (blocking) mode:
    // useEffect(() => {
    //     // conditions:
    //     if (!viewportElm) return; // if undefined => server side => ignore
    //     if (!isModal)     return; // only modal (blocking) mode
    //     
    //     
    //     
    //     // setups:
    //     const normalizedViewportElm = (viewportElm === document.body) ? (document.scrollingElement ?? document.documentElement) : viewportElm;
    //     const scrollableElm         = normalizedViewportElm;
    //     const scrollableEvent       = (normalizedViewportElm === document.scrollingElement) ? document : normalizedViewportElm;
    //     
    //     const currentScrollTop      = scrollableElm.scrollTop;
    //     const currentScrollLeft     = scrollableElm.scrollLeft;
    //     
    //     const handlePreventScroll = (event: Event) => {
    //         if (event.target === scrollableEvent) { // only handle scroll on the viewport, ignores scroll bubbling from the children
    //             scrollableElm.scrollTop  = currentScrollTop;  // prevent from scrolling by keeping the initial scroll position
    //             scrollableElm.scrollLeft = currentScrollLeft; // prevent from scrolling by keeping the initial scroll position
    //         } // if
    //     };
    //     
    //     scrollableEvent.addEventListener('scroll', handlePreventScroll);
    //     
    //     
    //     
    //     // cleanups:
    //     return () => {
    //         scrollableEvent.removeEventListener('scroll', handlePreventScroll);
    //     };
    // }, [isModal, viewportElm]);
    
    // UPDATE: MORE RELIABLE:
    // prevents the <viewport> from scrolling when in modal (blocking) mode:
    useEffect(() => {
        // conditions:
        if (!viewportElm) return; // if undefined => server side => ignore
        if (!isModal)     return; // only modal (blocking) mode
        
        
        
        // setups:
        const normalizedViewportElm = (viewportElm === document.body) ? (document.scrollingElement ?? document.documentElement) : viewportElm;
        const scrollableElm         = normalizedViewportElm;
        
        const [isScrollableInline, isScrollableBlock] = (() => {
            if (scrollableElm === document.scrollingElement) {
                return [true, true];
            }
            else {
                const computedStyle = getComputedStyle(scrollableElm);
                return [
                    ['auto', 'scroll'].includes(computedStyle.overflowX),
                    ['auto', 'scroll'].includes(computedStyle.overflowY),
                ];
            } // if
        })();
        const classList = scrollableElm.classList;
        const backdropCounter : BackdropCounter = backdropCounterMap.get(scrollableElm) ?? (() => {
            const newBackdropCounter : BackdropCounter = { inline: 0, block: 0 };
            backdropCounterMap.set(scrollableElm, newBackdropCounter);
            return newBackdropCounter;
        })();
        
        // register the backdrop existance of current scrollableElm:
        if (isScrollableInline) backdropCounter.inline++;
        if (isScrollableBlock ) backdropCounter.block++;
        
        // applies the stylesheets when the counter is exactly 1:
        if (backdropCounter.inline === 1) classList.add(noScrollbarStyleSheet.noScrollbarInline, 'no-scrollbar-inline');
        if (backdropCounter.block  === 1) classList.add(noScrollbarStyleSheet.noScrollbarBlock , 'no-scrollbar-block' );
        
        
        
        // cleanups:
        return () => {
            // un-register the backdrop existance of current scrollableElm:
            if (isScrollableInline && (backdropCounter.inline >= 1)) backdropCounter.inline--;
            if (isScrollableBlock  && (backdropCounter.block  >= 1)) backdropCounter.block--;
            
            // un-applies the stylesheets when the counter is exactly 0:
            if (backdropCounter.inline === 0) classList.remove(noScrollbarStyleSheet.noScrollbarInline, 'no-scrollbar-inline');
            if (backdropCounter.block  === 0) classList.remove(noScrollbarStyleSheet.noScrollbarBlock , 'no-scrollbar-block' );
        };
    }, [isModal, viewportElm]);
    
    
    
    // watchdog update of <viewport>'s scrolling position to compensate <Backdrop> shifting:
    // TODO: the backdrop having a "jitter effect" when the <viewport> is scrolled quickly, it need to be fixed.
    
    // features:
    const {backdropVars} = usesBackdrop();
    
    useEffect(() => {
        // conditions:
        if (!viewportElm) return; // if undefined => server side => ignore
        if (!isModal)     return; // only modal (blocking) mode
        const backdropElm = backdropRefInternal.current as HTMLElement|null;
        if (!backdropElm) return; // no backdrop => ignore
        
        
        
        // setups:
        const normalizedViewportElm = (viewportElm === document.body) ? (document.scrollingElement ?? document.documentElement) : viewportElm;
        const scrollableElm         = normalizedViewportElm;
        const scrollableEvent       = (normalizedViewportElm === document.scrollingElement) ? document : normalizedViewportElm;
        
        const isLocalBackdrop       = (scrollableElm !== document.scrollingElement);
        
        const backdropStyle         = backdropElm.style;
        
        const handleUpdateScroll = (event?: Event) => {
            // conditions:
            if (event && (event.target !== scrollableEvent)) return; // ignores scroll bubbling from the children
            
            
            
            // actions:
            const scrollTop  = isLocalBackdrop ? scrollableElm.scrollTop  : 0;
            const scrollLeft = isLocalBackdrop ? scrollableElm.scrollLeft : 0;
            
            
            backdropStyle.setProperty(
                backdropVars.scrollTop
                .slice(4, -1) // fix: var(--customProp) => --customProp
                ,
                `${scrollTop}px`
            );
            backdropStyle.setProperty(
                backdropVars.scrollLeft
                .slice(4, -1) // fix: var(--customProp) => --customProp
                ,
                `${scrollLeft}px`
            );
        };
        handleUpdateScroll(); // the initial update
        
        if (isLocalBackdrop) scrollableEvent.addEventListener('scroll', handleUpdateScroll);
        
        
        
        // cleanups:
        return () => {
            if (isLocalBackdrop) scrollableEvent.removeEventListener('scroll', handleUpdateScroll);
        };
    }, [isModal, viewportElm]);
    
    // stops the excited state when modal is closed:
    useEffect(() => {
        // conditions:
        if (isExpanded) return; // <Modal> is still shown => ignore
        if (!excitedDn) return; // <Modal> is not excited => ignore
        
        
        
        // actions:
        setExcitedDn(false);
    }, [isExpanded, excitedDn]);
    
    // watch [esc] key globally, when non modal (interactive|hidden) mode:
    useEffect(() => {
        // conditions:
        if (!isExpanded) return; // <Modal> is not expanded => ignore
        
        
        
        // handlers:
        const handleKeyDown = (event: KeyboardEvent) => {
            // conditions:
            if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
            
            /* note: the `code` may `undefined` on autoComplete */
            const keyCode = (event.code as string|undefined)?.toLowerCase();
            if (!keyCode) return; // ignores [unidentified] key
            
            
            
            if ((keyCode === 'escape')) {
                // [esc] key pressed => request to hide the <Modal>:
                handleExpandedChange?.({ expanded: false, actionType: 'shortcut' } as TModalExpandedChangeEvent);
                // event.preventDefault(); // no need to mark as handled, because it's a global event
            } // if
        };
        
        
        
        // setups:
        document.addEventListener('keydown', handleKeyDown);
        
        
        
        // cleanups:
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isExpanded, handleExpandedChange]);
    
    
    
    // jsx:
    if (!portalElm) return null; // server side -or- client side but not already hydrated => nothing to render
    return createPortal( // workaround for zIndex stacking context
        <Generic<TElement>
            // other props:
            {...restGenericProps}
            
            
            
            // refs:
            elmRef={mergedBackdropRef}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag  ?? ''      } // no corresponding semantic tag => defaults to <div> // NOTE: we don't use <dialog> as the default semantic tag because our <Modal> is similar to <dialog>::backdrop, not the <dialog> itself
            semanticRole = {props.semanticRole ?? 'dialog'} // uses [role="dialog"] as the default semantic role
            
            aria-modal={props['aria-modal'] ?? (isModal || undefined)}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            stateClasses={stateClasses}
            
            
            
            // handlers:
            onKeyDown        = {handleKeyDown       }
            onMouseDown      = {handleMouseDown     }
            onTouchStart     = {handleTouchStart    }
            onContextMenu    = {handleContextMenu   }
            onAnimationStart = {handleAnimationStart}
            onAnimationEnd   = {handleAnimationEnd  }
        >
            {
                // {/* *hack*: <NoParentScroll> */}
                // {isModal /* only modal (blocking) mode */ && <div ref={noParentScrollRefInternal} aria-hidden='true' className='noParentScroll'></div>}
            }
            
            {/* <ModalUi> */}
            {(!lazy || isVisible) && React.cloneElement<GenericProps<Element> & React.RefAttributes<Element> & React.HTMLAttributes<Element>>(modalUiComponent,
                // props:
                {
                    // refs:
                    [isReusableUiModalComponent ? 'elmRef' : 'ref'] : mergedModalUiRef,
                    
                    
                    
                    // classes:
                    ...(isReusableUiModalComponent ? {
                        classes      : modalUiClasses,
                    } : {
                        className    : modalUiClasses.filter((c) => !!c).join(' '),
                    }),
                    
                    
                    
                    // accessibilities:
                    tabIndex         : (modalUiComponent.props as React.HTMLAttributes<HTMLElement>).tabIndex ?? tabIndex,
                    
                    
                    
                    // [open]:
                    ...collapsibleState.props,
                    
                    
                    
                    // handlers:
                    onAnimationStart : handleModalUiAnimationStart,
                    onAnimationEnd   : handleModalUiAnimationEnd,
                },
            )}
        </Generic>
    , portalElm);
};
export {
    Modal,
    Modal as default,
}



export interface ModalComponentProps<TElement extends Element = HTMLElement, TModalExpandedChangeEvent extends ModalExpandedChangeEvent<any> = ModalExpandedChangeEvent<any>>
{
    // refs:
    modalRef       ?: React.Ref<TElement> // setter ref
    
    
    
    // variants:
    backdropStyle  ?: ModalProps<TElement, TModalExpandedChangeEvent>['backdropStyle']
    
    
    
    // global stackable:
    viewport       ?: ModalProps<TElement, TModalExpandedChangeEvent>['viewport']
    
    
    
    // components:
    modalComponent ?: React.ReactComponentElement<any, ModalProps<TElement, TModalExpandedChangeEvent>>
}
