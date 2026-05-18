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
 * - Matches files named `css-<sub>-<group>.ts` inside a package.
 * - Converts the `<sub>` part (including hyphenated words) into PascalCase.
 * - Returns `null` if the file is just `css-<group>.ts` or not a sub‑<group>.
 * 
 * Examples:
 * - 'configs/border-config/src/css-param-config.ts'    → 'Param'
 * - 'configs/border-config/src/css-level-config.ts'    → 'Level'
 * - 'configs/typo-config/src/css-plain-list-config.ts' → 'PlainList'
 * - 'configs/border-config/src/css-secondary-mount.ts' → 'Secondary'
 * - 'configs/border-config/src/css-config.ts'          → null
 * - 'variants/theme-variant/src/foo.ts'                → null
 * - 'effects/disabled-effect/src/bar.ts'               → null
 */
export const getSubDomainIdentifier = (relativeFilename: string): string | null => {
    // Capture the sub‑domain part from filenames like `css-xxx-<group>.ts`
    const subSegment = relativeFilename.match(/css-([a-z]+(-[a-z]+)*)-[^/\\]+\.ts$/)?.[1];
    
    
    
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

/**
 * Builds the list of expected CSS-variable module filenames for a given domain metadata.
 * 
 * Rules:
 * - Config‑related variables → must be declared only in:
 *   • `css-config.ts`
 *   • `css-internal-config.ts`
 *   • `css-<subdomain>-config.ts`
 *   • `css-internal-<subdomain>-config.ts`
 * 
 * - General‑purpose variables → must be declared only in:
 *   • `css-variables.ts`
 *   • `css-internal-variables.ts`
 *   • `css-<subdomain>-variables.ts`
 *   • `css-internal-<subdomain>-variables.ts`
 * 
 * Examples:
 * - { group: 'Config',  subdomain: null    } → [ 'css-config.ts',          'css-internal-config.ts'          ]
 * - { group: 'Config',  subdomain: 'Param' } → [ 'css-param-config.ts',    'css-internal-param-config.ts'    ]
 * - { group: 'Feature', subdomain: null    } → [ 'css-variables.ts',       'css-internal-variables.ts'       ]
 * - { group: 'Feature', subdomain: 'Level' } → [ 'css-level-variables.ts', 'css-internal-level-variables.ts' ]
 */
export const getExpectedCSSVariableModules = (domainMetadata: DomainMetadata | null): string[] => {
    const subdomain = domainMetadata?.subdomain ?? null;
    const subdomainSuffix = subdomain ? `-${pascalToKebab(subdomain)}` : '';
    
    if (domainMetadata?.group === 'Config') {
        return [
            `css${subdomainSuffix}-config.ts`,
            `css-internal${subdomainSuffix}-config.ts`,
        ];
    } // if
    
    return [
        `css${subdomainSuffix}-variables.ts`,
        `css-internal${subdomainSuffix}-variables.ts`,
    ];
};

/**
 * Builds the list of expected CSS-mount module filenames for a given domain metadata.
 * 
 * Rules:
 * • `css-mount.ts`
 * • `css-internal-mount.ts`
 * • `css-<subdomain>-mount.ts`
 * • `css-internal-<subdomain>-mount.ts`
 * 
 * Examples:
 * - { group: 'Feature', subdomain: null    } → [ 'css-mount.ts',        'css-internal-mount.ts'        ]
 * - { group: 'Feature', subdomain: 'Level' } → [ 'css-level-mount.ts',  'css-internal-level-mount.ts'  ]
 */
export const getExpectedCSSMountModules = (domainMetadata: DomainMetadata | null): string[] => {
    const subdomain = domainMetadata?.subdomain ?? null;
    const subdomainSuffix = subdomain ? `-${pascalToKebab(subdomain)}` : '';
    
    return [
        `css${subdomainSuffix}-mount.ts`,
        `css-internal${subdomainSuffix}-mount.ts`,
    ];
};

/**
 * Builds the list of expected CSS-style module filenames for a given domain metadata.
 * 
 * Rules:
 * • `css-style.ts`
 * • `css-internal-style.ts`
 * • `css-<subdomain>-style.ts`
 * • `css-internal-<subdomain>-style.ts`
 * 
 * Examples:
 * - { group: 'Feature', subdomain: null    } → [ 'css-style.ts',        'css-internal-style.ts'        ]
 * - { group: 'Feature', subdomain: 'Level' } → [ 'css-level-style.ts',  'css-internal-level-style.ts'  ]
 */
export const getExpectedCSSStyleModules = (domainMetadata: DomainMetadata | null): string[] => {
    const subdomain = domainMetadata?.subdomain ?? null;
    const subdomainSuffix = subdomain ? `-${pascalToKebab(subdomain)}` : '';
    
    return [
        `css${subdomainSuffix}-style.ts`,
        `css-internal${subdomainSuffix}-style.ts`,
    ];
};

/**
 * Builds the list of expected CSS-hooks module filenames for a given domain metadata.
 * 
 * Rules:
 * • `css-hooks.ts`
 * • `css-internal-hooks.ts`
 * • `css-<subdomain>-hooks.ts`
 * • `css-internal-<subdomain>-hooks.ts`
 * 
 * Examples:
 * - { group: 'Feature', subdomain: null    } → [ 'css-hooks.ts',        'css-internal-hooks.ts'        ]
 * - { group: 'Feature', subdomain: 'Level' } → [ 'css-level-hooks.ts',  'css-internal-level-hooks.ts'  ]
 */
export const getExpectedCSSHookModules = (domainMetadata: DomainMetadata | null): string[] => {
    const subdomain = domainMetadata?.subdomain ?? null;
    const subdomainSuffix = subdomain ? `-${pascalToKebab(subdomain)}` : '';
    
    return [
        `css${subdomainSuffix}-hooks.ts`,
        `css-internal${subdomainSuffix}-hooks.ts`,
    ];
};
