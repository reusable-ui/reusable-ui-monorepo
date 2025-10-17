import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useHoverStateTestStyles = createStyleSheetHook(() =>
    import('./HoverStateTest.style.js')
, { id: 'hover-state-test' });
