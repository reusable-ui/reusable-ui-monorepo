import type {
    JSDOM as _JSDOM,
} from 'jsdom'
import type {
    colors as _colors,
    themes as _themes,
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
import {
    jest,
} from '@jest/globals'



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
});