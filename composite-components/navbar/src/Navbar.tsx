// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
}                           from 'react'

// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    descendants,
    style,
    imports,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useIsomorphicLayoutEffect,
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeClasses,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // basic variants of UI:
    BasicVariantProps,
    useBasicVariantProps,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    usesCollapsible,
    ExpandedChangeEvent,
    CollapsibleProps,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ActiveChangeEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // configs:
    basics,
    
    
    
    // react components:
    BasicProps,
    
    BasicComponentProps,
}                           from '@reusable-ui/basic'           // a base component
import {
    // styles:
    usesContainerLayout,
    usesContainerVariants,
    
    
    
    // configs:
    containers,
    
    
    
    // react components:
    Container,
}                           from '@reusable-ui/container'       // a base container UI of Reusable-UI components
import {
    // react components:
    Fallbacks,
    ResponsiveProvider,
}                           from '@reusable-ui/responsives'     // a responsive management system for react web components



// defaults:
const _defaultResponsiveFallbacks : Fallbacks<boolean> = [true, false]



// configs:
export const [navbars, navbarValues, cssNavbarConfig] = cssConfig(() => {
    return {
        // layouts:
        display                   : 'grid'                      as CssKnownProps['display'         ],
        gridAutoFlow              : 'column'                    as CssKnownProps['gridAutoFlow'    ], // the excess items flows automatically to a new column
        gridAutoColumns           : 'auto'                      as CssKnownProps['gridAutoColumns' ], // a new column
        gridTemplateRows          : [[
            '1fr', // limiting only one row, so the excess items flows automatically to a new column
        ]]                                                      as CssKnownProps['gridTemplateRows'],
        justifyContent            : 'space-between'             as CssKnownProps['justifyContent'  ], // separates each items as far as possible
        alignContent              : 'center'                    as CssKnownProps['alignContent'    ], // the excess vertical space placed at the top & bottom
        justifyItems              : 'center'                    as CssKnownProps['justifyItems'    ], // prevents from stretching
        alignItems                : 'center'                    as CssKnownProps['alignItems'      ], // prevents from stretching
        
        
        
        // positions:
        zIndex                    : 1020                        as CssKnownProps['zIndex'         ],
        position                  : 'sticky'                    as CssKnownProps['position'       ],
        insetBlockStart           : '0px'                       as CssKnownProps['insetBlockStart'],
        
        
        
        // sizes:
        blockSize                 : 'auto'                      as CssKnownProps['blockSize'],
        
        
        
        // borders:
        borderWidth               : '0px'                       as CssKnownProps['borderWidth' ],
        borderRadius              : '0px'                       as CssKnownProps['borderRadius'],
        boxShadow                 : [
            [0, 0, '10px', 'rgba(0,0,0,0.5)'],
        ]                                                       as CssKnownProps['boxShadow'   ],
        
        
        
        // spacings:
        paddingInline             : containers.paddingInline    as CssKnownProps['paddingInline'],
        paddingBlock              : basics.paddingBlock         as CssKnownProps['paddingBlock' ],
        gapInline                 : basics.paddingInline        as CssKnownProps['gapInline'    ],
        gapBlock                  : basics.paddingBlock         as CssKnownProps['gapBlock'     ],
        
        
        
        // list:
        listGridArea              : '2/1/2/3'                   as CssKnownProps['gridArea'       ],
        listDisplay               : 'flex'                      as CssKnownProps['display'        ],
        listFlexDirection         : 'column'                    as CssKnownProps['flexDirection'  ],
        listFlexDirectionExpand   : 'row'                       as CssKnownProps['flexDirection'  ],
        listGridAreaExpand        : 'unset'                     as CssKnownProps['gridArea'       ],
        listJustifySelf           : 'stretch'                   as CssKnownProps['justifySelf'    ],
        listAlignSelf             : 'stretch'                   as CssKnownProps['alignSelf'      ],
        listMarginInline          : [[
            'calc(0px - ', containers.paddingInline, ')',
        ]]                                                      as CssKnownProps['marginInline'   ],
        listMarginInlineExpand    : 'unset'                     as CssKnownProps['marginInline'   ],
        listMarginBlock           : 'unset'                     as CssKnownProps['marginBlock'    ],
        listMarginBlockExpand     : [[
            'calc(0px - ', basics.paddingBlock, ')',
        ]]                                                      as CssKnownProps['marginBlock'    ],
        
        // floating list:
        listPosition              : 'absolute'                  as CssKnownProps['position'       ],
        listPositionExpand        : 'unset'                     as CssKnownProps['position'       ],
        listInsetInline           : '0px'                       as CssKnownProps['insetInline'    ],
        listInsetInlineExpand     : 'unset'                     as CssKnownProps['insetInline'    ],
        listInsetBlockStart       : basics.paddingBlock         as CssKnownProps['insetBlockStart'],
        listInsetBlockStartExpand : 'unset'                     as CssKnownProps['insetBlockStart'],
        
        
        
        // menu:
        menuDisplay               : 'flex'                      as CssKnownProps['display'       ],
        menuFlexDirection         : 'row'                       as CssKnownProps['flexDirection' ],
        menuJustifyContent        : 'center'                    as CssKnownProps['justifyContent'],
        menuAlignItems            : 'center'                    as CssKnownProps['alignItems'    ],
        menuFlexWrap              : 'nowrap'                    as CssKnownProps['flexWrap'      ],
        menuWhiteSpace            : 'nowrap'                    as CssKnownProps['whiteSpace'    ],
    };
}, { prefix: 'navb' });



