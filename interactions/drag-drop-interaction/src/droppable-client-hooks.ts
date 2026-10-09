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
    // Hooks:
    useResolvedDisabled,
}                           from '@reusable-ui/disabled-state'      // Adds enabled/disabled functionality to UI components, with transition animations and semantic styling hooks.

// Types:
import {
    // Data:
    type DropMetadata,
    
    // Handshakes:
    type DropHandshakeEvent,
    
    // Props:
    type DroppableStateProps,
    
    // Reactive states:
    type DroppableState,
}                           from './types.js'
import {
    type DroppableContext,
}                           from './internal-types.js'

// Utilities:
import {
    emptyMap,
}                           from './internal-defaults.js'
import {
    // Updates:
    updateDroppableRegistry,
    lazyInitializeDroppableContext,
    syncDroppableContext,
}                           from './internal-utilities.js'



/**
 * Serves a component as a droppable target
 * and provides reactive state reflecting the current drop lifecycle.
 * 
 * @param props The component props that may include droppable configuration and disabled properties.
 * @returns A reactive droppable state reflecting the current drop activity status
 * and evaluation outcome for this specific droppable target.
 * 
 * @example
 * ```tsx
 * import React, { type FC, useMemo } from 'react';
 * import {
 *     type DropMetadata,
 *     useDroppableState,
 * } from '@reusable-ui/drag-drop-interaction';
 * 
 * export interface ProductCategoryProps {
 *     categoryModel: CategoryModel
 * }
 * 
 * // A droppable product category zone.
 * // Business rule: Accepts only products that are in stock.
 * export const ProductCategory: FC<ProductCategoryProps> = ({ categoryModel }) => {
 *     // 1. Define the target's business context (metadata) exposed to the draggable:
 *     const categoryMetadata = useMemo<DropMetadata>(() => {
 *         return new Map<string, unknown>([
 *             ['type', 'category'],
 *             ['id'  , categoryModel.id],
 *             ['name', categoryModel.name],
 *             ['icon', categoryModel.icon],
 *         ]);
 *     }, [categoryModel]);
 *     
 *     // 2. Wire up the droppable transaction lifecycle:
 *     const { dropStatus, dragPayload, ref } = useDroppableState<HTMLDivElement>({
 *         dropMetadata : categoryMetadata,
 *         dropEnabled  : true,
 *         
 *         // Phase 1 - Activation: A drag started anywhere on the screen.
 *         // Useful for proactively highlighting all valid drop zones.
 *         onDragPresence(event) {
 *             console.log(`A drag session has started: ${event.dragPayload.get('type')}`);
 *         },
 *         
 *         // No Phase 2 on this side. The draggable handles the probing and ignores self/children during hit-testing.
 *         
 *         // Phase 3 - Handshake: The pointer has entered this zone.
 *         // Negotiate by inspecting the incoming payload.
 *         // NOTE: Keep this fast! It fires frequently on every pointer move.
 *         async onDropHandshake(event) {
 *             // Optional: perform async validation here (e.g. API call).
 *             const isProduct = event.dragPayload.get('type') === 'product';
 *             const inStock   = !!(event.dragPayload.get('stock') ?? 0);
 *             
 *             // Communicate acceptance/rejection back to the draggable:
 *             event.dropResponse = isProduct && inStock;
 *         },
 *         
 *         // Phase 4 - Evaluation: Reports the negotiation result of both sides.
 *         // Useful for live updates like showing a ✅ or 🚫 icon, or previewing a dropped product.
 *         // NOTE: Consider debouncing if executing heavy logic here.
 *         onDropEvaluation(event) {
 *             const productName = event.dragPayload.get('name');
 *             console.log(`A product: ${productName} is hovering over ${categoryModel.name}`);
 *         },
 *         
 *         // Phase 5 - Commit: The user successfully dropped the item here.
 *         // Apply the payload to your application state or database.
 *         onDropCommit(event) {
 *             const productId = event.dragPayload.get('id');
 *             console.log(`Committed: Product ${productId} moved to Category ${categoryModel.id}`);
 *         },
 *         
 *         // Phase 6 - Deactivation: The drag session concluded (successfully or not).
 *         // Clean up any global visual cues.
 *         onDragAbsence(event) {
 *             console.log(`Drag concluded. Was it hovered here? ${event.isTargeted}`);
 *         },
 *     });
 *     
 *     // 3. Render the UI based on the live `dropStatus`:
 *     return (
 *         <div ref={ref} className='product-category'>
 *             <h4>{categoryModel.name}</h4>
 *             <img src={categoryModel.icon} alt='Category' />
 *             
 *             <div className='live-status-indicator'>
 *                 {dropStatus === true  && '✅ Valid drop zone! Release to commit.'}
 *                 {dropStatus === false && '🚫 Invalid payload (out of stock or wrong type).'}
 *                 {dropStatus === null  && 'A drag is active. Drop products here!'}
 *             </div>
 *             
 *             {dragPayload?.get('type') === 'product' && (
 *                 <div className='live-product-preview'>
 *                     <h4>{dragPayload.get('name') as string}</h4>
 *                     <img src={dragPayload.get('icon') as string} alt='Product preview' />
 *                 </div>
 *             )}
 *         </div>
 *     );
 * };
 * ```
 */
