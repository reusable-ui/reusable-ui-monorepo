'use client'

import { default as React, type ReactNode } from 'react'
import { type AccessibilityProps, useResolvedAccessibilities, AccessibilityProvider } from '@reusable-ui/accessibilities'

interface ControlProps extends AccessibilityProps {
    children ?: ReactNode
}
export const Control = (props: ControlProps) => {
    const {
        enabled,
        readOnly,
        active,
        
        cascadeEnabled,
        cascadeReadOnly,
        cascadeActive,
        
        children,
        
        ...restProps
    } = props;
    
    const {
        enabled  : resolvedEnabled,
        readOnly : resolvedReadOnly,
        active   : resolvedActive,
    } = useResolvedAccessibilities({
        enabled,
        readOnly,
        active,
        
        cascadeEnabled,
        cascadeReadOnly,
        cascadeActive,
    });
    
    
    
    return (
        <div
            {...restProps}
            
            data-disabled={!resolvedEnabled || undefined}
            data-readonly={resolvedReadOnly || undefined}
            data-active={resolvedActive || undefined}
        >
            <AccessibilityProvider
                enabled={resolvedEnabled}
                readOnly={resolvedReadOnly}
                active={resolvedActive}
            >
                {children}
            </AccessibilityProvider>
        </div>
    );
};