import React, { useEffect, useState, useRef } from "react";
import "./ChatBox.css";
import { io } from "socket.io-client";
import axios from "axios";

const SOCKET_URL = "https://sunil-protfolio.onrender.com";
const socket = io(SOCKET_URL);

export default function ChatBox({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋, how can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const phone = "+917499218733"; // user phone
  const name = "User1"; // optional
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("register", { name, phone });

    socket.on("sms-reply", (msg) => {
      setMessages((prev) => [...prev, { sender: "bot", text: msg.body }]);
    });

    return () => socket.off("sms-reply");
  }, []);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);

    try {
      await axios.post(`${SOCKET_URL}/sms/send`, { body: trimmed });
    } catch (err) {
      console.error("Error sending SMS:", err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Failed to send message" }]);
    }

    setInput("");
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <span>💬 Chat with Me</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="chatbox-body">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>{msg.text}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbox-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>➤</button>
      </div>
    </div>
  );
}
