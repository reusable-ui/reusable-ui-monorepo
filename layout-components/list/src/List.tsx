// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useMemo,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a set of React node utility functions:
    flattenChildren,
    isTruthyNode,
    
    
    
    // react helper hooks:
    useMergeEvents,
    useMergeClasses,
    
    
    
    // a semantic management system for react web components:
    Tag,
    SemanticTag,
    SemanticRole,
    useTestSemantic,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableProps,
    useOrientationable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a base component
import {
    // react components:
    IndicatorProps,
    Indicator,
}                           from '@reusable-ui/indicator'       // a base component

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from './defaults.js'
import {
    // variants:
    ListVariant,
    useListVariant,
}                           from './variants/ListVariant.js'
import type {
    // react components:
    ListItemProps,
}                           from './ListItem.js'
import {
    // react components:
    ListSeparatorItem,
}                           from './ListSeparatorItem.js'



// defaults:
const _defaultSemanticTag  : SemanticTag        = ['ul', 'ol'] // uses <ul>          as the default semantic tag, fallbacks to <ol>
const _defaultSemanticRole : SemanticRole       = ['list'    ] // uses [role="list"] as the default semantic role

const _defaultActionCtrl   : boolean|undefined  = undefined



// styles:
export const useListStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/listStyles.js')
, { id: 'dj4jw72kyr' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// handlers:
export const handleAnimationStartForward : React.AnimationEventHandler<Element> = (event) => {
    /**
     * because the `usesListLayout` is neither inherit from `usesIndicatorLayout` nor applies `anim: ...`,
     * so the `onAnimationStart` will __never__ triggered directly (non_bubbled).
     * 
     * the `useDisableable() => handleAnimationStart` only perform non_bubbled `onAnimationStart`.
     * 
     * thus we need to trigger `onAnimationStart` at <List> level by forwarding `onAnimationStart` bubbled from <ListItem>
     * 
     * <List>
     *     <wrapper>
     *         <ListItem onAnimationStart={...} />
     *     </wrapper>
     * </List>
     */
    if ((event.target as Element)?.parentElement?.parentElement === event.currentTarget) {
        event.currentTarget.dispatchEvent(new AnimationEvent('animationstart', { animationName: event.animationName, bubbles: true, composed: true }));
    } // if
};
export const handleAnimationEndForward : React.AnimationEventHandler<Element> = (event) => {
    /**
     * because the `usesListLayout` is neither inherit from `usesIndicatorLayout` nor applies `anim: ...`,
     * so the `onAnimationEnd` will __never__ triggered directly (non_bubbled).
     * 
     * the `useDisableable() => handleAnimationEnd` only perform non_bubbled `onAnimationEnd`.
     * 
     * thus we need to trigger `onAnimationEnd` at <List> level by forwarding `onAnimationEnd` bubbled from <ListItem>
     * 
     * <List>
     *     <wrapper>
     *         <ListItem onAnimationEnd={...} />
     *     </wrapper>
     * </List>
     */
    if ((event.target as Element)?.parentElement?.parentElement === event.currentTarget) {
        event.currentTarget.dispatchEvent(new AnimationEvent('animationend', { animationName: event.animationName, bubbles: true, composed: true }));
    } // if
};



// react components:
interface WrapperItemProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        GenericProps<TElement>
{
    // children:
    children ?: React.ReactNode
}
const WrapperItem = <TElement extends Element = HTMLElement>(props: WrapperItemProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // children:
        children,
    ...restGenericProps} = props;
    
    
    
    // classes:
    const flexes = (() => {
        // conditions:
        if (!React.isValidElement<GenericProps<Element>>(children)) return null;
        
        
        
        // fn props:
        const classNames = (children.props.className ?? '').split(' ');
        const classes    = (children.props.classes ?? []);
        const isFluid    = classNames.includes('fluid') || classes.includes('fluid');
        const isSolid    = classNames.includes('solid') || classes.includes('solid');
        
        
        
        // result:
        return {
            isFluid,
            isSolid,
        };
    })();
    const classes = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // classes:
        (flexes?.isFluid || undefined) && 'fluid',
        (flexes?.isSolid || undefined) && 'solid',
    );
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...restGenericProps}
            
            
            
            // classes:
            classes={classes}
        >
            {children}
        </Generic>
    );
};



