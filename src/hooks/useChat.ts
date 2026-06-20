import { useShallow } from "zustand/react/shallow";
import { useChatStore } from "../store/chat.store";

// Хук для доступа к состоянию чата
export function useChat() {
  return useChatStore(
    useShallow((state) => ({
      messages: state.messages,
      isLoading: state.isLoading,
      sendMessage: state.sendMessage,
    }))
  );
}
