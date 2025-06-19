// React:
import {
    // Hooks:
    useMemo,
}                           from 'react'

// Types:
import {
    type SemanticOptions,
    type SemanticProps,
    type ResolvedSemanticAttributes,
}                           from './types.js'

// Classes:
import {
    LazySemanticEvaluator,
}                           from './LazySemanticEvaluator.js'



/**
 * Resolves semantic attributes (role and tag) based on the given configuration.
 * 
 * Evaluates the appropriate `role` and `tag` by considering semantic priority, accessibility intent,
 * and provided preferences. Internally uses `useMemo` to avoid redundant computations.
 * 
 * @param {SemanticProps} props - Semantic configuration, including user-defined role and tag preferences.
 * @param {SemanticOptions} [options=props] - Optional override for resolution logic (defaults to `props`).
 * @returns {ResolvedSemanticAttributes} - The resolved semantic attributes.
 * 
 * @example
 * ```ts
 * const defaultButtonSemanticPriority: SemanticPriority = [
 *   ['button', 'button'],
 *   ['link', 'a'],
 * ];
 * 
 * const defaultButtonRole: Role | 'auto' = 'auto';
 * const defaultButtonTag:  Tag  | 'auto' = 'auto';
 * 
 * interface ButtonProps extends SemanticProps {
 *   children?: ReactNode;
 * }
 * 
 * const Button = (props: ButtonProps) => {
 *   const {
 *     semanticPriority = defaultButtonSemanticPriority,
 *     role             = defaultButtonRole,
 *     tag              = defaultButtonTag,
 *     ...restProps
 *   } = props;
 * 
 *   const { computedTag, computedRole } = useResolvedSemantics({
 *     semanticPriority,
 *     role,
 *     tag,
 *   });
 * 
 *   const DynamicTag: Tag = computedTag ?? 'div';
 *   return (
 *     <DynamicTag {...restProps} role={computedRole ?? undefined}>
 *       {props.children}
 *     </DynamicTag>
 *   );
 * };
 * ```
 */
export const useResolvedSemantics = (props: SemanticProps, options: SemanticOptions = props): ResolvedSemanticAttributes => {
    // Extract props:
    const {
        role : preferredRole = 'auto',
        tag  : preferredTag  = 'auto',
    } = props;
    
    // Extract options:
    const {
        semanticPriority,
    } = options;
    
    
    
    return useMemo((): ResolvedSemanticAttributes => {
        return new LazySemanticEvaluator(semanticPriority, preferredRole, preferredTag);
        
        // eslint-disable-next-line
    }, [semanticPriority, preferredRole, preferredTag]);
};