export const useDroppableState = <TElement extends Element = HTMLElement>(props: DroppableStateProps<TElement> & Parameters<typeof useResolvedDisabled>[0]): DroppableState<TElement> => {
    // Resolve whether the component is disabled:
    const isDisabled = useResolvedDisabled(props);
    
    
    
    // Extract props and assign defaults:
    const {
        // Data:
        dropMetadata = emptyMap satisfies DropMetadata,
        
        
        
        // Behaviors:
        dropEnabled  = !isDisabled,
        
        
        
        // Handlers:
        onDragPresence,
        onDragAbsence,
        onDropHandshake,
        onDropEvaluation,
        onDropCommit,
    } = props;
    
    
    
    // Ref to the droppable DOM element:
    const dropElementRef = useRef<TElement | null>(null);
    const dropElement    = dropElementRef.current;
    
    
    
    // Stable event handlers:
    // - Wrapped with `useStableEventHandler` so references never change, avoiding unnecessary re-syncs in the droppable context.
    const handleDragPresence   = useStableEventHandler(onDragPresence);
    const handleDragAbsence    = useStableEventHandler(onDragAbsence);
    const handleDropHandshake  = useStableEventHandler(async (event: DropHandshakeEvent<TElement>): Promise<void> => {
        // Invoke the event callback and wait for `dropResponse` mutation:
        await onDropHandshake?.(event);
    });
    const handleDropEvaluation = useStableEventHandler(onDropEvaluation);
    const handleDropCommit     = useStableEventHandler(onDropCommit);
    
    
    
    // Reactive states:
    // - State setters are stable by design, no need to re-syncs in the droppable context.
    const [dropStatus , setDropStatus ] = useState<DroppableState<TElement>['dropStatus' ]>(undefined);
    const [dragPayload, setDragPayload] = useState<DroppableState<TElement>['dragPayload']>(undefined);
    
    
    
    // Lifecycle flags:
    
    // Tests whether the component is still mounted:
    // - Prevents accidental state updates after unmounted.
    //   E.g., deactivating the previously active droppable side (but now unmounted) when switching to another droppable.
    const dropMountedRef      = useMountedFlag();
    
    
    
    // Droppable context reference:
    const droppableContextRef = useRef<DroppableContext<TElement>>(undefined);
    const droppable           = lazyInitializeDroppableContext<TElement>({
        // Contexts:
        droppableContextRef,
        
        // Data:
        dropMetadata,
        
        // Behaviors:
        dropEnabled,
        
        // Stable event handlers:
        handleDragPresence,
        handleDragAbsence,
        handleDropHandshake,
        handleDropEvaluation,
        handleDropCommit,
        
        // Actual states:
        dropMountedRef,
        dropElementRef,
        
        // Reactive states:
        setDropStatus,
        setDragPayload,
    });
    
    
    
    // Keep droppable context in sync with prop changes:
    // - No `useEffect()` needed — these are plain object flags.
    syncDroppableContext({
        // Contexts:
        droppable,
        
        // Data:
        dropMetadata,
        
        // Behaviors:
        dropEnabled,
    });
    
    
    
    // Register/unregister lifecycle:
    // - Register on mount and whenever `dropElement` changes.
    // - Unregister automatically on unmount.
    const handleRegistrationLifecycle = useStableCallback((isSetup: boolean, registeredDropElement: TElement): void => {
        // Setup   : Register on mount.
        // Cleanup : Unregister on unmount.
        updateDroppableRegistry(droppable, registeredDropElement, isSetup);
    });
    useEffect(() => {
        // Only register when the droppable element exists:
        if (!dropElement) return;
        
        
        
        // Register on mount:
        const registeredDropElement = dropElement; // Snapshot the current drop element for *later* unregistration.
        handleRegistrationLifecycle(true, registeredDropElement);
        
        
        
        // Unregister on unmount:
        return () => {
            handleRegistrationLifecycle(false, registeredDropElement);
        };
    }, [dropElement]);
    
    
    
    // Expose reactive droppable state:
    return {
        dropStatus,
        dragPayload,
        ref : dropElementRef,
    } satisfies DroppableState<TElement>;
};
