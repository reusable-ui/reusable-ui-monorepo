// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ExciteEffectVars,
}                           from './types.js'

// Reusable-ui features:
import {
    filterRegistry,
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.
import {
    transformRegistry,
}                           from '@reusable-ui/transform-feature'   // A styling utility for composing a unified transform stack from custom and registered state packages.



/**
 * A strongly typed global mapping of excite-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [exciteEffectVars] = cssVars<ExciteEffectVars>({ prefix: 'exe', minify: false });

// Register the excite filter globally for composing a unified filter stack across effect packages:
filterRegistry.registerFilter(exciteEffectVars.exciteFilter);

// Register the excite transform globally for composing a unified transform stack across effect packages:
transformRegistry.registerTransform(exciteEffectVars.exciteTransform);
