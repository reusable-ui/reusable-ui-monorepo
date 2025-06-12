
import {
    useSetTimeout,
} from '../dist/timers.js'
import { act, renderHook } from '@testing-library/react'



/**
 * A utility class for measuring elapsed time using `performance.now()`.
 */
class Stopwatch {
    // Stores the start timestamp:
    private startTime: number | null = null;
    
    /**
     * Starts the stopwatch timer.
     */
    start(): void {
        this.startTime = performance.now();
    }
    
    /**
     * Stops the stopwatch and returns the elapsed time in milliseconds.
     * 
     * @returns The elapsed duration in milliseconds, or `0` if the stopwatch was never started.
     */
    stop(): number {
        if (this.startTime === null) return 0; // Prevents returning NaN
        return performance.now() - this.startTime;
    }
}



/**
 * Defines the accepted precision range for interval validation (in milliseconds).
 */
export const INTERVAL_PRECISION = 50; // ms

/**
 * Custom assertion function for validating intervals within precision range.
 *
 * @param expectedInterval - The expected duration in milliseconds.
 * @param receivedInterval - The measured elapsed time in milliseconds.
 */
export const expectInterval = (expectedInterval: number, receivedInterval: number): void => {
    const isValid = Math.abs(receivedInterval - expectedInterval) <= INTERVAL_PRECISION;
    
    if (!isValid) {
        throw new Error(`Interval mismatch detected! Expected: ${expectedInterval} ms, Received: ${receivedInterval} ms.`);
    }
};



