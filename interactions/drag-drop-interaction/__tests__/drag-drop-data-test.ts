import {
    type DragPayload,
    type DropMetadata,
} from '@reusable-ui/drag-drop-interaction';



export const TEST_PAYLOAD : DragPayload = new Map<unknown, unknown>([
    ['name', 'TEST_PAYLOAD'],
]);

export const TEST_METADATA_1 : DropMetadata = new Map<unknown, unknown>([
    ['name', 'TEST_METADATA_1'],
]);
export const TEST_METADATA_2 : DropMetadata = new Map<unknown, unknown>([
    ['name', 'TEST_METADATA_2'],
]);
export const TEST_METADATA_3 : DropMetadata = new Map<unknown, unknown>([
    ['name', 'TEST_METADATA_3'],
]);
export const TEST_METADATA = [TEST_METADATA_1, TEST_METADATA_2, TEST_METADATA_3] as const;

export const TEST_METADATA_MASKED : DropMetadata = new Map<unknown, unknown>([
    ['mock-data', 'MASKED_MOCK_DATA'],
]);



/**
 * Resolves the expected drag payload based on whether the drag is a polyfill 
 * or a native interaction, and whether the drop event has been committed.
 * 
 * @param expectedPayload The full, unmasked expected payload data.
 * @param simulateNativeDraggable Determines whether the test is simulating native browser drag behavior.
 * @param hasCommitedEvent Determines whether the drag event has reached its commit phase.
 * @returns The full `expectedPayload` if accessible, or a masked mock payload if restricted by native browser protection.
 */
export const expectedPayloadOrMasked = (expectedPayload: DragPayload, simulateNativeDraggable: boolean, hasCommitedEvent: boolean): DragPayload => {
    if (!simulateNativeDraggable || hasCommitedEvent) {
        // Polyfill drag payloads and committed native drag payloads
        // have their actual values fully unmasked and accessible.
        return expectedPayload;
    } // if
    
    
    
    // Uncommitted native drag payloads remain in browser-enforced protected mode,
    // leaving the actual payload values masked.
    return TEST_METADATA_MASKED;
};
