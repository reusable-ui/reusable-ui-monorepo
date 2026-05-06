// Utilities:
import {
    createTypographyMount,
}                           from '../internal-utilities.js'



/**
 * Mounts the secondary stylesheet.
 */
export const mountSecondaries = createTypographyMount({
    id            : '6xcjkza3h9', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/secondaries.js'),
});
