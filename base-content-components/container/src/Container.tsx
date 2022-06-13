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
    
    CssSelectorCollection,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    rules,
    states,
    keyframes,
    
    
    
    // combinators:
    children,
    
    
    
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
    FeatureMixin,
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    OrientationRuleOptions,
    defaultBlockOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    ThemeName,
    usesThemeConditional,
    outlinedOf,
    mildOf,
    usesBorder,
    usesPadding,
    usesAnim,
    fallbackNoneFilter,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component

// other libs:
import {
    default as triggerChange,
    // @ts-ignore
}                           from 'react-trigger-change'         // a helper lib



// selectors:
// :where(...) => zero specificity => easy to overwrite further:
export const ifVisibleChild          = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign))'                                           , styles);

export const ifFirstVisibleChild     = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign)):where(:first-child, .first-visible-child)' , styles);
export const ifLastVisibleChild      = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign)):where( :last-child,  .last-visible-child)' , styles);
export const ifNotFirstVisibleChild  = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign, :first-child, .first-visible-child))'       , styles);
export const ifNotLastVisibleChild   = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign,  :last-child,  .last-visible-child))'       , styles);

export const ifSecondVisibleChild    = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign)):where(:nth-child(2))'                      , styles);
export const ifNotSecondVisibleChild = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign, :nth-child(2)))'                            , styles);



// hooks:

// layouts:

//#region orientation
export const defaultOrientationRuleOptions = defaultBlockOrientationRuleOptions;
//#endregion orientation

//#region container
export interface ContainerVars {
    // borders:
    borderWidth            : any
    
    borderStartStartRadius : any
    borderStartEndRadius   : any
    borderEndStartRadius   : any
    borderEndEndRadius     : any
    
    
    
    // spacings:
    paddingInline          : any
    paddingBlock           : any
}
const [containerVars] = cssVar<ContainerVars>();



/**
 * Uses container.
 * @returns A `FeatureMixin<containerVars>` represents container definitions.
 */
export const usesContainer = (): FeatureMixin<ContainerVars> => {
    // dependencies:
    
    // borders:
    const [, borders ] = usesBorder();
    
    // spacings:
    const [, paddings] = usesPadding();
    
    
    
    return [
        () => style({
            ...vars({
                // borders:
                [containerVars.borderWidth           ] : borders.borderWidth,
                
                [containerVars.borderStartStartRadius] : borders.borderStartStartRadius,
                [containerVars.borderStartEndRadius  ] : borders.borderStartEndRadius,
                [containerVars.borderEndStartRadius  ] : borders.borderEndStartRadius,
                [containerVars.borderEndEndRadius    ] : borders.borderEndEndRadius,
                
                
                
                // spacings:
                [containerVars.paddingInline         ] : paddings.paddingInline,
                [containerVars.paddingBlock          ] : paddings.paddingBlock,
            }),
        }),
        containerVars,
    ];
};
//#endregion container


