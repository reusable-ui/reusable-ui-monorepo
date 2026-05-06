import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useSortEffectTestStyles = createStyleSheetHook(() =>
    import('./SortEffectTest.style.js')
, { id: 'sorting-effect-test' });
