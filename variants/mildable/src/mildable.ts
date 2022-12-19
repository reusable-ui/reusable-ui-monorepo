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
    variants,
    atRoot,
    style,
    vars,
    imports,
    globalScope,
    styleSheets,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
    switchOf,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui variants:
import {
    // hooks:
    usesThemable,
}                           from '@reusable-ui/themable'        // color options of UI



// defaults:
const _defaultMild : Required<MildableProps>['mild'] = false



// hooks:

// variants:

//#region mildable
export type ToggleMild = boolean|'inherit'|null
export interface MildableVars {
    /**
     * the mildable preference.
     */
    mildPr     : any
    /**
     * the mild switching function.
     */
    mildSw     : any
    
    
    
    /**
     * functional background color - at mild variant.
     */
    backgFn    : any
    /**
     * conditionally toggled background color - at mild variant.
     */
    backgTg    : any
    /**
     * functional alternate background color - at mild variant.
     */
    altBackgFn : any
    /**
     * conditionally toggled alternate background color - at mild variant.
     */
    altBackgTg : any
    
    
    
    /**
     * functional foreground color - at mild variant.
     */
    foregFn    : any
    /**
     * conditionally toggled foreground color - at mild variant.
     */
    foregTg    : any
    /**
     * functional alternate foreground color - at mild variant.
     */
    altForegFn : any
    /**
     * conditionally toggled alternate foreground color - at mild variant.
     */
    altForegTg : any
}
const [mildableVars] = cssVars<MildableVars>();



//#region caches
const mildDefinitionsCache   = new Map<ToggleMild, CssRule>();
let defaultmildableRuleCache : WeakRef<CssRule> | null = null;
//#endregion caches



// parent is     `.mild` -or- current is     `.mild`:
export const ifMild        = (styles: CssStyleCollection): CssRule => rule(              ':is(.mild&, &.mild)'                         , styles); // specificityWeight = 1 + (parent's specificityWeight)
// parent is `.not-mild` -or- current is `.not-mild`:
export const ifNotMild     = (styles: CssStyleCollection): CssRule => rule(              ':is(.not-mild&, &.not-mild)'                 , styles); // specificityWeight = 1 + (parent's specificityWeight)
export const ifInheritMild = (styles: CssStyleCollection): CssRule => rule(':where(&):not(:is(.mild&, &.mild, .not-mild&, &.not-mild))', styles); // specificityWeight = 1 + (parent's specificityWeight)



export interface MildableStuff { mildableRule: Factory<CssRule>, mildableVars: CssVars<MildableVars> }
export interface MildableConfig {
    backg    ?: CssKnownProps['backgroundColor']
    foreg    ?: CssKnownProps['foreground'     ]
    altBackg ?: CssKnownProps['backgroundColor']
    altForeg ?: CssKnownProps['foreground'     ]
}
const createMildableRule = (config?: MildableConfig, mildDefinition : null|((toggle: ToggleMild) => CssStyleCollection) = defineMild): CssRule => {
    // dependencies:
    const {themableRule, themableVars} = usesThemable();
    
    
    
    return style({
        ...imports([
            // makes   `usesMildable()` implicitly `usesThemable()`
            // because `usesMildable()` requires   `usesThemable()` to work correctly, otherwise it uses the parent themes (that's not intented)
            themableRule,
        ]),
        
        
        
        // configs:
        ...vars({
            /*
                supports for `usesColorable()`:
                only reset `mildableVars.mildSw = mildableVars.mildPr` if `mildDefinition` provided,
                so the *modified* `mildableVars.mildSw` by `setMild()` still *preserved*,
                thus the `usesColorable()` can see the <parent>'s actual [mild] status.
            */
            [mildableVars.mildSw] : (mildDefinition || undefined) && mildableVars.mildPr,
        }),
        
        
        
        // color functions:
        ...vars({
            // adaptive color functions:
            
            [mildableVars.backgFn   ] : switchOf(
                themableVars.backgMildCond,    // first  priority
                themableVars.backgMild,        // second priority
                
                config?.backg,                 // default => uses config's background
            ),
            
            [mildableVars.foregFn   ] : switchOf(
                themableVars.foregMildCond,    // first  priority
                themableVars.foregMild,        // second priority
                
                config?.foreg,                 // default => uses config's foreground
            ),
            
            
            
            [mildableVars.altBackgFn] : switchOf(
                themableVars.altBackgMildCond, // first  priority
                themableVars.altBackgMild,     // second priority
                
                config?.altBackg,              // default => uses config's alternate background
            ),
            
            [mildableVars.altForegFn] : switchOf(
                themableVars.altForegMildCond, // first  priority
                themableVars.altForegMild,     // second priority
                
                config?.altForeg,              // default => uses config's alternate foreground
            ),
        }),
        
        
        
        // toggling functions:
        ...vars({
            [mildableVars.backgTg] : [[
                mildableVars.mildSw,  // the mild switching function
                mildableVars.backgFn, // the mild background color definition
            ]],
            [mildableVars.foregTg] : [[
                mildableVars.mildSw,  // the mild switching function
                mildableVars.foregFn, // the mild foreground color definition
            ]],
            
            [mildableVars.altBackgTg] : [[
                mildableVars.mildSw,     // the mild switching function
                mildableVars.altBackgFn, // the mild alternate background color definition
            ]],
            [mildableVars.altForegTg] : [[
                mildableVars.mildSw,     // the mild switching function
                mildableVars.altForegFn, // the mild alternate foreground color definition
            ]],
        }),
        
        
        
        // toggling conditions:
        ...variants([
            mildDefinition && ifMild(mildDefinition(true)),
            mildDefinition && ifNotMild(mildDefinition(false)),
            mildDefinition && ifInheritMild(mildDefinition('inherit')),
        ]),
    });
};
const getDefaultMildableRule = () => {
    const cached = defaultmildableRuleCache?.deref();
    if (cached !== undefined) return cached;
    
    
    
    const defaultMildableRule = createMildableRule();
    defaultmildableRuleCache = new WeakRef<CssRule>(defaultMildableRule);
    return defaultMildableRule;
};
/**
 * Uses a toggleable mildification.  
 * @param config  A configuration of `mildableRule`.
 * @param mildDefinition A callback to create a mildification rules for each toggle state.
 * @returns A `MildableStuff` represents the mildification rules for each toggle state.
 */
