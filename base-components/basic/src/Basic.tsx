// // react:
// import {
//     // react:
//     default as React,
// }                           from 'react'

// cssfn:
import type {
    // css values:
    CssSimpleValue,
    
    
    
    // css custom properties:
    CssCustomSimpleRef,
    CssCustomRef,
    CssCustomValue,
    
    
    
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
    
    CssSelectorCollection,
}                           from '@cssfn/css-types'     // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // utilities:
    pascalCase,
    iif,
    solidBackg,
}                           from '@cssfn/cssfn'         // writes css in javascript
import {
    // types:
    ReadonlyCssCustomRefs,
    
    
    
    // utilities:
    cssVar,
    fallbacks,
}                           from '@cssfn/css-var'       // strongly typed of css variables
import {
    // createCssConfig,
    
    
    
    // utilities:
    // usesCssProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'    // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    colors,
    themes as colorThemes,
}                           from '@reusable-ui/colors'  // a color management system



// types:
export type VariantMixin<TCssCustomProps extends {}> = readonly [() => CssRule, ReadonlyCssCustomRefs<TCssCustomProps>]



// hooks:

// layouts:

//#region sizes
export type SizeName = 'sm'|'lg' | (string & {})
export interface SizeVars {
    // empty (may be added soon)
}
const [sizes] = cssVar<SizeVars>();



export const ifSize = (sizeName: SizeName, styles: CssStyleCollection): CssRule => rule(`.sz${pascalCase(sizeName)}`, styles);



/**
 * Uses `<Basic>` sizes.  
 * For example: `sm`, `lg`.
 * @param factory Customize the callback to create sizing definitions for each size in `options`.
 * @param options Customize the size options.
 * @returns A `VariantMixin<SizeVars>` represents sizing definitions for each size in `options`.
 */
export const usesSizeVariant = (factory : ((sizeName: SizeName) => CssStyleCollection) = sizeOf, options = sizeOptions()): VariantMixin<SizeVars> => {
    return [
        () => style({
            ...variants([
                options.map((sizeName) =>
                    ifSize(sizeName,
                        factory(sizeName)
                    )
                ),
            ]),
        }),
        sizes,
    ];
};

/**
 * Creates sizing definitions for the given `sizeName`.
 * @param sizeName The size name.
 * @returns A `CssRule` represents sizing definitions for the given `sizeName`.
 */
export const sizeOf = (sizeName: SizeName): CssRule => style({
    // overwrites propName = propName{SizeName}:
    ...overwriteProps(sizes, usesSuffixedProps(sizes, sizeName)),
});

/**
 * Gets all available size options.
 * @returns A `SizeName[]` represents all available size options.
 */
export const sizeOptions = (): SizeName[] => ['sm', 'lg'];



export interface SizeVariant {
    size ?: SizeName
}
export const useSizeVariant = ({size}: SizeVariant) => ({
    class: size ? `sz${pascalCase(size)}` : null,
});
//#endregion sizes

//#region orientation
export type OrientationName = 'inline'|'block'



export interface OrientationRuleOptions {
    defaultOrientation        ?: OrientationName
    orientationInlineSelector ?: CssSelectorCollection
    orientationBlockSelector  ?: CssSelectorCollection
}
export const defaultInlineOrientationRuleOptions : OrientationRuleOptions = { defaultOrientation: 'inline' };
export const defaultBlockOrientationRuleOptions  : OrientationRuleOptions = { defaultOrientation: 'block'  };
export const normalizeOrientationRule = (options: OrientationRuleOptions|undefined, defaultOptions: OrientationRuleOptions): Required<OrientationRuleOptions> => {
    const defaultOrientation        = options?.defaultOrientation        ?? defaultOptions.defaultOrientation        ?? 'block';
    const orientationInlineSelector = options?.orientationInlineSelector ?? defaultOptions.orientationInlineSelector ?? ((defaultOrientation === 'inline') ? ':not(.block)'  : '.inline');
    const orientationBlockSelector  = options?.orientationBlockSelector  ?? defaultOptions.orientationBlockSelector  ?? ((defaultOrientation === 'block' ) ? ':not(.inline)' : '.block' );
    
    
    
    return {
        ...options, // preserves foreign props
        
        defaultOrientation,
        orientationInlineSelector,
        orientationBlockSelector,
    };
};



