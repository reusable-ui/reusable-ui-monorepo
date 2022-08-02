// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'             // cssfn general types
import type {
    // css custom properties:
    CssCustomRef,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
}                           from '@cssfn/css-types'         // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'             // writes css in javascript
import {
    // utilities:
    cssVar,
    fallbacks,
}                           from '@cssfn/css-var'           // strongly typed of css variables

// reusable-ui variants:
import {
    // hooks:
    usesThemable,
}                           from '@reusable-ui/themable'        // color options of UI



// hooks:

// variants:

//#region mildable
export interface MildableVars {
    /**
     * functional background color - at mild variant.
     */
    backgFn    : any
    /**
     * toggles_on background color - at mild variant.
     */
    backgTg    : any
    /**
     * functional alternate background color - at mild variant.
     */
    altBackgFn : any
    /**
     * toggles_on alternate background color - at mild variant.
     */
    altBackgTg : any
    
    
    
    /**
     * functional foreground color - at mild variant.
     */
    foregFn    : any
    /**
     * toggles_on foreground color - at mild variant.
     */
    foregTg    : any
    /**
     * functional alternate foreground color - at mild variant.
     */
    altForegFn : any
    /**
     * toggles_on alternate foreground color - at mild variant.
     */
    altForegTg : any
}
const [mildableVars] = cssVar<MildableVars>();



// by design: grandpa's `.mild` does not affect current `.mild`
// parent not `.mild` -and- current not `.mild`:
export const ifNotMild = (styles: CssStyleCollection): CssRule => rule(':not(.mild)&:where(:not(.mild))', styles);
// parent is  `.mild` -or-  current is  `.mild`:
export const ifMild    = (styles: CssStyleCollection): CssRule => rule(':is(.mild&, &.mild)'            , styles);



export interface MildableRules { mildableRule: Factory<CssRule>, mildableVars: MildableVars }
export interface MildableConfig {
    defaultBackg    ?: CssCustomRef
    defaultForeg    ?: CssCustomRef
    defaultAltBackg ?: CssCustomRef
    defaultAltForeg ?: CssCustomRef
}
/**
 * Uses a toggleable mildification.  
 * @param config  A configuration of `mildableRule`.
 * @param factory A callback to create a mildification rules for each toggle state.
 * @returns A `MildableRules` represents the mildification rules for each toggle state.
 */
export const usesMildable = (config?: MildableConfig, factory : ((toggle: boolean|null) => CssStyleCollection) = mildOf): MildableRules => {
    // dependencies:
    const {themableRule, themableVars} = usesThemable();
    
    
    
    return {
        mildableRule: () => style({
            ...imports([
                // makes   `usesMildable()` implicitly `usesThemable()`
                // because `usesMildable()` requires   `usesThemable()` to work correctly, otherwise it uses the parent themes (that's not intented)
                themableRule,
            ]),
            ...vars({
                [mildableVars.backgFn   ] : fallbacks(
                    themableVars.backgMildImpt,    // first  priority
                    themableVars.backgMild,        // second priority
                    themableVars.backgMildCond,    // third  priority
                    
                    ...(config?.defaultBackg ? [config.defaultBackg] : []),       // default => uses config's background
                ),
                
                [mildableVars.foregFn   ] : fallbacks(
                    themableVars.foregMildImpt,    // first  priority
                    themableVars.foregMild,        // second priority
                    themableVars.foregMildCond,    // third  priority
                    
                    ...(config?.defaultForeg ? [config.defaultForeg] : []),       // default => uses config's foreground
                ),
                
                
                
                [mildableVars.altBackgFn] : fallbacks(
                    themableVars.altBackgMildImpt, // first  priority
                    themableVars.altBackgMild,     // second priority
                    themableVars.altBackgMildCond, // third  priority
                    
                    ...(config?.defaultAltBackg ? [config.defaultAltBackg] : []), // default => uses config's alternate background
                ),
                
                [mildableVars.altForegFn] : fallbacks(
                    themableVars.altForegMildImpt, // first  priority
                    themableVars.altForegMild,     // second priority
                    themableVars.altForegMildCond, // third  priority
                    
                    ...(config?.defaultAltForeg ? [config.defaultAltForeg] : []), // default => uses config's alternate foreground
                ),
            }),
            ...variants([
                ifNotMild(factory(false)),
                ifMild(factory(true)),
            ]),
        }),
        mildableVars,
    };
};

/**
 * Creates a mildification rules for the given `toggle` state.
 * @param toggle `true` to activate the mildification -or- `false` to deactivate -or- `null` for undefining the mildification.
 * @returns A `CssRule` represents a mildification rules for the given `toggle` state.
 */
export const mildOf = (toggle: boolean|null = true): CssRule => style({
    ...vars({
        // *toggle on/off* the mildification prop:
        [mildableVars.backgTg   ] : toggle ? mildableVars.backgFn    : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        [mildableVars.foregTg   ] : toggle ? mildableVars.foregFn    : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        
        [mildableVars.altBackgTg] : toggle ? mildableVars.altBackgFn : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        [mildableVars.altForegTg] : toggle ? mildableVars.altForegFn : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
    }),
});



export interface MildableProps {
    mild ?: boolean
}
export const useMildable = ({mild}: MildableProps) => ({
    class: mild ? 'mild' : null,
});
//#endregion mildable
