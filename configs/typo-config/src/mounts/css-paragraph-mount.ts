// Utilities:
import {
    createTypographyMount,
}                           from '../style-internal-mounts.js'



/**
 * Mounts the paragraph stylesheet.
 */
export const mountParagraphStyle = createTypographyMount({
    id            : '3jcwr3almp', // A unique salt for SSR support, ensuring the same class names across server and client.
    importFactory : () => import(/* DISABLE_webpackPrefetch: true */ '../styles/css-paragraph-style.js'),
});
