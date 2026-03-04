/**
 * Converts a light-mode brightness value to its dark-mode equivalent for the active effect.
 */
export const brightnessForDarkMode = (brightness: number) => (1.25 - (brightness - 0.7) * 0.75);
