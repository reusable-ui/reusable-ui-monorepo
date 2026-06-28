// React:
import {
    // Types:
    type Context,
}                           from 'react'



/**
 * Props for resolving an effective variant value from controlled props.
 * 
 * @template TVariant - The type of the resolved variant value.
 */
export interface ControlledVariantProps<TVariant extends {} | null> {
    /**
     * Controls the current variant value.
     * 
     * Defaults to `options.defaultVariant`.
     */
    variant ?: TVariant
}

/**
 * Component-level options for resolving an effective variant value from controlled props.
 * 
 * - Declares an optional default variant value used when no `variant` prop
 *   is provided by the consumer.
 * 
 * @template TVariant - The type of the resolved variant value.
 */
export interface ControlledVariantOptions<TVariant extends {} | null> {
    /**
     * Declares an optional component-level default variant value.
     * Acts as a fallback when no `variant` prop is provided.
     */
    defaultVariant ?: TVariant
}

/**
 * Resolver-level definition for resolving an effective variant value from controlled props.
 * 
 * - Declares the mandatory default variant value used when neither `variant` prop nor `defaultVariant` option is provided.
 * 
 * @template TVariant - The type of the resolved variant value.
 */
export interface ControlledVariantDefinition<TVariant extends {} | null> {
    /**
     * Declares the mandatory resolver-level default variant value.
     * Acts as the final fallback when no other defaults are provided.
     */
    defaultVariant  : TVariant
}



/**
 * Props for resolving an effective variant value from controlled props while optionally
 * inheriting from context when the resolved value equals the explicit
 * inheritance token.
 * 
 * @template TVariant - The type of the resolved variant value.
 * @template TInheritToken - A special string token used to trigger inheritance (e.g. `'inherit'`).
 */
export interface InheritableVariantProps<TVariant extends {} | null, TInheritToken extends string>
    extends
        // Bases:
        ControlledVariantProps<TVariant | TInheritToken>
{
    /* No additional props yet - reserved for future extensions. */
}

/**
 * Component-level options for resolving an effective variant value from controlled props while optionally
 * inheriting from context when the resolved value equals the explicit
 * inheritance token.
 * 
 * - Declares an optional default variant value used when no `variant` prop
 *   is provided by the consumer.
 * 
 * @template TVariant - The type of the resolved variant value.
 * @template TInheritToken - A special string token used to trigger inheritance (e.g. `'inherit'`).
 */
export interface InheritableVariantOptions<TVariant extends {} | null, TInheritToken extends string>
    extends
        // Bases:
        ControlledVariantOptions<TVariant | TInheritToken>
{
    /**
     * Declares an optional component-level fallback variant used when no related context value is available.
     * - Common values: `'md'` for size variants, `'primary'` for theme variants.
     */
    fallbackVariant         ?: TVariant
}

/**
 * Resolver-level definition for resolving an effective variant value from controlled props while optionally
 * inheriting from context when the resolved value equals the explicit
 * inheritance token.
 * 
 * - Declares the mandatory default variant value used when neither `variant` prop nor `defaultVariant` option is provided.
 * - Declares the declarative token that activates dynamic variant inheritance.
 * - Declares the context from which the inherited variant is read.
 * - Declares the fallback variant used when no related context value is available.
 * 
 * @template TVariant - The type of the resolved variant value.
 * @template TInheritToken - A special string token used to trigger inheritance (e.g. `'inherit'`).
 */
export interface InheritableVariantDefinition<TVariant extends {} | null, TInheritToken extends string>
    extends
        // Bases:
        ControlledVariantDefinition<TVariant | TInheritToken>
{
    /**
     * Declares the token for activating dynamic variant inheritance (e.g. `'inherit'`).
     * - If the resolved variant equals this token, the hook will attempt to use the provided context value.
     */
    inheritableVariantToken  : TInheritToken
    
    /**
     * Declares the context from which the inherited variant is read.
     * 
     * Resolution behavior:
     * - If the resolved variant equals `definition.inheritableVariantToken`,
     *   the hook will attempt to use this context value.
     * - If no `Provider` is found, `use(variantContext)` returns `undefined`,
     *   and the hook falls back to `fallbackVariant`.
     * 
     * Note: contexts are expected to be created with `undefined` as their default value,
     * so that `use(variantContext)` returns `undefined` when no `Provider` is present.
     */
    variantContext           : Context<TVariant | undefined>
    
    /**
     * Declares the mandatory resolver-level fallback variant used when no related context value is available.
     * - Common values: `'md'` for size variants, `'primary'` for theme variants.
     */
    fallbackVariant          : TVariant
}



