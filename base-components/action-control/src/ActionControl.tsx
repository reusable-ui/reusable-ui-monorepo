// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    useEffect,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    states,
    keyframes,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // utilities:
    cssVars,
}                           from '@cssfn/css-vars'              // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // utilities:
    isForwardRef,
}                           from '@reusable-ui/utilities'       // common utility functions
import {
    // hooks:
    useEvent,
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
    usePropReadOnly,
}                           from '@reusable-ui/accessibilities' // an accessibility management system

// reusable-ui features:
import {
    // hooks:
    usesAnimation,
    
    
    
    // utilities:
    fallbackNoneFilter,
}                           from '@reusable-ui/animation'       // animation stuff of UI

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI

// reusable-ui components:
import {
    // types:
    StateMixin,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    markActive,
    
    
    
    // styles:
    usesControlLayout,
    usesControlVariants,
    usesControlStates,
    
    
    
    // react components:
    ControlProps,
    Control,
}                           from '@reusable-ui/control'         // a base component

// other libs:
import type {
    // types:
    To,
}                           from 'history'                      // a helper lib



// defaults:
const _defaultActionMouses : number[]|null = [0]       // left click
const _defaultActionKeys   : string[]|null = ['space'] // space key

const _defaultSemanticTag  : SemanticTag  = [null, 'button', 'a'   ] // uses <div>           as the default semantic, fallbacks to <button>, <a>
const _defaultSemanticRole : SemanticRole = [      'button', 'link'] // uses [role="button"] as the default semantic, fallbacks to [role="link"]



// hooks:

// accessibilities:

//#region pressRelease
export interface PressReleaseVars {
    filter : any
    anim   : any
}
const [presses] = cssVars<PressReleaseVars>();

{
    const {animationRegistry: {registerFilter, registerAnim}} = usesAnimation();
    registerFilter(presses.filter);
    registerAnim(presses.anim);
}



// .pressed will be added after pressing-animation done:
const selectorIfPressed   = '.pressed'
// .pressing = styled press, :active = native press:
// the .disabled, .disable are used to kill native :active
// the .pressed, .releasing, .released are used to overwrite native :active
// const selectorIfPressing  = ':is(.pressing, :active:not(:is(.disabled, .disable, .pressed, .releasing, .released)))'
const selectorIfPressing  = '.pressing'
// .releasing will be added after loosing press and will be removed after releasing-animation done:
const selectorIfReleasing = '.releasing'
// if all above are not set => released:
// optionally use .released to overwrite native :active
// const selectorIfReleased  = ':is(:not(:is(.pressed, .pressing, :active:not(:is(.disabled, .disable)), .releasing)), .released)'
const selectorIfReleased  = ':not(:is(.pressed, .pressing, .releasing))'

export const ifPressed        = (styles: CssStyleCollection): CssRule => rule(selectorIfPressed  , styles);
export const ifPressing       = (styles: CssStyleCollection): CssRule => rule(selectorIfPressing , styles);
export const ifReleasing      = (styles: CssStyleCollection): CssRule => rule(selectorIfReleasing, styles);
export const ifReleased       = (styles: CssStyleCollection): CssRule => rule(selectorIfReleased , styles);

export const ifPress          = (styles: CssStyleCollection): CssRule => rule([selectorIfPressing, selectorIfPressed                                         ], styles);
export const ifRelease        = (styles: CssStyleCollection): CssRule => rule([                                       selectorIfReleasing, selectorIfReleased], styles);
export const ifPressReleasing = (styles: CssStyleCollection): CssRule => rule([selectorIfPressing, selectorIfPressed, selectorIfReleasing                    ], styles);



/**
 * Uses press & release states.
 * @returns A `StateMixin<PressReleaseVars>` represents press & release state definitions.
 */
export const usesPressReleaseState = (): StateMixin<PressReleaseVars> => {
    return [
        () => style({
            ...states([
                ifPressed({
                    ...vars({
                        [presses.filter] : actionControls.filterPress,
                    }),
                }),
                ifPressing({
                    ...vars({
                        [presses.filter] : actionControls.filterPress,
                        [presses.anim  ] : actionControls.animPress,
                    }),
                }),
                ifReleasing({
                    ...vars({
                        [presses.filter] : actionControls.filterPress,
                        [presses.anim  ] : actionControls.animRelease,
                    }),
                }),
            ]),
        }),
        presses,
    ];
};