export type OrientationMixin = readonly [CssSelectorCollection, CssSelectorCollection]
export const usesOrientationRule = (options?: OrientationRuleOptions): OrientationMixin => {
    // options:
    const {
        orientationInlineSelector,
        orientationBlockSelector,
    } = normalizeOrientationRule(options, defaultBlockOrientationRuleOptions);
    
    
    
    return [
        orientationInlineSelector,
        orientationBlockSelector,
    ];
};



export interface OrientationVariant {
    orientation ?: OrientationName
}
export const useOrientationVariant = ({orientation}: OrientationVariant) => ({
    class: orientation ?? null,
});
//#endregion orientation

//#region nude
export const ifNotNude = (styles: CssStyleCollection): CssRule => rule(':not(.nude)', styles);
export const ifNude    = (styles: CssStyleCollection): CssRule => rule(     '.nude' , styles);



export const usesNudeVariant = (): CssRule => {
    // dependencies:
    
    // borders:
    const [, borders] = usesBorder();
    
    // spacings:
    const [, paddings      ] = usesPadding();
    
    
    
    return style({
        ...variants([
            ifNude({
                // backgrounds:
                backg : [['none'], '!important'], // discard background, no valid/invalid animation
                
                
                
                // borders:
                [borders.borderWidth           ] : '0px', // discard border
             // // remove rounded corners on top:
             // [borders.borderStartStartRadius] : '0px', // do not discard borderRadius, causing boxShadow looks weird
             // [borders.borderStartEndRadius  ] : '0px', // do not discard borderRadius, causing boxShadow looks weird
             // // remove rounded corners on bottom:
             // [borders.borderEndStartRadius  ] : '0px', // do not discard borderRadius, causing boxShadow looks weird
             // [borders.borderEndEndRadius    ] : '0px', // do not discard borderRadius, causing boxShadow looks weird
                
                
                
                // spacings:
                [paddings.paddingInline] : '0px', // discard padding
                [paddings.paddingBlock ] : '0px', // discard padding
            }),
        ]),
    });
};



export interface NudeVariant {
    nude ?: boolean
}
export const useNudeVariant = ({nude}: NudeVariant) => ({
    class: nude ? 'nude' : null,
});
//#endregion nude


// colors:

//#region themes
export type ThemeName = (keyof typeof colorThemes) | (string & {})
export interface ThemeVars {
    /**
     * themed background color.
     */
    backg             : any
    /**
     * themed foreground color.
     */
    foreg             : any
    /**
     * themed border color.
     */
    border            : any
    
    /**
     * themed foreground color - at outlined variant.
     */
    foregOutlined     : any
    
    /**
     * themed background color - at mild variant.
     */
    backgMild         : any
    /**
     * themed foreground color - at mild variant.
     */
    foregMild         : any
    
    /**
     * themed focus color - at focused state.
     */
    focus             : any
    
    
    
    /**
     * conditional background color.
     */
    backgCond         : any
    /**
     * conditional foreground color.
     */
    foregCond         : any
    /**
     * conditional border color.
     */
    borderCond        : any
    
    /**
     * conditional foreground color - at outlined variant.
     */
    foregOutlinedCond : any
    
    /**
     * conditional background color - at mild variant.
     */
    backgMildCond     : any
    /**
     * conditional foreground color - at mild variant.
     */
    foregMildCond     : any
    
    /**
     * conditional focus color - at focused state.
     */
    focusCond         : any
    
    
    
    /**
     * important conditional background color.
     */
    backgImpt         : any
    /**
     * important conditional foreground color.
     */
    foregImpt         : any
    /**
     * important conditional border color.
     */
    borderImpt        : any
    
