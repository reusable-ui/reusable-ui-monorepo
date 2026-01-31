# @reusable-ui/accessibilities ♿  

> **Deprecated since v7.0.0**  
> This package is no longer under active development.  
> Resolving all three states (`disabled`, `readOnly`, `active`) together is uncommon in practice.  
> Consumers should migrate to the individual state packages:  
> - [`@reusable-ui/disabled-state`](https://www.npmjs.com/package/@reusable-ui/disabled-state)  
> - [`@reusable-ui/read-only-state`](https://www.npmjs.com/package/@reusable-ui/read-only-state)  
> - [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state)  

---

## 📖 Overview

`@reusable-ui/accessibilities` was a lightweight, type-safe utility for managing **cascading accessibility state** (`disabled`, `readOnly`, `active`) in reusable React components.  

It provided tools like `useResolvedAccessibilityState()` and `<AccessibilityProvider>` to combine **local props** with **contextual inheritance** — ensuring consistent behavior across component hierarchies.

---

## ⚠️ Deprecation Notice

As of **v7.0.0**, this package is deprecated:

- `<AccessibilityProvider>` still exists but is only a thin wrapper around the individual state providers.  
- The internal `AccessibilityContext` has been removed and was never exported, so no consumer breakage occurs.  
- Future versions will remove this package entirely.  

---

## 🔁 Migration Guide

### Replace `useResolvedAccessibilityState`

```diff
- import { useResolvedAccessibilityState } from '@reusable-ui/accessibilities';
+ import { useDisabledState } from '@reusable-ui/disabled-state';
+ import { useReadOnlyState } from '@reusable-ui/read-only-state';
+ import { useActiveState }   from '@reusable-ui/active-state';
```

```tsx
// Before (deprecated):
const { disabled, readOnly, active } = useResolvedAccessibilityState(props);

// After (migrated):
const disabled = useDisabledState(props);
const readOnly = useReadOnlyState(props);
const active   = useActiveState(props);
```

### Replace `<AccessibilityProvider>`

```diff
- <AccessibilityProvider disabled={true}>
-   <ToggleButton />
- </AccessibilityProvider>
+ <DisabledStateProvider disabled={true}>
+   <ReadOnlyStateProvider readOnly={false}>
+     <ActiveStateProvider active={false}>
+       <ToggleButton />
+     </ActiveStateProvider>
+   </ReadOnlyStateProvider>
+ </DisabledStateProvider>
```

---

## 📚 Related Packages

- [`@reusable-ui/disabled-state`](https://www.npmjs.com/package/@reusable-ui/disabled-state)  
- [`@reusable-ui/read-only-state`](https://www.npmjs.com/package/@reusable-ui/read-only-state)  
- [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state)  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **Note:** If you are still using `@reusable-ui/accessibilities`, upgrade to v7.0.0 and follow the migration guide above. Future versions will remove the package entirely.  
