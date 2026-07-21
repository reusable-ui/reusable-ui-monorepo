/**
 * Resolves the CSS classname for the given mild state.
 * 
 * - Returns `'is-mild'` when `isMild` is `true`.
 * - Returns `'not-mild'` when `isMild` is `false`.
 * 
 * @param isMild A boolean flag indicating whether the component should appear in a mild (reading friendly).
 * @returns A CSS classname reflecting the mild state.
 */
export const resolveMildClassname = (isMild: boolean): 'is-mild' | 'not-mild' => {
    return isMild ? 'is-mild' : 'not-mild';
};
