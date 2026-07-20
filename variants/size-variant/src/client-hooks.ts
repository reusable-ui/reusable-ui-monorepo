'use client' // The exported `useSizeVariant()` hook is client side only.

// Reusable-ui variants:
import {
    // Types:
    type InheritableVariantDefinition,
    
    
    
    // Hooks:
    useResolvedInheritableVariant,
}                           from '@reusable-ui/effective-variant'   // Reusable resolvers for deriving effective variant from props, with optional behaviors like context inheriting and inverting.

// Types:
import {
    type BasicSize,
    type SizeVariantProps,
    type SizeVariantOptions,
    type SizeVariant,
}                           from './types.js'

// Defaults:
import {
    defaultDeclarativeSize,
    defaultFallbackSize,
    defaultSupportedSizes,
}                           from './internal-defaults.js'

// Utilities:
import {
    getSizeClassname,
}                           from './internal-utilities.js'

// Contexts:
import {
    SizeVariantContext,
}                           from './internal-contexts.js'



/** The inheritable variant definition for size variant management. */
const inheritableVariantDefinition : InheritableVariantDefinition<string, 'inherit'> = {
    // Defaults:
    defaultVariant          : defaultDeclarativeSize,
    
    // Inheritances:
    inheritableVariantToken : 'inherit',
    variantContext          : SizeVariantContext,
    
    // Fallbacks:
    fallbackVariant         : defaultFallbackSize,
};

/**
 * Resolves the current size variant.
 * 
 * Useful for derived components that need to determine the current size of the base component.
 * 
 * Resolution priority:
 * - `'inherit'` : uses the size value from context.
 * - Otherwise   : uses the explicitly provided size value as-is.
 * 
 * @template TSize commonly `'sm'`, `'md'`, `'lg'`
 * 
 * @param props The component props that may include a `size` value.
 * @param options A required configuration specifying a default size when no `size` prop is explicitly provided.
 * @returns The resolved size value.
 */
export function useResolvedSize<TSize extends string = BasicSize>(props: SizeVariantProps<TSize>, options: SizeVariantOptions<TSize>): TSize;

/**
 * Resolves the current size variant.
 * 
 * Useful for derived components that need to determine the current size of the base component.
 * 
 * Resolution priority:
 * - `'inherit'` : uses the size value from context.
 * - Otherwise   : uses the explicitly provided size value as-is.
 * 
 * @param props The component props that may include a `size` value.
 * @returns The resolved size value.
 */
export function useResolvedSize(props: SizeVariantProps<BasicSize>): BasicSize;

export function useResolvedSize<TSize extends string = BasicSize>(props: SizeVariantProps<TSize>, options?: SizeVariantOptions<TSize>): TSize {
    // Extract options:
    const {
        defaultSize    : defaultVariant,
        fallbackSize   : fallbackVariant = defaultFallbackSize   as TSize,
        supportedSizes                   = defaultSupportedSizes as TSize[],
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        size : variant,
    } = props;
    
    
    
    // Resolve effective size variant:
    const effectiveSize = useResolvedInheritableVariant<TSize, 'inherit'>(
        // Props:
        { variant },
        
        // Options:
        { defaultVariant, fallbackVariant },
        
        // Definition:
        inheritableVariantDefinition as unknown as InheritableVariantDefinition<TSize, 'inherit'>,
    );
    
    
    
    // Validate for the supported sizes:
    if (!supportedSizes.includes(effectiveSize)) return fallbackVariant;
    
    
    
    // Return the validated size:
    return effectiveSize;
};



/**
 * Resolves the size value along with its associated CSS classname,
 * based on component props, default configuration, and parent context.
 * 
 * @template TSize Commonly `'sm'`, `'md'`, `'lg'`
 * 
 * @param props The component props that may include a `size` value.
 * @param options A required configuration specifying a default size when no `size` prop is explicitly provided.
 * @returns The resolved size value along with its associated CSS classname.
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
export function useSizeVariant<TSize extends string = BasicSize>(props: SizeVariantProps<TSize>, options: SizeVariantOptions<TSize>): SizeVariant<TSize>;

/**
 * Resolves the size value along with its associated CSS classname,
 * based on component props and parent context.
 * 
 * @param props The component props that may include a `size` value.
 * @returns The resolved size value along with its associated CSS classname.
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
export function useSizeVariant(props: SizeVariantProps<BasicSize>): SizeVariant<BasicSize>;

export function useSizeVariant<TSize extends string = BasicSize>(props: SizeVariantProps<TSize>, options?: SizeVariantOptions<TSize>): SizeVariant<TSize> {
    // Resolve effective size value:
    const effectiveSize = useResolvedSize<TSize>(props, options!);
    
    
    
    // Return resolved size attributes:
    return {
        size          : effectiveSize,
        sizeClassname : getSizeClassname<TSize>(effectiveSize),
    } satisfies SizeVariant<TSize>;
};
