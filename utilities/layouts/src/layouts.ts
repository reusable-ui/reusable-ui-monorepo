import {
    // writes css in javascript:
    style,
    imports,
}                           from '@cssfn/core'          // writes css in javascript



/**
 * A dummy text content, for making parent's height as tall as current text line-height.  
 * The dummy is also used for calibrating the flex's vertical position.
 */
export const fillTextLineHeightLayout = () => style({
    // layouts:
    content    : '"\xa0"',       // &nbsp;
    display    : 'inline-block', // use inline-block, so we can kill the width
    
    
    
    // appearances:
    overflow   : 'hidden',       // crop the text width (&nbsp;)
    visibility : 'hidden',       // hide the element, but still consumes the dimension
    
    
    
    // sizes:
    inlineSize : 0,              // kill the width, we just need the height
});

/**
 * A dummy text content, for making parent's width as wide as current text line-height (rotated 90°).  
 * The dummy is also used for calibrating the flex's vertical position.
 */
export const fillTextLineWidthLayout = () => style({
    ...imports([
        fillTextLineHeightLayout(),
    ]),
    ...style({
        // layouts:
        writingMode : 'vertical-lr', // rotate the element 90°
        
        
        
        // appearances:
        overflow    : 'unset',       // fix Firefox bug
    }),
});
