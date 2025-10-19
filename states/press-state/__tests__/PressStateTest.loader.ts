import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const usePressStateTestStyles = createStyleSheetHook(() =>
    import('./PressStateTest.style.js')
, { id: 'press-state-test' });
