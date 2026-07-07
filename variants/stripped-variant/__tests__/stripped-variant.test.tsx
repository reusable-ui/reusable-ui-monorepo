import {
    default as React,
    type RefObject,
    useRef,
} from 'react'

import {
    type StrippedVariantProps,
    type StrippedVariantOptions,
    type StrippedVariant,
} from '../dist/types.js'
import {
    defaultDeclarativeStripped,
} from '../dist/internal-defaults.js'
import {
    useStrippedVariant,
} from '../dist/general-hooks.js'

import { renderHook, render } from '@testing-library/react'
import '@testing-library/jest-dom'



// Tests:

/**
 * Defines a single test case for evaluating the stripped variant.
 */
interface StrippedVariantTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title     : string
    
    /**
     * Props to pass to the `useStrippedVariant` hook.
     * Set to `undefined` for no props.
     */
    props          ?: StrippedVariantProps<true | string>
    
    /**
     * An optional options for the `useStrippedVariant` hook.
     * Set to `undefined` for no options.
     */
    options        ?: StrippedVariantOptions<true | string>
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected result of the `useStrippedVariant` hook.
     */
    expectedResult  : StrippedVariant<true | string>
}



// Mocks:
interface MockComponentProps
    // Bases:
    extends
        StrippedVariantProps<true | string>
{
    /**
     * Passed options to the `useStrippedVariant` hook.
     */
    options   : StrippedVariantOptions<true | string> | undefined
    
    /**
     * A ref to peek the result of the `useStrippedVariant` hook.
     */
    resultRef : RefObject<StrippedVariant<true | string> | undefined>
}

/**
 * A mock component for testing the `useStrippedVariant` hook.
 */
const MockComponent = (props: MockComponentProps) => {
    // Test the `useStrippedVariant` hook:
    const result = useStrippedVariant(props, props.options);
    
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



describe('useStrippedVariant()', () => {
    const createRef = <TRef extends unknown>() => renderHook(() => useRef<TRef | undefined>(undefined)).result.current;
    
    test.each<StrippedVariantTestCase>([
        //#region direct resolution from props and/or options
        {
            title                 : 'resolves not-stripped from props',
            props                 : {
                stripped          : false,
            },
            expectedResult        : {
                stripped          : false,
                strippedClassname : 'not-stripped',
            },
        },
        {
            title                 : 'resolves is-stripped from props',
            props                 : {
                stripped          : true,
            },
            expectedResult        : {
                stripped          : true,
                strippedClassname : 'is-stripped',
            },
        },
        ...customTokens.map((customToken) => ({
            title                 : `resolves is-${customToken} from props`,
            props                 : {
                stripped          : customToken,
            },
            expectedResult        : {
                stripped          : customToken,
                strippedClassname : `is-${customToken}`,
            },
        }) satisfies StrippedVariantTestCase),
        
        {
            title                 : 'uses default not-stripped when prop is missing',
            options               : {
                defaultStripped   : false,
            },
            expectedResult        : {
                stripped          : false,
                strippedClassname : 'not-stripped',
            },
        },
        {
            title                 : 'uses default is-stripped when prop is missing',
            options               : {
                defaultStripped   : true,
            },
            expectedResult        : {
                stripped          : true,
                strippedClassname : 'is-stripped',
            },
        },
        ...customTokens.map((customToken) => ({
            title                 : `uses default is-${customToken} when prop is missing`,
            options               : {
                defaultStripped   : customToken,
            },
            expectedResult        : {
                stripped          : customToken,
                strippedClassname : `is-${customToken}`,
            },
        }) satisfies StrippedVariantTestCase),
        
        {
            title                 : 'falls back to system default when prop and option are missing',
            expectedResult        : {
                stripped          : defaultDeclarativeStripped,
                strippedClassname : defaultDeclarativeStripped ? 'is-stripped' : 'not-stripped',
            },
        },
        
        {
            title                 : 'resolves not-stripped from props ignoring option',
            props                 : {
                stripped          : false,
            },
            options               : {
                defaultStripped   : true,
            },
            expectedResult        : {
                stripped          : false,
                strippedClassname : 'not-stripped',
            },
        },
        {
            title                 : 'resolves is-stripped from props ignoring option',
            props                 : {
                stripped          : true,
            },
            options               : {
                defaultStripped   : false,
            },
            expectedResult        : {
                stripped          : true,
                strippedClassname : 'is-stripped',
            },
        },
        ...customTokens.map((customToken) => ({
            title                 : `resolves is-${customToken} from props ignoring option`,
            props                 : {
                stripped          : customToken,
            },
            options               : {
                defaultStripped   : 'something',
            },
            expectedResult        : {
                stripped          : customToken,
                strippedClassname : `is-${customToken}`,
            },
        }) satisfies StrippedVariantTestCase),
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
            const resultRef = createRef<StrippedVariant<true | string>>();
            
            
            
            // Render the mock component with the provided props and options:
            render(
                <MockComponent {...props} options={options} resultRef={resultRef} />
            );
            
            
            
            // Assert the result:
            expect(resultRef.current).toEqual(expectedResult);
        }
    );
});
