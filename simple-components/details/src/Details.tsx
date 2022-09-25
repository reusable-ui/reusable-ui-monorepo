// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useId,
}                           from 'react'

// cssfn:
import {
    // writes css in javascript:
    style,
    imports,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    useMergeEvents,
    useMergeClasses,
    
    
    
    // a semantic management system for react web components:
    SemanticTag,
    SemanticRole,
    
    
    
    // an accessibility management system:
    usePropActive,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // basic variants of UI:
    useBasicVariantProps,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
    useCollapsible,
    ToggleCollapsibleProps,
    useToggleCollapsible,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component
import {
    // react components:
    ButtonProps,
    Button,
    
    ButtonComponentProps,
}                           from '@reusable-ui/button'          // a button component for initiating an action
import {
    ToggleButtonProps,
    ToggleButton,
    
    ToggleButtonComponentProps,
}                           from '@reusable-ui/toggle-button'   // a button with toggleable active state
import {
    // react components:
    CollapseProps,
    Collapse,
    
    CollapseComponentProps,
}                           from '@reusable-ui/collapse'        // a base component



// defaults:
const _defaultSemanticTag  : SemanticTag  = 'div'   // uses <div>          as the default semantic
const _defaultSemanticRole : SemanticRole = 'group' // uses [role="group"] as the default semantic



// styles:
export const usesDetailsLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBasicLayout(),
        ]),
        ...style({
            // customize:
            ...usesCssProps(details), // apply config's cssProps
        }),
    });
};
export const usesDetailsVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(details);
    
    
    
    return style({
        ...imports([
            // variants:
            usesBasicVariants(),
            resizableRule,
        ]),
    });
};

export const useDetailsStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesDetailsLayout(),
        
        // variants:
        usesDetailsVariants(),
    ]),
}), { id: '8sv7el5gq9' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [details, detailsValues, cssDetailsConfig] = cssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'dtl' });



// react components:
export interface DetailsProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        BasicProps<TElement>,
        
        // states:
        ToggleCollapsibleProps<TExpandedChangeEvent>, // implements `onExpandedChange` & `defaultExpanded` (implements controllable & uncontrollable)
        
        // components:
        ButtonComponentProps,
        ToggleButtonComponentProps,
        CollapseComponentProps<Element, TExpandedChangeEvent>
{
    // accessibilities:
    label    ?: React.ReactNode
    
    
    
    // behaviors:
    lazy     ?: boolean
    
    
    
    // children:
    children ?: React.ReactNode
}
const Details = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: DetailsProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet        = useDetailsStyleSheet();
    
    
    
    // basic variant props:
    const basicVariantProps = useBasicVariantProps(props);
    
    
    
    // rest props:
    const {
        // accessibilities:
        label,
        
        
        
        // behaviors:
        lazy       = false,
        
        
        
        // states:
        defaultExpanded,  // take, to be handled by `useToggleCollapsible`
        expanded,         // take, to be handled by `useToggleCollapsible`
        onExpandedChange, // take, to be handled by `useToggleCollapsible`
        
        
        
        // components:
        buttonRef,
        buttonOrientation,
        buttonStyle,
        buttonComponent       = (<Button />   as React.ReactComponentElement<any, ButtonProps>),
        buttonChildren,
        
        toggleButtonComponent = (<ToggleButton /> as React.ReactComponentElement<any, ToggleButtonProps>),
        
        collapseComponent     = (<Collapse<Element, TExpandedChangeEvent> /> as React.ReactComponentElement<any, CollapseProps<Element, TExpandedChangeEvent>>),
        
        
        
        // children:
        children,
    ...restBasicProps} = props;
    type T1 = typeof restBasicProps
    type T2 = Omit<T1, keyof BasicProps>
    
    
    
    // identifiers:
    const defaultId     = useId();
    const collapsibleId = collapseComponent.props.id ?? defaultId;
    
    
    
    // states:
    const [isExpanded, , toggleExpanded] = useToggleCollapsible({
        defaultExpanded,
        expanded,
        onExpandedChange,
    });
    
    const collapsibleState = useCollapsible<Element, TExpandedChangeEvent>({ expanded: isExpanded });
    const isVisible        = collapsibleState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    
    
    
    // fn props:
    const propActive = usePropActive(props, null);
    const activeDn   = isExpanded;
    const activeFn   = (toggleButtonComponent.props.active ?? propActive) /*controllable*/ ?? activeDn /*uncontrollable*/;
    
    
    
    // classes:
    const toggleButtonClasses  = useMergeClasses(
        // preserves the original `classes` from `toggleButtonComponent`:
        toggleButtonComponent.props.classes,
        
        
        
        // hacks:
        ((!activeFn || null) && 'last-visible-child'),
    );
    
    
    
    // handlers:
    const toggleButtonHandleClickInternal = useEvent<React.MouseEventHandler<Element>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        toggleExpanded();       // handle click as toggle [expanded]
        event.preventDefault(); // handled
    });
    const toggleButtonHandleClick         = useMergeEvents(
        // preserves the original `onClick` from `toggleButtonComponent`:
        toggleButtonComponent.props.onClick,
        
        
        
        // actions:
        toggleButtonHandleClickInternal,
    );
    const collapseHandleAnimationEnd      = useMergeEvents(
        // preserves the original `onAnimationEnd` from `collapseComponent`:
        collapseComponent.props.onAnimationEnd,
        
        
        
        // states:
        collapsibleState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...restBasicProps}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag  ?? _defaultSemanticTag }
            semanticRole = {props.semanticRole ?? _defaultSemanticRole}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        >
            {/* <ToggleButton> */}
            {React.cloneElement<ToggleButtonProps>(toggleButtonComponent,
                // props:
                {
                    // basic variant props:
                    ...basicVariantProps,
                    
                    
                    
                    // other props:
                    ...toggleButtonComponent.props,
                    
                    
                    
                    // semantics:
                    semanticRole    : toggleButtonComponent.props.semanticRole ?? 'heading',
                    
                    'aria-controls' : toggleButtonComponent.props['aria-controls'] ?? collapsibleId,
                    
                    
                    
                    // classes:
                    classes         : toggleButtonClasses,
                    
                    
                    
                    // states:
                    active          : activeFn,
                    
                    
                    
                    // handlers:
                    onClick         : toggleButtonHandleClick,
                },
                
                
                
                // children:
                toggleButtonComponent.props.children ?? label,
            )}
            
            
            
            {/* <Collapse> */}
            {React.cloneElement<CollapseProps<Element, TExpandedChangeEvent>>(collapseComponent,
                // props:
                {
                    // basic variant props:
                    ...basicVariantProps,
                    
                    
                    
                    // other props:
                    ...collapseComponent.props,
                    
                    
                    
                    // identifiers:
                    id              : collapsibleId,
                    
                    
                    
                    // states:
                    expanded        : collapseComponent.props.expanded ?? collapsibleState.expanded,
                    
                    
                    
                    // handlers:
                    onAnimationEnd  : collapseHandleAnimationEnd,
                },
                
                
                
                // children:
                collapseComponent.props.children ?? ((!lazy || isVisible) && children),
            )}
        </Basic>
    );
};
export {
    Details,
    Details as default,
}
