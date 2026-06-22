import { useChat } from "../../hooks/useChat";
import { Message } from "../Message/Message";

interface MessageListProps {
  currentUserId: string;
  renderMessage?: any;
}

// Компонент для отображения списка сообщений в чате.
export function MessageList({
  currentUserId,
  renderMessage,
}: MessageListProps) {
  const { messages } = useChat();

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
      {messages.map((message) => {
        const isOwn = message.author.id === currentUserId;

        if (renderMessage) {
          return <div key={message.id}>{renderMessage(message)}</div>;
        }

        return <Message key={message.id} message={message} isOwn={isOwn} />;
      })}
    </div>
  );
}
