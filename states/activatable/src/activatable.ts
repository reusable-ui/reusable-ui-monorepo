// React:
import {
    // React:
    default as React,
    
    
    
    // Hooks:
    useState,
}                           from 'react'

// Cssfn:
import {
    // Cssfn general types:
    Factory,
    
    
    
    // Cssfn css specific types:
    CssKnownProps,
    CssRule,
    CssStyleCollection,
    
    
    
    // Writes css in javascript:
    rule,
    states,
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui utilities:
import {
    // Hooks:
    useEvent,
    EventHandler,
    useScheduleTriggerEvent,
}                           from '@reusable-ui/hooks'               // React helper hooks.
import {
    // Hooks:
    SemanticProps,
    useResolvedSemanticAttributes,
}                           from '@reusable-ui/semantics'           // Semantic utility for resolving tag and role behaviors in reusable UI components.
import {
    // Hooks:
    useAnimatingState,
}                           from '@reusable-ui/animating-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.

// Reusable-ui features:
import {
    // Hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'           // Animation stuff of UI.

// Reusable-ui variants:
import {
    // Hooks:
    setOutlined,
    OutlineableProps,
}                           from '@reusable-ui/outlineable'         // Outlined (background-less) variant of UI.
import {
    // Hooks:
    setMild,
    MildableProps,
}                           from '@reusable-ui/mildable'            // Mild (soft color) variant of UI.

// Reusable-ui states:
import {
    // Types:
    type DisabledStateProps,
    
    
    
    // Hooks:
    useDisabledState,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.
import {
    // Types:
    type ReadOnlyStateProps,
    
    
    
    // Hooks:
    useReadOnlyState,
}                           from '@reusable-ui/read-only-state'     // Adds editable/read-only functionality to UI components, with transition animations and semantic styling hooks.
import {
    // Types:
    type ActiveStateProps,
    
    
    
    // Hooks:
    useActiveState,
    
    
    
    // Utilities:
    isDeactivatingSelector,
    isActivatingOrActiveSelector,
    
    ifActive                 as activeStateIfActive,
    ifInactive               as activeStateIfInactive,
    ifActivating             as activeStateIfActivating,
    ifDeactivating           as activeStateIfDeactivating,
    ifActivatingOrActive     as activeStateIfActivatingOrActive,
    ifDeactivatingOrInactive as activeStateIfDeactivatingOrInactive,
}                           from '@reusable-ui/active-state'        // Adds activation/deactivation (selection) functionality to UI components, with transition animations and semantic styling hooks.



/**
 * @deprecated - Use `ActiveStateVars` instead.
 */
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



/**
 * @deprecated - Use `ifActive` from `@reusable-ui/active-state` instead.
 */
export const ifActivated         = activeStateIfActive;
/**
 * @deprecated - Use `ifActivating` from `@reusable-ui/active-state` instead.
 */
export const ifActivating        = activeStateIfActivating;
/**
 * @deprecated - Use `ifDeactivating` from `@reusable-ui/active-state` instead.
 */
export const ifPassivating       = activeStateIfDeactivating;
/**
 * @deprecated - Use `ifInactive` from `@reusable-ui/active-state` instead.
 */
export const ifPassivated        = activeStateIfInactive;

/**
 * @deprecated - Use `ifActivatingOrActive` from `@reusable-ui/active-state` instead.
 */
export const ifActive            = activeStateIfActivatingOrActive;
/**
 * @deprecated - Use `ifDeactivatingOrInactive` from `@reusable-ui/active-state` instead.
 */
export const ifPassive           = activeStateIfDeactivatingOrInactive;
/**
 * @deprecated - Use `rule([isActivatingOrActiveSelector, isDeactivatingSelector], styles)` instead.
 */
export const ifActivePassivating = (styles: CssStyleCollection): CssRule => rule([isActivatingOrActiveSelector, isDeactivatingSelector], styles);



/**
 * @deprecated - Use `CssActiveState` instead.
 */
export interface ActivatableStuff { activatableRule: Factory<CssRule>, activatableVars: CssVars<ActivatableVars> }

/**
 * @deprecated - Use `CssActiveStateOptions` instead.
 */
export interface ActivatableConfig {
    filterActive ?: CssKnownProps['filter'   ]
    
    animActive   ?: CssKnownProps['animation']
    animPassive  ?: CssKnownProps['animation']
}
/**
 * @deprecated - Use `usesActiveState` instead.
 * 
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

/**
 * @deprecated - No longer needed.
 */
export interface MarkActiveOptions {
    outlined ?: null|Extract<OutlineableProps['outlined'], boolean>
    mild     ?: null|Extract<MildableProps['mild'], boolean>
}
/**
 * @deprecated - No longer needed.
 * When the component is activated, we can easily suppress or force the outline and mild variant by:
 * ```tsx
 *     // suppress outlined and mild when active:
 *     <Component outlined={isActive ? false : undefined} mild={isActive ? false : undefined} />
 *     
 *     // force outlined and mild when active:
 *     <Component outlined={isActive ? true : undefined} mild={isActive ? true : undefined} />
 * ```
 */
export const markActive = (options?: MarkActiveOptions): CssRule => {
    // options:
    const { outlined = false, mild = false } = options ?? {};
    
    
    
    return style({
        // variants:
        ...setOutlined(outlined), // kill outlined variant
        ...setMild(mild),         // kill mild     variant
    });
};



/**
 * @deprecated - No longer needed.
 */
export interface ActiveChangeEvent
    extends
        // states:
        Required<Pick<ActiveStateProps,
            |'active'
        >>
{
}
/**
 * @deprecated - Use `ActiveStateProps` instead.
 */
export interface ActivatableProps
    extends
        // states:
        Partial<Pick<ActiveStateProps,
            |'active'
        >>
{
    /**
     * @deprecated - Use `cascadeActive` instead.
     */
    inheritActive ?: ActiveStateProps['cascadeActive']
}

/**
 * @deprecated - Use `ActivePhase` instead.
 */
export const enum ActivatableState {
    Passivated  = 0,
    Passivating = 1,
    Activating  = 2,
    Activated   = 3,
}

/**
 * @deprecated - Use `ActiveBehaviorState` instead.
 */
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
/**
 * @deprecated - Use `useActiveBehaviorState` instead.
 */
export const useActivatable = <TElement extends Element = HTMLElement>(props: ActivatableProps & SemanticProps): ActivatableApi<TElement> => {
    // fn props:
    const propActive    = useActiveState(props as any);
    const { tag, role } = useResolvedSemanticAttributes(props);
    
    
    
    // fn states:
    /*
     * state is active/passive based on [controllable active]
     * [uncontrollable active] is not supported
     */
    const activeFn : boolean = propActive /*controllable*/;
    
    
    
    // states:
    const [activated, setActivated, animation, {handleAnimationStart, handleAnimationEnd, handleAnimationCancel}] = useAnimatingState<boolean, TElement>({
        initialState  : activeFn,
        animationName : /((^|[^a-z])(active|passive)|([a-z])(Active|Passive))(?![a-z])/,
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
    
    
    
    // api:
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



/**
 * @deprecated - Use `ActiveStateProps & ActiveStateChangeProps` instead.
 */
export interface ControllableActivatableProps<TActiveChangeEvent extends ActiveChangeEvent = ActiveChangeEvent>
    extends
        // states:
        ActivatableProps
{
    // states:
    onActiveChange ?: EventHandler<TActiveChangeEvent>
}
/**
 * @deprecated - Use `ActiveStateProps & ActiveStateChangeProps & UncontrollableActiveStateProps` instead.
 */
export interface UncontrollableActivatableProps<TActiveChangeEvent extends ActiveChangeEvent = ActiveChangeEvent>
    extends
        // states:
        ControllableActivatableProps<TActiveChangeEvent>
{
    // states:
    defaultActive  ?: boolean
}
/**
 * @deprecated - Use `useUncontrollableActiveState` instead.
 */
export const useUncontrollableActivatable = <TActiveChangeEvent extends ActiveChangeEvent = ActiveChangeEvent>(props: UncontrollableActivatableProps<TActiveChangeEvent> & DisabledStateProps & ReadOnlyStateProps, changeEventTarget?: (React.RefObject<HTMLInputElement>|null)): readonly [boolean, React.Dispatch<React.SetStateAction<boolean>>, React.Dispatch<void>] => {
    // Flags:
    
    // Resolve whether the component is disabled:
    const isDisabled        = useDisabledState(props as Parameters<typeof useDisabledState>[0]);
    
    // Resolve whether the component is readonly:
    const isReadonly        = useReadOnlyState(props as Parameters<typeof useReadOnlyState>[0]);
    
    // Resolve whether the component is in a restricted state:
    const isRestricted      = isDisabled || isReadonly;
    
    const propActive        = useActiveState(props as any);
    
    
    
    // states:
    const [activeTg, setActiveTg] = useState<boolean>(props.defaultActive ?? false);
    
    
    
    /*
     * state is active/passive based on [controllable active] (if set) and fallback to [uncontrollable active]
     */
    const activeFn : boolean = propActive /*controllable*/ ?? activeTg /*uncontrollable*/;
    
    
    
    // events:
    const scheduleTriggerEvent = useScheduleTriggerEvent();
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
        let doTriggerOnChange = false;
        if (element) {
            if ((element.tagName === 'INPUT') && (element.type === 'radio')) {
                if (active) {
                    // register to fire `onChange` synthetic event:
                    doTriggerOnChange = true;
                }
                // else {
                //     // do nothing if (active === false)
                //     // the `onChange` event is *never* triggered when *uncheck*
                // } // if
            }
            else {
                // register to fire `onChange` synthetic event:
                doTriggerOnChange = true;
            } // if
        } // if
        
        if ((element && doTriggerOnChange) || onActiveChange) scheduleTriggerEvent(() => { // runs the `click` & `onActiveChange` events *next after* current macroTask completed
            // react *hack*: trigger `onChange` event:
            // side effect: toggles the [checked] prop:
            if (element && doTriggerOnChange) {
                if ((element.tagName === 'INPUT') && (element.type === 'checkbox')) element.checked = !active; // react *hack* in order to Native *update* [checked] prop and update the [validity] prop (NOTE: 'checkbox' only, the 'radio' is not needed)
                (element as any)._valueTracker?.setValue(`${!active}`); // react *hack* in order to React *see* the changes when `input` event fired
                
                // fire `click` native event to trigger `onChange` synthetic event:
                element.dispatchEvent(new PointerEvent('click', { bubbles: true, cancelable: true, composed: true }));
            } // if
            
            
            
            // fire `onActiveChange` react event:
            onActiveChange?.({ active } as TActiveChangeEvent);
        });
    });
    
    
    
    // callbacks:
    const setActive            = useEvent<React.Dispatch<React.SetStateAction<boolean>>>((active) => {
        // conditions:
        if (isRestricted) return; // control is in a restricted state (interaction blocked) => no response required
        
        const newActive = (typeof(active) === 'function') ? active(activeFn) : active;
        if (newActive === activeFn) return; // still the same => nothing to update
        
        
        
        // update:
        setActiveTg(newActive);
        triggerActiveChange(newActive);
    }); // a stable callback, the `setActive` guaranteed to never change
    const toggleActive         = useEvent<React.Dispatch<void>>(() => {
        // conditions:
        if (isRestricted) return; // control is in a restricted state (interaction blocked) => no response required
        
        
        
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
