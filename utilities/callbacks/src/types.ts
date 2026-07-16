/**
 * Represents a generic callback function type.
 * 
 * - Accepts a variable list of arguments.
 * - Returns a value of type `TReturn` (defaulting to `void`).
 * 
 * @template TArgs The argument types passed to the callback function.
 * @template TReturn The return type of the callback function.
 */
export type Callback<TArgs extends unknown[] = [], TReturn extends unknown = void> = (...args: TArgs) => TReturn

/**
 * Represents a generic event handler function type.
 * 
 * - Supports additional arguments for more flexibility.
 * - Returns a value of type `TReturn` (defaulting to `void`).
 * 
 * @template TEvent The event object type.
 * @template TExtra Additional argument types passed to the handler function.
 * @template TReturn The return type of the handler function.
 */
export type EventHandler<TEvent, TExtra extends unknown[] = [], TReturn extends unknown = void> = Callback<[TEvent, ...TExtra], TReturn>