describe("useSetTimeout", () => {
    test("should resolve after the specified timeout duration", async () => {
        // Hooks:
        const { result: { current: setTimeoutAsync } } = renderHook(() => useSetTimeout());
        
        
        
        // Setups:
        const stopwatch = new Stopwatch();
        const timeoutDuration = 500; // 500ms delay
        
        
        
        // Starts measuring:
        stopwatch.start();
        const timeoutPromise = setTimeoutAsync(timeoutDuration);
        
        
        
        // Stops measuring:
        const isCompleted = await timeoutPromise;
        const elapsedTime = stopwatch.stop();
        
        
        
        // Tests:
        expect(isCompleted).toBe(true);
        expectInterval(timeoutDuration, elapsedTime);
    });
    
    test("should resolve after the zero timeout duration", async () => {
        // Hooks:
        const { result: { current: setTimeoutAsync } } = renderHook(() => useSetTimeout());
        
        
        
        // Setups:
        const stopwatch = new Stopwatch();
        const timeoutDuration = 0; // 0ms delay
        
        
        
        // Starts measuring:
        stopwatch.start();
        const timeoutPromise = setTimeoutAsync(timeoutDuration);
        
        
        
        // Stops measuring:
        const isCompleted = await timeoutPromise;
        const elapsedTime = stopwatch.stop();
        
        
        
        // Tests:
        expect(isCompleted).toBe(true);
        expectInterval(timeoutDuration, elapsedTime);
    });
    
    test("should resolve after the negative timeout duration", async () => {
        // Hooks:
        const { result: { current: setTimeoutAsync } } = renderHook(() => useSetTimeout());
        
        
        
        // Setups:
        const stopwatch = new Stopwatch();
        const timeoutDuration = -100; // -100ms delay
        
        
        
        // Starts measuring:
        stopwatch.start();
        const timeoutPromise = setTimeoutAsync(timeoutDuration);
        
        
        
        // Stops measuring:
        const isCompleted = await timeoutPromise;
        const elapsedTime = stopwatch.stop();
        
        
        
        // Tests:
        expect(isCompleted).toBe(true);
        expectInterval(0, elapsedTime);
    });
    
    test("should support multiple concurrent timeouts", async () => {
        // Hooks:
        const { result: { current: setTimeoutAsync } } = renderHook(() => useSetTimeout());
        
        
        
        // Setups:
        const stopwatch1 = new Stopwatch();
        const stopwatch2 = new Stopwatch();
        const stopwatch3 = new Stopwatch();
        const timeoutDuration1 = 300; // 300ms delay
        const timeoutDuration2 = 100; // 100ms delay
        const timeoutDuration3 = 500; // 500ms delay
        
        
        
        
        // Starts measuring:
        stopwatch1.start();
        stopwatch2.start();
        stopwatch3.start();
        const timeoutPromise1 = setTimeoutAsync(timeoutDuration1); // 300ms delay
        const timeoutPromise2 = setTimeoutAsync(timeoutDuration2); // 100ms delay
        const timeoutPromise3 = setTimeoutAsync(timeoutDuration3); // 500ms delay
        
        
        
        // Stops measuring:
        const [
            [isCompleted1, elapsedTime1],
            [isCompleted2, elapsedTime2],
            [isCompleted3, elapsedTime3],
        ] = await Promise.all([
            timeoutPromise1.then((isCompleted1) => {
                const elapsedTime1 = stopwatch1.stop();
                return [isCompleted1, elapsedTime1] as const;
            }),
            timeoutPromise2.then((isCompleted2) => {
                const elapsedTime2 = stopwatch2.stop();
                return [isCompleted2, elapsedTime2] as const;
            }),
            timeoutPromise3.then((isCompleted3) => {
                const elapsedTime3 = stopwatch3.stop();
                return [isCompleted3, elapsedTime3] as const;
            }),
        ]);
        
        
        
        // Tests:
        expect(isCompleted1).toBe(true);
        expect(isCompleted2).toBe(true);
        expect(isCompleted3).toBe(true);
        expectInterval(timeoutDuration1, elapsedTime1);
        expectInterval(timeoutDuration2, elapsedTime2);
        expectInterval(timeoutDuration3, elapsedTime3);
    });
    
    test("should resolve with false if aborted before completion", async () => {
        // Hooks:
        const { result: { current: setTimeoutAsync } } = renderHook(() => useSetTimeout());
        
        
        
        // Setups:
        const stopwatch = new Stopwatch();
        const timeoutDuration = 500; // 500ms delay
        
        
        
        // Starts measuring:
        stopwatch.start();
        const timeoutPromise = setTimeoutAsync(timeoutDuration);
        
        
        
        // Interrupts measuring:
        timeoutPromise.abort(); // Abort before completion
        
        
        
        // Stops measuring:
        const isCompleted = await timeoutPromise;
        const elapsedTime = stopwatch.stop();
        
        
        
        // Tests:
        expect(isCompleted).toBe(false); // Should be aborted due to abort
        expectInterval(0, elapsedTime); // Ensure early termination
    });
    
    test("should automatically cleanup timeouts on unmount", async () => {
        // Hooks:
        const { result: { current: setTimeoutAsync }, unmount } = renderHook(() => useSetTimeout());
        
        
        
        // Setups:
        const stopwatch = new Stopwatch();
        const timeoutDuration = 500; // 500ms delay
        
        
        
        // Starts measuring:
        stopwatch.start();
        const timeoutPromise = setTimeoutAsync(timeoutDuration);
        
        
        
        // Interrupts measuring:
        act(() => {
            unmount(); // Simulate component unmount
        });
        
        
        
        // Stops measuring:
        const isCompleted = await timeoutPromise;
        const elapsedTime = stopwatch.stop();
        
        
        
        // Tests:
        expect(isCompleted).toBe(false); // Should be aborted due to unmount
        expectInterval(0, elapsedTime); // Ensure early termination
    });
    
    test("should resolve with all false if all are aborted", async () => {
        // Hooks:
        const { result: { current: setTimeoutAsync } } = renderHook(() => useSetTimeout());
        
        
        
        // Setups:
        const stopwatch1 = new Stopwatch();
        const stopwatch2 = new Stopwatch();
        const stopwatch3 = new Stopwatch();
        const timeoutDuration1 = 300; // 300ms delay
        const timeoutDuration2 = 100; // 100ms delay
        const timeoutDuration3 = 500; // 500ms delay
        
        
        
        
        // Starts measuring:
        stopwatch1.start();
        stopwatch2.start();
        stopwatch3.start();
        const timeoutPromise1 = setTimeoutAsync(timeoutDuration1); // 300ms delay
        const timeoutPromise2 = setTimeoutAsync(timeoutDuration2); // 100ms delay
        const timeoutPromise3 = setTimeoutAsync(timeoutDuration3); // 500ms delay
        
        
        
        // Interrupts measuring:
        timeoutPromise1.abort(); // Abort before completion
        timeoutPromise2.abort(); // Abort before completion
        timeoutPromise3.abort(); // Abort before completion
        
        
        
        // Stops measuring:
        const [
            [isCompleted1, elapsedTime1],
            [isCompleted2, elapsedTime2],
            [isCompleted3, elapsedTime3],
        ] = await Promise.all([
            timeoutPromise1.then((isCompleted1) => {
                const elapsedTime1 = stopwatch1.stop();
                return [isCompleted1, elapsedTime1] as const;
            }),
            timeoutPromise2.then((isCompleted2) => {
                const elapsedTime2 = stopwatch2.stop();
                return [isCompleted2, elapsedTime2] as const;
            }),
            timeoutPromise3.then((isCompleted3) => {
                const elapsedTime3 = stopwatch3.stop();
                return [isCompleted3, elapsedTime3] as const;
            }),
        ]);
        
        
        
        // Tests:
        expect(isCompleted1).toBe(false); // Should be aborted due to abort
        expect(isCompleted2).toBe(false); // Should be aborted due to abort
        expect(isCompleted3).toBe(false); // Should be aborted due to abort
        expectInterval(0, elapsedTime1); // Ensure early termination
        expectInterval(0, elapsedTime2); // Ensure early termination
        expectInterval(0, elapsedTime3); // Ensure early termination
    });
    
    test("should resolve with all false if all experience unmount", async () => {
        // Hooks:
        const { result: { current: setTimeoutAsync }, unmount } = renderHook(() => useSetTimeout());
        
        
        
        // Setups:
        const stopwatch1 = new Stopwatch();
        const stopwatch2 = new Stopwatch();
        const stopwatch3 = new Stopwatch();
        const timeoutDuration1 = 300; // 300ms delay
        const timeoutDuration2 = 100; // 100ms delay
        const timeoutDuration3 = 500; // 500ms delay
        
        
        
        
        // Starts measuring:
        stopwatch1.start();
        stopwatch2.start();
        stopwatch3.start();
        const timeoutPromise1 = setTimeoutAsync(timeoutDuration1); // 300ms delay
        const timeoutPromise2 = setTimeoutAsync(timeoutDuration2); // 100ms delay
        const timeoutPromise3 = setTimeoutAsync(timeoutDuration3); // 500ms delay
        
        
        
        // Interrupts measuring:
        act(() => {
            unmount(); // Simulate component unmount
        });
        
        
        
        // Stops measuring:
        const [
            [isCompleted1, elapsedTime1],
            [isCompleted2, elapsedTime2],
            [isCompleted3, elapsedTime3],
        ] = await Promise.all([
            timeoutPromise1.then((isCompleted1) => {
                const elapsedTime1 = stopwatch1.stop();
                return [isCompleted1, elapsedTime1] as const;
            }),
            timeoutPromise2.then((isCompleted2) => {
                const elapsedTime2 = stopwatch2.stop();
                return [isCompleted2, elapsedTime2] as const;
            }),
            timeoutPromise3.then((isCompleted3) => {
                const elapsedTime3 = stopwatch3.stop();
                return [isCompleted3, elapsedTime3] as const;
            }),
        ]);
        
        
        
        // Tests:
        expect(isCompleted1).toBe(false); // Should be aborted due to abort
        expect(isCompleted2).toBe(false); // Should be aborted due to abort
        expect(isCompleted3).toBe(false); // Should be aborted due to abort
        expectInterval(0, elapsedTime1); // Ensure early termination
        expectInterval(0, elapsedTime2); // Ensure early termination
        expectInterval(0, elapsedTime3); // Ensure early termination
    });
    
    test("should resolve with some false if some are aborted", async () => {
        // Hooks:
        const { result: { current: setTimeoutAsync } } = renderHook(() => useSetTimeout());
        
        
        
        // Setups:
        const stopwatch1 = new Stopwatch();
        const stopwatch2 = new Stopwatch();
        const stopwatch3 = new Stopwatch();
        const timeoutDuration1 = 300; // 300ms delay
        const timeoutDuration2 = 100; // 100ms delay
        const timeoutDuration3 = 500; // 500ms delay
        
        
        
        
        // Starts measuring:
        stopwatch1.start();
        stopwatch2.start();
        stopwatch3.start();
        const timeoutPromise1 = setTimeoutAsync(timeoutDuration1); // 300ms delay
        const timeoutPromise2 = setTimeoutAsync(timeoutDuration2); // 100ms delay
        const timeoutPromise3 = setTimeoutAsync(timeoutDuration3); // 500ms delay
        
        
        
        // Interrupts measuring:
        timeoutPromise1.abort(); // Abort before completion
        timeoutPromise3.abort(); // Abort before completion
        
        
        
        // Stops measuring:
        const [
            [isCompleted1, elapsedTime1],
            [isCompleted2, elapsedTime2],
            [isCompleted3, elapsedTime3],
        ] = await Promise.all([
            timeoutPromise1.then((isCompleted1) => {
                const elapsedTime1 = stopwatch1.stop();
                return [isCompleted1, elapsedTime1] as const;
            }),
            timeoutPromise2.then((isCompleted2) => {
                const elapsedTime2 = stopwatch2.stop();
                return [isCompleted2, elapsedTime2] as const;
            }),
            timeoutPromise3.then((isCompleted3) => {
                const elapsedTime3 = stopwatch3.stop();
                return [isCompleted3, elapsedTime3] as const;
            }),
        ]);
        
        
        
        // Tests:
        expect(isCompleted1).toBe(false); // Should be aborted due to abort
        expect(isCompleted2).toBe(true);
        expect(isCompleted3).toBe(false); // Should be aborted due to abort
        expectInterval(0, elapsedTime1); // Ensure early termination
        expectInterval(timeoutDuration2, elapsedTime2);
        expectInterval(0, elapsedTime3); // Ensure early termination
    });
    
    test("should resolve with some false if some experience unmount", async () => {
        // Hooks:
        const { result: { current: setTimeoutAsync }, unmount } = renderHook(() => useSetTimeout());
        
        
        
        // Setups:
        const stopwatch1 = new Stopwatch();
        const stopwatch2 = new Stopwatch();
        const stopwatch3 = new Stopwatch();
        const timeoutDuration1 = 300; // 300ms delay
        const timeoutDuration2 = 100; // 100ms delay
        const timeoutDuration3 = 500; // 500ms delay
        
        
        
        // Starts measuring:
        stopwatch1.start();
        stopwatch2.start();
        stopwatch3.start();
        const timeoutPromise1 = setTimeoutAsync(timeoutDuration1); // 300ms delay
        const timeoutPromise2 = setTimeoutAsync(timeoutDuration2); // 100ms delay
        const timeoutPromise3 = setTimeoutAsync(timeoutDuration3); // 500ms delay
        
        
        
        // Stops measuring:
        const [
            [isCompleted1, elapsedTime1],
            [isCompleted2, elapsedTime2],
            [isCompleted3, elapsedTime3],
        ] = await Promise.all([
            timeoutPromise1.then((isCompleted1) => {
                const elapsedTime1 = stopwatch1.stop();
                return [isCompleted1, elapsedTime1] as const;
            }),
            timeoutPromise2.then((isCompleted2) => {
                const elapsedTime2 = stopwatch2.stop();
                return [isCompleted2, elapsedTime2] as const;
            }),
            timeoutPromise3.then((isCompleted3) => {
                const elapsedTime3 = stopwatch3.stop();
                return [isCompleted3, elapsedTime3] as const;
            }),
            
            // Interrupts measuring after 200ms:
            (async () => {
                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 200); // Wait for 200ms before unmounting, so the `timeoutPromise2` survives
                });
                
                act(() => {
                    unmount(); // Simulate component unmount
                });
            })(),
        ]);
        
        
        
        // Tests:
        expect(isCompleted1).toBe(false); // Should be aborted due to abort
        expect(isCompleted2).toBe(true);
        expect(isCompleted3).toBe(false); // Should be aborted due to abort
        expectInterval(200, elapsedTime1); // Ensure early termination
        expectInterval(timeoutDuration2, elapsedTime2);
        expectInterval(200, elapsedTime3); // Ensure early termination
    });
});