//#endregion border as container
export interface BorderAsContainerOptions extends OrientationRuleOptions {
    itemsSelector ?: CssSelectorCollection
}
export const usesBorderAsContainer = (options?: BorderAsContainerOptions): CssRule => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationInlineSelector, orientationBlockSelector] = usesOrientationRule(options);
    const {
        itemsSelector = '*',
    } = options;
    
    
    
    // dependencies:
    
    // layouts:
    const [containerRule, containerVars] = usesContainer();
    
    // borders:
    const [             , borders      ] = usesBorder();
    
    
    
    return style({
        ...imports([
            // layouts:
            containerRule,
        ]),
        // ...style({
        //     // borders:
        //     overflow : 'hidden', // clip the children at the rounded corners // bad idea, causing child's focus boxShadow to be clipped off
        // }),
        ...rules([
            (!!orientationInlineSelector && rule(orientationInlineSelector, {
                // children:
                ...children(itemsSelector, {
                    ...ifFirstVisibleChild({
                        ...vars({
                            /*
                                if the_current_element is a_child_of_container and also a_separator,
                                the deleted `containerVars.borderWidth` in separator must be pointed to container,
                                so we can calculate the correct inner_borderRadius.
                                
                                that's why we set `!important` to the `containerVars.borderWidth`.
                            */
                            [containerVars.borderWidth           ] : 'inherit !important', // reads parent's prop
                            
                            [containerVars.borderStartStartRadius] : 'inherit', // reads parent's prop
                            [containerVars.borderEndStartRadius  ] : 'inherit', // reads parent's prop
                        }),
                        ...style({
                            // borders:
                            // add rounded corners on left:
                            [borders.borderStartStartRadius      ] : `calc(${containerVars.borderStartStartRadius} - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                            [borders.borderEndStartRadius        ] : `calc(${containerVars.borderEndStartRadius  } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                            
                            /* recursive calculation of borderRadius is not supported yet */
                        }),
                    }),
                    ...ifLastVisibleChild({
                        ...vars({
                            /*
                                if the_current_element is a_child_of_container and also a_separator,
                                the deleted `containerVars.borderWidth` in separator must be pointed to container,
                                so we can calculate the correct inner_borderRadius.
                                
                                that's why we set `!important` to the `containerVars.borderWidth`.
                            */
                            [containerVars.borderWidth           ] : 'inherit !important', // reads parent's prop
                            
                            [containerVars.borderStartEndRadius  ] : 'inherit', // reads parent's prop
                            [containerVars.borderEndEndRadius    ] : 'inherit', // reads parent's prop
                        }),
                        ...style({
                            // borders:
                            // add rounded corners on right:
                            [borders.borderStartEndRadius        ] : `calc(${containerVars.borderStartEndRadius  } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                            [borders.borderEndEndRadius          ] : `calc(${containerVars.borderEndEndRadius    } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                            
                            /* recursive calculation of borderRadius is not supported yet */
                        }),
                    }),
                }),
            })),
            (!!orientationBlockSelector  && rule(orientationBlockSelector,  {
                // children:
                ...children(itemsSelector, {
                    ...ifFirstVisibleChild({
                        ...vars({
                            /*
                                if the_current_element is a_child_of_container and also a_separator,
                                the deleted `containerVars.borderWidth` in separator must be pointed to container,
                                so we can calculate the correct inner_borderRadius.
                                
                                that's why we set `!important` to the `containerVars.borderWidth`.
                            */
                            [containerVars.borderWidth           ] : 'inherit !important', // reads parent's prop
                            
                            [containerVars.borderStartStartRadius] : 'inherit', // reads parent's prop
                            [containerVars.borderStartEndRadius  ] : 'inherit', // reads parent's prop
                        }),
                        ...style({
                            // borders:
                            // add rounded corners on top:
                            [borders.borderStartStartRadius      ] : `calc(${containerVars.borderStartStartRadius} - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                            [borders.borderStartEndRadius        ] : `calc(${containerVars.borderStartEndRadius  } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                            
                            /* recursive calculation of borderRadius is not supported yet */
                        }),
                    }),
                    ...ifLastVisibleChild({
                        ...vars({
                            /*
                                if the_current_element is a_child_of_container and also a_separator,
                                the deleted `containerVars.borderWidth` in separator must be pointed to container,
                                so we can calculate the correct inner_borderRadius.
                                
                                that's why we set `!important` to the `containerVars.borderWidth`.
                            */
                            [containerVars.borderWidth           ] : 'inherit !important', // reads parent's prop
                            
                            [containerVars.borderEndStartRadius  ] : 'inherit', // reads parent's prop
                            [containerVars.borderEndEndRadius    ] : 'inherit', // reads parent's prop
                        }),
                        ...style({
                            // borders:
                            // add rounded corners on bottom:
                            [borders.borderEndStartRadius        ] : `calc(${containerVars.borderEndStartRadius  } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                            [borders.borderEndEndRadius          ] : `calc(${containerVars.borderEndEndRadius    } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                            
                            /* recursive calculation of borderRadius is not supported yet */
                        }),
                    }),
                }),
            })),
            ((!orientationInlineSelector && !orientationBlockSelector) && style({
                // children:
                ...children(itemsSelector, {
                    ...ifVisibleChild({
                        ...vars({
                            /*
                                if the_current_element is a_child_of_container and also a_separator,
                                the deleted `containerVars.borderWidth` in separator must be pointed to container,
                                so we can calculate the correct inner_borderRadius.
                                
                                that's why we set `!important` to the `containerVars.borderWidth`.
                            */
                            [containerVars.borderWidth           ] : 'inherit !important', // reads parent's prop
                            
                            [containerVars.borderStartStartRadius] : 'inherit', // reads parent's prop
                            [containerVars.borderStartEndRadius  ] : 'inherit', // reads parent's prop
                            [containerVars.borderEndStartRadius  ] : 'inherit', // reads parent's prop
                            [containerVars.borderEndEndRadius    ] : 'inherit', // reads parent's prop
                        }),
                        ...style({
                            // borders:
                            
                            // add rounded corners on top:
                            [borders.borderStartStartRadius      ] : `calc(${containerVars.borderStartStartRadius} - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                            [borders.borderStartEndRadius        ] : `calc(${containerVars.borderStartEndRadius  } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                            
                            // add rounded corners on bottom:
                            [borders.borderEndStartRadius        ] : `calc(${containerVars.borderEndStartRadius  } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                            [borders.borderEndEndRadius          ] : `calc(${containerVars.borderEndEndRadius    } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                            
                            /* recursive calculation of borderRadius is not supported yet */
                        }),
                    }),
                }),
            })),
        ]),
    });
};
//#endregion border as container

//#endregion border as separator
//#endregion border as separator

// states:

//#region enableDisable



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
                        [enables.filter] : containers.filterDisable,
                        [enables.anim  ] : containers.animEnable,
                    }),
                }),
                ifDisabling({
                    ...vars({
                        [enables.filter] : containers.filterDisable,
                        [enables.anim  ] : containers.animDisable,
                    }),
                }),
                ifDisabled({
                    ...vars({
                        [enables.filter] : containers.filterDisable,
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
    const enabledFn : boolean = propEnabled /*controllable*/;
    
    if (enabled !== enabledFn) { // change detected => apply the change & start animating
        setEnabled(enabledFn);   // remember the last change
        setAnimating(enabledFn); // start enabling-animation/disabling-animation
    } // if
    
    
    
    // handlers:
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<Element>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(enable|disable)|(?<=[a-z])(Enable|Disable))(?![a-z])/.test(event.animationName)) return; // ignores animation other than (enable|disable)[Foo] or boo(Enable|Disable)[Foo]
        
        
        
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
// [aria-selected],[aria-current] = styled active, :checked = native active:
const selectorIfActivating  = ':is([aria-selected]:not([aria-selected="false"]), [aria-current]:not([aria-current="false"]), :checked):not(.actived)'
// .passivating will be added after loosing active and will be removed after deactivating-animation done:
const selectorIfPassivating = '.passivating'
// if all above are not set => passived:
const selectorIfPassived    = ':not(:is(.actived, [aria-selected]:not([aria-selected="false"]), [aria-current]:not([aria-current="false"]), :checked, .passivating))'



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
                        [actives.filter] : containers.filterActive,
                    }),
                }),
                ifActivating({
                    ...vars({
                        [actives.filter] : containers.filterActive,
                        [actives.anim  ] : containers.animActive,
                    }),
                }),
                ifPassivating({
                    ...vars({
                        [actives.filter] : containers.filterActive,
                        [actives.anim  ] : containers.animPassive,
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
export const usesThemeActive = (themeName: ThemeName|null = 'secondary'): CssRule => usesThemeConditional(themeName);



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
    const activeFn : boolean = propActive /*controllable*/;
    
    if (actived !== activeFn) { // change detected => apply the change & start animating
        setActived(activeFn);   // remember the last change
        setAnimating(activeFn); // start activating-animation/deactivating-animation
    } // if
    
    
    
    // handlers:
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<Element>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(active|passive)|(?<=[a-z])(Active|Passive))(?![a-z])/.test(event.animationName)) return; // ignores animation other than (active|passive)[Foo] or boo(Active|Passive)[Foo]
        
        
        
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
    const activeFn : boolean = active /*controllable*/ ?? activeTg /*uncontrollable*/;
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
export const usesContainerLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBasicLayout(),
        ]),
        ...style({
            // customize:
            ...usesCssProps(containers), // apply config's cssProps
        }),
    });
};
export const usesContainerVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(containers);
    
    
    
    return style({
        ...imports([
            // variants:
            usesBasicVariants(),
            
            // layouts:
            sizesRule,
        ]),
    });
};
export const usesContainerStates = () => {
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

export const useContainerStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesContainerLayout(),
        
        // variants:
        usesContainerVariants(),
        
        // states:
        usesContainerStates(),
    ]),
}), { id: 'dmgepbofol' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [containers, cssContainerConfig] = cssConfig(() => {
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
    keyframesDisable.value = 'disable'; // the @keyframes name should contain 'disable' in order to be recognized by `useEnableDisableState`
    const [keyframesEnableRule , keyframesEnable ] = keyframes({
        from : frameDisabled,
        to   : frameEnabled,
    });
    keyframesEnable.value  = 'enable';  // the @keyframes name should contain 'enable'  in order to be recognized by `useEnableDisableState`
    
    
    
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
    keyframesActive.value  = 'active';  // the @keyframes name should contain 'active'  in order to be recognized by `useActivePassiveState`
    const [keyframesPassiveRule, keyframesPassive] = keyframes({
        from : frameActived,
        to   : framePassived,
    });
    keyframesPassive.value = 'passive'; // the @keyframes name should contain 'passive' in order to be recognized by `useActivePassiveState`
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
}, { prefix: 'con' });



// react components:
export interface ContainerProps<TElement extends Element = Element>
    extends
        // bases:
        BasicProps<TElement>,
        
        // accessibilities:
        AccessibilityProps
{
}
const Container = <TElement extends Element = Element>(props: ContainerProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet         = useContainerStyleSheet();
    
    
    
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
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // accessibilities:
        enableDisableState.class,
        activePassiveState.class,
    );
    
    
    
    // handlers:
    const handleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        
        // accessibilities:
        enableDisableState.handleAnimationEnd,
        activePassiveState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...restBasicProps}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            
            
            
            // :disabled | [aria-disabled]
            {...enableDisableState.props}
            
            // :checked | [aria-selected]
            {...activePassiveState.props}
            
            
            
            // handlers:
            onAnimationEnd={handleAnimationEnd}
        >
            { children && <AccessibilityProvider {...propAccess}>
                { children }
            </AccessibilityProvider> }
        </Basic>
    );
};
export {
    Container,
    Container as default,
}
