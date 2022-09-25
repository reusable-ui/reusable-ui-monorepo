// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useId,
}                           from 'react'

// cssfn:
import {
    // cssfn general types:
    SingleOrArray,
    
    
    
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
    useMergeRefs,
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
    IndicatorProps,
    Indicator,
}                           from '@reusable-ui/indicator'       // a base component
import {
    // styles:
    usesCollapseLayout,
    usesCollapseStates,
}                           from '@reusable-ui/collapse'        // a base component



// defaults:
const _defaultSemanticTag  : SemanticTag  = 'div'   // uses <div>          as the default semantic
const _defaultSemanticRole : SemanticRole = 'group' // uses [role="group"] as the default semantic



// styles:
export const usesDetailsLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesCollapseLayout(), // `usesCollapseLayout` first then `usesListItemLayout`, so any conflict the `usesListItemLayout` wins
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
export const usesDetailsStates = () => {
    return style({
        ...imports([
            // states:
            usesCollapseStates(),
        ]),
    });
};

export const useDetailsStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesDetailsLayout(),
        
        // variants:
        usesDetailsVariants(),
        
        // states:
        usesDetailsStates(),
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
        ToggleCollapsibleProps<TExpandedChangeEvent>
{
    // accessibilities:
    label            ?: React.ReactNode
    
    
    
    // behaviors:
    lazy             ?: boolean
    
    
    
    // components:
    togglerComponent ?: React.ReactComponentElement<any, IndicatorProps<TElement>>
    contentComponent ?: React.ReactComponentElement<any, BasicProps<TElement>>
    
    
    
    // children:
    children         ?: React.ReactNode
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
        togglerComponent = (<Indicator<TElement> /> as React.ReactComponentElement<any, IndicatorProps<TElement>>),
        contentComponent = (<Basic<TElement> /> as React.ReactComponentElement<any, BasicProps<TElement>>),
        
        
        
        // children:
        children,
    ...restBasicProps} = props;
    type T1 = typeof restBasicProps
    type T2 = Omit<T1, keyof BasicProps>
    
    
    
    // identifiers:
    const defaultId     = useId();
    const collapsibleId = contentComponent.props.id ?? defaultId;
    
    
    
    // states:
    const [isExpanded, , toggleExpanded] = useToggleCollapsible({
        defaultExpanded,
        expanded,
        onExpandedChange,
    });
    
    const collapsibleState = useCollapsible<TElement, TExpandedChangeEvent>({ expanded: isExpanded });
    const isVisible        = collapsibleState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    
    
    
    // fn props:
    const propActive = usePropActive(props, null);
    const activeDn   = isExpanded;
    const activeFn   = (togglerComponent.props.active ?? propActive) /*controllable*/ ?? activeDn /*uncontrollable*/;
    
    
    
    // classes:
    const togglerClasses      = useMergeClasses(
        // preserves the original `classes` from `togglerComponent`:
        togglerComponent.props.classes,
        
        
        
        // preserves the original `classes` from `props`:
        props.classes,
        
        
        
        // hacks:
        ((!activeFn || null) && 'last-visible-child'),
    );
    const contentStateClasses = useMergeClasses(
        // preserves the original `stateClasses` from `togglerComponent`:
        togglerComponent.props.stateClasses,
        
        
        
        // preserves the original `stateClasses` from `props`:
        props.stateClasses,
        
        
        
        // states:
        collapsibleState.class,
    );
    
    
    
    // handlers:
    const listHandleClickInternal   = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        toggleExpanded();       // handle click as toggle [expanded]
        event.preventDefault(); // handled
    });
    const listHandleClick           = useMergeEvents(
        // preserves the original `onClick` from `togglerComponent`:
        togglerComponent.props.onClick,
        
        
        
        // preserves the original `onClick` from `props`:
        props.onClick,
        
        
        
        // actions:
        listHandleClickInternal,
    );
    const contentHandleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd` from `togglerComponent`:
        togglerComponent.props.onAnimationEnd,
        
        
        
        // preserves the original `onAnimationEnd` from `props`:
        props.onAnimationEnd,
        
        
        
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
            {/* <label> */}
            {React.cloneElement<IndicatorProps<TElement>>(togglerComponent,
                // props:
                {
                    // semantics:
                    semanticRole    : togglerComponent.props.semanticRole ?? 'heading',
                    
                    'aria-expanded' : (activeFn || undefined) && (togglerComponent.props['aria-expanded'] ?? props['aria-expanded'] ?? true), // ignore [aria-expanded] when (activeFn === false) and the default value of [aria-expanded] is true
                    'aria-controls' : togglerComponent.props['aria-controls'] ?? collapsibleId,
                    
                    
                    
                    // classes:
                    classes         : togglerClasses,
                    
                    
                    
                    // states:
                    active          : activeFn,
                    
                    
                    
                    // handlers:
                    onClick         : listHandleClick,
                },
                
                
                
                // children:
                togglerComponent.props.children ?? label,
            )}
            
            
            
            {/* collapsible <content> */}
            {React.cloneElement<BasicProps<TElement>>(contentComponent,
                // props:
                {
                    // basic variant props:
                    ...basicVariantProps,
                    
                    
                    
                    // other props:
                    ...contentComponent.props,
                    
                    
                    
                    // identifiers:
                    id              : collapsibleId,
                    
                    
                    
                    // classes:
                    stateClasses    : contentStateClasses,
                    
                    
                    
                    // handlers:
                    onAnimationEnd  : contentHandleAnimationEnd,
                },
                
                
                
                // children:
                contentComponent.props.children ?? ((!lazy || isVisible) && children),
            )}
        </Basic>
    );
};
export {
    Details,
    Details as default,
}
