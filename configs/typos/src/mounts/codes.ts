// Utilities:
import {
    createTypographyMount,
}                           from '../internal-utilities.js'



/**
 * Mounts the code stylesheet.
 */
export const mountCodes = createTypographyMount({
    id            : 'h42u1er4ya', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/codes.js'),
});
