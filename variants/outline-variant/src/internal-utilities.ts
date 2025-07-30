/**
 * Resolves the CSS class name for the given outlined state.
 * 
 * - Returns `'is-outlined'` if `isOutlined` is `true`.
 * - Returns `'not-outlined'` if `isOutlined` is `false`.
 * 
 * @param {boolean} isOutlined - A boolean flag indicating whether the component should appear outlined.
 * @returns {'is-outlined' | 'not-outlined'} A CSS class name reflecting the outlined state.
 */
export const getOutlinedClassname = (isOutlined: boolean): 'is-outlined' | 'not-outlined' => {
    // Return the corresponding class name:
    return isOutlined ? 'is-outlined' : 'not-outlined';
};
