// Utilities:
import {
    createTypographyMount,
}                           from '../internal-utilities.js'



/**
 * Mounts the horizontal separator stylesheet.
 */
export const mountHorzSeparators = createTypographyMount({
    id            : 'b1y9111nws', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/horzSeparators.js'),
});
