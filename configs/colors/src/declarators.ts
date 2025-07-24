// Types:
import {
    type CssColor,
}                           from './types.js'

// Utilities:
import {
    adjustLightness,
    contrastFlip,
    adjustOpacity,
}                           from './utilities.js'

// Configs:
import {
    colorParamVars,
}                           from './color-params.js'
import {
    colorVars,
    colorExpressions,
}                           from './colors.js'



/**
 * Defines a theme by mapping the given `themeName` to its corresponding colors.
 * 
 * @param themeName - The theme name.
 * @param rootColor - The base CSS color or CSS expression for the theme.
 */
export const defineTheme = (themeName: string, rootColor: CssColor | null | undefined): void => {
    // Validate parameters:
    if (!themeName) throw TypeError('The `themeName` cannot be empty.');
    
    
    
    // Constants:
    
    // Root Color:
    colorExpressions[themeName] = (
        // Upsert variable:
        rootColor
        
        ||
        
        // Delete variable:
        (null as unknown as keyof typeof colorExpressions)
    );
    const rootColorVar = rootColor ? colorVars[themeName] : null;
    
    
    
    // Background colors:
    
    // Base Color:
    colorExpressions[`${themeName}Base`] = rootColorVar ? adjustLightness(rootColorVar, colorParamVars.base) : (null as unknown as keyof typeof colorExpressions);
    
    // Mild Color:
    colorExpressions[`${themeName}Mild`] = rootColorVar ? adjustLightness(rootColorVar, colorParamVars.mild) : (null as unknown as keyof typeof colorExpressions);
    
    
    
    // Foreground colors:
    
    // Flip Color:
    colorExpressions[`${themeName}Flip`] = rootColorVar ? contrastFlip(   rootColorVar, colorParamVars.flip) : (null as unknown as keyof typeof colorExpressions);
    
    // Text Color:
    colorExpressions[`${themeName}Text`] = rootColorVar ? adjustLightness(rootColorVar, colorParamVars.text) : (null as unknown as keyof typeof colorExpressions);
    
    // Face Color:
    colorExpressions[`${themeName}Face`] = rootColorVar ? adjustLightness(rootColorVar, colorParamVars.face) : (null as unknown as keyof typeof colorExpressions);
    
    
    
    // Border colors:
    
    // Bold Color:
    colorExpressions[`${themeName}Bold`] = rootColorVar ? adjustLightness(rootColorVar, colorParamVars.bold) : (null as unknown as keyof typeof colorExpressions);
    
    // Thin Color:
    colorExpressions[`${themeName}Thin`] = rootColorVar ? adjustLightness(rootColorVar, colorParamVars.thin) : (null as unknown as keyof typeof colorExpressions);
    
    // Edge Color:
    colorExpressions[`${themeName}Edge`] = rootColorVar ? adjustLightness(rootColorVar, colorParamVars.edge) : (null as unknown as keyof typeof colorExpressions);
    
    
    
    // Effect colors:
    
    // Soft Color:
    colorExpressions[`${themeName}Soft`] = rootColorVar ? adjustOpacity(  rootColorVar, colorParamVars.soft) : (null as unknown as keyof typeof colorExpressions);
};

/**
 * Deletes a theme by resetting its mapped color values.
 * 
 * @param themeName - The theme name.
 */
export const deleteTheme = (themeName: string): void => {
    defineTheme(themeName, null);
};
