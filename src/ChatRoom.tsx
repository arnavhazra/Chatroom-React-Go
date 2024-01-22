import React, { useEffect, useState } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';

const ws = new WebSocket('ws://localhost:8080/ws');

function ChatRoom() {
  const [messages, setMessages] = useState<{ message: string; votes: number }[]>([]);
  const [messageInput, setMessageInput] = useState('');

  // Set up WebSocket connection and fetch message history
  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    // Handle incoming messages and votes
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data.toString());
      if (data.type === 'message') {
        setMessages((prevMessages) => [...prevMessages, { message: data.message, votes: data.votes }]);
      } else if (data.type === 'vote') {
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[data.index].votes += data.vote;
          return newMessages;
        });
      }
    };

    ws.onclose = () => {
      console.log('WebSocket Client Disconnected');
    };

    // Fetch message history from the backend
    fetch('/history', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error(error));

    return () => {
      ws.close();
    };
  }, []);

  // Handle sending messages
  function handleSendMessage() {
    if (messageInput.trim() !== '') {
      ws.send(JSON.stringify({ type: 'message', message: messageInput }));
      setMessageInput('');
    }
  }

  // Handle upvotes and downvotes
  function handleVote(index: number, vote: number) {
    ws.send(JSON.stringify({ type: 'vote', index, vote }));
  }

  return (
    <div>
      {/* Display messages and their vote counts */}
      {messages.map((message, index) => (
        <div key={index}>
          <div>{message.message}</div>
          <div>
            <button onClick={() => handleVote(index, 1)}>Upvote</button>
            <span>{message.votes}</span>
            <button onClick={() => handleVote(index, -1)}>Downvote</button>
          </div>
        </div>
      ))}
      {/* Input field for new messages */}
      <input
        type="text"
        placeholder="Type your message here"
        value={messageInput}
        onChange={(event) => setMessageInput(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleSendMessage();
          }
        }}
      />
      {/* Send message button */}
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default ChatRoom;
