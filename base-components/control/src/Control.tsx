// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    useCallback,
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
    fallbacks,
}                           from '@cssfn/css-var'               // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    colors,
}                           from '@reusable-ui/colors'          // a color management system
import {
    // hooks:
    usePropAccessibility,
    usePropEnabled,
    usePropActive,
    
    
    
    // react components:
    AccessibilityProps,
    AccessibilityProvider,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import type {
    // types:
    SemanticProps,
}                           from '@reusable-ui/generic'         // a base component
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    ThemeName,
    usesThemeVariant,
    usesThemeDefault as basicUsesThemeDefault,
    usesAnim,
    fallbackNoneBoxShadow,
    fallbackNoneFilter,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    ifDisable,
    ifActive,
    markActive      as indicatorMarkActive,
    usesThemeActive as indicatorUsesThemeActive,
    
    
    
    // styles:
    usesIndicatorLayout,
    usesIndicatorVariants,
    usesIndicatorStates,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from '@reusable-ui/indicator'       // a base component

// other libs:
import {
    default as triggerChange,
    // @ts-ignore
}                           from 'react-trigger-change'         // a helper lib



// hooks:

// states:

//#region activePassive
export const markActive = (): CssRule => style({
    ...imports([
        indicatorMarkActive(),
        
        usesThemeActive(), // switch to active theme
    ]),
});

/**
 * Creates a default theme color definitions.
 * @param themeName The theme name as the default theme color -or- `null` for *auto* theme.
 * @returns A `CssRule` represents a default theme color definitions`.
 */
// change default parameter from `null` to 'secondary':
export const usesThemeDefault = (themeName: ThemeName|null = 'secondary'): CssRule => basicUsesThemeDefault(themeName);

/**
 * Creates conditional color definitions at active state.
 * @param themeName The name of active theme.
 * @returns A `CssRule` represents the conditional color definitions at active state.
 */
// change default parameter from 'secondary' to 'primary':
export const usesThemeActive  = (themeName: ThemeName|null = 'primary'): CssRule => indicatorUsesThemeActive(themeName);
//#endregion activePassive

//#region focusBlur
export interface FocusBlurVars {
    boxShadow        : any
    anim             : any
    
    
    
    /**
     * functional boxShadow color - at focus state.
     */
    boxShadowColorFn : any
    /**
     * final boxShadow color - at focus state.
     */
    boxShadowColor   : any
    /**
     * final boxShadow single layer - at focus state.
     */
    boxShadowLy      : any
}
const [focuses] = cssVar<FocusBlurVars>();

{
    const [, , animRegistry] = usesAnim();
    animRegistry.registerFilter(focuses.boxShadow);
    animRegistry.registerAnim(focuses.anim);
}



// .focused will be added after focusing-animation done:
const selectorIfFocused  = '.focused'
// .focus = styled focus, :focus-within = native focus:
// the .disabled, .disable are used to kill native :focus-within
// the .focused, .blurring, .blurred are used to overwrite native :focus-within
const selectorIfFocusing = ':is(.focus, :focus-within:not(:is(.disabled, .disable, .focused, .blurring, .blurred)))'
// .blurring will be added after loosing focus and will be removed after blurring-animation done:
const selectorIfBlurring = '.blurring'
// if all above are not set => blurred:
// optionally use .blurred to overwrite native :focus-within
const selectorIfBlurred  = ':is(:not(:is(.focused, .focus, :focus-within:not(:is(.disabled, .disable)), .blurring)), .blurred)'

export const ifFocused       = (styles: CssStyleCollection): CssRule => rule(selectorIfFocused , styles);
export const ifFocusing      = (styles: CssStyleCollection): CssRule => rule(selectorIfFocusing, styles);
export const ifBlurring      = (styles: CssStyleCollection): CssRule => rule(selectorIfBlurring, styles);
export const ifBlurred       = (styles: CssStyleCollection): CssRule => rule(selectorIfBlurred , styles);

export const ifFocus         = (styles: CssStyleCollection): CssRule => rule([selectorIfFocusing, selectorIfFocused                    ], styles);
export const ifBlur          = (styles: CssStyleCollection): CssRule => rule([                    selectorIfBlurring, selectorIfBlurred], styles);
export const ifFocusBlurring = (styles: CssStyleCollection): CssRule => rule([selectorIfFocusing, selectorIfBlurring, selectorIfBlurred], styles);



/**
 * Uses focus & blur states.
 * @returns A `StateMixin<FocusBlurVars>` represents focus & blur state definitions.
 */
export const usesFocusBlurState = (): StateMixin<FocusBlurVars> => {
    // dependencies:
    const [, themes] = usesThemeVariant();
    
    
    
    return [
        () => style({
            ...vars({
                [focuses.boxShadowColorFn] : fallbacks(
                    themes.focusImpt,     // first  priority
                    themes.focus,         // second priority
                    themes.focusCond,     // third  priority
                    
                    colors.secondaryThin, // default => uses secondary theme, because its color is neutral
                ),
                [focuses.boxShadowColor  ] : fallbacks(
                    // no toggle outlined nor toggle mild yet (might be added in the future)
                    
                    focuses.boxShadowColorFn, // default => uses our `boxShadowColorFn`
                ),
                [focuses.boxShadowLy     ] : [[
                    // combining: pos width spread color ...
                    
                    // boxShadowFocus pos, width, spread, etc:
                    controls.boxShadowFocus,
                    
                    // boxShadowFocus color:
                    focuses.boxShadowColor,
                ]],
            }),
            ...states([
                ifFocused({
                    ...vars({
                        [focuses.boxShadow] : focuses.boxShadowLy,
                    }),
                }),
                ifFocusing({
                    ...vars({
                        [focuses.boxShadow] : focuses.boxShadowLy,
                        [focuses.anim     ] : controls.animFocus,
                    }),
                }),
                ifBlurring({
                    ...vars({
                        [focuses.boxShadow] : focuses.boxShadowLy,
                        [focuses.anim     ] : controls.animBlur,
                    }),
                }),
            ]),
        }),
        focuses,
    ];
};



export const useFocusBlurState  = <TElement extends Element = Element>(props: ControlProps<TElement>) => {
    // fn props:
    const propEnabled         = usePropEnabled(props);
    const isControllableFocus = (props.focus !== undefined);
    
    
    
    // states:
    const [focused,   setFocused  ] = useState<boolean>(props.focus ?? false); // true => focus, false => blur
    const [animating, setAnimating] = useState<boolean|null>(null); // null => no-animation, true => focusing-animation, false => blurring-animation
    
    const [focusDn,   setFocusDn  ] = useState<boolean>(false);     // uncontrollable (dynamic) state: true => user focus, false => user blur
    
    
    
    // resets:
    if (!propEnabled && focusDn) {
        setFocusDn(false); // lost focus because the control is disabled, when the control is re-enabled => still lost focus
    } // if
    
    
    
    /*
     * state is always blur if disabled
     * state is focus/blur based on [controllable focus] (if set) and fallback to [uncontrollable focus]
     */
    const focusFn: boolean = propEnabled && (props.focus /*controllable*/ ?? focusDn /*uncontrollable*/);
    
    if (focused !== focusFn) { // change detected => apply the change & start animating
        setFocused(focusFn);   // remember the last change
        setAnimating(focusFn); // start focusing-animation/blurring-animation
    } // if
    
    
    
    // handlers:
    const handleFocus = useCallback(() => {
        // conditions:
        if (!propEnabled)        return; // control is disabled => no response required
        if (isControllableFocus) return; // controllable [focus] is set => no uncontrollable required
        
        
        
        setFocusDn(true);
    }, [propEnabled, isControllableFocus]);
    
    const handleBlur  = useCallback(() => {
        // conditions:
        if (!propEnabled)        return; // control is disabled => no response required
        if (isControllableFocus) return; // controllable [focus] is set => no uncontrollable required
        
        
        
        setFocusDn(false);
    }, [propEnabled, isControllableFocus]);
    
    const handleAnimationEnd = useCallback((e: React.AnimationEvent<Element>): void => {
        // conditions:
        if (e.target !== e.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(focus|blur)|(?<=[a-z])(Focus|Blur))(?![a-z])/.test(e.animationName)) return; // ignores animation other than (focus|blur)[Foo] or boo(Focus|Blur)[Foo]
        
        
        
        // clean up finished animation
        
        setAnimating(null); // stop focusing-animation/blurring-animation
    }, []);
    
    
    
    return {
        focus : focused,
        
        class : ((): string|null => {
            // focusing:
            if (animating === true) {
                // focusing by controllable prop => use class .focus
                if (isControllableFocus) return 'focus';
                
                // negative [tabIndex] => can't be focused by user input => treats <Control> as *wrapper* element => use class .focus
                if ((props.tabIndex ?? 0) < 0) return 'focus';
                
                // otherwise use pseudo :focus-within
                return null;
            } // if
            
            // blurring:
            if (animating === false) return 'blurring';
            
            // fully focused:
            if (focused) return 'focused';
            
            // fully blurred:
            if (isControllableFocus) {
                return 'blurred'; // blurring by controllable prop => use class .blurred to kill pseudo :focus-within
            }
            else {
                return null; // discard all classes above
            } // if
        })(),
        
        handleFocus,
        handleBlur,
        handleAnimationEnd,
    };
};
//#endregion focusBlur

