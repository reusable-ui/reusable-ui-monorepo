import { themes } from '@/libs/themes'
import { rule, style, variants, vars } from '@cssfn/core'
import { colorVars, colorExpressions, colorParamVars, colorParamExpressions, defineTheme, deleteTheme } from '@reusable-ui/colors'



if (typeof window !== 'undefined') {
    Object.assign(window, {colorVars, colorExpressions, defineTheme, deleteTheme});
    Object.assign(window, {colorParamVars, colorParamExpressions});
} // if



const basicLayout = () => style({
    display: 'grid',
    gridAutoFlow: 'column',
    gap: '1em',
    justifyContent: 'start',
    backgroundColor : 'var(--bg)',
    color : 'var(--fg)',
    border: 'solid 1px',
    borderColor : 'var(--bd)',
    borderRadius: '0.5rem',
    boxShadow: '0px 0px 0px 5px var(--rg)',
    padding: '0.5rem',
    // animation: [
    //     ['1000ms', 'both', 'alternate', 'infinite', 'test'],
    // ],
    // ...keyframes('test', {
    //     from : {
    //         backgroundColor: colors.danger,
    //     },
    //     to : {
    //         backgroundColor: colors.success,
    //     },
    // }),
});
const basicVariants = () => style({
    ...vars({
        '--bg': 'var(--bg-edge-sw, var(--bg-mild-sw, var(--bg-base)))',
        '--fg': 'var(--fg-edge-sw, var(--fg-mild-sw, var(--fg-base)))',
        '--bd': 'var(--bd-edge-sw, var(--bd-mild-sw, var(--bd-base)))',
        '--rg': 'var(--rg-edge-sw, var(--rg-mild-sw, var(--rg-base)))',
    }),
    ...variants([
        ...
        themes
        .map((themeName) =>
            rule(`.${themeName}`, {
                // Background:
                '--bg-base': colorVars[`${themeName}Base`],
                '--bg-mild': colorVars[`${themeName}Mild`],
                '--bg-edge': 'transparent',
                
                // Foreground:
                '--fg-base': colorVars[`${themeName}Flip`],
                '--fg-mild': colorVars[`${themeName}Text`],
                '--fg-edge': colorVars[`${themeName}Edge`],
                
                // Border:
                '--bd-base': colorVars[`${themeName}Bold`],
                '--bd-mild': colorVars[`${themeName}Thin`],
                '--bd-edge': colorVars[`${themeName}Edge`],
                
                // Ring:
                '--rg-base': colorVars[`${themeName}Soft`],
                '--rg-mild': colorVars[`${themeName}Soft`],
                '--rg-edge': colorVars[`${themeName}Soft`],
            }),
        ),
        rule('.mild', {
            '--bg-mild-sw' : `var(--bg-mild)`,
            '--fg-mild-sw' : `var(--fg-mild)`,
            '--bd-mild-sw' : `var(--bd-mild)`,
            '--rg-mild-sw' : `var(--rg-mild)`,
        }),
        rule('.outlined', {
            '--bg-edge-sw' : `var(--bg-edge)`,
            '--fg-edge-sw' : `var(--fg-edge)`,
            '--bd-edge-sw' : `var(--bd-edge)`,
            '--rg-edge-sw' : `var(--rg-edge)`,
        }),
    ]),
});

export default function main() {
    return style({
        ...basicLayout(),
        ...basicVariants(),
    });
};
