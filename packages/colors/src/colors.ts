// cssfn:
import type {
    Optional,
    DictionaryOf,
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



// general types:
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
        //
    }
);



const textColor    = (color: Color): Color        => (color.isLight() ? themes.dark : themes.light)
const textColorRef = (color: Color): CssCustomRef => (color.isLight() ? colors.dark : colors.light)
const thinColor    = (color: Color): Color        => color.alpha(config.thinLevel)
const mildColor    = (color: Color): Color        => color.mix(pageBg.backg, config.mildLevel)
const boldColor    = (color: Color): Color        => color.mix(pageFg.foreg, config.boldLevel)
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
    foreg     : textColor(pageBg.backg),
};
const pageMix = {
    backgThin : thinColor(pageBg.backg),
    backgMild : mildColor(pageBg.backg),
    backgBold : boldColor(pageBg.backg),
    
    foregThin : thinColor(pageFg.foreg),
    foregMild : mildColor(pageFg.foreg),
    foregBold : boldColor(pageFg.foreg),
};

const themesText = {
    primaryText   : textColor(themes.primary),
    secondaryText : textColor(themes.secondary),
    successText   : textColor(themes.success),
    infoText      : textColor(themes.info),
    warningText   : textColor(themes.warning),
    dangerText    : textColor(themes.danger),
    lightText     : textColor(themes.light),
    darkText      : textColor(themes.dark),
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
    primaryMild   : mildColor(themes.primary),
    secondaryMild : mildColor(themes.secondary),
    successMild   : mildColor(themes.success),
    infoMild      : mildColor(themes.info),
    warningMild   : mildColor(themes.warning),
    dangerMild    : mildColor(themes.danger),
    lightMild     : mildColor(themes.light),
    darkMild      : mildColor(themes.dark),
};

