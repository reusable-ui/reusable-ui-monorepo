import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useDisabledStateTestStyles = createStyleSheetHook(() =>
    import('./DisabledStateTest.style.js')
, { id: 'disabled-state-test' });
