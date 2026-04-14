import { TSESTree } from '@typescript-eslint/types'



/**
 * Represents a binding identifier → initializer expression mapping.
 * 
 * Each entry corresponds to a declared binding (variable, function, destructured element)
 * and the expression node that provides its value.
 * 
 * ⚠️ Note: The `id` and `value` fields are AST nodes (`TSESTree.Identifier` / `TSESTree.Node`).
 * In the examples below, string and literal previews are shown for readability only.
 * 
 * @example
 * ```ts
 * const var1 = 111;
 * const var2 = foo();
 * function foo() { ... }
 * ```
 * 
 * Result (illustrative preview):
 * [
 *     { id: 'var1', value: 111 },
 *     { id: 'var2', value: foo() },
 *     { id: 'foo',  value: function foo() { ... } },
 * ]
 * 
 * @example
 * ```ts
 * const [
 *     var1,
 *     var2,
 *     [
 *         var3,
 *         ,
 *         var4,
 *     ],
 *     {
 *         prop1,
 *         prop2: aliased
 *     }
 * ] = [
 *     111,
 *     222,
 *     [
 *         333,
 *         999,
 *         444,
 *     ],
 *     {
 *         prop1: 555,
 *         prop2: 666,
 *     }
 * ];
 * ```
 * 
 * Result (illustrative preview):
 * [
 *    { id: 'var1',    value: 111 },
 *    { id: 'var2',    value: 222 },
 *    { id: 'var3',    value: 333 },
 *    { id: null,      value: 999 }, // skipped element
 *    { id: 'var4',    value: 444 },
 *    { id: 'prop1',   value: 555 },
 *    { id: 'aliased', value: 666 },
 * ]
 */
export interface BindingInitializer {
    /**
     * The binding identifier node.
     * May be `null` if the binding name is not present or cannot be determined
     *   (e.g., skipped array elements, anonymous functions, function expressions without names).
     */
    id    : TSESTree.Identifier | null
    
    /**
     * The initializer expression node.
     * May be `null` if the expression value is not statically known
     *   (e.g., skipped array values, destructuring of non-existing properties, uninitialized variables).
     */
    value : TSESTree.Node | null
}



/**
 * Collects all binding identifiers and their initializer expressions
 * from a list of variable declarators.
 * 
 * - Supports simple identifiers and destructuring patterns.
 * - Recursively resolves nested array/object patterns.
 * - Each binding is represented as a `BindingInitializer` entry.
 * 
 * @param declarators One or more variable declarators (with or without initializers).
 * @returns Flattened list of binding → initializer mappings.
 */
export const collectBindingInitializers = (declarators: TSESTree.VariableDeclarator | Array<TSESTree.VariableDeclarator>): Array<BindingInitializer> => (Array.isArray(declarators) ? declarators : [declarators]).flatMap((declarator) => {
    // Get the initializer expression for this variable (may be `null` if uninitialized):
    const correspondingValue = declarator.init;
    
    
    
    // Recursively destructure the variable with the corresponding value:
    return destructurePatternBindings.call(correspondingValue, declarator.id);
});

/**
 * Recursively destructures a binding pattern to collect identifier → initializer pairs.
 * 
 * - Uses `this` to carry the current initializer expression down the recursion.
 * - Handles identifiers, assignment patterns, array patterns, and object patterns.
 * - Returns a flat list of `BindingInitializer` entries.
 * 
 * @param pattern The destructuring pattern node (Identifier, ArrayPattern, ObjectPattern, etc.).
 * @returns A flattened list of binding → initializer mappings.
 */
