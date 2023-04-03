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
    useMergeClasses,
    
    
    
    // a semantic management system for react web components:
    SemanticTag,
    SemanticRole,
    
    
    
    // an accessibility management system:
    usePropEnabled,
    
    
    
    // a set of client-side functions:
    WithLinkAndElement,
    
    
    
    // a capability of UI to be clicked:
    ClickableProps,
    ClickableOptions,
    useClickable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
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
        
        
        
        // children:
        children,
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
    
    return (
        <WithLinkAndElement
            // components:
            elementComponent={actionControl} // the underlying `<Element>` to be `<Link>`-ed
        >
            {/* detect for `<Link>` component to be a `<WrapperLink>` and wraps the `<Element>` with rest `children` */}
            {children}
        </WithLinkAndElement>
    );
};
export {
    ActionControl,
    ActionControl as default,
}
