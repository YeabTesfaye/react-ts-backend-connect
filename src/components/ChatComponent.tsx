import { useEffect, useId, useState } from "react";

const connectToServer = (userId: string) => {
  console.log(`Connected to chat server for user ${userId}`);
};

const disconnectFromChatServer = (userId: string) => {
  console.log(`Disconnected from chat server for user ${userId}`);
};

interface ChatProps {
  userId: string;
}

const ChatComponent = ({ userId }: ChatProps) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    connectToServer(userId);
    setIsConnected(true);

    return () => {
      disconnectFromChatServer(userId);
      setIsConnected(false);
    };
  }, [useId]);

  return (
    <div>
      <h1>Chat</h1>
      <p>{isConnected ? "Connected to the chat server" : "Not Connected"}</p>
    </div>
  );
};

export default ChatComponent;