function destructurePatternBindings(this: TSESTree.Expression | null, pattern: TSESTree.DestructuringPattern | null): Array<BindingInitializer> {
    // Skip empty pattern (e.g. skipped elements in array destructuring: `[1,2,,,,3]`):
    if (!pattern) return [];
    
    
    
    // Handle different pattern cases:
    switch (pattern.type) {
        // Handle simple identifier → record binding directly:
        case TSESTree.AST_NODE_TYPES.Identifier:
            return [{
                id    : pattern,
                value : this,
            }];
        
        
        
        // Handle assignment pattern (e.g. `const x = 1`, `[a = 2]`, or `{a = 2}`):
        case TSESTree.AST_NODE_TYPES.AssignmentPattern:
            // Recursively destructure the left side with the corresponding value:
            return destructurePatternBindings.call(
                this ?? pattern.right, // Prefer explicit initializer, fallback to default.
                pattern.left
            );
        
        
        
        // Handle array destructuring → recursively unwrap nested bindings:
        case TSESTree.AST_NODE_TYPES.ArrayPattern: {
            // Candidate initializer values (must be an `ArrayExpression` to resolve statically):
            const elements = (
                (this?.type === TSESTree.AST_NODE_TYPES.ArrayExpression)
                ? this.elements
                : []
            );
            
            // Flatten spread elements so we can consume values sequentially:
            const remainingElements = resolveSpreadArrayElements(elements);
            
            // Bail out if spread resolution failed:
            if (!remainingElements) return [];
            
            
            
            // Walk through each element in the `ArrayPattern` and consume initializer values in sequential order.
            // - Maintains alignment between pattern slots and initializer values (skipped elements still consume one).
            // - Handles `RestElement` by collecting all remaining unconsumed values into a synthetic `ArrayExpression`.
            // - Handles `Identifier`, `AssignmentPattern`, and nested Array/Object by consuming one element value.
            // - Ignores unsupported node types but still advances the initializer cursor.
            // The accumulator tracks both:
            //   - `results`: collected binding → initializer pairs
            //   - `remainingValues`: initializer values yet to be consumed
            return pattern.elements.reduce((accum, element) => {
                // Handle skipped element (e.g. `[1, , 2]`):
                if (!element) {
                    // Consume one initializer to preserve alignment, even though no binding is declared:
                    accum.remainingValues.shift();
                    
                    // Continue to the next element:
                    return accum;
                } // if
                
                
                
                /**
                 * Array destructuring cases:
                 * ```ts
                 * const [
                 *     foo,           // Identifier
                 *     bar = 0,       // AssignmentPattern with default
                 *     [one, two],    // Nested ArrayPattern
                 *     {three, four}, // Nested ObjectPattern
                 *     ...rest        // RestElement
                 * ] = ...
                 * ```
                 */
                switch (element.type) {
                    // Handle rest elements:
                    case TSESTree.AST_NODE_TYPES.RestElement: {
                        // Consume all remaining initializer values:
                        // - Filtering out holes (`null`) since they don't have AST nodes to inform the location of the rest pattern.
                        const restValues = accum.remainingValues.splice(0).filter((value) => (value !== null));
                        
                        // Construct synthetic `ArrayExpression` only if the rest values are known:
                        // - This allows us to recursively destructure the rest pattern with the correct initializer context.
                        const correspondingValues : TSESTree.ArrayExpression | null = restValues.length ? {
                            type     : TSESTree.AST_NODE_TYPES.ArrayExpression,
                            elements : restValues,
                            
                            // Approximate location metadata from first/last element:
                            // - Currently this metadata is not used in the next reqursive call,
                            //   only the element's metadata is used.
                            parent   : restValues[0].parent,
                            loc      : restValues[0].loc,
                            range    : [
                                restValues[0].range[0],
                                restValues[restValues.length - 1].range[1],
                            ],
                        } : null;
                        
                        
                        
                        // Recursively destructure the rest elements with the corresponding values:
                        accum.results.push(...destructurePatternBindings.call(correspondingValues, element.argument));
                        break;
                    }
                    
                    
                    
                    // Handle single-element destructuring (`Identifier`, `AssignmentPattern`, and nested Array/Object):
                    case TSESTree.AST_NODE_TYPES.Identifier:
                    case TSESTree.AST_NODE_TYPES.AssignmentPattern:
                    case TSESTree.AST_NODE_TYPES.ArrayPattern:
                    case TSESTree.AST_NODE_TYPES.ObjectPattern: {
                        // Consume one initializer value:
                        // - May be `null` if the initializer array is exhausted,
                        //   which can happen with patterns that have more elements than the initializer (e.g. `[a, b, c] = [1]`).
                        const correspondingValue = accum.remainingValues.shift() ?? null;
                        
                        
                        
                        // Recursively destructure the element with the corresponding value:
                        accum.results.push(...destructurePatternBindings.call(correspondingValue, element));
                        break;
                    }
                    
                    
                    
                    // Handle any other node type:
                    // - This node type does not contribute binding identifiers, so we ignore it.
                    default:
                        // Consume one initializer to preserve alignment, even though no binding is declared:
                        accum.remainingValues.shift();
                        break;
                } // switch
                
                
                
                // Continue to the next element:
                return accum;
            }, {
                /**
                 * The collected binding → initializer pairs as we walk the patterns.
                 */
                results : [] as  Array<BindingInitializer>,
                
                /**
                 * The remaining initializer values.
                 * Consumed sequentially to preserve alignment with the destructuring pattern.
                 * 
                 * ⚠️ Note: This array is passed by reference and mutated in place.
                 * Clone with `.slice(0)` if you need to preserve the original.
                 */
                remainingValues: remainingElements,
            }).results;
        }
        
        
        
        // Handle object destructuring → recursively unwrap nested bindings:
        case TSESTree.AST_NODE_TYPES.ObjectPattern: {
            // Candidate initializer values (must be an `ObjectExpression` to resolve statically):
            const properties = (
                (this?.type === TSESTree.AST_NODE_TYPES.ObjectExpression)
                ? this.properties
                : []
            );
            
            // Flatten spread properties so we can consume values by key:
            const remainingProperties = resolveSpreadObjectProperties(properties);
            
            // Bail out if spread resolution failed:
            if (!remainingProperties) return [];
            
            // Maps: static identifier/literal → corresponding value:
            // - Only statically known keys are included.
            // - Computed keys are excluded (cannot be resolved statically).
            // - Drives the statically known values for the rest property keys,
            //   as long as we don't encounter dynamic property keys.
            const remainingPropertyMap = new Map(
                remainingProperties
                // Keep only non-computed properties (`Identifier` or `Literal` keys):
                .filter((computedOrNonComputedProperty): computedOrNonComputedProperty is TSESTree.PropertyNonComputedName => (computedOrNonComputedProperty.key.type === TSESTree.AST_NODE_TYPES.Identifier) || (computedOrNonComputedProperty.key.type === TSESTree.AST_NODE_TYPES.Literal))
                // Map each property to [keyName, entry]:
                .map((property) => [
                    ('name' in property.key) ? property.key.name : String(property.key.value),
                    {
                        // Original property node:
                        property,
                        
                        // Non-computed key node:
                        key      : property.key,
                        
                        // Initializer expression:
                        value    : property.value,
                        
                        // Consumption flag (multiple uses allowed):
                        consumed : false,
                    },
                ])
            );
            
            
            
            // Walk through each property in the `ObjectPattern` and consume initializer values by key.
            // - Maintains alignment by marking properties as consumed (not deleting them).
            // - Handles `RestElement` by collecting all remaining unconsumed values into a synthetic `ObjectExpression`.
            // - Handles `Identifier`, `AssignmentPattern`, and nested Array/Object by consuming one property value.
            // - Ignores unsupported node types but still marks the corresponding property as consumed.
            // The accumulator tracks both:
            //   - `results`: collected binding → initializer pairs
            //   - `remainingValues`: initializer values yet to be consumed
            return pattern.properties.reduce((accum, property) => {
                /**
                 * Object destructuring cases:
                 * ```ts
                 * const {
                 *     foo,                 // Identifier
                 *     cat : tom,           // Identifier (renamed)
                 *     bar = 0,             // AssignmentPattern with default
                 *     cow : [one, two],    // Nested ArrayPattern
                 *     dog : {three, four}, // Nested ObjectPattern
                 *     ...rest              // RestElement (rest properties)
                 * } = ...
                 * ```
                 */
                switch (property.type) {
                    // Handle rest properties:
                    case TSESTree.AST_NODE_TYPES.RestElement: {
                        // Gather unconsumed entries and extract their property nodes:
                        const restValues = (
                            // The rest values are statically known:
                            !accum.restUnresolvable
                            ? (
                                Array.from(accum.remainingValues.values())
                                .filter(({ consumed }) => !consumed)
                                .map(({ property }) => property)
                            )
                            
                            // The rest values are no longer statically known:
                            : []
                        );
                        
                        // Clear all remaining values since rest consumes everything left:
                        accum.remainingValues.clear();
                        
                        // Construct synthetic `ObjectExpression` only if the rest values are statically known:
                        // - This allows us to recursively destructure the rest pattern with the correct initializer context.
                        const correspondingValues : TSESTree.ObjectExpression | null = restValues.length ? {
                            type       : TSESTree.AST_NODE_TYPES.ObjectExpression,
                            properties : restValues,
                            
                            // Approximate location metadata from first/last property:
                            // - Currently this metadata is not used in the next reqursive call,
                            //   only the property's metadata is used.
                            parent     : restValues[0].parent,
                            loc        : restValues[0].loc,
                            range      : [
                                restValues[0].range[0],
                                restValues[restValues.length - 1]?.range[1],
                            ],
                        } : null;
                        
                        
                        
                        // Recursively destructure the rest properties with the corresponding values:
                        accum.results.push(...destructurePatternBindings.call(correspondingValues, property.argument));
                        break;
                    }
                    
                    
                    
                    // Handle single-property destructuring (`Identifier`, `AssignmentPattern`, and nested Array/Object):
                    case TSESTree.AST_NODE_TYPES.Property: {
                        // Use `property.value.type` (the aliased binding name) instead of `property.key.type` (the original object key):
                        switch (property.value.type) {
                            case TSESTree.AST_NODE_TYPES.Identifier:
                            case TSESTree.AST_NODE_TYPES.AssignmentPattern:
                            case TSESTree.AST_NODE_TYPES.ArrayPattern:
                            case TSESTree.AST_NODE_TYPES.ObjectPattern: {
                                // Resolve original object key:
                                let propertyName : string | undefined = undefined;
                                switch (property.key.type) { // Use `property.key.type` (the original object key) instead of `property.value.type` (the aliased binding name).
                                    // Static property keys:
                                    case TSESTree.AST_NODE_TYPES.Identifier:
                                        propertyName = property.key.name;
                                        break;
                                    
                                    case TSESTree.AST_NODE_TYPES.Literal:
                                        propertyName = String(property.key.value);
                                        break;
                                    
                                    
                                    
                                    // Computed property keys:
                                    default:
                                        propertyName = undefined; // Mark as unsupported computed property name.
                                        break;
                                } // switch
                                const correspondingEntry    = (propertyName !== undefined) ? accum.remainingValues.get(propertyName) : undefined;
                                
                                // Mark as consumed (do not delete, since keys may be reused):
                                //
                                // Example of multiple usage of the same property key:
                                // ```ts
                                // const {
                                //     prop1,          // First usage
                                //     prop1 : alias1, // Second usage
                                //     prop1 : alias2, // Third usage
                                //     prop2,
                                // } = ...
                                // ```
                                if (correspondingEntry) correspondingEntry.consumed = true;
                                
                                // Take the entry's value:
                                const correspondingValue = correspondingEntry?.value ?? null;
                                
                                // ⚠️ Important:
                                // Do not clear the map when encountering computed keys.
                                // - Static keys remain resolvable and should still be tracked.
                                // - Instead, mark the accumulator flag so RestElement knows
                                //   the rest values cannot be trusted.
                                // if (propertyName === undefined) accum.remainingValues.clear(); // 🚫 Don't!
                                if (propertyName === undefined) accum.restUnresolvable = true;    // ✅ Use this instead.
                                
                                
                                
                                // Recursively destructure the property with the corresponding value:
                                accum.results.push(...destructurePatternBindings.call(
                                    (
                                        correspondingValue?.type.endsWith('Expression')
                                        ? correspondingValue as TSESTree.Expression | null
                                        : null
                                    ),
                                    property.value
                                ));
                                break;
                            }
                            
                            
                            
                            // Handle any other node type:
                            // - This node type does not contribute binding identifiers, so we ignore it.
                            default:
                                // Nothing to do.
                                break;
                        } // switch
                        
                        
                        
                        break;
                    }
                    
                    
                    
                    // Handle unexpected property type:
                    // - Should not happened, so we ignore it.
                    default:
                        // Nothing to do.
                        break;
                } // switch
                
                
                
                // Continue to the next property:
                return accum;
            }, {
                /**
                 * The collected binding → initializer pairs as we walk the patterns.
                 */
                results : [] as  Array<BindingInitializer>,
                
                /**
                 * The remaining initializer values keyed by property name.
                 * Entries are marked as consumed rather than deleted, since
                 * object destructuring can reference the same key multiple times.
                 * 
                 * ⚠️ Note: This map is passed by reference and mutated in place.
                 * Clone with `new Map(original)` if you need to preserve the original.
                 */
                remainingValues: remainingPropertyMap,
                
                /**
                 * Indicates whether the `remainingValues` are no longer be valid.
                 * - Set to true when a computed property key is encountered.
                 * - If true, `restValues` must assign `null` instead of constructing
                 *   from `remainingValues`.
                 */
                restUnresolvable: false,
            }).results;
        }
        
        
        
        // Rest element (e.g. `[...rest]` or `{ ...rest }`):
        // - These are handled at the parent ArrayPattern/ObjectPattern level → ignore here.
        // case TSESTree.AST_NODE_TYPES.RestElement:
        
        
        
        // Any other node type does not contribute binding names:
        default:
            return [];
    } // switch
}



