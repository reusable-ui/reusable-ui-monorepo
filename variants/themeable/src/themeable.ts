// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    
    type CssSelector,
    
    type CssClassName,
    
    
    
    // Writes css in javascript:
    rule,
    variants,
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
    cssVars,
    
    
    
    // Writes complex stylesheets in simpler way:
    memoizeResult,
    memoizeStyle,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Reusable-ui configs:
import {
    // configs:
    colorVars,
    getThemeNames,
    colorConfig,
}                           from '@reusable-ui/colors'          // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.

// Reusable-ui variants:
import {
    // Types:
    type BasicTheme,
    type ThemeVariantProps,
    
    
    
    // Hooks:
    useThemeVariant,
    
    
    
    // Utilities:
    themeSelector,
    ifTheme,
}                           from '@reusable-ui/theme-variant'    // A utility for managing themes consistently across React components.



/**
 * @deprecated - Use `BasicTheme` instead.
 */
export type ThemeName = BasicTheme

/**
 * @deprecated - Use `ThemeVariantVars` instead.
 */
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



const themeClassesCache          = new Map<ThemeName, CssClassName|null>();

/**
 * @deprecated - Use `themeSelector(themeName).slice(1)` instead.
 */
export const createThemeClass    = (themeName: ThemeName): CssClassName|null => {
    const cached = themeClassesCache.get(themeName);
    if (cached !== undefined) return cached; // null is allowed
    
    
    
    const themeClass = (themeSelector(themeName) as string).slice(1);
    themeClassesCache.set(themeName, themeClass);
    return themeClass;
};

/**
 * @deprecated - Use `themeSelector` instead.
 */
export const createThemeSelector = themeSelector;

let hasThemeSelectorsCache       : CssSelector[] | undefined = undefined;
let noThemeSelectorsCache        : CssSelector   | undefined = undefined;

colorConfig.onChange.subscribe(() => {
    themeClassesCache.clear();
    hasThemeSelectorsCache = undefined;
    noThemeSelectorsCache  = undefined;
});



// Not deprecated:
export { ifTheme }

/**
 * @deprecated - No longer needed.
 */
export const ifHasTheme = (styles: CssStyleCollection): CssRule => {
    return rule(
        hasThemeSelectorsCache ?? (hasThemeSelectorsCache = (
            getThemeNames()
            .map((themeName) => themeSelector(themeName))
            .filter((selector): selector is CssSelector => (selector !== null))
        ))
        ,
        styles
    );
};

/**
 * @deprecated - No longer needed.
 */
export const ifNoTheme = (styles: CssStyleCollection): CssRule => {
    return rule(
        noThemeSelectorsCache ?? (noThemeSelectorsCache = (`:not(:is(${
            getThemeNames()
            .map((themeName) => themeSelector(themeName))
            .filter((selector): selector is CssSelector => (selector !== null))
            .join(', ')
        }))`))
        ,
        styles
    );
};



/**
 * @deprecated - Use `CssThemeVariant` instead.
 */
export interface ThemeableStuff { themeableRule: Lazy<CssRule>, themeableVars: CssVars<ThemeableVars> }

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
const getDefaultThemeableRule = memoizeStyle(() => createThemeableRule(), colorConfig.onChange);

/**
 * @deprecated - Use `usesThemeVariant` instead.
 * 
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
 * @deprecated - No longer needed.
 * 
 * Defines a theme rules for the given `themeName`.
 * @param themeName The theme name.
 * @returns A `CssRule` represents a theme rules for the given `themeName`.
 */
