// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
}                           from 'react'

// cssfn:
import type {
    // css values:
    CssComplexBaseValueOf,
    
    
    
    // css custom properties:
    CssCustomSimpleRef,
    CssCustomRef,
    CssCustomValue,
    
    
    
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
    states,
    keyframes,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // utilities:
    solidBackg,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // types:
    ReadonlyCssCustomRefs,
    
    
    
    // utilities:
    cssVar,
    fallbacks,
}                           from '@cssfn/css-var'               // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // configs:
    colors,
}                           from '@reusable-ui/colors'          // a color management system
import {
    // configs:
    borders as borderStrokes,
    borderRadiuses,
}                           from '@reusable-ui/borders'         // a border (stroke) management system
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'         // a spacer (gap) management system
import {
    // configs:
    typos,
}                           from '@reusable-ui/typos'           // a typography management system
import {
    // hooks:
    useTriggerRender,
    useEvent,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
    ResizableProps,
    useResizable,
}                           from '@reusable-ui/resizable'       // size options of UI
import {
    // hooks:
    ifHasTheme,
    usesThemable,
    ThemableProps,
    useThemable,
}                           from '@reusable-ui/themable'        // color options of UI
import {
    // hooks:
    usesNudible,
    NudibleProps,
    useNudible,
}                           from '@reusable-ui/nudible'         // nude variant of UI

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a base component



// types:
export type FeatureMixin<TCssCustomProps extends {}> = readonly [() => CssRule, ReadonlyCssCustomRefs<TCssCustomProps>]
export type VariantMixin<TCssCustomProps extends {}> = readonly [() => CssRule, ReadonlyCssCustomRefs<TCssCustomProps>]
export type StateMixin  <TCssCustomProps extends {}> = readonly [() => CssRule, ReadonlyCssCustomRefs<TCssCustomProps>]



// hooks:

// colors:

//#region gradient
export interface GradientVars {
    /**
     * toggles_on background gradient - at gradient variant.
     */
    backgGradTg : any
}
const [gradients] = cssVar<GradientVars>();



// grandpa not `.gradient` -and- parent not `.gradient` -and- current not `.gradient`:
export const ifNotGradient = (styles: CssStyleCollection): CssRule => rule(':not(.gradient) :where(:not(.gradient)&:not(.gradient))', styles);
// grandpa is  `.gradient` -or-  parent is  `.gradient` -or-  current is  `.gradient`:
export const ifGradient    = (styles: CssStyleCollection): CssRule => rule(':is(.gradient &, .gradient&, &.gradient)'               , styles);



/**
 * Uses toggleable gradient.
 * @param factory Customize the callback to create gradient definitions for each toggle state.
 * @returns A `VariantMixin<GradientVars>` represents toggleable gradient definitions.
 */
export const usesGradientVariant = (factory : ((toggle?: (boolean|null)) => CssStyleCollection) = gradientOf): VariantMixin<GradientVars> => {
    return [
        () => style({
            ...variants([
                ifNotGradient(factory(false)),
                ifGradient(factory(true)),
            ]),
        }),
        gradients,
    ];
};

/**
 * Creates gradient definitions for the given `toggle`.
 * @param toggle `true` to activate the gradient -or- `false` to deactivate -or- `null` for undefining the gradient.
 * @returns A `CssRule` represents gradient definitions for the given `toggle`.
 */
export const gradientOf = (toggle: (boolean|null) = true): CssRule => style({
    ...vars({
        // *toggle on/off* the background gradient prop:
        [gradients.backgGradTg] : toggle ? basics.backgGrad : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
    }),
});



export interface GradientVariant {
    gradient ?: boolean
}
export const useGradientVariant = ({gradient}: GradientVariant) => ({
    class: gradient ? 'gradient' : null,
});
//#endregion gradient

