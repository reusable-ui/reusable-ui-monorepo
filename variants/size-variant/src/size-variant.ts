// Types:
import {
    type BasicSize,
}                           from './types.js'

// Defaults:
import {
    defaultSize,
}                           from './internal-defaults.js'

// Utilities:
import {
    getSizeClassname,
}                           from './internal-utilities.js'



/**
 * Props for controlling the size of the component.
 * 
 * Accepts an optional `size`, falling back to a default when not provided.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 */
export interface SizeVariantProps<TSize extends string = BasicSize> {
    /**
     * Specifies the desired size of the component:
     * - `'sm'`: small size
     * - `'md'`: medium size (default)
     * - `'lg'`: large size
     */
    size          ?: TSize
}

/**
 * Optional configuration options for assigning the default size.
 * 
 * Used when a component does not explicitly provide a `size` prop.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 */
export interface SizeVariantOptions<TSize extends string = BasicSize> {
    /**
     * The default size to apply when the `size` is not specified.
     */
    defaultSize   ?: TSize
}

/**
 * Represents the final resolved size of a component, along with its associated CSS class name.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 */
export interface ResolvedSizeVariant<TSize extends string = BasicSize> {
    /**
     * The resolved size value.
     * 
     * Example:
     * - `'sm'`: small size
     * - `'md'`: medium size (default)
     * - `'lg'`: large size
     */
    size           : TSize
    
    /**
     * CSS class name corresponding to the resolved size.
     * 
     * Example:
     * - `'s-sm'`
     * - `'s-md'`
     */
    sizeClassname  : `s-${TSize}`
}

/**
 * Resolves the size value along with its associated CSS class name,
 * based on component props and optional system defaults.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 * 
 * @param {SizeVariantProps} props - The component props that may include a `size` value.
 * @param {SizeVariantOptions} options - An optional configuration specifying a default size when `props.size` is not provided.
 * @returns {ResolvedSizeVariant} - The resolved size value along with its associated CSS class name.
 * 
 * @example
 * ```ts
 * import React, { FC } from 'react';
 * import {
 *     useSizeVariant,
 *     SizeVariantProps,
 * } from '@reusable-ui/size-variant';
 * import styles from './SizeableCard.module.css';
 * 
 * export interface SizeableCardProps extends SizeVariantProps {}
 * 
 * // A scalable card component that adapts based on the given size.
 * // Supports `sm`, `md`, or `lg`.
 * export const SizeableCard : FC<SizeableCardProps> = (props) => {
 *     const {
 *         size,
 *         sizeClassname,
 *     } = useSizeVariant(props, {
 *         defaultSize: 'md', // fallback if not provided
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${sizeClassname}`}
 *         >
 *             <strong>Resolved size:</strong> {size}
 *         </div>
 *     );
 * };
 * ```
 */
export const useSizeVariant = <TSize extends string = BasicSize>(props: SizeVariantProps<TSize>, options?: SizeVariantOptions<TSize>): ResolvedSizeVariant<TSize> => {
    // Extract props and assign defaults:
    const {
        size = options?.defaultSize ?? (defaultSize as TSize),
    } = props;
    
    
    
    // Return resolved size attributes:
    return {
        size,
        sizeClassname : getSizeClassname<TSize>(size),
    } satisfies ResolvedSizeVariant<TSize>;
};
