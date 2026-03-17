import React, { type CSSProperties, useMemo } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { usesViewState } from '@reusable-ui/view-state'
import { useViewEffectTestStyles } from './ViewEffectTest.loader.js'
import { viewIndices } from './view-indices.js'
import { type CssViewEffectOptions } from '../dist/index.js'



export interface ViewEffectTestProps
    extends
        Pick<CssViewEffectOptions, 'enablesSelectiveRendering'>
{
    /**
     * 
     */
    prevViewIndex : number | 'unset'
    
    /**
     * 
     */
    viewIndex     : number
    
    /**
     * Simulates the `viewIndexFactorCond` CSS variable.
     * 
     * Typical values:
     * - `'unset'` : fully settled
     * - `0`       : start of sliding
     * - `0.5`     : halfway through the next target view
     * - `1`       : the next target view is fully slid into place
     * - `-0.5`    : halfway through the previous target view
     * - `-1`      : the previous target view is fully slid into place
     */
    viewIndexFactorCond ?: 'unset' | number
}

/**
 * Test component for ViewEffect.
 * 
 * - Mocks `viewIndexFactorCond` via inline style for controlled testing.
 * - Uses static colors for simplicity:
 *   - Regular background  → pure blue   `oklch(0.5 0.3 265 / 1)`
 *   - Outlined background → transparent `oklch(0 0 0 / 0)`
 *   - Mild background     → light blue  `oklch(0.7 0.2 265 / 1)`
 */
export const ViewEffectTest = (props: ViewEffectTestProps) => {
    const {
        prevViewIndex,
        viewIndex,
        viewIndexFactorCond = 'unset',
        
        enablesSelectiveRendering = false,
    } = props;
    
    const styles = useViewEffectTestStyles();
    
    const { viewStateVars  : {  prevViewIndex: prevViewIndexVar, viewIndex: viewIndexVar, viewIndexFactor: viewFactorVar, viewIndexFactorCond: viewFactorCondVar } } = usesViewState();
    
    // Inline style overrides:
    // - Assigns `viewIndexFactorCond` directly
    // - Statically sets regular/mild background colors for predictable testing
    const inlineStyle : CSSProperties = useMemo(() => ({
        // @ts-ignore
        [
            prevViewIndexVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(prevViewIndex),
        
        // @ts-ignore
        [
            viewIndexVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(viewIndex),
        
        // @ts-ignore
        [
            viewFactorVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String((viewIndexFactorCond === 'unset') ? 0 : viewIndexFactorCond),
        
        // @ts-ignore
        [
            viewFactorCondVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(viewIndexFactorCond),
    } as CSSProperties), [prevViewIndex, viewIndex, viewIndexFactorCond]);
    
    // Determine the range of visible views, including during transitions:
    const fromIndex = (viewIndexFactorCond === 'unset') ? viewIndex : ((prevViewIndex !== 'unset') ? prevViewIndex : viewIndex);
    const toIndex   = viewIndex;
    const [minVisibleViewIndex, maxVisibleViewIndex] = (
        fromIndex < toIndex
        ? [fromIndex, toIndex]
        : [toIndex, fromIndex]
    );
    const minRenderViewIndex = Math.floor(minVisibleViewIndex);
    const maxRenderViewIndex = Math.ceil(maxVisibleViewIndex);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="view-effect-test"
                className={`${styles.main} ${enablesSelectiveRendering ? 'enablesSelectiveRendering' : ''}`}
                style={inlineStyle}
            >
                View Effect Test
                <div className='views'>
                    {viewIndices.map((viewIndex, currentIndex) =>
                        (!enablesSelectiveRendering || (currentIndex >= minRenderViewIndex && currentIndex <= maxRenderViewIndex)) && (<div
                            data-testid={`view-${viewIndex}`}
                            className='view'
                        >
                            View-{viewIndex}
                        </div>)
                    )}
                </div>
            </div>
        </div>
    );
};
