'use client' // The exported `<AccessibilityProvider>` component is client side only.

// React:
import React, {
    // Types:
    type PropsWithChildren,
    type ReactElement,
}                           from 'react'

// Reusable-ui states:
import {
    // Contexts:
    DisabledStateProvider,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.
import {
    // Contexts:
    ReadOnlyStateProvider,
}                           from '@reusable-ui/read-only-state'     // Adds editable/read-only functionality to UI components, with transition animations and semantic styling hooks.
import {
    // Contexts:
    ActiveStateProvider,
}                           from '@reusable-ui/active-state'        // Lifecycle-aware activation state with transition animations and semantic styling hooks for UI components.

// Types:
import {
    type ResolvedAccessibilityState,
}                           from './types.js'

// States:
import {
    // Hooks:
    useResolvedAccessibilityState,
}                           from './accessibilities.js'



// React components:

/**
 * @deprecated since v7.0.0
 * The `<AccessibilityProvider>` component is part of the deprecated
 * `@reusable-ui/accessibilities` package.
 * 
 * Props for `<AccessibilityProvider>`.
 * 
 * Accepts optional `disabled`, `readOnly`, and `active` states,
 * along with children to receive the propagated accessibility state.
 * 
 * ⚠️ Notes:
 * Providing all three states (`disabled`, `readOnly`, `active`) at once is rare in practice.
 * Please migrate to the individual behavior providers:
 * - `DisabledStateProvider`
 * - `ReadOnlyStateProvider`
 * - `ActiveStateProvider`
 */
export interface AccessibilityProviderProps
    extends
        // Bases:
        PropsWithChildren<Partial<ResolvedAccessibilityState>>
{
}

/**
 * @deprecated since v7.0.0
 * The `<AccessibilityProvider>` component is part of the deprecated
 * `@reusable-ui/accessibilities` package.
 * 
 * Provides accessibility context to descendant components,
 * enables cascading resolution of `disabled`, `readOnly`, and `active` states.
 * 
 * Should wrap components that rely on `useResolvedAccessibilityState()`.
 * 
 * ⚠️ Notes:
 * Providing all three states (`disabled`, `readOnly`, `active`) at once is rare in practice.
 * Please migrate to the individual behavior providers:
 * - `DisabledStateProvider`
 * - `ReadOnlyStateProvider`
 * - `ActiveStateProvider`
 * 
 * @example
 * ```ts
 * // The child will inherit `disabled = true`:
 * <AccessibilityProvider disabled={true}>
 *     <ToggleButton />
 * </AccessibilityProvider>
 * ```
 */
const AccessibilityProvider = (props: AccessibilityProviderProps): ReactElement | null => {
    // States:
    const {
        disabled : currentDisabled,
        readOnly : currentReadOnly,
        active   : currentActive,
    } = useResolvedAccessibilityState(props);
    
    
    
    // Extract props and assign defaults:
    const {
        disabled = currentDisabled,
        readOnly = currentReadOnly,
        active   = currentActive,
        children,
    } = props;
    
    
    
    // React elements:
    return (
        <DisabledStateProvider disabled={disabled}>
            <ReadOnlyStateProvider readOnly={readOnly}>
                <ActiveStateProvider active={active}>
                    {children}
                </ActiveStateProvider>
            </ReadOnlyStateProvider>
        </DisabledStateProvider>
    );
};

export {
    AccessibilityProvider,            // Named export for readability.
    AccessibilityProvider as default, // Default export to support React.lazy.
}
