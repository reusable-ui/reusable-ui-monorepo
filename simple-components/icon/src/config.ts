// cssfn:
import {
    // writes css in javascript:
    style,
}                           from '@cssfn/core'                  // writes css in javascript



// configs:
export type IconFileExpression = `${string}.${string}` | (string & {})
export type IconImageFile      = IconFileExpression | { name: IconFileExpression, ratio?: `${string}/${string}` }
export const iconConfig = {
    font  : {
        /**
         * A `url directory` pointing to the collection of the icon's fonts.  
         * It's the `front-end url`, not the physical path on the server.
         */
        path  : '/fonts',
        
        /**
         * A list of icon's fonts with extensions.  
         * The order does matter. Place the most preferred file on the first.
         */
        files : [
            'MaterialIcons-Regular.woff2',
            'MaterialIcons-Regular.woff',
            'MaterialIcons-Regular.ttf',
        ],
        
        // /**
        //  * A list of valid icon-font's content.
        //  */
        // items : builtinIconList as unknown as string[],
        
        /**
         * The css style of icon-font to be loaded.
         */
        style : style({
            // typos:
            fontFamily     : '"Material Icons"',
            fontWeight     : 400,
            fontStyle      : 'normal',
            textDecoration : 'none',
        }),
    },
    image : {
        /**
         * A `url directory` pointing to the collection of the icon's images.  
         * It's the `front-end url`, not the physical path on the server.
         */
        path  : '/icons',
        
        /**
         * A list of icon's images with extensions.  
         * The order doesn't matter, but if there are any files with the same name but different extensions, the first one will be used.
         */
        files : [
            'instagram.svg',
            'whatsapp.svg',
            'close.svg',
            'busy.svg',
            'navup.svg',
            'navdown.svg',
            'navleft.svg',
            'navright.svg',
            { name: 'dropup.svg'    , ratio: '10/24' },
            { name: 'dropdown.svg'  , ratio: '10/24' },
            { name: 'dropleft.svg'  , ratio:  '5/24' },
            { name: 'dropright.svg' , ratio:  '5/24' },
        ] as IconImageFile[],
    },
};
