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
const themeNamesCache = new Set<string>([
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
 * @param themeName - The theme name.
 * @param rootColor - The base CSS color or CSS expression for the theme.
 */
export const defineTheme = (themeName: string, rootColor: CssColor | null | undefined): void => {
    // Validate parameters:
    if (!themeName) throw TypeError('The `themeName` cannot be empty.');
    
    
    
    // Caches:
    if (rootColor) {
        // Register the theme name:
        themeNamesCache.add(themeName);
    }
    else {
        // Unregister the theme name:
        themeNamesCache.delete(themeName);
    } // if
    
    
    
    // Constants:
    
    // Root Color:
    colorConfigExpressions[themeName] = (
        // Upsert variable:
        rootColor
        
        ||
        
        // Delete variable:
        (null as unknown as keyof typeof colorConfigExpressions)
    );
    const rootColorVar = rootColor ? colorConfigVars[themeName] : null;
    
    
    
    // Background colors:
    
    // Base Color:
    colorConfigExpressions[`${themeName}Base`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.base) : (null as unknown as keyof typeof colorConfigExpressions);
    
    // Mild Color:
    colorConfigExpressions[`${themeName}Mild`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.mild) : (null as unknown as keyof typeof colorConfigExpressions);
    
    
    
    // Foreground colors:
    
    // Flip Color:
    colorConfigExpressions[`${themeName}Flip`] = rootColorVar ? contrastFlip(   rootColorVar, colorParamConfigVars.flip) : (null as unknown as keyof typeof colorConfigExpressions);
    
    // Text Color:
    colorConfigExpressions[`${themeName}Text`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.text) : (null as unknown as keyof typeof colorConfigExpressions);
    
    // Face Color:
    colorConfigExpressions[`${themeName}Face`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.face) : (null as unknown as keyof typeof colorConfigExpressions);
    
    
    
    // Border colors:
    
    // Bold Color:
    colorConfigExpressions[`${themeName}Bold`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.bold) : (null as unknown as keyof typeof colorConfigExpressions);
    
    // Thin Color:
    colorConfigExpressions[`${themeName}Thin`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.thin) : (null as unknown as keyof typeof colorConfigExpressions);
    
    // Edge Color:
    colorConfigExpressions[`${themeName}Edge`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.edge) : (null as unknown as keyof typeof colorConfigExpressions);
    
    
    
    // Effect colors:
    
    // Soft Color:
    colorConfigExpressions[`${themeName}Soft`] = rootColorVar ? adjustOpacity(  rootColorVar, colorParamConfigVars.soft) : (null as unknown as keyof typeof colorConfigExpressions);
};

/**
 * Deletes a theme by resetting its mapped color values.
 * 
 * @param themeName - The theme name.
 */
export const deleteTheme = (themeName: string): void => {
    defineTheme(themeName, null);
};

/**
 * Retrieves the names of all registered themes.
 * 
 * @returns An array of theme names.
 */
export const getThemeNames = () => {
    return Array.from(themeNamesCache);
};