//#region outlined
export interface OutlinedVars {
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
const [outlineds] = cssVar<OutlinedVars>();



// grandpa not `.outlined` -and- parent not `.outlined` -and- current not `.outlined`:
export const ifNotOutlined = (styles: CssStyleCollection): CssRule => rule(':not(.outlined) :where(:not(.outlined)&:not(.outlined))', styles);
// grandpa is  `.outlined` -or-  parent is  `.outlined` -or-  current is  `.outlined`:
export const ifOutlined    = (styles: CssStyleCollection): CssRule => rule(':is(.outlined &, .outlined&, &.outlined)'               , styles);



/**
 * Uses toggleable outlining.
 * @param factory Customize the callback to create outlining definitions for each toggle state.
 * @returns A `VariantMixin<OutlinedVars>` represents toggleable outlining definitions.
 */
export const usesOutlinedVariant = (factory : ((toggle?: (boolean|null)) => CssStyleCollection) = outlinedOf): VariantMixin<OutlinedVars> => {
    // dependencies:
    const {themableRule, themableVars} = usesThemable();
    
    
    
    return [
        () => style({
            ...imports([
                // makes   `usesOutlinedVariant()` implicitly `usesThemable()`
                // because `usesOutlinedVariant()` requires   `usesThemable()` to work correctly, otherwise it uses the parent themes (that's not intented)
                themableRule,
            ]),
            ...vars({
                [outlineds.backgFn   ] : 'transparent', // set background to transparent, regardless of the theme colors
                
                [outlineds.foregFn   ] : fallbacks(
                    themableVars.foregOutlinedImpt,    // first  priority
                    themableVars.foregOutlined,        // second priority
                    themableVars.foregOutlinedCond,    // third  priority
                    
                    basics.foreg,                      // default => uses config's foreground
                ),
                
                
                
                [outlineds.altBackgFn] : fallbacks(
                    themableVars.altBackgOutlinedImpt, // first  priority
                    themableVars.altBackgOutlined,     // second priority
                    themableVars.altBackgOutlinedCond, // third  priority
                    
                    colors.primary,                    // default => uses primary text theme
                ),
                
                [outlineds.altForegFn] : fallbacks(
                    themableVars.altForegOutlinedImpt, // first  priority
                    themableVars.altForegOutlined,     // second priority
                    themableVars.altForegOutlinedCond, // third  priority
                    
                    colors.primaryText,                // default => uses primary text theme
                ),
            }),
            ...variants([
                ifNotOutlined(factory(false)),
                ifOutlined(factory(true)),
            ]),
        }),
        outlineds,
    ];
};

/**
 * Creates outlining definitions for the given `toggle`.
 * @param toggle `true` to activate the outlining -or- `false` to deactivate -or- `null` for undefining the outlining.
 * @returns A `CssRule` represents outlining definitions for the given `toggle`.
 */
export const outlinedOf = (toggle: (boolean|null) = true): CssRule => style({
    ...vars({
        // *toggle on/off* the outlined props:
        [outlineds.backgTg   ] : toggle ? outlineds.backgFn    : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        [outlineds.foregTg   ] : toggle ? outlineds.foregFn    : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        
        [outlineds.altBackgTg] : toggle ? outlineds.altBackgFn : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        [outlineds.altForegTg] : toggle ? outlineds.altForegFn : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
    }),
});



export interface OutlinedVariant {
    outlined ?: boolean
}
export const useOutlinedVariant = ({outlined}: OutlinedVariant) => ({
    class: outlined ? 'outlined' : null,
});
//#endregion outlined

//#region mild
export interface MildVars {
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
const [milds] = cssVar<MildVars>();



// by design: grandpa's `.mild` does not affect current `.mild`
// parent not `.mild` -and- current not `.mild`:
export const ifNotMild = (styles: CssStyleCollection): CssRule => rule(':not(.mild)&:where(:not(.mild))', styles);
// parent is  `.mild` -or-  current is  `.mild`:
export const ifMild    = (styles: CssStyleCollection): CssRule => rule(':is(.mild&, &.mild)'            , styles);



/**
 * Uses toggleable mildification.
 * @param factory Customize the callback to create mildification definitions for each toggle state.
 * @returns A `VariantMixin<MildVars>` represents toggleable mildification definitions.
 */
export const usesMildVariant = (factory : ((toggle?: (boolean|null)) => CssStyleCollection) = mildOf): VariantMixin<MildVars> => {
    // dependencies:
    const {themableRule, themableVars} = usesThemable();
    
    
    
    return [
        () => style({
            ...imports([
                // makes   `usesMildVariant()` implicitly `usesThemable()`
                // because `usesMildVariant()` requires   `usesThemable()` to work correctly, otherwise it uses the parent themes (that's not intented)
                themableRule,
            ]),
            ...vars({
                [milds.backgFn   ] : fallbacks(
                    themableVars.backgMildImpt,    // first  priority
                    themableVars.backgMild,        // second priority
                    themableVars.backgMildCond,    // third  priority
                    
                    basics.backg,                  // default => uses config's background
                ),
                
                [milds.foregFn   ] : fallbacks(
                    themableVars.foregMildImpt,    // first  priority
                    themableVars.foregMild,        // second priority
                    themableVars.foregMildCond,    // third  priority
                    
                    basics.foreg,                  // default => uses config's foreground
                ),
                
                
                
                [milds.altBackgFn] : fallbacks(
                    themableVars.altBackgMildImpt, // first  priority
                    themableVars.altBackgMild,     // second priority
                    themableVars.altBackgMildCond, // third  priority
                    
                    colors.primary,                // default => uses primary text theme
                ),
                
                [milds.altForegFn] : fallbacks(
                    themableVars.altForegMildImpt, // first  priority
                    themableVars.altForegMild,     // second priority
                    themableVars.altForegMildCond, // third  priority
                    
                    colors.primaryText,            // default => uses primary text theme
                ),
            }),
            ...variants([
                ifNotMild(factory(false)),
                ifMild(factory(true)),
            ]),
        }),
        milds,
    ];
};

/**
 * Creates mildification definitions for the given `toggle`.
 * @param toggle `true` to activate the mildification -or- `false` to deactivate -or- `null` for undefining the mildification.
 * @returns A `CssRule` represents mildification definitions for the given `toggle`.
 */
export const mildOf = (toggle: (boolean|null) = true): CssRule => style({
    ...vars({
        // *toggle on/off* the mildification props:
        [milds.backgTg   ] : toggle ? milds.backgFn    : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        [milds.foregTg   ] : toggle ? milds.foregFn    : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        
        [milds.altBackgTg] : toggle ? milds.altBackgFn : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        [milds.altForegTg] : toggle ? milds.altForegFn : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
    }),
});



export interface MildVariant {
    mild ?: boolean
}
export const useMildVariant = ({mild}: MildVariant) => ({
    class: mild ? 'mild' : null,
});
//#endregion mild

//#region backg
export interface BackgVars {
    /**
     * none background.
     */
    backgNone       : any
    
    
    
