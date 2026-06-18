import { TSESTree } from '@typescript-eslint/types'
import { simpleTraverse } from './simple-traverse.js'



// Server-safe allow-list:
// These hooks are safe to use in React Server Components because they
// do not rely on client‑side state or side effects.
const serverSafeHooks = new Set<string>([
    // Built-in hooks:
    'use',
    'useId',
    'useMemo',       // Confirmed by experimental that can be safely used in server components as pass-through.
    'useCallback',   // Confirmed by experimental that can be safely used in server components as pass-through.
    'useContext',    // Confirmed by experimental that can be safely used in server components.
    'useDebugValue', // Confirmed by experimental that can be safely used in server components.
    
    
    
    // Custom hooks:
    'useIsomorphicRef',
    
    'useStableCallback',
    'useMergedCallbacks',
    'useMergedAsyncCallbacks',
    
    'useStableEventHandler',
    'useMergedEventHandlers',
    'useMergedAsyncEventHandlers',
    
    'useMergedStyles',
    
    'useMergedRefs',
    
    'useResolvedSemanticAttributes',
    
    'useBareVariant',
    'useStylingVariants',
    
    'useControllableState',
    'useRangedState',
    'useCascadeState',
    'useObservableState',
    
    'useAnchorlessLink',
    // add more server-safe hooks here in the future
]);



/**
 * Determines if a given React hook name is client-side only.
 * 
 * Behavior:
 * - Returns `false` for known server-safe hooks (currently "use", "useId", "useMemo", "useCallback", "useContext", and "useDebugValue").
 * - Returns `true` for all other built-in and custom hooks.
 * 
 * Why:
 * - By default, hooks are assumed to be client-only.
 * - A small allow-list captures exceptions that can safely run in server components.
 * - Future server-safe hooks can be added to the allow-list.
 * 
 * Examples:
 * - isClientOnlyHook("useState")      → true
 * - isClientOnlyHook("useEffect")     → true
 * - isClientOnlyHook("use")           → false
 * - isClientOnlyHook("useId")         → false
 * - isClientOnlyHook("useMemo")       → false
 * - isClientOnlyHook("useCallback")   → false
 * - isClientOnlyHook("useContext")    → false
 * - isClientOnlyHook("useDebugValue") → false
 * - isClientOnlyHook("useMyHook")     → true
 */
export const isClientOnlyHook = (hookName: string): boolean => {
    // Normalize to exact identifier:
    const normalized = hookName.trim();
    
    return !serverSafeHooks.has(normalized);
};



/**
 * Checks whether a hook body contains at least one client-side React hook call.
 * 
 * Detection logic:
 * - Traverses the function body AST.
 * - Looks for `CallExpression` nodes whose callee is an identifier
 *   matching the `use*` hook naming convention (`/^use[A-Z]/`).
 * - Uses `isClientOnlyHook` to classify the hook.
 * - Returns `true` as soon as a client-side hook is found.
 * 
 * @param functionBody The AST block statement or expression representing the hook body.
 * @returns `true` if any client-side hook is invoked, otherwise `false`.
 */
export const hasClientOnlyHook = (functionBody: TSESTree.BlockStatement | TSESTree.Expression): boolean => {
    // Flag of the result:
    let found = false;
    
    
    
    // Traverse through functionBody tree:
    simpleTraverse(functionBody, {
        enter(node) {
            // Once found, no need for further check:
            if (found) return;
            
            
            
            // Only interested of call expression of React hook (`use*`):
            if (node.type !== TSESTree.AST_NODE_TYPES.CallExpression) return;
            if (node.callee.type !== TSESTree.AST_NODE_TYPES.Identifier) return;
            const name = node.callee.name;
            if (!/^use[A-Z]/.test(name)) return;
            
            // Only interested of known client hooks:
            if (!isClientOnlyHook(name)) return;
            
            
            
            // Found:
            found = true;
        },
    });
    
    
    
    // Return the result:
    return found;
};
