// Types:
import {
    type ControlledVariantProps,
    type ControlledVariantOptions,
    type ControlledVariantDefinition,
}                           from './types.js'



/**
 * Resolves an effective variant value from controlled props.
 * 
 * **Resolution order:**
 *   1. `props.variant`  
 *   2. `options.defaultVariant`  
 *   3. `definition.defaultVariant`  
 * 
 * @template TVariant - The type of the resolved variant value.
 * 
 * @param props - The props supplied by the component consumer.
 * @param options - The component-level defaults.
 * @param definition - The resolver-level defaults.
 * @returns The resolved variant value.
 * 
 * @example
 * Controlled mode, by supplying a `variant` prop:
 * ```ts
 * const size = useResolvedControlledVariant(
 *     // Props:
 *     { variant: 'lg' },
 *     
 *     // Options:
 *     { defaultVariant: 'md' },
 *     
 *     // Definition:
 *     { defaultVariant: 'md' }
 * ); // → 'lg'
 * ```
 * 
 * Default mode, by falling back to the component-level default:
 * ```ts
 * const size = useResolvedControlledVariant(
 *     // Props:
 *     {},
 *     
 *     // Options:
 *     { defaultVariant: 'md' },
 *     
 *     // Definition:
 *     { defaultVariant: 'md' }
 * ); // → 'md'
 * ```
 */
export const useResolvedControlledVariant = <TVariant extends {} | null>(props: ControlledVariantProps<TVariant>, options: ControlledVariantOptions<TVariant>, definition: ControlledVariantDefinition<TVariant>): TVariant => {
    // Extract resolver-level definition (mandatory contracts):
    const {
        defaultVariant : definitionDefaultVariant,
    } = definition;
    
    
    
    // Extract component-level options, falling back to definition default:
    const {
        defaultVariant : componentDefaultVariant = definitionDefaultVariant,
    } = options;
    
    
    
    // Extract props, falling back to component-level default:
    const {
        /**
         * The resolved variant value (effective intent):
         * - Controlled via `props.variant` if provided.
         * - Otherwise falls back to `componentDefaultVariant`.
         */
        variant : resolvedVariant = componentDefaultVariant,
    } = props;
    
    
    
    // Return the final resolved variant value (the intent):
    return resolvedVariant;
};
