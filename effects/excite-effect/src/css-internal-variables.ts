// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ExciteEffectVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultExciteEffectPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    filterRegistry,
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.
import {
    transformRegistry,
}                           from '@reusable-ui/transform-feature'   // A styling utility for composing a unified transform stack from custom and registered state packages.



/**
 * A strongly typed global mapping of excitement-related CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [exciteEffectVars] = cssVars<ExciteEffectVars>({ prefix: defaultExciteEffectPrefix, minify: false });

// Register the excitement-related filter globally for composing a unified filter stack across effect packages:
filterRegistry.registerFilter(exciteEffectVars.exciteFilter);

// Register the excitement-related transform globally for composing a unified transform stack across effect packages:
transformRegistry.registerTransform(exciteEffectVars.exciteTransform);
