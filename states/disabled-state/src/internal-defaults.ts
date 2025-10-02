// Types:
import {
    type DisabledStateProps,
}                           from './types.js'



/**
 * A default declarative disabled state to apply when neither `disabled` prop nor `defaultDisabled` option is explicitly provided.
 * 
 * This fallback ensures the component is enabled by default,
 * maintaining interactivity unless explicitly disabled or contextually disabled.
 * 
 * - `false`: the component is enabled by default.
 */
export const defaultDeclarativeDisabled        : Required<DisabledStateProps>['disabled']         = false;



/**
 * A default declarative cascade behavior to apply when neither `cascadeDisabled` prop nor `defaultCascadeDisabled` option is explicitly provided.
 * 
 * This fallback allows contextual disabling inheritance from parent components,
 * even if the component itself is not directly disabled.
 * 
 * - `true`: allows contextual disabling.
 */
export const defaultDeclarativeCascadeDisabled : Required<DisabledStateProps>['cascadeDisabled']  = true;
