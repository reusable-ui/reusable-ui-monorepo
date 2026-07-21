/**
 * Resolves the CSS classname for the given emphasized state.
 * 
 * - Returns `'is-emphasized'` when `isEmphasized` is `true`.
 * - Returns `'not-emphasized'` when `isEmphasized` is `false`.
 * 
 * @param isEmphasized A boolean flag indicating whether the component should appear emphasized.
 * @returns A CSS classname reflecting the emphasized state.
 */
export const resolveEmphasizedClassname = (isEmphasized: boolean): 'is-emphasized' | 'not-emphasized' => {
    return isEmphasized ? 'is-emphasized' : 'not-emphasized';
};
