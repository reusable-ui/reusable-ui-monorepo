// Utilities:
import {
    createTypographyMount,
}                           from '../internal-utilities.js'



/**
 * Mounts the kbd stylesheet.
 */
export const mountKbds = createTypographyMount({
    id            : 'dxux9w7w0j', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/kbds.js'),
});
