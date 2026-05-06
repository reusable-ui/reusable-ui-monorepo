// Utilities:
import {
    createTypographyMount,
}                           from '../internal-utilities.js'



/**
 * Mounts the emphasis stylesheet.
 */
export const mountEmphases = createTypographyMount({
    id            : '1uabr1zyyb', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/emphases.js'),
});
