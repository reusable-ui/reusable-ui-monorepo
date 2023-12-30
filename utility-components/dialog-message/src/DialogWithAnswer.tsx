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
import type {
    // react components:
    ModalExpandedChangeEvent,
}                           from '@reusable-ui/modal'           // overlays a dialog to the entire site's page
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
    ModalBaseProps,
    
    AnswerButtonComponentOrChildren,
    AnswerOptionList,
}                           from './types.js'



// react components:
export interface DialogWithAnswerProps<TElement extends Element = HTMLElement, TData extends any = 'ok', TModalExpandedChangeEvent extends ModalExpandedChangeEvent<TData|'ok'> = ModalExpandedChangeEvent<TData|'ok'>>
    extends
        // bases:
        ModalBaseProps<TElement, TModalExpandedChangeEvent>
{
    // options:
    answerOptions            : AnswerOptionList<TData>|undefined
    
    
    
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
const DialogWithAnswer = <TElement extends Element = HTMLElement, TData extends any = 'ok', TModalExpandedChangeEvent extends ModalExpandedChangeEvent<TData|'ok'> = ModalExpandedChangeEvent<TData|'ok'>>(props: DialogWithAnswerProps<TElement, TData, TModalExpandedChangeEvent>): JSX.Element|null => {
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
    ...restModalBaseProps} = props;
    
    
    
    // options:
    const answerButtonOptions    : Extract<AnswerOptionList<TData|'ok'>, Map<TData|'ok', AnswerButtonComponentOrChildren>> = (
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
            : new Map<TData, AnswerButtonComponentOrChildren>([
                ...Object.entries(answerOptions) as [TData, AnswerButtonComponentOrChildren][],
                ...Object.getOwnPropertySymbols(answerOptions).map((sym): [TData, AnswerButtonComponentOrChildren] => [sym as TData, answerOptions[sym as TData]]),
            ])
    );
    
    
    
    // handlers:
    const handleExpandedChange           = useMergeEvents(
        // preserves the original `onExpandedChange` from `modalComponent`:
        modalComponent.props.onExpandedChange,
        
        
        
        // preserves the original `onExpandedChange` from `props`:
        props.onExpandedChange,
    );
    
    const handleAnswer                   = useEvent((answer: TData|'ok'|undefined): void => {
        // actions:
        handleExpandedChange?.({
            actionType : 'ui',
            expanded   : false,
            data       : answer,
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
            
            
            
            // jsx:
            return (
                <ButtonWithAnswer<TData|'ok'>
                    // identifiers:
                    key={answerButtonComponentWithChildren.key ?? index}
                    
                    
                    
                    // refs:
                    autoFocusRef={((): React.Ref<HTMLButtonElement>|undefined => {
                        // conditions:
                        if (hasAutoFocusButton) return undefined; // the autoFocus feature has already taken by another <Button>
                        if (!answerButtonComponentWithChildren.props.autoFocus) return undefined; // no autoFocus feature activated
                        hasAutoFocusButton = true; // mark autoFocus feature as taken
                        
                        
                        
                        return autoFocusButtonRef;
                    })()}
                    
                    
                    
                    // contents:
                    answer={answer}
                    
                    
                    
                    // components:
                    buttonComponent={answerButtonComponentWithChildren}
                    
                    
                    
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
            ...restModalBaseProps,
            ...modalComponent.props, // overwrites restModalBaseProps (if any conflics)
            
            
            
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
