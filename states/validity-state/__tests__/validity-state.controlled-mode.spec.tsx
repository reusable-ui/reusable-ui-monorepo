import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { ValidityStateTest } from './ValidityStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';



/**
 * Represents a single test scenario for validating controlled validity state transitions.
 */
interface ValidityStateControlledTestCase {
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
     * - `true`      : valid
     * - `false`     : invalid
     * - `null`      : unvalidated
     * - `undefined` : use default behavior.
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
         * New value for computed validity state.
         * - `true`      : valid
         * - `false`     : invalid
         * - `null`      : unvalidated
         * - `undefined` : skip updating this part.
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
         * - 'valid'       : should be valid
         * - 'invalid'     : should be invalid
         * - 'unvalidated' : should be unvalidated
         * - `undefined`   : nothing to expect
         */
        expectedValidity        ?: 'valid' | 'invalid' | 'unvalidated'
        
        /**
         * The expected presence of running validity animation after the delay.
         * - `true`      : there is a running validate animation
         * - `false`     : there is a running invalidate animation
         * - `null `     : there is a running unvalidate animation
         * - `0`         : there is no running validity animation
         * - `undefined` : nothing to expect
         */
        expectedRunningValidity ?: boolean | null | 0
    }[]
}



test.describe('useValidityBehaviorState - controlled mode', () => {
    for (const { title, validity : initialValidity, computedValidity: initialComputedValidity, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title            : 'Should be defaults to unvalidated',
            validity         : undefined,
            computedValidity : undefined,
            updates          : [
                {
                    title                   : 'Should be unvalidated and no animation',
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
            ],
        },
        {
            title            : 'Should be controlled to invalid',
            validity         : false,
            updates          : [
                {
                    title                   : 'Should be invalid and no animation',
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
            ],
        },
        {
            title            : 'Should be controlled to valid',
            validity         : true,
            updates          : [
                {
                    title                   : 'Should be valid and no animation',
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
            ],
        },
        {
            title            : 'Should be controlled to unvalidated',
            validity         : null,
            updates          : [
                {
                    title                   : 'Should be unvalidated and no animation',
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
            ],
        },
        {
            title            : 'Should be changed from invalid to valid',
            validity         : false,
            updates          : [
                {
                    title                   : 'Should be invalid and no animation',
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to valid',
                    validity                : true,
                    
                    expectedValidity        : 'valid',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
            ],
        },
        {
            title            : 'Should be changed from invalid to unvalidated',
            validity         : false,
            updates          : [
                {
                    title                   : 'Should be invalid and no animation',
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to unvalidated',
                    validity                : null,
                    
                    expectedValidity        : 'unvalidated',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
            ],
        },
        {
            title            : 'Should be changed from valid to invalid',
            validity         : true,
            updates          : [
                {
                    title                   : 'Should be valid and no animation',
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to invalid',
                    validity                : false,
                    
                    expectedValidity        : 'invalid',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
            ],
        },
        {
            title            : 'Should be changed from valid to unvalidated',
            validity         : true,
            updates          : [
                {
                    title                   : 'Should be valid and no animation',
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to unvalidated',
                    validity                : null,
                    
                    expectedValidity        : 'unvalidated',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
            ],
        },
        {
            title            : 'Should be changed from unvalidated to invalid',
            validity         : null,
            updates          : [
                {
                    title                   : 'Should be unvalidated and no animation',
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to invalid',
                    validity                : false,
                    
                    expectedValidity        : 'invalid',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
            ],
        },
        {
            title            : 'Should be changed from unvalidated to valid',
            validity         : null,
            updates          : [
                {
                    title                   : 'Should be unvalidated and no animation',
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to valid',
                    validity                : true,
                    
                    expectedValidity        : 'valid',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
            ],
        },
        {
            title            : 'Should be changed from invalid to valid then invalid',
            validity         : false,
            updates          : [
                {
                    title                   : 'Should be invalid and no animation',
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to valid',
                    validity                : true,
                    
                    expectedValidity        : 'valid',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to invalid',
                    validity                : false,
                    
                    expectedValidity        : 'invalid',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
            ],
        },
        {
            title            : 'Should be changed from invalid to unvalidated then invalid',
            validity         : false,
            updates          : [
                {
                    title                   : 'Should be invalid and no animation',
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to unvalidated',
                    validity                : null,
                    
                    expectedValidity        : 'unvalidated',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still unvalidated',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to invalid',
                    validity                : false,
                    
                    expectedValidity        : 'invalid',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
            ],
        },
        {
            title            : 'Should be changed from valid to invalid then valid',
            validity         : true,
            updates          : [
                {
                    title                   : 'Should be valid and no animation',
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to invalid',
                    validity                : false,
                    
                    expectedValidity        : 'invalid',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to valid',
                    validity                : true,
                    
                    expectedValidity        : 'valid',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
            ],
        },
        {
            title            : 'Should be changed from valid to unvalidated then valid',
            validity         : true,
            updates          : [
                {
                    title                   : 'Should be valid and no animation',
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to unvalidated',
                    validity                : null,
                    
                    expectedValidity        : 'unvalidated',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still unvalidated',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to valid',
                    validity                : true,
                    
                    expectedValidity        : 'valid',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
            ],
        },
        {
            title            : 'Should be changed from unvalidated to invalid then unvalidated',
            validity         : null,
            updates          : [
                {
                    title                   : 'Should be unvalidated and no animation',
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to invalid',
                    validity                : false,
                    
                    expectedValidity        : 'invalid',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to unvalidated',
                    validity                : null,
                    
                    expectedValidity        : 'unvalidated',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still unvalidated',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
            ],
        },
        {
            title            : 'Should be changed from unvalidated to valid then unvalidated',
            validity         : null,
            updates          : [
                {
                    title                   : 'Should be unvalidated and no animation',
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to valid',
                    validity                : true,
                    
                    expectedValidity        : 'valid',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to unvalidated',
                    validity                : null,
                    
                    expectedValidity        : 'unvalidated',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still unvalidated',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
            ],
        },
        {
            title            : 'Validate, invalidate, and re-validate quickly',
            validity         : false,
            updates          : [
                {
                    title                   : 'Should be invalid and no animation',
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Validate',
                    validity                : true,
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'Invalidate before validation finishes',
                    validity                : false,
                    
                    delay                   : 200,
                    expectedValidity        : 'valid', // Still valid because the validating animation is not finished yet.
                    expectedRunningValidity : true,  // Still validating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-validate again before invalidate finishes',
                    validity                : true,
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true, // Still in original validation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final validation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0, // No running animation.
                },
            ],
        },
        {
            title            : 'Validate, unvalidate, and re-validate quickly',
            validity         : null,
            updates          : [
                {
                    title                   : 'Should be unvalidated and no animation',
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Validate',
                    validity                : true,
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'Unvalidate before validation finishes',
                    validity                : null,
                    
                    delay                   : 200,
                    expectedValidity        : 'valid', // Still valid because the validating animation is not finished yet.
                    expectedRunningValidity : true,  // Still validating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-validate again before unvalidate finishes',
                    validity                : true,
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true, // Still in original validation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final validation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0, // No running animation.
                },
            ],
        },
        {
            title            : 'Invalidate, validate, and re-invalidate quickly',
            validity         : true,
            updates          : [
                {
                    title                   : 'Should be valid and no animation',
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Invalidate',
                    validity                : false,
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'Validate before invalidation finishes',
                    validity                : true,
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid', // Still invalid because the invalidating animation is not finished yet.
                    expectedRunningValidity : false,  // Still invalidating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-invalidate again before validate finishes',
                    validity                : false,
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false, // Still in original invalidation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final invalidation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0, // No running animation.
                },
            ],
        },
        {
            title            : 'Invalidate, unvalidate, and re-invalidate quickly',
            validity         : null,
            updates          : [
                {
                    title                   : 'Should be unvalidated and no animation',
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Invalidate',
                    validity                : false,
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'Unvalidate before invalidation finishes',
                    validity                : null,
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid', // Still invalid because the invalidating animation is not finished yet.
                    expectedRunningValidity : false,  // Still invalidating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-invalidate again before unvalidate finishes',
                    validity                : false,
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false, // Still in original invalidation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final invalidation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0, // No running animation.
                },
            ],
        },
        {
            title            : 'Unvalidate, invalidate, and re-unvalidate quickly',
            validity         : false,
            updates          : [
                {
                    title                   : 'Should be invalid and no animation',
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Unvalidate',
                    validity                : null,
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'Invalidate before unvalidation finishes',
                    validity                : false,
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated', // Still unvalidated because the unvalidating animation is not finished yet.
                    expectedRunningValidity : null,  // Still unvalidating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-unvalidate again before invalidate finishes',
                    validity                : null,
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null, // Still in original unvalidation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final unvalidation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0, // No running animation.
                },
            ],
        },
        {
            title            : 'Unvalidate, validate, and re-unvalidate quickly',
            validity         : true,
            updates          : [
                {
                    title                   : 'Should be valid and no animation',
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Unvalidate',
                    validity                : null,
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'Validate before unvalidation finishes',
                    validity                : true,
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated', // Still unvalidated because the unvalidating animation is not finished yet.
                    expectedRunningValidity : null,  // Still unvalidating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-unvalidate again before validate finishes',
                    validity                : null,
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null, // Still in original unvalidation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final unvalidation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0, // No running animation.
                },
            ],
        },
        
        
        
        {
            title            : 'Should be respond to change from invalid to valid',
            validity         : 'auto',
            computedValidity : false,
            updates          : [
                {
                    title                   : 'Should be invalid and no animation',
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to valid',
                    computedValidity        : true,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'valid',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
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
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to unvalidated',
                    computedValidity        : null,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'unvalidated',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still unvalidated',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
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
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to invalid',
                    computedValidity        : false,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'invalid',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
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
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to unvalidated',
                    computedValidity        : null,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'unvalidated',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still unvalidated',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
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
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to valid',
                    computedValidity        : true,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'valid',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
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
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to invalid',
                    computedValidity        : false,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'invalid',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
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
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to valid',
                    computedValidity        : true,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'valid',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to invalid',
                    computedValidity        : false,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'invalid',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
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
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to unvalidated',
                    computedValidity        : null,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'unvalidated',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still unvalidated',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to invalid',
                    computedValidity        : false,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'invalid',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
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
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to invalid',
                    computedValidity        : false,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'invalid',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to valid',
                    computedValidity        : true,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'valid',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
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
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to unvalidated',
                    computedValidity        : null,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'unvalidated',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still unvalidated',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to valid',
                    computedValidity        : true,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'valid',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
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
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to valid',
                    computedValidity        : true,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'valid',
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be running and the validation is still valid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'The validating animation should be stopped and the validation is still valid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to unvalidated',
                    computedValidity        : null,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'unvalidated',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still unvalidated',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
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
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to invalid',
                    computedValidity        : false,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'invalid',
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be running and the validation is still invalid',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'The invalidating animation should be stopped and the validation is still invalid',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Change to unvalidated',
                    computedValidity        : null,
                    
                    delay                   : 0, // wait for async process
                    expectedValidity        : 'unvalidated',
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be running and the validation is still unvalidated',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'The unvalidating animation should be stopped and the validation is still unvalidated',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
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
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Validate',
                    computedValidity        : true,
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'Invalidate before validation finishes',
                    computedValidity        : false,
                    
                    delay                   : 200,
                    expectedValidity        : 'valid', // Still valid because the validating animation is not finished yet.
                    expectedRunningValidity : true,  // Still validating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-validate again before invalidate finishes',
                    computedValidity        : true,
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true, // Still in original validation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final validation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0, // No running animation.
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
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Validate',
                    computedValidity        : true,
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'Unvalidate before validation finishes',
                    computedValidity        : null,
                    
                    delay                   : 200,
                    expectedValidity        : 'valid', // Still valid because the validating animation is not finished yet.
                    expectedRunningValidity : true,  // Still validating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-validate again before unvalidate finishes',
                    computedValidity        : true,
                    
                    delay                   : 200,
                    expectedValidity        : 'valid',
                    expectedRunningValidity : true, // Still in original validation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final validation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0, // No running animation.
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
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Invalidate',
                    computedValidity        : false,
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'Validate before invalidation finishes',
                    computedValidity        : true,
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid', // Still invalid because the invalidating animation is not finished yet.
                    expectedRunningValidity : false,  // Still invalidating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-invalidate again before validate finishes',
                    computedValidity        : false,
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false, // Still in original invalidation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final invalidation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0, // No running animation.
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
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Invalidate',
                    computedValidity        : false,
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'Unvalidate before invalidation finishes',
                    computedValidity        : null,
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid', // Still invalid because the invalidating animation is not finished yet.
                    expectedRunningValidity : false,  // Still invalidating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-invalidate again before unvalidate finishes',
                    computedValidity        : false,
                    
                    delay                   : 200,
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : false, // Still in original invalidation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final invalidation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0, // No running animation.
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
                    expectedValidity        : 'invalid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Unvalidate',
                    computedValidity        : null,
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'Invalidate before unvalidation finishes',
                    computedValidity        : false,
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated', // Still unvalidated because the unvalidating animation is not finished yet.
                    expectedRunningValidity : null,  // Still unvalidating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-unvalidate again before invalidate finishes',
                    computedValidity        : null,
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null, // Still in original unvalidation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final unvalidation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0, // No running animation.
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
                    expectedValidity        : 'valid',
                    expectedRunningValidity : 0,
                },
                {
                    title                   : 'Unvalidate',
                    computedValidity        : null,
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'Validate before unvalidation finishes',
                    computedValidity        : true,
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated', // Still unvalidated because the unvalidating animation is not finished yet.
                    expectedRunningValidity : null,  // Still unvalidating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-unvalidate again before validate finishes',
                    computedValidity        : null,
                    
                    delay                   : 200,
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : null, // Still in original unvalidation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final unvalidation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedValidity        : 'unvalidated',
                    expectedRunningValidity : 0, // No running animation.
                },
            ],
        },
    ] as ValidityStateControlledTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentValidity         : boolean | null | 'auto' | undefined = initialValidity;
            let currentComputedValidity : boolean | null          | undefined = initialComputedValidity;
            
            
            
            // Stores currently validity animation names:
            const runningAnimations = new Set<string>();
            
            
            
            // Handlers:
            const handleAnimationStart : AnimationEventHandler<HTMLDivElement> = (event): void => {
                console.log(`${(performance.now() / 1000).toFixed(2)} animation started: `, event.animationName);
                runningAnimations.add(event.animationName);
            };
            const handleAnimationEnd   : AnimationEventHandler<HTMLDivElement> = (event): void => {
                console.log(`${(performance.now() / 1000).toFixed(2)} animation ended: `, event.animationName);
                runningAnimations.delete(event.animationName);
            };
            
            let lastNewValidity : boolean | null | undefined = undefined;
            let lastEvent       : unknown | undefined = undefined;
            const handleValidityUpdate : ValueChangeEventHandler<boolean | null, unknown> = (newValidity, event) => {
                lastNewValidity = newValidity;
                lastEvent = event;
            };
            
            
            
            // First render:
            const component = await mount(
                <ValidityStateTest
                    validity={currentValidity}
                    computedValidity={currentComputedValidity}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onValidityUpdate={handleValidityUpdate}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('validity-state-test');
            await expect(box).toContainText('Validity State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, validity, computedValidity, delay, expectedValidity, expectedRunningValidity} of updates) {
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
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                        
                        onValidityUpdate={handleValidityUpdate}
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
                if (expectedValidity !== undefined) {
                    expect(box).toHaveAttribute('data-state', expectedValidity);
                } // if
                
                if (expectedRunningValidity!== undefined) {
                    if (computedValidity === undefined) {
                        // Wait for brief moment to ensure the events are captured:
                        await new Promise<void>((resolve) => {
                            setTimeout(resolve, 20);
                        });
                    } // if
                    
                    switch (expectedRunningValidity) {
                        case true:
                            expect(runningAnimations.has('boo-test-validating')).toBe(true);
                            expect(runningAnimations.has('boo-test-invalidating')).toBe(false);
                            expect(runningAnimations.has('boo-test-unvalidating')).toBe(false);
                            break;
                        case false:
                            expect(runningAnimations.has('boo-test-validating')).toBe(false);
                            expect(runningAnimations.has('boo-test-invalidating')).toBe(true);
                            expect(runningAnimations.has('boo-test-unvalidating')).toBe(false);
                            break;
                        case null:
                            expect(runningAnimations.has('boo-test-validating')).toBe(false);
                            expect(runningAnimations.has('boo-test-invalidating')).toBe(false);
                            expect(runningAnimations.has('boo-test-unvalidating')).toBe(true);
                            break;
                        case 0:
                            expect(runningAnimations.has('boo-test-validating')).toBe(false);
                            expect(runningAnimations.has('boo-test-invalidating')).toBe(false);
                            expect(runningAnimations.has('boo-test-unvalidating')).toBe(false);
                            break;
                    } // switch
                } // if
            } // for
        });
    } // for
});
