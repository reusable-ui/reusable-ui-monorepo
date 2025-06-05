// Utilities:
import {
    createTypographyMount,
}                           from '../internal-utilities.js'



/**
 * Mounts the heading stylesheet.
 */
export const mountHeadings = createTypographyMount({
    id            : 'n5yxez3ko5', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/headings.js'),
});
