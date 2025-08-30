import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useExciteStateTestStyles = createStyleSheetHook(() =>
    import('./ExciteStateTest.style.js')
, { id: 'excite-state-test' });
