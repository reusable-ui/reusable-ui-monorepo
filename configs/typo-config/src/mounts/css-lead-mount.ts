// Utilities:
import {
    createTypographyMount,
}                           from '../style-internal-mounts.js'



/**
 * Mounts the lead paragraph stylesheet.
 */
export const mountLeadStyle = createTypographyMount({
    id            : 'dnycox8vns', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/css-lead-style.js'),
});
