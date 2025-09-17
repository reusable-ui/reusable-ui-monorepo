import {
    default as React,
    type RefObject,
    useRef,
} from 'react'

import {
    type MildVariantProps,
    type MildVariantOptions,
    type MildVariant,
} from '../dist/types.js'
import {
    finalDefaultMild,
} from '../dist/internal-defaults.js'
import {
    useMildVariant,
} from '../dist/mild-variant.js'
import {
    MildVariantProvider,
} from '../dist/providers.js'

import { renderHook, render } from '@testing-library/react'
import '@testing-library/jest-dom'



// Tests:

/**
 * Defines a single test case for evaluating the mild variant.
 */
interface MildVariantTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title     : string
    
    /**
     * The parent mild state to use for the test.
     * Set to `undefined` for no parent mild context.
     */
    parentMild     ?: boolean
    
    /**
     * Props to pass to the `useMildVariant` hook.
     * Set to `undefined` for no props.
     */
    props          ?: MildVariantProps
    
    /**
     * An optional options for the `useMildVariant` hook.
     * Set to `undefined` for no options.
     */
    options        ?: MildVariantOptions
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected result of the `useMildVariant` hook.
     */
    expectedResult  : MildVariant
}



// Mocks:
interface MockComponentProps
    // Bases:
    extends
        MildVariantProps
{
    /**
     * Passed options to the `useMildVariant` hook.
     */
    options   : MildVariantOptions | undefined
    
    /**
     * A ref to peek the result of the `useMildVariant` hook.
     */
    resultRef : RefObject<MildVariant | undefined>
}

/**
 * A mock component for testing the `useMildVariant` hook.
 */
const MockComponent = (props: MockComponentProps) => {
    // Test the `useMildVariant` hook:
    const result = useMildVariant(props, props.options);
    
    // Peek the result:
    props.resultRef.current = result;
    
    // Return null since this is a mock component:
    // It does not render anything to the DOM.
    return null;
};



