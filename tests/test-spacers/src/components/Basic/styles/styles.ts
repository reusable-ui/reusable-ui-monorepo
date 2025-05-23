import { sizes } from '@/libs/sizes'
import { rule, style, variants } from '@cssfn/core'
import { spacerVars, spacerExpressions } from '@reusable-ui/spacers'



if (typeof window !== 'undefined') {
    Object.assign(window, {spacerVars, spacerExpressions});
} // if



const basicLayout = () => style({
    display: 'grid',
    gridAutoFlow: 'column',
    gap: '1em',
    justifyContent: 'start',
    backgroundColor : 'oklch(0.58 0.228 260)',
    color : 'white',
    border: 'solid 1px black',
    padding : 'var(--sp)',
    borderRadius: '0.5rem',
});
const basicVariants = () => style({
    ...variants([
        ...
        sizes
        .map((sizeName) =>
            rule(`.${sizeName}`, {
                '--sp': spacerVars[sizeName],
            }),
        ),
    ]),
});

export default function main() {
    return style({
        ...basicLayout(),
        ...basicVariants(),
    });
};
