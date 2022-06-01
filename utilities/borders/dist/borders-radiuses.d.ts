import type { CssComplexValueOf, CssKnownValueOf } from '@cssfn/css-types';
export declare type BorderRadius = CssComplexValueOf<CssKnownValueOf<'borderRadius'>>;
declare const radiuses: import("@cssfn/css-config").Refs<{
    default: BorderRadius;
    none: BorderRadius;
    sm: BorderRadius;
    md: BorderRadius;
    lg: BorderRadius;
    xl: BorderRadius;
    xxl: BorderRadius;
    pill: BorderRadius;
    circle: BorderRadius;
}>, radiusValues: import("@cssfn/css-config").Vals<{
    default: BorderRadius;
    none: BorderRadius;
    sm: BorderRadius;
    md: BorderRadius;
    lg: BorderRadius;
    xl: BorderRadius;
    xxl: BorderRadius;
    pill: BorderRadius;
    circle: BorderRadius;
}>, cssBorderRadiusConfig: import("@cssfn/css-config").LiveCssConfigOptions;
export { radiuses, radiuses as cssProps, radiuses as default, };
export { radiusValues, radiusValues as cssVals, };
export { cssBorderRadiusConfig, cssBorderRadiusConfig as cssConfig, };
