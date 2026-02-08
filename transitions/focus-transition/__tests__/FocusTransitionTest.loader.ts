import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useFocusTransitionTestStyles = createStyleSheetHook(() =>
    import('./FocusTransitionTest.style.js')
, { id: 'focus-transition-test' });
