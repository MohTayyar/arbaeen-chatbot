import { useState, useRef, useEffect } from 'react';
import { sendMessage } from './groq';

const QUICK_QUESTIONS = [
  'Where can I find the nearest Mawkib?',
  'What should I do if I feel dizzy?',
  'How far is Karbala from Najaf?',
  'How do I treat foot blisters?',
  'What are the emergency numbers in Iraq?',
];

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Peace be upon you. I am your Arbaeen assistant. I can help you find Mawkib stations, provide first aid guidance, and answer route questions. How can I help you?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const reply = await sendMessage(
        newMessages.map((m) => ({ role: m.role, content: m.content }))
      );
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Sorry, I am having trouble connecting. Please check your internet connection and try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <h1>Arbaeen Assistant</h1>
        <p>Your guide on the road to Karbala</p>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <div className="bubble">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="message assistant">
            <div className="bubble typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="quick-questions">
        {QUICK_QUESTIONS.map((q, i) => (
          <button key={i} onClick={() => handleSend(q)} disabled={loading}>
            {q}
          </button>
        ))}
      </div>

      <div className="chat-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type your question here..."
          rows={2}
          disabled={loading}
        />
        <button onClick={() => handleSend()} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}