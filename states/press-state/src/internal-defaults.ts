// Types:
import {
    type PressStateProps,
    type PressStateOptions,
}                           from './types.js'



/**
 * A default declarative press state to apply when neither `pressed` prop nor `defaultPressed` option is explicitly provided.
 * 
 * This fallback ensures the component uses diagnostic mode by default,
 * deferring the actual press resolution to external logic via `computedPress` (if provided), or internal press observer.
 * 
 * - `'auto'`: enables automatic press resolution based on `computedPress` (if provided), or internal press observer.
 */
export const defaultDeclarativePressed  : Required<PressStateProps>['pressed']               = 'auto';

/**
 * A default keys that simulate press interactions when no `pressKeys` option is explicitly provided.
 * 
 * This fallback mirrors native button behavior for the `[Space]` key.
 * 
 * - `'Space'`: simulates press on `[Space]` key.
 */
export const defaultPressKeys           : Required<PressStateOptions>['pressKeys']           = 'Space';

/**
 * A default keys that trigger a synthetic click event when no `clickKeys` option is explicitly provided.
 * 
 * This fallback mirrors native button behavior for the `[Enter]` key.
 * 
 * - `'Enter'`: triggers synthetic click on `[Enter]` key.
 */
export const defaultClickKeys           : Required<PressStateOptions>['clickKeys']           = 'Enter';

/**
 * A default setting for triggering a synthetic click event on key release when no `triggerClickOnKeyUp` option is explicitly provided.
 * 
 * This fallback mirrors native button behavior for keys defined in `pressKeys`.
 * 
 * - `true`: triggers synthetic click on keyup of keys in `pressKeys`.
 */
export const defaultTriggerClickOnKeyUp : Required<PressStateOptions>['triggerClickOnKeyUp'] = true;
