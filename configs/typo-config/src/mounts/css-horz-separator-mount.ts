// Utilities:
import {
    createTypographyMount,
}                           from '../internal-utilities.js'



/**
 * Mounts the horizontal separator stylesheet.
 */
export const mountHorzSeparatorStyle = createTypographyMount({
    id            : 'b1y9111nws', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/css-horz-separator-style.js'),
});
