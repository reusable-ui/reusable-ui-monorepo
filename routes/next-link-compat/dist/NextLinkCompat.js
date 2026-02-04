'use client'; // The exported `<NextLinkCompat>` component is client side only.
// React:
import React from 'react';
// Next.js:
import { default as Link, } from 'next/link';
// Reusable-ui utilities:
import { 
// Hooks:
useAnchorlessLink, } from '@reusable-ui/link-compat'; // A compatibility utility for transforming nested <Link> structures into clean, anchorless interactive elements.
/**
 * A Next.js-compatible `<Link>` component that supports anchorless rendering.
 */
const NextLinkCompat = (props) => {
    // Transform the `<Link>` element into an "anchorless" structure (if applicable):
    // The `anchorless` and `passHref` props will be automatically removed by `useAnchorlessLink()`.
    return useAnchorlessLink(React.createElement(Link, { ...props })); // The returned element is guaranteed to be a valid ReactElement.
};
export { // Familiar alias for drop-in usage.
NextLinkCompat, // Named export for readability.
NextLinkCompat as default, // Default export to support React.lazy.
NextLinkCompat as Link, // Familiar alias for drop-in usage.
 };
