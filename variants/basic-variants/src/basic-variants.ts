// react:
import {
    // hooks:
    useMemo,
}                           from 'react'

// reusable-ui variants:
import {
    // hooks:
    ResizableProps,
}                           from '@reusable-ui/resizable'       // size options of UI
import {
    // hooks:
    ThemeableProps,
}                           from '@reusable-ui/themeable'       // color options of UI
import {
    // hooks:
    GradientableProps,
}                           from '@reusable-ui/gradientable'    // gradient variant of UI
import {
    // hooks:
    OutlineableProps,
}                           from '@reusable-ui/outlineable'     // outlined (background-less) variant of UI
import {
    // hooks:
    MildableProps,
}                           from '@reusable-ui/mildable'        // mild (soft color) variant of UI



// hooks:

// variants:

//#region basic-variants
const onlyExistingProps = (props: BasicVariantProps): BasicVariantProps => {
    const {
        size,
        theme,
        gradient,
        outlined,
        mild,
    } = props;
    
    
    
    const basicVariantProps : BasicVariantProps = {
        size,
        theme,
        gradient,
        outlined,
        mild,
    };
    
    
    
    return Object.fromEntries(
        Object.entries(basicVariantProps)
        .filter(([, value]) => (value !== undefined)) // filter out `undefined` props so they wouldn't overwrite the existing ones
    ) as BasicVariantProps;
};



export interface BasicVariantProps
    extends
        // bases:
        ResizableProps,
        ThemeableProps,
        GradientableProps,
        OutlineableProps,
        MildableProps
{
}
export const useBasicVariantProps = (props: BasicVariantProps, defaults?: BasicVariantProps): BasicVariantProps => {
    const {
        size,
        theme,
        gradient,
        outlined,
        mild,
    } = {
        ...(defaults ? onlyExistingProps(defaults) : null),
        ...props,
    };
    
    
    
    return useMemo<BasicVariantProps>(() => onlyExistingProps({
        size,
        theme,
        gradient,
        outlined,
        mild,
    }), [
        size,
        theme,
        gradient,
        outlined,
        mild,
    ]);
};
//#endregion basic-variants
