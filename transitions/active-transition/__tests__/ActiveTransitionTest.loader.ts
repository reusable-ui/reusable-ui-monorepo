import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useActiveTransitionTestStyles = createStyleSheetHook(() =>
    import('./ActiveTransitionTest.style.js')
, { id: 'active-transition-test' });