// styles:
const logoElm    = '.logo'    // one degree specificity to overwrite <Logo>    component
const togglerElm = '.toggler' // one degree specificity to overwrite <Toggler> component
const listElm    = '.list'    // one degree specificity to overwrite <List>    component
const menuElm    = ':is(.menu, :where(.list) :where(.button, button, [role="button"], .link, a, [role="link"]):not(.not-menu))' // one degree specificity to overwrite <Menu> component
export const usesNavbarLayout = () => {
    // dependencies:
    
    // features:
    const {borderRule , borderVars } = usesBorder(navbars);
    const {paddingRule, paddingVars} = usesPadding(navbars);
    
    
    
    return style({
        ...imports([
            // layouts:
            usesContainerLayout(),
            
            // features:
            borderRule,
            paddingRule,
        ]),
        ...style({
            // children:
            ...descendants(logoElm, {
                // customize:
                ...usesCssProps(usesPrefixedProps(navbars, 'logo')), // apply config's cssProps starting with logo***
            }),
            ...descendants(togglerElm, {
                // customize:
                ...usesCssProps(usesPrefixedProps(navbars, 'toggler')), // apply config's cssProps starting with toggler***
            }),
            ...descendants(listElm, {
                // customize:
                ...usesCssProps(usesPrefixedProps(navbars, 'list')), // apply config's cssProps starting with list***
            }),
            ...descendants(menuElm, {
                // customize:
                ...usesCssProps(usesPrefixedProps(navbars, 'menu')), // apply config's cssProps starting with menu***
            }),
            
            
            
            // customize:
            ...usesCssProps(navbars), // apply config's cssProps
            
            
            
            // borders:
            border        : borderVars.border,
         // borderRadius           : borderVars.borderRadius,
            borderStartStartRadius : borderVars.borderStartStartRadius,
            borderStartEndRadius   : borderVars.borderStartEndRadius,
            borderEndStartRadius   : borderVars.borderEndStartRadius,
            borderEndEndRadius     : borderVars.borderEndEndRadius,
            
            
            
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
            usesContainerVariants(),
            resizableRule,
        ]),
    });
};
export const usesNavbarStates = () => {
    // dependencies:
    
    // states:
    const {collapsibleRule} = usesCollapsible(navbars);
    
    
    
    return style({
        ...imports([
            // states:
            collapsibleRule,
        ]),
    });
};

