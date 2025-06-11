
import React from 'react';
import {
    useIsRtl,
} from '../dist/directionality.js'
import { render, screen, renderHook } from '@testing-library/react'



describe('useIsRtl', () => {
    test('should return false initially before first render', () => {
        const { result } = renderHook(() => useIsRtl());
        
        expect(result.current[0]).toBe(false); // Default before assignment
    });
    
    test('should correctly detect RTL after first render', async () => {
        // Render the hook and get ref callback:
        const { result } = renderHook(() => useIsRtl());
        
        expect(result.current[0]).toBe(false); // Default before assignment
        
        // Render a component and assign ref:
        render(<div id="test" ref={result.current[1]} style={{ direction: 'rtl' }}>Test</div>);
        
        // Ensure element is rendered:
        await screen.findByText('Test');
        
        expect(result.current[0]).toBe(true); // Should detect RTL
    });
    
    test('should correctly detect LTR after first render', async () => {
        // Render the hook and get ref callback:
        const { result } = renderHook(() => useIsRtl());
        
        expect(result.current[0]).toBe(false); // Default before assignment
        
        // Render a component and assign ref:
        render(<div id="test" ref={result.current[1]} style={{ direction: 'ltr' }}>Test</div>);
        
        // Ensure element is rendered:
        await screen.findByText('Test');
        
        expect(result.current[0]).toBe(false); // Should detect LTR
    });
    
    
    
    test('should return true initially when defaultRtl is true', () => {
        const { result } = renderHook(() => useIsRtl(true));
        
        expect(result.current[0]).toBe(true); // Default should be RTL
    });
    
    test('should correctly detect LTR after first render when defaultRtl is true', async () => {
        // Render the hook with default RTL state
        const { result } = renderHook(() => useIsRtl(true));
        
        expect(result.current[0]).toBe(true); // Default is RTL
        
        // Render a component and assign ref:
        render(<div id="test" ref={result.current[1]} style={{ direction: 'ltr' }}>Test</div>);
        
        // Ensure element is rendered:
        await screen.findByText('Test');
        
        expect(result.current[0]).toBe(false); // Should detect LTR
    });
    
    test('should correctly detect RTL after first render when defaultRtl is true', async () => {
        // Render the hook with default RTL state
        const { result } = renderHook(() => useIsRtl(true));
        
        expect(result.current[0]).toBe(true); // Default is RTL
        
        // Render a component and assign ref:
        render(<div id="test" ref={result.current[1]} style={{ direction: 'rtl' }}>Test</div>);
        
        // Ensure element is rendered:
        await screen.findByText('Test');
        
        expect(result.current[0]).toBe(true); // Should remain RTL
    });
});
