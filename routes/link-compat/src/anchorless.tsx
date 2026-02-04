// React:
import React, {
    // Types:
    type ReactNode,
    type ReactElement,
    type ComponentProps,
    type JSXElementConstructor,
    type ProviderProps,
    
    
    
    // Utilities:
    isValidElement,
    cloneElement,
}                           from 'react'

// Reusable-ui utilities:
import {
    isForwardRefElement,
}                           from '@reusable-ui/nodes'           // A comprehensive utility library for efficiently managing React nodes, including fragments, forward refs, and nested structures.
import {
    useMergeEventHandlers,
}                           from '@reusable-ui/callbacks'       // A utility package providing stable and merged callback functions for optimized event handling and performance.
import {
    useMergeRefs,
}                           from '@reusable-ui/references'      // A utility package for managing and merging React refs efficiently.

// Types:
import {
    // Types:
    type CompatLinkProps,
}                           from './types.js'

// Utilities:
import {
    extractFirstAnchor,
}                           from './internal-utilities.js'



/**
 * A React hook that transforms a compatibility-aware `<Link>` element
 * into an "anchorless" structure by extracting its inner interactive element
 * from the rendered output and reconstructing it with essential navigation props.
 * 
 * This hook **does not rely on the input props** passed into the `<Link>` component.
 * Instead, it inspects the **rendered JSX structure** produced by the component
 * and rewrites it — removing the wrapping `<a>` element and hoisting its props
 * (e.g. `href`, `ref`, `onClick`, etc.) onto the nested interactive child element.
 * 
 * During transformation, this hook:
 * - If no native `<a>` element is found, the hook returns the node unmodified.
 * - Extracts and discards the wrapping `<a>` element.
 * - Forwards its `ref`, `onClick`, `onMouseEnter`, and `onTouchStart` handlers to the interactive element.
 * - Optionally forwards `href` as well, if `passHref` is explicitly enabled.
 * 
 * This is useful when flattening `<Link>` components in compatibility layers
 * (e.g. from Next.js or React Router) to remove nested anchor structures.
 * 
 * @param linkElement - The JSX `<Link>` element to transform.
 * @returns A reconstructed JSX node with anchorless behavior, or the original JSX if transformation is not applicable.
 * 
 * @example
 * ```tsx
 * import { BaseLink, BaseLinkProps } from 'framework-specific-link';
 * import { useAnchorlessLink, CompatLinkProps } from '@reusable-ui/link-compat';
 * 
 * export interface CustomCompatibleLinkProps extends BaseLinkProps, CompatLinkProps {
 *     href     : string
 *     children : ReactNode
 * }
 * 
 * const CustomCompatibleLink = (props: CustomCompatibleLinkProps) => {
 *     const result = useAnchorlessLink(
 *         <BaseLink {...props} />
 *     );
 *     
 *     return result;
 * };
 * ```
 */
