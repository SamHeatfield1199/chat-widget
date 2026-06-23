import { type MessageType } from "../../types/MessageType";
import { useChat } from "../../hooks/useChat";
import { Message } from "../Message/Message";
import "./MessageList.css";

interface MessageListProps {
  currentUserId: string;
  renderMessage?: (message: MessageType) => React.ReactNode;
}

// Компонент для отображения списка сообщений в чате.
export function MessageList({
  currentUserId,
  renderMessage,
}: MessageListProps) {
  const { messages } = useChat();

  return (
    <div className="messageList">
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
