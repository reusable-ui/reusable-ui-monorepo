// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'                 // cssfn general types
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
    variants,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // utilities:
    CssVars,
    cssVars,
    switchOf,
}                           from '@cssfn/css-vars'              // strongly typed of css variables

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
const [mildableVars] = cssVars<MildableVars>();



// by design: grandpa's `.mild` does not affect current `.mild`
// parent not `.mild` -and- current not `.mild`:
export const ifNotMild = (styles: CssStyleCollection): CssRule => rule(':not(.mild)&:where(:not(.mild))', styles);
// parent is  `.mild` -or-  current is  `.mild`:
export const ifMild    = (styles: CssStyleCollection): CssRule => rule(':is(.mild&, &.mild)'            , styles);



export interface MildableStuff { mildableRule: Factory<CssRule>, mildableVars: CssVars<MildableVars> }
export interface MildableConfig {
    backg    ?: CssKnownProps['backgroundColor']
    foreg    ?: CssKnownProps['foreground'     ]
    altBackg ?: CssKnownProps['backgroundColor']
    altForeg ?: CssKnownProps['foreground'     ]
}
/**
 * Uses a toggleable mildification.  
 * @param config  A configuration of `mildableRule`.
 * @param factory A callback to create a mildification rules for each toggle state.
 * @returns A `MildableStuff` represents the mildification rules for each toggle state.
 */
export const usesMildable = (config?: MildableConfig, factory : ((toggle: boolean|null) => CssStyleCollection) = mildOf): MildableStuff => {
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
                [mildableVars.backgFn   ] : switchOf(
                    themableVars.backgMildImpt,    // first  priority
                    themableVars.backgMild,        // second priority
                    
                    config?.backg,                 // default => uses config's background
                ),
                
                [mildableVars.foregFn   ] : switchOf(
                    themableVars.foregMildImpt,    // first  priority
                    themableVars.foregMild,        // second priority
                    
                    config?.foreg,                 // default => uses config's foreground
                ),
                
                
                
                [mildableVars.altBackgFn] : switchOf(
                    themableVars.altBackgMildImpt, // first  priority
                    themableVars.altBackgMild,     // second priority
                    
                    config?.altBackg,              // default => uses config's alternate background
                ),
                
                [mildableVars.altForegFn] : switchOf(
                    themableVars.altForegMildImpt, // first  priority
                    themableVars.altForegMild,     // second priority
                    
                    config?.altForeg,              // default => uses config's alternate foreground
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
    // variants:
    mild ?: boolean
}
export const useMildable = ({mild}: MildableProps) => ({
    class: mild ? 'mild' : null,
});
//#endregion mildable
