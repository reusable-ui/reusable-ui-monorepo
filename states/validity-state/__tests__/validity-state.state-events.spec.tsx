import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { ValidityStateTest } from './ValidityStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';
import { ValidityPhase } from '../dist/index.js'



/**
 * Represents a single test scenario for validating event of validity state transitions.
 */
interface ValidityStateEventTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title             : string
    
    /**
     * Initial validity state.
     * - `true`   : valid
     * - `false`  : invalid
     * - `null`   : unvalidated
     * - `'auto'` : automatic determine
     */
    validity          : boolean | null | 'auto'
    
    /**
     * Initial computed validity state.
     * - `true`   : valid
     * - `false`  : invalid
     * - `null`   : unvalidated
     * - `'auto'` : automatic determine
     */
    computedValidity ?: boolean | null
    
    /**
     * A sequence of updates applied to the validity state, including expected outcomes.
     */
    updates           : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                    : string
        
        /**
         * New value for validity state.
         * Set to `undefined` to skip updating this part.
         */
        validity                ?: boolean | null | 'auto'
        
        /**
         * Initial computed validity state.
         * - `true`   : valid
         * - `false`  : invalid
         * - `null`   : unvalidated
         * - `'auto'` : automatic determine
         */
        computedValidity        ?: boolean | null
        
        /**
         * Delay (in milliseconds) after applying the update before performing result assertions.
         * 
         * - `undefined`: check immediately (no delay).
         * - `0`: defer until the next event loop tick.
         * - Any other value: wait for the specified duration before checking.
         */
        delay                   ?: number
        
        // Expected Outcomes:
        
        /**
         * The expected validity state.
         * - `'valid'`        : onValidatingStart event has been invoked
         * - `'invalid'`      : onValidatingEnd event has been invoked
         * - `'unvalidated'`  : onInvalidatingStart event has been invoked
         * - `'validating'`   : onInvalidatingEnd event has been invoked
         * - `'invalidating'` : onUnvalidatingStart event has been invoked
         * - `'unvalidating'` : onUnvalidatingEnd event has been invoked
         * - `null`           : no event has been invoked
         * - `undefined`      : nothing to expect
         */
        expectedEvent           ?: ValidityPhase | null
    }[]
}



