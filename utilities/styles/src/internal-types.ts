/**
 * Generic collector interface for accumulating values of type `TValue`.
 */
export interface Collector<TValue> {
    /**
     * The collected value, representing the accumulated result of the collector.
     * 
     * @returns The collected value.
     */
    get collected() : TValue
    
    
    
    /**
     * Appends a value to the collector.
     * 
     * @param value - The value to add.
     */
    append(value: TValue): void
}