export interface ListProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        Omit<IndicatorProps<TElement>,
            // variants:
            |'nude' // <List> cannot be [nude]
        >,
        
        // <ul>|<ol>:
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >,
        
        // variants:
        OrientationableProps,
        ListVariant,
        
        // behaviors:
        Pick<ListItemProps<TElement>, 'actionCtrl'>
{
    // children:
    children ?: React.ReactNode
}
const List = <TElement extends Element = HTMLElement>(props: ListProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet             = useListStyleSheet();
    
    
    
    // variants:
    const orientationableVariant = useOrientationable(props, defaultOrientationableOptions);
    const listVariant            = useListVariant(props);
    
    
    
    // rest props:
    const {
        // variants:
        orientation : _orientation, // remove
        listStyle   : _listStyle,   // remove
        
        
        
        // behaviors:
        actionCtrl  : defaultActionCtrl = _defaultActionCtrl,
        
        
        
        // children:
        children,
    ...restIndicatorProps} = props;
    
    
    
    // fn props:
    const semanticTag  = props.semanticTag  ?? _defaultSemanticTag ;
    const semanticRole = props.semanticRole ?? _defaultSemanticRole;
    const {
        isSemanticTag : isSemanticList,
    } = useTestSemantic(
        // test:
        {
            tag  : props.tag,
            role : props.role,
            semanticTag,
            semanticRole,
        },
        
        // expected:
        {
            semanticTag  : _defaultSemanticTag,
            semanticRole : _defaultSemanticRole,
        }
    );
    const wrapperTag : Tag = (isSemanticList ? 'li' : 'div');
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationableVariant.class,
        listVariant.class,
    );
    
    
    
    // handlers:
    const handleAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart`:
        props.onAnimationStart,
        
        
        
        // hack:
        handleAnimationStartForward,
    );
    const handleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // hack:
        handleAnimationEndForward,
    );
    
    
    
    // children:
    const wrappedChildren = useMemo<React.ReactNode[]>(() =>
        flattenChildren(children)
        .filter(isTruthyNode) // only truthy children, so the <WrapperItem> doesn't wrap nullish children
        .map<React.ReactNode>((child, index) => {
            // tests:
            const isElement        = React.isValidElement<ListItemProps<Element>>(child);
            const mutateActionCtrl = isElement && (
                (defaultActionCtrl === true)                                   // assign <ListItem>'s [actionCtrl] props if <List>'s [actionCtrl === true], otherwise do not mutate
                &&
                (child.props.actionCtrl === undefined)                         // the <ListItem>'s [actionCtrl] is not already been set, otherwise do not mutate
                &&
                (child.type !== ListSeparatorItem)                             // not a <ListSeparatorItem>, otherwise do not mutate
                &&
                (
                    (!child.props.classes?.includes?.('void'))                 // not marked as '.void', otherwise do not mutate
                    ||
                    (!child.props.className?.split?.(' ')?.includes?.('void')) // not marked as '.void', otherwise do not mutate
                )
            );
            
            
            
            // jsx:
            return (
                /* wrap child with <WrapperItem> */
                <WrapperItem<HTMLLIElement>
                    // identifiers:
                    key={(isElement ? child.key : null) ?? index}
                    
                    
                    
                    // semantics:
                    tag={wrapperTag}
                >
                    {
                        mutateActionCtrl
                        ? React.cloneElement<ListItemProps<Element>>(child,
                            // props:
                            {
                                // behaviors:
                                actionCtrl : true,
                            },
                        )
                        : child
                    }
                </WrapperItem>
            );
        })
    , [children]);
    
    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restIndicatorProps}
            
            
            
            // semantics:
            semanticTag  = {semanticTag }
            semanticRole = {semanticRole}
            
            aria-orientation={props['aria-orientation'] ?? orientationableVariant['aria-orientation']}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            
            
            
            // handlers:
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
        >
            {wrappedChildren}
        </Indicator>
    );
};
export {
    List,
    List as default,
}



export interface ListComponentProps<TElement extends Element = HTMLElement>
{
    // refs:
    listRef         ?: React.Ref<TElement> // setter ref
    
    
    
    // variants:
    listOrientation ?: ListProps<TElement>['orientation']
    listStyle       ?: ListProps<TElement>['listStyle']
    
    
    
    // components:
    listComponent   ?: React.ReactComponentElement<any, ListProps<TElement>>
    listItems       ?: ListProps<TElement>['children']
}
