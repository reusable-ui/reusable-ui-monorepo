import {
    default as React,
    type RefObject,
    useRef,
} from 'react'

import {
    type BareVariantProps,
    type BareVariantOptions,
    type ResolvedBareVariant,
} from '../dist/types.js'
import {
    finalDefaultBare,
} from '../dist/internal-defaults.js'
import {
    useBareVariant,
} from '../dist/bare-variant.js'

import { renderHook, render } from '@testing-library/react'
import '@testing-library/jest-dom'



// Tests:

/**
 * Defines a single test case for evaluating the bare variant.
 */
interface BareVariantTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title     : string
    
    /**
     * Props to pass to the `useBareVariant` hook.
     * Set to `undefined` for no props.
     */
    props          ?: BareVariantProps<true | string>
    
    /**
     * An optional options for the `useBareVariant` hook.
     * Set to `undefined` for no options.
     */
    options        ?: BareVariantOptions<true | string>
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected result of the `useBareVariant` hook.
     */
    expectedResult  : ResolvedBareVariant<true | string>
}



// Mocks:
interface MockComponentProps
    // Bases:
    extends
        BareVariantProps<true | string>
{
    /**
     * Passed options to the `useBareVariant` hook.
     */
    options   : BareVariantOptions<true | string> | undefined
    
    /**
     * A ref to peek the result of the `useBareVariant` hook.
     */
    resultRef : RefObject<ResolvedBareVariant<true | string> | undefined>
}

/**
 * A mock component for testing the `useBareVariant` hook.
 */
const MockComponent = (props: MockComponentProps) => {
    // Test the `useBareVariant` hook:
    const result = useBareVariant(props, props.options);
    
    // Peek the result:
    props.resultRef.current = result;
    
    // Return null since this is a mock component:
    // It does not render anything to the DOM.
    return null;
};



const customTokens : string[] = [
    'flat',
    'flush',
    'joined',
    'boo',
    'foo',
    'bleh',
    'whatever',
];



describe('useBareVariant()', () => {
    const createRef = <TRef extends unknown>() => renderHook(() => useRef<TRef | undefined>(undefined)).result.current;
    
    test.each<BareVariantTestCase>([
        //#region direct resolution from props and/or options
        {
            title             : 'resolves not-bare from props',
            props             : {
                bare          : false,
            },
            expectedResult    : {
                bare          : false,
                bareClassname : 'not-bare',
            },
        },
        {
            title             : 'resolves is-bare from props',
            props             : {
                bare          : true,
            },
            expectedResult    : {
                bare          : true,
                bareClassname : 'is-bare',
            },
        },
        ...customTokens.map((customToken) => ({
            title             : `resolves is-${customToken} from props`,
            props             : {
                bare          : customToken,
            },
            expectedResult    : {
                bare          : customToken,
                bareClassname : `is-${customToken}`,
            },
        }) satisfies BareVariantTestCase),
        
        {
            title             : 'uses default not-bare when prop is missing',
            options           : {
                defaultBare   : false,
            },
            expectedResult    : {
                bare          : false,
                bareClassname : 'not-bare',
            },
        },
        {
            title             : 'uses default is-bare when prop is missing',
            options           : {
                defaultBare   : true,
            },
            expectedResult    : {
                bare          : true,
                bareClassname : 'is-bare',
            },
        },
        ...customTokens.map((customToken) => ({
            title             : `uses default is-${customToken} when prop is missing`,
            options           : {
                defaultBare   : customToken,
            },
            expectedResult    : {
                bare          : customToken,
                bareClassname : `is-${customToken}`,
            },
        }) satisfies BareVariantTestCase),
        
        {
            title             : 'falls back to system default when prop and option are missing',
            expectedResult    : {
                bare          : finalDefaultBare,
                bareClassname : finalDefaultBare ? 'is-bare' : 'not-bare',
            },
        },
        
        {
            title             : 'resolves not-bare from props ignoring option',
            props             : {
                bare          : false,
            },
            options           : {
                defaultBare   : true,
            },
            expectedResult    : {
                bare          : false,
                bareClassname : 'not-bare',
            },
        },
        {
            title             : 'resolves is-bare from props ignoring option',
            props             : {
                bare          : true,
            },
            options           : {
                defaultBare   : false,
            },
            expectedResult    : {
                bare          : true,
                bareClassname : 'is-bare',
            },
        },
        ...customTokens.map((customToken) => ({
            title             : `resolves is-${customToken} from props ignoring option`,
            props             : {
                bare          : customToken,
            },
            options           : {
                defaultBare   : 'something',
            },
            expectedResult    : {
                bare          : customToken,
                bareClassname : `is-${customToken}`,
            },
        }) satisfies BareVariantTestCase),
        //#endregion direct resolution from props and/or options
    ])(
        `$title`,
        ({
            // Test Inputs:
            title,
            
            props,
            options,
            
            
            
            // Expects:
            expectedResult,
        }) => {
            // Create a ref to peek the result:
            const resultRef = createRef<ResolvedBareVariant<true | string>>();
            
            
            
            // Render the mock component with the provided props and options:
            render(
                <MockComponent {...props} options={options} resultRef={resultRef} />
            );
            
            
            
            // Assert the result:
            expect(resultRef.current).toEqual(expectedResult);
        }
    );
});
