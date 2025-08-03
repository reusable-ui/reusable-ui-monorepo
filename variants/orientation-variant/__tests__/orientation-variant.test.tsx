import {
    default as React,
    type RefObject,
    useRef,
} from 'react'

import {
    type Orientation,
    type OrientationVariantProps,
    type OrientationVariantOptions,
    type ResolvedOrientationVariant,
} from '../dist/types.js'
import {
    finalDefaultOrientation,
} from '../dist/internal-defaults.js'
import {
    useOrientationVariant,
} from '../dist/orientation-variant.js'
import {
    OrientationVariantProvider,
} from '../dist/providers.js'

import { renderHook, render } from '@testing-library/react'
import '@testing-library/jest-dom'



// Tests:

/**
 * Defines a single test case for evaluating orientation variant.
 */
interface OrientationVariantTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title              : string
    
    /**
     * The parent orientation to use for the test.
     * Set to `undefined` for no parent orientation.
     */
    parentOrientation ?: Orientation
    
    /**
     * Props to pass to the `useOrientationVariant` hook.
     * Set to `undefined` for no props.
     */
    props             ?: OrientationVariantProps
    
    /**
     * An optional options for the `useOrientationVariant` hook.
     * Set to `undefined` for no options.
     */
    options           ?: OrientationVariantOptions
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected result of the `useOrientationVariant` hook.
     */
    expectedResult     : ResolvedOrientationVariant
}



// Mocks:
interface MockComponentProps
    // Bases:
    extends
        OrientationVariantProps
{
    /**
     * Passed options to the `useOrientationVariant` hook.
     */
    options   : OrientationVariantOptions | undefined
    
    /**
     * A ref to peek the result of the `useOrientationVariant` hook.
     */
    resultRef : RefObject<ResolvedOrientationVariant | undefined>
}

/**
 * A mock component for testing the `useOrientationVariant` hook.
 */
const MockComponent = (props: MockComponentProps) => {
    // Test the `useOrientationVariant` hook:
    const result = useOrientationVariant(props, props.options);
    
    // Peek the result:
    props.resultRef.current = result;
    
    // Return null since this is a mock component:
    // It does not render anything to the DOM.
    return null;
};



