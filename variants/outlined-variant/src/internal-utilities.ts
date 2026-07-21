/**
 * Resolves the CSS classname for the given outlined state.
 * 
 * - Returns `'is-outlined'` when `isOutlined` is `true`.
 * - Returns `'not-outlined'` when `isOutlined` is `false`.
 * 
 * @param isOutlined A boolean flag indicating whether the component should appear outlined.
 * @returns A CSS classname reflecting the outlined state.
 */
export const resolveOutlinedClassname = (isOutlined: boolean): 'is-outlined' | 'not-outlined' => {
    return isOutlined ? 'is-outlined' : 'not-outlined';
};
