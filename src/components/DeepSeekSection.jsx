import React, { useState } from "react";
import axios from "axios";

const DeepSeekSection = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await axios.post(
      "https://api.deepseek.com/chat/completions",
      {
        model: "deepseek-chat",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
        },
      }
    );
    setResponse(res.data.choices[0].message.content);
  };

  return (
    <div>
      <h2>DeepSeek</h2>
      <input
        placeholder="Write something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <p>Response: {response}</p>
    </div>
  );
};

export default DeepSeekSection;
