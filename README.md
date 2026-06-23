# React Chat Widget

Универсальный React компонент чат-виджета с поддержкой различных адаптеров для интеграции с любыми бэкенд-системами.

## 📋 Возможности

- ✨ Компонентная архитектура - используйте отдельные части или весь виджет целиком
- 🔌 Паттерн Adapter - легко подключайте свой API или сервис
- 🎨 Готовый стиль - ChatWindow включает красивый интерфейс из коробки
- 📱 Отзывчивый дизайн - работает на всех размерах экрана
- 🪝 React Hooks - удобный API через `useChat` хук
- 📦 TypeScript - полная типизация для безопасности
- 🎯 Легкая интеграция - минимальная настройка для начала

## 🚀 Быстрый старт

### Шаг 1: Установка

```bash
npm install react-chat-widget
```

или с yarn:

```bash
yarn add react-chat-widget
```

Убедитесь, что у вас установлены зависимости:
```bash
npm install react react-dom
```

### Шаг 2: Базовое использование

```tsx
import {
  ChatProvider,
  LocalAdapter,
  ChatWindow,
  MessageList,
  ChatInput,
} from 'react-chat-widget';

function App() {
  // Создаем адаптер (LocalAdapter хранит сообщения в памяти)
  const adapter = new LocalAdapter();

  return (
    <ChatProvider adapter={adapter}>
      <ChatWindow>
        <MessageList currentUserId="1" />
        <ChatInput
          currentUser={{
            id: '1',
            name: 'Ваше имя',
          }}
        />
      </ChatWindow>
    </ChatProvider>
  );
}

export default App;
```

### Шаг 3: Импортируйте стили

```tsx
// В вашем главном файле (main.tsx, index.tsx)
import 'react-chat-widget/dist/chat-widget.css';
```

## 📚 Структура компонентов

### ChatProvider
Провайдер контекста для инициализации чата с выбранным адаптером.

```tsx
<ChatProvider adapter={adapter}>
  {/* Ваши компоненты чата */}
</ChatProvider>
```

**Props:**
- `adapter` (ChatAdapter) - адаптер для работы с сообщениями

### ChatWindow
Основной контейнер чата с красивым оформлением.

```tsx
<ChatWindow>
  {/* Содержимое чата */}
</ChatWindow>
```

### MessageList
Отображает список сообщений.

```tsx
<MessageList currentUserId="1" />
```

**Props:**
- `currentUserId` (string) - ID текущего пользователя для правильного отображения сообщений

### ChatInput
Поле ввода сообщения с кнопкой отправки.

```tsx
<ChatInput
  currentUser={{
    id: '1',
    name: 'Имя пользователя',
    avatar: 'https://example.com/avatar.jpg', // опционально
  }}
/>
```

**Props:**
- `currentUser` (User) - объект текущего пользователя

### Message
Отдельный компонент сообщения (используется внутри MessageList).

```tsx
<Message
  message={messageData}
  isOwn={isCurrentUser}
/>
```

## 🔌 Работа с адаптерами

### LocalAdapter (встроенный)

Хранит сообщения в памяти браузера. Идеален для демо и тестирования.

```tsx
import { LocalAdapter } from 'react-chat-widget';

const adapter = new LocalAdapter();
```

### Создание собственного адаптера

Реализуйте интерфейс `ChatAdapter` для интеграции с вашим API:

```tsx
import { ChatAdapter, MessageType, SendMessagePayload } from 'react-chat-widget';

class MyAPIAdapter implements ChatAdapter {
  async loadMessages(): Promise<MessageType[]> {
    // Загрузите историю сообщений с вашего сервера
    const response = await fetch('/api/messages');
    return response.json();
  }

  async sendMessage(payload: SendMessagePayload): Promise<MessageType> {
    // Отправьте сообщение на сервер
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.json();
  }

  subscribe(callback: (message: MessageType) => void): () => void {
    // Подпишитесь на новые сообщения (WebSocket, EventSource и т.д.)
    const socket = new WebSocket('ws://your-server.com/chat');
    
    socket.onmessage = (event) => {
      callback(JSON.parse(event.data));
    };

    // Верните функцию отписки
    return () => socket.close();
  }
}

// Использование
const adapter = new MyAPIAdapter();
```

