/**
 * A no-op hook for retrieving a previous settled state.
 * 
 * Always returns `undefined`, serving as the internal fallback
 * when `useResolvedPreviousState` is not supplied in the behavior definition.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * 
 * @param _settledState - The most recent settled state after the transition animation completes.
 * @returns Always `undefined`.
 */
export const useUndefinedPreviousState = <TState extends {} | null>(_settledState: TState): TState | undefined => undefined;
