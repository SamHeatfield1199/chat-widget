import { type Message } from "../../types/Message";
import clsx from "clsx";

interface MessageProps {
  message: Message;
  isOwn: boolean;
}

// Компонент для отображения отдельного сообщения в чате.
export function Message({ message, isOwn }: MessageProps) {
  return (
    <div
      className={clsx("messageRow", {
        own: isOwn,
      })}
      style={{
        display: "flex",
        justifyContent: isOwn ? "flex-end" : "flex-start",
        marginBottom: "6px",
      }}
    >
      <div
        style={{
          maxWidth: "60%",
          padding: "8px 12px",
          borderRadius: isOwn ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          background: isOwn ? "#DCF8C6" : "#2f2f2f",
          color: isOwn ? "#000" : "#fff",
        }}
      >
        {/* автор */}
        {!isOwn && (
          <div
            style={{
              fontSize: "12px",
              opacity: 0.7,
              marginBottom: "2px",
            }}
          >
            {message.author.name}
          </div>
        )}

        {/* текст */}
        <div>{message.text}</div>

        {/* время */}
        <div
          style={{
            fontSize: "10px",
            opacity: 0.5,
            marginTop: "4px",
            textAlign: "right",
          }}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
