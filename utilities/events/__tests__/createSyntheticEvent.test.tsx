import {
    createSyntheticEvent,
} from '../dist/index.js'
import { default as React } from 'react'
import { render, fireEvent, screen } from '@testing-library/react'



/**
 * Compares two event objects and logs differences if any.
 * 
 * @param originalEvent The React SyntheticEvent.
 * @param compatibleEvent The manually created synthetic event.
 */
export const expectEqualEvent = (originalEvent: React.SyntheticEvent<Element, Event>, compatibleEvent: React.SyntheticEvent<Element, Event>): void => {
    const filterInternalProps = (props: string[]) =>
        props.filter(prop => !prop.startsWith('_') && prop !== 'isPersistent' && prop !== 'eventPhase' && !(prop in Object.prototype)); // Exclude React internals
    
    const originalProps = [
        ...filterInternalProps(Object.getOwnPropertyNames(originalEvent)),
        ...filterInternalProps(Object.getOwnPropertyNames(Object.getPrototypeOf(originalEvent))), // Include prototype methods
    ];
    const compatibleProps = [
        ...filterInternalProps(Object.getOwnPropertyNames(compatibleEvent)),
        ...filterInternalProps(Object.getOwnPropertyNames(Object.getPrototypeOf(compatibleEvent))), // Include prototype methods
    ];
    
    // Find missing or extra properties
    const missingProps = originalProps.filter(prop => !compatibleProps.includes(prop));
    const extraProps = compatibleProps.filter(prop => !originalProps.includes(prop));
    
    expect(missingProps).toEqual([]); // Ensure no missing properties
    expect(extraProps).toEqual([]); // Ensure no extra properties
    
    // Compare property values
    originalProps.forEach(prop => {
        const originalValue = typeof originalEvent[prop as keyof React.SyntheticEvent<Element, Event>] === 'function'
            ? prop === 'getModifierState'
                ? (originalEvent[prop as keyof React.SyntheticEvent<Element, Event>] as Function)('Shift') // 'Shift' used as a test key
                : (originalEvent[prop as keyof React.SyntheticEvent<Element, Event>] as Function)()
            : originalEvent[prop as keyof React.SyntheticEvent<Element, Event>];
        
        const compatibleValue = typeof compatibleEvent[prop as keyof React.SyntheticEvent<Element, Event>] === 'function'
            ? prop === 'getModifierState'
                ? (compatibleEvent[prop as keyof React.SyntheticEvent<Element, Event>] as Function)('Shift') // 'Shift' used as a test key
                : (compatibleEvent[prop as keyof React.SyntheticEvent<Element, Event>] as Function)()
            : compatibleEvent[prop as keyof React.SyntheticEvent<Element, Event>];
        
        // Explicitly log property name if mismatched before failing the test
        if (originalValue !== compatibleValue) {
            console.error(`Mismatch in property: ${prop}`, {
                original: originalValue,
                compatible: compatibleValue,
            });
        }
        
        expect(originalValue).toEqual(compatibleValue); // Enforces strict equality checks
    });
};



describe('Synthetic Error Event Comparison', () => {
    it('should validate React SyntheticEvent against a manually created synthetic event', () => {
        // Store captured React SyntheticEvent reference
        let syntheticErrorEvent: React.SyntheticEvent<HTMLImageElement, Event> | null = null;
        
        // Render an image with an onError handler to capture the event
        render(
            <img
                src='__invalid__.jpg'
                alt='Invalid image'
                onError={(event) => {
                    syntheticErrorEvent = event; // Capture React SyntheticEvent
                }}
            />
        );
        
        // Get image reference
        const imgElement = screen.getByRole('img');
        
        // Simulate image load failure by triggering an error event
        fireEvent.error(imgElement);
        
        // Ensure the SyntheticEvent was captured
        expect(syntheticErrorEvent).not.toBeNull();
        
        if (syntheticErrorEvent) {
            // Extract native event from React SyntheticEvent
            const nativeErrorEvent = (syntheticErrorEvent as any).nativeEvent;
            
            // Create a matching synthetic event manually
            const customSyntheticErrorEvent = createSyntheticEvent<HTMLImageElement, Event>({
                nativeEvent: nativeErrorEvent,
            });
            
            // Compare React's SyntheticEvent with the manually created synthetic event
            expectEqualEvent(syntheticErrorEvent, customSyntheticErrorEvent);
        }
    });
});