    /**
     * important conditional foreground color - at outlined variant.
     */
    foregOutlinedImpt : any
    
    /**
     * important conditional background color - at mild variant.
     */
    backgMildImpt     : any
    /**
     * important conditional foreground color - at mild variant.
     */
    foregMildImpt     : any
    
    /**
     * important conditional focus color - at focused state.
     */
    focusImpt         : any
}
const [themes] = cssVar<ThemeVars>();



export const ifTheme = (themeName: ThemeName, styles: CssStyleCollection): CssRule => rule(`.th${pascalCase(themeName)}`, styles);



/**
 * Uses `<Basic>` theme colors.  
 * For example: `primary`, `secondary`, `danger`, `success`, etc.
 * @param factory Customize the callback to create theme color definitions for each theme in `options`.
 * @param options Customize the theme options.
 * @returns A `VariantMixin<ThemeVars>` represents theme color definitions for each theme in `options`.
 */
export const usesThemeVariant = (factory : ((themeName: ThemeName) => CssStyleCollection) = themeOf, options = themeOptions()): VariantMixin<ThemeVars> => {
    return [
        () => style({
            ...variants([
                options.map((themeName) =>
                    ifTheme(themeName,
                        factory(themeName)
                    )
                ),
            ]),
        }),
        themes,
    ];
};

/**
 * Creates theme color definitions for the given `themeName`.
 * @param themeName The theme name.
 * @returns A `CssRule` represents theme color definitions for the given `themeName`.
 */
export const themeOf = (themeName: ThemeName): CssRule => style({
    ...vars({
        [themes.backg            ] : colors[   themeName       as keyof typeof colors], // base color
        [themes.foreg            ] : colors[`${themeName}Text` as keyof typeof colors], // light on dark base color | dark on light base color
        [themes.border           ] : colors[`${themeName}Bold` as keyof typeof colors], // 20% base color + 80% page's foreground
        
        [themes.foregOutlined    ] : themes.backg,
        
        [themes.backgMild        ] : colors[`${themeName}Mild` as keyof typeof colors], // 20% base color + 80% page's background
        [themes.foregMild        ] : themes.border,
        
        [themes.focus            ] : colors[`${themeName}Thin` as keyof typeof colors], // 50% transparency of base color
    }),
});

/**
 * Gets all available theme options.
 * @returns A `ThemeName[]` represents all available theme options.
 */
export const themeOptions = (): ThemeName[] => Object.keys(colorThemes) as ThemeName[];



/**
 * Creates a default theme color definitions.
 * @param themeName The theme name as the default theme color -or- `null` for *auto* theme.
 * @returns A `CssRule` represents a default theme color definitions`.
 */
export const usesThemeDefault = (themeName: ThemeName|null = null): CssRule => usesThemeCond(themeName);

/**
 * Creates conditional color definitions for the given `themeName`.
 * @param themeName The theme name as the conditional color -or- `null` for undefining the conditional.
 * @returns A `CssRule` represents conditional color definitions for the given `themeName`.
 */
export const usesThemeCond = (themeName: ThemeName|null): CssRule => style({
    ...vars({
        [themes.backgCond        ] : !themeName ? null : colors[   themeName       as keyof typeof colors], // base color
        [themes.foregCond        ] : !themeName ? null : colors[`${themeName}Text` as keyof typeof colors], // light on dark base color | dark on light base color
        [themes.borderCond       ] : !themeName ? null : colors[`${themeName}Bold` as keyof typeof colors], // 20% base color + 80% page's foreground
        
        [themes.foregOutlinedCond] : !themeName ? null : themes.backgCond,
        
        [themes.backgMildCond    ] : !themeName ? null : colors[`${themeName}Mild` as keyof typeof colors], // 20% base color + 80% page's background
        [themes.foregMildCond    ] : !themeName ? null : themes.borderCond,
        
        [themes.focusCond        ] : !themeName ? null : colors[`${themeName}Thin` as keyof typeof colors], // 50% transparency of base color
    }),
});

