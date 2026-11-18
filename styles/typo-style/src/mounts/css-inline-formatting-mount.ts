// Utilities:
import {
    createTypographyMount,
}                           from '../style-internal-mounts.js'



/**
 * Mounts inline text formatting stylesheet.
 */
export const mountInlineFormattingStyle = createTypographyMount({
    id            : '1uabr1zyyb', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/css-inline-formatting-style.js'),
});
