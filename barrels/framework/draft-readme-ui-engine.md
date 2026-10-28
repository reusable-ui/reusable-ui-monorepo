# UI Engine (`@ui-engine/core`)

> A declarative-first architectural engine and primitive toolkit for building custom component systems from scratch—powered by managed CSS variables and robust JavaScript state/interaction primitives.

---

## 🚀 Overview

**UI Engine** is **not a ready-to-use component library**. Instead, it is the foundational framework and underlying engine designed to help you author robust, highly customizable UI components with complete control.

Rather than writing manual CSS conditionals or locking yourself into rigid component implementations, **UI Engine** bridges the gap between JavaScript behavior and CSS styling:

* **Declarative Intent:** Developers apply semantic classes (`.th-primary`, `.sz-lg`, `.is-disabled`) to express *what* they want, completely decoupled from implementation details.


* **Factor-Driven Signals:** Interactive states and transitions expose smooth numeric progression factors ($0 \leftrightarrow 1$) to drive animations and effects.


* **CSS-Variable Cascading Pipeline:** Configurations, variants, and states flow through a multi-layered CSS variable pipeline, resolving final properties (background, foreground, border, shadows) natively with **zero runtime styling overhead**.


* **JavaScript-Powered Primitives:** Beyond styling hooks, it includes advanced JavaScript logic for complex behaviors like pointer-tracked drag gestures, DOM-snapshotting sort mechanics, focus trapping, and context inheritance.



---

## 📦 What’s Inside? (Module Architecture)

The framework is organized into comprehensive subsystem modules exported through `@ui-engine/core`:

1. **Configurations (`@ui-engine/*-config`):** Acts as the single source of truth for global design tokens (colors, borders, radii, spacers, breakpoints, and typography) exposed as CSS configuration variables.


2. **Universal Utilities:** Low-level helpers for strict prop validation, numeric precision, React node handling, CSS resets, SSR/client environment checks, isomorphic hooks, lifecycles, and directionality (RTL/LTR).


3. **Variants & Resolvers:** Non-semantic visual variations (theme, size, orientation, flow-direction, outlined, mild, emphasized, stripped) that expose their toggled state via numeric factors.


4. **Features & Effects (CSS Builders):** Core visual property engines (background, foreground, decoration, border, ring, padding, animation, filter, transform, box-shadow) that merge configs, variants, and states into clean output variables (e.g., `--bg-backg`, `--fg-color`).


5. **States & Observers:** Tracks semantic component conditions (disabled, read-only, focus, hover, press, validity, drag, collapse, view, sort) and exposes smooth progression factors for animations.


6. **Layouts & Interactions:** Structural wrappers like stacked layouts, drag-and-drop orchestration, and advanced keyboard/focus management.



---

## 🛠️ Quick Example: Building a Component Style

Here is how you can use **UI Engine** to author a custom component style in TypeScript:

```ts
import { style, children } from '@ui-engine/styles';
import { usingThemeVariant, usingSizeVariant } from '@ui-engine/core';
import { usingBackgroundFeature, usingForegroundFeature } from '@ui-engine/core';

export const usingComponentStyle = () => {
    // 1. Declare intent variants
    const { themeVariantRule } = usingThemeVariant();
    const { sizeVariantRule }  = usingSizeVariant();
    
    // 2. Declare visual feature builders
    const { backgroundFeatureRule, backgroundFeatureVars } = usingBackgroundFeature({
        backgroundColor: 'white', // Fallback unthemed background
    });
    const { foregroundFeatureRule, foregroundFeatureVars } = usingForegroundFeature({
        foregroundColor: 'black', // Fallback unthemed text color
    });
    
    // 3. Compose and return the structured style
    return style({
        display: 'grid',
        
        // Bind variant rules (reacts to .th-*, .sz-*, etc.)[cite: 1]
        ...themeVariantRule(),
        ...sizeVariantRule(),
        
        // Bind feature rules
        ...backgroundFeatureRule(),
        ...foregroundFeatureRule(),
        
        // Consume framework-managed CSS variables[cite: 1]
        background : backgroundFeatureVars.backg, // → var(--bg-backg)
        color      : foregroundFeatureVars.color, // → var(--fg-color)
    });
};

```

---

## 🧠 The Architecture Pipeline

1. **Intent Classnames:** Developers apply semantic class names (`th-primary`, `sz-lg`, `is-disabled`).


2. **Intent Variables:** Variants and states intercept these classes to generate initial input signals.


3. **Intermediate Logic Layers:** Features and effects act like a neural network pipeline, inferring values from design configs and handling conditional overrides (e.g., an `is-invalid` state forces danger colors).


4. **Feature Variables:** Clean, final output variables (`--bg-backg`, `--fg-color`, `--bd-border`) ready for direct consumption in component styles.



---

## 📄 License

MIT © UI Engine Team