/**
 * Resolves and flattens nested array elements with spread syntax.
 * 
 * - Handles `SpreadElement` whose argument is an `ArrayExpression`.
 * - Recursively flattens nested array literals.
 * - Returns `null` if any spread cannot be statically resolved (non-array expression).
 * 
 * @param elements Array elements (including possible SpreadElements).
 * @returns Flattened array of expressions, or `null` if resolution fails.
 */
const resolveSpreadArrayElements = (elements: (TSESTree.Expression | TSESTree.SpreadElement | null)[]): Array<TSESTree.Expression | null> | null => {
    // Collect all values produced by the generator:
    const flattened = [...resolveSpreadArrayElementsGen(elements)];
    
    
    
    // If the generator terminated with a failure, the last item will be `undefined`:
    // - An empty array is considered a valid success.
    if (flattened.length && (flattened.at(-1) === undefined)) return null;
    
    
    
    // Success: no `undefined` present, safe to cast:
    return flattened as Array<TSESTree.Expression | null>;
};

/**
 * An internal generator for `resolveSpreadArrayElements`.
 * 
 * - Iterates over array elements and expands any `SpreadElement` whose argument is an `ArrayExpression`.
 * - Recursively flattens nested array literals.
 * - Terminates immediately (`return`) if a spread cannot be statically resolved.
 * 
 * @param elements Array elements (including possible SpreadElements).
 * @yields Each resolved element (`Expression | null`).
 * @returns `undefined` as the final return value if resolution fails.
 */
