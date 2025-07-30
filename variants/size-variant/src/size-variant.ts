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
 * Props for specifying the size of the component.
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
     * - Or any custom size token defined by the design system
     */
    size          ?: TSize
}

/**
 * Optional configuration options for specifying the default size.
 * 
 * Applied when the component does not explicitly provide the `size` prop.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 */
export interface SizeVariantOptions<TSize extends string = BasicSize> {
    /**
     * The default size to apply when no `size` prop is explicitly provided.
     */
    defaultSize   ?: TSize
}

/**
 * Represents the final resolved size of the component, along with its associated CSS class name.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 */
export interface ResolvedSizeVariant<TSize extends string = BasicSize> {
    /**
     * The resolved size value.
     * 
     * Possible values:
     * - `'sm'`: small size
     * - `'md'`: medium size (default)
     * - `'lg'`: large size
     * - Or any custom size token defined by the design system
     */
    size           : TSize
    
    /**
     * CSS class name reflecting the resolved size.
     * 
     * Possible values:
     * - `'s-sm'`
     * - `'s-md'`
     * - Or any custom size class name in the format `s-${size}`
     */
    sizeClassname  : `s-${TSize}`
}

/**
 * Resolves the size value along with its associated CSS class name,
 * based on component props and optional default configuration.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 * 
 * @param {SizeVariantProps} props - The component props that may include a `size` value.
 * @param {SizeVariantOptions} options - An optional configuration specifying a default size when no `size` prop is explicitly provided.
 * @returns {ResolvedSizeVariant} - The resolved size value along with its associated CSS class name.
 * 
 * @example
 * ```tsx
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
