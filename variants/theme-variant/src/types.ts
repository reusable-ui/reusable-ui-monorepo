// Reusable-ui configs:
import {
    type DefaultRootColors,
}                           from '@reusable-ui/colors'  // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.



/**
 * Represents the basic contextual themes of the component.
 * 
 * Common presets:
 * - `'primary'`   — core branding or primary site identity
 * - `'secondary'` — muted accent or complementary variant
 * - `'success'`   — positive actions and confirmations
 * - `'info'`      — neutral messages or informative context
 * - `'warning'`   — cautionary states and potential issues
 * - `'danger'`    — destructive actions or error indicators
 * - `'light'`     — suitable for overlaying dark backgrounds (e.g. over images)
 * - `'dark'`      — suitable for overlaying light backgrounds
 */
export type BasicTheme = keyof DefaultRootColors
