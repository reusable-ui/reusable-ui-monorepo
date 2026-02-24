import { regularBaseColor, outlinedBaseColor, mildBaseColor } from './base-colors.js'



/**
 * Supported variant keys for ActiveEffect testing.
 */
export const variantKeys = ['regular', 'outlined', 'mild'] as const;
export type VariantKey = typeof variantKeys[number];

/**
 * Lowercase display names for each variant.
 * Useful for human-readable test sentences or logs.
 */
export const variantNameLower: Record<VariantKey, string> = {
    regular  : 'regular',
    outlined : 'outlined',
    mild     : 'mild',
};

/**
 * Uppercase display names for each variant.
 * Useful for human-readable test titles or logs.
 */
export const variantNameUpper: Record<VariantKey, string> = {
    regular  : 'Regular',
    outlined : 'Outlined',
    mild     : 'Mild',
};

/**
 * Baseline colors for each variant in OKLCH space.
 * Used as expected values in test cases.
 */
export const variantBaseColor: Record<VariantKey, string> = {
    regular  : regularBaseColor,
    outlined : outlinedBaseColor,
    mild     : mildBaseColor,
};
