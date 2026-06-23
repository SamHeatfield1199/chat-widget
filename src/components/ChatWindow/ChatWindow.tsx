import { type PropsWithChildren, useEffect, useRef } from "react";
import "./ChatWindow.css";

interface ChatWindowProps extends PropsWithChildren {
  className?: string;
}

// Компонент для отображения окна чата.
export function ChatWindow({ children, className }: ChatWindowProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // автоскролл при получении новых сообщений
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const scrollTimeout = requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });

    return () => cancelAnimationFrame(scrollTimeout);
  });

  return (
    <div
      ref={ref}
      className={className ? `chatWindow ${className}` : "chatWindow"}
    >
      {children}
    </div>
  );
}
