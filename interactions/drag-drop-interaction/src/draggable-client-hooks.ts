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
    type DraggableContext,
}                           from './internal-types.js'

// Utilities:
import {
    emptyMap,
}                           from './internal-defaults.js'
import {
    // Updates:
    updateDragLifecycle,
    updateGlobalPointerListeners,
    lazyInitializeDraggableContext,
    syncDraggableContext,
    
    // Processes:
    processDragActivation,
    processDragDeactivation,
    processDragProbe,
    processDragCommit,
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
 * import { useMergedEventHandlers } from '@reusable-ui/callbacks';
 * 
 * export interface ProductCardProps {
 *     productModel: ProductModel
 * }
 * 
 * // A draggable product card source.
 * // Business rule: Can be dragged into categories that accept products.
 * export const ProductCard: FC<ProductCardProps> = ({ productModel }) => {
 *     // 1. Define the source's business data (payload) carried during drag:
 *     const productPayload = useMemo<DragPayload>(() => {
 *         return new Map<string, unknown>([
 *             ['type' , 'product'],
 *             ['id'   , productModel.id],
 *             ['name' , productModel.name],
 *             ['icon' , productModel.icon],
 *             ['stock', productModel.stock],
 *         ]);
 *     }, [productModel]);
 *     
 *     // 2. Track whether the pointer is currently pressed or released:
 *     const pressState = usePressState({
 *         pressed: 'auto',
 *     });
 *     
 *     // 3. Continuously track the pointer coordinates during press-and-hold gestures:
 *     const dragState = useDragState({
 *         dragged: 'auto',
 *         computedDrag: pressState.pressed,
 *     });
 *     
 *     // 4. Wire up the draggable transaction lifecycle:
 *     const { dragStatus, dropMetadata, ref } = useDraggableState<HTMLDivElement>({
 *         dragPayload  : productPayload,
 *         dragEnabled  : true,
 *         computedDrag : dragState.dragged,
 *         
 *         // Phase 1 - Activation: The user initiated a drag gesture.
 *         // Useful for initializing drag feedback or custom drag previews.
 *         onDragStart(event) {
 *             console.log(`Started dragging product: ${productModel.name}`);
 *         },
 *         
 *         // Phase 2 - Probe: Ignore self/children during pointer hit-testing
 *         // so the ghost image itself (product card) doesn't block the underlying droppable zone.
 *         dropPredicate(dropCandidate): boolean {
 *             const cardElement = ref.current;
 *             return !cardElement || !cardElement.contains(dropCandidate);
 *         },
 *         
 *         // Phase 3 - Handshake: The pointer entered a candidate droppable.
 *         // Negotiate by inspecting the candidate target's metadata.
 *         // NOTE: Keep this fast! It fires frequently on every pointer move.
 *         async onDragHandshake(event) {
 *             // Optional: perform async validation here (e.g. API call).
 *             const isCategoryZone = event.dropMetadata.get('type') === 'category';
 *             
 *             // Communicate acceptance/rejection back to the droppable:
 *             event.dragResponse = isCategoryZone;
 *         },
 *         
 *         // Phase 4 - Evaluation: Reports the negotiation result of both sides.
 *         // Useful for live updates like showing a ✅ or 🚫 icon, or showing a tooltip following the cursor.
 *         // NOTE: Consider debouncing if executing heavy logic here.
 *         onDragEvaluation(event) {
 *             const categoryName = event.dropMetadata?.get('name');
 *             console.log(`Hovering over category: ${categoryName}`);
 *         },
 *         
 *         // Phase 5 - Commit: Successfully dropped into an accepted zone.
 *         // Finalized by the droppable, but useful for source notifications/toasts.
 *         onDragCommit(event) {
 *             const categoryName = event.dropMetadata.get('name');
 *             console.log(`Successfully dropped into: ${categoryName}`);
 *         },
 *         
 *         // Phase 6 - Deactivation: The drag session concluded (successfully or not).
 *         // Clean up gesture states and restore resting appearance.
 *         onDragEnd(event) {
 *             console.log(`Drag session ended for product: ${productModel.name}`);
 *         },
 *     });
 *     
 *     // 5. Render the UI and bind pointer event handlers:
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
 *             <div className='live-status-indicator'>
 *                 {dragStatus === true  && '✅ Ready to drop!'}
 *                 {dragStatus === false && '🚫 Cannot drop in this target.'}
 *                 {dragStatus === null  && 'Please drag to a valid category target'}
 *             </div>
 *             
 *             {dropMetadata?.get('type') === 'category' && (
 *                 <div className='live-category-preview'>
 *                     <h4>{dropMetadata.get('name') as string}</h4>
 *                     <img src={dropMetadata.get('icon') as string} alt='Category preview' />
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
        dropPredicate : unstableDropPredicate,
        
        
        
        // States:
        computedDrag = false,
        
        
        
        // Handlers:
        onDragStart,
        onDragEnd,
        onDragHandshake,
        onDragEvaluation,
        onDragCommit,
    } = props;
    
    
    
    // Ref to the draggable DOM element:
    const dragElementRef = useRef<TElement | null>(null);
    
    
    
    // Stable callbacks:
    // - Wrapped with `useStableCallback` so references never change, avoiding unnecessary re-syncs or deps in `useEffect()`.
    const dropPredicate = useStableCallback((dropCandidate: Element): boolean => unstableDropPredicate?.(dropCandidate) ?? true);
    
    
    
    // Stable event handlers:
    // - Wrapped with `useStableEventHandler` so references never change, avoiding unnecessary re-syncs or deps in `useEffect()`.
    const handleDragStart       = useStableEventHandler(onDragStart);
    const handleDragEnd         = useStableEventHandler(onDragEnd);
    const handleDragHandshake   = useStableEventHandler(async (event: DragHandshakeEvent<TElement>): Promise<void> => {
        // Invoke the event callback and wait for `dragResponse` mutation:
        await onDragHandshake?.(event);
    });
    const handleDragEvaluation  = useStableEventHandler(onDragEvaluation);
    const handleDragCommit      = useStableEventHandler(onDragCommit);
    
    
    
    // Reactive states:
    // - State setters are stable by design, no need to re-syncs or deps in `useEffect()`.
    const [dragStatus  , setDragStatus  ] = useState<DraggableState<TElement>['dragStatus'  ]>(undefined);
    const [dropMetadata, setDropMetadata] = useState<DraggableState<TElement>['dropMetadata']>(undefined);
    
    
    
    // Lifecycle flags:
    
    // Tests whether the component is still mounted:
    // - Prevents accidental state updates after unmounted.
    //   E.g., clearing the draggable's states after unmount when no contact with any droppable zone.
    const dragMountedRef = useMountedFlag();
    
    
    
    // Draggable context reference:
    const draggableContextRef = useRef<DraggableContext<TElement>>(undefined);
    const draggable           = lazyInitializeDraggableContext<TElement>({
        // Contexts:
        draggableContextRef,
        
        // Data:
        dragPayload,
        
        // Behaviors:
        dragEnabled,
        dropPredicate,
        
        // Stable event handlers:
        handleDragStart,
        handleDragEnd,
        handleDragHandshake,
        handleDragEvaluation,
        handleDragCommit,
        
        // Actual states:
        dragMountedRef,
        dragElementRef,
        
        // Reactive states:
        setDragStatus,
        setDropMetadata,
    });
    
    
    
    // Keep draggable context in sync with prop changes:
    // - No `useEffect()` needed — these are plain object flags.
    syncDraggableContext({
        // Contexts:
        draggable,
        
        // Data:
        dragPayload,
        
        // Behaviors:
        dragEnabled,
    });
    
    
    
    // Event handlers:
    
    // Global pointer move handler:
    // - Drives synchronization between draggable and droppable states during drag gestures.
    // - Stable reference, safe to use in `useEffect()` without listing in deps, avoiding unnecessary re-runs.
    const handleGlobalPointerMove = useStableEventHandler(async (pointerMoveEvent: PointerEvent): Promise<void> => {
        processDragProbe(draggable, pointerMoveEvent);
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
    //   - Resets the previously active droppable states (status + payload) when drag ends.
    // - Sets up and cleans up global pointer listener for pointer movements.
    const handleLifecycleChange = useStableCallback((isSetup: boolean): void => {
        if (!isSetup) {
            // Cleanup : Commit first before resetting state, to ensure the last pointerup event is processed.
            processDragCommit(draggable, globalPointerIntegrationRef.current?.lastPointerUpEventRef);
        } // if
        
        // Setup   : Mark draggable as active and broadcast active state to all droppables.
        // Cleanup : Reset the draggable side to inactive, resets the previously active droppable side, and broadcast inactive state to all droppables.
        updateDragLifecycle(draggable, isSetup);
        
        // Setup   : Attach global pointer listeners for drag probing and drop candidate evaluation.
        // Cleanup : Detach global pointer listeners for drag probing and drop candidate evaluation.
        updateGlobalPointerListeners(handleGlobalPointerMove, isSetup);
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
            processDragActivation(draggable, globalPointerIntegrationRef.current?.lastPointerDownEventRef);
        }
        else {
            // Dispatch deactivation events after state is settled:
            processDragDeactivation(draggable, globalPointerIntegrationRef.current?.lastPointerUpEventRef);
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
        ref : dragElementRef,
    } satisfies DraggableState<TElement>;
};
