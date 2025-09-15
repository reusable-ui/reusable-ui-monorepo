import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useValidityStateTestStyles = createStyleSheetHook(() =>
    import('./ValidityStateTest.style.js')
, { id: 'validity-state-test' });
