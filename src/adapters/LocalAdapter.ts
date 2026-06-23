import type { ChatAdapter } from "./ChatAdapter";
import type { MessageType } from "../types/MessageType";
import type { SendMessagePayload } from "../types/SendMessagePayload";

// Локальный адаптер для чата, который хранит сообщения в памяти.
export class LocalAdapter implements ChatAdapter {
  private messages: MessageType[] = [];

  // Слушатели для новых сообщений
  private listeners: Array<(message: MessageType) => void> = [];

  async loadMessages() {
    return this.messages;
  }

  /** @inheritdoc */
  async sendMessage(message: SendMessagePayload): Promise<MessageType> {
    const newMessage: MessageType = {
      id: crypto.randomUUID(),
      text: message.text,
      createdAt: new Date(),
      author: {
        id: message.author.id,
        name: message.author.name,
        avatar: message.author.avatar,
      },
    };

    this.messages.push(newMessage);

    this.listeners.forEach((listener) => listener(newMessage));

    return newMessage;
  }

  /** @inheritdoc */
  subscribe(callback: (message: MessageType) => void) {
    this.listeners.push(callback);

    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback
      );
    };
  }
}
