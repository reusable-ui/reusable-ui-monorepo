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
     * toggles_on background color layer - at outlined variant.
     */
    noBackgTg      : any
    
    
    
    /**
     * functional background color - at outlined variant.
     */
    backgFn        : any
    /**
     * toggles_on background color - at outlined variant.
     */
    backgTg        : any
    /**
     * functional alternate background color - at outlined variant.
     */
    altBackgFn     : any
    /**
     * toggles_on alternate background color - at outlined variant.
     */
    altBackgTg     : any
    
    
    
    /**
     * functional foreground color - at outlined variant.
     */
    foregFn        : any
    /**
     * toggles_on foreground color - at outlined variant.
     */
    foregTg        : any
    /**
     * functional alternate foreground color - at outlined variant.
     */
    altForegFn     : any
    /**
     * toggles_on alternate foreground color - at outlined variant.
     */
    altForegTg     : any
    
    
    
    // supports for iconColor:
    /**
     * toggles_on conditionally background color - at outlined variant.
     */
    backgCondTg    : any
    /**
     * toggles_on conditionally alternate background color - at outlined variant.
     */
    altBackgCondTg : any
}
const [outlineableVars] = cssVars<OutlineableVars>();



// ancestor(s) not `.outlined` -and- parent not `.outlined` -and- current not `.outlined`:
export const ifNotOutlined = (styles: CssStyleCollection): CssRule => rule('&:not(:is(.outlined &, .outlined&, &.outlined))', styles);
// ancestor(s) is  `.outlined` -or-  parent is  `.outlined` -or-  current is  `.outlined`:
export const ifOutlined    = (styles: CssStyleCollection): CssRule => rule(      ':is(.outlined &, .outlined&, &.outlined)' , styles);



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
export const usesOutlineable = (config?: OutlineableConfig, factory : ((toggle: boolean|null) => CssStyleCollection) = outlinedOf): OutlineableStuff => {
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
export const outlinedOf = (toggle: boolean|null = true): CssRule => {
    // dependencies:
    const {themableVars} = usesThemable();
    
    
    
    return style({
        ...vars({
            // *toggle on/off* the outlining prop:
            [outlineableVars.noBackgTg     ] : toggle ? 'transparent'                     : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
            
            [outlineableVars.backgTg       ] : toggle ? outlineableVars.backgFn           : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
            [outlineableVars.foregTg       ] : toggle ? outlineableVars.foregFn           : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
            
            [outlineableVars.altBackgTg    ] : toggle ? outlineableVars.altBackgFn        : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
            [outlineableVars.altForegTg    ] : toggle ? outlineableVars.altForegFn        : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
            
            // supports for iconColor:
            [outlineableVars.backgCondTg   ] : toggle ? themableVars.backgMildCond        : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
            [outlineableVars.altBackgCondTg] : toggle ? themableVars.altBackgOutlinedCond : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        }),
    });
};



export interface OutlineableProps {
    // variants:
    outlined ?: boolean
}
export const useOutlineable = ({outlined}: OutlineableProps) => ({
    class: outlined ? 'outlined' : null,
});
//#endregion outlineable
