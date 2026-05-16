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
 * - Converts the `<sub>` part into PascalCase.
 * - Returns `null` if the file is just `css-config.ts` or not a sub‑config.
 * 
 * Examples:
 * - 'configs/border-config/src/css-param-config.ts' → 'Param'
 * - 'configs/border-config/src/css-level-config.ts' → 'Level'
 * - 'configs/border-config/src/css-config.ts'       → null
 * - 'variants/theme-variant/src/foo.ts'             → null
 * - 'effects/disabled-effect/src/bar.ts'            → null
 */
export const getSubDomainIdentifier = (relativeFilename: string): string | null => {
    // Capture the sub‑domain part from filenames like `css-xxx-config.ts`
    const subSegment = relativeFilename.match(/css-([a-z]+)-config\.ts$/)?.[1];
    
    
    
    // Convert to PascalCase (e.g. 'param' → 'Param')
    return (
        subSegment?.replace(/(^[a-z])/, (ch) => ch.toUpperCase())
        ??
        null
    );
};
