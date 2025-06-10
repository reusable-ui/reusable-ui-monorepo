import {
    useMergeClasses,
} from '../dist/styles.js'

import { renderHook } from '@testing-library/react';



describe('useMergeClasses', () => {
    test('merges static class names', () => {
        const { result } = renderHook(() => useMergeClasses('base-class', 'extra-class'));
        
        expect(result.current).toEqual(['base-class', 'extra-class']);
    });
    
    test('filters out null, undefined, false, true values', () => {
        const { result } = renderHook(() => useMergeClasses(
            'valid-class',
            null,
            undefined,
            false,
            true,
            'another-class'
        ));
        
        expect(result.current).toEqual(['valid-class', 'another-class']);
    });
    
    test('handles conditional class names correctly', () => {
        const condition1 = true;
        const condition2 = false;
        const { result } = renderHook(() => useMergeClasses(
            'base-class',
            condition1 && 'conditional-true',
            condition2 && 'conditional-false' // Should not be included
        ));
        
        expect(result.current).toEqual(['base-class', 'conditional-true']);
    });
    
    test('flattens nested arrays of class names', () => {
        const { result } = renderHook(() => useMergeClasses([
            'nested-class-1',
            ['nested-class-2', ['nested-class-3']],
        ]));
        
        expect(result.current).toEqual(['nested-class-1', 'nested-class-2', 'nested-class-3']);
    });
    
    test('handles deeply nested conditional arrays', () => {
        const condition = true;
        const { result } = renderHook(() => useMergeClasses(
            condition && [['deep-class-1', ['deep-class-2']], 'deep-class-3']
        ));
        
        expect(result.current).toEqual(['deep-class-1', 'deep-class-2', 'deep-class-3']);
    });
    
    test('preserves space-separated class names', () => {
        const { result } = renderHook(() => useMergeClasses('class-1 class-2', 'class-3'));
        
        expect(result.current).toEqual(['class-1', 'class-2', 'class-3']);
    });
    
    test('handles mixed values in complex scenarios', () => {
        const condition1 = true;
        const condition2 = false;
        const { result } = renderHook(() => useMergeClasses(
            'static-class',
            condition1 ? ['true-class-1', 'true-class-2'] : 'false-class',
            condition2 ? 'should-not-appear' : ['valid-class'],
            ['nested-1', ['nested-2', ['nested-3']]],
            undefined,
            null,
        ));
        
        expect(result.current).toEqual([
            'static-class',
            'true-class-1', 'true-class-2',
            'valid-class',
            'nested-1', 'nested-2', 'nested-3',
        ]);
    });
    
    test('merges deeply nested conditional class names', () => {
        const condition1 = true;
        const condition2 = false;
        
        const { result } = renderHook(() => useMergeClasses([
            'base-class',
            condition1 ? [
                'conditional-class-1',
                condition2 ? 'should-not-appear' : 'conditional-class-2',
            ] : 'fallback-class',
            [['nested-class-1', ['nested-class-2', ['nested-class-3']]]],
            undefined,
            null,
        ]));
        
        expect(result.current).toEqual([
            'base-class',
            'conditional-class-1',
            'conditional-class-2',
            'nested-class-1',
            'nested-class-2',
            'nested-class-3'
        ]);
    });
    
    test('handles deeply nested dynamic overrides', () => {
        const isDarkMode = true;
        
        const { result } = renderHook(() => useMergeClasses([
            'layout-grid',
            [['gap-10', ['row-gap-5']]],
            isDarkMode ? ['bg-dark', 'text-light'] : ['bg-light'],
        ]));
        
        expect(result.current).toEqual([
            'layout-grid',
            'gap-10',
            'row-gap-5',
            'bg-dark',
            'text-light' // Applied due to isDarkMode being true
        ]);
    });
    
    test('ensures conditional class merging behaves correctly', () => {
        const isMobile = false;
        const isHighContrast = true;
        
        const { result } = renderHook(() => useMergeClasses(
            'base-font',
            isMobile ? 'mobile-font' : 'desktop-font',
            [['spacing-lg'], isHighContrast && [['contrast-high']]],
        ));
        
        expect(result.current).toEqual([
            'base-font',
            'desktop-font',
            'spacing-lg',
            'contrast-high' // Applied due to highContrast being true
        ]);
    });
    
    test('handles object-based conditional mapping', () => {
        const { result } = renderHook(() => useMergeClasses({
            primary: true,
            disabled: false,
            active: true,
        }));
        expect(result.current.join(' ')).toBe('primary active');
    });
    
    test('handles nested objects in arrays', () => {
        const { result } = renderHook(() => useMergeClasses([
            { primary: true, disabled: false },
            'btn',
            ['hover', { focus: true, hidden: false }]
        ]));
        expect(result.current.join(' ')).toBe('primary btn hover focus');
    });
    
    test('handles mixed objects, arrays, and strings', () => {
        const { result } = renderHook(() => useMergeClasses(
            'btn', { active: true }, ['hover', { focus: false }, 'rounded']
        ));
        expect(result.current.join(' ')).toBe('btn active hover rounded');
    });
    
    test('handles empty object without adding unnecessary space', () => {
        const { result } = renderHook(() => useMergeClasses({}));
        expect(result.current.join(' ')).toBe('');
    });
    
    test('handles deeply nested mapped objects', () => {
        const condition1 = true;
        const condition2 = false;
        const condition3 = true;
        
        const { result } = renderHook(() => useMergeClasses([
            { primary: true, secondary: false },
            ['btn', { danger: condition1, warning: condition2 }],
            { success: condition3 }
        ]));
        
        expect(result.current.join(' ')).toBe(
            [
                'primary',
                'btn',
                condition1 ? 'danger' : '',
                condition2 ? 'warning' : '',
                condition3 ? 'success' : ''
            ].filter(Boolean).join(' ')
        );
    });
    
    test('handles multiple mappings with mixed arrays and strings', () => {
        const isDark = true;
        const isLight = false;
        const hasBorder = true;
        
        const { result } = renderHook(() => useMergeClasses(
            'base',
            { darkMode: isDark, lightMode: isLight },
            ['rounded', { border: hasBorder }, 'shadow']
        ));
        
        expect(result.current.join(' ')).toBe(
            [
                'base',
                isDark ? 'darkMode' : '',
                isLight ? 'lightMode' : '',
                'rounded',
                hasBorder ? 'border' : '',
                'shadow'
            ].filter(Boolean).join(' ')
        );
    });
    
    test('handles objects inside arrays with deeply nested conditions', () => {
        const isActive = true;
        const isFaded = false;
        
        const { result } = renderHook(() => useMergeClasses([
            ['primary', { active: isActive }],
            [{ faded: isFaded }, 'secondary'],
        ]));
        
        expect(result.current.join(' ')).toBe(
            [
                'primary',
                isActive ? 'active' : '',
                isFaded ? 'faded' : '',
                'secondary'
            ].filter(Boolean).join(' ')
        );
    });
    
    test('preserves stable reference when classes remain unchanged', () => {
        const { result, rerender } = renderHook(({ inputs }) => useMergeClasses(...inputs), {
            initialProps: { inputs: ['btn', 'active'] }
        });
        
        const initialRef = result.current;
        rerender({ inputs: ['btn', 'active'] });
        
        expect(result.current).toBe(initialRef); // Ensures memoized reference stability
    });
});
