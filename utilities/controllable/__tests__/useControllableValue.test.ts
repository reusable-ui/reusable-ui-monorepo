import {
    useControllableValue,
    type ValueChangeHandler,
    type ValueChangeTuple,
    type ControllableValueProps,
} from '../dist/index.js'
import { useState } from 'react'
import { act, renderHook } from '@testing-library/react'
import { jest } from '@jest/globals'



describe('useControllableValue', () => {
    const onValueChange = jest.fn<ValueChangeHandler<string, Event>>();
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should initialize in controlled mode when value is provided', () => {
        const { result } = renderHook(() => useControllableValue<string, Event>({
            value: 'controlled',
            defaultValue: 'uncontrolled',
            onValueChange,
        }));
        
        expect(result.current[0]).toBe('controlled');
    });
    
    it('should initialize in uncontrolled mode when value is undefined', () => {
        const { result } = renderHook(() => useControllableValue<string, Event>({
            value: undefined,
            defaultValue: 'uncontrolled',
            onValueChange,
        }));
        
        expect(result.current[0]).toBe('uncontrolled');
    });
    
    it('should update value externally when in controlled mode', () => {
        const { result } = renderHook(() => {
            const [externalValue, setExternalValue] = useState<string>('before');
            return useControllableValue<string, Event>({
                value: externalValue,
                defaultValue: 'fallback',
                onValueChange: setExternalValue,
            });
        });
        
        act(() => {
            result.current[1]('after', new Event('click'));
        });
        
        expect(result.current[0]).toBe('after');
    });
    
    it('should update value internally when in uncontrolled mode', () => {
        const { result } = renderHook(() => useControllableValue<string, Event>({
            value: undefined,
            defaultValue: 'before',
            onValueChange,
        }));
        
        act(() => {
            result.current[1]('after', new Event('click'));
        });
        
        expect(result.current[0]).toBe('after');
    });
    
    it('should trigger onValueChange in both modes', () => {
        const { result } = renderHook(() => useControllableValue<string, Event>({
            value: 'controlled',
            defaultValue: 'uncontrolled',
            onValueChange,
        }));
        
        act(() => {
            result.current[1]('updated', new Event('change'));
        });
        
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith('updated', expect.any(Event));
    });
    
    it('should transition from uncontrolled to controlled mode when value is provided dynamically', () => {
        const { result, rerender } = renderHook<ValueChangeTuple<string, Event>, ControllableValueProps<string, Event>>((props) => useControllableValue<string, Event>(props), {
            initialProps: {
                value: undefined,
                defaultValue: 'uncontrolled',
                onValueChange,
            }
        });
        
        expect(result.current[0]).toBe('uncontrolled');
        
        rerender({ value: 'controlled', defaultValue: 'uncontrolled' });
        
        expect(result.current[0]).toBe('controlled');
    });
    
    it('should maintain stable dispatchValueChange reference across renders', () => {
        const { result, rerender } = renderHook(() => useControllableValue<string, Event>({
            value: undefined,
            defaultValue: 'initial',
            onValueChange,
        }));
        
        const initialTrigger = result.current[1];
        rerender();
        
        expect(result.current[1]).toBe(initialTrigger);
    });
    
    it('should correctly forward the event object to onValueChange', () => {
        const { result } = renderHook(() => useControllableValue<string, Event>({
            value: 'controlled',
            defaultValue: 'uncontrolled',
            onValueChange,
        }));
        
        const event = new Event('change');
        
        act(() => {
            result.current[1]('updated', event);
        });
        
        expect(onValueChange).toHaveBeenCalledWith('updated', event);
    });
});

describe('useControllableValue (Edge Cases)', () => {
    const onValueChange = jest.fn<ValueChangeHandler<string | undefined | null, Event>>();
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should handle undefined value updates gracefully', () => {
        const { result } = renderHook(() => useControllableValue<string | undefined, Event>({
            value: undefined,
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
        const { result } = renderHook(() => useControllableValue<string | null, Event>({
            value: undefined,
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
        const { result } = renderHook(() => useControllableValue<string, Event>({
            value: undefined,
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