/**
 * Creates important conditional color definitions for the given `themeName`.
 * @param themeName The theme name as the important conditional color -or- `null` for undefining the important conditional.
 * @returns A `CssRule` represents important conditional color definitions for the given `themeName`.
 */
export const usesThemeImpt = (themeName: ThemeName|null): CssRule => style({
    ...vars({
        [themes.backgImpt        ] : !themeName ? null : colors[   themeName       as keyof typeof colors], // base color
        [themes.foregImpt        ] : !themeName ? null : colors[`${themeName}Text` as keyof typeof colors], // light on dark base color | dark on light base color
        [themes.borderImpt       ] : !themeName ? null : colors[`${themeName}Bold` as keyof typeof colors], // 20% base color + 80% page's foreground
        
        [themes.foregOutlinedImpt] : !themeName ? null : themes.backgImpt,
        
        [themes.backgMildImpt    ] : !themeName ? null : colors[`${themeName}Mild` as keyof typeof colors], // 20% base color + 80% page's background
        [themes.foregMildImpt    ] : !themeName ? null : themes.borderImpt,
        
        [themes.focusImpt        ] : !themeName ? null : colors[`${themeName}Thin` as keyof typeof colors], // 50% transparency of base color
    }),
});



export interface ThemeVariant {
    theme ?: ThemeName
}
export const useThemeVariant = ({theme}: ThemeVariant, themeDefault?: ThemeName) => {
    const themeName = theme ?? themeDefault;
    return {
        class: themeName ? `th${pascalCase(themeName)}` : null,
    };
};
//#endregion themes

//#region gradient
export interface GradientVars {
    /**
     * toggles_on background gradient - at gradient variant.
     */
    backgGradTg : any
}
const [gradients] = cssVar<GradientVars>();



// grandpa not `.gradient` -and- parent not `.gradient` -and- current not `.gradient`:
export const ifNotGradient = (styles: CssStyleCollection): CssRule => rule(':where(:not(.gradient)) :not(:is(.gradient&, &.gradient))', styles);
// grandpa is  `.gradient` -or-  parent is  `.gradient` -or-  current is  `.gradient`:
export const ifGradient    = (styles: CssStyleCollection): CssRule => rule([           '.gradient &',   ':is(.gradient&, &.gradient)'], styles);



/**
 * Uses `<Basic>` toggleable gradient.
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
        [gradients.backgGradTg] : toggle ? basics.backgGrad : ((toggle !== null) ? 'initial' : null),
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
    backgFn : any
    /**
     * toggles_on background color - at outlined variant.
     */
    backgTg : any
    
    
    
    /**
     * functional foreground color - at outlined variant.
     */
    foregFn : any
    /**
     * toggles_on foreground color - at outlined variant.
     */
    foregTg : any
}
const [outlineds] = cssVar<OutlinedVars>();



// grandpa not `.outlined` -and- parent not `.outlined` -and- current not `.outlined`:
export const ifNotOutlined = (styles: CssStyleCollection): CssRule => rule(':where(:not(.outlined)) :not(:is(.outlined&, &.outlined))', styles);
// grandpa is  `.outlined` -or-  parent is  `.outlined` -or-  current is  `.outlined`:
export const ifOutlined    = (styles: CssStyleCollection): CssRule => rule([           '.outlined &',   ':is(.outlined&, &.outlined)'], styles);



/**
 * Uses `<Basic>` toggleable outlining.
 * @param factory Customize the callback to create outlining definitions for each toggle state.
 * @returns A `VariantMixin<OutlinedVars>` represents toggleable outlining definitions.
 */
