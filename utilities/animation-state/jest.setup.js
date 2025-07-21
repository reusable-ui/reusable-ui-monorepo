global.AnimationEvent = class AnimationEvent extends Event {
    constructor(type, eventInitDict) {
        super(type, eventInitDict);
        this.animationName = eventInitDict?.animationName ?? '';
    }
};
