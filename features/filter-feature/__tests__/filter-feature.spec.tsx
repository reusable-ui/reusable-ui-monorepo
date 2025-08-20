import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { type FilterFeatureTestProps, FilterFeatureTest } from './FilterFeatureTest.js';



interface FilterFeatureTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title            : string
    
    /**
     * Props to pass to the `<FilterFeatureTest>` component.
     * Set to `undefined` for no props.
     */
    props           ?: FilterFeatureTestProps
    
    
    
    // Expected Outcomes:
    /**
     * The expected filter names, separated by comma.
     */
    expectedFilters  : string
}



test.describe('usesFilterFeature', () => {
    for (const { title, props, expectedFilters } of [
        {
            title            : 'no filter',
            props            : {
                filterCustom : 'filterNoCustomStyle',
            },
            expectedFilters  : 'brightness(1) brightness(1) brightness(1)',
        },
        {
            title            : 'should render 1 filter',
            props            : {
                filterCustom : 'filterNoCustomStyle',
                filter1      : true,
            },
            expectedFilters  : 'brightness(0.44) brightness(1) brightness(1)',
        },
        {
            title            : 'should render 2 filter',
            props            : {
                filterCustom : 'filterNoCustomStyle',
                filter1      : true,
                filter3      : true,
            },
            expectedFilters  : 'brightness(0.44) brightness(1) sepia(0.66)',
        },
        {
            title            : 'should render 3 filter',
            props            : {
                filterCustom : 'filterNoCustomStyle',
                filter1      : true,
                filter2      : true,
                filter3      : true,
            },
            expectedFilters  : 'brightness(0.44) grayscale(0.55) sepia(0.66)',
        },
        
        {
            title            : 'with simple custom filter',
            props            : {
                filterCustom : 'filterSimpleCustomStyle',
            },
            expectedFilters  : 'contrast(0.77) brightness(1) brightness(1) brightness(1)',
        },
        {
            title            : 'should render 1 filter with simple custom filter',
            props            : {
                filterCustom : 'filterSimpleCustomStyle',
                filter1      : true,
            },
            expectedFilters  : 'contrast(0.77) brightness(0.44) brightness(1) brightness(1)',
        },
        {
            title            : 'should render 2 filter with simple custom filter',
            props            : {
                filterCustom : 'filterSimpleCustomStyle',
                filter1      : true,
                filter3      : true,
            },
            expectedFilters  : 'contrast(0.77) brightness(0.44) brightness(1) sepia(0.66)',
        },
        {
            title            : 'should render 3 filter with simple custom filter',
            props            : {
                filterCustom : 'filterSimpleCustomStyle',
                filter1      : true,
                filter2      : true,
                filter3      : true,
            },
            expectedFilters  : 'contrast(0.77) brightness(0.44) grayscale(0.55) sepia(0.66)',
        },
        
        {
            title            : 'with single custom filter',
            props            : {
                filterCustom : 'filterSingleCustomStyle',
            },
            expectedFilters  : 'opacity(0.88) brightness(1) brightness(1) brightness(1)',
        },
        {
            title            : 'should render 1 filter with single custom filter',
            props            : {
                filterCustom : 'filterSingleCustomStyle',
                filter1      : true,
            },
            expectedFilters  : 'opacity(0.88) brightness(0.44) brightness(1) brightness(1)',
        },
        {
            title            : 'should render 2 filter with single custom filter',
            props            : {
                filterCustom : 'filterSingleCustomStyle',
                filter1      : true,
                filter3      : true,
            },
            expectedFilters  : 'opacity(0.88) brightness(0.44) brightness(1) sepia(0.66)',
        },
        {
            title            : 'should render 3 filter with single custom filter',
            props            : {
                filterCustom : 'filterSingleCustomStyle',
                filter1      : true,
                filter2      : true,
                filter3      : true,
            },
            expectedFilters  : 'opacity(0.88) brightness(0.44) grayscale(0.55) sepia(0.66)',
        },
        
        {
            title            : 'with single !important custom filter',
            props            : {
                filterCustom : 'filterSingleImportantCustomStyle',
            },
            expectedFilters  : 'opacity(0.99) brightness(1) brightness(1) brightness(1)',
        },
        {
            title            : 'should render 1 filter with single !important custom filter',
            props            : {
                filterCustom : 'filterSingleImportantCustomStyle',
                filter1      : true,
            },
            expectedFilters  : 'opacity(0.99) brightness(0.44) brightness(1) brightness(1)',
        },
        {
            title            : 'should render 2 filter with single !important custom filter',
            props            : {
                filterCustom : 'filterSingleImportantCustomStyle',
                filter1      : true,
                filter3      : true,
            },
            expectedFilters  : 'opacity(0.99) brightness(0.44) brightness(1) sepia(0.66)',
        },
        {
            title            : 'should render 3 filter with single !important custom filter',
            props            : {
                filterCustom : 'filterSingleImportantCustomStyle',
                filter1      : true,
                filter2      : true,
                filter3      : true,
            },
            expectedFilters  : 'opacity(0.99) brightness(0.44) grayscale(0.55) sepia(0.66)',
        },
        
        {
            title            : 'with multiple custom filter',
            props            : {
                filterCustom : 'filterMultipleCustomStyle',
            },
            expectedFilters  : 'sepia(0.11) sepia(0.22) sepia(0.33) brightness(1) brightness(1) brightness(1)',
        },
        {
            title            : 'should render 1 filter with multiple custom filter',
            props            : {
                filterCustom : 'filterMultipleCustomStyle',
                filter1      : true,
            },
            expectedFilters  : 'sepia(0.11) sepia(0.22) sepia(0.33) brightness(0.44) brightness(1) brightness(1)',
        },
        {
            title            : 'should render 2 filter with multiple custom filter',
            props            : {
                filterCustom : 'filterMultipleCustomStyle',
                filter1      : true,
                filter3      : true,
            },
            expectedFilters  : 'sepia(0.11) sepia(0.22) sepia(0.33) brightness(0.44) brightness(1) sepia(0.66)',
        },
        {
            title            : 'should render 3 filter with multiple custom filter',
            props            : {
                filterCustom : 'filterMultipleCustomStyle',
                filter1      : true,
                filter2      : true,
                filter3      : true,
            },
            expectedFilters  : 'sepia(0.11) sepia(0.22) sepia(0.33) brightness(0.44) grayscale(0.55) sepia(0.66)',
        },
        
        {
            title            : 'with multiple !important custom filter',
            props            : {
                filterCustom : 'filterMultipleImportantCustomStyle',
            },
            expectedFilters  : 'invert(0.11) invert(0.22) invert(0.33) brightness(1) brightness(1) brightness(1)',
        },
        {
            title            : 'should render 1 filter with multiple !important custom filter',
            props            : {
                filterCustom : 'filterMultipleImportantCustomStyle',
                filter1      : true,
            },
            expectedFilters  : 'invert(0.11) invert(0.22) invert(0.33) brightness(0.44) brightness(1) brightness(1)',
        },
        {
            title            : 'should render 2 filter with multiple !important custom filter',
            props            : {
                filterCustom : 'filterMultipleImportantCustomStyle',
                filter1      : true,
                filter3      : true,
            },
            expectedFilters  : 'invert(0.11) invert(0.22) invert(0.33) brightness(0.44) brightness(1) sepia(0.66)',
        },
        {
            title            : 'should render 3 filter with multiple !important custom filter',
            props            : {
                filterCustom : 'filterMultipleImportantCustomStyle',
                filter1      : true,
                filter2      : true,
                filter3      : true,
            },
            expectedFilters  : 'invert(0.11) invert(0.22) invert(0.33) brightness(0.44) grayscale(0.55) sepia(0.66)',
        },
    ] satisfies FilterFeatureTestCase[]) {
        test(title, async ({ mount }) => {
            const component = await mount(<FilterFeatureTest {...(props ?? {})} />);
            const box = component.getByTestId('filter-feature-test')
            
            await expect(box).toContainText('Filter Feature Test');
            
            // Check computed filters
            const filters = await box.evaluate(async (element) => {
                // Wait for a brief moment to ensure the styling has fully applied:
                await new Promise<void>((resolve) => {
                    setTimeout(resolve, 500);
                });
                
                // Peek the style:
                const computed = getComputedStyle(element);
                return {
                    filter : computed.filter,
                };
            });
            
            expect(filters.filter).toEqual(expectedFilters);
        });
    } // for
});
