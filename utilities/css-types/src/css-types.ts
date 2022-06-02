// cssfn:
import type {
    // cssfn properties:
    CssRule,
}                           from '@cssfn/css-types'     // cssfn css specific types
import type {
    // types:
    ReadonlyCssCustomRefs,
}                           from '@cssfn/css-var'       // strongly typed of css variables



// types:
export type VariantMixin<TCssCustomProps extends {}> = readonly [() => CssRule, ReadonlyCssCustomRefs<TCssCustomProps>]
