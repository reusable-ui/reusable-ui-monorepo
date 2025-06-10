import { Bench } from 'tinybench'
import { mergeClasses, mergeClasses_BAK } from '../dist/styles.js'
import classnames from 'classnames';



// Test scenarios mapping
const testCases = {
    'Simple classes': ['btn', 'active'],
    'Falsy values removed': ['btn', null, undefined, false, true, 'primary'],
    'Nested arrays': [['btn', ['active', ['hover', ['focus']]]]],
    'Conditional object mapping': [{ primary: true, disabled: false, active: true }],
    'Mixed objects, arrays, and strings': ['btn', { active: true }, ['hover', { focus: false }, 'rounded']],
    'Deeply nested mapped objects': [
        { primary: true, secondary: false },
        ['btn', { danger: true, warning: false }],
        { success: true }
    ],
    'Multiple mappings with arrays and strings': [
        'base',
        { darkMode: true, lightMode: false },
        ['rounded', { border: true }, 'shadow']
    ]
};

// Initialize benchmark
const bench = new Bench({ time: 500 /*ms*/ });

Object.entries(testCases).forEach(([title, props]) => {
    bench.add(`classnames: ${title}`, () => classnames(...props));
    bench.add(`mergeClasses: ${title}`, () => mergeClasses(...props));
    bench.add(`mergeClasses_BAK: ${title}`, () => mergeClasses_BAK(...props));
});

bench.run().then(() => {
    console.table(bench.table()); // Display benchmark results in table format
});
