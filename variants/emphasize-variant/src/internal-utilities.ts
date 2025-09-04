/**
 * Resolves the CSS class name for the given emphasized state.
 * 
 * - Returns `'is-emphasized'` if `isEmphasized` is `true`.
 * - Returns `'not-emphasized'` if `isEmphasized` is `false`.
 * 
 * @param {boolean} isEmphasized - A boolean flag indicating whether the component should appear emphasized.
 * @returns {'is-emphasized' | 'not-emphasized'} A CSS class name reflecting the emphasized state.
 */
export const getEmphasizeClassname = (isEmphasized: boolean): 'is-emphasized' | 'not-emphasized' => {
    // Return the corresponding class name:
    return isEmphasized ? 'is-emphasized' : 'not-emphasized';
};
