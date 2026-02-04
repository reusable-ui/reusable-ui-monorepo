'use client'; // The exported `<RouterLinkCompat>` component is client side only.
// React:
import React from 'react';
// React Router:
import { Link, } from 'react-router';
// Reusable-ui utilities:
import { 
// Hooks:
useAnchorlessLink, } from '@reusable-ui/link-compat'; // A compatibility utility for transforming nested <Link> structures into clean, anchorless interactive elements.
/**
 * A React Router-compatible `<Link>` component that supports anchorless rendering.
 */
const RouterLinkCompat = (props) => {
    // Transform the `<Link>` element into an "anchorless" structure (if applicable):
    // The `anchorless` and `passHref` props will be automatically removed by `useAnchorlessLink()`.
    return useAnchorlessLink(React.createElement(Link, { ...props })); // The returned element is guaranteed to be a valid ReactElement.
};
export { // Familiar alias for drop-in usage.
RouterLinkCompat, // Named export for readability.
RouterLinkCompat as default, // Default export to support React.lazy.
RouterLinkCompat as Link, // Familiar alias for drop-in usage.
 };
