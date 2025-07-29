/**
 * Resolves the CSS class name for a given emphasized state.
 * 
 * - Returns `'is-emphasized'` if `isEmphasized` is `true`.
 * - Returns `'not-emphasized'` if `isEmphasized` is `false`.
 * 
 * @param {boolean} isEmphasized - A boolean flag indicating whether the element should appear visually emphasized.
 * @returns {'is-emphasized' | 'not-emphasized'} A CSS class name reflecting the emphasized state.
 */
export const getEmphasizedClassname = (isEmphasized: boolean): 'is-emphasized' | 'not-emphasized' => {
    // Return the corresponding class name:
    return isEmphasized ? 'is-emphasized' : 'not-emphasized';
};
