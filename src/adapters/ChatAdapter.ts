import type { Message } from "../types/Message";
import type { SendMessagePayload } from "../types/SendMessagePayload";

// Интерфейс адаптера для чата.
export interface ChatAdapter {
  // Загружает историю сообщений.
  // Должен возвращать массив сообщений,
  // отсортированных по дате создания (от старых к новым).
  loadMessages(): Promise<Message[]>;

  // Отправляет новое сообщение.
  // Должен возвращать полное сообщение с заполненным id и датой создания.
  sendMessage(message: SendMessagePayload): Promise<Message>;

  // Подписывается на новые сообщения.
  // Должен вызывать callback при каждом новом сообщении,
  // передавая ему полное сообщение с заполненным id и датой создания.
  // Должен возвращать функцию для отписки от новых сообщений.
  subscribe(callback: (message: Message) => void): () => void;
}
