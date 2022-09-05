// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    keyframes,
    
    
    
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
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // hooks:
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // types:
    SemanticTag,
    SemanticRole,
    
    
    
    // hooks:
    useTestSemantic,
}                           from '@reusable-ui/semantics'       // a semantic management system for react web components
import {
    // hooks:
    usePropEnabled,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import {
    // utilities:
    JsxClientSideLink,
    isClientSideLink,
}                           from '@reusable-ui/client-sides'    // a set of client-side functions

// reusable-ui features:
import {
    // hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'       // animation stuff of UI

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI

// reusable-ui states:
import {
    // hooks:
    usesClickable,
    ClickableProps,
    ClickableOptions,
    useClickable,
}                           from '@reusable-ui/clickable'       // a capability of UI to be clicked

// reusable-ui components:
import {
    // styles:
    usesControlLayout,
    usesControlVariants,
    usesControlStates,
    
    
    
    // react components:
    ControlProps,
    Control,
}                           from '@reusable-ui/control'         // a base component



// defaults:
const _defaultSemanticTag      : SemanticTag  = [null, 'button', 'a'   ] // uses <div>           as the default semantic, fallbacks to <button>, <a>
const _defaultSemanticRole     : SemanticRole = [      'button', 'link'] // uses [role="button"] as the default semantic, fallbacks to [role="link"]

const _defaultClickableOptions : ClickableOptions = {
    handleActionCtrlEvents : true, // needs to handle [space] key as click
    handleKeyEnterEvents   : true, // needs to handle [enter] key as click
};



// styles:
export const usesActionControlLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesControlLayout(),
        ]),
        ...style({
            // accessibilities:
            userSelect              : 'none',         // disable selecting text (double clicking not causing selecting text)
            touchAction             : 'manipulation', // all gestures are preserved except a double click, to make clicking faster
            WebkitTapHighlightColor : 'transparent',  // no tap_&_hold highlight
            
            
            // customize:
            ...usesCssProps(actionControls), // apply config's cssProps
        }),
    });
};
export const usesActionControlVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(actionControls);
    
    
    
    return style({
        ...imports([
            // variants:
            usesControlVariants(),
            resizableRule,
        ]),
    });
};
export const usesActionControlStates = () => {
    // dependencies:
    
    // states:
    const {clickableRule} = usesClickable(actionControls);
    
    
    
    return style({
        ...imports([
            // states:
            usesControlStates(),
            clickableRule,
        ]),
    });
};

export const useActionControlStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesActionControlLayout(),
        
        // variants:
        usesActionControlVariants(),
        
        // states:
        usesActionControlStates(),
    ]),
}), { id: '5u3j6wjzxd' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [actionControls, actionControlValues, cssActionControlConfig] = cssConfig(() => {
    // dependencies:
    
    const {animationRegistry : {filters            }} = usesAnimation();
    const {clickableVars     : {filter: filterPress}} = usesClickable();
    
    
    
    //#region keyframes
    const frameReleased = style({
        filter : [[
            ...filters.filter((f) => (f !== filterPress)), // the rest filter(s)
        ]],
    });
    const framePressed  = style({
        filter : [[
            ...filters.filter((f) => (f !== filterPress)), // the rest filter(s)
            filterPress, // the interpolating filter
        ]],
    });
    const [keyframesPressRule  , keyframesPress  ] = keyframes({
        from : frameReleased,
        to   : framePressed,
    });
    keyframesPress.value   = 'press';   // the @keyframes name should contain 'press'   in order to be recognized by `useEnableDisableState`
    const [keyframesReleaseRule, keyframesRelease] = keyframes({
        from : framePressed,
        to   : frameReleased,
    });
    keyframesRelease.value = 'release'; // the @keyframes name should contain 'release' in order to be recognized by `useEnableDisableState`
    //#endregion keyframes
    
    
    
    return {
        // accessibilities:
        cursor      : 'pointer' as CssKnownProps['cursor'],
        
        
        
        // animations:
        filterPress : [[
            'brightness(65%)',
            'contrast(150%)',
        ]]                      as CssKnownProps['filter'],
        
        ...keyframesPressRule,
        ...keyframesReleaseRule,
        animPress   : [
            ['150ms', 'ease-out', 'both', keyframesPress ],
        ]                       as CssKnownProps['animation'],
        animRelease : [
            ['300ms', 'ease-out', 'both', keyframesRelease],
        ]                       as CssKnownProps['animation'],
    };
}, { prefix: 'act' });



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
        pressed      : _pressed,      // remove
        
        
        
        // behaviors:
        actionMouses  : _actionMouses,  // remove
        actionTouches : _actionTouches, // remove
        actionKeys    : _actionKeys,    // remove
        
        
        
        // handlers:
        onClick      : _onClick,      // remove
    ...restControlProps} = props;
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // states:
        clickableState.class,
    );
    
    
    
    // handlers:
    const handleMouseDown    = useMergeEvents(
        // preserves the original `onMouseDown`:
        props.onMouseDown,
        
        
        
        // states:
        clickableState.handleMouseDown,
    );
    const handleTouchStart   = useMergeEvents(
        // preserves the original `onTouchStart`:
        props.onTouchStart,
        
        
        
        // states:
        clickableState.handleTouchStart,
    );
    const handleKeyDown      = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // states:
        clickableState.handleKeyDown,
    );
    const handleKeyUp        = useMergeEvents(
        // preserves the original `onKeyUp`:
        props.onKeyUp,
        
        
        
        // states:
        clickableState.handleKeyUp,
    );
    const handleClick        = clickableState.handleClick;
    const handleAnimationEnd = useMergeEvents(
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
            onMouseDown    = {handleMouseDown   }
            onTouchStart   = {handleTouchStart  }
            onKeyDown      = {handleKeyDown     }
            onKeyUp        = {handleKeyUp       }
            onClick        = {handleClick       }
            onAnimationEnd = {handleAnimationEnd}
        />
    );
    
    // inspect if <ActionControl>'s children contain one/more <Link>:
    const children       = React.Children.toArray(props.children); // convert the children to array
    const clientSideLink = children.find(isClientSideLink);        // take the first <Link> (if any)
    if (!clientSideLink) return actionControl;                     // if no contain <Link> => normal <ActionControl>
    
    return (
        <ClientSideLinkWrapper<TElement>
            linkComponent={clientSideLink}
            actionComponent={actionControl}
        >
            {children.flatMap((child): React.ReactNode[] => { // merge <Link>'s children and <ActionControl>'s children:
                // current <ActionControl>'s children:
                if (child !== clientSideLink) return [child];
                
                
                
                // merge with <Link>'s children:
                return (
                    React.Children.toArray(clientSideLink.props.children) // unwrap the <Link>
                    .map((grandChild) => { // fix the grandChild's key
                        if (!React.isValidElement(grandChild)) return grandChild;
                        return React.cloneElement(grandChild, { key: `${child.key}-${grandChild.key}` });
                    })
                );
            })}
        </ClientSideLinkWrapper>
    );
};
export {
    ActionControl,
    ActionControl as default,
}



