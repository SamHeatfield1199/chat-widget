import type { ChatAdapter } from "./ChatAdapter";
import type { Message } from "../types/Message";
import type { SendMessagePayload } from "../types/SendMessagePayload";

// Локальный адаптер для чата, который хранит сообщения в памяти.
export class LocalAdapter implements ChatAdapter {
  private messages: Message[] = [];

  // Слушатели для новых сообщений
  private listeners: Array<(message: Message) => void> = [];

  async loadMessages() {
    return this.messages;
  }

  /** @inheritdoc */
async sendMessage(message: SendMessagePayload): Promise<Message> {

  const newMessage: Message = {
    id: crypto.randomUUID(),
    text: message.text,
    author: message.author,
    createdAt: new Date(),
  };

  this.messages.push(newMessage);

  this.listeners.forEach((listener) => listener(newMessage));

  return newMessage;
}

  /** @inheritdoc */
  subscribe( callback: (message: Message) => void) {
    this.listeners.push(callback);

  return () => {
    this.listeners =
      this.listeners.filter(
        (listener) =>
          listener !== callback
      );
  };
}
}
