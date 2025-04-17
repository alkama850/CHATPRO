import React, { useState } from "react";
import axios from "axios";

const GeminiSection = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        import.meta.env.VITE_GEMINI_API_KEY,
      {
        contents: [{ parts: [{ text: message }] }],
      }
    );
    setResponse(res.data.candidates[0].content.parts[0].text);
  };

  return (
    <div>
      <h2>Gemini</h2>
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

export default GeminiSection;