/**
 * Props for resolving an effective variant value from controlled props while optionally
 * inheriting or inverting from context when the resolved value equals the explicit
 * inheritance/inversion token.
 * 
 * @template TVariant - The type of the resolved variant value.
 * @template TInheritToken - A special string token used to trigger inheritance (e.g. `'inherit'`).
 * @template TInvertToken - A special string token used to trigger inversion (e.g. `'invert'`).
 */
export interface InvertableVariantProps<TVariant extends {} | null, TInheritToken extends string, TInvertToken extends string>
    extends
        // Bases:
        InheritableVariantProps<TVariant | TInvertToken, TInheritToken>
{
    /* No additional props yet - reserved for future extensions. */
}

/**
 * Component-level options for resolving an effective variant value from controlled props while optionally
 * inheriting or inverting from context when the resolved value equals the explicit
 * inheritance/inversion token.
 * 
 * - Declares an optional default variant value used when no `variant` prop
 *   is provided by the consumer.
 * 
 * @template TVariant - The type of the resolved variant value.
 * @template TInheritToken - A special string token used to trigger inheritance (e.g. `'inherit'`).
 * @template TInvertToken - A special string token used to trigger inversion (e.g. `'invert'`).
 */
export interface InvertableVariantOptions<TVariant extends {} | null, TInheritToken extends string, TInvertToken extends string>
    extends
        // Bases:
        InheritableVariantOptions<TVariant | TInvertToken, TInheritToken>
{
    /**
     * Declares an optional component-level fallback variant used when no related context value is available.
     * - Common values: `'md'` for size variants, `'primary'` for theme variants.
     */
    fallbackVariant         ?: TVariant // Narrowing down from `TVariant | TInvertToken` to `TVariant`
}

/**
 * Resolver-level definition for resolving an effective variant value from controlled props while optionally
 * inheriting or inverting from context when the resolved value equals the explicit
 * inheritance/inversion token.
 * 
 * - Declares the mandatory default variant value used when neither `variant` prop nor `defaultVariant` option is provided.
 * - Declares the declarative token that activates dynamic variant inversion.
 * - Declares the context from which the inherited variant is read.
 * - Declares the fallback variant used when no related context value is available.
 * 
 * @template TVariant - The type of the resolved variant value.
 * @template TInheritToken - A special string token used to trigger inheritance (e.g. `'inherit'`).
 * @template TInvertToken - A special string token used to trigger inversion (e.g. `'invert'`).
 */
export interface InvertableVariantDefinition<TVariant extends {} | null, TInheritToken extends string, TInvertToken extends string>
    extends
        // Bases:
        Omit<InheritableVariantDefinition<TVariant | TInvertToken, TInheritToken>,
            | 'variantContext' // Cannot narrowing down to `TVariant | undefined` → excluded
        >
{
    /**
     * Declares the token for activating dynamic variant inversion (e.g. `'invert'`).
     * - If the resolved variant equals this token, the hook will attempt to use the provided context value.
     */
    invertableVariantToken   : TInvertToken
    
    /**
     * Declares the context from which the inherited variant is read.
     * 
     * Resolution behavior:
     * - If the resolved variant equals `definition.inheritableVariantToken`,
     *   the hook will attempt to use this context value.
     * - If no `Provider` is found, `use(variantContext)` returns `undefined`,
     *   and the hook falls back to `fallbackVariant`.
     * 
     * Note: contexts are expected to be created with `undefined` as their default value,
     * so that `use(variantContext)` returns `undefined` when no `Provider` is present.
     */
    variantContext           : Context<TVariant | undefined> // Narrowing down from `TVariant | TInvertToken | undefined` to `TVariant | undefined`
    
    /**
     * Declares the inversion function used to transform the inherited context value into the final variant.
     */
    invertVariant            : (inheritedVariant: TVariant) => TVariant
    
    /**
     * Declares the mandatory resolver-level fallback variant used when no related context value is available.
     * - Common values: `'md'` for size variants, `'primary'` for theme variants.
     */
    fallbackVariant          : TVariant // Narrowing down from `TVariant | TInvertToken` to `TVariant`
}
