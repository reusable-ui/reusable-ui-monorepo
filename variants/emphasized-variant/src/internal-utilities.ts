/**
 * Resolves the CSS classname for the given emphasized state.
 * 
 * - Returns `'is-emphasized'` if `isEmphasized` is `true`.
 * - Returns `'not-emphasized'` if `isEmphasized` is `false`.
 * 
 * @param isEmphasized A boolean flag indicating whether the component should appear emphasized.
 * @returns A CSS classname reflecting the emphasized state.
 */
export const getEmphasizedClassname = (isEmphasized: boolean): 'is-emphasized' | 'not-emphasized' => {
    // Return the corresponding class name:
    return isEmphasized ? 'is-emphasized' : 'not-emphasized';
};
