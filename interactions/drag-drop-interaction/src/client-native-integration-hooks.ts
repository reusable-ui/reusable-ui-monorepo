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
 *     const { dropStatus, dragPayload } = useDroppableState({
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
