// cssfn:
import type {
    Optional,
}                           from '@cssfn/types'         // cssfn general types
import type {
    // css custom properties:
    CssCustomSimpleRef,
    CssCustomRef,
    
    
    
    // css known (standard) properties:
    CssKnownValueOf,
}                           from '@cssfn/css-types'     // cssfn css specific types
import {
    // types:
    CssConfigProps,
    
    
    
    createCssConfig,
}                           from '@cssfn/css-config'    // reads/writes css variables configuration

// other libs:
import Color                from 'color'                // color utilities



// types:
export type CssColor = CssKnownValueOf<'color'>



//#region color functions
/*
    may be removed if *css 4* `color()` -or- `color-mod()` already exists
*/



class LiveConfig {
    //#region private properties
    #thinLevel : number
    #mildLevel : number
    #boldLevel : number
    
    readonly #updatedCallback : () => void
    //#endregion private properties
    
    
    
    //#region constructors
    constructor(thinLevel: number, mildLevel: number, boldLevel: number, updatedCallback: () => void) {
        this.#thinLevel       = thinLevel;
        this.#mildLevel       = mildLevel;
        this.#boldLevel       = boldLevel;
        
        this.#updatedCallback = updatedCallback;
    }
    //#endregion constructors
    
    
    
    //#region public properties
    get thinLevel() { return this.#thinLevel }
    set thinLevel(newValue: number) {
        if (!this.#isValidRange(newValue)) return; // not in range or not a number => ignore
        
        if (this.#thinLevel === newValue) return; // no change => no need to update
        
        this.#thinLevel = newValue; // update
        this.#update();
    }
    
    get mildLevel() { return this.#mildLevel }
    set mildLevel(newValue: number) {
        if (!this.#isValidRange(newValue)) return; // not in range or not a number => ignore
        
        if (this.#mildLevel === newValue) return; // no change => no need to update
        
        this.#mildLevel = newValue; // update
        this.#update();
    }
    
    get boldLevel() { return this.#boldLevel }
    set boldLevel(newValue: number) {
        if (!this.#isValidRange(newValue)) return; // not in range or not a number => ignore
        
        if (this.#boldLevel === newValue) return; // no change => no need to update
        
        this.#boldLevel = newValue; // update
        this.#update();
    }
    //#endregion public properties
    
    
    
    //#region private methods
    #isValidRange(value: number): boolean {
        return (value >= 0) && (value <= 1);
    }
    #update(): void {
        this.#updatedCallback();
    }
    //#endregion private methods
}
export type { LiveConfig }
export const config = new LiveConfig(
    /*thinLevel:*/ 0.5,
    /*mildLevel:*/ 0.8,
    /*boldLevel:*/ 0.8,
    /*updatedCallback:*/ () => {
        defineBackg(colorsProxy.backg);
        defineForeg(colorsProxy.foreg);
        defineAllThemes();
    }
);



const textColorInit = (color: Color): Color => (color.isLight() ? themes.dark : themes.light)
const textColor     = (color: Color): Color => (color.isLight() ? colorValuesProxy.dark : colorValuesProxy.light) ?? color

const thinColor     = (color: Color): Color => color.alpha(config.thinLevel)

const mildColorInit = (color: Color): Color => color.mix(pageBg.backg, config.mildLevel)
const boldColorInit = (color: Color): Color => color.mix(pageFg.foreg, config.boldLevel)
const mildColor     = (color: Color): Color => color.mix(colorValuesProxy.backg ?? color, config.mildLevel)
const boldColor     = (color: Color): Color => color.mix(colorValuesProxy.foreg ?? color, config.boldLevel)
//#endregion color functions



//#region define colors by group
const basics = {
    blue     : Color('#0d6efd'),
    indigo   : Color('#6610f2'),
    purple   : Color('#6f42c1'),
    pink     : Color('#d63384'),
    red      : Color('#dc3545'),
    orange   : Color('#fd7e14'),
    yellow   : Color('#ffc107'),
    green    : Color('#198754'),
    teal     : Color('#20c997'),
    cyan     : Color('#0dcaf0'),
    
    black    : Color('#000000'),
    white    : Color('#ffffff'),
    gray     : Color('#6c757d'),
    grayDark : Color('#343a40'),
};

const themes = {
    primary   : basics.blue,
    secondary : basics.gray,
    success   : basics.green,
    info      : basics.cyan,
    warning   : basics.yellow,
    danger    : basics.red,
    light     : Color('#f8f9fa'),
    dark      : Color('#212529'),
};

const pageBg  = {
    backg     : basics.white,
};
const pageFg  = {
    foreg     : textColorInit(pageBg.backg),
};
const pageMix = {
    backgThin : thinColor(pageBg.backg),
    backgBold : boldColorInit(pageBg.backg),
    
    foregThin : thinColor(pageFg.foreg),
    foregMild : mildColorInit(pageFg.foreg),
};

const themesText = {
    primaryText   : textColorInit(themes.primary),
    secondaryText : textColorInit(themes.secondary),
    successText   : textColorInit(themes.success),
    infoText      : textColorInit(themes.info),
    warningText   : textColorInit(themes.warning),
    dangerText    : textColorInit(themes.danger),
    lightText     : textColorInit(themes.light),
    darkText      : textColorInit(themes.dark),
};

const themesThin = {
    primaryThin   : thinColor(themes.primary),
    secondaryThin : thinColor(themes.secondary),
    successThin   : thinColor(themes.success),
    infoThin      : thinColor(themes.info),
    warningThin   : thinColor(themes.warning),
    dangerThin    : thinColor(themes.danger),
    lightThin     : thinColor(themes.light),
    darkThin      : thinColor(themes.dark),
};

const themesMild = {
    primaryMild   : mildColorInit(themes.primary),
    secondaryMild : mildColorInit(themes.secondary),
    successMild   : mildColorInit(themes.success),
    infoMild      : mildColorInit(themes.info),
    warningMild   : mildColorInit(themes.warning),
    dangerMild    : mildColorInit(themes.danger),
    lightMild     : mildColorInit(themes.light),
    darkMild      : mildColorInit(themes.dark),
};

const themesBold = {
    primaryBold   : boldColorInit(themes.primary),
    secondaryBold : boldColorInit(themes.secondary),
    successBold   : boldColorInit(themes.success),
    infoBold      : boldColorInit(themes.info),
    warningBold   : boldColorInit(themes.warning),
    dangerBold    : boldColorInit(themes.danger),
    lightBold     : boldColorInit(themes.light),
    darkBold      : boldColorInit(themes.dark),
};

const colorList  = {
    ...basics,
    ...themes,
    ...pageBg,
    ...pageFg,
    ...pageMix,
    ...themesText,
    ...themesThin,
    ...themesMild,
    ...themesBold,
};
export type ColorList  = typeof colorList;
//#endregion define colors by group



//#region utilities
const isColorInstance = (obj: any): obj is Color => (
    !!obj
    &&
    (typeof(obj) === 'object')
    &&
    (typeof((obj as any).alpha) === 'function')
    &&
    (typeof((obj as any).hex) === 'function')
);
const stringColor     = (color: Color) => {
    if (color.alpha() === 1) { // solid color
        return color.hex().toLowerCase();
    }
    else { // semi transparent color
        return color.toString().toLowerCase();
    } // if
};
const isRef           = (value: string): value is CssCustomRef => value.startsWith('var(--');
const resolveColor    = (color: Color|CssCustomRef): Color|null => {
    if (isColorInstance(color)) return color;
    let colorRef = color;
    
    
    
    const colorPrefix = cssColorConfig.prefix ? `var(--${cssColorConfig.prefix}-` : `var(--`;
    
    
    for (let attempts = 10; attempts > 0; attempts--) {
        if (!colorRef.startsWith(colorPrefix)) return null;       // can't resolve color outside color config
        const colorProp = colorRef.slice(colorPrefix.length, -1); // remove `var(--col-` & `)`
        
        const result = colorValues[colorProp as keyof ColorList];
        if (typeof(result) !== 'string') return null; // can't resolve non-string value
        if (!isRef(result)) return Color(result);
        
        colorRef = result;
    } // for
    
    
    
    return null; // can't resolve deeply
};
//#endregion utilities



//#region proxy handlers
const reservedColors : string[] = ['dark', 'light', 'backg',  'foreg'];

/**
 * Always get a safe `CssColor` representation instead of a `Color` object.
 */
const getCssColor   = (_object: object, colorName: keyof ColorList): CssColor|undefined => {
    const color = colorList[colorName];
    if (color === undefined) return undefined; // unknown color name => return `undefined`
    
    
    
    return stringColor(color);
};
/**
 * Always get a nice `Color` representation instead of a bare `string`.
 */
const getColorValue = (_object: object, colorName: keyof ColorList): Color|undefined => {
    const value = colorValues[colorName];
    
    
    
    // handle undefined or null:
    if (value === undefined) return undefined; // unknown color name => return `undefined`
    
    
    
    // handle validColorName or var(--ref):
    if (typeof(value) === 'string') {
        // handle var(--ref):
        if (isRef(value)) return resolveColor(value) ?? undefined;
        
        
        
        // handle validColorName:
        return Color(value);
    } // if
    
    
    
    // unknown expression => error:
    throw TypeError();
};
/**
 * Prevents assignment other than `Color|validColorName|var(--ref)|undefined|null`.
 */
const setColorValue = (_object: object, colorName: keyof ColorList, newValue: any): boolean => {
    // handle undefined or null:
    if ((newValue === undefined) || (newValue === null)) {
        if (reservedColors.includes(colorName)) {
            throw TypeError(`Cannot delete reserved color name: ${colorName}.`);
        } // if
        
        delete colorValues[colorName]; // delete the actual object
        return true;
    } // if
    
    
    
    // handle validColorName or var(--ref):
    if (typeof(newValue) === 'string') {
        // handle var(--ref):
        if (isRef(newValue)) {
            colorValues[colorName] = newValue; // update the actual object
            return true;
        } // if
        
        
        
        // handle validColorName:
        const color = Color(newValue);
        colorValues[colorName] = stringColor(color); // update the actual object
        return true;
    } // if
    
    
    
    // handle Color:
    if (isColorInstance(newValue)) {
        colorValues[colorName] = stringColor(newValue); // update the actual object
        return true;
    } // if
    
    
    
    // invalid color value => error:
    throw TypeError('The value must be a `Color|validColorName|var(--ref)|undefined|null`.');
};
/**
 * Prevents deleting reserved colors.
 */
const deleteColor   = (_object: object, colorName: keyof ColorList): boolean => {
    if (reservedColors.includes(colorName)) {
        throw TypeError(`Cannot delete reserved color name: ${colorName}.`);
    } // if
    
    delete colorValues[colorName]; // delete the actual object
    return true;
}
//#endregion proxy handlers



//#region configs
export type CssColorConfigProps = CssConfigProps & { [ColorName in keyof ColorList]: CssColor };
const [colors, colorValues, cssColorConfig] = createCssConfig<CssColorConfigProps>(() => {
    // a proxy for converting `Color` to `CssColor`:
    return new Proxy<CssColorConfigProps>(colorList as unknown as CssColorConfigProps, {
        get : getCssColor,
    });
}, { prefix: 'col' });
export { cssColorConfig }



export type ColorRefs<TColorList extends Partial<ColorList>> = { [Key in keyof TColorList]: CssCustomSimpleRef }
// a proxy for preventing assignment other than `Color|validColorName|var(--ref)|undefined|null`:
const colorsProxy = new Proxy<ColorRefs<ColorList>>(colors, {
    set            : setColorValue,
    deleteProperty : deleteColor,
});
export { 
    colorsProxy as colors,
    colorsProxy as cssProps,
    colorsProxy as default,
}



export type ColorVals<TColorList extends Partial<ColorList>> = { [Key in keyof TColorList]: Color }
// a proxy for converting `CssColor` to `Color`:
// a proxy for preventing assignment other than `Color|validColorName|var(--ref)|undefined|null`:
const colorValuesProxy = new Proxy<ColorVals<ColorList>>(colorValues as unknown as ColorVals<ColorList>, {
    get            : getColorValue,
    set            : setColorValue,
    deleteProperty : deleteColor,
});
export {
    colorValuesProxy as colorValues,
    colorValuesProxy as cssVals,
}



export type ThemeColorList  = typeof themes;

// a proxy for enumerating theme colors:
// a proxy for preventing assignment other than `Color|validColorName|var(--ref)|undefined|null`:
const themesProxy = new Proxy<ColorRefs<ThemeColorList>>(themes as unknown as ColorRefs<ThemeColorList>, {
    get                      : (_object: object, colorName: keyof ColorList): Color|CssCustomRef|undefined => {
        if (!(colorName in themes)) return undefined; // not in themes => return `undefined`
        
        return colorsProxy[colorName];
    },
    set                      : (_object: object, colorName: keyof ColorList, newValue: any): boolean => {
        const isDeleting = (newValue === undefined) || (newValue === null);
        if (isDeleting && (!(colorName in themes))) return true; // delete something not in themes => return `true` (always success for deleting non existing keys)
        
        const success = setColorValue(_object, colorName, newValue);
        
        if (success) {
            // update sub theme colors:
            defineTheme(colorName, newValue as any);
        } // if
        
        return success;
    },
    deleteProperty           : (_object: object, colorName: keyof ColorList): boolean => {
        if (!(colorName in themes)) return true; // delete something not in themes => return `true` (always success for deleting non existing keys)
        
        const success = deleteColor(_object, colorName);
        
        if (success) {
            // delete sub theme colors:
            defineTheme(colorName, undefined);
        } // if
        
        return success;
    },
    
    has                      : (_object: object, colorName: keyof ColorList): boolean => {
        return (colorName in themes);
    },
    ownKeys                  : (_object: object): ArrayLike<string|symbol> => {
        return Object.keys(themes);
    },
    getOwnPropertyDescriptor : (_object: object, colorName: keyof ColorList): PropertyDescriptor|undefined => {
        if (!(colorName in themes)) return undefined; // not in themes => return `undefined`
        
        return Object.getOwnPropertyDescriptor(colors, colorName);
    },
});
export {
    themesProxy as themes,
}
//#endregion configs



//#region utilities
export const defineBackg = (color: Color|CssCustomRef|(string & {}), autoDefineForeg = true) => {
    if (!color) throw Error('You cannot delete the background color.');
    if ((typeof(color) === 'string') && !isRef(color)) color = Color(color);
    if ((typeof(color) !== 'string') && !isColorInstance(color)) throw TypeError('The value must be a `string` or `Color`.');
    
    
    
    // update cssColorConfig:
    colorValuesProxy.backg = color as any;
    const colorValue = resolveColor(color);
    if (colorValue) {
        colorValuesProxy.backgThin = thinColor(colorValue);
        colorValuesProxy.backgBold = boldColor(colorValue);
        
        
        
        if (autoDefineForeg) defineForeg(textColor(colorValue));
    } // if
    
    
    
    defineAllThemes();
};
export const defineForeg = (color: Color|CssCustomRef|(string & {})) => {
    if (!color) throw Error('You cannot delete the foreground color.');
    if ((typeof(color) === 'string') && !isRef(color)) color = Color(color);
    if ((typeof(color) !== 'string') && !isColorInstance(color)) throw TypeError('The value must be a `string` or `Color`.');
    
    
    
    // update cssColorConfig:
    colorValuesProxy.foreg = color as any;
    const colorValue = resolveColor(color);
    if (colorValue) {
        colorValuesProxy.foregThin = thinColor(colorValue);
        colorValuesProxy.foregMild = mildColor(colorValue);
    } // if
    
    
    
    defineAllThemes();
};
const defineAllThemes = () => {
    for (const themeName in themes) {
        let baseColor = colorValuesProxy[themeName as keyof ColorList];
        if (!baseColor) continue; // unresolved color => skip
        
        defineTheme(themeName, baseColor);
    } // for
};
export const defineTheme = (name: string, color: Optional<Color|CssCustomRef|(string & {})>) => {
    if (!color) {
        // delete cssColorConfig:
        delete colorValuesProxy[   name       as keyof ColorList];
        delete colorValuesProxy[`${name}Text` as keyof ColorList];
        delete colorValuesProxy[`${name}Thin` as keyof ColorList];
        delete colorValuesProxy[`${name}Mild` as keyof ColorList];
        delete colorValuesProxy[`${name}Bold` as keyof ColorList];
        
        
        
        // delete from the `themes`:
        delete (themes as any)[name];
    }
    else {
        if ((typeof(color) === 'string') && !isRef(color)) color = Color(color);
        if ((typeof(color) !== 'string') && !isColorInstance(color)) throw TypeError('The value must be a `string` or `Color`.');
        
        
        
        // update cssColorConfig:
        colorValuesProxy[name as keyof ColorList] = color as any;
        
        const colorValue = resolveColor(color);
        if (colorValue) {
            colorValuesProxy[`${name}Text` as keyof ColorList] = textColor(colorValue);
            colorValuesProxy[`${name}Thin` as keyof ColorList] = thinColor(colorValue);
            colorValuesProxy[`${name}Mild` as keyof ColorList] = mildColor(colorValue);
            colorValuesProxy[`${name}Bold` as keyof ColorList] = boldColor(colorValue);
        } // if
        
        
        
        // update to the `themes`:
        (themes as any)[name] = ({} as any); // i know it's an invalid Color value, but the value will never be fetched, only fetch the key
    } // if
};
//#endregion utilities
