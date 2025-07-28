import {
    default as React,
    type RefObject,
    useRef,
} from 'react'

import {
    type FlowDirection,
    type FlowDirectionVariantProps,
    type FlowDirectionVariantOptions,
    type ResolvedFlowDirectionVariant,
} from '../dist/types.js'
import {
    defaultFlowDirection,
} from '../dist/internal-defaults.js'
import {
    useFlowDirectionVariant,
} from '../dist/flow-direction-variant.js'
import {
    FlowDirectionVariantProvider,
} from '../dist/providers.js'

import { renderHook, render } from '@testing-library/react'
import '@testing-library/jest-dom'



// Tests:

/**
 * Defines a single test case for evaluating flow direction variant.
 */
interface FlowDirectionVariantTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title                : string
    
    /**
     * The parent flow direction to use for the test.
     * Set to `undefined` for no parent flow direction.
     */
    parentFlowDirection ?: FlowDirection
    
    /**
     * Props to pass to the `useFlowDirectionVariant` hook.
     * Set to `undefined` for no props.
     */
    props               ?: FlowDirectionVariantProps
    
    /**
     * An optional options for the `useFlowDirectionVariant` hook.
     * Set to `undefined` for no options.
     */
    options             ?: FlowDirectionVariantOptions
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected result of the `useFlowDirectionVariant` hook.
     */
    expectedResult       : ResolvedFlowDirectionVariant
}



// Mocks:
interface MockComponentProps
    // Bases:
    extends
        FlowDirectionVariantProps
{
    /**
     * Passed options to the `useFlowDirectionVariant` hook.
     */
    options   : FlowDirectionVariantOptions | undefined
    
    /**
     * A ref to peek the result of the `useFlowDirectionVariant` hook.
     */
    resultRef : RefObject<ResolvedFlowDirectionVariant | undefined>
}

/**
 * A mock component for testing the `useFlowDirectionVariant` hook.
 */
const MockComponent = (props: MockComponentProps) => {
    // Test the `useFlowDirectionVariant` hook:
    const result = useFlowDirectionVariant(props, props.options);
    
    // Peek the result:
    props.resultRef.current = result;
    
    // Return null since this is a mock component:
    // It does not render anything to the DOM.
    return null;
};



