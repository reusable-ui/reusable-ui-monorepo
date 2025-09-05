import {
    useHybridValueChange,
    type ValueChangeEventHandler,
    type ValueChangeApi,
    type HybridValueChangeProps,
} from '../dist/index.js'
import { useState } from 'react'
import { act, renderHook } from '@testing-library/react'
import { jest } from '@jest/globals'



describe('useHybridValueChange', () => {
    const onValueChange = jest.fn<ValueChangeEventHandler<string, Event>>();
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should initialize in controlled mode when value is provided', () => {
        const { result } = renderHook(() => useHybridValueChange<string, Event>({
            value: 'controlled',
            defaultValue: 'uncontrolled',
            onValueChange,
        }));
        
        expect(result.current.value).toBe('controlled');
    });
    
    it('should initialize in uncontrolled mode when value is undefined', () => {
        const { result } = renderHook(() => useHybridValueChange<string, Event>({
            value: undefined,
            defaultValue: 'uncontrolled',
            onValueChange,
        }));
        
        expect(result.current.value).toBe('uncontrolled');
    });
    
    it('should update value externally when in controlled mode', () => {
        const { result } = renderHook(() => {
            const [externalValue, setExternalValue] = useState<string>('before');
            return useHybridValueChange<string, Event>({
                value: externalValue,
                defaultValue: 'fallback',
                onValueChange: setExternalValue,
            });
        });
        
        act(() => {
            result.current.dispatchValueChange('after', new Event('click'));
        });
        
        expect(result.current.value).toBe('after');
    });
    
    it('should update value internally when in uncontrolled mode', () => {
        const { result } = renderHook(() => useHybridValueChange<string, Event>({
            value: undefined,
            defaultValue: 'before',
            onValueChange,
        }));
        
        act(() => {
            result.current.dispatchValueChange('after', new Event('click'));
        });
        
        expect(result.current.value).toBe('after');
    });
    
    it('should trigger onValueChange in both modes', () => {
        const { result } = renderHook(() => useHybridValueChange<string, Event>({
            value: 'controlled',
            defaultValue: 'uncontrolled',
            onValueChange,
        }));
        
        act(() => {
            result.current.dispatchValueChange('updated', new Event('change'));
        });
        
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith('updated', expect.any(Event));
    });
    
    it('should transition from uncontrolled to controlled mode when value is provided dynamically', () => {
        const { result, rerender } = renderHook<ValueChangeApi<string, Event>, HybridValueChangeProps<string, Event>>((props) => useHybridValueChange<string, Event>(props), {
            initialProps: {
                value: undefined,
                defaultValue: 'uncontrolled',
                onValueChange,
            }
        });
        
        expect(result.current.value).toBe('uncontrolled');
        
        rerender({ value: 'controlled', defaultValue: 'uncontrolled' });
        
        expect(result.current.value).toBe('controlled');
    });
    
    it('should maintain stable dispatchValueChange reference across renders', () => {
        const { result, rerender } = renderHook(() => useHybridValueChange<string, Event>({
            value: undefined,
            defaultValue: 'initial',
            onValueChange,
        }));
        
        const initialTrigger = result.current.dispatchValueChange;
        rerender();
        
        expect(result.current.dispatchValueChange).toBe(initialTrigger);
    });
    
    it('should correctly forward the event object to onValueChange', () => {
        const { result } = renderHook(() => useHybridValueChange<string, Event>({
            value: 'controlled',
            defaultValue: 'uncontrolled',
            onValueChange,
        }));
        
        const event = new Event('change');
        
        act(() => {
            result.current.dispatchValueChange('updated', event);
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
        const { result } = renderHook(() => useHybridValueChange<string | undefined, Event>({
            value: undefined,
            defaultValue: 'initial',
            onValueChange,
        }));
        
        act(() => {
            result.current.dispatchValueChange(undefined, new Event('change'));
        });
        
        expect(result.current.value).toBeUndefined();
        expect(onValueChange).toHaveBeenCalledWith(undefined, expect.any(Event));
    });
    
    it('should handle null value updates gracefully', () => {
        const { result } = renderHook(() => useHybridValueChange<string | null, Event>({
            value: undefined,
            defaultValue: 'initial',
            onValueChange,
        }));
        
        act(() => {
            result.current.dispatchValueChange(null, new Event('change'));
        });
        
        expect(result.current.value).toBeNull();
        expect(onValueChange).toHaveBeenCalledWith(null, expect.any(Event));
    });
    
    it('should handle empty string value updates gracefully', () => {
        const { result } = renderHook(() => useHybridValueChange<string, Event>({
            value: undefined,
            defaultValue: 'initial',
            onValueChange,
        }));
        
        act(() => {
            result.current.dispatchValueChange('', new Event('change'));
        });
        
        expect(result.current.value).toBe('');
        expect(onValueChange).toHaveBeenCalledWith('', expect.any(Event));
    });
});
