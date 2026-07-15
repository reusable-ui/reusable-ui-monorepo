import {
    regularBaseColor,
    mildBaseColor,
    outlinedBaseColor,
    
    validRegularBaseColor,
    validMildBaseColor,
    validOutlinedBaseColor,
    
    invalidRegularBaseColor,
    invalidMildBaseColor,
    invalidOutlinedBaseColor,
} from './base-colors.js'



/**
 * Supported variant keys for ValidityEffect testing.
 */
export const variantKeys = ['regular', 'mild', 'outlined'] as const;
export type VariantKey = typeof variantKeys[number];

/**
 * Lowercase display names for each variant.
 * Useful for human-readable test sentences or logs.
 */
export const variantNameLower: Record<VariantKey, string> = {
    regular  : 'regular',
    mild     : 'mild',
    outlined : 'outlined',
};

/**
 * Uppercase display names for each variant.
 * Useful for human-readable test titles or logs.
 */
export const variantNameUpper: Record<VariantKey, string> = {
    regular  : 'Regular',
    mild     : 'Mild',
    outlined : 'Outlined',
};

/**
 * Baseline colors for each variant in OKLCH space.
 * Used as expected values in test cases.
 */
export const variantBaseColor: Record<VariantKey, string> = {
    regular  : regularBaseColor,
    mild     : mildBaseColor,
    outlined : outlinedBaseColor,
};

/**
 * Valid state colors for each variant in OKLCH space.
 * Used as expected values in test cases when validityFactorCond=+1.
 */
export const variantValidBaseColor: Record<VariantKey, string> = {
    regular  : validRegularBaseColor,
    mild     : validMildBaseColor,
    outlined : validOutlinedBaseColor,
};

/**
 * Invalid state colors for each variant in OKLCH space.
 * Used as expected values in test cases when validityFactorCond=-1.
 */
export const variantInvalidBaseColor: Record<VariantKey, string> = {
    regular  : invalidRegularBaseColor,
    mild     : invalidMildBaseColor,
    outlined : invalidOutlinedBaseColor,
};
