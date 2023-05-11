// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
}                           from 'react'

// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssKnownProps,
    CssRule,
    CssStyleCollection,
    
    
    
    // writes css in javascript:
    rule,
    states,
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui utilities:
import {
    // hooks:
    useEvent,
    EventHandler,
    useMountedFlag,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    SemanticProps,
    useSemantic,
}                           from '@reusable-ui/semantics'       // a semantic management system for react web components
import {
    // hooks:
    usePropAccessibility,
    usePropActive,
    
    
    
    // react components:
    AccessibilityProps,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import {
    // hooks:
    useAnimatingState,
}                           from '@reusable-ui/animating-state' // a hook for creating animating state

// reusable-ui features:
import {
    // hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'       // animation stuff of UI

// reusable-ui variants:
import {
    // hooks:
    setOutlined,
    OutlineableProps,
}                           from '@reusable-ui/outlineable'     // outlined (background-less) variant of UI
import {
    // hooks:
    setMild,
    MildableProps,
}                           from '@reusable-ui/mildable'        // mild (soft color) variant of UI



// hooks:

// states:

//#region activatable
export interface ActivatableVars {
    /* supports for `usesActiveAsClick()` */
    
    filterActive : any
    
    animActive   : any
    animPassive  : any
    
    
    
    filter       : any
    
    anim         : any
}
const [activatableVars] = cssVars<ActivatableVars>({ prefix: 'ac', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names

{
    const {animationRegistry: {registerFilter, registerAnim}} = usesAnimation();
    registerFilter(activatableVars.filter);
    registerAnim(activatableVars.anim);
}



// .activated will be added after activating-animation done:
const selectorIfActivated   = '.activated'
// .activating, [aria-checked],[aria-pressed],[aria-selected] = styled active, :checked = native active:
const selectorIfActivating  = ':is(.activating, [aria-checked]:not([aria-checked="false"]), [aria-pressed]:not([aria-pressed="false"]), [aria-selected]:not([aria-selected="false"]), :checked):not(:is(.activated, .passivating))'
// .passivating will be added after loosing active and will be removed after deactivating-animation done:
const selectorIfPassivating = '.passivating'
// if all above are not set => passivated:
const selectorIfPassivated  = ':not(:is(.activated, .activating, [aria-checked]:not([aria-checked="false"]), [aria-pressed]:not([aria-pressed="false"]), [aria-selected]:not([aria-selected="false"]), :checked, .passivating))'



export const ifActivated         = (styles: CssStyleCollection): CssRule => rule(selectorIfActivated  , styles);
export const ifActivating        = (styles: CssStyleCollection): CssRule => rule(selectorIfActivating , styles);
export const ifPassivating       = (styles: CssStyleCollection): CssRule => rule(selectorIfPassivating, styles);
export const ifPassivated        = (styles: CssStyleCollection): CssRule => rule(selectorIfPassivated , styles);

export const ifActive            = (styles: CssStyleCollection): CssRule => rule([selectorIfActivating, selectorIfActivated                                           ], styles);
export const ifPassive           = (styles: CssStyleCollection): CssRule => rule([                                         selectorIfPassivating, selectorIfPassivated], styles);
export const ifActivePassivating = (styles: CssStyleCollection): CssRule => rule([selectorIfActivating, selectorIfActivated, selectorIfPassivating                    ], styles);



export interface ActivatableStuff { activatableRule: Factory<CssRule>, activatableVars: CssVars<ActivatableVars> }
export interface ActivatableConfig {
    filterActive ?: CssKnownProps['filter'   ]
    
    animActive   ?: CssKnownProps['animation']
    animPassive  ?: CssKnownProps['animation']
}
/**
 * Adds a capability of UI to be highlighted/selected/activated.
 * @param config  A configuration of `activatableRule`.
 * @returns A `ActivatableStuff` represents an activatable state.
 */
export const usesActivatable = (config?: ActivatableConfig): ActivatableStuff => {
    return {
        activatableRule: () => style({
            // configs:
            ...vars({
                /* supports for `usesActiveAsClick()` */
                
                [activatableVars.filterActive] : config?.filterActive,
                
                [activatableVars.animActive  ] : config?.animActive,
                [activatableVars.animPassive ] : config?.animPassive,
            }),
            
            
            
            // animation states:
            ...states([
                ifActivated({
                    ...vars({
                        [activatableVars.filter] : activatableVars.filterActive,
                    }),
                }),
                ifActivating({
                    ...vars({
                        [activatableVars.filter] : activatableVars.filterActive,
                        [activatableVars.anim  ] : activatableVars.animActive,
                    }),
                }),
                ifPassivating({
                    ...vars({
                        [activatableVars.filter] : activatableVars.filterActive,
                        [activatableVars.anim  ] : activatableVars.animPassive,
                    }),
                }),
            ]),
        }),
        activatableVars,
    };
};

export interface MarkActiveOptions {
    outlined ?: null|OutlineableProps['outlined']
    mild     ?: null|MildableProps['mild']
}
export const markActive = (options?: MarkActiveOptions): CssRule => {
    // options:
    const { outlined = false, mild = false } = options ?? {};
    
    
    
    return style({
        // variants:
        ...setOutlined(outlined), // kill outlined variant
        ...setMild(mild),         // kill mild     variant
    });
};



export interface ActiveChangeEvent
    extends
        // states:
        Required<Pick<AccessibilityProps,
            |'active'
        >>
{
}
export interface ActivatableProps
    extends
        // states:
        Partial<Pick<AccessibilityProps,
            |'active'
            |'inheritActive'
        >>
{
}

export const enum ActivatableState {
    Passivated  = 0,
    Passivating = 1,
    Activating  = 2,
    Activated   = 3,
}

export interface ActivatableApi<TElement extends Element = HTMLElement> {
    active                : boolean
    
    state                 : ActivatableState
    class                 : string|null
    
    props                 :
        | { checked         : true }
        | { 'aria-checked'  : true }
        | { 'aria-pressed'  : true }
        | { 'aria-selected' : true }
        | null
    
    handleAnimationStart  : React.AnimationEventHandler<TElement>
    handleAnimationEnd    : React.AnimationEventHandler<TElement>
    handleAnimationCancel : React.AnimationEventHandler<TElement>
}

const checkableCtrls = [
    'checkbox',
    'radio',
];
export const useActivatable = <TElement extends Element = HTMLElement>(props: ActivatableProps & SemanticProps): ActivatableApi<TElement> => {
    // fn props:
    const propActive  = usePropActive(props);
    const {tag, role} = useSemantic(props);
    
    
    
    // fn states:
    /*
     * state is active/passive based on [controllable active]
     * [uncontrollable active] is not supported
     */
    const activeFn : boolean = propActive /*controllable*/;
    
    
    
    // states:
    const [activated, setActivated, animation, {handleAnimationStart, handleAnimationEnd, handleAnimationCancel}] = useAnimatingState<boolean, TElement>({
        initialState  : activeFn,
        animationName : /((?<![a-z])(active|passive)|(?<=[a-z])(Active|Passive))(?![a-z])/,
    });
    
    
    
    // update state:
    if (activated !== activeFn) { // change detected => apply the change & start animating
        setActivated(activeFn);   // remember the last change
    } // if
    
    
    
    // fn props:
    const state = ((): ActivatableState => {
        // activating:
        if (animation === true ) return ActivatableState.Activating;
        
        // passivating:
        if (animation === false) return ActivatableState.Passivating;
        
        // fully activated:
        if (activated) return ActivatableState.Activated;
        
        // fully passivated:
        return ActivatableState.Passivated;
    })();
    const stateClass = ((): string|null => {
        switch (state) {
            // activating:
            case ActivatableState.Activating: {
                // not [activated] but *still* animating of activating => force to keep activating using class .activating
                if (!activated) return 'activating';
                
                return null; // uses :checked or [aria-checked] or [aria-pressed] or [aria-selected]
            };
            
            // passivating:
            case ActivatableState.Passivating: {
                return 'passivating';
            };
            
            // fully activated:
            case ActivatableState.Activated: {
                return 'activated';
            };
            
            // fully passivated:
            case ActivatableState.Passivated: {
                return null;
            };
        } // switch
    })();
    
    
    
    // interfaces:
    return {
        active    : activated,
        
        state     : state,
        class     : stateClass,
        
        props     : (() => {
            if (!activated) return null;
            
            // use :checked if <input type="checkbox|radio">:
            if ((tag === 'input') && checkableCtrls.includes((props as any).type)) return { checked: true };
            
            // use [aria-checked] if [role="checkbox|radio"]:
            if (role && checkableCtrls.includes(role)) return { 'aria-checked': true };
            
            // use [aria-pressed] if <button> or [role="button"]:
            if ((tag === 'button') || (role === 'button')) return { 'aria-pressed': true };
            
            // else, use [aria-selected]:
            return { 'aria-selected' : true };
        })(),
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    };
};



export interface ControllableActivatableProps<TActiveChangeEvent extends ActiveChangeEvent = ActiveChangeEvent>
    extends
        // states:
        ActivatableProps
{
    // states:
    onActiveChange ?: EventHandler<TActiveChangeEvent>
}
export interface UncontrollableActivatableProps<TActiveChangeEvent extends ActiveChangeEvent = ActiveChangeEvent>
    extends
        // states:
        ControllableActivatableProps<TActiveChangeEvent>,
        
        // accessibilities:
        AccessibilityProps // the uncontrollable's accessibility of: enabled, readOnly, active
{
    // states:
    defaultActive  ?: boolean
}
export const useUncontrollableActivatable = <TActiveChangeEvent extends ActiveChangeEvent = ActiveChangeEvent>(props: UncontrollableActivatableProps<TActiveChangeEvent>, changeEventTarget?: (React.RefObject<HTMLInputElement>|null)): readonly [boolean, React.Dispatch<React.SetStateAction<boolean>>, React.Dispatch<void>] => {
    // accessibilities:
    const {enabled: propEnabled, readOnly: propReadOnly, active: propActive} = usePropAccessibility<boolean, boolean, null>(props, undefined, undefined, null);
    const isDisabledOrReadOnly = (!propEnabled || propReadOnly);
    
    
    
    // states:
    const [activeTg, setActiveTg] = useState<boolean>(props.defaultActive ?? false);
    const isMounted               = useMountedFlag();
    
    
    
    /*
     * state is active/passive based on [controllable active] (if set) and fallback to [uncontrollable active]
     */
    const activeFn : boolean = propActive /*controllable*/ ?? activeTg /*uncontrollable*/;
    
    
    
    // callbacks:
    const {
        onActiveChange,
    } = props;
    /*
          controllable : setActive(new) => update state(old => old) => trigger Event(new)
        uncontrollable : setActive(new) => update state(old => new) => trigger Event(new)
    */
    const triggerActiveChange  = useEvent<React.Dispatch<boolean>>((active) => {
        // fire change native event:
        const element = changeEventTarget?.current;
        let doTriggerClick = false;
        if (element) {
            // *hack*: trigger `onChange` event:
            // side effect: toggles the [checked] prop:
            
            if ((element.tagName === 'INPUT') && (element.type === 'radio')) {
                if (active) {
                    // register to fire `click` native event to trigger `onChange` synthetic event:
                    doTriggerClick = true;
                }
                // else {
                //     // do nothing if (active === false)
                //     // the `onChange` event is *never* triggered when *uncheck*
                // } // if
            }
            else {
                // register to fire `click` native event to trigger `onChange` synthetic event:
                doTriggerClick = true;
            } // if
        } // if
        
        if (onActiveChange) setTimeout(() => {
            // conditions:
            if (!isMounted.current) return;
            
            
            
            // fire `click` native event to trigger `onChange` synthetic event:
            if (element && doTriggerClick) {
                (element as any)._valueTracker?.stopTracking?.(); // react *hack*
                
                element.dispatchEvent(new PointerEvent('click', { bubbles: true, cancelable: true, composed: true }));
            } // if
            
            
            
            // fire `onActiveChange` react event:
            onActiveChange({ active } as TActiveChangeEvent);
        }, 0); // runs the 'click' & 'onActiveChange' events *next after* current event completed
    });
    const setActive            = useEvent<React.Dispatch<React.SetStateAction<boolean>>>((active) => {
        // conditions:
        if (isDisabledOrReadOnly) return; // control is disabled or readOnly => no response required
        
        const newActive = (typeof(active) === 'function') ? active(activeFn) : active;
        if (newActive === activeFn) return; // still the same => nothing to update
        
        
        
        // update:
        setActiveTg(newActive);
        triggerActiveChange(newActive);
    }); // a stable callback, the `setActive` guaranteed to never change
    const toggleActive         = useEvent<React.Dispatch<void>>(() => {
        // conditions:
        if (isDisabledOrReadOnly) return; // control is disabled or readOnly => no response required
        
        
        
        const newActive = !activeFn;
        
        
        
        // update:
        setActiveTg(newActive);
        triggerActiveChange(newActive);
    }); // a stable callback, the `toggleActive` guaranteed to never change
    
    
    
    return [
        activeFn,
        setActive,
        toggleActive,
    ];
};
//#endregion activatable
