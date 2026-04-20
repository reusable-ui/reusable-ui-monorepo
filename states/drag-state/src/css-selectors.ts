// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * A CSS selector targeting elements in the fully dragged state
 * (placed at the pointer position and continuously following it).
 * 
 * Excludes elements currently in the dragging transition.
 */
export const isDraggedSelector           : CssSelectorCollection = '.is-dragged';

/**
 * A CSS selector targeting elements in the fully dropped state
 * (placed at the target or original position).
 * 
 * Excludes elements currently in the dropping transition.
 */
export const isDroppedSelector           : CssSelectorCollection = '.is-dropped';

/**
 * A CSS selector targeting elements currently in the dragging transition
 * (moving toward the pointer position).
 * 
 * Excludes elements that have already reached the dragged state.
 */
export const isDraggingSelector          : CssSelectorCollection = '.is-dragging';

/**
 * A CSS selector targeting elements currently in the dropping transition
 * (moving toward the target or original position).
 * 
 * Excludes elements that have already reached the dropped state.
 */
export const isDroppingSelector          : CssSelectorCollection = '.is-dropping';

/**
 * A CSS selector targeting elements that are either in the dragging transition or fully dragged
 * (moving toward or placed at the pointer position).
 */
export const isDraggingOrDraggedSelector : CssSelectorCollection = ':is(.is-dragging, .is-dragged)';

/**
 * A CSS selector targeting elements that are either in the dropping transition or fully dropped
 * (moving toward or placed at the target or original position).
 */
export const isDroppingOrDroppedSelector : CssSelectorCollection = ':is(.is-dropping, .is-dropped)';



/**
 * Applies the given `styles` to elements in the fully dragged state
 * (placed at the pointer position and continuously following it).
 * 
 * Excludes elements currently in the dragging transition.
 * 
 * @param styles The styles applied to elements in the fully dragged state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully dragged state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDragged({
 *         opacity: 0.5,
 *     }),
 * });
 * ```
 */
export const ifDragged           = (styles: CssStyleCollection): CssRule => rule(isDraggedSelector           , styles);

/**
 * Applies the given `styles` to elements in the fully dropped state
 * (placed at the target or original position).
 * 
 * Excludes elements currently in the dropping transition.
 * 
 * @param styles The styles applied to elements in the fully dropped state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully dropped state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDropped({
 *         opacity: 1,
 *     }),
 * });
 * ```
 */
export const ifDropped           = (styles: CssStyleCollection): CssRule => rule(isDroppedSelector           , styles);

/**
 * Applies the given `styles` to elements currently in the dragging transition
 * (moving toward the pointer position).
 * 
 * Excludes elements that have already reached the dragged state.
 * 
 * @param styles The styles applied to elements currently in the dragging transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the dragging transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDragging({
 *         opacity: 0.5,
 *     }),
 * });
 * ```
 */
export const ifDragging          = (styles: CssStyleCollection): CssRule => rule(isDraggingSelector          , styles);

/**
 * Applies the given `styles` to elements currently in the dropping transition
 * (moving toward the target or original position).
 * 
 * Excludes elements that have already reached the dropped state.
 * 
 * @param styles The styles applied to elements currently in the dropping transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the dropping transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDropping({
 *         opacity: 1,
 *     }),
 * });
 * ```
 */
export const ifDropping          = (styles: CssStyleCollection): CssRule => rule(isDroppingSelector          , styles);

/**
 * Applies the given `styles` to elements that are either in the dragging transition or fully dragged
 * (moving toward or placed at the pointer position).
 * 
 * @param styles The styles applied to elements that are either in the dragging transition or fully dragged.
 * @returns A `CssRule` that applies the given `styles` for elements that are either in the dragging transition or fully dragged.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDraggingOrDragged({
 *         opacity: 0.5,
 *     }),
 * });
 * ```
 */
export const ifDraggingOrDragged = (styles: CssStyleCollection): CssRule => rule(isDraggingOrDraggedSelector , styles);

/**
 * Applies the given `styles` to elements that are either in the dropping transition or fully dropped
 * (moving toward or placed at the target or original position).
 * 
 * @param styles The styles applied to elements that are either in the dropping transition or fully dropped.
 * @returns A `CssRule` that applies the given `styles` for elements that are either in the dropping transition or fully dropped.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDroppingOrDropped({
 *         opacity: 1,
 *     }),
 * });
 * ```
 */
export const ifDroppingOrDropped = (styles: CssStyleCollection): CssRule => rule(isDroppingOrDroppedSelector , styles);
