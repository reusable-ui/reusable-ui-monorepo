// Utilities:
import {
    createTypographyMount,
}                           from '../internal-utilities.js'



/**
 * Mounts the vertical separator stylesheet.
 */
export const mountVertSeparatorStyle = createTypographyMount({
    id            : 'b1y9111nws', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/css-vert-separator-style.js'),
});