    /**
     * functional background color.
     */
    backgColorFn    : any
    /**
     * final background color.
     */
    backgColor      : any
    /**
     * functional alternate background color.
     */
    altBackgColorFn : any
    /**
     * final alternate background color.
     */
    altBackgColor   : any
    
    
    
    /**
     * final background layers.
     */
    backg           : any
}
const [backgs] = cssVar<BackgVars>();

/**
 * Uses background layer(s).
 * @returns A `FeatureMixin<BackgVars>` represents background layer(s) definitions.
 */
export const usesBackg = (): FeatureMixin<BackgVars> => {
    // dependencies:
    const {themableVars} = usesThemable();
    const [, gradients ] = usesGradientVariant();
    const [, outlineds ] = usesOutlinedVariant();
    const [, milds     ] = usesMildVariant();
    
    
    
    return [
        () => style({
            // constants:
            ...vars({
                [backgs.backgNone      ] : solidBackg('transparent'),
            }),
            
            
            
            // color functions:
            ...vars({
                [backgs.backgColorFn   ] : 'inherit', // inherit to parent theme
                [backgs.altBackgColorFn] : 'inherit', // inherit to parent theme
            }),
            ...ifHasTheme({ // only declare the function below if the <Component> has a dedicated theme:
                ...vars({
                    [backgs.backgColorFn   ] : fallbacks(
                        themableVars.backgImpt,       // first  priority
                        themableVars.backg,           // second priority
                        themableVars.backgCond,       // third  priority
                        
                        basics.backg,                 // default => uses config's background
                    ),
                    [backgs.altBackgColorFn] : fallbacks(
                        themableVars.altBackgImpt,    // first  priority
                        themableVars.altBackg,        // second priority
                        themableVars.altBackgCond,    // third  priority
                        
                        colors.primary,               // default => uses primary text theme
                    ),
                }),
            }),
            ...vars({ // always re-declare the final function below, so the [outlined] and/or [mild] can be toggled_on
                [backgs.backgColor     ] : fallbacks(
                    outlineds.backgTg,      // toggle outlined (if `usesOutlinedVariant()` applied)
                    milds.backgTg,          // toggle mild     (if `usesMildVariant()` applied)
                    
                    backgs.backgColorFn,    // default => uses our `backgColorFn`
                ),
                [backgs.altBackgColor  ] : fallbacks(
                    outlineds.altBackgTg,   // toggle outlined (if `usesOutlinedVariant()` applied)
                    milds.altBackgTg,       // toggle mild     (if `usesMildVariant()` applied)
                    
                    backgs.altBackgColorFn, // default => uses our `backgColorFn`
                ),
            }),
            
            
            
            // compositions:
            ...vars({
                [backgs.backg          ] : [
                    // layering: backg1 | backg2 | backg3 ...
                    
                    // top layer:
                    fallbacks(
                        gradients.backgGradTg, // toggle gradient (if `usesGradientVariant()` applied)
                        
                        backgs.backgNone,      // default => no top layer
                    ),
                    
                    // bottom layer:
                    backgs.backgColor,
                ],
            }),
        }),
        backgs,
    ];
};
//#endregion backg

//#region foreg
export interface ForegVars {
    /**
     * functional foreground color.
     */
    foregFn    : any
    /**
     * final foreground color.
     */
    foreg      : any
    /**
     * functional alternate foreground color.
     */
    altForegFn : any
    /**
     * final alternate foreground color.
     */
    altForeg   : any
}
const [foregs] = cssVar<ForegVars>();

/**
 * Uses foreground color (text color).
 * @returns A `FeatureMixin<ForegVars>` represents foreground color definitions.
 */
export const usesForeg = (): FeatureMixin<ForegVars> => {
    // dependencies:
    const {themableVars} = usesThemable();
    const [, outlineds ] = usesOutlinedVariant();
    const [, milds     ] = usesMildVariant();
    
    
    
    return [
        () => style({
            // color functions:
            ...vars({
                [foregs.foregFn   ] : 'inherit', // inherit to parent theme
                [foregs.altForegFn] : 'inherit', // inherit to parent theme
            }),
            ...ifHasTheme({ // only declare the function below if the <Component> has a dedicated theme:
                ...vars({
                    [foregs.foregFn   ] : fallbacks(
                        themableVars.foregImpt,     // first  priority
                        themableVars.foreg,         // second priority
                        themableVars.foregCond,     // third  priority
                        
                        basics.foreg,               // default => uses config's foreground
                    ),
                    [foregs.altForegFn] : fallbacks(
                        themableVars.altForegImpt,  // first  priority
                        themableVars.altForeg,      // second priority
                        themableVars.altForegCond,  // third  priority
                        
                        colors.primaryText,         // default => uses primary text theme
                    ),
                }),
            }),
            ...vars({ // always re-declare the final function below, so the [outlined] and/or [mild] can be toggled_on
                [foregs.foreg     ] : fallbacks(
                    outlineds.foregTg,    // toggle outlined (if `usesOutlinedVariant()` applied)
                    milds.foregTg,        // toggle mild     (if `usesMildVariant()` applied)
                    
                    foregs.foregFn,       // default => uses our `foregFn`
                ),
                [foregs.altForeg  ] : fallbacks(
                    outlineds.altForegTg, // toggle outlined (if `usesOutlinedVariant()` applied)
                    milds.altForegTg,     // toggle mild     (if `usesMildVariant()` applied)
                    
                    foregs.altForegFn,    // default => uses our `foregFn`
                ),
            }),
        }),
        foregs,
    ];
};
//#endregion foreg

//#region border
export interface BorderVars {
    /**
     * functional border color.
     */
    borderColorFn          : any
    /**
     * final border color.
     */
    borderColor            : any
    
    
    
