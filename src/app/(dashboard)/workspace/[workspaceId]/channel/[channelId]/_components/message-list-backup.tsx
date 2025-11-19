import { useEffect, useMemo, useRef, useState } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { MessageCircleIcon } from "lucide-react";

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

import { orpc } from "@/lib/orpc/client";

import { MessageItem } from "./message/message-item";
import { MessageListSkeleton } from "./message/message-list-skeleton";

export const MessageList = ({ channelId }: { channelId: string }) => {
  const [hasInitialScrolled, setHasInitialScrolled] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [newMessages, setNewMessages] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastItemIdRef = useRef<string | undefined>(undefined);
  const isRestoringScrollRef = useRef(false);

  const infiniteOptions = orpc.message.list.infiniteOptions({
    input: (pageParam: string | undefined) => ({ channelId, cursor: pageParam, limit: 10 }),
    context: { cache: true },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (data) => ({
      pages: [...data.pages].map((p) => ({ ...p, items: [...p.items].reverse() })).reverse(),
      pageParams: [...data.pageParams].reverse(),
    }),
  });

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...infiniteOptions,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (!hasInitialScrolled && data?.pages.length && !isRestoringScrollRef.current && !isFetchingNextPage) {
      const el = scrollRef.current;

      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }
  }, [hasInitialScrolled, data?.pages.length, isFetchingNextPage]);

  const handleScroll = () => {
    const el = scrollRef.current;

    if (!el) return;

    const threshold = 80;
    const isNearTop = el.scrollTop <= threshold;
    const hasInitialScrolledNow = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

    setHasInitialScrolled(hasInitialScrolledNow);

    if (isNearTop && hasNextPage && !isFetching && !isFetchingNextPage) {
      const prevScrollHeight = el.scrollHeight;
      const prevScrollTop = el.scrollTop;

      isRestoringScrollRef.current = true;

      fetchNextPage().then(() => {
        // Wait for React to render the new items
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const el = scrollRef.current;
            if (el) {
              const newScrollHeight = el.scrollHeight;
              el.scrollTop = newScrollHeight - prevScrollHeight + prevScrollTop;
              isRestoringScrollRef.current = false;
            }
          });
        });
      });
    }
  };

  const items = useMemo(() => {
    return data?.pages.flatMap((p) => p.items) ?? [];
  }, [data]);

  if (isLoading) {
    return <MessageListSkeleton />;
  }

  if (items.length === 0) {
    return (
      <Empty className="h-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MessageCircleIcon />
          </EmptyMedia>
          <EmptyTitle>No Messages Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t sent any messages yet. Get started by sending your first message.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }
  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-auto px-4" onScroll={handleScroll} ref={scrollRef}>
        {items.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

//
//
//
//

import { useQuery } from "@tanstack/react-query";

import { orpc } from "@/lib/orpc/client";

import { MessageItem } from "./message/message-item";
import { MessageListSkeleton } from "./message/message-list-skeleton";

export const MessageList = ({ channelId }: { channelId: string }) => {
  const { data: messages, isLoading } = useQuery(orpc.message.list.queryOptions({ input: { channelId } }));

  if (isLoading) {
    return <MessageListSkeleton />;
  }

  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-auto px-4">
        {messages?.items.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};
