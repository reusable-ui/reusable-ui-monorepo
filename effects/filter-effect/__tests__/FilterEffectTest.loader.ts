import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useFilterEffectTestStyles = createStyleSheetHook(() =>
    import('./FilterEffectTest.style.js')
, { id: 'filter-effect-test' });
