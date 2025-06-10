import { Bench } from 'tinybench'
import { useMergeStyles, useMergeStyles_BAK } from '../dist/styles.js'



// Test scenarios mapping
const testCases = {
    'Simple styles': [{ color: 'red' }, { fontSize: '16px' }],
    'Falsy values removed': [{ color: 'red' }, null, undefined, false, true, { backgroundColor: 'blue' }],
    'Nested arrays': [[{ color: 'red' }, [{ fontSize: '16px' }, [{ opacity: 0.5 }]]]],
    'Conditional style mapping': [{ display: 'block', visibility: false, padding: '10px' }],
    'Mixed objects, arrays, and styles': [{ color: 'red' }, [{ fontSize: '16px' }], { backgroundColor: 'blue', border: false }],
    'Deeply nested mapped styles': [
        { padding: '10px', margin: '5px' },
        [{ backgroundColor: 'blue', opacity: 0.8 }, { boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }],
        { position: 'absolute' }
    ],
    'Multiple mappings with arrays and styles': [
        { display: 'flex' },
        [{ justifyContent: 'center', alignItems: 'stretch' }],
        { fontWeight: 'bold', letterSpacing: '1px' }
    ]
};


// Initialize benchmark
const bench = new Bench({ time: 500 /*ms*/ });

Object.entries(testCases).forEach(([title, props]) => {
    bench.add(`useMergeStyles: ${title}`, () => useMergeStyles(...props));
    bench.add(`useMergeStyles_BAK: ${title}`, () => useMergeStyles_BAK(...props));
});

bench.run().then(() => {
    console.table(bench.table()); // Display benchmark results in table format
});
