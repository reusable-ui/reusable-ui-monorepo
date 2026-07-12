# @reusable-ui/css-prefix-default ✅  

**css-prefix-default** provides a centralized **default CSS variable prefixes** across the Reusable-UI core system.  
It ensures each domain — **configs**, **variants**, **features**, **states**, and **effects** — has a unique, predictable, and consistent prefixes.

This package makes it easy to maintain **unique defaults** across the monorepo without manual inspection or accidental collisions.

⚠️ **Note for contributors**:  
This package is intended for **Reusable-UI maintainers only**.  
Public users creating their own components, configs, states, and effects should define their own `*-default` modules within their projects, rather than depending on this internal package.  
Contributors may submit fixes or improvements to make the Reusable-UI core better. See the **Naming Convention Guide** below for alignment.

## Purpose
✔ Avoids prefix collisions across packages in the monorepo  
✔ Provides a single source of truth for default prefix strings  
✔ Ensures predictable, mnemonic naming across configs, variants, features, states, and effects  
✔ Simplifies maintenance by centralizing defaults in one place  

## 📦 Installation
Install **@reusable-ui/css-prefix-default** via npm or yarn:

```sh
npm install @reusable-ui/css-prefix-default --save-peer
# or
yarn add @reusable-ui/css-prefix-default --peer
```

> ⚠️ Install as a **peer dependency** so all domains refer to a single source of truth, avoiding unintended prefix conflicts.

## Usage

Import the default prefixes when defining `cssConfig` or `cssVars` in your package:

```ts
import {
    // Configs:
    defaultColorConfigPrefix,
    defaultSpacerConfigPrefix,
    
    // Variants:
    defaultThemeVariantPrefix,
    
    // States:
    defaultDisabledStatePrefix,
    
    // Effects:
    defaultDisabledEffectPrefix,
} from '@reusable-ui/css-vars-default';

// color-config:
const colorConfig = cssConfig(() => { ... }, { prefix: defaultColorConfigPrefix });

// spacer-config:
const spacerConfig = cssConfig(() => { ... }, { prefix: defaultSpacerConfigPrefix });

// theme-variant:
export const [themeVariantVars, themeVariantOptions] = cssVars<ThemeVariantVars>({
    prefix: defaultThemeVariantPrefix,
    minify: false,
});

// disabled-state:
export const [disabledStateVars, disabledStateOptions] = cssVars<DisabledStateVars>({
    prefix: defaultDisabledStatePrefix,
    minify: false,
});

// disabled-effect:
export const [disabledEffectVars, disabledEffectOptions] = cssVars<DisabledEffectVars>({
    prefix: defaultDisabledEffectPrefix,
    minify: false,
});
```

This avoids **hard-coded prefix strings**, reducing the risk of accidental collisions or inconsistent naming.

## Exported Constants

| Constant                          | Value |
|-----------------------------------|-------|
| defaultColorConfigPrefix          | c     |
| defaultColorParamConfigPrefix     | cp    |
| defaultBorderConfigPrefix         | b     |
| defaultRadiusConfigPrefix         | r     |
| defaultSpacerConfigPrefix         | s     |
| defaultBreakpointConfigPrefix     | bp    |
| defaultTypoConfigPrefix           | t     |
| defaultSecondaryConfigPrefix      | sec   |
| defaultParagraphConfigPrefix      | p     |
| defaultLeadConfigPrefix           | lead  |
| defaultHeadingConfigPrefix        | h     |
| defaultDisplayConfigPrefix        | disp  |
| defaultBlockquoteConfigPrefix     | bq    |
| defaultPlainListConfigPrefix      | pl    |
| defaultMarkConfigPrefix           | mark  |
| defaultKbdConfigPrefix            | kbd   |
| defaultCodeConfigPrefix           | code  |
| defaultHorzSeparatorConfigPrefix  | hr    |
| defaultVertSeparatorConfigPrefix  | vr    |
| defaultOrientationVariantPrefix   | ot    |
| defaultFlowDirectionVariantPrefix | fd    |
| defaultSizeVariantPrefix          | sz    |
| defaultThemeVariantPrefix         | th    |
| defaultEmphasisVariantPrefix      | em    |
| defaultOutlinedVariantPrefix      | ou    |
| defaultMildVariantPrefix          | mi    |
| defaultStrippedVariantPrefix      | st    |
| defaultBackgroundFeaturePrefix    | bg    |
| defaultForegroundFeaturePrefix    | fg    |
| defaultDecorationFeaturePrefix    | dn    |
| defaultBorderFeaturePrefix        | bd    |
| defaultRingFeaturePrefix          | rg    |
| defaultPaddingFeaturePrefix       | pd    |
| defaultAnimationFeaturePrefix     | an    |
| defaultFilterFeaturePrefix        | fi    |
| defaultTransformFeaturePrefix     | tr    |
| defaultBoxShadowFeaturePrefix     | bs    |
| defaultDisabledStatePrefix        | dis   |
| defaultReadOnlyStatePrefix        | ro    |
| defaultFocusStatePrefix           | foc   |
| defaultHoverStatePrefix           | hov   |
| defaultPressStatePrefix           | prss  |
| defaultValidityStatePrefix        | val   |
| defaultDragStatePrefix            | drag  |
| defaultSortStatePrefix            | sort  |
| defaultExcitedStatePrefix         | exc   |
| defaultCollapseStatePrefix        | col   |
| defaultActiveStatePrefix          | act   |
| defaultViewStatePrefix            | view  |
| defaultDisabledEffectPrefix       | dise  |
| defaultReadOnlyEffectPrefix       | roe   |
| defaultFocusEffectPrefix          | foce  |
| defaultHoverEffectPrefix          | hove  |
| defaultPressEffectPrefix          | prsse |
| defaultValidityEffectPrefix       | vale  |
| defaultDragEffectPrefix           | drage |
| defaultSortEffectPrefix           | sorte |
| defaultExcitedEffectPrefix        | exce  |
| defaultCollapseEffectPrefix       | cole  |
| defaultActiveEffectPrefix         | acte  |
| defaultViewEffectPrefix           | viewe |

