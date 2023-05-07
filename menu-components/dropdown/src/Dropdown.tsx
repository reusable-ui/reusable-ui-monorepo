// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
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
    
    
    
    // react helper hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    
    
    
    // focusing functions:
    setFocusNext,
    
    
    
    // a capability of UI to stack on top-most of another UI(s) regardless of DOM's stacking context:
    StackableProps,
    useStackable,
    
    
    
    // a capability of UI to rotate its layout:
    useOrientationable,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
    useCollapsible,
    ToggleCollapsibleProps,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import type {
    // react components:
    GenericProps,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // react components:
    CollapseProps,
    Collapse,
}                           from '@reusable-ui/collapse'        // a base component

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from './defaults.js'



// styles:
export const useDropdownUiStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/dropdownUiStyles.js')
, { specificityWeight: 0, id: 'g8pud07qti' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names

export const useDropdownStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/dropdownStyles.js')
, { id: 'q723ad22au' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:

export interface DropdownUiComponentProps<TElement extends Element = HTMLElement>
    extends
        // accessibilities:
        Pick<React.HTMLAttributes<HTMLElement>, 'tabIndex'>
{
    // components:
    children : React.ReactElement<GenericProps<TElement>|React.HTMLAttributes<HTMLElement>|React.SVGAttributes<SVGElement>>
}

export type DropdownActionType = 'shortcut'|'blur'|'ui'|{}
export interface DropdownExpandedChangeEvent extends ExpandedChangeEvent {
    actionType : DropdownActionType
}

export interface DropdownProps<TElement extends Element = HTMLElement, TDropdownExpandedChangeEvent extends DropdownExpandedChangeEvent = DropdownExpandedChangeEvent>
    extends
        // bases:
        Omit<CollapseProps<TElement, TDropdownExpandedChangeEvent>,
            // children:
            |'children' // we redefined `children` prop as a <DropdownUi> component
        >,
        
        // capabilities:
        StackableProps,
        
        // states:
        Pick<ToggleCollapsibleProps<TDropdownExpandedChangeEvent>,
            |'onExpandedChange' // implements `onExpandedChange` (implements controllable only, uncontrollable is not implemented)
        >,
        
        // components:
        DropdownUiComponentProps<Element>
{
    // accessibilities:
    setFocus     ?: boolean
    restoreFocus ?: boolean
}
const Dropdown = <TElement extends Element = HTMLElement, TDropdownExpandedChangeEvent extends DropdownExpandedChangeEvent = DropdownExpandedChangeEvent>(props: DropdownProps<TElement, TDropdownExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet             = useDropdownStyleSheet();
    const uiStyleSheet           = useDropdownUiStyleSheet();
    
    
    
    // variants:
    const orientationableVariant = useOrientationable(props, defaultOrientationableOptions);
    const determineFloatingPlacement = () => {
        // TODO: RTL direction aware
        return orientationableVariant.isOrientationBlock ? 'bottom' : 'right';
    };
    
    
    
    // states:
    const collapsibleState       = useCollapsible<TElement, TDropdownExpandedChangeEvent>(props);
    const isExpanded             = collapsibleState.expanded;
    
    
    
    // capabilities:
    const {portalElm}            = useStackable(props);
    
    
    
    // rest props:
    const {
        // accessibilities:
        setFocus     = true,
        restoreFocus = true,
        
        
        
        // states:
        onExpandedChange,
        floatingMiddleware,
        
        
        
        // stackable:
        viewport     : _viewport, // remove
        
        
        
        // components:
        tabIndex,
        children: dropdownUiComponent,
    ...restCollapseProps} = props;
    
    
    
    // verifies:
    React.Children.only(dropdownUiComponent);
    const isReusableUiDropdownComponent : boolean = isReusableUiComponent<GenericProps<Element>>(dropdownUiComponent);
    if (!isReusableUiDropdownComponent && !React.isValidElement<GenericProps<Element>|React.HTMLAttributes<HTMLElement>|React.SVGAttributes<SVGElement>>(dropdownUiComponent)) throw Error('Invalid child element.');
    
    
    
    // refs:
    const dropdownUiRefInternal = useRef<Element|null>(null);
    const mergedDropdownUiRef   = useMergeRefs(
        // preserves the original `ref` from `dropdownUiComponent`:
        (
            isReusableUiDropdownComponent
            ?
            (dropdownUiComponent.props as GenericProps<Element>).elmRef
            :
            (dropdownUiComponent.props as React.RefAttributes<Element>).ref
        ),
        
        
        
        dropdownUiRefInternal,
    );
    
    
    
    // classes:
    const dropdownUiClasses = useMergeClasses(
        // preserves the original `classes` from `dropdownUiComponent`:
        (
            isReusableUiDropdownComponent
            ?
            (dropdownUiComponent.props as GenericProps<Element>).classes
            :
            ((dropdownUiComponent.props as React.HTMLAttributes<HTMLElement>|React.SVGAttributes<SVGElement>).className ?? '').split(' ')
        ),
        
        
        
        // styles:
        uiStyleSheet.main,
    );
    
    
    
    // handlers:
    const handleExpandedChange  = onExpandedChange;
    const handleKeyDownInternal = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        /* note: the `code` may `undefined` on autoComplete */
        const keyCode = (event.code as string|undefined)?.toLowerCase();
        if (!keyCode) return; // ignores [unidentified] key
        
        
        
        if (((): boolean => {
            if ((keyCode === 'escape')) {
                // [esc] key pressed => request to hide the <Dropdown>:
                handleExpandedChange?.({ expanded: false, actionType: 'shortcut' } as TDropdownExpandedChangeEvent);
            }
            else if ((keyCode === 'tab'))
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
    const handleKeyDown         = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // actions:
        handleKeyDownInternal,
    );
    const handleAnimationStart  = useMergeEvents(
        // preserves the original `onAnimationStart`:
        props.onAnimationStart,
        
        
        
        // states:
        collapsibleState.handleAnimationStart,
    );
    const handleAnimationEnd    = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        collapsibleState.handleAnimationEnd,
    );
    
    
    
    // dom effects:
    
    // set focus on <DropdownUi> each time it shown:
    useEffect(() => {
        // setups:
        if (isExpanded) {
            // when shown => focus the <DropdownUi>, so the user able to use [esc] key to close the <Dropdown>:
            if (setFocus) {
                (dropdownUiRefInternal.current as HTMLElement|SVGElement|null)?.focus({ preventScroll: true });
            } // if
        }
        else {
            // if current focused element is inside the <Dropdown> or inside the <floatingOn> => back focus to <floatingOn>:
            const target = (props.floatingOn instanceof Element) ? props.floatingOn : props.floatingOn?.current;
            if (restoreFocus && target && (target as HTMLElement|SVGElement).focus) {
                setTimeout(() => {
                    // conditions:
                    const focusedElm = document.activeElement;
                    if (!focusedElm) return; // nothing was focused => nothing to do
                    
                    const dropdownUi = dropdownUiRefInternal.current;
                    if (                                    // neither
                        !(dropdownUi?.contains(focusedElm)) // the current focused element is inside the <Dropdown>
                        &&                                  // nor
                        !target.contains(focusedElm)        // the current focused element is inside the <floatingOn>
                    ) return;                               // => nothing to focus
                    
                    
                    
                    // restore the previously focused element (if any):
                    (target as HTMLElement|SVGElement).focus({ preventScroll: true });
                }, 0); // wait until the user decided to change the focus to another <element>
            } // if
        } // if
    }, [isExpanded, props.floatingOn, setFocus, restoreFocus]);
    
    // watch an onClick|onBlur event *outside* the <DropdownUi> each time it shown:
    useEffect(() => {
        // conditions:
        if (!isExpanded)           return; // <Dropdown> is not shown => nothing to do
        if (!handleExpandedChange) return; // [onExpandedChange] was not set => nothing to do
        
        
        
        // handlers:
        const handleMouseDown = (event: MouseEvent): void => {
            // conditions:
            if (event.button !== 0) return; // only handle left click
            
            
            
            // although clicking on page won't change the focus, but we decided this event as lost focus on <Dropdown>:
            handleFocus({ target: event.target } as FocusEvent);
        };
        const handleFocus     = (event: FocusEvent): void => {
            const focusedTarget = event.target;
            if (!focusedTarget) return;
            
            
            
            // check if focusedTarget is inside the <Dropdown> or not:
            const dropdownUi = dropdownUiRefInternal.current;
            if ((focusedTarget instanceof Element) && dropdownUi?.contains(focusedTarget)) return; // focus is still inside <Dropdown> => nothing to do
            
            
            
            // <floatingOn> is <Dropdown>'s friend, so focus on <floatingOn> is considered not to lost focus on <Dropdown>:
            const target = (props.floatingOn instanceof Element) ? props.floatingOn : props.floatingOn?.current;
            if ((focusedTarget instanceof Element) && target?.contains(focusedTarget)) return;
            
            
            
            // focus is outside of <Dropdown> => <Dropdown> lost focus => request to hide the <Dropdown>:
            handleExpandedChange?.({ expanded: false, actionType: 'blur' } as TDropdownExpandedChangeEvent);
        };
        
        
        
        // setups:
        const asyncPerformAttachEvents = setTimeout(() => { // wait until the triggering <Dropdown>.open() event is fully fired, so it won't immediately trigger <Dropdown>.close()
            document.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('focus'    , handleFocus    , { capture: true }); // force `focus` as bubbling
        }, 0);
        
        
        
        // cleanups:
        return () => {
            clearTimeout(asyncPerformAttachEvents);
            
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('focus'    , handleFocus    , { capture: true });
        };
    }, [isExpanded, props.floatingOn, handleExpandedChange]);
    
    
    
    // jsx:
    if (!portalElm) return null; // server side -or- client side but not already hydrated => nothing to render
    return createPortal( // workaround for zIndex stacking context
        <Collapse<TElement, TDropdownExpandedChangeEvent>
            // other props:
            {...restCollapseProps}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? 'dialog'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // floatable:
            floatingPlacement ={props.floatingPlacement ?? determineFloatingPlacement()}
            floatingAutoFlip  ={props.floatingAutoFlip  ?? true}
            floatingAutoShift ={props.floatingAutoShift ?? true}
            
            
            
            // handlers:
            onKeyDown        = {handleKeyDown       }
            onAnimationStart = {handleAnimationStart}
            onAnimationEnd   = {handleAnimationEnd  }
        >
            {/* <DropdownUi> */}
            {React.cloneElement<GenericProps<Element> & React.RefAttributes<Element> & React.HTMLAttributes<Element>>(dropdownUiComponent,
                // props:
                {
                    // refs:
                    [isReusableUiDropdownComponent ? 'elmRef' : 'ref'] : mergedDropdownUiRef,
                    
                    
                    
                    // classes:
                    ...(isReusableUiDropdownComponent ? {
                        classes      : dropdownUiClasses,
                    } : {
                        className    : dropdownUiClasses.filter((c) => !!c).join(' '),
                    }),
                    
                    
                    
                    // accessibilities:
                    tabIndex : (dropdownUiComponent.props as React.HTMLAttributes<HTMLElement>).tabIndex ?? tabIndex,
                },
            )}
        </Collapse>
    , portalElm);
};
export {
    Dropdown,
    Dropdown as default,
}



export interface DropdownComponentProps<TElement extends Element = HTMLElement, TDropdownExpandedChangeEvent extends DropdownExpandedChangeEvent = DropdownExpandedChangeEvent>
{
    // refs:
    dropdownRef         ?: React.Ref<TElement> // setter ref
    
    
    
    // variants:
    dropdownOrientation ?: DropdownProps<TElement, TDropdownExpandedChangeEvent>['orientation']
    
    
    
    // components:
    dropdownComponent   ?: React.ReactComponentElement<any, DropdownProps<TElement, TDropdownExpandedChangeEvent>>
}
