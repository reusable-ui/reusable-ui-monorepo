import type { Optional } from '@cssfn/types';
import type { CssCustomSimpleRef, CssCustomRef, CssKnownValueOf } from '@cssfn/css-types';
import Color from 'color';
export declare type CssColor = CssKnownValueOf<'color'>;
declare class LiveConfig {
    #private;
    constructor(thinLevel: number, mildLevel: number, boldLevel: number, updatedCallback: () => void);
    get thinLevel(): number;
    set thinLevel(newValue: number);
    get mildLevel(): number;
    set mildLevel(newValue: number);
    get boldLevel(): number;
    set boldLevel(newValue: number);
}
export type { LiveConfig };
export declare const config: LiveConfig;
declare const themes: {
    primary: Color<"#0d6efd">;
    secondary: Color<"#6c757d">;
    success: Color<"#198754">;
    info: Color<"#0dcaf0">;
    warning: Color<"#ffc107">;
    danger: Color<"#dc3545">;
    light: Color<"#f8f9fa">;
    dark: Color<"#212529">;
};
declare const colorList: {
    primaryBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    secondaryBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    successBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    infoBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    warningBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    dangerBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    lightBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    darkBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    primaryMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    secondaryMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    successMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    infoMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    warningMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    dangerMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    lightMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    darkMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    primaryThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    secondaryThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    successThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    infoThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    warningThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    dangerThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    lightThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    darkThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    primaryText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    secondaryText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    successText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    infoText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    warningText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    dangerText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    lightText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    darkText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    backgThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    backgBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    foregThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    foregMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    foreg: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    backg: Color<"#ffffff">;
    primary: Color<"#0d6efd">;
    secondary: Color<"#6c757d">;
    success: Color<"#198754">;
    info: Color<"#0dcaf0">;
    warning: Color<"#ffc107">;
    danger: Color<"#dc3545">;
    light: Color<"#f8f9fa">;
    dark: Color<"#212529">;
    blue: Color<"#0d6efd">;
    indigo: Color<"#6610f2">;
    purple: Color<"#6f42c1">;
    pink: Color<"#d63384">;
    red: Color<"#dc3545">;
    orange: Color<"#fd7e14">;
    yellow: Color<"#ffc107">;
    green: Color<"#198754">;
    teal: Color<"#20c997">;
    cyan: Color<"#0dcaf0">;
    black: Color<"#000000">;
    white: Color<"#ffffff">;
    gray: Color<"#6c757d">;
    grayDark: Color<"#343a40">;
};
export declare type ColorList = typeof colorList;
export declare type CssColorConfigProps = {
    [ColorName in keyof ColorList]: CssColor;
};
declare const cssColorConfig: import("@cssfn/css-config").LiveCssConfigOptions;
export { cssColorConfig, cssColorConfig as cssConfig, };
export declare type ColorRefs<TColorList extends Partial<ColorList>> = {
    [Key in keyof TColorList]: CssCustomSimpleRef;
};
declare const colorsProxy: ColorRefs<{
    primaryBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    secondaryBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    successBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    infoBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    warningBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    dangerBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    lightBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    darkBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    primaryMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    secondaryMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    successMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    infoMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    warningMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    dangerMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    lightMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    darkMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    primaryThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    secondaryThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    successThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    infoThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    warningThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    dangerThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    lightThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    darkThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    primaryText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    secondaryText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    successText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    infoText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    warningText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    dangerText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    lightText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    darkText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    backgThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    backgBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    foregThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    foregMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    foreg: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    backg: Color<"#ffffff">;
    primary: Color<"#0d6efd">;
    secondary: Color<"#6c757d">;
    success: Color<"#198754">;
    info: Color<"#0dcaf0">;
    warning: Color<"#ffc107">;
    danger: Color<"#dc3545">;
    light: Color<"#f8f9fa">;
    dark: Color<"#212529">;
    blue: Color<"#0d6efd">;
    indigo: Color<"#6610f2">;
    purple: Color<"#6f42c1">;
    pink: Color<"#d63384">;
    red: Color<"#dc3545">;
    orange: Color<"#fd7e14">;
    yellow: Color<"#ffc107">;
    green: Color<"#198754">;
    teal: Color<"#20c997">;
    cyan: Color<"#0dcaf0">;
    black: Color<"#000000">;
    white: Color<"#ffffff">;
    gray: Color<"#6c757d">;
    grayDark: Color<"#343a40">;
}>;
export { colorsProxy as colors, colorsProxy as cssProps, colorsProxy as default, };
export declare type ColorVals<TColorList extends Partial<ColorList>> = {
    [Key in keyof TColorList]: Color;
};
declare const colorValuesProxy: ColorVals<{
    primaryBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    secondaryBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    successBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    infoBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    warningBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    dangerBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    lightBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    darkBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    primaryMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    secondaryMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    successMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    infoMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    warningMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    dangerMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    lightMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    darkMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    primaryThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    secondaryThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    successThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    infoThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    warningThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    dangerThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    lightThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    darkThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    primaryText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    secondaryText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    successText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    infoText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    warningText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    dangerText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    lightText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    darkText: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    backgThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    backgBold: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    foregThin: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    foregMild: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    foreg: Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | Color<string | number | any | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }> | ArrayLike<number> | {
        [key: string]: any;
    }>;
    backg: Color<"#ffffff">;
    primary: Color<"#0d6efd">;
    secondary: Color<"#6c757d">;
    success: Color<"#198754">;
    info: Color<"#0dcaf0">;
    warning: Color<"#ffc107">;
    danger: Color<"#dc3545">;
    light: Color<"#f8f9fa">;
    dark: Color<"#212529">;
    blue: Color<"#0d6efd">;
    indigo: Color<"#6610f2">;
    purple: Color<"#6f42c1">;
    pink: Color<"#d63384">;
    red: Color<"#dc3545">;
    orange: Color<"#fd7e14">;
    yellow: Color<"#ffc107">;
    green: Color<"#198754">;
    teal: Color<"#20c997">;
    cyan: Color<"#0dcaf0">;
    black: Color<"#000000">;
    white: Color<"#ffffff">;
    gray: Color<"#6c757d">;
    grayDark: Color<"#343a40">;
}>;
export { colorValuesProxy as colorValues, colorValuesProxy as cssVals, };
export declare type ThemeColorList = typeof themes;
declare const themesProxy: ColorRefs<{
    primary: Color<"#0d6efd">;
    secondary: Color<"#6c757d">;
    success: Color<"#198754">;
    info: Color<"#0dcaf0">;
    warning: Color<"#ffc107">;
    danger: Color<"#dc3545">;
    light: Color<"#f8f9fa">;
    dark: Color<"#212529">;
}>;
export { themesProxy as themes, };
export declare const defineBackg: (color: Color | CssCustomRef | (string & {}), autoDefineForeg?: boolean) => void;
export declare const defineForeg: (color: Color | CssCustomRef | (string & {})) => void;
export declare const defineTheme: (name: string, color: Optional<Color | CssCustomRef | (string & {})>) => void;
