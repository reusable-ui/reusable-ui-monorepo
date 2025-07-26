import {
    type FlowDirectionVariantProps,
    type FlowDirectionVariantOptions,
    type ResolvedFlowDirectionVariant,
    useFlowDirectionVariant,
} from '../dist/index.js'
import {
    defaultFlowDirection,
} from '../dist/internal-defaults.js'



describe('useFlowDirectionVariant()', () => {
    test('resolves start edge flowDirection from props', () => {
        const props: FlowDirectionVariantProps = { flowDirection: 'start' };
        const result = useFlowDirectionVariant(props);
        
        expect(result).toEqual({
            flowDirection: 'start',
            flowDirectionClassname: 'f-start',
        } satisfies ResolvedFlowDirectionVariant);
    });
    
    test('resolves end edge flowDirection from props', () => {
        const props: FlowDirectionVariantProps = { flowDirection: 'end' };
        const result = useFlowDirectionVariant(props);
        
        expect(result).toEqual({
            flowDirection: 'end',
            flowDirectionClassname: 'f-end',
        } satisfies ResolvedFlowDirectionVariant);
    });
    
    test('uses default flowDirection when prop is missing', () => {
        const props: FlowDirectionVariantProps = {};
        const options: FlowDirectionVariantOptions = { defaultFlowDirection: 'end' };
        
        const result = useFlowDirectionVariant(props, options);
        
        expect(result).toEqual({
            flowDirection: 'end',
            flowDirectionClassname: 'f-end',
        } satisfies ResolvedFlowDirectionVariant);
    });
    
    test('falls back to system default when prop and option are missing', () => {
        const result = useFlowDirectionVariant({});
        expect(result.flowDirection).toBe(defaultFlowDirection);
        expect(result.flowDirectionClassname).toBe(`f-${defaultFlowDirection}`);
    });
});
