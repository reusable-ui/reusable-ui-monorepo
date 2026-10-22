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
     * Creates a secure drag payload instance and initializes Phase 1 (Null-Masking).
     * 
     * Safe to invoke during intermediate drag events (`dragstart`, `dragover`)
     * as it strictly inspects metadata and does not invoke restricted extraction functions.
     * 
     * @param dataTransfer The native `DataTransfer` object from a drag event.
     */
    constructor(dataTransfer: DataTransfer) {
        super();
        
        // Phase 1: Transiently inspect metadata and populate null masks:
        this.#resolvePayload(dataTransfer, false);
    }
    
    /**
     * Extracts and categorizes drag items from the given `DataTransfer` object,
     * grouping them by their MIME type.
     * 
     * Handles both Phase 1 (null-masking during initialization) and
     * Phase 2 (secure data extraction during the drop event).
     * 
     * @param dataTransfer The native browser `DataTransfer` instance to inspect or read from.
     * @param isSecured
     * When `false`, populates slots with `null` placeholders (Phase 1).
     * When `true`, invokes native readers (`getAsString`/`getAsFile`) to populate actual values (Phase 2).
     * 
     * @returns A promise that resolves when all synchronous and asynchronous data extractions complete.
     * Useful to ensure the `SecureDragPayload` is fully resolved before exposing it to consumers (e.g., during drop commit).
     */
    async #resolvePayload(dataTransfer: DataTransfer, isSecured: boolean): Promise<void> {
        // Tracks the grouped item index:
        let itemIndex = -1;
        
        // Tracks pending asynchronous resolution promises:
        const pendingResolutions: Promise<void>[] = [];
        
        
        
        // Extract each payload item from the `DataTransfer` object:
        for (const item of dataTransfer.items ?? []) {
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
     * 
     * @param dataTransfer The native browser `DataTransfer` instance to inspect or read from.
     */
    public [SECURE_RESOLVE_PAYLOAD](dataTransfer: DataTransfer): Promise<void> {
        // Phase 2: Invokes secure resolution using the fresh drop DataTransfer:
        return this.#resolvePayload(dataTransfer, true);
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
 * No-ops for standard `DragPayload`.
 * 
 * ⚠️ **Critical Security Warning:** Must be invoked strictly inside the synchronous macrotask
 * of the `drop` event handler, before any asynchronous `await` calls.
 * Once control yields to a microtask, the browser locks down the data store and extraction will permanently fail.
 * 
 * 🚫 **Internal Only:** Do not reexport this function to the package entrypoint.
 * Keep this function scoped within the library internals.
 * 
 * @param dragPayload The drag payload instance to resolve.
 * @param dataTransfer The live `DataTransfer` object from the native `drop` event.
 * @returns A promise that resolves when all payload data extractions are fully complete.
 */
export const secureResolvePayload = async (dragPayload: DragPayload, dataTransfer: DataTransfer): Promise<void> => {
    // If it's a secure payload, trigger its asynchronous resolution:
    if (dragPayload instanceof SecureDragPayload) await dragPayload[SECURE_RESOLVE_PAYLOAD](dataTransfer);
    
    // For standard `DragPayload`, there is nothing to resolve (no-op).
};
