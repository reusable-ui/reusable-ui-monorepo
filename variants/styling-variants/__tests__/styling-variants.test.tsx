import {
    default as React,
    type RefObject,
    useRef,
} from 'react'

import {
    type StylingVariantsProps,
    type CollectedStylingVariants,
} from '../dist/types.js'
import {
    useStylingVariants,
} from '../dist/styling-variants.js'

import { renderHook, render } from '@testing-library/react'
import '@testing-library/jest-dom'



// Tests:

/**
 * Defines a single test case for evaluating styling variants.
 */
interface StylingVariantsTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title           : string
    
    /**
     * Props to pass to the `useStylingVariants` hook, including foreign props
     * Set to `undefined` for no props.
     */
    props          ?: StylingVariantsProps & Record<string, unknown>
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected result of the `useStylingVariants` hook, excluding foreign props.
     */
    expectedResult  : CollectedStylingVariants
}



// Mocks:
interface MockComponentProps
    // Bases:
    extends
        StylingVariantsProps
{
    /**
     * A ref to peek the result of the `useStylingVariants` hook.
     */
    resultRef : RefObject<CollectedStylingVariants | undefined>
}

/**
 * A mock component for testing the `useStylingVariants` hook.
 */
const MockComponent = (props: MockComponentProps) => {
    // Test the `useStylingVariants` hook:
    const result = useStylingVariants(props);
    
    // Peek the result:
    props.resultRef.current = result;
    
    // Return null since this is a mock component:
    // It does not render anything to the DOM.
    return null;
};



describe('useStylingVariants()', () => {
    const createRef = <TRef extends unknown>() => renderHook(() => useRef<TRef | undefined>(undefined)).result.current;
    
    test.each<StylingVariantsTestCase>([
        {
            title          : 'returns empty object when no styling props are provided',
            props          : {},
            expectedResult : {},
        },
        {
            title          : 'filters out undefined styling props',
            props          : {
                size       : undefined,
                theme      : undefined,
                emphasized : undefined,
                outlined   : undefined,
                mild       : undefined,
            },
            expectedResult : {},
        },
        {
            title          : 'includes only defined styling props',
            props          : {
                size       : 'lg',
                theme      : 'primary',
                emphasized : true,
                outlined   : false,
                mild       : 'inherit',
            },
            expectedResult : {
                size       : 'lg',
                theme      : 'primary',
                emphasized : true,
                outlined   : false,
                mild       : 'inherit',
            },
        },
        {
            title          : 'excludes foreign props',
            props          : {
                size       : 'sm',
                theme      : 'danger',
                emphasized : false,
                outlined   : true,
                mild       : true,
                onClick    : () => { },
                ariaLabel  : 'test',
                customProp : 'value',
            },
            expectedResult : {
                size       : 'sm',
                theme      : 'danger',
                emphasized : false,
                outlined   : true,
                mild       : true,
            },
        },
        {
            title          : 'handles partial styling props',
            props          : {
                theme      : 'success',
                outlined   : true,
            },
            expectedResult : {
                theme      : 'success',
                outlined   : true,
            },
        },
        {
            title          : 'handles relative values like `inherit` and `invert`',
            props          : {
                theme      : 'inherit',
                mild       : 'inherit',
                outlined   : 'invert',
            },
            expectedResult : {
                theme      : 'inherit',
                mild       : 'inherit',
                outlined   : 'invert',
            },
        },
        {
            title: 'handles mixed props: defined, undefined, and foreign',
            props: {
                size       : 'md',           // defined
                theme      : undefined,      // undefined
                outlined   : true,           // defined
                emphasized : undefined,      // undefined
                mild       : 'inherit',      // defined
                role       : 'button',       // foreign
                dataTestId : 'variant-test', // foreign
            },
            expectedResult: {
                size       : 'md',
                outlined   : true,
                mild       : 'inherit',
            },
        }
    ])(
        `$title`,
        ({
            // Test Inputs:
            title,
            
            props,
            
            
            
            // Expects:
            expectedResult,
        }) => {
            // Create a ref to peek the result:
            const resultRef = createRef<CollectedStylingVariants>();
            
            
            
            // Render the mock component with the provided props:
            render(
                <MockComponent {...props} resultRef={resultRef} />
            );
            
            
            
            // Assert the result:
            expect(resultRef.current).toEqual(expectedResult);
        }
    );
});
