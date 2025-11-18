import Link from "next/link";

import { Hash } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const channelList = [
  { id: "1", name: "General" },
  { id: "2", name: "Random" },
  { id: "3", name: "Random 2" },
];

export const ChannelList = () => {
  return (
    <div className="space-y-0.5 py-1">
      {channelList.map((channel) => (
        <Link
          className={buttonVariants({
            variant: "ghost",
            className: cn(
              "h-7 w-full justify-start px-2 py-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            ),
          })}
          href={"#"}
          key={channel.id}
        >
          <Hash className="size-4" />
          <span className="truncate">{channel.name}</span>
        </Link>
      ))}
    </div>
  );
};
