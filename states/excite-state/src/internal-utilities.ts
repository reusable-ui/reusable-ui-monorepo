/**
 * Resolves the CSS class name for the given excited state.
 * 
 * - Returns `'is-excited'` if `isExcited` is `true`.
 * - Returns `'not-excited'` if `isExcited` is `false`.
 * 
 * @param {boolean} isExcited - A boolean flag indicating whether the component should appear excited.
 * @returns {'is-excited' | 'not-excited'} A CSS class name reflecting the excited state.
 */
export const getExciteClassname = (isExcited: boolean): 'is-excited' | 'not-excited' => {
    // Return the corresponding class name:
    return isExcited ? 'is-excited' : 'not-excited';
};
