// Тип данных для сообщений в чате.
export interface MessageType {
  id: string;
  text: string;
  createdAt: Date;

  author: {
    id: string;
    name: string;
    avatar?: string;
  };
}
