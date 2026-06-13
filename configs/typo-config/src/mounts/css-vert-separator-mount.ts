// Utilities:
import {
    createTypographyMount,
}                           from '../style-internal-mounts.js'



/**
 * Mounts the vertical separator stylesheet.
 */
export const mountVertSeparatorStyle = createTypographyMount({
    id            : 'b1y9111nws', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/css-vert-separator-style.js'),
});
