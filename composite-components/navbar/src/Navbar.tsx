// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useCallback,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a responsive management system:
    breakpoints,
    BreakpointName,
    
    
    
    // react helper hooks:
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    
    
    
    // basic variants of UI:
    BasicVariantProps,
    useBasicVariantProps,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
    CollapsibleProps,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ActiveChangeEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import type {
    // react components:
    BasicProps,
    
    BasicComponentProps,
}                           from '@reusable-ui/basic'           // a base component
import {
    // react components:
    Container,
}                           from '@reusable-ui/container'       // a base container UI of Reusable-UI components
import {
    // react components:
    Fallbacks,
    ResponsiveChildrenHandler,
    ResponsiveProvider,
}                           from '@reusable-ui/responsives'     // a responsive management system for react web components
import {
    // react components:
    WindowResponsive,
}                           from '@reusable-ui/dimensions'      // a set of React helper for fetching the dimension of elements

// internals:
import {
    // hooks:
    useNavbarState,
    
    
    
    // react components:
    NavbarStateProvider,
}                           from './states/navbarState.js'
import {
    // elements:
    menuElm,
}                           from './styles/elements.js'



// defaults:
const _defaultResponsiveFallbacks : Fallbacks<boolean> = [true, false]



// styles:
export const useNavbarStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'xf4hlnf0au' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface NavbarParams {
    // variants:
    basicVariantProps       : BasicVariantProps
    
    
    
    // states:
    navbarExpanded          : boolean
    listExpanded            : boolean
    
    
    
    // handlers:
    toggleList              : EventHandler<boolean|undefined>
    handleActiveChange      : EventHandler<ActiveChangeEvent>
    handleClickToToggleList : React.MouseEventHandler<Element>
}
export type ResponsiveNavbarChildrenHandler = ((params: NavbarParams) => React.ReactNode)
/**
 * @deprecated use `ResponsiveNavbarChildrenHandler`.
 */
export type NavbarChildren                  = React.ReactNode | ResponsiveNavbarChildrenHandler
export interface NavbarProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        Omit<BasicProps<TElement>,
            // children:
            |'children' // we redefined `children` prop as `NavbarChildren`
        >,
        
        // <div>:
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
            
            
            
            // children:
            |'children' // we redefined `children` prop as `NavbarChildren`
        >,
        
        // states:
        CollapsibleProps<TExpandedChangeEvent>,
        
        // components:
        BasicComponentProps<TElement>
{
    // behaviors:
    breakpoint ?: BreakpointName
    
    
    
    // children:
    children   ?: React.ReactNode | ResponsiveNavbarChildrenHandler
}
const Navbar                       = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: NavbarProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // fn props:
    const breakpoint    = props.breakpoint;
    const mediaMinWidth = breakpoint ? breakpoints[breakpoint] : undefined;
    
    const expanded      = props.expanded;
    
    
    
    // jsx:
    
    // controllable [expanded]:
    if (expanded !== undefined) return (
        <NavbarImplementation {...props} expanded={expanded} />
    );
    
    // internal controllable [expanded] using provided [breakpoint]:
    if (mediaMinWidth || (mediaMinWidth === 0)) return (
        <NavbarWithWindowResponsive {...props} mediaMinWidth={mediaMinWidth} />
    );
    
    // internal controllable [expanded] using overflow detection:
    return (
        <NavbarWithResponsiveProvider {...props} />
    );
};
const NavbarWithWindowResponsive   = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: NavbarProps<TElement, TExpandedChangeEvent> & { mediaMinWidth : number }): JSX.Element|null => {
    // rest props:
    const {
        mediaMinWidth,
    ...restNavbarProps} = props;
    
    
    
    // handlers:
    const handleResponsiveChildren = useCallback((expanded: boolean) =>
        <NavbarImplementation {...restNavbarProps} expanded={expanded} />
    , [props]); // re-create (and re-render) the callback if the `props` changed
    
    
    
    // jsx:
    return (
        <WindowResponsive mediaMinWidth={mediaMinWidth}>
            {handleResponsiveChildren}
        </WindowResponsive>
    );
};
const NavbarWithResponsiveProvider = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: NavbarProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // handlers:
    const handleResponsiveChildren = useCallback<ResponsiveChildrenHandler<boolean>>((currentFallback) =>
        <NavbarImplementation {...props} expanded={currentFallback} />
    , [props]); // re-create (and re-render) the callback if the `props` changed
    
    
    
    // jsx:
    return (
        <ResponsiveProvider fallbacks={_defaultResponsiveFallbacks}>
            {handleResponsiveChildren}
        </ResponsiveProvider>
    );
};

