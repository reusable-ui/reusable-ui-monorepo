import {
    default as React,
    type RefObject,
    useRef,
} from 'react'

import {
    type OutlinedVariantProps,
    type OutlinedVariantOptions,
    type OutlinedVariant,
} from '../dist/types.js'
import {
    defaultFallbackOutlined,
} from '../dist/internal-defaults.js'
import {
    useOutlinedVariant,
} from '../dist/client-hooks.js'
import {
    OutlinedVariantProvider,
} from '../dist/providers.js'

import { renderHook, render } from '@testing-library/react'
import '@testing-library/jest-dom'



// Tests:

/**
 * Defines a single test case for evaluating the outlined variant.
 */
interface OutlinedVariantTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title           : string
    
    /**
     * The parent outlined state to use for the test.
     * Set to `undefined` for no parent outlined context.
     */
    parentOutlined ?: boolean
    
    /**
     * Props to pass to the `useOutlinedVariant` hook.
     * Set to `undefined` for no props.
     */
    props          ?: OutlinedVariantProps
    
    /**
     * An optional options for the `useOutlinedVariant` hook.
     * Set to `undefined` for no options.
     */
    options        ?: OutlinedVariantOptions
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected result of the `useOutlinedVariant` hook.
     */
    expectedResult  : OutlinedVariant
}



// Mocks:
interface MockComponentProps
    // Bases:
    extends
        OutlinedVariantProps
{
    /**
     * Passed options to the `useOutlinedVariant` hook.
     */
    options   : OutlinedVariantOptions | undefined
    
    /**
     * A ref to peek the result of the `useOutlinedVariant` hook.
     */
    resultRef : RefObject<OutlinedVariant | undefined>
}

/**
 * A mock component for testing the `useOutlinedVariant` hook.
 */
const MockComponent = (props: MockComponentProps) => {
    // Test the `useOutlinedVariant` hook:
    const result = useOutlinedVariant(props, props.options);
    
    // Peek the result:
    props.resultRef.current = result;
    
    // Return null since this is a mock component:
    // It does not render anything to the DOM.
    return null;
};