export const usesMildable = (config?: MildableConfig, mildDefinition : null|((toggle: ToggleMild) => CssStyleCollection) = defineMild): MildableStuff => {
    return {
        mildableRule: (
            ((config === undefined) && (mildDefinition === defineMild))
            ?
            getDefaultMildableRule
            :
            () => createMildableRule(config, mildDefinition)
        ),
        mildableVars,
    };
};

/**
 * Defines a mildification preference rules for the given `toggle` state.
 * @param toggle `true` to activate the mildification -or- `false` to deactivate -or- `'inherit'` to inherit the mildification from its ancestor -or- `null` to remove previously declared `defineMild`.
 * @returns A `CssRule` represents a mildification rules for the given `toggle` state.
 */
export const defineMild = (toggle: ToggleMild): CssRule => {
    const cached = mildDefinitionsCache.get(toggle);
    if (cached !== undefined) return cached;
    
    
    
    const mildDef = style({
        ...vars({
            /*
                *switch on/off/inherit* the `**Tg` prop.
                toggle:
                    true    => empty string      => do not alter the `**Tg`'s value => activates   `**Tg` variable.
                    false   => initial (invalid) => destroy      the `**Tg`'s value => deactivates `**Tg` variable.
                    inherit => inherit           => follows      the <ancestor> decision.
                    null    => null              => remove the prev declaration
            */
            [mildableVars.mildPr] : (typeof(toggle) === 'boolean') ? (toggle ? '' : 'initial') : toggle,
        }),
    });
    mildDefinitionsCache.set(toggle, mildDef);
    return mildDef;
};
/**
 * Sets the current mildification state by the given `toggle` state.
 * @param toggle `true` to activate the mildification -or- `false` to deactivate -or- `'inherit'` to inherit the mildification from its ancestor -or- `null` to remove previously declared `setMild`.
 * @returns A `CssRule` represents a mildification rules for the given `toggle` state.
 */
export const setMild = (toggle: ToggleMild): CssRule => style({
    ...vars({
        /*
            *switch on/off/inherit* the `**Tg` prop.
            toggle:
                true    => empty string      => do not alter the `**Tg`'s value => activates   `**Tg` variable.
                false   => initial (invalid) => destroy      the `**Tg`'s value => deactivates `**Tg` variable.
                inherit => inherit           => follows      the <ancestor> decision.
                null    => null              => remove the prev declaration
        */
        [mildableVars.mildSw] : (typeof(toggle) === 'boolean') ? (toggle ? '' : 'initial') : toggle,
    }),
});



export interface MildableProps {
    // variants:
    mild ?: boolean|'inherit'
}
export const useMildable = ({mild = _defaultMild}: MildableProps) => ({
    class: (mild === 'inherit') ? null : (mild ? 'mild' : 'not-mild'),
});
//#endregion mildable



//#region style sheets
/*
    a side-effect styleSheet that forced to `"sideEffects": false` by `package.json`,
    so if you don't import anything from this module, this side effect will gone.
*/
styleSheets([
    globalScope({
        ...atRoot({
            ...imports([
                /*
                    supports for `usesColorable()`:
                    at outside <component>, which is at <html><body>, the whole page assumes to be *mild*-ed (not filled by bold color theme).
                    so we need to reset the whole page to mild={true}
                */
                setMild(true),
            ]),
        }),
    }),
]);
//#endregion style sheets
