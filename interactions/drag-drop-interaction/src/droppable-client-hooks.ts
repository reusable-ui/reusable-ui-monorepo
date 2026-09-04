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
    type DropMetadata,
    
    // Handshakes:
    type DropHandshakeEvent,
    
    // Props:
    type DroppableStateProps,
    
    // Reactive states:
    type DroppableState,
}                           from './types.js'
import {
    type DroppableEntry,
}                           from './internal-types.js'

// Utilities:
import {
    emptyMap,
}                           from './internal-defaults.js'
import {
    // Updates:
    updateDroppableRegistry,
    lazyInitializeDroppableEntry,
    syncDroppableEntry,
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
 * import React, { type FC, useRef, useMemo } from 'react';
 * import {
 *     type DropMetadata,
 *     useDroppableState,
 * } from '@reusable-ui/drag-drop-interaction';
 * 
 * export interface ProductCategoryProps {
 *     categoryModel: CategoryModel
 * }
 * 
 * // A droppable product category.
 * // Accepts only products that are in stock.
 * export const ProductCategory: FC<ProductCategoryProps> = ({ categoryModel }) => {
 *     // Metadata describing this droppable zone (business context):
 *     const categoryMetadata = useMemo<DropMetadata>(() => {
 *         // Extract category details from the model:
 *         return new Map<unknown, unknown>([
 *             ['type' , 'category'],
 *             ['id'   , categoryModel.id],
 *             ['name' , categoryModel.name],
 *             ['icon' , categoryModel.icon],
 *         ]);
 *     }, [categoryModel]);
 *     
 *     const dropZoneRef = useRef<HTMLDivElement | null>(null);
 *     
 *     // Orchestrates the transaction logic for droppables:
 *     const { dropStatus, dragPayload } = useDroppableState({
 *         dropRef      : dropZoneRef,
 *         dropMetadata : categoryMetadata,
 *         dropEnabled  : true,
 *         
 *         // Handshake: only accept products that are in stock
 *         async onDropHandshake(event) {
 *             // Optional: perform async validation here (e.g. API call).
 *             const isProduct = event.dragPayload.get('type') === 'product';
 *             const inStock   = !!(event.dragPayload.get('stock') ?? 0);
 *             
 *             // Communicate acceptance/rejection back to the draggable:
 *             event.dropResponse = isProduct && inStock;
 *         },
 *         
 *         // Evaluation: provide live feedback while hovered by a product card
 *         onDropEvaluation(event) {
 *             const productName = event.dragPayload.get('name');
 *             console.log(`A product: ${productName} is hovering over this category`);
 *             // TODO: show a tooltip of the hovering product
 *         },
 *         
 *         // Commit: handle the actual drop
 *         onDropped(event) {
 *             const productId = event.dragPayload.get('id');
 *             console.log(`A product with id: ${productId} has been moved into this category`);
 *             // TODO: persist to DB or trigger state update
 *         },
 *     });
 *     
 *     return (
 *         <div ref={dropZoneRef} className='product-category'>
 *             <h4>{categoryModel.name}</h4>
 *             <img src={categoryModel.icon} alt='Category' />
 *             
 *             <span>Live acceptance feedback</span>
 *             {dropStatus === true
 *                 ? '✅ Drop here!'
 *                 : dropStatus === null
 *                     ? 'Drag products into this category'
 *                     : ''}
 *             
 *             <span>Optional preview of the dragged product</span>
 *             {dragPayload?.get('type') === 'product' && (
 *                 <div className='product-preview'>
 *                     <h4>{dragPayload.get('name') as string}</h4>
 *                     <img src={dragPayload.get('icon') as string} alt='Product preview' />
 *                 </div>
 *             )}
 *         </div>
 *     );
 * };
 * ```
 */
export const useDroppableState = <TElement extends Element = HTMLElement>(props: DroppableStateProps<TElement> & Pick<DisabledStateProps, 'disabled' | 'cascadeDisabled'>): DroppableState => {
    // Resolve whether the component is disabled:
    const isDisabled = useResolvedDisabled(props);
    
    
    
    // Extract props and assign defaults:
    const {
        // Data:
        dropMetadata = emptyMap satisfies DropMetadata,
        
        
        
        // Refs:
        dropRef      = null,
        
        
        
        // Behaviors:
        dropEnabled  = !isDisabled,
        
        
        
        // Handlers:
        onDropHandshake,
        onDropEvaluation,
        onDropped,
    } = props;
    
    
    
    // Normalize React ref to DOM element:
    // - Unwraps the underlying DOM element if passed as a React Ref object.
    const dropElement : TElement | null = dropRef && ('current' in dropRef) ? dropRef.current : dropRef;
    
    
    
    // Stable event handlers:
    // - Wrapped with `useStableEventHandler` so references never change, avoiding unnecessary re-syncs in the registry entry.
    const handleDropHandshake  = useStableEventHandler(async (event: DropHandshakeEvent<TElement>): Promise<void> => {
        // Invoke the event callback and wait for `dropResponse` mutation:
        await onDropHandshake?.(event);
    });
    const handleDropEvaluation = useStableEventHandler(onDropEvaluation);
    const handleDropped        = useStableEventHandler(onDropped);
    
    
    
    // Reactive states:
    // - State setters are stable by design, no need to re-syncs in the registry entry.
    const [dropStatus , setDropStatus ] = useState<DroppableState['dropStatus' ]>(undefined);
    const [dragPayload, setDragPayload] = useState<DroppableState['dragPayload']>(undefined);
    
    
    
    // Registry entry reference:
    const droppableEntryRef = useRef<DroppableEntry<TElement>>(undefined);
    const droppableEntry    = lazyInitializeDroppableEntry<TElement>({
        // Actual states:
        droppableEntryRef,
        
        // Data:
        dropMetadata,
        
        // Behaviors:
        dropEnabled,
        
        // Stable event handlers:
        handleDropHandshake,
        handleDropEvaluation,
        handleDropped,
        
        // Reactive states:
        setDropStatus,
        setDragPayload,
    });
    
    
    
    // Keep registry entry in sync with prop changes:
    // - No `useEffect()` needed — these are plain object flags.
    syncDroppableEntry({
        // Actual states:
        droppableEntry,
        
        // Data:
        dropMetadata,
        
        // Behaviors:
        dropEnabled,
    });
    
    
    
    // Register/unregister lifecycle:
    // - Register on mount and whenever `dropElement` changes.
    // - Unregister automatically on unmount.
    useEffect(() => {
        // Only register when the droppable element exists:
        if (!dropElement) return;
        
        
        
        // Register on mount:
        updateDroppableRegistry<TElement>({
            // Lifecycle configs:
            isSetup: true, // ⚙️ `true` → setup
            
            // Data:
            dropElement,
            droppableEntry,
        });
        
        
        
        // Unregister on unmount:
        return () => {
            updateDroppableRegistry<TElement>({
                // Lifecycle configs:
                isSetup: false, // 🧹 `false` → cleanup
                
                // Data:
                dropElement,
                droppableEntry,
            });
        };
    }, [dropElement]);
    
    
    
    // Expose reactive droppable state:
    return {
        dropStatus,
        dragPayload,
    } satisfies DroppableState;
};
