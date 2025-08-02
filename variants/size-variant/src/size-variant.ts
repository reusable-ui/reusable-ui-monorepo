'use client' // The exported `useSizeVariant()` hook is client side only.

// React:
import {
    // Hooks:
    use,
}                           from 'react'

// Types:
import {
    type BasicSize,
    type SizeVariantProps,
    type SizeVariantOptions,
    type ResolvedSizeVariant,
}                           from './types.js'

// Defaults:
import {
    contextDefaultSize,
    defaultSupportedSizes,
}                           from './internal-defaults.js'

// Utilities:
import {
    getSizeClassname,
}                           from './internal-utilities.js'

// Contexts:
import {
    SizeVariantContext,
}                           from './contexts.js'



/**
 * Resolves the effective size value based on props and context.
 * 
 * Resolution priority:
 * - `'inherit'` : uses the size value from context, if available.
 * - `undefined` : falls back to the default size value.
 * - Otherwise   : uses the explicitly provided size value as-is.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 * 
 * @param {SizeVariantProps['size']} size - The pre-resolved size value from props.
 * @param {TSize} defaultSize - Fallback size value when context is missing.
 * @param {TSize[]} supportedSizes - The list of supported sizes for validation.
 * @returns {TSize} - The resolved size value.
 */
const useEffectiveSizeValue = <TSize extends string = BasicSize>(size: SizeVariantProps<TSize>['size'], defaultSize: TSize, supportedSizes: TSize[]): TSize => {
    switch (size) {
        // If the size is 'inherit', use the context value:
        case 'inherit' : {
            // Get the inherited size from context:
            const inheritedSize = use(SizeVariantContext) as TSize | undefined;
            
            
            
            // If context value exists and is supported, return it:
            if ((inheritedSize !== undefined) && supportedSizes.includes(inheritedSize)) return inheritedSize;
            
            
            
            // Otherwise, fallback to the default size:
            return defaultSize;
        }
        
        
        
        // If the size is undefined, return the default size:
        case undefined : return defaultSize;
        
        
        
        // The size is explicitly defined, return it as-is:
        default        : return size;
    } // switch
};

/**
 * Resolves the size value along with its associated CSS class name,
 * based on component props, default configuration, and parent context.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 * 
 * @param {SizeVariantProps<TSize>} props - The component props that may include a `size` value.
 * @param {SizeVariantOptions<TSize>} options - A required configuration specifying a default size when no `size` prop is explicitly provided.
 * @returns {ResolvedSizeVariant<TSize>} - The resolved size value along with its associated CSS class name.
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
 *         supportedSizes: ['sm', 'md', 'lg'], // list of supported sizes
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
export function useSizeVariant<TSize extends string = BasicSize>(props: SizeVariantProps<TSize>, options: SizeVariantOptions<TSize>): ResolvedSizeVariant<TSize>;

/**
 * Resolves the size value along with its associated CSS class name,
 * based on component props and parent context.
 * 
 * @param {SizeVariantProps<BasicSize>} props - The component props that may include a `size` value.
 * @returns {ResolvedSizeVariant<BasicSize>} - The resolved size value along with its associated CSS class name.
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
 *     } = useSizeVariant(props);
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
export function useSizeVariant(props: SizeVariantProps<BasicSize>): ResolvedSizeVariant<BasicSize>;

export function useSizeVariant<TSize extends string = BasicSize>(props: SizeVariantProps<TSize>, options?: SizeVariantOptions<TSize>): ResolvedSizeVariant<TSize> {
    // Extract props and assign defaults:
    const {
        size,
    } = props;
    
    
    
    // Resolve the effective size value:
    const effectiveSize = useEffectiveSizeValue<TSize>(size, options?.defaultSize ?? (contextDefaultSize as TSize), options?.supportedSizes ?? (defaultSupportedSizes as TSize[]));
    
    
    
    // Return resolved size attributes:
    return {
        size          : effectiveSize,
        sizeClassname : getSizeClassname<TSize>(effectiveSize),
    } satisfies ResolvedSizeVariant<TSize>;
};
