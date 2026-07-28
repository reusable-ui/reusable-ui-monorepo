import { rule, style } from '@cssfn/core'
import { usingBorderFeature } from '@reusable-ui/border-feature'

// Test style for StackedLayout item.
export default function stackedLayoutItemTestStyle() {
    // Features:
    const {
        borderFeatureRule,
        borderFeatureVars: {
            borderStyle,
            borderColor,
            
            borderInlineStartWidth,
            borderInlineEndWidth,
            borderBlockStartWidth,
            borderBlockEndWidth,
            
            borderStartStartRadius,
            borderStartEndRadius,
            borderEndStartRadius,
            borderEndEndRadius,
        },
    } = usingBorderFeature({
        borderStyle  : 'dashed',
        borderWidth  : '1px',
        borderRadius : '0.25rem',
        borderColor  : 'blue',
    });
    
    return style({
        // Layouts:
        display  : 'grid',
        fontSize : '1rem',
        padding  : '2rem 1rem',
        
        // Features:
        ...borderFeatureRule(),
        
        // Apply border variables:
        borderStyle,
        borderColor,
        
        borderInlineStartWidth,
        borderInlineEndWidth,
        borderBlockStartWidth,
        borderBlockEndWidth,
        
        borderStartStartRadius,
        borderStartEndRadius,
        borderEndStartRadius,
        borderEndEndRadius,
        
        // Adds colors for visual distinction during testing:
        ...rule(':nth-child(5n+1)', {
            backgroundColor: 'lightgreen',
        }),
        ...rule(':nth-child(5n+2)', {
            backgroundColor: 'lightpink',
        }),
        ...rule(':nth-child(5n+3)', {
            backgroundColor: 'lightsalmon',
        }),
        ...rule(':nth-child(5n+4)', {
            backgroundColor: 'lightsteelblue',
        }),
        ...rule(':nth-child(5n+5)', {
            backgroundColor: 'lightskyblue',
        }),
    });
}
