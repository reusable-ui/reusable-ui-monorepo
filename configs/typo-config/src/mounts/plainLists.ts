// Utilities:
import {
    createTypographyMount,
}                           from '../internal-utilities.js'



/**
 * Mounts the plainList stylesheet.
 */
export const mountPlainLists = createTypographyMount({
    id            : 'a1mvibmo4t', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/plainLists.js'),
});
