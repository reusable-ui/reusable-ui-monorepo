import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useActiveStateTestStyles = createStyleSheetHook(() =>
    import('./ActiveStateTest.style.js')
, { id: 'active-state-test' });
