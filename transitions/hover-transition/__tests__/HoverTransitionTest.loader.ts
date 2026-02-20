import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useHoverTransitionTestStyles = createStyleSheetHook(() =>
    import('./HoverTransitionTest.style.js')
, { id: 'hover-transition-test' });
