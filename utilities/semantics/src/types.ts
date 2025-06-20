// React:
import {
    // Types:
    type AriaRole,
    type AriaAttributes,
}                           from 'react'

// Cssfn:
import {
    // Cssfn general types:
    type OptionalOrBoolean,
    type MaybeArray,
}                           from '@cssfn/core'                  // Writes css in javascript.



/**
 * Represents a valid ARIA role or a custom role string.
 * 
 * This type includes all standard **ARIA roles** for accessibility.
 * Additionally, it allows custom role definitions by including `(string & {})`.
 */
export type Role         =
    // Standard ARIA roles:
    | AriaRole
    
    // // Allow custom role definitions:
    // | (string & {})
;

/**
 * Represents valid HTML and SVG element tags.
 * 
 * This type includes all standard **HTML** elements and **SVG** elements.
 * Additionally, it allows custom elements by including `(string & {})`.
 */
export type Tag =
    // HTML elements:
    | 'a' | 'abbr' | 'address' | 'area' | 'article' | 'aside' | 'audio' | 'b' | 'base' | 'bdi' | 'bdo' | 'big' | 'blockquote'
    | 'body' | 'br' | 'button' | 'canvas' | 'caption' | 'center' | 'cite' | 'code' | 'col' | 'colgroup' | 'data' | 'datalist'
    | 'dd' | 'del' | 'details' | 'dfn' | 'dialog' | 'div' | 'dl' | 'dt' | 'em' | 'embed' | 'fieldset' | 'figcaption' | 'figure'
    | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'head' | 'header' | 'hgroup' | 'hr' | 'html' | 'i' | 'iframe'
    | 'img' | 'input' | 'ins' | 'kbd' | 'keygen' | 'label' | 'legend' | 'li' | 'link' | 'main' | 'map' | 'mark' | 'menu' | 'menuitem'
    | 'meta' | 'meter' | 'nav' | 'noindex' | 'noscript' | 'object' | 'ol' | 'optgroup' | 'option' | 'output' | 'p' | 'param'
    | 'picture' | 'pre' | 'progress' | 'q' | 'rp' | 'rt' | 'ruby' | 's' | 'samp' | 'search' | 'slot' | 'script' | 'section'
    | 'select' | 'small' | 'source' | 'span' | 'strong' | 'style' | 'sub' | 'summary' | 'sup' | 'table' | 'template' | 'tbody'
    | 'td' | 'textarea' | 'tfoot' | 'th' | 'thead' | 'time' | 'title' | 'tr' | 'track' | 'u' | 'ul' | 'var' | 'video' | 'wbr'
    | 'webview'
    
    // SVG elements:
    | 'svg' | 'animate' | 'animateMotion' | 'animateTransform' | 'circle' | 'clipPath' | 'defs' | 'desc' | 'ellipse' | 'feBlend'
    | 'feColorMatrix' | 'feComponentTransfer' | 'feComposite' | 'feConvolveMatrix' | 'feDiffuseLighting' | 'feDisplacementMap'
    | 'feDistantLight' | 'feDropShadow' | 'feFlood' | 'feFuncA' | 'feFuncB' | 'feFuncG' | 'feFuncR' | 'feGaussianBlur' | 'feImage'
    | 'feMerge' | 'feMergeNode' | 'feMorphology' | 'feOffset' | 'fePointLight' | 'feSpecularLighting' | 'feSpotLight' | 'feTile'
    | 'feTurbulence' | 'filter' | 'foreignObject' | 'g' | 'image' | 'line' | 'linearGradient' | 'marker' | 'mask' | 'metadata'
    | 'mpath' | 'path' | 'pattern' | 'polygon' | 'polyline' | 'radialGradient' | 'rect' | 'set' | 'stop' | 'switch' | 'symbol'
    | 'text' | 'textPath' | 'tspan' | 'use' | 'view'
    
    // Disallow custom elements:
    // | (string & {})
;



/**
 * Defines a semantic pairing between an ARIA role and its corresponding HTML or SVG tag, if applicable.
 * 
 * Some roles may not have a dedicated tag, in which case `null` is used to indicate the absence of an explicit mapping.
 * This structure supports accessibility enforcement and ensures explicit role visibility.
 */
export type RoleTagPair = readonly [Role, Tag | null]

/**
 * Represents a prioritized list of semantic hints in ascending order.
 * 
 * This structure defines the hierarchy of role-tag associations, guiding the resolution of semantic meaning 
 * based on contextual priority.
 */
export type SemanticPriority = MaybeArray<OptionalOrBoolean<RoleTagPair>>



/**
 * Configuration options for semantic evaluation.
 */
export interface SemanticOptions {
    // Semantics:
    
    /**
     * Specifies the prioritized list of semantic hints in ascending order for this component.
     * 
     * These hints define the preferred role-tag associations, ensuring structured resolution of semantic meaning.
     */
    semanticPriority ?: SemanticPriority
}

/**
 * Properties that define semantic attributes for rendering a component.
 * 
 * This interface extends accessibility attributes (`AriaAttributes`) and structured semantic options (`SemanticOptions`),
 * ensuring clear role-tag associations and adaptive behaviors.
 */
export interface SemanticProps
    extends
        // Bases:
        SemanticOptions,
        AriaAttributes
{
    // Semantics:
    
    /**
     * Specifies the preferred role for rendering this component.
     * 
     * - A valid `Role` explicitly defines the accessibility role.
     * - `null` removes the role, preventing unintended ARIA semantics.
     * - `'auto'` allows automatic role assignment based on `semanticPriority`.
     * 
     * If `tag` is `null`, the role **may** be ignored if the component renders as a fragment (`<>...</>`),
     * since fragments do not support ARIA roles. However, if the component defaults to a valid element (`<div>` or `<span>`),
     * the role will still be applied.
     */
    role ?: Role | null | 'auto'
    
    /**
     * Specifies the preferred tag for rendering this component.
     * 
     * - A valid `Tag` explicitly defines the HTML or SVG element type.
     * - `null` removes the tag, allowing flexible rendering strategies such as fragments or component-driven wrapping.
     * - `'auto'` allows automatic tag selection based on `semanticPriority`.
     * 
     * If `tag` is `null`, the component **may** render as a fragment (`<>...</>`) or default to a valid element such as `<div>` or `<span>`,
     * depending on structural requirements.
     */
    tag  ?: Tag | null | 'auto'
}

/**
 * Represents the final resolved semantic attributes for a component.
 * 
 * This structure defines the computed role and tag based on contextual evaluation,
 * alongside indicators for whether the resolved semantics align with expected values.
 */
export interface ResolvedSemanticAttributes {
    // Semantics:
    
    /**
     * The resolved ARIA role for the component.
     * 
     * - A valid `Role` explicitly defines the accessibility role.
     * - `null` indicates either the absence of a role or that `computedTag` inherently provides enough semantic meaning.
     *   In cases where `computedTag` fully conveys the intended role, explicit role assignment may be unnecessary.
     */
    role           : Role | null
    
    /**
     * The resolved HTML or SVG tag for the component.
     * 
     * - A valid `Tag` explicitly defines the HTML or SVG element type.
     * - `null` indicates the absence of a predefined tag, potentially leading to fragment rendering or fallback behavior.
     */
    tag            : Tag  | null
    
    
    
    // Tests:
    
    /**
     * Indicates whether the resolved role matches the expected `semanticPriority`.
     */
    isExpectedRole : boolean
    
    /**
     * Indicates whether the resolved tag matches the expected `semanticPriority`.
     */
    isExpectedTag  : boolean
}