const NavbarImplementation         = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: NavbarProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // variants:
    const basicVariantProps = useBasicVariantProps(props, { mild: false });
    
    
    
    // jsx:
    return (
        <NavbarStateProvider
            // variants:
            basicVariantProps={basicVariantProps}
            
            
            
            // states:
            navbarExpanded={props.expanded ?? false}
        >
            <NavbarContextImplementation
                // other props:
                {...props}
            />
        </NavbarStateProvider>
    );
};
const NavbarContextImplementation  = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: NavbarProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // states:
    const {
        // refs:
        navbarRef,
        
        
        
        // variants:
        basicVariantProps,
        
        
        
        // states:
        navbarExpanded,
        listExpanded,
        
        
        
        // handlers:
        toggleList,
        handleActiveChange,
        handleClickToToggleList,
    } = useNavbarState();
    
    
    
    // styles:
    const styleSheet        = useNavbarStyleSheet();
    
    
    
    // rest props:
    const {
        // behaviors:
        breakpoint : _breakpoint, // remove
        
        
        
        // states:
        expanded   : _expanded,   // remove
        
        
        
        // components:
        basicComponent = (<Container<TElement> /> as React.ReactComponentElement<any, BasicProps<TElement>>),
        
        
        
        // children:
        children,
    ...restBasicProps} = props;
    
    
    
    // refs:
    const mergedOuterRef = useMergeRefs(
        // preserves the original `outerRef` from `basicComponent`:
        basicComponent.props.outerRef,
        
        
        
        // preserves the original `outerRef` from `props`:
        props.outerRef,
        
        
        
        navbarRef as React.MutableRefObject<TElement|null>,
    );
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses` from `props`:
        props.stateClasses,
        // preserves the original `stateClasses` from `basicComponent`:
        basicComponent.props.stateClasses,
        
        
        
        // states:
        (navbarExpanded || undefined) && 'expanded',
    );
    
    
    
    // handlers:
    const handleClickToCollapseList = useEvent<React.MouseEventHandler<Element>>((event) => {
        // conditions:
        // if (event.defaultPrevented) return; // always handle click even if the event has been handled
        if (event.target === event.currentTarget) return; // ignores non bubbling
        if (!(event.target instanceof Element))   return; // ignores click event from non Element
        if (!event.target.matches(menuElm))       return; // ignore click event fron non .menu elements
        
        
        
        // actions:
        toggleList(false);
        // event.preventDefault(); // handled
    });
    const handleClick               = useMergeEvents(
        // preserves the original `onClick` from `props`:
        props.onClick,
        // preserves the original `onClick` from `basicComponent`:
        basicComponent.props.onClick,
        
        
        
        // actions:
        handleClickToCollapseList,
    );
    
    
    
    // jsx:
    return React.cloneElement<BasicProps<TElement>>(basicComponent,
        // props:
        {
            // variants:
            ...basicVariantProps,
            
            
            
            // other props:
            ...restBasicProps,
            ...basicComponent.props, // overwrites restBasicProps (if any conflics)
            
            
            
            // refs:
            outerRef     : mergedOuterRef,
            
            
            
            // semantics:
            semanticTag  : basicComponent.props.semanticTag  ?? props.semanticTag  ?? 'nav',        // uses <nav>               as the default semantic tag
            semanticRole : basicComponent.props.semanticRole ?? props.semanticRole ?? 'navigation', // uses [role="navigation"] as the default semantic role
            
            
            
            // classes:
            mainClass    : basicComponent.props.mainClass ?? props.mainClass ?? styleSheet.main,
            stateClasses : stateClasses,
            
            
            
            // handlers:
            onClick      : handleClick,
        },
        
        
        
        // children:
        basicComponent.props.children ?? ((typeof(children) !== 'function') ? children : children({
            // variants:
            basicVariantProps,
            
            
            
            // states:
            navbarExpanded,
            listExpanded,
            
            
            
            // handlers:
            toggleList,
            handleActiveChange,
            handleClickToToggleList,
        })),
    );
};
export {
    Navbar,
    Navbar as default,
}
