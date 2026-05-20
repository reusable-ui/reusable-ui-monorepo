# Introduction (Copilot → Gemini → Copilot)

> You declare the intent, and the variable network resolves it instantly.

**Neural CSS** is a **declarative styling framework** powered by an interconnected network of **CSS variables**.  
Instead of composing endless utility classes or writing brittle conditional CSS, you express styling intent with semantic class names (e.g. `th-primary`, `sz-lg`, `is-disabled`).  
The framework translates those intents into final styles through a layered variable cascade.

Intent (Classes) → Hidden Logic (Variable Layers) → Final Styles (Feature Variables)

## How It Works

- **Neural‑like Architecture**: Input classes propagate through hidden CSS variable layers, refining signals until the correct styles emerge.  
- **Zero Runtime Overhead**: States, variants, and complex logic resolve natively in the browser — no JavaScript required.  
- **Deterministic Flow**: Configs, themes, and states flow down a predictable pipeline, producing ready‑to‑use feature variables for background, text, borders, spacing, and more.

**Neural under the hood, declarative on the surface.**  
You define the intent; the network delivers the result.



# Introduction (Copilot → Gemini)
Neural CSS is a declarative styling framework powered by an interconnected network of CSS variables.
Instead of composing hundreds of utility classes or writing brittle, conditional CSS, you declare your styling intent using semantic class names (e.g., th-primary, sz-lg, is-disabled). The framework handles the rest through a layered variable cascade.

Intent (Classes) → Hidden Logic (Variable Layers) → Final Styles (Feature Variables)

## How It Works

* Neural Architecture: Input classes trigger a chain reaction through hidden, automated CSS variable layers.
* Zero Runtime Overhead: Complex logic, states, and variants resolve natively in the browser without JavaScript.
* Deterministic Flow: Configs, themes, and states flow down a predictable pipeline to output final, ready-to-use feature variables.

Neural under the hood, declarative on the surface. You define the intent; the network delivers the result.



# Introduction (Copilot)

> You declare what you want, and the framework reacts to make it happen.

**Neural CSS** is a **reactive CSS framework**, powered by **CSS variables**.  
Whenever component conditions change — states, variants, or configs — the system responds through a layered cascade pipeline, updating styles automatically.  
Like a neural network, inputs (classnames, configs) propagate through hidden layers of CSS variables until the correct styling emerges.  
This neural-like design ensures updates cascade instantly — colors, spacing, and effects adapt in real time — all without any JavaScript runtime overhead.

From the developer's perspective, it is **declarative‑first**.  
Instead of writing **utility classes** like Tailwind, or manually hand crafted using CSS/SASS, you declare styling intents (e.g. `className="th-primary sz-lg is-disabled"`) and consume ready‑to‑use **CSS variables** for background, text color, border, padding, radius, and more.  
Variants, states, and effects drive these variables automatically, so your components adapt without hand crafted conditional CSS rules.

In short: **Neural under the hood, declarative at the surface.**  
You focus on intent, the framework deliver the result.



## Comparison with Tailwind

| Concept      | Neural CSS                                           | Tailwind CSS                                            |
|--------------|------------------------------------------------------|---------------------------------------------------------|
| Work         | Styling with **utility CSS variables**               | Styling with **utility classes**                        |
| Variants     | Declaratively toggled via classnames (`th-primary`)  | Suffixes on utility classes (`bg-primary-300`)          |
| States       | Declaratively toggled via classnames (`is-disabled`) | Prefixes on utility classes (`disabled:opacity-50`)     |
| Stylesheets  | Authored in **CSS-in-JS (`*.ts`/`*.js`)**            | Authored in **custom CSS**                              |
| Compiled     | Native CSS understood by the browser                 | Native CSS understood by the browser                    |

# Declarative-First Styling

