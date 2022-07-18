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
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // utilities:
    isReusableUiComponent,
}                           from '@reusable-ui/utilities'       // common utility functions
import type {
    // react components:
    GenericProps,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // hooks:
    usesSizeVariant,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    useActivePassiveState,
    ActiveChangeEvent,
    ToggleActiveProps,
}                           from '@reusable-ui/indicator'       // a base component
import {
    // styles:
    usesCollapseLayout,
    usesCollapseVariants,
    usesCollapseStates,
    
    
    
    // react components:
    CollapseProps,
    Collapse,
}                           from '@reusable-ui/collapse'        // a base component



// styles:
export const usesModalLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesCollapseLayout(),
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
            ...usesCssProps(modals), // apply config's cssProps
        }),
    });
};
export const usesModalVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(modals);
    
    
    
    return style({
        ...imports([
            // variants:
            usesCollapseVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
    });
};
export const usesModalStates = () => {
    return style({
        ...imports([
            // states:
            usesCollapseStates(),
        ]),
    });
};

export const useModalStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesModalLayout(),
        
        // variants:
        usesModalVariants(),
        
        // states:
        usesModalStates(),
    ]),
}), { id: 'z26pqrin5i' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [modals, modalValues, cssModalConfig] = cssConfig(() => {
    return {
        // borders:
        boxShadow : [[0, 0, '10px', 'rgba(0,0,0,0.5)']] as CssKnownProps['boxShadow'],
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

export type ModalActionType = 'shortcut'|'blur'|'ui'|{}
export interface ModalActiveChangeEvent extends ActiveChangeEvent {
    actionType : ModalActionType
}

export interface ModalProps<TElement extends Element = HTMLElement, TModalActiveChangeEvent extends ModalActiveChangeEvent = ModalActiveChangeEvent>
    extends
        // bases:
        Omit<CollapseProps<TElement>,
            // children:
            |'children' // we redefined `children` prop as a <ModalUi> component
        >,
        
        // accessibilities:
        Pick<ToggleActiveProps<TModalActiveChangeEvent>, 'onActiveChange'>,
        
        // components:
        ModalUiComponentProps<Element>
{
}
const Modal = <TElement extends Element = HTMLElement, TModalActiveChangeEvent extends ModalActiveChangeEvent = ModalActiveChangeEvent>(props: ModalProps<TElement, TModalActiveChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet         = useModalStyleSheet();
    
    
    
    // states:
    
    // accessibilities:
    const activePassiveState = useActivePassiveState<TElement>(props);
    const isVisible          = activePassiveState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    const isActive           = activePassiveState.active;
    
    
    
    // rest props:
    const {
        // refs:
        elmRef,
        
        
        
        // accessibilities:
        onActiveChange,
        
        
        
        // components:
        tabIndex,
        children: modalUiComponent,
    ...restCollapseProps} = props;
    
    
    
    // verifies:
    React.Children.only(modalUiComponent);
    const isReusableUiModalComponent : boolean = isReusableUiComponent(modalUiComponent);
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
                // [esc] key pressed => request to hide the <Modal>:
                handleActiveChange?.({ newActive: false, actionType: 'shortcut' } as TModalActiveChangeEvent);
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
                isKeyOf('space')
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
    
    // set focus on <ModalUi> each time it shown:
    useEffect(() => {
        // setups:
        if (isActive) {
            // when actived => focus the <ModalUi>, so the user able to use [esc] key to close the <Modal>:
            (modalUiRefInternal.current as HTMLOrSVGElement|null)?.focus({ preventScroll: true });
        } // if
    }, [isActive]);
    
    
    
    // jsx:
    return (
        <Collapse<TElement>
            // other props:
            {...restCollapseProps}
            
            
            
            // variants:
            nude={props.nude ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // handlers:
            onKeyDown={handleKeyDown}
            onAnimationEnd={handleAnimationEnd}
        >
            {/* <ModalUi> */}
            {React.cloneElement<GenericProps<Element> & React.RefAttributes<Element> & React.HTMLAttributes<Element>>(modalUiComponent,
                // props:
                {
                    // refs:
                    [isReusableUiModalComponent ? 'elmRef' : 'ref'] : mergedModalUiRef,
                    
                    
                    
                    // accessibilities:
                    tabIndex : (modalUiComponent.props as React.HTMLAttributes<HTMLElement>).tabIndex ?? tabIndex,
                },
            )}
        </Collapse>
    );
};
export {
    Modal,
    Modal as default,
}



export interface ModalComponentProps<TElement extends Element = HTMLElement, TModalActiveChangeEvent extends ModalActiveChangeEvent = ModalActiveChangeEvent>
{
    // refs:
    modalRef       ?: React.Ref<TElement> // setter ref
    
    
    
    // components:
    modalComponent ?: React.ReactComponentElement<any, ModalProps<TElement, TModalActiveChangeEvent>>
}
