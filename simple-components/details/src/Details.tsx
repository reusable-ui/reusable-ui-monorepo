// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useId,
}                           from 'react'

// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    children,
    style,
    imports,
    scopeOf,
    mainScope,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheets,
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
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // groups a list of UIs into a single UI:
    usesGroupable,
    
    
    
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
    usesBasicVariants,
    
    
    
    // configs:
    basics,
    
    
    
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
    // styles:
    usesCollapseLayout,
    usesCollapseStates,
}                           from '@reusable-ui/collapse'        // a base component



// defaults:
const _defaultSemanticTag  : SemanticTag  = ''      // no corresponding semantic tag => defaults to <div>
const _defaultSemanticRole : SemanticRole = 'group' // uses [role="group"] as the default semantic



// styles:
export const itemElm  = ':nth-child(n)' // one degree specificity to overwrite <DetailsContent> & <ToggleButton> component



export const usesDetailsLayout = () => {
    // dependencies:
    
    // features:
    const {borderRule   , borderVars   } = usesBorder(details);
    const {groupableRule, separatorRule} = usesGroupable({
        orientationInlineSelector : null, // never  => the <Details> are never  stacked in horizontal
        orientationBlockSelector  : '&',  // always => the <Details> are always stacked in vertical
        itemsSelector             : ':nth-child(n)', // select <DetailsContent> & <ToggleButton>
    });
    
    
    
    return style({
        ...imports([
            // features:
            borderRule,
            groupableRule, // make a nicely rounded corners
        ]),
        ...style({
            // layouts:
            display        : 'flex',    // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'column',  // items are stacked vertically
            justifyContent : 'start',   // if items are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first item should be visible first
            alignItems     : 'stretch', // items width are 100% of the parent (for variant `.block`) or height (for variant `.inline`)
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // sizes:
            // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
            minInlineSize  : 0,
            
            
            
            // children:
            ...children(itemElm, {
                ...imports([
                    // borders:
                    separatorRule, // turns the current border as separator between <DetailsContent> & <ToggleButton>
                ]),
            }),
            
            
            
            // customize:
            ...usesCssProps(details), // apply config's cssProps
            
            
            
            // borders:
            border            : borderVars.border,
         // borderRadius           : borderVars.borderRadius,
            borderStartStartRadius : borderVars.borderStartStartRadius,
            borderStartEndRadius   : borderVars.borderStartEndRadius,
            borderEndStartRadius   : borderVars.borderEndStartRadius,
            borderEndEndRadius     : borderVars.borderEndEndRadius,
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

export const usesTogglerLayout = () => {
    return style({
        ...style({
            // customize:
            ...usesCssProps(usesPrefixedProps(details, 'toggler')), // apply config's cssProps starting with toggler***
        }),
    });
};
export const usesTogglerVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(usesPrefixedProps(details, 'toggler'));
    
    
    
    return style({
        ...imports([
            // variants:
            resizableRule,
        ]),
    });
};

export const usesContentLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesCollapseLayout(),
        ]),
        ...style({
            // customize:
            ...usesCssProps(usesPrefixedProps(details, 'content')), // apply config's cssProps starting with content***
        }),
    });
};
export const usesContentVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(usesPrefixedProps(details, 'content'));
    
    
    
    return style({
        ...imports([
            // variants:
            resizableRule,
        ]),
    });
};
export const usesContentStates = () => {
    return style({
        ...imports([
            // states:
            usesCollapseStates(),
        ]),
    });
};

