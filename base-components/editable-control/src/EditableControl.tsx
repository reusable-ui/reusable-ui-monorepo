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



// hooks:

// states:

//#region validInvalid
export interface ValidInvalidVars {
    animValid   : any
    animInvalid : any
    
    foregStart  : any
    backgStart  : any
}
const [valids] = cssVar<ValidInvalidVars>();

{
    const [, , animRegistry] = usesAnim();
    animRegistry.registerAnim(valids.animValid);
    animRegistry.registerAnim(valids.animInvalid);
}



// .validated will be added after validating-animation done:
const selectorIfValidated      = '.validated'
// .validating = styled valid, :valid = native valid:
// the .validated, .unvalidating, .novalidation are used to overwrite native :valid
const selectorIfValidating     = ':is(.validating, :valid:not(:is(.validated, .unvalidating, .novalidation)))'
// .unvalidating will be added after loosing valid and will be removed after unvalidating-animation done:
const selectorIfUnvalidating   = '.unvalidating'
// if all above are not set => unvalidated:
// optionally use .novalidation to overwrite native :valid
const selectorIfUnvalidated    = ':is(:not(:is(.validated, .validating, :valid, .unvalidating)), .novalidation)'

// .invalidated will be added after invalidating-animation done:
const selectorIfInvalidated    = '.invalidated'
// .invalidating = styled invalid, :invalid = native invalid:
// the .invalidated, .uninvalidating, .novalidation are used to overwrite native :invalid
const selectorIfInvalidating   = ':is(.invalidating, :invalid:not(:is(.invalidated, .uninvalidating, .novalidation)))'
// .uninvalidating will be added after loosing invalid and will be removed after uninvalidating-animation done:
const selectorIfUninvalidating = '.uninvalidating'
// if all above are not set => uninvalidated:
// optionally use .novalidation to overwrite native :invalid
const selectorIfUninvalidated  = ':is(:not(:is(.invalidated, .invalidating, :invalid, .uninvalidating)), .novalidation)'

export const ifValided        = (styles: CssStyleCollection): CssRule => rule(selectorIfValidated      , styles);
export const ifValidating     = (styles: CssStyleCollection): CssRule => rule(selectorIfValidating     , styles);
export const ifUnvalidating   = (styles: CssStyleCollection): CssRule => rule(selectorIfUnvalidating   , styles);
export const ifUnvalided      = (styles: CssStyleCollection): CssRule => rule(selectorIfUnvalidated    , styles);

export const ifValid          = (styles: CssStyleCollection): CssRule => rule([selectorIfValidating    , selectorIfValidated    ], styles);
export const ifUnvalid        = (styles: CssStyleCollection): CssRule => rule([selectorIfUnvalidating  , selectorIfUnvalidated  ], styles);

export const ifInvalided      = (styles: CssStyleCollection): CssRule => rule(selectorIfInvalidated    , styles);
export const ifInvalidating   = (styles: CssStyleCollection): CssRule => rule(selectorIfInvalidating   , styles);
export const ifUninvalidating = (styles: CssStyleCollection): CssRule => rule(selectorIfUninvalidating , styles);
export const ifUninvalided    = (styles: CssStyleCollection): CssRule => rule(selectorIfUninvalidated  , styles);

export const ifInvalid        = (styles: CssStyleCollection): CssRule => rule([selectorIfInvalidating  , selectorIfInvalidated  ], styles);
export const ifUninvalid      = (styles: CssStyleCollection): CssRule => rule([selectorIfUninvalidating, selectorIfUninvalidated], styles);

export const ifNoValidation   = (styles: CssStyleCollection): CssRule => rule(selectorIfNoValidation   , styles);



/**
 * Uses press & release states.
 * @returns A `StateMixin<ValidInvalidVars>` represents press & release state definitions.
 */
