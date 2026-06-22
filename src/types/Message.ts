// Тип данных для сообщений в чате.
export interface Message {
  id: string;
  text: string;
  createdAt: Date;

  author: {
    id: string;
    name: string;
    avatar?: string;
  };
}
