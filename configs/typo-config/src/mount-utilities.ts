/**
 * Batch mounts multiple typography styles at once.
 *
 * @param mountFunctions An array of mounting functions to activate.
 * @returns An object containing a unified `unmount()` method.
 */
export const mountMany = (...mountFunctions: Array<() => { unmount: () => void }>) => {
    // Store unmount handlers:
    const unmountHandlers = mountFunctions.map(mount => mount().unmount);
    
    
    
    // Expose unmount API:
    return {
        /**
         * Unmounts all mounted typography styles at once.
         */
        unmount: () => {
            unmountHandlers.forEach(unmount => unmount());
        },
    };
};
