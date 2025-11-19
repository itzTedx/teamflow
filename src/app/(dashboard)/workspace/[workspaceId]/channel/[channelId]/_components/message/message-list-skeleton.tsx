import { Skeleton } from "@/components/ui/skeleton";

export const MessageListSkeleton = () => {
  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-auto px-4">
        {Array.from({ length: 8 }, (_, index) => `message-skeleton-${index}`).map((key) => (
          <div className="group relative flex gap-3 rounded-lg p-2" key={key}>
            <Skeleton className="size-8 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-x-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
