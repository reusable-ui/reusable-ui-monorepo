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

//#region outlineable
export interface OutlineableVars {
    /**
     * the outlined switching function.
     */
    outlinedSw     : any
    
    
    
    /**
     * conditionally toggled background color layer - at outlined variant.
     */
    noBackgTg      : any
    
    
    
    /**
     * functional background color - at outlined variant.
     */
    backgFn        : any
    /**
     * conditionally toggled background color - at outlined variant.
     */
    backgTg        : any
    /**
     * functional alternate background color - at outlined variant.
     */
    altBackgFn     : any
    /**
     * conditionally toggled alternate background color - at outlined variant.
     */
    altBackgTg     : any
    
    
    
    /**
     * functional foreground color - at outlined variant.
     */
    foregFn        : any
    /**
     * conditionally toggled foreground color - at outlined variant.
     */
    foregTg        : any
    /**
     * functional alternate foreground color - at outlined variant.
     */
    altForegFn     : any
    /**
     * conditionally toggled alternate foreground color - at outlined variant.
     */
    altForegTg     : any
    
    
    
    // supports for iconColor:
    /**
     * conditionally toggled conditional background color - at outlined variant.
     */
    backgCondTg    : any
    /**
     * conditionally toggled conditional alternate background color - at outlined variant.
     */
    altBackgCondTg : any
}
const [outlineableVars] = cssVars<OutlineableVars>();



// parent is     `.outlined` -or- current is     `.outlined`:
export const ifOutlined        = (styles: CssStyleCollection): CssRule => rule(              ':is(.outlined&, &.outlined)'                                 , styles); // specificityWeight = 1 + (parent's specificityWeight)
// parent is `.not-outlined` -or- current is `.not-outlined`:
export const ifNotOutlined     = (styles: CssStyleCollection): CssRule => rule(              ':is(.not-outlined&, &.not-outlined)'                         , styles); // specificityWeight = 1 + (parent's specificityWeight)
export const ifInheritOutlined = (styles: CssStyleCollection): CssRule => rule(':where(&):not(:is(.outlined&, &.outlined, .not-outlined&, &.not-outlined))', styles); // specificityWeight = 1 + (parent's specificityWeight)



export interface OutlineableStuff { outlineableRule: Factory<CssRule>, outlineableVars: CssVars<OutlineableVars> }
export interface OutlineableConfig {
    backg    ?: CssKnownProps['backgroundColor']
    foreg    ?: CssKnownProps['foreground'     ]
    altBackg ?: CssKnownProps['backgroundColor']
    altForeg ?: CssKnownProps['foreground'     ]
}
/**
 * Uses a toggleable outlining.  
 * @param config  A configuration of `outlineableRule`.
 * @param factory A callback to create an outlining rules for each toggle state.
 * @returns An `OutlineableStuff` represents the outlining rules for each toggle state.
 */
export const usesOutlineable = (config?: OutlineableConfig, factory : ((toggle: boolean|'inherit') => CssStyleCollection) = outlinedOf): OutlineableStuff => {
    // dependencies:
    const {themableRule, themableVars} = usesThemable();
    
    
    
    return {
        outlineableRule: () => style({
            ...imports([
                // makes   `usesOutlineable()` implicitly `usesThemable()`
                // because `usesOutlineable()` requires   `usesThemable()` to work correctly, otherwise it uses the parent themes (that's not intented)
                themableRule,
            ]),
            
            
            
            // color functions:
            ...vars({
                // conditional color functions:
                
             // [outlineableVars.backgFn   ] : 'transparent', // set background to transparent, regardless of the theme colors
                /*
                    copied from [mildable],
                    for supporting <icon> having mild color (copied from [mildable] background).
                    
                    when [outlined], the background color definition is not gone,
                    just not be included to background layers.
                */
                [outlineableVars.backgFn   ] : switchOf(
                    themableVars.backgMildCond,    // first  priority
                    themableVars.backgMild,        // second priority
                    
                    config?.backg,                 // default => uses config's background
                ),
                
                [outlineableVars.foregFn   ] : switchOf(
                    themableVars.foregOutlinedCond,    // first  priority
                    themableVars.foregOutlined,        // second priority
                    
                    config?.foreg,                     // default => uses config's foreground
                ),
                
                
                
                [outlineableVars.altBackgFn] : switchOf(
                    themableVars.altBackgOutlinedCond, // first  priority
                    themableVars.altBackgOutlined,     // second priority
                    
                    config?.altBackg,                  // default => uses config's alternate background
                ),
                
                [outlineableVars.altForegFn] : switchOf(
                    themableVars.altForegOutlinedCond, // first  priority
                    themableVars.altForegOutlined,     // second priority
                    
                    config?.altForeg,                  // default => uses config's alternate foreground
                ),
            }),
            
            
            
            // toggling functions:
            ...vars({
                [outlineableVars.noBackgTg] : [[
                    outlineableVars.outlinedSw, // the outlined switching function
                    'transparent',              // the no background color definition
                ]],
                
                [outlineableVars.backgTg] : [[
                    outlineableVars.outlinedSw, // the outlined switching function
                    outlineableVars.backgFn,    // the outlined background color definition
                ]],
                [outlineableVars.foregTg] : [[
                    outlineableVars.outlinedSw, // the outlined switching function
                    outlineableVars.foregFn,    // the outlined foreground color definition
                ]],
                
                [outlineableVars.altBackgTg] : [[
                    outlineableVars.outlinedSw, // the outlined switching function
                    outlineableVars.altBackgFn, // the outlined alternate background color definition
                ]],
                [outlineableVars.altForegTg] : [[
                    outlineableVars.outlinedSw, // the outlined switching function
                    outlineableVars.altForegFn, // the outlined alternate foreground color definition
                ]],
                
                // supports for iconColor:
                [outlineableVars.backgCondTg] : [[
                    outlineableVars.outlinedSw,        // the outlined switching function
                    themableVars.backgMildCond,        // the background color definition - at mild variant
                ]],
                [outlineableVars.altBackgCondTg] : [[
                    outlineableVars.outlinedSw,        // the outlined switching function
                    themableVars.altBackgOutlinedCond, // the alternate background color definition - at mild variant
                ]],
            }),
            
            
            
            // toggling conditions:
            ...variants([
                ifOutlined(factory(true)),
                ifNotOutlined(factory(false)),
                ifInheritOutlined(factory('inherit')),
            ]),
        }),
        outlineableVars,
    };
};

/**
 * Creates an outlining rules for the given `toggle` state.
 * @param toggle `true` to activate the outlining -or- `false` to deactivate -or- `'inherit'` to inherit the outlining from its ancestor.
 * @returns A `CssRule` represents an outlining rules for the given `toggle` state.
 */
export const outlinedOf = (toggle: boolean|'inherit'): CssRule => style({
    ...vars({
        /*
            *switch on/off/inherit* the `**Tg` prop.
            toggle:
                true    => empty string      => do not alter the `**Tg`'s value => activates   `**Tg` variable.
                false   => initial (invalid) => destroy      the `**Tg`'s value => deactivates `**Tg` variable.
                inherit => inherit           => follows      the <ancestor> decision.
        */
        [outlineableVars.outlinedSw] : (toggle === 'inherit') ? 'inherit' : (toggle ? '' : 'initial'),
    }),
});



export interface OutlineableProps {
    // variants:
    outlined ?: boolean
}
export const useOutlineable = ({outlined}: OutlineableProps) => ({
    class: outlined ? 'outlined' : null,
});
//#endregion outlineable