## 🪝 Использование хука useChat

Для программного доступа к функциям чата используйте хук `useChat`:

```tsx
import { useChat } from 'react-chat-widget';

function MyComponent() {
  const { messages, sendMessage, isLoading } = useChat();

  const handleSend = async () => {
    await sendMessage({
      text: 'Привет!',
      author: { id: '1', name: 'Пользователь' },
    });
  };

  return (
    <div>
      <button onClick={handleSend} disabled={isLoading}>
        Отправить
      </button>
      <p>Всего сообщений: {messages.length}</p>
    </div>
  );
}
```

## 📦 Типы данных

### MessageType
```tsx
interface MessageType {
  id: string;
  text: string;
  createdAt: Date;
  author: User;
}
```

### User
```tsx
interface User {
  id: string;
  name: string;
  avatar?: string; // опционально
}
```

### SendMessagePayload
```tsx
interface SendMessagePayload {
  text: string;
  author: User;
}
```

## 🎨 Кастомизация стилей

Компонент использует CSS переменные для кастомизации. Переопределите их в ваших стилях:

```css
:root {
  --chat-primary-color: #007bff;
  --chat-text-color: #333;
  --chat-bg-color: #fff;
  --chat-border-radius: 8px;
}
```

Или отредактируйте файлы CSS компонентов непосредственно в папке `src/components/`.

## 🔧 Интеграция в существующий проект

### 1. Установка из npm (когда пакет опубликован)

```bash
npm install react-chat-widget
```

### 2. Добавление CSS

```tsx
// В main.tsx или App.tsx
import 'react-chat-widget/dist/chat-widget.css';
```

### 3. Использование в компоненте

```tsx
import { ChatProvider, ChatWindow, MessageList, ChatInput, LocalAdapter } from 'react-chat-widget';

export function ChatWidget() {
  return (
    <ChatProvider adapter={new LocalAdapter()}>
      <ChatWindow>
        <MessageList currentUserId="your-user-id" />
        <ChatInput currentUser={{ id: 'your-user-id', name: 'Your Name' }} />
      </ChatWindow>
    </ChatProvider>
  );
}
```

### 4. Интеграция с вашим API

```tsx
import { ChatProvider, ChatWindow, MessageList, ChatInput } from 'react-chat-widget';
import { MyAPIAdapter } from './adapters/MyAPIAdapter';

export function ChatWidget() {
  const adapter = new MyAPIAdapter({
    apiUrl: 'https://api.example.com',
    userId: getCurrentUserId(),
  });

  return (
    <ChatProvider adapter={adapter}>
      <ChatWindow>
        <MessageList currentUserId={getCurrentUserId()} />
        <ChatInput currentUser={getCurrentUser()} />
      </ChatWindow>
    </ChatProvider>
  );
}
```

## 📋 Пример с Next.js

```tsx
'use client';

import dynamic from 'next/dynamic';
import { LocalAdapter } from 'react-chat-widget';

const ChatWindow = dynamic(() => import('react-chat-widget').then(mod => mod.ChatWindow), { ssr: false });
const MessageList = dynamic(() => import('react-chat-widget').then(mod => mod.MessageList), { ssr: false });
const ChatInput = dynamic(() => import('react-chat-widget').then(mod => mod.ChatInput), { ssr: false });
const ChatProvider = dynamic(() => import('react-chat-widget').then(mod => mod.ChatProvider), { ssr: false });

export default function ChatPage() {
  const adapter = new LocalAdapter();

  return (
    <ChatProvider adapter={adapter}>
      <ChatWindow>
        <MessageList currentUserId="1" />
        <ChatInput currentUser={{ id: '1', name: 'Пользователь' }} />
      </ChatWindow>
    </ChatProvider>
  );
}
```

## 🛠️ Разработка

Клонируйте репозиторий и установите зависимости:

```bash
git clone <your-repo-url>
cd react-chat-widget
npm install
```

Запуск в режиме разработки:

```bash
npm run dev
```

Сборка:

```bash
npm run build
```

Проверка кода:

```bash
npm run lint
npm run format
```

## 📝 Лицензия

MIT

## 🤝 Поддержка

Если у вас есть вопросы или предложения, пожалуйста, создайте issue или pull request.
