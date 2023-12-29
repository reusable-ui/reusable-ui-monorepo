// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    useMergeEvents,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    ButtonProps,
    Button,
}                           from '@reusable-ui/button'          // a button component for initiating an action
import {
    // react components:
    CloseButton,
}                           from '@reusable-ui/close-button'    // a close button component
import {
    // react components:
    CardHeaderProps,
    CardHeader,
    
    CardFooterProps,
    CardFooter,
    
    CardBodyProps,
    CardBody,
    
    CardProps,
    Card,
    
    CardComponentProps,
}                           from '@reusable-ui/card'            // a flexible and extensible content container, with optional header and footer
import {
    // react components:
    ModalCard,
}                           from '@reusable-ui/modal-card'      // overlays a card dialog to the entire site's page

// internal components:
import {
    // react components:
    ButtonWithAnswer,
}                           from './ButtonWithAnswer.js'

// internals:
import type {
    // types:
    ModalExpandedChangeWithAnswerEvent,
    ModalBaseProps,
    
    AnswerButtonComponentOrChildren,
    AnswerOptionList,
}                           from './types.js'



// react components:
export interface DialogWithAnswerProps<TElement extends Element = HTMLElement, TAnswer extends any = 'ok', TModalExpandedChangeEvent extends ModalExpandedChangeWithAnswerEvent<TAnswer|'ok'> = ModalExpandedChangeWithAnswerEvent<TAnswer|'ok'>>
    extends
        // bases:
        ModalBaseProps<TElement, TModalExpandedChangeEvent>
{
    // options:
    answerOptions            : AnswerOptionList<TAnswer>|undefined
    
    
    
    // accessibilities:
    modalTitle               : React.ReactNode
    modalMessage             : React.ReactNode
    
    
    
    // components:
    modalComponent          ?: React.ReactComponentElement<any, ModalBaseProps<TElement, TModalExpandedChangeEvent>>
    
    cardComponent           ?: CardComponentProps<Element>['cardComponent']
    cardHeaderComponent     ?: React.ReactComponentElement<any, CardHeaderProps<Element>>
    cardBodyComponent       ?: React.ReactComponentElement<any, CardBodyProps<Element>>
    cardFooterComponent     ?: React.ReactComponentElement<any, CardFooterProps<Element>>
    
    closeButtonComponent    ?: React.ReactComponentElement<any, ButtonProps>
    answerButtonComponent   ?: React.ReactComponentElement<any, ButtonProps>
    answerOkButtonComponent ?: React.ReactComponentElement<any, ButtonProps>
}
const DialogWithAnswer = <TElement extends Element = HTMLElement, TAnswer extends any = 'ok', TModalExpandedChangeEvent extends ModalExpandedChangeWithAnswerEvent<TAnswer|'ok'> = ModalExpandedChangeWithAnswerEvent<TAnswer|'ok'>>(props: DialogWithAnswerProps<TElement, TAnswer, TModalExpandedChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // options:
        answerOptions,
        
        
        
        // accessibilities:
        modalTitle,
        modalMessage,
        
        
        
        // components:
        modalComponent          = (<ModalCard modalCardStyle='scrollable' lazy={true} /> as React.ReactComponentElement<any, ModalBaseProps<TElement, TModalExpandedChangeEvent>>),
        
        cardComponent           = (<Card<Element>                                     /> as React.ReactComponentElement<any, CardProps<Element>>),
        cardHeaderComponent     = (<CardHeader<Element>                               /> as React.ReactComponentElement<any, CardHeaderProps<Element>>),
        cardBodyComponent       = (<CardBody<Element>                                 /> as React.ReactComponentElement<any, CardBodyProps<Element>>),
        cardFooterComponent     = (<CardFooter<Element>                               /> as React.ReactComponentElement<any, CardFooterProps<Element>>),
        
        closeButtonComponent    = (<CloseButton                                       /> as React.ReactComponentElement<any, ButtonProps>),
        answerButtonComponent   = (<Button                                            /> as React.ReactComponentElement<any, ButtonProps>),
        answerOkButtonComponent = React.cloneElement<ButtonProps>(answerButtonComponent,
            // props:
            {
                // accessibilities:
                autoFocus : answerButtonComponent.props.autoFocus ?? true,
            },
            
            
            
            // children:
            answerButtonComponent.props.children ?? 'Okay',
        ),
    ...restModalProps} = props;
    
    
    
    // options:
    const answerButtonOptions    : Extract<AnswerOptionList<TAnswer|'ok'>, Map<TAnswer|'ok', AnswerButtonComponentOrChildren>> = (
        // if no option defined -or- defined as empty collection:
        (
            !answerOptions
            ||
            !(
                (answerOptions instanceof Map)
                ? answerOptions.size
                : (Object.keys(answerOptions).length + Object.getOwnPropertySymbols(answerOptions).length)
            )
        )
        
        // use default 'ok' button:
        ? new Map<'ok', AnswerButtonComponentOrChildren>([
            ['ok', answerOkButtonComponent],
        ])
        
        // use defined option(s):
        : (answerOptions instanceof Map)
            ? answerOptions
            : new Map<TAnswer, AnswerButtonComponentOrChildren>([
                ...Object.entries(answerOptions) as [TAnswer, AnswerButtonComponentOrChildren][],
                ...Object.getOwnPropertySymbols(answerOptions).map((sym): [TAnswer, AnswerButtonComponentOrChildren] => [sym as TAnswer, answerOptions[sym as TAnswer]]),
            ])
    );
    
    
    
    // handlers:
    const handleExpandedChange           = useMergeEvents(
        // preserves the original `onExpandedChange` from `modalComponent`:
        modalComponent.props.onExpandedChange,
        
        
        
        // preserves the original `onExpandedChange` from `props`:
        props.onExpandedChange,
    );
    
    const handleAnswer                   = useEvent((answer: TAnswer|'ok'|undefined): void => {
        // actions:
        handleExpandedChange?.({
            actionType : 'ui',
            expanded   : false,
            answer     : answer,
        } as TModalExpandedChangeEvent);
    });
    
    const handleCloseButtonClickInternal = useEvent<React.MouseEventHandler<HTMLButtonElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // already handled => ignore
        event.preventDefault(); // handled
        
        
        
        // actions:
        handleAnswer(undefined); // no answer
    });
    const handleCloseButtonClick         = useMergeEvents(
        // preserves the original `onClick` from `closeButtonComponent`:
        closeButtonComponent.props.onClick,
        
        
        
        // actions:
        handleCloseButtonClickInternal,
    );
    
    
    
    // refs:
    const autoFocusButtonRef = useRef<HTMLButtonElement|null>(null);
    
    
    
    // jsx:
    let hasAutoFocusButton   = false;
    const cardFooterChildren : React.ReactNode = (
        cardFooterComponent.props.children ?? Array.from(answerButtonOptions).map(([answer, answerComponent], index) => {
            // components:
            const answerButtonComponentWithChildren : React.ReactComponentElement<any, ButtonProps> = (
                (
                    !React.isValidElement<ButtonProps>(answerComponent) // NOT a <SomeElement> => treat as children
                    ||
                    (answerComponent.type === React.Fragment)           // a <React.Fragment>  => treat as children
                )
                ? React.cloneElement<ButtonProps>(answerButtonComponent,
                    // props:
                    undefined,
                    
                    
                    
                    // children:
                    answerButtonComponent.props.children ?? answerComponent,
                )
                : answerComponent                                       // a <SomeElement> => treat as <Button>
            );
            
            
            
            // props:
            const answerButtonComponentWithChildrenProps = answerButtonComponentWithChildren.props;
            
            
            
            // jsx:
            return (
                <ButtonWithAnswer<TAnswer|'ok'>
                    // other props:
                    {...answerButtonComponentWithChildrenProps} // steals all answerButtonComponentWithChildren's props, so the <Owner> can recognize the <ButtonWithAnswer> as <TheirChild>
                    
                    
                    
                    // identifiers:
                    key={answerButtonComponentWithChildren.key ?? index}
                    
                    
                    
                    // refs:
                    autoFocusRef={((): React.Ref<HTMLButtonElement>|undefined => {
                        // conditions:
                        if (hasAutoFocusButton) return undefined; // the autoFocus feature has already taken by another <Button>
                        if (!answerButtonComponentWithChildrenProps.autoFocus) return undefined; // no autoFocus feature activated
                        hasAutoFocusButton = true; // mark autoFocus feature as taken
                        
                        
                        
                        return autoFocusButtonRef;
                    })()}
                    
                    
                    
                    // contents:
                    answer={answer}
                    
                    
                    
                    // components:
                    buttonComponent={
                        // clone answerButtonComponentWithChildren element with (almost) blank props:
                        <answerButtonComponentWithChildren.type
                            // identifiers:
                            key={answerButtonComponentWithChildren.key}
                            
                            
                            
                            //#region restore conflicting props
                            {...{
                                ...(('autoFocusRef'    in answerButtonComponentWithChildrenProps) ? { autoFocusRef    : answerButtonComponentWithChildrenProps.autoFocusRef    } : undefined),
                                ...(('answer'          in answerButtonComponentWithChildrenProps) ? { answer          : answerButtonComponentWithChildrenProps.answer          } : undefined),
                                ...(('buttonComponent' in answerButtonComponentWithChildrenProps) ? { buttonComponent : answerButtonComponentWithChildrenProps.buttonComponent } : undefined),
                                ...(('onAnswer'        in answerButtonComponentWithChildrenProps) ? { onAnswer        : answerButtonComponentWithChildrenProps.onAnswer        } : undefined),
                            }}
                            //#endregion restore conflicting props
                        />
                    }
                    
                    
                    
                    // handlers:
                    onAnswer={handleAnswer}
                />
            );
        })
    );
    return React.cloneElement<ModalBaseProps<TElement, TModalExpandedChangeEvent>>(modalComponent,
        // props:
        {
            // other props:
            ...restModalProps,
            ...modalComponent.props, // overwrites restModalProps (if any conflics)
            
            
            
            // auto focusable:
            autoFocusOn      : modalComponent.props.autoFocusOn ?? props.autoFocusOn ?? (hasAutoFocusButton ? autoFocusButtonRef : undefined),
            
            
            
            // handlers:
            onExpandedChange : handleExpandedChange,
        },
        
        
        
        // children:
        modalComponent.props.children ?? props.children ?? <>
            {React.cloneElement<CardHeaderProps<Element>>(cardHeaderComponent,
                // props:
                undefined,
                
                
                
                // children:
                cardHeaderComponent.props.children ?? <>
                    {modalTitle}
                    {React.cloneElement<ButtonProps>(closeButtonComponent,
                        // props:
                        {
                            // handlers:
                            onClick : handleCloseButtonClick,
                        },
                    )}
                </>,
            )}
            
            {React.cloneElement<CardBodyProps<Element>>(cardBodyComponent,
                // props:
                undefined,
                
                
                
                // children:
                cardBodyComponent.props.children ?? modalMessage,
            )}
            
            {React.cloneElement<CardFooterProps<Element>>(cardFooterComponent,
                // props:
                undefined,
                
                
                
                // children:
                cardFooterChildren,
            )}
        </>,
    );
};
export {
    DialogWithAnswer,
    DialogWithAnswer as default,
}
