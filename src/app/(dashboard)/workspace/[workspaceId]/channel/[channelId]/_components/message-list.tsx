import { MessageItem } from "./message/message-item";

const message = [
  {
    id: 1,
    message: "Hello, how are you?",
    createdAt: new Date(),
    createdBy: {
      id: 1,
      name: "John Doe",
      avatar: "https://github.com/shadcn.png",
    },
  },
  {
    id: 2,
    message: "I'm fine, thank you!",
    createdAt: new Date(),
    createdBy: {
      id: 1,
      name: "Will Smith",
      avatar: "https://github.com/shadcn.png",
    },
  },
];

export const MessageList = () => {
  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-auto px-4">
        {message.map((message) => (
          <MessageItem key={message.id} {...message} />
        ))}
      </div>
    </div>
  );
};
