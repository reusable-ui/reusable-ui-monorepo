import {
    mergeClasses,
} from '../dist/styles.js'



describe('mergeClasses', () => {
    test('merges static class names', () => {
        expect(mergeClasses('base-class', 'extra-class')).toBe('base-class extra-class');
    });
    
    test('filters out null, undefined, false, and true values', () => {
        expect(mergeClasses('valid-class', null, undefined, false, true, 'another-class'))
            .toBe('valid-class another-class');
    });
    
    test('handles conditional class names correctly', () => {
        const condition1 = true;
        const condition2 = false;
        expect(mergeClasses(
            'base-class',
            condition1 && 'conditional-true',
            condition2 && 'conditional-false' // Should not be included
        )).toBe('base-class conditional-true');
    });
    
    test('flattens nested arrays of class names', () => {
        expect(mergeClasses([
            'nested-class-1',
            ['nested-class-2', ['nested-class-3']]
        ])).toBe('nested-class-1 nested-class-2 nested-class-3');
    });
    
    test('handles deeply nested conditional arrays', () => {
        const condition = true;
        expect(mergeClasses(
            condition && [['deep-class-1', ['deep-class-2']], 'deep-class-3']
        )).toBe('deep-class-1 deep-class-2 deep-class-3');
    });
    
    test('preserves space-separated class names', () => {
        expect(mergeClasses('class-1 class-2', 'class-3'))
            .toBe('class-1 class-2 class-3');
    });
    
    test('handles mixed values in complex scenarios', () => {
        const condition1 = true;
        const condition2 = false;
        expect(mergeClasses(
            'static-class',
            condition1 ? ['true-class-1', 'true-class-2'] : 'false-class',
            condition2 ? 'should-not-appear' : ['valid-class'],
            ['nested-1', ['nested-2', ['nested-3']]],
            undefined,
            null
        )).toBe('static-class true-class-1 true-class-2 valid-class nested-1 nested-2 nested-3');
    });
    
    test('merges deeply nested conditional class names', () => {
        const condition1 = true;
        const condition2 = false;
        
        expect(mergeClasses([
            'base-class',
            condition1 ? [
                'conditional-class-1',
                condition2 ? 'should-not-appear' : 'conditional-class-2',
            ] : 'fallback-class',
            [['nested-class-1', ['nested-class-2', ['nested-class-3']]]],
            undefined,
            null,
        ])).toBe('base-class conditional-class-1 conditional-class-2 nested-class-1 nested-class-2 nested-class-3');
    });
    
    test('handles deeply nested dynamic overrides', () => {
        const isDarkMode = true;
        
        expect(mergeClasses([
            'layout-grid',
            [['gap-10', ['row-gap-5']]],
            isDarkMode ? ['bg-dark', 'text-light'] : ['bg-light'],
        ])).toBe('layout-grid gap-10 row-gap-5 bg-dark text-light'); // Applied due to isDarkMode being true
    });
    
    test('ensures conditional class merging behaves correctly', () => {
        const isMobile = false;
        const isHighContrast = true;
        
        expect(mergeClasses(
            'base-font',
            isMobile ? 'mobile-font' : 'desktop-font',
            [['spacing-lg'], isHighContrast && [['contrast-high']]],
        )).toBe('base-font desktop-font spacing-lg contrast-high');
    });
    
    test('handles object-based conditional mapping', () => {
        expect(mergeClasses({
            primary: true,
            disabled: false,
            active: true,
        })).toBe('primary active');
    });
    
    test('handles nested objects in arrays', () => {
        expect(mergeClasses([
            { primary: true, disabled: false },
            'btn',
            ['hover', { focus: true, hidden: false }]
        ])).toBe('primary btn hover focus');
    });
    
    test('handles mixed objects, arrays, and strings', () => {
        expect(mergeClasses('btn', { active: true }, ['hover', { focus: false }, 'rounded'])).toBe('btn active hover rounded');
    });
    
    test('handles empty object without adding unnecessary space', () => {
        expect(mergeClasses({})).toBe('');
    });
    
    test('handles deeply nested mapped objects', () => {
        const condition1 = true;
        const condition2 = false;
        const condition3 = true;
        
        expect(mergeClasses([
            { primary: true, secondary: false },
            ['btn', { danger: condition1, warning: condition2 }],
            { success: condition3 }
        ])).toBe(
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
        
        expect(mergeClasses(
            'base',
            { darkMode: isDark, lightMode: isLight },
            ['rounded', { border: hasBorder }, 'shadow']
        )).toBe(
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
        
        expect(mergeClasses([
            ['primary', { active: isActive }],
            [{ faded: isFaded }, 'secondary'],
        ])).toBe(
            [
                'primary',
                isActive ? 'active' : '',
                isFaded ? 'faded' : '',
                'secondary'
            ].filter(Boolean).join(' ')
        );
    });
});
