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
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // utilities:
    cssVar,
}                           from '@cssfn/css-var'               // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import {
    // types:
    DefaultTag,
    DefaultRole,
    
    
    
    // hooks:
    SemanticProps,
    useTestSemantic,
}                           from '@reusable-ui/generic'         // a base component
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    usesAnim,
    fallbackNoneFilter,
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
const defaultActionMouses : number[]|null = [0];       // left click
const defaultActionKeys   : string[]|null = ['space']; // space key

const defaultTag  : DefaultTag  = [null, 'button', 'a'   ] // uses <div>           as the default semantic, fallbacks to <button>, <a>
const defaultRole : DefaultRole = [      'button', 'link'] // uses [role="button"] as the default semantic, fallbacks to [role="link"]



// hooks:

// states:

//#region pressRelease
export interface PressReleaseVars {
    filter : any
    anim   : any
}
const [presses] = cssVar<PressReleaseVars>();

{
    const [, , animRegistry] = usesAnim();
    animRegistry.registerFilter(presses.filter);
    animRegistry.registerAnim(presses.anim);
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



export const usePressReleaseState  = <TElement extends Element = Element>(props: ActionControlProps<TElement>) => {
    // fn props:
    const propEnabled           = usePropEnabled(props);
    const propReadOnly          = usePropReadOnly(props);
    const propEditable          = propEnabled && !propReadOnly;
    const isControllablePressed = (props.pressed !== undefined);
    
    const actionMouses          = (props.actionMouses !== undefined) ? props.actionMouses : defaultActionMouses;
    const actionKeys            = (props.actionKeys   !== undefined) ? props.actionKeys   : defaultActionKeys;
    
    
    
    // states:
    const [pressed,   setPressed  ] = useState<boolean>(props.pressed ?? false); // true => pressed, false => released
    const [animating, setAnimating] = useState<boolean|null>(null);              // null => no-animation, true => pressing-animation, false => releasing-animation
    
    const [pressDn,   setPressDn  ] = useState<boolean>(false);                  // uncontrollable (dynamic) state: true => user pressed, false => user released
    
    
    
    // resets:
    if (!propEditable && pressDn) {
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
    
    /**
     * `null`  : never loaded  
     * `true`  : loaded (live)  
     * `false` : unloaded (dead)  
     */
    const loaded = useRef<boolean|null>(null);
    useEffect(() => {
        // setups:
        // mark the control as live:
        loaded.current = true;
        
        
        
        // cleanups:
        return () => {
            // mark the control as dead:
            loaded.current = false;
        };
    }, []); // runs once on startup
    
    useEffect(() => {
        // conditions:
        if (!propEditable)         return; // control is not editable => no response required
        if (isControllablePressed) return; // controllable [pressed] is set => no uncontrollable required
        
        
        
        // handlers:
        const handleRelease = (): void => {
            if (!loaded.current) return; // `setTimeout` fires after the control was dead => ignore
            
            setPressDn(false);
        };
        const handleReleaseLate = (): void => {
            setTimeout(handleRelease, 0); // setTimeout => make sure the `mouseup` event fires *after* the `click` event, so the user has a chance to change the `pressed` prop
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
    const handlePress     = useEvent<React.MouseEventHandler<Element> & React.KeyboardEventHandler<Element>>(() => {
        // conditions:
        if (!propEditable)         return; // control is not editable => no response required
        if (isControllablePressed) return; // controllable [pressed] is set => no uncontrollable required
        
        
        
        setPressDn(true);
    }, [propEditable, isControllablePressed]);
    
    const handleMouseDown = useEvent<React.MouseEventHandler<Element>>((event) => {
        if (!actionMouses || actionMouses.includes(event.button)) handlePress(event);
    }, [actionMouses, handlePress]);
    
    const handleKeyDown   = useEvent<React.KeyboardEventHandler<Element>>((event) => {
        if (!actionKeys || actionKeys.includes(event.code.toLowerCase()) || actionKeys.includes(event.key.toLowerCase())) handlePress(event);
    }, [actionKeys, handlePress]);
    
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<Element>>((event) => {
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
    
    // layouts:
    const [sizesRule] = usesSizeVariant(actionControls);
    
    
    
    return style({
        ...imports([
            // variants:
            usesControlVariants(),
            
            // layouts:
            sizesRule,
        ]),
    });
};
export const usesActionControlStates = () => {
    // dependencies:
    
    // states:
    const [pressReleaseRule] = usesPressReleaseState();
    
    
    
    return style({
        ...imports([
            // states:
            usesControlStates(),
            pressReleaseRule,
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

export const useActionControlStyleSheet = createUseStyleSheet(() => ({
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
    
    const [, , animRegistry] = usesAnim();
    const filters = animRegistry.filters;
    
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
        ]                       as CssKnownProps['anim'],
        animRelease : [
            ['300ms', 'ease-out', 'both', keyframesRelease],
        ]                       as CssKnownProps['anim'],
    };
}, { prefix: 'act' });



// utilities:
export type JsxReactRouterLink = React.ReactElement<{
    // links:
    to        ?: To
    
    
    
    // components:
    passHref  ?: boolean
    component ?: React.ReactElement
    
    
    
    // children:
    children  ?: React.ReactNode
}>
export const isReactRouterLink = (node: React.ReactNode): node is JsxReactRouterLink => {
    return (
        React.isValidElement(node)                         // JSX element
        &&
        (typeof(node.type) === 'object')                   // forwardRef
        &&
        (typeof((node.type as any).render) === 'function') // functional component
        &&
        !!node.props.to                                    // one of ReactRouter prop
    );
};

export type JsxNextLink = React.ReactElement<{
    // links:
    href      ?: To
    
    
    
    // components:
    passHref  ?: boolean
    
    
    
    // children:
    children  ?: React.ReactNode
}>
export const isNextLink = (node: React.ReactNode): node is JsxNextLink => {
    return (
        React.isValidElement(node)         // JSX element
        &&
        (typeof(node.type) === 'function') // functional component
        &&
        !!node.props.href                  // one of NextLink prop
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
export interface ActionControlProps<TElement extends Element = Element>
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
const ActionControl = <TElement extends Element = Element>(props: ActionControlProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet        = useActionControlStyleSheet();
    
    
    
    // states:
    const pressReleaseState = usePressReleaseState(props);
    
    
    
    // fn props:
    const propEnabled       = usePropEnabled(props);
    
    
    
    // rest props:
    const {
        // remove states props:
        
        // accessibilities:
        pressed : _pressed,
        
        
        
        // behaviors:
        actionMouses : _actionMouses,
        actionKeys   : _actionKeys,
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
            defaultTag  = {props.defaultTag  ?? defaultTag }
            defaultRole = {props.defaultRole ?? defaultRole}
            
            
            
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
        <ClientSideLinkWrapper
            linkComponent={clientSideLink}
            actionComponent={actionControl}
        >
            {children.flatMap((child): React.ReactNode[] => { // merge <Link>'s children and <ActionControl>'s children:
                // current <ActionControl>'s children:
                if (child !== clientSideLink) return [child];
                
                
                
                // merge with <Link>'s children:
                return React.Children.toArray(clientSideLink.props.children); // unwrap the <Link>
            })}
        </ClientSideLinkWrapper>
    );
};
export {
    ActionControl,
    ActionControl as default,
}



interface ClientSideLinkWrapperProps {
    // components:
    linkComponent   : JsxClientSideLink
    actionComponent : React.ReactElement<SemanticProps>
    
    
    
    // children:
    children       ?: React.ReactNode
}
const ClientSideLinkWrapper = ({ linkComponent, actionComponent, children }: ClientSideLinkWrapperProps): JSX.Element|null => {
    const { isSemanticTag: isSemanticLink } = useTestSemantic(actionComponent.props, { defaultTag: 'a', defaultRole: 'link' });
    
    
    
    // jsx:
    return React.cloneElement(linkComponent,
        // props:
        {
            component : actionComponent,
            passHref  : isSemanticLink || undefined,
        },
        
        
        
        // children,
        children
    );
};
