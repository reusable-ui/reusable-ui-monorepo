import {
    default as React,
    type RefObject,
    useRef,
} from 'react'

import {
    type EmphasizeVariantProps,
    type EmphasizeVariantOptions,
    type ResolvedEmphasizeVariant,
} from '../dist/types.js'
import {
    defaultEmphasized,
} from '../dist/internal-defaults.js'
import {
    useEmphasizeVariant,
} from '../dist/emphasize-variant.js'
import {
    EmphasizeVariantProvider,
} from '../dist/providers.js'

import { renderHook, render } from '@testing-library/react'
import '@testing-library/jest-dom'



// Tests:

/**
 * Defines a single test case for evaluating the emphasize variant.
 */
interface EmphasizeVariantTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title              : string
    
    /**
     * The parent emphasized state to use for the test.
     * Set to `undefined` for no parent emphasized context.
     */
    parentEmphasized ?: boolean
    
    /**
     * Props to pass to the `useEmphasizeVariant` hook.
     * Set to `undefined` for no props.
     */
    props             ?: EmphasizeVariantProps
    
    /**
     * An optional options for the `useEmphasizeVariant` hook.
     * Set to `undefined` for no options.
     */
    options           ?: EmphasizeVariantOptions
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected result of the `useEmphasizeVariant` hook.
     */
    expectedResult     : ResolvedEmphasizeVariant
}



// Mocks:
interface MockComponentProps
    // Bases:
    extends
        EmphasizeVariantProps
{
    /**
     * Passed options to the `useEmphasizeVariant` hook.
     */
    options   : EmphasizeVariantOptions | undefined
    
    /**
     * A ref to peek the result of the `useEmphasizeVariant` hook.
     */
    resultRef : RefObject<ResolvedEmphasizeVariant | undefined>
}

/**
 * A mock component for testing the `useEmphasizeVariant` hook.
 */
const MockComponent = (props: MockComponentProps) => {
    // Test the `useEmphasizeVariant` hook:
    const result = useEmphasizeVariant(props, props.options);
    
    // Peek the result:
    props.resultRef.current = result;
    
    // Return null since this is a mock component:
    // It does not render anything to the DOM.
    return null;
};



describe('useEmphasizeVariant()', () => {
    const createRef = <TRef extends unknown>() => renderHook(() => useRef<TRef | undefined>(undefined)).result.current;
    
    test.each<EmphasizeVariantTestCase>([
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
                emphasized          : defaultEmphasized,
                emphasizedClassname : defaultEmphasized ? 'is-emphasized' : 'not-emphasized',
            },
        },
        {
            title                   : 'falls back to system default when inheritance is missing',
            parentEmphasized        : undefined,
            props                   : {
                emphasized          : 'inherit',
            },
            expectedResult          : {
                emphasized          : defaultEmphasized,
                emphasizedClassname : defaultEmphasized ? 'is-emphasized' : 'not-emphasized',
            },
        },
        {
            title                   : 'falls back to system default when inverting is missing',
            parentEmphasized        : undefined,
            props                   : {
                emphasized          : 'invert',
            },
            expectedResult          : {
                emphasized          : defaultEmphasized,
                emphasizedClassname : defaultEmphasized ? 'is-emphasized' : 'not-emphasized',
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
            const resultRef = createRef<ResolvedEmphasizeVariant>();
            
            
            
            // Render the mock component with the provided props and options:
            if (parentEmphasized === undefined) {
                // Without parent emphasis:
                render(
                    <MockComponent {...props} options={options} resultRef={resultRef} />
                );
            }
            else {
                // With parent emphasis:
                render(
                    <EmphasizeVariantProvider emphasized={parentEmphasized}>
                        <MockComponent {...props} options={options} resultRef={resultRef} />
                    </EmphasizeVariantProvider>
                );
            } // if
            
            
            
            // Assert the result:
            expect(resultRef.current).toEqual(expectedResult);
        }
    );
});
