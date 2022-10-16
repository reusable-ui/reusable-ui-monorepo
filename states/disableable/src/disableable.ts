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
    SemanticProps,
    useSemantic,
}                           from '@reusable-ui/semantics'       // a semantic management system for react web components
import {
    // hooks:
    usePropEnabled,
    
    
    
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



// hooks:

// states:

//#region disableable
export interface DisableableVars {
    filter : any
    
    anim   : any
}
const [disableableVars] = cssVars<DisableableVars>();

{
    const {animationRegistry: {registerFilter, registerAnim}} = usesAnimation();
    registerFilter(disableableVars.filter);
    registerAnim(disableableVars.anim);
}



// if all below are not set => enabled:
const selectorIfEnabled   = ':not(:is(.enabling, .disabling, [aria-disabled]:not([aria-disabled="false"]), :disabled, .disabled))'
// .enabling will be added after loosing disable and will be removed after enabling-animation done:
const selectorIfEnabling  = '.enabling'
// .disabling, [aria-disabled] = styled disable, :disabled = native disable:
const selectorIfDisabling = ':is(.disabling, [aria-disabled]:not([aria-disabled="false"]), :disabled):not(.disabled)'
// .disabled will be added after disabling-animation done:
const selectorIfDisabled  = '.disabled'

export const ifEnabled         = (styles: CssStyleCollection): CssRule => rule(selectorIfEnabled  , styles);
export const ifEnabling        = (styles: CssStyleCollection): CssRule => rule(selectorIfEnabling , styles);
export const ifDisabling       = (styles: CssStyleCollection): CssRule => rule(selectorIfDisabling, styles);
export const ifDisabled        = (styles: CssStyleCollection): CssRule => rule(selectorIfDisabled , styles);

export const ifEnable          = (styles: CssStyleCollection): CssRule => rule([selectorIfEnabling, selectorIfEnabled                                         ], styles);
export const ifDisable         = (styles: CssStyleCollection): CssRule => rule([                                       selectorIfDisabling, selectorIfDisabled], styles);
export const ifEnablingDisable = (styles: CssStyleCollection): CssRule => rule([selectorIfEnabling,                    selectorIfDisabling, selectorIfDisabled], styles);



export interface DisableableStuff { disableableRule: Factory<CssRule>, disableableVars: CssVars<DisableableVars> }
export interface DisableableConfig {
    filterDisable ?: CssKnownProps['filter'   ]
    
    animEnable    ?: CssKnownProps['animation']
    animDisable   ?: CssKnownProps['animation']
}
/**
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



export interface DisableableProps
    extends
        // states:
        Partial<Pick<AccessibilityProps, 'enabled'|'inheritEnabled'>>
{
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
export const useDisableable = <TElement extends Element = HTMLElement>(props: DisableableProps & SemanticProps) => {
    // fn props:
    const propEnabled = usePropEnabled(props);
    const {tag}       = useSemantic(props);
    
    
    
    // fn states:
    /*
     * state is enabled/disabled based on [controllable enabled]
     * [uncontrollable enabled] is not supported
     */
    const enabledFn : boolean = propEnabled /*controllable*/;
    
    
    
    // states:
    const [enabled, setEnabled, animation, {handleAnimationStart, handleAnimationEnd, handleAnimationCancel}] = useAnimatingState<boolean, TElement>({
        initialState  : enabledFn,
        animationName : /((?<![a-z])(enable|disable)|(?<=[a-z])(Enable|Disable))(?![a-z])/,
    });
    
    
    
    // update state:
    if (enabled !== enabledFn) { // change detected => apply the change & start animating
        setEnabled(enabledFn);   // remember the last change
    } // if
    
    
    
    // interfaces:
    return {
        enabled  : enabled,
        disabled : !enabled,
        
        class    : ((): string|null => {
            // enabling:
            if (animation === true)  return 'enabling';
            
            // disabling:
            if (animation === false) {
                // [enabled] but *still* animating of disabling => force to keep disabling using class .disabling
                if (enabled) return 'disabling';
                
                return null; // uses :disabled or [aria-disabled]
            } // if
            
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
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    };
};
//#endregion disableable
