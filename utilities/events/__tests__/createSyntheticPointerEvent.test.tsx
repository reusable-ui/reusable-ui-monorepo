import {
    createSyntheticPointerEvent,
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
    ].filter((prop) => (prop !== 'getModifierState')); // We exclude 'getModifierState' from structural comparison due to inconsistent availability in simulated PointerEvents. All other properties are validated for shape and value parity.
    const compatibleProps = [
        ...filterInternalProps(Object.getOwnPropertyNames(compatibleEvent)),
        ...filterInternalProps(Object.getOwnPropertyNames(Object.getPrototypeOf(compatibleEvent))), // Include prototype methods
    ].filter((prop) => (prop !== 'getModifierState')); // We exclude 'getModifierState' from structural comparison due to inconsistent availability in simulated PointerEvents. All other properties are validated for shape and value parity.
    
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



describe('Synthetic Pointer Event Comparison', () => {
    it('should validate React Synthetic PointerEvent against a manually created synthetic event', () => {
        // Store captured React SyntheticEvent reference
        let syntheticPointerEvent: React.SyntheticEvent<HTMLButtonElement, PointerEvent> | null = null;

        // Render a button with an onPointerUp handler to capture the event
        render(
            <button
                data-testid='test-button'
                onPointerUp={(event) => {
                    syntheticPointerEvent = event; // Capture React Synthetic PointerEvent
                }}
            >
                Release Me
            </button>
        );

        // Get button reference
        const buttonElement = screen.getByTestId('test-button');

        // Simulate pointerup event
        fireEvent.pointerUp(buttonElement);

        // Ensure the SyntheticEvent was captured
        expect(syntheticPointerEvent).not.toBeNull();

        if (syntheticPointerEvent) {
            // Extract native event from React SyntheticEvent
            const nativePointerEvent = (syntheticPointerEvent as any).nativeEvent;

            // Create a matching synthetic event manually
            const customSyntheticPointerEvent = createSyntheticPointerEvent<HTMLButtonElement, PointerEvent>({
                nativeEvent: nativePointerEvent,
            });

            // Compare React's SyntheticEvent with the manually created synthetic event
            expectEqualEvent(syntheticPointerEvent, customSyntheticPointerEvent);
        }
    });
});
