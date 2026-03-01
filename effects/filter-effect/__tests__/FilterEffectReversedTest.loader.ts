import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useFilterEffectReversedTestStyles = createStyleSheetHook(() =>
    import('./FilterEffectReversedTest.style.js')
, { id: 'filter-effect-reversed-test' });
