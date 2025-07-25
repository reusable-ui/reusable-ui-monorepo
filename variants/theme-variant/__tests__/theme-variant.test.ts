import {
    type ThemeVariantProps,
    type ThemeVariantOptions,
    type ResolvedThemeVariant,
    useThemeVariant,
} from '../dist/index.js'
import {
    defaultTheme,
} from '../dist/internal-defaults.js'



describe('useThemeVariant()', () => {
    test('resolves primary theme from props', () => {
        const props: ThemeVariantProps = { theme: 'primary' };
        const result = useThemeVariant(props);
        
        expect(result).toEqual({
            theme: 'primary',
            themeClassname: 't-primary',
        } satisfies ResolvedThemeVariant);
    });
    
    test('resolves danger theme from props', () => {
        const props: ThemeVariantProps = { theme: 'danger' };
        const result = useThemeVariant(props);
        
        expect(result).toEqual({
            theme: 'danger',
            themeClassname: 't-danger',
        } satisfies ResolvedThemeVariant);
    });
    
    test('resolves dark theme from props', () => {
        const props: ThemeVariantProps = { theme: 'dark' };
        const result = useThemeVariant(props);
        
        expect(result).toEqual({
            theme: 'dark',
            themeClassname: 't-dark',
        } satisfies ResolvedThemeVariant);
    });
    
    test('uses default theme when prop is missing', () => {
        const props: ThemeVariantProps = {};
        const options: ThemeVariantOptions = { defaultTheme: 'success' };
        
        const result = useThemeVariant(props, options);
        
        expect(result).toEqual({
            theme: 'success',
            themeClassname: 't-success',
        } satisfies ResolvedThemeVariant);
    });
    
    test('falls back to system default when prop and option are missing', () => {
        const result = useThemeVariant({});
        expect(result.theme).toBe(defaultTheme);
        expect(result.themeClassname).toBe(`t-${defaultTheme}`);
    });
    
    
    
    test('resolves custom theme: brand-accent', () => {
        const props: ThemeVariantProps<'brand-accent'> = { theme: 'brand-accent' };
        const result = useThemeVariant(props);
        
        expect(result).toEqual({
            theme: 'brand-accent',
            themeClassname: 't-brand-accent',
        } satisfies ResolvedThemeVariant<'brand-accent'>);
    });
    
    test('resolves custom theme: soft-muted', () => {
        const props: ThemeVariantProps<'soft-muted'> = { theme: 'soft-muted' };
        const result = useThemeVariant(props);
        
        expect(result).toEqual({
            theme: 'soft-muted',
            themeClassname: 't-soft-muted',
        } satisfies ResolvedThemeVariant<'soft-muted'>);
    });
    
    test('uses custom default theme: soft-muted', () => {
        const props: ThemeVariantProps<'soft-muted'> = {};
        const options: ThemeVariantOptions<'soft-muted'> = { defaultTheme: 'soft-muted' };
        
        const result = useThemeVariant(props, options);
        
        expect(result).toEqual({
            theme: 'soft-muted',
            themeClassname: 't-soft-muted',
        } satisfies ResolvedThemeVariant<'soft-muted'>);
    });
});
