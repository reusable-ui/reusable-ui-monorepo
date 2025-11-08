// Types:
import {
    type ExciteStateProps,
}                           from './types.js'



/**
 * A default declarative excited state to apply when neither `excited` prop nor `defaultExcited` option is explicitly provided.
 * 
 * This fallback ensures the component is idle by default,
 * requiring explicit configuration to enable the excited state.
 * 
 * - `false`: the component is idle by default.
 */
export const defaultDeclarativeExcited : Required<ExciteStateProps>['excited']  = false;
