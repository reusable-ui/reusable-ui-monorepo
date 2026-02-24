import chroma from 'chroma-js'



/**
 * Mixes two colors in a way that mimics CSS `color-mix()`:
 * - Factor is clamped to [0,1] (no extrapolation).
 * - Alpha values determine how much each color contributes.
 * - Channel mixing is done in OKLCH space with both colors forced opaque.
 * - Final alpha is interpolated linearly between the two inputs.
 */
export const colorMix = (colorA: string, colorB: string, factor: number): string => {
    // Clamp factor to [0,1] to match CSS spec
    const clampedFactor = Math.min(1, Math.max(0, factor));
    
    const parsedColorA = chroma(colorA);
    const parsedColorB = chroma(colorB);
    
    const alphaA = parsedColorA.alpha();
    const alphaB = parsedColorB.alpha();
    
    // Compute effective contribution weights based on alpha and clamped factor
    const weightA = (alphaA / (alphaA + alphaB + 1e-6)) * (1 - clampedFactor);
    const weightB = (alphaB / (alphaA + alphaB + 1e-6)) * clampedFactor;
    
    // Normalize weights to [0..1] for chroma.mix
    const totalWeight = weightA + weightB;
    const normalizedWeightB = totalWeight > 0 ? weightB / totalWeight : 0;
    
    // Mix the two colors with alpha forced to 1 (opaque)
    const mixedOpaque = chroma.mix(
        parsedColorA.alpha(1),
        parsedColorB.alpha(1),
        normalizedWeightB,
        'oklch'
    );
    
    // Interpolate alpha linearly (browser behavior)
    const finalAlpha = alphaA * (1 - clampedFactor) + alphaB * clampedFactor;
    
    return mixedOpaque.alpha(finalAlpha).css('oklch');
};



/**
 * Applies brightness, contrast, and saturation filters sequentially,
 * approximating CSS filter behavior. Mode awareness is handled in brightness:
 * - Light mode uses brightness directly.
 * - Dark mode uses the reciprocal of brightness.
 */
export const applyFiltersSequential = (
    baseColor: string,
    factor: number,
    { brightness, contrast, saturate, mode }: {
        brightness: number;
        contrast: number;
        saturate: number;
        mode: 'light' | 'dark';
    }
): string => {
    let adjustedColor = chroma(baseColor);
    
    // Mode-aware brightness: dark mode inverts the brightness factor.
    const effectiveBrightness = mode === 'light' ? brightness : (1.25 - (brightness - 0.7) * 0.75);
    adjustedColor = adjustedColor.brighten((effectiveBrightness - 1) * factor);
    
    // Contrast approximation: nudges lightness up/down relative to midpoint.
    adjustedColor = adjustedColor.brighten((contrast - 1) * factor);
    
    // Saturation adjustment: increases or decreases vividness.
    adjustedColor = adjustedColor.saturate((saturate - 1) * factor);
    
    return adjustedColor.css('oklch');
};



/**
 * Compares two colors using perceptual difference (ΔE, CIEDE2000).
 * - ΔE < 1 → visually indistinguishable.
 * - ΔE < 6 → acceptable tolerance for most UI tests.
 * Throws an error if the difference exceeds MAX_DEVIATION.
 */
const MAX_DEVIATION = 6; // perceptual tolerance threshold

export const expectColor = (actualColor: string, expectedColor: string): void => {
    // Special case: both fully transparent → considered equal.
    if (actualColor === 'rgba(0, 0, 0, 0)' && expectedColor === 'rgba(0, 0, 0, 0)') return;
    
    const actualAlpha = chroma(actualColor).alpha();
    const expectedAlpha = chroma(expectedColor).alpha();
    
    // If both are transparent, ignore channel differences.
    if (actualAlpha === 0 && expectedAlpha === 0) return;
    
    // Compute perceptual difference (ΔE).
    const delta = chroma.deltaE(actualColor, expectedColor);
    
    if (delta > MAX_DEVIATION) {
        throw new Error(
`Color mismatch: ΔE=${delta.toFixed(3)}
Expected: ${expectedColor}
Actual:   ${actualColor}${!actualColor.startsWith('oklch(') ? ` => ${chroma(actualColor).css('oklch')}` : ''}
Max allowed: ${MAX_DEVIATION}`
        );
    }
};
