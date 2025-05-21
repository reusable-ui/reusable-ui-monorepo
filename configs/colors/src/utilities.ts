// Cssfn:
import {
    // CSS custom properties:
    type CssCustomSimpleRef,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type CssColor,
}                           from './types.js'

// Configs:
import {
    colorParams,
}                           from './colorParams.js'



// Utilities:

/**
 * **CSS Utility Formulas**
 * 
 * These formulas operate on a `ratio` value constrained between `-1` and `+1`, 
 * with an additional `mode` parameter (`-1` for dark, `+1` for light).
 * The composite ratio is `ratio * mode`, ensuring formulas adapt to themes.
 * 
 * Each formula defines a specific "zone" where the output reaches `1` 
 * under certain ratio conditions and declines toward `0` elsewhere.
 * 
 * ***Negative_Half_Range (Adaptive)***:
 * The output is `1` when `ratio * mode` is between `-1` and `0`, otherwise decreasing to `0`.
 * `min(1, (1 - (ratio * mode)))`           → As ratio moves from `-1 → 0 → +1`, result transitions `1 → 1 → 0`.
 * 
 * ***Positive_Peak (Adaptive)***:
 * The output is `1` only when `ratio * mode` is `+1`, otherwise decreasing to `0`.
 * `(1 - min(1, (1 - (ratio * mode))))`     → As ratio moves from `-1 → 0 → +1`, result transitions `0 → 0 → 1`.
 * 
 * ***Negative_Peak (Adaptive)***:
 * The output is `1` only when `ratio * mode` is `-1`, otherwise decreasing to `0`.
 * `max(0, (-1 * (ratio * mode)))`          → As ratio moves from `-1 → 0 → +1`, result transitions `1 → 0 → 0`.
 * 
 * ***Positive_Half_Range (Adaptive)***:
 * The output is `1` when `ratio * mode` is between `0` and `+1`, otherwise decreasing to `0`.
 * `(1 - max(0, (-1 * (ratio * mode))))`    → As ratio moves from `-1 → 0 → +1`, result transitions `0 → 1 → 1`.
 * 
 * ***Absolute_Extremes***:
 * The output is `1` when the ratio is either `-1` or `+1`, otherwise decreasing to `0`.
 * `max(ratio, (0 - ratio))`                → As ratio moves from `-1 → 0 → +1`, result transitions `1 → 0 → 1`.
 * Since the result is symmetrical, `mode` isn't needed.
 * This formula behaves like `abs(ratio)`, but since `abs()` lacks broad browser support, we avoid using it.
 * 
 * ***Zero_Focus***:
 * The output is `1` when the ratio is exactly `0`, otherwise decreasing to `0`.
 * `(1 - max(ratio, (0 - ratio)))`          → As ratio moves from `-1 → 0 → +1`, result transitions `0 → 1 → 0`.
 * Since the result is symmetrical, `mode` isn't needed.
 */



/**
 * Dynamically adjusts `originalColor` based on `ratio`, increasing brightness in **light mode** 
 * and decreasing brightness in **dark mode** while preserving color integrity.
 * 
 * **Parameters:**
 * - `ratio`: Constrained between `-1` and `+1`.
 * - `mode`: Controls the brightness direction:
 *   - `-1` for **dark mode** (reduces lightness when `ratio` is positive, increases it when negative).
 *   - `+1` for **light mode** (increases lightness when `ratio` is positive, reduces it when negative).
 * - A `compositeRatio` is calculated as `ratio * mode`, ensuring proper directional scaling.
 * 
 * **Behavior:**
 * - **Light Mode (`mode = 1`)**:
 *   - `ratio → -1` results in **pure black** (`oklch(0.00 0.000 hue / alpha)`).
 *   - `ratio → 0` keeps the **original color** unchanged.
 *   - `ratio → +1` results in **pure white** (`oklch(1.00 0.000 hue / alpha)`).
 * 
 * - **Dark Mode (`mode = -1`)**:
 *   - `ratio → -1` results in **pure white** (`oklch(1.00 0.000 hue / alpha)`).
 *   - `ratio → 0` keeps the **original color** unchanged.
 *   - `ratio → +1` results in **pure black** (`oklch(0.00 0.000 hue / alpha)`).
 * 
 * **Component Adjustments:**
 * - **Lightness:** 
 *   - Stays at `originalLightness` when `ratio ≈ 0`.
 *   - Moves toward `1` or `0` depending on `compositeRatio` and mode.
 * 
 * - **Chroma:** 
 *   - Stays at `originalChroma` when `ratio ≈ 0`.
 *   - Moves toward `0` when `compositeRatio ≈ -1` or `+1`, ensuring full neutral tones.
 * 
 * - **Hue & Alpha:** 
 *   - **Hue remains unchanged**, since extreme white/black do not affect hue.
 *   - **Alpha remains constant**, ensuring transparency is preserved.
 */
