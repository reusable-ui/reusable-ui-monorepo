// Utilities:
import {
    createTypographyMount,
}                           from '../internal-utilities.js'



/**
 * Mounts the mark stylesheet.
 */
export const mountMarkStyle = createTypographyMount({
    id            : 'jtbgwy6kbb', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/marks.js'),
});