function* resolveSpreadArrayElementsGen(elements: (TSESTree.Expression | TSESTree.SpreadElement | null)[]): Generator<TSESTree.Expression | null | undefined> {
    for (const element of elements) {
        // Handle spread elements → recursively flatten if it's an array expression, or fail if it's not:
        if (element?.type === TSESTree.AST_NODE_TYPES.SpreadElement) {
            // Get the spread argument:
            const spreadArg = element.argument;
            
            
            
            // Spread argument must be an `ArrayExpression` to resolve statically:
            if (spreadArg.type === TSESTree.AST_NODE_TYPES.ArrayExpression) {
                for (const nested of resolveSpreadArrayElementsGen(spreadArg.elements)) {
                    // If a failure detected in recursion → terminate generator:
                    if (nested === undefined) return undefined;
                    
                    
                    
                    // Otherwise, yield the resolved nested element:
                    yield nested;
                } // for
            }
            
            
            
            // Otherwise, spread of non-array → runtime-only, cannot resolve statically → terminate generator:
            else {
                return undefined;
            } // if
        } // if
        
        
        
        // Handle regular array element → emit directly:
        else {
            yield element;
        } // if
    } // for
}



/**
 * Resolves and flattens nested object properties with spread syntax.
 * 
 * - Handles `SpreadElement` whose argument is an `ObjectExpression`.
 * - Recursively flattens nested object literals.
 * - Returns `null` if any spread cannot be statically resolved (non-object expression).
 * 
 * @param properties Object properties (including possible SpreadElements).
 * @returns Flattened array of properties, or `null` if resolution fails.
 */
