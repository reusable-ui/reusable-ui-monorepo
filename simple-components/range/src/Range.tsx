// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'                     // cssfn css specific types
import {
    // rules:
    fallbacks,
    
    
    
    //combinators:
    children,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'                         // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'                   // writes css in react hook
import {
    // utilities:
    cssVar,
    fallbacks,
}                           from '@cssfn/css-var'                       // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'                    // reads/writes css variables configuration

// reusable-ui:
import {
    // styles:
    stripoutTextbox,
}                           from '@reusable-ui/stripouts'               // removes browser's default stylesheet
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from '@reusable-ui/accessibilities'         // an accessibility management system
import {
    // types:
    FeatureMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    OrientationName,
    OrientationRuleOptions,
    defaultInlineOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    OrientationVariant,
    useOrientationVariant,
    gradientOf,
    ifNotOutlined,
    outlinedOf,
    usesBackg,
    usesBorder,
    usesPadding,
}                           from '@reusable-ui/basic'                   // a base component
import {
    // styles:
    usesEditableControlLayout,
    usesEditableControlVariants,
    usesEditableControlStates,
    
    
    
    // react components:
    EditableControlProps,
    EditableControl,
}                           from '@reusable-ui/editable-control'        // a base component
import type {
    // types:
    InputHTMLAttributes,
}                           from '@reusable-ui/input'                   // a base component



// hooks:

// layouts:

//#region orientation
export const defaultOrientationRuleOptions = defaultInlineOrientationRuleOptions;
//#endregion orientation

//#region range
export interface RangeVars {
    /**
     * Range's thumb ratio.
     */
    valueRatio : any
    
    /**
     * final background layers of the Range.
     */
    backg      : any
}
const [rangeVars] = cssVar<RangeVars>({ minify: false, prefix: 'range' }); // do not minify to make sure `style={{ --range-valueRatio: ... }}` is the same between in server (without `useRangeStyleSheet` rendered) & client (with `useRangeStyleSheet` rendered)

/**
 * Uses Range variables.
 * @returns A `FeatureMixin<RangeVars>` represents Range variables definitions.
 */
export const usesRange = (): FeatureMixin<RangeVars> => {
    // dependencies:
    
    // backgrounds:
    const [, backgs] = usesBackg();
    
    
    
    return [
        () => style({
            ...vars({
                [rangeVars.backg] : backgs.backg,
            }),
        }),
        rangeVars,
    ];
};
//#endregion range



// styles:
export const inputElm = ':first-child';

export const usesRangeLayout = () => {
    // dependencies:
    
    // spacings:
    const [, paddings] = usesPadding();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesEditableControlLayout(),
        ]),
        ...style({
            
            
            
            // customize:
            ...usesCssProps(ranges), // apply config's cssProps
        }),
    });
};
export const usesRangeVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(ranges);
    
    // colors:
    const [gradientRule, gradients] = usesGradientVariant((toggle) => style({
        ...vars({
            // *toggle on/off* the background gradient prop:
            [gradients.backgGradTg] : toggle ? ranges.backgGrad : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        }),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesEditableControlVariants(),
            
            // layouts:
            sizesRule,
            
            // colors:
            gradientRule,
        ]),
    });
};
export const usesRangeStates = () => {
    return style({
        ...imports([
            // states:
            usesEditableControlStates(),
        ]),
    });
};

export const useRangeStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesRangeLayout(),
        
        // variants:
        usesRangeVariants(),
        
        // states:
        usesRangeStates(),
    ]),
}), { id: 'jue5zxlqsc' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [ranges, rangeValues, cssRangeConfig] = cssConfig(() => {
    return {
        // backgrounds:
        backgGrad : [
            ['linear-gradient(180deg, rgba(0,0,0, 0.2), rgba(255,255,255, 0.2))', 'border-box'],
        ] as CssKnownProps['backgroundImage'],
    };
}, { prefix: 'rnge' });



// react components:
export interface RangeProps
    extends
        // bases:
        EditableControlProps<HTMLInputElement>,
        
        // input[type="range"]:
        Omit<InputHTMLAttributes<HTMLInputElement>, 'role'|'size'>
{
    // validations:
    min          ?: string | number
    max          ?: string | number
    step         ?: string | number
    pattern      ?: string
}
const Range = (props: RangeProps): JSX.Element|null => {
    // styles:
    const styleSheet = useRangeStyleSheet();
    
    
    
    // rest props:
    const {
        // refs:
        elmRef,
        
        
        
        // accessibilities:
        autoFocus,
        tabIndex,
        enterKeyHint,
        
        
        
        // identifiers:
        name,
        form,
        
        
        
        // values:
        defaultValue,
        value,
        onChange, // forwards to `input[type]`
        
        
        
        // validations:
        required,
        
        minLength,
        maxLength,
        
        min,
        max,
        step,
        pattern,
    ...restEditableControlProps}  = props;
    
    
    
    // fn props:
    const propEnabled  = usePropEnabled(props);
    const propReadOnly = usePropReadOnly(props);
    
    
    
    // jsx:
    return (
        <EditableControl<HTMLInputElement>
            // other props:
            {...restEditableControlProps}
            
            
            
            // semantics:
            tag={props.tag ?? 'span'}
            
            
            
            // accessibilities:
            tabIndex={-1} // negative [tabIndex] => act as *wrapper* element, if input is `:focus-within` (pseudo) => the wrapper is also `.focus` (synthetic)
            enabled={props.enabled ?? !(props.disabled ?? false)} // aliasing [disabled] => ![enabled]
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        >
            <input
                // refs:
                ref={elmRef}
                
                
                
                // accessibilities:
                {...{
                    autoFocus,
                    tabIndex,
                    enterKeyHint,
                }}
                
                disabled={!propEnabled} // do not submit the value if disabled
                readOnly={propReadOnly} // locks the value if readOnly
                
                
                
                // identifiers:
                {...{
                    name,
                    form,
                }}
                
                
                
                // values:
                {...{
                    defaultValue,
                    value,
                    onChange,
                }}
                
                
                
                // validations:
                {...{
                    required,
                    
                    minLength,
                    maxLength,
                    
                    min,
                    max,
                    step,
                    pattern,
                }}
            />
        </EditableControl>
    );
};
export {
    Range,
    Range as default,
}
