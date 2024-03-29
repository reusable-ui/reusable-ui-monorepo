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
    
    
    
    // writes complex stylesheets in simpler way:
    memoizeResult,
    memoizeStyle,
    memoizeStyleWithVariants,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui configs:
import {
    // configs:
    colors,
    themes,
    cssColorConfig,
}                           from '@reusable-ui/colors'          // a color management system



// defaults:
const _defaultTheme : Required<ThemeableProps>['theme'] = 'inherit'



// hooks:

// variants:

//#region themeable
export type ThemeName = (keyof typeof themes) | (string & {})
export interface ThemeableVars {
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
const [themeableVars] = cssVars<ThemeableVars>({ prefix: 'th', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



//#region caches
const themeClassesCache          = new Map<ThemeName, CssClassName|null>();
export const createThemeClass    = (themeName: ThemeName): CssClassName|null => {
    const cached = themeClassesCache.get(themeName);
    if (cached !== undefined) return cached; // null is allowed
    
    
    
    if (themeName === 'inherit') {
        themeClassesCache.set(themeName, null);
        return null;
    } // if
    
    
    
    const themeClass = `th${startsCapitalized(themeName)}`;
    themeClassesCache.set(themeName, themeClass);
    return themeClass;
};

const themeSelectorsCache        = new Map<ThemeName, CssSelector|null>();
export const createThemeSelector = (themeName: ThemeName): CssSelector|null => {
    const cached = themeSelectorsCache.get(themeName);
    if (cached) return cached;
    
    
    
    const themeClass = createThemeClass(themeName);
    if (themeClass === null) return null;
    
    
    
    const themeRule : CssSelector = `.${themeClass}`;
    themeSelectorsCache.set(themeName, themeRule);
    return themeRule;
};

let hasThemeSelectorsCache       : CssSelector[] | undefined = undefined;
let noThemeSelectorsCache        : CssSelector   | undefined = undefined;

cssColorConfig.onChange.subscribe(() => {
    themeClassesCache.clear();
    themeSelectorsCache.clear();
    hasThemeSelectorsCache = undefined;
    noThemeSelectorsCache  = undefined;
});
//#endregion caches



export const ifTheme = (themeName: ThemeName, styles: CssStyleCollection): CssRule => rule(createThemeSelector(themeName), styles);
export const ifHasTheme = (styles: CssStyleCollection): CssRule => {
    return rule(
        hasThemeSelectorsCache ?? (hasThemeSelectorsCache = (
            Object.keys(themes)
            .map((themeName) => createThemeSelector(themeName))
            .filter((selector): selector is CssSelector => (selector !== null))
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
            .filter((selector): selector is CssSelector => (selector !== null))
            .join(', ')
        }))`))
        ,
        styles
    );
};



export interface ThemeableStuff { themeableRule: Factory<CssRule>, themeableVars: CssVars<ThemeableVars> }
const createThemeableRule = (themeDefinition : ((themeName: ThemeName) => CssStyleCollection) = defineThemeRule, options : ThemeName[] = themeOptions()): CssRule => {
    return style({
        ...variants([
            options.map((themeName) =>
                ifTheme(themeName,
                    themeDefinition(themeName)
                )
            ),
        ]),
    });
};
const getDefaultThemeableRule = memoizeStyle(() => createThemeableRule(), cssColorConfig.onChange);
/**
 * Uses theme (color) options.  
 * For example: `primary`, `success`, `danger`.
 * @param themeDefinition A callback to create a theme rules for each theme color in `options`.
 * @param options Defines all available theme color options.
 * @returns A `ThemeableStuff` represents the theme rules for each theme color in `options`.
 */
export const usesThemeable = (themeDefinition : ((themeName: ThemeName) => CssStyleCollection) = defineThemeRule, options : ThemeName[] = themeOptions()): ThemeableStuff => {
    return {
        themeableRule: (
            ((themeDefinition === defineThemeRule) && (options === themeOptions()))
            ?
            getDefaultThemeableRule
            :
            () => createThemeableRule(themeDefinition, options)
        ),
        themeableVars,
    };
};

/**
 * Defines a theme rules for the given `themeName`.
 * @param themeName The theme name.
 * @returns A `CssRule` represents a theme rules for the given `themeName`.
 */
export const defineThemeRule = memoizeStyleWithVariants((themeName: ThemeName): CssRule => {
    return style({
        ...vars({
            [themeableVars.backg               ] : colors[   themeName       as keyof typeof colors], // base color
            [themeableVars.foreg               ] : colors[`${themeName}Text` as keyof typeof colors], // light on dark base color | dark on light base color
            [themeableVars.border              ] : colors[`${themeName}Bold` as keyof typeof colors], // 20% base color + 80% page's foreground
            [themeableVars.altBackg            ] : themeableVars.backgMild,
            [themeableVars.altForeg            ] : themeableVars.foregMild,
            
            [themeableVars.foregOutlined       ] : themeableVars.backg,
            [themeableVars.altBackgOutlined    ] : themeableVars.backg,
            [themeableVars.altForegOutlined    ] : themeableVars.foreg,
            
            [themeableVars.backgMild           ] : colors[`${themeName}Mild` as keyof typeof colors], // 20% base color + 80% page's background
            [themeableVars.foregMild           ] : themeableVars.border,
            [themeableVars.altBackgMild        ] : themeableVars.backg,
            [themeableVars.altForegMild        ] : themeableVars.foreg,
            
            [themeableVars.ring                ] : colors[`${themeName}Thin` as keyof typeof colors], // 50% transparency of base color
        }),
    });
}, cssColorConfig.onChange);

/**
 * Gets all available theme color options.
 * @returns A `ThemeName[]` represents all available theme color options.
 */
export const themeOptions = memoizeResult((): ThemeName[] => {
    return (Object.keys(themes) as ThemeName[]);
}, cssColorConfig.onChange);



/**
 * Creates an conditional theme color rules for the given `themeName`.
 * @param themeName The theme name as the conditional theme color -or- `null` for undefining the conditional.
 * @returns A `CssRule` represents an conditional theme color rules for the given `themeName`.
 */
export const usesThemeConditional = (themeName: ThemeName|null): CssRule => style({
    ...vars({
        [themeableVars.backgCond           ] : !themeName ? null : colors[   themeName       as keyof typeof colors], // base color
        [themeableVars.foregCond           ] : !themeName ? null : colors[`${themeName}Text` as keyof typeof colors], // light on dark base color | dark on light base color
        [themeableVars.borderCond          ] : !themeName ? null : colors[`${themeName}Bold` as keyof typeof colors], // 20% base color + 80% page's foreground
        [themeableVars.altBackgCond        ] : themeableVars.backgMildCond,
        [themeableVars.altForegCond        ] : themeableVars.foregMildCond,
        
        [themeableVars.foregOutlinedCond   ] : !themeName ? null : themeableVars.backgCond,
        [themeableVars.altBackgOutlinedCond] : themeableVars.backgCond,
        [themeableVars.altForegOutlinedCond] : themeableVars.foregCond,
        
        [themeableVars.backgMildCond       ] : !themeName ? null : colors[`${themeName}Mild` as keyof typeof colors], // 20% base color + 80% page's background
        [themeableVars.foregMildCond       ] : !themeName ? null : themeableVars.borderCond,
        [themeableVars.altBackgMildCond    ] : themeableVars.backgCond,
        [themeableVars.altForegMildCond    ] : themeableVars.foregCond,
        
        [themeableVars.ringCond            ] : !themeName ? null : colors[`${themeName}Thin` as keyof typeof colors], // 50% transparency of base color
    }),
});



export interface ThemeableProps {
    // variants:
    theme ?: ThemeName|'inherit'
}
export const useThemeable = ({theme = _defaultTheme}: ThemeableProps) => ({
    class: (theme === 'inherit') ? null : createThemeClass(theme),
});
//#endregion themeable
