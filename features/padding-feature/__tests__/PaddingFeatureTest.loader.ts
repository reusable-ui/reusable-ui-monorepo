import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const usePaddingFeatureTestStyles = createStyleSheetHook(() =>
    import('./PaddingFeatureTest.style.js')
, { id: 'padding-feature-test' });
