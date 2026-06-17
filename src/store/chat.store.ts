import { create } from "zustand";

import type { Message } from "../types/Message";
import type { ChatAdapter } from "../adapters/ChatAdapter";

// Состояние чата
interface ChatState {
  // Адаптер для загрузки и отправки сообщений
  adapter: ChatAdapter | null;

  // Загруженные сообщения
  messages: Message[];

  // Флаг загрузки сообщений
  isLoading: boolean;

  // Инициализация чата с заданным адаптером
  initialize: (adapter: ChatAdapter) => Promise<void>;

  // Отправка нового сообщения
  sendMessage: (message: Omit<Message, "id">) => Promise<void>;

  // Добавление нового сообщения в состояние
  addMessage: (message: Message) => void;

  reset: () => void;
}

// Хук для доступа к состоянию чата
export const useChatStore = create<ChatState>((set, get) => ({
  adapter: null,
  messages: [],
  isLoading: false,

  initialize: async (adapter) => {
    set({
      adapter,
      isLoading: true,
    });

    const messages = await adapter.loadMessages();

    set({
      messages,
      isLoading: false,
    });

    adapter.subscribe((message) => {
      get().addMessage(message);
    });
  },

  sendMessage: async (message) => {
    const adapter = get().adapter;

    if (!adapter) {
      throw new Error("Адаптер не инициализирован");
    }

    await adapter.sendMessage(message);
  },

  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  reset: () => {
  set({
    adapter: null,
    messages: [],
    isLoading: false,
  });
},
}));
