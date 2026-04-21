import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useDragEffectReversedTestStyles = createStyleSheetHook(() =>
    import('./DragEffectReversedTest.style.js')
, { id: 'drag-effect-reversed-test' });
