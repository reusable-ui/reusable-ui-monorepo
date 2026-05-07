import { themes } from '@/libs/themes'
import { rule, style, variants, vars } from '@cssfn/core'
import { colorConfigVars, colorConfigExpressions, colorParamConfigVars, colorParamConfigExpressions, defineTheme, deleteTheme } from '@reusable-ui/color-config'



if (typeof window !== 'undefined') {
    Object.assign(window, {colorConfigVars, colorConfigExpressions, defineTheme, deleteTheme});
    Object.assign(window, {colorParamConfigVars, colorParamConfigExpressions});
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
                '--bg-base': colorConfigVars[`${themeName}Base`],
                '--bg-mild': colorConfigVars[`${themeName}Mild`],
                '--bg-edge': 'transparent',
                
                // Foreground:
                '--fg-base': colorConfigVars[`${themeName}Flip`],
                '--fg-mild': colorConfigVars[`${themeName}Text`],
                '--fg-edge': colorConfigVars[`${themeName}Face`],
                
                // Border:
                '--bd-base': colorConfigVars[`${themeName}Bold`],
                '--bd-mild': colorConfigVars[`${themeName}Thin`],
                '--bd-edge': colorConfigVars[`${themeName}Edge`],
                
                // Ring:
                '--rg-base': colorConfigVars[`${themeName}Soft`],
                '--rg-mild': colorConfigVars[`${themeName}Soft`],
                '--rg-edge': colorConfigVars[`${themeName}Soft`],
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
