# Contributing to @reusable-ui/validation-icon

⚠️ **Important Notice**  
`@reusable-ui/validation-icon` has been **deprecated** as of version **7.0.0**.  
This package is no longer functional and exists only as a **migration tool** to guide contributors toward [`@reusable-ui/validity-state`](https://www.npmjs.com/package/@reusable-ui/validity-state).

- Last working version: **6.6.0**
- Current version: **7.0.0** (migration shim only)

---

## 🛠️ Contribution Guidelines

Since this package is deprecated:

- **Do not submit new features or bug fixes** for `@reusable-ui/validation-icon`.  
- **Do not open issues** requesting support for v7.0.0 — it is intentionally non‑functional.  
- **Do not submit pull requests** to restore functionality.  

Instead:

- Direct all contributions, bug reports, and feature requests to [`@reusable-ui/validity-state`](https://www.npmjs.com/package/@reusable-ui/validity-state).  
- If you find migration documentation unclear, you may open issues here to improve **migration notes only**.  

---

## 🔄 Migration Contributions

The only acceptable contributions to this repository are:

- **Improving migration documentation** (README, CHANGELOG, JSDoc).  
- **Clarifying type mappings** between deprecated APIs and their replacements.  
- **Adding examples** that help contributors move from `validation-icon` → `validity-state`.  

---

## 📚 Migration Reference

| Deprecated (`@reusable-ui/validation-icon`) | New (`@reusable-ui/validity-state`)                           |
|---------------------------------------------|---------------------------------------------------------------|
| `validationIconVars.iconImage`              | `validityStateVars.isValid` / `validityStateVars.isInvalid`   |
| `ValidationIconStuff`                       | Use `usesValidityState()` directly                            |
| `ValidationIconConfig.iconValid`            | Interpolate `validityStateVars.isValid` into CSS properties   |
| `ValidationIconConfig.iconInvalid`          | Interpolate `validityStateVars.isInvalid` into CSS properties |
| `usesValidationIcon`                        | Replace with direct `usesValidityState()` styling             |

---

## 💻 Example Migration

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

- `@reusable-ui/validation-icon` is **deprecated**.  
- Contributions should focus only on **migration guidance**.  
- All new work belongs in [`@reusable-ui/validity-state`](https://www.npmjs.com/package/@reusable-ui/validity-state).  
- v7.0.0 is a **non‑working version** intended to help contributors migrate.  