    /**
     * final border mix (style, width, color, etc).
     */
    border                 : any
    /**
     * final border width.
     */
    borderWidth            : any
    
    
    
    /**
     * top start (left) radius.
     */
    borderStartStartRadius : any
    /**
     * top end (right) radius.
     */
    borderStartEndRadius   : any
    /**
     * bottom start (left) radius.
     */
    borderEndStartRadius   : any
    /**
     * bottom end (right) radius.
     */
    borderEndEndRadius     : any
}
const [borders] = cssVar<BorderVars>();



/**
 * Uses border (strokes, colors, radiuses).
 * @returns A `FeatureMixin<BorderVars>` represents border color definitions.
 */
export const usesBorder = (): FeatureMixin<BorderVars> => {
    // dependencies:
    const {themableVars} = usesThemable();
    const [, outlineds ] = usesOutlinedVariant();
    
    
    
    return [
        () => style({
            // color functions:
            ...vars({
                [borders.borderColorFn] : 'inherit', // inherit to parent theme
            }),
            ...ifHasTheme({ // only declare the function below if the <Component> has a dedicated theme:
                ...vars({
                    [borders.borderColorFn] : fallbacks(
                        themableVars.borderImpt,     // first  priority
                        themableVars.border,         // second priority
                        themableVars.borderCond,     // third  priority
                        
                        basics.borderColor,          // default => uses config's border color
                    ),
                }),
            }),
            ...vars({ // always re-declare the final function below, so the [outlined] and/or [mild] can be toggled_on
                [borders.borderColor  ] : fallbacks(
                    outlineds.foregTg,     // toggle outlined (if `usesOutlinedVariant()` applied)
                    
                    borders.borderColorFn, // default => uses our `borderColorFn`
                ),
            }),
            
            
            
            // compositions:
            ...vars({
                [borders.border                ] : basics.border,      // default => uses config's border
                [borders.borderWidth           ] : basics.borderWidth, // default => uses config's border width
                
                
                
                [borders.borderStartStartRadius] : basics.borderRadius, // default => uses config's border radius
                [borders.borderStartEndRadius  ] : basics.borderRadius, // default => uses config's border radius
                [borders.borderEndStartRadius  ] : basics.borderRadius, // default => uses config's border radius
                [borders.borderEndEndRadius    ] : basics.borderRadius, // default => uses config's border radius
            }),
        }),
        borders,
    ];
};



export interface CssBorderProps {
    border       ?: CssCustomSimpleRef
    borderWidth  ?: CssCustomSimpleRef
    borderRadius ?: CssCustomSimpleRef
}
export const extendsBorder = (cssBorderProps?: CssBorderProps): CssRule => {
    // dependencies:
    
    // borders:
    const [, borders] = usesBorder();
    
    
    
    return style({
        // border strokes:
        // cssBorderProps.borderStroke** => ref.borderStroke**
        ...vars({
            [borders.border     ] : cssBorderProps?.border,
            [borders.borderWidth] : cssBorderProps?.borderWidth,
        }),
        border      : borders.border,      // all border properties
        borderColor : borders.borderColor, // overwrite color prop
        borderWidth : borders.borderWidth, // overwrite width prop
        
        
        
        // border radiuses:
        // cssBorderProps.borderRadius** => ref.borderRadius**
        ...vars({
            [borders.borderStartStartRadius] : cssBorderProps?.borderRadius,
            [borders.borderStartEndRadius  ] : cssBorderProps?.borderRadius,
            [borders.borderEndStartRadius  ] : cssBorderProps?.borderRadius,
            [borders.borderEndEndRadius    ] : cssBorderProps?.borderRadius,
        }),
        borderRadius           : null,                           // `null` => delete `borderRadius` prop, `undefined` => preserves `borderRadius` prop
        borderStartStartRadius : borders.borderStartStartRadius, // overwrite radius prop
        borderStartEndRadius   : borders.borderStartEndRadius,   // overwrite radius prop
        borderEndStartRadius   : borders.borderEndStartRadius,   // overwrite radius prop
        borderEndEndRadius     : borders.borderEndEndRadius,     // overwrite radius prop
    });
};
//#endregion border

//#region ring
export interface RingVars {
    /**
     * functional ring color.
     */
    ringFn : any
    /**
     * final ring color.
     */
    ring   : any
}
const [rings] = cssVar<RingVars>();

/**
 * Uses ring color (focus ring color).
 * @returns A `FeatureMixin<RingVars>` represents ring color definitions.
 */
export const usesRing = (): FeatureMixin<RingVars> => {
    // dependencies:
    const {themableVars} = usesThemable();
    
    
    
    return [
        () => style({
            // color functions:
            ...vars({
                [rings.ringFn] : 'inherit', // inherit to parent theme
            }),
            ...ifHasTheme({ // only declare the function below if the <Component> has a dedicated theme:
                ...vars({
                    [rings.ringFn] : fallbacks(
                        themableVars.ringImpt,      // first  priority
                        themableVars.ring,          // second priority
                        themableVars.ringCond,      // third  priority
                        
                        colors.secondaryThin,       // default => uses secondary theme, because its color is neutral
                    ),
                }),
            }),
            ...vars({ // always re-declare the final function below, so the [outlined] and/or [mild] can be toggled_on
                [rings.ring  ] : fallbacks(
                    // no toggle outlined nor toggle mild yet (might be added in the future)
                    
                    rings.ringFn,         // default => uses our `ringFn`
                ),
            }),
        }),
        rings,
    ];
};
//#endregion ring

// spacings:

//#region padding
export interface PaddingVars {
    /**
     * left & right paddings.
     */
    paddingInline : any
    /**
     * top & bottom paddings.
     */
    paddingBlock  : any
}
const [paddings] = cssVar<PaddingVars>();



/**
 * Uses paddings.
 * @returns A `FeatureMixin<PaddingVars>` represents paddings definitions.
 */
export const usesPadding = (): FeatureMixin<PaddingVars> => {
    return [
        () => style({
            ...vars({
                [paddings.paddingInline] : basics.paddingInline, // default => uses config's padding inline
                [paddings.paddingBlock ] : basics.paddingBlock,  // default => uses config's padding block
            }),
        }),
        paddings,
    ];
};

export interface CssPaddingProps {
    paddingInline ?: CssCustomSimpleRef
    paddingBlock  ?: CssCustomSimpleRef
}
export const extendsPadding = (cssProps?: CssPaddingProps): CssRule => {
    // dependencies:
    
    // spacings:
    const [, paddings] = usesPadding();
    
    
    
    return style({
        // spacings:
        // cssProps.padding** => ref.padding**
        ...vars({
            [paddings.paddingInline] : cssProps?.paddingInline,
            [paddings.paddingBlock ] : cssProps?.paddingBlock,
        }),
        padding       : null,                   // `null` => delete `padding` prop, `undefined` => preserves `padding` prop
        paddingInline : paddings.paddingInline, // overwrite padding prop
        paddingBlock  : paddings.paddingBlock,  // overwrite padding prop
    });
};
//#endregion padding


// animations:

//#region animations
export interface AnimVars {
    /**
     * none boxShadow.
     */
    boxShadowNone : any
    /**
     * final boxShadow layers.
     */
    boxShadow     : any
    
    
    
