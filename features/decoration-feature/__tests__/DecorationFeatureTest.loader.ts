import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useDecorationFeatureTestStyles = createStyleSheetHook(() =>
    import('./DecorationFeatureTest.style.js')
, { id: 'decoration-feature-test' });
