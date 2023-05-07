// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
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
    useIsomorphicLayoutEffect,
    useEvent,
    EventHandler,
    useMergeEvents,
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
import {
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
    ResponsiveProvider,
}                           from '@reusable-ui/responsives'     // a responsive management system for react web components

// internals:
import {
    // elements:
    menuElm,
}                           from './styles/elements.js'
import {
    // react components:
    WindowResponsive,
}                           from './WindowResponsive.js'



// defaults:
const _defaultResponsiveFallbacks : Fallbacks<boolean> = [true, false]



// styles:
export const useNavbarStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'xf4hlnf0au' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface NavbarParams {
    // basic variant props:
    basicVariantProps       : BasicVariantProps
    
    
    
    // states:
    navbarExpanded          : boolean
    listExpanded            : boolean
    
    
    
    // handlers:
    toggleList              : EventHandler<boolean|undefined>
    handleActiveChange      : EventHandler<ActiveChangeEvent>
    handleClickToToggleList : React.MouseEventHandler<Element>
}
export type NavbarChildren = React.ReactNode | ((params: NavbarParams) => React.ReactNode)
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
    children   ?: NavbarChildren
}
const Navbar = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: NavbarProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // fn props:
    const breakpoint    = props.breakpoint;
    const mediaMinWidth = breakpoint ? breakpoints[breakpoint] : undefined;
    
    const expanded      = props.expanded;
    
    
    
    // jsx:
    
    // controllable [expanded]:
    if (expanded !== undefined) return (
        <NavbarInternal {...props} expanded={expanded} />
    );
    
    // internal controllable [expanded] using provided [breakpoint]:
    if (mediaMinWidth || (mediaMinWidth === 0)) return (
        <WindowResponsive mediaMinWidth={mediaMinWidth}>{(expanded) => (
            <NavbarInternal {...props} expanded={expanded} />
        )}</WindowResponsive>
    );
    
    // internal controllable [expanded] using overflow detection:
    return (
        <ResponsiveProvider fallbacks={_defaultResponsiveFallbacks}>{(fallback) => (
            <NavbarInternal {...props} expanded={fallback} />
        )}</ResponsiveProvider>
    );
};
const NavbarInternal = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: NavbarProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet        = useNavbarStyleSheet();
    
    
    
    // basic variant props:
    const basicVariantProps = useBasicVariantProps(props, { mild: false });
    
    
    
    // rest props:
    const {
        // behaviors:
        breakpoint : _breakpoint, // remove
        
        
        
        // states:
        expanded   : navbarExpanded = false, // take
        
        
        
        // components:
        basicComponent = (<Container<TElement> /> as React.ReactComponentElement<any, BasicProps<TElement>>),
        
        
        
        // children:
        children,
    ...restBasicProps} = props;
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses` from `props`:
        props.stateClasses,
        // preserves the original `stateClasses` from `basicComponent`:
        basicComponent.props.stateClasses,
        
        
        
        // states:
        (navbarExpanded || undefined) && 'expanded',
    );
    
    
    
    // states:
    const [listExpanded, setListExpanded] = useState<boolean>(false);
    
    
    
    // handlers:
    const toggleList                = useEvent<EventHandler<boolean|undefined>>((newListExpanded) => {
        // conditions:
        if (navbarExpanded) return; // the expand/collapse functionality is only for the mobile version of <Navbar>
        
        
        
        // actions:
        setListExpanded(newListExpanded ?? !listExpanded);
    }) as ((newListExpanded ?: boolean) => void);
    const handleActiveChange        = useEvent<EventHandler<ActiveChangeEvent>>((event) => {
        // actions:
        toggleList(event.active);
    });
    const handleClickToToggleList   = useEvent<React.MouseEventHandler<Element>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        toggleList();
        event.preventDefault(); // handled
    });
    
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
    
    
    
    // dom effects:
    // collapses the <Navbar>'s list if switched from mobile to desktop:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!listExpanded)  return;  // the <Navbar>'s list was already collapsed => ignore
        if (!navbarExpanded) return; // the <Navbar> is in mobile version         => ignore
        
        
        
        // setups:
        let cancelRequest = requestAnimationFrame(() => { // give the <ResponsiveProvider> an enough time to calculate the most suitable layout
            cancelRequest = requestAnimationFrame(() => { // give the <ResponsiveProvider> an enough time to calculate the most suitable layout
                setListExpanded(false); // collapsing the <Navbar>'s list
            });
        });
        
        
        
        // cleanups:
        return () => {
            // the <Navbar> immediately switched to mobile version => aborts
            cancelAnimationFrame(cancelRequest);
        };
    }, [navbarExpanded, listExpanded]);
    
    
    
    // jsx:
    return React.cloneElement<BasicProps<TElement>>(basicComponent,
        // props:
        {
            // basic variant props:
            ...basicVariantProps,
            
            
            
            // other props:
            ...restBasicProps,
            ...basicComponent.props, // overwrites restBasicProps (if any conflics)
            
            
            
            // semantics:
            semanticTag  : basicComponent.props.semanticTag  ?? props.semanticTag  ?? 'nav',        // uses <nav>               as the default tag
            semanticRole : basicComponent.props.semanticRole ?? props.semanticRole ?? 'navigation', // uses [role="navigation"] as the default semantic
            
            
            
            // classes:
            mainClass    : basicComponent.props.mainClass ?? props.mainClass ?? styleSheet.main,
            stateClasses : stateClasses,
            
            
            
            // handlers:
            onClick      : handleClick,
        },
        
        
        
        // children:
        basicComponent.props.children ?? ((typeof(children) !== 'function') ? children : children({
            // basic variant props:
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
