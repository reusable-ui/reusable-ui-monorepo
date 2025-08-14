import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useBorderFeatureTestStyles = createStyleSheetHook(() =>
    import('./BorderFeatureTest.style.js')
, { id: 'border-feature-test' });
