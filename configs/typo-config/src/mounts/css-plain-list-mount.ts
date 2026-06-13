// Utilities:
import {
    createTypographyMount,
}                           from '../style-internal-mounts.js'



/**
 * Mounts the plainList stylesheet.
 */
export const mountPlainListStyle = createTypographyMount({
    id            : 'a1mvibmo4t', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/css-plain-list-style.js'),
});
