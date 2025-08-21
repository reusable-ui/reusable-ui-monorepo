import { createStyleSheetsHook } from '@cssfn/cssfn-react'



export const useBoxShadowFeatureTestStyles = createStyleSheetsHook(() =>
    import('./BoxShadowFeatureTest.style.js')
, { id: 'box-shadow-feature-test' });