describe('useOutlinedVariant()', () => {
    const createRef = <TRef extends unknown>() => renderHook(() => useRef<TRef | undefined>(undefined)).result.current;
    
    test.each<OutlinedVariantTestCase>([
        //#region direct resolution from props and/or options
        {
            title                 : 'resolves not-outlined from props',
            props                 : {
                outlined          : false,
            },
            expectedResult        : {
                outlined          : false,
                outlinedClassname : 'not-outlined',
            },
        },
        {
            title                 : 'resolves is-outlined from props',
            props                 : {
                outlined          : true,
            },
            expectedResult        : {
                outlined          : true,
                outlinedClassname : 'is-outlined',
            },
        },
        {
            title                 : 'uses default not-outlined when prop is missing',
            options               : {
                defaultOutlined   : false,
            },
            expectedResult        : {
                outlined          : false,
                outlinedClassname : 'not-outlined',
            },
        },
        {
            title                 : 'uses default is-outlined when prop is missing',
            options               : {
                defaultOutlined   : true,
            },
            expectedResult        : {
                outlined          : true,
                outlinedClassname : 'is-outlined',
            },
        },
        {
            title                 : 'falls back to system default when prop and option are missing',
            expectedResult        : {
                outlined          : defaultFallbackOutlined,
                outlinedClassname : defaultFallbackOutlined ? 'is-outlined' : 'not-outlined',
            },
        },
        {
            title                 : 'falls back to parent`s: not-outlined when prop and option are missing',
            parentOutlined        : false,
            expectedResult        : {
                outlined          : false,
                outlinedClassname : 'not-outlined',
            },
        },
        {
            title                 : 'falls back to parent`s: is-outlined when prop and option are missing',
            parentOutlined        : true,
            expectedResult        : {
                outlined          : true,
                outlinedClassname : 'is-outlined',
            },
        },
        {
            title                 : 'falls back to system default when inheritance is missing',
            parentOutlined        : undefined,
            props                 : {
                outlined          : 'inherit',
            },
            expectedResult        : {
                outlined          : defaultFallbackOutlined,
                outlinedClassname : defaultFallbackOutlined ? 'is-outlined' : 'not-outlined',
            },
        },
        {
            title                 : 'falls back to system default when inverting is missing',
            parentOutlined        : undefined,
            props                 : {
                outlined          : 'invert',
            },
            expectedResult        : {
                outlined          : defaultFallbackOutlined,
                outlinedClassname : defaultFallbackOutlined ? 'is-outlined' : 'not-outlined',
            },
        },
        {
            title                 : 'resolves not-outlined from props ignoring option',
            props                 : {
                outlined          : false,
            },
            options               : {
                defaultOutlined   : true,
            },
            expectedResult        : {
                outlined          : false,
                outlinedClassname : 'not-outlined',
            },
        },
        {
            title                 : 'resolves is-outlined from props ignoring option',
            props                 : {
                outlined          : true,
            },
            options               : {
                defaultOutlined   : false,
            },
            expectedResult        : {
                outlined          : true,
                outlinedClassname : 'is-outlined',
            },
        },
        //#endregion direct resolution from props and/or options
        
        
        
        //#region cascade resolution from props and/or options
        {
            title                 : 'resolves not-outlined from parent',
            parentOutlined        : false,
            props                 : {
                outlined          : 'inherit',
            },
            expectedResult        : {
                outlined          : false,
                outlinedClassname : 'not-outlined',
            },
        },
        {
            title                 : 'resolves is-outlined from parent',
            parentOutlined        : true,
            props                 : {
                outlined          : 'inherit',
            },
            expectedResult        : {
                outlined          : true,
                outlinedClassname : 'is-outlined',
            },
        },
        {
            title                 : 'resolves not-outlined from inverted parent',
            parentOutlined        : true,
            props                 : {
                outlined          : 'invert',
            },
            expectedResult        : {
                outlined          : false,
                outlinedClassname : 'not-outlined',
            },
        },
        {
            title                 : 'resolves is-outlined from inverted parent',
            parentOutlined        : false,
            props                 : {
                outlined          : 'invert',
            },
            expectedResult        : {
                outlined          : true,
                outlinedClassname : 'is-outlined',
            },
        },
        
        
        {
            title                 : 'resolves not-outlined from parent ignoring option',
            parentOutlined        : false,
            props                 : {
                outlined          : 'inherit',
            },
            options               : {
                defaultOutlined   : true,
            },
            expectedResult        : {
                outlined          : false,
                outlinedClassname : 'not-outlined',
            },
        },
        {
            title                 : 'resolves is-outlined from parent ignoring option',
            parentOutlined        : true,
            props                 : {
                outlined          : 'inherit',
            },
            options               : {
                defaultOutlined   : false,
            },
            expectedResult        : {
                outlined          : true,
                outlinedClassname : 'is-outlined',
            },
        },
        {
            title                 : 'resolves not-outlined from inverted parent ignoring option',
            parentOutlined        : true,
            props                 : {
                outlined          : 'invert',
            },
            options               : {
                defaultOutlined   : true,
            },
            expectedResult        : {
                outlined          : false,
                outlinedClassname : 'not-outlined',
            },
        },
        {
            title                 : 'resolves is-outlined from inverted parent ignoring option',
            parentOutlined        : false,
            props                 : {
                outlined          : 'invert',
            },
            options               : {
                defaultOutlined   : false,
            },
            expectedResult        : {
                outlined          : true,
                outlinedClassname : 'is-outlined',
            },
        },
        //#endregion cascade resolution from props and/or options
    ])(
        `$title`,
        ({
            // Test Inputs:
            title,
            
            parentOutlined,
            props,
            options,
            
            
            
            // Expects:
            expectedResult,
        }) => {
            // Create a ref to peek the result:
            const resultRef = createRef<OutlinedVariant>();
            
            
            
            // Render the mock component with the provided props and options:
            if (parentOutlined === undefined) {
                // Without parent outlined:
                render(
                    <MockComponent {...props} options={options} resultRef={resultRef} />
                );
            }
            else {
                // With parent outlined:
                render(
                    <OutlinedVariantProvider outlined={parentOutlined}>
                        <MockComponent {...props} options={options} resultRef={resultRef} />
                    </OutlinedVariantProvider>
                );
            } // if
            
            
            
            // Assert the result:
            expect(resultRef.current).toEqual(expectedResult);
        }
    );
});
