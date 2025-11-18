import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const members = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    name: "Will Smith",
    avatar: "https://github.com/shadcn.png",
  },
];

export const WorkspaceMembersList = () => {
  return (
    <div className="space-y-0.5 py-1">
      {members.map((member) => (
        <div className="flex items-center gap-2" key={member.id}>
          <div className="relative">
            <Avatar>
              <Image alt={member.name} fill src={member.avatar} />
              <AvatarFallback>{member.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <span>{member.name}</span>
        </div>
      ))}
    </div>
  );
};
