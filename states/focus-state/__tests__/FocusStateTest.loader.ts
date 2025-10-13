import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useFocusStateTestStyles = createStyleSheetHook(() =>
    import('./FocusStateTest.style.js')
, { id: 'focus-state-test' });
