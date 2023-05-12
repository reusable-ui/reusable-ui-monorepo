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
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
    switchOf,
    
    
    
    // writes complex stylesheets in simpler way:
    memoizeStyle,
    memoizeStyleWithVariants,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui variants:
import {
    // hooks:
    usesThemeable,
}                           from '@reusable-ui/themeable'       // color options of UI



// defaults:
const _defaultOutlined : Required<OutlineableProps>['outlined'] = 'inherit'



// hooks:

// variants:

//#region outlineable
export type ToggleOutlined = boolean|'inherit'|null
export interface OutlineableVars {
    /**
     * the outlineable preference.
     */
    outlinedPr : any
    /**
     * the outlined switching function.
     */
    outlinedSw : any
    
    
    
    /**
     * conditionally toggled background color layer - at outlined variant.
     */
    noBackgTg  : any
    
    
    
    /**
     * functional background color - at outlined variant.
     */
    backgFn    : any
    /**
     * conditionally toggled background color - at outlined variant.
     */
    backgTg    : any
    /**
     * functional alternate background color - at outlined variant.
     */
    altBackgFn : any
    /**
     * conditionally toggled alternate background color - at outlined variant.
     */
    altBackgTg : any
    
    
    
    /**
     * functional foreground color - at outlined variant.
     */
    foregFn    : any
    /**
     * conditionally toggled foreground color - at outlined variant.
     */
    foregTg    : any
    /**
     * functional alternate foreground color - at outlined variant.
     */
    altForegFn : any
    /**
     * conditionally toggled alternate foreground color - at outlined variant.
     */
    altForegTg : any
}
const [outlineableVars] = cssVars<OutlineableVars>({ prefix: 'ol', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



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
const createOutlineableRule = (config?: OutlineableConfig, outlinedDefinition : null|((toggle: ToggleOutlined) => CssStyleCollection) = defineOutlined): CssRule => {
    // dependencies:
    const {themeableRule, themeableVars} = usesThemeable();
    
    
    
    return style({
        // makes   `usesOutlineable()` implicitly `usesThemeable()`
        // because `usesOutlineable()` requires   `usesThemeable()` to work correctly, otherwise it uses the parent themes (that's not intented)
        ...themeableRule(),
        
        
        
        // configs:
        ...vars({
            /*
                supports for `usesColorable()`:
                only reset `outlineableVars.outlinedSw = outlineableVars.outlinedPr` if `outlinedDefinition` provided,
                so the *modified* `outlineableVars.outlinedSw` by `setOutlined()` still *preserved*,
                thus the `usesColorable()` can see the <parent>'s actual [outlined] status.
            */
            [outlineableVars.outlinedSw] : (outlinedDefinition || undefined) && outlineableVars.outlinedPr,
        }),
        
        
        
        // color functions:
        ...vars({
            // adaptive color functions:
            
         // [outlineableVars.backgFn   ] : 'transparent', // set background to transparent, regardless of the theme colors
            /*
                copied from [mildable],
                for supporting <icon> having mild color (copied from [mildable] background).
                
                when [outlined], the background color definition is not gone,
                just not be included to background layers.
            */
            [outlineableVars.backgFn   ] : switchOf(
                themeableVars.backgMildCond,        // first  priority
                themeableVars.backgMild,            // second priority
                
                config?.backg,                      // default => uses config's background
            ),
            
            [outlineableVars.foregFn   ] : switchOf(
                themeableVars.foregOutlinedCond,    // first  priority
                themeableVars.foregOutlined,        // second priority
                
                config?.foreg,                      // default => uses config's foreground
            ),
            
            
            
            [outlineableVars.altBackgFn] : switchOf(
                themeableVars.altBackgOutlinedCond, // first  priority
                themeableVars.altBackgOutlined,     // second priority
                
                config?.altBackg,                   // default => uses config's alternate background
            ),
            
            [outlineableVars.altForegFn] : switchOf(
                themeableVars.altForegOutlinedCond, // first  priority
                themeableVars.altForegOutlined,     // second priority
                
                config?.altForeg,                   // default => uses config's alternate foreground
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
        }),
        
        
        
        // toggling conditions:
        ...variants([
            outlinedDefinition && ifOutlined(outlinedDefinition(true)),
            outlinedDefinition && ifNotOutlined(outlinedDefinition(false)),
            outlinedDefinition && ifInheritOutlined(outlinedDefinition('inherit')),
        ]),
    });
};
const getDefaultOutlineableRule = memoizeStyle(() => createOutlineableRule());
/**
 * Uses a toggleable outlining.  
 * @param config  A configuration of `outlineableRule`.
 * @param outlinedDefinition A callback to create an outlining rules for each toggle state.
 * @returns An `OutlineableStuff` represents the outlining rules for each toggle state.
 */
export const usesOutlineable = (config?: OutlineableConfig, outlinedDefinition : null|((toggle: ToggleOutlined) => CssStyleCollection) = defineOutlined): OutlineableStuff => {
    return {
        outlineableRule: (
            ((config === undefined) && (outlinedDefinition === defineOutlined))
            ?
            getDefaultOutlineableRule
            :
            () => createOutlineableRule(config, outlinedDefinition)
        ),
        outlineableVars,
    };
};

/**
 * Defines an outlining preference rules for the given `toggle` state.
 * @param toggle `true` to activate the outlining -or- `false` to deactivate -or- `'inherit'` to inherit the outlining from its ancestor -or- `null` to remove previously declared `defineOutlined`.
 * @returns A `CssRule` represents an outlining rules for the given `toggle` state.
 */
export const defineOutlined = memoizeStyleWithVariants((toggle: ToggleOutlined): CssRule => {
    return style({
        ...vars({
            /*
                *switch on/off/inherit* the `**Tg` prop.
                toggle:
                    true    => empty string      => do not alter the `**Tg`'s value => activates   `**Tg` variable.
                    false   => initial (invalid) => destroy      the `**Tg`'s value => deactivates `**Tg` variable.
                    inherit => inherit           => follows      the <ancestor> decision.
                    null    => null              => remove the prev declaration
            */
            [outlineableVars.outlinedPr] : (typeof(toggle) === 'boolean') ? (toggle ? '' : 'initial') : toggle,
        }),
    });
});
/**
 * Sets the current outlining state by the given `toggle` state.
 * @param toggle `true` to activate the outlining -or- `false` to deactivate -or- `'inherit'` to inherit the outlining from its ancestor -or- `null` to remove previously declared `setOutlined`.
 * @returns A `CssRule` represents an outlining rules for the given `toggle` state.
 */
export const setOutlined = (toggle: ToggleOutlined): CssRule => style({
    ...vars({
        /*
            *switch on/off/inherit* the `**Tg` prop.
            toggle:
                true    => empty string      => do not alter the `**Tg`'s value => activates   `**Tg` variable.
                false   => initial (invalid) => destroy      the `**Tg`'s value => deactivates `**Tg` variable.
                inherit => inherit           => follows      the <ancestor> decision.
                null    => null              => remove the prev declaration
        */
        [outlineableVars.outlinedSw] : (typeof(toggle) === 'boolean') ? (toggle ? '' : 'initial') : toggle,
    }),
});



export interface OutlineableProps {
    // variants:
    outlined ?: boolean|'inherit'
}
export const useOutlineable = ({outlined = _defaultOutlined}: OutlineableProps) => ({
    class: (outlined === 'inherit') ? null : (outlined ? 'outlined' : 'not-outlined'),
});
//#endregion outlineable
