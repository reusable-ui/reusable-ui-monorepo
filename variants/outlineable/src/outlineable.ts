// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'                 // cssfn general types
import type {
    // css custom properties:
    CssCustomRef,
    
    
    
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
    fallbacks,
}                           from '@cssfn/css-vars'              // strongly typed of css variables

// reusable-ui variants:
import {
    // hooks:
    usesThemable,
}                           from '@reusable-ui/themable'        // color options of UI



// hooks:

// variants:

//#region outlineable
export interface OutlineableVars {
    /**
     * functional background color - at outlined variant.
     */
    backgFn    : any
    /**
     * toggles_on background color - at outlined variant.
     */
    backgTg    : any
    /**
     * functional alternate background color - at outlined variant.
     */
    altBackgFn : any
    /**
     * toggles_on alternate background color - at outlined variant.
     */
    altBackgTg : any
    
    
    
    /**
     * functional foreground color - at outlined variant.
     */
    foregFn    : any
    /**
     * toggles_on foreground color - at outlined variant.
     */
    foregTg    : any
    /**
     * functional alternate foreground color - at outlined variant.
     */
    altForegFn : any
    /**
     * toggles_on alternate foreground color - at outlined variant.
     */
    altForegTg : any
}
const [outlineableVars] = cssVars<OutlineableVars>();



// grandpa not `.outlined` -and- parent not `.outlined` -and- current not `.outlined`:
export const ifNotOutlined = (styles: CssStyleCollection): CssRule => rule(':not(.outlined) :where(:not(.outlined)&:not(.outlined))', styles);
// grandpa is  `.outlined` -or-  parent is  `.outlined` -or-  current is  `.outlined`:
export const ifOutlined    = (styles: CssStyleCollection): CssRule => rule(':is(.outlined &, .outlined&, &.outlined)'               , styles);



export interface OutlineableRules { outlineableRule: Factory<CssRule>, outlineableVars: CssVars<OutlineableVars> }
export interface OutlineableConfig {
    defaultForeg    ?: CssCustomRef
    defaultAltBackg ?: CssCustomRef
    defaultAltForeg ?: CssCustomRef
}
/**
 * Uses a toggleable outlining.  
 * @param config  A configuration of `outlineableRule`.
 * @param factory A callback to create an outlining rules for each toggle state.
 * @returns An `OutlineableRules` represents the outlining rules for each toggle state.
 */
export const usesOutlineable = (config?: OutlineableConfig, factory : ((toggle: boolean|null) => CssStyleCollection) = outlinedOf): OutlineableRules => {
    // dependencies:
    const {themableRule, themableVars} = usesThemable();
    
    
    
    return {
        outlineableRule: () => style({
            ...imports([
                // makes   `usesOutlineable()` implicitly `usesThemable()`
                // because `usesOutlineable()` requires   `usesThemable()` to work correctly, otherwise it uses the parent themes (that's not intented)
                themableRule,
            ]),
            ...vars({
                [outlineableVars.backgFn   ] : 'transparent', // set background to transparent, regardless of the theme colors
                
                [outlineableVars.foregFn   ] : fallbacks(
                    themableVars.foregOutlinedImpt,    // first  priority
                    themableVars.foregOutlined,        // second priority
                    themableVars.foregOutlinedCond,    // third  priority
                    
                    config?.defaultForeg,              // default => uses config's foreground
                ),
                
                
                
                [outlineableVars.altBackgFn] : fallbacks(
                    themableVars.altBackgOutlinedImpt, // first  priority
                    themableVars.altBackgOutlined,     // second priority
                    themableVars.altBackgOutlinedCond, // third  priority
                    
                    config?.defaultAltBackg,           // default => uses config's alternate background
                ),
                
                [outlineableVars.altForegFn] : fallbacks(
                    themableVars.altForegOutlinedImpt, // first  priority
                    themableVars.altForegOutlined,     // second priority
                    themableVars.altForegOutlinedCond, // third  priority
                    
                    config?.defaultAltForeg,           // default => uses config's alternate foreground
                ),
            }),
            ...variants([
                ifNotOutlined(factory(false)),
                ifOutlined(factory(true)),
            ]),
        }),
        outlineableVars,
    };
};

/**
 * Creates an outlining rules for the given `toggle` state.
 * @param toggle `true` to activate the outlining -or- `false` to deactivate -or- `null` for undefining the outlining.
 * @returns A `CssRule` represents an outlining rules for the given `toggle` state.
 */
export const outlinedOf = (toggle: boolean|null = true): CssRule => style({
    ...vars({
        // *toggle on/off* the outlining prop:
        [outlineableVars.backgTg   ] : toggle ? outlineableVars.backgFn    : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        [outlineableVars.foregTg   ] : toggle ? outlineableVars.foregFn    : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        
        [outlineableVars.altBackgTg] : toggle ? outlineableVars.altBackgFn : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        [outlineableVars.altForegTg] : toggle ? outlineableVars.altForegFn : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
    }),
});



export interface OutlineableProps {
    outlined ?: boolean
}
export const useOutlineable = ({outlined}: OutlineableProps) => ({
    class: outlined ? 'outlined' : null,
});
//#endregion outlineable
