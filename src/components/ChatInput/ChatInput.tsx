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
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />

      <button onClick={handleSubmit}>Send</button>
    </div>
  );
}