Neural CSS builds complex component styles from a **managed set of CSS variables**, implicitly driven by active **variants** and **states**.  
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
    // Declare the intents:
    
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
    
    
    // Return a structured styling:
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
        // - Let @reactive-css/framework provide the correct values automatically for you:
        background : backgroundFeatureVars.backg, // → var(--bg-backg)
        color      : foregroundFeatureVars.color, // → var(--fg-color)
        
        // Optionally declare the nested styling, with similar pattern to the root one:
        ...children('.item', { // CSS equivalent: `> .item { ... }`
            // Your usual styling goes here...
            // Attach desired variant, features, etc; here...
            
            ...children(['header', 'footer'], { // CSS equivalent: `> :is(header, footer) { ... }`
                // Your usual styling goes here...
                // Attach desired variant, features, etc; here...
                
                // You can also attach your reusable component style (a CSS hook ending with `*Style`)
                ...usingOtherComponentStyle(),
            }),
        }),
    });
};
```

Proposed future SASS version:

```scss
.the-component {
    // Your usual styling goes here:
    display : grid;
    opacity : 0.5;
    
    // Attach desired variants:
    @include themeVariantRule(); // Reacts to theme classnames (`.th-primary`, `.th-success`, etc.)
    @include sizeVariantRule($componentVars, (sm, md, lg)); // Reacts to size classnames (`.sz-sm`, `.sz-md`, `.sz-lg`, etc.)
    
    // Attach desired features:
    @include backgroundFeatureRule(white); // Resolves background based on active variants & states.
    @include foregroundFeatureRule(black); // Resolves foreground based on active variants & states.
    
    // Use managed CSS variables:
    // - Let @reactive-css/framework provide the correct values automatically for you:
    background : var(--backgroundFeature-backg);
    color      : var(--foregroundFeature-color);
}
```

The CSS-in-JS above compiles ahead-of-time or JIT into native CSS that browsers understand.



## How It Works (Copilot → Gemini → Copilot)

Think of the system as a **layered variable cascade**. Styling intents and configuration values flow through a pipeline of interconnected CSS variables until they resolve into final visual styles.

Intent Classes (Developer Input)  
       ↓  
Intent Variables (Initial State Activation)  
       ↓  
Intermediate Logic Layers (Hidden Conditional Resolution)  
       ↓  
Feature Variables (Final Resolved Values)  
       ↓  
Final CSS Properties (Native Browser Rendering)

---

### 1. Intent Classes
- **Developer Action**: Apply semantic class names like `th-primary`, `sz-lg`, or `is-disabled`.  
- **Purpose**: Express *what you want*, fully decoupled from implementation details.

### 2. Intent Variables
- **System Action**: Autogenerated rules map your classes to entry‑point tokens.  
- **Example**: `.th-primary` injects values into `--th-bg-regular` and `--th-bg-outlined`.

### 3. Intermediate Logic Layers
- **System Action**: Hidden, multi‑step CSS variable networks resolve conditions natively.  
- **Logic Handling**: Combines design configs (spacing, color scales) with state overrides.  
- **Example**: An `is-invalid` state forces danger colors (`--c-danger-*`) even if a theme is applied.  
- **Neural Analogy**: Functions like a feed‑forward network — each layer refines the styling signal before passing it forward.

### 4. Feature Variables
- **System Action**: Exposes fully resolved, clean output values.  
- **Output**: Ready‑to‑consume tokens such as `--bg-backg`, `--fg-color`, and `--bd-border`.

### 5. Final CSS Properties
- **Developer Action**: Use feature variables directly in component styles.  
- **Flexibility**: Assign them natively (`color: var(--fg-color)`) or combine with formulas like `color-mix()`.

---

### Native Reactivity
Because the system relies entirely on the **native CSS cascade**, the architecture is inherently reactive:

- **Zero JS Overhead**: Class changes trigger immediate style recalculation in the browser.  
- **Global Ripples**: Updating a high‑level config variable instantly propagates through all dependent layers.  
- **Predictable Flow**: Styling data moves deterministically from declarative intent to pixel‑perfect layout.



## How It Works (Copilot → Gemini)
Think of the system as a layered variable cascade. Styling intents and configs flow through a pipeline of interconnected CSS variables until they resolve into final visual styles.

Intent Classes (Developer input)
       ↓
Intent Variables (Initial state activation)
       ↓
Intermediate Logic Layers (Hidden conditional resolution)
       ↓
Feature Variables (Final resolved values)
       ↓
Final CSS Properties (Native browser rendering)

### 1. Intent Classes

* Developer Action: You apply semantic class names like th-primary, sz-lg, or is-disabled.
* Purpose: Expresses what you want, completely decoupling intent from implementation details.

### 2. Intent Variables

* System Action: Autogenerated rules map your classes directly to token entry points.
* Example: .th-primary injects specific values into --th-bg-regular and --th-bg-outlined.

### 3. Intermediate Logic Layers

* System Action: Hidden, multi-step CSS variable networks process conditions natively.
* Logic Handling: Combines design configs (spacing, color scales) with state overrides.
* Example: Forcing danger colors (--c-danger-*) if an is-invalid state overrides a theme choice.
* Neural Analogy: Acts like a feed-forward network where each layer refines the styling signal.

### 4. Feature Variables

* System Action: Exposes the fully resolved, clean output values.
* Output: Ready-to-consume tokens like --bg-backg, --fg-color, and --bd-border.

### 5. Final CSS Properties

* Developer Action: Use the feature variables inside your component styles.
* Flexibility: Assign them directly (color: var(--fg-color)) or use native formulas like color-mix().

------------------------------
### Native Reactivity
Because this network relies strictly on the native CSS cascade, the architecture is instantly reactive:

* Zero JS Overhead: Class changes trigger immediate style calculations natively in the browser.
* Global Ripples: Changing a high-level config variable instantly updates all dependent downstream layers.
* Predictable Flow: Data moves forward deterministically from declarative intent to pixel layout.



## How It Works (Copilot)

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

This makes **@reactive-css/framework** both **declarative-first** (developer declares intent) and **reactive by design** (system adapts through cascading variables and inferred configs).

## CSS Hooks (`usingSomething()`)

A **CSS hook** is a **declarative styling intent function** prefixed with `using*`.  
It’s designed to mimic the familiar **React hook pattern**, but for styling — making React developers feel at home when authoring CSS in JS/TS.

- A CSS hook directly/indirectly return **structured data objects**, so you can build complex styles with predictable composition.  
- Example: `themeVariantRule()` returns something like `{ [Symbol()]: ['&', { ... }] }`.  
- Spreading `...themeVariantRule()` merges that structured rule into the parent style object.  
- The final `usingComponentStyle()` returns a **complete styling object**, ready to be transpiled into native CSS.  
- CSS hooks are **composable**: you can import/export them across modules.  
- They run once during **ahead‑of‑time compilation** to native CSS, and may perform **incremental JIT updates** at runtime if dynamic styling is enabled.
- CSS hooks prefixed with `using*` and suffixed with `*Style` are **component style hooks**.  
- Component style hooks are special: they represent a **complete style unit**, analogous to a functional React component.  

## Philosophy

- **Declarative-first**: you declare variants and states, the system resolves the correct colors, spacing, and other values automatically.  
- **CSS-runtime**: logic lives in class toggles → CSS variables; no JavaScript runtime is required for styling.  

---

🚀 **Neural CSS** brings the clarity of Tailwind's utility-first approach, but with a declarative, CSS-variable-driven system designed for React and modern CSS-in-JS workflows.

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

**Neural CSS is a declarative-first CSS framework that turns classnames into managed CSS variables.**  
Instead of writing utility classes, you declare variants and states (`th-primary`, `sz-lg`, `is-disabled`) and let the framework resolve the correct background, text color, border, padding, radius, and more.  
With logic living entirely in CSS variables, your components adapt automatically — no manual conditionals, no runtime overhead, just clean, predictable styling powered by intent.  

**Neural CSS** is a **declarative-first CSS framework**: you declare styling intents (`th-primary sz-lg is-disabled`), and the system resolves the correct background, text, border, spacing, and effects automatically.  
At the same time, it's **reactive by design**: classnames and config changes trigger a chain reaction through CSS variables, ensuring styles adapt instantly without manual conditionals or runtime overhead.  

### 📌 This version emphasizes:  
- **Declarative-first philosophy** (intent → resolved styles).  
- **Utility variables vs utility classes** (your differentiator from Tailwind).  
- **Automatic adaptation** (variants/states drive features).  
- **No runtime overhead** (CSS-driven, not JS-driven).  
- **Declarative-first** is the **developer-facing identity** (what you do).  
- **Reactive by design** is the **system-facing philosophy** (how it works).  
- Together, they give you a unique positioning: *intent-driven styling that adapts automatically*.  
