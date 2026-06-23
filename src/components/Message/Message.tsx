import { type MessageType } from "../../types/MessageType";
import clsx from "clsx";
import "./Message.css";

interface MessageProps {
  message: MessageType;
  isOwn: boolean;
}

// Компонент для отображения отдельного сообщения в чате.
export function Message({ message, isOwn }: MessageProps) {
  const avatarSrc =
    message.author.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(message.author.name)}`;

  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={clsx("messageRow", {
        "messageRow--own": isOwn,
        "messageRow--other": !isOwn,
      })}
    >
      <div
        className={clsx("messageBubble", {
          "messageBubble--own": isOwn,
          "messageBubble--other": !isOwn,
        })}
      >
        {/* автор */}
        {!isOwn && (
          <img
            className="messageBubble__avatar"
            src={avatarSrc}
            alt={`Avatar of ${message.author.name}`}
          />
        )}

        {/* текст */}
        <div className="messageBubble__text">{message.text}</div>

        {/* время */}
        <div className="messageBubble__time">{formattedTime}</div>
      </div>
    </div>
  );
}
