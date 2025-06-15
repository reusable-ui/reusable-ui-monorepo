import {
    useControllableValueChange,
    type ValueChangeEventHandler,
} from '../dist/index.js'
import { useState } from 'react'
import { act, renderHook } from '@testing-library/react'
import { jest } from '@jest/globals'



describe('useControllableValueChange', () => {
    const onValueChange = jest.fn<ValueChangeEventHandler<string, Event>>();
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should initialize with the provided external value', () => {
        const { result } = renderHook(() => useControllableValueChange<string, Event>({
            value: 'initial',
            onValueChange,
        }));
        
        expect(result.current.value).toBe('initial');
    });
    
    it('should update value externally when calling triggerValueChange', () => {
        const { result } = renderHook(() => {
            const [externalValue, setExternalValue] = useState<string>('before');
            return useControllableValueChange<string, Event>({
                value: externalValue,
                onValueChange : setExternalValue,
            });
        });
        
        act(() => {
            result.current.triggerValueChange('after', new Event('click'));
        });
        
        expect(result.current.value).toBe('after');
    });
    
    it('should trigger onValueChange when calling triggerValueChange', () => {
        const { result } = renderHook(() => useControllableValueChange<string, Event>({
            value: 'start',
            onValueChange,
        }));
        
        act(() => {
            result.current.triggerValueChange('updated', new Event('change'));
        });
        
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith('updated', expect.any(Event));
    });
    
    it('should maintain stable triggerValueChange reference across renders', () => {
        const { result, rerender } = renderHook(() => useControllableValueChange<string, Event>({
            value: 'state1',
            onValueChange,
        }));
        
        const initialTrigger = result.current.triggerValueChange;
        rerender();
        
        expect(result.current.triggerValueChange).toBe(initialTrigger);
    });
    
    it('should correctly forward the event object to onValueChange', () => {
        const { result } = renderHook(() => useControllableValueChange<string, Event>({
            value: 'original',
            onValueChange,
        }));
        
        const event = new Event('change');
        
        act(() => {
            result.current.triggerValueChange('updated', event);
        });
        
        expect(onValueChange).toHaveBeenCalledWith('updated', event);
    });
});

describe('useControllableValueChange (Edge Cases)', () => {
    const onValueChange = jest.fn<ValueChangeEventHandler<string | undefined | null, Event>>();
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should initialize with an undefined value', () => {
        const { result } = renderHook(() => useControllableValueChange<string | undefined, Event>({
            value: undefined,
            onValueChange,
        }));
        
        expect(result.current.value).toBeUndefined();
    });
    
    it('should initialize with a null value', () => {
        const { result } = renderHook(() => useControllableValueChange<string | null, Event>({
            value: null,
            onValueChange,
        }));
        
        expect(result.current.value).toBeNull();
    });
    
    it('should initialize with an empty string', () => {
        const { result } = renderHook(() => useControllableValueChange<string, Event>({
            value: '',
            onValueChange,
        }));
        
        expect(result.current.value).toBe('');
    });
    
    it('should trigger onValueChange when updating value to undefined', () => {
        const { result } = renderHook(() => useControllableValueChange<string | undefined, Event>({
            value: 'initial',
            onValueChange,
        }));
        
        act(() => {
            result.current.triggerValueChange(undefined, new Event('change'));
        });
        
        expect(onValueChange).toHaveBeenCalledWith(undefined, expect.any(Event));
    });
    
    it('should trigger onValueChange when updating value to null', () => {
        const { result } = renderHook(() => useControllableValueChange<string | null, Event>({
            value: 'initial',
            onValueChange,
        }));
        
        act(() => {
            result.current.triggerValueChange(null, new Event('change'));
        });
        
        expect(onValueChange).toHaveBeenCalledWith(null, expect.any(Event));
    });
    
    it('should trigger onValueChange when updating value to an empty string', () => {
        const { result } = renderHook(() => useControllableValueChange<string, Event>({
            value: 'initial',
            onValueChange,
        }));
        
        act(() => {
            result.current.triggerValueChange('', new Event('change'));
        });
        
        expect(onValueChange).toHaveBeenCalledWith('', expect.any(Event));
    });
});