    /**
     * none filter.
     */
    filterNone    : any
    /**
     * final filter.
     */
    filter        : any
    
    
    
    /**
     * none transform.
     */
    transfNone    : any
    
    
    
    /**
     * none animation.
     */
    animNone      : any
    /**
     * final animation.
     */
    anim          : any
}
const [anims] = cssVar<AnimVars>();



const setsBoxShadow = new Set<CssCustomSimpleRef>();
const setsFilter    = new Set<CssCustomSimpleRef>();
const setsAnim      = new Set<CssCustomSimpleRef>();
const animRegistry  = {
    get boxShadows      ():    CssCustomSimpleRef[]      {
        return [
            anims.boxShadowNone, // the boxShadow collection must contain at least 1 of *none* boxShadow, so when rendered it produces a valid css value of boxShadow property
            ...Array.from(setsBoxShadow)
        ];
    },
    registerBoxShadow   (item: CssCustomSimpleRef): void { setsBoxShadow.add(item)    },
    unregisterBoxShadow (item: CssCustomSimpleRef): void { setsBoxShadow.delete(item) },
    
    
    
    get filters         ():    CssCustomSimpleRef[]      {
        return [
            anims.filterNone, // the filter collection must contain at least 1 of *none* filter, so when rendered it produces a valid css value of filter property
            ...Array.from(setsFilter)
        ];
    },
    registerFilter      (item: CssCustomSimpleRef): void { setsFilter.add(item)       },
    unregisterFilter    (item: CssCustomSimpleRef): void { setsFilter.delete(item)    },
    
    
    
    get anims           ():    CssCustomSimpleRef[]      {
        return [
            anims.animNone, // the animation collection must contain at least 1 of *none* animation, so when rendered it produces a valid css value of animation property
            ...Array.from(setsAnim)
        ];
    },
    registerAnim        (item: CssCustomSimpleRef): void { setsAnim.add(item)         },
    unregisterAnim      (item: CssCustomSimpleRef): void { setsAnim.delete(item)      },
};
export type AnimRegistry = typeof animRegistry



export type AnimMixin = readonly [() => CssRule, ReadonlyCssCustomRefs<AnimVars>, AnimRegistry]
/**
 * Uses animation.
 * @returns A `AnimMixin` represents animation definitions.
 */
export const usesAnim = (): AnimMixin => {
    return [
        () => style({
            ...vars({
                [anims.boxShadowNone] : [[0, 0, 'transparent']],
                [anims.boxShadow    ] : [
                    // layering: boxShadow1 | boxShadow2 | boxShadow3 ...
                    
                    // layers:
                    ...animRegistry.boxShadows,
                ],
                
                
                
                [anims.filterNone   ] : 'brightness(100%)',
                [anims.filter       ] : [[
                    // combining: filter1 * filter2 * filter3 ...
                    
                    // layers:
                    ...animRegistry.filters,
                ]],
                
                
                
                [anims.transfNone   ] : 'translate(0)',
                
                
                
                [anims.animNone     ] : 'none',
                [anims.anim         ] : [
                    // layering: anim1 | anim2 | anim3 ...
                    
                    // layers:
                    ...animRegistry.anims,
                ],
            }),
            
            
            
            // declare default values at lowest specificity (except for **None):
            ...vars(Object.fromEntries([
                ...animRegistry.boxShadows.filter((ref) => (ref !== anims.boxShadowNone)).map((ref) => [ ref, anims.boxShadowNone ]),
                ...animRegistry.filters   .filter((ref) => (ref !== anims.filterNone   )).map((ref) => [ ref, anims.filterNone    ]),
                ...animRegistry.anims     .filter((ref) => (ref !== anims.animNone     )).map((ref) => [ ref, anims.animNone      ]),
            ])),
        }),
        anims,
        animRegistry,
    ];
};



export const isRef = (value: CssCustomValue): value is CssCustomRef => (typeof(value) === 'string') && value.startsWith('var(--');

type BaseTypeOf<TComplexValue> = TComplexValue extends CssComplexBaseValueOf<infer TValue>[][] ? (TValue|CssCustomRef) : never
export const fallbackNoneBoxShadow = (item : BaseTypeOf<CssKnownProps['boxShadow']>  ): typeof item => (isRef(item) && (item !== anims.boxShadowNone)) ? fallbacks(item, anims.boxShadowNone) : item;
export const fallbackNoneFilter    = (item : BaseTypeOf<CssKnownProps['filter'   ]>[]): typeof item => item.map((subItem) => (isRef(subItem) && (subItem !== anims.filterNone)) ? fallbacks(subItem, anims.filterNone) : subItem);
export const fallbackNoneTransf    = (item : BaseTypeOf<CssKnownProps['transf'   ]>[]): typeof item => item.map((subItem) => (isRef(subItem) && (subItem !== anims.transfNone)) ? fallbacks(subItem, anims.transfNone) : subItem);
export const fallbackNoneAnim      = (item : BaseTypeOf<CssKnownProps['anim'     ]>  ): typeof item => (isRef(item) && (item !== anims.animNone)) ? fallbacks(item, anims.animNone) : item;
//#endregion animations

//#region excited
export interface ExcitedVars {
    filter : any
    anim   : any
}
const [exciteds] = cssVar<ExcitedVars>();

{
    const [, , animRegistry] = usesAnim();
    animRegistry.registerFilter(exciteds.filter);
    animRegistry.registerAnim(exciteds.anim);
}



// parent not `.excited` -and- current not `.excited`:
export const ifNotExcited = (styles: CssStyleCollection): CssRule => rule(':not(:is(.excited&, &.excited))', styles);
// parent is  `.excited` -or-  current is  `.excited`:
export const ifExcited    = (styles: CssStyleCollection): CssRule => rule(     ':is(.excited&, &.excited)' , styles);



/**
 * Uses toggleable excited states.
 * @returns A `StateMixin<ExcitedVars>` represents excited state definitions.
 */
export const usesExcitedState = (): StateMixin<ExcitedVars> => {
    return [
        () => style({
            ...states([
                ifExcited(
                    vars({
                        [exciteds.filter] : basics.filterExcited,
                        [exciteds.anim  ] : basics.animExcited,
                    }),
                ),
            ]),
        }),
        exciteds,
    ];
};



export interface ToggleExcitedProps
{
    // accessibilities:
    excited         ?: boolean
    onExcitedChange ?: (newExcited: boolean) => void
}
export const useExcitedState = <TElement extends Element = HTMLElement>(props: ToggleExcitedProps) => {
    // props:
    const {
        // accessibilities:
        excited,
        onExcitedChange,
    } = props;
    
    
    
    /*
     * the state is excited/normal based on [controllable excited]
     */
    const excitedFn : boolean = (excited /*controllable*/ ?? false);
    
    
    
    // states:
    // local storages without causing to (re)render, we need to manual control the (re)render event:
    /**
     * `true`  => was excited  
     * `false` => was normal
     */
    const wasExcited = useRef<boolean|null>(excitedFn);
    
    // manually controls the (re)render event:
    const [triggerRender] = useTriggerRender();
    
    
    
    const asyncTriggerRender = useRef<ReturnType<typeof requestIdleCallback>|undefined>(undefined);
    useEffect(() => {
        // cleanups:
        return () => {
            // cancel out previously asyncTriggerRender (if any):
            if (asyncTriggerRender.current) cancelIdleCallback(asyncTriggerRender.current);
        };
    }, []); // runs once on startup
    
    
    
    if (wasExcited.current !== excitedFn) { // change detected => apply the change & start animating
        const continueToRun = excitedFn && (wasExcited.current === null);
        if (continueToRun) {
            // cancel out previously asyncTriggerRender (if any):
            if (asyncTriggerRender.current) cancelIdleCallback(asyncTriggerRender.current);
            
            
            
            // wait until the non-excited `<Basic>` has been applied by browser ui, then re-render the excited `<Basic>`
            asyncTriggerRender.current = requestIdleCallback(() => {
                wasExcited.current = excitedFn; // remember the last change
                triggerRender(); // re-render the excited `<Basic>`
            });
        }
        else {
            wasExcited.current = excitedFn; // remember the last change
        } // if
    } // if
    
    
    
    // handlers:
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(excited)|(?<=[a-z])(Excited))(?![a-z])/.test(event.animationName)) return; // ignores animation other than excited[Foo] or booExcited[Foo]
        
        
        
