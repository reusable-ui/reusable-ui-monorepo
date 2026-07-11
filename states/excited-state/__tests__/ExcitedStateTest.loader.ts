import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useExcitedStateTestStyles = createStyleSheetHook(() =>
    import('./ExcitedStateTest.style.js')
, { id: 'excited-state-test' });