describe('useMildVariant()', () => {
    const createRef = <TRef extends unknown>() => renderHook(() => useRef<TRef | undefined>(undefined)).result.current;
    
    test.each<MildVariantTestCase>([
        //#region direct resolution from props and/or options
        {
            title             : 'resolves not-mild from props',
            props             : {
                mild          : false,
            },
            expectedResult    : {
                mild          : false,
                mildClassname : 'not-mild',
            },
        },
        {
            title             : 'resolves is-mild from props',
            props             : {
                mild          : true,
            },
            expectedResult    : {
                mild          : true,
                mildClassname : 'is-mild',
            },
        },
        {
            title             : 'uses default not-mild when prop is missing',
            options           : {
                defaultMild   : false,
            },
            expectedResult    : {
                mild          : false,
                mildClassname : 'not-mild',
            },
        },
        {
            title             : 'uses default is-mild when prop is missing',
            options           : {
                defaultMild   : true,
            },
            expectedResult    : {
                mild          : true,
                mildClassname : 'is-mild',
            },
        },
        {
            title             : 'falls back to system default when prop and option are missing',
            expectedResult    : {
                mild          : finalDefaultMild,
                mildClassname : finalDefaultMild ? 'is-mild' : 'not-mild',
            },
        },
        {
            title             : 'falls back to parent`s: not-mild when prop and option are missing',
            parentMild        : false,
            expectedResult    : {
                mild          : false,
                mildClassname : 'not-mild',
            },
        },
        {
            title             : 'falls back to parent`s: is-mild when prop and option are missing',
            parentMild        : true,
            expectedResult    : {
                mild          : true,
                mildClassname : 'is-mild',
            },
        },
        {
            title             : 'falls back to system default when inheritance is missing',
            parentMild        : undefined,
            props             : {
                mild          : 'inherit',
            },
            expectedResult    : {
                mild          : finalDefaultMild,
                mildClassname : finalDefaultMild ? 'is-mild' : 'not-mild',
            },
        },
        {
            title             : 'falls back to system default when inverting is missing',
            parentMild        : undefined,
            props             : {
                mild          : 'invert',
            },
            expectedResult    : {
                mild          : finalDefaultMild,
                mildClassname : finalDefaultMild ? 'is-mild' : 'not-mild',
            },
        },
        {
            title             : 'resolves not-mild from props ignoring option',
            props             : {
                mild          : false,
            },
            options           : {
                defaultMild   : true,
            },
            expectedResult    : {
                mild          : false,
                mildClassname : 'not-mild',
            },
        },
        {
            title             : 'resolves is-mild from props ignoring option',
            props             : {
                mild          : true,
            },
            options           : {
                defaultMild   : false,
            },
            expectedResult    : {
                mild          : true,
                mildClassname : 'is-mild',
            },
        },
        //#endregion direct resolution from props and/or options
        
        
        
        //#region cascade resolution from props and/or options
        {
            title             : 'resolves not-mild from parent',
            parentMild        : false,
            props             : {
                mild          : 'inherit',
            },
            expectedResult    : {
                mild          : false,
                mildClassname : 'not-mild',
            },
        },
        {
            title             : 'resolves is-mild from parent',
            parentMild        : true,
            props             : {
                mild          : 'inherit',
            },
            expectedResult    : {
                mild          : true,
                mildClassname : 'is-mild',
            },
        },
        {
            title             : 'resolves not-mild from inverted parent',
            parentMild        : true,
            props             : {
                mild          : 'invert',
            },
            expectedResult    : {
                mild          : false,
                mildClassname : 'not-mild',
            },
        },
        {
            title             : 'resolves is-mild from inverted parent',
            parentMild        : false,
            props             : {
                mild          : 'invert',
            },
            expectedResult    : {
                mild          : true,
                mildClassname : 'is-mild',
            },
        },
        
        
        {
            title             : 'resolves not-mild from parent ignoring option',
            parentMild        : false,
            props             : {
                mild          : 'inherit',
            },
            options           : {
                defaultMild   : true,
            },
            expectedResult    : {
                mild          : false,
                mildClassname : 'not-mild',
            },
        },
        {
            title             : 'resolves is-mild from parent ignoring option',
            parentMild        : true,
            props             : {
                mild          : 'inherit',
            },
            options           : {
                defaultMild   : false,
            },
            expectedResult    : {
                mild          : true,
                mildClassname : 'is-mild',
            },
        },
        {
            title             : 'resolves not-mild from inverted parent ignoring option',
            parentMild        : true,
            props             : {
                mild          : 'invert',
            },
            options           : {
                defaultMild   : true,
            },
            expectedResult    : {
                mild          : false,
                mildClassname : 'not-mild',
            },
        },
        {
            title             : 'resolves is-mild from inverted parent ignoring option',
            parentMild        : false,
            props             : {
                mild          : 'invert',
            },
            options           : {
                defaultMild   : false,
            },
            expectedResult    : {
                mild          : true,
                mildClassname : 'is-mild',
            },
        },
        //#endregion cascade resolution from props and/or options
    ])(
        `$title`,
        ({
            // Test Inputs:
            title,
            
            parentMild,
            props,
            options,
            
            
            
            // Expects:
            expectedResult,
        }) => {
            // Create a ref to peek the result:
            const resultRef = createRef<MildVariant>();
            
            
            
            // Render the mock component with the provided props and options:
            if (parentMild === undefined) {
                // Without parent mild:
                render(
                    <MockComponent {...props} options={options} resultRef={resultRef} />
                );
            }
            else {
                // With parent mild:
                render(
                    <MildVariantProvider mild={parentMild}>
                        <MockComponent {...props} options={options} resultRef={resultRef} />
                    </MildVariantProvider>
                );
            } // if
            
            
            
            // Assert the result:
            expect(resultRef.current).toEqual(expectedResult);
        }
    );
});
