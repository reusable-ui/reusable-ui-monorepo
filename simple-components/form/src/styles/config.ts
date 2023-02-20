// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                      // writes css in javascript

// reusable-ui components:
import {
    // configs:
    editableControls,
}                           from '@reusable-ui/editable-control'    // a base component



// configs:
export const [forms, formValues, cssFormConfig] = cssConfig(() => {
    return {
        // animations:
        animValid     : editableControls.animValid      as CssKnownProps['animation'],
        animInvalid   : editableControls.animInvalid    as CssKnownProps['animation'],
        animUnvalid   : editableControls.animUnvalid    as CssKnownProps['animation'],
        animUninvalid : editableControls.animUninvalid  as CssKnownProps['animation'],
    };
}, { prefix: 'frm' });
