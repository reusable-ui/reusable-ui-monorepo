import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useHoverEffectReversedTestStyles = createStyleSheetHook(() =>
    import('./HoverEffectReversedTest.style.js')
, { id: 'hover-effect-reversed-test' });