const resolveSpreadObjectProperties = (properties: (TSESTree.ObjectLiteralElement | TSESTree.SpreadElement)[]): Array<TSESTree.PropertyComputedName | TSESTree.PropertyNonComputedName> | null => {
    // Collect all values produced by the generator:
    const flattened = [...resolveSpreadObjectPropertiesGen(properties)];
    
    
    
    // If the generator terminated with a failure, the last item will be `undefined`:
    // - An empty array is considered a valid success.
    if (flattened.length && (flattened.at(-1) === undefined)) return null;
    
    
    
    // Success: no `undefined` present, safe to cast:
    return flattened as Array<TSESTree.PropertyComputedName | TSESTree.PropertyNonComputedName>;
};

/**
 * An internal generator for `resolveSpreadObjectProperties`.
 * 
 * - Iterates over object properties and expands any `SpreadElement` whose argument is an `ObjectExpression`.
 * - Recursively flattens nested object literals.
 * - Terminates immediately (`return`) if a spread cannot be statically resolved.
 * 
 * @param properties Object properties (including possible SpreadElements).
 * @yields Each resolved property (`PropertyComputedName | PropertyNonComputedName`).
 * @returns `undefined` as the final return value if resolution fails.
 */
function* resolveSpreadObjectPropertiesGen(properties: (TSESTree.ObjectLiteralElement | TSESTree.SpreadElement)[]): Generator<TSESTree.PropertyComputedName | TSESTree.PropertyNonComputedName | undefined> {
    for (const property of properties) {
        // Handle spread properties → recursively flatten if it's an object expression, or fail if it's not:
        if (property.type === TSESTree.AST_NODE_TYPES.SpreadElement) {
            // Get the spread argument:
            const spreadArg = property.argument;
            
            
            
            // Spread argument must be an `ObjectExpression` to resolve statically:
            if (spreadArg.type === TSESTree.AST_NODE_TYPES.ObjectExpression) {
                for (const nested of resolveSpreadObjectPropertiesGen(spreadArg.properties)) {
                    // If a failure detected in recursion → terminate generator:
                    if (nested === undefined) return undefined;
                    
                    
                    
                    // Otherwise, yield the resolved nested property:
                    yield nested;
                } // for
            }
            
            
            
            // Otherwise, spread of non-object → runtime-only, cannot resolve statically → terminate generator:
            else {
                return undefined;
            } // if
        } // if
        
        
        
        // Handle regular object property → emit directly:
        else {
            yield property;
        } // if
    } // for
}



