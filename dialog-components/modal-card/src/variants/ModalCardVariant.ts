// react:
import {
    // hooks:
    useMemo,
}                           from 'react'

// cssfn:
import type {
    // cssfn css specific types:
    CssKnownProps,
}                           from '@cssfn/core'                  // writes css in javascript

// internals:
import {
    // features:
    usesModalCard,
}                           from '../features/modalCard.js'



// defaults:
const _defaultModalCardStyle : ModalCardStyle = 'regular'



// hooks:

// variants:

//#region ModalCardVariant
export type ModalCardStyle = 'regular'|'scrollable' // might be added more styles in the future
export interface ModalCardVariant {
    modalCardStyle ?: ModalCardStyle
    
    horzAlign      ?: CssKnownProps['justifyItems']
    vertAlign      ?: CssKnownProps['alignItems'  ]
}
export const useModalCardVariant = ({ modalCardStyle = _defaultModalCardStyle, horzAlign, vertAlign }: ModalCardVariant) => {
    // dependencies:
    
    // features:
    const {modalCardVars} = usesModalCard();
    
    
    
    return {
        class: [
            ((modalCardStyle === 'regular') ? null : modalCardStyle),
            ((horzAlign === 'stretch') ? 'horzStretch' : null),
            ((vertAlign === 'stretch') ? 'vertStretch' : null),
        ].filter((c): c is Exclude<typeof c, null> => (c !== null))
        .join(' ') || null,
        
        style : useMemo(() => ({
            [
                modalCardVars.horzAlign
                .slice(4, -1) // fix: var(--customProp) => --customProp
            ] : horzAlign,
            
            [
                modalCardVars.vertAlign
                .slice(4, -1) // fix: var(--customProp) => --customProp
            ] : vertAlign,
        }), [horzAlign, vertAlign]),
    };
};
//#endregion ModalCardVariant
