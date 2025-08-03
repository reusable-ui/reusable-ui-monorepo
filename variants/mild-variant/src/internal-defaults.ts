// Types:
import {
    type MildVariantProps,
}                           from './types.js'



/**
 * A default intermediate mild state to apply when no `mild` prop is explicitly provided.
 * 
 * This value serves as a transitional fallback before attempting context resolution.
 * 
 * - `'inherit'`: inherits mild appearance from a parent context.
 */
export const semiDefaultMild  : Required<MildVariantProps>['mild'] = 'inherit';



/**
 * A default final mild state to apply when no effective `mild` value can be resolved.
 * 
 * Regulates visual tone when direct configuration is absent.
 */
export const finalDefaultMild : boolean = false;
