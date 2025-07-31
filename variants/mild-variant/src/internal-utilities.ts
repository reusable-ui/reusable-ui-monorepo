/**
 * Resolves the CSS class name for the given mild state.
 * 
 * - Returns `'is-mild'` if `isMild` is `true`.
 * - Returns `'not-mild'` if `isMild` is `false`.
 * 
 * @param {boolean} isMild - A boolean flag indicating whether the component should appear in a mild (reading friendly).
 * @returns {'is-mild' | 'not-mild'} A CSS class name reflecting the mild state.
 */
export const getMildClassname = (isMild: boolean): 'is-mild' | 'not-mild' => {
    // Return the corresponding class name:
    return isMild ? 'is-mild' : 'not-mild';
};
