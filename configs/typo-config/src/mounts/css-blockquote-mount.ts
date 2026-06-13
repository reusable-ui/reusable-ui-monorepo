// Utilities:
import {
    createTypographyMount,
}                           from '../style-internal-mounts.js'



/**
 * Mounts the blockquote stylesheet.
 */
export const mountBlockquoteStyle = createTypographyMount({
    id            : '6h0f4cwli6', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/css-blockquote-style.js'),
});
