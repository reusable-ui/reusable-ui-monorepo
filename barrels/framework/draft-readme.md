# Introduction

**@reusable-ui/framework** is a **declarative-first CSS framework** built on (powered by) **CSS variables**.  
Instead of writing **utility classes** like Tailwind, you declare styling intents (e.g. `className="th-primary sz-lg is-disabled"`) and consume ready-to-use **css variables** for background, text color, border, padding, radius, and more.  
Variants, states, and effects drive these variables automatically, so your components adapt without manual CSS conditionals.

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
10. shadow (box-shadow layers)

These properties must be assigned via their **feature variables**.  
Other CSS properties remain free for manual styling.

See the example below:

```ts
return style({
    // Managed (feature variables must be applied):
    // - Colors, paddings, animations, shadow, etc are automatically resolved.
    background : backgroundFeatureVars.backg, // → var(--bg-backg)
    color      : foregroundFeatureVars.color, // → var(--fg-color)
    border     : borderFeatureVars.border,    // → var(--bd-border)
    animation  : animationFeatureVars.anim,   // → var(--an-anim)
    boxShadow  : shadowFeatureVars.shadow,    // → var(--sh-shadow)
    // .........
    
    // Unmanaged (free styling):
    display    : 'grid',
    opacity    : 0.5,
    margin     : 'var(--my-variable)',
});
```

## Example: Component Styling

```ts
export const componentStyle = () => {
    // Theme variant:
    const { themeVariantRule, themeVariantVars } = usesThemeVariant();
    
    // Size variant:
    const { sizeVariantRule } = usesSizeVariant(componentVars, {
        supportedSizes: ['sm', 'md', 'lg'],
    });
    
    // Background feature:
    const { backgroundFeatureRule, backgroundFeatureVars } = usesBackgroundFeature({
        backgroundColor: 'white', // Default unthemed background color.
    });
    
    // Foreground feature:
    const { foregroundFeatureRule, foregroundFeatureVars } = usesForegroundFeature({
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

## Philosophy

- **Declarative-first**: you declare variants and states, the system resolves the correct colors, spacing, and other values automatically.  
- **CSS-runtime**: logic lives in class toggles → CSS variables; no JavaScript runtime is required for styling.  

---

🚀 **Reusable-UI Framework** brings the clarity of Tailwind's utility-first approach, but with a declarative, CSS-variable-driven system designed for React and modern CSS-in-JS workflows.

---

## Tagline Ideas
- **“Build adaptive UIs declaratively, powered by CSS variables.”** (📌 top recommendation)  
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

### 📌 This version emphasizes:  
- **Declarative-first philosophy** (intent → resolved styles).  
- **Utility variables vs utility classes** (your differentiator from Tailwind).  
- **Automatic adaptation** (variants/states drive features).  
- **No runtime overhead** (CSS-driven, not JS-driven).  
