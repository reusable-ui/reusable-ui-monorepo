// Cssfn:
import {
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type CssColor,
}                           from './types.js'

// Utilities:
import {
    adjustLightness,
    contrastFlip,
    adjustOpacity,
}                           from './utilities.js'

// Configs:
import {
    colorParamVars,
}                           from './colorParams.js'



// Configs:

const config = cssConfig(() => {
    // Sources:
    
    // Taken from Bootstrap:
    /*
        blue          : #0d6efd
        indigo        : #6610f2
        purple        : #6f42c1
        pink          : #d63384
        red           : #dc3545
        orange        : #fd7e14
        yellow        : #ffc107
        green         : #198754
        teal          : #20c997
        cyan          : #0dcaf0
        
        black         : #000000
        white         : #ffffff
        gray          : #6c757d
        grayDark      : #343a40
        
        light         : #f8f9fa
        dark          : #212529
    */
    
    
    
    // Constants:
    
    /**
     * **Common Colors** - Used across various UI elements.
     * 
     * These colors serve as widely used foundational hues for styling and design consistency.
     * They remain **constant** and are **not affected** by dark/light mode or `colorParamVars` adjustments.
     */
    const commonColors = {
        /**
         * **Common blue color** - Frequently seen in UI and branding designs.
         */
        blue          : 'oklch(0.58 0.228 260)'     as CssColor,
        
        /**
         * **Common indigo color** - Deep and versatile for various elements.
         */
        indigo        : 'oklch(0.49 0.278 287)'     as CssColor,
        
        /**
         * **Common purple color** - Often used for elegant or creative accents.
         */
        purple        : 'oklch(0.50 0.188 295)'     as CssColor,
        
        /**
         * **Common pink color** - Vibrant and widely used in aesthetic designs.
         */
        pink          : 'oklch(0.60 0.209 355)'     as CssColor,
        
        /**
         * **Common red color** - Typically associated with **errors or alerts**.
         */
        red           : 'oklch(0.59 0.202  21)'     as CssColor,
        
        /**
         * **Common orange color** - Often linked to **warnings or cautions**.
         */
        orange        : 'oklch(0.73 0.183  51)'     as CssColor,
        
        /**
         * **Common yellow color** - Frequently used for **attention-grabbing notices**.
         */
        yellow        : 'oklch(0.84 0.172  85)'     as CssColor,
        
        /**
         * **Common green color** - Typically associated with **success or confirmation states**.
         */
        green         : 'oklch(0.55 0.123 157)'     as CssColor,
        
        /**
         * **Common teal color** - Balancing between green and blue tones.
         */
        teal          : 'oklch(0.74 0.148 166)'     as CssColor,
        
        /**
         * **Common cyan color** - Bright and refreshing.
         */
        cyan          : 'oklch(0.77 0.138 218)'     as CssColor,
        
        
        
        /**
         * **Common black color** - Providing deep contrast for text and UI elements.
         */
        black         : 'oklch(0.00 0.000 000)'     as CssColor,
        
        /**
         * **Common dark gray color** - Offering a subdued neutral tone.
         */
        grayDark      : 'oklch(0.35 0.013 248)'     as CssColor,
        
        /**
         * **Common gray color** - Neutral and adaptable for UI elements.
         */
        gray          : 'oklch(0.56 0.017 245)'     as CssColor,
        
        /**
         * **Common light gray color** - Useful for subtle background effects.
         */
        grayLight     : 'oklch(0.77 0.021 243)'     as CssColor,
        
        /**
         * **Common white color** - Ensuring maximum contrast where needed.
         */
        white         : 'oklch(1.00 0.000 000)'     as CssColor,
    };
    
    /**
     * **Root Colors** - The foundational palette for color derivation.
     * 
     * These colors serve as the **source of truth** for all theme-based color variations (`primaryBase`, `primaryMild`, etc.).
     * They remain **constant**, unaffected by **dark/light mode** or `colorParamVars` adjustments.
     * 
     * ---
     * 
     * **Usage Notes:**
     * - `rootColors` define **raw, unmodified colors** used to generate theme-based shades.
     * - **Avoid direct usage**—instead, use `baseColors` for UI elements.
     * - `baseColors` dynamically adapt to **light/dark themes**, while `rootColors` remain unchanged.
     */
    const rootColors = {
        /**
         * **Root primary color** - The site's core branding or company identity.  
         * Serves as the foundation for all primary derivatives.
         */
        primary       : commonColors.blue           as CssColor,
        
        /**
         * **Root secondary color** - A muted contrast to the site's core branding.  
         * Serves as the foundation for all secondary derivatives.
         */
        secondary     : commonColors.gray           as CssColor,
        
        /**
         * **Root success color** - Represents positive actions and confirmations.  
         * Serves as the foundation for all success derivatives.
         */
        success       : commonColors.green          as CssColor,
        
        /**
         * **Root info color** - Represents neutral alerts or general details.  
         * Serves as the foundation for all info derivatives.
         */
        info          : commonColors.cyan           as CssColor,
        
        /**
         * **Root warning color** - Represents cautions or potential errors.  
         * Serves as the foundation for all warning derivatives.
         */
        warning       : commonColors.yellow         as CssColor,
        
        /**
         * **Root danger color** - Represents errors or destructive actions.  
         * Serves as the foundation for all danger derivatives.
         */
        danger        : commonColors.red            as CssColor,
        
        /**
         * **Root light color** - Used for floating UI elements over static dark backgrounds, such as images.  
         * Serves as the foundation for all light derivatives.
         */
        light         : 'oklch(0.98 0.002 248)'     as CssColor,
        
        /**
         * **Root dark color** - Used for floating UI elements over static light backgrounds, such as images.  
         * Serves as the foundation for all dark derivatives.
         */
        dark          : 'oklch(0.26 0.010 248)'     as CssColor,
    };
    
    
    
    // Background colors:
    
    /**
     * **Base Colors** - Regular background colors adapted to the theme.
     * 
     * These colors are **derived from `rootColors`** and dynamically adjusted via `colorParamVars.base`  
     * ensuring **optimal contrast in light and dark modes**.
     * 
     * ---
     * 
     * **Usage Notes:**
     * - `baseColors` are optimized for **UI backgrounds**, ensuring seamless theme adaptation.
     * - **Automatically balances** colors based on **light/dark mode adjustments**.
     * - **Use `baseColors` for UI surfaces**—avoid using `rootColors` directly.
     * - For content-heavy surfaces, such as **articles and textboxes**, use `mildColors` instead.
     */
    const baseColors = {
        /**
         * **Primary base color** - A regular background color for primary UI elements.  
         * Ensures **optimal contrast in light and dark modes**.
         * 
         * For content-heavy surfaces, such as **articles and textboxes**, use `primaryMild` instead.
         */
        primaryBase   : adjustLightness(rootColors.primary  , colorParamVars.base),
        
        /**
         * **Secondary base color** - A regular background color for complementing primary UI elements.  
         * Ensures **optimal contrast in light and dark modes**.
         * 
         * For content-heavy surfaces, such as **articles and textboxes**, use `secondaryMild` instead.
         */
        secondaryBase : adjustLightness(rootColors.secondary, colorParamVars.base),
        
        /**
         * **Success base color** - A regular background color for positive actions and confirmations.  
         * Ensures **optimal contrast in light and dark modes**.
         * 
         * For content-heavy surfaces, such as **articles and textboxes**, use `successMild` instead.
         */
        successBase   : adjustLightness(rootColors.success  , colorParamVars.base),
        
        /**
         * **Info base color** - A regular background color for neutral alerts or general details.  
         * Ensures **optimal contrast in light and dark modes**.
         * 
         * For content-heavy surfaces, such as **articles and textboxes**, use `infoMild` instead.
         */
        infoBase      : adjustLightness(rootColors.info     , colorParamVars.base),
        
        /**
         * **Warning base color** - A regular background color for cautions or potential errors.  
         * Ensures **optimal contrast in light and dark modes**.
         * 
         * For content-heavy surfaces, such as **articles and textboxes**, use `warningMild` instead.
         */
        warningBase   : adjustLightness(rootColors.warning  , colorParamVars.base),
        
        /**
         * **Danger base color** - A regular background color for errors or destructive actions.  
         * Ensures **optimal contrast in light and dark modes**.
         * 
         * For content-heavy surfaces, such as **articles and textboxes**, use `dangerMild` instead.
         */
        dangerBase    : adjustLightness(rootColors.danger   , colorParamVars.base),
        
        /**
         * **Light base color** - A regular background color for floating UI elements over static dark backgrounds, such as images.  
         * Ensures **optimal contrast in light and dark modes**.
         * 
         * For content-heavy surfaces, such as **articles and textboxes**, use `lightMild` instead.
         */
        lightBase     : adjustLightness(rootColors.light    , colorParamVars.base),
        
        /**
         * **Dark base color** - A regular background color for floating UI elements over static light backgrounds, such as images.  
         * Ensures **optimal contrast in light and dark modes**.
         * 
         * For content-heavy surfaces, such as **articles and textboxes**, use `darkMild` instead.
         */
        darkBase      : adjustLightness(rootColors.dark     , colorParamVars.base),
    };
    
    /**
     * **Mild Colors** - Comfortable background colors for content-heavy UI elements.
     * 
     * These colors are **derived from `rootColors`** and dynamically adjusted via `colorParamVars.mild`  
     * enhancing **visual comfort and reduces eye strain**.
     * 
     * ---
     * 
     * **Usage Notes:**
     * - `mildColors` are optimized for **backgrounds of content-heavy elements**, such as articles, text fields, and dialogs.
     * - They provide a **gentle contrast**, making extended reading easier on the eyes.
     * - For regular UI surfaces, such as **buttons and standard panels**, use `baseColors` instead.
     */
    const mildColors = {
        /**
         * **Primary mild color** - A content-heavy background color for primary UI elements.  
         * Enhances **visual comfort and reduces eye strain**.
         * 
         * For regular UI surfaces, such as **buttons and standard panels**, use `primaryBase` instead.
         */
        primaryMild   : adjustLightness(rootColors.primary  , colorParamVars.mild),
        
        /**
         * **Secondary mild color** - A content-heavy background color for complementing primary UI elements.  
         * Enhances **visual comfort and reduces eye strain**.
         * 
         * For regular UI surfaces, such as **buttons and standard panels**, use `secondaryBase` instead.
         */
        secondaryMild : adjustLightness(rootColors.secondary, colorParamVars.mild),
        
        /**
         * **Success mild color** - A content-heavy background color for positive actions and confirmations.  
         * Enhances **visual comfort and reduces eye strain**.
         * 
         * For regular UI surfaces, such as **buttons and standard panels**, use `successBase` instead.
         */
        successMild   : adjustLightness(rootColors.success  , colorParamVars.mild),
        
        /**
         * **Info mild color** - A content-heavy background color for neutral alerts or general details.  
         * Enhances **visual comfort and reduces eye strain**.
         * 
         * For regular UI surfaces, such as **buttons and standard panels**, use `infoBase` instead.
         */
        infoMild      : adjustLightness(rootColors.info     , colorParamVars.mild),
        
        /**
         * **Warning mild color** - A content-heavy background color for cautions or potential errors.  
         * Enhances **visual comfort and reduces eye strain**.
         * 
         * For regular UI surfaces, such as **buttons and standard panels**, use `warningBase` instead.
         */
        warningMild   : adjustLightness(rootColors.warning  , colorParamVars.mild),
        
        /**
         * **Danger mild color** - A content-heavy background color for errors or destructive actions.  
         * Enhances **visual comfort and reduces eye strain**.
         * 
         * For regular UI surfaces, such as **buttons and standard panels**, use `dangerBase` instead.
         */
        dangerMild    : adjustLightness(rootColors.danger   , colorParamVars.mild),
        
        /**
         * **Light mild color** - A content-heavy background color for floating UI elements over static dark backgrounds, such as images.  
         * Enhances **visual comfort and reduces eye strain**.
         * 
         * For regular UI surfaces, such as **buttons and standard panels**, use `lightBase` instead.
         */
        lightMild     : adjustLightness(rootColors.light    , colorParamVars.mild),
        
        /**
         * **Dark mild color** - A content-heavy background color for floating UI elements over static light backgrounds, such as images.  
         * Enhances **visual comfort and reduces eye strain**.
         * 
         * For regular UI surfaces, such as **buttons and standard panels**, use `darkBase` instead.
         */
        darkMild      : adjustLightness(rootColors.dark     , colorParamVars.mild),
    };
    
    
    
    // Foreground colors:
    
    /**
     * **Flip Colors** - Optimized foreground colors for contrast against regular backgrounds.
     * 
     * These colors are **derived from `rootColors`** and dynamically adjusted via `colorParamVars.flip`  
     * ensuring **strong contrast against `baseColors` backgrounds**.
     * 
     * ---
     * 
     * **How It Works:**
     * - **Brightness is determined** by extracting the lightness (`L`) element in OKLCH from the given theme  
     *   and comparing it against `colorParamVars.flipThreshold`.
     * - If the given theme is **relatively bright**, the text color is darkened to enhance readability.
     * - If the given theme is **relatively dark**, the text color is lightened to enhance readability.
     * - Each text color retains **a subtle tint** based on its theme for visual harmony.
     * - Designed for **text elements**, such as **buttons and standard panels**.
     * - For content-heavy texts, such as **articles and textboxes**, use `textColors` instead.
     */
    const flipColors = {
        /**
         * **Primary flip color** - A regular text color for primary UI elements.  
         * Ensures **strong contrast against `primaryBase` background**.
         * 
         * For content-heavy texts, such as **articles and textboxes**, use `primaryText` instead.
         */
        primaryFlip   : contrastFlip(rootColors.primary  , colorParamVars.flip),
        
        /**
         * **Secondary flip color** - A regular text color for complementing primary UI elements.  
         * Ensures **strong contrast against `secondaryBase` background**.
         * 
         * For content-heavy texts, such as **articles and textboxes**, use `secondaryText` instead.
         */
        secondaryFlip : contrastFlip(rootColors.secondary, colorParamVars.flip),
        
        /**
         * **Success flip color** - A regular text color for positive actions and confirmations.  
         * Ensures **strong contrast against `successBase` background**.
         * 
         * For content-heavy texts, such as **articles and textboxes**, use `successText` instead.
         */
        successFlip   : contrastFlip(rootColors.success  , colorParamVars.flip),
        
        /**
         * **Info flip color** - A regular text color for neutral alerts or general details.  
         * Ensures **strong contrast against `infoBase` background**.
         * 
         * For content-heavy texts, such as **articles and textboxes**, use `infoText` instead.
         */
        infoFlip      : contrastFlip(rootColors.info     , colorParamVars.flip),
        
        /**
         * **Warning flip color** - A regular text color for cautions or potential errors.  
         * Ensures **strong contrast against `warningBase` background**.
         * 
         * For content-heavy texts, such as **articles and textboxes**, use `warningText` instead.
         */
        warningFlip   : contrastFlip(rootColors.warning  , colorParamVars.flip),
        
        /**
         * **Danger flip color** - A regular text color for errors or destructive actions.  
         * Ensures **strong contrast against `dangerBase` background**.
         * 
         * For content-heavy texts, such as **articles and textboxes**, use `dangerText` instead.
         */
        dangerFlip    : contrastFlip(rootColors.danger   , colorParamVars.flip),
        
        /**
         * **Light flip color** - A regular text color for floating UI elements over static dark backgrounds, such as images.  
         * Ensures **strong contrast against `lightBase` background**.
         * 
         * For content-heavy texts, such as **articles and textboxes**, use `lightText` instead.
         */
        lightFlip     : contrastFlip(rootColors.light    , colorParamVars.flip),
        
        /**
         * **Dark flip color** - A regular text color for floating UI elements over static light backgrounds, such as images.  
         * Ensures **strong contrast against `darkBase` background**.
         * 
         * For content-heavy texts, such as **articles and textboxes**, use `darkText` instead.
         */
        darkFlip      : contrastFlip(rootColors.dark     , colorParamVars.flip),
    };
    
    /**
     * **Text Colors** - Optimized foreground colors for content-heavy readability.
     * 
     * These colors are **derived from `rootColors`** and dynamically adjusted via `colorParamVars.text`  
     * ensuring **comfortable contrast against `mildColors` backgrounds**.
     * 
     * ---
     * 
     * **How It Works:**
     * - `mildColors` backgrounds **align closely with the theme's brightness level**  
     *   (`colorParamVars.mild ≈ +0.7`), ensuring high readability.
     * - To maintain optimal contrast, `textColors` **apply a negative brightness adjustment**  
     *   (`colorParamVars.text ≈ -0.9`), enhancing legibility in both light and dark modes.
     * - This results in **dark text for light backgrounds** and **light text for dark backgrounds**,  
     *   with **a subtle tint** based on its theme for visual harmony.
     * - Designed for **content-heavy UI elements**, such as articles, textboxes, and dialogs.
     * - For regular UI texts, such as **buttons and standard panels**, use `flipColors` instead.
     */
    const textColors = {
        /**
         * **Primary text color** - A content-heavy text color for primary UI elements.  
         * Ensures **comfortable contrast against `primaryMild` background**.
         * 
         * For regular UI texts, such as **buttons and standard panels**, use `primaryFlip` instead.
         */
        primaryText   : adjustLightness(rootColors.primary  , colorParamVars.text),
        
        /**
         * **Secondary text color** - A content-heavy text color for complementing primary UI elements.  
         * Ensures **comfortable contrast against `secondaryMild` background**.
         * 
         * For regular UI texts, such as **buttons and standard panels**, use `secondaryFlip` instead.
         */
        secondaryText : adjustLightness(rootColors.secondary, colorParamVars.text),
        
        /**
         * **Success text color** - A content-heavy text color for positive actions and confirmations.  
         * Ensures **comfortable contrast against `successMild` background**.
         * 
         * For regular UI texts, such as **buttons and standard panels**, use `successFlip` instead.
         */
        successText   : adjustLightness(rootColors.success  , colorParamVars.text),
        
        /**
         * **Info text color** - A content-heavy text color for neutral alerts or general details.  
         * Ensures **comfortable contrast against `infoMild` background**.
         * 
         * For regular UI texts, such as **buttons and standard panels**, use `infoFlip` instead.
         */
        infoText      : adjustLightness(rootColors.info     , colorParamVars.text),
        
        /**
         * **Warning text color** - A content-heavy text color for cautions or potential errors.  
         * Ensures **comfortable contrast against `warningMild` background**.
         * 
         * For regular UI texts, such as **buttons and standard panels**, use `warningFlip` instead.
         */
        warningText   : adjustLightness(rootColors.warning  , colorParamVars.text),
        
        /**
         * **Danger text color** - A content-heavy text color for errors or destructive actions.  
         * Ensures **comfortable contrast against `dangerMild` background**.
         * 
         * For regular UI texts, such as **buttons and standard panels**, use `dangerFlip` instead.
         */
        dangerText    : adjustLightness(rootColors.danger   , colorParamVars.text),
        
        /**
         * **Light text color** - A content-heavy text color for floating UI elements over static dark backgrounds, such as images.  
         * Ensures **comfortable contrast against `lightMild` background**.
         * 
         * For regular UI texts, such as **buttons and standard panels**, use `lightFlip` instead.
         */
        lightText     : adjustLightness(rootColors.light    , colorParamVars.text),
        
        /**
         * **Dark text color** - A content-heavy text color for floating UI elements over static light backgrounds, such as images.  
         * Ensures **comfortable contrast against `darkMild` background**.
         * 
         * For regular UI texts, such as **buttons and standard panels**, use `darkFlip` instead.
         */
        darkText      : adjustLightness(rootColors.dark     , colorParamVars.text),
    };
    
    /**
     * **Face Colors** - High contrast foreground colors for backgroundless themed UI elements.
     * 
     * These colors are **derived from `rootColors`** and dynamically adjusted via `colorParamVars.face`  
     * ensuring **clear visibility while preserving background transparency**.
     * 
     * ---
     * 
     * **Usage Notes:**
     * - Ideal for **backgroundless texts**, such as outlined UI texts and icons.
     * - Applied when **backgrounds are transparent**, allowing underlying images or content to remain visible.
     * - Provides **sharp contrast** for outlined elements without overwhelming the design.
     * - Each text color retains **a subtle tint** based on its theme for visual consistency.
     * - For texts with opaque backgrounds, use `flipColors` or `textColors` instead.
     */
    const faceColors = {
        /**
         * **Primary face color** - A backgroundless text color for primary UI elements.  
         * Ensures **clear visibility while preserving background transparency**.
         * 
         * For texts with opaque backgrounds, use `primaryFlip` or `primaryText` instead.
         */
        primaryFace   : adjustLightness(rootColors.primary  , colorParamVars.face),
        
        /**
         * **Secondary face color** - A backgroundless text color for complementing primary UI elements.  
         * Ensures **clear visibility while preserving background transparency**.
         * 
         * For texts with opaque backgrounds, use `secondaryFlip` or `secondaryText` instead.
         */
        secondaryFace : adjustLightness(rootColors.secondary, colorParamVars.face),
        
        /**
         * **Success face color** - A backgroundless text color for positive actions and confirmations.  
         * Ensures **clear visibility while preserving background transparency**.
         * 
         * For texts with opaque backgrounds, use `successFlip` or `successText` instead.
         */
        successFace   : adjustLightness(rootColors.success  , colorParamVars.face),
        
        /**
         * **Info face color** - A backgroundless text color for neutral alerts or general details.  
         * Ensures **clear visibility while preserving background transparency**.
         * 
         * For texts with opaque backgrounds, use `infoFlip` or `infoText` instead.
         */
        infoFace      : adjustLightness(rootColors.info     , colorParamVars.face),
        
        /**
         * **Warning face color** - A backgroundless text color for cautions or potential errors.  
         * Ensures **clear visibility while preserving background transparency**.
         * 
         * For texts with opaque backgrounds, use `warningFlip` or `warningText` instead.
         */
        warningFace   : adjustLightness(rootColors.warning  , colorParamVars.face),
        
        /**
         * **Danger face color** - A backgroundless text color for errors or destructive actions.  
         * Ensures **clear visibility while preserving background transparency**.
         * 
         * For texts with opaque backgrounds, use `dangerFlip` or `dangerText` instead.
         */
        dangerFace    : adjustLightness(rootColors.danger   , colorParamVars.face),
        
        /**
         * **Light face color** - A backgroundless text color for floating UI elements over static dark backgrounds, such as images.  
         * Ensures **clear visibility while preserving background transparency**.
         * 
         * For texts with opaque backgrounds, use `lightFlip` or `lightText` instead.
         */
        lightFace     : adjustLightness(rootColors.light    , colorParamVars.face),
        
        /**
         * **Dark face color** - A backgroundless text color for floating UI elements over static light backgrounds, such as images.  
         * Ensures **clear visibility while preserving background transparency**.
         * 
         * For texts with opaque backgrounds, use `darkFlip` or `darkText` instead.
         */
        darkFace      : adjustLightness(rootColors.dark     , colorParamVars.face),
    };
    
    
    
    // Border colors:
    
    /**
     * **Bold Colors** - High contrast borders for regular themed UI elements.
     * 
     * These colors are **derived from `rootColors`** and dynamically adjusted via `colorParamVars.bold`  
     * ensuring **strong visual separation between UI elements**.
     * 
     * ---
     * 
     * **Usage Notes:**
     * - Ideal for **high-visibility UI borders**, such as buttons and panels.
     * - Designed to **reinforce visual hierarchy**, making key UI components stand out.
     * - Provides **sharp contrast**, ensuring important elements are well-defined.
     * - Each border color retains **a subtle tint** based on its theme for visual harmony.
     * - For content-heavy borders, such as **articles and textboxes**, use `thinColors` instead.
     */
    const boldColors = {
        /**
         * **Primary bold color** - A regular border color for primary UI elements.  
         * Ensures **strong visual separation between UI elements**.
         * 
         * For content-heavy borders, such as **articles and textboxes**, use `primaryThin` instead.
         */
        primaryBold   : adjustLightness(rootColors.primary  , colorParamVars.bold),
        
        /**
         * **Secondary bold color** - A regular border color for complementing primary UI elements.  
         * Ensures **strong visual separation between UI elements**.
         * 
         * For content-heavy borders, such as **articles and textboxes**, use `secondaryThin` instead.
         */
        secondaryBold : adjustLightness(rootColors.secondary, colorParamVars.bold),
        
        /**
         * **Success bold color** - A regular border color for positive actions and confirmations.  
         * Ensures **strong visual separation between UI elements**.
         * 
         * For content-heavy borders, such as **articles and textboxes**, use `successThin` instead.
         */
        successBold   : adjustLightness(rootColors.success  , colorParamVars.bold),
        
        /**
         * **Info bold color** - A regular border color for neutral alerts or general details.  
         * Ensures **strong visual separation between UI elements**.
         * 
         * For content-heavy borders, such as **articles and textboxes**, use `infoThin` instead.
         */
        infoBold      : adjustLightness(rootColors.info     , colorParamVars.bold),
        
        /**
         * **Warning bold color** - A regular border color for cautions or potential errors.  
         * Ensures **strong visual separation between UI elements**.
         * 
         * For content-heavy borders, such as **articles and textboxes**, use `warningThin` instead.
         */
        warningBold   : adjustLightness(rootColors.warning  , colorParamVars.bold),
        
        /**
         * **Danger bold color** - A regular border color for errors or destructive actions.  
         * Ensures **strong visual separation between UI elements**.
         * 
         * For content-heavy borders, such as **articles and textboxes**, use `dangerThin` instead.
         */
        dangerBold    : adjustLightness(rootColors.danger   , colorParamVars.bold),
        
        /**
         * **Light bold color** - A regular border color for floating UI elements over static dark backgrounds, such as images.  
         * Ensures **strong visual separation between UI elements**.
         * 
         * For content-heavy borders, such as **articles and textboxes**, use `lightThin` instead.
         */
        lightBold     : adjustLightness(rootColors.light    , colorParamVars.bold),
        
        /**
         * **Dark bold color** - A regular border color for floating UI elements over static light backgrounds, such as images.  
         * Ensures **strong visual separation between UI elements**.
         * 
         * For content-heavy borders, such as **articles and textboxes**, use `darkThin` instead.
         */
        darkBold      : adjustLightness(rootColors.dark     , colorParamVars.bold),
    };
    
    /**
     * **Thin Colors** - Soft contrast borders for content-heavy themed UI elements.
     * 
     * These colors are **derived from `rootColors`** and dynamically adjusted via `colorParamVars.thin`  
     * ensuring **gentle visual separation between UI elements**.
     * 
     * ---
     * 
     * **Usage Notes:**
     * - Ideal for **content borders**, such as articles, text fields, and dialogs.
     * - Designed to **blend naturally** with mild-themed backgrounds.
     * - Provides **subtle separation** between UI elements without overwhelming contrast.
     * - Each border color retains **a subtle tint** based on its theme for visual harmony.
     * - For regular UI borders, such as **buttons and standard panels**, use `boldColors` instead.
     */
    const thinColors = {
        /**
         * **Primary thin color** - A content-heavy border color for primary UI elements.  
         * Ensures **gentle visual separation between UI elements**.
         * 
         * For regular UI borders, such as **buttons and standard panels**, use `primaryBold` instead.
         */
        primaryThin   : adjustLightness(rootColors.primary  , colorParamVars.thin),
        
        /**
         * **Secondary thin color** - A content-heavy border color for complementing primary UI elements.  
         * Ensures **gentle visual separation between UI elements**.
         * 
         * For regular UI borders, such as **buttons and standard panels**, use `secondaryBold` instead.
         */
        secondaryThin : adjustLightness(rootColors.secondary, colorParamVars.thin),
        
        /**
         * **Success thin color** - A content-heavy border color for positive actions and confirmations.  
         * Ensures **gentle visual separation between UI elements**.
         * 
         * For regular UI borders, such as **buttons and standard panels**, use `successBold` instead.
         */
        successThin   : adjustLightness(rootColors.success  , colorParamVars.thin),
        
        /**
         * **Info thin color** - A content-heavy border color for neutral alerts or general details.  
         * Ensures **gentle visual separation between UI elements**.
         * 
         * For regular UI borders, such as **buttons and standard panels**, use `infoBold` instead.
         */
        infoThin      : adjustLightness(rootColors.info     , colorParamVars.thin),
        
        /**
         * **Warning thin color** - A content-heavy border color for cautions or potential errors.  
         * Ensures **gentle visual separation between UI elements**.
         * 
         * For regular UI borders, such as **buttons and standard panels**, use `warningBold` instead.
         */
        warningThin   : adjustLightness(rootColors.warning  , colorParamVars.thin),
        
        /**
         * **Danger thin color** - A content-heavy border color for errors or destructive actions.  
         * Ensures **gentle visual separation between UI elements**.
         * 
         * For regular UI borders, such as **buttons and standard panels**, use `dangerBold` instead.
         */
        dangerThin    : adjustLightness(rootColors.danger   , colorParamVars.thin),
        
        /**
         * **Light thin color** - A content-heavy border color for floating UI elements over static dark backgrounds, such as images.  
         * Ensures **gentle visual separation between UI elements**.
         * 
         * For regular UI borders, such as **buttons and standard panels**, use `lightBold` instead.
         */
        lightThin     : adjustLightness(rootColors.light    , colorParamVars.thin),
        
        /**
         * **Dark thin color** - A content-heavy border color for floating UI elements over static light backgrounds, such as images.  
         * Ensures **gentle visual separation between UI elements**.
         * 
         * For regular UI borders, such as **buttons and standard panels**, use `darkBold` instead.
         */
        darkThin      : adjustLightness(rootColors.dark     , colorParamVars.thin),
    };
    
    /**
     * **Edge Colors** - High contrast borders for backgroundless themed UI elements.
     * 
     * These colors are **derived from `rootColors`** and dynamically adjusted via `colorParamVars.edge`  
     * ensuring **clear outlines while preserving background transparency**.
     * 
     * ---
     * 
     * **Usage Notes:**
     * - Ideal for **outlined UI borders**, such as buttons, floating panels, and overlays.
     * - Applied when **backgrounds are transparent**, allowing underlying images or content to remain visible.
     * - Provides **sharp contrast** for outlined elements without overwhelming the design.
     * - Each border color retains **a vivid hue** based on its theme for visual consistency.
     * - For borders with opaque backgrounds, use `boldColors` or `thinColors` instead.
     */
    const edgeColors = {
        /**
         * **Primary edge color** - A backgroundless border color for primary UI elements.  
         * Ensures **clear outlines while preserving background transparency**.
         * 
         * For borders with opaque backgrounds, use `primaryBold` or `primaryThin` instead.
         */
        primaryEdge   : adjustLightness(rootColors.primary  , colorParamVars.edge),
        
        /**
         * **Secondary edge color** - A backgroundless border color for complementing primary UI elements.  
         * Ensures **clear outlines while preserving background transparency**.
         * 
         * For borders with opaque backgrounds, use `secondaryBold` or `secondaryThin` instead.
         */
        secondaryEdge : adjustLightness(rootColors.secondary, colorParamVars.edge),
        
        /**
         * **Success edge color** - A backgroundless border color for positive actions and confirmations.  
         * Ensures **clear outlines while preserving background transparency**.
         * 
         * For borders with opaque backgrounds, use `successBold` or `successThin` instead.
         */
        successEdge   : adjustLightness(rootColors.success  , colorParamVars.edge),
        
        /**
         * **Info edge color** - A backgroundless border color for neutral alerts or general details.  
         * Ensures **clear outlines while preserving background transparency**.
         * 
         * For borders with opaque backgrounds, use `infoBold` or `infoThin` instead.
         */
        infoEdge      : adjustLightness(rootColors.info     , colorParamVars.edge),
        
        /**
         * **Warning edge color** - A backgroundless border color for cautions or potential errors.  
         * Ensures **clear outlines while preserving background transparency**.
         * 
         * For borders with opaque backgrounds, use `warningBold` or `warningThin` instead.
         */
        warningEdge   : adjustLightness(rootColors.warning  , colorParamVars.edge),
        
        /**
         * **Danger edge color** - A backgroundless border color for errors or destructive actions.  
         * Ensures **clear outlines while preserving background transparency**.
         * 
         * For borders with opaque backgrounds, use `dangerBold` or `dangerThin` instead.
         */
        dangerEdge    : adjustLightness(rootColors.danger   , colorParamVars.edge),
        
        /**
         * **Light edge color** - A backgroundless border color for floating UI elements over static dark backgrounds, such as images.  
         * Ensures **clear outlines while preserving background transparency**.
         * 
         * For borders with opaque backgrounds, use `lightBold` or `lightThin` instead.
         */
        lightEdge     : adjustLightness(rootColors.light    , colorParamVars.edge),
        
        /**
         * **Dark edge color** - A backgroundless border color for floating UI elements over static light backgrounds, such as images.  
         * Ensures **clear outlines while preserving background transparency**.
         * 
         * For borders with opaque backgrounds, use `darkBold` or `darkThin` instead.
         */
        darkEdge      : adjustLightness(rootColors.dark     , colorParamVars.edge),
    };
    
    
    
    // Effect colors:
    
    /**
     * **Soft Colors** - Transparent overlay effects for UI emphasis.
     * 
     * These colors are **derived from `rootColors`** and dynamically adjusted via `colorParamVars.soft`  
     * providing **visual focus and draws attention to surrounding elements**.
     * 
     * ---
     * 
     * **Usage Notes:**
     * - Ideal for **ring-focus indicators**, background glows, or subtle overlays.
     * - Designed to be **lighter and more transparent** than standard base colors.
     * - Helps **maintain visual depth** without overwhelming contrast.
     * - Each effect color retains **a soft tint** based on its theme for visual harmony.
     */
    const softColors = {
        /**
         * **Primary soft color** - An effect color for primary UI elements.  
         * Provides **visual focus and draws attention to surrounding elements**.
         */
        primarySoft   : adjustOpacity(rootColors.primary  , colorParamVars.soft),
        
        /**
         * **Secondary soft color** - An effect color for complementing primary UI elements.  
         * Provides **visual focus and draws attention to surrounding elements**.
         */
        secondarySoft : adjustOpacity(rootColors.secondary, colorParamVars.soft),
        
        /**
         * **Success soft color** - An effect color for positive actions and confirmations.  
         * Provides **visual focus and draws attention to surrounding elements**.
         */
        successSoft   : adjustOpacity(rootColors.success  , colorParamVars.soft),
        
        /**
         * **Info soft color** - An effect color for neutral alerts or general details.  
         * Provides **visual focus and draws attention to surrounding elements**.
         */
        infoSoft      : adjustOpacity(rootColors.info     , colorParamVars.soft),
        
        /**
         * **Warning soft color** - An effect color for cautions or potential errors.  
         * Provides **visual focus and draws attention to surrounding elements**.
         */
        warningSoft   : adjustOpacity(rootColors.warning  , colorParamVars.soft),
        
        /**
         * **Danger soft color** - An effect color for errors or destructive actions.  
         * Provides **visual focus and draws attention to surrounding elements**.
         */
        dangerSoft    : adjustOpacity(rootColors.danger   , colorParamVars.soft),
        
        /**
         * **Light soft color** - An effect color for floating UI elements over static dark backgrounds, such as images.  
         * Provides **visual focus and draws attention to surrounding elements**.
         */
        lightSoft     : adjustOpacity(rootColors.light    , colorParamVars.soft),
        
        /**
         * **Dark soft color** - An effect color for floating UI elements over static light backgrounds, such as images.  
         * Provides **visual focus and draws attention to surrounding elements**.
         */
        darkSoft      : adjustOpacity(rootColors.dark     , colorParamVars.soft),
    };
    
    
    
    // Merge all colors definitions:
    return {
        // Constants:
        ...commonColors,
        ...rootColors,
        
        
        
        // Background colors:
        ...baseColors,
        ...mildColors,
        
        
        
        // Foreground colors:
        ...flipColors,
        ...textColors,
        ...faceColors,
        
        
        
        // Border colors:
        ...boldColors,
        ...thinColors,
        ...edgeColors,
        
        
        
        // Effect colors:
        ...softColors,
    };
}, { prefix: 'col' });

