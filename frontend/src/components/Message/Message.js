import React, { useContext } from 'react';
import { MessageContext } from '../../context/MessageContext';
import './Message.module.css';

const Message = () => {
    const { message } = useContext(MessageContext);

    if (!message) return null;

    return (
        <div className={`message ${message.type}`}>
            {message.text}
        </div>
    );
};

export default Message;
