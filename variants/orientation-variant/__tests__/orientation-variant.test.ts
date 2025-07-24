import {
    type AxisOrientationVariantProps,
    type AxisOrientationVariantOptions,
    type ResolvedAxisOrientationVariant,
    useAxisOrientationVariant,
    
    type DirectionalOrientationVariantProps,
    type DirectionalOrientationVariantOptions,
    type ResolvedDirectionalOrientationVariant,
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
            orientation: 'inline',
            orientationClassname: 'o-inline',
            isOrientationInline: true,
            isOrientationBlock: false,
            ariaOrientation: 'horizontal',
        } satisfies ResolvedAxisOrientationVariant);
    });
    
    test('resolves block orientation from props', () => {
        const props: AxisOrientationVariantProps = { orientation: 'block' };
        const result = useAxisOrientationVariant(props);
        
        expect(result).toEqual({
            orientation: 'block',
            orientationClassname: 'o-block',
            isOrientationInline: false,
            isOrientationBlock: true,
            ariaOrientation: 'vertical',
        } satisfies ResolvedAxisOrientationVariant);
    });
    
    test('uses default orientation when prop is missing', () => {
        const props: AxisOrientationVariantProps = {};
        const options: AxisOrientationVariantOptions = { defaultOrientation: 'inline' };
        
        const result = useAxisOrientationVariant(props, options);
        
        expect(result).toEqual({
            orientation: 'inline',
            orientationClassname: 'o-inline',
            isOrientationInline: true,
            isOrientationBlock: false,
            ariaOrientation: 'horizontal',
        } satisfies ResolvedAxisOrientationVariant);
    });
    
    test('falls back to system default when prop and option are missing', () => {
        const result = useAxisOrientationVariant({});
        expect(result.orientation).toBe(defaultAxisOrientation);
        expect(result.orientationClassname).toBe(`o-${defaultAxisOrientation}`);
    });
});



describe('useDirectionalOrientationVariant()', () => {
    test('resolves inline orientation from props', () => {
        const props: DirectionalOrientationVariantProps = { orientation: 'inline-start' };
        const result = useDirectionalOrientationVariant(props);
        
        expect(result).toEqual({
            orientation: 'inline-start',
            orientationClassname: 'o-inline-start',
            isOrientationInline: true,
            isOrientationBlock: false,
            ariaOrientation: 'horizontal',
        } satisfies ResolvedDirectionalOrientationVariant);
    });
    
    test('resolves block orientation from props', () => {
        const props: DirectionalOrientationVariantProps = { orientation: 'block-end' };
        const result = useDirectionalOrientationVariant(props);
        
        expect(result).toEqual({
            orientation: 'block-end',
            orientationClassname: 'o-block-end',
            isOrientationInline: false,
            isOrientationBlock: true,
            ariaOrientation: 'vertical',
        } satisfies ResolvedDirectionalOrientationVariant);
    });
    
    test('uses default orientation when prop is missing', () => {
        const props: DirectionalOrientationVariantProps = {};
        const options: DirectionalOrientationVariantOptions = { defaultOrientation: 'inline-end' };
        
        const result = useDirectionalOrientationVariant(props, options);
        
        expect(result).toEqual({
            orientation: 'inline-end',
            orientationClassname: 'o-inline-end',
            isOrientationInline: true,
            isOrientationBlock: false,
            ariaOrientation: 'horizontal',
        } satisfies ResolvedDirectionalOrientationVariant);
    });
    
    test('falls back to system default when prop and option are missing', () => {
        const result = useDirectionalOrientationVariant({});
        expect(result.orientation).toBe(defaultDirectionalOrientation);
        expect(result.orientationClassname).toBe(`o-${defaultDirectionalOrientation}`);
    });
});