export const adjustLightness = (originalColor: CssColor, ratio: CssCustomSimpleRef): CssColor => {
    /**
     * **Lighten Formula (Brightness Adjustment)**
     * 
     * Adjusts the lightness of `originalColor` based on `ratio`, increasing brightness in **light mode** 
     * and decreasing brightness in **dark mode** while preserving color integrity.
     * 
     * **Parameters:**
     * - `ratio`: A value between `-1` and `+1`, controlling the intensity of adjustment.
     * - `mode` is `-1` for dark mode, `+1` for light mode.
     * - A `compositeRatio` is calculated as `ratio * autoMode` to determine final adjustments.
     * 
     * **Behavior:**
     * - When `compositeRatio → -1`, the color adjusts toward **pure black** (`oklch(0.00 0.000 hue / alpha)`).
     * - When `compositeRatio → 0`, the color remains **unchanged** (`originalColor`).
     * - When `compositeRatio → +1`, the color adjusts toward **pure white** (`oklch(1.00 0.000 hue / alpha)`).
     * 
     * **Component Adjustments:**
     * - **Lightness:** 
     *   - Matches `originalLightness` when `compositeRatio ≈ 0` → `Zero_Focus * originalLightness`.
     *   - Adjusts toward `0` when `compositeRatio ≈ -1` → `Positive_Peak * 0` → No additional formula needed.
     *   - Adjusts toward `1` when `compositeRatio ≈ +1` → `Positive_Peak * 1`.
     *   - **Final Formula:**
     *     ```ts
     *     calc((Zero_Focus * originalLightness) + Positive_Peak)
     *     ```
     * 
     * - **Chroma:** 
     *   - Matches `originalChroma` when `compositeRatio ≈ 0` → `Zero_Focus * originalChroma`.
     *   - Adjusts toward `0` when `compositeRatio ≈ -1` or `+1` → `Absolute_Extremes * 0` → No additional formula needed.
     *     ```ts
     *     calc(Zero_Focus * originalChroma)
     *     ```
     * 
     * - **Hue & Alpha:** 
     *   - **Hue remains unchanged**, since extreme white/black do not affect hue.
     *   - **Alpha remains constant**, ensuring transparency is preserved.
     * 
     * **Final Lighten Formula:**
     * ```
     *      oklch(from originalColor calc((Zero_Focus * originalLightness) + Positive_Peak) calc(Zero_Focus * originalChroma) h / alpha)
     *      =>
     *      oklch(from originalColor calc(((1 - max(ratio, (0 - ratio))) * l) + (1 - min(1, (1 - (ratio * mode))))) calc((1 - max(ratio, (0 - ratio))) * c) h / alpha)
     * ```
     */
    return [[
        // Cssfn library concatenates these dynamically:
        'oklch(from ', originalColor, ' calc(((1 - max(', ratio, ', (0 - ', ratio, '))) * l) + (1 - min(1, (1 - (', ratio, ' * ', colorParams.mode, '))))) calc((1 - max(', ratio, ', (0 - ', ratio, '))) * c) h / alpha)'
    ]] as CssColor;
};



/**
 * Dynamically adjusts `originalColor` to ensure optimal contrast against a background color.
 * It does **not** depend on dark or light mode settings, but rather detects whether `originalColor` is **dark or light** 
 * and adjusts accordingly to enhance **text readability**.
 * 
 * **Parameters:**
 * - `ratio`: Constrained between `-1` and `+1`.
 * - `autoMode`: Controls the contrast direction:
 *   - `-1` when `originalColor` is **brighter than** `flipThreshold` (needs darker contrast).
 *   - `+1` when `originalColor` is **darker than** `flipThreshold` (needs lighter contrast).
 * - A `compositeRatio` is calculated as `ratio * autoMode`, ensuring proper directional scaling.
 * 
 * **Behavior:**
 * - If `originalColor` is **relatively bright**, it adjusts toward **pure black** (`oklch(0.00 0.000 hue / alpha)`).
 * - If `originalColor` is **relatively dark**, it adjusts toward **pure white** (`oklch(1.00 0.000 hue / alpha)`).
 * - When `ratio ≈ 0`, the color remains **unchanged** (`originalColor`).
 * 
 * **Component Adjustments:**
 * - **Lightness:** 
 *   - Stays at `originalLightness` when `ratio ≈ 0`.
 *   - Moves toward `1` or `0` depending on `compositeRatio` and mode.
 * 
 * - **Chroma:** 
 *   - Stays at `originalChroma` when `ratio ≈ 0`.
 *   - Moves toward `0` when `compositeRatio ≈ -1` or `+1`, ensuring full neutral tones.
 * 
 * - **Hue & Alpha:** 
 *   - **Hue remains unchanged**, since extreme white/black do not affect hue.
 *   - **Alpha remains constant**, ensuring transparency is preserved.
 */
