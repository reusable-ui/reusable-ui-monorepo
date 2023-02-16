// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    escapeSvg,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                      // writes css in javascript



// configs:
export const [editableTextControls, editableTextControlValues, cssEditableTextControlConfig] = cssConfig(() => {
    return {
        // accessibilities:
        cursor      : 'text' as CssKnownProps['cursor'],
        
        
        
        // animations:
        iconSize    : '1em'  as CssKnownProps['blockSize'],
        iconValid   : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#000' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/></svg>")}")`                        as CssKnownProps['maskImage'],
        iconInvalid : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#000' d='M7.3,6.31,5,4,7.28,1.71a.7.7,0,1,0-1-1L4,3,1.71.72a.7.7,0,1,0-1,1L3,4,.7,6.31a.7.7,0,0,0,1,1L4,5,6.31,7.3A.7.7,0,0,0,7.3,6.31Z'/></svg>")}")` as CssKnownProps['maskImage'],
    };
}, { prefix: 'tedit' });
