import {
    useUncontrollableValueChange,
    type ValueChangeEventHandler,
} from '../dist/index.js'
import { act, renderHook } from '@testing-library/react'
import { jest } from '@jest/globals'



describe('useUncontrollableValueChange', () => {
    const onValueChange = jest.fn<ValueChangeEventHandler<string, Event>>();
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should initialize with the provided defaultValue', () => {
        const { result } = renderHook(() => useUncontrollableValueChange<string, Event>({
            defaultValue: 'initial',
            onValueChange,
        }));
        
        expect(result.current.value).toBe('initial');
    });
    
    it('should update value internally when calling triggerValueChange', () => {
        const { result } = renderHook(() => useUncontrollableValueChange<string, Event>({
            defaultValue: 'before',
            onValueChange,
        }));
        
        act(() => {
            result.current.triggerValueChange('after', new Event('click'));
        });
        
        expect(result.current.value).toBe('after');
    });
    
    it('should trigger onValueChange when calling triggerValueChange', () => {
        const { result } = renderHook(() => useUncontrollableValueChange<string, Event>({
            defaultValue: 'start',
            onValueChange,
        }));
        
        act(() => {
            result.current.triggerValueChange('updated', new Event('change'));
        });
        
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith('updated', expect.any(Event));
    });
    
    it('should maintain stable triggerValueChange reference across renders', () => {
        const { result, rerender } = renderHook(() => useUncontrollableValueChange<string, Event>({
            defaultValue: 'state1',
            onValueChange,
        }));
        
        const initialTrigger = result.current.triggerValueChange;
        rerender();
        
        expect(result.current.triggerValueChange).toBe(initialTrigger);
    });
    
    it('should correctly forward the event object to onValueChange', () => {
        const { result } = renderHook(() => useUncontrollableValueChange<string, Event>({
            defaultValue: 'original',
            onValueChange,
        }));
        
        const event = new Event('change');
        
        act(() => {
            result.current.triggerValueChange('updated', event);
        });
        
        expect(onValueChange).toHaveBeenCalledWith('updated', event);
    });
});

describe('useUncontrollableValueChange (Edge Cases)', () => {
    const onValueChange = jest.fn<ValueChangeEventHandler<string | undefined | null, Event>>();
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should handle undefined value updates gracefully', () => {
        const { result } = renderHook(() => useUncontrollableValueChange<string | undefined, Event>({
            defaultValue: 'initial',
            onValueChange,
        }));
        
        act(() => {
            result.current.triggerValueChange(undefined, new Event('change'));
        });
        
        expect(result.current.value).toBeUndefined();
        expect(onValueChange).toHaveBeenCalledWith(undefined, expect.any(Event));
    });
    
    it('should handle null value updates gracefully', () => {
        const { result } = renderHook(() => useUncontrollableValueChange<string | null, Event>({
            defaultValue: 'initial',
            onValueChange,
        }));
        
        act(() => {
            result.current.triggerValueChange(null, new Event('change'));
        });
        
        expect(result.current.value).toBeNull();
        expect(onValueChange).toHaveBeenCalledWith(null, expect.any(Event));
    });
    
    it('should handle empty string value updates gracefully', () => {
        const { result } = renderHook(() => useUncontrollableValueChange<string, Event>({
            defaultValue: 'initial',
            onValueChange,
        }));
        
        act(() => {
            result.current.triggerValueChange('', new Event('change'));
        });
        
        expect(result.current.value).toBe('');
        expect(onValueChange).toHaveBeenCalledWith('', expect.any(Event));
    });
});
