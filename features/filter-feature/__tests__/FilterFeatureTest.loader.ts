import { createStyleSheetsHook } from '@cssfn/cssfn-react'



export const useFilterFeatureTestStyles = createStyleSheetsHook(() =>
    import('./FilterFeatureTest.style.js')
, { id: 'filter-feature-test' });
