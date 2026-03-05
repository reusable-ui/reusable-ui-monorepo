import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const usePressEffectReversedTestStyles = createStyleSheetHook(() =>
    import('./PressEffectReversedTest.style.js')
, { id: 'press-effect-reversed-test' });
