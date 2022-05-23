import type {
    JSDOM as _JSDOM,
} from 'jsdom'
import type {
    colors      as _colors,
    themes      as _themes,
    colorValues as _colorValues,
} from '../dist/colors.js'
// import type {
//     // style sheets:
//     StyleSheet,
// } from '@cssfn/cssfn'
import type {
    render      as _render,
} from '@cssfn/cssfn/dist/renders.js'
import type {
    styleSheetRegistry as _styleSheetRegistry,
} from '@cssfn/cssfn/dist/styleSheets.js'
import type Color from 'color'
import {
    jest,
} from '@jest/globals'



// utilities:
const isColorInstance = (obj: any): obj is Color => (
    !!obj
    &&
    (typeof(obj) === 'object')
    &&
    (typeof((obj as any).alpha) === 'function')
    &&
    (typeof((obj as any).hex) === 'function')
);



const simulateBrowserSide = (dom: _JSDOM) => {
    jest.resetModules();
    
    const oriWindow   = (typeof(window) === 'undefined'  ) ? undefined : window;
    const oriDocument = (typeof(document) === 'undefined') ? undefined : document;
    if (oriWindow === undefined) {
        const mockWindow : Window = dom.window as any;
        (globalThis as any).window = mockWindow;
    } // if
    if (oriDocument === undefined) {
        const mockDocument : Document = dom.window.document;
        (globalThis as any).document = mockDocument;
    } // if
};



const yieldTime = () => new Promise<void>((resolved) => setTimeout(() => {
    resolved();
}, 0));



