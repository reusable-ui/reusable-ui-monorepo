import { createStyleSheetsHook } from '@cssfn/cssfn-react'



export const useTransformFeatureTestStyles = createStyleSheetsHook(() =>
    import('./TransformFeatureTest.style.js')
, { id: 'transform-feature-test' });
