export const broadcastClearEvent = (currentRadio: HTMLInputElement, selectedRadio: HTMLInputElement|null = currentRadio): void => {
    const name        = currentRadio.name;
    const parentGroup = currentRadio.closest('form') ?? document.body;
    if (parentGroup) {
        // after <currentRadio> finishes rendering => un-check (clear) the other checked radio (within the same name at the same <form>):
        Promise.resolve().then(() => { // trigger the event after the next microtask, allowing the browser to update the `validityState` of the buddy <Radio>s and other properties before the event is handled by buddy <Radio>s.
            for (const radio of (Array.from(parentGroup.querySelectorAll('input[type="radio"]')) as HTMLInputElement[])) {
                if (radio === currentRadio) continue; // <radio> is self => skip
                if (radio.name !== name)    continue; // <radio>'s name is different to us => skip
                
                
                
                // fire a custom `onClear` event to notify other <Radio>(s) to *uncheck*:
                const customEvent = new CustomEvent('clear', { bubbles: true, detail: { selected: selectedRadio } });
                radio.dispatchEvent(customEvent); // needs to bubble to support <EditableControl> => `inputValidator.handleChange()`
            } // for
        });
    } // if
}