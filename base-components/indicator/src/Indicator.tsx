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
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // hooks:
    useEvent,
    EventHandler,
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
import {
    // types:
    SemanticProps,
    useSemantic,
}                           from '@reusable-ui/generic'         // a base component
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    ThemeName,
    usesThemeConditional,
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
}                           from '@reusable-ui/basic'           // a base component



// hooks:

// accessibilities:

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
const selectorIfEnabled   = ':not(:is(.enabling, [aria-disabled]:not([aria-disabled="false"]), :disabled, .disabled))'
// .enabling will be added after loosing disable and will be removed after enabling-animation done:
const selectorIfEnabling  = '.enabling'
// [aria-disabled] = styled disable, :disabled = native disable:
const selectorIfDisabling = ':is([aria-disabled]:not([aria-disabled="false"]), :disabled):not(.disabled)'
// .disabled will be added after disabling-animation done:
const selectorIfDisabled  = '.disabled'

export const ifEnabled         = (styles: CssStyleCollection): CssRule => rule(selectorIfEnabled  , styles);
export const ifEnabling        = (styles: CssStyleCollection): CssRule => rule(selectorIfEnabling , styles);
export const ifDisabling       = (styles: CssStyleCollection): CssRule => rule(selectorIfDisabling, styles);
export const ifDisabled        = (styles: CssStyleCollection): CssRule => rule(selectorIfDisabled , styles);

export const ifEnable          = (styles: CssStyleCollection): CssRule => rule([selectorIfEnabling, selectorIfEnabled                                         ], styles);
export const ifDisable         = (styles: CssStyleCollection): CssRule => rule([                                       selectorIfDisabling, selectorIfDisabled], styles);
export const ifEnablingDisable = (styles: CssStyleCollection): CssRule => rule([selectorIfEnabling,                    selectorIfDisabling, selectorIfDisabled], styles);



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

export const useEnableDisableState = <TElement extends Element = HTMLElement>(props: AccessibilityProps & SemanticProps) => {
    // fn props:
    const propEnabled = usePropEnabled(props);
    const { tag }     = useSemantic(props);
    
    
    
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
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<TElement>>((event) => {
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
        
        props    : (() => {
            if (enabled) return null;
            
            // use :disabled if <control>:
            if (tag && htmlCtrls.includes(tag)) return { disabled: true };
            
            // else, use [aria-disabled]:
            return { 'aria-disabled' : true };
        })(),
        
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
// [aria-checked],[aria-pressed],[aria-selected] = styled active, :checked = native active:
const selectorIfActivating  = ':is([aria-checked]:not([aria-checked="false"]), [aria-pressed]:not([aria-pressed="false"]), [aria-selected]:not([aria-selected="false"]), :checked):not(.actived)'
// .passivating will be added after loosing active and will be removed after deactivating-animation done:
const selectorIfPassivating = '.passivating'
// if all above are not set => passived:
const selectorIfPassived    = ':not(:is(.actived, [aria-checked]:not([aria-checked="false"]), [aria-pressed]:not([aria-pressed="false"]), [aria-selected]:not([aria-selected="false"]), :checked, .passivating))'



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
 * @param themeName The theme name as the active theme color -or- `null` for *auto* theme.
 * @returns A `CssRule` represents the conditional color definitions at active state.
 */
export const usesThemeActive = (themeName: ThemeName|null = 'secondary'): CssRule => usesThemeConditional(themeName);



const checkableCtrls = [
    'checkbox',
    'radio',
];
export const useActivePassiveState = <TElement extends Element = HTMLElement>(props: AccessibilityProps & SemanticProps) => {
    // fn props:
    const propActive    = usePropActive(props);
    const { tag, role } = useSemantic(props);
    
    
    
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
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(active|passive)|(?<=[a-z])(Active|Passive))(?![a-z])/.test(event.animationName)) return; // ignores animation other than (active|passive)[Foo] or boo(Active|Passive)[Foo]
        
        
        
        // clean up finished animation
        
        setAnimating(null); // stop activating-animation/deactivating-animation
    }, []);
    
    
    
    return {
        active    : actived,
        isVisible : actived || (animating !== null),
        
        class     : ((): string|null => {
            // activating:
            if (animating === true) return null; // uses :checked or [aria-checked] or [aria-pressed] or [aria-selected]
            
            // passivating:
            if (animating === false) return 'passivating';
            
            // fully actived:
            if (actived) return 'actived';
            
            // fully passived:
            return null;
        })(),
        
        props     : (() => {
            if (!actived) return null;
            
            // use :checked if <input type="checkbox|radio">:
            if ((tag === 'input') && checkableCtrls.includes((props as any).type)) return { checked: true };
            
            // use [aria-checked] if [role="checkbox|radio"]:
            if (role && checkableCtrls.includes(role)) return { 'aria-checked': true };
            
            // use [aria-pressed] if <button> or [role="button"]:
            if ((tag === 'button') || (role === 'button')) return { 'aria-pressed': true };
            
            // else, use [aria-selected]:
            return { 'aria-selected' : true };
        })(),
        
        handleAnimationEnd,
    };
};



