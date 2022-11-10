// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    keyframes,
    style,
    imports,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
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
    
    
    
    // animation stuff of UI:
    usesAnimation,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // a capability of UI to be clicked:
    usesClickable,
    ClickableProps,
    ClickableOptions,
    useClickable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

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
const _defaultSemanticTag      : SemanticTag  = [null, 'button', 'a'   ] // no corresponding semantic tag => defaults to <div>, fallbacks to <button>, <a>
const _defaultSemanticRole     : SemanticRole = [      'button', 'link'] // uses [role="button"] as the default semantic      , fallbacks to [role="link"]

const _defaultClickableOptions : ClickableOptions = {
    handleActionCtrlEvents : true, // needs to handle [space] key as onClick
    handleKeyEnterEvents   : true, // needs to handle [enter] key as onClick
};



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
    keyframesPress.value   = 'press';   // the @keyframes name should contain 'press'   in order to be recognized by `useClickable`
    const [keyframesReleaseRule, keyframesRelease] = keyframes({
        from : framePressed,
        to   : frameReleased,
    });
    keyframesRelease.value = 'release'; // the @keyframes name should contain 'release' in order to be recognized by `useClickable`
    
    
    
    // supports for `usesActiveAsClick()`:
    const [keyframesPressAsActiveRule  , keyframesPressAsActive  ] = keyframes({
        from : frameReleased,
        to   : framePressed,
    });
    keyframesPressAsActive.value   = `${keyframesPress.value}as-active`;     // the @keyframes name should contain 'active'  in order to be recognized by `useActivatable`
    const [keyframesReleaseAsPassiveRule, keyframesReleaseAsPassive] = keyframes({
        from : framePressed,
        to   : frameReleased,
    });
    keyframesReleaseAsPassive.value = `${keyframesRelease.value}as-passive`; // the @keyframes name should contain 'passive' in order to be recognized by `useActivatable`
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
        
        // supports for `usesActiveAsClick()`:
        ...keyframesPressAsActiveRule,
        ...keyframesReleaseAsPassiveRule,
        animPressAsActive   : [
            ['150ms', 'ease-out', 'both', keyframesPressAsActive   ],
        ]                       as CssKnownProps['animation'],
        animReleaseAsPassive : [
            ['300ms', 'ease-out', 'both', keyframesReleaseAsPassive],
        ]                       as CssKnownProps['animation'],
    };
}, { prefix: 'act' });



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
        releaseDelay  : _releaseDelay,  // remove
        
        
        
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
    const children       = React.Children.toArray(props.children); // convert the children to array
    const clientSideLink = children.find(isClientSideLink);        // take the first <Link> (if any)
    if (!clientSideLink) return actionControl;                     // if no contain <Link> => normal <ActionControl>
    
    return (
        /*
            swaps between <Control> and <Link> while maintaining their's children, so:
            declaration:
            <Control>
                <c1>
                <c2>
                <Link>
                    <c3>
                    <c4>
                </Link>
                <c5>
                <c6>
            </Control>
            rendered to:
            <Link>
                <Control>
                    <c1>
                    <c2>
                    <c3>
                    <c4>
                    <c5>
                    <c6>
                </Control>
            </Link>
        */
        <ClientSideLinkSwapper<TElement>
            // components:
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
        </ClientSideLinkSwapper>
    );
};
export {
    ActionControl,
    ActionControl as default,
}



interface ClientSideLinkSwapperProps<TElement extends Element = HTMLElement> {
    // components:
    linkComponent    : JsxClientSideLink
    actionComponent  : React.ReactComponentElement<typeof ActionControl, ActionControlProps<TElement>>
    
    
    
    // children:
    children        ?: React.ReactNode
}
const ClientSideLinkSwapper = <TElement extends Element = HTMLElement>(props: ClientSideLinkSwapperProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // components:
        linkComponent,
        actionComponent,
        
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
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
            // other props:
            ...restProps,
            
            
            
            // link props:
            ...( isNextJsLink  ? { legacyBehavior : true            } : undefined), // NextJs's <Link>
            ...(!isNextJsLink  ? { linkComponent  : actionComponent } : undefined), // ReactRouterCompat's <Link>
            ...(isSemanticLink ? { passHref       : true            } : undefined),
        },
        
        
        
        // children:
        (
            !isNextJsLink
            ?
            children
            :
            <ForwardRefWrapper
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
        
        
        
        // forwards:
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