describe('useFlowDirectionVariant()', () => {
    const createRef = <TRef extends unknown>() => renderHook(() => useRef<TRef | undefined>(undefined)).result.current;
    
    test.each<FlowDirectionVariantTestCase>([
        //#region direct resolution from props and/or options
        {
            title                      : 'resolves start flow direction from props',
            props                      : {
                flowDirection          : 'start',
            },
            expectedResult             : {
                flowDirection          : 'start',
                flowDirectionClassname : 'f-start',
            },
        },
        {
            title                      : 'resolves end flow direction from props',
            props                      : {
                flowDirection          : 'end',
            },
            expectedResult             : {
                flowDirection          : 'end',
                flowDirectionClassname : 'f-end',
            },
        },
        {
            title                      : 'uses default start flow direction when prop is missing',
            options                    : {
                defaultFlowDirection   : 'start',
            },
            expectedResult             : {
                flowDirection          : 'start',
                flowDirectionClassname : 'f-start',
            },
        },
        {
            title                      : 'uses default end flow direction when prop is missing',
            options                    : {
                defaultFlowDirection   : 'end',
            },
            expectedResult             : {
                flowDirection          : 'end',
                flowDirectionClassname : 'f-end',
            },
        },
        {
            title                      : 'falls back to system default when prop and option are missing',
            expectedResult             : {
                flowDirection          : defaultFlowDirection,
                flowDirectionClassname : `f-${defaultFlowDirection}`,
            },
        },
        {
            title                      : 'falls back to system default when inheritance is missing',
            parentFlowDirection        : undefined,
            props                      : {
                flowDirection          : 'inherit',
            },
            expectedResult             : {
                flowDirection          : defaultFlowDirection,
                flowDirectionClassname : `f-${defaultFlowDirection}`,
            },
        },
        {
            title                      : 'resolves start flow direction from props ignoring option',
            props                      : {
                flowDirection          : 'start',
            },
            options                    : {
                defaultFlowDirection   : 'end',
            },
            expectedResult             : {
                flowDirection          : 'start',
                flowDirectionClassname : 'f-start',
            },
        },
        {
            title                      : 'resolves end flow direction from props ignoring option',
            props                      : {
                flowDirection          : 'end',
            },
            options                    : {
                defaultFlowDirection   : 'start',
            },
            expectedResult             : {
                flowDirection          : 'end',
                flowDirectionClassname : 'f-end',
            },
        },
        //#endregion direct resolution from props and/or options
        
        
        
        //#region cascade resolution from props and/or options
        {
            title                      : 'resolves start flow direction from parent',
            parentFlowDirection        : 'start',
            props                      : {
                flowDirection          : 'inherit',
            },
            expectedResult             : {
                flowDirection          : 'start',
                flowDirectionClassname : 'f-start',
            },
        },
        {
            title                      : 'resolves end flow direction from parent',
            parentFlowDirection        : 'end',
            props                      : {
                flowDirection          : 'inherit',
            },
            expectedResult             : {
                flowDirection          : 'end',
                flowDirectionClassname : 'f-end',
            },
        },
        {
            title                      : 'resolves start flow direction from inverted parent',
            parentFlowDirection        : 'end',
            props                      : {
                flowDirection          : 'invert',
            },
            expectedResult             : {
                flowDirection          : 'start',
                flowDirectionClassname : 'f-start',
            },
        },
        {
            title                      : 'resolves end flow direction from inverted parent',
            parentFlowDirection        : 'start',
            props                      : {
                flowDirection          : 'invert',
            },
            expectedResult             : {
                flowDirection          : 'end',
                flowDirectionClassname : 'f-end',
            },
        },
        
        
        {
            title                      : 'resolves start flow direction from parent ignoring option',
            parentFlowDirection        : 'start',
            props                      : {
                flowDirection          : 'inherit',
            },
            options                    : {
                defaultFlowDirection   : 'end',
            },
            expectedResult             : {
                flowDirection          : 'start',
                flowDirectionClassname : 'f-start',
            },
        },
        {
            title                      : 'resolves end flow direction from parent ignoring option',
            parentFlowDirection        : 'end',
            props                      : {
                flowDirection          : 'inherit',
            },
            options                    : {
                defaultFlowDirection   : 'start',
            },
            expectedResult             : {
                flowDirection          : 'end',
                flowDirectionClassname : 'f-end',
            },
        },
        {
            title                      : 'resolves start flow direction from inverted parent ignoring option',
            parentFlowDirection        : 'end',
            props                      : {
                flowDirection          : 'invert',
            },
            options                    : {
                defaultFlowDirection   : 'start',
            },
            expectedResult             : {
                flowDirection          : 'start',
                flowDirectionClassname : 'f-start',
            },
        },
        {
            title                      : 'resolves end flow direction from inverted parent ignoring option',
            parentFlowDirection        : 'start',
            props                      : {
                flowDirection          : 'invert',
            },
            options                    : {
                defaultFlowDirection   : 'end',
            },
            expectedResult             : {
                flowDirection          : 'end',
                flowDirectionClassname : 'f-end',
            },
        },
        //#endregion cascade resolution from props and/or options
    ])(
        `$title`,
        ({
            // Test Inputs:
            title,
            
            parentFlowDirection,
            props,
            options,
            
            
            
            // Expects:
            expectedResult,
        }) => {
            // Create a ref to peek the result:
            const resultRef = createRef<ResolvedFlowDirectionVariant>();
            
            
            
            // Render the mock component with the provided props and options:
            if (parentFlowDirection === undefined) {
                // Without parent flow direction:
                render(
                    <MockComponent {...props} options={options} resultRef={resultRef} />
                );
            }
            else {
                // With parent flow direction:
                render(
                    <FlowDirectionVariantProvider flowDirection={parentFlowDirection}>
                        <MockComponent {...props} options={options} resultRef={resultRef} />
                    </FlowDirectionVariantProvider>
                );
            } // if
            
            
            
            // Assert the result:
            expect(resultRef.current).toEqual(expectedResult);
        }
    );
});
