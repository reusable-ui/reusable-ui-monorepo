// Types:
import {
    type EmphasisVariantProps,
}                           from './types.js'



/**
 * A default intermediate emphasized state to apply when no `emphasized` prop is explicitly provided.
 * 
 * This value serves as a transitional fallback before attempting context resolution.
 * 
 * - `'inherit'`: inherits emphasis appearance from a parent context.
 */
export const semiDefaultEmphasized  : Required<EmphasisVariantProps>['emphasized'] = 'inherit';



/**
 * A default final emphasized state to apply when no effective `emphasized` value can be resolved.
 * 
 * Typically used to control visual prominence when direct configuration is absent.
 */
export const finalDefaultEmphasized : boolean = false;
