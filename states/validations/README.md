# @reusable-ui/validations ✅  

> **Deprecated since v7.0.0**  
> This package is no longer under active development.  
> Validation state management has been unified under [`@reusable-ui/validity-state`](https://www.npmjs.com/package/@reusable-ui/validity-state).  
> Consumers should migrate to that package for ongoing support and improvements.  
> This package remains available as a **compatibility wrapper** to ease migration, but new features and fixes will only be added to `@reusable-ui/validity-state`.  

---

## 📖 Overview

`@reusable-ui/validations` was a lightweight, type-safe utility for managing **cascading validation state** (`enableValidation`, `isValid`) in reusable React components.  

It provided tools like `useResolvedValidationState()` and `<ValidationProvider>` to combine **local props** with **contextual inheritance** — ensuring consistent behavior across component hierarchies.

---

## ⚠️ Deprecation Notice

As of **v7.0.0**, this package is deprecated:

- `useResolvedValidationState()` still exists but is only a thin wrapper around `useValidityState()`.  
- `<ValidationProvider>` is now a thin wrapper around `<ValidityStateProvider>`.  
- Future versions will remove this package entirely.  

---

## 🔁 Migration Guide

### Replace `useResolvedValidationState`

```diff
- import { useResolvedValidationState } from '@reusable-ui/validations';
+ import { useValidityState } from '@reusable-ui/validity-state';
```

```tsx
// Before (deprecated):
const { isValid } = useResolvedValidationState(props);

// After (migrated):
const validity = useValidityState(props);
```

### Replace `<ValidationProvider>`

```diff
- <ValidationProvider enableValidation={false} isValid={null}>
-   <PasswordField />
- </ValidationProvider>
+ <ValidityStateProvider enableValidation={false} validity={null}>
+   <PasswordField />
+ </ValidityStateProvider>
```

---

## 📚 Related Packages

- [`@reusable-ui/validity-state`](https://www.npmjs.com/package/@reusable-ui/validity-state)

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **Note:** If you are still using `@reusable-ui/validations`, upgrade to v7.0.0 and follow the migration guide above. Future versions will remove the package entirely.
