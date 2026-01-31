# @reusable-ui/active-as-click

⚠️ **Deprecated since v7.0.0**  
This package is no longer functional. It exists only as a **migration tool** to guide contributors toward [`@reusable-ui/active-transition`](https://www.npmjs.com/package/@reusable-ui/active-transition).

- Last working version: **6.5.0**
- Current version: **7.0.0** (migration shim only)

---

## 📖 Overview

`@reusable-ui/active-as-click` was a styling utility that made **active components appear as if they were pressed/clicked**.  

- When a component was marked `active={true}`, it reused the **pressed styles** from `@reusable-ui/clickable`.  
- This was mainly used for toggle buttons and similar activatable components, so they looked “pressed in” when toggled on.  
- Internally, it bridged **activatable** and **clickable** states with CSS variables and dummy keyframes.

---

## ⚠️ Deprecation Notice

As of **v7.0.0**, this package has been deprecated:

- There is **no 1:1 equivalent replacement** — `active-as-click` is broken by design and should not be used in new code.  
- It now exists **only as a migration guide** to help developers transition.  
- The recommended replacement is [`@reusable-ui/active-transition`](https://www.npmjs.com/package/@reusable-ui/active-transition), which provides a robust, theme‑aware CSS transition system for active states.  
- `usesActiveAsClick` delegates internally to `usesActiveTransition`, but all exports are marked `@deprecated`.

---

## 🧩 Migration Guide

To migrate from `@reusable-ui/active-as-click`:

1. **Remove all imports of `@reusable-ui/active-as-click`.**
   ```diff
   - import { usesActiveAsClick } from '@reusable-ui/active-as-click';
   + import { usesActiveTransition } from '@reusable-ui/active-transition';
   ```

2. **Replace usage of `usesActiveAsClick` with `usesActiveTransition`.**
   ```diff
   - const { activeAsClickRule } = usesActiveAsClick();
   + const { activeTransitionRule } = usesActiveTransition();
   ```

3. **Update styles/tests** to rely on `active-transition`’s perceptual brightness/contrast/saturate system instead of the old “pressed‑as‑click” hack.

4. **Replace usage of `activeAsClickVars` with `activeTransitionVars`**
   ```diff
   - const { activeAsClickVars } = usesActiveAsClick();
   + const { activeTransitionVars } = usesActiveTransition();
   ```

---

## 📚 Related Packages

- [`@reusable-ui/active-transition`](https://www.npmjs.com/package/@reusable-ui/active-transition) – Provides default CSS transitions for active state styling.  
- [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state) – Provides active/selected state management for components.

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **Note:** If you are still using `@reusable-ui/active-as-click`, upgrade to v7.0.0 and follow the migration guide above. Future versions will remove the package entirely.
