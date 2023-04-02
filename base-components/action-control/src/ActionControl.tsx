// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // checks if a certain css feature is supported by the running browser:
    supportsHasPseudoClass,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    
    
    
    // a semantic management system for react web components:
    SemanticTag,
    SemanticRole,
    useTestSemantic,
    
    
    
    // an accessibility management system:
    usePropEnabled,
    
    
    
    // a set of client-side functions:
    JsxClientSideLink,
    isClientSideLink,
    
    
    
    // a capability of UI to be clicked:
    ClickableProps,
    ClickableOptions,
    useClickable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import type {
    // react components:
    GenericProps,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // react components:
    ControlProps,
    Control,
}                           from '@reusable-ui/control'         // a base component



// defaults:
const _defaultSemanticTag      : SemanticTag  = [null, 'button', 'a'   ] // no corresponding semantic tag => defaults to <div>, fallbacks to <button>, <a>
const _defaultSemanticRole     : SemanticRole = [      'button', 'link'] // uses [role="button"] as the default semantic      , fallbacks to [role="link"]

const _defaultClickableOptions : ClickableOptions = {
    handleActionCtrlEvents : true, // needs to handle [space] key as onClick
    handleKeyEnterEvents   : true, // needs to handle [enter] key as onClick
};



// styles:
export const useActionControlStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, {
    id      : '5u3j6wjzxd',             // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
    lazyCsr : supportsHasPseudoClass(), // dealing with browsers that don't support the :has() selector
});



