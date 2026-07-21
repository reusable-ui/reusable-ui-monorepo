/**
 * Resolves the CSS classname for the given stripped mode.
 * 
 * - Returns `'is-stripped'` when `stripped` is `true`.
 * - Returns `'not-stripped'` when `stripped` is `false`.
 * - Returns `'is-{Mode}'` when `stripped` is a string variant.
 * 
 * @template TStripped The extended type of the `stripped` prop, allowing `true` or custom string-based modes.
 * 
 * @param stripped A boolean or string flag indicating whether the component should appear stripped (frameless layout).
 * @returns A CSS classname reflecting the stripped mode.
 */
export const resolveStrippedClassname = <TStripped extends true | string = true>(stripped: false | TStripped): 'is-stripped' | 'not-stripped' | (TStripped extends string ? `is-${TStripped}` : never) => {
    if (typeof stripped === 'string') {
        return `is-${stripped}` as (TStripped extends string ? `is-${TStripped}` : never);
    }

    return stripped ? 'is-stripped' : 'not-stripped';
};
