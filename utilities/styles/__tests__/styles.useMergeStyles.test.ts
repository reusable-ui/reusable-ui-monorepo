import {
    useMergeStyles,
} from '../dist/styles.js'

import { renderHook } from '@testing-library/react';



describe('useMergeStyles', () => {
    test('merges multiple style objects', () => {
        const { result } = renderHook(() => useMergeStyles(
            { color: 'red' },
            { padding: '10px' }
        ));
        
        expect(result.current).toEqual({ color: 'red', padding: '10px' });
    });
    
    test('filters out null, undefined, false, and true values', () => {
        const { result } = renderHook(() => useMergeStyles(
            { color: 'red' },
            null,
            undefined,
            false,
            true,
            { margin: '5px' }
        ));
        
        expect(result.current).toEqual({ color: 'red', margin: '5px' });
    });
    
    test('handles deeply nested style objects', () => {
        const { result } = renderHook(() => useMergeStyles([
            { color: 'blue' },
            [{ padding: '20px' }, [{ border: '1px solid black' }]]
        ]));
        
        expect(result.current).toEqual({
            color: 'blue',
            padding: '20px',
            border: '1px solid black'
        });
    });
    
    test('overrides duplicate style properties', () => {
        const { result } = renderHook(() => useMergeStyles(
            { color: 'red' },
            { color: 'blue' }
        ));
        
        expect(result.current).toEqual({ color: 'blue' });
    });
    
    test('preserves stable reference when styles remain unchanged', () => {
        const { result, rerender } = renderHook((styles) => useMergeStyles(styles), {
            initialProps: [{ color: 'red' }]
        });
        
        const initialRef = result.current;
        rerender([{ color: 'red' }]);
        
        expect(result.current).toBe(initialRef); // Ensures memoized reference stability
    });
    
    test('handles conditional styles dynamically', () => {
        const condition = true;
        const { result } = renderHook(() => useMergeStyles(
            { color: 'black' },
            condition && { fontSize: '16px' }
        ));
        
        expect(result.current).toEqual({ color: 'black', fontSize: '16px' });
    });
    
    test('handles mixed values in complex scenarios', () => {
        const condition1 = true;
        const condition2 = false;
        const { result } = renderHook(() => useMergeStyles(
            { display: 'flex' },
            condition1 ? [{ fontSize: '14px' }, { fontWeight: 'bold' }] : { textAlign: 'center' },
            condition2 ? {
                // @ts-ignore
                shouldNotAppear: true
            } : [{ padding: '8px' }],
            [{ borderRadius: '5px' }, [{ opacity: 0.5 }]],
            undefined,
            null
        ));
        
        expect(result.current).toEqual({
            display: 'flex',
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '8px',
            borderRadius: '5px',
            opacity: 0.5
        });
    });
    
    test('merges deeply nested conditional styles', () => {
        const condition1 = true;
        const condition2 = false;
        
        const { result } = renderHook(() => useMergeStyles([
            { display: 'flex' },
            condition1 ? [
                { color: 'blue' },
                condition2 ? {
                    // @ts-ignore
                    shouldNotAppear: 'error' } : { fontSize: '16px' },
            ] : { background: 'red' },
            [{ padding: '10px' }, [{ margin: '5px' }]],
            undefined,
            null,
        ]));
        
        expect(result.current).toEqual({
            display: 'flex',
            color: 'blue', // Applied because condition1 is true
            fontSize: '16px', // Applied because condition2 is false
            padding: '10px',
            margin: '5px',
        });
    });
    
    test('handles deeply nested dynamic overrides', () => {
        const darkMode = true;
        
        const { result } = renderHook(() => useMergeStyles([
            { display: 'grid' },
            [{ gap: '10px' }, [{ rowGap: '5px' }]],
            darkMode ? [{ backgroundColor: 'black' }, { color: 'white' }] : [{ backgroundColor: 'white' }],
        ]));
        
        expect(result.current).toEqual({
            display: 'grid',
            gap: '10px',
            rowGap: '5px',
            backgroundColor: 'black',
            color: 'white', // Applied due to darkMode being true
        });
    });
    
    test('ensures conditional styles deep merge correctly', () => {
        const mobile = false;
        const highContrast = true;
        
        const { result } = renderHook(() => useMergeStyles(
            { fontFamily: 'Arial' },
            mobile ? { fontSize: '14px' } : { fontSize: '18px' },
            [{ lineHeight: '1.5' }, highContrast && [{ letterSpacing: '1px' }]],
        ));
        
        expect(result.current).toEqual({
            fontFamily: 'Arial',
            fontSize: '18px', // Applied because mobile is false
            lineHeight: '1.5',
            letterSpacing: '1px', // Applied due to highContrast being true
        });
    });
});
