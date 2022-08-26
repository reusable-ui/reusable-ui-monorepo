// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
    useState,
}                           from 'react'

// cssfn:
import type {
    // types:
    Optional,
}                           from '@cssfn/types'                         // cssfn general types
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    fallbacks,
    
    
    
    // combinators:
    children,
    
    
    
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
    stripoutList,
    stripoutScrollbar,
    stripoutImage,
}                           from '@reusable-ui/stripouts'       // removes browser's default stylesheet
import {
    // hooks:
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // react components:
    Fallbacks,
    ResponsiveProviderProps,
    ResponsiveProvider,
}                           from '@reusable-ui/responsives'     // a responsive management system for react web components

// reusable-ui features:
import {
    // hooks:
    usesPadding,
}                           from '@reusable-ui/padding'         // padding (inner spacing) stuff of UI

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI

// reusable-ui states:
import {
    // hooks:
    ifCollapsed,
    usesCollapsible,
    ExpandedChangeEvent,
    CollapsibleProps,
    useCollapsible,
}                           from '@reusable-ui/collapsible'     // a capability of UI to expand/reduce its size or toggle the visibility

// reusable-ui components:
import {
    // react components:
    Generic,
}                           from '@reusable-ui/generic'         // a base component
import type {
    // react components:
    BasicProps,
}                           from '@reusable-ui/basic'           // a base component
import {
    // styles:
    ContentChildrenMediaOptions,
    usesContentChildrenMediaOptions,
    usesContentLayout,
    usesContentVariants,
    
    
    
    // configs:
    contents,
    
    
    
    // react components:
    ContentProps,
    Content,
}                           from '@reusable-ui/content'         // a base component
import type {
    // react components:
    ButtonProps,
    
    ButtonComponentProps,
}                           from '@reusable-ui/button'          // a button component for initiating an action
import {
    // react components:
    ButtonIcon,
}                           from '@reusable-ui/button-icon'     // a button component with a nice icon
import {
    // utilities:
    Dimension,
    
    
    
    // react components:
    NavscrollProps,
    Navscroll,
    
    NavscrollComponentProps,
}                           from '@reusable-ui/navscroll'       // a navigation component to navigate within current page, based on scroll position
import {
    // react components:
    ListItem,
}                           from '@reusable-ui/list'            // represents a series of content



// defaults:
const _defaultResponsiveFallbacks : Fallbacks<boolean> = [true, false]



// styles:

// .navbar > .list > .item > .media
const listElm      = ':where(.list)'; // zero specificity
const dummyListElm = '.dummy';
const itemElm      = '*';             // zero specificity
const prevBtnElm   = '.prevBtn';
const nextBtnElm   = '.nextBtn';
const navElm       = '.nav';



export const usesNavbarLayout = (options?: ContentChildrenMediaOptions) => {
    // dependencies:
    
    // features:
    const {paddingRule, paddingVars} = usesPadding(navbars);
    
    
    
    return style({
        ...imports([
            // layouts:
            usesContentLayout(),
            
            // features:
            paddingRule,
        ]),
        ...style({
            // layouts:
            display             : 'grid', // use css grid for layouting, so we can customize the desired area later.
            
            // explicit areas:
            gridTemplateRows    : [[
                '1fr',
                'min-content',
            ]],
            gridTemplateColumns : [['15%', '1fr', '15%']],
            gridTemplateAreas   : [[
                '"prevBtn main nextBtn"',
                '"prevBtn nav  nextBtn"',
            ]],
            
            // child default sizes:
            justifyItems        : 'stretch', // each section fills the entire area's width
            alignItems          : 'stretch', // each section fills the entire area's height
            
            
            
            // borders:
            overflow            : 'hidden', // clip the children at the rounded corners
            
            
            
            // children:
            
            
            
            // customize:
            ...usesCssProps(navbars), // apply config's cssProps
            
            
            
            // spacings:
         // padding       : paddingVars.padding,
            paddingInline : paddingVars.paddingInline,
            paddingBlock  : paddingVars.paddingBlock,
        }),
    });
};
export const usesNavbarVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(navbars);
    
    
    
    return style({
        ...imports([
            // variants:
            usesContentVariants(),
            resizableRule,
        ]),
    });
};

export const useNavbarStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesNavbarLayout(),
        
        // variants:
        usesNavbarVariants(),
    ]),
}), { id: 'xf4hlnf0au' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export interface NavbarVariant {
    infiniteLoop ?: boolean
}
export const useNavbarVariant = (props: NavbarVariant) => {
    return {
        infiniteLoop: props.infiniteLoop ?? false,
    };
};



// configs:
export const [navbars, navbarValues, cssNavbarConfig] = cssConfig(() => {
    return {
        // borders:
        navBtnBorderRadius  : '0px'                     as CssKnownProps['borderRadius'],
        
        
        
        // spacings:
        paddingInline       : '0px'                     as CssKnownProps['paddingInline'],
        paddingBlock        : '0px'                     as CssKnownProps['paddingBlock' ],
        
        navMarginBlockEnd   : contents.paddingBlock     as CssKnownProps['marginBlockEnd'],
        navMarginBlockEndSm : contents.paddingBlockSm   as CssKnownProps['marginBlockEnd'],
        navMarginBlockEndLg : contents.paddingBlockLg   as CssKnownProps['marginBlockEnd'],
    };
}, { prefix: 'navb' });



// react components:
export interface NavbarProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        ContentProps<TElement>,
        
        // <div>:
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >,
        
        // states:
        CollapsibleProps<TExpandedChangeEvent>
{
    // children:
    children ?: React.ReactNode
}
const Navbar = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: NavbarProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // fn props:
    const expanded = props.expanded;
    
    
    
    // jsx:
    if (expanded !== undefined) return (
        <NavbarInternal {...props} expanded={expanded} />
    );
    
    // wrap the actual <NavbarInternal> into <ResponsiveProvider>,
    // so the hooks are controlled by <ResponsiveProvider>
    return (
        <ResponsiveProvider fallbacks={_defaultResponsiveFallbacks}>{(fallback) => (
            <NavbarInternal {...props} expanded={fallback} />
        )}</ResponsiveProvider>
    );
};
const NavbarInternal = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: NavbarProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet = useNavbarStyleSheet();
    
    
    
    // forward props:
    const {
        // from <Basic>:
        size,
        nude,
        theme,
        gradient,
        outlined,
        mild,
    } = props;
    
    
    
    // rest props:
    const {
        // states:
        expanded : navbarExpanded, // take
        
        
        
        // children:
        children,
    ...restContentProps} = props;
    type T1 = typeof restContentProps
    type T2 = Omit<T1, keyof ContentProps<TElement> | keyof React.HTMLAttributes<TElement>>
    
    
    
    // states:
    const [menuExpanded, setMenuExpanded] = useState<boolean>(false);
    
    
    
    // handlers:
    const onToggleMenu = useEvent<EventHandler<boolean|undefined>>((newMenuExpanded) => {
        setMenuExpanded(newMenuExpanded ?? menuExpanded);
    });
    
    
    
    // jsx:
    const colorSystemProps : BasicProps<any> = {
        // from <Basic>:
        size,
        nude,
        theme,
        gradient,
        outlined,
        mild,
    };
    return (
        <Content<TElement>
            // other props:
            {...restContentProps}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        >
            //
        </Content>
    );
};
export {
    Navbar,
    Navbar as default,
}
