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
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // styles:
    stripoutFocusableElement,
}                           from '@reusable-ui/stripouts'       // removes browser's default stylesheet
import {
    // utilities:
    isReusableUiComponent,
}                           from '@reusable-ui/utilities'       // common utility functions
import {
    // utilities:
    setFocusNext,
    isSelfOrDescendantOf,
}                           from '@reusable-ui/focuses'         // focusing functions
import {
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui variants:
import {
    // hooks:
    OrientationableOptions,
    useOrientationable,
}                           from '@reusable-ui/orientationable' // a capability of UI to rotate its layout

// reusable-ui states:
import {
    // hooks:
    ExpandedChangeEvent,
    useCollapsible,
    ToggleCollapsibleProps,
}                           from '@reusable-ui/collapsible'     // a capability of UI to expand/reduce its size or toggle the visibility

// reusable-ui components:
import type {
    // react components:
    GenericProps,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // hooks:
    defaultOrientationableOptions,
    
    
    
    // styles:
    usesCollapseLayout,
    usesCollapseStates,
    
    
    
    // react components:
    CollapseProps,
    Collapse,
}                           from '@reusable-ui/collapse'        // a base component



// defaults:
export { defaultOrientationableOptions };



// styles:
export const usesDropdownUiLayout = () => {
    return style({
        ...imports([
            // resets:
            stripoutFocusableElement(), // clear browser's default styles
        ]),
        ...style({
            // customize:
            ...usesCssProps(usesPrefixedProps(dropdowns, 'dropdownUi')), // apply config's cssProps starting with dropdownUi***
        }),
    });
};

export const useDropdownUiStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesDropdownUiLayout(),
    ]),
}), { specificityWeight: 0, id: 'g8pud07qti' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesDropdownLayout = (options?: OrientationableOptions) => {
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
export const usesDropdownStates = () => {
    return style({
        ...imports([
            // states:
            usesCollapseStates(),
        ]),
    });
};

export const useDropdownStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesDropdownLayout(),
        
        // states:
        usesDropdownStates(),
    ]),
}), { id: 'q723ad22au' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [dropdowns, dropdownValues, cssDropdownConfig] = cssConfig(() => {
    return {
        // borders:
        // dropdownUiBoxShadow : [[0, 0, '10px', 'rgba(0,0,0,0.5)']] as CssKnownProps['boxShadow'], // doesn't work perfectly with borderRadius
        filter: [
            ['drop-shadow(', 0, 0, '10px', 'rgba(0,0,0,0.5)', ')'],
        ] as CssKnownProps['filter'],
    };
}, { prefix: 'ddwn' });



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
        
        // states:
        Pick<ToggleCollapsibleProps<TDropdownExpandedChangeEvent>,
            |'onExpandedChange' // implements `onExpandedChange` (implements controllable only, uncontrollable is not implemented)
        >,
        
        // components:
        DropdownUiComponentProps<Element>
{
}
const Dropdown = <TElement extends Element = HTMLElement, TDropdownExpandedChangeEvent extends DropdownExpandedChangeEvent = DropdownExpandedChangeEvent>(props: DropdownProps<TElement, TDropdownExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet             = useDropdownStyleSheet();
    const uiStyleSheet           = useDropdownUiStyleSheet();
    
    
    
    // variants:
    const orientationableVariant = useOrientationable(props, defaultOrientationableOptions);
    
    
    
    // states:
    const collapsibleState       = useCollapsible<TElement, TDropdownExpandedChangeEvent>(props);
    const isExpanded             = collapsibleState.expanded;
    
    
    
    // rest props:
    const {
        // states:
        onExpandedChange,
        
        
        
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
        
        
        
        if (((): boolean => {
            const isKeyOf = (key: string): boolean => {
                return ((event.key.toLowerCase() === key) || (event.code.toLowerCase() === key));
            };
            
            
            
            if (isKeyOf('escape')) {
                // [esc] key pressed => request to hide the <Dropdown>:
                handleExpandedChange?.({ expanded: false, actionType: 'shortcut' } as TDropdownExpandedChangeEvent);
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
    }, [handleExpandedChange]);
    const handleKeyDown         = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // actions:
        handleKeyDownInternal,
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
            (dropdownUiRefInternal.current as HTMLElement|SVGElement|null)?.focus({ preventScroll: true });
        }
        else {
            // if current focused element is inside the <Dropdown> or inside the <floatingOn> => back focus to <floatingOn>:
            const target = (props.floatingOn instanceof Element) ? props.floatingOn : props.floatingOn?.current;
            if (target && (target as HTMLElement|SVGElement).focus) {
                setTimeout(() => {
                    // conditions:
                    const focusedElm = document.activeElement;
                    if (!focusedElm) return; // nothing was focused => nothing to do
                    
                    const dropdownUi = dropdownUiRefInternal.current;
                    if (                                                              // neither
                        !(dropdownUi && isSelfOrDescendantOf(focusedElm, dropdownUi)) // the current focused element is inside the <Dropdown>
                        &&                                                            // nor
                        !isSelfOrDescendantOf(focusedElm, target)                     // the current focused element is inside the <floatingOn>
                    ) return;                                                         // => nothing to focus
                    
                    
                    
                    // restore the previously focused element (if any):
                    (target as HTMLElement|SVGElement).focus({ preventScroll: true });
                }, 0); // wait until the user decided to change the focus to another <element>
            } // if
        } // if
    }, [isExpanded, props.floatingOn]);
    
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
            if ((focusedTarget instanceof Element) && dropdownUi && isSelfOrDescendantOf(focusedTarget, dropdownUi)) return; // focus is still inside <Dropdown> => nothing to do
            
            
            
            // <floatingOn> is <Dropdown>'s friend, so focus on <floatingOn> is considered not to lost focus on <Dropdown>:
            const target = (props.floatingOn instanceof Element) ? props.floatingOn : props.floatingOn?.current;
            if ((focusedTarget instanceof Element) && target && isSelfOrDescendantOf(focusedTarget, target)) return;
            
            
            
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
    return (
        <Collapse<TElement, TDropdownExpandedChangeEvent>
            // other props:
            {...restCollapseProps}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? 'dialog'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // floatable:
            floatingPlacement ={props.floatingPlacement ?? (orientationableVariant.isOrientationBlock ? 'bottom' : 'right')}
            floatingAutoFlip  ={props.floatingAutoFlip  ?? true}
            floatingAutoShift ={props.floatingAutoShift ?? true}
            
            
            
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



export interface DropdownComponentProps<TElement extends Element = HTMLElement, TDropdownExpandedChangeEvent extends DropdownExpandedChangeEvent = DropdownExpandedChangeEvent>
{
    // refs:
    dropdownRef         ?: React.Ref<TElement> // setter ref
    
    
    
    // variants:
    dropdownOrientation ?: DropdownProps<TElement, TDropdownExpandedChangeEvent>['orientation']
    
    
    
    // components:
    dropdownComponent   ?: React.ReactComponentElement<any, DropdownProps<TElement, TDropdownExpandedChangeEvent>>
}
