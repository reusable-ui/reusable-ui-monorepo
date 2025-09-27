import {
    default as React,
    type RefObject,
    useRef,
} from 'react'

import {
    type BasicSize,
    type SizeVariantProps,
    type SizeVariantOptions,
    type SizeVariant,
} from '../dist/types.js'
import {
    defaultEffectiveSize,
    defaultSupportedSizes,
} from '../dist/internal-defaults.js'
import {
    useSizeVariant,
} from '../dist/size-variant.js'
import {
    SizeVariantProvider,
} from '../dist/providers.js'

import { renderHook, render } from '@testing-library/react'
import '@testing-library/jest-dom'



// Tests:

/**
 * Defines a single test case for evaluating size variant.
 */
interface SizeVariantTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title           : string
    
    /**
     * The parent size to use for the test.
     * Set to `undefined` for no parent size.
     */
    parentSize    ?: BasicSize | (string & {})
    
    /**
     * Props to pass to the `useSizeVariant` hook.
     * Set to `undefined` for no props.
     */
    props          ?: SizeVariantProps<BasicSize | (string & {})>
    
    /**
     * An optional options for the `useSizeVariant` hook.
     * Set to `undefined` for no options.
     */
    options        ?: SizeVariantOptions<BasicSize | (string & {})>
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected result of the `useSizeVariant` hook.
     */
    expectedResult  : SizeVariant<BasicSize | (string & {})>
}



// Mocks:
interface MockComponentProps
    // Bases:
    extends
        SizeVariantProps<BasicSize | (string & {})>
{
    /**
     * Passed options to the `useSizeVariant` hook.
     */
    options   : SizeVariantOptions<BasicSize | (string & {})> | undefined
    
    /**
     * A ref to peek the result of the `useSizeVariant` hook.
     */
    resultRef : RefObject<SizeVariant<BasicSize | (string & {})> | undefined>
}

/**
 * A mock component for testing the `useSizeVariant` hook.
 */
const MockComponent = (props: MockComponentProps) => {
    // Test the `useSizeVariant` hook:
    const result = useSizeVariant(props, props.options as any);
    
    // Peek the result:
    props.resultRef.current = result;
    
    // Return null since this is a mock component:
    // It does not render anything to the DOM.
    return null;
};



const allSizes : (BasicSize | (string & {}))[] = [
    'xxs',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'xxl',
    '1em',
    '1lh',
    'tiny',
    'giant',
    'giga',
];



