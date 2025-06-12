
import {
    useRequestAnimationFrame,
} from '../dist/timers.js'
import { act, renderHook } from '@testing-library/react'



/**
 * A utility class for counting animation frames using `requestAnimationFrame`.
 */
class FrameCounter {
    // Stores the number of frames counted:
    private tickCounter : number  = 0;
    // Indicates whether the counter is currently running:
    private isRunning   : boolean = false;
    
    /**
     * Starts the frame counter.
     */
    start(): void {
        this.tickCounter = 0;
        this.isRunning = true;
        requestAnimationFrame(this.tick.bind(this));
    }
    
    /**
     * Internal method to increment the frame count.
     */
    private tick(): void {
        if (!this.isRunning) return;
        this.tickCounter++;
        requestAnimationFrame(this.tick.bind(this));
    }
    
    /**
     * Stops the counter and returns the total frame count.
     *
     * @returns The number of animation frames elapsed.
     */
    stop(): number {
        this.isRunning = false;
        return this.tickCounter;
    }
}



describe("useRequestAnimationFrame", () => {
    test("should resolve after the specified times of frame", async () => {
        // Hooks:
        const { result: { current: requestAnimationFrameAsync } } = renderHook(() => useRequestAnimationFrame());
        
        
        
        // Setups:
        const frameCounter = new FrameCounter();
        const frameCount = 5; // 5 times
        
        
        
        // Starts measuring:
        frameCounter.start();
        const timeoutPromise = requestAnimationFrameAsync(frameCount);
        
        
        
        // Stops measuring:
        const timestamp = await timeoutPromise;
        const elapsedFrames = frameCounter.stop();
        
        
        
        // Tests:
        expect(typeof timestamp).toBe('number');;
        expect(elapsedFrames).toBe(frameCount);
    });
    
    test("should resolve after the zero times of frame", async () => {
        // Hooks:
        const { result: { current: requestAnimationFrameAsync } } = renderHook(() => useRequestAnimationFrame());
        
        
        
        // Setups:
        const frameCounter = new FrameCounter();
        const frameCount = 0; // 0 times
        
        
        
        // Starts measuring:
        frameCounter.start();
        const timeoutPromise = requestAnimationFrameAsync(frameCount);
        
        
        
        // Stops measuring:
        const timestamp = await timeoutPromise;
        const elapsedFrames = frameCounter.stop();
        
        
        
        // Tests:
        expect(typeof timestamp).toBe('number');;
        expect(elapsedFrames).toBe(frameCount);
    });
    
    test("should resolve after the negative times of frame", async () => {
        // Hooks:
        const { result: { current: requestAnimationFrameAsync } } = renderHook(() => useRequestAnimationFrame());
        
        
        
        // Setups:
        const frameCounter = new FrameCounter();
        const frameCount = -1; // -1 times
        
        
        
        // Starts measuring:
        frameCounter.start();
        const timeoutPromise = requestAnimationFrameAsync(frameCount);
        
        
        
        // Stops measuring:
        const timestamp = await timeoutPromise;
        const elapsedFrames = frameCounter.stop();
        
        
        
        // Tests:
        expect(typeof timestamp).toBe('number');;
        expect(elapsedFrames).toBe(0);
    });
    
    test("should support multiple concurrent frame requests", async () => {
        // Hooks:
        const { result: { current: requestAnimationFrameAsync } } = renderHook(() => useRequestAnimationFrame());
        
        
        
        // Setups:
        const frameCounter1 = new FrameCounter();
        const frameCounter2 = new FrameCounter();
        const frameCounter3 = new FrameCounter();
        const frameCount1 = 3; // 3 times
        const frameCount2 = 1; // 1 times
        const frameCount3 = 5; // 5 times
        
        
        
        
        // Starts measuring:
        frameCounter1.start();
        frameCounter2.start();
        frameCounter3.start();
        const timeoutPromise1 = requestAnimationFrameAsync(frameCount1); // 3 times
        const timeoutPromise2 = requestAnimationFrameAsync(frameCount2); // 1 times
        const timeoutPromise3 = requestAnimationFrameAsync(frameCount3); // 5 times
        
        
        
        // Stops measuring:
        const [
            [timestamp1, elapsedFrames1],
            [timestamp2, elapsedFrames2],
            [timestamp3, elapsedFrames3],
        ] = await Promise.all([
            timeoutPromise1.then((timestamp1) => {
                const elapsedFrames1 = frameCounter1.stop();
                return [timestamp1, elapsedFrames1] as const;
            }),
            timeoutPromise2.then((timestamp2) => {
                const elapsedFrames2 = frameCounter2.stop();
                return [timestamp2, elapsedFrames2] as const;
            }),
            timeoutPromise3.then((timestamp3) => {
                const elapsedFrames3 = frameCounter3.stop();
                return [timestamp3, elapsedFrames3] as const;
            }),
        ]);
        
        
        
        // Tests:
        expect(typeof timestamp1).toBe('number');;
        expect(typeof timestamp2).toBe('number');;
        expect(typeof timestamp3).toBe('number');;
        expect(elapsedFrames1).toBe(frameCount1);
        expect(elapsedFrames2).toBe(frameCount2);
        expect(elapsedFrames3).toBe(frameCount3);
    });
    
    test("should resolve with false if aborted before completion", async () => {
        // Hooks:
        const { result: { current: requestAnimationFrameAsync } } = renderHook(() => useRequestAnimationFrame());
        
        
        
        // Setups:
        const frameCounter = new FrameCounter();
        const frameCount = 5; // 5 times
        
        
        
        // Starts measuring:
        frameCounter.start();
        const timeoutPromise = requestAnimationFrameAsync(frameCount);
        
        
        
        // Interrupts measuring:
        timeoutPromise.abort(); // Abort before completion
        
        
        
        // Stops measuring:
        const timestamp = await timeoutPromise;
        const elapsedFrames = frameCounter.stop();
        
        
        
        // Tests:
        expect(timestamp).toBe(false); // Should be aborted due to abort
        expect(elapsedFrames).toBe(0); // Ensure early termination
    });
    
    test("should automatically cleanup frame requests on unmount", async () => {
        // Hooks:
        const { result: { current: requestAnimationFrameAsync }, unmount } = renderHook(() => useRequestAnimationFrame());
        
        
        
        // Setups:
        const frameCounter = new FrameCounter();
        const frameCount = 5; // 5 times
        
        
        
        // Starts measuring:
        frameCounter.start();
        const timeoutPromise = requestAnimationFrameAsync(frameCount);
        
        
        
        // Interrupts measuring:
        act(() => {
            unmount(); // Simulate component unmount
        });
        
        
        
        // Stops measuring:
        const timestamp = await timeoutPromise;
        const elapsedFrames = frameCounter.stop();
        
        
        
        // Tests:
        expect(timestamp).toBe(false); // Should be aborted due to unmount
        expect(elapsedFrames).toBe(0); // Ensure early termination
    });
    
    test("should resolve with all false if all are aborted", async () => {
        // Hooks:
        const { result: { current: requestAnimationFrameAsync } } = renderHook(() => useRequestAnimationFrame());
        
        
        
        // Setups:
        const frameCounter1 = new FrameCounter();
        const frameCounter2 = new FrameCounter();
        const frameCounter3 = new FrameCounter();
        const frameCount1 = 3; // 3 times
        const frameCount2 = 1; // 1 times
        const frameCount3 = 5; // 5 times
        
        
        
        
        // Starts measuring:
        frameCounter1.start();
        frameCounter2.start();
        frameCounter3.start();
        const timeoutPromise1 = requestAnimationFrameAsync(frameCount1); // 3 times
        const timeoutPromise2 = requestAnimationFrameAsync(frameCount2); // 1 times
        const timeoutPromise3 = requestAnimationFrameAsync(frameCount3); // 5 times
        
        
        
        // Interrupts measuring:
        timeoutPromise1.abort(); // Abort before completion
        timeoutPromise2.abort(); // Abort before completion
        timeoutPromise3.abort(); // Abort before completion
        
        
        
        // Stops measuring:
        const [
            [timestamp1, elapsedFrames1],
            [timestamp2, elapsedFrames2],
            [timestamp3, elapsedFrames3],
        ] = await Promise.all([
            timeoutPromise1.then((timestamp1) => {
                const elapsedFrames1 = frameCounter1.stop();
                return [timestamp1, elapsedFrames1] as const;
            }),
            timeoutPromise2.then((timestamp2) => {
                const elapsedFrames2 = frameCounter2.stop();
                return [timestamp2, elapsedFrames2] as const;
            }),
            timeoutPromise3.then((timestamp3) => {
                const elapsedFrames3 = frameCounter3.stop();
                return [timestamp3, elapsedFrames3] as const;
            }),
        ]);
        
        
        
        // Tests:
        expect(timestamp1).toBe(false); // Should be aborted due to abort
        expect(timestamp2).toBe(false); // Should be aborted due to abort
        expect(timestamp3).toBe(false); // Should be aborted due to abort
        expect(elapsedFrames1).toBe(0); // Ensure early termination
        expect(elapsedFrames2).toBe(0); // Ensure early termination
        expect(elapsedFrames3).toBe(0); // Ensure early termination
    });
    
    test("should resolve with all false if all experience unmount", async () => {
        // Hooks:
        const { result: { current: requestAnimationFrameAsync }, unmount } = renderHook(() => useRequestAnimationFrame());
        
        
        
        // Setups:
        const frameCounter1 = new FrameCounter();
        const frameCounter2 = new FrameCounter();
        const frameCounter3 = new FrameCounter();
        const frameCount1 = 3; // 3 times
        const frameCount2 = 1; // 1 times
        const frameCount3 = 5; // 5 times
        
        
        
        
        // Starts measuring:
        frameCounter1.start();
        frameCounter2.start();
        frameCounter3.start();
        const timeoutPromise1 = requestAnimationFrameAsync(frameCount1); // 3 times
        const timeoutPromise2 = requestAnimationFrameAsync(frameCount2); // 1 times
        const timeoutPromise3 = requestAnimationFrameAsync(frameCount3); // 5 times
        
        
        
        // Interrupts measuring:
        act(() => {
            unmount(); // Simulate component unmount
        });
        
        
        
        // Stops measuring:
        const [
            [timestamp1, elapsedFrames1],
            [timestamp2, elapsedFrames2],
            [timestamp3, elapsedFrames3],
        ] = await Promise.all([
            timeoutPromise1.then((timestamp1) => {
                const elapsedFrames1 = frameCounter1.stop();
                return [timestamp1, elapsedFrames1] as const;
            }),
            timeoutPromise2.then((timestamp2) => {
                const elapsedFrames2 = frameCounter2.stop();
                return [timestamp2, elapsedFrames2] as const;
            }),
            timeoutPromise3.then((timestamp3) => {
                const elapsedFrames3 = frameCounter3.stop();
                return [timestamp3, elapsedFrames3] as const;
            }),
        ]);
        
        
        
        // Tests:
        expect(timestamp1).toBe(false); // Should be aborted due to abort
        expect(timestamp2).toBe(false); // Should be aborted due to abort
        expect(timestamp3).toBe(false); // Should be aborted due to abort
        expect(elapsedFrames1).toBe(0); // Ensure early termination
        expect(elapsedFrames2).toBe(0); // Ensure early termination
        expect(elapsedFrames3).toBe(0); // Ensure early termination
    });
    
    test("should resolve with some false if some are aborted", async () => {
        // Hooks:
        const { result: { current: requestAnimationFrameAsync } } = renderHook(() => useRequestAnimationFrame());
        
        
        
        // Setups:
        const frameCounter1 = new FrameCounter();
        const frameCounter2 = new FrameCounter();
        const frameCounter3 = new FrameCounter();
        const frameCount1 = 3; // 3 times
        const frameCount2 = 1; // 1 times
        const frameCount3 = 5; // 5 times
        
        
        
        
        // Starts measuring:
        frameCounter1.start();
        frameCounter2.start();
        frameCounter3.start();
        const timeoutPromise1 = requestAnimationFrameAsync(frameCount1); // 3 times
        const timeoutPromise2 = requestAnimationFrameAsync(frameCount2); // 1 times
        const timeoutPromise3 = requestAnimationFrameAsync(frameCount3); // 5 times
        
        
        
        // Interrupts measuring:
        timeoutPromise1.abort(); // Abort before completion
        timeoutPromise3.abort(); // Abort before completion
        
        
        
        // Stops measuring:
        const [
            [timestamp1, elapsedFrames1],
            [timestamp2, elapsedFrames2],
            [timestamp3, elapsedFrames3],
        ] = await Promise.all([
            timeoutPromise1.then((timestamp1) => {
                const elapsedFrames1 = frameCounter1.stop();
                return [timestamp1, elapsedFrames1] as const;
            }),
            timeoutPromise2.then((timestamp2) => {
                const elapsedFrames2 = frameCounter2.stop();
                return [timestamp2, elapsedFrames2] as const;
            }),
            timeoutPromise3.then((timestamp3) => {
                const elapsedFrames3 = frameCounter3.stop();
                return [timestamp3, elapsedFrames3] as const;
            }),
        ]);
        
        
        
        // Tests:
        expect(timestamp1).toBe(false); // Should be aborted due to abort
        expect(typeof timestamp2).toBe('number');;
        expect(timestamp3).toBe(false); // Should be aborted due to abort
        expect(elapsedFrames1).toBe(0); // Ensure early termination
        expect(elapsedFrames2).toBe(frameCount2);
        expect(elapsedFrames3).toBe(0); // Ensure early termination
    });
    
    test("should resolve with some false if some experience unmount", async () => {
        // Hooks:
        const { result: { current: requestAnimationFrameAsync }, unmount } = renderHook(() => useRequestAnimationFrame());
        
        
        
        // Setups:
        const frameCounter1 = new FrameCounter();
        const frameCounter2 = new FrameCounter();
        const frameCounter3 = new FrameCounter();
        const frameCount1 = 3; // 3 times
        const frameCount2 = 1; // 1 times
        const frameCount3 = 5; // 5 times
        
        
        
        // Starts measuring:
        frameCounter1.start();
        frameCounter2.start();
        frameCounter3.start();
        const timeoutPromise1 = requestAnimationFrameAsync(frameCount1); // 3 times
        const timeoutPromise2 = requestAnimationFrameAsync(frameCount2); // 1 times
        const timeoutPromise3 = requestAnimationFrameAsync(frameCount3); // 5 times
        
        
        
        // Stops measuring:
        const [
            [timestamp1, elapsedFrames1],
            [timestamp2, elapsedFrames2],
            [timestamp3, elapsedFrames3],
        ] = await Promise.all([
            timeoutPromise1.then((timestamp1) => {
                const elapsedFrames1 = frameCounter1.stop();
                return [timestamp1, elapsedFrames1] as const;
            }),
            timeoutPromise2.then((timestamp2) => {
                const elapsedFrames2 = frameCounter2.stop();
                return [timestamp2, elapsedFrames2] as const;
            }),
            timeoutPromise3.then((timestamp3) => {
                const elapsedFrames3 = frameCounter3.stop();
                return [timestamp3, elapsedFrames3] as const;
            }),
            
            // Interrupts measuring after 2 times of frame:
            (async () => {
                for (let counter = 0; counter < 2; counter++) { // Wait for 2 times of frame before unmounting, so the `timeoutPromise2` survives
                    await new Promise<void>((resolve) => {
                        requestAnimationFrame(() => {
                            resolve();
                        });
                    });
                } // for
                
                act(() => {
                    unmount(); // Simulate component unmount
                });
            })(),
        ]);
        
        
        
        // Tests:
        expect(timestamp1).toBe(false); // Should be aborted due to abort
        expect(typeof timestamp2).toBe('number');;
        expect(timestamp3).toBe(false); // Should be aborted due to abort
        expect(elapsedFrames1).toBe(2); // Ensure early termination
        expect(elapsedFrames2).toBe(frameCount2);
        expect(elapsedFrames3).toBe(2); // Ensure early termination
    });
});
