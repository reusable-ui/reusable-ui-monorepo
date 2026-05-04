import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useSortStateTestStyles = createStyleSheetHook(() =>
    import('./SortStateTest.style.js')
, { id: 'sorting-state-test' });
