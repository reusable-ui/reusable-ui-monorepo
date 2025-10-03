// Types:
import {
    type ReadOnlyStateProps,
}                           from './types.js'



/**
 * A default declarative read-only state to apply when neither `readOnly` prop nor `defaultReadOnly` option is explicitly provided.
 * 
 * This fallback ensures the component is editable by default,
 * maintaining interactivity unless explicitly set read-only or contextually read-only.
 * 
 * - `false`: the component is editable by default.
 */
export const defaultDeclarativeReadOnly        : Required<ReadOnlyStateProps>['readOnly']         = false;



/**
 * A default declarative cascade behavior to apply when neither `cascadeReadOnly` prop nor `defaultCascadeReadOnly` option is explicitly provided.
 * 
 * This fallback allows contextual read-only inheritance from parent components,
 * even if the component itself is not directly set read-only.
 * 
 * - `true`: allows contextual read-only.
 */
export const defaultDeclarativeCascadeReadOnly : Required<ReadOnlyStateProps>['cascadeReadOnly']  = true;
