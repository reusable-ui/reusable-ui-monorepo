import {
    useControlledValue,
    type ValueChangeHandler,
} from '../dist/index.js'
import { useState } from 'react'
import { act, renderHook } from '@testing-library/react'
import { jest } from '@jest/globals'



describe('useControlledValue', () => {
    const onValueChange = jest.fn<ValueChangeHandler<string, Event>>();
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should initialize with the provided external value', () => {
        const { result } = renderHook(() => useControlledValue<string, Event>({
            value: 'initial',
            onValueChange,
        }));
        
        expect(result.current[0]).toBe('initial');
    });
    
    it('should update value externally when calling dispatchValueChange', () => {
        const { result } = renderHook(() => {
            const [externalValue, setExternalValue] = useState<string>('before');
            return useControlledValue<string, Event>({
                value: externalValue,
                onValueChange : setExternalValue,
            });
        });
        
        act(() => {
            result.current[1]('after', new Event('click'));
        });
        
        expect(result.current[0]).toBe('after');
    });
    
    it('should trigger onValueChange when calling dispatchValueChange', () => {
        const { result } = renderHook(() => useControlledValue<string, Event>({
            value: 'start',
            onValueChange,
        }));
        
        act(() => {
            result.current[1]('updated', new Event('change'));
        });
        
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith('updated', expect.any(Event));
    });
    
    it('should maintain stable dispatchValueChange reference across renders', () => {
        const { result, rerender } = renderHook(() => useControlledValue<string, Event>({
            value: 'state1',
            onValueChange,
        }));
        
        const initialTrigger = result.current[1];
        rerender();
        
        expect(result.current[1]).toBe(initialTrigger);
    });
    
    it('should correctly forward the event object to onValueChange', () => {
        const { result } = renderHook(() => useControlledValue<string, Event>({
            value: 'original',
            onValueChange,
        }));
        
        const event = new Event('change');
        
        act(() => {
            result.current[1]('updated', event);
        });
        
        expect(onValueChange).toHaveBeenCalledWith('updated', event);
    });
});

describe('useControlledValue (Edge Cases)', () => {
    const onValueChange = jest.fn<ValueChangeHandler<string | undefined | null, Event>>();
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should initialize with an undefined value', () => {
        const { result } = renderHook(() => useControlledValue<string | undefined, Event>({
            value: undefined,
            onValueChange,
        }));
        
        expect(result.current[0]).toBeUndefined();
    });
    
    it('should initialize with a null value', () => {
        const { result } = renderHook(() => useControlledValue<string | null, Event>({
            value: null,
            onValueChange,
        }));
        
        expect(result.current[0]).toBeNull();
    });
    
    it('should initialize with an empty string', () => {
        const { result } = renderHook(() => useControlledValue<string, Event>({
            value: '',
            onValueChange,
        }));
        
        expect(result.current[0]).toBe('');
    });
    
    it('should trigger onValueChange when updating value to undefined', () => {
        const { result } = renderHook(() => useControlledValue<string | undefined, Event>({
            value: 'initial',
            onValueChange,
        }));
        
        act(() => {
            result.current[1](undefined, new Event('change'));
        });
        
        expect(onValueChange).toHaveBeenCalledWith(undefined, expect.any(Event));
    });
    
    it('should trigger onValueChange when updating value to null', () => {
        const { result } = renderHook(() => useControlledValue<string | null, Event>({
            value: 'initial',
            onValueChange,
        }));
        
        act(() => {
            result.current[1](null, new Event('change'));
        });
        
        expect(onValueChange).toHaveBeenCalledWith(null, expect.any(Event));
    });
    
    it('should trigger onValueChange when updating value to an empty string', () => {
        const { result } = renderHook(() => useControlledValue<string, Event>({
            value: 'initial',
            onValueChange,
        }));
        
        act(() => {
            result.current[1]('', new Event('change'));
        });
        
        expect(onValueChange).toHaveBeenCalledWith('', expect.any(Event));
    });
});
