'use client' // The exported hooks are client side only.

// React:
import {
    // Hooks:
    use,
}                           from 'react'

// Types:
import {
    type InheritableVariantProps,
    type InheritableVariantOptions,
    type InheritableVariantDefinition,
    
    type InvertableVariantProps,
    type InvertableVariantOptions,
    type InvertableVariantDefinition,
}                           from './types.js'

// Hooks:
import {
    useResolvedControlledVariant,
}                           from './general-hooks.js'



/**
 * Resolves an effective variant value from controlled props,
 * inherited from context when a declarative token is encountered.
 * 
 * If the resolved variant equals `inheritableVariantToken`,
 * the hook attempts to inherit from `variantContext`.
 * 
 * **Resolution order:**
 *   1. `variant` prop  
 *   2. `defaultVariant` option  
 *   3. `defaultVariant` definition  
 *   4. Inherit from `variantContext` (if resolved variant equals `inheritableVariantToken`)  
 *   5. Use `fallbackVariant` (fallback)  
 * 
 * @template TVariant - The type of the variant value.
 * @template TInheritToken - A special string token used to trigger inheritance (e.g. `'inherit'`).
 * 
 * @param props - The volatile props provided by the component consumer.
 * @param options - The per-component options containing optional defaults.
 * @param definition - The resolver-level definition containing the mandatory defaults and inheritance contracts.
 * @returns The resolved (and possibly inherited) variant value.
 * 
 * @example
 * Controlled mode with inheritance, by supplying `variant` prop and inheriting from context:
 * ```ts
 * const theme = useResolvedInheritableVariant(
 *     // Props:
 *     { variant: 'inherit' },
 *     
 *     // Options:
 *     { defaultVariant: 'danger' },
 *     
 *     // Definition:
 *     {
 *         defaultVariant: 'primary',
 *         inheritableVariantToken: 'inherit',
 *         variantContext: ThemeVariantContext,
 *         fallbackVariant: 'secondary',
 *     }
 * ); // → 'success' (assuming context provides `'success'`)
 * ```
 * 
 * Default mode with inheritance, by falling back to `defaultVariant` option and inheriting from context:
 * ```ts
 * const theme = useResolvedInheritableVariant(
 *     // Props:
 *     {},
 *     
 *     // Options:
 *     { defaultVariant: 'inherit' },
 *     
 *     // Definition:
 *     {
 *         defaultVariant: 'primary',
 *         inheritableVariantToken: 'inherit',
 *         variantContext: ThemeVariantContext,
 *         fallbackVariant: 'secondary',
 *     }
 * ); // → 'success' (assuming context provides `'success'`)
 * ```
 */
export const useResolvedInheritableVariant = <TVariant extends {} | null, TInheritToken extends string>(props: InheritableVariantProps<TVariant, TInheritToken>, options: InheritableVariantOptions<TVariant, TInheritToken>, definition: InheritableVariantDefinition<TVariant, TInheritToken>): TVariant => {
    // Extract resolver-level definition (mandatory contracts):
    const {
        inheritableVariantToken,
        variantContext,
        fallbackVariant,
    } = definition;
    
    
    
    // Resolve the controlled variant value from props:
    const resolvedVariant = useResolvedControlledVariant(props, options, definition);
    
    
    
    // Inheritance variant resolution:
    
    // If resolved variant does not equal the inheritable token, return directly:
    if (!Object.is(resolvedVariant, inheritableVariantToken)) return resolvedVariant as TVariant; // At this point, `resolvedVariant` cannot be `TInheritToken`, so it's safe to cast.
    
    // Attempt to inherit from context:
    const inheritedVariant = use(variantContext);
    if (inheritedVariant !== undefined) return inheritedVariant;
    
    // Fallback: return default fallback variant:
    return fallbackVariant;
};



