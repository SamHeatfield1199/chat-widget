import {
  ChatProvider,
  LocalAdapter,
  MessageList,
  ChatInput,
} from "./src";

const adapter = new LocalAdapter();

export default function App() {
  return (
    <ChatProvider adapter={adapter}>
      <MessageList />

      <ChatInput
        currentUser={{
          id: "1",
          name: "Настя",
        }}
      />
    </ChatProvider>
  );
}