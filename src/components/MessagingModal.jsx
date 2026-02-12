import { useState } from 'react';
import { X, Send, Paperclip, Smile } from 'lucide-react';

export default function MessagingModal({ recipient, onClose }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'system',
      text: `You can now send a message to ${recipient.name}. They'll receive it via email.`,
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: message,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate auto-response
    setTimeout(() => {
      const autoResponse = {
        id: messages.length + 2,
        sender: 'system',
        text: `Your message has been sent to ${recipient.name}! They'll receive an email notification and can respond directly.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, autoResponse]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl max-w-2xl w-full h-[600px] flex flex-col animate-grow-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-mist">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold">
              {recipient.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-forest">{recipient.name}</h3>
              <p className="text-xs text-stem">{recipient.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stem hover:text-forest transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dew">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender === 'user'
                    ? 'bg-gray-900 text-white'
                    : msg.sender === 'system'
                    ? 'bg-spring/30 text-forest border border-spring'
                    : 'bg-white text-forest border border-mist'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-white/70' : 'text-stem'
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-mist bg-white">
          <div className="flex gap-2">
            <button
              type="button"
              className="p-2 text-stem hover:text-forest transition-colors"
              aria-label="Attach file"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 text-stem hover:text-forest transition-colors"
              aria-label="Add emoji"
            >
              <Smile className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message ${recipient.name.split(' ')[0]}...`}
              className="flex-1 px-4 py-2 border border-mist rounded-lg focus:outline-none focus:border-growth bg-white"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
