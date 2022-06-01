import { default as React } from 'react';
export interface TAccessibility<TDefaultEnabled = boolean, TDefaultReadOnly = boolean, TDefaultActive = boolean> {
    enabled: boolean | TDefaultEnabled;
    readOnly: boolean | TDefaultReadOnly;
    active: boolean | TDefaultActive;
}
/**
 * Contains accessibility props.
 */
export interface Accessibility extends TAccessibility {
    /**
     * `true`      : component is enabled  - responses any user interaction.
     * `false`     : component is disabled - ignores any user interaction.
     */
    enabled: boolean;
    /**
     * `true`      : component is readOnly - ignores any user editing.
     * `false`     : component is editable - responses any user editing.
     */
    readOnly: boolean;
    /**
     * `true`      : component is in active state.
     * `false`     : component is in normal state.
     */
    active: boolean;
}
/**
 * A react context for accessibility stuff.
 */
export declare const AccessibilityContext: React.Context<Accessibility>;
export declare const usePropAccessibility: <TDefaultEnabled extends unknown = boolean, TDefaultReadOnly = boolean, TDefaultActive = boolean>(props: AccessibilityProps, defaultEnabled?: boolean | TDefaultEnabled, defaultReadOnly?: boolean | TDefaultReadOnly, defaultActive?: boolean | TDefaultActive) => Accessibility | TAccessibility<TDefaultEnabled, TDefaultReadOnly, TDefaultActive>;
export declare const usePropEnabled: <TDefaultEnabled extends unknown = boolean>(props: AccessibilityProps, defaultEnabled?: boolean | TDefaultEnabled) => boolean | TDefaultEnabled;
export declare const usePropReadOnly: <TDefaultReadOnly extends unknown = boolean>(props: AccessibilityProps, defaultReadOnly?: boolean | TDefaultReadOnly) => boolean | TDefaultReadOnly;
export declare const usePropActive: <TDefaultActive extends unknown = boolean>(props: AccessibilityProps, defaultActive?: boolean | TDefaultActive) => boolean | TDefaultActive;
export interface AccessibilityProps extends React.PropsWithChildren<Partial<Accessibility>> {
    /**
     * `undefined` : same as `true`.
     * `true`      : component is enabled  - responses any user interaction.
     * `false`     : component is disabled - ignores any user interaction.
     */
    enabled?: boolean;
    /**
     * `undefined` : same as `true`.
     * `true`      : inherits `enabled` from parent (`AccessibilityProvider` context).
     * `false`     : independent `enabled`.
     */
    inheritEnabled?: boolean;
    /**
     * `undefined` : same as `false`.
     * `true`      : component is readOnly - ignores any user editing.
     * `false`     : component is editable - responses any user editing.
     */
    readOnly?: boolean;
    /**
     * `undefined` : same as `true`.
     * `true`      : inherits `readOnly` from parent (`AccessibilityProvider` context).
     * `false`     : independent `readOnly`.
     */
    inheritReadOnly?: boolean;
    /**
     * `undefined` : same as `false`.
     * `true`      : component is in active state.
     * `false`     : component is in normal state.
     */
    active?: boolean;
    /**
     * `undefined` : same as `false`.
     * `true`      : inherits `active` from parent (`AccessibilityProvider` context).
     * `false`     : independent `active`.
     */
    inheritActive?: boolean;
}
declare const AccessibilityProvider: (props: AccessibilityProps) => JSX.Element;
export { AccessibilityProvider, AccessibilityProvider as default, };
