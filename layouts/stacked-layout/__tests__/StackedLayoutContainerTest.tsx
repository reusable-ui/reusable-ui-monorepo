import React, { type CSSProperties, useMemo } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useOrientationVariant, type OrientationVariantProps } from '@reusable-ui/orientation-variant'
import { useFlowDirectionVariant, type FlowDirectionVariantProps} from '@reusable-ui/flow-direction-variant'
import { useStackedLayoutTestStyles } from './StackedLayoutContainerTest.loader.js'
import { StackedLayoutItemTest } from './StackedLayoutItemTest.js'



export interface StackedLayoutContainerTestProps
    extends
        // Variants:
        Required<OrientationVariantProps>,
        Required<FlowDirectionVariantProps>
{
    borderWidth            : number
    borderStartStartRadius : number
    borderStartEndRadius   : number
    borderEndStartRadius   : number
    borderEndEndRadius     : number
    
    items                  : number
}

/**
 * Test component for StackedLayout.
 * 
 * - Mocks `stackedFactorCond` via inline style for controlled testing.
 */
export const StackedLayoutContainerTest = (props: StackedLayoutContainerTestProps) => {
    const {
        borderWidth,
        borderStartStartRadius,
        borderStartEndRadius,
        borderEndStartRadius,
        borderEndEndRadius,
        
        items,
    } = props;
    
    const styles = useStackedLayoutTestStyles();
    
    const inlineStyle : CSSProperties = useMemo(() => ({
        '--borderWidth'            : `${borderWidth}px`,
        '--borderStartStartRadius' : `${borderStartStartRadius}px`,
        '--borderStartEndRadius'   : `${borderStartEndRadius}px`,
        '--borderEndStartRadius'   : `${borderEndStartRadius}px`,
        '--borderEndEndRadius'     : `${borderEndEndRadius}px`,
    } as CSSProperties), [
        borderWidth,
        borderStartStartRadius,
        borderStartEndRadius,
        borderEndStartRadius,
        borderEndEndRadius,
    ]);
    
    const { orientationClassname   } = useOrientationVariant(props);
    const { flowDirectionClassname } = useFlowDirectionVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="stacked-layout-container-test"
                className={`${styles.main} ${orientationClassname} ${flowDirectionClassname}`}
                style={inlineStyle}
            >
                {new Array(items).fill(null).map((_, index) =>
                    <StackedLayoutItemTest key={index} index={index} />
                )}
            </div>
        </div>
    );
};
