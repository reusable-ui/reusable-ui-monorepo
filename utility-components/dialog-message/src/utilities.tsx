// react:
import {
    // react:
    default as React,
}                           from 'react'

// internals:
import type {
    // types:
    FieldErrorList,
}                           from './types.js'



// utilities:
export const paragraphify         = (text: string): React.ReactElement => {
    // jsx:
    return (
        <>
            {
                text
                .split(/(?:\r?\n){2,}/) // double/triple/many new_line(s)
                .map((para, index) => <p key={index}>{para}</p>)
            }
        </>
    );
};

export const isTypeError          = (error: any): boolean => {
    return (
        (error instanceof TypeError)
        ||
        (
            (typeof(error) === 'string')
            &&
            error.startsWith('TypeError:')
        )
    );
};

export const isReactNode          = <TDialogMessage extends {}>(dialogMessage : TDialogMessage | React.ReactNode, uniqueProp: keyof TDialogMessage): dialogMessage is React.ReactNode => {
    return (
        (
            (typeof(dialogMessage) !== 'object'    ) // not object
            ||
            (dialogMessage         ===  null       ) // is  object of `null`
            ||
            !(uniqueProp           in dialogMessage) // is  object of not_TDialogMessage  /* `TDialogMessage` is used for opening    <ModalBase> */
        )
    );
};
export const isFieldErrorList     = <TDialogMessage extends {}>(dialogMessage : TDialogMessage | FieldErrorList , uniqueProp: keyof TDialogMessage): dialogMessage is FieldErrorList => {
    return (
        (
            (typeof(dialogMessage) !== 'object'    ) // not object
            ||
            (dialogMessage         ===  null       ) // is  object of `null`
            ||
            !(uniqueProp           in dialogMessage) // is  object of not_TDialogMessage  /* `TDialogMessage` is used for opening    <ModalBase> */
        )
    );
};
export const isError              = <TDialogMessage extends {}>(dialogMessage : TDialogMessage | any            , uniqueProp: keyof TDialogMessage): dialogMessage is any => {
    return (
        (
            (typeof(dialogMessage) !== 'object'    ) // not object
            ||
            (dialogMessage         ===  null       ) // is  object of `null`
            ||
            !(uniqueProp           in dialogMessage) // is  object of not_TDialogMessage  /* `TDialogMessage` is used for opening    <ModalBase> */
        )
    );
};

export const isFetchRequestError  = (fetchError: any): boolean => {
    return (
        // axios'  error request:
        !!fetchError?.request // the request property must be exist
        ||
        // rtkq's  error request:
        isTypeError(fetchError?.error)
        ||
        // fetch's error request:
        isTypeError(fetchError)
    );
};
export const getFetchErrorCode    = (fetchError: any): number|undefined => {
    return (
        // axios'  error status code:
        fetchError?.response?.status
        ??
        // rtkq's  error status code:
        fetchError?.status
        ??
        // fetch's error status code:
        fetchError?.cause?.status // passing a `Response` object
        ??
        fetchError?.cause         // passing a `Response`'s status code
    );
};
export const getFetchErrorMessage = async (fetchError: any): Promise<React.ReactElement|undefined> => {
    // jsx:
    return (
        // axios'  human_readable server error   response:
        // axios'  human_readable server message response:
        // rtkq's  human_readable server error   response:
        // rtkq's  human_readable server message response:
        ((): React.ReactElement|undefined => {
            const data = (
                fetchError?.response?.data // axios' response data
                ??
                fetchError?.data           // rtkq's response data
            );
            
            
            
            // response as json:
            if (typeof(data) === 'object') {
                const error   = data?.error;
                if ((typeof(error)   === 'string') && !!error  ) return paragraphify(error);   // not an empty string => a valid error message
                
                const message = data?.message;
                if ((typeof(message) === 'string') && !!message) return paragraphify(message); // not an empty string => a valid error message
            }
            // response as text:
            else if (typeof(data) === 'string') {
                if (!!data) return paragraphify(data); // not an empty string => a valid error message
            } // if
            
            
            
            return undefined; // unknown response format => skip
        })()
        ??
        // fetch's human_readable server error   response:
        // fetch's human_readable server message response:
        (await (async (): Promise<React.ReactElement|undefined> => {
            // conditions:
            const response = fetchError?.cause; // a `Response` object passed on Error('string', Response)
            if (!(response instanceof Response)) return undefined; // not a `Response` object => skip
            const contentType = response.headers.get('Content-Type');
            if (!contentType) return undefined; // no 'Content-Type' defined => skip
            
            
            
            // response as json:
            if ((/^application\/json/i).test(contentType)) {
                try {
                    const data    = await response.json();
                    
                    const error   = data?.error;
                    if ((typeof(error)   === 'string') && !!error  ) return paragraphify(error);   // not an empty string => a valid error message
                    
                    const message = data?.message;
                    if ((typeof(message) === 'string') && !!message) return paragraphify(message); // not an empty string => a valid error message
                }
                catch {
                    return undefined; // parse failed => skip
                } // try
            }
            // response as text:
            else if ((/^text/i).test(contentType)) {
                try {
                    const text = await response.text();
                    
                    if (!!text) return paragraphify(text); // not an empty string => a valid error message
                }
                catch {
                    return undefined; // parse failed => skip
                } // try
            } // if
            
            
            
            return undefined; // unknown response format => skip
        })())
    );
};
