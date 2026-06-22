import { type PropsWithChildren, useEffect, useRef } from "react";

interface ChatWindowProps extends PropsWithChildren {
  className?: string;
}

// Компонент для отображения окна чата.
export function ChatWindow({ children, className }: ChatWindowProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // автоскролл (пока базовый)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.scrollTop = el.scrollHeight;
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "400px",
        border: "1px solid #ddd",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}