interface ClientSideLinkWrapperProps<TElement extends Element = HTMLElement> {
    // components:
    linkComponent   : JsxClientSideLink
    actionComponent : React.ReactComponentElement<typeof ActionControl, ActionControlProps<TElement>>
    
    
    
    // children:
    children       ?: React.ReactNode
}
const ClientSideLinkWrapper = <TElement extends Element = HTMLElement>({ linkComponent, actionComponent, children }: ClientSideLinkWrapperProps<TElement>): JSX.Element|null => {
    // fn props:
    const propEnabled                     = usePropEnabled(actionComponent.props);
    const {isSemanticTag: isSemanticLink} = useTestSemantic(actionComponent.props, { semanticTag: 'a', semanticRole: 'link' });
    
    
    
    // jsx:
    if (!propEnabled) return React.cloneElement(actionComponent, // if <ActionControl> is disabled => no need to wrap with <Link>
        // props:
        undefined, // keeps the original <ActionControl>'s props
        
        
        
        // children:
        children, // replace the children
    );
    
    const isNextJsLink = !!linkComponent.props.href;
    return React.cloneElement(linkComponent,
        // props:
        {
            ...(!isNextJsLink  ? { linkComponent : actionComponent } : undefined),
            ...(isSemanticLink ? { passHref      : true            } : undefined),
        },
        
        
        
        // children:
        (
            !isNextJsLink
            ?
            children
            :
            <ForwardRefWrapper
                // other props:
                {...actionComponent.props}
                
                
                
                // components:
                actionComponent={actionComponent}
            >
                {children}
            </ForwardRefWrapper>
        )
    );
};

interface ForwardRefWrapperProps<TElement extends Element = HTMLElement>
    extends
        // forwards <ActionControl>:
        ActionControlProps<TElement>
{
    // components:
    actionComponent  : React.ReactComponentElement<typeof ActionControl, ActionControlProps<TElement>>
    
    
    
    // children:
    children        ?: React.ReactNode
}
const ForwardRefWrapper = React.forwardRef(<TElement extends Element = HTMLElement>(props: ForwardRefWrapperProps<TElement>, ref: React.ForwardedRef<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // components:
        actionComponent,
        
        
        
        // children:
        children,
    ...restActionControlProps} = props;
    
    
    
    // refs:
    const mergedOuterRef = useMergeRefs(
        // preserves the original `outerRef`:
        props.outerRef,
        
        
        
        ref,
    );
    
    
    
    // jsx:
    return React.cloneElement(actionComponent,
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
