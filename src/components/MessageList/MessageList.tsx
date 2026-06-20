import type { ReactNode } from "react";
import type { Message } from "../../types/Message";
import { useChat } from "../../hooks/useChat";

interface MessageListProps {
  renderMessage?: (message: Message) => ReactNode;
}

// Компонент для отображения списка сообщений в чате.
export function MessageList({ renderMessage }: MessageListProps) {
  const { messages } = useChat();

  const defaultRenderer = (message: Message) => (
    <div>
      <strong>{message.author.name}</strong>

      <div>{message.text}</div>
    </div>
  );

  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          {(renderMessage ?? defaultRenderer)(message)}
        </div>
      ))}
    </>
  );
}
