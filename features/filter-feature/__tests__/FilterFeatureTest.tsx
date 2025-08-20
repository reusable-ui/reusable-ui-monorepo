import React from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useFilterFeatureTestStyles } from './FilterFeatureTest.loader.js'

export interface FilterFeatureTestProps {
    filterCustom ?: keyof ReturnType<typeof useFilterFeatureTestStyles>
    filter1      ?: boolean
    filter2      ?: boolean
    filter3      ?: boolean
}
export const FilterFeatureTest = (props: FilterFeatureTestProps) => {
    const {
        filterCustom = 'filterNoCustomStyle',
        filter1 = false,
        filter2 = false,
        filter3 = false,
    } = props;
    
    const styles = useFilterFeatureTestStyles();
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="filter-feature-test"
                className={`${styles[filterCustom]} ${filter1 ? 'filter1' : ''} ${filter2 ? 'filter2' : ''} ${filter3 ? 'filter3' : ''}`}
            >
                Filter Feature Test
            </div>
        </div>
    );
};
