// react:
import {
    // hooks:
    useMemo,
}                           from 'react'

// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssKnownProps,
    CssRule,
    
    
    
    // writes css in javascript:
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                  // writes css in javascript

// internals:
import {
    // configs:
    IconImageFile,
    iconConfig,
}                           from '../config.js'
import {
    concatUrl,
}                           from '../utilities.js'
import type {
    // react components:
    IconProps,
}                           from '../Icon.js'



// hooks:

// features:

//#region icon
export interface IconVars {
    /**
     * Icon's image url or icon name.
     */
    image : any
    
    /**
     * Icon's block-size (height).
     */
    size  : any
    
    /**
     * Icon's ratio of width/height.
     */
    ratio : any
    
    /**
     * Icon's color.
     */
    color : any
}
const [iconVars] = cssVars<IconVars>({ prefix: 'icon', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



export interface IconStuff { iconRule: Factory<CssRule>, iconVars: CssVars<IconVars> }
export interface IconConfig {
    image ?: CssKnownProps['content'        ]
    size  ?: CssKnownProps['blockSize'      ]
    color ?: CssKnownProps['backgroundColor']
}
/**
 * Uses icon image and icon color.
 * @param config  A configuration of `iconRule`.
 * @returns A `IconStuff` represents the icon rules.
 */
export const usesIcon = (config?: IconConfig): IconStuff => {
    return {
        iconRule: () => style({
            ...vars({
                // appearances:
                [iconVars.image] : config?.image,
                
                
                
                // sizes:
                [iconVars.size ] : config?.size,
                
                
                
                // backgrounds:
                [iconVars.color] : config?.color,
            }),
        }),
        iconVars,
    };
};


const getFileNameWithoutExtension = (file: IconImageFile): string|null => {
    if (!file) return null;
    
    
    
    const fileName = (typeof(file) === 'string') ? file : file.name;
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex < 0) return fileName; // extension is not found => it's a pure fileName without extension
    return fileName.slice(0, lastDotIndex);
}
export const useIcon = <TElement extends Element = HTMLSpanElement>({ icon }: IconProps<TElement>) => {
    return useMemo(() => {
        // dependencies:
        
        // features:
        const {iconVars} = usesIcon();
        
        
        
        const [iconImage, iconRatio] = ((): [string|null, string|null] => {
            const file = iconConfig.image.files.find((file) => getFileNameWithoutExtension(file) === icon);
            if (!file) return [null, null];
            return [
                concatUrl(iconConfig.image.path, (typeof(file) === 'string') ? file : file.name),
                (typeof(file) === 'string') ? null : (file.ratio ?? null)
            ];
        })();
        
        const isIconFont : boolean = !iconImage; // && iconConfig.font.items.includes(icon); // assumes the user use TypeScript for validating the font name
        
        
        
        // memorized a whole object:
        return {
            class: (() => {
                if (iconImage)  return 'image'; // icon name is found in iconImage
                
                if (isIconFont) return 'font';  // icon name is found in iconFont
                
                return null; // icon name is not found in both iconImage & iconFont
            })(),
            
            style: {
                // appearances:
                [
                    iconVars.image
                    .slice(4, -1) // fix: var(--customProp) => --customProp
                ]: (() => {
                    if (iconImage)  return `url("${iconImage}")`; // the url of the icon's image
                    
                    if (isIconFont) return `"${icon}"`;           // the icon's name
                    
                    return undefined; // icon name is not found in both iconImage & iconFont
                })(),
                
                [
                    iconVars.ratio
                    .slice(4, -1) // fix: var(--customProp) => --customProp
                ]: iconRatio ?? '1/1', // defaults to '1/1' if the ratio is not defined
            },
        };
    }, [icon]);
};
//#endregion icon