export const contrastFlip = (originalColor: CssColor, ratio: CssCustomSimpleRef): CssColor => {
    /**
     * **Flip Formula (Contrast Adjustment)**
     * 
     * Adjusts the lightness of `originalColor` based on `ratio`, dynamically flipping 
     * between light and dark based on contrast needs while preserving color integrity.
     * 
     * **Parameters:**
     * - `ratio`: A value between `-1` and `+1`, controlling the intensity of adjustment.
     * - `autoMode`: Automatically determined:
     *   - `-1` when `originalColor` is **brighter than** `flipThreshold` (needs dark contrast).
     *   - `+1` when `originalColor` is **darker than** `flipThreshold` (needs light contrast).
     * - A `compositeRatio` is calculated as `ratio * autoMode` to determine final adjustments.
     * 
     * **Auto Contrast Detection Formula:**
     * - `autoMode` must be either **-1 or +1**, never fractional.
     * - Formula: 
     *   ```ts
     *   clamp(-1, (flipThreshold - originalLightness) * 999999, 1)
     *   ```
     * - This ensures even the smallest difference **snaps the value to -1 or +1**, providing **consistent contrast adjustments**.
     * 
     * **Auto_Positive_Peak Formula:**
     * - Derived from `Positive_Peak`, replacing `mode` with `autoMode`:
     *   ```ts
     *   (1 - min(1, (1 - (ratio * clamp(-1, (flipThreshold - originalLightness) * 999999, 1)))))
     *   ```
     * - Ensures correct contrast shift based on detected lightness.
     * 
     * **Behavior:**
     * - If `originalColor` is **relatively bright**, it adjusts toward **pure black** (`oklch(0.00 0.000 hue / alpha)`).
     * - If `originalColor` is **relatively dark**, it adjusts toward **pure white** (`oklch(1.00 0.000 hue / alpha)`).
     * - When `compositeRatio ≈ 0`, the color remains **unchanged** (`originalColor`).
     * 
     * **Component Adjustments:**
     * - **Lightness:** 
     *   - Matches `originalLightness` when `compositeRatio ≈ 0` → `Zero_Focus * originalLightness`.
     *   - Adjusts toward `0` when `compositeRatio ≈ -1` → `Auto_Positive_Peak * 0` → No additional formula needed.
     *   - Adjusts toward `1` when `compositeRatio ≈ +1` → `Auto_Positive_Peak * 1`.
     *   - **Final Formula:**
     *     ```ts
     *     calc((Zero_Focus * originalLightness) + Auto_Positive_Peak)
     *     ```
     * 
     * - **Chroma:** 
     *   - Matches `originalChroma` when `compositeRatio ≈ 0` → `Zero_Focus * originalChroma`.
     *   - Adjusts toward `0` when `compositeRatio ≈ -1` or `+1` → `Absolute_Extremes * 0` → No additional formula needed.
     *   - **Final Formula:**
     *     ```ts
     *     calc(Zero_Focus * originalChroma)
     *     ```
     * 
     * - **Hue & Alpha:** 
     *   - **Hue remains unchanged**, since extreme white/black do not affect hue.
     *   - **Alpha remains constant**, ensuring transparency is preserved.
     * 
     * **Final Lighten Formula:**
     * ```
     *      oklch(from originalColor calc((Zero_Focus * originalLightness) + Auto_Positive_Peak) calc(Zero_Focus * originalChroma) h / alpha)
     *      =>
     *      oklch(from originalColor calc(((1 - max(ratio, (0 - ratio))) * l) + (1 - min(1, (1 - (ratio * clamp(-1, (flipThreshold - originalLightness) * 999999, 1)))))) calc((1 - max(ratio, (0 - ratio))) * c) h / alpha)
     * ```
     */
    return [[
        // Cssfn library concatenates these dynamically:
        'oklch(from ', originalColor, ' calc(((1 - max(', ratio, ', (0 - ', ratio, '))) * l) + (1 - min(1, (1 - (', ratio, ' * clamp(-1, (', colorParams.flipThreshold, ' - l) * 999999, 1)))))) calc((1 - max(', ratio, ', (0 - ', ratio, '))) * c) h / alpha)'
    ]] as CssColor;
};



/**
 * Adjusts the transparency of `originalColor` based on `relativeRatio`.
 * 
 * - A **positive `relativeRatio`** increases opacity (makes the color more solid).
 * - A **negative `relativeRatio`** decreases opacity (makes the color more transparent).
 * - If `relativeRatio` is `0`, the original opacity remains unchanged.
 * 
 * **Formula Behavior:**
 * - `alpha * (1 + relativeRatio)`: 
 *   - Scales alpha based on `relativeRatio` to either **increase or decrease opacity**.
 * - `clamp(0.05, alpha * (1 + relativeRatio), 1)`: 
 *   - Ensures alpha never drops below `0.05` (prevents full invisibility).
 *   - Caps opacity at `1` (ensures full opacity).
 */
export const adjustOpacity = (originalColor: CssColor, relativeRatio: CssCustomSimpleRef): CssColor => {
    return [[
        // Cssfn library concatenates these dynamically:
        'oklch(from ', originalColor, ' l c h / clamp(0.05, alpha * (1 + ', relativeRatio, '), 1))'
    ]] as CssColor;
};
