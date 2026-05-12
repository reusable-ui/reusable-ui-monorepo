// Configs:
// - Config prefixes represent primitive palette/template values
//   that are conditionally applied to **features**, driven by active **variants**,
//   **states → effects**, or other custom conditionals.
// - Primitive configs are kept terse (1 char) for frequent reuse across components.
// - Complementary configs (color parameter, secondary typography, big paragraph, big heading)
//   deliberately use full words or longer abbreviations instead of 1-char,
//   to distinguish them from their primary companions.
// - For component-like configs, use the tag name directly if short (p, h, mark, kbd, code, hr),
//   otherwise use a clear abbreviation (disp, bq, pl).
// - General rule: 1–4 characters, short and mnemonic.
// - All current configs comply with this rule (no violations).

// Primitive Colors:
export const defaultColorConfigPrefix          = 'c'     // color
export const defaultColorParamConfigPrefix     = 'cp'    // color parameter (longer for clarity)

// Primitive Layouts:
export const defaultBorderConfigPrefix         = 'b'     // border (avoid collision with border feature prefix 'bd')
export const defaultRadiusConfigPrefix         = 'r'     // radius
export const defaultSpacerConfigPrefix         = 's'     // spacer
export const defaultBreakpointConfigPrefix     = 'bp'    // responsive breakpoint

// Primitive Typography:
export const defaultTypoConfigPrefix           = 't'     // regular typography
export const defaultSecondaryConfigPrefix      = 'sec'   // secondary typography (longer for clarity)

// Component-like Typography:

// Paragraphs:
export const defaultParagraphConfigPrefix      = 'p'     // regular paragraph
export const defaultLeadConfigPrefix           = 'lead'  // big paragraph (longer for clarity)

// Headings:
export const defaultHeadingConfigPrefix        = 'h'     // regular heading (levels: 1-6)
export const defaultDisplayConfigPrefix        = 'disp'  // big heading (levels: 1-6, longer for clarity)

// Semantic Blocks:
export const defaultBlockquoteConfigPrefix     = 'bq'    // blockquote
export const defaultPlainListConfigPrefix      = 'pl'    // plain list (not <List> component)

// Inline markers:
export const defaultMarkConfigPrefix           = 'mark'  // generic marker (<mark>)
export const defaultKbdConfigPrefix            = 'kbd'   // keyboard marker (<kbd>)
export const defaultCodeConfigPrefix           = 'code'  // inline code marker (<code>, <var>, <samp>)

// Separators:
export const defaultHorzSeparatorConfigPrefix  = 'hr'    // horizontal rule (native <hr>)
export const defaultVertSeparatorConfigPrefix  = 'vr'    // vertical rule (synthetic <div class="vr">)



// Variants:
// - Variant prefixes represent synthetic styling states (analogous to `:outlined`, `:theme(primary)`),
//   not semantic conditions.
//   In other words, they exist purely for styling purposes, unlike states which
//   reflect actual UI conditions (`:disabled`, `:focus`, `:hover`, etc.).
// - General rule: 2–4 characters, short and mnemonic.
// - All current variants comply with this rule (no violations).
export const defaultOrientationVariantPrefix   = 'ot'    // orientation
export const defaultFlowDirectionVariantPrefix = 'fd'    // flow-direction
export const defaultSizeVariantPrefix          = 'sz'    // size
export const defaultThemeVariantPrefix         = 'th'    // theme
export const defaultEmphasisVariantPrefix      = 'em'    // emphasis
export const defaultOutlineVariantPrefix       = 'ou'    // outline
export const defaultMildVariantPrefix          = 'mi'    // mild
export const defaultBareVariantPrefix          = 'ba'    // bare



// Features:
// - Feature prefixes represent actual CSS property implementations.
// - They are **dynamically managed** by the system, with styling applied
//   through active **variants** and **states → effects**.
// - Unlike Tailwind, developers do **not** explicitly write `state:` or `-variant`
//   to apply styling. States and variants are **implicitly** resolved by the system.
//   Example analogy: `bg-managed txt-managed border-managed p-managed animate-managed`.
// - Only the listed features are system-managed; any other CSS properties
//   can be freely assigned as common, unmanaged styles.
// - General rule: 2–4 characters, short and mnemonic.
// - All current features comply with this rule (no violations).

