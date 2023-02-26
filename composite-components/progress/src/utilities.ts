// internals:
import type {
    // react components:
    ProgressBarProps,
}                           from './ProgressBar.js'



// utilities:
export const calculateValues = <TElement extends Element = HTMLElement>(props: ProgressBarProps<TElement>) => {
    // fn props:
    const valueFn    : number  = props.value ?? 0;
    const minFn      : number  = props.min   ?? 0;
    const maxFn      : number  = props.max   ?? 100;
    const negativeFn : boolean = (maxFn < minFn);
    const valueRatio : number  = (valueFn - minFn) / (maxFn - minFn);
    
    
    
    return {
        valueFn,
        minFn,
        maxFn,
        negativeFn,
        valueRatio,
    };
};
