import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = ({ userDetails }) => {
  const [messages, setMessages] = useState([]); // Chat messages
  const [userInput, setUserInput] = useState(""); // User input
  const [loading, setLoading] = useState(false); // Loading state

  // Function to send user message to backend
  const sendMessage = async () => {
    if (userInput.trim() === "" || loading) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userInput }),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      const botResponse = data.response || "I'm here to help!";

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botResponse },
      ]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, I couldn't process that. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot_container">
      {/* Messages Display */}
      <div className="chatbot_messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat_message ${
              message.sender === "bot" ? "bot_message" : "user_message"
            }`}
          >
            {message.text}
          </div>
        ))}
        {loading && <div className="bot_message">Thinking...</div>}
      </div>

      {/* Input Field */}
      <div className="chatbot_input">
        <input
          type="text"
          placeholder="Type a message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading} // Disable input while waiting for response
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
