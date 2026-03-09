/**
 * A mapping of variant role → surface role → semantic role.
 * Determines the appropriate semantic role for a given component variant and surface.
 * 
 * This mapping defines which semantic roles apply to each variant and surface.
 * 
 * The color variables within `colorVars` follow the naming convention:
 * ```ts
 * const semanticRole  = colorRoleMap[variantRole][surfaceRole];
 * const expectedColor = colorVars[`${themeRole}${semanticRole}`];
 * ```
 * 
 * ### Roles
 * 
 * **variantRole** — the component style variant:
 * - **regular**  → The default solid styling.
 * - **mild**     → A comfortable, text-heavy style for readability and reduced visual intensity.
 * - **outlined** → A transparent style, exposing background surfaces (e.g., images).
 * 
 * **themeRole** — the thematic role:
 * - **primary**   → The site's core branding or company identity color.
 * - **secondary** → A visual alternative to primary, used for supportive accents (e.g., table rows, secondary actions).
 * - **success**   → Indicates positive actions, confirmations, or successful states.
 * - **info**      → Represents informational messages or neutral states.
 * - **warning**   → Signifies cautionary actions or potential issues.
 * - **danger**    → Denotes destructive actions, errors, or critical states.
 * - **light**     → A light color against a dark background or a softer accent.
 * - **dark**      → A dark color against a light background or a strong accent.
 * 
 * **surfaceRole** — the UI surface where color is applied:
 * - **backg**  → The background surface of the component.
 * - **foreg**  → The foreground surface (text).
 * - **decor**  → The decoration surface (icons, graphics).
 * - **border** → The border/outline surface.
 * - **ring**   → The ring/focus surface (ring focus indicators).
 * 
 * **semanticRole** — the functional color role:
 * - **Base** → A strong background color adapted to the theme.
 * - **Mild** → A softer background color for text-heavy components.
 * - **Flip** → A high-contrast foreground and decoration color against base.
 * - **Text** → A comfortable foreground-only color for readability.
 * - **Face** → A high-saturation foreground and decoration color for graphic-like elements.
 * - **Bold** → A strong border color for regular components.
 * - **Thin** → A softer border color for mild components.
 * - **Edge** → A high-saturation border color for outlined components.
 * - **Soft** → An effect color for rings, overlays, and emphasis.
 */
export const colorRoleMap = {
    regular: {
        backg  : 'Base', // A strong background color.
        foreg  : 'Flip', // A high-contrast foreground color.
        decor  : 'Flip', // A high-contrast decoration color.
        border : 'Bold', // A strong border color.
        ring   : 'Soft', // An effect color.
    },
    mild: {
        backg  : 'Mild', // A softer background color.
        foreg  : 'Text', // A comfortable foreground-only color.
        decor  : 'Face', // A high-saturation decoration color.
        border : 'Thin', // A softer border color.
        ring   : null,   // No mild-specific ring color (use regular).
    },
    outlined: {
        backg  : null,   // No background color (transparent).
        foreg  : 'Face', // A high-saturation foreground color.
        decor  : 'Face', // A high-saturation decoration color.
        border : 'Edge', // A high-saturation border color.
        ring   : null,   // No outlined-specific ring color (use regular).
    },
};
