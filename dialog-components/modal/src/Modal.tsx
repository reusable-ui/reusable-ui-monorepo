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
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a set of React node utility functions:
    isReusableUiComponent,
    
    
    
    // focusing functions:
    setFocusNext,
    
    
    
    // react helper hooks:
    useTriggerRender,
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    
    
    
    // a set of client-side functions:
    isClientSide,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
    CollapsibleProps,
    useCollapsible,
    ToggleCollapsibleProps,
    
    
    
    // a capability of UI to highlight itself to attract user's attention:
    ExcitedChangeEvent,
    useToggleExcitable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a generic component

// internals:
import {
    // variants:
    BackdropVariant,
    useBackdropVariant,
}                           from './variants/BackdropVariant.js'
import {
    // utilities:
    getViewportOrDefault,
}                           from './utilities.js'



// styles:
export const useModalUiStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/modalUiStyles.js')
, { specificityWeight: 0, id: 'u4teynvq1y' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names

export const useBackdropStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/backdropStyles.js')
, { id: 'z26pqrin5i' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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
export interface ModalExpandedChangeEvent extends ExpandedChangeEvent {
    actionType : ModalActionType
}

export interface ModalProps<TElement extends Element = HTMLElement, TModalExpandedChangeEvent extends ModalExpandedChangeEvent = ModalExpandedChangeEvent>
    extends
        // bases:
        Omit<GenericProps<TElement>,
            // children:
            |'children' // we redefined `children` prop as a <ModalUi> component
        >,
        
        // states:
        CollapsibleProps<TModalExpandedChangeEvent>,
        Pick<ToggleCollapsibleProps<TModalExpandedChangeEvent>,
            |'onExpandedChange' // implements `onExpandedChange` (implements controllable only, uncontrollable is not implemented)
        >,
        
        // variants:
        BackdropVariant,
        
        // components:
        ModalUiComponentProps<Element>
{
    // accessibilities:
    setFocus         ?: boolean
    restoreFocus     ?: boolean
    
    
    
    // behaviors:
    lazy             ?: boolean
    
    
    
    // modals:
    modalViewport    ?: React.RefObject<Element>|Element|null // getter ref
    
    
    
    // handlers:
    onFullyExpanded  ?: () => void
    onFullyCollapsed ?: () => void
    /**
     * @deprecated renamed to `onFullyExpanded`
     */
    onFullyOpened    ?: () => void
    /**
     * @deprecated renamed to `onFullyCollapsed`
     */
    onFullyClosed    ?: () => void
}
const Modal = <TElement extends Element = HTMLElement, TModalExpandedChangeEvent extends ModalExpandedChangeEvent = ModalExpandedChangeEvent>(props: ModalProps<TElement, TModalExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet      = useBackdropStyleSheet();
    const uiStyleSheet    = useModalUiStyleSheet();
    
    
    
    // variants:
    const backdropVariant = useBackdropVariant(props);
    
    
    
    // rest props:
    const {
        // variants:
        backdropStyle = 'regular',
        
        
        
        // accessibilities:
        setFocus      = true,
        restoreFocus  = true,
        
        
        
        // behaviors:
        lazy          = false,
        
        
        
        // states:
        expanded      : _expanded, // remove
        onExpandedChange,
        
        
        
        // modals:
        modalViewport,
        
        
        
        // components:
        tabIndex,
        children      : modalUiComponent,
        
        
        
        // handlers:
        // @ts-ignore
        onFullyOpened,
        // @ts-ignore
        onFullyClosed,
        onFullyExpanded  = onFullyOpened,
        onFullyCollapsed = onFullyClosed,
    ...restGenericProps} = props;
    
    
    
    // states:
    const collapsibleState = useCollapsible<TElement, TModalExpandedChangeEvent>(props);
    const isVisible        = collapsibleState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    const isExpanded       = collapsibleState.expanded;
    const isModal          = isVisible && !['hidden', 'interactive'].includes(backdropStyle);
    
    const [excitedDn, setExcitedDn] = useState(false);
    const handleExcitedChange       = useEvent<EventHandler<ExcitedChangeEvent>>((event) => {
        setExcitedDn(event.excited);
    });
    const excitableState            = useToggleExcitable<HTMLElement|SVGElement>({ excited: excitedDn, onExcitedChange: handleExcitedChange });
    
    
    
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
                    ((event.target as any)?.tagName === 'TEXTAREA')
                    ||
                    (
                        ((event.target as any)?.tagName === 'INPUT')
                        &&
                        !['color', 'file'].includes((event.target as any)?.type ?? '')
                    )
                ) {
                    return false; // do not handle [navigation] keys if the event coming from <TextEditor>|<Range>
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
                    ((event.target as any)?.tagName === 'TEXTAREA')
                    ||
                    (
                        ((event.target as any)?.tagName === 'INPUT')
                        &&
                        !['color', 'file', 'range'].includes((event.target as any)?.type ?? '')
                    )
                ) {
                    return false; // do not handle [space] key if the event coming from <TextEditor>
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
        if (event.defaultPrevented)               return; // the event was already handled by user => nothing to do
        if (event.target !== event.currentTarget) return; // ignore bubbling from <ModalUi>
        
        
        
        // actions:
        if (backdropStyle === 'static') {
            setExcitedDn(true); // make <ModalUi> blinking
            if (setFocus) {
                (modalUiRefInternal.current as HTMLElement|SVGElement|null)?.focus({ preventScroll: true }); // re-focus to the <ModalUi>, so the focus is trapped inside the <Modal>
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
    
    // set focus on <ModalUi> each time it shown:
    useEffect(() => {
        // setups:
        if (isExpanded) {
            // backup the current focused element (if any):
            prevFocusRef.current = document.activeElement;
            
            // when shown => focus the <ModalUi>, so the user able to use [esc] key to close the <Modal>:
            if (setFocus) {
                (modalUiRefInternal.current as HTMLElement|SVGElement|null)?.focus({ preventScroll: true });
            } // if
        }
        else {
            // if current focused element is inside the <Modal> => back focus to <prevFocusRef>:
            const prevFocusElm = prevFocusRef.current;
            if (restoreFocus && prevFocusElm && (prevFocusElm as HTMLElement|SVGElement).focus) {
                setTimeout(() => {
                    // conditions:
                    const focusedElm = document.activeElement;
                    if (!focusedElm) return; // nothing was focused => nothing to do
                    
                    const modalUi = modalUiRefInternal.current;
                    if (                                 // neither
                        !(modalUi?.contains(focusedElm)) // the current focused element is inside the <Modal>
                    ) return;                            // => nothing to focus
                    
                    
                    
                    // restore the previously focused element (if any):
                    (prevFocusElm as HTMLElement|SVGElement).focus({ preventScroll: true });
                }, 0); // wait until the user decided to change the focus to another <element>
            } // if
            
            
            
            // unreference the restored focused element:
            prevFocusRef.current = null;
        } // if
    }, [isExpanded, setFocus, restoreFocus]);
    
    // prevent the <viewport> from scrolling when in modal (blocking) mode:
    useEffect(() => {
        // conditions:
        if (!isModal) return; // only modal (blocking) mode
        
        
        
        // setups:
        const viewportElm         = getViewportOrDefault(modalViewport);
        
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
    }, [isModal, modalViewport]);
    
    // delays the rendering of portal until the page is fully hydrated
    const [triggerRender] = useTriggerRender();
    useEffect(() => {
        // conditions:
        if (!isClientSide) return; // client side only, server side => ignore
        
        
        
        // setups:
        const viewportElm = getViewportOrDefault(modalViewport);
        const portalElm = document.createElement('div');
        viewportElm.appendChild(portalElm);
        portalRefInternal.current = portalElm;
        
        triggerRender(); // re-render with hydrated version
        
        
        
        // cleanups:
        return () => {
            viewportElm.removeChild(portalElm);
            portalRefInternal.current = null;
        };
    }, [modalViewport]);
    
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
    
    const isFullyExpanded : boolean|null = (
        isExpanded
        ? (( collapsibleState.class === 'expanded') ? true  : null) // fully expanded
        : ((!collapsibleState.class               ) ? false : null) // fully collapsed
    );
    const wasFullyExpanded = useRef<boolean|null>(isFullyExpanded);
    useEffect(() => {
        // conditions:
        if (wasFullyExpanded.current === isFullyExpanded) return; // no change => ignore
        wasFullyExpanded.current = isFullyExpanded; // sync the last change
        
        
        
        // actions:
        if (isFullyExpanded === true) {
            if (onFullyExpanded)  setTimeout(() => onFullyExpanded(), 0);  // trigger event at the next macroTask -- wrapped with arrowFunc to avoid `this` context problem
        }
        else if (isFullyExpanded === false) {
            if (onFullyCollapsed) setTimeout(() => onFullyCollapsed(), 0); // trigger event at the next macroTask -- wrapped with arrowFunc to avoid `this` context problem
        } // if
    }, [isFullyExpanded, onFullyExpanded, onFullyCollapsed]);
    
    
    
    // jsx:
    const portalElm = portalRefInternal.current;
    if (!portalElm) return null; // server side -or- client side but not already hydrated => nothing to render
    return createPortal( // workaround for zIndex stacking context
        <Generic<TElement>
            // other props:
            {...restGenericProps}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? 'dialog'}
            
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
            {/* *hack*: <NoParentScroll> */}
            <div className='noParentScroll'></div>
            
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



export interface ModalComponentProps<TElement extends Element = HTMLElement, TModalExpandedChangeEvent extends ModalExpandedChangeEvent = ModalExpandedChangeEvent>
{
    // refs:
    modalRef       ?: React.Ref<TElement> // setter ref
    
    
    
    // variants:
    backdropStyle  ?: ModalProps<TElement, TModalExpandedChangeEvent>['backdropStyle']
    
    
    
    // modals:
    modalViewport  ?: ModalProps<TElement, TModalExpandedChangeEvent>['modalViewport']
    
    
    
    // components:
    modalComponent ?: React.ReactComponentElement<any, ModalProps<TElement, TModalExpandedChangeEvent>>
}
