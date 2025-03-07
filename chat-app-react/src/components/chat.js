import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    const sendMessage = () => {
        if (input.trim() !== '') {
            // Gửi tin nhắn qua Socket.io
            socket.emit('chat message', input);
            setInput('');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Chat App</h2>
            <div
                style={{
                    border: '1px solid #ccc',
                    height: '300px',
                    overflowY: 'auto',
                    padding: '10px',
                    marginBottom: '10px'
                }}
            >
                {messages.map((msg, index) => (
                    <div key={index} style={{ margin: '5px 0' }}>
                        {msg}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                style={{ width: '80%', padding: '8px' }}
            />
            <button onClick={sendMessage} style={{ width: '18%', padding: '8px', marginLeft: '2%' }}>
                Send
            </button>
        </div>
    );
};

export default Chat;
