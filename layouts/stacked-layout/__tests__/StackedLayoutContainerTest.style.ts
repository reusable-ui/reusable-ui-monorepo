import { style, fallback, children } from '@cssfn/core'
import { usingBorderFeature } from '@reusable-ui/border-feature'
import { usingOrientationVariant } from '@reusable-ui/orientation-variant'
import { usingFlowDirectionVariant} from '@reusable-ui/flow-direction-variant'
import { usingStackedLayout } from '../dist/index.js'

// Test style for StackedLayout container.
export default function stackedLayoutContainerTestStyle() {
    // Variants:
    const {
        orientationVariantRule,
        orientationVariantVars: {
            isOrientationInline,
            isOrientationBlock,
            orientationFactor,
        },
    } = usingOrientationVariant();
    const {
        flowDirectionVariantRule,
        flowDirectionVariantVars: {
            isFlowDirectionStart,
            isFlowDirectionEnd,
            flowDirectionFactor,
        }
    } = usingFlowDirectionVariant();
    
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
        borderStyle            : 'solid',
        borderWidth            : 'var(--borderWidth)',
        borderStartStartRadius : 'var(--borderStartStartRadius)',
        borderStartEndRadius   : 'var(--borderStartEndRadius)',
        borderEndStartRadius   : 'var(--borderEndStartRadius)',
        borderEndEndRadius     : 'var(--borderEndEndRadius)',
        borderColor            : 'black',
    });
    
    // Layouts:
    const {
        stackedLogicRule,
        stackedInnerCornerRule,
        stackedSeparatorRule,
    } = usingStackedLayout({
        orientation              : orientationFactor,
        flowDirection            : flowDirectionFactor,
        
        innerStartCornerSelector : ':first-child',
        innerEndCornerSelector   : ':last-child',
        separatorBeforeSelector  : ':not(:first-child)',
    });
    
    return style({
        // Layouts:
        display       : 'flex',
        '--rowForward'     : [[ isOrientationInline, isFlowDirectionStart, 'row'            ]],
        '--rowBackward'    : [[ isOrientationInline, isFlowDirectionEnd  , 'row-reverse'    ]],
        '--columnForward'  : [[ isOrientationBlock , isFlowDirectionStart, 'column'         ]],
        '--columnBackward' : [[ isOrientationBlock , isFlowDirectionEnd  , 'column-reverse' ]],
        flexDirection: 'var(--rowForward, var(--rowBackward, var(--columnForward, var(--columnBackward))))',
        flexWrap: 'nowrap',
        flex: '0 0 auto',
        width: 'fit-content',
        height: 'fit-content',
        justifySelf: 'center',
        margin: '2rem',
        
        // Variants:
        ...orientationVariantRule(),
        ...flowDirectionVariantRule(),
        
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
        
        // Layouts:
        ...stackedLogicRule(),
        ...children(':nth-child(n)', {
            ...stackedInnerCornerRule(),
            ...stackedSeparatorRule(),
        }),
    });
}
