import chroma from 'chroma-js'



/**
 * Mixes two colors in a way that mimics CSS `color-mix()`:
 * - Weights must be between 0–1 (unitless fractions).
 * - If sum > 1 → normalized proportionally.
 * - If sum < 1 → remainder treated as transparent.
 * - Channel mixing is done in OKLCH space with both colors forced opaque.
 * - Final alpha is scaled by the sum of weights.
 */
export const colorMix = (
    colorA  : string,
    weightA : number, // fraction 0–1
    colorB  : string,
    weightB : number   // fraction 0–1
): string => {
    // Validate weights
    if (weightA < 0 || weightA > 1 || weightB < 0 || weightB > 1) {
        throw new Error('Weights must be between 0 and 1');
    }
    if (weightA === 0 && weightB === 0) {
        throw new Error('At least one weight must be > 0');
    }
    
    let sum = weightA + weightB;
    
    // Normalize if sum > 1
    if (sum > 1) {
        weightA = weightA / sum;
        weightB = weightB / sum;
        sum = 1;
    }
    
    // Parse colors
    const parsedA = chroma(colorA);
    const parsedB = chroma(colorB);
    
    // Force opaque for channel mixing
    const opaqueA = parsedA.alpha(1);
    const opaqueB = parsedB.alpha(1);
    
    // Compute normalized ratio for chroma.mix
    const ratioB = weightB / (weightA + weightB);
    
    // Mix in OKLCH
    const mixedOpaque = chroma.mix(opaqueA, opaqueB, ratioB, 'oklch');
    
    // Final alpha:
    // - Interpolated between input alphas
    // - Scaled by sum to account for transparency remainder
    const interpAlpha =
        parsedA.alpha() * (weightA / (weightA + weightB)) +
        parsedB.alpha() * (weightB / (weightA + weightB));
    const finalAlpha = interpAlpha * sum;
    
    return mixedOpaque.alpha(finalAlpha).css('oklch');
};

/**
 * Mixes two colors in a way that mimics CSS `color-mix()`:
 * - Factor is clamped to [0,1] (no extrapolation).
 * - Alpha values determine how much each color contributes.
 * - Channel mixing is done in OKLCH space with both colors forced opaque.
 * - Final alpha is interpolated linearly between the two inputs.
 */
export const colorRatioMix = (colorA: string, colorB: string, factor: number): string => {
    return colorMix(
        colorA, factor,
        colorB, 1 - factor
    );
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
    { brightness, contrast, saturate, opacity, mode }: {
        brightness : number;
        contrast   : number;
        saturate   : number;
        opacity    : number;
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
    
    // Opacity adjustment: interpolate between current and target opacity.
    const currentOpacity = adjustedColor.alpha();
    const blendedOpacity = (
        (currentOpacity * (1 - factor)) // weight of the original opacity
        +
        (opacity * factor)              // weight of the target opacity
    );
    adjustedColor = adjustedColor.alpha(blendedOpacity);
    
    return adjustedColor.css('oklch');
};



/**
 * Specifies the maximum perceptual deviation (ΔE) allowed when comparing two colors in tests.
 * This accounts for minor differences that are not visually perceptible.
 */
const MAX_DEVIATION = 2; // perceptual tolerance threshold

/**
 * Specifies the maximum alpha difference allowed when comparing two colors in tests.
 * This accounts for minor transparency differences that may not be visually perceptible.
 */
const ALPHA_TOLERANCE = 0.01;

/**
 * Asserts that two colors match within perceptual tolerance.
 * Handles transparent colors and uses CIEDE2000 for channel comparison.
 */
export const expectColor = (actualColor: string, expectedColor: string): void => {
    const actualChroma   = chroma(actualColor);
    const expectedChroma = chroma(expectedColor);
    
    const actualAlpha    = actualChroma.alpha();
    const expectedAlpha  = expectedChroma.alpha();
    
    // Both fully transparent → considered equal regardless of channels
    if (actualAlpha === 0 && expectedAlpha === 0) return;
    
    const delta     = chroma.deltaE(actualColor, expectedColor);
    const alphaDiff = Math.abs(actualAlpha - expectedAlpha);
    
    // Assert that both color difference and alpha difference are within tolerances
    if (delta > MAX_DEVIATION || alphaDiff > ALPHA_TOLERANCE) {
        throw new Error(
            `Color mismatch: ΔE=${delta.toFixed(3)}, alpha difference=${alphaDiff.toFixed(3)}\n` +
            `Expected: ${expectedColor}\n` +
            `Actual:   ${actualColor}${!actualColor.startsWith('oklch(') ? ` => ${actualChroma.css('oklch')}` : ''}\n` +
            `Max allowed: ΔE=${MAX_DEVIATION}, alpha difference=${ALPHA_TOLERANCE}`
        );
    }
};
