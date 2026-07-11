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

| Current Package Name | Status / Rename | Recommended Package Name | Control Prop | JSDoc Phrasing | Architectural Logic |
|---|---|---|---|---|---|
| /orientation-variant | 🟢 | /orientation-variant | orientation | Resolves the orientation variant... | Pure noun representing an inherent structural attribute. |
| /flow-direction-variant | 🟢 | /flow-direction-variant | flowDirection | Resolves the flow direction variant... | Pure noun representing an alignment attribute. |
| /size-variant | 🟢 | /size-variant | size | Resolves the size variant... | Pure noun representing a scale attribute. |
| /theme-variant | 🟢 | /theme-variant | theme | Resolves the theme variant... | Pure noun representing a visual configuration system. |
| /emphasis-variant | 🟢 | /emphasis-variant | emphasized | Resolves the emphasized variant... | Intentional Exception: Package keeps the shorter core noun to prevent folder typos, while the prop uses the explicit adjective. |
| /outline-variant | 🔴 | /outlined-variant | outlined | Resolves the outlined variant... | Updated to match global design system conventions (e.g., Outlined Buttons). |
| /mild-variant | 🟢 | /mild-variant | mild | Resolves the mild variant... | Pure adjective describing a softened visual style. |
| /stripped-variant | 🟢 | /stripped-variant | stripped | Resolves the stripped variant... | Past-participle adjective perfectly describing a stripped-down (borderless) container. |



## ⚡ Behavioral States
Packages managing behavioral states encapsulate event listeners, runtime transitions, and interaction flows. The package name represents the System Domain (Noun Phrase), while the control props represent the Instance Status (Adjective).

| Current Package Name | Status / Rename | Recommended Package Name | Control Prop | JSDoc Phrasing | Architectural Logic |
|---|---|---|---|---|---|
| /excite-state | 🔴 | /excited-state | excited | Resolves the excited state... | Updated from active verb to past-participle adjective to respect the established technical idiom. |
| /disabled-state | 🟢 | /disabled-state | disabled | Resolves the disabled state... | Fixed platform standard. Matches native HTML element properties. |
| /read-only-state | 🟢 | /read-only-state | readOnly | Resolves the read-only state... | Fixed platform standard. Matches native form field behaviors. |
| /focus-state | 🟢 | /focus-state | focused | Resolves the focus state... | Pure noun representing the element targeting system. |
| /hover-state | 🟢 | /hover-state | hovered | Resolves the hover state... | Pure noun representing the mouse/pointer tracking system. |
| /press-state | 🟢 | /press-state | pressed | Resolves the press state... | Intentional Exception: Folder uses the interactive noun domain (press), while the prop tracks instance status. |
| /validity-state | 🟢 | /validity-state | validity | Resolves the validity state... | Pure noun representing the validation and form-verification subsystem. |
| /drag-state | 🟢 | /drag-state | dragged | Resolves the drag state... | Pure noun representing the interactive drag-and-drop system. |
| /sort-state | 🟢 | /sort-state | sorted | Resolves the sort state... | Pure noun representing the data ordering system. |
| /active-state | 🟢 | /active-state | active | Resolves the active state... | Pure adjective functioning cleanly as an interactive category identifier. |
| /collapse-state | 🟢 | /collapse-state | expanded | Resolves the expand/collapse state... | Updated to a balanced compound verbal-noun phrase representing the bi-directional machine. |
| /view-state | 🟢 | /view-state | viewIndex | Resolves the view state... | Pure noun representing the viewport container layout system. |
