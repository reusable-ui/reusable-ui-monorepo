import {
    default as React,
    type RefObject,
    useRef,
} from 'react'

import {
    type EmphasizedVariantProps,
    type EmphasizedVariantOptions,
    type EmphasizedVariant,
} from '../dist/types.js'
import {
    defaultFallbackEmphasized,
} from '../dist/internal-defaults.js'
import {
    useEmphasizedVariant,
} from '../dist/client-hooks.js'
import {
    EmphasizedVariantProvider,
} from '../dist/providers.js'

import { renderHook, render } from '@testing-library/react'
import '@testing-library/jest-dom'



// Tests:

/**
 * Defines a single test case for evaluating the emphasized variant.
 */
interface EmphasizedVariantTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title             : string
    
    /**
     * The parent emphasized state to use for the test.
     * Set to `undefined` for no parent emphasized context.
     */
    parentEmphasized ?: boolean
    
    /**
     * Props to pass to the `useEmphasizedVariant` hook.
     * Set to `undefined` for no props.
     */
    props            ?: EmphasizedVariantProps
    
    /**
     * An optional options for the `useEmphasizedVariant` hook.
     * Set to `undefined` for no options.
     */
    options          ?: EmphasizedVariantOptions
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected result of the `useEmphasizedVariant` hook.
     */
    expectedResult    : EmphasizedVariant
}



// Mocks:
interface MockComponentProps
    // Bases:
    extends
        EmphasizedVariantProps
{
    /**
     * Passed options to the `useEmphasizedVariant` hook.
     */
    options   : EmphasizedVariantOptions | undefined
    
    /**
     * A ref to peek the result of the `useEmphasizedVariant` hook.
     */
    resultRef : RefObject<EmphasizedVariant | undefined>
}

/**
 * A mock component for testing the `useEmphasizedVariant` hook.
 */
const MockComponent = (props: MockComponentProps) => {
    // Test the `useEmphasizedVariant` hook:
    const result = useEmphasizedVariant(props, props.options);
    
    // Peek the result:
    props.resultRef.current = result;
    
    // Return null since this is a mock component:
    // It does not render anything to the DOM.
    return null;
};



