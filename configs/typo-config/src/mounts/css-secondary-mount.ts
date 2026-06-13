// Utilities:
import {
    createTypographyMount,
}                           from '../style-internal-mounts.js'



/**
 * Mounts the secondary stylesheet.
 */
export const mountSecondaryStyle = createTypographyMount({
    id            : '6xcjkza3h9', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/css-secondary-style.js'),
});
