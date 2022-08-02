// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'                 // cssfn general types
import type {
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
    
    
    
    // utilities:
    pascalCase,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // utilities:
    cssVar,
}                           from '@cssfn/css-var'               // strongly typed of css variables

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



export const ifTheme = (themeName: ThemeName, styles: CssStyleCollection): CssRule => rule(`.th${pascalCase(themeName)}`, styles);
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
export const usesThemable = (factory : ((themeName: ThemeName) => CssStyleCollection) = themeOf, options : ThemeName[] = themeOptions()): ThemableRules => {
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



/**
 * Creates a default theme color rules.
 * @param themeName The theme name as the default theme color -or- `null` for *auto* theme.
 * @returns A `CssRule` represents a default theme color rules.
 */
export const usesThemeDefault     = (themeName: ThemeName|null = null): CssRule => usesThemeConditional(themeName);

/**
 * Creates a conditional theme color rules for the given `themeName`.
 * @param themeName The theme name as the conditional theme color -or- `null` for undefining the conditional.
 * @returns A `CssRule` represents a conditional theme color rules for the given `themeName`.
 */
export const usesThemeConditional = (themeName: ThemeName|null): CssRule => style({
    ...vars({
        [themableVars.backgCond           ] : !themeName ? null : colors[   themeName       as keyof typeof colors], // base color
        [themableVars.foregCond           ] : !themeName ? null : colors[`${themeName}Text` as keyof typeof colors], // light on dark base color | dark on light base color
        [themableVars.borderCond          ] : !themeName ? null : colors[`${themeName}Bold` as keyof typeof colors], // 20% base color + 80% page's foreground
        [themableVars.altBackgCond        ] : themableVars.backgMildCond,
        [themableVars.altForegCond        ] : themableVars.foregMildCond,
        
        [themableVars.foregOutlinedCond   ] : !themeName ? null : themableVars.backgCond,
        [themableVars.altBackgOutlinedCond] : themableVars.backgCond,
        [themableVars.altForegOutlinedCond] : themableVars.foregCond,
        
        [themableVars.backgMildCond       ] : !themeName ? null : colors[`${themeName}Mild` as keyof typeof colors], // 20% base color + 80% page's background
        [themableVars.foregMildCond       ] : !themeName ? null : themableVars.borderCond,
        [themableVars.altBackgMildCond    ] : themableVars.backgCond,
        [themableVars.altForegMildCond    ] : themableVars.foregCond,
        
        [themableVars.ringCond            ] : !themeName ? null : colors[`${themeName}Thin` as keyof typeof colors], // 50% transparency of base color
    }),
});

/**
 * Creates an important conditional theme color rules for the given `themeName`.
 * @param themeName The theme name as the important conditional theme color -or- `null` for undefining the important conditional.
 * @returns A `CssRule` represents an important conditional theme color rules for the given `themeName`.
 */
export const usesThemeImportant   = (themeName: ThemeName|null): CssRule => style({
    ...vars({
        [themableVars.backgImpt           ] : !themeName ? null : colors[   themeName       as keyof typeof colors], // base color
        [themableVars.foregImpt           ] : !themeName ? null : colors[`${themeName}Text` as keyof typeof colors], // light on dark base color | dark on light base color
        [themableVars.borderImpt          ] : !themeName ? null : colors[`${themeName}Bold` as keyof typeof colors], // 20% base color + 80% page's foreground
        [themableVars.altBackgImpt        ] : themableVars.backgMildImpt,
        [themableVars.altForegImpt        ] : themableVars.foregMildImpt,
        
        [themableVars.foregOutlinedImpt   ] : !themeName ? null : themableVars.backgImpt,
        [themableVars.altBackgOutlinedImpt] : themableVars.backgImpt,
        [themableVars.altForegOutlinedImpt] : themableVars.foregImpt,
        
        [themableVars.backgMildImpt       ] : !themeName ? null : colors[`${themeName}Mild` as keyof typeof colors], // 20% base color + 80% page's background
        [themableVars.foregMildImpt       ] : !themeName ? null : themableVars.borderImpt,
        [themableVars.altBackgMildImpt    ] : themableVars.backgImpt,
        [themableVars.altForegMildImpt    ] : themableVars.foregImpt,
        
        [themableVars.ringImpt            ] : !themeName ? null : colors[`${themeName}Thin` as keyof typeof colors], // 50% transparency of base color
    }),
});



export interface ThemableProps {
    theme ?: ThemeName
}
export const useThemable = ({theme}: ThemableProps) => ({
    class: theme ? `th${pascalCase(theme)}` : null,
});
//#endregion themable
