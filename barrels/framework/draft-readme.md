# Introduction

**@reusable-ui/framework** is a **declarative-first CSS framework**, powered by **CSS variables**.  
Instead of writing **utility classes** like Tailwind, you declare styling intents (e.g. `className="th-primary sz-lg is-disabled"`) and consume ready-to-use **CSS variables** for background, text color, border, padding, radius, and more.  
Variants, states, and effects drive these variables automatically, so your components adapt without manual CSS conditionals.

At the same time, the framework is **reactive by design**, whenever classnames or configuration values change, the system reacts through a layered variable pipeline.  
This reactivity ensures that updates cascade instantly — colors, spacing, and effects adjust in real time — without any JavaScript runtime overhead.


## Comparison with Tailwind

| Concept      | Reusable-UI Framework                                | Tailwind                                                |
|--------------|------------------------------------------------------|---------------------------------------------------------|
| Work         | Styling with **utility CSS variables**               | Styling with **utility classes**                        |
| Variants     | Declaratively toggled via classnames (`th-primary`)  | Suffixes on utility classes (`bg-primary-300`)          |
| States       | Declaratively toggled via classnames (`is-disabled`) | Prefixes on utility classes (`disabled:opacity-50`)     |
| Stylesheets  | Authored in **CSS-in-JS (`*.ts`/`*.js`)**            | Authored in **custom CSS**                              |
| Compiled     | Native CSS understood by the browser                 | Native CSS understood by the browser                    |

# Declarative-First Styling

Reusable-UI builds complex component styles from a **managed set of CSS variables**, implicitly driven by active **variants** and **states**.  
You declare intent (`th-primary`, `sz-lg`, `is-disabled`, etc.), and the framework provides the **correct** background, foreground, border, padding, radius, and other properties.

### Managed Features

The following **10 CSS properties** are system-managed:

1. background (colors, image layers)  
2. foreground (text color)  
3. decoration (icons, graphics)  
4. border (color, width)  
5. ring (focus indicators)  
6. padding  
7. animation  
8. filter  
9. transform  
10. box shadow

These properties must be assigned via their **feature variables**.  
Other CSS properties remain free for manual styling.

See the example below:

```ts
return style({
    // Managed (feature variables must be applied):
    // - Colors, paddings, animations, box shadow, etc are automatically resolved.
    background : backgroundFeatureVars.backg,    // → var(--bg-backg)
    color      : foregroundFeatureVars.color,    // → var(--fg-color)
    border     : borderFeatureVars.border,       // → var(--bd-border)
    animation  : animationFeatureVars.anim,      // → var(--an-anim)
    boxShadow  : boxShadowFeatureVars.boxShadow, // → var(--bs-boxShadow)
    // .........
    
    // Unmanaged (free styling):
    display    : 'grid',
    opacity    : 0.5,
    margin     : 'var(--my-variable)',
});
```

## Example: Component Styling

```ts
export const usingComponentStyle = () => {
    // Theme variant:
    const { themeVariantRule, themeVariantVars } = usingThemeVariant();
    
    // Size variant:
    const { sizeVariantRule } = usingSizeVariant(componentVars, {
        supportedSizes: ['sm', 'md', 'lg'],
    });
    
    // Background feature:
    const { backgroundFeatureRule, backgroundFeatureVars } = usingBackgroundFeature({
        backgroundColor: 'white', // Default unthemed background color.
    });
    
    // Foreground feature:
    const { foregroundFeatureRule, foregroundFeatureVars } = usingForegroundFeature({
        foregroundColor: 'black', // Default unthemed text color.
    });
    
    return style({
        // Your usual styling goes here:
        display : 'grid',
        opacity : 0.5,
        
        // Attach desired variants:
        ...themeVariantRule(), // Reacts to theme classnames (`.th-primary`, `.th-success`, etc.)
        ...sizeVariantRule(),  // Reacts to size classnames (`.sz-sm`, `.sz-md`, `.sz-lg`, etc.)
        
        // Attach desired features:
        ...backgroundFeatureRule(), // Resolves background based on active variants & states.
        ...foregroundFeatureRule(), // Resolves foreground based on active variants & states.
        
        // Use managed CSS variables:
        // - Let @reusable-ui/framework provide the correct values automatically for you:
        background : backgroundFeatureVars.backg, // → var(--bg-backg)
        color      : foregroundFeatureVars.color, // → var(--fg-color)
    });
};
```

The CSS-in-JS above compiles ahead-of-time or JIT into native CSS that browsers understand.

## How It Works

Think of the system as a **layered variable cascade** — a pipeline where styling intents and configs flow through interconnected CSS variables until they resolve into final feature values:

