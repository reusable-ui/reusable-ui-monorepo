// Types:
import {
    type Role,
    type Tag,
    type RoleTagPair,
    type SemanticPriority,
    type ResolvedSemanticAttributes,
}                           from './types.js'

// Utilities:
import {
    // Computes:
    computeRoleTagPairs,
    computeExpectedTags,
    computeRole,
    computeTag,
    computeIsExpectedRole,
    computeIsExpectedTag,
    computeImplicitRole,
}                           from './utilities.js'



/**
 * Cache keys for stored computed values.
 */
const enum CacheKey {
    RoleTagPairs   = 0,
    Role           = 1,
    ExpectedTags   = 2,
    Tag            = 3,
    IsExpectedRole = 4,
    IsExpectedTag  = 5,
    ImplicitRole   = 6,
}



/**
 * Lazy evaluation for resolving semantic attributes.
 */
export class LazySemanticEvaluator implements ResolvedSemanticAttributes {
    /**
     * The semantic priority provided during initialization.
     */
    readonly #semanticPriority : SemanticPriority;
    
    /**
     * The preferred role provided during initialization.
     */
    readonly #preferredRole    : Role | null | 'auto';
    
    /**
     * The preferred tag provided during initialization.
     */
    readonly #preferredTag     : Tag | null | 'auto';
    
    /**
     * Initializes the lazy evaluator with the provided attributes.
     * 
     * @param {SemanticPriority} semanticPriority - The priority-based semantic associations.
     * @param {Role | null | 'auto'} preferredRole - The preferred role, either explicit or determined automatically.
     * @param {Tag | null | 'auto'} preferredTag - The preferred tag, either explicit or determined automatically.
     */
    constructor(semanticPriority: SemanticPriority, preferredRole: Role | null | 'auto', preferredTag: Tag | null | 'auto') {
        this.#semanticPriority = semanticPriority;
        this.#preferredRole    = preferredRole;
        this.#preferredTag     = preferredTag;
    }
    
    
    
    /**
     * Cache store for computed values.
     */
    readonly #cacheMap = new Map<number, unknown>();
    
    /**
     * Retrieves a cached value if available, otherwise computes and stores it.
     * 
     * @param {number} cacheKey - The unique key identifying the cached value.
     * @param {() => TValue} resolver - The function to compute the value if not cached.
     * @returns {TValue} - The retrieved or computed value.
     */
    #getCachedValue<TValue>(cacheKey: number, resolver: () => TValue): TValue {
        // Return cached value if available:
        const cachedValue = this.#cacheMap.get(cacheKey);
        if (cachedValue !== undefined) return cachedValue as TValue;
        
        
        
        // Compute the new value:
        const computedValue = resolver();
        
        
        
        // Store the new value:
        this.#cacheMap.set(cacheKey, computedValue);
        
        
        
        // Return the computed value:
        return computedValue;
    }
    
    
    
    /**
     * Retrieves the resolved role-tag pairs, computing and caching it if necessary.
     */
    get #computedRoleTagPairs(): RoleTagPair[] {
        return this.#getCachedValue(
            CacheKey.RoleTagPairs,
            () => computeRoleTagPairs(this.#semanticPriority)
        );
    }
    
    
    
    /**
     * Retrieves the resolved role, computing and caching it if necessary.
     */
    get #computedRole(): Role | null {
        return this.#getCachedValue(
            CacheKey.Role,
            () => computeRole(this.#preferredRole, this.#preferredTag, () => this.#computedRoleTagPairs)
        );
    }
    
    
    
    /**
     * Retrieves the resolved expected tags, computing and caching it if necessary.
     */
    get #computedExpectedTags(): (Tag | null)[] {
        return this.#getCachedValue(
            CacheKey.ExpectedTags,
            () => computeExpectedTags(this.#computedRole, () => this.#computedRoleTagPairs)
        );
    }
    
    
    
    get tag(): Tag | null {
        return this.#getCachedValue(
            CacheKey.Tag,
            () => computeTag(this.#preferredTag, () => this.#computedExpectedTags)
        );
    }
    
    
    
    get isExpectedRole(): boolean {
        return this.#getCachedValue(
            CacheKey.IsExpectedRole,
            () => computeIsExpectedRole(this.#computedExpectedTags)
        );
    }
    
    
    
    get isExpectedTag(): boolean {
        return this.#getCachedValue(
            CacheKey.IsExpectedTag,
            () => computeIsExpectedTag(this.#computedExpectedTags, () => this.tag)
        );
    }
    
    
    
    get role(): Role | null {
        return this.#getCachedValue(
            CacheKey.ImplicitRole,
            () => computeImplicitRole(this.tag, () => this.isExpectedTag, () => this.#computedRole)
        );
    }
}
