import { children, ifNthChild, style } from '@cssfn/core'
import { ifScreenWidthAtLeast, ifScreenWidthSmallerThan, ifScreenWidthBetween, ifScreenWidthAt } from '@reusable-ui/breakpoints';
import { spacerVars, spacerExpressions } from '@reusable-ui/spacers'



if (typeof window !== 'undefined') {
    Object.assign(window, {spacerVars, spacerExpressions});
} // if



const responsiveLayout = () => style({
    ...children('div', {
        opacity: 0.15,
        transition: [['opacity', '0.5s']],
        
        ...ifNthChild(0, 1, {
            ...ifScreenWidthAtLeast('xs', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 2, {
            ...ifScreenWidthAtLeast('sm', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 3, {
            ...ifScreenWidthAtLeast('md', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 4, {
            ...ifScreenWidthAtLeast('lg', {
                opacity: 1,
            }),
        }),
        
        
        
        ...ifNthChild(0, 5, {
            ...ifScreenWidthSmallerThan('xs', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 6, {
            ...ifScreenWidthSmallerThan('sm', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 7, {
            ...ifScreenWidthSmallerThan('md', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 8, {
            ...ifScreenWidthSmallerThan('lg', {
                opacity: 1,
            }),
        }),
        
        
        
        ...ifNthChild(0, 9, {
            ...ifScreenWidthBetween('xs', 'md', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 10, {
            ...ifScreenWidthBetween('xs', 'xs', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 11, {
            ...ifScreenWidthBetween('sm', 'md', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 12, {
            ...ifScreenWidthBetween('sm', 'lg', {
                opacity: 1,
            }),
        }),
        
        
        
        ...ifNthChild(0, 13, {
            ...ifScreenWidthAt('xs', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 14, {
            ...ifScreenWidthAt('sm', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 15, {
            ...ifScreenWidthAt('md', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 16, {
            ...ifScreenWidthAt('lg', {
                opacity: 1,
            }),
        }),
    })
});

export default function main() {
    return style({
        ...responsiveLayout(),
    });
};
