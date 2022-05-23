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
import Color from 'color'
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
        expect((themes as any).orange).toBe(undefined);
        expect(colorValues.orange).toBe(undefined);
        expect('orange' in colors).toBe(false);
        expect('orange' in themes).toBe(false);
        expect('orange' in colorValues).toBe(false);
        expect(Object.keys(colors).includes('orange')).toBe(false);
        expect(Object.keys(themes).includes('orange')).toBe(false);
        expect(Object.keys(colorValues).includes('orange')).toBe(false);
        
        expect(colors.warning).toBe(undefined);
        expect(themes.warning).toBe(undefined);
        expect(colorValues.warning).toBe(undefined);
        expect('warning' in colors).toBe(false);
        expect('warning' in themes).toBe(false);
        expect('warning' in colorValues).toBe(false);
        expect(Object.keys(colors).includes('warning')).toBe(false);
        expect(Object.keys(themes).includes('warning')).toBe(false);
        expect(Object.keys(colorValues).includes('warning')).toBe(false);
        
        expect(colors.teal).toBe(undefined);
        expect((themes as any).teal).toBe(undefined);
        expect(colorValues.teal).toBe(undefined);
        expect('teal' in colors).toBe(false);
        expect('teal' in themes).toBe(false);
        expect('teal' in colorValues).toBe(false);
        expect(Object.keys(colors).includes('teal')).toBe(false);
        expect(Object.keys(themes).includes('teal')).toBe(false);
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
        expect((themes as any).purple).toBe(undefined);
        expect(colorValues.purple).toBe(undefined);
        expect('purple' in colors).toBe(false);
        expect('purple' in themes).toBe(false);
        expect('purple' in colorValues).toBe(false);
        expect(Object.keys(colors).includes('purple')).toBe(false);
        expect(Object.keys(themes).includes('purple')).toBe(false);
        expect(Object.keys(colorValues).includes('purple')).toBe(false);
        
        expect(colors.info).toBe(undefined);
        expect(themes.info).toBe(undefined);
        expect(colorValues.info).toBe(undefined);
        expect('info' in colors).toBe(false);
        expect('info' in themes).toBe(false);
        expect('info' in colorValues).toBe(false);
        expect(Object.keys(colors).includes('info')).toBe(false);
        expect(Object.keys(themes).includes('info')).toBe(false);
        expect(Object.keys(colorValues).includes('info')).toBe(false);
        
        expect(colors.indigo).toBe(undefined);
        expect((themes as any).indigo).toBe(undefined);
        expect(colorValues.indigo).toBe(undefined);
        expect('indigo' in colors).toBe(false);
        expect('indigo' in themes).toBe(false);
        expect('indigo' in colorValues).toBe(false);
        expect(Object.keys(colors).includes('indigo')).toBe(false);
        expect(Object.keys(themes).includes('indigo')).toBe(false);
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
        
        
        
        // by assigning null:
        
        // @ts-ignore
        colors.yellow = null;
        // @ts-ignore
        themes.secondary = null;
        // @ts-ignore
        colorValues.pink = null;
        
        await yieldTime();
        
        expect(colors.yellow).toBe(undefined);
        expect((themes as any).yellow).toBe(undefined);
        expect(colorValues.yellow).toBe(undefined);
        expect('yellow' in colors).toBe(false);
        expect('yellow' in themes).toBe(false);
        expect('yellow' in colorValues).toBe(false);
        expect(Object.keys(colors).includes('yellow')).toBe(false);
        expect(Object.keys(themes).includes('yellow')).toBe(false);
        expect(Object.keys(colorValues).includes('yellow')).toBe(false);
        
        expect(colors.secondary).toBe(undefined);
        expect(themes.secondary).toBe(undefined);
        expect(colorValues.secondary).toBe(undefined);
        expect('secondary' in colors).toBe(false);
        expect('secondary' in themes).toBe(false);
        expect('secondary' in colorValues).toBe(false);
        expect(Object.keys(colors).includes('secondary')).toBe(false);
        expect(Object.keys(themes).includes('secondary')).toBe(false);
        expect(Object.keys(colorValues).includes('secondary')).toBe(false);
        
        expect(colors.pink).toBe(undefined);
        expect((themes as any).pink).toBe(undefined);
        expect(colorValues.pink).toBe(undefined);
        expect('pink' in colors).toBe(false);
        expect('pink' in themes).toBe(false);
        expect('pink' in colorValues).toBe(false);
        expect(Object.keys(colors).includes('pink')).toBe(false);
        expect(Object.keys(themes).includes('pink')).toBe(false);
        expect(Object.keys(colorValues).includes('pink')).toBe(false);
        
        // assigning null to non existing keys:
        const prevKeys3 = Object.keys(colors);
        const prevThemeKeys3 = Object.keys(themes);
        (colors as any).whateverBooFoo = null;
        (themes as any).whateverBooFoo = null;
        (colorValues as any).whateverBooFoo = null;
        expect(Object.keys(colors)).toEqual(prevKeys3);
        expect(Object.keys(themes)).toEqual(prevThemeKeys3);
        expect(Object.keys(colorValues)).toEqual(prevKeys3);
        
        // assigning null to existing keys but not in themes:
        (themes as any).black = null;
        (themes as any).gray = null;
        expect(Object.keys(colors)).toEqual(prevKeys3);
        expect(Object.keys(themes)).toEqual(prevThemeKeys3);
        expect(Object.keys(colorValues)).toEqual(prevKeys3);
    });
    
    
    
    test('test add', async () => {
        await yieldTime();
        
        
        
        // by valid color names:
        
        (colors as any).mintGreen = '#8dd9c2';
        // @ts-ignore
        themes.happy = 'deeppink';
        // @ts-ignore
        colorValues.freshWater = 'hsla(180deg, 60%, 80%)';
        
        await yieldTime();
        
        expect((colors as any).mintGreen).toBe('var(--col-mintGreen)');
        expect((themes as any).mintGreen).toBe(undefined);
        expect((colorValues as any).mintGreen?.hex?.()?.toLocaleLowerCase?.()).toBe('#8dd9c2');
        expect('mintGreen' in colors).toBe(true);
        expect('mintGreen' in themes).toBe(false);
        expect('mintGreen' in colorValues).toBe(true);
        expect(Object.keys(colors).includes('mintGreen')).toBe(true);
        expect(Object.keys(themes).includes('mintGreen')).toBe(false);
        expect(Object.keys(colorValues).includes('mintGreen')).toBe(true);
        
        expect((colors as any).happy).toBe('var(--col-happy)');
        expect((themes as any).happy).toBe('var(--col-happy)');
        expect((colorValues as any).happy?.hex?.()?.toLocaleLowerCase?.()).toBe('#ff1493');
        expect('happy' in colors).toBe(true);
        expect('happy' in themes).toBe(true);
        expect('happy' in colorValues).toBe(true);
        expect(Object.keys(colors).includes('happy')).toBe(true);
        expect(Object.keys(themes).includes('happy')).toBe(true);
        expect(Object.keys(colorValues).includes('happy')).toBe(true);
        
        expect((colors as any).freshWater).toBe('var(--col-freshWater)');
        expect((themes as any).freshWater).toBe(undefined);
        expect((colorValues as any).freshWater?.toString?.()?.toLocaleLowerCase?.()).toBe('rgb(173, 235, 235)');
        expect('freshWater' in colors).toBe(true);
        expect('freshWater' in themes).toBe(false);
        expect('freshWater' in colorValues).toBe(true);
        expect(Object.keys(colors).includes('freshWater')).toBe(true);
        expect(Object.keys(themes).includes('freshWater')).toBe(false);
        expect(Object.keys(colorValues).includes('freshWater')).toBe(true);
        
        
        
        // by css ref:
        
        (colors as any).burgundy = 'var(--link-otherColor)';
        // @ts-ignore
        themes.exciting = 'var(--hotpink)';
        // @ts-ignore
        colorValues.blueFire = 'var(--awesomeColor)';
        
        await yieldTime();
        
        expect((colors as any).burgundy).toBe('var(--col-burgundy)');
        expect((themes as any).burgundy).toBe(undefined);
        expect((colorValues as any).burgundy).toBe('var(--link-otherColor)');
        expect('burgundy' in colors).toBe(true);
        expect('burgundy' in themes).toBe(false);
        expect('burgundy' in colorValues).toBe(true);
        expect(Object.keys(colors).includes('burgundy')).toBe(true);
        expect(Object.keys(themes).includes('burgundy')).toBe(false);
        expect(Object.keys(colorValues).includes('burgundy')).toBe(true);
        
        expect((colors as any).exciting).toBe('var(--col-exciting)');
        expect((themes as any).exciting).toBe('var(--col-exciting)');
        expect((colorValues as any).exciting).toBe('var(--hotpink)');
        expect('exciting' in colors).toBe(true);
        expect('exciting' in themes).toBe(true);
        expect('exciting' in colorValues).toBe(true);
        expect(Object.keys(colors).includes('exciting')).toBe(true);
        expect(Object.keys(themes).includes('exciting')).toBe(true);
        expect(Object.keys(colorValues).includes('exciting')).toBe(true);
        
        expect((colors as any).blueFire).toBe('var(--col-blueFire)');
        expect((themes as any).blueFire).toBe(undefined);
        expect((colorValues as any).blueFire).toBe('var(--awesomeColor)');
        expect('blueFire' in colors).toBe(true);
        expect('blueFire' in themes).toBe(false);
        expect('blueFire' in colorValues).toBe(true);
        expect(Object.keys(colors).includes('blueFire')).toBe(true);
        expect(Object.keys(themes).includes('blueFire')).toBe(false);
        expect(Object.keys(colorValues).includes('blueFire')).toBe(true);
        
        
        
        // by Color object:
        
        (colors as any).cream = Color('#f0c1a7');
        // @ts-ignore
        themes.brokenWhite = Color('#e3dfdc');
        // @ts-ignore
        colorValues.freshBlue = Color('#0bd8fa').alpha(0.5);
        
        await yieldTime();
        
        expect((colors as any).cream).toBe('var(--col-cream)');
        expect((themes as any).cream).toBe(undefined);
        expect((colorValues as any).cream?.hex?.()?.toLocaleLowerCase?.()).toBe('#f0c1a7');
        expect('cream' in colors).toBe(true);
        expect('cream' in themes).toBe(false);
        expect('cream' in colorValues).toBe(true);
        expect(Object.keys(colors).includes('cream')).toBe(true);
        expect(Object.keys(themes).includes('cream')).toBe(false);
        expect(Object.keys(colorValues).includes('cream')).toBe(true);
        
        expect((colors as any).brokenWhite).toBe('var(--col-brokenWhite)');
        expect((themes as any).brokenWhite).toBe('var(--col-brokenWhite)');
        expect((colorValues as any).brokenWhite?.hex?.()?.toLocaleLowerCase?.()).toBe('#e3dfdc');
        expect('brokenWhite' in colors).toBe(true);
        expect('brokenWhite' in themes).toBe(true);
        expect('brokenWhite' in colorValues).toBe(true);
        expect(Object.keys(colors).includes('brokenWhite')).toBe(true);
        expect(Object.keys(themes).includes('brokenWhite')).toBe(true);
        expect(Object.keys(colorValues).includes('brokenWhite')).toBe(true);
        
        expect((colors as any).freshBlue).toBe('var(--col-freshBlue)');
        expect((themes as any).freshBlue).toBe(undefined);
        expect((colorValues as any).freshBlue?.toString?.()?.toLocaleLowerCase?.()).toBe('rgba(11, 216, 250, 0.5)');
        expect('freshBlue' in colors).toBe(true);
        expect('freshBlue' in themes).toBe(false);
        expect('freshBlue' in colorValues).toBe(true);
        expect(Object.keys(colors).includes('freshBlue')).toBe(true);
        expect(Object.keys(themes).includes('freshBlue')).toBe(false);
        expect(Object.keys(colorValues).includes('freshBlue')).toBe(true);
    });
});