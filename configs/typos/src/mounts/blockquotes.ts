// Utilities:
import {
    createTypographyMount,
}                           from '../internal-utilities.js'



/**
 * Mounts the blockquote stylesheet.
 */
export const mountBlockquotes = createTypographyMount({
    id            : '6h0f4cwli6', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/blockquotes.js'),
});