export const usePressReleaseState  = <TElement extends Element = HTMLElement>(props: ActionControlProps<TElement>) => {
    // fn props:
    const propEnabled           = usePropEnabled(props);
    const propReadOnly          = usePropReadOnly(props);
    const propEditable          = propEnabled && !propReadOnly;
    const isControllablePressed = (props.pressed !== undefined);
    
    const actionMouses          = (props.actionMouses !== undefined) ? props.actionMouses : _defaultActionMouses;
    const actionKeys            = (props.actionKeys   !== undefined) ? props.actionKeys   : _defaultActionKeys;
    
    
    
    // states:
    const [pressed,   setPressed  ] = useState<boolean>(props.pressed ?? false); // true => pressed, false => released
    const [animating, setAnimating] = useState<boolean|null>(null);              // null => no-animation, true => pressing-animation, false => releasing-animation
    
    const [pressDn,   setPressDn  ] = useState<boolean>(false);                  // uncontrollable (dynamic) state: true => user pressed, false => user released
    
    
    
    // resets:
    if (pressDn && (!propEditable || isControllablePressed)) {
        setPressDn(false); // lost press because the control is not editable, when the control is re-editable => still lost press
    } // if
    
    
    
    /*
     * state is always released if (disabled || readOnly)
     * state is pressed/released based on [controllable pressed] (if set) and fallback to [uncontrollable pressed]
     */
    const pressedFn : boolean = propEditable && (props.pressed /*controllable*/ ?? pressDn /*uncontrollable*/);
    
    if (pressed !== pressedFn) { // change detected => apply the change & start animating
        setPressed(pressedFn);   // remember the last change
        setAnimating(pressedFn); // start pressing-animation/releasing-animation
    } // if
    
    
    
    // dom effects:
    
    const asyncHandleRelease = useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
    useEffect(() => {
        // cleanups:
        return () => {
            // cancel out previously handleReleaseLate (if any):
            if (asyncHandleRelease.current) clearTimeout(asyncHandleRelease.current);
        };
    }, []); // runs once on startup
    
    useEffect(() => {
        // conditions:
        if (!propEditable)         return; // control is not editable => no response required
        if (isControllablePressed) return; // controllable [pressed] is set => no uncontrollable required
        
        
        
        // handlers:
        const handleRelease = (): void => {
            setPressDn(false);
        };
        const handleReleaseLate = (): void => {
            // cancel out previously handleReleaseLate (if any):
            if (asyncHandleRelease.current) clearTimeout(asyncHandleRelease.current);
            
            
            
            // setTimeout => make sure the `mouseup` event fires *after* the `click` event, so the user has a chance to change the `pressed` prop:
            asyncHandleRelease.current = setTimeout(handleRelease, 0); // 0 = runs immediately after all micro tasks finished
            /* do not use `Promise.resolve().then(handleRelease)` because it's not fired *after* the `click` event */
        };
        
        
        
        // setups:
        window.addEventListener('mouseup', handleReleaseLate);
        window.addEventListener('keyup',   handleRelease);
        
        
        
        // cleanups:
        return () => {
            window.removeEventListener('mouseup', handleReleaseLate);
            window.removeEventListener('keyup',   handleRelease);
        };
    }, [propEditable, isControllablePressed]);
    
    
    
    // handlers:
    const handlePress     = useEvent<React.MouseEventHandler<TElement> & React.KeyboardEventHandler<TElement>>(() => {
        // conditions:
        if (!propEditable)         return; // control is not editable => no response required
        if (isControllablePressed) return; // controllable [pressed] is set => no uncontrollable required
        
        
        
        setPressDn(true);
    }, [propEditable, isControllablePressed]);
    
    const handleMouseDown = useEvent<React.MouseEventHandler<TElement>>((event) => {
        if (!actionMouses || actionMouses.includes(event.button)) handlePress(event);
    }, [actionMouses, handlePress]);
    
    const handleKeyDown   = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        if (!actionKeys || actionKeys.includes(event.code.toLowerCase()) || actionKeys.includes(event.key.toLowerCase())) handlePress(event);
    }, [actionKeys, handlePress]);
    
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(press|release)|(?<=[a-z])(Press|Release))(?![a-z])/.test(event.animationName)) return; // ignores animation other than (press|release)[Foo] or boo(Press|Release)[Foo]
        
        
        
        // clean up finished animation
        
        setAnimating(null); // stop pressing-animation/releasing-animation
    }, []);
    
    
    
    return {
        pressed,
        
        class : ((): string|null => {
            // pressing:
            if (animating === true) {
                // // pressing by controllable prop => use class .pressing
                // if (isControllablePressed) return 'pressing';
                //
                // // otherwise use pseudo :active
                // return null;
                // support for pressing by [space key] that not triggering :active
                return 'pressing';
            } // if
            
            // releasing:
            if (animating === false) return 'releasing';
            
            // fully pressed:
            if (pressed) return 'pressed';
            
            // fully released:
            // if (isControllablePressed) {
            //     return 'released'; // releasing by controllable prop => use class .released to kill pseudo :active
            // }
            // else {
            //     return null; // discard all classes above
            // } // if
            return null; // discard all classes above
        })(),
        
        handleMouseDown,
        handleKeyDown,
        handleAnimationEnd,
    };
};
//#endregion pressRelease



