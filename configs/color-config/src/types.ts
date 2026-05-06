// Cssfn:
import {
    // Cssfn css specific types:
    type CssComplexValueOf,
    type CssKnownValueOf,
}                           from '@cssfn/core'          // Writes css in javascript.



// Types:
export type CssColor = CssComplexValueOf<CssKnownValueOf<'color'>>
