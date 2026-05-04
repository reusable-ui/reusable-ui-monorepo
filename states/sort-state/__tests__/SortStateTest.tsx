import React, { AnimationEvent as ReactAnimationEvent, Key, useRef, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { type SortStateProps, type SortStateClearProps, useSortBehaviorState } from '../dist/index.js'
import { useMergeEventHandlers } from '@reusable-ui/callbacks'
import { createSyntheticEvent } from '@reusable-ui/events'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useSortStateTestStyles } from './SortStateTest.loader.js'
import { Product } from './product-types.js'
import { initialProducts } from './dummy-products.js'



export interface SortStateTestProps
    extends
        SortStateProps<HTMLDivElement, Product[]>,
        SortStateClearProps,
        Pick<React.DOMAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd'>
{
    sortBy ?: 'price' | 'name'
}
export const SortStateTest = (props: SortStateTestProps) => {
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
    } = props;
    
    const styles = useSortStateTestStyles();
    
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
                ref={elementRef}
                data-testid="sorting-state-test"
                className={`${styles.main} ${sortClassname}`}
                onAnimationStart={handleMergedAnimationStart}
                onAnimationEnd={handleMergedAnimationEnd}
            >
                <span className='label'>
                    Sorting State Test
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
