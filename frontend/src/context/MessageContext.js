import React, { createContext, useState } from 'react';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null); 

    const showMessage = (text, type = 'success') => {
        setMessage({ text, type });
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    };

    return (
        <MessageContext.Provider value={{ message, showMessage }}>
            {children}
        </MessageContext.Provider>
    );
};