// react components:
export interface ActionControlProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        ControlProps<TElement>,
        
        // states:
        ClickableProps<TElement>
{
}
const ActionControl = <TElement extends Element = HTMLElement>(props: ActionControlProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet     = useActionControlStyleSheet();
    
    
    
    // states:
    const clickableState = useClickable<TElement>(props, _defaultClickableOptions);
    
    
    
    // fn props:
    const propEnabled    = usePropEnabled(props);
    
    
    
    // rest props:
    const {
        // states:
        pressed      : _pressed,        // remove
        
        
        
        // behaviors:
        actionMouses  : _actionMouses,  // remove
        actionTouches : _actionTouches, // remove
        actionKeys    : _actionKeys,    // remove
        releaseDelay  : _releaseDelay,  // remove
        
        
        
        // handlers:
        onClick      : _onClick,        // remove
    ...restControlProps} = props;
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // states:
        clickableState.class,
    );
    
    
    
    // handlers:
    const handleMouseDown      = useMergeEvents(
        // preserves the original `onMouseDown`:
        props.onMouseDown,
        
        
        
        // states:
        clickableState.handleMouseDown,
    );
    const handleTouchStart     = useMergeEvents(
        // preserves the original `onTouchStart`:
        props.onTouchStart,
        
        
        
        // states:
        clickableState.handleTouchStart,
    );
    const handleKeyDown        = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // states:
        clickableState.handleKeyDown,
    );
    const handleClick          = clickableState.handleClick;
    const handleAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart`:
        props.onAnimationStart,
        
        
        
        // states:
        clickableState.handleAnimationStart,
    );
    const handleAnimationEnd   = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        clickableState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    const actionControl = (
        <Control<TElement>
            // other props:
            {...restControlProps}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag  ?? _defaultSemanticTag }
            semanticRole = {props.semanticRole ?? _defaultSemanticRole}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            
            
            
            // link:
            {...(!propEnabled ? { href: undefined } : null)} // remove [href] if <ActionControl> is disabled
            
            
            
            // handlers:
            onMouseDown      = {handleMouseDown     }
            onTouchStart     = {handleTouchStart    }
            onKeyDown        = {handleKeyDown       }
            onClick          = {handleClick         }
            onAnimationStart = {handleAnimationStart}
            onAnimationEnd   = {handleAnimationEnd  }
        />
    );
    
    // inspect if <ActionControl>'s children contain one/more <Link>:
    const children       = (Array.isArray(props.children) ? props.children : React.Children.toArray(props.children)); // convert the children to array (if necessary)
    const clientSideLink = children.find(isClientSideLink); // take the first <Link> (if any)
    if (!clientSideLink) return actionControl;              // if no contain <Link> => normal <ActionControl>
    
    return (
        <WithLinkAndElement<TElement>
            // components:
            linkComponent    = {clientSideLink}
            elementComponent = {actionControl}
        >
            {children}
        </WithLinkAndElement>
    );
};
export {
    ActionControl,
    ActionControl as default,
}



interface WithLinkAndElementProps<TElement extends Element = HTMLElement> {
    // components:
    linkComponent     : JsxClientSideLink
    elementComponent  : React.ReactComponentElement<any, GenericProps<TElement>>
    
    
    
    // children:
    children         ?: React.ReactNode
}
const WithLinkAndElement = <TElement extends Element = HTMLElement>(props: WithLinkAndElementProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // components:
        linkComponent,
        elementComponent,
        
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    /*
        swaps between <Element> and <Link> while maintaining their's children, so:
        declaration:
        <Element>
            <c1>
            <c2>
            <Link>
                <c3>
                <c4>
            </Link>
            <c5>
            <c6>
        </Element>
        rendered to:
        <Link>
            <Element>
                <c1>
                <c2>
                <c3>
                <c4>
                <c5>
                <c6>
            </Element>
        </Link>
    */
    const mergedChildren = (
        (Array.isArray(children) ? children : React.Children.toArray(children)) // convert the children to array (if necessary)
        .flatMap((child): React.ReactNode[] => { // merge <Link>'s children and <ActionControl>'s children:
            // current <ActionControl>'s children:
            if (child !== linkComponent) return [child];
            
            
            
            // merge with <Link>'s children:
            return (
                React.Children.toArray(linkComponent.props.children) // unwrap the <Link>
                .map((grandChild) => { // fix the grandChild's key
                    if (!React.isValidElement(grandChild)) return grandChild;
                    return React.cloneElement(grandChild, { key: `${child.key}-${grandChild.key}` });
                })
            );
        })
    );
    
    
    
    // fn props:
    const propEnabled                     = usePropEnabled(elementComponent.props);
    const {isSemanticTag: isSemanticLink} = useTestSemantic(elementComponent.props, { semanticTag: 'a', semanticRole: 'link' });
    
    
    
    // jsx:
    if (!propEnabled) return React.cloneElement(elementComponent, // if <ActionControl> is disabled => no need to wrap with <Link>
        // props:
        undefined, // keeps the original <ActionControl>'s props
        
        
        
        // children:
        mergedChildren, // replace the children
    );
    
    const isNextJsLink = !!linkComponent.props.href;
    return React.cloneElement(linkComponent,
        // props:
        {
            // other props:
            ...restProps,
            
            
            
            // link props:
            ...( isNextJsLink  ? { legacyBehavior : true             } : undefined), // NextJs's <Link>
            ...(!isNextJsLink  ? { linkComponent  : elementComponent } : undefined), // ReactRouterCompat's <Link>
            ...(isSemanticLink ? { passHref       : true             } : undefined),
        },
        
        
        
        // children:
        (
            !isNextJsLink
            ?
            mergedChildren
            :
            <WithForwardRef
                // components:
                elementComponent={elementComponent}
            >
                {mergedChildren}
            </WithForwardRef>
        )
    );
};

interface WithForwardRefProps<TElement extends Element = HTMLElement>
    extends
        // forwards <Ui>:
        GenericProps<TElement>
{
    // components:
    elementComponent  : React.ReactComponentElement<any, GenericProps<TElement>>
    
    
    
    // children:
    children         ?: React.ReactNode
}
const WithForwardRef = React.forwardRef(<TElement extends Element = HTMLElement>(props: WithForwardRefProps<TElement>, ref: React.ForwardedRef<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // components:
        elementComponent,
        
        
        
        // children:
        children,
    ...restActionControlProps} = props;
    
    
    
    // refs:
    const mergedOuterRef = useMergeRefs(
        // preserves the original `outerRef`:
        props.outerRef,
        
        
        
        // forwards:
        ref,
    );
    
    
    
    // jsx:
    return React.cloneElement(elementComponent,
        // props:
        {
            // other props:
            ...restActionControlProps,
            
            
            
            // refs:
            outerRef : mergedOuterRef,
        },
        
        
        
        // children:
        children,
    );
});
