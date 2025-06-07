// Reusable-ui utilities:
import {
    resetFocusableElement,
    resetControl,
    resetLink,
    resetTextbox,
    resetRange,
    resetList,
    resetScrollbar,
    resetImage,
    resetFigure,
    resetMedia,
    resetDialog,
}                       from '@reusable-ui/resets'   // A utility for resetting default browser styles, ensuring a clean and customizable foundation for UI design.



/**
 * @deprecated - Use `resetFocusableElement` instead.
 * 
 * **Resets browser styling for focusable elements** (`:focus`, `:focus-visible`).
 *
 * - Removes default focus outline, allowing full customization.
 */
export const stripoutFocusableElement = resetFocusableElement;

/**
 * @deprecated - Use `resetControl` instead.
 * 
 * **Resets browser styling for form controls** (`<input>`, `<textarea>`, `<button>`, etc.).
 *
 * - Removes default styling for text fields, buttons, and other interactive elements.
 * - Applies a neutral base for custom UI components.
 */
export const stripoutControl = resetControl;

/**
 * @deprecated - Use `resetLink` instead.
 * 
 * **Resets browser styling for hyperlinks** (`<a>`).
 *
 * - Prevents default styles for links, ensuring full customization.
 */
export const stripoutLink = resetLink;

/**
 * @deprecated - Use `resetTextbox` instead.
 * 
 * **Resets browser styling for `<input>` fields with text-like behavior**.
 * 
 * Supports:  
 * `text`, `search`, `password`, `email`, `tel`, `url`, `number`, `time`, `week`, `date`, `datetime-local`, `month`
 * 
 * - Standardizes input rendering across browsers.
 * - Removes unnecessary UI elements (search cancel button, spin buttons).
 */
export const stripoutTextbox = resetTextbox;

/**
 * @deprecated - Use `resetRange` instead.
 * 
 * **Resets browser styling for `<input type="range">`**.
 * 
 * - Standardizes track & thumb styling across browsers.
 * - Ensures consistent behavior and appearance.
 */
export const stripoutRange = resetRange;

/**
 * @deprecated - Use `resetList` instead.
 * 
 * **Resets browser styling for lists** (`<ul>`, `<ol>`, `<li>`).
 * 
 * - Removes default bullet points and list item spacing.
 * - Allows for full customization of list styles.
 */
export const stripoutList = resetList;

/**
 * @deprecated - Use `resetScrollbar` instead.
 * 
 * **Hides the browser’s default scrollbar styling**.
 *
 * - Removes scrollbar width for Firefox (`scrollbarWidth: none`).
 * - Prevents overflow styling in IE/Edge (`msOverflowStyle: none`).
 * - Hides the scrollbar in WebKit browsers (`display: none` for `::-webkit-scrollbar`).
 */
export const stripoutScrollbar = resetScrollbar;

/**
 * @deprecated - Use `resetImage` instead.
 * 
 * **Resets browser styling for `<img>` elements**.
 *
 * - Ensures images fill their container properly.
 * - Standardizes rendering behavior across browsers.
 */
export const stripoutImage = resetImage;

/**
 * @deprecated - Use `resetFigure` instead.
 * 
 * **Resets browser styling for `<figure>` elements**.
 *
 * - Removes unwanted margins.
 */
export const stripoutFigure = resetFigure;

/**
 * @deprecated - Use `resetMedia` instead.
 * 
 * **Resets default browser styling for media-related elements**.
 *
 * Applies to: `<figure>`, `<img>`, `<svg>`, `<video>`, `<picture>`, `<embed>`, `<object>`
 * 
 * - Ensures media elements **properly fill their container**.
 * - Standardizes rendering behavior across browsers.
 */
export const stripoutMedia = resetMedia;

/**
 * @deprecated - Use `resetDialog` instead.
 * 
 * **Resets default browser styling for `<dialog>`**.
 * 
 * - Removes browser-imposed positioning and background styles.
 * - Ensures proper customization for modal dialogs.
 */
export const stripoutDialog = resetDialog;
