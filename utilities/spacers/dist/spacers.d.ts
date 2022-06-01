import type { CssComplexValueOf, CssKnownValueOf } from '@cssfn/css-types';
export declare type CssLength = CssComplexValueOf<CssKnownValueOf<'gap'>>;
declare const spacers: import("@cssfn/css-config").Refs<{
    xxs: CssLength;
    xs: CssLength;
    sm: CssLength;
    lg: CssLength;
    xl: CssLength;
    default: CssLength;
    none: CssLength;
    md: CssLength;
}>, spacerValues: import("@cssfn/css-config").Vals<{
    xxs: CssLength;
    xs: CssLength;
    sm: CssLength;
    lg: CssLength;
    xl: CssLength;
    default: CssLength;
    none: CssLength;
    md: CssLength;
}>, cssSpacerConfig: import("@cssfn/css-config").LiveCssConfigOptions;
export { spacers, spacers as cssProps, spacers as default, };
export { spacerValues, spacerValues as cssVals, };
export { cssSpacerConfig, cssSpacerConfig as cssConfig, };