// styles:
export const usesActionControlLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesControlLayout(),
        ]),
        ...style({
            // accessibilities:
            userSelect : 'none', // disable selecting text (double clicking not causing selecting text)
            
            
            
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
    const [pressReleaseStateRule] = usesPressReleaseState();
    
    
    
    return style({
        ...imports([
            // states:
            usesControlStates(),
            
            // accessibilities:
            pressReleaseStateRule,
        ]),
        ...states([
            ifPress({
                ...imports([
                    markActive(),
                ]),
            }),
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
    
    const {animationRegistry : {filters} } = usesAnimation();
    const [, {filter: filterPressRelease}] = usesPressReleaseState();
    
    
    
    //#region keyframes
    const frameReleased = style({
        filter: [[
            ...filters.filter((f) => (f !== filterPressRelease)),
            
         // filterPressRelease, // missing the last => let's the browser interpolated it
        ]].map(fallbackNoneFilter),
    });
    const framePressed  = style({
        filter: [[
            ...filters.filter((f) => (f !== filterPressRelease)),
            
            filterPressRelease, // existing the last => let's the browser interpolated it
        ]].map(fallbackNoneFilter),
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



// utilities:
export type JsxReactRouterLink = React.ReactElement<{
    // links:
    to            ?: To
    
    
    
    // components:
    passHref      ?: boolean
    linkComponent ?: React.ReactElement
    
    
    
    // children:
    children      ?: React.ReactNode
}>
export const isReactRouterLink = (node: React.ReactNode): node is JsxReactRouterLink => {
    return (
        isForwardRef(node) // JSX element
        &&
        !!node.props.to    // one of ReactRouter prop
    );
};

export type JsxNextLink = React.ReactElement<{
    // links:
    href          ?: To
    
    
    
    // components:
    passHref      ?: boolean
    
    
    
    // children:
    children      ?: React.ReactNode
}>
export const isNextLink = (node: React.ReactNode): node is JsxNextLink => {
    return (
        isForwardRef(node) // JSX element
        &&
        !!node.props.href  // one of NextLink prop
    );
};

export type JsxClientSideLink = JsxReactRouterLink & JsxNextLink
export const isClientSideLink = (node: React.ReactNode): node is JsxClientSideLink => {
    return (
        isReactRouterLink(node)
        ||
        isNextLink(node)
    );
};



// handlers:
export const handleClickDisabled : React.MouseEventHandler<Element> = (event) => {
    event.stopPropagation();
};



// react components:
export interface ActionControlProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        ControlProps<TElement>
{
    // accessibilities:
    pressed      ?: boolean
    
    
    
    // behaviors:
    actionMouses ?: number[]|null
    actionKeys   ?: string[]|null
}
const ActionControl = <TElement extends Element = HTMLElement>(props: ActionControlProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet        = useActionControlStyleSheet();
    
    
    
    // states:
    
    // accessibilities:
    const pressReleaseState = usePressReleaseState<TElement>(props);
    
    
    
    // fn props:
    const propEnabled       = usePropEnabled(props);
    
    
    
    // rest props:
    const {
        // accessibilities:
        pressed      : _pressed,      // remove
        
        
        
        // behaviors:
        actionMouses : _actionMouses, // remove
        actionKeys   : _actionKeys,   // remove
    ...restControlProps} = props;
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // accessibilities:
        pressReleaseState.class,
    );
    
    
    
    // handlers:
    const handleMouseDown    = useMergeEvents(
        // preserves the original `onMouseDown`:
        props.onMouseDown,
        
        
        
        // states:
        
        // accessibilities:
        pressReleaseState.handleMouseDown,
    );
    const handleKeyDown      = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // states:
        
        // accessibilities:
        pressReleaseState.handleKeyDown,
    );
    const handleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        
        // accessibilities:
        pressReleaseState.handleAnimationEnd,
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
            
            
            
            // handlers:
            onClick        = {propEnabled ? props.onClick : handleClickDisabled}
            onMouseDown    = {handleMouseDown   }
            onKeyDown      = {handleKeyDown     }
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
    const { isSemanticTag: isSemanticLink } = useTestSemantic(actionComponent.props, { semanticTag: 'a', semanticRole: 'link' });
    
    
    
    // jsx:
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
            <ForwardRefWrapper actionComponent={actionComponent} {...actionComponent.props}>
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
    actionComponent : React.ReactComponentElement<typeof ActionControl, ActionControlProps<TElement>>
}
const ForwardRefWrapper = React.forwardRef(<TElement extends Element = HTMLElement>({ actionComponent, outerRef, ...restForwardProps }: ForwardRefWrapperProps<TElement>, ref: React.ForwardedRef<TElement>): JSX.Element|null => {
    // refs:
    const mergedouterRef = useMergeRefs(
        // preserves the original `outerRef`:
        outerRef,
        
        
        
        ref,
    );
    
    
    
    // jsx:
    return React.cloneElement(actionComponent,
        // props:
        {
            // refs:
            outerRef: mergedouterRef,
            
            
            
            // other props:
            ...restForwardProps,
        },
    );
});
