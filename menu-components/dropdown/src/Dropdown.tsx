// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    states,
    keyframes,
    
    
    
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
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // hooks:
    useIsomorphicLayoutEffect,
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    OrientationName,
    OrientationVariantOptions,
    defaultBlockOrientationVariantOptions,
    normalizeOrientationVariantOptions,
    usesOrientationVariant,
    OrientationVariant,
    useOrientationVariant,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    useActivePassiveState,
    ActiveChangeEvent,
    ToggleActiveProps,
}                           from '@reusable-ui/indicator'       // a base component
export type {
    // types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    PopupPosition,
    PopupSide,
}                           from '@reusable-ui/collapse'        // a base component
import {
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



// styles:
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

export type DropdownCloseType = 'shortcut'|'blur'
export interface DropdownActiveChangeEvent extends ActiveChangeEvent {
    closeType : DropdownCloseType
}
export interface DropdownAction<TDropdownActiveChangeEvent extends DropdownActiveChangeEvent = DropdownActiveChangeEvent>
    extends
        // accessibilities:
        Pick<ToggleActiveProps<TDropdownActiveChangeEvent>, 'onActiveChange'>
{
}

export interface DropdownComponentUiProps<TDropdownActiveChangeEvent extends DropdownActiveChangeEvent = DropdownActiveChangeEvent>
    extends
        // accessibilities:
        DropdownAction<TDropdownActiveChangeEvent>
{
    // accessibilities:
    tabIndex ?: number
}
export interface DropdownComponentProps<TDropdownActiveChangeEvent extends DropdownActiveChangeEvent = DropdownActiveChangeEvent>
    extends
        // component ui:
        DropdownComponentUiProps<TDropdownActiveChangeEvent>
{
    // refs:
    dropdownRef ?: React.Ref<Element> // setter ref
    
    
    
    // components:
    children     : React.ReactElement<(GenericProps<Element>|React.HTMLAttributes<HTMLElement>|React.SVGAttributes<SVGElement>) & DropdownComponentUiProps<TDropdownActiveChangeEvent>>
}

export interface DropdownProps<TElement extends Element = HTMLElement, TDropdownActiveChangeEvent extends DropdownActiveChangeEvent = DropdownActiveChangeEvent>
    extends
        // bases:
        Omit<CollapseProps<TElement>,
            // children:
            |'children' // we use `children` prop as a dropdown component
        >,
        
        // components:
        DropdownComponentProps<TDropdownActiveChangeEvent>
{
}
const Dropdown = <TElement extends Element = HTMLElement, TDropdownActiveChangeEvent extends DropdownActiveChangeEvent = DropdownActiveChangeEvent>(props: DropdownProps<TElement, TDropdownActiveChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet         = useDropdownStyleSheet();
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    const isOrientationBlock = ((orientationVariant.class || defaultOrientationRuleOptions.defaultOrientation) === 'block');
    
    
    
    // states:
    
    // accessibilities:
    const activePassiveState = useActivePassiveState<TElement>(props);
    const isVisible          = activePassiveState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    
    
    
    // rest props:
    const {
        // accessibilities:
        onActiveChange,
        
        
        
        // popups:
        targetRef,
        
        
        
        // components:
        dropdownRef,
        tabIndex,
        children: dropdownComponent,
    ...restCollapseProps} = props;
    
    
    
    // verifies:
    React.Children.only(dropdownComponent);
    if (!React.isValidElement<GenericProps<Element>|React.HTMLAttributes<HTMLElement>|React.SVGAttributes<SVGElement>>(dropdownComponent)) throw Error('Invalid child element.');
    const isReusableUiComponent : boolean = (typeof(dropdownComponent.type) !== 'string');
    
    
    
    // refs:
    const dropdownRefInternal = useRef<Element|null>(null);
    const mergedDropdownRef   = useMergeRefs(
        // preserves the original `ref` from `dropdownComponent`:
        (
            isReusableUiComponent
            ?
            (dropdownComponent.props as GenericProps<Element>).elmRef
            :
            (dropdownComponent.props as React.RefAttributes<Element>).ref
        ),
        
        
        
        // preserves the original `dropdownRef` from `props`:
        dropdownRef,
        
        
        
        dropdownRefInternal,
    );
    
    
    
    // handlers:
    const handleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        
        // accessibilities:
        activePassiveState.handleAnimationEnd,
    );
    const handleActiveChange = useMergeEvents(
        // preserves the original `onActiveChange` from `dropdownComponent`:
        dropdownComponent.props.onActiveChange,
        
        
        
        // preserves the original `onActiveChange`:
        onActiveChange,
    );
    
    
    
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
            onAnimationEnd={handleAnimationEnd}
        >
            {React.cloneElement<GenericProps<Element> & React.RefAttributes<Element> & DropdownComponentUiProps<TDropdownActiveChangeEvent>>(dropdownComponent,
                // props:
                {
                    // refs:
                    [isReusableUiComponent ? 'elmRef' : 'ref'] : mergedDropdownRef,
                    
                    
                    
                    // accessibilities:
                    tabIndex : dropdownComponent.props.tabIndex ?? tabIndex,
                    
                    
                    
                    // handlers:
                    ...(isReusableUiComponent ? {
                        onActiveChange : handleActiveChange,
                    } : null),
                }
            )}
        </Collapse>
    );
};
export {
    Dropdown,
    Dropdown as default,
}

export type { OrientationName, OrientationVariant }
