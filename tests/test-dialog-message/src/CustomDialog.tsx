import { Button, CardBody, CardHeader, ModalCard, ModalCardProps, ModalExpandedChangeWithAnswerEvent } from '@reusable-ui/components'



export interface CustomDialogProps extends ModalCardProps<HTMLElement, ModalExpandedChangeWithAnswerEvent<'yessMase'>> {}
export const CustomDialog = (props: CustomDialogProps): JSX.Element|null => {
    // jsx:
    return (
        <ModalCard
            {...props}
        >
            <CardHeader>
                <h1>Hello World</h1>
            </CardHeader>
            <CardBody>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, delectus perferendis? Cupiditate, molestias asperiores? Molestias tempora est animi aliquid, quaerat repellendus commodi, quidem ut ratione non atque sequi neque voluptatum?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, delectus perferendis? Cupiditate, molestias asperiores? Molestias tempora est animi aliquid, quaerat repellendus commodi, quidem ut ratione non atque sequi neque voluptatum?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, delectus perferendis? Cupiditate, molestias asperiores? Molestias tempora est animi aliquid, quaerat repellendus commodi, quidem ut ratione non atque sequi neque voluptatum?
                </p>
                <Button onClick={() => {
                    props.onExpandedChange?.({
                        actionType : 'ui',
                        expanded   : false,
                        answer     : 'yessMase',
                    });
                }}>
                    Yess Mase
                </Button>
            </CardBody>
        </ModalCard>
    );
};
