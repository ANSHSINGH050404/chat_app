import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Users, Circle } from 'lucide-react';

// Message Component
const Message = ({ message, isOwn }) => (
  <div className={`flex mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
      isOwn 
        ? 'bg-blue-500 text-white rounded-br-none' 
        : 'bg-gray-200 text-gray-800 rounded-bl-none'
    }`}>
      {!isOwn && (
        <div className="text-xs font-semibold mb-1 opacity-70">
          {message.username}
        </div>
      )}
      <div className="text-sm">{message.text}</div>
      <div className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  </div>
);

// User List Component
const UserList = ({ users, currentUser }) => (
  <div className="bg-gray-50 border-l border-gray-200 w-64 p-4">
    <div className="flex items-center mb-4">
      <Users className="w-5 h-5 mr-2 text-gray-600" />
      <h3 className="font-semibold text-gray-800">
        Online ({users.length})
      </h3>
    </div>
    <div className="space-y-2">
      {users.map((user, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Circle 
            className={`w-3 h-3 ${
              user === currentUser ? 'text-green-500 fill-current' : 'text-gray-400 fill-current'
            }`} 
          />
          <span className={`text-sm ${
            user === currentUser ? 'font-semibold text-green-600' : 'text-gray-700'
          }`}>
            {user} {user === currentUser && '(You)'}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Message Input Component
const MessageInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex space-x-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={disabled ? "Connecting..." : "Type your message..."}
          disabled={disabled}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !message.trim()}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg px-4 py-2 transition-colors duration-200 flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

// Connection Status Component
const ConnectionStatus = ({ status, onReconnect }) => {
  const statusConfig = {
    connecting: { color: 'text-yellow-600', bg: 'bg-yellow-50', text: 'Connecting...' },
    connected: { color: 'text-green-600', bg: 'bg-green-50', text: 'Connected' },
    disconnected: { color: 'text-red-600', bg: 'bg-red-50', text: 'Disconnected' },
    error: { color: 'text-red-600', bg: 'bg-red-50', text: 'Connection Error' }
  };

  const config = statusConfig[status] || statusConfig.disconnected;

  return (
    <div className={`${config.bg} border-b border-gray-200 px-4 py-2 flex items-center justify-between`}>
      <div className="flex items-center space-x-2">
        <Circle className={`w-3 h-3 ${config.color} fill-current`} />
        <span className={`text-sm font-medium ${config.color}`}>
          {config.text}
        </span>
      </div>
      {(status === 'disconnected' || status === 'error') && (
        <button
          onClick={onReconnect}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Reconnect
        </button>
      )}
    </div>
  );
};

// Username Modal Component
const UsernameModal = ({ onSetUsername }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    if (username.trim()) {
      onSetUsername(username.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Enter Your Username
        </h2>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Your username..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
          <button
            onClick={handleSubmit}
            disabled={!username.trim()}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg py-2 transition-colors duration-200"
          >
            Join Chat
          </button>
        </div>
      </div>
    </div>
  );
};

// Mock WebSocket Implementation
class MockWebSocket {
  constructor(url) {
    this.url = url;
    this.readyState = 0; // CONNECTING
    this.onopen = null;
    this.onmessage = null;
    this.onclose = null;
    this.onerror = null;
    
    // Simulate connection
    setTimeout(() => {
      this.readyState = 1; // OPEN
      if (this.onopen) this.onopen();
      this.simulateActivity();
    }, 1000);
  }
  
  simulateActivity() {
    // Simulate other users joining/leaving and sending messages
    const users = ['Alice', 'Bob', 'Charlie', 'Diana'];
    const messages = [
      'Hello everyone!',
      'How is everyone doing?',
      'Great to be here!',
      'Anyone working on interesting projects?',
      'Nice weather today!',
      'What do you think about the new update?'
    ];
    
    let userCount = 1;
    
    // Simulate users joining
    const joinInterval = setInterval(() => {
      if (userCount < users.length && this.readyState === 1) {
        const newUser = users[userCount];
        userCount++;
        
        if (this.onmessage) {
          this.onmessage({
            data: JSON.stringify({
              type: 'userJoined',
              username: newUser,
              users: users.slice(0, userCount)
            })
          });
        }
        
        // Send a message from the new user
        setTimeout(() => {
          if (this.onmessage && this.readyState === 1) {
            this.onmessage({
              data: JSON.stringify({
                type: 'message',
                username: newUser,
                text: messages[Math.floor(Math.random() * messages.length)],
                timestamp: new Date().toISOString()
              })
            });
          }
        }, 2000);
      } else {
        clearInterval(joinInterval);
      }
    }, 5000);
    
    // Simulate random messages
    const messageInterval = setInterval(() => {
      if (this.readyState === 1 && Math.random() > 0.7) {
        const randomUser = users[Math.floor(Math.random() * Math.min(userCount, users.length))];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        if (this.onmessage) {
          this.onmessage({
            data: JSON.stringify({
              type: 'message',
              username: randomUser,
              text: randomMessage,
              timestamp: new Date().toISOString()
            })
          });
        }
      }
    }, 8000);
  }
  
  send(data) {
    if (this.readyState === 1) {
      const message = JSON.parse(data);
      // Echo back user's own message
      setTimeout(() => {
        if (this.onmessage) {
          this.onmessage({
            data: JSON.stringify({
              type: 'message',
              username: message.username,
              text: message.text,
              timestamp: new Date().toISOString()
            })
          });
        }
      }, 100);
    }
  }
  
  close() {
    this.readyState = 3; // CLOSED
    if (this.onclose) this.onclose();
  }
}


const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [showUsernameModal, setShowUsernameModal] = useState(true);
  
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === 1) return;
    
    setConnectionStatus('connecting');
    
   
    wsRef.current = new MockWebSocket('ws://localhost:5173');
    
    wsRef.current.onopen = () => {
      setConnectionStatus('connected');
     
      wsRef.current.send(JSON.stringify({
        type: 'join',
        username: currentUser
      }));
    };
    
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'message':
          setMessages(prev => [...prev, data]);
          break;
        case 'userJoined':
          setUsers(data.users);
          break;
        case 'userLeft':
          setUsers(data.users);
          break;
        default:
          break;
      }
    };
    
    wsRef.current.onclose = () => {
      setConnectionStatus('disconnected');
    };
    
    wsRef.current.onerror = () => {
      setConnectionStatus('error');
    };
  }, [currentUser]);

  const handleSetUsername = (username) => {
    setCurrentUser(username);
    setShowUsernameModal(false);
  };

  const handleSendMessage = (messageText) => {
    if (wsRef.current?.readyState === 1) {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        username: currentUser,
        text: messageText
      }));
    }
  };

  const handleReconnect = () => {
    connectWebSocket();
  };

  useEffect(() => {
    if (currentUser && !showUsernameModal) {
      connectWebSocket();
    }
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [currentUser, showUsernameModal, connectWebSocket]);

  if (showUsernameModal) {
    return <UsernameModal onSetUsername={handleSetUsername} />;
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Chat Room</h1>
        </div>
        
        {/* Connection Status */}
        <ConnectionStatus 
          status={connectionStatus} 
          onReconnect={handleReconnect}
        />
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <Message
                key={index}
                message={message}
                isOwn={message.username === currentUser}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input */}
        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={connectionStatus !== 'connected'}
        />
      </div>
      
      {/* User List Sidebar */}
      <UserList users={users} currentUser={currentUser} />
    </div>
  );
};

export default ChatApp;