/**
 * A `Refs<>` object represents CSS variables mapped to a color system, allowing dynamic adjustments through JavaScript.
 * These values should **not be manually modified outside this system**, as they are managed by `cssConfig()`.
 * 
 * ---
 * 
 * ### **Usage**
 * - **Getter:** Retrieves the CSS variable reference.
 *   ```ts
 *   const value = colorVars.blue; // → "var(--col-blue)"
 *   ```
 * - **Setter:** Assigns a value (bare or expression).
 *   ```ts
 *   colorVars.myColor = "oklch(0.45 0.30 264)"; // Generates → "--col-myColor: oklch(0.45 0.30 264);"
 *   ```
 *   ```ts
 *   colorVars.myExpression = [[
 *      "oklch(from", colorVars.blue, " l c h / clamp(0.05, alpha * (1 + ", colorParamVars.soft, "), 1))"
 *   ]]; // Generates → "--col-myExpression: oklch(from var(--col-blue) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));"
 *   ```
 * - **Deleting a Variable:**  
 *   Can be removed using any of the following:
 *   ```ts
 *   delete colorVars.myColor;
 *   colorVars.myColor = null;
 *   colorVars.myColor = undefined;
 *   ```
 * - **Expression Handling:**  
 *   The **cssfn library** processes values inside **single square brackets** (`[...]`) using `.join(', ')`,  
 *   and processes **double square brackets** (`[[...]]`) using `.join('')`.  
 *   In this case, we use **double brackets** for color-related expressions.
 * - **Example Rendered CSS Variables:**
 *   ```css
 *   :root {
 *       --col-blue: oklch(0.58 0.228 260);
 *       --col-indigo: oklch(0.49 0.278 287);
 *       --col-purple: oklch(0.50 0.188 295);
 *       --col-pink: oklch(0.60 0.209 355);
 *       ............
 *       --col-warningSoft: oklch(from var(--col-warning) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *       --col-dangerSoft: oklch(from var(--col-danger) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *       --col-lightSoft: oklch(from var(--col-light) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *       --col-darkSoft: oklch(from var(--col-dark) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *       --col-myColor: oklch(0.45 0.30 264);
 *       --col-myExpression: oklch(from var(--col-blue) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *   }
 *   ```
 */