//#region arriveLeave
export interface ArriveLeaveVars {
    filter : any
    anim   : any
}
const [arrives] = cssVar<ArriveLeaveVars>();

{
    const [, , animRegistry] = usesAnim();
    animRegistry.registerFilter(arrives.filter);
    animRegistry.registerAnim(arrives.anim);
}



// .arrived will be added after arriving-animation done:
const selectorIfArrived  = '.arrived'
// .arrive = styled arrive, :hover = native arrive:
// the .disabled, .disable are used to kill native :hover
// the .arrived, .leaving, .left are used to overwrite native :hover
const selectorIfArriving = ':is(.arrive, :hover:not(:is(.disabled, .disable, .arrived, .leaving, .left)))'
// .leaving will be added after loosing arrive and will be removed after leaving-animation done:
const selectorIfLeaving  = '.leaving'
// if all above are not set => left:
// optionally use .left to overwrite native :hover
const selectorIfLeft     = ':is(:not(:is(.arrived, .arrive, :hover:not(:is(.disabled, .disable)), .leaving)), .left)'



export const ifActived           = (styles: CssStyleCollection): CssRule => rule(selectorIfActived    , styles);
export const ifActivating        = (styles: CssStyleCollection): CssRule => rule(selectorIfActivating , styles);
export const ifPassivating       = (styles: CssStyleCollection): CssRule => rule(selectorIfPassivating, styles);
export const ifPassived          = (styles: CssStyleCollection): CssRule => rule(selectorIfPassived   , styles);

