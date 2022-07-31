// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'             // cssfn general types
import type {
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
    
    
    
    // utilities:
    pascalCase,
}                           from '@cssfn/cssfn'             // writes css in javascript
import {
    // utilities:
    cssVar,
}                           from '@cssfn/css-var'           // strongly typed of css variables
import {
    // types:
    CssConfigProps,
    Refs,
    
    
    
    // utilities:
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'        // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // configs:
    colors,
    themes,
}                           from '@reusable-ui/colors'          // a color management system



// hooks:

// variants:

//#region themable
export type ThemeName = (keyof typeof themes) | (string & {})
export interface ThemableVars {
    /**
     * themed background color.
     */
    backg                : any
    /**
     * themed foreground color.
     */
    foreg                : any
    /**
     * themed border color.
     */
    border               : any
    /**
     * themed alternate background color.
     */
    altBackg             : any
    /**
     * themed alternate foreground color.
     */
    altForeg             : any
    
    /**
     * themed foreground color - at outlined variant.
     */
    foregOutlined        : any
    /**
     * themed alternate background color - at outlined variant.
     */
    altBackgOutlined     : any
    /**
     * themed alternate foreground color - at outlined variant.
     */
    altForegOutlined     : any
    
    /**
     * themed background color - at mild variant.
     */
    backgMild            : any
    /**
     * themed foreground color - at mild variant.
     */
    foregMild            : any
    /**
     * themed alternate background color - at mild variant.
     */
    altBackgMild         : any
    /**
     * themed alternate foreground color - at mild variant.
     */
    altForegMild         : any
    
    /**
     * themed ring color.
     */
    ring                 : any
    
    
    
    /**
     * conditional background color.
     */
    backgCond            : any
    /**
     * conditional foreground color.
     */
    foregCond            : any
    /**
     * conditional border color.
     */
    borderCond           : any
    /**
     * conditional alternate background color.
     */
    altBackgCond         : any
    /**
     * conditional alternate foreground color.
     */
    altForegCond         : any
    
    /**
     * conditional foreground color - at outlined variant.
     */
    foregOutlinedCond    : any
    /**
     * conditional alternate background color - at outlined variant.
     */
    altBackgOutlinedCond : any
    /**
     * conditional alternate foreground color - at outlined variant.
     */
    altForegOutlinedCond : any
    
    /**
     * conditional background color - at mild variant.
     */
    backgMildCond        : any
    /**
     * conditional foreground color - at mild variant.
     */
    foregMildCond        : any
    /**
     * conditional alternate background color - at mild variant.
     */
    altBackgMildCond     : any
    /**
     * conditional alternate foreground color - at mild variant.
     */
    altForegMildCond     : any
    
    /**
     * conditional ring color.
     */
    ringCond             : any
    
    
    
    /**
     * important conditional background color.
     */
    backgImpt            : any
    /**
     * important conditional foreground color.
     */
    foregImpt            : any
    /**
     * important conditional border color.
     */
    borderImpt           : any
    /**
     * important conditional alternate background color.
     */
    altBackgImpt         : any
    /**
     * important conditional alternate foreground color.
     */
    altForegImpt         : any
    
    /**
     * important conditional foreground color - at outlined variant.
     */
    foregOutlinedImpt    : any
    /**
     * important conditional alternate background color - at outlined variant.
     */
    altBackgOutlinedImpt : any
    /**
     * important conditional alternate foreground color - at outlined variant.
     */
    altForegOutlinedImpt : any
    
    /**
     * important conditional background color - at mild variant.
     */
    backgMildImpt        : any
    /**
     * important conditional foreground color - at mild variant.
     */
    foregMildImpt        : any
    /**
     * important conditional alternate background color - at mild variant.
     */
    altBackgMildImpt     : any
    /**
     * important conditional alternate foreground color - at mild variant.
     */
    altForegMildImpt     : any
    
    /**
     * important conditional ring color.
     */
    ringImpt             : any
}
const [themableVars] = cssVar<ThemableVars>();



export const ifTheme = <TThemeName extends string = ThemeName>(themeName: TThemeName, styles: CssStyleCollection): CssRule => rule(`.th${pascalCase(themeName)}`, styles);
export const ifHasTheme = (styles: CssStyleCollection): CssRule => {
    return rule(
        Object.keys(themes)
        .map((themeName) => `.th${pascalCase(themeName)}`)
        ,
        styles
    );
};
export const ifNoTheme = (styles: CssStyleCollection): CssRule => {
    return rule(
        `:not(:is(${
            Object.keys(themes)
            .map((themeName) => `.th${pascalCase(themeName)}`)
            .join(', ')
        }))`
        ,
        styles
    );
};



export interface ThemableRules { themableRule: Factory<CssRule>, themableVars: ThemableVars }
/**
 * Uses theme (color) options.  
 * For example: `primary`, `success`, `danger`.
 * @param factory A callback to create a theme rules for each theme color in `options`.
 * @param options Defines all available theme color options.
 * @returns A `ThemableRules` represents the theme rules for each theme color in `options`.
 */
export const usesThemable = <TThemeName extends string = ThemeName>(factory : ((themeName: ThemeName) => CssStyleCollection) = themeOf, options : TThemeName[] = (themeOptions() as TThemeName[])): ThemableRules => {
    return {
        themableRule: () => style({
            ...variants([
                options.map((themeName) =>
                    ifTheme(themeName,
                        factory(themeName)
                    )
                ),
            ]),
        }),
        themableVars,
    };
};

/**
 * Creates a theme rules for the given `themeName`.
 * @param themeName The theme name.
 * @returns A `CssRule` represents a theme rules for the given `themeName`.
 */
export const themeOf = (themeName: ThemeName): CssRule => style({
    ...vars({
        [themableVars.backg               ] : colors[   themeName       as keyof typeof colors], // base color
        [themableVars.foreg               ] : colors[`${themeName}Text` as keyof typeof colors], // light on dark base color | dark on light base color
        [themableVars.border              ] : colors[`${themeName}Bold` as keyof typeof colors], // 20% base color + 80% page's foreground
        [themableVars.altBackg            ] : themableVars.backgMild,
        [themableVars.altForeg            ] : themableVars.foregMild,
        
        [themableVars.foregOutlined       ] : themableVars.backg,
        [themableVars.altBackgOutlined    ] : themableVars.backg,
        [themableVars.altForegOutlined    ] : themableVars.foreg,
        
        [themableVars.backgMild           ] : colors[`${themeName}Mild` as keyof typeof colors], // 20% base color + 80% page's background
        [themableVars.foregMild           ] : themableVars.border,
        [themableVars.altBackgMild        ] : themableVars.backg,
        [themableVars.altForegMild        ] : themableVars.foreg,
        
        [themableVars.ring                ] : colors[`${themeName}Thin` as keyof typeof colors], // 50% transparency of base color
    }),
});

/**
 * Gets all available theme color options.
 * @returns A `ThemeName[]` represents all available theme color options.
 */
export const themeOptions = (): ThemeName[] => Object.keys(themes) as ThemeName[];



export interface ThemableProps<TThemeName extends string = ThemeName> {
    theme ?: TThemeName
}
export const useThemable = <TThemeName extends string = ThemeName>({theme}: ThemableProps<TThemeName>) => ({
    class: theme ? `th${pascalCase(theme)}` : null,
});
//#endregion themable
