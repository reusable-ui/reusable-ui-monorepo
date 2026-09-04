// Types:
import {
    // Data:
    type DragDropData,
}                           from './types.js'



/**
 * A shared empty map instance used as the default value
 * for `dragPayload` and `dropMetadata` when those props
 * are not explicitly supplied.
 * 
 * - Provides a safe, non-null fallback so consumers can
 *   always perform lookups without additional checks.
 * - Exposed as a `ReadonlyMap` to enforce inspection-only
 *   semantics: negotiations may peek at the data but must
 *   not mutate it.
 */
export const emptyMap : DragDropData = new Map<unknown, unknown>();
