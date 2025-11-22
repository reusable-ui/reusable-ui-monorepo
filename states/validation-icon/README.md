# @reusable-ui/validation-icon

⚠️ **Deprecated since v7.0.0**  
This package is no longer functional. It exists only as a **migration tool** to guide contributors toward [`@reusable-ui/validity-state`](https://www.npmjs.com/package/@reusable-ui/validity-state).

- Last working version: **6.6.0**
- Current version: **7.0.0** (migration shim only)

---

## ✨ What changed?

`@reusable-ui/validation-icon` was originally designed to provide a CSS variable (`iconImage`) for decorating inputs with valid/invalid icons.  
It depended on `@reusable-ui/invalidable`, which has been deprecated.  

With the introduction of [`@reusable-ui/validity-state`](https://www.npmjs.com/package/@reusable-ui/validity-state), contributors now have **superpower variables** (`isValid`, `isInvalid`) that can be interpolated into *any* CSS property.  
This makes `validation-icon` redundant.

---

## 🔄 Migration Guide

Instead of:

```ts
// Validation icon:
import { usesValidationIcon } from '@reusable-ui/validation-icon';

// CSS-in-JS:
import { style } from '@cssfn/core';

export const componentStyle = () => {
    const { validationIconRule } = usesValidationIcon({
        iconValid   : 'url("/assets/valid-mark.svg")',
        iconInvalid : 'url("/assets/invalid-mark.svg")',
    });
    
    return style({
        fontSize: '1rem',
        
        ...validationIconRule(),
    });
};
```

Use `@reusable-ui/validity-state` directly:

```ts
// Validity state:
import { usesValidityState } from '@reusable-ui/validity-state';

// CSS-in-JS:
import { style, children, fallback } from '@cssfn/core';

export const componentStyle = () => {
    const { validityStateVars: { isValid, isInvalid } } = usesValidityState();
    
    return style({
        fontSize: '1rem',
        
        ...fallback({
            backgroundImage: 'none',
        }),
        // Apply valid/invalid icons conditionally:
        ...fallback({
            backgroundImage: `${isValid} url("/assets/valid-mark.svg")`,
        }),
        ...fallback({
            backgroundImage: `${isInvalid} url("/assets/invalid-mark.svg")`,
        }),
        
        // Works for children/descendants/pseudo elements too:
        ...children('.icon', {
            ...fallback({
                backgroundImage: 'none',
            }),
            ...fallback({
                backgroundImage: `${isValid} url("/assets/valid-mark.svg")`,
            }),
            ...fallback({
                backgroundImage: `${isInvalid} url("/assets/invalid-mark.svg")`,
            }),
        }),
    });
};
```

---

## ✅ Summary

- `@reusable-ui/validation-icon` → **deprecated**.  
- Use `@reusable-ui/validity-state` with `validityStateVars.isValid` / `isInvalid` instead.  
- Works for root elements, children, descendants, and pseudo elements.  
- v7.0.0 is a **non‑working version** intended to help contributors migrate.  