export const defineThemeRule = (themeName: ThemeName): CssRule => {
    return style({
        ...vars({
            // 🎨 Regular Style:
            [themeableVars.backg               ] : colorVars[`${themeName}Base`], // base color
            [themeableVars.foreg               ] : colorVars[`${themeName}Flip`], // light on dark base color | dark on light base color
            [themeableVars.border              ] : colorVars[`${themeName}Bold`], // 20% base color + 80% page's foreground
            [themeableVars.ring                ] : colorVars[`${themeName}Soft`], // 50% transparency of base color
            
            [themeableVars.altBackg            ] : colorVars[`${themeName}Mild`], // Invert regular
            [themeableVars.altForeg            ] : colorVars[`${themeName}Text`], // Invert regular
            
            
            
            // 🌸 Mild Style:
            [themeableVars.backgMild           ] : colorVars[`${themeName}Mild`], // 20% base color + 80% page's background
            [themeableVars.foregMild           ] : colorVars[`${themeName}Text`],
            
            [themeableVars.altBackgMild        ] : colorVars[`${themeName}Base`], // Invert mild
            [themeableVars.altForegMild        ] : colorVars[`${themeName}Flip`], // Invert mild
            
            
            
            // 🧊 Outlined Style:
            [themeableVars.foregOutlined       ] : colorVars[`${themeName}Face`], // Edge-contrast foreground
            
            [themeableVars.altBackgOutlined    ] : colorVars[`${themeName}Base`], // Invert outlined
            [themeableVars.altForegOutlined    ] : colorVars[`${themeName}Flip`], // Invert outlined
        }),
    });
};

/**
 * @deprecated - Use `getThemeNames` from '@reusable-ui/colors' instead.
 * 
 * Gets all available theme color options.
 * @returns A `ThemeName[]` represents all available theme color options.
 */
export const themeOptions = memoizeResult((): ThemeName[] => {
    return (getThemeNames() as ThemeName[]);
}, colorConfig.onChange);



/**
 * @deprecated - Use `usesThemeOverride` instead.
 * 
 * Creates an conditional theme color rules for the given `themeName`.
 * @param themeName The theme name as the conditional theme color -or- `null` for undefining the conditional.
 * @returns A `CssRule` represents an conditional theme color rules for the given `themeName`.
 */
export const usesThemeConditional = (themeName: ThemeName|null): CssRule => style({
    ...vars({
        // 🎨 Regular Style:
        [themeableVars.backgCond           ] : !themeName ? null : colorVars[`${themeName}Base`], // base color
        [themeableVars.foregCond           ] : !themeName ? null : colorVars[`${themeName}Flip`], // light on dark base color | dark on light base color
        [themeableVars.borderCond          ] : !themeName ? null : colorVars[`${themeName}Bold`], // 20% base color + 80% page's foreground
        [themeableVars.ringCond            ] : !themeName ? null : colorVars[`${themeName}Soft`], // 50% transparency of base color
        
        [themeableVars.altBackgCond        ] : !themeName ? null : colorVars[`${themeName}Mild`], // Invert regular
        [themeableVars.altForegCond        ] : !themeName ? null : colorVars[`${themeName}Text`], // Invert regular
        
        
        
        // 🌸 Mild Style:
        [themeableVars.backgMildCond       ] : !themeName ? null : colorVars[`${themeName}Mild`], // 20% base color + 80% page's background
        [themeableVars.foregMildCond       ] : !themeName ? null : colorVars[`${themeName}Text`],
        
        [themeableVars.altBackgMildCond    ] : !themeName ? null : colorVars[`${themeName}Base`], // Invert mild
        [themeableVars.altForegMildCond    ] : !themeName ? null : colorVars[`${themeName}Flip`], // Invert mild
        
        
        
        // 🧊 Outlined Style:
        [themeableVars.foregOutlinedCond   ] : !themeName ? null : colorVars[`${themeName}Face`], // Edge-contrast foreground
        
        [themeableVars.altBackgOutlinedCond] : !themeName ? null : colorVars[`${themeName}Base`], // Invert outlined
        [themeableVars.altForegOutlinedCond] : !themeName ? null : colorVars[`${themeName}Flip`], // Invert outlined
    }),
});



/**
 * @deprecated - Use `ThemeVariantProps` instead.
 */
export interface ThemeableProps extends ThemeVariantProps<string> { }

/**
 * @deprecated - Use `useThemeVariant` instead.
 */
export const useThemeable = (props: ThemeableProps) => {
    const {
        themeClassname,
    } = useThemeVariant(props);
    return {
        class: themeClassname,
    };
};
