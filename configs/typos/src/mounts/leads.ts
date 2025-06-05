// Utilities:
import {
    createTypographyMount,
}                           from '../internal-utilities.js'



/**
 * Mounts the lead paragraph stylesheet.
 */
export const mountLeads = createTypographyMount({
    id            : 'dnycox8vns', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/leads.js'),
});
