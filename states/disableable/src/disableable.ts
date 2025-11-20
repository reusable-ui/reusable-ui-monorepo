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

// Reusable-ui states:
import {
    // Types:
    type DisabledStateProps,
    
    
    
    // Hooks:
    useDisabledState,
    
    
    
    // Utilities:
    isEnablingSelector,
    isDisablingOrDisabledSelector,
    
    ifEnabled,
    ifDisabled,
    ifEnabling,
    ifDisabling,
    ifEnablingOrEnabled,
    ifDisablingOrDisabled,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.



/**
 * @deprecated - Use `DisabledStateVars` instead.
 */
export interface DisableableVars {
    filter : any
    
    anim   : any
}
const [disableableVars] = cssVars<DisableableVars>({ prefix: 'di', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names

{
    const {animationRegistry: {registerFilter, registerAnim}} = usesAnimation();
    registerFilter(disableableVars.filter);
    registerAnim(disableableVars.anim);
}



// Not deprecated:
export {
    ifEnabled,
    ifDisabled,
    ifEnabling,
    ifDisabling,
}

/**
 * @deprecated - Use `ifEnablingOrEnabled` instead.
 */
export const ifEnable          = ifEnablingOrEnabled;

/**
 * @deprecated - Use `ifDisablingOrDisabled` instead.
 */
export const ifDisable         = ifDisablingOrDisabled;

/**
 * @deprecated - Use `rule([isExpandingOrExpandedSelector, isCollapsingSelector], styles)` instead.
 */
export const ifEnablingDisable = (styles: CssStyleCollection): CssRule => rule([isDisablingOrDisabledSelector, isEnablingSelector], styles);



/**
 * @deprecated - Use `CssDisabledState` instead.
 */
export interface DisableableStuff { disableableRule: Factory<CssRule>, disableableVars: CssVars<DisableableVars> }

/**
 * @deprecated - Use `CssDisabledStateOptions` instead.
 */
export interface DisableableConfig {
    filterDisable ?: CssKnownProps['filter'   ]
    
    animEnable    ?: CssKnownProps['animation']
    animDisable   ?: CssKnownProps['animation']
}
/**
 * @deprecated - Use `usesDisabledState` instead.
 * 
 * Adds a capability of UI to be disabled.
 * @param config  A configuration of `disableableRule`.
 * @returns A `DisableableStuff` represents a disableable state.
 */
export const usesDisableable = (config?: DisableableConfig): DisableableStuff => {
    return {
        disableableRule: () => style({
            // animation states:
            ...states([
                ifEnabling({
                    ...vars({
                        [disableableVars.filter] : config?.filterDisable,
                        [disableableVars.anim  ] : config?.animEnable,
                    }),
                }),
                ifDisabling({
                    ...vars({
                        [disableableVars.filter] : config?.filterDisable,
                        [disableableVars.anim  ] : config?.animDisable,
                    }),
                }),
                ifDisabled({
                    ...vars({
                        [disableableVars.filter] : config?.filterDisable,
                    }),
                }),
            ]),
        }),
        disableableVars,
    };
};



/**
 * @deprecated - Use `DisabledStateProps` instead.
 */
export interface DisableableProps
    extends
        // states:
        DisabledStateProps
{
    /**
     * @deprecated - Use `disabled` instead.
     */
    enabled        ?: DisabledStateProps['disabled']
    
    /**
     * @deprecated - Use `cascadeDisabled` instead.
     */
    inheritEnabled ?: DisabledStateProps['cascadeDisabled']
}

/**
 * @deprecated - Use `DisabledPhase` instead.
 */
export const enum DisableableState {
    Disabled  = 0,
    Disabling = 1,
    Enabling  = 2,
    Enabled   = 3,
}

/**
 * @deprecated - Use `DisabledBehaviorState` instead.
 */
export interface DisableableApi<TElement extends Element = HTMLElement> {
    enabled               : boolean
    disabled              : boolean
    
    state                 : DisableableState
    class                 : string|null
    
    props                 :
        | { disabled        : true }
        | { 'aria-disabled' : true }
        | null
    
    handleAnimationStart  : React.AnimationEventHandler<TElement>
    handleAnimationEnd    : React.AnimationEventHandler<TElement>
    handleAnimationCancel : React.AnimationEventHandler<TElement>
}

const htmlCtrls = [
    'button',
    'fieldset',
    'input',
    'select',
    'optgroup',
    'option',
    'textarea',
];
/**
 * @deprecated - Use `useDisabledBehaviorState` instead.
 */
export const useDisableable = <TElement extends Element = HTMLElement>(props: DisableableProps & SemanticProps): DisableableApi<TElement> => {
    // fn props:
    const propEnabled = useDisabledState(props);
    const { tag }     = useResolvedSemanticAttributes(props);
    
    
    
    // fn states:
    /*
     * state is enabled/disabled based on [controllable enabled]
     * [uncontrollable enabled] is not supported
     */
    const enabledFn : boolean = propEnabled /*controllable*/;
    
    
    
    // states:
    const [enabled, setEnabled, animation, {handleAnimationStart, handleAnimationEnd, handleAnimationCancel}] = useAnimatingState<boolean, TElement>({
        initialState  : enabledFn,
        animationName : /((^|[^a-z])(enable|disable)|([a-z])(Enable|Disable))(?![a-z])/,
    });
    
    
    
    // update state:
    if (enabled !== enabledFn) { // change detected => apply the change & start animating
        setEnabled(enabledFn);   // remember the last change
    } // if
    
    
    
    // fn props:
    const state = ((): DisableableState => {
        // enabling:
        if (animation === true ) return DisableableState.Enabling;
        
        // disabling:
        if (animation === false) return DisableableState.Disabling;
        
        // fully disabled:
        if (!enabled) return DisableableState.Disabled;
        
        // fully enabled:
        return DisableableState.Enabled;
    })();
    const stateClass = ((): string|null => {
        switch (state) {
            // enabling:
            case DisableableState.Enabling: {
                return 'enabling';
            };
            
            // disabling:
            case DisableableState.Disabling: {
                // [enabled] but *still* animating of disabling => force to keep disabling using class .disabling
                if (enabled) return 'disabling';
                
                return null; // uses :disabled or [aria-disabled]
            };
            
            // fully disabled:
            case DisableableState.Disabled: {
                return 'disabled';
            };
            
            // fully enabled:
            case DisableableState.Enabled: {
                return null;
            };
        } // switch
    })();
    
    
    
    // api:
    return {
        enabled  : enabled,
        disabled : !enabled,
        
        state    : state,
        class    : stateClass,
        
        props    : (() => {
            if (enabled) return null;
            
            // use :disabled if <control>:
            if (tag && htmlCtrls.includes(tag)) return { disabled: true };
            
            // else, use [aria-disabled]:
            return { 'aria-disabled' : true };
        })(),
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    };
};
