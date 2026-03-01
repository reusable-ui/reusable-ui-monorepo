import {
    type ExpectedDropShadow,
} from './effect-types.js';



export const activeTargetOpacity      : number = 0.5;
export const activeTargetInvert       : number = 0.2;
export const activeTargetSepia        : number = 0.3;
export const activeTargetBrightness   : number = 1.3;
export const activeTargetContrast     : number = 1;
export const activeTargetSaturate     : number = 1.2;
export const activeTargetHueRotate    : number = 30; // in degrees
export const activeTargetBlur         : number = 5;  // in pixels
export const activeTargetDropShadow   : ExpectedDropShadow = {
    offsetX : -5, // in pixels
    offsetY : 10, // in pixels
    blur    : 8,  // in pixels
    color   : '#000000',
};

export const inactiveTargetOpacity    : number = -activeTargetOpacity;
export const inactiveTargetInvert     : number = -activeTargetInvert;
export const inactiveTargetSepia      : number = -activeTargetSepia;
export const inactiveTargetBrightness : number = -activeTargetBrightness;
export const inactiveTargetContrast   : number = -activeTargetContrast;
export const inactiveTargetSaturate   : number = -activeTargetSaturate;
export const inactiveTargetHueRotate  : number = -activeTargetHueRotate;
export const inactiveTargetBlur       : number = -activeTargetBlur;
export const inactiveTargetDropShadow : ExpectedDropShadow = {
    ...activeTargetDropShadow,
    blur: -activeTargetDropShadow.blur, // Negate the blur value for reverse intent
};
