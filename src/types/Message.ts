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
