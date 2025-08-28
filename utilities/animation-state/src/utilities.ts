/**
 * Determines whether a given animation name matches the expected pattern.
 * 
 * Supports regular expression and string suffix matching with word-boundary awareness:
 * - Use a string to match suffixes with word-boundary awareness.
 * - Use an array of strings to match multiple suffixes.
 * - Use a RegExp for custom or complex matching logic.
 * 
 * Word-boundary behavior mimics regex `\b` semantics:
 * - If the matched pattern starts with a non-word character, it’s always considered boundary-safe.
 * - Otherwise, the character preceding the suffix must be a non-word character or undefined.
 * 
 * @param animationName - The full animation name to evaluate.
 * @param animationPattern - Pattern to match: string, array of strings, or RegExp.
 * @returns `true` if the animation name matches the expected pattern; otherwise `false`.
 */
export const animationNameMatches = (animationName: string, animationPattern: string | string[] | RegExp): boolean => {
    // Handle regular expression pattern:
    if (animationPattern instanceof RegExp) return animationPattern.test(animationName);
    
    
    
    // Normalize to array of expected suffixes:
    const expectedPatterns = (
        Array.isArray(animationPattern)
        ? animationPattern
        : [animationPattern]
    );
    
    
    
    // Check each candidate:
    for (const expectedPattern of expectedPatterns) {
        // Empty string matches anything:
        if (expectedPattern === '') return true;
        
        
        
        // Must match as suffix:
        if (!animationName.endsWith(expectedPattern)) continue;
        
        
        
        // Boundary logic:
        
        // If the expected pattern starts with a non-word character, it inherently breaks the word boundary:
        // Example: pattern `-fade` matches `is-fade` regardless of preceding character.
        const firstChar = expectedPattern[0];
        if ((/\W/).test(firstChar)) return true;
        
        // Otherwise, check the character immediately before the expected pattern in the animation name:
        // Example: pattern `fade-in` matches `is-fade-in` but not `isfade-in`.
        const prevChar = animationName[animationName.length - expectedPattern.length - 1];
        if (
            // If there's no preceding character (exact match or start of string), it's a valid boundary:
            (prevChar === undefined)
            
            ||
            
            // If the preceding character is a non-word character, it's also a valid boundary:
            (/\W/).test(prevChar)
        ) return true;
    } // for
    
    
    
    // No valid match found:
    return false;
};