jest.isolateModules(() => {
    let JSDOM              : typeof _JSDOM       = undefined as any;
    let dom                : _JSDOM              = undefined as any;
    let colors             : typeof _colors      = undefined as any;
    let themes             : typeof _themes      = undefined as any;
    let colorValues        : typeof _colorValues = undefined as any;
    let styleSheetRegistry : typeof _styleSheetRegistry = undefined as any;
    // let render             : typeof _render      = undefined as any;
    // let lastStyleSheet     : StyleSheet|null     = null;
    beforeAll(async () => {
        const jsdomModule    = await import('jsdom')
        
        JSDOM = jsdomModule.JSDOM
        dom = new JSDOM(
`
<!DOCTYPE html>
<html>
    <head></head>
    <body>
    </body>
</html>
`
        );
        simulateBrowserSide(dom);
        
        const colorsModule = await import('../dist/colors.js')
        const styleSheetModule = await import('@cssfn/cssfn/dist/styleSheets.js')
        
        colors             = colorsModule.colors
        themes             = colorsModule.themes
        colorValues        = colorsModule.colorValues
        styleSheetRegistry = styleSheetModule.styleSheetRegistry
        
        
        
        styleSheetRegistry.subscribe((newSheet) => {
            // lastStyleSheet = newSheet;
        });
    });
    
    
    
    test('test enumerating colors', async () => {
        await yieldTime();
        
        // get all possible keys:
        const allColors = Object.keys(colors);
        expect(allColors.length).toBeGreaterThanOrEqual(1);
        
        // test in operator:
        allColors.forEach((colorName) => {
            expect(colorName in colors).toBe(true);
        });
        
        // test non existing string prop:
        expect((colors as any)['booFoo']).toBe(undefined);
        expect('booFoo' in colors).toBe(false);
        
        // test non existing number prop:
        expect((colors as any)[123]).toBe(undefined);
        expect(123 in colors).toBe(false);
        
        // test non existing symbol prop:
        const symProp = Symbol();
        expect((colors as any)[symProp]).toBe(undefined);
        expect(symProp in colors).toBe(false);
        
        // test the keys should be the same as before:
        expect(Object.keys(colors)).toEqual(allColors);
        
        // test values:
        allColors.forEach((colorName) => {
            const colorValue = (colors as any)[colorName] as string;
            expect(colorValue).toBe(`var(--col-${colorName})`);
        });
        
        // the keys should includes basic colors:
        const basicColors: string[] = [
            'blue',
            'indigo',
            'purple',
            'pink',
            'red',
            'orange',
            'yellow',
            'green',
            'teal',
            'cyan',
            
            'black',
            'white',
            'gray',
            'grayDark',
        ];
        basicColors.forEach((colorName) => {
            expect(allColors.includes(colorName)).toBe(true);
        });
        
        // the keys should includes theme colors:
        const themeColors: string[] = [
            'primary',
            'secondary',
            'success',
            'info',
            'warning',
            'danger',
            'light',
            'dark',
        ];
        themeColors.forEach((colorName) => {
            expect(allColors.includes(colorName)).toBe(true);
        });
        
        // the keys should includes page colors:
        const pageColors: string[] = [
            'backg',
            'foreg',
            
            'backgThin',
            'backgMild',
            'backgBold',
            
            'foregThin',
            'foregMild',
            'foregBold',
        ];
        pageColors.forEach((colorName) => {
            expect(allColors.includes(colorName)).toBe(true);
        });
        
        // the keys should includes theme colors with suffixed Text|Thin|Mild|Bold:
        const suffixes: string[] = [
            'Text',
            'Thin',
            'Mild',
            'Bold',
        ];
        themeColors.forEach((colorName) => {
            suffixes.forEach((suffix) => {
                expect(allColors.includes(colorName + suffix)).toBe(true);
            });
        });
    });
    
    
    
    test('test enumerating themes', async () => {
        await yieldTime();
        
        // get all possible keys:
        const allThemeColors = Object.keys(themes);
        expect(allThemeColors.length).toBeGreaterThanOrEqual(1);
        
        // test in operator:
        allThemeColors.forEach((colorName) => {
            expect(colorName in themes).toBe(true);
        });
        
        // test equal to colors:
        allThemeColors.forEach((colorName) => {
            expect((themes as any)[colorName]).toBe((colors as any)[colorName]);
        });
        
        // test non existing string prop:
        expect((themes as any)['booFoo']).toBe(undefined);
        expect('booFoo' in themes).toBe(false);
        
        // test non existing number prop:
        expect((themes as any)[123]).toBe(undefined);
        expect(123 in themes).toBe(false);
        
        // test non existing symbol prop:
        const symProp = Symbol();
        expect((themes as any)[symProp]).toBe(undefined);
        expect(symProp in themes).toBe(false);
        
        // test the keys should be the same as before:
        expect(Object.keys(themes)).toEqual(allThemeColors);
        
        // test values:
        allThemeColors.forEach((colorName) => {
            const colorValue = (themes as any)[colorName] as string;
            expect(colorValue).toBe(`var(--col-${colorName})`);
        });
        
        // the keys should not includes basic colors:
        const basicColors: string[] = [
            'blue',
            'indigo',
            'purple',
            'pink',
            'red',
            'orange',
            'yellow',
            'green',
            'teal',
            'cyan',
            
            'black',
            'white',
            'gray',
            'grayDark',
        ];
        basicColors.forEach((colorName) => {
            expect(allThemeColors.includes(colorName)).toBe(false);
        });
        
        // the keys should includes theme colors:
        const themeColors: string[] = [
            'primary',
            'secondary',
            'success',
            'info',
            'warning',
            'danger',
            'light',
            'dark',
        ];
        themeColors.forEach((colorName) => {
            expect(allThemeColors.includes(colorName)).toBe(true);
        });
        
        // the keys should not includes page colors:
        const pageColors: string[] = [
            'backg',
            'foreg',
            
            'backgThin',
            'backgMild',
            'backgBold',
            
            'foregThin',
            'foregMild',
            'foregBold',
        ];
        pageColors.forEach((colorName) => {
            expect(allThemeColors.includes(colorName)).toBe(false);
        });
        
        // the keys should not includes theme colors with suffixed Text|Thin|Mild|Bold:
        const suffixes: string[] = [
            'Text',
            'Thin',
            'Mild',
            'Bold',
        ];
        themeColors.forEach((colorName) => {
            suffixes.forEach((suffix) => {
                expect(allThemeColors.includes(colorName + suffix)).toBe(false);
            });
        });
    });
    
    
    
    test('test enumerating colorValues', async () => {
        await yieldTime();
        
        // get all possible keys:
        const allColors = Object.keys(colorValues);
        expect(allColors.length).toBeGreaterThanOrEqual(1);
        
        // test in operator:
        allColors.forEach((colorName) => {
            expect(colorName in colorValues).toBe(true);
        });
        
        // test non existing string prop:
        expect((colorValues as any)['booFoo']).toBe(undefined);
        expect('booFoo' in colorValues).toBe(false);
        
        // test non existing number prop:
        expect((colorValues as any)[123]).toBe(undefined);
        expect(123 in colorValues).toBe(false);
        
        // test non existing symbol prop:
        const symProp = Symbol();
        expect((colorValues as any)[symProp]).toBe(undefined);
        expect(symProp in colorValues).toBe(false);
        
        // test the keys should be the same as before:
        expect(Object.keys(colorValues)).toEqual(allColors);
        
        // test values:
        allColors.forEach((colorName) => {
            const colorValue = (colorValues as any)[colorName] as any;
            expect(isColorInstance(colorValue) || ((typeof(colorValue) === 'string') && colorValue.startsWith('var(--'))).toBe(true);
        });
        
        // the keys should includes basic colors:
        const basicColors: string[] = [
            'blue',
            'indigo',
            'purple',
            'pink',
            'red',
            'orange',
            'yellow',
            'green',
            'teal',
            'cyan',
            
            'black',
            'white',
            'gray',
            'grayDark',
        ];
        basicColors.forEach((colorName) => {
            expect(allColors.includes(colorName)).toBe(true);
        });
        
        // the keys should includes theme colors:
        const themeColors: string[] = [
            'primary',
            'secondary',
            'success',
            'info',
            'warning',
            'danger',
            'light',
            'dark',
        ];
        themeColors.forEach((colorName) => {
            expect(allColors.includes(colorName)).toBe(true);
        });
        
        // the keys should includes page colors:
        const pageColors: string[] = [
            'backg',
            'foreg',
            
            'backgThin',
            'backgMild',
            'backgBold',
            
            'foregThin',
            'foregMild',
            'foregBold',
        ];
        pageColors.forEach((colorName) => {
            expect(allColors.includes(colorName)).toBe(true);
        });
        
        // the keys should includes theme colors with suffixed Text|Thin|Mild|Bold:
        const suffixes: string[] = [
            'Text',
            'Thin',
            'Mild',
            'Bold',
        ];
        themeColors.forEach((colorName) => {
            suffixes.forEach((suffix) => {
                expect(allColors.includes(colorName + suffix)).toBe(true);
            });
        });
    });
    
    
    
    test('test delete', async () => {
        await yieldTime();
        
        
        
        // by delete operator:
        
        // @ts-ignore
        delete colors.orange;
        // @ts-ignore
        delete themes.warning;
        // @ts-ignore
        delete colorValues.teal;
        
        await yieldTime();
        
        expect(colors.orange).toBe(undefined);
        expect(colorValues.orange).toBe(undefined);
        expect('orange' in colors).toBe(false);
        expect('orange' in colorValues).toBe(false);
        expect(Object.keys(colors).includes('orange')).toBe(false);
        expect(Object.keys(colorValues).includes('orange')).toBe(false);
        
        expect(colors.warning).toBe(undefined);
        expect(colorValues.warning).toBe(undefined);
        expect(colorValues.warning).toBe(undefined);
        expect('warning' in colors).toBe(false);
        expect('warning' in colorValues).toBe(false);
        expect('warning' in colorValues).toBe(false);
        expect(Object.keys(colors).includes('warning')).toBe(false);
        expect(Object.keys(colorValues).includes('warning')).toBe(false);
        expect(Object.keys(colorValues).includes('warning')).toBe(false);
        
        expect(colors.teal).toBe(undefined);
        expect(colorValues.teal).toBe(undefined);
        expect('teal' in colors).toBe(false);
        expect('teal' in colorValues).toBe(false);
        expect(Object.keys(colors).includes('teal')).toBe(false);
        expect(Object.keys(colorValues).includes('teal')).toBe(false);
        
        // delete non existing keys:
        const prevKeys = Object.keys(colors);
        const prevThemeKeys = Object.keys(themes);
        delete (colors as any).whateverBooFoo;
        delete (themes as any).whateverBooFoo;
        delete (colorValues as any).whateverBooFoo;
        expect(Object.keys(colors)).toEqual(prevKeys);
        expect(Object.keys(themes)).toEqual(prevThemeKeys);
        expect(Object.keys(colorValues)).toEqual(prevKeys);
        
        // delete existing keys but not in themes:
        delete (themes as any).black;
        delete (themes as any).gray;
        expect(Object.keys(colors)).toEqual(prevKeys);
        expect(Object.keys(themes)).toEqual(prevThemeKeys);
        expect(Object.keys(colorValues)).toEqual(prevKeys);
        
        
        
        // by assigning undefined:
        
        // @ts-ignore
        colors.purple = undefined;
        // @ts-ignore
        themes.info = undefined;
        // @ts-ignore
        colorValues.indigo = undefined;
        
        await yieldTime();
        
        expect(colors.purple).toBe(undefined);
        expect(colorValues.purple).toBe(undefined);
        expect('purple' in colors).toBe(false);
        expect('purple' in colorValues).toBe(false);
        expect(Object.keys(colors).includes('purple')).toBe(false);
        expect(Object.keys(colorValues).includes('purple')).toBe(false);
        
        expect(colors.info).toBe(undefined);
        expect(colorValues.info).toBe(undefined);
        expect(colorValues.info).toBe(undefined);
        expect('info' in colors).toBe(false);
        expect('info' in colorValues).toBe(false);
        expect('info' in colorValues).toBe(false);
        expect(Object.keys(colors).includes('info')).toBe(false);
        expect(Object.keys(colorValues).includes('info')).toBe(false);
        expect(Object.keys(colorValues).includes('info')).toBe(false);
        
        expect(colors.indigo).toBe(undefined);
        expect(colorValues.indigo).toBe(undefined);
        expect('indigo' in colors).toBe(false);
        expect('indigo' in colorValues).toBe(false);
        expect(Object.keys(colors).includes('indigo')).toBe(false);
        expect(Object.keys(colorValues).includes('indigo')).toBe(false);
        
        // assigning undefined to non existing keys:
        const prevKeys2 = Object.keys(colors);
        const prevThemeKeys2 = Object.keys(themes);
        (colors as any).whateverBooFoo = undefined;
        (themes as any).whateverBooFoo = undefined;
        (colorValues as any).whateverBooFoo = undefined;
        expect(Object.keys(colors)).toEqual(prevKeys2);
        expect(Object.keys(themes)).toEqual(prevThemeKeys2);
        expect(Object.keys(colorValues)).toEqual(prevKeys2);
        
        // assigning undefined to existing keys but not in themes:
        (themes as any).black = undefined;
        (themes as any).gray = undefined;
        expect(Object.keys(colors)).toEqual(prevKeys2);
        expect(Object.keys(themes)).toEqual(prevThemeKeys2);
        expect(Object.keys(colorValues)).toEqual(prevKeys2);
    });
});