/**
 * Collects all top-level bindings in a Program node.
 * Excludes imports and empty statements.
 */
export const collectTopLevelBindings = (program: TSESTree.Program): Array<BindingInitializer> => {
    // Hold all collected bindings:
    const bindings: Array<BindingInitializer> = [];
    
    
    
    // Walk through each top-level statement in the program:
    for (const statement of program.body) {
        // Skip empty statements (semicolons, empty lines):
        if (statement.type === TSESTree.AST_NODE_TYPES.EmptyStatement) continue;
        
        // Skip imports (handled separately):
        if (statement.type === TSESTree.AST_NODE_TYPES.ImportDeclaration) continue;
        
        
        
        // Function declarations:
        if (statement.type === TSESTree.AST_NODE_TYPES.FunctionDeclaration && statement.id) {
            bindings.push({ id: statement.id, value: statement });
            continue;
        } // if
        
        // TS declare functions (overloads):
        if (statement.type === TSESTree.AST_NODE_TYPES.TSDeclareFunction && statement.id) {
            bindings.push({ id: statement.id, value: statement });
            continue;
        } // if
        
        // Class declarations:
        if (statement.type === TSESTree.AST_NODE_TYPES.ClassDeclaration && statement.id) {
            bindings.push({ id: statement.id, value: statement });
            continue;
        } // if
        
        // Variable declarations:
        if (statement.type === TSESTree.AST_NODE_TYPES.VariableDeclaration) {
            bindings.push(...collectBindingInitializers(statement.declarations));
            continue;
        } // if
        
        
        
        // Exported declarations (unwrap and collect):
        if ((statement.type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration) || (statement.type === TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration)) {
            // Get the declaration from the export statement:
            const decl = statement.declaration;
            
            
            
            // Skip export statements without declarations, e.g.:
            // - `export { foo, bar } from './module.js'` (re-exports, no local bindings)
            // - `export type { Foo, Bar } from './module.js'` (re-exports types, no local bindings)
            // - `export { foo, bar }` (exports existing bindings, no new declarations)
            // - `export type { Foo, Bar }` (exports existing types, no new declarations)
            if (!decl) continue;
            
            
            
            // Function declarations:
            if (decl.type === TSESTree.AST_NODE_TYPES.FunctionDeclaration && decl.id) {
                bindings.push({ id: decl.id, value: decl });
                continue;
            } // if
            
            // TS declare functions (overloads):
            if (decl.type === TSESTree.AST_NODE_TYPES.TSDeclareFunction && decl.id) {
                bindings.push({ id: decl.id, value: decl });
                continue;
            } // if
            
            // Class declarations:
            if (decl.type === TSESTree.AST_NODE_TYPES.ClassDeclaration && decl.id) {
                bindings.push({ id: decl.id, value: decl });
                continue;
            } // if
            
            // Variable declarations:
            if (decl.type === TSESTree.AST_NODE_TYPES.VariableDeclaration) {
                bindings.push(...collectBindingInitializers(decl.declarations));
                continue;
            } // if
        } // if
    } // for
    
    
    
    // Return all collected bindings:
    return bindings;
};