## 📖 Naming Convention Guide

Default prefixes follow a consistent rule set to ensure clarity, predictability, and collision-free usage across the Reusable-UI system.  
**General rule:** prefixes are short and mnemonic, typically **1–4 characters**, with a few accepted exceptions for clarity.

To help enforce these rules, we use a custom **ESLint rule**:  
`css-prefix-default/enforce-css-prefix-defaults`  
This rule automatically validates:
- Correct naming patterns (e.g. `default<Domain><Group>Prefix`)
- Prefix length constraints (1–4 chars, with allowed exceptions for effects)
- Reserved word restrictions (avoiding collisions with JS/TS keywords or common english words)
- Uniqueness across the monorepo

This ensures that contributors don't need to memorize every detail — violations are flagged during development.

### Configs
- **Primitive configs** → use **1 character** whenever possible (e.g. `c` for color, `b` for border).  
- **Component-like configs** → use the **tag name directly** if short (e.g. `p`, `h`, `mark`, `kbd`, `code`, `hr`), otherwise use a clear abbreviation (e.g. `disp`, `bq`, `pl`).  
- **Complement configs** → use a **longer abbreviation or full word** (up to 4 chars) to distinguish from their primary companion (e.g. `sec`, `lead`, `disp`).  
- See inline comments in `// Configs:` for detailed rationale.

### Variants
- Represent **synthetic styling states** (analogous to `:outlined`, `:theme(primary)`), not semantic conditions.  
- **General rule:** 2–4 characters, short and mnemonic (e.g. `ot`, `fd`, `sz`, `th`).  
- See inline comments in `// Variants:` for details.

### Features
- Represent **actual CSS property implementations** for certain CSS properties that exclusively managed by system.  
- **General rule:** 2–4 characters, short and mnemonic (e.g. `bg`, `fg`, `bd`, `rg`, `pd`, `bs`).  
- **System-managed**: dynamically applied based on active **variants** and **states → effects**.  
- Only listed features are managed; other CSS properties remain free for manual styling.  
- See inline comments in `// Features:` for details.

### States
- Represent **CSS pseudo-classes or custom UI states** reflecting the semantic conditions.  
- **General rule:** 2–4 characters, short and mnemonic (e.g. `dis`, `hov`, `foc`, `prss`).  
- Some use full 4-character words (`drag`, `sort`, `view`) for readability.  
- See inline comments in `// States:` for details.

### Effects
- Represent **visual complements of states**, almost 1–1 mappings.  
- **General rule:** append `e` to the state prefix for predictability.  
- Typically 2–4 characters, but some extend to 5 characters (`prsse`, `drage`, `sorte`, `viewe`) for clarity.  
- Read-only effect (`roe`) is reserved for future use.  
- See inline comments in `// Effects:` for details.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/css-prefix-default** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/css-prefix-default**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/css-prefix-default delivers predictable, centralized prefix management for configs, variants, features, states, and effects.**  
Give it a ⭐ on GitHub if you find it useful!
