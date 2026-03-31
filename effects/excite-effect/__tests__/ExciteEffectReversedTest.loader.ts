import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useExciteEffectReversedTestStyles = createStyleSheetHook(() =>
    import('./ExciteEffectReversedTest.style.js')
, { id: 'excite-effect-reversed-test' });
