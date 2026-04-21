import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useDragEffectTestStyles = createStyleSheetHook(() =>
    import('./DragEffectTest.style.js')
, { id: 'drag-effect-test' });