describe('useEmphasizedVariant()', () => {
    const createRef = <TRef extends unknown>() => renderHook(() => useRef<TRef | undefined>(undefined)).result.current;
    
    test.each<EmphasizedVariantTestCase>([
        //#region direct resolution from props and/or options
        {
            title                   : 'resolves not-emphasized from props',
            props                   : {
                emphasized          : false,
            },
            expectedResult          : {
                emphasized          : false,
                emphasizedClassname : 'not-emphasized',
            },
        },
        {
            title                   : 'resolves is-emphasized from props',
            props                   : {
                emphasized          : true,
            },
            expectedResult          : {
                emphasized          : true,
                emphasizedClassname : 'is-emphasized',
            },
        },
        {
            title                   : 'uses default not-emphasized when prop is missing',
            options                 : {
                defaultEmphasized   : false,
            },
            expectedResult          : {
                emphasized          : false,
                emphasizedClassname : 'not-emphasized',
            },
        },
        {
            title                   : 'uses default is-emphasized when prop is missing',
            options                 : {
                defaultEmphasized   : true,
            },
            expectedResult          : {
                emphasized          : true,
                emphasizedClassname : 'is-emphasized',
            },
        },
        {
            title                   : 'falls back to system default when prop and option are missing',
            expectedResult          : {
                emphasized          : defaultFallbackEmphasized,
                emphasizedClassname : defaultFallbackEmphasized ? 'is-emphasized' : 'not-emphasized',
            },
        },
        {
            title                   : 'falls back to parent`s: not-emphasized when prop and option are missing',
            parentEmphasized        : false,
            expectedResult          : {
                emphasized          : false,
                emphasizedClassname : 'not-emphasized',
            },
        },
        {
            title                   : 'falls back to parent`s: is-emphasized when prop and option are missing',
            parentEmphasized        : true,
            expectedResult          : {
                emphasized          : true,
                emphasizedClassname : 'is-emphasized',
            },
        },
        {
            title                   : 'falls back to system default when inheritance is missing',
            parentEmphasized        : undefined,
            props                   : {
                emphasized          : 'inherit',
            },
            expectedResult          : {
                emphasized          : defaultFallbackEmphasized,
                emphasizedClassname : defaultFallbackEmphasized ? 'is-emphasized' : 'not-emphasized',
            },
        },
        {
            title                   : 'falls back to system default when inverting is missing',
            parentEmphasized        : undefined,
            props                   : {
                emphasized          : 'invert',
            },
            expectedResult          : {
                emphasized          : defaultFallbackEmphasized,
                emphasizedClassname : defaultFallbackEmphasized ? 'is-emphasized' : 'not-emphasized',
            },
        },
        {
            title                   : 'resolves not-emphasized from props ignoring option',
            props                   : {
                emphasized          : false,
            },
            options                 : {
                defaultEmphasized   : true,
            },
            expectedResult          : {
                emphasized          : false,
                emphasizedClassname : 'not-emphasized',
            },
        },
        {
            title                   : 'resolves is-emphasized from props ignoring option',
            props                   : {
                emphasized          : true,
            },
            options                 : {
                defaultEmphasized   : false,
            },
            expectedResult          : {
                emphasized          : true,
                emphasizedClassname : 'is-emphasized',
            },
        },
        //#endregion direct resolution from props and/or options
        
        
        
        //#region cascade resolution from props and/or options
        {
            title                   : 'resolves not-emphasized from parent',
            parentEmphasized        : false,
            props                   : {
                emphasized          : 'inherit',
            },
            expectedResult          : {
                emphasized          : false,
                emphasizedClassname : 'not-emphasized',
            },
        },
        {
            title                   : 'resolves is-emphasized from parent',
            parentEmphasized        : true,
            props                   : {
                emphasized          : 'inherit',
            },
            expectedResult          : {
                emphasized          : true,
                emphasizedClassname : 'is-emphasized',
            },
        },
        {
            title                   : 'resolves not-emphasized from inverted parent',
            parentEmphasized        : true,
            props                   : {
                emphasized          : 'invert',
            },
            expectedResult          : {
                emphasized          : false,
                emphasizedClassname : 'not-emphasized',
            },
        },
        {
            title                   : 'resolves is-emphasized from inverted parent',
            parentEmphasized        : false,
            props                   : {
                emphasized          : 'invert',
            },
            expectedResult          : {
                emphasized          : true,
                emphasizedClassname : 'is-emphasized',
            },
        },
        
        
        {
            title                   : 'resolves not-emphasized from parent ignoring option',
            parentEmphasized        : false,
            props                   : {
                emphasized          : 'inherit',
            },
            options                 : {
                defaultEmphasized   : true,
            },
            expectedResult          : {
                emphasized          : false,
                emphasizedClassname : 'not-emphasized',
            },
        },
        {
            title                   : 'resolves is-emphasized from parent ignoring option',
            parentEmphasized        : true,
            props                   : {
                emphasized          : 'inherit',
            },
            options                 : {
                defaultEmphasized   : false,
            },
            expectedResult          : {
                emphasized          : true,
                emphasizedClassname : 'is-emphasized',
            },
        },
        {
            title                   : 'resolves not-emphasized from inverted parent ignoring option',
            parentEmphasized        : true,
            props                   : {
                emphasized          : 'invert',
            },
            options                 : {
                defaultEmphasized   : true,
            },
            expectedResult          : {
                emphasized          : false,
                emphasizedClassname : 'not-emphasized',
            },
        },
        {
            title                   : 'resolves is-emphasized from inverted parent ignoring option',
            parentEmphasized        : false,
            props                   : {
                emphasized          : 'invert',
            },
            options                 : {
                defaultEmphasized   : false,
            },
            expectedResult          : {
                emphasized          : true,
                emphasizedClassname : 'is-emphasized',
            },
        },
        //#endregion cascade resolution from props and/or options
    ])(
        `$title`,
        ({
            // Test Inputs:
            title,
            
            parentEmphasized,
            props,
            options,
            
            
            
            // Expects:
            expectedResult,
        }) => {
            // Create a ref to peek the result:
            const resultRef = createRef<EmphasizedVariant>();
            
            
            
            // Render the mock component with the provided props and options:
            if (parentEmphasized === undefined) {
                // Without parent emphasized:
                render(
                    <MockComponent {...props} options={options} resultRef={resultRef} />
                );
            }
            else {
                // With parent emphasized:
                render(
                    <EmphasizedVariantProvider emphasized={parentEmphasized}>
                        <MockComponent {...props} options={options} resultRef={resultRef} />
                    </EmphasizedVariantProvider>
                );
            } // if
            
            
            
            // Assert the result:
            expect(resultRef.current).toEqual(expectedResult);
        }
    );
});

