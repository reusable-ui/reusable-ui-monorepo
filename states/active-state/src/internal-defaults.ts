// Types:
import {
    type ActiveStateProps,
}                           from './types.js'



/**
 * A default initial active state to apply when no `active` prop, `defaultActive` prop, or `defaultActive` option is explicitly provided.
 * 
 * This fallback ensures the component is initially inactive by default when in uncontrollable mode.
 * 
 * - `false`: the component is initially inactive by default.
 */
export const defaultInitialActive            : boolean                                     = false;



/**
 * A default declarative cascade behavior to apply when neither `cascadeActive` prop nor `defaultCascadeActive` option is explicitly provided.
 * 
 * This fallback allows contextual activation inheritance from parent components,
 * even if the component itself is not directly active.
 * 
 * - `false`: prevents contextual activation.
 */
export const defaultDeclarativeCascadeActive : Required<ActiveStateProps>['cascadeActive'] = false;
