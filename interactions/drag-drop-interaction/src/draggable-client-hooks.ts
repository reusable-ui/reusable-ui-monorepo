'use client' // The exported hooks are client side only.

// React:
import {
    // Hooks:
    useState,
    useRef,
    useEffect,
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
    // Types:
    type DisabledStateProps,
    
    
    
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
    processDragProbe,
    processDropCandidate,
    processDragDropCommit,
}                           from './internal-utilities.js'



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
 * import React, { type FC, useRef, useMemo } from 'react';
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
 *     const dragCardRef = useRef<HTMLDivElement | null>(null);
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
 *     const { dragStatus, dropMetadata } = useDraggableState({
 *         dragRef      : dragCardRef,
 *         dragPayload  : productPayload,
 *         dragEnabled  : true,
 *         computedDrag : dragState.dragged,
 *         
 *         // Prevent the ghost image itself (product card) from being considered a valid drop target:
 *         dropPredicate(dropCandidate) {
 *             const cardElement = dragCardRef.current;
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
 *         // Evaluation: provide live feedback while hovering over a category
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
 *             ref={dragCardRef}
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
export const useDraggableState = <TElement extends Element = HTMLElement>(props: DraggableStateProps<TElement> & Pick<DisabledStateProps, 'disabled' | 'cascadeDisabled'>): DraggableState => {
    // Resolve whether the component is disabled:
    const isDisabled = useResolvedDisabled(props);
    
    
    
    // Extract props and assign defaults:
    const {
        // Data:
        dragPayload  = emptyMap satisfies DragPayload,
        
        
        
        // Refs:
        dragRef      = null,
        
        
        
        // Behaviors:
        dragEnabled  = !isDisabled,
        dropPredicate,
        
        
        
        // States:
        computedDrag = false,
        
        
        
        // Handlers:
        onDragHandshake,
        onDragEvaluation,
        onDragged,
    } = props;
    
    
    
    // Normalize React ref to DOM element:
    // - Unwraps the underlying DOM element if passed as a React Ref object.
    const dragElement : TElement | null = dragRef && ('current' in dragRef) ? dragRef.current : dragRef;
    
    
    
    // Stable event handlers:
    // - Wrapped with `useStableEventHandler` so references never change, avoiding unnecessary re-syncs or deps in `useEffect()`.
    const handleDragHandshake  = useStableEventHandler(async (event: DragHandshakeEvent<TElement>): Promise<void> => {
        // Invoke the event callback and wait for `dragResponse` mutation:
        await onDragHandshake?.(event);
    });
    const handleDragEvaluation = useStableEventHandler(onDragEvaluation);
    const handleDragged        = useStableEventHandler(onDragged);
    
    
    
    // Reactive states:
    // - State setters are stable by design, no need to re-syncs or deps in `useEffect()`.
    const [dragStatus  , setDragStatus  ] = useState<DraggableState['dragStatus'  ]>(undefined);
    const [dropMetadata, setDropMetadata] = useState<DraggableState['dropMetadata']>(undefined);
    
    
    
    // Lifecycle flags:
    
    // Tracks whether the component is mounted:
    // - Prevents state updates after unmount during async operations.
    const isMounted = useMountedFlag();
    
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
        !!dragElement && !!isMounted.current && !!dragEnabled
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
            
            // Reactive states:
            setDragStatus,
            setDropMetadata,
            
            // Utility functions:
            isDragReady,
        });
    });
    
    // Global pointer up handler:
    // - Captures the most recent pointerup event during drag gestures for later commit.
    // - Stable reference, safe to use in `useEffect()` without listing in deps, avoiding unnecessary re-runs.
    const handleGlobalPointerUp   = useStableEventHandler((pointerUpEvent: PointerEvent): void => {
        processDropCandidate({
            // Events:
            pointerUpEvent,
            
            // Refs:
            activeDroppableRef,
            
            // Utility functions:
            isDragReady,
        });
    });
    
    
    
    // "Lifecycle" effect:
    // - Handles drag lifecycle state.
    // - Broadcasts active state on start, inactive state on end.
    // - Sets up and cleans up global pointer listeners for pointer movements and pointer release.
    // - Cleans up the previously active droppable entry when drag ends.
    // - Runs only while draggable is enabled and a drag gesture is in progress.
    // - Commit logic is performed inside the cleanup, before resetting state.
    useEffect(() => {
        // Only track while draggable is enabled and a drag gesture is active:
        if (!dragEnabled || !computedDrag) return;
        
        
        
        // Setup when drag starts:
        
        // Mark draggable as active and broadcast active state to all droppables:
        updateDragLifecycle({
            // Lifecycle configs:
            isSetup: true, // ⚙️ `true` → setup
            
            // Actual states:
            activeDroppableRef,
            
            // Reactive states:
            setDragStatus,
            setDropMetadata,
        });
        
        // Setup global pointer listeners for drag probing and drop candidate evaluation:
        updateGlobalPointerListeners({
            // Lifecycle configs:
            isSetup: true, // ⚙️ `true` → setup
            
            // Stable event handlers:
            handleGlobalPointerMove,
            handleGlobalPointerUp,
        });
        
        
        
        // Cleanup when drag ends:
        return () => {
            // Commit first before resetting state, to ensure the last pointerup event is processed:
            processDragDropCommit<TElement>({
                // Data:
                dragPayload,
                
                // Refs:
                dragElement,
                activeDroppableRef, // ✅ Skips the commit if the pointer is not hovering over a droppable zone when the pointer is released.
                
                // Stable event handlers:
                handleDragged,
                
                // Utility functions:
                isDragReady, // ✅ Skips the commit if the component is unmounted or disabled.
            });
            
            
            
            // Then reset draggable to inactive, broadcast inactive state to all droppables, and clears the previously active droppable entry:
            updateDragLifecycle({
                // Lifecycle configs:
                isSetup: false, // 🧹 `false` → cleanup
                
                // Actual states:
                activeDroppableRef,
                
                // Reactive states:
                setDragStatus,
                setDropMetadata,
            });
            
            // Cleanup global pointer listeners for drag probing and drop candidate evaluation:
            updateGlobalPointerListeners({
                // Lifecycle configs:
                isSetup: false, // 🧹 `false` → cleanup
                
                // Stable event handlers:
                handleGlobalPointerMove,
                handleGlobalPointerUp,
            });
        };
    }, [dragEnabled, computedDrag]);
    
    
    
    // Expose reactive draggable state:
    return {
        dragStatus,
        dropMetadata,
    } satisfies DraggableState;
};
