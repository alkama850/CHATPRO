import React, { useState } from 'react';
import axios from 'axios';

function ChatSection({ model }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      let response;
      if (model.name === 'Gemini') {
        response = await axios.post(
          `${model.endpoint}?key=${import.meta.env[model.keyEnv]}`,
          {
            contents: [{ parts: [{ text: input }] }]
          }
        );
        setMessages([...updatedMessages, { role: 'assistant', content: response.data.candidates[0].content.parts[0].text }]);
      } else {
        response = await axios.post(
          model.endpoint,
          {
            model: model.model,
            messages: updatedMessages
          },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env[model.keyEnv]}`
            }
          }
        );
        const content = response.data.choices[0].message.content;
        setMessages([...updatedMessages, { role: 'assistant', content }]);
      }
    } catch (error) {
      setMessages([...updatedMessages, { role: 'assistant', content: 'Error fetching response.' }]);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded p-4">
      <div className="h-96 overflow-y-auto border mb-4 p-2 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-gray-500 italic">Loading...</div>}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your message..."
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatSection;