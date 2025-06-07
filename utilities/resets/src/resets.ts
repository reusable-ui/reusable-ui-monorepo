// Cssfn:
import {
    // Cssfn css specific types:
    CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
    fallback,
    ifActive,
    children,
    style,
}                           from '@cssfn/core'          // Writes css in javascript.



// Constants:
const unset = 'unset';
const none  = 'none';



/**
 * **Resets browser styling for focusable elements** (`:focus`, `:focus-visible`).
 *
 * - Removes default focus outline, allowing full customization.
 */
export const resetFocusableElement = () => style({
    ...rule([':focus', ':focus-visible'], {
        // Borders:
        outline       : unset, // Clears default focus outline.
        outlineOffset : unset, // Removes focus offset.
    }),
});

/**
 * **Resets browser styling for form controls** (`<input>`, `<textarea>`, `<button>`, etc.).
 *
 * - Removes default styling for text fields, buttons, and other interactive elements.
 * - Applies a neutral base for custom UI components.
 */
export const resetControl = () => style({
    // Resets:
    ...resetFocusableElement(),   // Resets focus-related styling.
    
    
    
    // Layouts:
    ...style({
        // Layouts:
        appearance      : none,   // Standardizes control appearance.
        
        
        
        // Sizes:
        boxSizing       : unset,  // Neutralizes sizing behavior.
        
        
        
        // Accessibilities:
        cursor          : unset,  // Removes browser-imposed cursors.
        
        
        
        // Backgrounds:
        backgroundColor : unset,  // Clears default background.
        
        
        
        // Foregrounds:
        color           : unset,  // Neutralizes text color.
        
        
        
        // Borders:
        border          : unset,  // Removes default border.
        borderRadius    : unset,  // Clears rounded corners.
        
        
        
        // Spacings:
        margin          : unset,  // Removes spacing.
        padding         : unset,  // Resets padding.
        
        
        
        // Typos:
        font            : unset,  // Clears font settings.
        textRendering   : unset,  // Ensures standard text rendering.
        textTransform   : unset,  // Prevents automatic text transformations.
        textIndent      : unset,  // Neutralizes indentation.
        textShadow      : unset,  // Removes default text shadow.
        textAlign       : unset,  // Standardizes text alignment.
        letterSpacing   : unset,  // Resets character spacing.
        wordSpacing     : unset,  // Neutralizes word spacing.
    }),
});

/**
 * **Resets browser styling for hyperlinks** (`<a>`).
 *
 * - Prevents default styles for links, ensuring full customization.
 */
export const resetLink = () => style({
    // Resets:
    ...resetFocusableElement(),  // Removes focus effects.
    
    
    
    // Layouts:
    ...style({
        // Accessibilities:
        cursor         : unset,  // Clears hand pointer style.
        
        
        
        // Foregrounds:
        color          : unset,  // Removes default blue color.
        
        
        
        // Typos:
        textDecoration : unset,  // Eliminates underline.
        
        
        
        // States:
        ...ifActive({
            // Foregrounds:
            color      : unset,  // Removes active link color.
        }),
    }),
});

/**
 * **Resets browser styling for `<input>` fields with text-like behavior**.
 * 
 * Supports:  
 * `text`, `search`, `password`, `email`, `tel`, `url`, `number`, `time`, `week`, `date`, `datetime-local`, `month`
 * 
 * - Standardizes input rendering across browsers.
 * - Removes unnecessary UI elements (search cancel button, spin buttons).
 */
export const resetTextbox = () => style({
    // Resets:
    ...resetControl(), // Resets control-related styling.
    
    
    
    // Layouts:
    ...style({
        // Layouts:
        MozAppearance  : 'textfield', // Ensures Firefox-specific consistency.
        
        
        
        // States:
        ...rule([':valid', ':invalid'], {
            // Borders:
            boxShadow  : unset, // Removes validation box shadow effects.
        }),
        
        
        
        // Children:
        ...children(['::-webkit-calendar-picker-indicator', '::-webkit-inner-spin-button', '::-webkit-search-cancel-button'], {
            // Layouts:
            appearance : none, // Hides browser UI components.
            display    : none, // Hides browser UI components.
        }),
    }),
});

export const rangeTrackElm : CssSelectorCollection = [
    '::-webkit-slider-runnable-track',
    '::-moz-range-track',
    '::-ms-track',
];
export const rangeThumbElm : CssSelectorCollection = [
    '::-webkit-slider-thumb',
    '::-moz-range-thumb',
    '::-ms-thumb',
];

/**
 * **Resets browser styling for `<input type="range">`**.
 * 
 * - Standardizes track & thumb styling across browsers.
 * - Ensures consistent behavior and appearance.
 */
export const resetRange = () => style({
    // Resets:
    ...resetControl(), // Resets default control styling.
    
    
    
    // Layouts:
    ...style({
        // Children:
        ...children([rangeTrackElm, rangeThumbElm], {
            // Resets:
            ...resetControl(), // Ensures consistency across browsers.
        }, { performGrouping: false }), // Prevents selector failures due to unsupported elements.
    }),
});

/**
 * **Resets browser styling for lists** (`<ul>`, `<ol>`, `<li>`).
 * 
 * - Removes default bullet points and list item spacing.
 * - Allows for full customization of list styles.
 */
export const resetList = () => style({
    // Layouts:
    listStyleType      : none,  // Removes default list bullets/numbers.
    
    
    
    // Spacings:
    margin             : unset, // Clears default margins.
    paddingInlineStart : unset, // Resets list padding.
    
    
    
    // Children:
    ...children(':where(li)', {
        // Layouts:
        display        : unset, // Resets list item rendering.
        
        
        
        // Typos:
        textAlign      : unset, // Neutralizes text alignment.
    }),
});

/**
 * **Hides the browser’s default scrollbar styling**.
 *
 * - Removes scrollbar width for Firefox (`scrollbarWidth: none`).
 * - Prevents overflow styling in IE/Edge (`msOverflowStyle: none`).
 * - Hides the scrollbar in WebKit browsers (`display: none` for `::-webkit-scrollbar`).
 */
export const resetScrollbar = () => style({
    // Layouts:
    scrollbarWidth  : none, // Hides scrollbar in Firefox.
    msOverflowStyle : none, // Removes overflow styling in IE/Edge.
    
    
    
    // Children:
    ...children('::-webkit-scrollbar', {
        // Layouts:
        display     : none, // Hides scrollbar in WebKit browsers.
    }),
});

/**
 * **Resets browser styling for `<img>` elements**.
 *
 * - Ensures images fill their container properly.
 * - Standardizes rendering behavior across browsers.
 */
export const resetImage = () => style({
    // Layouts:
    display: 'block', // Prevents inline image spacing issues, ensuring full container width.
    
    
    
    // Sizes:
    // Fix the abnormal `display: block` sizing:
    
    boxSizing : 'border-box', // Includes borders & paddings in final dimensions.
    
    // Ensures media elements span maximum available width:
    width     : 'fill-available',
    ...fallback({
        width : '-webkit-fill-available',
    }),
    ...fallback({
        width : '-moz-available',
    }),
    ...fallback({
        width : '100%',
    }),
    
    
    
    // Spacings:
    overflow           : unset, // Removes overflow behavior.
    overflowClipMargin : unset, // Neutralizes clipping margins.
});

/**
 * **Resets browser styling for `<figure>` elements**.
 *
 * - Removes unwanted margins.
 */
export const resetFigure = () => style({
    // Spacings:
    margin  : unset, // Clears default margins.
});

/**
 * **Resets default browser styling for media-related elements**.
 *
 * Applies to: `<figure>`, `<img>`, `<svg>`, `<video>`, `<picture>`, `<embed>`, `<object>`
 * 
 * - Ensures media elements **properly fill their container**.
 * - Standardizes rendering behavior across browsers.
 */
export const resetMedia = () => style({
    // Layouts:
    ...rule(':where(img, svg, video, picture, object)', {
        display: 'block', // Prevents inline spacing issues, ensuring full container width.
    }),
    
    
    
    // Sizes:
    // Fix the abnormal `display: block` sizing:
    ...rule(':where(img, svg, video, object)', {
        boxSizing : 'border-box', // Includes borders & paddings in final dimensions.
        
        // Ensures media elements span maximum available width:
        width     : 'fill-available',
        ...fallback({
            width : '-webkit-fill-available',
        }),
        ...fallback({
            width : '-moz-available',
        }),
        ...fallback({
            width : '100%',
        }),
    }),
    
    
    
    // Spacings:
    ...rule(':where(figure)', {
        margin : unset, // Clears unwanted default margins.
    }),
    ...rule(':where(img, svg:not(:root), video)', {
        overflow           : unset, // Prevents unnecessary scrolling/clipping.
        overflowClipMargin : unset, // Prevents unnecessary scrolling/clipping.
    }),
});

/**
 * **Resets default browser styling for `<dialog>`**.
 * 
 * - Removes browser-imposed positioning and background styles.
 * - Ensures proper customization for modal dialogs.
 */
export const resetDialog = () => style({
    // Layouts:
    display     : unset, // Neutralizes the default block styling.
    
    
    
    // Positions:
    position    : unset, // Allows custom positioning.
    inset       : unset, // Removes forced inset positioning.
    
    
    
    // Sizes:
    inlineSize  : unset, // Allows flexible width handling.
    blockSize   : unset, // Neutralizes height constraints.
    
    
    
    // Backgrounds:
    background  : unset, // Removes default background styling.
    
    
    
    // Foregrounds:
    color       : unset, // Standardizes text rendering.
    
    
    
    // Borders:
    border      : unset, // Clears default border styles.
    
    
    
    // Spacings:
    margin      : unset, // Removes external spacing.
    padding     : unset, // Eliminates internal padding.
    
    
    
    // Children:
    ...children('::backdrop', {
        // Layouts:
        display    : none,  // Hides the browser-imposed backdrop styling.
        
        
        
        // Positions:
        position   : unset, // Allows custom backdrop positioning.
        inset      : unset, // Removes forced inset positioning.
        
        
        
        // Backgrounds:
        background : unset, // Neutralizes default backdrop color.
    }),
});
