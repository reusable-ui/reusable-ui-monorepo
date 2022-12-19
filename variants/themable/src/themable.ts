// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssRule,
    CssStyleCollection,
    
    CssSelector,
    
    CssClassName,
    
    
    
    // writes css in javascript:
    rule,
    variants,
    style,
    vars,
    startsCapitalized,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui configs:
import {
    // configs:
    colors,
    themes,
    cssColorConfig,
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
}
const [themableVars] = cssVars<ThemableVars>();



//#region caches
const themeClassesCache = new Map<ThemeName, CssClassName>();
export const createThemeClass = (themeName: ThemeName): CssClassName => {
    const cached = themeClassesCache.get(themeName);
    if (cached !== undefined) return cached;
    
    
    
    const themeClass = `th${startsCapitalized(themeName)}`;
    themeClassesCache.set(themeName, themeClass);
    return themeClass;
};

const themeSelectorsCache = new Map<ThemeName, CssSelector>();
export const createThemeSelector = (themeName: ThemeName): CssSelector => {
    const cached = themeSelectorsCache.get(themeName);
    if (cached !== undefined) return cached;
    
    
    
    const themeRule : CssSelector = `.${createThemeClass(themeName)}`;
    themeSelectorsCache.set(themeName, themeRule);
    return themeRule;
};

let hasThemeSelectorsCache : CssSelector[] | null = null;
let noThemeSelectorsCache  : CssSelector   | null = null;

const themeDefinitionsCache = new Map<ThemeName, CssRule>();

cssColorConfig.onChange.subscribe(() => {
    themeClassesCache.clear();
    themeSelectorsCache.clear();
    hasThemeSelectorsCache = null;
    noThemeSelectorsCache  = null;
    themeDefinitionsCache.clear();
});
//#endregion caches



export const ifTheme = (themeName: ThemeName, styles: CssStyleCollection): CssRule => rule(createThemeSelector(themeName), styles);
export const ifHasTheme = (styles: CssStyleCollection): CssRule => {
    return rule(
        hasThemeSelectorsCache ?? (hasThemeSelectorsCache = (
            Object.keys(themes)
            .map((themeName) => createThemeSelector(themeName))
        ))
        ,
        styles
    );
};
export const ifNoTheme = (styles: CssStyleCollection): CssRule => {
    return rule(
        noThemeSelectorsCache ?? (noThemeSelectorsCache = (`:not(:is(${
            Object.keys(themes)
            .map((themeName) => createThemeSelector(themeName))
            .join(', ')
        }))`))
        ,
        styles
    );
};



export interface ThemableStuff { themableRule: Factory<CssRule>, themableVars: CssVars<ThemableVars> }
/**
 * Uses theme (color) options.  
 * For example: `primary`, `success`, `danger`.
 * @param themeDefinition A callback to create a theme rules for each theme color in `options`.
 * @param options Defines all available theme color options.
 * @returns A `ThemableStuff` represents the theme rules for each theme color in `options`.
 */
export const usesThemable = (themeDefinition : ((themeName: ThemeName) => CssStyleCollection) = defineTheme, options : ThemeName[] = themeOptions()): ThemableStuff => {
    return {
        themableRule: () => style({
            ...variants([
                options.map((themeName) =>
                    ifTheme(themeName,
                        themeDefinition(themeName)
                    )
                ),
            ]),
        }),
        themableVars,
    };
};

/**
 * Defines a theme rules for the given `themeName`.
 * @param themeName The theme name.
 * @returns A `CssRule` represents a theme rules for the given `themeName`.
 */
export const defineTheme = (themeName: ThemeName): CssRule => {
    const cached = themeDefinitionsCache.get(themeName);
    if (cached !== undefined) return cached;
    
    
    
    const themeDef = style({
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
    themeDefinitionsCache.set(themeName, themeDef);
    return themeDef;
};

/**
 * Gets all available theme color options.
 * @returns A `ThemeName[]` represents all available theme color options.
 */
export const themeOptions = (): ThemeName[] => Object.keys(themes) as ThemeName[];



/**
 * Creates an conditional theme color rules for the given `themeName`.
 * @param themeName The theme name as the conditional theme color -or- `null` for undefining the conditional.
 * @returns A `CssRule` represents an conditional theme color rules for the given `themeName`.
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



export interface ThemableProps {
    // variants:
    theme ?: ThemeName
}
export const useThemable = ({theme}: ThemableProps) => ({
    class: theme ? createThemeClass(theme) : null,
});
//#endregion themable
