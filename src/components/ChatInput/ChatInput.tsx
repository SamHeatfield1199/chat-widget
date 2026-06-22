import { useState } from "react";
import { useChat } from "../../hooks/useChat";

interface ChatInputProps {
  currentUser: {
    id: string;
    name: string;
    avatar?: string;
  };
}

// Компонент для ввода и отправки новых сообщений в чате.
export function ChatInput({ currentUser }: ChatInputProps) {
  const [text, setText] = useState("");

  const { sendMessage } = useChat();

  // Обработчик отправки сообщения
  const handleSubmit = async () => {
    if (!text.trim()) {
      return;
    }

    await sendMessage({
      text,
      author: currentUser,
    });

    setText("");
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "10px",
        borderTop: "1px solid #333",
        gap: "8px",
      }}
    >
      <input
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "20px",
          border: "1px solid #444",
          background: "#1e1e1e",
          color: "#fff",
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        style={{
          padding: "10px 16px",
          borderRadius: "20px",
          background: "#4f9cff",
          color: "white",
          border: "none",
        }}
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
}
