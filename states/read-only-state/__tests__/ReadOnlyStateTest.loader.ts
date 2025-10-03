import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useReadOnlyStateTestStyles = createStyleSheetHook(() =>
    import('./ReadOnlyStateTest.style.js')
, { id: 'read-only-state-test' });
