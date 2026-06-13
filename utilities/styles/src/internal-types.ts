/**
 * Generic collector interface for accumulating values of type `TCollected`.
 */
export interface Collector<_TCollected, TValue> {
    /**
     * Appends a value to the collector.
     * @param value - The value to add to the collection.
     */
    append(value: TValue): void
}