        // clean up finished animation
        
        const continueToRun = wasExcited.current;
        wasExcited.current = null; // mark the animation need to restart
        
        Promise.resolve().then(() => { // trigger the event after the <Basic> has finished rendering (for controllable <Basic>)
            onExcitedChange?.(false); // request to stop
        });
        if (continueToRun) {
            triggerRender(); // need to restart the animation
        } // if
    }, [onExcitedChange]);
    
    
    
    return {
        excited : wasExcited.current,
        
        class   : wasExcited.current ? 'excited' : null,
        
        handleAnimationEnd,
    };
};
//#endregion excited



// styles:
export const usesBasicLayout = () => {
    // dependencies:
    
    // backgrounds:
    const [backgRule   , backgs] = usesBackg();
    
    // foregrounds:
    const [foregRule   , foregs] = usesForeg();
    
    // borders:
    const [borderRule          ] = usesBorder();
    
    // rings:
    const [ringRule            ] = usesRing();
    
    // animations:
    const [animRule    , anims ] = usesAnim();
    
    // spacings:
    const [paddingRule         ] = usesPadding();
    
    
    
    return style({
        ...imports([
            // backgrounds:
            backgRule,
            
            // foregrounds:
            foregRule,
            
            // borders:
            borderRule,
            
            // rings:
            ringRule,
            
            // animations:
            animRule,
            
            // spacings:
            paddingRule,
        ]),
        ...style({
            // layouts:
            display   : 'block',
            
            
            
            // customize:
            ...usesCssProps(basics), // apply config's cssProps
            
            
            
            // accessibilities:
            ...rule(['&::selection', '& ::selection'], { // ::selection on self and descendants
                    // backgrounds:
                backg     : backgs.altBackgColor,
                
                
                
                // foregrounds:
                foreg     : foregs.altForeg,
            }),
            
            
            
            // backgrounds:
            backg     : backgs.backg,
            
            
            
            // foregrounds:
            foreg     : foregs.foreg,
            
            
            
            // borders:
            
            // let's Reusable-UI system to manage borderColor, borderStroke & borderRadius:
            ...extendsBorder(basics),
            
            
            
            // animations:
            boxShadow : anims.boxShadow,
            filter    : anims.filter,
            anim      : anims.anim,
            
            
            
            // spacings:
            
            // let's Reusable-UI system to manage paddingInline & paddingBlock:
            ...extendsPadding(basics),
        }),
    });
};
export const usesBasicVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule      } = usesResizable(basics);
    const {themableRule       } = usesThemable();
    const {nudibleRule        } = usesNudible();
    
    // colors:
    const [gradientVariantRule] = usesGradientVariant();
    const [outlinedVariantRule] = usesOutlinedVariant();
    const [mildVariantRule    ] = usesMildVariant();
    
    
    
    return style({
        ...imports([
            // variants:
            resizableRule,
            themableRule,
            nudibleRule,
            
            // colors:
            gradientVariantRule,
            outlinedVariantRule,
            mildVariantRule,
        ]),
    });
};

