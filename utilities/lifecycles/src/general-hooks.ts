// React:
import {
    // Types:
    type useRef,
}                           from 'react'

// Hooks:
import {
    useOriginalReactRef,
}                           from './internal-client-hooks.js'



/**
 * A universal `useRef` polyfill that adapts seamlessly to both client and server environments.
 * 
 * - On the **client** side, it works exactly the same as React `useRef` hook.
 * - On the **server** side, it returns a mock `RefObject` object that resembles a React Ref.
 *   Since server components render only once per request and never re-render,
 *   this reference remains stable.
 * 
 * This ensures cross-environment utilities can safely interact with mutable ref targets 
 * without throwing bundler exceptions or server-side runtime errors.
 * 
 * @template T - The type of the value stored inside the ref.
 * @param initialValue - The initial value for the ref.
 * @returns A mutable `RefObject<T>` object (client: real ref, server: mock object).
 * 
 * @example
 * ```tsx
 * export const TheServerComponent = () => {
 *     // Works on server component:
 *     const resourceRef = useIsomorphicRef<HTMLDivElement>(null);
 *     .....
 * };
 * ```
 * 
 * @example
 * ```tsx
 * 'use client'
 * 
 * export const TheClientComponent = () => {
 *     // Works on client component:
 *     const resourceRef = useIsomorphicRef<HTMLDivElement>(null);
 *     .....
 * };
 * ```
 */
export const useIsomorphicRef : typeof useRef = (
    // Evaluated statically at build time by modern compilers/bundlers:
    // - Collapses to a constant `true` in client bundles.
    // - Collapses to a constant `false` in server bundles.
    typeof window !== 'undefined'
    
    // Client branch: Retains the native, stateful React `useRef` hook.
    // - Imported via `./internal-client-hooks.js` to clear static RSC bundle boundary checks.
    // - Direct import from 'react' is disallowed here since this module doesn't have 'use client' directive.
    // - The server compiler eliminates this execution pathway during tree-shaking.
    ? useOriginalReactRef
    
    // Server branch: Returns a mock `RefObject` object that resembles a React Ref.
    // - Since no re-render occurs on server components, this object reference always stable reference.
    // - The client compiler eliminates this execution pathway during tree-shaking.
    : (initialValue) => ({ current: initialValue }) satisfies ReturnType<typeof useRef>
);
