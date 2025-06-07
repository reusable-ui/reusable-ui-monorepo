// Cssfn:
import {
    // Writes css in javascript:
    style,
}                           from '@cssfn/core'          // Writes css in javascript.



/**
 * @deprecated - Use `blockSize: '1lh'` instead.
 * 
 * Ensures a **container’s height matches the text's line-height** using a hidden dummy element.  
 *
 * - Historically used for aligning inline elements (e.g., `<Check>`, `<Badge>`) with surrounding text.
 * - Relies on an invisible `&nbsp;` character to force correct height calculation.
 * - Now replaced by `blockSize: '1lh'`, which directly sets height to line-height.
 */
export const fillTextLineHeightLayout = () => style({
    // Layouts:
    content    : '"\xa0"',       // Hidden non-breaking space (`&nbsp;`).
    display    : 'inline-block', // Ensures proper height calculation.
    
    
    
    // Appearances:
    overflow   : 'hidden',       // Prevents unintended width expansion.
    visibility : 'hidden',       // Keeps it invisible while maintaining its effect.
    
    
    
    // Sizes:
    inlineSize : 0,              // Width is unnecessary; height is the only requirement.
});

/**
 * @deprecated - Use `inlineSize: '1lh'` instead.
 * 
 * Ensures a **container’s width matches the text’s line-height** using a rotated dummy element.  
 *
 * - Previously used for aligning inline elements horizontally when rotated (e.g., vertical badges).
 * - Uses a rotated `&nbsp;` to force correct width calculation based on line-height.
 * - Now replaced by `inlineSize: '1lh'`, which directly applies width equivalent to line-height.
 */
export const fillTextLineWidthLayout = () => style({
    // Layouts:
    ...fillTextLineHeightLayout(),
    ...style({
        // Layouts:
        writingMode : 'vertical-lr', // Rotates element 90° to force width alignment.
        
        
        
        // Appearances:
        overflow    : 'unset',       // Fixes Firefox rendering inconsistencies.
    }),
});
