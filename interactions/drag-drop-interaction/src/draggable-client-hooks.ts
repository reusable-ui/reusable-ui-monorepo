'use client' // The exported hooks are client side only.

// React:
import {
    // Hooks:
    useState,
    useRef,
    useEffect,
    useLayoutEffect,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Hooks:
    useMountedFlag,
}                           from '@reusable-ui/lifecycles'          // A React utility package for managing component lifecycles, ensuring stable effects, and optimizing state updates.
import {
    // Hooks:
    useStableCallback,
    useStableEventHandler,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.

// Reusable-ui states:
import {
    // Hooks:
    useResolvedDisabled,
}                           from '@reusable-ui/disabled-state'      // Adds enabled/disabled functionality to UI components, with transition animations and semantic styling hooks.

// Types:
import {
    // Data:
    type DragPayload,
    
    // Handshakes:
    type DragHandshakeEvent,
    
    // Props:
    type DraggableStateProps,
    
    // Reactive states:
    type DraggableState,
}                           from './types.js'
import {
    type ActiveDroppableState,
}                           from './internal-types.js'

// Utilities:
import {
    emptyMap,
}                           from './internal-defaults.js'
import {
    // Updates:
    updateDragLifecycle,
    updateGlobalPointerListeners,
    
    // Processes:
    processDragDropActivate,
    processDragDropDeactivate,
    processDragProbe,
    processDragDropCommit,
}                           from './internal-utilities.js'
import {
    type GlobalPointerIntegration,
    integrateGlobalPointer,
}                           from './internal-pointer-tracker-integrations.js'



/**
 * Serves a component as a draggable source
 * and provides reactive state reflecting the current drag lifecycle.
 * 
 * @param props The component props that may include draggable configuration and disabled properties.
 * @returns A reactive draggable state reflecting the current drag activity status
 * and evaluation outcome for this specific draggable source.
 * 
 * @example
 * ```tsx
 * import React, { type FC, useMemo } from 'react';
 * import { usePressState } from '@reusable-ui/press-state';
 * import { useDragState } from '@reusable-ui/drag-state';
 * import {
 *     type DragPayload,
 *     useDraggableState,
 * } from '@reusable-ui/drag-drop-interaction';
 * import { useMergedEventHandlers } from '@reusable-ui/callbacks'
 * 
 * export interface ProductCardProps {
 *     productModel: ProductModel
 * }
 * 
 * // A draggable product card.
 * // Can be dragged into categories that accept products.
 * export const ProductCard: FC<ProductCardProps> = ({ productModel }) => {
 *     // Payload describing this product (data carried during drag-drop):
 *     const productPayload = useMemo<DragPayload>(() => {
 *         // Extract product details from the model:
 *         return new Map<unknown, unknown>([
 *             ['type' , 'product'],
 *             ['id'   , productModel.id],
 *             ['name' , productModel.name],
 *             ['icon' , productModel.icon],
 *             ['stock', productModel.stock],
 *         ]);
 *     }, [productModel]);
 *     
 *     // Tracks whether the pointer is currently pressed or released:
 *     const pressState = usePressState({
 *         pressed: 'auto',
 *     });
 *     
 *     // Continuously tracks pointer coordinates during press-and-hold gestures:
 *     const dragState = useDragState({
 *         dragged: 'auto',
 *         computedDrag: pressState.pressed,
 *     });
 *     
 *     // Orchestrates the transaction logic for draggables:
 *     const { dragStatus, dropMetadata, ref } = useDraggableState<HTMLDivElement>({
 *         dragPayload  : productPayload,
 *         dragEnabled  : true,
 *         computedDrag : dragState.dragged,
 *         
 *         // Prevent the ghost image itself (product card) from being considered a valid drop target:
 *         dropPredicate(dropCandidate): boolean {
 *             const cardElement = ref.current;
 *             return !cardElement || !cardElement.contains(dropCandidate);
 *         },
 *         
 *         // Handshake: only allow dropping into category zones
 *         async onDragHandshake(event) {
 *             // Optional: perform async validation here (e.g. API call).
 *             const isCategoryZone = event.dropMetadata.get('type') === 'category';
 *             
 *             // Communicate acceptance/rejection back to the droppable:
 *             event.dragResponse = isCategoryZone;
 *         },
 *         
 *         // Evaluation: provide live feedback on every pointer movement while hovering over a category
 *         // NOTE: avoid relying on this event unless detailed, pointer-level feedback is needed,
 *         // as it fires *aggressively* on every pointer move and may impact performance.
 *         // Consider debouncing or throttling if you need to perform expensive operations here.
 *         onDragEvaluation(event) {
 *             const categoryName = event.dropMetadata?.get('name');
 *             console.log(`Hovering over category: ${categoryName}`);
 *             // TODO: update ghost image with category label
 *         },
 *         
 *         // Commit: final drop resolution handled by droppable side,
 *         // but we can show confirmation here
 *         onDragged(event) {
 *             const categoryName = event.dropMetadata.get('name');
 *             console.log(`Dropped into category: ${categoryName}`);
 *             // TODO: show toast/notification confirming the move
 *         },
 *     });
 *     
 *     return (
 *         <div
 *             ref={ref}
 *             className={`product-card ${pressState.pressClassname} ${dragState.dragClassname}`}
 *             
 *             onAnimationStart={useMergedEventHandlers(pressState.handleAnimationStart, dragState.handleAnimationStart)}
 *             onAnimationEnd={useMergedEventHandlers(pressState.handleAnimationEnd, dragState.handleAnimationEnd)}
 *             onPointerDown={useMergedEventHandlers(pressState.handlePointerDown, dragState.handlePointerDown)}
 *             onPointerUp={pressState.handlePointerUp}
 *             onPointerCancel={pressState.handlePointerCancel}
 *             onPointerMove={dragState.handlePointerMove}
 *             onKeyDown={pressState.handleKeyDown}
 *             onKeyUp={pressState.handleKeyUp}
 *         >
 *             <h4>{productModel.name}</h4>
 *             <img src={productModel.icon} alt='Product' />
 *             
 *             <span>Live drag status feedback</span>
 *             {dragStatus === true
 *                 ? '✅ Drop here!'
 *                 : dragStatus === null
 *                     ? 'Drag to a category'
 *                     : ''}
 *             
 *             <span>Optional: show category badge while hovering</span>
 *             {dropMetadata?.get('type') === 'category' && (
 *                 <div className='category-badge'>
 *                     <img
 *                         src={dropMetadata.get('icon') as string}
 *                         alt={dropMetadata.get('name') as string}
 *                     />
 *                 </div>
 *             )}
 *         </div>
 *     );
 * };
 * ```
 */
export const useDraggableState = <TElement extends Element = HTMLElement>(props: DraggableStateProps<TElement> & Parameters<typeof useResolvedDisabled>[0]): DraggableState<TElement> => {
    // Resolve whether the component is disabled:
    const isDisabled = useResolvedDisabled(props);
    
    
    
    // Extract props and assign defaults:
    const {
        // Data:
        dragPayload  = emptyMap satisfies DragPayload,
        
        
        
        // Behaviors:
        dragEnabled  = !isDisabled,
        dropPredicate,
        
        
        
        // States:
        computedDrag = false,
        
        
        
        // Handlers:
        onDragActivated,
        onDragDeactivated,
        onDragHandshake,
        onDragEvaluation,
        onDragged,
    } = props;
    
    
    
    // Ref to the draggable DOM element:
    const dragRef     = useRef<TElement | null>(null);
    const dragElement = dragRef.current;
    
    
    
    // Stable event handlers:
    // - Wrapped with `useStableEventHandler` so references never change, avoiding unnecessary re-syncs or deps in `useEffect()`.
    const handleDragActivated   = useStableEventHandler(onDragActivated);
    const handleDragDeactivated = useStableEventHandler(onDragDeactivated);
    const handleDragHandshake   = useStableEventHandler(async (event: DragHandshakeEvent<TElement>): Promise<void> => {
        // Invoke the event callback and wait for `dragResponse` mutation:
        await onDragHandshake?.(event);
    });
    const handleDragEvaluation  = useStableEventHandler(onDragEvaluation);
    const handleDragged         = useStableEventHandler(onDragged);
    
    
    
    // Reactive states:
    // - State setters are stable by design, no need to re-syncs or deps in `useEffect()`.
    const [dragStatus  , setDragStatus  ] = useState<DraggableState<TElement>['dragStatus'  ]>(undefined);
    const [dropMetadata, setDropMetadata] = useState<DraggableState<TElement>['dropMetadata']>(undefined);
    
    
    
    // Lifecycle flags:
    
    // Tests whether the component is still mounted:
    // - Prevents accidental state updates after unmounted.
    //   E.g., clearing the draggable's states after unmount when no contact with any droppable zone.
    const isMountedRef       = useMountedFlag();
    
    // Tracks the currently active droppable state:
    // - Holds both the active entry and its acceptance flag together.
    //   ensuring they are always updated atomically (exist together or not at all).
    // - Storing the full entry (not just a cleanup callback) makes debugging easier
    //   and future extensions more flexible, with negligible memory overhead.
    const activeDroppableRef = useRef<ActiveDroppableState | null>(null);
    
    
    
    // Utility functions:
    
    /**
     * Determines whether the draggable state is valid for dragging operation.
     * - Ensures the draggable element exists.
     * - Ensures the component is still mounted.
     * - Ensures the draggable is enabled.
     * - Ensures values remain fresh even after async awaits.
     *   Always evaluates the *latest* variables from `useDraggableState`,
     *   even if the hook re-renders during an async sequence.
     */
    const isDragReady = useStableCallback((): boolean =>
        !!dragElement && !!isMountedRef.current && !!dragEnabled
    );
    
    
    
    // Event handlers:
    
    // Global pointer move handler:
    // - Drives synchronization between draggable and droppable states during drag gestures.
    // - Stable reference, safe to use in `useEffect()` without listing in deps, avoiding unnecessary re-runs.
    const handleGlobalPointerMove = useStableEventHandler(async (pointerMoveEvent: PointerEvent): Promise<void> => {
        processDragProbe<TElement>({
            // Events:
            pointerMoveEvent,
            
            // Data:
            dragPayload,
            
            // Refs:
            dragElement,
            activeDroppableRef,
            
            // Behaviors:
            dropPredicate,
            
            // Stable event handlers:
            handleDragHandshake,
            handleDragEvaluation,
            
            // Actual states:
            isMountedRef,
            
            // Reactive states:
            setDragStatus,
            setDropMetadata,
            
            // Utility functions:
            isDragReady,
        });
    });
    
    
    
    // "Global Pointer Integration" effect:
    // - Attaches a shared global `pointerdown` and `pointerup` listeners when any draggable is enabled.
    // - Updates `lastPointerDownEventRef` and `lastPointerUpEventRef` with the most recent native events.
    // - Cleans up the listeners when the draggable is disabled or unmounted.
    const globalPointerIntegrationRef = useRef<GlobalPointerIntegration | null>(null);
    useEffect(() => {
        // Only track while draggable is enabled:
        if (!dragEnabled) return;
        
        
        
        // Setup when draggable is enabled:
        globalPointerIntegrationRef.current = integrateGlobalPointer();
        
        
        
        // Cleanup when draggable is disabled or unmounted:
        return () => {
            globalPointerIntegrationRef.current?.disintegrate();
            globalPointerIntegrationRef.current = null;
        };
    }, [dragEnabled]);
    
    
    
    // "Lifecycle" effect:
    // - Runs only while draggable is enabled and a drag gesture is active.
    // - Commit logic is performed inside the cleanup, before resetting state.
    // - Handles drag lifecycle state:
    //   - Broadcasts active state on start, inactive state on end.
    //   - Cleans up the previously active droppable entry when drag ends.
    // - Sets up and cleans up global pointer listener for pointer movements.
    const handleLifecycleChange = useStableCallback((isSetup: boolean): void => {
        if (!isSetup) {
            // Cleanup : Commit first before resetting state, to ensure the last pointerup event is processed.
            processDragDropCommit<TElement>({
                // Data:
                dragPayload,
                
                // Refs:
                dragElement,
                activeDroppableRef, // ✅ Skips the commit if the pointer is not hovering over a droppable zone when the pointer is released.
                lastPointerUpEventRef: globalPointerIntegrationRef.current?.lastPointerUpEventRef,
                
                // Stable event handlers:
                handleDragged,
                
                // Utility functions:
                isDragReady, // ✅ Skips the commit if the component is unmounted or disabled.
            });
        } // if
        
        // Setup   : Mark draggable as active and broadcast active state to all droppables.
        // Cleanup : Reset draggable to inactive, broadcast inactive state to all droppables, and clears the previously active droppable entry.
        updateDragLifecycle({
            // Lifecycle configs:
            isSetup,
            
            // Actual states:
            isMountedRef,
            activeDroppableRef,
            
            // Reactive states:
            setDragStatus,
            setDropMetadata,
        });
        
        // Setup   : Attach global pointer listeners for drag probing and drop candidate evaluation.
        // Cleanup : Detach global pointer listeners for drag probing and drop candidate evaluation.
        updateGlobalPointerListeners({
            // Lifecycle configs:
            isSetup,
            
            // Stable event handlers:
            handleGlobalPointerMove,
        });
    });
    useEffect(() => {
        // Only track while draggable is enabled and a drag gesture is active:
        if (!dragEnabled || !computedDrag) return;
        
        
        
        // Setup when drag starts:
        handleLifecycleChange(true);
        
        
        
        // Cleanup when drag ends:
        return () => {
            handleLifecycleChange(false);
        };
    }, [dragEnabled, computedDrag]);
    
    // "Activation" effect:
    // - Observes changes in drag activity (`dragStatus`) to trigger activation/deactivation events.
    // - Events are dispatched *after* draggable and droppable states have *fully* updated.
    // - Uses `useLayoutEffect` so events fire before the browser repaints,
    //   allowing consumers to update layout immediately without flicker.
    const prevActiveRef = useRef<boolean>(false);    // Tracks previous drag activity state.
    const isActive      = (dragStatus !== undefined); // `undefined` → no drag activity, any other value (`null`/`false`/`true`) → drag activity present.
    const handleActivationChange = useStableCallback((isActive: boolean): void => {
        if (isActive) {
            // Dispatch activation events after state is settled:
            processDragDropActivate<TElement>({
                // Data:
                dragPayload,
                
                // Refs:
                dragElement,
                lastPointerDownEventRef: globalPointerIntegrationRef.current?.lastPointerDownEventRef,
                
                // Behaviors:
                dropPredicate,
                
                // Stable event handlers:
                handleDragActivated,
                
                // Utility functions:
                isDragReady,
            });
        }
        else {
            // Dispatch deactivation events after state is settled:
            processDragDropDeactivate<TElement>({
                // Data:
                dragPayload,
                
                // Refs:
                dragElement,
                activeDroppableRef,
                lastPointerUpEventRef: globalPointerIntegrationRef.current?.lastPointerUpEventRef,
                
                // Stable event handlers:
                handleDragDeactivated,
                
                // Utility functions:
                isDragReady,
            });
        } // if
    });
    useLayoutEffect(() => {
        // Only react to changes in activation state:
        // - Prevents duplicate triggers (e.g. React strict mode double-invocations).
        if (prevActiveRef.current === isActive) return;
        prevActiveRef.current = isActive;
        
        
        
        // Triggers activation/deactivation events:
        handleActivationChange(isActive);
    }, [isActive]);
    
    
    
    // Expose reactive draggable state:
    return {
        dragStatus,
        dropMetadata,
        ref : dragRef,
    } satisfies DraggableState<TElement>;
};
