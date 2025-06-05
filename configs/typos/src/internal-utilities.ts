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
 * Defines the configuration for creating a dynamic typography mount.
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
 * Creates a dynamically updatable typography stylesheet.
 * 
 * @param config Configuration object containing the `id` and `importPath`.
 * @returns A mount function that handles dynamic stylesheet activation.
 */
export const createTypographyMount = (config: TypographyMountConfig) => {
    // Configs:
    const {
        id,
        importFactory,
    } = config;
    
    
    
    // Create a subscribable object for dynamic updates:
    let dynamicStylesheet = new Subject<boolean>();
    const stylesheetSubscription : Subscribable<StyleSheetsFactory<''> | boolean> = {
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
            
            
            
            // Subscribe to future updates:
            return dynamicStylesheet.subscribe({
                next: (update) => {
                    // Ensure the observer is actively listening:
                    if (!observer.next) return;
                    
                    
                    
                    // Forward incoming updates:
                    observer.next(update);
                },
            });
        },
    };
    
    
    
    // Register a dynamically updatable stylesheet:
    styleSheets(
        stylesheetSubscription
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
        if (activeInstances === 1) dynamicStylesheet.next(true);
        
        
        
        return {
            /**
             * Unmounts the typography stylesheet.
             */
            unmount: (): void => {
                // Decrease the active usage counter:
                activeInstances--;
                
                
                
                // Disable stylesheet when the last instance is unmounted:
                if (activeInstances === 0) dynamicStylesheet.next(false);
            },
        };
    };
};
