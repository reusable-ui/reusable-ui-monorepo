# @reusable-ui/checkable

⚠️ **Deprecated since v7.0.0**  
This package is no longer functional. It exists only as a **migration tool** to guide contributors toward [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state).

- Last working version: **6.5.0**
- Current version: **7.0.0** (migration shim only)

---

## ✨ What changed?

`@reusable-ui/checkable` was originally designed to style checkbox and switch indicators (`::before`/`::after`) alongside the checkbox body.  
However, because both animations were tied to the same lifecycle, they were forced to share the same duration, leading to interrupted or frozen animations.

The recommended solution is to **use multiple `useActiveBehaviorState()` hooks** attached to the same element, each with its own `animationPattern`.  
This allows the checkbox body and the check indicator to animate independently while sharing the same `active` prop.

---

## 🔄 Migration Guide

Instead of:

```ts
usesCheckable(config)
```

Use **two `useActiveBehaviorState()` hooks** with merged handlers and merged class names.

---

## 📦 Installation

```bash
npm install @reusable-ui/active-state @reusable-ui/callbacks
```

---

## 💻 Example: Checkbox with Two Active States

```tsx
import React, { FC, ChangeEvent } from 'react';
import {
    useActiveBehaviorState,
    ActiveStateProps,
    UncontrollableActiveStateProps,
    ActiveStateChangeProps,
} from '@reusable-ui/active-state';
import { useMergeEventHandlers } from '@reusable-ui/callbacks';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends
    ActiveStateProps,
    UncontrollableActiveStateProps, // optional uncontrolled behavior
    ActiveStateChangeProps<ChangeEvent<HTMLInputElement>> // optional change dispatching behavior
{}

// A checkbox that animates both body and tick indicator independently.
export const Checkbox: FC<CheckboxProps> = (props) => {
    /**
     * Primary hook for the checkbox body (background, outline).
     * This is the source of truth for the `actualActive` state and dispatches changes.
     */
    const {
        active,
        actualActive,
        activeClassname       : bodyClass,
        
        dispatchActiveChange,
        
        handleAnimationStart  : bodyAnimStart,
        handleAnimationEnd    : bodyAnimEnd,
        handleAnimationCancel : bodyAnimCancel,
    } = useActiveBehaviorState(props, {
        defaultActive         : false,                          // Fallback for uncontrolled mode.
        defaultCascadeActive  : false,                          // Defaults to prevent contextual activation.
        animationPattern      : ['activating', 'deactivating'], // body animations
        animationBubbling     : false,                          // Ignores bubbling animation events from children.
    });
    
    /**
     * Secondary hook for the checkbox tick mark (::before / ::after).
     * It consumes the resolved `actualActive` from the first hook and disables cascade behavior,
     * so its lifecycle is independent but synchronized with the body.
     */
    const {
        activeClassname       : tickClass,
        
        handleAnimationStart  : tickAnimStart,
        handleAnimationEnd    : tickAnimEnd,
        handleAnimationCancel : tickAnimCancel,
    } = useActiveBehaviorState(
        // props:
        {
            active        : actualActive, // resolved active from the body hook
            cascadeActive : false, // ensures the passed `active` state is not altered by cascade behavior
        },
        
        // options:
        {
            defaultActive         : false,                      // Fallback for uncontrolled mode.
            defaultCascadeActive  : false,                      // Defaults to prevent contextual activation.
            animationPattern      : ['checking', 'unchecking'], // tick mark animations
            animationBubbling     : false,                      // Ignores bubbling animation events from children.
        }
    );
    
    // Merge handlers from both hooks into single stable functions
    const handleAnimationStart  = useMergeEventHandlers(bodyAnimStart, tickAnimStart);
    const handleAnimationEnd    = useMergeEventHandlers(bodyAnimEnd, tickAnimEnd);
    const handleAnimationCancel = useMergeEventHandlers(bodyAnimCancel, tickAnimCancel);
    
    return (
        <input
            type='checkbox'
            className={`${styles.checkbox} ${bodyClass} ${tickClass}`}
            
            checked={active}
            
            onChange={(event) => dispatchActiveChange(!active, event)}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
        />
    );
};
```

---

## ✅ Summary

- `@reusable-ui/checkable` → **deprecated**  
- Use **two `useActiveBehaviorState()` hooks** with different `animationPattern`s.  
- Merge their handlers with `useMergeEventHandlers`.  
- Merge their class names with template strings (`${bodyClass} ${tickClass}`).  
- This approach allows the checkbox body and tick indicator to animate independently without timing conflicts.  
