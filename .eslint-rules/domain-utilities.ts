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