export const ifActive            = (styles: CssStyleCollection): CssRule => rule([selectorIfActivating, selectorIfActived                                           ], styles);
export const ifPassive           = (styles: CssStyleCollection): CssRule => rule([                                         selectorIfPassivating, selectorIfPassived], styles);
export const ifActivePassivating = (styles: CssStyleCollection): CssRule => rule([selectorIfActivating, selectorIfActived, selectorIfPassivating                    ], styles);



/**
 * Uses active & passive states.
 * @returns A `StateMixin<ActivePassiveVars>` represents active & passive state definitions.
 */
export const usesActivePassiveState = (): StateMixin<ActivePassiveVars> => {
    return [
        () => style({
            ...states([
                ifActived({
                    ...vars({
                        [actives.filter] : controls.filterActive,
                    }),
                }),
                ifActivating({
                    ...vars({
                        [actives.filter] : controls.filterActive,
                        [actives.anim  ] : controls.animActive,
                    }),
                }),
                ifPassivating({
                    ...vars({
                        [actives.filter] : controls.filterActive,
                        [actives.anim  ] : controls.animPassive,
                    }),
                }),
            ]),
        }),
        actives,
    ];
};

export const __markActive = (): CssRule => style({
    ...imports([
        outlinedOf(false), // kill outlined variant
        mildOf(false),     // kill mild     variant
        
        usesThemeActive(), // switch to active theme
    ]),
});

/**
 * Creates conditional color definitions at active state.
 * @param themeName The name of active theme.
 * @returns A `CssRule` represents the conditional color definitions at active state.
 */
export const __usesThemeActive = (themeName: ThemeName|null = 'secondary'): CssRule => usesThemeCond(themeName);



const isCheckbox = (props: SemanticProps) => (props.tag === 'input') && ((props as any).type === 'checkbox');

