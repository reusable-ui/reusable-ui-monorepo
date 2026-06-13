// Cssfn:
import {
    // Cssfn properties:
    type CssScopeList,
    
    
    
    // Writes css in javascript:
    type StyleSheetsFactory,
    styleSheets,
}                           from '@cssfn/core'          // Writes css in javascript.

// Other libs:
import {
    // Subscriptions:
    type Subscribable,
    Subject,
}                           from 'rxjs'



/**
 * Defines a configuration object for mounting a typography stylesheet.
 */
export interface TypographyMountConfig {
    /**
     * A unique salt for SSR support, ensuring consistent class names across server and client.
     */
    id            : string
    
    /** Factory function that returns the import statement for the typography stylesheet. */
    importFactory : () => Promise<{ default: CssScopeList<''> }>
}

/**
 * Creates a mount function for a typography stylesheet, allowing dynamic activation based on component usage.
 * 
 * @param config Configuration object containing the `id` and `importPath`.
 * @returns A function that mounts the typography stylesheet when invoked, and returns an object with an `unmount` method to deactivate it.
 */
export const createTypographyMount = (config: TypographyMountConfig) => {
    // Configs:
    const {
        id,
        importFactory,
    } = config;
    
    
    
    // Create a live stylesheet that can be enabled or disabled based on active usage:
    const enabledSignal = new Subject<boolean>();
    const liveStylesheet : Subscribable<StyleSheetsFactory<''> | boolean> = {
        subscribe : (observer) => {
            // Immediately push the style:
            // Ensure the observer is actively listening:
            if (observer.next) {
                observer.next(
                    // Lazily import the stylesheet, loading only when needed:
                    importFactory
                    /*
                        Sample of rendered stylesheet:
                        ```css
                        :root {
                            font-style: var(--typ-fontStyle);
                            text-decoration: var(--typ-textDecoration);
                            overflow-wrap: var(--typ-overflowWrap);
                            font-size: var(--typ-fontSize);
                            font-family: var(--typ-fontFamily);
                            font-weight: var(--typ-fontWeight);
                            line-height: var(--typ-lineHeight);
                        }
                        ```
                    */
                );
            } // if
            
            
            
            // Subscribe to future enabled/disabled updates:
            return enabledSignal.subscribe({
                next: (enabled) => {
                    // Ensure the observer is actively listening:
                    if (!observer.next) return;
                    
                    
                    
                    // Forward incoming enabled/disabled updates:
                    observer.next(enabled);
                },
            });
        },
    };
    
    
    
    // Register the live stylesheet, initially disabled:
    styleSheets(
        liveStylesheet
    , { id, enabled: false });
    
    
    
    // Expose activation and deactivation:
    
    /**
     * Tracks the number of components actively using this stylesheet.
     */
    let activeInstances = 0;
    
    /**
     * Mounts the typography stylesheet.
     */
    return () => {
        // Increase the active usage counter:
        activeInstances++;
        
        
        
        // Enable stylesheet when the first instance is mounted:
        if (activeInstances === 1) enabledSignal.next(true);
        
        
        
        return {
            /**
             * Unmounts the typography stylesheet.
             */
            unmount: (): void => {
                // Decrease the active usage counter:
                activeInstances--;
                
                
                
                // Disable stylesheet when the last instance is unmounted:
                if (activeInstances === 0) enabledSignal.next(false);
            },
        };
    };
};
