import React, { useState } from "react";
import { useEffect } from "react";
import "./Chatbot.css";


const Chatbot = ({ userDetails }) => {
  const [messages, setMessages] = useState([]); // Store chatbot messages
  const [userInput, setUserInput] = useState(""); // Store user input


  // Function to fetch text file data
  const fetchtxtfile = async () => {
    try {
      if (!userDetails?.patient?._id) {
        console.error("Patient ID not found.");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/login/fetchtxtfile/${userDetails.patient._id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch the file");
      }

      const textData = await response.text(); // Read file data as text

      console.log("Fetched Text Data:", textData);

      // Optional: Add fetched data as a chatbot message
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   { sender: "bot", text: `Here's your report:\n\n${textData}` },
      // ]);
    } catch (error) {
      console.error("Error fetching text file:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Error retrieving file content." },
      ]);
    }
  };

  // Fetch text file on component mount (optional)
  useEffect(() => {
    fetchtxtfile();
  }, []);

  // Handle sending a message
  const sendMessage = () => {
    if (userInput.trim() === "") return;

    // Add user message to the chat
    const newMessages = [
      ...messages,
      { sender: "user", text: userInput },
    ];

    setMessages(newMessages);
    setUserInput("");

    // Simulate chatbot response
    setTimeout(() => {
      const botResponse = getBotResponse(userInput);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botResponse },
      ]);
    }, 1000);
  };

  // Handle user input change
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // Simulate bot response logic
  const getBotResponse = (input) => {
    if (input.toLowerCase().includes("hello")) {
      return "Hi there! How can I assist you today?";
    } else if (input.toLowerCase().includes("appointment")) {
      return "You can book an appointment by visiting the Appointments section.";
    } else if (input.toLowerCase().includes("prescription")) {
      return "You can view your prescriptions in the Prescriptions section.";
    } else {
      return "I'm here to help! Please ask me anything related to your dashboard.";
    }
  };

  return (
    <div className="chatbot_container">
      
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
      </div>

      <div className="chatbot_input">
        <input
          type="text"
          placeholder="Type a message..."
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