export const useActivePassiveState = (props: AccessibilityProps & SemanticProps) => {
    // fn props:
    const propActive = usePropActive(props);
    
    
    
    // states:
    const [actived,   setActived  ] = useState<boolean>(propActive); // true => active, false => passive
    const [animating, setAnimating] = useState<boolean|null>(null);  // null => no-animation, true => activating-animation, false => deactivating-animation
    
    
    
    /*
     * state is active/passive based on [controllable active]
     * [uncontrollable active] is not supported
     */
    const activeFn: boolean = propActive /*controllable*/;
    
    if (actived !== activeFn) { // change detected => apply the change & start animating
        setActived(activeFn);   // remember the last change
        setAnimating(activeFn); // start activating-animation/deactivating-animation
    } // if
    
    
    
    // handlers:
    const handleAnimationEnd = useCallback((e: React.AnimationEvent<Element>): void => {
        // conditions:
        if (e.target !== e.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(active|passive)|(?<=[a-z])(Active|Passive))(?![a-z])/.test(e.animationName)) return; // ignores animation other than (active|passive)[Foo] or boo(Active|Passive)[Foo]
        
        
        
        // clean up finished animation
        
        setAnimating(null); // stop activating-animation/deactivating-animation
    }, []);
    
    
    
    return {
        active : actived,
        
        class  : ((): string|null => {
            // activating:
            if (animating === true) return null; // uses :checked or [aria-selected],[aria-current]
            
            // passivating:
            if (animating === false) return 'passivating';
            
            // fully actived:
            if (actived) return 'actived';
            
            // fully passived:
            return null;
        })(),
        
        props : (
            isCheckbox(props)
            ?
            {
                // a checkbox uses pseudo :checked for activating
                checked: actived,
            }
            :
            {
                'aria-selected' : actived ? true : undefined,
            }
        ),
        
        handleAnimationEnd,
    };
};



export interface TogglerActiveProps<TActiveChangeArg = unknown>
    extends
        // accessibilities:
        AccessibilityProps
{
    // accessibilities:
    defaultActive     ?: boolean
    onActiveChange    ?: (newActive: boolean, arg?: TActiveChangeArg) => void
}
export const useTogglerActive = <TActiveChangeArg extends unknown = unknown>(props: TogglerActiveProps<TActiveChangeArg>, changeEventTarget?: (React.RefObject<HTMLInputElement>|null)): readonly [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    // fn props:
    const { enabled, readOnly, active } = usePropAccessibility<boolean, boolean, null>(props, undefined, undefined, null);
    
    
    
    // states:
    const [activeTg, setActiveTg] = useState<boolean>(props.defaultActive ?? false);
    const setActiveEx: React.Dispatch<React.SetStateAction<boolean>> = useCallback((newActive: React.SetStateAction<boolean>): void => {
        // conditions:
        if (!enabled) return; // control is disabled => no response required
        if (readOnly) return; // control is readOnly => no response required
        
        
        
        setActiveTg(newActive);
    }, [enabled, readOnly]);
    
    
    
    /*
     * state is active/passive based on [controllable active] (if set) and fallback to [uncontrollable active]
     */
    const activeFn: boolean = active /*controllable*/ ?? activeTg /*uncontrollable*/;
    const wasActive = useRef<boolean>(activeFn);
    
    if (wasActive.current !== activeFn) { // change detected => apply the change & firing `onActiveChange`
        wasActive.current = activeFn;     // remember the last change
        
        
        
        // fire change synthetic event:
        props.onActiveChange?.(activeFn);
        
        // fire change dom event:
        if (changeEventTarget?.current) {
            changeEventTarget.current.checked = activeFn;
            triggerChange(changeEventTarget.current);
        } // if
    } // if
    
    
    
    return [
        activeFn,
        setActiveEx,
    ];
};
//#endregion arriveLeave



// styles:
export const usesControlLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBasicLayout(),
        ]),
        ...style({
            // customize:
            ...usesCssProps(controls), // apply config's cssProps
        }),
    });
};
export const usesControlVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule   ] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(controls, usesSuffixedProps(controls, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesBasicVariants(),
            
            // layouts:
            sizesRule,
        ]),
    });
};
export const usesControlStates = () => {
    // dependencies:
    
    // states:
    const [enableDisableRule] = usesEnableDisableState();
    const [activePassiveRule] = usesActivePassiveState();
    
    
    
    return style({
        ...imports([
            // states:
            enableDisableRule,
            activePassiveRule,
        ]),
        ...states([
            ifActive({
                ...imports([
                    markActive(),
                ]),
            }),
        ]),
    });
};