/**
 * Resolves an effective variant value from controlled props,
 * inherited or inverted from context when a declarative token is encountered.
 * 
 * If the resolved variant equals `invertableVariantToken`,
 * the hook attempts to invert from `variantContext`.
 * 
 * **Resolution order:**
 *   1. `variant` prop  
 *   2. `defaultVariant` option  
 *   3. `defaultVariant` definition  
 *   4. Inherit from `variantContext` (if resolved variant equals `inheritableVariantToken`)  
 *   5. Invert from `variantContext` (if resolved variant equals `invertableVariantToken`)  
 *   6. Use `fallbackVariant` (fallback)  
 * 
 * @template TVariant - The type of the variant value.
 * @template TInheritToken - A special string token used to trigger inheritance (e.g. `'inherit'`).
 * @template TInvertToken - A special string token used to trigger inversion (e.g. `'invert'`).
 * 
 * @param props - The volatile props provided by the component consumer.
 * @param options - The per-component options containing optional defaults.
 * @param definition - The resolver-level definition containing the mandatory defaults, inheritance and inversion contracts.
 * @returns The resolved (and possibly inherited or inverted) variant value.
 * 
 * @example
 * Controlled mode with inversion, by supplying `variant` prop and inverting from context:
 * ```ts
 * const orientation = useResolvedInvertableVariant(
 *     // Props:
 *     { variant: 'invert' },
 *     
 *     // Options:
 *     { defaultVariant: 'inline' },
 *     
 *     // Definition:
 *     {
 *         defaultVariant: 'inline',
 *         inheritableVariantToken: 'inherit',
 *         invertableVariantToken: 'invert',
 *         variantContext: ThemeVariantContext,
 *         invertVariant: (inheritedVariant) => (inheritedVariant === 'inline') ? 'block' : 'inline',
 *         fallbackVariant: 'inline',
 *     }
 * ); // → 'inline' (assuming context provides `'block'`)
 * ```
 * 
 * Default mode with inversion, by falling back to `defaultVariant` option and inverting from context:
 * ```ts
 * const orientation = useResolvedInvertableVariant(
 *     // Props:
 *     {},
 *     
 *     // Options:
 *     { defaultVariant: 'invert' },
 *     
 *     // Definition:
 *     {
 *         defaultVariant: 'inline',
 *         inheritableVariantToken: 'inherit',
 *         invertableVariantToken: 'invert',
 *         variantContext: ThemeVariantContext,
 *         invertVariant: (inheritedVariant) => (inheritedVariant === 'inline') ? 'block' : 'inline',
 *         fallbackVariant: 'inline',
 *     }
 * ); // → 'inline' (assuming context provides `'block'`)
 * ```
 */
export const useResolvedInvertableVariant = <TVariant extends {} | null, TInheritToken extends string, TInvertToken extends string>(props: InvertableVariantProps<TVariant, TInheritToken, TInvertToken>, options: InvertableVariantOptions<TVariant, TInheritToken, TInvertToken>, definition: InvertableVariantDefinition<TVariant, TInheritToken, TInvertToken>): TVariant => {
    // Extract resolver-level definition (mandatory contracts):
    const {
        invertableVariantToken,
        variantContext,
        invertVariant,
        fallbackVariant,
    } = definition;
    
    
    
    // Resolve the controlled variant value from props:
    const resolvedVariant = useResolvedInheritableVariant<TVariant | TInvertToken, TInheritToken>(props, options, definition as InheritableVariantDefinition<TVariant | TInvertToken, TInheritToken>);
    
    
    
    // Inversion variant resolution:
    
    // If resolved variant does not equal the invertable token, return directly:
    if (!Object.is(resolvedVariant, invertableVariantToken)) return resolvedVariant as TVariant; // At this point, `resolvedVariant` cannot be `TInvertToken`, so it's safe to cast.
    
    // Attempt to invert from context:
    const inheritedVariant = use(variantContext);
    if (inheritedVariant !== undefined) return invertVariant(inheritedVariant);
    
    // Fallback: return default fallback variant:
    return fallbackVariant;
};
