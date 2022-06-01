import type { CssSelectorCollection } from '@cssfn/css-types';
/**
 * Removes browser's default style on focusable element.
 */
export declare const stripoutFocusableElement: () => import("@cssfn/css-types").CssRule;
/**
 * Removes browser's default style on control (`<input>`, `<textarea>`, `<button>`, etc).
 */
export declare const stripoutControl: () => import("@cssfn/css-types").CssRule;
/**
 * Removes browser's default style on hyperlink (`<a>`).
 */
export declare const stripoutLink: () => import("@cssfn/css-types").CssRule;
/**
 * Removes browser's default style on `<input type=*textLike*>`.
 * `*textLike*` = `text`|`search`|`password`|`email`|`tel`|`url`|`number`|`time`|`week`|`date`|`datetime-local`|`month`
 */
export declare const stripoutTextbox: () => import("@cssfn/css-types").CssRule;
export declare const rangeTrackElm: CssSelectorCollection;
export declare const rangeThumbElm: CssSelectorCollection;
/**
 * Removes browser's default style on `<input type="range">`.
 */
export declare const stripoutRange: () => import("@cssfn/css-types").CssRule;
/**
 * Removes browser's default style on list (`<ul> > <li>` & `<ol> > <li>`).
 */
export declare const stripoutList: () => import("@cssfn/css-types").CssRule;
/**
 * Removes browser's default style on `<figure>`.
 */
export declare const stripoutFigure: () => import("@cssfn/css-types").CssRule;
/**
 * Hides browser's default scrollbar.
 */
export declare const stripoutScrollbar: () => import("@cssfn/css-types").CssRule;
/**
 * Removes browser's default style on `<img>`.
 */
export declare const stripoutImage: () => import("@cssfn/css-types").CssRule;
/**
 * Removes browser's default style on `<dialog>`.
 */
export declare const stripoutDialog: () => import("@cssfn/css-types").CssRule;
