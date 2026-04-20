import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useDragStateTestStyles = createStyleSheetHook(() =>
    import('./DragStateTest.style.js')
, { id: 'drag-state-test' });
