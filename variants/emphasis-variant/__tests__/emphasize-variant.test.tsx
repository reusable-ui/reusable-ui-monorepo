import {
    default as React,
    type RefObject,
    useRef,
} from 'react'

import {
    type EmphasisVariantProps,
    type EmphasisVariantOptions,
    type EmphasisVariant,
} from '../dist/types.js'
import {
    effectiveDefaultEmphasized,
} from '../dist/internal-defaults.js'
import {
    useEmphasisVariant,
} from '../dist/emphasis-variant.js'
import {
    EmphasisVariantProvider,
} from '../dist/providers.js'

import { renderHook, render } from '@testing-library/react'
import '@testing-library/jest-dom'



// Tests:

/**
 * Defines a single test case for evaluating the emphasis variant.
 */
interface EmphasisVariantTestCase {
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
     * Props to pass to the `useEmphasisVariant` hook.
     * Set to `undefined` for no props.
     */
    props            ?: EmphasisVariantProps
    
    /**
     * An optional options for the `useEmphasisVariant` hook.
     * Set to `undefined` for no options.
     */
    options          ?: EmphasisVariantOptions
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected result of the `useEmphasisVariant` hook.
     */
    expectedResult    : EmphasisVariant
}



// Mocks:
interface MockComponentProps
    // Bases:
    extends
        EmphasisVariantProps
{
    /**
     * Passed options to the `useEmphasisVariant` hook.
     */
    options   : EmphasisVariantOptions | undefined
    
    /**
     * A ref to peek the result of the `useEmphasisVariant` hook.
     */
    resultRef : RefObject<EmphasisVariant | undefined>
}

/**
 * A mock component for testing the `useEmphasisVariant` hook.
 */
const MockComponent = (props: MockComponentProps) => {
    // Test the `useEmphasisVariant` hook:
    const result = useEmphasisVariant(props, props.options);
    
    // Peek the result:
    props.resultRef.current = result;
    
    // Return null since this is a mock component:
    // It does not render anything to the DOM.
    return null;
};



