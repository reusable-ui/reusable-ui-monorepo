import {
    useUncontrolledValue,
    type ValueChangeHandler,
} from '../dist/index.js'
import { act, renderHook } from '@testing-library/react'
import { jest } from '@jest/globals'



describe('useUncontrolledValue', () => {
    const onValueChange = jest.fn<ValueChangeHandler<string, Event>>();
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should initialize with the provided defaultValue', () => {
        const { result } = renderHook(() => useUncontrolledValue<string, Event>({
            defaultValue: 'initial',
            onValueChange,
        }));
        
        expect(result.current[0]).toBe('initial');
    });
    
    it('should update value internally when calling dispatchValueChange', () => {
        const { result } = renderHook(() => useUncontrolledValue<string, Event>({
            defaultValue: 'before',
            onValueChange,
        }));
        
        act(() => {
            result.current[1]('after', new Event('click'));
        });
        
        expect(result.current[0]).toBe('after');
    });
    
    it('should trigger onValueChange when calling dispatchValueChange', () => {
        const { result } = renderHook(() => useUncontrolledValue<string, Event>({
            defaultValue: 'start',
            onValueChange,
        }));
        
        act(() => {
            result.current[1]('updated', new Event('change'));
        });
        
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith('updated', expect.any(Event));
    });
    
    it('should maintain stable dispatchValueChange reference across renders', () => {
        const { result, rerender } = renderHook(() => useUncontrolledValue<string, Event>({
            defaultValue: 'state1',
            onValueChange,
        }));
        
        const initialTrigger = result.current[1];
        rerender();
        
        expect(result.current[1]).toBe(initialTrigger);
    });
    
    it('should correctly forward the event object to onValueChange', () => {
        const { result } = renderHook(() => useUncontrolledValue<string, Event>({
            defaultValue: 'original',
            onValueChange,
        }));
        
        const event = new Event('change');
        
        act(() => {
            result.current[1]('updated', event);
        });
        
        expect(onValueChange).toHaveBeenCalledWith('updated', event);
    });
});

describe('useUncontrolledValue (Edge Cases)', () => {
    const onValueChange = jest.fn<ValueChangeHandler<string | undefined | null, Event>>();
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should handle undefined value updates gracefully', () => {
        const { result } = renderHook(() => useUncontrolledValue<string | undefined, Event>({
            defaultValue: 'initial',
            onValueChange,
        }));
        
        act(() => {
            result.current[1](undefined, new Event('change'));
        });
        
        expect(result.current[0]).toBeUndefined();
        expect(onValueChange).toHaveBeenCalledWith(undefined, expect.any(Event));
    });
    
    it('should handle null value updates gracefully', () => {
        const { result } = renderHook(() => useUncontrolledValue<string | null, Event>({
            defaultValue: 'initial',
            onValueChange,
        }));
        
        act(() => {
            result.current[1](null, new Event('change'));
        });
        
        expect(result.current[0]).toBeNull();
        expect(onValueChange).toHaveBeenCalledWith(null, expect.any(Event));
    });
    
    it('should handle empty string value updates gracefully', () => {
        const { result } = renderHook(() => useUncontrolledValue<string, Event>({
            defaultValue: 'initial',
            onValueChange,
        }));
        
        act(() => {
            result.current[1]('', new Event('change'));
        });
        
        expect(result.current[0]).toBe('');
        expect(onValueChange).toHaveBeenCalledWith('', expect.any(Event));
    });
});
