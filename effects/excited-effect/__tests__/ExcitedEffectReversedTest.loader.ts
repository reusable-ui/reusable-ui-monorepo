import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useExcitedEffectReversedTestStyles = createStyleSheetHook(() =>
    import('./ExcitedEffectReversedTest.style.js')
, { id: 'excited-effect-reversed-test' });
