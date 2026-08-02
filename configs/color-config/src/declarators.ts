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
    colorConfigVarDefs,
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
 * Defines a theme by mapping the given `theme` to its corresponding colors.
 * 
 * @param theme The theme name to define.
 * @param rootColor The base CSS color or CSS definition for the theme.
 */
export const defineTheme = (theme: string, rootColor: CssColor | null | undefined): void => {
    // Validate parameters:
    if (!theme) throw TypeError('The `theme` parameter cannot be empty.');
    
    
    
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
    colorConfigVarDefs[theme] = (
        // Upsert variable:
        rootColor
        
        ||
        
        // Delete variable:
        (null as unknown as keyof typeof colorConfigVarDefs)
    );
    const rootColorVar = rootColor ? colorConfigVars[theme] : null;
    
    
    
    // Background colors:
    
    // Base Color:
    colorConfigVarDefs[`${theme}Base`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.base) : (null as unknown as keyof typeof colorConfigVarDefs);
    
    // Mild Color:
    colorConfigVarDefs[`${theme}Mild`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.mild) : (null as unknown as keyof typeof colorConfigVarDefs);
    
    
    
    // Foreground colors:
    
    // Flip Color:
    colorConfigVarDefs[`${theme}Flip`] = rootColorVar ? contrastFlip(   rootColorVar, colorParamConfigVars.flip) : (null as unknown as keyof typeof colorConfigVarDefs);
    
    // Text Color:
    colorConfigVarDefs[`${theme}Text`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.text) : (null as unknown as keyof typeof colorConfigVarDefs);
    
    // Face Color:
    colorConfigVarDefs[`${theme}Face`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.face) : (null as unknown as keyof typeof colorConfigVarDefs);
    
    
    
    // Border colors:
    
    // Bold Color:
    colorConfigVarDefs[`${theme}Bold`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.bold) : (null as unknown as keyof typeof colorConfigVarDefs);
    
    // Thin Color:
    colorConfigVarDefs[`${theme}Thin`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.thin) : (null as unknown as keyof typeof colorConfigVarDefs);
    
    // Edge Color:
    colorConfigVarDefs[`${theme}Edge`] = rootColorVar ? adjustLightness(rootColorVar, colorParamConfigVars.edge) : (null as unknown as keyof typeof colorConfigVarDefs);
    
    
    
    // Effect colors:
    
    // Soft Color:
    colorConfigVarDefs[`${theme}Soft`] = rootColorVar ? adjustOpacity(  rootColorVar, colorParamConfigVars.soft) : (null as unknown as keyof typeof colorConfigVarDefs);
};

/**
 * Deletes a theme by resetting its mapped color values.
 * 
 * @param theme The theme name to delete.
 */
export const deleteTheme = (theme: string): void => {
    defineTheme(theme, null);
};

/**
 * Retrieves the registered theme names.
 * 
 * @returns An array of theme names.
 */
export const getThemes = () => {
    return Array.from(themesCache);
};
