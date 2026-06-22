import {
  ChatProvider,
  LocalAdapter,
  MessageList,
  ChatInput,
  ChatWindow,
} from "./src";

const adapter = new LocalAdapter();

export default function App() {
  return (
     <ChatProvider adapter={adapter}>
      <ChatWindow>
        <MessageList />

        <ChatInput
          currentUser={{
            id: "1",
            name: "Настя",
          }}
        />
      </ChatWindow>
    </ChatProvider>
  );
}