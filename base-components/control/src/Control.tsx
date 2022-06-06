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
// .focus = styled focus, :focus = native focus:
// the .disabled,.disable are used to kill native :focus
const selectorIfFocusing = ':is(.focus, :focus:not(:is(.disabled, .disable)))'
// .blurring will be added after loosing focus and will be removed after blurring-animation done:
const selectorIfBlurring = '.blurring'
// if all above are not set => blurred:
const selectorIfBlurred  = ':not(:is(.focused, .focus, :focus:not(:is(.disabled, .disable)), .blurring))'

export const ifFocused       = (styles: CssStyleCollection): CssRule => rule(selectorIfFocused , styles);
export const ifFocusing      = (styles: CssStyleCollection): CssRule => rule(selectorIfFocusing, styles);
export const ifBlurring      = (styles: CssStyleCollection): CssRule => rule(selectorIfBlurring, styles);
export const ifBlurred       = (styles: CssStyleCollection): CssRule => rule(selectorIfBlurred , styles);

export const ifFocus         = (styles: CssStyleCollection): CssRule => rule([selectorIfFocusing, selectorIfFocused                    ], styles);
export const ifBlur          = (styles: CssStyleCollection): CssRule => rule([                    selectorIfBlurring, selectorIfBlurred], styles);
export const ifFocusBlurring = (styles: CssStyleCollection): CssRule => rule([selectorIfFocusing, selectorIfBlurring, selectorIfBlurred], styles);



/**
 * Uses enable & disable states.
 * @returns A `StateMixin<EnableDisableVars>` represents enable & disable state definitions.
 */
export const usesEnableDisableState = (): StateMixin<EnableDisableVars> => {
    return [
        () => style({
            ...states([
                ifEnabling({
                    ...vars({
                        [enables.filter] : controls.filterDisable,
                        [enables.anim  ] : controls.animEnable,
                    }),
                }),
                ifDisabling({
                    ...vars({
                        [enables.filter] : controls.filterDisable,
                        [enables.anim  ] : controls.animDisable,
                    }),
                }),
                ifDisabled({
                    ...vars({
                        [enables.filter] : controls.filterDisable,
                    }),
                }),
            ]),
        }),
        enables,
    ];
};



const htmlCtrls = [
    'button',
    'fieldset',
    'input',
    'select',
    'optgroup',
    'option',
    'textarea',
];
const isCtrlElm = ({tag}: SemanticProps) => tag && htmlCtrls.includes(tag as string);

export const useEnableDisableState = (props: AccessibilityProps & SemanticProps) => {
    // fn props:
    const propEnabled = usePropEnabled(props);
    
    
    
    // states:
    const [enabled,   setEnabled  ] = useState<boolean>(propEnabled); // true => enabled, false => disabled
    const [animating, setAnimating] = useState<boolean|null>(null);   // null => no-animation, true => enabling-animation, false => disabling-animation
    
    
    
    /*
     * state is enabled/disabled based on [controllable enabled]
     * [uncontrollable enabled] is not supported
     */
    const enabledFn: boolean = propEnabled /*controllable*/;
    
    if (enabled !== enabledFn) { // change detected => apply the change & start animating
        setEnabled(enabledFn);   // remember the last change
        setAnimating(enabledFn); // start enabling-animation/disabling-animation
    } // if
    
    
    
    // handlers:
    const handleAnimationEnd = useCallback((e: React.AnimationEvent<Element>): void => {
        // conditions:
        if (e.target !== e.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(enable|disable)|(?<=[a-z])(Enable|Disable))(?![a-z])/.test(e.animationName)) return; // ignores animation other than (enable|disable)[Foo] or boo(Enable|Disable)[Foo]
        
        
        
        // clean up finished animation
        
        setAnimating(null); // stop enabling-animation/disabling-animation
    }, []);
    
    
    
    return {
        enabled  : enabled,
        disabled : !enabled,
        
        class    : ((): string|null => {
            // enabling:
            if (animating === true)  return 'enabling';
            
            // disabling:
            if (animating === false) return null; // uses :disabled or [aria-disabled]
            
            // fully disabled:
            if (!enabled) return 'disabled';
            
            // fully enabled:
            return null;
        })(),
        
        props : (
            isCtrlElm(props)
            ?
            {
                // a control_element uses pseudo :disabled for disabling
                disabled        : !enabled,
            }
            :
            {
                'aria-disabled' : !enabled ? true : undefined,
            }
        ),
        
        handleAnimationEnd,
    };
};
//#endregion focusBlur

//#region activePassive
export interface ActivePassiveVars {
    filter : any
    anim   : any
}
const [actives] = cssVar<ActivePassiveVars>();

{
    const [, , animRegistry] = usesAnim();
    animRegistry.registerFilter(actives.filter);
    animRegistry.registerAnim(actives.anim);
}



// .actived will be added after activating-animation done:
const selectorIfActived     = '.actived'
// :checked = native active, [aria-selected],[aria-current] = styled active:
const selectorIfActivating  = ':is(:checked, [aria-selected]:not([aria-selected="false"]), [aria-current]:not([aria-current="false"])):not(.actived)'
// .passivating will be added after loosing active and will be removed after deactivating-animation done:
const selectorIfPassivating = '.passivating'
// if all above are not set => passived:
const selectorIfPassived    = ':not(:is(.actived, :checked, :is([aria-selected]:not([aria-selected="false"]), [aria-current]:not([aria-current="false"])), .passivating))'



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
//#endregion activePassive



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
        BasicProps<TElement>,
        
        // accessibilities:
        AccessibilityProps
{
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
