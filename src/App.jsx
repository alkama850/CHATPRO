import React from "react";
import ChatGPTSection from "./components/ChatGPTSection";
import DeepSeekSection from "./components/DeepSeekSection";
import GeminiSection from "./components/GeminiSection";

const App = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Multi Chatbot Platform</h1>
      <ChatGPTSection />
      <DeepSeekSection />
      <GeminiSection />
    </div>
  );
};

export default App;
