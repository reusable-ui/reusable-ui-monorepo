import {
    type AxisOrientationVariantProps,
    type AxisOrientationVariantOptions,
    useAxisOrientationVariant,
    
    type DirectionalOrientationVariantProps,
    type DirectionalOrientationVariantOptions,
    useDirectionalOrientationVariant,
} from '../dist/index.js'
import {
    defaultAxisOrientation,
    defaultDirectionalOrientation,
} from '../dist/internal-defaults.js'



describe('useAxisOrientationVariant()', () => {
    test('resolves inline orientation from props', () => {
        const props: AxisOrientationVariantProps = { orientation: 'inline' };
        const result = useAxisOrientationVariant(props);
        
        expect(result).toEqual({
            orientationClassname: 'o-inline',
            isOrientationInline: true,
            isOrientationBlock: false,
            ariaOrientation: 'horizontal',
        });
    });
    
    test('resolves block orientation from props', () => {
        const props: AxisOrientationVariantProps = { orientation: 'block' };
        const result = useAxisOrientationVariant(props);
        
        expect(result).toEqual({
            orientationClassname: 'o-block',
            isOrientationInline: false,
            isOrientationBlock: true,
            ariaOrientation: 'vertical',
        });
    });
    
    test('uses default orientation when prop is missing', () => {
        const props: AxisOrientationVariantProps = {};
        const options: AxisOrientationVariantOptions = { defaultOrientation: 'inline' };
        
        const result = useAxisOrientationVariant(props, options);
        
        expect(result.orientationClassname).toBe('o-inline');
        expect(result.isOrientationInline).toBe(true);
        expect(result.isOrientationBlock).toBe(false);
        expect(result.ariaOrientation).toBe('horizontal');
    });
    
    test('falls back to system default when prop and option are missing', () => {
        const result = useAxisOrientationVariant({});
        expect(result.orientationClassname).toBe(`o-${defaultAxisOrientation}`);
    });
});



describe('useDirectionalOrientationVariant()', () => {
    test('resolves inline orientation from props', () => {
        const props: DirectionalOrientationVariantProps = { orientation: 'inline-start' };
        const result = useDirectionalOrientationVariant(props);
        
        expect(result).toEqual({
            orientationClassname: 'o-inline-start',
            isOrientationInline: true,
            isOrientationBlock: false,
            ariaOrientation: 'horizontal',
        });
    });
    
    test('resolves block orientation from props', () => {
        const props: DirectionalOrientationVariantProps = { orientation: 'block-end' };
        const result = useDirectionalOrientationVariant(props);
        
        expect(result).toEqual({
            orientationClassname: 'o-block-end',
            isOrientationInline: false,
            isOrientationBlock: true,
            ariaOrientation: 'vertical',
        });
    });
    
    test('uses default orientation when prop is missing', () => {
        const props: DirectionalOrientationVariantProps = {};
        const options: DirectionalOrientationVariantOptions = { defaultOrientation: 'inline-end' };
        
        const result = useDirectionalOrientationVariant(props, options);
        
        expect(result.orientationClassname).toBe('o-inline-end');
        expect(result.isOrientationInline).toBe(true);
        expect(result.isOrientationBlock).toBe(false);
        expect(result.ariaOrientation).toBe('horizontal');
    });
    
    test('falls back to system default when prop and option are missing', () => {
        const result = useDirectionalOrientationVariant({});
        expect(result.orientationClassname).toBe(`o-${defaultDirectionalOrientation}`);
    });
});