export const useDetailsStyleSheet = dynamicStyleSheets(() => ([
    mainScope({
        ...imports([
            // layouts:
            usesDetailsLayout(),
            
            // variants:
            usesDetailsVariants(),
        ]),
    }),
    scopeOf('toggler', {
        ...imports([
            // layouts:
            usesTogglerLayout(),
            
            // variants:
            usesTogglerVariants(),
        ]),
    }, { specificityWeight: 2 }), // increase the specificity weight to overcome .toggleButton's specificity weight
    scopeOf('content', {
        ...imports([
            // layouts:
            usesContentLayout(),
            
            // variants:
            usesContentVariants(),
            
            // states:
            usesContentStates(),
        ]),
    }, { specificityWeight: 2 }), // increase the specificity weight to overcome .basic's specificity weight
]), { id: '8sv7el5gq9' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export type DetailsStyle = 'content' // might be added more styles in the future
export interface DetailsVariant {
    detailsStyle ?: DetailsStyle
}
export const useDetailsVariant = (props: DetailsVariant) => {
    return {
        class: props.detailsStyle ?? null,
    };
};



// configs:
export const [details, detailsValues, cssDetailsConfig] = cssConfig(() => {
    return {
        // layouts:
        togglerDisplay   : 'block'                  as CssKnownProps['display'  ],
        togglerTextAlign : 'start'                  as CssKnownProps['textAlign'],
        
        
        
        // borders:
        borderStyle      : basics.borderStyle       as CssKnownProps['borderStyle' ],
        borderWidth      : basics.borderWidth       as CssKnownProps['borderWidth' ],
        borderColor      : basics.borderColor       as CssKnownProps['borderColor' ],
        
        borderRadius     : basics.borderRadius      as CssKnownProps['borderRadius'],
        borderRadiusSm   : basics.borderRadiusSm    as CssKnownProps['borderRadius'],
        borderRadiusLg   : basics.borderRadiusLg    as CssKnownProps['borderRadius'],
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
        
        // variants:
        DetailsVariant
{
    // accessibilities:
    label            ?: React.ReactNode
    
    
    
    // behaviors:
    lazy             ?: boolean
    
    
    
    // components:
    contentComponent ?: React.ReactComponentElement<any, BasicProps<TElement>>
    
    
    
    // children:
    children         ?: React.ReactNode
}
const Details = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: DetailsProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet          = useDetailsStyleSheet();
    
    
    
    // variants:
    const detailsVariant      = useDetailsVariant(props);
    
    
    
    // basic variant props:
    const {
        mild = true,
    ...restBasicVariantProps} = useBasicVariantProps(props);
    const basicVariantProps = {
        ...restBasicVariantProps,
        mild,
    };
    
    
    
    // rest props:
    const {
        // variants:
        detailsStyle : _detailsStyle, // remove
        
        
        
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
        
        toggleButtonComponent = (<ToggleButton   /> as React.ReactComponentElement<any, ToggleButtonProps>),
        
        contentComponent      = (<Basic<Element> /> as React.ReactComponentElement<any, BasicProps<Element>>),
        
        
        
        // children:
        children,
    ...restBasicProps} = props;
    
    
    
    // identifiers:
    const defaultId     = useId();
    const collapsibleId = contentComponent.props.id ?? defaultId;
    
    
    
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
    const variantClasses      = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        detailsVariant.class,
    );
    
    const toggleButtonClasses = useMergeClasses(
        // preserves the original `classes` from `toggleButtonComponent`:
        toggleButtonComponent.props.classes,
        
        
        
        // classes:
        styleSheet.toggler,
        
        
        
        // hacks:
        ((!activeFn || null) && 'last-visible-child'),
    );
    
    const contentStateClasses = useMergeClasses(
        // preserves the original `stateClasses` from `contentComponent`:
        contentComponent.props.stateClasses,
        
        
        
        // states:
        collapsibleState.class,
    );
    const contentClasses      = useMergeClasses(
        // preserves the original `classes` from `contentComponent`:
        contentComponent.props.classes,
        
        
        
        // classes:
        styleSheet.content,
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
    const contentHandleAnimationEnd       = useMergeEvents(
        // preserves the original `onAnimationEnd` from `contentComponent`:
        contentComponent.props.onAnimationEnd,
        
        
        
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
            
            
            
            // variants:
            mild={mild}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
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
            
            
            
            {/* collapsible <Basic> */}
            {React.cloneElement<BasicProps<Element>>(contentComponent,
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
                    classes         : contentClasses,
                    
                    
                    
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
