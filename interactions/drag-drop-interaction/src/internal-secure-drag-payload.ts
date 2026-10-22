// Types:
import {
    // Data:
    type DragPayload,
}                           from './types.js'



/**
 * A unique internal symbol known only to this library
 * to trigger secure payload data extraction during a `drop` event.
 */
const SECURE_RESOLVE_PAYLOAD = Symbol('SecureDragPayload:resolve');



/**
 * A security-compliant drag payload implementing a Two-Phase lifecycle
 * to safely handle browser Protected Mode restrictions.
 * 
 * - **Phase 1 (Instantiation):** Populates Map keys and null-masks slots during `dragstart`/`dragover`.
 * - **Phase 2 (`SECURE_RESOLVE_PAYLOAD`):** Unlocks `DataTransfer` readers to populate actual
 *   `string` or `File` values.
 */
export class SecureDragPayload
    extends
        Map<string, Array<string | File | null>>
    
    implements
        DragPayload
{
    /**
     * Holds the original native `DataTransfer` object provided by the browser event.
     */
    readonly #dataTransfer: DataTransfer;
    
    
    
    /**
     * Creates a secure drag payload instance and initializes Phase 1 (Null-Masking).
     * 
     * Safe to invoke during intermediate drag events (`dragstart`, `dragover`)
     * as it strictly inspects metadata and does not invoke restricted extraction functions.
     * 
     * @param dataTransfer The native `DataTransfer` object from a drag event.
     */
    constructor(dataTransfer: DataTransfer) {
        super();
        this.#dataTransfer = dataTransfer;
        
        // Phase 1: Initialize metadata and null-masked slots for UI inspection:
        this.#resolvePayload(false);
    }
    
    /**
     * Extracts and categorizes drag payloads from the given `DataTransfer` object,
     * grouping items by their MIME type.
     * 
     * Handles both Phase 1 (null-masking) and Phase 2 (secure data extraction).
     * 
     * @param isSecured
     * When `false`, populates slots with `null` placeholders.
     * When `true`, unlocks `DataTransfer` readers to populate actual values.
     * 
     * @returns A promise that resolves when all synchronous and asynchronous data extractions complete.
     * Useful to ensure the `SecureDragPayload` is fully resolved before exposing it to consumers (e.g., during drop commit).
     */
    async #resolvePayload(isSecured: boolean): Promise<void> {
        // Tracks the grouped item index:
        let itemIndex = -1;
        
        // Tracks pending asynchronous resolution promises:
        const pendingResolutions: Promise<void>[] = [];
        
        
        
        // Extract each payload item from the `DataTransfer` object:
        for (const item of this.#dataTransfer.items ?? []) {
            // Increment the index for accurate tracking:
            itemIndex++;
            
            
            
            // Get the provided MIME type (if any):
            const providedMimeType = item.type;
            
            
            
            // Process string items (text selection, HTML snippets, URLs):
            if (item.kind === 'string') {
                // Determine MIME type with fallback:
                // 1. item.type → 2. default plain text
                const mimeType = providedMimeType || 'text/plain';
                
                // Retrieve or initialize the group array:
                const group = this.#upsert(mimeType);
                
                // Append the string into the group:
                if (!isSecured) {
                    // Phase 1: Mask with null so UI components know an item exists:
                    group.push(null);
                }
                else {
                    // Capture current index for the asynchronous callback closure:
                    const currentItemIndex = itemIndex;
                    
                    // Create a promise using withResolvers for tracking completion:
                    const { promise, resolve } = Promise.withResolvers<void>();
                    pendingResolutions.push(promise);
                    
                    // Execute `getAsString()` **synchronously** within the drop macrotask window:
                    item.getAsString((stringValue) => {
                        // Assign the actual string value to the correct index:
                        // - Assumes dataTransfer items remain unchanged during the secure call,
                        //   making the index predictable.
                        group[currentItemIndex] = stringValue;
                        
                        // Signal that string retrieval is complete:
                        resolve();
                    });
                } // if
            }
            
            // Process file items (desktop file drags):
            else if (item.kind === 'file') {
                // Determine MIME type with robust fallbacks:
                // 1. item.type → 2. generic binary stream
                const mimeType = providedMimeType || 'application/octet-stream';
                
                // Retrieve or initialize the group array:
                const group = this.#upsert(mimeType);
                
                // Append the file into the group:
                if (!isSecured) {
                    // Phase 1: Mask with null so UI components know an item exists:
                    group.push(null);
                }
                else {
                    // Execute `getAsFile()` **synchronously** within the drop macrotask window:
                    const file = item.getAsFile();
                    
                    // Assign the file to the correct index:
                    // - Assumes dataTransfer items remain unchanged during the secure call,
                    //   making the index predictable.
                    group[itemIndex] = file;
                } // if
            }
            
            // Defensive safety valve for unrecognized kinds:
            else if (process.env.NODE_ENV === 'development') {
                console.warn(`Unrecognized DataTransferItem kind encountered: "${item.kind}"`);
            } // if
        } // for
        
        
        
        // Wait until all pending asynchronous string extractions are finished:
        await Promise.all(pendingResolutions);
    }
    
    /**
     * Securely resolves the masked payload values to their actual `string` or `File` objects.
     * 
     * ⚠️ **Critical Security Warning:** Must be invoked strictly inside the synchronous macrotask
     * of the `drop` event handler, before any asynchronous `await` calls.
     * Once control yields to a microtask, the browser locks down the data store and extraction will permanently fail.
     */
    public [SECURE_RESOLVE_PAYLOAD](): Promise<void> {
        return this.#resolvePayload(true);
    }
    
    /**
     * Retrieves the existing array for a given MIME type key,
     * or initializes and inserts a new one if it does not yet exist.
     * 
     * @param mimeType The normalized MIME type string serving as the map key.
     * @returns The target array holding items for the specified MIME type.
     */
    #upsert(mimeType: string): Array<string | File | null> {
        // Get the existing array (if any):
        const existingArray = this.get(mimeType);
        if (existingArray) return existingArray;
        
        
        
        // Initialize a new array:
        const newArray : Array<string | File | null> = [];
        this.set(mimeType, newArray);
        return newArray;
    }
}

/**
 * Securely resolves the masked payload values to their actual `string` or `File` objects, if the payload is a `SecureDragPayload`.
 * Otherwise no-op for standard `DragPayload`.
 * 
 * ⚠️ **Critical Security Warning:** Must be invoked strictly inside the synchronous macrotask
 * of the `drop` event handler, before any asynchronous `await` calls.
 * Once control yields to a microtask, the browser locks down the data store and extraction will permanently fail.
 * 
 * 🚫 **Internal Only:** Do not reexport this function to the package entrypoint.
 * Keep this function scoped within the library internals.
 * 
 * @param dragPayload The drag payload instance to resolve.
 * @returns A promise that resolves when all payload data extractions are fully complete.
 */
export const secureResolvePayload = async (dragPayload: DragPayload): Promise<void> => {
    // If it's a secure payload, trigger its asynchronous resolution:
    if (dragPayload instanceof SecureDragPayload) await dragPayload[SECURE_RESOLVE_PAYLOAD]();
    
    // For standard `DragPayload`, there is nothing to resolve (no-op).
};
