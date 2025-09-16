// Types:
import {
    type OutlineVariantProps,
}                           from './types.js'



/**
 * A default intermediate outline state to apply when no `outlined` prop is explicitly provided.
 * 
 * This value serves as a transitional fallback before attempting context resolution.
 * 
 * - `'inherit'`: inherits outline appearance from a parent context.
 */
export const semiDefaultOutlined  : Required<OutlineVariantProps>['outlined'] = 'inherit';



/**
 * A default final outline state to apply when no effective `outlined` value can be resolved.
 * 
 * Typically used to control visual prominence when direct configuration is absent.
 */
export const finalDefaultOutlined : boolean = false;
