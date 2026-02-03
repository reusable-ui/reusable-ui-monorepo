import React, { ReactElement } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { ValidityStateTest } from './ValidityStateTest.js';
import { ValidityStateProvider } from './ValidityStateProvider.js'



/**
 * Represents a single test scenario for validating controlled validity state transitions.
 */
interface ValidityStateInProviderTestCase {
    /**
     * A human-readable description of the overall test case.
     */
    title            : string
    
    /**
     * The JSX tree to render for this test case.
     */
    jsx              : ReactElement
    
    /**
     * The expected validity state.
     * - `true`        → should be valid
     * - `false`       → should be invalid
     * - `null`        → should be unvalidated
     */
    expectedValidity : boolean | null
}




/**
 * A collection of test scenarios to validate provider behavior.
 */
const tests: ValidityStateInProviderTestCase[] = [
    // --- Standalone input cases ---
    // Outside of any <Form> or <ValidityStateProvider>, inputs are always unvalidated.
    ...([undefined, true, false, null] as const).map((validity) => ({
        title            : `Standalone input (no provider, validity=${String(validity)})`,
        jsx              : (
            <ValidityStateTest validity={validity} />
        ),
        expectedValidity : null, // always unvalidated outside a provider
    } satisfies ValidityStateInProviderTestCase)),
    
    // --- Standalone input cases with enableValidation={true} ---
    // When enableValidation is explicitly set, the validity prop is respected.
    ...([undefined, true, false, null] as const).map((validity) => ({
        title            : `Standalone input (enableValidation=true, validity=${String(validity)})`,
        jsx              : (
            <ValidityStateTest enableValidation={true} validity={validity} />
        ),
        expectedValidity : validity ?? null, // validity prop drives the outcome, undefined => null
    } satisfies ValidityStateInProviderTestCase)),
    
    // --- Standalone input cases with enableValidation={false} ---
    // When enableValidation is explicitly disabled, inputs never validate.
    // Regardless of the validity prop, they always resolve to null (unvalidated).
    ...([undefined, true, false, null] as const).map((validity) => ({
        title            : `Standalone input (enableValidation=false, validity=${String(validity)})`,
        jsx              : (
            <ValidityStateTest enableValidation={false} validity={validity} />
        ),
        expectedValidity : null, // always unvalidated when validation is disabled
    } satisfies ValidityStateInProviderTestCase)),
    
    // --- Provider cases with validity = true | false | null ---
    // When a provider sets validity explicitly, inputs resolve to that validity.
    ...([true, false, null] as const).map((validity) => ({
        title            : `Provider with validity=${String(validity)}`,
        jsx              : (
            <ValidityStateProvider validity={validity}>
                <ValidityStateTest />
            </ValidityStateProvider>
        ),
        expectedValidity : validity, // mirrors the provider's validity prop
    } satisfies ValidityStateInProviderTestCase)),
    
    // --- Provider cases with <ValidityStateTest validity="auto" /> ---
    // When the input sets validity="auto", it defers to the provider's validity.
    // The resolved validity mirrors whatever the provider enforces.
    ...([true, false, null] as const).map((providerValidity) => ({
        title            : `Provider with validity=${String(providerValidity)} (child validity="auto")`,
        jsx              : (
            <ValidityStateProvider validity={providerValidity}>
                <ValidityStateTest validity="auto" />
            </ValidityStateProvider>
        ),
        expectedValidity : providerValidity, // child defers to provider's validity
    } satisfies ValidityStateInProviderTestCase)),
    
    // --- Dialog-like provider with validation disabled by default ---
    // Even if the child sets validity explicitly, with defaultEnableValidation={false}
    // the inputs remain unvalidated (null).
    ...([undefined, true, false, null] as const).map((validity) => ({
        title            : `Dialog-like provider (defaultEnableValidation=false, child validity=${String(validity)})`,
        jsx              : (
            <ValidityStateProvider defaultEnableValidation={false}>
                <ValidityStateTest validity={validity} />
            </ValidityStateProvider>
        ),
        expectedValidity : null, // always unvalidated when defaultEnableValidation=false
    } satisfies ValidityStateInProviderTestCase)),
    
    // --- Nested provider inherits validity (cascadeValidation = true) ---
    // The inner provider does not override validity, so the child inherits
    // the parent provider's validity value directly.
    ...([true, false, null] as const).map((validity) => ({
        title            : `Nested provider (cascadeValidation=true, parent validity=${String(validity)})`,
        jsx              : (
            <ValidityStateProvider validity={validity}>
                <ValidityStateProvider cascadeValidation={true}>
                    <ValidityStateTest />
                </ValidityStateProvider>
            </ValidityStateProvider>
        ),
        expectedValidity : validity, // child inherits parent's validity
    } satisfies ValidityStateInProviderTestCase)),
    
    // --- Nested provider breaks inheritance (cascadeValidation = false) ---
    // The inner provider is isolated with validity="auto", so the child does not
    // inherit the parent's validity. It resolves independently to null.
    ...([true, false, null] as const).map((parentValidity) => ({
        title            : `Nested provider (cascadeValidation=false, parent validity=${String(parentValidity)}, child validity="auto")`,
        jsx              : (
            <ValidityStateProvider validity={parentValidity}>
                <ValidityStateProvider cascadeValidation={false} validity="auto">
                    <ValidityStateTest />
                </ValidityStateProvider>
            </ValidityStateProvider>
        ),
        expectedValidity : null, // independent, always unvalidated in this setup
    } satisfies ValidityStateInProviderTestCase)),
    
    // --- Dialog-like provider disables by default, inner provider enables ---
    // The outer provider disables validation by default, but the inner provider
    // explicitly enforces validity. The child resolves to the inner provider's validity.
    ...([true, false, null] as const).map((validity) => ({
        title            : `Dialog-like provider (defaultEnableValidation=false, inner validity=${String(validity)})`,
        jsx              : (
            <ValidityStateProvider defaultEnableValidation={false}>
                <ValidityStateProvider validity={validity}>
                    <ValidityStateTest />
                </ValidityStateProvider>
            </ValidityStateProvider>
        ),
        expectedValidity : validity, // inner provider enforces validity
    } satisfies ValidityStateInProviderTestCase)),
    
    // --- Nested providers with conflicting validity ---
    // The inner provider enforces its own validity, so the child resolves
    // to whatever the inner provider sets, regardless of the outer provider.
    ...([true, false, null] as const).flatMap((outerValidity) =>
        ([true, false, null] as const).map((innerValidity) => ({
            title            : `Nested providers (outer validity=${String(outerValidity)}, inner validity=${String(innerValidity)})`,
            jsx              : (
                <ValidityStateProvider validity={outerValidity}>
                    <ValidityStateProvider validity={innerValidity}>
                        <ValidityStateTest />
                    </ValidityStateProvider>
                </ValidityStateProvider>
            ),
            expectedValidity : innerValidity, // child resolves to inner provider's validity
        } satisfies ValidityStateInProviderTestCase))
    ),
    
    // --- Provider with validity="auto" ---
    // The provider delegates validity resolution to its children.
    // The child's computedValidity drives the outcome, with undefined normalized to null.
    ...([true, false, null, undefined] as const).map((validity) => ({
        title            : `Provider validity="auto" (child computedValidity=${String(validity)})`,
        jsx              : (
            <ValidityStateProvider validity="auto">
                <ValidityStateTest computedValidity={validity} />
            </ValidityStateProvider>
        ),
        expectedValidity : validity ?? null, // undefined => null
    } satisfies ValidityStateInProviderTestCase)),
    
    // --- Dialog disables by default, input explicitly sets validity ---
    // Outer provider disables validation by default, but the child explicitly
    // opts in with enableValidation={true}. The child's validity prop is respected.
    ...([true, false, null] as const).map((validity) => ({
        title            : `Dialog-like provider (defaultEnableValidation=false, child enableValidation=true, validity=${String(validity)})`,
        jsx              : (
            <ValidityStateProvider defaultEnableValidation={false}>
                <ValidityStateTest enableValidation={true} validity={validity} />
            </ValidityStateProvider>
        ),
        expectedValidity : validity, // child validity prop drives the outcome
    } satisfies ValidityStateInProviderTestCase)),
    
    // --- Mixed child props with provider validity ---
    // Case A: Child disables validation → always null
    // Case B: Child sets validity="auto" → inherits provider validity
    ...([true, false, null] as const).flatMap((providerValidity) => [
        // Case A: enableValidation={false}
        {
            title            : `Provider validity=${String(providerValidity)}, child enableValidation=false`,
            jsx              : (
                <ValidityStateProvider validity={providerValidity}>
                    <ValidityStateTest enableValidation={false} />
                </ValidityStateProvider>
            ),
            expectedValidity : null, // child disables validation
        } satisfies ValidityStateInProviderTestCase,
        
        // Case B: validity="auto"
        {
            title            : `Provider validity=${String(providerValidity)}, child validity="auto"`,
            jsx              : (
                <ValidityStateProvider validity={providerValidity}>
                    <ValidityStateTest validity="auto" />
                </ValidityStateProvider>
            ),
            expectedValidity : providerValidity, // child defers to provider
        } satisfies ValidityStateInProviderTestCase,
    ]),
    
    // --- Multiple nested providers with cascade toggled at different levels ---
    // Outer provider sets validity, middle provider breaks inheritance,
    // inner provider uses validity="auto". Child resolves independently to null.
    ...([true, false, null] as const).map((outerValidity) => ({
        title            : `Deep nested providers (outer validity=${String(outerValidity)}, middle cascadeValidation=false, inner validity="auto")`,
        jsx              : (
            <ValidityStateProvider validity={outerValidity}>
                <ValidityStateProvider cascadeValidation={false}>
                    <ValidityStateProvider validity="auto">
                        <ValidityStateTest />
                    </ValidityStateProvider>
                </ValidityStateProvider>
            </ValidityStateProvider>
        ),
        expectedValidity : null, // inner auto resolves independently, not inherited
    } satisfies ValidityStateInProviderTestCase)),
    
    // --- Provider validity="auto" + child validity="auto" ---
    // Both provider and child defer validity resolution.
    // With no computedValidity provided, the outcome is always null (unvalidated).
    ...([true, false, null, undefined] as const).map((computedValidity) => ({
        title            : `Provider validity="auto", child validity="auto" (computedValidity=${String(computedValidity)})`,
        jsx              : (
            <ValidityStateProvider validity="auto">
                <ValidityStateTest validity="auto" computedValidity={computedValidity} />
            </ValidityStateProvider>
        ),
        expectedValidity : computedValidity ?? null, // undefined normalized to null
    } satisfies ValidityStateInProviderTestCase)),
];




const expectedValidityMap = {
    true  : 'valid',
    false : 'invalid',
    null  : 'unvalidated',
};

test.describe('useValidityBehaviorState - in providers', () => {
    for (const { title, jsx, expectedValidity } of tests) {
        test(title, async ({ mount }) => {
            // Render:
            const component = await mount(jsx);
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('validity-state-test');
            await expect(box).toContainText('Validity State Test');
            
            
            
            // Verify the expected values:
            expect(box).toHaveAttribute('data-state', expectedValidityMap[String(expectedValidity) as keyof typeof expectedValidityMap]);
        });
    }
});