export const useNavbarStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesNavbarLayout(),
        
        // variants:
        usesNavbarVariants(),
        
        // states:
        usesNavbarStates(),
    ]),
}), { enabled: true, id: 'xf4hlnf0au' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface NavbarParams {
    // basic variant props:
    basicVariantProps       : BasicVariantProps
    
    
    
    // states:
    navbarExpanded          : boolean
    menuExpanded            : boolean
    
    
    
    // handlers:
    toggleMenu              : EventHandler<boolean|undefined>
    handleActiveChange      : EventHandler<ActiveChangeEvent>
    handleClickAsToggleMenu : React.MouseEventHandler<Element>
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
    // children:
    children ?: NavbarChildren
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
    const styleSheet        = useNavbarStyleSheet();
    
    
    
    // basic variant props:
    const basicVariantProps = useBasicVariantProps(props, { mild: false });
    
    
    
    // rest props:
    const {
        // states:
        expanded : navbarExpanded = false, // take
        
        
        
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
    const [menuExpanded, setMenuExpanded] = useState<boolean>(false);
    
    
    
    // handlers:
    const toggleMenu                = useEvent<EventHandler<boolean|undefined>>((newMenuExpanded) => {
        // conditions:
        if (navbarExpanded) return; // the expand/collapse functionality is only for the mobile version of <Navbar>
        
        
        
        // actions:
        setMenuExpanded(newMenuExpanded ?? !menuExpanded);
    }) as ((newMenuExpanded ?: boolean) => void);
    const handleActiveChange        = useEvent<EventHandler<ActiveChangeEvent>>((event) => {
        // actions:
        toggleMenu(event.active);
    });
    const handleClickAsToggleMenu   = useEvent<React.MouseEventHandler<Element>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        toggleMenu();
        event.preventDefault(); // handled
    });
    
    const handleClickAsCollapseMenu = useEvent<React.MouseEventHandler<Element>>((event) => {
        // conditions:
        // if (event.defaultPrevented) return; // always handle click even if the event has been handled
        if (event.target === event.currentTarget) return; // ignores non bubbling
        if (!(event.target instanceof Element))   return; // ignores click event from non Element
        if (!event.target.matches(menuElm))       return; // ignore click event fron non .menu elements
        
        
        
        // actions:
        toggleMenu(false);
        // event.preventDefault(); // handled
    });
    const handleClick               = useMergeEvents(
        // preserves the original `onClick` from `props`:
        props.onClick,
        // preserves the original `onClick` from `basicComponent`:
        basicComponent.props.onClick,
        
        
        
        // actions:
        handleClickAsCollapseMenu,
    );
    
    
    
    // dom effects:
    // collapses the <Navbar>'s menu if switched from mobile to desktop:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!menuExpanded)  return;  // the <Navbar>'s menu was already collapsed => ignore
        if (!navbarExpanded) return; // the <Navbar> is in mobile version         => ignore
        
        
        
        // setups:
        let cancelRequest = requestAnimationFrame(() => { // give the <ResponsiveProvider> an enough time to calculate the most suitable layout
            cancelRequest = requestAnimationFrame(() => { // give the <ResponsiveProvider> an enough time to calculate the most suitable layout
                setMenuExpanded(false); // collapsing the <Navbar>'s menu
            });
        });
        
        
        
        // cleanups:
        return () => {
            // the <Navbar> immediately switched to mobile version => aborts
            cancelAnimationFrame(cancelRequest);
        };
    }, [navbarExpanded, menuExpanded]);
    
    
    
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
            semanticTag  : basicComponent.props.semanticTag  ?? props.semanticTag  ?? 'nav',
            semanticRole : basicComponent.props.semanticRole ?? props.semanticRole ?? 'navigation',
            
            
            
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
            menuExpanded,
            
            
            
            // handlers:
            toggleMenu,
            handleActiveChange,
            handleClickAsToggleMenu,
        })),
    );
};
export {
    Navbar,
    Navbar as default,
}
