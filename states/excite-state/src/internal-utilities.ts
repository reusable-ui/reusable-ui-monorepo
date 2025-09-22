/**
 * Resolves the CSS class name for the given excited state.
 * 
 * Maps the boolean `isExcited` to a semantic class name:
 * - `true`  → `'is-excited'`
 * - `false` → `'not-excited'`
 * 
 * @param {boolean} isExcited - A boolean flag indicating whether the component should appear excited.
 * @returns {'is-excited' | 'not-excited'} A CSS class name reflecting the excited state.
 */
export const getExciteClassname = (isExcited: boolean): 'is-excited' | 'not-excited' => {
    // Return the corresponding class name:
    return isExcited ? 'is-excited' : 'not-excited';
};