test.describe('useValidityStatePhaseEvents', () => {
    for (const { title, validity : initialValidity, computedValidity: initialComputedValidity, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title            : 'Should be respond to change from invalid to valid',
            validity         : 'auto',
            computedValidity : false,
            updates          : [
                {
                    title                   : 'Should be invalid and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Change to valid',
                    computedValidity        : true,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedEvent           : 'validating',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'validating',
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'valid',
                },
            ],
        },
        {
            title            : 'Should be respond to change from invalid to unvalidated',
            validity         : 'auto',
            computedValidity : false,
            updates          : [
                {
                    title                   : 'Should be invalid and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Change to unvalidated',
                    computedValidity        : null,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedEvent           : 'unvalidating',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'unvalidating',
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still unvalidated',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'unvalidated',
                },
            ],
        },
        {
            title            : 'Should be respond to change from valid to invalid',
            validity         : 'auto',
            computedValidity : true,
            updates          : [
                {
                    title                   : 'Should be valid and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Change to invalid',
                    computedValidity        : false,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedEvent           : 'invalidating',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'invalidating',
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'invalid',
                },
            ],
        },
        {
            title            : 'Should be respond to change from valid to unvalidated',
            validity         : 'auto',
            computedValidity : true,
            updates          : [
                {
                    title                   : 'Should be valid and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Change to unvalidated',
                    computedValidity        : null,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedEvent           : 'unvalidating',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'unvalidating',
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still unvalidated',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'unvalidated',
                },
            ],
        },
        {
            title            : 'Should be respond to change from unvalidated to valid',
            validity         : 'auto',
            computedValidity : null,
            updates          : [
                {
                    title                   : 'Should be unvalidated and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Change to valid',
                    computedValidity        : true,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedEvent           : 'validating',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'validating',
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'valid',
                },
            ],
        },
        {
            title            : 'Should be respond to change from unvalidated to invalid',
            validity         : 'auto',
            computedValidity : null,
            updates          : [
                {
                    title                   : 'Should be unvalidated and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Change to invalid',
                    computedValidity        : false,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedEvent           : 'invalidating',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'invalidating',
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'invalid',
                },
            ],
        },
        {
            title            : 'Should be respond to change from invalid to valid then invalid',
            validity         : 'auto',
            computedValidity : false,
            updates          : [
                {
                    title                   : 'Should be invalid and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Change to valid',
                    computedValidity        : true,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedEvent           : 'validating',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'validating',
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'valid',
                },
                {
                    title                   : 'Change to invalid',
                    computedValidity        : false,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedEvent           : 'invalidating',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'invalidating',
                },
                {
                    title                   : 'The invalidating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'invalid',
                },
            ],
        },
        {
            title            : 'Should be respond to change from invalid to unvalidated then invalid',
            validity         : 'auto',
            computedValidity : false,
            updates          : [
                {
                    title                   : 'Should be invalid and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Change to unvalidated',
                    computedValidity        : null,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedEvent           : 'unvalidating',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'unvalidating',
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still unvalidated',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'unvalidated',
                },
                {
                    title                   : 'Change to invalid',
                    computedValidity        : false,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedEvent           : 'invalidating',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'invalidating',
                },
                {
                    title                   : 'The invalidating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'invalid',
                },
            ],
        },
        {
            title            : 'Should be respond to change from valid to invalid then valid',
            validity         : 'auto',
            computedValidity : true,
            updates          : [
                {
                    title                   : 'Should be valid and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Change to invalid',
                    computedValidity        : false,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedEvent           : 'invalidating',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'invalidating',
                },
                {
                    title                   : 'The invalidating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'invalid',
                },
                {
                    title                   : 'Change to valid',
                    computedValidity        : true,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedEvent           : 'validating',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'validating',
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'valid',
                },
            ],
        },
        {
            title            : 'Should be respond to change from valid to unvalidated then valid',
            validity         : 'auto',
            computedValidity : true,
            updates          : [
                {
                    title                   : 'Should be valid and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Change to unvalidated',
                    computedValidity        : null,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedEvent           : 'unvalidating',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'unvalidating',
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still unvalidated',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'unvalidated',
                },
                {
                    title                   : 'Change to valid',
                    computedValidity        : true,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedEvent           : 'validating',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'validating',
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'valid',
                },
            ],
        },
        {
            title            : 'Should be respond to change from unvalidated to valid then unvalidated',
            validity         : 'auto',
            computedValidity : null,
            updates          : [
                {
                    title                   : 'Should be unvalidated and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Change to valid',
                    computedValidity        : true,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedEvent           : 'validating',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'validating',
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'valid',
                },
                {
                    title                   : 'Change to unvalidated',
                    computedValidity        : null,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedEvent           : 'unvalidating',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'unvalidating',
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still unvalidated',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'unvalidated',
                },
            ],
        },
        {
            title            : 'Should be respond to change from unvalidated to invalid then unvalidated',
            validity         : 'auto',
            computedValidity : null,
            updates          : [
                {
                    title                   : 'Should be unvalidated and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Change to invalid',
                    computedValidity        : false,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedEvent           : 'invalidating',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'invalidating',
                },
                {
                    title                   : 'The invalidating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'invalid',
                },
                {
                    title                   : 'Change to unvalidated',
                    computedValidity        : null,
                    
                    delay                   : 0, // wait for async process
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedEvent           : 'unvalidating',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent           : 'unvalidating',
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still unvalidated',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent           : 'unvalidated',
                },
            ],
        },
        {
            title            : 'Should be respond to validate, invalidate, and re-validate quickly',
            validity         : 'auto',
            computedValidity : false,
            updates          : [
                {
                    title                   : 'Should be invalid and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Validate',
                    computedValidity        : true,
                    
                    delay                   : 200,
                    expectedEvent           : 'validating',
                },
                {
                    title                   : 'Invalidate before validation finishes',
                    computedValidity        : false,
                    
                    delay                   : 200,
                    expectedEvent           : 'validating',  // Still validating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-validate again before invalidate finishes',
                    computedValidity        : true,
                    
                    delay                   : 200,
                    expectedEvent           : 'validating', // Still in original validation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final validation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedEvent           : 'valid', // No running animation.
                },
            ],
        },
        {
            title            : 'Should be respond to validate, unvalidate, and re-validate quickly',
            validity         : 'auto',
            computedValidity : null,
            updates          : [
                {
                    title                   : 'Should be unvalidated and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Validate',
                    computedValidity        : true,
                    
                    delay                   : 200,
                    expectedEvent           : 'validating',
                },
                {
                    title                   : 'Unvalidate before validation finishes',
                    computedValidity        : null,
                    
                    delay                   : 200,
                    expectedEvent           : 'validating',  // Still validating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-validate again before unvalidate finishes',
                    computedValidity        : true,
                    
                    delay                   : 200,
                    expectedEvent           : 'validating', // Still in original validation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final validation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedEvent           : 'valid', // No running animation.
                },
            ],
        },
        {
            title            : 'Should be respond to invalidate, validate, and re-invalidate quickly',
            validity         : 'auto',
            computedValidity : true,
            updates          : [
                {
                    title                   : 'Should be valid and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Invalidate',
                    computedValidity        : false,
                    
                    delay                   : 200,
                    expectedEvent           : 'invalidating',
                },
                {
                    title                   : 'Validate before invalidation finishes',
                    computedValidity        : true,
                    
                    delay                   : 200,
                    expectedEvent           : 'invalidating',  // Still invalidating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-invalidate again before validate finishes',
                    computedValidity        : false,
                    
                    delay                   : 200,
                    expectedEvent           : 'invalidating', // Still in original invalidation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final invalidation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedEvent           : 'invalid', // No running animation.
                },
            ],
        },
        {
            title            : 'Should be respond to invalidate, unvalidate, and re-invalidate quickly',
            validity         : 'auto',
            computedValidity : null,
            updates          : [
                {
                    title                   : 'Should be unvalidated and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Invalidate',
                    computedValidity        : false,
                    
                    delay                   : 200,
                    expectedEvent           : 'invalidating',
                },
                {
                    title                   : 'Unvalidate before invalidation finishes',
                    computedValidity        : null,
                    
                    delay                   : 200,
                    expectedEvent           : 'invalidating',  // Still invalidating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-invalidate again before unvalidate finishes',
                    computedValidity        : false,
                    
                    delay                   : 200,
                    expectedEvent           : 'invalidating', // Still in original invalidation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final invalidation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedEvent           : 'invalid', // No running animation.
                },
            ],
        },
        {
            title            : 'Should be respond to unvalidate, invalidate, and re-unvalidate quickly',
            validity         : 'auto',
            computedValidity : false,
            updates          : [
                {
                    title                   : 'Should be invalid and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Unvalidate',
                    computedValidity        : null,
                    
                    delay                   : 200,
                    expectedEvent           : 'unvalidating',
                },
                {
                    title                   : 'Invalidate before unvalidation finishes',
                    computedValidity        : false,
                    
                    delay                   : 200,
                    expectedEvent           : 'unvalidating',  // Still unvalidating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-unvalidate again before invalidate finishes',
                    computedValidity        : null,
                    
                    delay                   : 200,
                    expectedEvent           : 'unvalidating', // Still in original unvalidation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final unvalidation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedEvent           : 'unvalidated', // No running animation.
                },
            ],
        },
        {
            title            : 'Should be respond to unvalidate, validate, and re-unvalidate quickly',
            validity         : 'auto',
            computedValidity : true,
            updates          : [
                {
                    title                   : 'Should be valid and no animation',
                    expectedEvent           : null,
                },
                {
                    title                   : 'Unvalidate',
                    computedValidity        : null,
                    
                    delay                   : 200,
                    expectedEvent           : 'unvalidating',
                },
                {
                    title                   : 'Validate before unvalidation finishes',
                    computedValidity        : true,
                    
                    delay                   : 200,
                    expectedEvent           : 'unvalidating',  // Still unvalidating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-unvalidate again before validate finishes',
                    computedValidity        : null,
                    
                    delay                   : 200,
                    expectedEvent           : 'unvalidating', // Still in original unvalidation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final unvalidation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedEvent           : 'unvalidated', // No running animation.
                },
            ],
        },
    ] as ValidityStateEventTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentValidity         : boolean | null | 'auto' | undefined = initialValidity;
            let currentComputedValidity : boolean | null          | undefined = initialComputedValidity;
            
            
            
            // Handlers:
            let lastNewValidity : boolean | null | undefined = undefined;
            let lastEvent       : unknown | undefined = undefined;
            const handleValidityUpdate : ValueChangeEventHandler<boolean | null, unknown> = (newValidity, event) => {
                lastNewValidity = newValidity;
                lastEvent = event;
            };
            
            let lastValidityPhase : ValidityPhase | null = null;
            const handleValidatingStart : ValueChangeEventHandler<ValidityPhase, unknown> = (validityPhase) => {
                expect(validityPhase).toBe('validating');
                lastValidityPhase = validityPhase;
            };
            const handleValidatingEnd : ValueChangeEventHandler<ValidityPhase, unknown> = (validityPhase) => {
                expect(validityPhase).toBe('valid');
                lastValidityPhase = validityPhase;
            };
            const handleInvalidatingStart : ValueChangeEventHandler<ValidityPhase, unknown> = (validityPhase) => {
                expect(validityPhase).toBe('invalidating');
                lastValidityPhase = validityPhase;
            };
            const handleInvalidatingEnd : ValueChangeEventHandler<ValidityPhase, unknown> = (validityPhase) => {
                expect(validityPhase).toBe('invalid');
                lastValidityPhase = validityPhase;
            };
            const handleUnvalidatingStart : ValueChangeEventHandler<ValidityPhase, unknown> = (validityPhase) => {
                expect(validityPhase).toBe('unvalidating');
                lastValidityPhase = validityPhase;
            };
            const handleUnvalidatingEnd : ValueChangeEventHandler<ValidityPhase, unknown> = (validityPhase) => {
                expect(validityPhase).toBe('unvalidated');
                lastValidityPhase = validityPhase;
            };
            
            
            
            // First render:
            const component = await mount(
                <ValidityStateTest
                    validity={currentValidity}
                    computedValidity={currentComputedValidity}
                    
                    onValidityUpdate={handleValidityUpdate}
                    
                    onValidatingStart={handleValidatingStart}
                    onValidatingEnd={handleValidatingEnd}
                    onInvalidatingStart={handleInvalidatingStart}
                    onInvalidatingEnd={handleInvalidatingEnd}
                    onUnvalidatingStart={handleUnvalidatingStart}
                    onUnvalidatingEnd={handleUnvalidatingEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('validity-state-test');
            await expect(box).toContainText('Validity State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, validity, computedValidity, delay, expectedEvent} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (validity !== undefined) currentValidity = validity;
                if (computedValidity !== undefined) currentComputedValidity = computedValidity;
                
                
                
                // Reset the last received values:
                lastNewValidity = undefined;
                lastEvent = undefined;
                
                
                
                // Re-render:
                await component.update(
                    <ValidityStateTest
                        validity={currentValidity}
                        computedValidity={currentComputedValidity}
                        
                        onValidityUpdate={handleValidityUpdate}
                        
                        onValidatingStart={handleValidatingStart}
                        onValidatingEnd={handleValidatingEnd}
                        onInvalidatingStart={handleInvalidatingStart}
                        onInvalidatingEnd={handleInvalidatingEnd}
                        onUnvalidatingStart={handleUnvalidatingStart}
                        onUnvalidatingEnd={handleUnvalidatingEnd}
                    />
                );
                
                
                
                // Validate events:
                if (computedValidity !== undefined) {
                    // Wait for brief moment to ensure the events are captured:
                    await new Promise<void>((resolve) => {
                        setTimeout(resolve, 20);
                    });
                    
                    // Ensure the change handler was called with correct parameters:
                    expect(lastNewValidity).toBe(computedValidity);
                    expect((lastEvent as any)?.type).toBe(undefined);
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('validity-state-test');
                await expect(box).toContainText('Validity State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedEvent !== undefined) {
                    expect(lastValidityPhase).toBe(expectedEvent);
                } // if
            } // for
        });
    } // for
});
