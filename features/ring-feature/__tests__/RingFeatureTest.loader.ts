import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useRingFeatureTestStyles = createStyleSheetHook(() =>
    import('./RingFeatureTest.style.js')
, { id: 'ring-feature-test' });
