// hooks:

// variants:

//#region ModalSideVariant
export type ModalSideStyle = 'inlineStart'|'inlineEnd'|'blockStart'|'blockEnd' // might be added more styles in the future
export interface ModalSideVariant {
    modalSideStyle : ModalSideStyle // required prop
}
export const useModalSideVariant = ({ modalSideStyle }: ModalSideVariant) => {
    return {
        class : modalSideStyle,
    };
};
//#endregion ModalSideVariant
