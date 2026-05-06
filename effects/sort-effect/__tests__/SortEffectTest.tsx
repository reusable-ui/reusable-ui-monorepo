import React, { AnimationEvent as ReactAnimationEvent, type CSSProperties, type Key, useRef, useState, useMemo, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useSortEffectTestStyles } from './SortEffectTest.loader.js'
import { type SortStateProps, type SortStateClearProps, useSortBehaviorState, usesSortState } from '@reusable-ui/sort-state'
import { useMergeEventHandlers } from '@reusable-ui/callbacks'
import { createSyntheticEvent } from '@reusable-ui/events'
import { Product } from './product-types.js'
import { initialProducts } from './dummy-products.js'



export interface SortEffectTestProps
    extends
        SortStateProps<HTMLDivElement, Product[]>,
        SortStateClearProps,
        Pick<React.DOMAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd'>
{
    /**
     * Simulates the `sortBy` CSS variable.
     * 
     * - `'price'` : sort the items by price.
     * - `'name'`  : sort the items by name.
     */
    sortBy ?: 'price' | 'name'
    
    /**
     * Simulates the `sortFactor` CSS variable.
     * 
     * Typical values:
     * - `'unset'` : not sorting (idle).
     * - `1`       : full unsorted illusion (items offset back to their original unsorted positions).
     * - `0`       : fully sorted baseline (items settled into their new sorted positions).
     * - `0.5`     : halfway through transition
     * - `> 1`     : overshoot (bump effect)
     * - `< 0`     : undershoot (bounce back effect)
     */
    sortFactor  ?: 'unset' | number
}

/**
 * Test component for SortEffect.
 * 
 * - Mocks `sortFactor` via inline style for controlled testing.
 */
export const SortEffectTest = (props: SortEffectTestProps) => {
    const internalSortItemRefs = useRef<Map<Key, HTMLElement>>(new Map<Key, HTMLElement>());
    
    const [committedItems, setCommittedItems] = useState<Product[]>(() => Array.from(initialProducts.values()));
    
    const [internalStagedSortData, setInternalStagedSortData] = useState<Product[] | undefined>(undefined);
    
    const {
        sortBy = null,
        
        sortItemRefs          = internalSortItemRefs,
        stagedSortData        = internalStagedSortData,
        onSortCommit          = (stagedSortData) => {
            flushSync(() => {
                setCommittedItems(stagedSortData);
            });
        },
        onStagedSortDataClear = () => {
            setInternalStagedSortData(undefined);
        },
        
        onAnimationStart,
        onAnimationEnd,
        
        
        
        sortFactor = 'unset',
    } = props;
    
    const styles = useSortEffectTestStyles();
    
    const {
        sortClassname,
        sortStyles,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useSortBehaviorState({
        sortItemRefs,
        stagedSortData,
        onSortCommit,
        onStagedSortDataClear,
    }, {
        animationPattern: 'test-sorting',
    });
    
    const handleMergedAnimationStart = useMergeEventHandlers(
        handleAnimationStart,
        onAnimationStart,
    );
    const handleMergedAnimationEnd = useMergeEventHandlers(
        handleAnimationEnd,
        onAnimationEnd,
    );
    const handleMergedAnimationCancel = useMergeEventHandlers(
        handleAnimationCancel,
        onAnimationEnd,
    );
    
    const elementRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;
        
        const handleNativeAnimationCancel = (event: AnimationEvent): void => {
            console.log('animation canceled: ', event.animationName);
            handleMergedAnimationCancel(
                createSyntheticEvent({
                    nativeEvent : event,
                    currentTarget : element,
                }) as ReactAnimationEvent<HTMLDivElement>
            );
        };
        element.addEventListener('animationcancel', handleNativeAnimationCancel);
        
        return () => {
            element.removeEventListener('animationcancel', handleNativeAnimationCancel);
        };
    }, []);
    
    const { sortStateVars  : { sortFactor: sortFactorVar, sortFactorCond: sortFactorCondVar } } = usesSortState();
    
    // Inline style overrides:
    // - Assigns `sortFactor` directly
    const inlineStyle : CSSProperties = useMemo(() => ({
        // @ts-ignore
        [
            sortFactorVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: (sortFactor === 'unset') ? 0 : String(sortFactor),
        // @ts-ignore
        [
            sortFactorCondVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(sortFactor),
    } as CSSProperties), [sortFactorVar, sortFactor, sortFactorCondVar]);
    
    useEffect(() => {
        switch (sortBy) {
            case 'price': {
                const sortedData = committedItems.slice(0).sort((a, b) => a.price - b.price);
                setInternalStagedSortData(sortedData);
            } break;
            
            case 'name': {
                const sortedData = committedItems.slice(0).sort((a, b) => a.name.localeCompare(b.name));
                setInternalStagedSortData(sortedData);
            } break;
            
            default:
                // Noop, do not trigger sorting.
                break;
        }
    }, [sortBy]);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="sorting-effect-test"
                className={`${styles.main} ${sortClassname}`}
                onAnimationStart={handleMergedAnimationStart}
                onAnimationEnd={handleMergedAnimationEnd}
                style={inlineStyle}
            >
                <span className='label'>
                    Sorting Effect Test
                </span>
                <div className='items'>
                    {committedItems.map(({ id, name, price }) => (
                        <div
                            key={id}
                            ref={(element) => {
                                if (!element) return;
                                sortItemRefs.current.set(id, element);
                                return () => {
                                    sortItemRefs.current.delete(id);
                                };
                            }}
                            data-testid={id}
                            className='item'
                            style={sortStyles.get(id)}
                        >
                            <p>{name}</p>
                            <p>{price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
