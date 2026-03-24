import React, { type CSSProperties, useMemo } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { usesViewState } from '@reusable-ui/view-state'
import { useViewEffectTestStyles } from './ViewEffectTest.loader.js'
import { viewIndices } from './view-indices.js'
import { type CssViewEffectOptions } from '../dist/index.js'



export interface ViewEffectTestProps
    extends
        // Bases:
        Required<Pick<CssViewEffectOptions, 'orientation' | 'flowDirection' | 'enablesSelectiveRendering'>>
{
    /**
     * 
     */
    prevViewIndex   : number | 'unset'
    
    /**
     * 
     */
    viewIndex       : number
    
    /**
     * Simulates the `viewFactorCond` CSS variable.
     * 
     * Typical values:
     * - `'unset'` : fully settled
     * - `0`       : start of sliding
     * - `0.5`     : halfway through the next target view
     * - `1`       : the next target view is fully slid into place
     * - `-0.5`    : halfway through the previous target view
     * - `-1`      : the previous target view is fully slid into place
     */
    viewFactorCond ?: 'unset' | number
}

/**
 * Test component for ViewEffect.
 * 
 * - Mocks `viewFactorCond` via inline style for controlled testing.
 * - Uses static colors for simplicity:
 *   - Regular background  → pure blue   `oklch(0.5 0.3 265 / 1)`
 *   - Outlined background → transparent `oklch(0 0 0 / 0)`
 *   - Mild background     → light blue  `oklch(0.7 0.2 265 / 1)`
 */
export const ViewEffectTest = (props: ViewEffectTestProps) => {
    const {
        prevViewIndex,
        viewIndex,
        viewFactorCond = 'unset',
        
        orientation,
        flowDirection,
        enablesSelectiveRendering,
    } = props;
    
    const styles = useViewEffectTestStyles();
    
    const { viewStateVars  : {  prevViewIndex: prevViewIndexVar, viewIndex: viewIndexVar, viewFactor: viewFactorVar, viewFactorCond: viewFactorCondVar } } = usesViewState();
    
    // Inline style overrides:
    // - Assigns `viewFactorCond` directly
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
        ]: String((viewFactorCond === 'unset') ? 0 : viewFactorCond),
        
        // @ts-ignore
        [
            viewFactorCondVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(viewFactorCond),
    } as CSSProperties), [prevViewIndex, viewIndex, viewFactorCond]);
    
    // Determine the range of visible views, including during transitions:
    const fromIndex = (viewFactorCond === 'unset') ? viewIndex : ((prevViewIndex !== 'unset') ? prevViewIndex : viewIndex);
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
                className={`${styles.main} is-${orientation}-orientation is-${flowDirection}-direction ${enablesSelectiveRendering ? 'enablesSelectiveRendering' : ''}`}
                style={inlineStyle}
            >
                <span className='label'>
                    View Effect Test
                </span>
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
