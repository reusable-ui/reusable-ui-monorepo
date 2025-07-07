'use client' // The exported `useOptionalLinkWrapper()` hook is client side only.

// React:
import {
    // React:
    default as React,
    
    
    
    // Types:
    type ReactElement,
    type JSXElementConstructor,
    type PropsWithChildren,
    
    
    
    // Hooks:
    useMemo,
    
    
    
    // Utilities:
    cloneElement,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'       // A utility package providing stable and merged callback functions for optimized event handling and performance.
import {
    // Types:
    type SemanticProps,
    
    
    
    // Hooks:
    useResolvedSemanticAttributes,
}                           from '@reusable-ui/semantics'       // Semantic utility for resolving tag and role behaviors in reusable UI components.
import {
    // Types:
    type AccessibilityProps,
    
    
    
    // Hooks:
    useResolvedAccessibilityState,
}                           from '@reusable-ui/accessibilities' // Composable React utilities for resolving enabled, readOnly, and active state with optional cascading context.

// Utilities:
import {
    // Types:
    type ClientLinkElement,
    type LinkExtractionResult,
    
    
    
    // Utilities:
    extractFirstClientLink,
    mergeProps,
}                           from './internal-utilities.js'



/**
 * Creates a React element that mirrors the `originalElement`,
 * while conditionally enhancing it with client-side `<Link>` behavior.
 * 
 * If the `originalElement`’s children contain a supported client-side `<Link>` element
 * (e.g., from Next.js or React Router), this function:
 * - Unwraps the `<Link>` and preserves its child content.
 * - Merges the `<Link>`’s children with the `originalElement`’s children.
 * - Re-wraps the updated element inside the detected `<Link>` with proper semantics.
 * 
 * @template TProps - The original element’s props type (must support children, accessibility, and semantics).
 * @param originalElement - The original JSX element to enhance with optional client navigation behavior.
 * @param propOverrides - Optionally overrides props from `originalElement` during cloning.
 * @returns A new React element: either the enhanced `originalElement`, or it wrapped inside a client-side `<Link>`.
 */
const renderWithLinkIfPresent = <TProps extends PropsWithChildren<AccessibilityProps & SemanticProps>>(originalElement: ReactElement<TProps, string | JSXElementConstructor<unknown>>, propOverrides: Partial<TProps>): ReactElement<TProps | ClientLinkElement['props'], string | JSXElementConstructor<unknown>> => {
    // Extract the `originalElement`’s children for inspection:
    const originalChildren = originalElement.props.children;
    
    
    
    // Attempt to extract and unwrap the first client-side `<Link>` element inside the children tree:
    const extraction = useMemo<LinkExtractionResult | null>(() =>
        extractFirstClientLink(originalChildren)
    , [originalChildren]);
    
    
    
    // If no `<Link>` is detected, return the original element with merged props:
    if (!extraction) return cloneElement<TProps>(originalElement,
        // Props:
        mergeProps<TProps>(
            // Original’s-defined props:
            originalElement.props,
            
            // No merged children here, still the same as in original’s-defined props:
            
            // External overrides (e.g., from `cloneElement()`):
            propOverrides,
        ),
    ) as ReactElement<TProps, JSXElementConstructor<unknown>>;
    
    
    
    // Resolve semantic behavior and accessibility state of the original element:
    const { tag     : resolvedTag } = useResolvedSemanticAttributes(originalElement.props);
    const isAnchorElement = (resolvedTag === 'a');
    
    const { enabled : isEnabled   } = useResolvedAccessibilityState(originalElement.props);
    
    
    
    // Extract link and merged children:
    const {
        link: detectedLinkElement,
        mergedChildren,
    } = extraction;
    
    
    
    // Clone the original element with merged children:
    const enhancedElement = cloneElement<TProps>(originalElement,
        // Props:
        mergeProps<TProps>(
            // Original’s-defined props:
            originalElement.props,
            
            // Merged children from original’s-defined props + `<Link>`’s children:
            { children : mergedChildren as TProps['children'] } as TProps,
            
            // External overrides (e.g., from `cloneElement()`):
            propOverrides,
        ),
    ) as ReactElement<TProps, JSXElementConstructor<unknown>>;
    
    
    
    // If disabled, skip wrapping with `<Link>`, return unwrapped enhanced element:
    if (!isEnabled) return enhancedElement;
    
    
    
    // Re-wrap the enhanced element inside the detected `<Link>`:
    return cloneElement<ClientLinkElement['props']>(detectedLinkElement,
        // Props:
        {
            anchorless : true,
            passHref   : isAnchorElement, // Pass `href` only if the original element is an anchor (`<a>`).
        },
        
        
        
        // Children:
        enhancedElement,
    ) as ReactElement<ClientLinkElement['props'], JSXElementConstructor<unknown>>;
};

/**
 * Returns a React element that is externally compatible with the given `originalElement`,
 * while conditionally enhancing it with client-side `<Link>` behavior.
 * 
 * The returned element accepts the same props shape as `originalElement`, allowing
 * consumers to interact with it (e.g., via `cloneElement()`, prop overrides, or event handlers)
 * as if it were the `originalElement` — regardless of whether a `<Link>` is present internally.
 * 
 * If the `originalElement`’s children contain a supported client-side `<Link>` element
 * (e.g., from Next.js or React Router), this function:
 * - Unwraps the `<Link>` and preserves its child content.
 * - Merges the `<Link>`’s children with the `originalElement`’s children.
 * - Re-wraps the updated element inside the detected `<Link>` with proper semantics.
 * 
 * This abstraction prevents structural instability caused by conditionally swapping JSX trees
 * (such as toggling between `<BaseComponent>` and `<Link><BaseComponent /></Link>`).
 * 
 * @template TProps - The original element’s props type (must support children, accessibility, and semantics).
 * @param originalElement - The original JSX element to enhance with optional client navigation behavior.
 * @returns A React element with a stable `type` that mirrors `originalElement` but may render `<Link>`-enhanced output.
 * 
 * @example
 * ```tsx
 * import { useOptionalLinkWrapper } from '@reusable-ui/links';
 * 
 * interface SmartButtonProps extends BaseButtonProps {}
 * 
 * const SmartButton = (props: SmartButtonProps) => {
 *     // Enhances the <BaseButton> with client-side link detection (e.g., <Link> from Next.js or React Router):
 *     return useOptionalLinkWrapper(
 *         <BaseButton {...props} />
 *     );
 * };
 * 
 * // Usage:
 * <SmartButton className='primary'>
 *     <Link href='/dashboard'>Go to Dashboard</Link>
 * </SmartButton>
 * 
 * // Renders as:
 * <Link href='/dashboard' anchorless passHref>
 *     <BaseButton className='primary'>Go to Dashboard</BaseButton>
 * </Link>
 * ```
 */
export const useOptionalLinkWrapper = <TProps extends PropsWithChildren<AccessibilityProps & SemanticProps>>(originalElement: ReactElement<TProps, string | JSXElementConstructor<unknown>>): ReactElement<Partial<TProps>, JSXElementConstructor<unknown>> => {
    // Define a stable functional wrapper component that accepts overrides:
    const LinkAwareComponent = useStableCallback(<TOverrideProps extends Partial<PropsWithChildren<AccessibilityProps & SemanticProps>>>(propOverrides: TOverrideProps) => {
        return renderWithLinkIfPresent<TOverrideProps>(originalElement as unknown as ReactElement<TOverrideProps, string | JSXElementConstructor<unknown>>, propOverrides);
    });
    
    
    
    // Sets a readable name for debugging in React DevTools:
    if (process.env.NODE_ENV === 'development') {
        // @ts-expect-error: allowed for dev-friendly diagnostics
        LinkAwareComponent.displayName = 'LinkAwareComponent';
    } // if
    
    
    
    // Return an element of the functional wrapper. This creates a structurally stable component type
    // that consumers can safely wrap, clone, and interact with as if it were the `originalElement`:
    return <LinkAwareComponent<Partial<TProps>> />;
};
