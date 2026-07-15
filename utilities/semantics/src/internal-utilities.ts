// Cssfn:
import {
    // Optionals:
    type OptionalOrBoolean,
    
    
    
    // Lazies:
    type Lazy,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Types:
import {
    type Role,
    type Tag,
    type RoleTagPair,
    type SemanticPriority,
}                           from './types.js'



// Comparators:

/**
 * Checks whether a given value is non-empty, excluding `null`, `undefined`, and boolean values.
 * 
 * This type guard ensures only meaningful values are retained, filtering out falsy states like `null`, `undefined`, `false` and `true`.
 * 
 * @template TValue The type of the value being checked.
 * @param value The value to evaluate for non-emptiness.
 * @returns `true` if the value is non-empty; otherwise, `false`.
 */
const isNonEmptyValue = <TValue>(value: TValue): value is Exclude<TValue, null | undefined | boolean> => {
    return (
        (value !== null)
        &&
        (value !== undefined)
        &&
        (value !== false)
        &&
        (value !== true)
    );
};

/**
 * Checks whether a given value is a valid `RoleTagPair`.
 * 
 * This function is designed to differentiate a `RoleTagPair` from a possible array of role-tag pairs (`SemanticPriority`).
 * 
 * - A valid `RoleTagPair` is always a fixed-length tuple (`readonly [Role, Tag | null]`).
 * - Since tuples have a guaranteed length of `2`, checking `value.length === 2` ensures the structure.
 * - The first element must be a string (`Role`), allowing reliable differentiation from an array of role-tag pairs (`MaybeArray<OptionalOrBoolean<RoleTagPair>>`).
 * 
 * **Why check only the first element?**
 * - The second element (`Tag | null`) is structurally guaranteed, so additional validation is unnecessary.
 * - `SemanticPriority` may contain multiple pairs, but each individual pair must have `value[0]` as a `string`.
 * - This approach provides an efficient way to extract `RoleTagPair` from `SemanticPriority = MaybeArray<OptionalOrBoolean<RoleTagPair>>`.
 * 
 * @param value The value to check.
 * @returns `true` if the value is a valid role-tag pair, otherwise `false`.
 */
const isRoleTagPair = (value: RoleTagPair | OptionalOrBoolean<RoleTagPair>[]): value is RoleTagPair => {
    return (
        (value.length === 2)
        &&
        (typeof value[0] === 'string')
    );
};

/**
 * Checks whether the provided `pair` contains a tag that matches the current context.
 * 
 * This function is designed for use within iterative methods, where `this` represents the target tag to locate.
 * 
 * @param this The target tag to locate.
 * @param pair The role-tag pair to check.
 * @returns `true` if the tag within the pair matches `this`, otherwise `false`.
 */
function hasMatchingTag(this: Tag | null, pair: RoleTagPair): boolean {
    return (pair[1] === this);
}



// Collectors:

/**
 * Collects tags associated with the specified `expectedRole`.
 * 
 * If the given `pair` contains the `expectedRole`, the corresponding tag is added to `collector`.
 * 
 * @param collector The accumulated list of tags.
 * @param pair The role-tag pair being evaluated.
 * @param expectedRole The role to match for tag extraction.
 * @returns The updated list of collected tags.
 */
const collectTagsOfRole = (collector: (Tag | null)[], pair: RoleTagPair, expectedRole: Role): (Tag | null)[] => {
    // Add the tag if the role matches `expectedRole`:
    if (pair[0] === expectedRole) collector.push(pair[1]);
    
    
    
    // Return the updated collection:
    return collector;
};



// Computes:

/**
 * Extracts valid `RoleTagPair`s from the given `semanticPriority`, ensuring falsy values are excluded.
 *
 * @param semanticPriority The prioritized role-tag pairs, which may be a single pair or an array.
 * @returns An array of collected `RoleTagPair`s.
 */
export const computeRoleTagPairs = (semanticPriority: SemanticPriority): RoleTagPair[] => {
    // Stores the collected pairs:
    const pairs: RoleTagPair[] = [];
    
    
    
    // Ignore entirely falsy input:
    if (!isNonEmptyValue(semanticPriority)) return pairs;
    
    
    
    // Process either a single pair or multiple pairs:
    if (isRoleTagPair(semanticPriority)) {
        // Directly add the valid pair:
        pairs.push(semanticPriority);
    }
    else {
        // Filter and collect valid pairs:
        pairs.push(...semanticPriority.filter(isNonEmptyValue));
    } // if
    
    
    
    // Return the collected pairs:
    return pairs;
};

/**
 * Computes the appropriate role based on user preference, tag association, and available role-tag pairs.
 * 
 * - If `preferredRole` is explicitly set (not `'auto'`), it is used as the final role.
 * - If `preferredRole` is `'auto'` and `preferredTag` is not `'auto'`, the function attempts to find a matching role from the available pairs.
 * - If no matching role is found, it falls back to the first available role in `resolvePairs()`, or `null` if no candidates exist.
 * 
 * Uses lazy evaluation for efficiency, deferring role-tag pair resolution until necessary.
 * 
 * @param preferredRole The user's preferred role, or `'auto'` for automatic determination.
 * @param preferredTag The user's preferred tag, used for role matching if `preferredRole` is `'auto'`.
 * @param resolvePairs A lazy function resolving the list of role-tag pairs to evaluate.
 * @returns The computed role based on user preference, tag association, and available role-tag pairs.
 */
export const computeRole = (preferredRole: Role | null | 'auto', preferredTag: Tag | null | 'auto', resolvePairs: Lazy<RoleTagPair[]>): Role | null => {
    // Use user-defined role if explicitly provided:
    if (preferredRole !== 'auto') return preferredRole;
    
    
    
    // Resolve the role-tag pairs from resolver:
    const pairs = resolvePairs();
    
    
    
    // If preferredTag is specified, search for a corresponding role based on the given `preferredTag`:
    if (preferredTag !== 'auto') {
        const matchedRole : Role | null | undefined = pairs.find(hasMatchingTag, preferredTag)?.[0];
        if (matchedRole !== undefined) return matchedRole;
    } // if
    
    
    
    // Fall back to the first available role in `pairs`, or `null` if empty:
    return pairs[0]?.[0] ?? null;
};

/**
 * Computes the expected tags associated with the specified `expectedRole`.
 * 
 * - If `expectedRole` is `null`, an empty array is returned.
 * - Otherwise, iterates over the resolved role-tag pairs to collect all matching tags.
 * 
 * Uses lazy evaluation for efficiency, deferring role-tag pair resolution until necessary.
 * 
 * @param expectedRole The role whose associated tags should be collected.
 * @param resolvePairs A lazy function resolving the list of role-tag pairs to evaluate.
 * @returns An array of tags associated with the specified `expectedRole`.
 */
export const computeExpectedTags = (expectedRole: Role | null, resolvePairs: Lazy<RoleTagPair[]>): (Tag | null)[] => {
    // Ensure a valid role exists:
    if (!expectedRole) return [];
    
    
    
    // Extract all tags matching the given role:
    return resolvePairs().reduce<(Tag | null)[]>((collector, pair) => collectTagsOfRole(collector, pair, expectedRole), []);
};

/**
 * Computes the appropriate tag based on user preference and expected tags.
 * 
 * - If `preferredTag` is explicitly set (not `'auto'`), it is used as the final tag.
 * - If `preferredTag` is `'auto'`, the function selects the first available tag in `resolveExpectedTags()`, or `null` if empty.
 * 
 * Uses lazy evaluation for efficiency, deferring expected tags resolution until necessary.
 * 
 * @param preferredTag The user's preferred tag, or `'auto'` for automatic determination.
 * @param resolveExpectedTags A lazy function resolving the list of expected tags.
 * @returns The computed tag based on user preference and available expected tags.
 */
export const computeTag = (preferredTag: Tag | null | 'auto', resolveExpectedTags: Lazy<(Tag | null)[]>): Tag | null => {
    // Use user-defined tag if explicitly provided:
    if (preferredTag !== 'auto') return preferredTag;
    
    
    
    // Selects the first available tag in `expectedTags`, or `null` if empty:
    return resolveExpectedTags()[0] ?? null;
};

/**
 * Determines whether the resolved role is expected based on associated tags.
 * 
 * If `expectedTags` contains one or more tags, the role is considered expected.
 * 
 * @param expectedTags The expected tags associated with the role.
 * @returns `true` if at least one expected tag exists, otherwise `false`.
 */
export const computeIsExpectedRole = (expectedTags: (Tag | null)[]): boolean => {
    return !!expectedTags.length;
};

/**
 * Determines whether the resolved tag matches one of the expected tags.
 * 
 * Performs a presence check for `computedTag` within the list of `expectedTags`.
 * 
 * Uses lazy evaluation for efficiency, deferring computed tag resolution until necessary.
 * 
 * @param expectedTags The expected tags associated with the role.
 * @param resolveComputedTag A lazy function resolving the resolved tag to validate.
 * @returns `true` if the resolved tag is found within `expectedTags`, otherwise `false`.
 */
export const computeIsExpectedTag = (expectedTags: (Tag | null)[], resolveComputedTag: Lazy<Tag | null>): boolean => {
    return !!expectedTags.length && expectedTags.includes(resolveComputedTag());
};

/**
 * Determines whether an explicit role is necessary based on the resolved tag.
 * 
 * - If `computedTag` is non-null and the tag is semantically expected (`resolveIsExpectedTag()`), 
 *   the role is considered implicit and omitted (returns `null`).
 * - Otherwise, the function retains the resolved `computedRole`, which may still be `null` if the provided role is absent.
 * 
 * This decision helps optimize accessibility by avoiding redundant roles when HTML semantics suffice.
 * 
 * @param computedTag The resolved HTML tag associated with the element, or `null` if the tag is absent.
 * @param resolveIsExpectedTag A lazy function resolving whether the tag implicitly fulfills the role.
 * @param resolveComputedRole A lazy function resolving the final computed role.
 * @returns `null` if the tag suffices semantically, otherwise the resolved role.
 */
export const computeImplicitRole = (computedTag: Tag | null, resolveIsExpectedTag: Lazy<boolean>, resolveComputedRole: Lazy<Role | null>): Role | null => {
    // Omit the explicit role if the tag inherently conveys the intended semantics:
    if ((computedTag !== null) && resolveIsExpectedTag()) return null;
    
    
    
    // Otherwise, retain the resolved role to ensure correct semantic meaning:
    return resolveComputedRole();
};