export const useBasicStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesBasicLayout(),
        
        // variants:
        usesBasicVariants(),
    ]),
}), { id: 'rbkpy0qh2b' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [basics, basicValues, cssBasicConfig] = cssConfig(() => {
    // dependencies:
    
    const [, , animRegistry] = usesAnim();
    const filters = animRegistry.filters;
    
    const [, {filter: filterExcited} ] = usesExcitedState();
    
    
    
    //#region keyframes
    const [keyframesExcitedRule, keyframesExcited] = keyframes({
        from : {
            filter: [[
                ...filters.filter((f) => (f !== filterExcited)),
                
             // filterExcited, // missing the last => let's the browser interpolated it
            ]].map(fallbackNoneFilter),
        },
        to   : {
            filter: [[
                ...filters.filter((f) => (f !== filterExcited)),
                
                filterExcited, // existing the last => let's the browser interpolated it
            ]].map(fallbackNoneFilter),
        },
    });
    keyframesExcited.value = 'excited'; // the @keyframes name should contain 'excited' in order to be recognized by `useExcitedState`
    //#endregion keyframes
    
    
    
    const transitionDuration = '300ms';
    
    return {
        // backgrounds:
        backg                : 'transparent'                as CssKnownProps['backg'],
        backgGrad            : [
            ['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box'],
        ]                                                   as CssKnownProps['backgroundImage'],
        
        
        
        // foregrounds:
        foreg                : 'currentColor'               as CssKnownProps['foreg'],
        
        
        
        // borders:
        border               : [
            [borderStrokes.style, borderStrokes.defaultWidth, borderStrokes.color],
        ]                                                   as CssKnownProps['border'],
        borderWidth          : borderStrokes.defaultWidth   as CssKnownProps['borderWidth'],
        borderColor          : borderStrokes.color          as CssKnownProps['borderColor'],
        
        borderRadius         : borderRadiuses.md            as CssKnownProps['borderRadius'],
        borderRadiusSm       : borderRadiuses.sm            as CssKnownProps['borderRadius'],
        borderRadiusLg       : borderRadiuses.lg            as CssKnownProps['borderRadius'],
        
        
        
        // animations:
        transitionDuration   : transitionDuration           as CssKnownProps['transitionDuration'],
        transition           : [
            // appearances:
            ['opacity'      , transitionDuration, 'ease-out'],
            
            // sizes:
            ['inline-size'  , transitionDuration, 'ease-out'],
            ['block-size'   , transitionDuration, 'ease-out'],
            
            // backgrounds:
            ['background'   , transitionDuration, 'ease-out'],
            
            // foregrounds:
            ['color'        , transitionDuration, 'ease-out'],
            
            // borders:
            ['border'       , transitionDuration, 'ease-out'],
            ['border-radius', transitionDuration, 'ease-out'],
            
            // spacings:
         // ['padding'      , transitionDuration, 'ease-out'], // beautiful but uncomfortable
            
            // typos:
            ['font-size'    , transitionDuration, 'ease-out'],
        ]                                                   as CssKnownProps['transition'],
        
        filterExcited        : [[
            'invert(80%)',
        ]]                                                  as CssKnownProps['filter'],
        
        ...keyframesExcitedRule,
        animExcited          : [
            ['150ms', 'ease', 'both', 'alternate-reverse', 5, keyframesExcited],
        ]                                                   as CssKnownProps['anim'],
        
        
        
        // spacings:
        paddingInline        : [['calc((', spacers.sm, '+', spacers.md, ')/2)']]    as CssKnownProps['paddingInline'],
        paddingBlock         : [['calc((', spacers.xs, '+', spacers.sm, ')/2)']]    as CssKnownProps['paddingBlock' ],
        paddingInlineSm      : spacers.sm                                           as CssKnownProps['paddingInline'],
        paddingBlockSm       : spacers.xs                                           as CssKnownProps['paddingBlock' ],
        paddingInlineLg      : spacers.md                                           as CssKnownProps['paddingInline'],
        paddingBlockLg       : spacers.sm                                           as CssKnownProps['paddingBlock' ],
        
        
        
        // typos:
        fontSize             : typos.fontSizeNm                                                 as CssKnownProps['fontSize'],
        fontSizeSm           : [['calc((', typos.fontSizeSm, '+', typos.fontSizeNm, ')/2)']]    as CssKnownProps['fontSize'],
        fontSizeLg           : typos.fontSizeMd                                                 as CssKnownProps['fontSize'],
        fontFamily           : 'inherit'    as CssKnownProps['fontFamily'],
        fontWeight           : 'inherit'    as CssKnownProps['fontWeight'],
        fontStyle            : 'inherit'    as CssKnownProps['fontStyle'],
        textDecoration       : 'inherit'    as CssKnownProps['textDecoration'],
        lineHeight           : 'inherit'    as CssKnownProps['lineHeight'],
    };
}, { prefix: 'bsc' });



// react components:
export interface BasicProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        GenericProps<TElement>,
        
        // variants:
        ResizableProps,
        ThemableProps,
        NudibleProps,
        
        // colors:
        GradientVariant,
        OutlinedVariant,
        MildVariant
{
}
const Basic = <TElement extends Element = HTMLElement>(props: BasicProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet       = useBasicStyleSheet();
    
    
    
    // variants:
    const resizableVariant = useResizable(props);
    const themableVariant  = useThemable(props);
    const nudibleVariant   = useNudible(props);
    
    // colors:
    const gradientVariant  = useGradientVariant(props);
    const outlinedVariant  = useOutlinedVariant(props);
    const mildVariant      = useMildVariant(props);
    
    
    
    // rest props:
    const {
        // variants:
        size     : _size,     // remove
        
        // layouts:
        nude     : _nude,     // remove
        
        // colors:
        theme    : _theme,    // remove
        gradient : _gradient, // remove
        outlined : _outlined, // remove
        mild     : _mild,     // remove
    ...restGenericProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        resizableVariant.class,
        themableVariant.class,
        nudibleVariant.class,
        
        // colors:
        gradientVariant.class,
        outlinedVariant.class,
        mildVariant.class,
    );
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...restGenericProps}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
        />
    );
};
export {
    Basic,
    Basic as default,
}
