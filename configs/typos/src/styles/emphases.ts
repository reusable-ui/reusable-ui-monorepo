// Cssfn:
import {
    // Writes css in javascript:
    rule,
    globalScope,
}                           from '@cssfn/core'          // Writes css in javascript.

// Configs:
import {
    typoVars,
}                           from '../configs/typography.js'



// Styles:

export default [
    globalScope({
        // General rule for inline text elements:
        ...rule([
            // Text modifications:
            'del', 's', '.delete',    // Deleted text
            'ins', 'u', '.insert',    // Inserted text
            
            
            
            // Emphases:
            'small', '.small',        // Reduced font size
            'strong', 'b', '.strong', // Bold text
            'em', 'i', '.emphasis',   // Italicized text
            
            
            
            // Subscript and superscript:
            'sub', '.subscript',      // Subscript
            'sup', '.superscript',    // Superscript
        ], {
            // Layouts:
            display        : 'inline',
        }),
        
        
        
        // Text modifications:
        ...rule(['del', 's', '.delete'], {   // Deleted text
            // Typos:
            textDecoration : 'line-through', // Applies strikethrough effect.
        }),
        ...rule(['ins', 'u', '.insert'], {   // Inserted text
            // Typos:
            textDecoration : 'underline',    // Applies underline effect.
        }),
        
        
        
        // Emphases:
        ...rule(['small', '.small'], {                  // Reduced font size
            // Typos:
            fontSize       : typoVars.fontSizeSm,       // Reduces font size for de-emphasis.
        }),
        ...rule(['strong', 'b', '.strong'], {           // Bold text
            // Typos:
            fontWeight     : typoVars.fontWeightBolder, // Increases font weight for strong emphasis.
        }),
        ...rule(['em', 'i', '.emphasis'], {             // Italicized text
            // Typos:
            fontStyle      : 'italic',                  // Applies italics for emphasized text.
        }),
        
        
        
        // Subscript and superscript:
        ...rule(['sub', '.subscript'], {   // Subscript
            // Typos:
            verticalAlign  : 'sub',        // Adjusts vertical alignment for subscript.
        }),
        ...rule(['sup', '.superscript'], { // Superscript
            // Typos:
            verticalAlign  : 'super',      // Adjusts vertical alignment for superscript.
        }),
    }),
];