describe('useEmphasisVariant()', () => {
    const createRef = <TRef extends unknown>() => renderHook(() => useRef<TRef | undefined>(undefined)).result.current;
    
    test.each<EmphasisVariantTestCase>([
        //#region direct resolution from props and/or options
        {
            title                  : 'resolves not-emphasized from props',
            props                  : {
                emphasized         : false,
            },
            expectedResult         : {
                emphasized         : false,
                emphasisClassname  : 'not-emphasized',
            },
        },
        {
            title                  : 'resolves is-emphasized from props',
            props                  : {
                emphasized         : true,
            },
            expectedResult         : {
                emphasized         : true,
                emphasisClassname  : 'is-emphasized',
            },
        },
        {
            title                  : 'uses default not-emphasized when prop is missing',
            options                : {
                defaultEmphasized  : false,
            },
            expectedResult         : {
                emphasized         : false,
                emphasisClassname  : 'not-emphasized',
            },
        },
        {
            title                  : 'uses default is-emphasized when prop is missing',
            options                : {
                defaultEmphasized  : true,
            },
            expectedResult         : {
                emphasized         : true,
                emphasisClassname  : 'is-emphasized',
            },
        },
        {
            title                  : 'falls back to system default when prop and option are missing',
            expectedResult         : {
                emphasized         : effectiveDefaultEmphasized,
                emphasisClassname  : effectiveDefaultEmphasized ? 'is-emphasized' : 'not-emphasized',
            },
        },
        {
            title                  : 'falls back to parent`s: not-emphasized when prop and option are missing',
            parentEmphasized       : false,
            expectedResult         : {
                emphasized         : false,
                emphasisClassname  : 'not-emphasized',
            },
        },
        {
            title                  : 'falls back to parent`s: is-emphasized when prop and option are missing',
            parentEmphasized       : true,
            expectedResult         : {
                emphasized         : true,
                emphasisClassname  : 'is-emphasized',
            },
        },
        {
            title                  : 'falls back to system default when inheritance is missing',
            parentEmphasized       : undefined,
            props                  : {
                emphasized         : 'inherit',
            },
            expectedResult         : {
                emphasized         : effectiveDefaultEmphasized,
                emphasisClassname  : effectiveDefaultEmphasized ? 'is-emphasized' : 'not-emphasized',
            },
        },
        {
            title                  : 'falls back to system default when inverting is missing',
            parentEmphasized       : undefined,
            props                  : {
                emphasized         : 'invert',
            },
            expectedResult         : {
                emphasized         : effectiveDefaultEmphasized,
                emphasisClassname  : effectiveDefaultEmphasized ? 'is-emphasized' : 'not-emphasized',
            },
        },
        {
            title                  : 'resolves not-emphasized from props ignoring option',
            props                  : {
                emphasized         : false,
            },
            options                : {
                defaultEmphasized  : true,
            },
            expectedResult         : {
                emphasized         : false,
                emphasisClassname  : 'not-emphasized',
            },
        },
        {
            title                  : 'resolves is-emphasized from props ignoring option',
            props                  : {
                emphasized         : true,
            },
            options                : {
                defaultEmphasized  : false,
            },
            expectedResult         : {
                emphasized         : true,
                emphasisClassname  : 'is-emphasized',
            },
        },
        //#endregion direct resolution from props and/or options
        
        
        
        //#region cascade resolution from props and/or options
        {
            title                  : 'resolves not-emphasized from parent',
            parentEmphasized       : false,
            props                  : {
                emphasized         : 'inherit',
            },
            expectedResult         : {
                emphasized         : false,
                emphasisClassname  : 'not-emphasized',
            },
        },
        {
            title                  : 'resolves is-emphasized from parent',
            parentEmphasized       : true,
            props                  : {
                emphasized         : 'inherit',
            },
            expectedResult         : {
                emphasized         : true,
                emphasisClassname  : 'is-emphasized',
            },
        },
        {
            title                  : 'resolves not-emphasized from inverted parent',
            parentEmphasized       : true,
            props                  : {
                emphasized         : 'invert',
            },
            expectedResult         : {
                emphasized         : false,
                emphasisClassname  : 'not-emphasized',
            },
        },
        {
            title                  : 'resolves is-emphasized from inverted parent',
            parentEmphasized       : false,
            props                  : {
                emphasized         : 'invert',
            },
            expectedResult         : {
                emphasized         : true,
                emphasisClassname  : 'is-emphasized',
            },
        },
        
        
        {
            title                  : 'resolves not-emphasized from parent ignoring option',
            parentEmphasized       : false,
            props                  : {
                emphasized         : 'inherit',
            },
            options                : {
                defaultEmphasized  : true,
            },
            expectedResult         : {
                emphasized         : false,
                emphasisClassname  : 'not-emphasized',
            },
        },
        {
            title                  : 'resolves is-emphasized from parent ignoring option',
            parentEmphasized       : true,
            props                  : {
                emphasized         : 'inherit',
            },
            options                : {
                defaultEmphasized  : false,
            },
            expectedResult         : {
                emphasized         : true,
                emphasisClassname  : 'is-emphasized',
            },
        },
        {
            title                  : 'resolves not-emphasized from inverted parent ignoring option',
            parentEmphasized       : true,
            props                  : {
                emphasized         : 'invert',
            },
            options                : {
                defaultEmphasized  : true,
            },
            expectedResult         : {
                emphasized         : false,
                emphasisClassname  : 'not-emphasized',
            },
        },
        {
            title                  : 'resolves is-emphasized from inverted parent ignoring option',
            parentEmphasized       : false,
            props                  : {
                emphasized         : 'invert',
            },
            options                : {
                defaultEmphasized  : false,
            },
            expectedResult         : {
                emphasized         : true,
                emphasisClassname  : 'is-emphasized',
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
            const resultRef = createRef<EmphasisVariant>();
            
            
            
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
                    <EmphasisVariantProvider emphasized={parentEmphasized}>
                        <MockComponent {...props} options={options} resultRef={resultRef} />
                    </EmphasisVariantProvider>
                );
            } // if
            
            
            
            // Assert the result:
            expect(resultRef.current).toEqual(expectedResult);
        }
    );
});

