import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useCollapseStateTestStyles = createStyleSheetHook(() =>
    import('./CollapseStateTest.style.js')
, { id: 'collapse-state-test' });
