'use client'; // The exported `<RouterNavLinkCompat>` component is client side only.
// React:
import React from 'react';
// React Router:
import { NavLink, } from 'react-router';
// Reusable-ui utilities:
import { 
// Hooks:
useAnchorlessLink, } from '@reusable-ui/link-compat'; // A compatibility utility for transforming nested <Link> structures into clean, anchorless interactive elements.
/**
 * A React Router-compatible `<NavLink>` component that supports anchorless rendering.
 */
const RouterNavLinkCompat = (props) => {
    // Transform the `<NavLink>` element into an "anchorless" structure (if applicable):
    // The `anchorless` and `passHref` props will be automatically removed by `useAnchorlessLink()`.
    return useAnchorlessLink(React.createElement(NavLink, { ...props })); // The returned element is guaranteed to be a valid ReactElement.
};
export { // Familiar alias for drop-in usage.
RouterNavLinkCompat, // Named export for readability.
RouterNavLinkCompat as default, // Default export to support React.lazy.
RouterNavLinkCompat as NavLink, // Familiar alias for drop-in usage.
 };
