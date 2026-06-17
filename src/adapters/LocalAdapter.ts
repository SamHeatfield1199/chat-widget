import type { ChatAdapter } from "./ChatAdapter";
import type { Message } from "../types/Message";

// Локальный адаптер для чата, который хранит сообщения в памяти.
export class LocalAdapter implements ChatAdapter {
  private messages: Message[] = [];

  async loadMessages() {
    return this.messages;
  }

  async sendMessage(message: Omit<Message, "id">): Promise<Message> {
    const newMessage = {
      ...message,
      id: crypto.randomUUID(),
    };

    this.messages.push(newMessage);

    return newMessage;
  }

  subscribe() {
    return () => {};
  }
}
