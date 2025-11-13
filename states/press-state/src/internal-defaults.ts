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
export const defaultDeclarativePressed     : Required<PressStateProps>['pressed']                  = 'auto';

/**
 * A default keys that simulate press interactions when no `pressKeys` option is explicitly provided.
 * 
 * This fallback mirrors native button behavior for the `[Space]` key.
 * 
 * - `'Space'`: simulates press on `[Space]` key.
 */
export const defaultPressKeys              : Required<PressStateOptions>['pressKeys']              = 'Space';

/**
 * A default keys that trigger a synthetic click event when no `clickKeys` option is explicitly provided.
 * 
 * This fallback mirrors native button behavior for the `[Enter]` key.
 * 
 * - `'Enter'`: triggers synthetic click on `[Enter]` key.
 */
export const defaultClickKeys              : Required<PressStateOptions>['clickKeys']              = 'Enter';

/**
 * A default setting for triggering a synthetic click event on key release when no `triggerClickOnKeyUp` option is explicitly provided.
 * 
 * This fallback mirrors native button behavior for keys defined in `pressKeys`.
 * 
 * - `true`: triggers synthetic click on keyup of keys in `pressKeys`.
 */
export const defaultTriggerClickOnKeyUp    : Required<PressStateOptions>['triggerClickOnKeyUp']    = true;

/**
 * A default mouse buttons that activate press state when no `pressButtons` option is explicitly provided.
 * 
 * This fallback mirrors native button behavior for left-click activation.
 * 
 * - `0`: activates press on left mouse button.
 */
export const defaultPressButtons           : Required<PressStateOptions>['pressButtons']           = 0;

/**
 * A default pressure threshold that activates press state when no `pressPressure` option is explicitly provided.
 * 
 * This fallback ensures that only intentional contact (not hover) activates the press state.
 * 
 * - `0.005`: activates press when pressure is ≥ 0.005
 */
export const defaultPressPressure          : Required<PressStateOptions>['pressPressure']          = 0.005;

/**
 * A default finger count that activates press state when no `pressFingers` option is explicitly provided.
 * 
 * This fallback mirrors native button behavior for single-finger touch activation.
 * 
 * - `1`: activates press on single-finger touch.
 */
export const defaultPressFingers           : Required<PressStateOptions>['pressFingers']           = 1;

/**
 * A default global pointer release fallback value when no `noGlobalPointerRelease` option is explicitly provided.
 * 
 * This fallback enables a robust press state detection,
 * even when pointer release occurs outside the component boundary.
 * 
 * - `false`: Enables the global fallback listener.
 */
export const defaultNoGlobalPointerRelease : Required<PressStateOptions>['noGlobalPointerRelease'] = false;
