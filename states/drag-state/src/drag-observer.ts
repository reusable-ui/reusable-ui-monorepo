'use client' // The exported `useDragObserver()` hook is client side only.

// React:
import {
    // Types:
    type PointerEventHandler,
    
    
    
    // Hooks:
    useLayoutEffect,
    useRef,
    useState,
}                           from 'react'

// Types:
import {
    type DragPosition,
    type DragBehaviorState,
}                           from './types.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.



/**
 * Props for the `useDragObserverState()` hook.
 * 
 * Describes the current drag condition supplied by higher-level state (e.g. press-state).
 */
export interface DragObserverProps {
    /**
     * Indicates whether the drag interaction is currently active:
     * - `true`  : the pointer is pressed and drag is engaged.
     * - `false` : the pointer is released, even outside the element.
     * 
     * Behavior:
     * - When active, `relativeDragOffset` is continuously updated as the pointer moves.
     * - When inactive, updates stop but the last offset is preserved.
     *   This allows `dropping` animations to continue using the final position.
     */
    isDragActive : boolean
}

/**
 * The observed drag state returned by `useDragObserverState()`.
 * 
 * Provides:
 * - A ref to the element being tracked.
 * - Pointer event handlers for integration.
 * - A live relative offset for applying drag translations.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface DragObserverState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Pick<DragBehaviorState<TElement>, 'relativeDragOffset' | 'handlePointerDown' | 'handlePointerMove'>
{
    /* no additional props yet - reserved for future extensions */
}

/**
 * Observes and computes the relative cursor offset during an active drag interaction.
 * 
 * Responsibilities:
 * - Tracks the first pointer that initiates the drag (mouse, touch, or pen).
 * - Captures the grab offset inside the element at drag start.
 * - Continuously updates the relative offset as the pointer moves globally.
 * - Preserves the last offset when drag ends, enabling smooth `dropping` animations.
 * 
 * Controlled by `isDragActive` (typically supplied by press-state):
 * - When `isDragActive = true`, the observer attaches global listeners and continuously updates offsets.
 * - When `isDragActive = false`, listeners are detached and the active pointer ID is cleared.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The drag observer props describing the current drag condition.
 * @returns The observed drag offset and event handlers for integration.
 */
export const useDragObserverState = <TElement extends Element = HTMLElement>(props: DragObserverProps): DragObserverState<TElement> => {
    // Extract props:
    const {
        isDragActive, // Skip tracking when inactive to avoid unnecessary re-renders.
    } = props;
    
    
    
    // States and flags:
    
    // Tracks the pointerId of the first active pointer responsible for the drag:
    const activePointerIdRef = useRef<number | null>(null);
    
    // Stores the most recent grab point inside the element:
    // - Updated on pointerdown and pointermove.
    // - The coordinate is relative to the viewport.
    const latestGrabPointRef = useRef<DragPosition>({ x: 0, y: 0 });
    
    // The live relative offset between the grab point and the current pointer position:
    // - Apply this offset to translate the element so the cursor remains aligned.
    const [relativeDragOffset, setRelativeDragOffset] = useState<DragPosition>({ x: 0, y: 0 });
    
    
    
    // Event handlers:
    
    // Handles pointerdown to capture the initial grab point:
    const handlePointerDown : PointerEventHandler<TElement>  = useStableCallback(({ pointerId, clientX, clientY }) => {
        // Only register the first pointer:
        if ((activePointerIdRef.current !== null) && (activePointerIdRef.current !== pointerId)) return;
        activePointerIdRef.current = pointerId;
        
        
        
        // Store the grab point:
        // - The coordinate is relative to the viewport.
        latestGrabPointRef.current = { x : clientX, y : clientY };
    });
    
    // Additional handler for pointermove to refresh the grab point for stylus devices:
    // - Initial `pointerdown` may be very light and not yet activate the drag-state.
    // - Subsequent `pointermove` events (with the same or slightly different coordinates) should refresh the grab point.
    // - Increases the accuracy of the grab point for stylus devices when the activation happens at different coordinates than the initial `pointerdown`.
    const handlePointerMove : PointerEventHandler<TElement>  = handlePointerDown;
    
    
    
    // Tracks global pointer movement while drag is active:
    useLayoutEffect(() => {
        // Skip if not active to avoid unnecessary listeners and updates:
        if (!isDragActive) return;
        
        
        
        // Snapshot the grab position at activation:
        // - Enables computing the relative offset as the pointer moves.
        const { x: grabbedX, y: grabbedY } = latestGrabPointRef.current;
        
        
        
        // Initialize offset to zero (pressed but not yet moved):
        setRelativeDragOffset({ x: 0, y: 0 });
        
        
        
        // Handler for continously tracking pointer movement globally:
        const handleGlobalPointerMove = ({ pointerId, clientX, clientY }: PointerEvent) => {
            // Only track the pointer that initiated the drag:
            if (pointerId !== activePointerIdRef.current) return;
            
            
            
            // Compute relative offset (delta from grab point):
            // - Both the pointer and grabbed coordinates relative to the viewport.
            setRelativeDragOffset({
                x : clientX - grabbedX,
                y : clientY - grabbedY,
            });
        };
        window.addEventListener('pointermove', handleGlobalPointerMove);
        
        
        
        // Cleanup:
        return () => {
            // Stop tracking pointer movement when drag is no longer active:
            window.removeEventListener('pointermove', handleGlobalPointerMove);
            
            
            
            // Do not reset relative offset here:
            // - Dropping animations may still rely on the last known offset.
            // - When fully dropped, `dragFactor` = 0, so the offset is effectively ignored.
            // setRelativeDragOffset({ x: 0, y: 0 });
            
            
            
            // Clear active pointer ID for future drags:
            activePointerIdRef.current = null;
        };
    }, [isDragActive]);
    
    
    
    // Return API for integration:
    return {
        relativeDragOffset,
        handlePointerDown,
        handlePointerMove,
    } satisfies DragObserverState<TElement>;
};
