'use client'

import { default as React, type ReactNode } from 'react'
import { type AccessibilityProps, useResolvedAccessibilityState, AccessibilityProvider } from '@reusable-ui/accessibilities'

interface ControlProps extends AccessibilityProps {
    children ?: ReactNode
}
export const Control = (props: ControlProps) => {
    const {
        disabled,
        readOnly,
        active,
        
        cascadeDisabled,
        cascadeReadOnly,
        cascadeActive,
        
        children,
        
        ...restProps
    } = props;
    
    const {
        disabled : resolvedDisabled,
        readOnly : resolvedReadOnly,
        active   : resolvedActive,
    } = useResolvedAccessibilityState({
        disabled,
        readOnly,
        active,
        
        cascadeDisabled,
        cascadeReadOnly,
        cascadeActive,
    });
    
    
    
    return (
        <div
            {...restProps}
            
            data-disabled={resolvedDisabled || undefined}
            data-readonly={resolvedReadOnly || undefined}
            data-active={resolvedActive || undefined}
        >
            <AccessibilityProvider
                disabled={resolvedDisabled}
                readOnly={resolvedReadOnly}
                active={resolvedActive}
            >
                {children}
            </AccessibilityProvider>
        </div>
    );
};