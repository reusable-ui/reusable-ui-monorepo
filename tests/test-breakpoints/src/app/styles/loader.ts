import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useResponsiveStyles = createStyleSheetHook(
  () => import('./styles')
, { id: 'basic-styles' });
import './styles'
