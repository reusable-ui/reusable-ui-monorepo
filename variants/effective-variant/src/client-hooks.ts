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
 * Resolves an effective variant value from controlled props while optionally
 * inheriting from context when the resolved value equals the explicit
 * inheritance token.
 * 
 * **Resolution order:**
 *   1. `props.variant`  
 *   2. `options.defaultVariant`  
 *   3. `definition.defaultVariant`  
 *   4. `variantContext` (when the resolved value equals `inheritableVariantToken`)  
 *   5. `fallbackVariant`  
 * 
 * @template TVariant - The type of the resolved variant value.
 * @template TInheritToken - A special string token used to trigger inheritance (e.g. `'inherit'`).
 * 
 * @param props - The props supplied by the component consumer.
 * @param options - The component-level defaults.
 * @param definition - The resolver-level defaults and inheritance contract.
 * @returns The resolved variant value, possibly inherited from context.
 * 
 * @example
 * Controlled mode with inheritance, by supplying a `variant` prop and inheriting from context:
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
 * Default mode with inheritance, by falling back to the component-level default and inheriting from context:
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
        fallbackVariant : definitionFallbackVariant,
    } = definition;
    
    
    
    // Extract component-level options, falling back to definition default:
    const {
        fallbackVariant : componentFallbackVariant = definitionFallbackVariant,
    } = options;
    
    
    
    // Resolve the controlled variant value from props:
    const resolvedVariant = useResolvedControlledVariant(props, options, definition);
    
    
    
    // Inheritance variant resolution:
    
    // If resolved variant does not equal the inheritable token, return directly:
    if (!Object.is(resolvedVariant, inheritableVariantToken)) return resolvedVariant as TVariant; // At this point, `resolvedVariant` cannot be `TInheritToken`, so it's safe to cast.
    
    // Attempt to inherit from context:
    const contextVariant = use(variantContext);
    if (contextVariant !== undefined) return contextVariant;
    
    // Fallback: return default fallback variant:
    return componentFallbackVariant;
};



/**
 * Resolves an effective variant value from controlled props while optionally
 * inheriting or inverting from context when the resolved value equals the explicit
 * inheritance/inversion token.
 * 
 * **Resolution order:**
 *   1. `props.variant`  
 *   2. `options.defaultVariant`  
 *   3. `definition.defaultVariant`  
 *   4. `variantContext` (when the resolved value equals `inheritableVariantToken`)  
 *   5. Inverted `variantContext` (when the resolved value equals `invertableVariantToken`)  
 *   6. `fallbackVariant`  
 * 
 * @template TVariant - The type of the resolved variant value.
 * @template TInheritToken - A special string token used to trigger inheritance (e.g. `'inherit'`).
 * @template TInvertToken - A special string token used to trigger inversion (e.g. `'invert'`).
 * 
 * @param props - The props supplied by the component consumer.
 * @param options - The component-level defaults.
 * @param definition - The resolver-level defaults and inheritance/inversion contracts.
 * @returns The resolved variant value, possibly inherited or inverted from context.
 * 
 * @example
 * Controlled mode with inversion, by supplying a `variant` prop and inverting from context:
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
 * Default mode with inversion, by falling back to the component-level default and inverting from context:
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
        fallbackVariant : definitionFallbackVariant,
    } = definition;
    
    
    
    // Extract component-level options, falling back to definition default:
    const {
        fallbackVariant : componentFallbackVariant = definitionFallbackVariant,
    } = options;
    
    
    
    // Resolve the controlled variant value from props:
    const resolvedVariant = useResolvedInheritableVariant<TVariant | TInvertToken, TInheritToken>(props, options, definition as InheritableVariantDefinition<TVariant | TInvertToken, TInheritToken>);
    
    
    
    // Inversion variant resolution:
    
    // If resolved variant does not equal the invertable token, return directly:
    if (!Object.is(resolvedVariant, invertableVariantToken)) return resolvedVariant as TVariant; // At this point, `resolvedVariant` cannot be `TInvertToken`, so it's safe to cast.
    
    // Attempt to invert from context:
    const contextVariant = use(variantContext);
    if (contextVariant !== undefined) return invertVariant(contextVariant);
    
    // Fallback: return default fallback variant:
    return componentFallbackVariant;
};