export interface ActiveChangeEvent {
    active : boolean
}
export interface ToggleActiveProps<TActiveChangeEvent extends ActiveChangeEvent = ActiveChangeEvent>
    extends
        // accessibilities:
        AccessibilityProps
{
    // accessibilities:
    defaultActive     ?: boolean
    onActiveChange    ?: EventHandler<TActiveChangeEvent>
}
export const useToggleActive = <TActiveChangeEvent extends ActiveChangeEvent = ActiveChangeEvent>(props: ToggleActiveProps<TActiveChangeEvent>, changeEventTarget?: (React.RefObject<HTMLInputElement>|null)): readonly [boolean, React.Dispatch<React.SetStateAction<boolean>>, React.Dispatch<void>] => {
    // fn props:
    const { enabled, readOnly, active } = usePropAccessibility<boolean, boolean, null>(props, undefined, undefined, null);
    
    
    
    // states:
    const [activeTg, setActiveTg] = useState<boolean>(props.defaultActive ?? false);
    
    
    
    /*
     * state is active/passive based on [controllable active] (if set) and fallback to [uncontrollable active]
     */
    const activeFn : boolean = active /*controllable*/ ?? activeTg /*uncontrollable*/;
    
    
    
    // states:
    const isDisabledOrReadOnly   = useRef<boolean>(!enabled || readOnly); // a stable reference used by 2 callbacks below
    isDisabledOrReadOnly.current = (!enabled || readOnly);
    
    const wasActiveFn            = useRef<boolean>(activeFn); // a stable reference used by 2 callbacks below
    wasActiveFn.current          = (activeFn);
    
    const onActiveChange         = useRef<EventHandler<TActiveChangeEvent>|undefined>(props.onActiveChange);
    onActiveChange.current       = props.onActiveChange;
    
    
    
    // callbacks:
    /*
          controllable : setActive(new) => update state(old => old) => trigger Event(new)
        uncontrollable : setActive(new) => update state(old => new) => trigger Event(new)
    */
    const triggerActiveChange = useCallback((active: boolean): void => {
        Promise.resolve().then(() => { // trigger the event after the <Indicator> has finished rendering (for controllable <Indicator>)
            // fire change synthetic event:
            onActiveChange.current?.({ active } as TActiveChangeEvent);
            
            // fire change dom event:
            if (changeEventTarget?.current) {
                // *hack*: trigger `onChange` event:
                // side effect: toggles the [checked] prop:
                changeEventTarget.current.dispatchEvent(new PointerEvent('click', { bubbles: true, cancelable: true, composed: true }));
            } // if
        });
    }, []);
    const setActive    : React.Dispatch<React.SetStateAction<boolean>> = useCallback((active: React.SetStateAction<boolean>): void => {
        // conditions:
        if (isDisabledOrReadOnly.current) return; // control is disabled or readOnly => no response required
        
        const newActive = (typeof(active) === 'function') ? active(wasActiveFn.current) : active;
        if (newActive === wasActiveFn.current) return; // still the same => nothing to update
        
        
        
        // update:
        setActiveTg(newActive);
        triggerActiveChange(newActive);
    }, []); // a stable callback, the `setActive` guaranteed to never change
    const toggleActive : React.Dispatch<void> = useCallback((): void => {
        // conditions:
        if (isDisabledOrReadOnly.current) return; // control is disabled or readOnly => no response required
        
        
        
        const newActive = !wasActiveFn.current;
        
        
        
        // update:
        setActiveTg(newActive);
        triggerActiveChange(newActive);
    }, []); // a stable callback, the `toggleActive` guaranteed to never change
    
    
    
    return [
        activeFn,
        setActive,
        toggleActive,
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
    const [sizeVariantRule] = usesSizeVariant(indicators);
    
    
    
    return style({
        ...imports([
            // variants:
            usesBasicVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
    });
};
export const usesIndicatorStates = () => {
    // dependencies:
    
    // states:
    const [enableDisableStateRule] = usesEnableDisableState();
    const [activePassiveStateRule] = usesActivePassiveState();
    
    
    
    return style({
        ...imports([
            // accessibilities:
            enableDisableStateRule,
            activePassiveStateRule,
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
export const [indicators, indicatorValues, cssIndicatorConfig] = cssConfig(() => {
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
}, { prefix: 'indi' });



// react components:
export interface IndicatorProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        BasicProps<TElement>,
        
        // accessibilities:
        AccessibilityProps
{
}
const Indicator = <TElement extends Element = HTMLElement>(props: IndicatorProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet         = useIndicatorStyleSheet();
    
    
    
    // states:
    
    // accessibilities:
    const enableDisableState = useEnableDisableState<TElement>(props);
    const activePassiveState = useActivePassiveState<TElement>(props);
    
    
    
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
            
            // :checked | [aria-checked] | [aria-pressed] | [aria-selected]
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
    Indicator,
    Indicator as default,
}
