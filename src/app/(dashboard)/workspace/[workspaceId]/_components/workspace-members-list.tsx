import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const members = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://github.com/shadcn.png",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Will Smith",
    avatar: "https://github.com/shadcn.png",
    email: "will.smith@example.com",
  },
];

export const WorkspaceMembersList = () => {
  return (
    <div className="space-y-0.5 py-1">
      {members.map((member) => (
        <div className="flex items-center gap-2" key={member.id}>
          <Avatar className="relative size-8">
            <Image alt={member.name} fill src={member.avatar} />
            <AvatarFallback>{member.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-sm">{member.name}</p>
            <p className="truncate text-muted-foreground text-xs">{member.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
