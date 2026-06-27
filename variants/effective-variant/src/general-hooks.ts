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
 *   1. `variant` prop  
 *   2. `defaultVariant` option  
 *   3. `defaultVariant` definition  
 * 
 * @template TVariant - The type of the variant value.
 * 
 * @param props - The volatile props provided by the component consumer.
 * @param options - The per-component options containing optional defaults.
 * @param definition - The resolver-level definition containing the mandatory defaults.
 * @returns The resolved variant value.
 * 
 * @example
 * Controlled mode, by supplying `variant` prop:
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
 * Default mode, by falling back to `defaultVariant` option:
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
         * Resolved variant (effective intent):
         * - Controlled via `props.variant` if provided.
         * - Otherwise falls back to `componentDefaultVariant`.
         */
        variant : resolvedVariant = componentDefaultVariant,
    } = props;
    
    
    
    // Return the final resolved variant (intent):
    return resolvedVariant;
};
