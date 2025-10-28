import { createStyleSheetsHook } from '@cssfn/cssfn-react'



export const useViewStateTestStyles = createStyleSheetsHook(() =>
    import('./ViewStateTest.style.js')
, { id: 'view-state-test' });