export const colorVars        = config[0];

/**
 * A `Vals<>` object represents **structured CSS expressions**, allowing direct retrieval and modification.
 * These values are **not precomputed** but instead represent formula-driven expressions.
 * These values should **not be manually modified outside this system**, as they are managed by `cssConfig()`.
 * 
 * ---
 * 
 * ### **Usage**
 * - **Getter:** Retrieves the assembled CSS expression.
 *   ```ts
 *   const expression = colorExpressions.primaryBase; // →  [[ "oklch(from ", "var(--col-primary)", " calc(((1 - max(", "var(--col-p-base)", ", (0 - ", "var(--col-p-base)", "))) * l) + (1 - min(1, (1 - (", "var(--col-p-base)", " * ", "var(--col-p-mode)", "))))) calc((1 - max(", "var(--col-p-base)", ", (0 - ", "var(--col-p-base)", "))) * c) h / alpha)" ]]
 *   ```
 * - **Setter:** Assigns a value (bare or expression).
 *   ```ts
 *   colorExpressions.myColor = "oklch(0.45 0.30 264)"; // Generates → "--col-myColor: oklch(0.45 0.30 264);"
 *   ```
 *   ```ts
 *   colorExpressions.myExpression = [[
 *      "oklch(from", colorVars.blue, " l c h / clamp(0.05, alpha * (1 + ", colorParamVars.soft, "), 1))"
 *   ]]; // Generates → "--col-myExpression: oklch(from var(--col-blue) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));"
 *   ```
 * - **Deleting a Variable:**  
 *   Can be removed using any of the following:
 *   ```ts
 *   delete colorExpressions.myColor;
 *   colorExpressions.myColor = null;
 *   colorExpressions.myColor = undefined;
 *   ```
 * - **Expression Handling:**  
 *   The **cssfn library** processes values inside **single square brackets** (`[...]`) using `.join(', ')`,  
 *   and processes **double square brackets** (`[[...]]`) using `.join('')`.  
 *   In this case, we use **double brackets** for color-related expressions.
 * - **Example Rendered CSS Variables:**
 *   ```css
 *   :root {
 *       --col-blue: oklch(0.58 0.228 260);
 *       --col-indigo: oklch(0.49 0.278 287);
 *       --col-purple: oklch(0.50 0.188 295);
 *       --col-pink: oklch(0.60 0.209 355);
 *       ............
 *       --col-warningSoft: oklch(from var(--col-warning) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *       --col-dangerSoft: oklch(from var(--col-danger) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *       --col-lightSoft: oklch(from var(--col-light) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *       --col-darkSoft: oklch(from var(--col-dark) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *       --col-myColor: oklch(0.45 0.30 264);
 *       --col-myExpression: oklch(from var(--col-blue) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *   }
 *   ```
 */
