// Тип данных для отправки нового сообщения.
export interface SendMessagePayload {
  text: string;

  author: {
    id: string;
    name: string;
    avatar?: string;
  };
}