const themesBold = {
    primaryBold   : boldColor(themes.primary),
    secondaryBold : boldColor(themes.secondary),
    successBold   : boldColor(themes.success),
    infoBold      : boldColor(themes.info),
    warningBold   : boldColor(themes.warning),
    dangerBold    : boldColor(themes.danger),
    lightBold     : boldColor(themes.light),
    darkBold      : boldColor(themes.dark),
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



// utilities:
const stringColor = (color: Color) => {
    if (color.alpha() === 1) { // solid color
        return color.hex().toLocaleLowerCase();
    }
    else { // semi transparent color
        return color.toString().toLocaleLowerCase();
    } // if
};
const isRef       = (value: string): value is CssCustomRef => value.startsWith('var(--');



// proxy handlers:
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
const getColorValue = (_object: object, colorName: keyof ColorList): Color|CssCustomRef|undefined => {
    const value = cssVals[colorName];
    
    
    
    // handle undefined or null:
    if (value === undefined) return undefined; // unknown color name => return `undefined`
    
    
    
    // handle validColorName or var(--ref):
    if (typeof(value) === 'string') {
        // handle var(--ref):
        if (isRef(value)) return value;
        
        
        
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
        delete cssVals[colorName]; // delete the actual object
        return true;
    } // if
    
    
    
    // handle validColorName or var(--ref):
    if (typeof(newValue) === 'string') {
        // handle var(--ref):
        if (isRef(newValue)) {
            cssVals[colorName] = newValue; // update the actual object
            return true;
        } // if
        
        
        
        // handle validColorName:
        const color = Color(newValue);
        cssVals[colorName] = stringColor(color); // update the actual object
        return true;
    } // if
    
    
    
    // handle Color:
    if (newValue instanceof Color) {
        cssVals[colorName] = stringColor(newValue); // update the actual object
        return true;
    } // if
    
    
    
    // invalid color value => error:
    throw TypeError('The value must be a `Color|validColorName|var(--ref)|undefined|null`.');
};



export type CssColorConfigProps = CssConfigProps & { [ColorName in keyof ColorList]: CssColor };
const [colors, cssVals, cssConfig] = createCssConfig<CssColorConfigProps>(() => {
    // a proxy for converting `Color` to `CssColor`:
    return new Proxy<CssColorConfigProps>(colorList as unknown as CssColorConfigProps, {
        get : getCssColor,
    });
}, { prefix: 'col' });
export { cssConfig }



export type ColorRefs<TColorList extends Partial<ColorList>> = { [Key in keyof TColorList]: CssCustomSimpleRef }
// a proxy for preventing assignment other than `Color|validColorName|var(--ref)|undefined|null`:
const colorsProxy = new Proxy<ColorRefs<ColorList>>(colors, {
    set : setColorValue,
});
export { 
    colorsProxy as colors,
    colorsProxy as cssProps,
    colorsProxy as default,
}



export type ColorVals<TColorList extends Partial<ColorList>> = { [Key in keyof TColorList]: Color|CssCustomRef }
// a proxy for converting `CssColor` to `Color`:
// a proxy for preventing assignment other than `Color|validColorName|var(--ref)|undefined|null`:
const cssValsProxy = new Proxy<ColorVals<ColorList>>(cssVals as unknown as ColorVals<ColorList>, {
    get : getColorValue,
    set : setColorValue,
});
export { cssValsProxy as cssVals }



// a proxy for enumerating filtered color grop:
// a proxy for converting `CssColor` to `Color`:
// a proxy for preventing assignment other than `Color|validColorName|var(--ref)|undefined|null`:
const createFilterProxy = <TColorList extends Partial<ColorList>>(colorGroup: TColorList) => new Proxy<ColorRefs<TColorList>>(colorGroup as unknown as ColorRefs<TColorList>, {
    get                      : (_object: object, colorName: keyof ColorList): Color|CssCustomRef|undefined => {
        if (!(colorName in colorGroup)) return undefined; // not in colorGroup => return `undefined`
        
        return getColorValue(_object, colorName);
    },
    set                      : (_object: object, colorName: keyof ColorList, newValue: any): boolean => {
        const success = setColorValue(_object, colorName, newValue);
        
        if (success) {
            // update/delete from/to the `colorGroup`:
            const newColor = cssValsProxy[colorName];
            if (!newColor) {
                delete (colorGroup as any)[colorName];
            }
            else {
                (colorGroup as any)[colorName] = newColor;
            } // if
        } // if
        
        return success;
    },
    deleteProperty           : (_object: object, colorName: keyof ColorList): boolean => {
        const success = setColorValue(_object, colorName, undefined);
        
        if (success) {
            // delete from the `colorGroup`:
            delete (colorGroup as any)[colorName];
        } // if
        
        return success;
    },
    
    has                      : (_object: object, colorName: keyof ColorList): boolean => {
        return (colorName in colorGroup);
    },
    ownKeys                  : (_object: object): ArrayLike<string|symbol> => {
        return Object.keys(colorGroup);
    },
    getOwnPropertyDescriptor : (_object: object, colorName: keyof ColorList): PropertyDescriptor|undefined => {
        if (!(colorName in colorGroup)) return undefined; // not in colorGroup => return `undefined`
        
        return Object.getOwnPropertyDescriptor(colors, colorName);
    },
});

const themesProxy     = createFilterProxy(themes);
const themesTextProxy = createFilterProxy(themesText);

export {
    themesProxy     as themes,
    themesTextProxy as themesText,
}



// utilities:
export const defineBackg = (color: Color|string, autoDefineForeg = true) => {
    if (!color) throw Error('You cannot delete the background color.');
    if (typeof(color) === 'string') color = Color(color);
    if (!(color instanceof Color)) throw TypeError('The value must be a string or Color.');
    
    
    
    // define sub-colors:
    const backg     = color            as any;
    const backgThin = thinColor(color) as any;
    const backgMild = mildColor(color) as any;
    const backgBold = boldColor(color) as any;
    
    // update caches:
    pageBg.backg      = backg;
    pageMix.backgThin = backgThin;
    pageMix.backgMild = backgMild;
    pageMix.backgBold = backgBold;
    
    // update cssConfig:
    cssVals.backg     = backg;
    cssVals.backgThin = backgThin;
    cssVals.backgMild = backgMild;
    cssVals.backgBold = backgBold;
    
    
    
    if (autoDefineForeg) defineForeg(textColor(color));
};
export const defineForeg = (color: Color|string) => {
    if (!color) throw Error('You cannot delete the foreground color.');
    if (typeof(color) === 'string') color = Color(color);
    if (!(color instanceof Color)) throw TypeError('The value must be a string or Color.');
    
    
    
    // define sub-colors:
    const foreg     = color            as any;
    const foregThin = thinColor(color) as any;
    const foregMild = mildColor(color) as any;
    const foregBold = boldColor(color) as any;
    
    // update caches:
    pageFg.foreg      = foreg;
    pageMix.foregThin = foregThin;
    pageMix.foregMild = foregMild;
    pageMix.foregBold = foregBold;
    
    // update cssConfig:
    cssVals.foreg     = foreg;
    cssVals.foregThin = foregThin;
    cssVals.foregMild = foregMild;
    cssVals.foregBold = foregBold;
};
export const defineTheme = (name: string, color: Optional<Color|string>) => {
    if (!color) {
        // delete caches:
        delete (themes     as DictionaryOf<typeof themes>    )[   name      ];
        delete (themesText as DictionaryOf<typeof themesText>)[`${name}Text`];
        delete (themesThin as DictionaryOf<typeof themesThin>)[`${name}Thin`];
        delete (themesMild as DictionaryOf<typeof themesMild>)[`${name}Mild`];
        delete (themesBold as DictionaryOf<typeof themesBold>)[`${name}Bold`];
        
        // delete cssConfig:
        (cssVals as DictionaryOf<typeof cssVals>)[   name      ] = undefined as any;
        (cssVals as DictionaryOf<typeof cssVals>)[`${name}Text`] = undefined as any;
        (cssVals as DictionaryOf<typeof cssVals>)[`${name}Thin`] = undefined as any;
        (cssVals as DictionaryOf<typeof cssVals>)[`${name}Mild`] = undefined as any;
        (cssVals as DictionaryOf<typeof cssVals>)[`${name}Bold`] = undefined as any;
    }
    else {
        if (typeof(color) === 'string') color = Color(color);
        if (!(color instanceof Color)) throw TypeError('The value must be a string or Color.');
        
        
        
        // define sub-colors:
        const theme          = color               as any;
        const themeTextValue = textColor(color)    as any;
        const themeText      = textColorRef(color) as any;
        const themeThin      = thinColor(color)    as any;
        const themeMild      = mildColor(color)    as any;
        const themeBold      = boldColor(color)    as any;
        
        // update caches:
        (themes     as DictionaryOf<typeof themes>    )[   name      ] = theme;
        (themesText as DictionaryOf<typeof themesText>)[`${name}Text`] = themeTextValue;
        (themesThin as DictionaryOf<typeof themesThin>)[`${name}Thin`] = themeThin;
        (themesMild as DictionaryOf<typeof themesMild>)[`${name}Mild`] = themeMild;
        (themesBold as DictionaryOf<typeof themesBold>)[`${name}Bold`] = themeBold;
        
        // update cssConfig:
        (cssVals as DictionaryOf<typeof cssVals>)[   name      ]       = theme;
        (cssVals as DictionaryOf<typeof cssVals>)[`${name}Text`]       = themeText;
        (cssVals as DictionaryOf<typeof cssVals>)[`${name}Thin`]       = themeThin;
        (cssVals as DictionaryOf<typeof cssVals>)[`${name}Mild`]       = themeMild;
        (cssVals as DictionaryOf<typeof cssVals>)[`${name}Bold`]       = themeBold;
    } // if
};
