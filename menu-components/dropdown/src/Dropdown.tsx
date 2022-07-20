// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // styles:
    style,
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
    isReusableUiComponent,
}                           from '@reusable-ui/utilities'       // common utility functions
import {
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import type {
    // react components:
    GenericProps,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // hooks:
    usesSizeVariant,
    OrientationName,
    OrientationVariantOptions,
    OrientationVariant,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    useActivePassiveState,
    ActiveChangeEvent,
    ToggleActiveProps,
}                           from '@reusable-ui/indicator'       // a base component
import {
    // types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    PopupPosition,
    PopupSide,
    
    
    
    // hooks:
    defaultOrientationRuleOptions,
    
    
    
    // styles:
    usesCollapseLayout,
    usesCollapseVariants,
    usesCollapseStates,
    
    
    
    // react components:
    CollapseProps,
    Collapse,
}                           from '@reusable-ui/collapse'        // a base component
import {
    // utilities:
    setFocusNext,
}                           from '@reusable-ui/modal'           // overlays a dialog to the entire site page



// hooks:

// layouts:

//#region orientation
export { defaultOrientationRuleOptions };
//#endregion orientation



// styles:
export const usesDropdownUiLayout = () => {
    return style({
        ...imports([
            // resets:
            stripoutFocusableElement(), // clear browser's default styles
        ]),
    });
};

export const useDropdownUiStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesDropdownUiLayout(),
    ]),
}), { specificityWeight: 0, id: 'g8pud07qti' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesDropdownLayout = (options?: OrientationVariantOptions) => {
    return style({
        ...imports([
            // layouts:
            usesCollapseLayout(options),
        ]),
        ...style({
            // layouts:
            display        : 'flex',   // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'column', // items are stacked vertically
            justifyContent : 'center', // center items (text, icon, etc) horizontally
            alignItems     : 'center', // center items (text, icon, etc) vertically
            flexWrap       : 'wrap',   // allows the items (text, icon, etc) to wrap to the next row if no sufficient width available
            
            
            
            // sizes:
            inlineSize     : 'fit-content',
            
            
            
            // customize:
            ...usesCssProps(dropdowns), // apply config's cssProps
        }),
    });
};
export const usesDropdownVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(dropdowns);
    
    
    
    return style({
        ...imports([
            // variants:
            usesCollapseVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
    });
};
export const usesDropdownStates = () => {
    return style({
        ...imports([
            // states:
            usesCollapseStates(),
        ]),
    });
};

export const useDropdownStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesDropdownLayout(),
        
        // variants:
        usesDropdownVariants(),
        
        // states:
        usesDropdownStates(),
    ]),
}), { id: 'q723ad22au' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [dropdowns, dropdownValues, cssDropdownConfig] = cssConfig(() => {
    return {
        // borders:
        boxShadow : [[0, 0, '10px', 'rgba(0,0,0,0.5)']] as CssKnownProps['boxShadow'],
    };
}, { prefix: 'ddwn' });



// utilities:
const isSelfOrDescendantOf = (element: Element, desired: Element): boolean => {
    let parent: Element|null = element;
    do {
        if (parent === desired) return true; // confirmed
        
        // let's try again:
        parent = parent.parentElement;
    } while (parent);
    
    
    
    return false; // not the descendant of desired
};



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
export interface DropdownActiveChangeEvent extends ActiveChangeEvent {
    actionType : DropdownActionType
}

export interface DropdownProps<TElement extends Element = HTMLElement, TDropdownActiveChangeEvent extends DropdownActiveChangeEvent = DropdownActiveChangeEvent>
    extends
        // bases:
        Omit<CollapseProps<TElement>,
            // children:
            |'children' // we redefined `children` prop as a <DropdownUi> component
        >,
        
        // accessibilities:
        Pick<ToggleActiveProps<TDropdownActiveChangeEvent>, 'onActiveChange'>,
        
        // components:
        DropdownUiComponentProps<Element>
{
}
const Dropdown = <TElement extends Element = HTMLElement, TDropdownActiveChangeEvent extends DropdownActiveChangeEvent = DropdownActiveChangeEvent>(props: DropdownProps<TElement, TDropdownActiveChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet         = useDropdownStyleSheet();
    const uiStyleSheet       = useDropdownUiStyleSheet();
    
    
    
    // variants:
    const isOrientationBlock = ((props.orientation ?? defaultOrientationRuleOptions.defaultOrientation) === 'block');
    
    
    
    // states:
    
    // accessibilities:
    const activePassiveState = useActivePassiveState<TElement>(props);
    const isActive           = activePassiveState.active;
    
    
    
    // rest props:
    const {
        // accessibilities:
        onActiveChange,
        
        
        
        // components:
        tabIndex,
        children: dropdownUiComponent,
    ...restCollapseProps} = props;
    
    
    
    // verifies:
    React.Children.only(dropdownUiComponent);
    const isReusableUiDropdownComponent : boolean = isReusableUiComponent(dropdownUiComponent);
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
    const prevFocusRef          = useRef<Element|null>(null);
    
    
    
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
    const handleActiveChange    = onActiveChange;
    const handleKeyDownInternal = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        if (((): boolean => {
            const isKeyOf = (key: string): boolean => {
                return ((event.key.toLowerCase() === key) || (event.code.toLowerCase() === key));
            };
            
            
            
            if (isKeyOf('escape')) {
                // [esc] key pressed => request to hide the <Dropdown>:
                handleActiveChange?.({ newActive: false, actionType: 'shortcut' } as TDropdownActiveChangeEvent);
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
    }, [handleActiveChange]);
    const handleKeyDown         = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // range handlers:
        handleKeyDownInternal,
    );
    const handleAnimationEnd    = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        
        // accessibilities:
        activePassiveState.handleAnimationEnd,
    );
    
    
    
    // dom effects:
    
    // set focus on <DropdownUi> each time it shown:
    useEffect(() => {
        // setups:
        if (isActive) {
            // backup the current focused element (if any):
            prevFocusRef.current = document.activeElement;
            
            // when actived => focus the <DropdownUi>, so the user able to use [esc] key to close the <Dropdown>:
            (dropdownUiRefInternal.current as HTMLElement|SVGElement|null)?.focus({ preventScroll: true });
        }
        else {
            // restore the previously focused element (if any):
            (prevFocusRef.current as HTMLElement|SVGElement|null)?.focus({ preventScroll: true });
            prevFocusRef.current = null; // unreference the restored focused element
        } // if
    }, [isActive]);
    
    // watch an onClick|onBlur event *outside* the <DropdownUi> each time it shown:
    useEffect(() => {
        // conditions:
        if (!isActive)           return; // <Dropdown> is not shown => nothing to do
        if (!handleActiveChange) return; // [onActiveChange] was not set => nothing to do
        
        
        
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
            if ((focusedTarget instanceof Element) && dropdownUi && isSelfOrDescendantOf(focusedTarget, dropdownUi)) return; // focus is still inside <Dropdown> => nothing to do
            
            
            
            // `targetRef` is <Dropdown>'s friend, so focus on `targetRef` is considered not to lost focus on <Dropdown>:
            const target = (props.targetRef instanceof Element) ? props.targetRef : props.targetRef?.current;
            if ((focusedTarget instanceof Element) && target && isSelfOrDescendantOf(focusedTarget, target)) return;
            
            
            
            // focus is outside of <Dropdown> => <Dropdown> lost focus => request to hide the <Dropdown>:
            handleActiveChange?.({ newActive: false, actionType: 'blur' } as TDropdownActiveChangeEvent);
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
    }, [isActive, props.targetRef, handleActiveChange]);
    
    
    
    // jsx:
    return (
        <Collapse<TElement>
            // other props:
            {...restCollapseProps}
            
            
            
            // variants:
            nude={props.nude ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // popups:
            popupPlacement={props.popupPlacement ?? (isOrientationBlock ? 'bottom' : 'right')}
            popupAutoFlip={props.popupAutoFlip ?? true}
            popupAutoShift={props.popupAutoShift ?? true}
            
            
            
            // handlers:
            onKeyDown={handleKeyDown}
            onAnimationEnd={handleAnimationEnd}
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
    );
};
export {
    Dropdown,
    Dropdown as default,
}

export type { OrientationName, OrientationVariant }

export type { PopupPlacement, PopupMiddleware, PopupStrategy, PopupPosition, PopupSide }



export interface DropdownComponentProps<TElement extends Element = HTMLElement, TDropdownActiveChangeEvent extends DropdownActiveChangeEvent = DropdownActiveChangeEvent>
{
    // refs:
    dropdownRef         ?: React.Ref<TElement> // setter ref
    
    
    
    // layouts:
    dropdownOrientation ?: OrientationName
    
    
    
    // components:
    dropdownComponent   ?: React.ReactComponentElement<any, DropdownProps<TElement, TDropdownActiveChangeEvent>>
}
