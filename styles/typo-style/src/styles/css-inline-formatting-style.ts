// Cssfn:
import {
    // Writes css in javascript:
    rule,
    globalScope,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui configs:
import {
    typoConfigVars,
}                           from '@reusable-ui/typo-config'         // Configures the typography system (font sizes, font families, font weights, line heights, and text wrapping rules) across all UI components.



// Styles:

export default [
    globalScope({
        // General rule for inline text elements:
        ...rule([
            // Text modifications:
            'del', 's', '.del', '.s', // Deleted text
            'ins', 'u', '.ins', '.u', // Inserted text
            
            
            
            // Emphases:
            'small', '.small',              // Reduced font size
            'strong', 'b', '.strong', '.b', // Bold text
            'em', 'i', '.em', '.i',         // Italicized text
            
            
            
            // Subscript and superscript:
            'sub', '.sub', // Subscript
            'sup', '.sup', // Superscript
        ], {
            // Layouts:
            display        : 'inline',
        }),
        
        
        
        // Text modifications:
        ...rule(['del', 's', '.del', '.s'], { // Deleted text
            // Typos:
            textDecoration : 'line-through',  // Applies strikethrough effect.
        }),
        ...rule(['ins', 'u', '.ins', '.u'], { // Inserted text
            // Typos:
            textDecoration : 'underline',     // Applies underline effect.
        }),
        
        
        
        // Emphases:
        ...rule(['small', '.small'], {                        // Reduced font size
            // Typos:
            fontSize       : typoConfigVars.fontSizeSm,       // Reduces font size for de-emphasis.
        }),
        ...rule(['strong', 'b', '.strong', '.b'], {           // Bold text
            // Typos:
            fontWeight     : typoConfigVars.fontWeightBolder, // Increases font weight for strong emphasis.
        }),
        ...rule(['em', 'i', '.em', '.i'], {                   // Italicized text
            // Typos:
            fontStyle      : 'italic',                        // Applies italics for emphasized text.
        }),
        
        
        
        // Subscript and superscript:
        ...rule(['sub', '.sub'], {    // Subscript
            // Typos:
            verticalAlign  : 'sub',   // Adjusts vertical alignment for subscript.
        }),
        ...rule(['sup', '.sup'], {    // Superscript
            // Typos:
            verticalAlign  : 'super', // Adjusts vertical alignment for superscript.
        }),
    }),
];
