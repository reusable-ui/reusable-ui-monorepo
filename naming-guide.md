To clear up the confusion when a word can be both a verb and a noun, use this golden rule: Variants are visual design choices, while States are runtime behavioral conditions.

* For Design Variants: Look at the visual result. If it describes an appearance, use the adjective form (-ed). If it describes an abstract concept (like scale), use the noun form.
* For Behavioral States: Look at the system mechanism. If the word can act as a noun in tech (like focus, hover, drag, sort), keep it as a noun to represent the system. Only use -ed if there is no natural tech noun form available (like disabled or excited).



## Design Variants

| Current Package Name | Recommended Package Name | JSDoc State Identifier Phrasing | Reason for Name |
|---|---|---|---|
| /orientation-variant | /orientation-variant | Resolves the orientation variant... | Orientation is a pure noun. |
| /flow-direction-variant | /flow-direction-variant | Resolves the flow direction variant... | Direction is a pure noun. |
| /size-variant | /size-variant | Resolves the size variant... | Size is a pure noun. |
| /theme-variant | /theme-variant | Resolves the theme variant... | Theme is a pure noun. |
| /emphasis-variant | /emphasis-variant | Resolves the emphasis variant... | Emphasis is a pure noun. |
| /outline-variant | <span style="color:red">/outlined-variant</span> | Resolves the outlined variant... | Outlined is a past-participle adjective describing the final visual appearance of the component. |
| /mild-variant | /mild-variant | Resolves the mild variant... | Mild is a pure adjective. |
| /stripped-variant | /stripped-variant | Resolves the stripped variant... | Stripped comes from the phrasal verb "to strip down." |



## Behavioral States

| Current Package Name | Recommended Package Name | JSDoc State Identifier Phrasing | Reason for Name |
|---|---|---|---|
| /excite-state | <span style="color:red">/excited-state</span> | Resolves the excited state... | Excited state is an unchangeable scientific idiom. |
| /disabled-state | /disabled-state | Resolves the disabled state... | Disabled is used because there is no clean, technical noun form for "disable". |
| /read-only-state | /read-only-state | Resolves the read-only state... | Read-only is a compound adjective functioning as a fixed industry standard phrase. |
| /focus-state | /focus-state | Resolves the focus state... | Focus functions cleanly as a noun identifying the input system. |
| /hover-state | /hover-state | Resolves the hover state... | Hover functions cleanly as a noun identifying the mouse interaction system. |
| /press-state | /press-state or /pressed-state | Resolves the pressed state... | Both work, but pressed state matches the specific UI condition (isPressed) and has deep industry precedent (e.g., Apple Developer standards). |
| /validity-state | /validity-state | Resolves the validity state... | Validity is a pure noun. |
| /drag-state | /drag-state | Resolves the drag state... | Drag functions cleanly as a noun identifying the drag-and-drop system. |
| /sort-state | /sort-state | Resolves the sort state... | Sort functions cleanly as a noun identifying the ordering system. |
| /active-state | /active-state | Resolves the active state... | Active is a pure adjective describing a live condition. |
| /collapse-state | /collapse-state | Resolves the expand/collapse state... | Expand/collapse creates a balanced compound noun phrase representing the dual-direction system. |
| /view-state | /view-state | Resolves the view state... | View functions cleanly as a noun identifying the rendering/visibility system. |
