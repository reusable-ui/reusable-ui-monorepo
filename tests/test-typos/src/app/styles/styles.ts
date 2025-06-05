import { style } from '@cssfn/core'



const basicLayout = () => style({
    display: 'grid',
});

export default function main() {
    return style({
        ...basicLayout(),
    });
};
