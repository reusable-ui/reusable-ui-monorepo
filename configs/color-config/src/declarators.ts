// Types:
import {
    type CssColor,
}                           from './css-types.js'

// Utilities:
import {
    adjustLightness,
    contrastFlip,
    adjustOpacity,
}                           from './internal-utilities.js'

// Configs:
import {
    colorParamConfigVars,
}                           from './css-param-config.js'
import {
    colorConfigVars,
    colorConfigExpressions,
}                           from './css-config.js'



// Holds the names of all registered themes:
const themesCache = new Set<string>([
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark',
]);



/**
 * Defines a theme by mapping the given `themeName` to its corresponding colors.
 * 
 * @param theme - The theme name to define.
 * @param rootColor - The base CSS color or CSS expression for the theme.
 */
export const defineTheme = (theme: string, rootColor: CssColor | null | undefined): void => {
    // Validate parameters:
    if (!theme) throw TypeError('The `themeName` cannot be empty.');
    
    
    
    // Caches:
    if (rootColor) {
        // Register the theme name:
        themesCache.add(theme);
    }
    else {
        // Unregister the theme name:
        themesCache.delete(theme);
    } // if
    
    
    
    // Constants:
    
    // Root Color:
    colorConfigExpressions[theme] = (
        // Upsert variable:
        rootColor
        
        ||
        
        // Delete variable:
        (null as unknown as keyof typeof colorConfigExpressions)
    );
    const rootColorVar = rootColor ? colorConfigVars[theme] : null;
    
    
    
    // Background colors:
    
    // Base Color:
    colorConfigExpressions[`${theme}Base`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.base) : (null as unknown as keyof typeof colorConfigExpressions);
    
    // Mild Color:
    colorConfigExpressions[`${theme}Mild`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.mild) : (null as unknown as keyof typeof colorConfigExpressions);
    
    
    
    // Foreground colors:
    
    // Flip Color:
    colorConfigExpressions[`${theme}Flip`] = rootColorVar ? contrastFlip(   rootColorVar, colorParamConfigVars.flip) : (null as unknown as keyof typeof colorConfigExpressions);
    
    // Text Color:
    colorConfigExpressions[`${theme}Text`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.text) : (null as unknown as keyof typeof colorConfigExpressions);
    
    // Face Color:
    colorConfigExpressions[`${theme}Face`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.face) : (null as unknown as keyof typeof colorConfigExpressions);
    
    
    
    // Border colors:
    
    // Bold Color:
    colorConfigExpressions[`${theme}Bold`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.bold) : (null as unknown as keyof typeof colorConfigExpressions);
    
    // Thin Color:
    colorConfigExpressions[`${theme}Thin`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.thin) : (null as unknown as keyof typeof colorConfigExpressions);
    
    // Edge Color:
    colorConfigExpressions[`${theme}Edge`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.edge) : (null as unknown as keyof typeof colorConfigExpressions);
    
    
    
    // Effect colors:
    
    // Soft Color:
    colorConfigExpressions[`${theme}Soft`] = rootColorVar ? adjustOpacity(  rootColorVar, colorParamConfigVars.soft) : (null as unknown as keyof typeof colorConfigExpressions);
};

/**
 * Deletes a theme by resetting its mapped color values.
 * 
 * @param theme - The theme name to delete.
 */
export const deleteTheme = (theme: string): void => {
    defineTheme(theme, null);
};

/**
 * Retrieves the names of all registered themes.
 * 
 * @returns An array of theme names.
 */
export const getThemeNames = () => {
    return Array.from(themesCache);
};
