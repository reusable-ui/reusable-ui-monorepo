import { default as React } from 'react';
/**
 * No validation was performed. Neither success nor error is shown.
 */
export declare type Uncheck = null;
/**
 * Validation was failed because the value did not meet the criteria.
 */
export declare type Error = false;
/**
 * Validation was successful and the value meets the criteria.
 */
export declare type Success = true;
export declare type Result = Uncheck | Error | Success;
/**
 * Contains validation props.
 */
export interface Validation {
    /**
     * `true`      : validation is enabled  - implements `isValid` prop.
     * `false`     : validation is disabled - equivalent as `isValid = null` (uncheck).
     */
    enableValidation: boolean;
    /**
     * `undefined` : *automatic* detect valid/invalid state.
     * `null`      : force validation state to *uncheck*.
     * `true`      : force validation state to *valid*.
     * `false`     : force validation state to *invalid*.
     */
    isValid?: Result;
}
interface ValidationRoot {
    atRoot?: true | undefined;
}
/**
 * A react context for validation stuff.
 */
export declare const ValidationContext: React.Context<Validation & ValidationRoot>;
export declare const usePropValidation: (props: ValidationProps) => Validation & ValidationRoot;
export interface ValidationProps extends React.PropsWithChildren<Partial<Validation>> {
    /**
     * `undefined` : same as `true`.
     * `true`      : validation is enabled  - implements `isValid` prop.
     * `false`     : validation is disabled - equivalent as `isValid = null` (uncheck).
     */
    enableValidation?: boolean;
    /**
     * `undefined` : *automatic* detect valid/invalid state.
     * `null`      : force validation state to *uncheck*.
     * `true`      : force validation state to *valid*.
     * `false`     : force validation state to *invalid*.
     */
    isValid?: Result;
    /**
     * `undefined` : same as `true`.
     * `true`      : inherits `enableValidation` & `isValid` from parent (`ValidationProvider` context).
     * `false`     : independent `enableValidation` & `isValid`.
     */
    inheritValidation?: boolean;
}
declare const ValidationProvider: (props: ValidationProps) => JSX.Element;
export { ValidationProvider, ValidationProvider as default, };
