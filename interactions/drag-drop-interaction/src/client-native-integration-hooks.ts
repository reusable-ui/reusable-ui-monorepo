'use client' // The exported hooks are client side only.

// React:
import {
    // Types:
    type RefObject,
    
    // Hooks:
    useRef,
    useEffect,
}                           from 'react'

// Types:
import {
    // Integrations:
    type NativeDragIntegration,
}                           from './types.js'

// Utilities:
import {
    integrateNativeDrag,
}                           from './client-native-integrations.js'



/**
 * Integrates native HTML Drag & Drop events (including file drags and third-party draggables)
 * into the `useDroppableState()` system.
 * 
 * Useful for:
 * - Handling **file drags** from the operating system.
 * - Interoperating with **third-party draggable components**
 *   that rely on the native HTML Drag & Drop API.
 * 
 * Behaviors:
 * - Initializes integration on mount.
 * - Cleans up automatically on unmount.
 * - Exposes the integration handle via a RefObject for optional manual control.
 * 
 * ⚠️ Use this integration only as a fallback:
 * - If you only need drag-drop across React components,
 *   prefer `useDraggableState()` and `useDroppableState()`.
 * - This integration exists as a compatibility layer, not the primary API.
 * 
 * Internally, this simulates `useDraggableState()` without exposing
 * reactive states — serving purely as a compatibility layer.
 * 
 * @returns An integration reference for manual control.
 * 
 * @remarks
 * #### 🔒 Native Drag Payload Behavior & Browser Security
 * 
 * Due to browser-enforced **Protected Mode** sandboxing, native drag-and-drop operations impose strict limitations on when data can be accessed.  
 * To comply with these security policies while maintaining predictable UI reactivity, the native `DragPayload` operates in a **Two-Phase State Model**:
 * 
 * 1. **Masked Phase (Pre-Commit):**  
 *    Prior to the drop commit (`DragPresenceEvent`, `DropHandshakeEvent`, `DropEvaluationEvent`),  
 *    browser security rules prevent scripts from reading raw data.  
 *    Only metadata (item kinds, MIME types, and counts) is visible, while all underlying values are masked to `null`.  
 *    * *Example:* `DragPayload { 'text/html' => [null, null] }` (Indicates an HTML type carrying two masked items).
 * 
 * 2. **Resolved Phase (Post-Commit):**  
 *    Once the drop commit occurs (`DropCommitEvent`),  
 *    native readers unlock, and values are fully resolved into `string` or `File` instances in-place.  
 *    * *Example:* `DragPayload { 'text/html' => ['<!DOCTYPE html>...', File] }` (Indicates an HTML type carrying actual resolved data).
 * 
 * The table below outlines how `dragPayload` appears across various droppable event phases:
 * 
 * |    Event Phase    |       Event Name      | `dragPayload` Condition |                                  Description                                 |
 * | ----------------- | --------------------- | ----------------------- | ---------------------------------------------------------------------------- |
 * | **Activations**   | `DragPresenceEvent`   | 🛡️ **Masked** (`null`) | Hover active; metadata visible, data locked by browser sandbox.              |
 * | **Handshakes**    | `DropHandshakeEvent`  | 🛡️ **Masked** (`null`) | Target negotiation ongoing; data remains protected.                          |
 * | **Evaluations**   | `DropEvaluationEvent` | 🛡️ **Masked** (`null`) | Drop eligibility evaluated; data remains protected.                          |
 * | **Commits**       | `DropCommitEvent`     | ✨ **Fully Resolved**  | Drop completed; native readers unlock, values populated.                     |
 * | **Deactivations** | `DragAbsenceEvent`    | 🔀 **Conditional**     | Fully resolved if the drop committed successfully; otherwise remains masked. |
 * 
 * ℹ️ **Note on Draggable Events:**  
 * There are no draggable-side events (`DragStartEvent`, `DragHandshakeEvent`, `DragEvaluationEvent`, `DragCommitEvent`, `DragEndEvent`)  
 * for native drags because the draggable side is **virtually simulated** by the library wrapper.
 * 
 * 📌 **Reference Stability:**  
 * The `.dragPayload` property exposed via `useDroppableState()` and all drag/drop event objects share the exact same instance reference throughout the gesture.  
 * The values are initially masked (`null`) and automatically transition to `string` or `File` in-place once the drop commit occurs.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import { useNativeDragIntegration } from '@reusable-ui/drag-drop-interaction';
 * 
 * export const FileDropZone: FC = () => {
 *     const nativeDragIntegration = useNativeDragIntegration();
 *     
 *     // Optional: manually disintegrate early
 *     // nativeDragIntegration.current?.disintegrate();
 *     
 *     // Orchestrates the file transaction logic for droppables:
 *     const { dropStatus, dragPayload } = useDroppableState<HTMLDivElement>({
 *         ......
 *     });
 *     
 *     return (
 *         <div className='file-drop-zone'>
 *             <span>Live acceptance feedback</span>
 *             {dropStatus === true
 *                 ? '✅ Drop file(s) here!'
 *                 : dropStatus === null
 *                     ? 'Drag file(s) into this zone'
 *                     : ''}
 *         </div>
 *     );
 * };
 * ```
 */
export const useNativeDragIntegration = (): RefObject<NativeDragIntegration | null> => {
    // States:
    const integrationRef = useRef<NativeDragIntegration | null>(null);
    
    
    
    // Lifecycles:
    useEffect(() => {
        // Setups:
        integrationRef.current = integrateNativeDrag();
        
        
        
        // Cleanups:
        return () => {
            integrationRef.current?.disintegrate();
            integrationRef.current = null;
        };
    }, []);
    
    
    
    // Exposes the integration reference:
    return integrationRef;
};