describe('useOrientationVariant()', () => {
    const createRef = <TRef extends unknown>() => renderHook(() => useRef<TRef | undefined>(undefined)).result.current;
    
    test.each<OrientationVariantTestCase>([
        //#region direct resolution from props and/or options
        {
            title                    : 'resolves inline orientation from props',
            props                    : {
                orientation          : 'inline',
            },
            expectedResult           : {
                orientation          : 'inline',
                orientationClassname : 'o-inline',
                isOrientationInline  : true,
                isOrientationBlock   : false,
                ariaOrientation      : 'horizontal',
            },
        },
        {
            title                    : 'resolves block orientation from props',
            props                    : {
                orientation          : 'block',
            },
            expectedResult           : {
                orientation          : 'block',
                orientationClassname : 'o-block',
                isOrientationInline  : false,
                isOrientationBlock   : true,
                ariaOrientation      : 'vertical',
            },
        },
        {
            title                    : 'uses default inline orientation when prop is missing',
            options                  : {
                defaultOrientation   : 'inline',
            },
            expectedResult           : {
                orientation          : 'inline',
                orientationClassname : 'o-inline',
                isOrientationInline  : true,
                isOrientationBlock   : false,
                ariaOrientation      : 'horizontal',
            },
        },
        {
            title                    : 'uses default block orientation when prop is missing',
            options                  : {
                defaultOrientation   : 'block',
            },
            expectedResult           : {
                orientation          : 'block',
                orientationClassname : 'o-block',
                isOrientationInline  : false,
                isOrientationBlock   : true,
                ariaOrientation      : 'vertical',
            },
        },
        {
            title                    : 'falls back to system default when prop and option are missing',
            expectedResult           : {
                orientation          : finalDefaultOrientation,
                orientationClassname : `o-${finalDefaultOrientation}`,
                isOrientationInline  : finalDefaultOrientation === 'inline',
                isOrientationBlock   : finalDefaultOrientation === 'block',
                ariaOrientation      : finalDefaultOrientation === 'inline' ? 'horizontal' : 'vertical',
            },
        },
        {
            title                    : 'falls back to system default when inheritance is missing',
            parentOrientation        : undefined,
            props                    : {
                orientation          : 'inherit',
            },
            expectedResult           : {
                orientation          : finalDefaultOrientation,
                orientationClassname : `o-${finalDefaultOrientation}`,
                isOrientationInline  : finalDefaultOrientation === 'inline',
                isOrientationBlock   : finalDefaultOrientation === 'block',
                ariaOrientation      : finalDefaultOrientation === 'inline' ? 'horizontal' : 'vertical',
            },
        },
        {
            title                    : 'falls back to system default when inverting is missing',
            parentOrientation        : undefined,
            props                    : {
                orientation          : 'invert',
            },
            expectedResult           : {
                orientation          : finalDefaultOrientation,
                orientationClassname : `o-${finalDefaultOrientation}`,
                isOrientationInline  : finalDefaultOrientation === 'inline',
                isOrientationBlock   : finalDefaultOrientation === 'block',
                ariaOrientation      : finalDefaultOrientation === 'inline' ? 'horizontal' : 'vertical',
            },
        },
        {
            title                    : 'resolves inline orientation from props ignoring option',
            props                    : {
                orientation          : 'inline',
            },
            options                  : {
                defaultOrientation   : 'block',
            },
            expectedResult           : {
                orientation          : 'inline',
                orientationClassname : 'o-inline',
                isOrientationInline  : true,
                isOrientationBlock   : false,
                ariaOrientation      : 'horizontal',
            },
        },
        {
            title                    : 'resolves block orientation from props ignoring option',
            props                    : {
                orientation          : 'block',
            },
            options                  : {
                defaultOrientation   : 'inline',
            },
            expectedResult           : {
                orientation          : 'block',
                orientationClassname : 'o-block',
                isOrientationInline  : false,
                isOrientationBlock   : true,
                ariaOrientation      : 'vertical',
            },
        },
        //#endregion direct resolution from props and/or options
        
        
        
        //#region cascade resolution from props and/or options
        {
            title                    : 'resolves inline orientation from parent',
            parentOrientation        : 'inline',
            props                    : {
                orientation          : 'inherit',
            },
            expectedResult           : {
                orientation          : 'inline',
                orientationClassname : 'o-inline',
                isOrientationInline  : true,
                isOrientationBlock   : false,
                ariaOrientation      : 'horizontal',
            },
        },
        {
            title                    : 'resolves block orientation from parent',
            parentOrientation        : 'block',
            props                    : {
                orientation          : 'inherit',
            },
            expectedResult           : {
                orientation          : 'block',
                orientationClassname : 'o-block',
                isOrientationInline  : false,
                isOrientationBlock   : true,
                ariaOrientation      : 'vertical',
            },
        },
        {
            title                    : 'resolves inline orientation from inverted parent',
            parentOrientation        : 'block',
            props                    : {
                orientation          : 'invert',
            },
            expectedResult           : {
                orientation          : 'inline',
                orientationClassname : 'o-inline',
                isOrientationInline  : true,
                isOrientationBlock   : false,
                ariaOrientation      : 'horizontal',
            },
        },
        {
            title                    : 'resolves block orientation from inverted parent',
            parentOrientation        : 'inline',
            props                    : {
                orientation          : 'invert',
            },
            expectedResult           : {
                orientation          : 'block',
                orientationClassname : 'o-block',
                isOrientationInline  : false,
                isOrientationBlock   : true,
                ariaOrientation      : 'vertical',
            },
        },
        
        
        {
            title                    : 'resolves inline orientation from parent ignoring option',
            parentOrientation        : 'inline',
            props                    : {
                orientation          : 'inherit',
            },
            options                  : {
                defaultOrientation   : 'block',
            },
            expectedResult           : {
                orientation          : 'inline',
                orientationClassname : 'o-inline',
                isOrientationInline  : true,
                isOrientationBlock   : false,
                ariaOrientation      : 'horizontal',
            },
        },
        {
            title                    : 'resolves block orientation from parent ignoring option',
            parentOrientation        : 'block',
            props                    : {
                orientation          : 'inherit',
            },
            options                  : {
                defaultOrientation   : 'inline',
            },
            expectedResult           : {
                orientation          : 'block',
                orientationClassname : 'o-block',
                isOrientationInline  : false,
                isOrientationBlock   : true,
                ariaOrientation      : 'vertical',
            },
        },
        {
            title                    : 'resolves inline orientation from inverted parent ignoring option',
            parentOrientation        : 'block',
            props                    : {
                orientation          : 'invert',
            },
            options                  : {
                defaultOrientation   : 'block',
            },
            expectedResult           : {
                orientation          : 'inline',
                orientationClassname : 'o-inline',
                isOrientationInline  : true,
                isOrientationBlock   : false,
                ariaOrientation      : 'horizontal',
            },
        },
        {
            title                    : 'resolves block orientation from inverted parent ignoring option',
            parentOrientation        : 'inline',
            props                    : {
                orientation          : 'invert',
            },
            options                  : {
                defaultOrientation   : 'inline',
            },
            expectedResult           : {
                orientation          : 'block',
                orientationClassname : 'o-block',
                isOrientationInline  : false,
                isOrientationBlock   : true,
                ariaOrientation      : 'vertical',
            },
        },
        //#endregion cascade resolution from props and/or options
    ])(
        `$title`,
        ({
            // Test Inputs:
            title,
            
            parentOrientation,
            props,
            options,
            
            
            
            // Expects:
            expectedResult,
        }) => {
            // Create a ref to peek the result:
            const resultRef = createRef<ResolvedOrientationVariant>();
            
            
            
            // Render the mock component with the provided props and options:
            if (parentOrientation === undefined) {
                // Without parent orientation:
                render(
                    <MockComponent {...props} options={options} resultRef={resultRef} />
                );
            }
            else {
                // With parent orientation:
                render(
                    <OrientationVariantProvider orientation={parentOrientation}>
                        <MockComponent {...props} options={options} resultRef={resultRef} />
                    </OrientationVariantProvider>
                );
            } // if
            
            
            
            // Assert the result:
            expect(resultRef.current).toEqual(expectedResult);
        }
    );
});
