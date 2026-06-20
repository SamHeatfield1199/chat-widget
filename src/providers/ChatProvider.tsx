import { type PropsWithChildren, useEffect } from "react";

import type { ChatAdapter } from "../adapters/ChatAdapter";
import { useChatStore } from "../store/chat.store";

interface ChatProviderProps extends PropsWithChildren {
  adapter: ChatAdapter;
}

// Компонент-провайдер для чата.
export function ChatProvider({ adapter, children }: ChatProviderProps) {
  const initialize = useChatStore((state) => state.initialize);

  const reset = useChatStore((state) => state.reset);

  useEffect(() => {
    initialize(adapter);

    return () => {
      reset();
    };
  }, [adapter, initialize, reset]);

  return <>{children}</>;
}
