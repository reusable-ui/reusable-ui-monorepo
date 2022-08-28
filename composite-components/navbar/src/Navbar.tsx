// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    fallbacks,
    
    
    
    // combinators:
    descendants,
    
    
    
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
    Fallbacks,
    ResponsiveProviderProps,
    ResponsiveProvider,
}                           from '@reusable-ui/responsives'     // a responsive management system for react web components

// reusable-ui features:
import {
    // hooks:
    usesBorder,
}                           from '@reusable-ui/border'          // border (stroke) stuff of UI
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
import type {
    // hooks:
    ActiveChangeEvent,
}                           from '@reusable-ui/activatable'     // a capability of UI to be highlighted/selected/activated

// reusable-ui components:
import {
    // configs:
    basics,
    
    
    
    // react components:
    BasicProps,
}                           from '@reusable-ui/basic'           // a base component
import {
    // styles:
    usesContainerLayout,
    usesContainerVariants,
    
    
    
    // configs:
    containers,
    
    
    
    // react components:
    ContainerProps,
    Container,
}                           from '@reusable-ui/container'       // a base container UI of Reusable-UI components



// defaults:
const _defaultResponsiveFallbacks : Fallbacks<boolean> = [true, false]



// styles:
const logoElm    = '.logo'
const togglerElm = '.toggler'
const listElm    = '.list'
const menuElm    = ':is(.menu, .list :is(.button, button, [role="button"]):where(:not(.not-menu)))'
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
}), { id: 'xf4hlnf0au' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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



// react components:
export type ColorSystemProps = Pick<BasicProps, 'size'|'theme'|'gradient'|'outlined'|'mild'>
export interface NavbarParams {
    // color system props:
    colorSystemProps        : ColorSystemProps
    
    
    
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
        Omit<ContainerProps<TElement>,
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
        CollapsibleProps<TExpandedChangeEvent>
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
    const styleSheet       = useNavbarStyleSheet();
    
    
    
    // forward props:
    const {
        // from <Basic>:
        size,
        theme,
        gradient,
        outlined,
        mild = false,
    } = props;
    
    
    
    // rest props:
    const {
        // states:
        expanded : navbarExpanded = false, // take
        
        
        
        // children:
        children,
    ...restContainerProps} = props;
    type T1 = typeof restContainerProps
    type T2 = Omit<T1, keyof ContainerProps<TElement> | keyof React.HTMLAttributes<TElement>>
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
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
        const cancelRequest = requestAnimationFrame(() => { // wait for the <ResponsiveProvider> to switch to mobile version
            setMenuExpanded(false); // collapsing the <Navbar>'s menu
        });
        
        
        
        // cleanups:
        return () => {
            // the <Navbar> immediately switched to mobile version => aborts
            cancelAnimationFrame(cancelRequest);
        };
    }, [navbarExpanded, menuExpanded]);
    
    
    
    // jsx:
    const colorSystemProps : Pick<BasicProps, 'size'|'theme'|'gradient'|'outlined'|'mild'> = {
        // from <Basic>:
        size,
        theme,
        gradient,
        outlined,
        mild,
    };
    return (
        <Container<TElement>
            // color system props:
            {...colorSystemProps}
            
            
            
            // other props:
            {...restContainerProps}
            
            
            
            // semantics:
            semanticTag={props.semanticTag   ?? 'nav'       }
            semanticRole={props.semanticRole ?? 'navigation'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            
            
            
            // handlers:
            onClick={handleClick}
        >
            {(typeof(children) !== 'function') ? children : children({
                // color system props:
                colorSystemProps,
                
                
                
                // states:
                navbarExpanded,
                menuExpanded,
                
                
                
                // handlers:
                toggleMenu,
                handleActiveChange,
                handleClickAsToggleMenu,
            })}
        </Container>
    );
};
export {
    Navbar,
    Navbar as default,
}
