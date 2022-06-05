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
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    ThemeName,
    usesThemeCond,
    outlinedOf,
    mildOf,
    usesAnim,
    fallbackNoneFilter,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'       // a base component

// other libs:
import {
    default as triggerChange,
    // @ts-ignore
}                           from 'react-trigger-change'     // a helper lib



// hooks:

// states:

//#region enableDisable
export interface EnableDisableVars {
    filter : any
    anim   : any
}
const [enables] = cssVar<EnableDisableVars>();

{
    const [, , animRegistry] = usesAnim();
    animRegistry.registerFilter(enables.filter);
    animRegistry.registerAnim(enables.anim);
}



// if all below are not set => enabled:
const selectorIfEnabled   = ':not(:is(.enabling, :disabled, [aria-disabled]:not([aria-disabled="false"]), .disabled))'
// .enabling will be added after loosing disable and will be removed after enabling-animation done:
const selectorIfEnabling  = '.enabling'
// :disabled = real disable, [aria-disabled] = styled disable:
const selectorIfDisabling = ':is(:disabled, [aria-disabled]:not([aria-disabled="false"])):not(.disabled)'
// .disabled will be added after disabling-animation done:
const selectorIfDisabled  = '.disabled'

export const ifEnabled         = (styles: CssStyleCollection): CssRule => rule(selectorIfEnabled  , styles);
export const ifEnabling        = (styles: CssStyleCollection): CssRule => rule(selectorIfEnabling , styles);
export const ifDisabling       = (styles: CssStyleCollection): CssRule => rule(selectorIfDisabling, styles);
export const ifDisabled        = (styles: CssStyleCollection): CssRule => rule(selectorIfDisabled , styles);

export const ifEnable          = (styles: CssStyleCollection): CssRule => rule([selectorIfEnabling, selectorIfEnabled                      ], styles);
export const ifDisable         = (styles: CssStyleCollection): CssRule => rule([                    selectorIfDisabling, selectorIfDisabled], styles);
export const ifEnablingDisable = (styles: CssStyleCollection): CssRule => rule([selectorIfEnabling, selectorIfDisabling, selectorIfDisabled], styles);



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
                        [enables.filter] : indicators.filterDisable,
                        [enables.anim  ] : indicators.animEnable,
                    }),
                }),
                ifDisabling({
                    ...vars({
                        [enables.filter] : indicators.filterDisable,
                        [enables.anim  ] : indicators.animDisable,
                    }),
                }),
                ifDisabled({
                    ...vars({
                        [enables.filter] : indicators.filterDisable,
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
//#endregion enableDisable

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
// :checked = real active, [aria-selected],[aria-current] = styled active:
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
                        [actives.filter] : indicators.filterActive,
                    }),
                }),
                ifActivating({
                    ...vars({
                        [actives.filter] : indicators.filterActive,
                        [actives.anim  ] : indicators.animActive,
                    }),
                }),
                ifPassivating({
                    ...vars({
                        [actives.filter] : indicators.filterActive,
                        [actives.anim  ] : indicators.animPassive,
                    }),
                }),
            ]),
        }),
        actives,
    ];
};

export const markActive = (): CssRule => style({
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
export const usesThemeActive = (themeName: ThemeName|null = 'secondary'): CssRule => usesThemeCond(themeName);



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
export const usesIndicatorLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBasicLayout(),
        ]),
        ...style({
            // customize:
            ...usesCssProps(indicators), // apply config's cssProps
        }),
    });
};
export const usesIndicatorVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule   ] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(indicators, usesSuffixedProps(indicators, sizeName)),
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
export const usesIndicatorStates = () => {
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

export const useIndicatorStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesIndicatorLayout(),
        
        // variants:
        usesIndicatorVariants(),
        
        // states:
        usesIndicatorStates(),
    ]),
}), { id: '9i8stbnt0e' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [indicators, cssIndicatorConfig] = cssConfig(() => {
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
}, { prefix: 'indi' });



// react components:
export interface IndicatorProps<TElement extends Element = Element>
    extends
        // bases:
        BasicProps<TElement>,
        
        // accessibilities:
        AccessibilityProps
{
}
const Indicator = <TElement extends Element = Element>(props: IndicatorProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet         = useIndicatorStyleSheet();
    
    
    
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
    Indicator,
    Indicator as default,
}