```text
Intent classnames (React side)
   ↓
Intent variables (e.g. `.th-primary { --th-bg-regular: ..., --th-bg-outlined: ... }`)
   ↓
Intermediate logic layers (e.g. switching background color for scenarios: regular / outlined / invalid / unthemed)
   ↓
Feature variables (e.g. `--bg-backg`, `--fg-color`, `--bd-border`)
   ↓
Final CSS properties (background, color, border, box shadow, etc.)
```

1. **Intent classnames**  
   - Declared by developers via classnames (`th-primary`, `sz-lg`, `is-disabled`).  
   - Express *what you want*, not how it's implemented.  

2. **Intent variables**  
   - Autogenerated by attached variants and states (`...themeVariantRule()`, `...disabledStateRule()`, etc.).  
   - React directly to declared intents, producing the initial input variables.  

3. **Intermediate logic layers**  
   - Autogenerated by attached features and effects (`...backgroundFeatureRule()`, `...disabledEffectRule()`, etc.).  
   - Hidden resolution layers, often multi-step.  
   - Infer values from **config variables** (colors, borders, spacings, etc.).  
   - Apply conditional logic (e.g. ignore theme intent when invalid → force `--c-danger-*` colors).  
   - Behave like a neural network: each layer refines the signal before passing it forward.  

4. **Feature variables**  
   - Exposed by corresponding features and effects.  
   - Final resolved values ready for consumption (e.g. `--bg-backg`, `--fg-color`, `--bd-border`, `--bs-boxShadow`).  
   - Directly assignable to `background`, `color`, `border`, `box-shadow`, etc.  

5. **Final CSS properties**  
   - Developers decide how to apply feature variables:  
     - Directly assign into CSS properties (e.g. `color: var(--fg-color);`).  
     - Or as inputs to custom formulas (e.g. `color-mix(... var(--fg-color) ...)`).  

### Reactivity
Because everything is powered by **CSS variables**, the system is inherently **reactive**:  
- Classname changes instantly propagate through the variable cascade.  
- Config variable updates (colors, borders, spacings, etc.) ripple across intermediate layers.  
- Feature variables update in real time, ensuring styles adapt automatically without JavaScript runtime overhead.  

This makes **@reusable-ui/framework** both **declarative-first** (developer declares intent) and **reactive by design** (system adapts through cascading variables and inferred configs).

## Philosophy

- **Declarative-first**: you declare variants and states, the system resolves the correct colors, spacing, and other values automatically.  
- **CSS-runtime**: logic lives in class toggles → CSS variables; no JavaScript runtime is required for styling.  

---

🚀 **Reusable-UI Framework** brings the clarity of Tailwind's utility-first approach, but with a declarative, CSS-variable-driven system designed for React and modern CSS-in-JS workflows.

---

## Tagline Ideas
- **“Build adaptive UIs declaratively, powered by CSS variables.”** (📌 top recommendation)  
- **“Declarative-first for developers, reactive by design under the hood.”** (📌 alternate recommendation)
- **“Design with intent — let variants and states resolve the styles.”**  
- **“Declarative styling made simple: utility variables, not utility classes.”**  
- **“Reusable-UI Framework: a CSS variable engine for modern design systems.”**  
- **“Compose styles with classnames, consume them as variables.”**  
- **“From intent to style — declarative UI without manual CSS.”**  

### 📌 Why These Work
- They mirror Tailwind's **utility-first clarity**, but highlight your **declarative-first approach**.  
- They emphasize **automation** (variants/states drive styles) and **simplicity** (consume variables, not write conditionals).  
- They position your framework as a **design engine** rather than just a CSS toolkit.  

## Sub-Headline

**Reusable-UI Framework is a declarative-first CSS framework that turns classnames into managed CSS variables.**  
Instead of writing utility classes, you declare variants and states (`th-primary`, `sz-lg`, `is-disabled`) and let the framework resolve the correct background, text color, border, padding, radius, and more.  
With logic living entirely in CSS variables, your components adapt automatically — no manual conditionals, no runtime overhead, just clean, predictable styling powered by intent.  

**@reusable-ui/framework** is a **declarative-first CSS framework**: you declare styling intents (`th-primary sz-lg is-disabled`), and the system resolves the correct background, text, border, spacing, and effects automatically.  
At the same time, it's **reactive by design**: classnames and config changes trigger a chain reaction through CSS variables, ensuring styles adapt instantly without manual conditionals or runtime overhead.  

### 📌 This version emphasizes:  
- **Declarative-first philosophy** (intent → resolved styles).  
- **Utility variables vs utility classes** (your differentiator from Tailwind).  
- **Automatic adaptation** (variants/states drive features).  
- **No runtime overhead** (CSS-driven, not JS-driven).  
- **Declarative-first** is the **developer-facing identity** (what you do).  
- **Reactive by design** is the **system-facing philosophy** (how it works).  
- Together, they give you a unique positioning: *intent-driven styling that adapts automatically*.  
