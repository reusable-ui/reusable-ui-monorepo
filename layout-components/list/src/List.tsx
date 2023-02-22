// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // cssfn general types:
    Optional,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
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
import {
    // react components:
    ActionControl,
}                           from '@reusable-ui/action-control'  // a base component
import {
    // hooks:
    SemanticButtonProps,
    useSemanticButton,
}                           from '@reusable-ui/button'          // a button component

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



// defaults:
const _defaultSemanticTag              : SemanticTag        = ['ul', 'ol'] // uses <ul>          as the default semantic, fallbacks to <ol>
const _defaultSemanticRole             : SemanticRole       = ['list'    ] // uses [role="list"] as the default semantic

const _defaultActionCtrl               : boolean|undefined  = undefined
const _defaultItemActionCtrl           : boolean            = false

const _defaultListSeparatorItemClasses : Optional<string>[] = ['void']



// styles:
export const useListItemStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/listItemStyles.js')
, { id: '2vajf0sgc2' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names

export const useListSeparatorItemStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/listSeparatorItemStyles.js')
, {
    specificityWeight : 2,            // makes <ListSeparatorItem> more specific than <ListItem>
    id                : 'n8qnfmo0ja', // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
});

export const useListActionItemStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/listActionItemStyles.js')
, { id: '1jdx2owh1e' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names

export const useListStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/listStyles.js')
, { id: 'dj4jw72kyr' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// handlers:
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
export interface ListItemProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        SemanticButtonProps<TElement>
{
    // accessibilities:
    // change default value to `true`
    /**
     * `undefined` : same as `true`.  
     * `true`      : inherits `active` from `List`.  
     * `false`     : independent `active`.
     */
    inheritActive ?: boolean
    
    
    
    // behaviors:
    actionCtrl    ?: boolean
    
    
    
    // children:
    children      ?: React.ReactNode
}
export const ListItem = <TElement extends Element = HTMLElement>(props: ListItemProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet           = useListItemStyleSheet();
    const actionStyleSheet     = useListActionItemStyleSheet();
    
    
    
    // rest props:
    const {
        // behaviors:
        actionCtrl = _defaultItemActionCtrl,
    ...restActionControlProps} = props;
    
    
    
    // fn props:
    const {
        semanticTag  : buttonSemanticTag,
        semanticRole : buttonSemanticRole,
        
        tag  : buttonTag,
        role : buttonRole,
        isSemanticButton,
        
        type : buttonType,
    } = useSemanticButton(props);
    
    /*
        if not [actionCtrl] => use props's semantic(Tag|Role)
        if  is [actionCtrl] => use props's semantic(Tag|Role) ?? use <Button>'s semantic(Tag|Role)
    */
    const semanticTag     = !actionCtrl ? props.semanticTag  : (props.semanticTag  ?? buttonSemanticTag );
    const semanticRole    = !actionCtrl ? props.semanticRole : (props.semanticRole ?? buttonSemanticRole);
    
    /*
        if not [actionCtrl] => use props's (tag|role|type)
        if  is [actionCtrl] => use props's (tag|role|type) ?? (
            if not [defaulting to <button>] => use <button>'s (tag|role|type)
            if  is [defaulting to <button>] => use props's (tag|role|type) ?? replace <button> with <div role='button' type={props.type}>
        )
    */
    const isDefaultButton = isSemanticButton && (props.tag === undefined); // determines if the [tag] was defaulting to <button>
    const tag             = !actionCtrl ? props.tag          : (!isDefaultButton ? buttonTag  : (props.tag  ??                'div'     ));
    const role            = !actionCtrl ? props.role         : (!isDefaultButton ? buttonRole : (props.role ?? (buttonRole || 'button' )));
    const type            = !actionCtrl ? props.type         : (!isDefaultButton ? buttonType : (props.type ??                undefined ));
    
    
    
    // jsx:
    return (
        actionCtrl
        ?
        <ActionControl<TElement>
            // other props:
            {...restActionControlProps}
            
            
            
            // semantics:
            semanticTag  = {semanticTag }
            semanticRole = {semanticRole}
            tag          = {tag}
            role         = {role}
            
            
            
            // variants:
            mild={props.mild ?? 'inherit'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? [styleSheet.main, actionStyleSheet.main].join(' ')}
            
            
            
            // accessibilities:
            inheritActive={props.inheritActive ?? true} // change default value to `true`
            
            
            
            // Button props:
            {...{
                // actions:
                type,
            }}
        />
        :
        <Indicator<TElement>
            // other props:
            {...restActionControlProps}
            
            
            
            // semantics:
            semanticTag  = {semanticTag }
            semanticRole = {semanticRole}
            tag          = {tag}
            role         = {role}
            
            
            
            // variants:
            mild={props.mild ?? 'inherit'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // accessibilities:
            inheritActive={props.inheritActive ?? true} // change default value to `true`
        />
    );
};



export interface ListSeparatorItemProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        Omit<Pick<ListItemProps<TElement>, keyof IndicatorProps>, 'children'> // [actionCtrl] & related props are not supported
{
}
export const ListSeparatorItem = <TElement extends Element = HTMLElement>(props: ListSeparatorItemProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet           = useListItemStyleSheet();
    const separatorStyleSheet  = useListSeparatorItemStyleSheet();
    
    
    
    // classes:
    const classes = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // classes:
        _defaultListSeparatorItemClasses,
    );
    
    
    
    // jsx:
    return (
        <ListItem<TElement>
            // other props:
            {...props}
            
            
            
            // classes:
            mainClass={props.mainClass ?? [styleSheet.main, separatorStyleSheet.main].join(' ')}
            classes={classes}
        >
            <hr />
        </ListItem>
    );
};



interface WrapperItemProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        GenericProps<TElement>
{
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
    const handleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // hack:
        handleAnimationEndForward,
    );
    
    
    
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
            onAnimationEnd={handleAnimationEnd}
        >
            {React.Children.map(children, (child, index) => {
                // conditions:
                if ((child === undefined) || (child === null) || (child === true) || (child === false)) return child; // ignore nullish child
                
                
                
                // jsx:
                return (
                    <WrapperItem<HTMLLIElement>
                        // identifiers:
                        key={index}
                        
                        
                        
                        // semantics:
                        tag={wrapperTag}
                    >
                        {!React.isValidElement<ListItemProps<Element>>(child) ? child : React.cloneElement(child,
                            // props:
                            {
                                // behaviors:
                                ...(((): boolean => {
                                    // conditions:
                                    if (child.type === ListSeparatorItem)      return false;
                                    if (child.props.classes?.includes('void')) return false;
                                    
                                    
                                    
                                    // result:
                                    return (
                                        child.props.actionCtrl
                                        ??
                                        defaultActionCtrl // the default <ListItem>'s actionCtrl value, if not assigned
                                        ??
                                        false             // if <List>'s actionCtrl was not assigned => default to false
                                    );
                                })() ? { actionCtrl: true } : null), // assign actionCtrl props if (actionCtrl === true), otherwise do not append actionCtrl prop
                            },
                        )}
                    </WrapperItem>
                );
            })}
        </Indicator>
    );
};
export {
    List,
    List as default,
}



export interface ListItemComponentProps<TElement extends Element = HTMLElement>
{
    // components:
    listItemComponent ?: React.ReactComponentElement<any, ListItemProps<TElement>>
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
