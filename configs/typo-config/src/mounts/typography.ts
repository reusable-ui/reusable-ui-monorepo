// Utilities:
import {
    createTypographyMount,
}                           from '../internal-utilities.js'



/**
 * Mounts the typography stylesheet.
 */
export const mountTypography = createTypographyMount({
    id            : 'wnmkok4wrw', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/typography.js'),
});
