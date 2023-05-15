// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    escapeSvg,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a spacer (gap) management system:
    spacers,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // configs:
    basics,
}                           from '@reusable-ui/basic'           // a base component



// configs:
export const [lists, listValues, cssListConfig] = cssConfig(() => {
    const bases = {
        // borders:
        borderStyle                          : basics.borderStyle               as CssKnownProps['borderStyle'],
        borderWidth                          : basics.borderWidth               as CssKnownProps['borderWidth'],
        borderColor                          : basics.borderColor               as CssKnownProps['borderColor'],
        
        borderRadiusSm                       : basics.borderRadiusSm            as CssKnownProps['borderRadius'],
        borderRadiusMd                       : basics.borderRadiusMd            as CssKnownProps['borderRadius'],
        borderRadiusLg                       : basics.borderRadiusLg            as CssKnownProps['borderRadius'],
        
        
        
        // animations:
        transition                           : basics.transition                as CssKnownProps['transition'],
        itemTransition                       : basics.transition                as CssKnownProps['transition'],
        contentTransition                    : basics.transition                as CssKnownProps['transition'],
        tabTransition                        : basics.transition                as CssKnownProps['transition'],
        bulletTransition                     : basics.transition                as CssKnownProps['transition'],
        
        
        
        // buttons:
        buttonSpacingSm                      : spacers.xs                       as CssKnownProps['gapInline'],
        buttonSpacingMd                      : spacers.sm                       as CssKnownProps['gapInline'],
        buttonSpacingLg                      : spacers.md                       as CssKnownProps['gapInline'],
        
        
        
        // tabs:
        tabTextAlign                         : 'center'                         as CssKnownProps['textAlign'],
        
        
        
        // breadcrumbs:
        breadcrumbPaddingInlineSm            : basics.paddingBlockSm            as CssKnownProps['paddingInline'],
        breadcrumbPaddingBlockSm             : basics.paddingBlockSm            as CssKnownProps['paddingBlock' ],
        breadcrumbPaddingInlineMd            : basics.paddingBlockMd            as CssKnownProps['paddingInline'],
        breadcrumbPaddingBlockMd             : basics.paddingBlockMd            as CssKnownProps['paddingBlock' ],
        breadcrumbPaddingInlineLg            : basics.paddingBlockLg            as CssKnownProps['paddingInline'],
        breadcrumbPaddingBlockLg             : basics.paddingBlockLg            as CssKnownProps['paddingBlock' ],
        
        breadcrumbSeparatorImage             : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><polyline points='7.5 3 16.5 12 7.5 21' fill='none' stroke='#000' stroke-linecap='square' stroke-width='3'/></svg>")}")`                                                  as CssKnownProps['maskImage'],
        breadcrumbSeparatorImageBlock        : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><polyline points='7.5 3 16.5 12 7.5 21' fill='none' stroke='#000' stroke-linecap='square' stroke-width='3' transform-origin='center' transform='rotate(90)'/></svg>")}")` as CssKnownProps['maskImage'],
        breadcrumbSeparatorInlineSize        : '0.8em'                          as CssKnownProps['inlineSize'],
        breadcrumbSeparatorBlockSize         : 'auto'                           as CssKnownProps['blockSize' ],
        breadcrumbSeparatorInlineSizeBlock   : 'auto'                           as CssKnownProps['inlineSize'],
        breadcrumbSeparatorBlockSizeBlock    : '0.8em'                          as CssKnownProps['blockSize' ],
        breadcrumbSeparatorMarginInline      : '0.25em'                         as CssKnownProps['marginInline'],
        breadcrumbSeparatorMarginBlock       : '0em'                            as CssKnownProps['marginBlock' ],
        breadcrumbSeparatorMarginInlineBlock : '0em'                            as CssKnownProps['marginInline'],
        breadcrumbSeparatorMarginBlockBlock  : '0.25em'                         as CssKnownProps['marginBlock'],
        
        
        
        // bullets:
        bulletSpacingSm                      : spacers.xs                       as CssKnownProps['gapInline'],
        bulletSpacingMd                      : spacers.sm                       as CssKnownProps['gapInline'],
        bulletSpacingLg                      : spacers.md                       as CssKnownProps['gapInline'],
        
        bulletPaddingSm                      : spacers.xxs                      as CssKnownProps['paddingInline'],
        bulletPaddingMd                      : spacers.xs                       as CssKnownProps['paddingInline'],
        bulletPaddingLg                      : spacers.sm                       as CssKnownProps['paddingInline'],
        
        
        
        // numbered:
        /* a non_nested counter */
        numberedContent                      : [[
            'counter(ListNumber)',
            '". "'
        ]]                                                                      as CssKnownProps['content'],
        
        /* a nested counter */
        // numberedContent                      : [[
        //     'counters(ListNumber, ".")',
        //     '". "'
        // ]]                                                                      as CssKnownProps['content'],
    };
    
    
    
    const defaults = {
        // borders:
        borderRadius                         : bases.borderRadiusMd             as CssKnownProps['borderRadius'],
        
        
        
        // buttons:
        buttonSpacing                        : bases.buttonSpacingMd            as CssKnownProps['gapInline'],
        
        
        
        // breadcrumbs:
        breadcrumbPaddingInline              : bases.breadcrumbPaddingInlineMd  as CssKnownProps['paddingInline'],
        breadcrumbPaddingBlock               : bases.breadcrumbPaddingBlockMd   as CssKnownProps['paddingBlock' ],
        
        
        
        // bullets:
        bulletSpacing                        : bases.bulletSpacingMd            as CssKnownProps['gapInline'],
        
        bulletPadding                        : bases.bulletPaddingMd            as CssKnownProps['paddingInline'],
    };
    
    
    
    return {
        ...bases,
        ...defaults,
    };
}, { prefix: 'list' });
