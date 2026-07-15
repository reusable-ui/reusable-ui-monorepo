# 📐 Design System Naming Guidelines: Packages, JSDocs, and Control Props

To resolve naming confusion, apply this fundamental distinction: Variants represent static visual design choices, while States represent dynamic runtime behaviors.

## 🎨 1. For Design Variants

Variants describe layout, theme, or styling configurations. Use this naming priority:

   1. Pure Nouns: Use if it describes an inherent structural attribute (e.g., size, orientation, direction).
   2. Adjectives (-ed): Use if it describes a visual style applied to the component (e.g., outlined, stripped).

## ⚡ 2. For Behavioral States

States describe runtime event interactions and systems. Use this naming priority:

   1. Pure Nouns: Keep as a noun if it functions natively as a tech category (e.g., focus, hover, drag, sort).
   2. Compound Nouns: Use paired base verbs for two-way toggle machines (e.g., expand/collapse).
   3. Adjectives (-ed): Fall back to this form only if there is no natural technical noun form available (e.g., disabled, excited).



## 🎨 Design Variants
Packages managing design variants encapsulate static styling logic, themes, and layouts. The package naming and JSDoc phrasing align deliberately with the props used for component layouts.

| Package Name | Control Prop | JSDoc Phrasing | Architectural Logic |
|---|---|---|---|
| /orientation-variant | orientation | Resolves the orientation variant... | Pure noun representing an inherent structural attribute. |
| /flow-direction-variant | flowDirection | Resolves the flow direction variant... | Pure noun representing an alignment attribute. |
| /size-variant | size | Resolves the size variant... | Pure noun representing a scale attribute. |
| /theme-variant | theme | Resolves the theme variant... | Pure noun representing a visual configuration system. |
| /emphasiz<span style="color: red;">ed</span>-variant | emphasiz<span style="color: red;">ed</span> | Resolves the emphasiz<span style="color: red;">ed</span> variant... | Past-participle adjective is chosen because the variant is a visual style modifier. |
| /mild-variant | mild | Resolves the mild variant... | Pure adjective describing a softened visual style. |
| /outlin<span style="color: red;">ed</span>-variant | outlin<span style="color: red;">ed</span> | Resolves the outlin<span style="color: red;">ed</span> variant... | Past-participle adjective is chosen because this variant describes a visual treatment rather than a system domain. |
| /stripp<span style="color: red;">ed</span>-variant | stripp<span style="color: red;">ed</span> | Resolves the stripp<span style="color: red;">ed</span> variant... | Past-participle adjective is chosen because it describes a visual stripped-down (borderless) container more clearly than a noun. |



## ⚡ Behavioral States
Packages managing behavioral states encapsulate event listeners, runtime transitions, and interaction flows. The package name represents the System Domain (Noun Phrase), while the control props represent the Instance Status (Adjective).

| Package Name | Control Prop | JSDoc Phrasing | Architectural Logic |
|---|---|---|---|
| /excit<span style="color: red;">ed</span>-state | excit<span style="color: red;">ed</span> | Resolves the excit<span style="color: red;">ed</span> state... | Past-participle adjective is chosen because the state describes an instance's current condition rather than an underlying mechanism. |
| /disabl<span style="color: red;">ed</span>-state | disabl<span style="color: red;">ed</span> | Resolves the disabl<span style="color: red;">ed</span> state... | Past-participle adjective is chosen because disabled is the canonical platform-level status word for this condition. |
| /read-only-state | readOnly | Resolves the read-only state... | Fixed platform standard. Matches native form field behaviors. |
| /focus-state | focus<span style="color: red;">ed</span> | Resolves the focus state... | Pure noun representing the element targeting system. |
| /hover-state | hover<span style="color: red;">ed</span> | Resolves the hover state... | Pure noun representing the mouse/pointer tracking system. |
| /press-state | press<span style="color: red;">ed</span> | Resolves the press state... | Intentional Exception: Folder uses the interactive noun domain (press), while the prop tracks instance status. |
| /validity-state | validity | Resolves the validity state... | Pure noun representing the validation and form-verification subsystem. |
| /drag-state | dragg<span style="color: red;">ed</span> | Resolves the drag state... | Pure noun representing the interactive drag-and-drop system. |
| /sort-state | sort<span style="color: red;">ed</span> | Resolves the sort state... | Pure noun representing the data ordering system. |
| /active-state | active | Resolves the active state... | Pure adjective functioning cleanly as an interactive category identifier. |
| /collapse-state | expand<span style="color: red;">ed</span> | Resolves the expand/collapse state... | Updated to a balanced compound verbal-noun phrase representing the bi-directional machine. |
| /view-state | viewIndex | Resolves the view state... | Pure noun representing the viewport container layout system. |
