import { sizes } from '@/libs/sizes'
import { rule, style, variants } from '@cssfn/core'
import { borderVars, borderExpressions, borderRadiusVars, borderRadiusExpressions } from '@reusable-ui/borders'



if (typeof window !== 'undefined') {
    Object.assign(window, {borderVars, borderExpressions});
    Object.assign(window, {borderRadiusVars, borderRadiusExpressions});
} // if



const basicLayout = () => style({
    display: 'grid',
    gridAutoFlow: 'column',
    gap: '1em',
    justifyContent: 'start',
    backgroundColor : 'oklch(0.58 0.228 260)',
    color : 'white',
    border: 'solid 1px black',
    borderWidth : 'var(--bd)',
    borderRadius: '0.5rem',
    padding: '0.5rem',
});
const basicVariants = () => style({
    ...variants([
        ...
        sizes
        .map((sizeName) =>
            rule(`.${sizeName}`, {
                '--bd': borderVars[sizeName],
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
