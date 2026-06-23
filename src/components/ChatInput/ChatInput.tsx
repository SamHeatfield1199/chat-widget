import { useState } from "react";
import { useChat } from "../../hooks/useChat";
import "./ChatInput.css";

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
  const [isLoading, setIsLoading] = useState(false);

  const { sendMessage } = useChat();

  // Обработчик отправки сообщения
  const handleSubmit = async () => {
    if (!text.trim() || isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      await sendMessage({
        text,
        author: currentUser,
      });
      setText("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chatInput">
      <input
        className="chatInput__input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Введите сообщение..."
        disabled={isLoading}
      />

      <button
        className="chatInput__button"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "..." : "Send"}
      </button>
    </div>
  );
}