export const colorExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages settings related to **CSS variables for color system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 *   Defines the prefix used for all color parameter variables.
 *   ```ts
 *   colorSettings.prefix = 'col';
 *   ```
 * - **Selector Scope:**  
 *   Ensures all parameters are applied inside `:root`.
 *   ```ts
 *   colorSettings.selector = ':root';
 *   ```
 * - **Change Listener:**  
 *   Detects updates and responds dynamically.
 *   ```ts
 *   colorSettings.onChange.subscribe({
 *       next: () => {
 *           console.log("Color system updated!");
 *       },
 *   });
 *   ```
 * - **Example Rendered CSS Variables:**
 *   ```css
 *   :root {
 *       --col-blue: oklch(0.58 0.228 260);
 *       --col-indigo: oklch(0.49 0.278 287);
 *       --col-purple: oklch(0.50 0.188 295);
 *       --col-pink: oklch(0.60 0.209 355);
 *       ............
 *       --col-warningSoft: oklch(from var(--col-warning) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *       --col-dangerSoft: oklch(from var(--col-danger) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *       --col-lightSoft: oklch(from var(--col-light) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *       --col-darkSoft: oklch(from var(--col-dark) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *   }
 *   ```
 */
export const colorSettings    = config[2];



export {
    colorVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `colorVars` instead.
 */
export const colors         = colorVars;

/**
 * @deprecated Use `colorExpressions` instead.
 */
export const colorValues    = colorExpressions;

/**
 * @deprecated Use `colorSettings` instead.
 */
export const colorConfig    = colorSettings;

/**
 * @deprecated Use `colorSettings` instead.
 */
export const cssColorConfig = colorSettings;
