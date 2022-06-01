import { 
// styles:
style, imports, } from '@cssfn/cssfn'; // writes css in javascript
/**
 * A dummy text content, for making parent's height as tall as current text line-height.
 * The dummy is also used for calibrating the flex's vertical position.
 */
export const fillTextLineHeightLayout = () => style({
    // layouts:
    content: '"\xa0"',
    display: 'inline-block',
    // appearances:
    overflow: 'hidden',
    visibility: 'hidden',
    // sizes:
    inlineSize: 0, // kill the width, we just need the height
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
        writingMode: 'vertical-lr',
        // appearances:
        overflow: 'unset', // fix Firefox bug
    }),
});
