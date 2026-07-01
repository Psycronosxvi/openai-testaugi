import React, { useState } from 'react';
import { Button } from './Button';  // Import the custom Button component
import { Input } from './Input';  // Import the custom Input component

// Function to send the message to your backend API
const sendChatMessage = async (userInput: string) => {
  try {
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userInput }),
    });
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending message:', error);
    return 'Sorry, I couldn\'t process your request.';
  }
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [userInput, setUserInput] = useState('');

  // Handle sending the message and receiving the response
  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    const newMessage = {
      role: 'user',
      content: userInput,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);

    const aiResponse = await sendChatMessage(userInput);
    const newResponse = {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage, newResponse]);

    setUserInput('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={msg.role === 'user' ? 'user-message' : 'assistant-message'}>
            <p>{msg.content}</p>
            <span>{msg.timestamp.toString()}</span>
          </div>
        ))}
      </div>
      <Input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type a message..."
        className="mb-4" // You can customize the styling of Input
      />
      <Button onClick={handleSendMessage} variant="default" size="default">
        Send
      </Button>
    </div>
  );
};

export default ChatInterface;