describe('useSizeVariant()', () => {
    const createRef = <TRef extends unknown>() => renderHook(() => useRef<TRef | undefined>(undefined)).result.current;
    
    test.each<SizeVariantTestCase>([
        //#region direct resolution from props and/or options
        {
            title              : 'resolves sm size from props',
            props              : {
                size           : 'sm',
            },
            expectedResult     : {
                size           : 'sm',
                sizeClassname  : 's-sm',
            },
        },
        {
            title              : 'resolves lg size from props',
            props              : {
                size           : 'lg',
            },
            expectedResult     : {
                size           : 'lg',
                sizeClassname  : 's-lg',
            },
        },
        ...allSizes.map((size) => ({
            title              : `resolves ${size} size from props`,
            props              : {
                size           : size,
            },
            expectedResult     : {
                size           : size,
                sizeClassname  : `s-${size}`,
            },
        }) satisfies SizeVariantTestCase),
        
        {
            title              : 'uses default sm size when prop is missing',
            options            : {
                defaultSize    : 'sm',
                supportedSizes : allSizes,
            },
            expectedResult     : {
                size           : 'sm',
                sizeClassname  : 's-sm',
            },
        },
        {
            title              : 'uses default lg size when prop is missing',
            options            : {
                defaultSize    : 'lg',
                supportedSizes : allSizes,
            },
            expectedResult     : {
                size           : 'lg',
                sizeClassname  : 's-lg',
            },
        },
        ...allSizes.map((size) => ({
            title              : `uses default ${size} size when prop is missing`,
            options            : {
                defaultSize    : size,
                supportedSizes : allSizes,
            },
            expectedResult     : {
                size           : size,
                sizeClassname  : `s-${size}`,
            },
        }) satisfies SizeVariantTestCase),
        
        {
            title              : 'falls back to system default when prop and option are missing',
            expectedResult     : {
                size           : defaultEffectiveSize,
                sizeClassname  : `s-${defaultEffectiveSize}`,
            },
        },
        ...allSizes.map((size) => ({
            title              : `falls back to parent's: ${size} (or default size) when prop and option are missing`,
            parentSize         : size,
            expectedResult     : {
                size           : (defaultSupportedSizes as string[]).includes(size) ? size        : defaultEffectiveSize,
                sizeClassname  : (defaultSupportedSizes as string[]).includes(size) ? `s-${size}` : `s-${defaultEffectiveSize}`,
            },
        }) satisfies SizeVariantTestCase),
        {
            title              : 'falls back to system default when inheritance is missing',
            parentSize         : undefined,
            props              : {
                size           : 'inherit',
            },
            expectedResult     : {
                size           : defaultEffectiveSize,
                sizeClassname  : `s-${defaultEffectiveSize}`,
            },
        },
        
        {
            title              : 'resolves sm size from props ignoring option',
            props              : {
                size           : 'sm',
            },
            options            : {
                defaultSize    : 'lg',
                supportedSizes : allSizes,
            },
            expectedResult     : {
                size           : 'sm',
                sizeClassname  : 's-sm',
            },
        },
        {
            title              : 'resolves lg size from props ignoring option',
            props              : {
                size           : 'lg',
            },
            options            : {
                defaultSize    : 'sm',
                supportedSizes : allSizes,
            },
            expectedResult     : {
                size           : 'lg',
                sizeClassname  : 's-lg',
            },
        },
        ...allSizes.map((size) => ({
            title              : `resolves ${size} size from props ignoring option`,
            props              : {
                size           : size,
            },
            options            : {
                defaultSize    : 'whatever',
                supportedSizes : allSizes,
            },
            expectedResult     : {
                size           : size,
                sizeClassname  : `s-${size}`,
            },
        }) satisfies SizeVariantTestCase),
        //#endregion direct resolution from props and/or options
        
        
        
        //#region cascade resolution from props and/or options
        {
            title              : 'resolves sm size from parent',
            parentSize         : 'sm',
            props              : {
                size           : 'inherit',
            },
            expectedResult     : {
                size           : 'sm',
                sizeClassname  : 's-sm',
            },
        },
        {
            title              : 'resolves lg size from parent',
            parentSize         : 'lg',
            props              : {
                size           : 'inherit',
            },
            expectedResult     : {
                size           : 'lg',
                sizeClassname  : 's-lg',
            },
        },
        ...allSizes.map((size) => ({
            title              : `resolves ${size} size from parent`,
            parentSize         : size,
            props              : {
                size           : 'inherit',
            },
            expectedResult     : {
                size           : (defaultSupportedSizes as string[]).includes(size) ? size        : defaultEffectiveSize,
                sizeClassname  : (defaultSupportedSizes as string[]).includes(size) ? `s-${size}` : `s-${defaultEffectiveSize}`,
            },
        }) satisfies SizeVariantTestCase),
        {
            title              : 'uses default md size when parent`s size unsupported',
            parentSize         : 'weired',
            props              : {
                size           : 'inherit',
            },
            expectedResult     : {
                size           : 'md',
                sizeClassname  : 's-md',
            },
        },
        // {
        //     title              : 'uses default sm size when parent`s size unsupported',
        //     parentSize         : 'weired',
        //     props              : {
        //         size           : 'inherit',
        //     },
        //     options            : {
        //         defaultSize    : 'sm',
        //         supportedSizes : allSizes,
        //     },
        //     expectedResult     : {
        //         size           : 'sm',
        //         sizeClassname  : 's-sm',
        //     },
        // },
        // ...allSizes.map((size) => ({
        //     title              : `uses default ${size} size when parent's size unsupported`,
        //     parentSize         : 'weired',
        //     props              : {
        //         size           : 'inherit',
        //     },
        //     options            : {
        //         defaultSize    : size,
        //         supportedSizes : allSizes,
        //     },
        //     expectedResult     : {
        //         size           : size,
        //         sizeClassname  : `s-${size}`,
        //     },
        // }) satisfies SizeVariantTestCase),
        
        
        {
            title              : 'resolves sm size from parent ignoring option',
            parentSize         : 'sm',
            props              : {
                size           : 'inherit',
            },
            options            : {
                defaultSize    : 'lg',
                supportedSizes : allSizes,
            },
            expectedResult     : {
                size           : 'sm',
                sizeClassname  : 's-sm',
            },
        },
        {
            title              : 'resolves lg size from parent ignoring option',
            parentSize         : 'lg',
            props              : {
                size           : 'inherit',
            },
            options            : {
                defaultSize    : 'sm',
                supportedSizes : allSizes,
            },
            expectedResult     : {
                size           : 'lg',
                sizeClassname  : 's-lg',
            },
        },
        ...allSizes.map((size) => ({
            title              : `resolves ${size} size from parent ignoring option`,
            parentSize         : size,
            props              : {
                size           : 'inherit',
            },
            options            : {
                defaultSize    : 'whatever',
                supportedSizes : allSizes,
            },
            expectedResult     : {
                size           : size,
                sizeClassname  : `s-${size}`,
            },
        }) satisfies SizeVariantTestCase),
        //#endregion cascade resolution from props and/or options
    ])(
        `$title`,
        ({
            // Test Inputs:
            title,
            
            parentSize,
            props,
            options,
            
            
            
            // Expects:
            expectedResult,
        }) => {
            // Create a ref to peek the result:
            const resultRef = createRef<SizeVariant<BasicSize | (string & {})>>();
            
            
            
            // Render the mock component with the provided props and options:
            if (parentSize === undefined) {
                // Without parent size:
                render(
                    <MockComponent {...props} options={options} resultRef={resultRef} />
                );
            }
            else {
                // With parent size:
                render(
                    <SizeVariantProvider<BasicSize | (string & {})> size={parentSize}>
                        <MockComponent {...props} options={options} resultRef={resultRef} />
                    </SizeVariantProvider>
                );
            } // if
            
            
            
            // Assert the result:
            expect(resultRef.current).toEqual(expectedResult);
        }
    );
});
