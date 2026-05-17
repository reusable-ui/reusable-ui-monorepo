/**
 * Extracts a PascalCase domain identifier from a relative filename.
 * 
 * Behavior:
 * - Finds the package directory name immediately under a group folder (`configs`, `variants`, `features`, `states`, `effects`, etc.).
 * - Ignores the group folder itself.
 * - Converts the package directory name into PascalCase (removes dashes, capitalizes boundaries).
 * 
 * Examples:
 * - 'configs/border-config/src/borders.ts' → 'BorderConfig'
 * - 'variants/theme-variant/src/foo.ts'    → 'ThemeVariant'
 * - 'effects/disabled-effect/src/bar.ts'   → 'DisabledEffect'
 */
export const getDomainIdentifier = (relativeFilename: string): string | null => {
    // Extract the package directory segment (e.g. 'border-config', 'theme-variant'):
    const domainSegment = relativeFilename.match(
        /^[/\\]?[^/\\]+[/\\]([^/\\]+)[/\\]/
    )?.[1];
    
    
    
    // Convert the segment into PascalCase:
    // - Example: 'border-config' → 'BorderConfig'
    return (
        domainSegment?.replaceAll(/(^.|-.)/g, (text) =>
            text.replace('-', '').toUpperCase()
        )
        ??
        null
    );
};

/**
 * Extracts a PascalCase sub‑domain identifier from a relative filename.
 * 
 * Behavior:
 * - Matches files named `css-<sub>-config.ts` inside a package.
 * - Converts the `<sub>` part (including hyphenated words) into PascalCase.
 * - Returns `null` if the file is just `css-config.ts` or not a sub‑config.
 * 
 * Examples:
 * - 'configs/border-config/src/css-param-config.ts'    → 'Param'
 * - 'configs/border-config/src/css-level-config.ts'    → 'Level'
 * - 'configs/typo-config/src/css-plain-list-config.ts' → 'PlainList'
 * - 'configs/border-config/src/css-config.ts'          → null
 * - 'variants/theme-variant/src/foo.ts'                → null
 * - 'effects/disabled-effect/src/bar.ts'               → null
 */
export const getSubDomainIdentifier = (relativeFilename: string): string | null => {
    // Capture the sub‑domain part from filenames like `css-xxx-config.ts`
    const subSegment = relativeFilename.match(/css-([a-z]+(-[a-z]+)*)-config\.ts$/)?.[1];
    
    
    
    // Convert hyphenated words into PascalCase (e.g. 'plain-list' → 'PlainList')
    return (
        subSegment
        ?.split('-')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join('')
        ??
        null
    );
};

/**
 * Represents structured metadata extracted from a domain filename.
 */
export interface DomainMetadata {
    /**
     * The base domain name (PascalCase, without group suffix).
     * Examples: 'Color', 'Border', 'FlowDirection'
     */
    domain         : string
    
    /**
     * The optional subdomain identifier (PascalCase).
     * Examples: 'Param', 'Level', or `null` if absent
     */
    subdomain      : string | null
    
    /**
     * The group suffix that classifies the domain type.
     * Examples: 'Config', 'Feature', 'Variant', 'State', 'Effect'
     */
    group          : string
    
    /**
     * Conditional domain prefix used when recomposing identifiers.
     * May be empty for special cases (e.g. 'TypoConfig' with subdomain).
     */
    domainPrefix   : string
    
    /**
     * The recomposed full identifier string.
     * Format: <domainPrefix><subdomain?><group>
     * Examples: 'ColorConfig', 'ColorParamConfig', 'BorderFeature'
     */
    fullIdentifier : string
}

/**
 * Extracts structured metadata about a package domain from a relative filename.
 * 
 * Behavior:
 * - Derives the PascalCase domain identifier (e.g. 'ColorConfig', 'BorderFeature').
 * - Splits the identifier into:
 *   • `domain` → the leading part (e.g. 'Color', 'Border').
 *   • `group`  → the trailing suffix (e.g. 'Config', 'Variant', 'Feature', 'State', 'Effect').
 * - Detects an optional subdomain identifier from the filename (e.g. 'Param', 'Level').
 * - Provides a conditional domain+subdomain string for special cases (e.g. 'TypoConfig' discards domain if subdomain exists).
 * 
 * Examples:
 * - 'configs/border-config/src/css-config.ts'        → { domain: 'Border', group: 'Config' , subdomain: null    }
 * - 'configs/color-config/src/css-param-config.ts'   → { domain: 'Color' , group: 'Config' , subdomain: 'Param' }
 * - 'variants/theme-variant/src/foo.ts'              → { domain: 'Theme' , group: 'Variant', subdomain: null    }
 */
export const getDomainMetadata = (relativeFilename: string): DomainMetadata | null => {
    // Get domain identifier from a relative filename:
    const domainIdentifier = getDomainIdentifier(relativeFilename);
    if (!domainIdentifier) return null;
    
    
    
    // Get subdomain identifier from a relative filename:
    const subdomain    = getSubDomainIdentifier(relativeFilename);
    
    // Extract group suffix (Config, Variant, Feature, State, Effect):
    const group        = domainIdentifier.match(/(Config|Variant|Feature|State|Effect)$/)?.[1] ?? '';
    
    // Extract domain base (remove group suffix):
    const domain       = domainIdentifier.slice(0, -group.length);
    
    // Special case: TypoConfig with subdomain → discard domain prefix:
    const domainPrefix = (domainIdentifier === 'TypoConfig') && subdomain ? '' : domain;
    
    return {
        domain,
        subdomain,
        group,
        domainPrefix,
        fullIdentifier: `${domainPrefix}${subdomain ?? ''}${group}`,
    } satisfies DomainMetadata;
};

/**
 * Converts a PascalCase or camelCase string into kebab-case.
 * 
 * Rules:
 * - Word boundaries occur before each uppercase letter.
 * - Consecutive capitals are treated as a single acronym.
 * - Output is fully lowercase.
 * 
 * Examples:
 * - 'ColorConfig'     → 'color-config'
 * - 'BorderFeature'   → 'border-feature'
 * - 'FlowDirection'   → 'flow-direction'
 * - 'TheHTML'         → 'the-html'
 * - 'TheHTMLParser'   → 'the-html-parser'
 */
export const pascalToKebab = (input: string): string => {
    return (
        input
        // Split boundaries: lowercase→uppercase OR uppercase→lowercase
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
        .toLowerCase()
    );
};
