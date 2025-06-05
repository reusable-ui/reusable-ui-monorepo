import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useTestTypoStyles = createStyleSheetHook(
  () => import('./styles')
, { id: 'test-typo-styles' });
import './styles'
