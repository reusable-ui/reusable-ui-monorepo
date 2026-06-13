// Utilities:
import {
    createTypographyMount,
}                           from '../style-internal-mounts.js'



/**
 * Mounts the typography stylesheet.
 */
export const mountTypographyStyle = createTypographyMount({
    id            : 'wnmkok4wrw', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/css-typography-style.js'),
});
