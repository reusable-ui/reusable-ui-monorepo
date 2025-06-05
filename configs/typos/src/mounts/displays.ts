// Utilities:
import {
    createTypographyMount,
}                           from '../internal-utilities.js'



/**
 * Mounts the display heading stylesheet.
 */
export const mountDisplays = createTypographyMount({
    id            : 'p7ufa8wbx4', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/displays.js'),
});
