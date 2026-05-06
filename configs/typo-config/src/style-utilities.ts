// Cssfn:
import {
    // Manipulates css selector - parse, transform, calculate specificity, and more:
    type Selector,
    type SelectorGroup,
    parseSelectors,
    createSelector,
    groupSelectors,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type ElementFilter,
}                           from './style-types.js'



// Utilities:

/**
 * Generates a **filtering rule** by selectors and exclusions.
 * 
 * This function ensures that elements selectively interact with their related counterparts  
 * (e.g., paragraph-like elements with lead-like elements or heading-like elements with display-like elements).  
 * 
 * When the result rendered, it produces:
 * ```css
 * :is(...selectors):not(:is(...exclusions))
 * ```
 * 
 * @param relatedFilters - Array of element filters defining:
 *   - `selectors`: Target elements to be styled.
 *   - `exclusions`: Elements to be excluded from styling.
 * 
 * @returns A `SelectorGroup` represents a **filtering rule** by selectors and exclusions.
 */
export const parseRelated = (relatedFilters: ElementFilter[]): SelectorGroup => {
    return (
        relatedFilters
        .map(({ selectors, exclusions }): Selector => {
            // Parse Selectors (`:is(...selectors)`):
            const parsedSelectors : SelectorGroup | null = parseSelectors(selectors);
            if (process.env.NODE_ENV === 'development') {
                if (!parsedSelectors)  throw TypeError('Invalid CSS selector in `relatedFilters.selectors`.');
            } // if
            const [
                // Groupable selectors in `:is(...selectors)`:
                isSelector,
                
                // Ungroupable selectors containing pseudo element (if any):
                ...pseudoElmSelectors
            ] = groupSelectors(parsedSelectors, {
                selectorName          : 'is',
                cancelGroupIfSingular : true, // Unwrap `:is(singleSelector)` => singleSelector
            });
            if (process.env.NODE_ENV === 'development') {
                if (pseudoElmSelectors.length) throw TypeError('Pseudo elements are not supported in `relatedFilters.selectors`.');
            } // if
            
            
            
            // Parse Exclusions (`:not(:is(...exclusions))`):
            const parsedExclusions : SelectorGroup | null = parseSelectors(exclusions);
            if (process.env.NODE_ENV === 'development') {
                if (!parsedExclusions) throw TypeError('Invalid CSS selector in `relatedFilters.exclusions`.');
            } // if
            const [
                // Groupable selectors in `:not(:is(...exclusions))`:
                notSelector,
                
                // Ungroupable selectors containing pseudo element (if any):
                ...pseudoElmExclusions
            ] = groupSelectors(parsedExclusions, {
                selectorName : 'not',
            });
            if (process.env.NODE_ENV === 'development') {
                if (pseudoElmExclusions.length) throw TypeError('Pseudo elements are not supported in `relatedFilters.exclusions`.');
            } // if
            
            
            
            // Combine Selectors & Exclusions (`:is(...selectors):not(:is(...exclusions))`):
            return createSelector(
                ...isSelector,
                ...notSelector,
            );
        })
    );
};
