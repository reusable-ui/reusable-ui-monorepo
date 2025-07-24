import {
    type SizeVariantProps,
    type SizeVariantOptions,
    type ResolvedSizeVariant,
    useSizeVariant,
} from '../dist/index.js'
import {
    defaultSize,
} from '../dist/internal-defaults.js'



describe('useSizeVariant()', () => {
    test('resolves sm size from props', () => {
        const props: SizeVariantProps = { size: 'sm' };
        const result = useSizeVariant(props);
        
        expect(result).toEqual({
            size: 'sm',
            sizeClassname: 's-sm',
        } satisfies ResolvedSizeVariant);
    });
    
    test('resolves md size from props', () => {
        const props: SizeVariantProps = { size: 'md' };
        const result = useSizeVariant(props);
        
        expect(result).toEqual({
            size: 'md',
            sizeClassname: 's-md',
        } satisfies ResolvedSizeVariant);
    });
    
    test('resolves lg size from props', () => {
        const props: SizeVariantProps = { size: 'lg' };
        const result = useSizeVariant(props);
        
        expect(result).toEqual({
            size: 'lg',
            sizeClassname: 's-lg',
        } satisfies ResolvedSizeVariant);
    });
    
    test('uses default size when prop is missing', () => {
        const props: SizeVariantProps = {};
        const options: SizeVariantOptions = { defaultSize: 'sm' };
        
        const result = useSizeVariant(props, options);
        
        expect(result).toEqual({
            size: 'sm',
            sizeClassname: 's-sm',
        } satisfies ResolvedSizeVariant);
    });
    
    test('falls back to system default when prop and option are missing', () => {
        const result = useSizeVariant({});
        expect(result.size).toBe(defaultSize);
        expect(result.sizeClassname).toBe(`s-${defaultSize}`);
    });
    
    
    
    test('resolves custom size: xs', () => {
        const props: SizeVariantProps<'xs'> = { size: 'xs' };
        const result = useSizeVariant(props);
        
        expect(result).toEqual({
            size: 'xs',
            sizeClassname: 's-xs',
        } satisfies ResolvedSizeVariant<'xs'>);
    });
    
    test('resolves custom size: xl', () => {
        const props: SizeVariantProps<'xl'> = { size: 'xl' };
        const result = useSizeVariant(props);
        
        expect(result).toEqual({
            size: 'xl',
            sizeClassname: 's-xl',
        } satisfies ResolvedSizeVariant<'xl'>);
    });
    
    test('resolves tokenized size: 1em', () => {
        const props: SizeVariantProps<'1em'> = { size: '1em' };
        const result = useSizeVariant(props);
        
        expect(result).toEqual({
            size: '1em',
            sizeClassname: 's-1em',
        } satisfies ResolvedSizeVariant<'1em'>);
    });
    
    test('resolves tokenized size: 1lh', () => {
        const props: SizeVariantProps<'1lh'> = { size: '1lh' };
        const result = useSizeVariant(props);
        
        expect(result).toEqual({
            size: '1lh',
            sizeClassname: 's-1lh',
        } satisfies ResolvedSizeVariant<'1lh'>);
    });
    
    test('uses custom default size: xl', () => {
        const props: SizeVariantProps<'xl'> = {};
        const options: SizeVariantOptions<'xl'> = { defaultSize: 'xl' };
        
        const result = useSizeVariant(props, options);
        
        expect(result).toEqual({
            size: 'xl',
            sizeClassname: 's-xl',
        } satisfies ResolvedSizeVariant<'xl'>);
    });
});