export const usesPressReleaseState = (): StateMixin<ValidInvalidVars> => {
    return [
        () => style({
            ...states([
                ifPressed({
                    ...vars({
                        [valids.filter] : editableControls.filterPress,
                    }),
                }),
                ifPressing({
                    ...vars({
                        [valids.filter] : editableControls.filterPress,
                        [valids.anim  ] : editableControls.animPress,
                    }),
                }),
                ifReleasing({
                    ...vars({
                        [valids.filter] : editableControls.filterPress,
                        [valids.anim  ] : editableControls.animRelease,
                    }),
                }),
            ]),
        }),
        valids,
    ];
};



export const usePressReleaseState  = <TElement extends Element = Element>(props: EditableControlProps<TElement>) => {
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
    
    const handleMouseDown = useEvent<React.MouseEventHandler<Element>>((e) => {
        if (!actionMouses || actionMouses.includes(e.button)) handlePress(e);
    }, [actionMouses, handlePress]);
    
    const handleKeyDown   = useEvent<React.KeyboardEventHandler<Element>>((e) => {
        if (!actionKeys || actionKeys.includes(e.code.toLowerCase()) || actionKeys.includes(e.key.toLowerCase())) handlePress(e);
    }, [actionKeys, handlePress]);
    
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<Element>>((e) => {
        // conditions:
        if (e.target !== e.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(press|release)|(?<=[a-z])(Press|Release))(?![a-z])/.test(e.animationName)) return; // ignores animation other than (press|release)[Foo] or boo(Press|Release)[Foo]
        
        
        
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
//#endregion validInvalid



// styles:
export const usesEditableControlLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesControlLayout(),
        ]),
        ...style({
            // accessibilities:
            userSelect : 'none', // disable selecting text (double clicking not causing selecting text)
            
            
            
            // customize:
            ...usesCssProps(editableControls), // apply config's cssProps
        }),
    });
};
export const usesEditableControlVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(editableControls);
    
    
    
    return style({
        ...imports([
            // variants:
            usesControlVariants(),
            
            // layouts:
            sizesRule,
        ]),
    });
};
export const usesEditableControlStates = () => {
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

export const useEditableControlStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesEditableControlLayout(),
        
        // variants:
        usesEditableControlVariants(),
        
        // states:
        usesEditableControlStates(),
    ]),
}), { id: 'rww4hy9rmx' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [editableControls, cssEditableControlConfig] = cssConfig(() => {
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
const handleClickDisabled : React.MouseEventHandler<Element> = (e) => {
    e.stopPropagation();
};



// react components:
export interface EditableControlProps<TElement extends Element = Element>
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
const EditableControl = <TElement extends Element = Element>(props: EditableControlProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet        = useEditableControlStyleSheet();
    
    
    
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
    
    
    
    // events:
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
    const editableControl = (
        <Control<TElement>
            // other props:
            {...restControlProps}
            
            
            
            // semantics:
            defaultTag  = {props.defaultTag  ?? defaultTag }
            defaultRole = {props.defaultRole ?? defaultRole}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            
            
            
            // events:
            onClick        = {propEnabled ? props.onClick : handleClickDisabled}
            onMouseDown    = {handleMouseDown   }
            onKeyDown      = {handleKeyDown     }
            onAnimationEnd = {handleAnimationEnd}
        />
    );
    
    // inspect if <EditableControl>'s children contain one/more <Link>:
    const children       = React.Children.toArray(props.children); // convert the children to array
    const clientSideLink = children.find(isClientSideLink);        // take the first <Link> (if any)
    if (!clientSideLink) return editableControl;                     // if no contain <Link> => normal <EditableControl>
    
    return (
        <ClientSideLinkWrapper
            linkComponent={clientSideLink}
            actionComponent={editableControl}
        >
            {children.flatMap((child): React.ReactNode[] => { // merge <Link>'s children and <EditableControl>'s children:
                // current <EditableControl>'s children:
                if (child !== clientSideLink) return [child];
                
                
                
                // merge with <Link>'s children:
                return React.Children.toArray(clientSideLink.props.children); // unwrap the <Link>
            })}
        </ClientSideLinkWrapper>
    );
};
export {
    EditableControl,
    EditableControl as default,
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
            passHref  : isSemanticLink,
        },
        
        
        
        // children,
        children
    );
};
