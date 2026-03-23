import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useCollapseEffectTestStyles = createStyleSheetHook(() =>
    import('./CollapseEffectTest.style.js')
, { id: 'collapse-effect-test' });
