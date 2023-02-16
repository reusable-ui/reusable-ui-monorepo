// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    keyframes,
    style,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // background stuff of UI:
    usesBackground,
    
    
    
    // foreground (text color) stuff of UI:
    usesForeground,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// configs:
export const [editableControls, editableControlValues, cssEditableControlConfig] = cssConfig(() => {
    // dependencies:
    
    const {backgroundVars: {backg, altBackgColor}} = usesBackground();
    const {foregroundVars: {foreg, altForeg     }} = usesForeground();
    
    
    
    //#region keyframes
    const frameHighlighted = style({
        backg : altBackgColor,
        foreg : altForeg,
    });
    const frameNormalized  = style({
        backg : backg,
        foreg : foreg,
    });
    const [keyframesValidRule  , keyframesValid  ] = keyframes({
        from : frameHighlighted,
        to   : frameNormalized,
    });
    keyframesValid.value     = 'valid';     // the @keyframes name should contain 'valid'     in order to be recognized by `useInvalidable`
    const [keyframesInvalidRule, keyframesInvalid] = keyframes({
        from : frameHighlighted,
        to   : frameNormalized,
    });
    keyframesInvalid.value   = 'invalid';   // the @keyframes name should contain 'invalid'   in order to be recognized by `useInvalidable`
    
    const [keyframesUnvalidRule  , keyframesUnvalid  ] = keyframes({
        /* no animation yet */
    });
    keyframesUnvalid.value   = 'unvalid';   // the @keyframes name should contain 'unvalid'   in order to be recognized by `useInvalidable`
    const [keyframesUninvalidRule  , keyframesUninvalid  ] = keyframes({
        /* no animation yet */
    });
    keyframesUninvalid.value = 'uninvalid'; // the @keyframes name should contain 'uninvalid' in order to be recognized by `useInvalidable`
    //#endregion keyframes
    
    
    
    return {
        // animations:
        ...keyframesValidRule,
        ...keyframesInvalidRule,
        ...keyframesUnvalidRule,
        ...keyframesUninvalidRule,
        animValid     : [
            ['1000ms', 'ease-out', 'both', keyframesValid    ],
        ]                       as CssKnownProps['animation'],
        animInvalid   : [
            ['1000ms', 'ease-out', 'both', keyframesInvalid  ],
        ]                       as CssKnownProps['animation'],
        animUnvalid   : [
            [ '100ms', 'ease-out', 'both', keyframesUnvalid  ],
        ]                       as CssKnownProps['animation'],
        animUninvalid : [
            [ '100ms', 'ease-out', 'both', keyframesUninvalid],
        ]                       as CssKnownProps['animation'],
    };
}, { prefix: 'edit' });