// Colorable:
export const defaultBackgroundFeaturePrefix    = 'bg'    // background → bg (widely recognized shorthand)
export const defaultForegroundFeaturePrefix    = 'fg'    // foreground → fg (parallel to bg)
export const defaultDecorationFeaturePrefix    = 'dn'    // decoration → dn (alternative: dec/decor); chosen to sync length with bg/fg
export const defaultBorderFeaturePrefix        = 'bd'    // border → bd (alternative: border); shortened to sync length with bg/fg/dn
export const defaultRingFeaturePrefix          = 'rg'    // ring → rg (alternative: ring full word); chosen to sync length with bg/fg/dn/bd

// Layouting:
export const defaultPaddingFeaturePrefix       = 'pd'    // padding → pd (avoid collision with paragraph prefix 'p')

// Compound:
export const defaultAnimationFeaturePrefix     = 'an'    // animation → an
export const defaultFilterFeaturePrefix        = 'fi'    // filter → fi
export const defaultTransformFeaturePrefix     = 'tr'    // transform → tr
export const defaultShadowFeaturePrefix        = 'sh'    // shadow → sh (main intent of box-shadow; 'box' is technical detail)



// States:
// - State prefixes represent CSS pseudo-classes or custom UI states.
// - General rule: 2–4 characters, short and mnemonic.
// - Some use full 4-character words (drag, sort, view) for better readability.
// - All current states comply with this rule (no violations).
export const defaultDisabledStatePrefix        = 'dis'   // :disabled
export const defaultReadOnlyStatePrefix        = 'ro'    // :read-only
export const defaultFocusStatePrefix           = 'foc'   // :focus
export const defaultHoverStatePrefix           = 'hov'   // :hover
export const defaultPressStatePrefix           = 'prss'  // :active → renamed press
export const defaultValidityStatePrefix        = 'val'   // :valid / :invalid
export const defaultDragStatePrefix            = 'drag'  // :dragging, full word
export const defaultSortStatePrefix            = 'sort'  // custom sort, full word
export const defaultExciteStatePrefix          = 'exc'   // custom excite
export const defaultCollapseStatePrefix        = 'col'   // custom collapse
export const defaultActiveStatePrefix          = 'act'   // custom active
export const defaultViewStatePrefix            = 'view'  // custom view, full word



// Effects:
// - Effect prefixes are the visual complements of states (almost 1–1 mapping).
// - General rule: append `e` to the state prefix for predictability.
// - General rule: 2–4 characters, short and mnemonic.
// - Some effects reach 5 characters (prsse, drage, sorte, viewe).
//   These are accepted exceptions because predictability and consistency
//   with their state names are prioritized over strict max 4-character length limits.
// - Read-only effect is reserved for possible future use.
export const defaultDisabledEffectPrefix       = 'dise'  // dis → dise
export const defaultReadOnlyEffectPrefix       = 'roe'   // ro → roe, reserved for possible future use
export const defaultFocusEffectPrefix          = 'foce'  // foc → foce
export const defaultHoverEffectPrefix          = 'hove'  // hov → hove
export const defaultPressEffectPrefix          = 'prsse' // prss → prsse, 5 chars allowed for clarity
export const defaultValidityEffectPrefix       = 'vale'  // val → vale
export const defaultDragEffectPrefix           = 'drage' // drag → drage, 5 chars allowed for clarity
export const defaultSortEffectPrefix           = 'sorte' // sort → sorte, 5 chars allowed for clarity
export const defaultExciteEffectPrefix         = 'exce'  // exc → exce
export const defaultCollapseEffectPrefix       = 'cole'  // col → cole
export const defaultActiveEffectPrefix         = 'acte'  // act → acte
export const defaultViewEffectPrefix           = 'viewe' // view → viewe, 5 chars allowed for clarity