export const usesOutlinedVariant = (factory : ((toggle?: (boolean|null)) => CssStyleCollection) = outlinedOf): VariantMixin<OutlinedVars> => {
    // dependencies:
    const [themeRules, themes] = usesThemeVariant();
    
    
    
    return [
        () => style({
            ...imports([
                // makes   `usesOutlinedVariant()` implicitly `usesThemeVariant()`
                // because `usesOutlinedVariant()` requires   `usesThemeVariant()` to work correctly, otherwise it uses the parent themes (that's not intented)
                themeRules,
            ]),
            ...vars({
                [outlineds.backgFn] : 'transparent', // set background to transparent, regardless of the theme colors
                
                
                
                [outlineds.foregFn] : fallbacks(
                    themes.foregOutlinedImpt,  // first  priority
                    themes.foregOutlined,      // second priority
                    themes.foregOutlinedCond,  // third  priority
                    
                    basics.foreg,              // default => uses config's foreground
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
        [outlineds.backgTg] : toggle ? outlineds.backgFn : ((toggle !== null) ? 'initial' : null),
        [outlineds.foregTg] : toggle ? outlineds.foregFn : ((toggle !== null) ? 'initial' : null),
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
    backgFn : any
    /**
     * toggles_on background color - at mild variant.
     */
    backgTg : any
    
    
    
    /**
     * functional foreground color - at mild variant.
     */
    foregFn : any
    /**
     * toggles_on foreground color - at mild variant.
     */
    foregTg : any
}
const [milds] = cssVar<MildVars>();



// by design: grandpa's `.mild` does not affect current `.mild`
// parent not `.mild` -and- current not `.mild`:
export const ifNotMild = (styles: CssStyleCollection): CssRule => rule(':not(:is(.mild&, &.mild))', styles);
// parent is  `.mild` -or-  current is  `.mild`:
export const ifMild    = (styles: CssStyleCollection): CssRule => rule(     ':is(.mild&, &.mild)' , styles);



/**
 * Uses `<Basic>` toggleable mildification.
 * @param factory Customize the callback to create mildification definitions for each toggle state.
 * @returns A `VariantMixin<MildVars>` represents toggleable mildification definitions.
 */
export const usesMildVariant = (factory : ((toggle?: (boolean|null)) => CssStyleCollection) = mildOf): VariantMixin<MildVars> => {
    // dependencies:
    const [themeRules, themes] = usesThemeVariant();
    
    
    
    return [
        () => style({
            ...imports([
                // makes   `usesMildVariant()` implicitly `usesThemeVariant()`
                // because `usesMildVariant()` requires   `usesThemeVariant()` to work correctly, otherwise it uses the parent themes (that's not intented)
                themeRules,
            ]),
            ...vars({
                [milds.backgFn] : fallbacks(
                    themes.backgMildImpt,  // first  priority
                    themes.backgMild,      // second priority
                    themes.backgMildCond,  // third  priority
                    
                    basics.backg,          // default => uses config's background
                ),
                
                
                
                [milds.foregFn] : fallbacks(
                    themes.foregMildImpt,  // first  priority
                    themes.foregMild,      // second priority
                    themes.foregMildCond,  // third  priority
                    
                    basics.foreg,          // default => uses config's foreground
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
        [milds.backgTg] : toggle ? milds.backgFn : ((toggle !== null) ? 'initial' : null),
        [milds.foregTg] : toggle ? milds.foregFn : ((toggle !== null) ? 'initial' : null),
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
    backgNone    : any
    
    
    
    /**
     * functional background color.
     */
    backgColorFn : any
    /**
     * final background color.
     */
    backgColor   : any
    
    
    
    /**
     * final background layers.
     */
    backg        : any
}
const [backgs] = cssVar<BackgVars>();

/**
 * Uses `<Basic>` background layer(s).
 * @returns A `VariantMixin<BackgVars>` represents background layer(s) definitions.
 */
export const usesBackg = (): VariantMixin<BackgVars> => {
    // dependencies:
    const [, themes   ] = usesThemeVariant();
    const [, gradients] = usesGradientVariant();
    const [, outlineds] = usesOutlinedVariant();
    const [, milds    ] = usesMildVariant();
    
    
    
    return [
        () => style({
            ...vars({
                [backgs.backgNone   ] : solidBackg('transparent'),
                
                
                
                [backgs.backgColorFn] : fallbacks(
                    themes.backgImpt,  // first  priority
                    themes.backg,      // second priority
                    themes.backgCond,  // third  priority
                    
                    basics.backg,      // default => uses config's background
                ),
                [backgs.backgColor  ] : fallbacks(
                    outlineds.backgTg,   // toggle outlined (if `usesOutlinedVariant()` applied)
                    milds.backgTg,       // toggle mild     (if `usesMildVariant()` applied)
                    
                    backgs.backgColorFn, // default => uses our `backgColorFn`
                ),
                
                
                
                [backgs.backg       ] : [
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
    foregFn     : any
    /**
     * final foreground color.
     */
    foreg       : any
}
const [foregs] = cssVar<ForegVars>();

/**
 * Uses `<Basic>` foreground color (text color).
 * @returns A `VariantMixin<ForegVars>` represents foreground color definitions.
 */
export const usesForeg = (): VariantMixin<ForegVars> => {
    // dependencies:
    const [, themes   ] = usesThemeVariant();
    const [, outlineds] = usesOutlinedVariant();
    const [, milds    ] = usesMildVariant();
    
    
    
    return [
        () => style({
            ...vars({
                [foregs.foregFn] : fallbacks(
                    themes.foregImpt,  // first  priority
                    themes.foreg,      // second priority
                    themes.foregCond,  // third  priority
                    
                    basics.foreg,      // default => uses config's foreground
                ),
                [foregs.foreg  ] : fallbacks(
                    outlineds.foregTg, // toggle outlined (if `usesOutlinedVariant()` applied)
                    milds.foregTg,     // toggle mild     (if `usesMildVariant()` applied)
                    
                    foregs.foregFn,    // default => uses our `foregFn`
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
 * Uses `<Basic>` border color.
 * @returns A `VariantMixin<BorderVars>` represents border color definitions.
 */
export const usesBorder = (): VariantMixin<BorderVars> => {
    // dependencies:
    const [, themes   ] = usesThemeVariant();
    const [, outlineds] = usesOutlinedVariant();
    
    
    
    return [
        () => style({
            ...vars({
                [borders.borderColorFn         ] : fallbacks(
                    themes.borderImpt,     // first  priority
                    themes.border,         // second priority
                    themes.borderCond,     // third  priority
                    
                    basics.borderColor,    // default => uses config's border color
                ),
                [borders.borderColor           ] : fallbacks(
                    outlineds.foregTg,     // toggle outlined (if `usesOutlinedVariant()` applied)
                    
                    borders.borderColorFn, // default => uses our `borderColorFn`
                ),
                
                
                
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
        ...iif(!!cssBorderProps, vars({
            [borders.border     ] : cssBorderProps?.border,
            [borders.borderWidth] : cssBorderProps?.borderWidth,
        })),
        border      : borders.border,      // all border properties
        borderColor : borders.borderColor, // overwrite color prop
        borderWidth : borders.borderWidth, // overwrite width prop
        
        
        
        // border radiuses:
        // cssBorderProps.borderRadius** => ref.borderRadius**
        ...iif(!!cssBorderProps, vars({
            [borders.borderStartStartRadius] : cssBorderProps?.borderRadius,
            [borders.borderStartEndRadius  ] : cssBorderProps?.borderRadius,
            [borders.borderEndStartRadius  ] : cssBorderProps?.borderRadius,
            [borders.borderEndEndRadius    ] : cssBorderProps?.borderRadius,
        })),
        borderRadius           : null,                           // delete short prop
        borderStartStartRadius : borders.borderStartStartRadius, // overwrite radius prop
        borderStartEndRadius   : borders.borderStartEndRadius,   // overwrite radius prop
        borderEndStartRadius   : borders.borderEndStartRadius,   // overwrite radius prop
        borderEndEndRadius     : borders.borderEndEndRadius,     // overwrite radius prop
    });
};
//#endregion border


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
 * Uses `<Basic>` paddings.
 * @returns A `VariantMixin<PaddingVars>` represents paddings definitions.
 */
export const usesPadding = (): VariantMixin<PaddingVars> => {
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
        ...iif(!!cssProps, vars({
            [paddings.paddingInline] : cssProps?.paddingInline,
            [paddings.paddingBlock ] : cssProps?.paddingBlock,
        })),
        padding       : null,                   // delete short prop
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
    get boxShadows      (): CssCustomSimpleRef[]         { return Array.from(setsBoxShadow) },
    registerBoxShadow   (item: CssCustomSimpleRef): void { setsBoxShadow.add(item)          },
    unregisterBoxShadow (item: CssCustomSimpleRef): void { setsBoxShadow.delete(item)       },
    
    
    
    get filters         (): CssCustomSimpleRef[]         { return Array.from(setsFilter)    },
    registerFilter      (item: CssCustomSimpleRef): void { setsFilter.add(item)             },
    unregisterFilter    (item: CssCustomSimpleRef): void { setsFilter.delete(item)          },
    
    
    
    get anims           (): CssCustomSimpleRef[]         { return Array.from(setsAnim)      },
    registerAnim        (item: CssCustomSimpleRef): void { setsAnim.add(item)               },
    unregisterAnim      (item: CssCustomSimpleRef): void { setsAnim.delete(item)            },
};
export type AnimRegistry = typeof animRegistry



export type AnimMixin = readonly [() => CssRule, ReadonlyCssCustomRefs<AnimVars>, AnimRegistry]
/**
 * Uses `<Basic>` animation.
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
                    anims.boxShadowNone,
                    ...animRegistry.boxShadows,
                ],
                
                
                
                [anims.filterNone   ] : 'brightness(100%)',
                [anims.filter       ] : [[
                    // combining: filter1 * filter2 * filter3 ...
                    
                    // layers:
                    anims.filterNone,
                    ...animRegistry.filters,
                ]],
                
                
                
                [anims.transfNone   ] : 'translate(0)',
                
                
                
                [anims.animNone     ] : 'none',
                [anims.anim         ] : [
                    // layering: anim1 | anim2 | anim3 ...
                    
                    // layers:
                    anims.animNone,
                    ...animRegistry.anims,
                ],
            }),
            
            
            
            // declare default values at lowest specificity:
            ...vars(Object.fromEntries([
                ...animRegistry.boxShadows.map((ref) => [ ref, anims.boxShadowNone ]),
                ...animRegistry.filters   .map((ref) => [ ref, anims.filterNone    ]),
                ...animRegistry.anims     .map((ref) => [ ref, anims.animNone      ]),
            ])),
        }),
        anims,
        animRegistry,
    ];
};



export const isRef = (value: CssCustomValue): value is CssCustomRef => (typeof(value) === 'string') && value.startsWith('var(--');

export const fallbackNoneBoxShadow = (boxShadow : (CssKnownProps['boxShadow'] & CssSimpleValue[])[number]): typeof boxShadow => isRef(boxShadow) ? fallbacks(boxShadow, anims.boxShadowNone) : boxShadow;
export const fallbackNoneFilter    = (filter    : (CssKnownProps['filter'   ] & CssSimpleValue[])[number]): typeof filter    => isRef(filter   ) ? fallbacks(filter   , anims.filterNone   ) : filter;
export const fallbackNoneTransf    = (transf    : (CssKnownProps['transf'   ] & CssSimpleValue[])[number]): typeof transf    => isRef(transf   ) ? fallbacks(transf   , anims.transfNone   ) : transf;
export const fallbackNoneAnim      = (anim      : (CssKnownProps['anim'     ] & CssSimpleValue[])[number]): typeof anim      => isRef(anim     ) ? fallbacks(anim     , anims.animNone     ) : anim;
//#endregion animations