export const useAnchorlessLink = (linkElement: ReactElement<CompatLinkProps, string | JSXElementConstructor<unknown>>): ReactNode => {
    // Extract props from the original `<Link>` and assign defaults:
    const {
        // Managed props (not passed into the underlying `<Link>`):
        anchorless = false,
        passHref   = false,
        
        
        
        // Remaining props forwarded to the underlying `<Link>`:
        ...linkProps
    } = linkElement.props;
    
    
    
    // Exit early if anchorless rendering is not requested:
    // ⤷ Recreate the original element, explicitly omitting `anchorless` and `passHref`.
    if (!anchorless) return <linkElement.type {...linkProps} />;
    
    
    
    /**
     * Expected JSX structure:
     * 
     * <FunctionComponent | ForwardRefOfFunctionComponent>        // Required — the `linkElement` passed to `useAnchorlessLink()`
     *     <ForwardRefOfFunctionComponent>                        // Optional — e.g. nested <Link> inside a <NavLink> wrapper
     *         <ContextProvider>                                  // Optional — supplies routing or layout context
     *             <Fragment>                                     // Optional — groups anchor and side elements
     *                 
     *                 <a>                                        // ✅ Target anchor to unwrap
     *                     <InteractiveElement />                 // Interactive child (e.g. <button>, <Card />)
     *                 </a>
     *                 
     *                 <Side />                                   // Optional side elements to preserve (e.g. <Prefetch>)
     *                 <Side />
     *                 <Side />
     *                 
     *             </Fragment>
     *         </ContextProvider>
     *     </ForwardRefOfFunctionComponent>
     * </FunctionComponent | ForwardRefOfFunctionComponent>
     */
    
    
    
    // Invoke the top-most rendered content of `<LinkComponent>`:
    const renderedNode : ReactNode = (
        isForwardRefElement(linkElement)
        
        // Render `<FunctionComponent>` wrapped in `<ForwardRef>`:
        ? (linkElement.type as any).render(linkProps, linkElement.props.ref)
        
        // Render `<FunctionComponent>`:
        : (linkElement.type as any)(linkProps)
    );
    
    
    
    // Attempt to extract the first native `<a>` element from the rendered structure:
    const extraction = extractFirstAnchor(renderedNode);
    
    
    
    // If no extraction result, return the original structure:
    if (!extraction) {
        // Dev-only warning: unrecognized JSX structure or unsupported `<Link>` output:
        if (process.env.NODE_ENV !== 'production') {
            console.warn(
                '[useAnchorlessLink] No <a> tag found to unwrap. This may indicate an unsupported structure or a bug.\n' +
                'If you believe this is incorrect, please report it: https://github.com/reusable-ui/reusable-ui-monorepo/issues'
            );
        } // if
        
        return renderedNode;
    } // if
    
    
    
    // Destructure the extraction:
    const {
        context,
        anchor,
        sides,
    } = extraction;
    
    
    
    // Ensure the anchor has a valid single interactive element to unwrap, otherwise return the original structure:
    const interactiveElement = anchor.props.children;
    if (!isValidElement<ComponentProps<'a'>>(interactiveElement)) return renderedNode;
    
    
    
    // Extract the essential client-side navigation props from the rendered `<a>` element:
    const {
        // Refs:
        ref          : anchorRef,
        
        
        
        // Navigations:
        href,
        
        
        
        // Handlers:
        onClick      : anchorOnClick,
        onMouseEnter : anchorOnMouseEnter,
        onTouchStart : anchorOnTouchStart,
    } = anchor.props;
    
    
    
    // Merge ref listeners to preserve both the original ref listener and the additional ref listener for client-side navigation are updated:
    const mergedRefs = useMergeRefs(
        // The original ref listener of interactive element:
        interactiveElement.props.ref,
        
        
        
        // The additional ref listener for client-side navigation:
        anchorRef,
    );
    
    
    
    // Merge event handlers to preserve both the original event handler and the additional event handler for client-side navigation are invoked:
    const mergedHandleClick      = useMergeEventHandlers(
        // The original event handler of interactive element:
        interactiveElement.props.onClick,
        
        
        
        // The additional event handler for client-side navigation:
        anchorOnClick,
    );
    const mergedHandleMouseEnter = useMergeEventHandlers(
        // The original event handler of interactive element:
        interactiveElement.props.onMouseEnter,
        
        
        
        // The additional event handler for client-side navigation:
        anchorOnMouseEnter,
    );
    const mergedHandleTouchStart = useMergeEventHandlers(
        // The original event handler of interactive element:
        interactiveElement.props.onTouchStart,
        
        
        
        // The additional event handler for client-side navigation:
        anchorOnTouchStart,
    );
    
    
    
    // Clone the interactive element with the essential client-side navigation props, so the navigation works:
    const updatedInteractiveElement = cloneElement<ComponentProps<'a'>>(interactiveElement,
        // Props:
        {
            // Identifiers:
            key: anchor.key ?? interactiveElement.key,
            
            
            
            // Refs:
            ref          : mergedRefs,
            
            
            
            // Navigations:
            // Pass `href` only if requested:
            ...(passHref ? { href } : undefined),
            
            
            
            // Handlers:
            onClick      : mergedHandleClick,
            onMouseEnter : mergedHandleMouseEnter,
            onTouchStart : mergedHandleTouchStart,
        },
    );
    
    
    
    // Rebuild the component tree, preserving original structure:
    const mergedChildren = (
        sides
        
        ? <>
            {/* The interactive element: */}
            {updatedInteractiveElement}
            
            {/* Wrap `sides` in a fragment to isolate key space from `updatedInteractiveElement`: */}
            <>
                {sides}
            </>
        </>
        
        : updatedInteractiveElement
    );
    return (
        context
        
        ? cloneElement<ProviderProps<unknown>>(context,
            // Props:
            undefined,
            
            // Children:
            mergedChildren,
        )
        
        : mergedChildren
    );
};
