# Contributing to @reusable-ui/checkable

⚠️ **Important Notice**  
`@reusable-ui/checkable` has been **deprecated** as of version **7.0.0**.  
This package is no longer functional and exists only as a **migration tool** to guide contributors toward [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state).

- Last working version: **6.5.0**
- Current version: **7.0.0** (migration shim only)

---

## 🛠️ Contribution Guidelines

Since this package is deprecated:

- **Do not submit new features or bug fixes** for `@reusable-ui/checkable`.  
- **Do not open issues** requesting support for v7.0.0 — it is intentionally non‑functional.  
- **Do not submit pull requests** to restore functionality.  

Instead:

- Direct all contributions, bug reports, and feature requests to [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state).  
- If you find migration documentation unclear, you may open issues here to improve **migration notes only**.  

---

## 🔄 Migration Contributions

The only acceptable contributions to this repository are:

- **Improving migration documentation** (README, CHANGELOG, JSDoc).  
- **Clarifying type mappings** between deprecated APIs and their replacements.  
- **Adding examples** that help contributors move from `checkable` → `active-state`.  

---

## 📚 Migration Reference

| Deprecated (`@reusable-ui/checkable`) | New (`@reusable-ui/active-state`)                                                  |
|---------------------------------------|------------------------------------------------------------------------------------|
| `CheckableVars`                       | `ActiveStateVars`                                                                  |
| `CheckableStuff`                      | `CssActiveState`                                                                   |
| `CheckableConfig`                     | `CssActiveStateOptions`                                                            |
| `usesCheckable`                       | Replace with **two `useActiveBehaviorState()` hooks** attached to the same element |

---

## 💻 Example Migration

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

- `@reusable-ui/checkable` is **deprecated**.  
- Contributions should focus only on **migration guidance**.  
- All new work belongs in [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state).  
- v7.0.0 is a **non‑working version** intended to help contributors migrate.  