export const useControlStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesControlLayout(),
        
        // variants:
        usesControlVariants(),
        
        // states:
        usesControlStates(),
    ]),
}), { id: 'k8egfpu96l' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [controls, cssControlConfig] = cssConfig(() => {
    // dependencies:
    
    const [, , animRegistry] = usesAnim();
    const filters = animRegistry.filters;
    
    const [, {filter: filterEnableDisable}] = usesEnableDisableState();
    const [, {filter: filterActivePassive}] = usesActivePassiveState();
    
    
    
    //#region keyframes
    const frameEnabled  = style({
        filter: [[
            ...filters.filter((f) => (f !== filterEnableDisable)),
            
         // filterEnableDisable, // missing the last => let's the browser interpolated it
        ]].map(fallbackNoneFilter),
    });
    const frameDisabled = style({
        filter: [[
            ...filters.filter((f) => (f !== filterEnableDisable)),
            
            filterEnableDisable, // existing the last => let's the browser interpolated it
        ]].map(fallbackNoneFilter),
    });
    const [keyframesDisableRule, keyframesDisable] = keyframes({
        from : frameEnabled,
        to   : frameDisabled,
    });
    keyframesDisable.value = 'disable';
    const [keyframesEnableRule , keyframesEnable ] = keyframes({
        from : frameDisabled,
        to   : frameEnabled,
    });
    keyframesEnable.value = 'enable';
    
    
    
    const framePassived = style({
        filter: [[
            ...filters.filter((f) => (f !== filterActivePassive)),
            
         // filterActivePassive, // missing the last => let's the browser interpolated it
        ]].map(fallbackNoneFilter),
    });
    const frameActived  = style({
        filter: [[
            ...filters.filter((f) => (f !== filterActivePassive)),
            
            filterActivePassive, // existing the last => let's the browser interpolated it
        ]].map(fallbackNoneFilter),
    });
    const [keyframesActiveRule , keyframesActive ] = keyframes({
        from : framePassived,
        to   : frameActived,
    });
    keyframesActive.value = 'active';
    const [keyframesPassiveRule, keyframesPassive] = keyframes({
        from : frameActived,
        to   : framePassived,
    });
    keyframesPassive.value = 'passive';
    //#endregion keyframes
    
    
    
    return {
        // animations:
        filterDisable : [[
            'grayscale(50%)',
            'contrast(50%)',
        ]]                          as CssKnownProps['filter'],
        filterActive  : [[
            'brightness(100%)',
        ]]                          as CssKnownProps['filter'],
        
        ...keyframesDisableRule,
        ...keyframesEnableRule,
        ...keyframesActiveRule,
        ...keyframesPassiveRule,
        animEnable    : [
            ['300ms', 'ease-out', 'both', keyframesEnable ],
        ]                           as CssKnownProps['anim'],
        animDisable   : [
            ['300ms', 'ease-out', 'both', keyframesDisable],
        ]                           as CssKnownProps['anim'],
        animActive    : [
            ['150ms', 'ease-out', 'both', keyframesActive ],
        ]                           as CssKnownProps['anim'],
        animPassive   : [
            ['300ms', 'ease-out', 'both', keyframesPassive],
        ]                           as CssKnownProps['anim'],
    };
}, { prefix: 'ctrl' });



// react components:
export interface ControlProps<TElement extends Element = Element>
    extends
        // bases:
        IndicatorProps<TElement>
{
    // accessibilities:
    focus    ?: boolean
    tabIndex ?: number
    
    arrive   ?: boolean
}
const Control = <TElement extends Element = Element>(props: ControlProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet         = useControlStyleSheet();
    
    
    
    // states:
    const enableDisableState = useEnableDisableState(props);
    const activePassiveState = useActivePassiveState(props);
    
    
    
    // fn props:
    const propAccess         = usePropAccessibility(props);
    
    
    
    // rest props:
    const {
        // remove states props:
        
        // accessibilities:
        enabled         : _enabled,
        inheritEnabled  : _inheritEnabled,
        
        readOnly        : _readOnly,
        inheritReadOnly : _inheritReadOnly,
        
        active          : _active,
        inheritActive   : _inheritActive,
        
        
        
        // children:
        children,
    ...restBasicProps} = props;
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...restBasicProps}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={[...(props.stateClasses ?? []),
                // accessibilities:
                enableDisableState.class,
                activePassiveState.class,
            ]}
            
            
            
            // :disabled | [aria-disabled]
            {...enableDisableState.props}
            
            // :checked | [aria-selected]
            {...activePassiveState.props}
            
            
            
            // events:
            onAnimationEnd={(e) => {
                props.onAnimationEnd?.(e); // preserves the original `onAnimationEnd`
                
                
                
                // states:
                
                // accessibilities:
                enableDisableState.handleAnimationEnd(e);
                activePassiveState.handleAnimationEnd(e);
            }}
        >
            { children && <AccessibilityProvider {...propAccess}>
                { children }
            </AccessibilityProvider> }
        </Basic>
    );
};
export {
    Control,
    Control as default,
}
