// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomRef,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * Blends two colors in the OKLCH color space using weighted proportions.
 * 
 * The weights are expected to be percentage CSS custom properties that resolve to values between 0% and 100%.
 * 
 * The resulting value is a `color-mix()` CSS function string that interpolates
 * between `colorA` and `colorB` according to the specified weights.
 * 
 * @param colorA  - The first color value.
 * @param weightA - The percentage weight (0%–100%) for `colorA`.
 * @param colorB  - The second color value.
 * @param weightB - The percentage weight (0%–100%) for `colorB`.
 * @returns A `color-mix()` CSS function string in OKLCH space.
 */
export const colorMix = (colorA: string, weightA: CssCustomRef, colorB: string, weightB: CssCustomRef): `color-mix(${string})` => `color-mix(in oklch, ${colorA} ${weightA}, ${colorB} ${weightB})`;
