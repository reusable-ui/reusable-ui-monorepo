import {
    type OrientationVariantProps,
    type OrientationVariantOptions,
    type ResolvedOrientationVariant,
    useOrientationVariant,
} from '../dist/index.js'
import {
    defaultOrientation,
} from '../dist/internal-defaults.js'



describe('useOrientationVariant()', () => {
    test('resolves inline orientation from props', () => {
        const props: OrientationVariantProps = { orientation: 'inline' };
        const result = useOrientationVariant(props);
        
        expect(result).toEqual({
            orientation: 'inline',
            orientationClassname: 'o-inline',
            isOrientationInline: true,
            isOrientationBlock: false,
            ariaOrientation: 'horizontal',
        } satisfies ResolvedOrientationVariant);
    });
    
    test('resolves block orientation from props', () => {
        const props: OrientationVariantProps = { orientation: 'block' };
        const result = useOrientationVariant(props);
        
        expect(result).toEqual({
            orientation: 'block',
            orientationClassname: 'o-block',
            isOrientationInline: false,
            isOrientationBlock: true,
            ariaOrientation: 'vertical',
        } satisfies ResolvedOrientationVariant);
    });
    
    test('uses default orientation when prop is missing', () => {
        const props: OrientationVariantProps = {};
        const options: OrientationVariantOptions = { defaultOrientation: 'inline' };
        
        const result = useOrientationVariant(props, options);
        
        expect(result).toEqual({
            orientation: 'inline',
            orientationClassname: 'o-inline',
            isOrientationInline: true,
            isOrientationBlock: false,
            ariaOrientation: 'horizontal',
        } satisfies ResolvedOrientationVariant);
    });
    
    test('falls back to system default when prop and option are missing', () => {
        const result = useOrientationVariant({});
        expect(result.orientation).toBe(defaultOrientation);
        expect(result.orientationClassname).toBe(`o-${defaultOrientation}`);
    });
});
