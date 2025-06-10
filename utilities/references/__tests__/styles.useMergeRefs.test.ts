import { useRef, type RefCallback } from 'react';
import {
    useMergeRefs,
} from '../dist/references.js'

import { renderHook } from '@testing-library/react';
import { jest } from '@jest/globals'



describe('useMergeRefs', () => {
    test('merging zero refs should result in a no-op function', () => {
        type RefType = string | null;
        const { result: { current: mergedRef } } = renderHook(() => useMergeRefs());
        
        // @ts-ignore
        const testType = (
            // Verify that mergedRef is a RefCallback:
            mergedRef satisfies RefCallback<RefType>
        );
        
        // Verify that the test value is forwarded correctly:
        expect(typeof mergedRef).toBe('function');
        expect(() => mergedRef(null)).not.toThrow();
    });
    
    test('merging a single ref should forward value correctly', () => {
        type RefType = string | null;
        const { result: { current: refObject1 } } = renderHook(() => useRef<RefType>(null));
        const { result: { current: mergedRef  } } = renderHook(() => useMergeRefs<RefType>(refObject1));
        
        // @ts-ignore
        const testType = (
            // Verify that mergedRef is a RefCallback:
            mergedRef satisfies RefCallback<RefType>
        );
        
        // Verify that the test value is forwarded correctly:
        mergedRef('testValue');
        expect(refObject1.current).toBe('testValue');
        
        // Test with various random values:
        const randomValues : RefType[] = ['lorem ipsum', null, 'dolor sit amet', 'consectetur adipiscing elit', 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'];
        for (const randomValue of randomValues) {
            mergedRef(randomValue);
            expect(refObject1.current).toBe(randomValue);
        } // for
    });
    
    test('merging multiple refs should reflect the same value', () => {
        type RefType = number | null;
        const { result: { current: refObject1 } } = renderHook(() => useRef<RefType>(null));
        const { result: { current: refObject2 } } = renderHook(() => useRef<RefType>(null));
        const refCallback1 = jest.fn<RefCallback<RefType>>();
        const { result: { current: refObject3 } } = renderHook(() => useRef<RefType>(null));
        const refCallback4 = jest.fn<RefCallback<RefType>>();
        
        const { result: { current: mergedRef } } = renderHook(() => useMergeRefs(refObject1, refObject2, refCallback1, refObject3, refCallback4));
        
        // @ts-ignore
        const testType = (
            // Verify that mergedRef is a RefCallback:
            mergedRef satisfies RefCallback<RefType>
        );
        
        mergedRef(123);
        
        expect(refObject1.current).toBe(123);
        expect(refObject2.current).toBe(123);
        expect(refCallback1).toHaveBeenCalledWith(123);
        expect(refObject3.current).toBe(123);
        expect(refCallback4).toHaveBeenCalledWith(123);
        
        // Test with various random values:
        const randomValues : RefType[] = [456, null, 789, 101112, 131415, 161718, 192021];
        for (const randomValue of randomValues) {
            mergedRef(randomValue);
            expect(refObject1.current).toBe(randomValue);
            expect(refObject2.current).toBe(randomValue);
            expect(refCallback1).toHaveBeenCalledWith(randomValue);
            expect(refObject3.current).toBe(randomValue);
            expect(refCallback4).toHaveBeenCalledWith(randomValue);
        } // for
    });
    
    test('merging refs with undefined or null should correctly ignore them', () => {
        type RefType = number | boolean;
        const { result: { current: refObject1 } } = renderHook(() => useRef<RefType>(null));
        const refCallback1 = jest.fn<RefCallback<RefType>>();
        
        const { result: { current: mergedRef } } = renderHook(() => useMergeRefs(undefined, null, refObject1, refCallback1));
        
        // @ts-ignore
        const testType = (
            // Verify that mergedRef is a RefCallback:
            mergedRef satisfies RefCallback<RefType>
        );
        
        mergedRef(42);
        
        expect(refObject1.current).toBe(42);
        expect(refCallback1).toHaveBeenCalledWith(42);
        
        // Test with various random values:
        const randomValues : RefType[] = [true, false, 100, 200, 300];
        for (const randomValue of randomValues) {
            mergedRef(randomValue);
            expect(refObject1.current).toBe(randomValue);
            expect(refCallback1).toHaveBeenCalledWith(randomValue);
        } // for
    });

    test('dynamic updates: changing merged refs after initial render', () => {
        type RefType = string | null;
        const { result: { current: refObject1 } } = renderHook(() => useRef<RefType>(null));
        const { result: { current: mergedRef }, rerender } = renderHook(() => useMergeRefs<RefType>(refObject1));
        
        // @ts-ignore
        const testType = (
            // Verify that mergedRef is a RefCallback:
            mergedRef satisfies RefCallback<RefType>
        );
        
        mergedRef('initial');
        expect(refObject1.current).toBe('initial');
        
        // Simulate rerender event:
        rerender();
        expect(refObject1.current).toBe('initial');
        
        mergedRef('updated');
        expect(refObject1.current).toBe('updated');
        
        // Simulate rerender event:
        rerender();
        expect(refObject1.current).toBe('updated');
        
        // Simulate rerender event:
        rerender();
        expect(refObject1.current).toBe('updated');
        
        mergedRef('again updated');
        expect(refObject1.current).toBe('again updated');
        
        // Simulate rerender event:
        rerender();
        expect(refObject1.current).toBe('again updated');
        
        // Simulate rerender event:
        rerender();
        expect(refObject1.current).toBe('again updated');
    });

    test('cleanup behavior: resetting merged ref to null', () => {
        type RefType = string | null;
        const { result: { current: refObject1 } } = renderHook(() => useRef<RefType>('initialValue'));
        const refCallback1 = jest.fn<RefCallback<RefType>>();
        
        const { result: { current: mergedRef } } = renderHook(() => useMergeRefs(refObject1, refCallback1));
        
        // @ts-ignore
        const testType = (
            // Verify that mergedRef is a RefCallback:
            mergedRef satisfies RefCallback<RefType>
        );
        
        mergedRef(null);
        expect(refObject1.current).toBe(null);
        expect(refCallback1).toHaveBeenCalledWith(null);
    });

    test('cleanup behavior: resetting merged ref to undefined', () => {
        type RefType = string | undefined;
        const { result: { current: refObject1 } } = renderHook(() => useRef<RefType>('initialValue'));
        const refCallback1 = jest.fn<RefCallback<RefType>>();
        
        const { result: { current: mergedRef } } = renderHook(() => useMergeRefs(refObject1, refCallback1));
        
        // @ts-ignore
        const testType = (
            // Verify that mergedRef is a RefCallback:
            mergedRef satisfies RefCallback<RefType>
        );
        
        mergedRef(undefined);
        expect(refObject1.current).toBe(undefined);
        expect(refCallback1).toHaveBeenCalledWith(undefined);
    });
});