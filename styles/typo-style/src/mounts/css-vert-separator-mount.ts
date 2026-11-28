// Utilities:
import {
    createTypographyMount,
}                           from '../style-internal-mounts.js'



/**
 * Mounts the vertical separator stylesheet.
 */
export const mountVertSeparatorStyle = createTypographyMount({
    id            : 'gd91jliahx', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/css-vert-separator-style.js'),
});
